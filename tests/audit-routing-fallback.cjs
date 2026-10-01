const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const base = '4609ce1541d9c57c2408c3b519339a82bb1dbaa5';
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
    if (id === 'trilha-do-bonete') {
      if (['auto','4x4','bicycle','pedestrian'].includes(mode)) {
        const access = JSON.parse(actual);
        assert.deepEqual(access.coords, [-23.936275064037446, -45.42730164154816]);
        assert.equal(access.finalMode, 'trail');
        assert.equal(access.accessId, 'road-trail');
        assert.equal(JSON.stringify(access.destination), vm.runInContext(`JSON.stringify(touristSpots.find(s => s.id === 'trilha-do-bonete').coords)`,previous));
      } else assert.equal(actual, 'null');
    }
    else assert.equal(actual, vm.runInContext(expression, previous), `${id}/${mode} changed`);
  }
  if (id !== 'trilha-do-bonete') {
    const expression = `JSON.stringify(touristSpots.find(s => s.id === ${JSON.stringify(id)}))`;
    assert.equal(vm.runInContext(expression,current), vm.runInContext(expression,previous), `${id} routing changed`);
  }
}
assert.equal(vm.runInContext("touristSpots.find(s => s.id === 'trilha-do-bonete').routing.roadRoutable",current),false);
assert.equal(vm.runInContext("touristSpots.find(s => s.id === 'trilha-do-bonete').routing.accessOptions[0].gateway.verified",current),true);
const trailContent = "JSON.stringify((({routing, ...content}) => content)(touristSpots.find(s => s.id === 'trilha-do-bonete')))";
assert.equal(vm.runInContext(trailContent,current),vm.runInContext(trailContent,previous),'Bonete trail content changed');
assert.equal(vm.runInContext("touristSpots.find(s => s.id === 'cachoeira-dos-tres-tombos').routing.accessOptions[0].gateway.verified",current),false);
console.log(`Fallback regression OK: ${ids.length} attractions, 6 modes; all other routing preserved against ${base}`);
const catalog = vm.createContext({console});
for (const file of ['data.js','additional-spots.js']) vm.runInContext(fs.readFileSync(file,'utf8'),catalog);
console.log(vm.runInContext(`JSON.stringify(touristSpots.reduce((a,s)=>{const r=s.routing;const k=r.accessOptions?.length?'explicit':r.gatewayId?'gateway':r.roadRoutable?'direct':'pending';(a[k]??=[]).push(s.id);return a;},{}),null,2)`,catalog));
