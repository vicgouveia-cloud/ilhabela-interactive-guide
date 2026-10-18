// PEAKS-LOOKOUTS-FACTUAL-01 — Two officially reviewed records; all other records and media preserved.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const BASE='783ffb7117fb02aa1be6464f0044dc76905703ea';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const historical=p=>execFileSync('git',['show',BASE+':'+p],{cwd:root,encoding:'utf8',maxBuffer:15*1024*1024});
const parse=(text,name)=>{const m='const '+name+' = ',i=text.indexOf(m),e=text.indexOf('];',i);assert(i>=0&&e>i);return JSON.parse(text.slice(i+m.length,e+1));};
const primary=parse(read('data.js'),'touristSpots'),oldPrimary=parse(historical('data.js'),'touristSpots');
const supplementary=parse(read('additional-spots.js'),'additionalTouristSpots');
const supplementaryOld=parse(historical('additional-spots.js'),'additionalTouristSpots');
assert.deepEqual(supplementary,supplementaryOld,'Additional tourist spots must remain unchanged');
assert.equal(primary.length,28);
const affected=['pico-de-sao-sebastiao','mirante-do-coracao'];
for(const previous of oldPrimary){
 const actual=primary.find(x=>x.id===previous.id);
 assert(actual,previous.id+' missing');
 if(!affected.includes(previous.id)){assert.deepEqual(actual,previous,previous.id+' unexpectedly modified');continue;}
 for(const key of Object.keys(previous).filter(k=>!['specs','translations','tags','attributes'].includes(k))){
  assert.deepEqual(actual[key],previous[key],previous.id+' media/coords/routing changed: '+key);
 }
 const beforeAttr={...previous.attributes},afterAttr={...actual.attributes};
 if(actual.id==='pico-de-sao-sebastiao'){
  assert.equal(afterAttr.isSunset,false,'Unverified summit must not appear in sunset filters');
  afterAttr.isSunset=true;
 }
 assert.deepEqual(afterAttr,beforeAttr,actual.id+' other filters changed');
 assert.deepEqual(actual.coords,previous.coords,actual.id+' coordinates changed');
 assert.deepEqual(actual.images,previous.images,actual.id+' original image changed');
}
const access=JSON.parse(read('scripts/attraction-access-copy.json'));
const approvedAccess=JSON.parse(historical('scripts/attraction-access-copy.json'));
assert.deepEqual(Object.keys(access),Object.keys(approvedAccess));
for(const id of Object.keys(approvedAccess))if(!affected.includes(id))assert.deepEqual(access[id],approvedAccess[id],id+' access unexpectedly altered');
const expected={
 'pico-de-sao-sebastiao':{
  reference:'https://guiadeareasprotegidas.sp.gov.br/ap/parque-estadual-ilhabela/',
  words:{pt:['não confirmou','Não utilize'],en:['not verified','Do not use'],es:['no ha confirmado','No utilices'],fr:["n'a pas confirmé",'Ne considérez'],he:['לא אימת','אין לראות']},
  specs:{pt:'Não validada',en:'not verified',es:'no validada',fr:'non vérifié',he:'טרם אומת'}
 },
 'mirante-do-coracao':{
  reference:'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/14079/prefeitura-de-ilhabela-realiza-melhorias-turisticas-e-de-seguranca-na-baia-de-castelhanos',
  words:{pt:['canto direito','piso metálico'],en:['right-hand','metal-floor'],es:['extremo derecho','piso metálico'],fr:['droite','sol métallique'],he:['הימני','מתכת']},
  specs:{pt:'metálico',en:'metal',es:'metálico',fr:'métallique',he:'מתכת'}
 }
};
const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const [id,pin] of Object.entries(expected)){
 const s=primary.find(x=>x.id===id),old=oldPrimary.find(x=>x.id===id);
 assert(s&&old,id+' missing');
 assert.equal(access[id].provenance.reference,pin.reference,'official source missing: '+id);
 assert(access[id].copy.length>160,id+' access copy too short');
 for(const lang of ['pt','en','es','fr','he']){
  const t=s.translations[lang];
  assert(t.subtitle&&t.description.length>190&&t.ecoTip&&t.highlights.length===4,id+' incomplete locale '+lang);
  for(const word of pin.words[lang])assert(t.description.includes(word),id+'.'+lang+' missing '+word);
  for(const field of ['distance','duration','access','structure','elevation'])assert(t.specs[field].length>7,id+'.'+lang+' missing '+field);
  const reference=id==='mirante-do-coracao'?t.specs.structure:t.specs.distance;
  assert(reference.includes(pin.specs[lang]),id+'.'+lang+' unverified/metal structure');
 }
 const pt=s.translations.pt,h=read('lugares/'+id+'/index.html'),meta=escape(pt.description.replace(/\s+/g,' ').slice(0,220));
 for(const a of ['name="description"','property="og:description"','name="twitter:description"'])assert(h.includes('<meta '+a+' content="'+meta+'">'),id+' meta '+a);
 assert(h.includes('<p class="sub">'+escape(pt.subtitle)+'</p>'),id+' subtitle stale');
 assert(h.includes('<h1>'+escape(pt.title)+'</h1><p>'+escape(pt.description)+'</p>'),id+' body stale');
 assert(h.includes('<li>'+escape(pt.highlights[0])+'</li>'),id+' highlight stale');
 assert(h.includes('<h2>Como chegar</h2><p>'+escape(access[id].copy)+'</p>'),id+' access stale');
 const tag='<script type="application/ld+json">',start=h.indexOf(tag),end=h.indexOf('</script>',start);
 assert(start>=0&&end>start,id+' JSONLD missing');
 const json=JSON.parse(h.slice(start+tag.length,end));
 assert.equal(json.description,pt.description,id+' JSONLD drift');
 assert.equal(json.geo.latitude,old.coords[0]);assert.equal(json.geo.longitude,old.coords[1]);
 assert(read('o-que-fazer/index.html').includes(escape(pt.subtitle)),id+' discovery hub stale');
}
assert.equal(primary.find(x=>x.id==='pico-de-sao-sebastiao').attributes.isSunset,false);
assert.equal(access['pico-de-sao-sebastiao'].provenance.pendingAccess,true);
assert.equal(access['mirante-do-coracao'].provenance.pendingEmbarkation,true);
const other=['mirante-do-baepi','mirante-do-piuva','mirante-do-morro-da-cruz','mirante-dos-barreiros','pico-do-baepi'];
for(const id of other){
 assert.equal(read('lugares/'+id+'/index.html'),historical('lugares/'+id+'/index.html'),id+' static neighbor changed');
}
// EN pilot page must align with current translated data and generator rather than old summit promises.
const en=primary.find(x=>x.id==='pico-de-sao-sebastiao').translations.en;
const englishPage=read('en/lugares/pico-de-sao-sebastiao/index.html');
const englishGenerator=read('scripts/generate-i18n-pilot.cjs');
assert(englishPage.includes('<p class="sub">'+escape(en.subtitle)+'</p>'),'EN summit subtitle stale');
assert(englishPage.includes('<h1>'+escape(en.title)+'</h1><p>'+escape(en.description)+'</p>'),'EN summit description stale');
assert(englishPage.includes('<meta name="description" content="'+escape(en.description.slice(0,220))+'">'),'EN summit meta stale');
assert(englishPage.includes('<h2>How to get there</h2><p>Summit access has not been verified'),'EN access warning missing');
assert(englishGenerator.includes('Summit access has not been verified by this guide'),'EN generator still has unverified routing promise');
assert(!englishPage.includes('An accredited State Park guide is mandatory'),'EN inherited mandatory-guide claim must not return');
assert(read('en/o-que-fazer/index.html').includes(escape(en.subtitle)),'EN discovery hub stale');
console.log('PEAKS-LOOKOUTS-FACTUAL-01 PASS: 2 records × 5 languages, SEO/access/source, safety filters and 48 attractions preserved.');
