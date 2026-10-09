const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const context = vm.createContext({ console });
for (const file of ['data.js', 'additional-spots.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context);
}
const spots = vm.runInContext('touristSpots', context);
const generated = new Map();
// Exercise the real generator without writing, deleting or regenerating pages.
const memoryFs = {
  ...fs, mkdirSync() {}, readdirSync() { return []; },
  rmSync() { throw new Error('Unexpected deletion'); },
  writeFileSync(file, html) { generated.set(file, html); }
};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'scripts/generate-attraction-pages.cjs'), 'utf8'), {
  require(name) { return name === 'node:fs' ? memoryFs : require(name); },
  __dirname: path.join(ROOT, 'scripts'), process: { env: {} }, console: { log() {} }
});
const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
for (const spot of spots) {
  const html = fs.readFileSync(path.join(ROOT, 'lugares', spot.id, 'index.html'), 'utf8');
  assert(html.includes(`<link rel="canonical" href="https://ilhabelatrip.com/lugares/${spot.id}/">`), spot.id);
}
for (const id of ['trilha-da-cabecuda-farol', 'mirante-do-coracao']) {
  const spot = spots.find(item => item.id === id), tr = spot.translations.pt;
  const file = path.join(ROOT, 'lugares', id, 'index.html');
  for (const html of [fs.readFileSync(file, 'utf8'), generated.get(file)]) {
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema.name, tr.title);
    assert.equal(schema.description, tr.description);
    assert.equal(schema.geo.latitude, spot.coords[0]);
    assert.equal(schema.geo.longitude, spot.coords[1]);
    assert.deepEqual(schema.image, [`https://ilhabelatrip.com/${spot.image}`]);
    assert(html.includes(`<h1>${esc(tr.title)}</h1><p>${esc(tr.description)}</p>`));
    assert(html.includes(esc(tr.specs.access)));
    for (const highlight of tr.highlights) assert(html.includes(`<li>${esc(highlight)}</li>`));
    const description = esc(tr.description.replace(/\s+/g, ' ').trim().slice(0, 220));
    for (const attribute of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
      assert(html.includes(`<meta ${attribute} content="${description}">`));
    }
    assert(!html.includes('Farol histórico da Marinha de 1930'));
    assert(!html.includes('Localizado no alto da serra durante a descida'));
  }
}
console.log('Reconciliation OK: 2 pages + generator in memory; 50 canonicals.');
