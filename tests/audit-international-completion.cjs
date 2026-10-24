const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const parse5=require('parse5');
const {BASE,languages,localized,metadata}=require('../scripts/seo-common.cjs');
const {execFileSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'..');
const ctx=vm.createContext({console});
for(const f of ['translations.js','data.js','additional-spots.js','attraction-photos.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx);
const spots=vm.runInContext('touristSpots',ctx);
const translations=vm.runInContext('translations',ctx);
const services=vm.runInContext('servicesData',ctx);
for(const s of spots){
  const file='lugares/'+s.id+'/index.html',route='/lugares/'+s.id+'/';
  const before=execFileSync('git',['show','5a9f0f085dc0c4c1c45787779f1f6cbbd9ddab1f:'+file],{cwd:ROOT,encoding:'utf8'}).replace(/\r\n/g,'\n');
  const after=fs.readFileSync(path.join(ROOT,file),'utf8').replace(/\r\n/g,'\n');
  assert.equal(metadata(after,route),metadata(before,route),s.id+' approved Portuguese HTML preserved except audited hreflang');
}

const sitemap=fs.readFileSync(path.join(ROOT,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(urls.length,290);assert.equal(new Set(urls).size,290);
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
function all(n,tag){return [...(n.tagName===tag?[n]:[]),...(n.childNodes||[]).flatMap(c=>all(c,tag))];}
function text(n){return n.value||n.childNodes?.map(text).join('')||'';}
let links=0,schemas=0;
for(const url of urls){
  const route=new URL(url).pathname,file=path.join(ROOT,route,'index.html');
  const html=fs.readFileSync(file,'utf8'),doc=parse5.parse(html);
  const lang=route.match(/^\/(en|es|fr|he)\//)?.[1]||'pt';
  const pathname=lang==='pt'?route:route.slice(3);
  assert(attr(all(doc,'html')[0],'lang').startsWith(lang),route+' language');
  assert.equal(all(doc,'link').filter(n=>attr(n,'rel')==='canonical').length,1,route+' one canonical');
  assert.equal(attr(all(doc,'link').find(n=>attr(n,'rel')==='canonical'),'href'),url,route+' self canonical');
  assert(!all(doc,'meta').some(n=>attr(n,'name')==='robots'&&/noindex/.test(attr(n,'content'))),route+' indexable');
  assert.equal(all(doc,'h1').length,1,route+' one H1');
  {
    const alts=all(doc,'link').filter(n=>attr(n,'rel')==='alternate');assert.equal(alts.length,6,route+' complete alternatives');
    for(const l of languages)assert(alts.some(n=>attr(n,'hreflang')===l&&attr(n,'href')===BASE+localized(l,pathname)),route+' reciprocal '+l);
    assert(alts.some(n=>attr(n,'hreflang')==='x-default'&&attr(n,'href')===BASE+pathname));
  }
  if(lang!=='pt'&&['/','/servicos/'].includes(pathname)){
    const title=translations[lang][pathname==='/'?'pageTitle':'servicesPageTitle'];
    assert.equal(text(all(doc,'title')[0]),title,route+' translated title');
    assert.equal(attr(all(doc,'meta').find(n=>attr(n,'property')==='og:title'),'content'),title,route+' translated social title');
  }
  if(lang!=='pt'&&pathname==='/servicos/')for(const service of services)assert(text(all(doc,'body')[0]).includes(service.translations[lang].description),route+' static service '+service.id);
  if(lang==='he')assert.equal(attr(all(doc,'html')[0],'dir'),'rtl',route+' RTL');
  for(const node of all(doc,'script').filter(n=>attr(n,'type')==='application/ld+json')){
    const schema=JSON.parse(text(node));schemas++;
    assert(schema['@context']==='https://schema.org');
    assert(!/aggregateRating|reviewRating/.test(JSON.stringify(schema)),route+' no invented ratings');
    if(schema['@type']==='TouristAttraction'){
      const id=pathname.split('/')[2],s=spots.find(s=>s.id===id),tr=s.translations[lang];
      assert.equal(schema.name,tr.title);assert.equal(schema.description,tr.description);assert.equal(schema.url,url);
      assert.equal(schema.geo.latitude,s.coords[0]);assert.equal(schema.geo.longitude,s.coords[1]);
    }
    if(schema['@type']==='ItemList'){
      assert.equal(schema.itemListElement.length,schema.numberOfItems);
      schema.itemListElement.forEach((item,i)=>{assert.equal(item.position,i+1);assert(urls.includes(item.url));});
    }
    if(schema['@type']==='BreadcrumbList')schema.itemListElement.forEach(item=>assert(urls.includes(item.item)));
  }
  if(lang!=='pt'&&pathname.startsWith('/lugares/')){
    const s=spots.find(s=>pathname===`/lugares/${s.id}/`),tr=s.translations[lang];
    assert.equal(text(all(doc,'h1')[0]),tr.title);
    if(s.photoCredit)assert(text(all(doc,'body')[0]).includes(s.photoCredit),route+' original photo credit');
    if(s.photoLicense==='©')assert(!text(all(doc,'body')[0]).includes('CC BY'),route+' author archive must not claim a public license');
    else if(s.photoLicenseUrl)assert(all(doc,'a').some(a=>attr(a,'href')===s.photoLicenseUrl),route+' original photo license');
    for(const value of [tr.description,tr.specs.access,tr.ecoTip,...tr.highlights])assert(text(all(doc,'body')[0]).includes(value),route+' approved content');
  }
  for(const a of [...all(doc,'a'),...all(doc,'link')]){
    const href=attr(a,'href');if(!href||/^(mailto:|tel:|javascript:|data:)/.test(href))continue;
    const target=new URL(href,url);if(target.origin!==BASE)continue;
    const local=path.join(ROOT,target.pathname),resolved=path.extname(local)?local:path.join(local,'index.html');
    assert(fs.existsSync(resolved),route+' broken internal link '+href);links++;
    if(target.hash&&!target.search&&target.pathname===route){const id=decodeURIComponent(target.hash.slice(1));assert(html.includes(`id="${id}"`)||html.includes(`id='${id}'`),route+' missing anchor '+id);}
  }
}
console.log(`International SEO PASS: 290 pages, ${schemas} schemas, ${links} internal links; approved content, canonicals, reciprocal hreflang, RTL and sitemap.`);
