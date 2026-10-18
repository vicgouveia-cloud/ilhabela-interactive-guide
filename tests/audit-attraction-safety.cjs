const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({console});
for(const f of ['data.js','additional-spots.js','attraction-photos.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const spots=vm.runInContext('touristSpots',ctx),services=vm.runInContext('servicesData',ctx);
const copies=JSON.parse(fs.readFileSync(path.join(root,'scripts/attraction-access-copy.json'),'utf8'));
assert.equal(spots.length,50);assert.equal(services.length,129);assert.equal(services.filter(s=>s.category==='food').length,68);
const fixed={
 'cachoeira-do-gato':{pos:[-23.8589,-45.2819],difficulty:'moderate',duration:'1h a 1h30'},
 'cachoeira-da-friagem':{pos:[-23.7456,-45.3411],difficulty:'hard',duration:'1h30 a 2h'},
 'cachoeira-dos-tres-tombos':{pos:[-23.8486,-45.4019],difficulty:'moderate',duration:'até 1h (percurso)'}
};
for(const [id,expected] of Object.entries(fixed)){
 const spot=spots.find(s=>s.id===id);assert(spot,id);
 assert.deepEqual(Array.from(spot.coords),expected.pos,id+': coordinates changed');
 assert.equal(spot.specs.difficulty,expected.difficulty);assert.equal(spot.specs.duration,expected.duration);
 assert(fs.existsSync(path.join(root,spot.image)),id+': image missing');
 assert.deepEqual(Object.keys(spot.translations).sort(),['en','es','fr','he','pt']);
 for(const [lang,t] of Object.entries(spot.translations)){
  assert(t.subtitle&&t.description&&t.ecoTip&&t.highlights.length===4,id+': incomplete '+lang);
  assert(t.specs.distance&&t.specs.duration&&t.specs.access);
  if(id==='cachoeira-do-gato')assert(t.description.includes(lang==='he'?'פוסו דו גורדו':'Poço do Gordo'));
  if(id==='cachoeira-da-friagem')assert(t.ecoTip.length>40);
  if(id==='cachoeira-dos-tres-tombos')assert(t.highlights.some(h=>/contempla|viewing|תצפית/.test(h)));
 }
 const html=fs.readFileSync(path.join(root,'lugares',id,'index.html'),'utf8'),tr=spot.translations.pt;
 assert(html.includes(tr.subtitle),id+': static subtitle');
 assert(html.includes(tr.description.replaceAll("'",'&#39;')),id+': static description');
 assert(html.includes(copies[id].copy),id+': static access');
 const mark='<script type="application/ld+json">',start=html.indexOf(mark),end=html.indexOf('</script>',start);
 assert(start>=0&&end>start);const obj=JSON.parse(html.slice(start+mark.length,end));
 assert.equal(obj.description,tr.description);assert.deepEqual([obj.geo.latitude,obj.geo.longitude],expected.pos);
 for(const [dir,lang] of [['','pt'],['en/','en']])for(const hub of ['o-que-fazer/index.html','cachoeiras/index.html']){
  const page=fs.readFileSync(path.join(root,dir+hub),'utf8');
  assert(page.includes(id));assert(page.includes(spot.translations[lang].subtitle),id+': stale hub '+dir+hub);
 }
}
console.log('CAT-SAFETY-01: 3 waterfalls, 5 languages, 3 static pages, 4 hubs, 50 attractions and 129 services validated.');
