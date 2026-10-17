const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const c = vm.createContext({console});
for (const file of ['data.js','additional-spots.js','attraction-photos.js']) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});
const spots = vm.runInContext('touristSpots',c);
const library = vm.runInContext('verifiedPhotoLibrary',c);
const cases = [{"id":"praia-de-santa-tereza","img":"assets/images/praia-de-santa-tereza_prefeitura.webp","url":"https://www.ilhabela.sp.gov.br/imgeditor/Santa%20Tereza%20-%20Ilhabela.jpg"},{"id":"praia-do-barreiros","img":"assets/images/praia-do-barreiros_prefeitura.webp","url":"https://www.ilhabela.sp.gov.br/imgeditor/Praia%20dos%20Barreiros%20-%20Ilhabela.jpg"},{"id":"praia-da-ponta-azeda","img":"assets/images/praia-da-ponta-azeda_prefeitura.webp","url":"https://www.ilhabela.sp.gov.br/imgeditor/Praia%20da%20Ponta%20Azeda%20%E2%80%93%20Ilhabela.jpg"}];
assert.equal(spots.length, 50);
assert.equal(Object.keys(library).length, 34);
for (const entry of cases) {
  const spot = spots.find(s => s.id===entry.id);
  const photo = library[entry.id];
  assert(spot && photo, entry.id+': missing photo data');
  assert.equal(spot.image, entry.img);
  assert.deepEqual(Array.from(spot.images), [entry.img]);
  assert.equal(spot.photoCredit, 'Prefeitura de Ilhabela · Sectur Ilhabela');
  assert.equal(spot.photoSource, "https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15452/conheca-42-praias-de-ilhabela");
  assert.equal(spot.photoLicense, undefined, 'specific permission is not a public license');
  assert(photo.provenance.includes(entry.url), entry.id+': missing precise municipal source');
  for (const lang of ['pt','en','es','fr','he']) assert(spot.photoCaption?.[lang], entry.id+': missing caption '+lang);
  const bytes=fs.readFileSync(path.join(root,entry.img));
  assert(bytes.length>20000, entry.id+': image too small');
  assert.equal(bytes.subarray(0,4).toString('ascii'),'RIFF');
  assert.equal(bytes.subarray(8,12).toString('ascii'),'WEBP');
  const html=fs.readFileSync(path.join(root,'lugares',entry.id,'index.html'),'utf8');
  const full='https://ilhabelatrip.com/'+entry.img;
  for (const part of ['src="/'+entry.img+'"','<meta property="og:image" content="'+full+'">','<meta name="twitter:image" content="'+full+'">',spot.photoCredit,spot.photoSource,spot.photoCaption.pt]) assert(html.includes(part), entry.id+': missing '+part);
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(schema.image,[full]);
  for (const hub of ['o-que-fazer/index.html','praias/index.html']) {
    const markup=fs.readFileSync(path.join(root,hub),'utf8');
    const card=Array.from(markup.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g),v=>v[0]).find(v=>v.includes('href="/lugares/'+entry.id+'/"'));
    assert(card && card.includes('src="/'+entry.img+'"'),entry.id+': hub mismatched '+hub);
  }
}
assert(fs.existsSync(path.join(root,'docs/IMG-PREFEITURA-01-provenance.md')), 'missing provenance and hash record');
console.log('IMG-PREFEITURA-01: 3 images, 5 locales, 3 static pages, 2 hubs OK');
