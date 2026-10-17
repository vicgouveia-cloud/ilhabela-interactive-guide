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

assert.equal(services.length, 120, '115 previous records plus five verified mobility additions');
assert.equal(new Set(ids).size, 120, 'no duplicate service IDs');

const essentials = services.filter(s => s.category === 'essentials');
assert.equal(essentials.length, 32, '32 essential services (including 13 mobility, 3 coworking, 2 marinas, and public essentials)');

const mobilityIds = [
  'travessia-balsa-ilhabela',
  'onibus-municipal-expresso-fenix',
  'aquabus-ilhabela',
  'localiza-sao-sebastiao',
  'nova-aluguel-de-carros',
  'jesse-locadora-veiculos',
  'easy-aluguel-de-bike',
  'caicara-beach-bike',
  'webtur-ilhabela',
  'ponto-de-taxi-balsa',
  'ponto-de-taxi-vila',
  'transporte-por-aplicativo-info',
  'transfer-executivo-gru-ilhabela'
];

for (const id of mobilityIds) {
  const record = services.find(s => s.id === id);
  assert(record, 'Missing mobility service: ' + id);
  assert.equal(record.category, 'essentials', id + ' must be in category essentials');
  assert(record.activities && record.activities.length > 0, id + ' missing activities');
  assert(!record.image || record.image.startsWith('assets/images/'), id + ' invalid image path');
  assert(!record.featured, id + ' must not have featured flag');

  for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
    const t = record.translations?.[lang];
    assert(t && t.type && t.description, id + ' missing translation for ' + lang);
    if (['jesse-locadora-veiculos', 'ponto-de-taxi-balsa', 'ponto-de-taxi-vila', 'transporte-por-aplicativo-info', 'transfer-executivo-gru-ilhabela'].includes(id)) {
      assert(Array.isArray(t.tags) && t.tags.length > 0, id + ' missing tags for ' + lang);
    }
  }
}

// Verify factual cleanups:
const balsa = services.find(s => s.id === 'travessia-balsa-ilhabela');
assert.equal(balsa.url, 'https://semil.sp.gov.br/travessias/', 'Balsa must point to official SEMIL coastal crossings domain');
assert(balsa.baseLocation?.address && balsa.baseLocation.address.includes('Barra Velha'), 'Balsa must have Barra Velha address');

for (const taxiId of ['ponto-de-taxi-balsa', 'ponto-de-taxi-vila']) {
  const taxi = services.find(s => s.id === taxiId);
  assert(!taxi.phone && !taxi.phoneDisplay, taxiId + ' must not have unverified phone numbers');
}

const proxyFreeIds = [
  'jesse-locadora-veiculos',
  'ponto-de-taxi-balsa',
  'nova-aluguel-de-carros',
  'travessia-balsa-ilhabela',
  'onibus-municipal-expresso-fenix',
  'aquabus-ilhabela',
  'transporte-por-aplicativo-info',
  'transfer-executivo-gru-ilhabela'
];
for (const cleanId of proxyFreeIds) {
  const item = services.find(s => s.id === cleanId);
  assert(item, cleanId + ' must exist');
  assert(!item.baseLocation?.nearSpotId, cleanId + ' must not have nearSpotId proxy link');
}

// App transport content checks:
const appInfo = services.find(s => s.id === 'transporte-por-aplicativo-info');
assert(appInfo, 'transporte-por-aplicativo-info must exist');
for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  const desc = appInfo.translations[lang].description;
  assert(!desc.includes('Caiçara Driver'), lang + ' must not mention Caiçara Driver');
  assert(!desc.includes('Woptin'), lang + ' must not mention Woptin');
}
assert(appInfo.translations.pt.description.includes('Fast Go Drive') && appInfo.translations.pt.description.includes('Leva Eu'), 'PT must cite authorized Fast Go Drive and Leva Eu');

// Taxi stands content checks:
for (const taxiId of ['ponto-de-taxi-balsa', 'ponto-de-taxi-vila']) {
  const taxi = services.find(s => s.id === taxiId);
  for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
    const desc = taxi.translations[lang].description;
    assert(desc.includes('0800 770 5221'), taxiId + ' ' + lang + ' must cite official phone 0800 770 5221');
    assert(!desc.toLowerCase().includes('não há telefone') && !desc.toLowerCase().includes('sem telefone'), taxiId + ' ' + lang + ' must not make negative claims about absence of landlines');
    assert(!desc.toLowerCase().includes('administrativ'), taxiId + ' ' + lang + ' must not label 0800 as administrative attendance');
  }
}

// Ensure banned operator Rudá Destinos remains excluded
assert(!services.some(s => s.id === 'ruda-destinos' || s.name === 'Rudá Destinos'), 'Rudá Destinos must stay removed');

// Ensure docs/SERV-MOBILITY-01-sources.md exists and documents Woptin and taxi stand maps policy
const notes = fs.readFileSync(path.join(root, 'docs/SERV-MOBILITY-01-sources.md'), 'utf8');
assert(notes.toLowerCase().includes('mobilidade') && notes.toLowerCase().includes('utilidade pública'));
assert(notes.includes('15717'), 'Sources doc must link to official Prefeitura app regulation news');
assert(notes.includes('setembro de 2025') && notes.includes('Woptin'), 'Sources doc must explain Woptin presence in September 2025 list');
assert(notes.includes('ponto-de-taxi-balsa') && notes.includes('Google Maps'), 'Sources doc must explain taxi stand maps omission');

console.log('SERV-MOBILITY-01: 120 unique services, 32 essentials, 13 mobility services in 5 languages OK');
