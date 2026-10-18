const assert = require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const context=vm.createContext({console});
for(const file of ['data.js','additional-spots.js','attraction-photos.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),context,{filename:file});
const spots=JSON.parse(vm.runInContext('JSON.stringify(touristSpots)',context));
const before=Object.fromEntries(spots.map(s=>[s.id,s]));
const access=require('../scripts/attraction-access-copy.json');
const ids=['cachoeira-do-gato','cachoeira-da-friagem','cachoeira-dos-tres-tombos'];
const locales=['pt','en','fr','es','he'];
const expected={
 'cachoeira-do-gato':{difficulty:'moderate',duration:'1h a 1h30',distance:'4 a 5 km (trilha oficial)',phrases:['Poço do Gordo','Poço do Gordo','Poço do Gordo','Poço do Gordo','Poço do Gordo']},
 'cachoeira-da-friagem':{difficulty:'hard',duration:'1h30 a 2h',distance:'2 a 3 km (trilha oficial)',phrases:['obrigatória','mandatory','obligatoire','obligatorio','חובה']},
 'cachoeira-dos-tres-tombos':{difficulty:'easy',duration:'Não informado oficialmente',distance:'aprox. 720 m (ida e volta)',phrases:['contemplação','viewing','contemplation','contemplación','לצפייה']}
};
const escape=v=>String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
for(const id of ids){
 const s=before[id], e=expected[id];
 assert.equal(s.specs.difficulty,e.difficulty,id+' difficulty');
 assert.equal(s.specs.duration,e.duration,id+' duration');
 assert.equal(s.specs.distance,e.distance,id+' distance');
 assert.ok(s.routing,id+' routing retained');
 for(let i=0;i<locales.length;i++){
  const l=locales[i],tr=s.translations[l];
  assert(tr.description.includes(e.phrases[i]),id+' '+l+' safety description');
  assert.equal(tr.highlights.length,4,id+' '+l+' four highlights');
  assert(tr.specs.access && tr.specs.duration && tr.specs.distance,id+' '+l+' access details');
  assert(tr.ecoTip && tr.ecoTip.trim(),id+' '+l+' ecoTip remains');
 }
 assert(access[id].provenance.publicSource.startsWith('https://'),id+' sourced advisory');
 const page=fs.readFileSync(path.join(ROOT,'lugares',id,'index.html'),'utf8');
 const pt=s.translations.pt;
 assert(page.includes('<p class="sub">'+escape(pt.subtitle)+'</p>'),id+' static subtitle');
 assert(page.includes('<h1>'+escape(pt.title)+'</h1><p>'+escape(pt.description)+'</p>'),id+' static description');
 assert(page.includes(escape(access[id].copy)),id+' static access advisory');
 const schema=JSON.parse(page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema.description,pt.description,id+' schema');
 assert.equal(schema.image[0],'https://ilhabelatrip.com/'+s.image,id+' hero unchanged');
 for(const hi of pt.highlights)assert(page.includes('<li>'+escape(hi)+'</li>'),id+' static highlight');
}
for(const hub of ['cachoeiras/index.html','o-que-fazer/index.html']){
 const html=fs.readFileSync(path.join(ROOT,hub),'utf8');
 for(const id of ids)assert(html.includes('<p>'+escape(before[id].translations.pt.subtitle)+'</p>'),hub+' '+id+' card');
}
console.log('PASS safety: 3 attractions, 5 languages, original images/routing, static pages, hubs, descriptions and verified access.');
