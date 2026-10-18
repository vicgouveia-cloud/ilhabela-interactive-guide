const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
function load(read) {
  const ctx = vm.createContext({console});
  for (const file of ['data.js','additional-spots.js','service-taxonomy.js']) vm.runInContext(read(file),ctx);
  return JSON.parse(vm.runInContext('JSON.stringify({services:servicesData,taxonomy:serviceTaxonomy})',ctx));
}
const {services,taxonomy} = load(f=>fs.readFileSync(path.join(root,f),'utf8'));
const baseline = load(f=>execFileSync('git',['show',`1a7613e4c0273deca5094a6e5842d9461be50c51:${f}`],{cwd:root,encoding:'utf8',maxBuffer:10e6}));
const ids = ['porto-do-engenho','tempero-da-ilha'];
assert.equal(services.length,129);
assert.equal(services.filter(s=>s.category==='food').length,68);
assert.equal(new Set(services.map(s=>s.id)).size,129);
assert.deepEqual(services.filter(s=>!ids.includes(s.id)),baseline.services,'All 127 previous services remain identical and in order');
const [porto,tempero] = ids.map(id=>services.find(s=>s.id===id));
assert.deepEqual(porto.serviceType,['restaurant','bar']);
assert.deepEqual(porto.serviceFormats,['aLaCarte']);
assert.deepEqual(porto.serviceSpecialties,['seafood','brazilian']);
assert.deepEqual(porto.serviceOccasions,['lunch','afternoon']);
assert.equal(porto.phone,undefined,'Do not choose between conflicting directory phone numbers');
assert.equal(porto.whatsapp,undefined,'No official WhatsApp confirmed');
assert.equal(porto.instagram,'@portodoengenhoilhabela');
assert.equal(porto.baseLocation.address,"Av. Pedro Paula de Moraes, 1146, Engenho D'Água, Ilhabela - SP");
assert.deepEqual(tempero.serviceType,['restaurant','pizzeria','burger']);
assert.deepEqual(tempero.serviceFormats,['buffet','aLaCarte']);
assert.deepEqual(tempero.serviceSpecialties,['pizza','burger']);
assert.deepEqual(tempero.serviceOccasions,['lunch','dinner','night']);
assert.equal(tempero.whatsapp,'12991065523');
assert.equal(tempero.instagram,'@temperoda.ilha');
assert.equal(tempero.url,'https://linktr.ee/temperoda.ilha');
assert.equal(tempero.baseLocation.address,'R. Luiz Ameixeiro, 65, Perequê, Ilhabela - SP');
for(const row of [porto,tempero]) {
  assert.equal(services.filter(s=>s.name===row.name).length,1);
  assert.equal(row.recommended,true);
  assert.equal(row.category,'food');
  assert.deepEqual(row.serviceArea,{scope:'venue',modes:['on-site'],verifiedModes:['on-site']});
  for(const [field,key] of [['serviceType','type'],['serviceFormats','format'],['serviceSpecialties','specialty'],['serviceOccasions','occasion']])
    for(const value of row[field]) assert.ok(taxonomy[key][value],`${row.id}: valid ${field} ${value}`);
  assert.deepEqual(Object.keys(row.translations).sort(),['en','es','fr','he','pt']);
  assert.equal(new Set(Object.values(row.translations).map(t=>t.description)).size,5);
  for(const tr of Object.values(row.translations)) assert.ok(tr.type && tr.description && tr.tags.length===3);
  const record=require('./fixtures/porto-tempero-images.json').find(r=>r.id===row.id);
  assert.equal(row.image,record.path);
  const bytes=fs.readFileSync(path.join(root,row.image));
  assert.equal(bytes.toString('ascii',8,12),'WEBP');
  assert.equal(bytes.length,record.bytes);
  assert.ok(bytes.length<30000,'Optimized local brand image');
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),record.sha256);
}
console.log('PASS Porto/Tempero: 129 services, 68 food, 127 preserved, official brands, verified contacts, taxonomy and 5 languages');
