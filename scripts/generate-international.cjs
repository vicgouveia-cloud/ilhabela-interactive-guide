const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const parse5 = require('parse5');
const responsive = require('../responsive-images.js');
const {BASE,languages,esc,localized,alternates,metadata,json,breadcrumb} = require('./seo-common.cjs');
const reviewedAccess = require('./international-reviewed-access.json');
const ROOT = path.resolve(__dirname,'..');
const context = vm.createContext({console,document:{addEventListener(){}},window:{addEventListener(){}},localStorage:{getItem(){return null;}}});
for (const file of ['translations.js','data.js','additional-spots.js','attraction-photos.js','multimodal.js','planner.js']) vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),context);
const spots = vm.runInContext('touristSpots',context);
const translations = vm.runInContext('translations',context);
const services = vm.runInContext('servicesData',context);
const copy = {
  en: {explore:'Explore',heading:'Things to do in Ilhabela',details:'Details and access',highlights:'Highlights',access:'How to get there',tips:'Responsible travel',guide:'Open in Guide',trip:'Add to My Trip',contact:'Questions & suggestions',photo:'Photo',categories:{praias:'Beaches',cachoeiras:'Waterfalls',trilhas:'Trails and natural pools'},intro:'Explore Ilhabela by experience. Check the access information and local conditions before traveling.'},
  es: {explore:'Explorar',heading:'Qué hacer en Ilhabela',details:'Detalles y acceso',highlights:'Lo más destacado',access:'Acceso',tips:'Turismo responsable',guide:'Abrir en la guía',trip:'Añadir a Mi Viaje',contact:'Preguntas y sugerencias',photo:'Foto',categories:{praias:'Playas',cachoeiras:'Cascadas',trilhas:'Senderos y piscinas naturales'},intro:'Explora Ilhabela por tipo de experiencia. Consulta la información de acceso y las condiciones locales antes de viajar.'},
  fr: {explore:'Explorer',heading:'Que faire à Ilhabela',details:'Détails et accès',highlights:'Points forts',access:'Accès',tips:'Voyage responsable',guide:'Ouvrir dans le guide',trip:'Ajouter à Mon Voyage',contact:'Questions et suggestions',photo:'Photo',categories:{praias:'Plages',cachoeiras:'Cascades',trilhas:'Sentiers et piscines naturelles'},intro:'Explorez Ilhabela par type d’expérience. Consultez les informations d’accès et les conditions locales avant de partir.'},
  he: {explore:'סיור',heading:'מה לעשות באיליאבלה',details:'פרטים ודרכי הגעה',highlights:'נקודות עניין',access:'דרכי הגעה',tips:'תיירות אחראית',guide:'פתיחה במדריך',trip:'הוספה לטיול שלי',contact:'שאלות והצעות',photo:'צילום',categories:{praias:'חופים',cachoeiras:'מפלים',trilhas:'מסלולים ובריכות טבעיות'},intro:'גלו את איליאבלה לפי סוג החוויה. בדקו את דרכי ההגעה ואת התנאים המקומיים לפני היציאה.'}
};
const style = `*{box-sizing:border-box}body{margin:0;background:#faf7f0;color:#1b1c19;font:17px/1.6 system-ui,-apple-system,sans-serif}header,main,footer{max-width:1120px;margin:auto;padding:20px}header,nav,.actions{display:flex;flex-wrap:wrap;gap:16px;align-items:center}header{justify-content:space-between}a,h1,h2,h3{color:#003345}h1{font-size:clamp(2rem,6vw,3.5rem);line-height:1.15}.hero{width:100%;height:auto;max-height:470px;object-fit:cover;border-radius:20px}.detail{max-width:860px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:18px}.card,article{background:white;border:1px solid #ddd8ce;border-radius:18px;overflow:hidden;margin:20px 0}.body,.card{padding:18px}article img{width:100%;height:160px;object-fit:cover}.cta{display:inline-block;padding:12px 16px;background:#003345;color:white;border-radius:12px;text-decoration:none}footer{font-size:14px}small{overflow-wrap:anywhere}button{font:inherit}ul{padding-inline-start:22px}img{max-width:100%}`;
const analytics = `<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};document.addEventListener('click',function(event){const link=event.target.closest('[data-analytics]');if(link)window.va('event',{name:'SEO Entry Action',data:{action:link.dataset.analytics}});});</script><script defer src="/_vercel/insights/script.js"></script><script defer src="/bottom-nav.js?v=2"></script>`;
function write(route,html) { const file=path.join(ROOT,route,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html.replace(/^[ \t]+$/gm,'')); }
function shell(lang,route,title,description,body,schemas=[]) {
  const canonical=BASE+localized(lang,route), c=copy[lang];
  return `<!doctype html><html lang="${lang}" dir="${lang==='he'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Ilhabela Trip</title><meta name="description" content="${esc(description.slice(0,220))}"><link rel="canonical" href="${canonical}">${alternates(route)}<meta property="og:type" content="website"><meta property="og:locale" content="${{en:'en_US',es:'es_ES',fr:'fr_FR',he:'he_IL'}[lang]}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description.slice(0,220))}"><meta property="og:url" content="${canonical}">${schemas[0]?.image?.[0]?`<meta property="og:image" content="${esc(schemas[0].image[0])}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${esc(schemas[0].image[0])}">`:""}${schemas.map(s=>`<script type="application/ld+json">${json(s)}</script>`).join('')}<style>${style}</style><link rel="stylesheet" href="/contact.css"></head><body><header><a href="/${lang}/">Ilhabela Trip</a><nav><a href="/${lang}/o-que-fazer/">${c.explore}</a>${languages.map(l=>`<a lang="${l}" href="${localized(l,route)}">${l.toUpperCase()}</a>`).join(' ')}</nav></header><main>${body}</main><footer>Ilhabela Trip</footer>${analytics}</body></html>`;
}
function photoAttribution(s,lang) {
  if(s.id==='pico-de-sao-sebastiao')return responsive.attribution(s,lang);
  const record=s.photoAttributions?.find(p=>p.image===s.image);
  const credit=record?.credit||s.photoCredit,source=record?.source||s.photoSource;
  if(!credit||!source)return '';
  const license=record?.license||s.photoLicense,licenseUrl=record?.licenseUrl||s.photoLicenseUrl;
  const adaptation=record?.adaptation?.[lang]||({en:'Resized image.',es:'Imagen redimensionada.',fr:'Image redimensionnée.',he:'תמונה שונה בגודלה.'}[lang]);
  return '<small style="display:block;padding:6px">'+copy[lang].photo+': <a href="'+esc(source)+'" target="_blank" rel="noopener noreferrer">'+esc(credit)+'</a>'+(license&&licenseUrl?' · <a href="'+esc(licenseUrl)+'" target="_blank" rel="noopener noreferrer">'+esc(license)+'</a>':'')+(s.photoAdaptation||record?.adaptation?' · '+esc(adaptation):'')+'</small>';
}
function card(s,lang) {
  const tr=s.translations[lang],c=copy[lang],href=localized(lang,`/lugares/${s.id}/`);
  return `<article data-spot="${s.id}"><a href="${href}"><img src="/${esc(s.image)}"${responsive(s.image,'(max-width:640px) 100vw, 400px')} alt="${esc(s.photoCaption?.[lang]||tr.title)}" loading="lazy" decoding="async"></a>${photoAttribution(s,lang)}<div class="body"><h2><a href="${href}">${esc(tr.title)}</a></h2><p>${esc(tr.subtitle)}</p><a data-analytics="view_attraction" href="${href}">${c.details}</a> · <a data-analytics="add_trip" href="/${lang}/?spot=${s.id}&amp;add=trip">${c.trip}</a></div></article>`;
}
// Fail before writing if any approved catalog translation is absent.
for (const s of spots) for (const lang of languages) {
  const tr=s.translations?.[lang];
  for (const key of ['title','subtitle','description','ecoTip']) if (!tr?.[key]?.trim()) throw Error(`${s.id}/${lang}/${key} missing`);
  if (!tr.specs?.access || !tr.highlights?.length) throw Error(`${s.id}/${lang} incomplete`);
}
const paired=['/','/servicos/','/roteiros/2-dias/','/roteiros/3-dias/','/o-que-fazer/','/praias/','/cachoeiras/','/trilhas/',...spots.map(s=>`/lugares/${s.id}/`)];
for (const route of paired) {const file=path.join(ROOT,route,'index.html');fs.writeFileSync(file,metadata(fs.readFileSync(file,'utf8'),route));}
for (const lang of languages.filter(l=>l!=='pt')) {
  const c=copy[lang];
  for (const s of spots) {
    const tr=s.translations[lang],route=`/lugares/${s.id}/`,image=BASE+'/'+s.image;
    const schema={'@context':'https://schema.org','@type':'TouristAttraction','@id':BASE+localized(lang,route)+'#attraction',name:tr.title,description:tr.description,url:BASE+localized(lang,route),image:[image],geo:{'@type':'GeoCoordinates',latitude:s.coords[0],longitude:s.coords[1]},address:{'@type':'PostalAddress',addressLocality:'Ilhabela',addressRegion:'SP',addressCountry:'BR'}};
    const credit=photoAttribution(s,lang);
    const body=`<div class="detail"><p class="sub">${esc(tr.subtitle)}</p><img class="hero" src="/${esc(s.image)}"${responsive(s.image,'(max-width:860px) calc(100vw - 40px), 820px')} alt="${esc(s.photoCaption?.[lang]||tr.title)}" fetchpriority="high" decoding="async">${credit}<h1>${esc(tr.title)}</h1><p>${esc(tr.description)}</p><section class="card"><h2>${c.highlights}</h2><ul>${tr.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul></section><section class="card"><h2>${c.access}</h2>${reviewedAccess[s.id]?.[lang]?`<p>${esc(reviewedAccess[s.id][lang])}</p>`:""}<p>${esc(tr.specs.access)}</p></section><section class="card"><h2>${c.tips}</h2><p>${esc(tr.ecoTip)}</p></section><p class="actions"><a class="cta" data-analytics="open_guide" href="/${lang}/?spot=${s.id}&amp;lang=${lang}">${c.guide}</a><a class="cta" data-analytics="add_trip" href="/${lang}/?spot=${s.id}&amp;add=trip&amp;lang=${lang}">${c.trip}</a></p><button type="button" data-contact-entry data-contact-type="attraction" data-contact-id="${s.id}" data-contact-name="${esc(tr.title)}">${c.contact}</button><script defer src="/contact.js"></script></div>`;
    write(localized(lang,route),shell(lang,route,tr.title,tr.description,body,[schema,breadcrumb(lang,route,tr.title,c.explore)]));
  }
  for (const [slug,label] of [['o-que-fazer',c.heading],...Object.entries(c.categories)]) {
    const selected=slug==='o-que-fazer'?spots:spots.filter(s=>s.category===slug),route=`/${slug}/`;
    const schema={'@context':'https://schema.org','@type':'ItemList',name:label,url:BASE+localized(lang,route),numberOfItems:selected.length,itemListElement:selected.map((s,i)=>({'@type':'ListItem',position:i+1,name:s.translations[lang].title,url:BASE+localized(lang,`/lugares/${s.id}/`)}))};
    const body=`<h1>${esc(label)}</h1><p>${c.intro}</p><nav>${Object.entries(c.categories).map(([id,text])=>`<a href="/${lang}/${id}/">${text}</a>`).join('')}</nav><div class="grid">${selected.map(s=>card(s,lang)).join('')}</div>`;
    write(localized(lang,route),shell(lang,route,label,c.intro,body,[schema]));
  }
  for (const days of [2,3]) {
    const route='/roteiros/'+days+'-dias/';
    const pt=fs.readFileSync(path.join(ROOT,route,'index.html'),'utf8');
    const ids=[...new Set([...pt.matchAll(/href="\/lugares\/([^/]+)\/"/g)].map(m=>m[1]))];
    if(ids.length!==10)throw Error('Itinerary contract '+route);
    const title={en:days+' days in Ilhabela',es:days+' días en Ilhabela',fr:days+' jours à Ilhabela',he:days+' ימים באיליאבלה'}[lang];
    const selected=ids.map(id=>spots.find(s=>s.id===id));
    const schema={'@context':'https://schema.org','@type':'ItemList',name:title,url:BASE+localized(lang,route),numberOfItems:10,itemListElement:selected.map((s,i)=>({'@type':'ListItem',position:i+1,name:s.translations[lang].title,url:BASE+localized(lang,'/lugares/'+s.id+'/')}))};
    const labels={en:['Day','North coast and Vila','Castelhanos or Bonete — choose one alternative'],es:['Día','Costa norte y Vila','Castelhanos o Bonete — elige una alternativa'],fr:['Jour','Côte nord et Vila','Castelhanos ou Bonete — choisissez une option'],he:['יום','החוף הצפוני ווילה','קסטלניוס או בונטה — בחרו חלופה אחת']}[lang];
    const groups=days===2?[{title:labels[0]+' 1',items:selected.slice(0,4)},{title:labels[0]+' 2 — '+labels[1],items:selected.slice(4,8)},{title:labels[0]+' 2 — '+labels[2],items:selected.slice(8)}]:[{title:labels[0]+' 1',items:selected.slice(0,4)},{title:labels[0]+' 2 — '+labels[2],items:selected.slice(4,6)},{title:labels[0]+' 3 — '+labels[1],items:selected.slice(6)}];
    const body='<h1>'+title+'</h1><p>'+c.intro+'</p>'+groups.map(group=>'<section><h2>'+group.title+'</h2><div class="grid">'+group.items.map(s=>card(s,lang)).join('')+'</div></section>').join('')+'<p><a href="/'+lang+'/roteiros/'+(days===2?3:2)+'-dias/">'+{en:'Itinerary',es:'Itinerario',fr:'Itinéraire',he:'מסלול'}[lang]+' '+(days===2?3:2)+'</a></p>';
    write(localized(lang,route),shell(lang,route,title,c.intro,body,[schema]));
  }
  for (const route of ['/','/servicos/']) {
  // Serialize translated initial markup, so search engines and no-JS visitors see the approved UI copy.
  const doc=parse5.parse(fs.readFileSync(path.join(ROOT,route,'index.html'),'utf8'));
  function walk(node) {
    const attrs=node.attrs||[],attr=name=>attrs.find(a=>a.name===name);
    if(node.tagName==='html') {attr('lang').value=lang;attr('dir').value=lang==='he'?'rtl':'ltr';}
    if(attr('data-contact-entry')) {
      if(attr('aria-label'))attr('aria-label').value=c.contact;
      if(attr('title'))attr('title').value=c.contact;
      if(node.childNodes?.length===1&&node.childNodes[0].nodeName==='#text')node.childNodes[0].value=c.contact;
    }
    if(node.nodeName==='#text'&&node.value.trim()==='Guia Interativo')node.value={en:'Interactive guide',es:'Guía interactiva',fr:'Guide interactif',he:'מדריך אינטראקטיבי'}[lang];
    const key=attr('data-i18n')?.value;
    if(key) {if(typeof translations[lang][key]!=='string') throw Error('Missing UI '+lang+'/'+key);node.childNodes=[{nodeName:'#text',value:translations[lang][key],parentNode:node}];}
    for(const name of ['alt','placeholder','aria-label']) {const key=attr('data-i18n-'+name)?.value;if(key&&attr(name))attr(name).value=translations[lang][key];}
    for(const a of attrs) if(a.name==='href'&&['/servicos/','/o-que-fazer/','/praias/','/cachoeiras/','/trilhas/'].includes(a.value))a.value=localized(lang,a.value);
    for(const a of attrs) if(a.name==='href'&&a.value.startsWith('#'))a.value='/'+lang+'/'+a.value;
    for(const a of attrs) if(['src','href'].includes(a.name)&&/^(assets\/|[a-z][\w.-]+\.(js|css)(\?|$))/.test(a.value))a.value='/'+a.value;
    for(const child of node.childNodes||[])walk(child);
  }
  walk(doc);
  if(route==='/servicos/') {
    const find=n=>n.attrs?.some(a=>a.name==='id'&&a.value==='services-page-grid')?n:(n.childNodes||[]).map(find).find(Boolean);
    const grid=find(doc);
    const cards=services.map(service=>{const tr=service.translations[lang];if(!tr?.description)throw Error('Missing service translation '+service.id+'/'+lang);return '<article data-service-id="'+service.id+'"><h2>'+esc(service.name)+'</h2><p>'+esc(tr.type)+'</p><p>'+esc(tr.description)+'</p></article>';}).join('');
    grid.childNodes=parse5.parseFragment(cards).childNodes;for(const child of grid.childNodes)child.parentNode=grid;
  }
  let home=parse5.serialize(doc).replace(/(<link rel="canonical" href=")[^"]+/, '$1'+BASE+localized(lang,route)).replace(/(<meta property="og:url" content=")[^"]+/,'$1'+BASE+localized(lang,route));
  home=home.replace(/(<meta name="description" content=")[^"]+/,'$1'+esc(c.intro)).replace(/(<meta property="og:locale" content=")[^"]+/,'$1'+({en:'en_US',es:'es_ES',fr:'fr_FR',he:'he_IL'}[lang]));
  const pageTitle=translations[lang][route==='/'?'pageTitle':'servicesPageTitle'];
  home=home.replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]+/g, '$1'+esc(pageTitle));
  home=home.replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]+/g, '$1'+esc(c.intro));
  home=home.replace('<head>','<head><base href="/">');
  home=home.replace('</head>',`<script type="application/ld+json">${json({'@context':'https://schema.org','@type':route==='/'?'WebSite':'CollectionPage',name:'Ilhabela Trip',url:BASE+localized(lang,route),inLanguage:lang})}</script></head>`);
  if(route==='/servicos/')home=metadata(home,route);
  write(localized(lang,route),home);
  }
}
// Sitemap contains only existing, indexable, self-canonical pages.
const entries=paired.flatMap(route=>languages.map(lang=>({url:BASE+localized(lang,route),route})));
const xml=entries.map(({url,route})=>`<url><loc>${url}</loc>${route?alternates(route).replaceAll('<link ','<xhtml:link ').replaceAll('>','/>'):''}</url>`).join('\n');
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${xml}\n</urlset>\n`);
console.log(`International SEO: ${spots.length} attractions × 4 languages; ${entries.length} indexable URLs.`);
