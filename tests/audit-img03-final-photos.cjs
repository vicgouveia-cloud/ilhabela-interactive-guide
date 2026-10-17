const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const c = vm.createContext({ console });

for (const file of ['data.js', 'additional-spots.js', 'attraction-photos.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), c, { filename: file });
}

const spots = vm.runInContext('touristSpots', c);
const library = vm.runInContext('verifiedPhotoLibrary', c);

const cases = [
  {
    id: 'poco-do-furado',
    img: 'assets/images/poco-do-furado_sectur.webp',
    source: 'https://www.ilhabela.com.br/cachoeiras/parque-das-cachoeiras/',
    credit: 'Prefeitura de Ilhabela · Sectur Ilhabela',
    categoryHubs: ['cachoeiras/index.html', 'en/cachoeiras/index.html']
  },
  {
    id: 'mirante-do-morro-da-cruz',
    img: 'assets/images/mirante-do-morro-da-cruz_ilhabelacombr.webp',
    source: 'https://www.ilhabela.com.br/dicas/10-mirantes-e-lugares-incriveis-para-fotos-em-ilhabela/',
    credit: 'Acervo Ilhabela.com.br',
    categoryHubs: []
  },
  {
    id: 'mirante-dos-barreiros',
    img: 'assets/images/mirante-dos-barreiros_prefeitura.webp',
    source: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15401/10-mirantes-de-ilhabela-para-apreciar-a-vista-do-arquipelago',
    credit: 'Prefeitura de Ilhabela · Sectur Ilhabela',
    categoryHubs: []
  }
];

assert.equal(spots.length, 50);
assert.equal(Object.keys(library).length, 34);

// Zero placeholders across entire guide
const placeholders = spots.filter(s => s.image === 'assets/images/attraction-placeholder.svg');
assert.equal(placeholders.length, 0, `Expected 0 placeholders, found ${placeholders.length}: ${placeholders.map(p=>p.id).join(', ')}`);

for (const entry of cases) {
  const spot = spots.find(s => s.id === entry.id);
  const photo = library[entry.id];
  assert(spot && photo, entry.id + ': missing photo data in spots or library');
  assert.equal(spot.image, entry.img);
  assert.deepEqual(Array.from(spot.images), [entry.img]);
  assert.equal(spot.photoCredit, entry.credit);
  assert.equal(spot.photoSource, entry.source);
  assert.equal(spot.photoLicense, undefined, 'specific permission must not declare fake public license');

  // Multi-language captions (5 languages: PT, EN, ES, FR, HE)
  for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
    assert(spot.photoCaption?.[lang], `${entry.id}: missing caption for ${lang}`);
    assert(spot.photoCaption[lang].length > 10, `${entry.id}: caption too short for ${lang}`);
  }

  // WebP binary verification
  const bytes = fs.readFileSync(path.join(root, entry.img));
  assert(bytes.length > 20000, entry.id + ': image too small (<20KB)');
  assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');

  // PT Static Page verification
  const html = fs.readFileSync(path.join(root, 'lugares', entry.id, 'index.html'), 'utf8');
  const full = 'https://ilhabelatrip.com/' + entry.img;
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]);
  for (const part of [
    'src="/' + entry.img + '"',
    '<meta property="og:image" content="' + full + '">',
    '<meta name="twitter:image" content="' + full + '">',
    esc(spot.photoCredit),
    esc(spot.photoSource),
    esc(spot.photoCaption.pt)
  ]) {
    assert(html.includes(part), `${entry.id} PT static page missing: ${part}`);
  }

  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(schema.image, [full]);

  // If EN pilot page exists, verify it
  if (entry.id === 'mirante-do-morro-da-cruz') {
    const enHtml = fs.readFileSync(path.join(root, 'en', 'lugares', entry.id, 'index.html'), 'utf8');
    for (const part of [
      'src="/' + entry.img + '"',
      '<meta property="og:image" content="' + full + '">',
      '<meta name="twitter:image" content="' + full + '">'
    ]) {
      assert(enHtml.includes(part), `${entry.id} EN static page missing: ${part}`);
    }
    const enSchema = JSON.parse(enHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.deepEqual(enSchema.image, [full]);
  }

  // Hubs verification: o-que-fazer and en/o-que-fazer
  for (const hub of ['o-que-fazer/index.html', 'en/o-que-fazer/index.html']) {
    const markup = fs.readFileSync(path.join(root, hub), 'utf8');
    const card = Array.from(markup.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g), v => v[0]).find(v => v.includes(entry.id));
    assert(card, `${entry.id}: card not found in ${hub}`);
    assert(card.includes('src="/' + entry.img + '"'), `${entry.id}: hub image not updated in ${hub}`);
  }

  // Specific category hubs if applicable
  for (const hub of entry.categoryHubs) {
    const markup = fs.readFileSync(path.join(root, hub), 'utf8');
    const card = Array.from(markup.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g), v => v[0]).find(v => v.includes(entry.id));
    assert(card, `${entry.id}: card not found in ${hub}`);
    assert(card.includes('src="/' + entry.img + '"'), `${entry.id}: hub image not updated in ${hub}`);
  }
}

// Provenance file check
const prov = fs.readFileSync(path.join(root, 'docs/IMG-03-provenance.md'), 'utf8');
for (const entry of cases) {
  assert(prov.includes(entry.id), `Provenance missing record for ${entry.id}`);
  assert(prov.includes(entry.img), `Provenance missing image path for ${entry.id}`);
}

console.log('IMG-03: 3 final photos, 5 locales, 3 static pages + 1 EN pilot, 4 hubs, 0 placeholders OK (50/50 attractions complete).');
