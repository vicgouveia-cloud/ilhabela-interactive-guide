const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const baseline = require('./fixtures/ondas-do-mar-preservation.json');
const context = vm.createContext({console});
for (const file of ['data.js', 'additional-spots.js', 'service-taxonomy.js', 'translations.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename: file});
}
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const services = vm.runInContext('servicesData', context);
assert.equal(Object.keys(baseline.services).length, 129);
assert.equal(new Set(services.map(service => service.id)).size, services.length);
for (const [id, digest] of Object.entries(baseline.services)) {
  assert.equal(hash(services.find(service => service.id === id)), digest, `Existing service changed: ${id}`);
}
const added = services.filter(service => !Object.hasOwn(baseline.services, service.id));
assert.equal(added.length, 1, 'Exactly Ondas do Mar must be added');
if (added.length) {
  assert.equal(added[0].id, 'ondas-do-mar');
  assert.equal(added[0].category, 'stay');
  assert.equal(added[0].phone, '12991264617');
  assert.equal(added[0].instagram, '@suitesondasdomar');
  assert.equal(added[0].sourceUrl, 'https://www.instagram.com/suitesondasdomar/');
  assert.equal(added[0].whatsapp, undefined, 'WhatsApp not verified');
  assert.equal(added[0].image, undefined, 'Photo rights pending');
  assert.equal(added[0].baseLocation.address, 'Ilhabela - SP', 'Exact street address pending official corroboration');
  assert.deepEqual(Array.from(added[0].activities), ['lodging']);
  for (const lang of ['pt', 'en', 'fr', 'es', 'he']) {
    assert(added[0].translations?.[lang]?.description, `Missing description: ${lang}`);
    assert(added[0].translations?.[lang]?.type, `Missing type: ${lang}`);
  }
}
assert.equal(services.filter(service => service.category === 'food').length, 68);
for (const [key, expression] of [['attractions', 'touristSpots'], ['taxonomy', 'serviceTaxonomy'], ['translations', 'translations']]) {
  assert.equal(hash(vm.runInContext(expression, context)), baseline[key], `${key} changed`);
}
console.log(`Ondas do Mar preservation OK: 129 existing services, 68 food; ${added.length} additions. This does not validate publication readiness or sources.`);
