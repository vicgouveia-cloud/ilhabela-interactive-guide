const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
// Approved routing and translated catalog after #25/#26, before this technical fix.
const base = '6c48fd8aef9d0ed8fb85ea40175e3cc497aa5c2f';
const EDITORIAL_WATERFALL_IDS = new Set(['cachoeira-do-gato','cachoeira-da-friagem','cachoeira-dos-tres-tombos']);

function load(baseline) {
  const context = vm.createContext({console, translations: Object.fromEntries(['pt','en','fr','es','he'].map(l => [l, {}]))});
  for (const file of ['data.js', 'additional-spots.js', 'multimodal.js']) {
    vm.runInContext(baseline ? execFileSync('git', ['show', `${base}:${file}`], {encoding:'utf8'}) : fs.readFileSync(file, 'utf8'), context, {filename:file});
  }
  return context;
}
const current = load(false), previous = load(true);
const ids = vm.runInContext('touristSpots.map(s => s.id)', current);
for (const id of ids) {
  for (const mode of ['auto','4x4','bicycle','pedestrian','boat','trail']) {
    const expression = `JSON.stringify(resolvePlannerAccess(touristSpots.find(s => s.id === ${JSON.stringify(id)}), ${JSON.stringify(mode)}))`;
    const actual = vm.runInContext(expression, current);
    if (id === 'trilha-da-agua-branca') {
      if (['auto','4x4','bicycle','pedestrian'].includes(mode)) {
        const access = JSON.parse(actual);
        assert.deepEqual(access.coords, [-23.839249751545807, -45.36002116037754]);
        assert.equal(access.finalMode, 'trail');
        assert.equal(access.accessId, 'road-trail');
        assert.equal(JSON.stringify(access.destination), vm.runInContext(`JSON.stringify(touristSpots.find(s => s.id === 'trilha-da-agua-branca').coords)`,previous));
      } else assert.equal(actual, 'null');
    }
    else assert.equal(actual, vm.runInContext(expression, previous), `${id}/${mode} changed`);
  }
  if (id !== 'trilha-da-agua-branca') {
    const expression = EDITORIAL_WATERFALL_IDS.has(id)
      ? `JSON.stringify((({id,category,image,images,coords,routing})=>({id,category,image,images,coords,routing}))(touristSpots.find(s=>s.id===${JSON.stringify(id)})))`
      : `JSON.stringify(touristSpots.find(s => s.id === ${JSON.stringify(id)}))`;
    assert.equal(vm.runInContext(expression,current),vm.runInContext(expression,previous),`${id} routing/media/coordinates changed`);
  }
}
assert.equal(vm.runInContext("resolvePlannerAccess(touristSpots.find(s => s.id === 'praia-do-bonete'), 'pedestrian')",current),null, 'Never route pedestrians directly to Bonete without a supported access option');
assert.equal(vm.runInContext("touristSpots.find(s => s.id === 'trilha-da-agua-branca').routing.roadRoutable",current),false);
assert.equal(vm.runInContext("touristSpots.find(s => s.id === 'trilha-da-agua-branca').routing.accessOptions[0].gateway.verified",current),true);
const trailContent = "JSON.stringify((({routing, ...content}) => content)(touristSpots.find(s => s.id === 'trilha-da-agua-branca')))";
assert.equal(vm.runInContext(trailContent,current),vm.runInContext(trailContent,previous),'Agua Branca trail content changed');
assert.equal(vm.runInContext("touristSpots.find(s => s.id === 'cachoeira-dos-tres-tombos').routing.accessOptions[0].gateway.verified",current),vm.runInContext("touristSpots.find(s => s.id === 'cachoeira-dos-tres-tombos').routing.accessOptions[0].gateway.verified",previous), 'Preserve approved gateway verification');
require('./audit-waterfall-safety.cjs');
console.log(`Fallback regression OK: ${ids.length} attractions, 6 modes, full operational facts preserved; 3 safety editorials separately audited.`);
const catalog = vm.createContext({console});
for (const file of ['data.js','additional-spots.js']) vm.runInContext(fs.readFileSync(file,'utf8'),catalog);
console.log(vm.runInContext(`JSON.stringify(touristSpots.reduce((a,s)=>{const r=s.routing;const k=r.accessOptions?.length?'explicit':r.gatewayId?'gateway':r.roadRoutable?'direct':'pending';(a[k]??=[]).push(s.id);return a;},{}),null,2)`,catalog));
