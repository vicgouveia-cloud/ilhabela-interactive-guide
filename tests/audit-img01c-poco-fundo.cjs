const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const MAIN_BASE = process.env.MAIN_BASE || '07b970870dc6544494aa08e5aa965b31ec1f9f71';
const ID = 'cachoeira-do-poco-fundo';
const IMAGE = 'assets/images/cachoeira-do-poco-fundo-acesso_commons.webp';
const SOURCE = 'https://commons.wikimedia.org/wiki/File:Trilha_do_Po%C3%A7o_Fundo.jpg';
const LICENSE = 'https://creativecommons.org/licenses/by-sa/4.0/';

function data(useMain) {
  const context = vm.createContext({ console });
  for (const file of ['data.js', 'additional-spots.js', 'attraction-photos.js']) {
    const source = useMain
      ? execFileSync('git', ['show', MAIN_BASE + ':' + file], {cwd:ROOT, encoding:'utf8'})
      : fs.readFileSync(path.join(ROOT,file),'utf8');
    vm.runInContext(source,context,{filename:file});
  }
  return {
    spots: Array.from(vm.runInContext('touristSpots',context)),
    library: vm.runInContext('verifiedPhotoLibrary',context)
  };
}
const before = data(true), after = data(false);
const oldById = new Map(before.spots.map(s=>[s.id,s]));
const currentById = new Map(after.spots.map(s=>[s.id,s]));
assert.equal(before.spots.length,50);
assert.equal(after.spots.length,50);
assert.equal(Object.keys(before.library).length,26);
assert.equal(Object.keys(after.library).length,34);
assert.equal(before.spots.map(s=>s.id).join('|'), after.spots.map(s=>s.id).join('|'));

const newSpot = currentById.get(ID), oldSpot = oldById.get(ID), entry=after.library[ID];
assert.equal(oldSpot.image,'assets/images/attraction-placeholder.svg');
assert.equal(newSpot.image,IMAGE);
assert.deepEqual(Array.from(newSpot.images),[IMAGE]);
assert.equal(newSpot.photoSource,SOURCE);
assert.equal(newSpot.photoCredit,'Jmdelboux · Wikimedia Commons');
assert.equal(newSpot.photoLicense,'CC BY-SA 4.0');
assert.equal(newSpot.photoLicenseUrl,LICENSE);
assert(newSpot.photoProvenance.includes('-23.912594, -45.342669'));
assert(newSpot.photoAdaptation.includes('WebP'));
assert(newSpot.photoCaption.pt.includes('Placa da trilha de acesso'));
assert(newSpot.photoCaption.pt.includes('não aparece'));
for(const locale of ['pt','en','fr','es','he']) {
  assert(typeof newSpot.photoCaption[locale]==='string' && newSpot.photoCaption[locale].trim(),ID+' caption '+locale);
}
const approvedContext = vm.createContext({console});
for(const file of ['data.js','additional-spots.js','attraction-photos.js']) vm.runInContext(execFileSync('git',['show','6c48fd8:'+file],{cwd:ROOT,encoding:'utf8'}),approvedContext);
const approvedSpots=Array.from(vm.runInContext('touristSpots',approvedContext));
for(const original of approvedSpots.filter(s=>s.id!==ID && s.id!=='mirante-do-baepi')) {
  const actual=currentById.get(original.id);
  // PERF-01A approved correction: keep the historical IMG-01C checks for every
  // other photo, while requiring the exact authorized user photograph.
  if (original.id === 'pico-de-sao-sebastiao') {
    original.image = 'assets/images/pico-de-sao-sebastiao-autoral-original.jpeg';
    original.images = [original.image];
    original.photoCredit = 'Acervo pessoal — Ilhabela Trip';
    original.photoSource = '/assets/images/pico-de-sao-sebastiao-autoral-original.jpeg';
  }

  for(const key of ['image','photoCredit','photoSource'])assert.equal(actual[key],original[key],original.id+' '+key);
  assert.deepEqual(Array.from(actual.images||[]),Array.from(original.images||[]),original.id+' gallery');
  assert.equal(JSON.stringify(actual.translations),JSON.stringify(original.translations),original.id+' translations');
  assert.equal(JSON.stringify(actual.coords),JSON.stringify(original.coords),original.id+' coordinates');
}
for (const id of [
  'praia-do-barreiros','praia-de-santa-tereza','praia-da-ponta-azeda','poco-do-furado',
  'mirante-do-morro-da-cruz','mirante-dos-barreiros'
])assert.notEqual(currentById.get(id).image,'assets/images/attraction-placeholder.svg',id+' approved later photograph');

const changes=execFileSync('git',['diff','--name-status','6c48fd8','--','assets/images/'],{cwd:ROOT,encoding:'utf8'}).trim();
assert.equal(changes,'','all approved image files preserved during technical correction');
const bytes=fs.readFileSync(path.join(ROOT,IMAGE));
assert(bytes.length>20000,'photo must be nontrivial');
assert.equal(bytes.subarray(0,4).toString('ascii'),'RIFF');
assert.equal(bytes.subarray(8,12).toString('ascii'),'WEBP');

const page=fs.readFileSync(path.join(ROOT,'lugares',ID,'index.html'),'utf8');
const full='https://ilhabelatrip.com/'+IMAGE;
for (const marker of [
  '<img class="hero" src="/'+IMAGE+'"',
  '<meta property="og:image" content="'+full+'">',
  '<meta name="twitter:image" content="'+full+'">',
  SOURCE, 'CC BY-SA 4.0', LICENSE, newSpot.photoCaption.pt.replace(/'/g,'&#39;')
])assert(page.includes(marker),ID+' static page missing '+marker);
const schema=JSON.parse(page.split('<script type="application/ld+json">')[1].split('</script>')[0]);
assert.equal(JSON.stringify(schema.image),JSON.stringify([full]));
function imageForCard(html) {
  const card=[...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)]
    .map(m=>m[0]).find(a=>a.includes('href="/lugares/'+ID+'/"'));
  return card?.match(/<img\b[^>]*\bsrc="([^"]+)"/)?.[1] ?? null;
}
for(const hub of ['o-que-fazer/index.html','cachoeiras/index.html']) {
  const html=fs.readFileSync(path.join(ROOT,hub),'utf8');
  assert.equal(imageForCard(html),'/'+IMAGE,ID+' hub '+hub);
}
assert(fs.readFileSync(path.join(ROOT,'index.html'),'utf8').includes('attraction-photos.js?v=1.3'));
assert.equal(entry.images[0],IMAGE);
console.log('IMG-01C OK: Poço Fundo access sign licensed and correctly identified; existing attractions and remaining placeholders preserved.');
