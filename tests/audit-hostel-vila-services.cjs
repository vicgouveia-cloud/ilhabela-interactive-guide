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
assert.equal(services.length,127,'120 previous services plus four verified food additions and Fast Go Drive');
assert.equal(new Set(services.map(s=>s.id)).size,127,'service IDs must remain unique');
assert(!services.some(s=>s.id==='ruda-destinos' || s.name==='Rudá Destinos'),'Rudá Destinos must be removed');
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
assert(bar.featured && bar.recommended && bar.presentation==='compact','Floresta Bar remains recommended without enlarged card');
assert.equal(yoga.experienceType,'wellness');
assert(!services.some(s=>s.operatorGroupId==='grupo-hostel-da-vila'&&['diving','tour'].includes(s.category)),'pending tours or diving added');
assert(!services.some(s=>['hostel-da-vila','floresta-bar','aula-yoga-hostel-da-vila'].includes(s.id)&&(s.activities||[]).includes('coworking')),'existing service records must not be reclassified as coworking');
const recanto=services.find(s=>s.id==='recanto-de-gaya');
assert(recanto,'Recanto de Gaya missing');
assert.equal(recanto.category,'stay');
assert.equal(recanto.stayType,'hostel');
assert.equal(recanto.featured,true);
assert.equal(recanto.recommended,true);
assert.equal(recanto.presentation,'compact');
assert.equal(recanto.contactPreference,'instagram');
assert.equal(recanto.instagram,'@recantodegaya_');
assert.equal(recanto.phone,undefined);
assert.equal(recanto.whatsapp,undefined);
assert.equal(recanto.image,'assets/images/recanto-de-gaya_autorizada.webp','approved photograph must replace placeholder');
assert.equal(recanto.imageCredit,'Imagem fornecida pelo responsável do guia');
const recantoFile=fs.readFileSync(path.join(ROOT,recanto.image));
assert.equal(recantoFile.subarray(0,4).toString('ascii'),'RIFF');
assert.equal(recantoFile.subarray(8,12).toString('ascii'),'WEBP');
assert.equal(recantoFile.length,106288,'verify high-resolution approved image asset');
assert.equal(recanto.baseLocation.address,'Rua Benedito Serafim Sampaio, 320 - Perequê, Ilhabela - SP');
for(const lang of ['pt','en','es','fr','he']) {
 assert(recanto.translations[lang]?.type);
 assert(recanto.translations[lang]?.description);
 assert(recanto.translations[lang]?.tags?.length);
}
for(const lang of ['pt','en','es','fr','he']){
  for(const key of ['hostel','hotel','pousada','alternative'])assert(taxonomy.stayType[key]?.[lang]);
  assert(taxonomy.experienceType.wellness?.[lang]);
  assert(translations[lang]?.servicesExperiences,'missing category translation '+lang);
}
const doc=fs.readFileSync(path.join(ROOT,'docs/SERV-HOSTEL-VILA-01-provenance.md'),'utf8');
assert(doc.includes('reutilização'),'rights caveat required');
console.log('SERV-HOSTEL-VILA-01 OK: 115 services, four verified WebP images, five languages, recommended bar and pending items excluded');
