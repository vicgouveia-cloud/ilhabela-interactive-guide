const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const ctx=vm.createContext({console});
for(const name of ['data.js','additional-spots.js','service-taxonomy.js','translations.js']){
  vm.runInContext(fs.readFileSync(path.join(ROOT,name),'utf8'),ctx,{filename:name});
}
const services=vm.runInContext('servicesData',ctx);
const taxonomy=vm.runInContext('serviceTaxonomy',ctx);
const translations=vm.runInContext('translations',ctx);
const cases=[
 ['hostel-da-vila','stay','assets/images/hostel-da-vila_oficial.webp'],
 ['floresta-bar','food','assets/images/floresta-bar_oficial.webp'],
 ['aula-yoga-hostel-da-vila','experience','assets/images/aula-yoga-hostel-da-vila_oficial.webp']
];
assert.equal(services.length,112,'expected 109 historical services plus three approved records');
assert.equal(new Set(services.map(s=>s.id)).size,112,'service IDs must remain unique');
for(const [id,category,image] of cases){
  const row=services.find(s=>s.id===id);
  assert(row,id+': missing');
  assert.equal(row.category,category);
  assert.equal(row.image,image);
  assert.equal(row.imageCredit,'Hostel da Vila');
  assert.equal(row.operatorGroupId,'grupo-hostel-da-vila');
  assert(row.url.startsWith('https://www.hosteldavila.com.br/'));
  for(const lang of ['pt','en','es','fr','he']) {
    assert(row.translations?.[lang]?.description,id+': description missing for '+lang);
    assert(row.translations?.[lang]?.type,id+': type missing for '+lang);
  }
  const data=fs.readFileSync(path.join(ROOT,image));
  assert(data.length>20000,id+': image unusually small');
  assert.equal(data.subarray(0,4).toString('ascii'),'RIFF');
  assert.equal(data.subarray(8,12).toString('ascii'),'WEBP');
}
const hostel=services.find(s=>s.id==='hostel-da-vila');
const bar=services.find(s=>s.id==='floresta-bar');
const yoga=services.find(s=>s.id==='aula-yoga-hostel-da-vila');
assert.equal(hostel.stayType,'hostel');
assert.deepEqual(Array.from(bar.serviceType),['bar']);
assert(bar.featured && bar.recommended && bar.presentation==='featured');
assert.equal(yoga.experienceType,'wellness');
assert(!services.some(s=>s.operatorGroupId==='grupo-hostel-da-vila'&&['diving','tour'].includes(s.category)),'pending tours or diving added');
assert(!services.some(s=>s.operatorGroupId==='grupo-hostel-da-vila'&&(s.activities||[]).includes('coworking')),'coworking not approved in this lot');
for(const lang of ['pt','en','es','fr','he']){
  for(const key of ['hostel','hotel','pousada','alternative'])assert(taxonomy.stayType[key]?.[lang]);
  assert(taxonomy.experienceType.wellness?.[lang]);
  assert(translations[lang]?.servicesExperiences,'missing category translation '+lang);
}
const doc=fs.readFileSync(path.join(ROOT,'docs/SERV-HOSTEL-VILA-01-provenance.md'),'utf8');
assert(doc.includes('reutilização'),'rights caveat required');
console.log('SERV-HOSTEL-VILA-01 OK: 112 services, three verified WebP images, five languages, recommended bar and pending items excluded');
