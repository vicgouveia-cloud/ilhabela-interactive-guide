const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const ctx = vm.createContext({ console });

for (const file of ['data.js', 'additional-spots.js', 'service-taxonomy.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
}

const services = vm.runInContext('servicesData', ctx);
const taxonomy = vm.runInContext('serviceTaxonomy', ctx);
const ids = services.map(s => s.id);

assert.equal(services.length, 125, 'Total services must be 125 (120 previous + 4 food additions + Fast Go Drive)');
assert.equal(new Set(ids).size, 125, 'All service IDs must be unique');

const foodServices = services.filter(s => s.category === 'food');
assert.equal(foodServices.length, 64, 'Food category must have exactly 64 records');

const batch1 = [
  {
    id: 'pescadora-cozinha-do-mar',
    name: 'Pescadora — Cozinha do Mar',
    nearSpotId: 'praia-de-santa-tereza',
    addressSnippet: 'Santa Tereza',
    serviceType: ['restaurant'],
    serviceFormats: ['aLaCarte'],
    serviceSpecialties: ['seafood', 'brazilian'],
    serviceOccasions: ['lunch', 'dinner'],
    phone: '1238962650',
    phoneDisplay: '(12) 3896-2650',
    instagram: '@pescadoracozinhadomar'
  },
  {
    id: 'restaurante-nova-iorqui',
    name: 'Restaurante Nova Iorqui',
    nearSpotId: undefined,
    addressSnippet: 'Borrifos',
    serviceType: ['restaurant', 'bar'],
    serviceFormats: ['aLaCarte', 'snacks'],
    serviceSpecialties: ['seafood', 'brazilian'],
    serviceOccasions: ['lunch', 'afternoon'],
    phone: '1238941833',
    phoneDisplay: '(12) 3894-1833',
    whatsapp: '12981784866',
    instagram: '@novaiorquiilhabela',
    url: 'https://www.novaiorqui.com.br/'
  },
  {
    id: 'espaco-tangara',
    name: 'Espaço Tangará',
    nearSpotId: 'praia-do-jabaquara',
    addressSnippet: 'Praia do Jabaquara',
    serviceType: ['restaurant', 'bar'],
    serviceFormats: ['aLaCarte', 'snacks'],
    serviceSpecialties: ['seafood', 'brazilian'],
    serviceOccasions: ['lunch', 'afternoon'],
    phone: '12996428825',
    phoneDisplay: '(12) 99642-8825',
    whatsapp: '12996428825',
    instagram: '@tangarailhabela',
    url: 'https://tangarailhabela.com.br/'
  },
  {
    id: 'prainha-do-juliao',
    name: 'Prainha do Julião Bar & Restaurante',
    nearSpotId: 'praia-do-juliao',
    addressSnippet: 'Praia do Julião',
    serviceType: ['restaurant', 'bar', 'kiosk'],
    serviceFormats: ['aLaCarte', 'snacks'],
    serviceSpecialties: ['seafood', 'brazilian'],
    serviceOccasions: ['lunch', 'afternoon'],
    phone: '1238941867',
    phoneDisplay: '(12) 3894-1867',
    whatsapp: '12991810008',
    instagram: '@prainhadojuliao',
    url: 'https://prainhadojuliao.com.br/'
  }
];

for (const expected of batch1) {
  const item = services.find(s => s.id === expected.id);
  assert(item, 'Missing batch 1 food service: ' + expected.id);
  assert.equal(item.name, expected.name);
  assert.equal(item.category, 'food');
  assert.deepEqual(Array.from(item.activities), ['food', 'drinks']);
  assert.equal(item.presentation, 'compact');
  assert(!item.featured, expected.id + ' must not have featured flag');
  assert(!item.recommended, expected.id + ' must not have recommended flag');
  assert(!item.image, expected.id + ' must not have unauthorized photo');

  // Location checks
  assert(item.baseLocation?.address, expected.id + ' missing address');
  assert(item.baseLocation.address.includes(expected.addressSnippet), expected.id + ' address does not match expected locality');
  assert.equal(item.baseLocation.nearSpotId, expected.nearSpotId, expected.id + ' nearSpotId mismatch');

  // Taxonomy checks
  assert.deepEqual(Array.from(item.serviceType), expected.serviceType);
  assert.deepEqual(Array.from(item.serviceFormats), expected.serviceFormats);
  assert.deepEqual(Array.from(item.serviceSpecialties), expected.serviceSpecialties);
  assert.deepEqual(Array.from(item.serviceOccasions), expected.serviceOccasions);

  // Contacts
  if (expected.phone) assert.equal(item.phone, expected.phone);
  if (expected.phoneDisplay) assert.equal(item.phoneDisplay, expected.phoneDisplay);
  if (expected.whatsapp) assert.equal(item.whatsapp, expected.whatsapp);
  if (expected.instagram) assert.equal(item.instagram, expected.instagram);
  if (expected.url) assert.equal(item.url, expected.url);

  // Multilingual translations
  for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
    const t = item.translations?.[lang];
    assert(t, expected.id + ' missing translation object for ' + lang);
    assert(typeof t.type === 'string' && t.type.length > 0, expected.id + ' missing type for ' + lang);
    assert(typeof t.description === 'string' && t.description.length > 20, expected.id + ' missing description for ' + lang);
    assert(Array.isArray(t.tags) && t.tags.length >= 2, expected.id + ' missing tags for ' + lang);
  }
}

// Ensure docs/SERV-FOOD-01-sources.md exists
const sourcesDocPath = path.join(root, 'docs/SERV-FOOD-01-sources.md');
assert(fs.existsSync(sourcesDocPath), 'docs/SERV-FOOD-01-sources.md must exist');
const sourcesDoc = fs.readFileSync(sourcesDocPath, 'utf8');
assert(sourcesDoc.includes('Pescadora') && sourcesDoc.includes('Nova Iorqui') && sourcesDoc.includes('Tangará') && sourcesDoc.includes('Prainha do Julião'));

console.log('SVC-FOOD-01A audit: 124 services, 64 food records, 4 batch 1 restaurants verified in 5 languages OK');
