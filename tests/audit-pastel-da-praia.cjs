// SERV-PASTEL-DA-PRAIA: exact identity and address without unlicensed images.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'..');
const BASE='67e11246e6fbfb623a7dcfb246540f8b4d8b5d09';
function load(reader){
  const ctx=vm.createContext({console});
  for(const f of ['data.js','additional-spots.js','service-taxonomy.js'])
    vm.runInContext(reader(f),ctx,{filename:f});
  return JSON.parse(vm.runInContext('JSON.stringify({services:servicesData,taxonomy:serviceTaxonomy,touristSpots})',ctx));
}
const current=load(f=>fs.readFileSync(path.join(ROOT,f),'utf8'));
const baseline=load(f=>execFileSync('git',['show',BASE+':'+f],{cwd:ROOT,encoding:'utf8',maxBuffer:12e6}));
const ID='pastel-da-praia';
assert.equal(baseline.services.length,129);
assert.equal(baseline.services.filter(s=>s.category==='food').length,68);
assert.equal(current.services.length,130,'one service added');
assert.equal(current.services.filter(s=>s.category==='food').length,69,'one food service added');
assert.equal(new Set(current.services.map(s=>s.id)).size,130,'no duplicate IDs');
assert.deepEqual(current.services.filter(s=>s.id!==ID),baseline.services,'original 129 services unmodified');
assert.deepEqual(current.taxonomy,baseline.taxonomy,'taxonomy remains unchanged');
assert.deepEqual(current.touristSpots,baseline.touristSpots,'attractions unaffected');
const s=current.services.find(x=>x.id===ID);
assert(s,'new service not found');
assert.equal(s.name,'Pastel da Praia');
assert.equal(s.category,'food');
assert.deepEqual(s.serviceType,['streetFood']);
assert(current.taxonomy.type.streetFood,'valid food subtype');
assert.equal(s.baseLocation.nearSpotId,'praia-grande');
assert.equal(s.baseLocation.address,'Av. Riachuelo, 5987, Praia Grande, Ilhabela - SP, 11630-000');
assert(current.touristSpots.some(p=>p.id==='praia-grande'),'beach landmark must exist');
assert.equal(s.phone,'12991038877');
assert.equal(s.phoneDisplay,'(12) 99103-8877');
assert(!s.whatsapp&&!s.instagram&&!s.facebook&&!s.url&&!s.image,'do not invent social accounts or photos');
assert(!s.recommended&&!s.featured,'no unverified recommendation');
assert.deepEqual(s.serviceArea,{scope:'venue',modes:['on-site'],verifiedModes:['on-site']});
for(const lang of ['pt','en','es','fr','he']){
  const tr=s.translations[lang];
  assert(tr && tr.type && tr.description.length>90 && tr.tags.length===3,'missing '+lang);
}
assert.equal(new Set(Object.values(s.translations).map(t=>t.description)).size,5,'all descriptions localized');
const src=fs.readFileSync(path.join(ROOT,'services-directory.js'),'utf8');
assert(src.includes('mapUrl(service)'), 'standard service card Google Maps action preserved');
assert(src.includes("const phone = service.phone ?"),'standard phone action preserved');
const provenance=fs.readFileSync(path.join(ROOT,'docs/SERV-PASTEL-DA-PRAIA.md'),'utf8');
assert(provenance.includes('5987')&&provenance.includes('Festival da Tainha'),'provenance must document identity');
console.log('SERV-PASTEL-DA-PRAIA PASS: 130 services, 69 food, 129 originals, 5 locales, exact address, no unlicensed image.');
