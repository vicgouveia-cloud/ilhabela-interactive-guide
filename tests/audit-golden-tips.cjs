const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const BASE = 'f66a6fbcce8cbeb4b09400604ce7e41e274c55f2';
const files = ['data.js', 'additional-spots.js', 'translations.js'];
function load(read) {
  const c = vm.createContext({ console, document: { addEventListener() {} } });
  for (const file of files) vm.runInContext(read(file), c);
  return JSON.parse(vm.runInContext('JSON.stringify({touristSpots,guidesData,translations})', c));
}
const current = load(f => fs.readFileSync(path.join(ROOT, f), 'utf8'));
const previous = load(f => execFileSync('git', ['show', `${BASE}:${f}`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 10e6 }));
const withoutTips = value => JSON.parse(JSON.stringify(value, (key, val) => ['ecoTip', 'ecoTipTitle'].includes(key) ? undefined : val));
assert.deepEqual(withoutTips(current), withoutTips(previous), 'All non-tip catalog facts, translations and services preserved');
assert.equal(current.touristSpots.length, 50);
let visible = 0;
for (const spot of current.touristSpots) {
  const hasTip = spot.translations.pt.ecoTip !== null;
  if (hasTip) visible++;
  for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
    const tip = spot.translations[lang].ecoTip;
    assert.equal(tip !== null, hasTip, `${spot.id}: locale visibility parity`);
    if (hasTip) {
      assert.equal(typeof tip, 'string');
      assert(tip.trim());
      if (lang !== 'pt') assert.notEqual(tip, spot.translations.pt.ecoTip);
    }
  }
}
assert.equal(visible, 17);
for (const id of current.touristSpots.map(s => s.id)) {
  const file = `lugares/${id}/index.html`;
  const old = execFileSync('git', ['show', `${BASE}:${file}`], { cwd: ROOT });
  assert.equal(fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n'), old.toString().replace(/\r\n/g, '\n'), `${id}: static page unchanged`);
}
console.log('Golden tips OK: 50 attractions, 17 visible / 33 hidden, five locales; other facts and 50 static pages unchanged.');
