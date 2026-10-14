const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');
const load = files => {
  const ctx = vm.createContext({ console });
  for (const file of files) vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
  return ctx;
};
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scriptOrder = ['data.js?v=', 'additional-spots.js?v=', 'attraction-photos.js?v=', 'app.js?v='];
let lastPosition = -1;
for (const marker of scriptOrder) {
  const position = index.indexOf(marker);
  assert(position > lastPosition, 'browser script order missing or wrong: ' + marker);
  lastPosition = position;
}
assert(!fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8').includes('const verifiedPhotoLibrary ='), 'old photo library still duplicated in app.js');
for (const file of ['generate-attraction-pages.cjs','generate-discovery-hub.cjs','generate-category-hubs.cjs','generate-itinerary-hubs.cjs']) {
  assert(fs.readFileSync(path.join(ROOT, 'scripts', file), 'utf8').includes("'attraction-photos.js'"), 'generator missing shared library: ' + file);
}

const before = vm.runInContext('touristSpots', load(['data.js', 'additional-spots.js']));
const shared = load(['data.js', 'additional-spots.js', 'attraction-photos.js']);
const spots = vm.runInContext('touristSpots', shared);
const verified = vm.runInContext('verifiedPhotoLibrary', shared);
const original = new Map(Array.from(before, spot => [spot.id, spot]));
const approved = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests/approved-attraction-photo-baseline.json'), 'utf8'));
assert.equal(approved.sourceMain, 'eb8fd9cde593348e2e8199c2b1cd4279dd71acbf');
for (const [id, expected] of Object.entries(approved.assignments)) {
  const spot = spots.find(item => item.id === id);
  assert(spot, 'approved attraction missing: ' + id);
  const images = spot.images?.length ? Array.from(spot.images) : [spot.image];
  assert.deepEqual(images, expected.images, id + ': approved photo assignment/gallery changed');
  assert.equal(spot.photoCredit || null, expected.credit, id + ': approved photo credit changed');
  assert.equal(spot.photoSource || null, expected.source, id + ': approved photo source changed');
}
for (const [imagePath, gitBlobSha] of Object.entries(approved.blobs)) {
  const bytes = fs.readFileSync(path.join(ROOT, imagePath));
  const digest = createHash('sha1').update('blob ' + bytes.length + '\\0').update(bytes).digest('hex');
  assert.equal(digest, gitBlobSha, imagePath + ': approved photo binary changed');
}

assert.equal(spots.length, 50, 'expected 50 attractions');
assert.equal(Object.keys(verified).length, 24, 'preserve all 24 existing verified photo records');
const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]);
const absolute = value => 'https://ilhabelatrip.com/' + value.replace(/^\//, '');
const discovery = fs.readFileSync(path.join(ROOT, 'o-que-fazer/index.html'), 'utf8');
const categories = Object.fromEntries(['praias', 'cachoeiras', 'trilhas'].map(id => [id, fs.readFileSync(path.join(ROOT, id, 'index.html'), 'utf8')]));
const itinerary = fs.readFileSync(path.join(ROOT, 'roteiros/3-dias/index.html'), 'utf8');
const itineraryIds = new Set(['mirante-do-piuva', 'praia-do-juliao', 'praia-da-feiticeira', 'praia-do-curral', 'baia-de-castelhanos', 'praia-do-bonete', 'praia-da-armacao', 'praia-do-sino', 'praia-do-jabaquara', 'centro-historico-vila']);

for (const spot of spots) {
  const existing = original.get(spot.id);
  assert(existing, 'unexpected attraction: ' + spot.id);
  const known = verified[spot.id];
  if (known) {
    assert.equal(spot.image, known.images[0], spot.id + ': shared photo not applied');
    assert.deepEqual(Array.from(spot.images), Array.from(known.images), spot.id + ': gallery changed');
    for (const galleryImage of known.images) assert(fs.existsSync(path.join(ROOT, galleryImage)), spot.id + ': missing gallery asset ' + galleryImage);
    assert.equal(spot.photoCredit, known.credit, spot.id + ': verified credit changed');
    assert.equal(spot.photoSource, known.source, spot.id + ': verified source changed');
    if (known.license || known.licenseUrl || known.provenance || known.adaptation) {
      assert.equal(spot.photoLicense, known.license, spot.id + ': verified license changed');
      assert.equal(spot.photoLicenseUrl, known.licenseUrl, spot.id + ': verified license URL changed');
      assert.equal(spot.photoProvenance, known.provenance, spot.id + ': verified provenance changed');
      assert.equal(spot.photoAdaptation, known.adaptation, spot.id + ': adaptation note changed');
    }
  } else {
    assert.equal(spot.image, existing.image, spot.id + ': unapproved photo changed');
    assert.equal(spot.photoCredit, existing.photoCredit, spot.id + ': existing credit changed');
    assert.equal(spot.photoSource, existing.photoSource, spot.id + ': existing source changed');
    assert.equal(spot.photoLicense, existing.photoLicense, spot.id + ': unapproved license changed');
    assert.equal(spot.photoLicenseUrl, existing.photoLicenseUrl, spot.id + ': unapproved license URL changed');
  }
  assert(fs.existsSync(path.join(ROOT, spot.image)), spot.id + ': missing image file ' + spot.image);
  const html = fs.readFileSync(path.join(ROOT, 'lugares', spot.id, 'index.html'), 'utf8');
  const image = absolute(spot.image);
  assert(html.includes('<img class="hero" src="/' + esc(spot.image) + '"'), spot.id + ': hero differs');
  assert(html.includes('<meta property="og:image" content="' + esc(image) + '">'), spot.id + ': OG differs');
  assert(html.includes('<meta name="twitter:image" content="' + esc(image) + '">'), spot.id + ': Twitter differs');
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(schema.image, [image], spot.id + ': structured data differs');
  if (spot.photoCredit && spot.photoSource) {
    assert(html.includes('Foto: <a href="' + esc(spot.photoSource) + '"'), spot.id + ': missing source');
    assert(html.includes(esc(spot.photoCredit)), spot.id + ': missing credit');
  }
  const card = '<img src="/' + esc(spot.image) + '" alt="' + esc(spot.translations.pt.title) + '" loading="lazy">';
  assert(discovery.includes(card), spot.id + ': discovery hub differs');
  if (categories[spot.category]) assert(categories[spot.category].includes(card), spot.id + ': category hub differs');
  if (itineraryIds.has(spot.id)) assert(itinerary.includes(card), spot.id + ': itinerary hub differs');
}
// Warn (do not fail) when identical bytes are reused by different attractions.
// An intentional shared gallery photograph still deserves an explicit editorial review.
const photoHashes = new Map(), hashedPaths = new Map();
for (const spot of spots) {
  const paths = spot.images?.length ? spot.images : [spot.image];
  for (const imagePath of new Set(paths)) {
    assert(fs.existsSync(path.join(ROOT, imagePath)), spot.id + ': missing photo asset ' + imagePath);
    let hash = hashedPaths.get(imagePath);
    if (!hash) {
      hash = createHash('sha256').update(fs.readFileSync(path.join(ROOT, imagePath))).digest('hex');
      hashedPaths.set(imagePath, hash);
    }
    if (!photoHashes.has(hash)) photoHashes.set(hash, []);
    photoHashes.get(hash).push({ id: spot.id, image: imagePath });
  }
}
const sharedBinaryWarnings = [...photoHashes.values()].filter(group => new Set(group.map(item => item.id)).size > 1);
for (const group of sharedBinaryWarnings) {
  console.warn('IMG-01A shared-binary warning:', group.map(item => item.id + ' (' + item.image + ')').join(' | '));
}

// The specifically licensed Mirante do Coração attribution stays untouched.
const mirante = fs.readFileSync(path.join(ROOT, 'lugares/mirante-do-coracao/index.html'), 'utf8');
assert(mirante.includes('https://creativecommons.org/licenses/by-sa/4.0/'), 'specific photo license missing');
// These have no approved replacements yet; photo search is deliberately out of scope for IMG-01A.
for (const id of ['praia-do-barreiros','praia-de-santa-tereza','praia-do-pinto','praia-da-ponta-azeda','praia-da-pacuiba','poco-do-furado','cachoeira-do-poco-fundo']) {
  assert.equal(spots.find(s=>s.id===id).image, original.get(id).image, id + ': placeholder silently replaced');
}
console.log('IMG-01A image consistency: 50 attraction pages, 24 verified galleries, 36 approved attraction assignments, 51 protected assets, metadata and hubs OK.');
