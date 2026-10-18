// Protect visitor safety and source provenance in the three corrected attraction entries.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const context=vm.createContext({console});
for(const script of ['data.js','additional-spots.js','attraction-photos.js']) vm.runInContext(fs.readFileSync(path.join(ROOT,script),'utf8'),context);
const spots=JSON.parse(vm.runInContext('JSON.stringify(touristSpots)',context));
const baseline=JSON.parse(vm.runInContext('JSON.stringify(touristSpots.map(s=>({id:s.id,image:s.image,coords:s.coords,routing:s.routing})))',context));
assert.equal(spots.length,50);
assert.equal(spots.filter(s=>s.image==='assets/images/attraction-placeholder.svg').length,0);
const cases=[
{ id:'cachoeira-do-gato', must:['Poço do Gordo','somente para contemplação'],words:['viewing only','contemplation','contemplación','לצפייה'],source:'https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-do-gato/' },
{ id:'cachoeira-da-friagem',must:['Monitoria obrigatória','1h30 a 2h'],words:['mandatory','obligatoire','obligatorio','חובה'],source:'https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-da-friagem/' },
{ id:'cachoeira-dos-tres-tombos',must:['pedras escorregadias','terceira queda não tem poço'],words:['slippery','glissants','resbaladizas','חלקלקים'],source:'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/16294/cachoeiras-em-ilhabela-conheca-7-opcoes-de-facil-acesso'}
];
for(const item of cases){
 const spot=spots.find(s=>s.id===item.id);assert(spot,'missing attraction '+item.id);
 const pt=spot.translations.pt;
 for(const part of item.must)assert(pt.description.toLowerCase().includes(part.toLowerCase()),item.id+': PT safety '+part);
 for(const lang of ['pt','en','fr','es','he']) {
  const t=spot.translations[lang];
  assert(t?.description?.length>90 && t?.highlights?.length===4 && t?.specs?.duration && t?.specs?.access,item.id+': missing locale '+lang);
 }
 for(const [lang,word] of ['en','fr','es','he'].map((l,i)=>[l,item.words[i]])) {
  assert(spot.translations[lang].description.toLowerCase().includes(word.toLowerCase()),item.id+': missing translated safety '+lang);
 }
 const html=fs.readFileSync(path.join(ROOT,'lugares',item.id,'index.html'),'utf8');
 assert(html.includes('<meta name="description" content="'+pt.description+'">'),item.id+': stale SEO meta');
 assert(html.includes('<h2>Como chegar</h2>'),item.id+': missing access section');
 assert(html.includes(pt.highlights[0]),item.id+': stale safety highlights');
 const json=JSON.parse(html.match(/<script type="application\\/ld\\+json">([\\s\\S]*?)<\\/script>/)[1]);
 assert.equal(json.description,pt.description,item.id+': schema description changed independently');
}
for(const entry of baseline) {
 const current=spots.find(s=>s.id===entry.id);
 assert.equal(current.image,entry.image,entry.id+': image changed');
 assert.deepEqual(current.coords,entry.coords,entry.id+': coordinates changed');
 assert.deepEqual(current.routing,entry.routing,entry.id+': routing changed');
}
console.log('Waterfall safety: three attractions, five locales, static metadata, unchanged coordinates/routing/images OK');
