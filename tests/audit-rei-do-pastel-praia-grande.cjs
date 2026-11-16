// SEC-REI-DO-PASTEL: user-supplied neighborhood, no invented map or contacts.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const ROOT = path.resolve(__dirname,'..');
const BASE = '67e11246e6fbfb623a7dcfb246540f8b4d8b5d09';
const sources=['data.js','additional-spots.js','service-taxonomy.js'];
function catalog(read){
 const ctx=vm.createContext({console});
 for(const f of sources)vm.runInContext(read(f),ctx,{filename:f});
 return JSON.parse(vm.runInContext('JSON.stringify({services:servicesData,taxonomy:serviceTaxonomy})',ctx));
}
const now=catalog(f=>fs.readFileSync(path.join(ROOT,f),'utf8'));
const old=catalog(f=>execFileSync('git',['show',BASE+':'+f],{cwd:ROOT,encoding:'utf8',maxBuffer:12e6}));
const ID='rei-do-pastel-praia-grande';
assert.equal(old.services.length,129,'baseline is 129 services');
assert.equal(old.services.filter(s=>s.category==='food').length,68,'baseline is 68 food');
assert.equal(now.services.length,130,'one service added');
assert.equal(now.services.filter(s=>s.category==='food').length,69,'one food record added');
assert.equal(new Set(now.services.map(s=>s.id)).size,130,'no duplicated IDs');
assert.deepEqual(now.services.filter(s=>s.id!==ID),old.services,'all 129 previously approved services, contacts, photos and translations unchanged');
assert.deepEqual(now.taxonomy,old.taxonomy,'taxonomy preserved');
const service=now.services.find(s=>s.id===ID);
assert(service,'new service missing');
assert.equal(service.name,'Rei do Pastel');
assert.equal(service.category,'food');
assert.deepEqual(service.serviceType,['streetFood']);
assert(now.taxonomy.type.streetFood,'type must be listed in taxonomy');
assert.equal(service.baseLocation.nearSpotId,'praia-grande');
assert(service.baseLocation.address.includes('Praia Grande') && service.baseLocation.address.includes('não confirmado'),'no invented street');
assert.equal(service.mapLocationVerified,false,'Google Maps must not point to a different venue');
assert(!service.phone&&!service.whatsapp&&!service.instagram&&!service.url&&!service.image,'no unverified contact or photo');
assert.deepEqual(service.serviceArea.verifiedModes,[],'venue operation has no external evidence');
for(const lang of ['pt','en','es','fr','he']){
 const t=service.translations[lang];
 assert(t&&t.type&&t.description.length>65&&t.tags.length===3,'translation missing '+lang);
}
assert.equal(new Set(Object.values(service.translations).map(t=>t.description)).size,5,'locales must not be copied');
const view=fs.readFileSync(path.join(ROOT,'services-directory.js'),'utf8');
assert(view.includes('hasPhysicalLocation && service.mapLocationVerified !== false'),'unverified-map safeguard not present');
assert(view.includes("service.mapLocationVerified !== false"),'new listing must not inherit an unsafe Google Maps search URL');
const docs=fs.readFileSync(path.join(ROOT,'docs/SERV-REI-DO-PASTEL-PRAIA-GRANDE.md'),'utf8');
assert(docs.includes('Rua Pernambuco') && docs.includes('Piúva') && docs.includes('Praia Grande'));
console.log('REI-DO-PASTEL PASS: 129 unchanged, one provisional food record, five locales, no unverified map, contacts or photos.');
