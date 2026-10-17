const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const ctx = vm.createContext({ console });

for (const file of ['data.js', 'additional-spots.js', 'service-taxonomy.js', 'translations.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
}

const services = vm.runInContext('servicesData', ctx);
const taxonomy = vm.runInContext('serviceTaxonomy', ctx);
const translations = vm.runInContext('translations', ctx);
const ids = services.map(s => s.id);

// 1. Total count and uniqueness
assert.equal(services.length, 125, 'Total services must be 125 (124 existing + Fast Go Drive)');
assert.equal(new Set(ids).size, 125, 'All service IDs must be unique');

// 2. Category distribution
const byCat = {};
services.forEach(s => { byCat[s.category] = (byCat[s.category] || 0) + 1; });
assert.equal(byCat.mobility, 14, '14 services under category mobility');
assert.equal(byCat.essentials, 19, '19 services under category essentials');
assert.equal(byCat.food, 64, '64 services under category food');
assert.equal(byCat.stay, 10, '10 services under category stay');
assert.equal(byCat.tour, 12, '12 services under category tour');
assert.equal(byCat.diving, 5, '5 services under category diving');
assert.equal(byCat.experience, 1, '1 service under category experience');

// 3. Mobility verification (14 records)
const expectedMobilityIds = [
  'caicara-beach-bike',
  'webtur-ilhabela',
  'localiza-sao-sebastiao',
  'nova-aluguel-de-carros',
  'easy-aluguel-de-bike',
  'aquabus-ilhabela',
  'onibus-municipal-expresso-fenix',
  'travessia-balsa-ilhabela',
  'jesse-locadora-veiculos',
  'ponto-de-taxi-balsa',
  'ponto-de-taxi-vila',
  'transporte-por-aplicativo-info',
  'fast-go-drive',
  'transfer-executivo-gru-ilhabela'
];

for (const id of expectedMobilityIds) {
  const s = services.find(item => item.id === id);
  assert(s, 'Mobility service missing: ' + id);
  assert.equal(s.category, 'mobility', id + ' must be in category mobility');
  assert(s.activities && s.activities.length > 0, id + ' missing activities');
  for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
    const tr = s.translations?.[lang];
    assert(tr && tr.type && tr.description, id + ' missing translation in ' + lang);
  }
}

// 4. Fast Go Drive specific checks
const fastGo = services.find(s => s.id === 'fast-go-drive');
assert(fastGo, 'Fast Go Drive entity must exist');
assert.equal(fastGo.category, 'mobility');
assert.equal(fastGo.practicalType, 'app-transport');
assert.equal(fastGo.recommended, true, 'Fast Go Drive must be recommended: true');
assert.equal(fastGo.phone, '12981879636');
assert.equal(fastGo.phoneDisplay, '(12) 98187-9636');
assert.equal(fastGo.whatsapp, '12981879636');
assert.equal(fastGo.instagram, '@fastgodrive_');
assert.equal(fastGo.url, 'https://fastgodrive.com.br/');
assert(!fastGo.baseLocation?.nearSpotId, 'Fast Go Drive must not have nearSpotId proxy link');
for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  const tr = fastGo.translations[lang];
  assert(tr.description.includes('Fast Go Drive') || tr.description.length > 30, 'Fast Go Drive description in ' + lang);
  assert(Array.isArray(tr.tags) && tr.tags.length > 0, 'Fast Go Drive tags in ' + lang);
}

// 5. Essentials practical groups audit (19 services, all covered)
const essentials = services.filter(s => s.category === 'essentials');
assert.equal(essentials.length, 19);

const healthServices = essentials.filter(s => (s.activities || []).some(a => ['hospital', 'emergency-care', 'pharmacy', 'public-health'].includes(a)));
assert.equal(healthServices.length, 4, 'Health services count must be 4');

const coworkingServices = essentials.filter(s => (s.activities || []).includes('coworking'));
assert.equal(coworkingServices.length, 3, 'Coworking services count must be 3');

const laundryServices = essentials.filter(s => (s.activities || []).includes('laundry'));
assert.equal(laundryServices.length, 3, 'Laundry services count must be 3');

const nauticalServices = essentials.filter(s => (s.activities || []).some(a => ['nautical-support', 'marina'].includes(a)));
assert.equal(nauticalServices.length, 2, 'Nautical/marina services count must be 2');

const supermarketServices = essentials.filter(s => (s.activities || []).some(a => ['groceries', 'supermarket', 'beverages', 'liquor-store', 'convenience'].includes(a)));
assert.equal(supermarketServices.length, 4, 'Supermarket/groceries count must be 4');

const touristInfoServices = essentials.filter(s => (s.activities || []).some(a => ['tourist-information', 'visitor-support'].includes(a)));
assert.equal(touristInfoServices.length, 2, 'Tourist info count must be 2');

const equipmentServices = essentials.filter(s => (s.activities || []).includes('equipment-rental'));
assert.equal(equipmentServices.length, 1, 'Equipment rental count must be 1');

// Verify all 19 essentials are in at least one group
const allGroupedIds = new Set([
  ...healthServices.map(s => s.id),
  ...coworkingServices.map(s => s.id),
  ...laundryServices.map(s => s.id),
  ...nauticalServices.map(s => s.id),
  ...supermarketServices.map(s => s.id),
  ...touristInfoServices.map(s => s.id),
  ...equipmentServices.map(s => s.id)
]);
assert.equal(allGroupedIds.size, 19, 'All 19 essentials services must be accounted for in practical groups');

// 6. Translations check
for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  assert(translations[lang]?.servicesMobility, 'Missing servicesMobility key in ' + lang);
}

// 7. Security and exclusion checks
assert(!services.some(s => s.id === 'ruda-destinos' || s.name === 'Rudá Destinos'), 'Rudá Destinos must remain excluded');

console.log('SVC-ESSENTIALS-01 AUDIT PASSED: 125 total services, 14 standalone mobility, 19 reorganized essentials, Fast Go Drive verified.');
