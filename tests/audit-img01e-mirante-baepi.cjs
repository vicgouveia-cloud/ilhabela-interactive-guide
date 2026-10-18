const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const ID = 'mirante-do-baepi';
const IMAGE = 'assets/images/mirante-do-baepi_commons.webp';
const SOURCE = 'https://commons.wikimedia.org/wiki/File:Landscape_of_S%C3%A3o_Sebasti%C3%A3o.jpg';
const LICENSE = 'https://creativecommons.org/publicdomain/mark/1.0/';
const PENDING_IDS = [
  'praia-do-barreiros',
  'praia-de-santa-tereza',
  'praia-da-ponta-azeda',
  'poco-do-furado',
  'mirante-do-morro-da-cruz',
  'mirante-dos-barreiros'
];

function loadCatalog() {
  const ctx = vm.createContext({ console });
  for (const f of ['data.js', 'additional-spots.js', 'attraction-photos.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  }
  return {
    spots: Array.from(vm.runInContext('touristSpots', ctx)),
    library: vm.runInContext('verifiedPhotoLibrary', ctx)
  };
}

const { spots, library } = loadCatalog();
assert.equal(spots.length, 50, 'Catalog should have 50 spots');
assert.equal(Object.keys(library).length, 34, 'Approved IMG-03 library has 34 verified photo entries');

const spot = spots.find(s => s.id === ID);
assert(spot, 'Spot not found: ' + ID);
const entry = library[ID];
assert(entry, 'Library entry missing for: ' + ID);

// 1. Verify runtime attraction data
assert.equal(spot.image, IMAGE, 'Image mismatch');
assert.deepEqual(Array.from(spot.images), [IMAGE], 'Gallery mismatch');
assert.equal(spot.photoCredit, 'Henrique Oliveira · Wikimedia Commons');
assert.equal(spot.photoSource, SOURCE);
assert.equal(spot.photoLicense, 'Domínio Público');
assert.equal(spot.photoLicenseUrl, LICENSE);
assert(spot.photoProvenance.includes('Henrique Oliveira via Flickr (PD Mark)'));
assert(spot.photoAdaptation.includes('WebP'));

// 2. Multilingual captions
for (const lang of ['pt', 'en', 'fr', 'es', 'he']) {
  assert(typeof spot.photoCaption?.[lang] === 'string' && spot.photoCaption[lang].trim().length > 0, `Missing caption for ${lang}`);
}
assert(spot.photoCaption.pt.includes('Deck de observação'));
assert(spot.photoCaption.pt.includes('Trilha do Baepi'));

// 3. Asset integrity
const assetPath = path.join(ROOT, IMAGE);
assert(fs.existsSync(assetPath), 'Asset file does not exist: ' + assetPath);
const buf = fs.readFileSync(assetPath);
assert(buf.length > 50000, 'Asset file too small: ' + buf.length);
assert.equal(buf.subarray(0, 4).toString('ascii'), 'RIFF', 'Not RIFF container');
assert.equal(buf.subarray(8, 12).toString('ascii'), 'WEBP', 'Not WEBP format');

// 4. Static attraction page
const staticPage = fs.readFileSync(path.join(ROOT, 'lugares', ID, 'index.html'), 'utf8');
const fullUrl = 'https://ilhabelatrip.com/' + IMAGE;
assert(staticPage.includes(`src="/${IMAGE}"`), 'Static page missing hero img');
assert(staticPage.includes(`<meta property="og:image" content="${fullUrl}">`), 'Static page missing og:image');
assert(staticPage.includes(`<meta name="twitter:image" content="${fullUrl}">`), 'Static page missing twitter:image');
assert(staticPage.includes(SOURCE), 'Static page missing photo source link');
assert(staticPage.includes(LICENSE), 'Static page missing license URL');
assert(staticPage.includes('Domínio Público'), 'Static page missing license name');
assert(staticPage.includes(spot.photoCaption.pt), 'Static page missing PT caption');

const schemaMatch = staticPage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(schemaMatch, 'Missing schema script');
const schema = JSON.parse(schemaMatch[1]);
assert.deepEqual(schema.image, [fullUrl], 'Schema image array mismatch');

// 5. Discovery hub card
const discoveryHub = fs.readFileSync(path.join(ROOT, 'o-que-fazer/index.html'), 'utf8');
const cardMatch = [...discoveryHub.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)]
  .map(m => m[0]).find(a => a.includes(`href="/lugares/${ID}/"`));
assert(cardMatch, 'Card missing in discovery hub');
const cardImg = cardMatch.match(/<img\b[^>]*\bsrc="([^"]+)"/)?.[1];
assert.equal(cardImg, '/' + IMAGE, 'Discovery hub card image mismatch');

// 6. Remaining 6 placeholders
for (const pId of PENDING_IDS) {
  const pSpot = spots.find(s => s.id === pId);
  assert(pSpot, 'Pending spot missing: ' + pId);
  assert.notEqual(pSpot.image, 'assets/images/attraction-placeholder.svg', `${pId}: approved IMG-02/03 photograph retained`);
  assert(library[pId], `${pId}: provenance required`);
}

// 7. Index cache version
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
assert(indexHtml.includes('attraction-photos.js?v=1.3'), 'index.html cache version should be v=1.3');

console.log('IMG-01E OK: Mirante do Baepi fully verified with Public Domain photography; six later approved photographs and provenance retained.');
