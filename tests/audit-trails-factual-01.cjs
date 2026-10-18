// TRAIL-FACTUAL-01: official guidance for Agua Branca, Bonete and Pico do Baepi.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'..');
const BASE='d7b9eacce5dca1be741b33e072999326947d88f6';
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const old=p=>execFileSync('git',['show',BASE+':'+p],{cwd:ROOT,encoding:'utf8',maxBuffer:12*1024*1024});
const parse=(s,name)=>{const marker='const '+name+' = ',start=s.indexOf(marker),end=s.indexOf('];',start);assert(start>=0&&end>start);return JSON.parse(s.slice(start+marker.length,end+1));};
const fresh=parse(read('data.js'),'touristSpots');
const historical=parse(old('data.js'),'touristSpots');
const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const official={
 'trilha-da-agua-branca':{km:'3,6',source:'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/16722/trilhas-em-ilhabela-veja-algumas-opcoes-de-diferentes-niveis-de-dificuldade-para-conhecer',term:{pt:'3,6 km',en:'3.6 km',es:'3,6 km',fr:'3,6 km',he:'3.6'},pt2:'cinco poços'},
 'trilha-do-bonete':{km:'24 km',source:'https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-do-bonete/',term:{pt:'24 km',en:'24 km',es:'24 km',fr:'24 km',he:'24 ק״מ'},pt2:'monitoria opcional'},
 'pico-do-baepi':{km:'7 a 8 km',source:'https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-do-pico-do-baepi/',term:{pt:'monitoria obrigatória',en:'mandatory guiding',es:'monitor obligatorio',fr:'guide obligatoire',he:'מדריך'},pt2:'5h30 a 6h'}
};
assert.equal(fresh.length,28);
const copy=JSON.parse(read('scripts/attraction-access-copy.json'));
const copyOld=JSON.parse(old('scripts/attraction-access-copy.json'));
for(const [id,c] of Object.entries(official)){
 const now=fresh.find(s=>s.id===id),before=historical.find(s=>s.id===id);
 assert(now&&before,id+': missing');
 // Only editorial copy changes: no image, location, metadata or routing mutations.
 for(const key of Object.keys(before).filter(k=>!['tags','specs','translations'].includes(k))){
  if(id==='pico-do-baepi' && key==='attributes'){
   assert.equal(before.attributes.isSunset,true,'Baepi historic sunset flag');
   assert.equal(now.attributes.isSunset,false,'Do not recommend Baepi as sunset outing');
   assert.deepEqual({...now.attributes,isSunset:true},before.attributes,id+' preserve other flags');
  }else assert.deepEqual(now[key],before[key],id+' unexpectedly changed '+key);
 }
 assert.deepEqual(now.coords,before.coords,id+' coords');
 assert.deepEqual(now.routing,before.routing,id+' routing');
 assert.deepEqual(now.images,before.images,id+' images');
 assert(now.specs.distance.includes(c.km),id+': incorrect km');
 for(const locale of ['pt','en','es','fr','he']){
  const t=now.translations[locale];
  assert(t?.subtitle?.length>30&&t?.description?.length>100&&t?.highlights?.length===4&&t?.ecoTip?.length>15,id+': incomplete '+locale);
  assert(t.description.includes(c.term[locale]),id+': no official guidance '+locale);
  for(const key of ['distance','duration','access','structure'])assert(t.specs?.[key]?.length>15,id+': missing '+locale+' '+key);
 }
 assert.equal(copy[id].provenance.reference,c.source,id+': source incorrect');
 assert(copy[id].copy.length>150,id+': access guidance missing');
 assert.equal(copy[id].provenance.pendingAccess,copyOld[id].provenance.pendingAccess,id+' access status');
 const h=read('lugares/'+id+'/index.html'),pt=now.translations.pt;
 const meta=esc(pt.description.replace(/\s+/g,' ').slice(0,220));
 for(const attr of ['name="description"','property="og:description"','name="twitter:description"'])assert(h.includes('<meta '+attr+' content="'+meta+'">'),id+' static '+attr);
 assert(h.includes('<p class="sub">'+esc(pt.subtitle)+'</p>'),id+' subtitle drift');
 assert(h.includes('<h1>'+esc(pt.title)+'</h1><p>'+esc(pt.description)+'</p>'),id+' body drift');
 assert(h.includes('<h2>Como chegar</h2><p>'+esc(copy[id].copy)+'</p>'),id+' access drift');
 assert(h.includes('<li>'+esc(pt.highlights[0])+'</li>'),id+' highlights drift');
 const tag='<script type="application/ld+json">',pos=h.indexOf(tag),end=h.indexOf('</script>',pos);
 assert(pos>=0&&end>pos,id+' missing JSONLD');
 const json=JSON.parse(h.slice(pos+tag.length,end));
 assert.equal(json.description,pt.description,id+' schema drift');
 assert.equal(json.geo.latitude,before.coords[0],id+' schema latitude');
 assert.equal(json.geo.longitude,before.coords[1],id+' schema longitude');
 const hub=id==='pico-do-baepi'?'o-que-fazer/index.html':'trilhas/index.html';
 assert(read(hub).includes(esc(pt.subtitle)),id+' stale hub');
 assert(read('o-que-fazer/index.html').includes(esc(pt.subtitle)),id+' stale discover page');
}
const agua=fresh.find(x=>x.id==='trilha-da-agua-branca');
assert(agua.translations.pt.description.includes('cinco poços')||agua.translations.pt.description.includes('cinco poços'.replace('cinco','cinco')));
assert(!agua.translations.pt.description.includes('mais acessível'));
const bonete=fresh.find(x=>x.id==='trilha-do-bonete');
assert(bonete.translations.pt.description.includes('12 km só de ida'));
assert(bonete.translations.pt.description.includes('4 a 6 horas'));
assert(bonete.translations.pt.description.includes('agendamento online'));
const baepi=fresh.find(x=>x.id==='pico-do-baepi');
assert(baepi.translations.pt.description.includes('monitoria obrigatória'));
assert(!baepi.translations.pt.highlights.some(x=>/pôr do sol/i.test(x)));
assert(baepi.translations.pt.description.includes('400 metros'));
for(const id of ['trilha-da-cabecuda-farol','piscinas-naturais-do-sul','mirante-do-baepi']){
 const now=fresh.find(x=>x.id===id),prev=historical.find(x=>x.id===id);
 assert.deepEqual(now,prev,id+' unexpectedly edited');
 assert.equal(read('lugares/'+id+'/index.html'),old('lugares/'+id+'/index.html'),id+' static unexpectedly edited');
}
console.log('TRAIL-FACTUAL-01 PASS: 3 factual attractions × 5 languages, source, SEO, routing/media and 3 untouched neighbors.');
