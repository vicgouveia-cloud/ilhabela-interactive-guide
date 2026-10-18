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
const safety = require('./fixtures/waterfall-safety-overrides.json').attractions;
const expected=structuredClone(approved);
for(const spot of expected.touristSpots) {
  if(!safety[spot.id])continue;
  spot.tags=safety[spot.id].tags;
  spot.specs=safety[spot.id].specs;
  spot.translations=safety[spot.id].translations;
}
assert.deepEqual(current,expected,'Approved 129 services, UI and 47 untouched attractions preserved; exactly three reviewed waterfall corrections');
const editedEcoTips=new Set(['cachoeira-da-friagem','cachoeira-dos-tres-tombos']);
for(let i=0;i<current.touristSpots.length;i++){
  const spot=current.touristSpots[i],prior=previous.touristSpots[i];
  assert.equal(spot.id,prior.id,'Historical ecoTip entry order preserved');
  for(const lang of ['pt','en','es','fr','he']) {
    if(editedEcoTips.has(spot.id))assert.equal(spot.translations[lang].ecoTip,safety[spot.id].translations[lang].ecoTip,spot.id+' '+lang+' reviewed safety ecoTip');
    else assert.equal(spot.translations[lang].ecoTip,prior.translations[lang].ecoTip,spot.id+' '+lang+' original ecoTip preserved');
  }
}
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
  if(safety[id])continue; // Three reviewed static pages regenerated; tested by audit-waterfall-safety.
  assert.equal(fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n'), old.toString().replace(/\r\n/g, '\n'), `${id}: static page unchanged`);
}
console.log('Historical catalog OK: 240 original ecoTips unchanged; 10 official safety corrections reviewed; 47 static attraction pages preserved.');
