// WATERFALL-FACTUAL-02: five authorized attractions, independent of PR34 facts.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const parseRaw=(file,name)=>{
 const source=read(file),start=source.indexOf('const '+name+' = ');
 assert(start>=0,'missing authored '+name);
 const end=source.indexOf('];',start);
 return JSON.parse(source.slice(start+('const '+name+' = ').length,end+1));
};
const primary=parseRaw('data.js','touristSpots');
const extra=parseRaw('additional-spots.js','additionalTouristSpots');
const raw=[...primary,...extra];
const context=vm.createContext({console});
for(const file of ['data.js','additional-spots.js','attraction-photos.js'])vm.runInContext(read(file),context,{filename:file});
const spots=JSON.parse(vm.runInContext('JSON.stringify(touristSpots)',context));
const access=JSON.parse(read('scripts/attraction-access-copy.json'));
const expected={
 'cachoeira-da-laje':{image:'assets/images/cachoeira-da-laje_1.jpg',coords:[-23.932171146209154,-45.40923386772312],pt:['4,6 km','pedras escorregadias'],en:'4.6 km',fr:'4,6 km',es:'4,6 km',he:'4.6',source:'https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-do-bonete/'},
 'cachoeira-da-toca':{image:'assets/images/cachoeira-da-toca_1.jpg',coords:[-23.8056,-45.3489],pt:['propriedade particular','Pedras molhadas'],en:'privately owned',fr:'propriété privée',es:'propiedad privada',he:'הפרטית',source:'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15089/dia-dos-namorados-3-dicas-para-aproveitar-ilhabela-em-casal'},
 'cachoeira-do-paqueta':{image:'assets/images/cachoeira-do-paqueta_1.jpg',coords:[-23.8572,-45.4089],pt:['acidentes graves','fatais'],en:'potentially fatal',fr:'mortels',es:'mortales',he:'קטלניות',source:'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/122/prefeitura-de-ilhabela-alerta-sobre-risco-ao-visitar-cachoeira-do-paqueta'},
 'poco-do-furado':{image:'assets/images/attraction-placeholder.svg',coords:[-23.8325,-45.3604],pt:['570 metros','não se estende'],en:'570 meters',fr:'570 mètres',es:'570 metros',he:'570',source:'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/16294/cachoeiras-em-ilhabela-conheca-7-opcoes-de-facil-acesso'},
 'cachoeira-do-poco-fundo':{image:'assets/images/attraction-placeholder.svg',coords:[-23.910209781923758,-45.343693232441986],pt:['10 minutos','barco'],en:'10 minutes',fr:'10 minutes',es:'10 minutos',he:'כעשר דקות',source:'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/16294/cachoeiras-em-ilhabela-conheca-7-opcoes-de-facil-acesso'}
}; // Authored source pins verified against main@d9a897fe4287fe88f65476eac8e482a36f073a11.
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
assert.equal(spots.length,50);
for(const [id,rule] of Object.entries(expected)){
 const authored=raw.find(s=>s.id===id),live=spots.find(s=>s.id===id);
 assert(authored&&live,id+': missing attraction');
 assert.equal(authored.image,rule.image,id+': original image changed');
 assert.deepEqual(authored.coords,rule.coords,id+': coordinates changed');
 assert.deepEqual(live.coords,rule.coords,id+': live coordinates changed');
 assert.equal(authored.routing??null,null,id+': introduced unvalidated routing');
 const t=authored.translations,pt=t.pt;
 for(const word of rule.pt)assert(pt.description.includes(word),id+': missing PT safety '+word);
 for(const lang of ['pt','en','fr','es','he']){
   const tr=t[lang];assert(tr?.description?.length>100&&tr?.highlights?.length===4&&tr?.ecoTip&&tr?.specs?.access&&tr?.specs?.duration,id+': incomplete '+lang);
   if(lang!=='pt')assert(tr.description.includes(rule[lang]),id+': untranslated safety '+lang);
 }
 assert(access[id]?.copy&&access[id]?.provenance?.reference===rule.source,id+': source/access mismatch');
 const html=read('lugares/'+id+'/index.html');
 const meta=esc(pt.description.replace(/\s+/g,' ').trim().slice(0,220));
 assert(html.includes('<meta name="description" content="'+meta+'">'),id+': meta drift');
 assert(html.includes('<meta property="og:description" content="'+meta+'">'),id+': og drift');
 assert(html.includes('<meta name="twitter:description" content="'+meta+'">'),id+': twitter drift');
 assert(html.includes('<p class="sub">'+esc(pt.subtitle)+'</p>'),id+': subtitle drift');
 assert(html.includes('<h1>'+esc(pt.title)+'</h1><p>'+esc(pt.description)+'</p>'),id+': body drift');
 assert(html.includes('<h2>Como chegar</h2><p>'+esc(access[id].copy)+'</p>'),id+': regenerated access drift');
 assert(html.includes('<li>'+esc(pt.highlights[0])+'</li>'),id+': highlights drift');
 const tag='<script type="application/ld+json">',begin=html.indexOf(tag),end=html.indexOf('</script>',begin);
 assert(begin>=0&&end>begin,id+': no JSON-LD');
 const schema=JSON.parse(html.slice(begin+tag.length,end));
 assert.equal(schema.description,pt.description,id+': schema description drift');
 assert.equal(schema.geo.latitude,rule.coords[0],id+': latitude drift');
 assert.equal(schema.geo.longitude,rule.coords[1],id+': longitude drift');
 for(const hub of ['cachoeiras/index.html','o-que-fazer/index.html']){
  const content=read(hub);
  assert(content.includes(esc(pt.subtitle)),id+': stale hub '+hub);
 }
}
// Explicitly guarantee that Veloso is not part of this batch.
const {execFileSync}=require('node:child_process');
const BASE='d9a897fe4287fe88f65476eac8e482a36f073a11';
const baseData=execFileSync('git',['show',BASE+':data.js'],{cwd:ROOT,encoding:'utf8',maxBuffer:10*1024*1024});
const marker='const touristSpots = ',from=baseData.indexOf(marker),to=baseData.indexOf('];',from);
const oldVeloso=JSON.parse(baseData.slice(from+marker.length,to+1)).find(s=>s.id==='cachoeira-do-veloso');
assert.deepEqual(raw.find(s=>s.id==='cachoeira-do-veloso'),oldVeloso,'Veloso must remain identical to main');
for(const path of ['lugares/cachoeira-do-veloso/index.html']){
 assert.equal(read(path),execFileSync('git',['show',BASE+':'+path],{cwd:ROOT,encoding:'utf8'}),'Veloso static page must remain unchanged');
}
const baseAccess=JSON.parse(execFileSync('git',['show',BASE+':scripts/attraction-access-copy.json'],{cwd:ROOT,encoding:'utf8'}));
assert.deepEqual(access['cachoeira-do-veloso'],baseAccess['cachoeira-do-veloso'],'Veloso access unchanged');
const paqueta=raw.find(s=>s.id==='cachoeira-do-paqueta');
assert(paqueta.translations.pt.subtitle.includes('acidentes graves'));
assert(paqueta.specs.structure.includes('segurança'));
assert(!paqueta.tags.includes('Piscina Infinita'));
const furado=raw.find(s=>s.id==='poco-do-furado');
assert(furado.translations.pt.description.includes('rampa acessível')&&furado.translations.pt.description.includes('não se estende'));
const fundo=raw.find(s=>s.id==='cachoeira-do-poco-fundo');
assert(fundo.translations.pt.specs.access.includes('barco'));
console.log('WATERFALL-FACTUAL-02 PASS: 5 attractions, 5 locales; Veloso unchanged, safety/source/meta/hubs and original media/coordinates/routing');
