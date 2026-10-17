const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

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
assert.equal(spots.length, 50, 'expected 50 attractions');
assert.equal(Object.keys(verified).length, 34, '28 approved historical records plus 3 Prefeitura beach photographs plus 3 final authorized photographs');
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
  } else {
    assert.equal(spot.image, existing.image, spot.id + ': unapproved photo changed');
    assert.equal(spot.photoCredit, existing.photoCredit, spot.id + ': existing credit changed');
    assert.equal(spot.photoSource, existing.photoSource, spot.id + ': existing source changed');
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
  // Test the file attached to this attraction, not possibly older localized alt copy.
  function imageForCard(html) {
    const card = [...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)]
      .map(match => match[0]).find(article => article.includes('href="/lugares/' + spot.id + '/"'));
    return card?.match(/<img\b[^>]*\bsrc="([^"]+)"/)?.[1] ?? null;
  }
  assert.equal(imageForCard(discovery), '/' + spot.image, spot.id + ': discovery hub differs');
  if (categories[spot.category]) assert.equal(imageForCard(categories[spot.category]), '/' + spot.image, spot.id + ': category hub differs');
  if (itineraryIds.has(spot.id)) assert.equal(imageForCard(itinerary), '/' + spot.image, spot.id + ': itinerary hub differs');
}
// The specifically licensed Mirante do Coração attribution stays untouched.
const mirante = fs.readFileSync(path.join(ROOT, 'lugares/mirante-do-coracao/index.html'), 'utf8');
assert(mirante.includes('https://creativecommons.org/licenses/by-sa/4.0/'), 'specific photo license missing');
// IMG-03: all 50 attractions now have real verified photographs (zero placeholders remaining!).
assert.equal(spots.filter(s => s.image === 'assets/images/attraction-placeholder.svg').length, 0, 'zero placeholders remaining');
for (const id of ['poco-do-furado','mirante-do-morro-da-cruz','mirante-dos-barreiros']) {
  assert.notEqual(spots.find(s=>s.id===id).image, 'assets/images/attraction-placeholder.svg', id + ': still has placeholder');
}
console.log('IMG-03 image consistency: 50 attraction pages, 34 verified photo records, metadata, hubs and zero remaining placeholders OK.');
