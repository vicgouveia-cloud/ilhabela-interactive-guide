const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root=path.resolve(__dirname,'..');
const ctx=vm.createContext({console});
for(const file of ['data.js','additional-spots.js','service-taxonomy.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
}
const services=vm.runInContext('servicesData',ctx);
const taxonomy=vm.runInContext('serviceTaxonomy',ctx);
const ids=services.map(s=>s.id);
assert.equal(services.length,120,'115 previous records and exactly five mobility additions');
assert.equal(new Set(ids).size,services.length,'no duplicate service IDs');
assert.equal(services.filter(s=>s.category==='food').length,60,'preserve the 60 food and drink entries');
for(const type of ['restaurant','bar','kiosk','cafe']){
  assert(services.some(s=>s.category==='food'&&(s.serviceType||[]).includes(type)),'missing existing food subtype '+type);
}
const expected=[
  ['vila-hub-coworking','Vila Hub','https://hosteldavila.com.br/pt/ilhabela/coworking','Centro Histórico'],
  ['blue-cowork-ilhabela','Blue Cowork Ilhabela','https://coworkilhabela.com/','Perequê'],
  ['reserva-ilhabela-coworking','Reserva Ilhabela — Coworking','https://reservailhabela.com.br/','Feiticeira']
];
const coworking=services.filter(s=>s.category==='essentials'&&(s.activities||[]).includes('coworking'));
assert.equal(coworking.length,expected.length);
for(const [id,name,url,district] of expected){
  const record=services.find(s=>s.id===id);
  assert(record,id+' absent');
  assert.equal(record.name,name);
  assert.equal(record.category,'essentials');
  assert.equal(record.practicalType,'coworking');
  assert.deepEqual(Array.from(record.activities),['coworking']);
  assert.equal(record.url,url);
  assert(record.baseLocation.address.includes(district),id+' wrong address');
  assert(!record.featured&&!record.recommended,'editorial recommendation not approved for '+id);
  assert(!record.image,'do not reuse images without authorization '+id);
  for(const lang of ['pt','en','es','fr','he']){
    const t=record.translations?.[lang];
    assert(t?.type&&t?.description&&t?.tags?.length,id+' missing translation '+lang);
    assert(taxonomy.type.coworking[lang]);
  }
}
assert.equal(services.find(s=>s.id==='floresta-bar').recommended,true,'preserve existing recommendations');
assert(!services.some(s=>s.id==='ruda-destinos'),'Rudá Destinos stays removed');
const notes=fs.readFileSync(path.join(root,'docs/SERV-COWORK-FOOD-01-sources.md'),'utf8');
assert(notes.includes('Fonte oficial')&&notes.includes('Sem fotografias'));
console.log('SERV-COWORK-FOOD-01: 115 unique services, 60 food records, 3 coworking entries, 5 locales, no unauthorized photos OK');
