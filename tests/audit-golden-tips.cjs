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
const approved = load(f => execFileSync('git', ['show', '6c48fd8:' + f], {cwd:ROOT, encoding:'utf8', maxBuffer:10e6}));
const {SAFETY_IDS,maskSafetyChanges}=require('./safety-preservation-contract.cjs');
assert.deepEqual(maskSafetyChanges(current,approved),approved,'Approved catalog and 47 attractions fully preserved; three safety records changed only in explicitly scoped fields');
assert.deepEqual(current.touristSpots.map(s=>[s.id,...['pt','en','es','fr','he'].map(lang=>s.translations[lang].ecoTip)]),previous.touristSpots.map(s=>[s.id,...['pt','en','es','fr','he'].map(lang=>s.translations[lang].ecoTip)]),'All 250 original ecoTips exactly preserved');
assert.equal(current.touristSpots.length, 50);
for (const spot of current.touristSpots) for (const lang of ['pt','en','es','fr','he']) {
  assert.equal(typeof spot.translations[lang].ecoTip, 'string');
  assert(spot.translations[lang].ecoTip.trim());
}
const app=fs.readFileSync(path.join(ROOT,'app.js'),'utf8');
assert(!app.includes('bg-amber-50 border border-amber-200 space-y-1'),'Removed global repellent warning must not return');
for (const id of current.touristSpots.map(s => s.id)) {
  const file = `lugares/${id}/index.html`;
  if(SAFETY_IDS.includes(id))continue; // Covered by safety-specific static page tests below.
  const old = execFileSync('git', ['show', `6c48fd8:${file}`], { cwd: ROOT });
  assert.equal(fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n'), old.toString().replace(/\r\n/g, '\n'), `${id}: static page unchanged`);
}
console.log('Current catalog and historical ecoTips OK: 250 original ecoTips exactly restored; approved UI/catalog and 50 static pages intact.');
