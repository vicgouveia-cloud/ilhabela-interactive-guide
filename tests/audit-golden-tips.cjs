const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const BASE = 'f66a6fbcce8cbeb4b09400604ce7e41e274c55f2';
const files = ['data.js', 'additional-spots.js', 'translations.js'];
const EDITORIAL_WATERFALL_IDS = new Set(['cachoeira-do-gato','cachoeira-da-friagem','cachoeira-dos-tres-tombos']);
function load(read) {
  const c = vm.createContext({ console, document: { addEventListener() {} } });
  for (const file of files) vm.runInContext(read(file), c);
  return JSON.parse(vm.runInContext('JSON.stringify({touristSpots,guidesData,translations})', c));
}
const current = load(f => fs.readFileSync(path.join(ROOT, f), 'utf8'));
const previous = load(f => execFileSync('git', ['show', `${BASE}:${f}`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 10e6 }));
const approved = load(f => execFileSync('git', ['show', '6c48fd8:' + f], {cwd:ROOT, encoding:'utf8', maxBuffer:10e6}));
// Only the three safety-reviewed waterfall entries may differ from the approved catalog.
// Every other attraction, all guides and the complete UI locale dictionary remain exact.
const withoutSafetyEdits = item => ({...item, touristSpots:item.touristSpots.filter(s=>!EDITORIAL_WATERFALL_IDS.has(s.id))});
assert.deepEqual(current.touristSpots.map(s=>s.id),approved.touristSpots.map(s=>s.id),'all attraction ids and ordering preserved');
assert.deepEqual(withoutSafetyEdits(current), withoutSafetyEdits(approved), 'Approved catalog and UI preserved except three separately audited waterfall entries');
require('./audit-waterfall-safety.cjs');
const originalEcoTips = items => items.filter(s=>s.id!=='cachoeira-dos-tres-tombos').map(s=>[s.id,...['pt','en','es','fr','he'].map(lang=>s.translations[lang].ecoTip)]);
assert.deepEqual(originalEcoTips(current.touristSpots),originalEcoTips(previous.touristSpots),'245 prior ecoTips preserved; 5 Três Tombos safety tips covered by waterfall audit');
assert.equal(current.touristSpots.length, 50);
for (const spot of current.touristSpots) for (const lang of ['pt','en','es','fr','he']) {
  assert.equal(typeof spot.translations[lang].ecoTip, 'string');
  assert(spot.translations[lang].ecoTip.trim());
}
const app=fs.readFileSync(path.join(ROOT,'app.js'),'utf8');
assert(!app.includes('bg-amber-50 border border-amber-200 space-y-1'),'Removed global repellent warning must not return');
for (const id of current.touristSpots.map(s => s.id)) {
  const file = `lugares/${id}/index.html`;
  const old = execFileSync('git', ['show', `6c48fd8:${file}`], { cwd: ROOT });
  if (!EDITORIAL_WATERFALL_IDS.has(id)) assert.equal(fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n'), old.toString().replace(/\r\n/g, '\n'), `${id}: static page unchanged`);
}
console.log('Golden tips OK: 245 historic ecoTips and 47 original attraction pages unchanged; 3 reviewed waterfall pages protected by dedicated audit.');
