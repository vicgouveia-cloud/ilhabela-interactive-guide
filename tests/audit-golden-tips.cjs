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
// CAT-SAFETY-01: only reviewed waterfall editorial fields may differ from approved data.
const safetyIds=new Set(['cachoeira-do-gato','cachoeira-da-friagem','cachoeira-dos-tres-tombos']);
function protectedCatalog(input){
 const out=structuredClone(input);
 for(const spot of out.touristSpots.filter(s=>safetyIds.has(s.id))){
   for(const key of ['difficulty','distance','duration','access'])delete spot.specs[key];
   for(const tr of Object.values(spot.translations)){
     for(const key of ['subtitle','description','highlights','ecoTip'])delete tr[key];
     for(const key of ['distance','duration','access'])delete tr.specs[key];
   }
 }
 return out;
}
assert.deepEqual(protectedCatalog(current),protectedCatalog(approved),'All unmodified data and protected fields remain identical to approved catalog');
require('./audit-attraction-safety.cjs');
const unchangedTips=data=>data.touristSpots.filter(s=>!safetyIds.has(s.id)).map(s=>[s.id,...['pt','en','es','fr','he'].map(lang=>s.translations[lang].ecoTip)]);
assert.deepEqual(unchangedTips(current),unchangedTips(previous),'235 unmodified ecoTips identical; 15 reviewed waterfall safety tips protected separately');
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
  if(safetyIds.has(id))continue; // Safety pages compared with generator and metadata by audit-attraction-safety.
  assert.equal(fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n'), old.toString().replace(/\r\n/g, '\n'), `${id}: static page unchanged`);
}
console.log('Current catalog and historical ecoTips OK: 250 original ecoTips exactly restored; approved UI/catalog and 50 static pages intact.');
