const assert = require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'..');
const fixture=require('./fixtures/waterfall-safety-overrides.json');
const ids=['cachoeira-do-gato','cachoeira-da-friagem','cachoeira-dos-tres-tombos'];
const langs=['pt','en','fr','es','he'];
const load=read=>{
 const ctx=vm.createContext({console});
 for(const file of ['data.js','additional-spots.js'])vm.runInContext(read(file),ctx,{filename:file});
 return JSON.parse(vm.runInContext('JSON.stringify({touristSpots,servicesData,routingGateways})',ctx));
};
const now=load(file=>fs.readFileSync(path.join(ROOT,file),'utf8'));
const before=load(file=>execFileSync('git',['show',fixture.baseCommit+':'+file],{cwd:ROOT,encoding:'utf8',maxBuffer:10*1024*1024}));
assert.equal(now.touristSpots.length,50);
assert.equal(now.servicesData.length,129);
assert.equal(now.servicesData.filter(s=>s.category==='food').length,68);
assert.deepEqual(now.servicesData,before.servicesData,'all 129 service entries preserved');
assert.deepEqual(now.routingGateways,before.routingGateways,'all routing gateways preserved');
assert.deepEqual(now.touristSpots.filter(s=>!ids.includes(s.id)),before.touristSpots.filter(s=>!ids.includes(s.id)),'47 remaining attractions unchanged');
const access=JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/attraction-access-copy.json'),'utf8'));
const oldAccess=JSON.parse(execFileSync('git',['show',fixture.baseCommit+':scripts/attraction-access-copy.json'],{cwd:ROOT,encoding:'utf8'}));
assert.deepEqual(Object.fromEntries(Object.entries(access).filter(([id])=>!['cachoeira-do-gato','cachoeira-da-friagem'].includes(id))),
 Object.fromEntries(Object.entries(oldAccess).filter(([id])=>!['cachoeira-do-gato','cachoeira-da-friagem'].includes(id))),
 'all other access copy and verified Tres Tombos gateway wording unchanged');
for(const id of ids){
 const spot=now.touristSpots.find(x=>x.id===id),old=before.touristSpots.find(x=>x.id===id),expected=fixture.attractions[id];
 assert(spot&&old&&expected,id+' exists');
 for(const key of Object.keys(old)){
  if(['tags','specs','translations'].includes(key)) continue;
  assert.deepEqual(spot[key],old[key],id+'.'+key+' facts, image, coordinates and route preserved');
 }
 for(const key of ['tags','specs','translations'])assert.deepEqual(spot[key],expected[key],id+'.'+key+' exact five-language reviewed copy');
 assert.deepEqual(Object.keys(spot.translations).sort(),langs.slice().sort(),id+' complete locales');
 const page=fs.readFileSync(path.join(ROOT,'lugares',id,'index.html'),'utf8'),pt=spot.translations.pt;
 const desc=pt.description.replace(/\s+/g,' ').trim().slice(0,220);
 assert(page.includes('<meta name="description" content="'+desc+'"'),id+' meta matches');
 assert(page.includes('<meta property="og:description" content="'+desc+'"'),id+' OG matches');
 assert(page.includes('<meta name="twitter:description" content="'+desc+'"'),id+' Twitter matches');
 assert(page.includes('<p>'+pt.description+'</p>'),id+' hero copy matches');
 for(const v of pt.highlights)assert(page.includes('<li>'+v+'</li>'),id+' highlight missing: '+v);
 const schema=JSON.parse(page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema.description,pt.description,id+' schema description');
 assert.deepEqual(schema.image,['https://ilhabelatrip.com/'+spot.image],id+' image unchanged');
 assert.deepEqual([schema.geo.latitude,schema.geo.longitude],spot.coords,id+' coordinates unchanged');
 assert(page.includes('href="/?spot='+id+'"'),id+' CTA unchanged');
 assert(!page.includes('Poço raso e seguro')&&!page.includes('Poço amplo para banho refrescante'),id+' no obsolete bathing invitation');
}
assert(access['cachoeira-do-gato'].copy.includes('Ponta do Gato'));
assert(access['cachoeira-da-friagem'].copy.includes('Alameda dos Pássaros'));
assert(access['cachoeira-dos-tres-tombos'].copy===oldAccess['cachoeira-dos-tres-tombos'].copy);
const gato=now.touristSpots.find(x=>x.id==='cachoeira-do-gato');
const friagem=now.touristSpots.find(x=>x.id==='cachoeira-da-friagem');
const tombos=now.touristSpots.find(x=>x.id==='cachoeira-dos-tres-tombos');
assert.equal(gato.specs.difficulty,'moderate');
assert.equal(friagem.specs.difficulty,'hard');
assert.equal(tombos.specs.difficulty,'easy');
for(const lang of langs){
 assert(gato.translations[lang].description.includes('Poço do Gordo')||gato.translations[lang].description.includes('פוסו דו גורדו'),lang+' Gato swimming location');
 assert(friagem.translations[lang].description.includes('1h30')||friagem.translations[lang].description.includes('1.5')||friagem.translations[lang].description.includes('1 h 30')||friagem.translations[lang].description.includes('שעה וחצי'),lang+' Friagem duration');
 assert(tombos.translations[lang].highlights[3],lang+' third pool warning');
}
console.log('Waterfall safety: 3 × 5 locales, metadata, original access/route/image preservation, 129 services, zero unrelated changes OK.');
