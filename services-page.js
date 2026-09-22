(() => {
  const lang = (() => { try { return localStorage.getItem('ilhabela_lang') || 'pt'; } catch (_) { return 'pt'; } })();
  const copy = {
    pt:{back:'Atrações',badge:'Serviços úteis',title:'Serviços em Ilhabela',subtitle:'Alimentação, passeios, hospedagem e outros serviços para complementar sua visita.',near:'Usar minha localização',ready:'Mais próximos de você',distance:'Distância:',all:'Todos',map:'Google Maps',site:'Site',call:'Ligar',approx:'aprox.',note:'As distâncias são aproximadas, calculadas pela localização editorial de referência de cada serviço.',none:'Nenhum serviço encontrado com estes filtros.',locationError:'Não foi possível acessar sua localização.'},
    en:{back:'Attractions',badge:'Useful services',title:'Services in Ilhabela',subtitle:'Food, tours, accommodation and other services to complement your visit.',near:'Use my location',ready:'Nearest to you',distance:'Distance:',all:'All',map:'Google Maps',site:'Website',call:'Call',approx:'approx.',note:'Distances are approximate, based on each service’s editorial reference location.',none:'No services found with these filters.',locationError:'We could not access your location.'},
    fr:{back:'Attractions',badge:'Services utiles',title:'Services à Ilhabela',subtitle:'Restauration, excursions, hébergement et autres services pour compléter votre visite.',near:'Utiliser ma position',ready:'Les plus proches',distance:'Distance :',all:'Tous',map:'Google Maps',site:'Site',call:'Appeler',approx:'env.',note:'Les distances sont approximatives et utilisent le lieu éditorial de référence de chaque service.',none:'Aucun service trouvé avec ces filtres.',locationError:'Impossible d’accéder à votre position.'},
    es:{back:'Atracciones',badge:'Servicios útiles',title:'Servicios en Ilhabela',subtitle:'Alimentación, paseos, alojamiento y otros servicios para complementar tu visita.',near:'Usar mi ubicación',ready:'Más cercanos',distance:'Distancia:',all:'Todos',map:'Google Maps',site:'Sitio',call:'Llamar',approx:'aprox.',note:'Las distancias son aproximadas y usan la ubicación editorial de referencia de cada servicio.',none:'No se encontraron servicios con estos filtros.',locationError:'No se pudo acceder a tu ubicación.'},
    he:{back:'אטרקציות',badge:'שירותים שימושיים',title:'שירותים באילהבלה',subtitle:'אוכל, סיורים, לינה ושירותים נוספים להשלמת הביקור.',near:'השתמש במיקום שלי',ready:'הקרובים אליך',distance:'מרחק:',all:'הכל',map:'Google Maps',site:'אתר',call:'התקשר',approx:'בקירוב',note:'המרחקים משוערים ומבוססים על מיקום הייחוס העריכתי של כל שירות.',none:'לא נמצאו שירותים לפי הסינון.',locationError:'לא ניתן לגשת למיקום שלך.'}
  };
  const c=copy[lang]||copy.pt;
  document.documentElement.lang=lang; document.documentElement.dir=lang==='he'?'rtl':'ltr';
  document.getElementById('services-back').textContent=c.back;
  document.getElementById('services-badge').textContent=c.badge;
  document.getElementById('services-title').textContent=c.title;
  document.getElementById('services-subtitle').textContent=c.subtitle;
  document.querySelector('#services-nearby span:last-child').textContent=c.near;
  document.getElementById('services-distance-label').textContent=c.distance;
  document.getElementById('services-location-note').textContent=c.note;

  let category='all', userCoords=null;
  const categoryKeys={all:'servicesAll',tour:'servicesTours',diving:'servicesDiving',food:'servicesFood',stay:'servicesStay'};
  const trKey=(key)=>translations?.[lang]?.[key]||translations?.pt?.[key]||key;
  const serviceTr=(service)=>service.translations?.[lang]||service.translations?.pt||{};
  const referenceCoords=(service)=>{
    const ref=service.baseLocation?.spotId||service.baseLocation?.nearSpotId||service.contextSpotIds?.[0];
    return touristSpots.find(s=>s.id===ref)?.coords||null;
  };
  const distanceKm=(a,b)=>{
    const R=6371,toRad=d=>d*Math.PI/180,dLat=toRad(b[0]-a[0]),dLon=toRad(b[1]-a[1]);
    const x=Math.sin(dLat/2)**2+Math.cos(toRad(a[0]))*Math.cos(toRad(b[0]))*Math.sin(dLon/2)**2;
    return 2*R*Math.asin(Math.sqrt(x));
  };
  const mapUrl=(service)=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(service.name+' Ilhabela SP');

  function renderFilters(){
    const categories=['all',...new Set(servicesData.map(s=>s.category))];
    document.getElementById('services-page-filters').innerHTML=categories.map(cat=>`<button type="button" data-category="${cat}" class="shrink-0 px-3.5 py-2 rounded-full border text-xs font-bold ${cat===category?'bg-primary text-white border-primary':'bg-white text-on-surface-variant border-black/10'}">${trKey(categoryKeys[cat]||'servicesAll')}</button>`).join('');
    document.querySelectorAll('[data-category]').forEach(btn=>btn.onclick=()=>{category=btn.dataset.category;renderFilters();render();});
  }
  function render(){
    const limit=document.getElementById('services-distance').value;
    let rows=servicesData.map(service=>({service,coords:referenceCoords(service)})).map(row=>({...row,distance:userCoords&&row.coords?distanceKm(userCoords,row.coords):null}));
    if(category!=='all') rows=rows.filter(r=>r.service.category===category);
    if(userCoords){ if(limit!=='all') rows=rows.filter(r=>r.distance!==null&&r.distance<=Number(limit)); rows.sort((a,b)=>(a.distance??999)-(b.distance??999)); }
    document.getElementById('services-page-status').textContent=userCoords?`${c.ready} · ${rows.length}`:`${rows.length} ${trKey('navServices').toLowerCase()}`;
    const grid=document.getElementById('services-page-grid');
    if(!rows.length){grid.innerHTML=`<div class="md:col-span-2 lg:col-span-3 text-center py-12 text-sm text-on-surface-variant">${c.none}</div>`;return;}
    grid.innerHTML=rows.map(({service,distance})=>{
      const tr=serviceTr(service), details=tr.features||tr.tags||[];
      const image=service.image?`<img src="${service.image}" alt="${service.name}" class="w-full h-full object-cover" loading="lazy">`:`<div class="w-full h-full flex items-center justify-center bg-surface-container"><span class="material-symbols-outlined text-primary/30 text-5xl">${service.category==='food'?'restaurant':'storefront'}</span></div>`;
      const wa=service.whatsapp?`<a href="https://wa.me/55${service.whatsapp}" target="_blank" rel="noopener" class="min-h-11 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">chat</span>WhatsApp</a>`:'';
      const phone=service.phone?`<a href="tel:+55${service.phone}" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">call</span>${c.call}</a>`:'';
      const site=service.url?`<a href="${service.url}" target="_blank" rel="noopener" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">language</span>${c.site}</a>`:'';
      return `<article class="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm flex flex-col"><div class="h-40 relative">${image}<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-extrabold text-primary uppercase">${tr.type||trKey(categoryKeys[service.category])}</span></div><div class="p-4 flex flex-col flex-1 gap-3"><div><h2 class="text-lg font-bold text-primary font-heading">${service.name}</h2>${distance!==null?`<p class="text-xs font-bold text-secondary mt-1"><span class="material-symbols-outlined text-[14px] align-middle">near_me</span> ${c.approx} ${distance.toFixed(1)} km</p>`:''}</div><p class="text-xs text-on-surface-variant leading-relaxed">${tr.description||''}</p>${details.length?`<div class="flex flex-wrap gap-1.5">${details.slice(0,4).map(x=>`<span class="px-2 py-1 rounded-md bg-surface-container text-[10px] font-semibold text-on-surface-variant">${x}</span>`).join('')}</div>`:''}<div class="grid grid-cols-2 gap-2 mt-auto pt-1"><a href="${mapUrl(service)}" target="_blank" rel="noopener" class="col-span-2 min-h-11 px-3 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[17px]">map</span>${c.map}</a>${wa}${phone}${site}</div></div></article>`;
    }).join('');
  }
  document.getElementById('services-nearby').onclick=()=>{
    if(!navigator.geolocation){alert(c.locationError);return;}
    navigator.geolocation.getCurrentPosition(pos=>{
      userCoords=[pos.coords.latitude,pos.coords.longitude];
      document.getElementById('services-distance-wrap').classList.remove('hidden');
      document.getElementById('services-location-note').classList.remove('hidden');
      document.querySelector('#services-nearby span:last-child').textContent=c.ready;
      render();
    },()=>alert(c.locationError),{enableHighAccuracy:true,timeout:10000,maximumAge:60000});
  };
  document.getElementById('services-distance').onchange=render;
  renderFilters(); render();
})();