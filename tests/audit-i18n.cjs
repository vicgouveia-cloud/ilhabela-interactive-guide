const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const acorn = require('acorn');
const parse5 = require('parse5');
const root = path.resolve(__dirname, '..');
const files = ['translations.js', 'data.js', 'additional-spots.js', 'multimodal.js', 'planner.js'];
function load(read) {
  const ctx = vm.createContext({document: {addEventListener() {}}, window: {addEventListener() {}}, localStorage: {getItem() {return null;}}});
  for (const file of files) vm.runInContext(read(file), ctx, {filename:file});
  return JSON.parse(vm.runInContext('JSON.stringify({translations,touristSpots,guidesData,servicesData})', ctx));
}
const read = file => fs.readFileSync(path.join(root,file), 'utf8');
const data = load(read);
const locales = ['pt','en','fr','es','he'];
const uiKeys = Object.keys(data.translations.pt).sort();
function nonempty(value, location) {
  if (typeof value === 'string') assert.ok(value.trim(), location);
  else if (Array.isArray(value)) { assert.ok(value.length, location); value.forEach((v,i)=>nonempty(v,location+'.'+i)); }
  else { assert.ok(value && typeof value === 'object',location); Object.entries(value).forEach(([k,v])=>nonempty(v,location+'.'+k)); }
}
for (const lang of locales) {
  assert.deepEqual(Object.keys(data.translations[lang]).sort(), uiKeys, lang+' UI keys');
  nonempty(data.translations[lang], lang);
  for (const spot of data.touristSpots) {
    const tr = spot.translations[lang];
    assert.ok(tr, spot.id+'.'+lang);
    for (const key of ['title','subtitle','description','highlights','ecoTip']) nonempty(tr[key],spot.id+'.'+lang+'.'+key);
    for (const key of ['distance','duration','elevation','access','sea','structure']) nonempty(tr.specs?.[key],spot.id+'.'+lang+'.specs.'+key);
    if (lang !== 'pt') {
      for (const key of ['subtitle','description','ecoTip']) assert.notEqual(tr[key],spot.translations.pt[key],spot.id+'.'+lang+'.'+key+' copied PT');
      // This address and qualifier are spelled identically in Portuguese and Spanish.
      for (const key of ['access','sea','structure']) if (!(spot.id==='praia-da-siriuba' && lang==='es' && key==='access')) assert.notEqual(tr.specs[key],spot.translations.pt.specs[key],spot.id+'.'+lang+'.'+key+' copied PT');
    }
  }
  for (const guide of data.guidesData) for(const key of ['role','bio','specialties']) nonempty(guide.translations[lang]?.[key],guide.id+'.'+lang+'.'+key);
  for(const service of data.servicesData) {
    const catalog=service.translations;
    assert.ok(catalog?.[lang],service.id+'.'+lang);
    assert.deepEqual(Object.keys(catalog[lang]).sort(),Object.keys(catalog.pt).sort(),service.id+'.'+lang+' keys');
    nonempty(catalog[lang],service.id+'.'+lang);
    for(const key of ['type','description']) nonempty(catalog[lang][key],service.id+'.'+lang+'.'+key);
    if(lang!=='pt') assert.notEqual(catalog[lang].description,catalog.pt.description,service.id+'.'+lang+' copied PT');
  }
}
// Audit literal keys in JavaScript (including templates) and HTML attributes.
const used = new Set();
function visit(node) {
  if (!node || typeof node !== 'object') return;
  if(node.type==='CallExpression' && node.callee.name==='t' && node.arguments[0]?.type==='Literal') used.add(node.arguments[0].value);
  for (const value of Object.values(node)) if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value==='object') visit(value);
}
visit(acorn.parse(read('app.js'),{ecmaVersion:'latest'}));
// Only invariant branding, language codes, numbers and coordinates may remain
// as untranslated static text. Icon ligatures and template placeholders are not copy.
function auditHtml(node, ignored=false) {
  const attrs=Object.fromEntries((node.attrs||[]).map(a=>[a.name,a.value]));
  ignored ||= ['script','style'].includes(node.tagName) || 'data-i18n' in attrs || 'data-contact-entry' in attrs || attrs.id==='language-menu' || (attrs.class||'').includes('material-symbols');
  if(node.nodeName==='#text' && !ignored) {
    const text=node.value.trim();
    if(text && !/^(?:PT|EN|FR|ES|HE|Ilhabela Trip|R\$ [\d,.]+|[\d.]+|: 23° 46' 36" S, 45° 21' 36" W)$/.test(text)) throw Error('Unlocalized HTML: '+text);
  }
  for(const child of node.childNodes||[]) auditHtml(child,ignored);
}
// Contact owns its locale catalogs and refreshes data-contact-entry text at runtime.
const contactSource=read('contact.js');
const contactAst=acorn.parse(contactSource,{ecmaVersion:'latest'});
for(const name of ['copy','sendingCopy','introduction']) {
  let catalog;
  function find(node) {
    if(!node || typeof node!=='object') return;
    if(node.type==='VariableDeclarator' && node.id.name===name) catalog=vm.runInNewContext('('+contactSource.slice(node.init.start,node.init.end)+')');
    for(const value of Object.values(node)) if(Array.isArray(value)) value.forEach(find); else if(value && typeof value==='object') find(value);
  }
  find(contactAst);
  assert.deepEqual(Object.keys(catalog).sort(),[...locales].sort(),'contact '+name+' locales');
  for(const lang of locales) { nonempty(catalog[lang],'contact.'+name+'.'+lang); assert.equal(catalog[lang].length,catalog.pt.length); }
}
auditHtml(parse5.parse(read('index.html')));
for(const match of read('index.html').matchAll(/data-i18n(?:-[\w-]+)?="([^"]+)"/g)) used.add(match[1]);
for(const lang of locales) for(const key of used) assert.ok(data.translations[lang][key],lang+'.'+key);
// Regression contract against the user-approved base: all facts, media, contacts,
// ordering and pre-existing translations stay intact; only new localized fields are added.
const baseSha = '565d20ebf05926328e87bc416c650737311bb0cf';
const correctedSpecs = require('./fixtures/reconciled-spec-translations.json');
const baseline = load(file=>execFileSync('git',['show',baseSha+':'+file],{cwd:root,encoding:'utf8',maxBuffer:10*1024*1024}));
function withoutTranslations(item) { const {translations,...facts}=item; return facts; }
for (const group of ['touristSpots','guidesData']) {
  assert.deepEqual(data[group].map(withoutTranslations),baseline[group].map(withoutTranslations),group+' immutable facts');
  baseline[group].forEach((old,i)=>{
    for(const [lang,tr] of Object.entries(old.translations)) for(const [key,value] of Object.entries(tr)) { const expected=structuredClone(value); if(key==='specs' && correctedSpecs[old.id]?.[lang]) Object.assign(expected,correctedSpecs[old.id][lang]); assert.deepEqual(data[group][i].translations[lang][key],expected,old.id+'.'+lang+'.'+key); }
  });
}
// Services use the last approved full service architecture; attractions/guides retain the historic contract above.
const servicesBaseSha = '1a7613e4c0273deca5094a6e5842d9461be50c51';
const servicesBaseline = load(file=>execFileSync('git',['show',servicesBaseSha+':'+file],{cwd:root,encoding:'utf8',maxBuffer:10*1024*1024}));
const addedServiceIds = ['porto-do-engenho','tempero-da-ilha'];
assert.equal(data.servicesData.filter(s=>addedServiceIds.includes(s.id)).length,2,'exactly two new recommended restaurants');
assert.deepEqual(data.servicesData.filter(s=>!addedServiceIds.includes(s.id)),servicesBaseline.servicesData,'all previous service facts, media, contacts, translations and order preserved');
require('./audit-israel-quero-pizza.cjs');
require('./audit-porto-tempero.cjs');
assert.equal(new Set(data.servicesData.map(s=>s.id)).size,data.servicesData.length,'unique service IDs');
const contexts={};
for(const service of data.servicesData) for(const id of service.contextSpotIds||[]) {
  assert.ok(data.touristSpots.some(s=>s.id===id),service.id+' valid context '+id);
  assert.equal(new Set(service.contextSpotIds).size,service.contextSpotIds.length,service.id+' unique contexts');
  (contexts[id]||=[]).push(service.id);
}
assert.deepEqual(contexts,{
 'praia-do-veloso':['chagas-passeios'],
 'praia-do-portinho':['portinho-passeios','quiosque-maxx-beach','portinho-divers','la-gloria-house'],
 'mirante-do-piuva':['point-da-lala']
},'approved editorial links independent of proximity and service area');
assert.equal((read('app.js').match(/function renderLocalRecommendations\(/g)||[]).length,1);
assert.ok(!read('additional-spots.js').includes('DOMContentLoaded'),'No renderer override');
assert.ok(!read('app.js').includes('|| spot.specs.'),'No raw specs fallback');
assert.ok(!read('index.html').includes('group-hover:visible'),'No hover language dropdown');
console.log(`PASS: ${locales.length} locales, ${uiKeys.length} UI keys, ${data.touristSpots.length} attractions, ${data.guidesData.length} guides, ${data.servicesData.length} local services. Approved base data preserved.`);
