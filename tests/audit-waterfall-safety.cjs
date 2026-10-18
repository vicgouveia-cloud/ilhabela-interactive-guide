// Pin unchanged route/media data to the homologated main commit, not to the same runtime value.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(ROOT,name), 'utf8');
const rawContext = vm.createContext({console});
vm.runInContext(read('data.js'), rawContext, {filename:'data.js'});
const authored = JSON.parse(vm.runInContext('JSON.stringify(touristSpots)', rawContext));
const context = vm.createContext({console});
for (const file of ['data.js','additional-spots.js','attraction-photos.js']) vm.runInContext(read(file), context, {filename:file});
const spots = JSON.parse(vm.runInContext('JSON.stringify(touristSpots)', context));
assert.equal(spots.length, 50);
assert.equal(spots.filter(s=>s.image==='assets/images/attraction-placeholder.svg').length, 0);
const baseline = {
  'cachoeira-do-gato': {image:'assets/images/cachoeira-do-gato_1.jpg',coords:[-23.8589,-45.2819],routing:null},
  'cachoeira-da-friagem': {image:'assets/images/cachoeira-da-friagem_1.jpg',coords:[-23.7456,-45.3411],routing:null},
  'cachoeira-dos-tres-tombos': {image:'assets/images/cachoeira-dos-tres-tombos_1.jpg',coords:[-23.8486,-45.4019],routing:null}
}; // Verified against main@3c125fad186e8c0954663c4dd207c0ab70ac72e7.
const cases = [
 {id:'cachoeira-do-gato',must:['Poço do Gordo','apenas para contemplação'],words:['viewing only','contemplation','contemplación','לצפייה']},
 {id:'cachoeira-da-friagem',must:['Monitoria obrigatória','1h30 a 2h'],words:['mandatory','obligatoire','obligatorio','חובה']},
 {id:'cachoeira-dos-tres-tombos',must:['pedras escorregadias','terceira queda não tem poço','Parque Estadual exige monitoria'],words:['State Park requires a guide','Parc d’État impose un guide','Parque Estatal exige monitor','הפארק המדינתי מחייב מדריך']}
];
const copies = JSON.parse(read('scripts/attraction-access-copy.json'));
const esc = value => String(value??'').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
for (const item of cases) {
 const s=spots.find(v=>v.id===item.id), source=authored.find(v=>v.id===item.id), pinned=baseline[item.id];
 assert(s&&source&&pinned, item.id+': missing spot or reference');
 assert.equal(source.image,pinned.image,item.id+': baseline image changed');
 assert.deepEqual(source.coords,pinned.coords,item.id+': baseline coordinates changed');
 assert.deepEqual(source.routing??null,pinned.routing,item.id+': baseline routing changed');
 assert.deepEqual(s.coords,pinned.coords,item.id+': live coordinates changed');
 const pt=s.translations.pt;
 for(const part of item.must) assert(pt.description.toLowerCase().includes(part.toLowerCase()),item.id+': safety text '+part);
 for(const lang of ['pt','en','fr','es','he']) {
   const tr=s.translations[lang];
   assert(tr?.description?.length>90 && tr?.highlights?.length===4 && tr?.specs?.duration && tr?.specs?.access,item.id+': missing locale '+lang);
 }
 for(const [lang,word] of ['en','fr','es','he'].map((lang,i)=>[lang,item.words[i]])) {
  assert(s.translations[lang].description.toLowerCase().includes(word.toLowerCase()),item.id+': translated safety '+lang);
 }
 const html=read('lugares/'+item.id+'/index.html');
 const meta=esc(pt.description.replace(/\s+/g,' ').trim().slice(0,220));
 assert(html.includes('<meta name="description" content="'+meta+'">'),item.id+': stale meta');
 assert(html.includes('<meta property="og:description" content="'+meta+'">'),item.id+': stale og');
 assert(html.includes('<meta name="twitter:description" content="'+meta+'">'),item.id+': stale twitter');
 assert(html.includes('<h2>Como chegar</h2><p>'+esc(copies[item.id].copy)+'</p>'),item.id+': generator access copy drift');
 assert(html.includes('<h1>'+esc(pt.title)+'</h1><p>'+esc(pt.description)+'</p>'),item.id+': stale body');
 assert(html.includes('<li>'+esc(pt.highlights[0])+'</li>'),item.id+': stale highlights');
 const open='<script type="application/ld+json">',end='</script>',from=html.indexOf(open),to=html.indexOf(end,from+open.length);
 assert(from>=0 && to>from,item.id+': JSON-LD missing');
 const schema=JSON.parse(html.slice(from+open.length,to));
 assert.equal(schema.description,pt.description,item.id+': schema drift');
 assert.equal(schema.geo.latitude,pinned.coords[0],item.id+': schema lat changed');
 assert.equal(schema.geo.longitude,pinned.coords[1],item.id+': schema lon changed');
}
const tombos=spots.find(s=>s.id==='cachoeira-dos-tres-tombos');
const warningWords={pt:'correnteza',en:'currents',fr:'courant',es:'corriente',he:'זרם'};
for(const [lang,word] of Object.entries(warningWords)) assert(tombos.translations[lang].ecoTip.includes(word),'Três Tombos ecoTip safety '+lang);
assert.equal(tombos.specs.difficulty,'moderate');
assert(tombos.specs.duration.includes('Parque Estadual'));
assert(tombos.specs.access.includes('Alameda dos Guapuruvus')&&tombos.specs.access.includes('obrigatória'));
for(const lang of ['pt','en','fr','es','he']) assert(tombos.translations[lang].specs.access.length>65);
console.log('Waterfall safety: 3 attractions, 5 locales, official guide requirement, generated pages and pinned media/routing/coords OK');
