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
assert.deepEqual(current, previous, 'All 250 ecoTip values and all other catalog/UI data exactly restored');
assert.equal(current.touristSpots.length, 50);
for (const spot of current.touristSpots) for (const lang of ['pt','en','es','fr','he']) {
  assert.equal(typeof spot.translations[lang].ecoTip, 'string');
  assert(spot.translations[lang].ecoTip.trim());
}
const originalApp = execFileSync('git', ['show', BASE + ':app.js'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 10e6 });
const startWarning = originalApp.indexOf('      <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">', originalApp.indexOf('<!-- Eco & Borrachudos Tips -->'));
const endWarning = originalApp.indexOf('      </div>', startWarning) + '      </div>'.length;
assert(startWarning >= 0);
const expectedApp = originalApp.slice(0,startWarning) + originalApp.slice(endWarning);
assert.equal(fs.readFileSync(path.join(ROOT,'app.js'),'utf8').replace(/\r\n/g,'\n'), expectedApp.replace(/\r\n/g,'\n'), 'Only global repellent presentation removed; every other block intact');
for (const id of current.touristSpots.map(s => s.id)) {
  const file = `lugares/${id}/index.html`;
  const old = execFileSync('git', ['show', `${BASE}:${file}`], { cwd: ROOT });
  assert.equal(fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n'), old.toString().replace(/\r\n/g, '\n'), `${id}: static page unchanged`);
}
console.log('Preservation OK: 250 original ecoTips exactly restored; only global repellent block removed; all other blocks and 50 static pages intact.');
