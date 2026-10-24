let map=null,mapLayers={},currentMapLayerKey="satellite",mapMarkers=[],mapMarkerCluster=null;const mobileMapQuery=window.matchMedia("(max-width: 767px)");let currentLang=readStorage("ilhabela_lang",null),currentCategory="all",activeAttributes=new Set,searchQuery="",quickCardSpotId=null,selectedSpotId=null,userLocationMarker=null,userLocationControl=null,lastUserLocation=null;document.addEventListener("DOMContentLoaded",()=>{initI18n(),document.getElementById("map")&&initMap(),renderCategoryCounts(),renderSpotsGrid(),renderGuides(),renderServicesDirectory(),populateBookingGuides(),initFilterCarousel();const n=new URLSearchParams(window.location.search).get("spot");n&&touristSpots.some(o=>o.id===n)&&openSpotModal(n,{updateUrl:!1}),document.querySelector('header a[href="/?view=trip"]')?.addEventListener("click",o=>{o.preventDefault(),openPlannerSummary()});const a=new Date;a.setDate(a.getDate()+1);const r=document.getElementById("booking-date");r&&(r.value=a.toISOString().split("T")[0],r.min=new Date().toISOString().split("T")[0])});const supportedLanguages=["pt","en","fr","es","he"];function detectInitialLanguage(){const e=typeof window<"u"&&window.location?.pathname?.match(/^\/(en|es|fr|he)\b/);if(e&&supportedLanguages.includes(e[1]))return e[1];if(supportedLanguages.includes(currentLang))return currentLang;let n=[];try{n=navigator.languages?.length?navigator.languages:[navigator.language]}catch{}for(const a of n){const r=typeof a=="string"?a.toLowerCase().split(/[-_]/)[0]:"";if(supportedLanguages.includes(r))return r}return"en"}currentLang=detectInitialLanguage();function readStorage(e,n){try{return localStorage.getItem(e)||n}catch{return n}}function writeStorage(e,n){try{localStorage.setItem(e,n)}catch{}}function resolveTranslation(e,n,a){const r=e?.[n];if(r==null||r==="")throw new Error(`Missing translation: ${a}.${n}`);return r}function t(e){return resolveTranslation(translations[currentLang],e,`ui.${currentLang}`)}function getSpotTranslation(e){return resolveTranslation(e.translations,currentLang,e.id)}function getGuideTranslation(e){return resolveTranslation(e.translations,currentLang,e.id)}function getServiceTranslation(e){return resolveTranslation(e.translations,currentLang,e.id)}function closeLanguageMenu(e=!1){const n=document.getElementById("language-menu"),a=document.getElementById("lang-btn");n&&(n.hidden=!0),a?.setAttribute("aria-expanded","false"),e&&a?.focus()}function initI18n(){const e=document.getElementById("language-selector"),n=document.getElementById("lang-btn"),a=document.getElementById("language-menu");n?.addEventListener("click",()=>{a.hidden=!a.hidden,n.setAttribute("aria-expanded",String(!a.hidden))}),document.addEventListener("click",r=>{e?.contains(r.target)||closeLanguageMenu()}),document.addEventListener("keydown",r=>{if(r.key==="Escape"){if(a&&!a.hidden){closeLanguageMenu(!0);return}closeBookingModal(),closeSpotModal(),hideMapQuickCard()}}),e?.addEventListener("focusout",r=>{e.contains(r.relatedTarget)||closeLanguageMenu()}),setLanguage(currentLang,!1)}function rerenderServicesPage(){!document.getElementById("services-page-grid")||typeof window.renderServicesPage!="function"||window.renderServicesPage()}function setLanguage(e,n=!0){currentLang=supportedLanguages.includes(e)?e:"pt",writeStorage("ilhabela_lang",currentLang),document.documentElement.lang=currentLang,document.documentElement.dir=currentLang==="he"?"rtl":"ltr";const a=document.getElementById("current-lang-label");a&&(a.textContent=currentLang.toUpperCase()),document.querySelectorAll("[data-language-select]").forEach(s=>{s.value=currentLang});const r=document.getElementById("language-menu"),o=r&&!r.hidden;closeLanguageMenu(o),translateMapControls(),updateUserLocationControl(),userLocationMarker&&lastUserLocation&&(userLocationMarker.setPopupContent(t("youAreHere")),userLocationMarker.getElement()?.setAttribute("aria-label",t("youAreHere"))),document.querySelectorAll("[data-i18n]").forEach(s=>{s.textContent=t(s.dataset.i18n)});for(const s of["placeholder","aria-label","title","alt"])document.querySelectorAll(`[data-i18n-${s}]`).forEach(l=>{l.setAttribute(s,t(l.getAttribute(`data-i18n-${s}`)))});if(window.dispatchEvent(new Event("guide-language-change")),typeof updatePlannerHeading=="function"&&updatePlannerHeading(),n&&typeof currentPlannerView<"u"&&document.body.classList.contains("planner-open")&&(currentPlannerView==="summary"?renderSummary():(renderPlannerFilters(),renderDeckCard())),document.querySelectorAll("[data-spot-id]").forEach(s=>{s.textContent=getSpotTranslation(touristSpots.find(l=>l.id===s.dataset.spotId)).title}),n&&(renderSpotsGrid(),renderGuides(),renderServicesDirectory(),rerenderServicesPage(),updateMapMarkers(),populateBookingGuides(),updateBookingEstimate(),window.dispatchEvent(new Event("resize")),quickCardSpotId&&!document.getElementById("map-quick-card")?.classList.contains("hidden")&&showMapQuickCard(touristSpots.find(s=>s.id===quickCardSpotId)),selectedSpotId)){const s=currentModalImageIndex,l=document.querySelector("#spot-modal .modal-sheet"),c=l.scrollTop;openSpotModal(selectedSpotId),setModalImage(s),l.scrollTop=c}}function initMap(){const e=[-23.824,-45.365],n=L.latLngBounds([-24.02,-45.5],[-23.65,-45.18]);if(map=L.map("map",{center:e,zoom:11,minZoom:10,maxZoom:18,zoomControl:!1,maxBounds:n,maxBoundsViscosity:1,worldCopyJump:!1}),map.on("click movestart zoomstart",hideMapQuickCard),document.querySelector(".map-frame")?.addEventListener("pointerleave",hideMapQuickCard),L.control.zoom({position:"bottomright"}).addTo(map),initMobileMapLayerToggle(),initUserLocationControl(),translateMapControls(),L.control.scale({position:"bottomleft",imperial:!1,maxWidth:120}).addTo(map),mapLayers.voyager=L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>',maxZoom:19,noWrap:!0,bounds:n}),mapLayers.satellite=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"&copy; Esri & Earthstar Geographics",maxZoom:19,noWrap:!0,bounds:n}),mapLayers.topo=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",{attribution:"&copy; Esri, USGS, NOAA, OpenStreetMap contributors",maxZoom:18,noWrap:!0,bounds:n}),map.fitBounds([[-23.98,-45.46],[-23.69,-45.23]],{padding:[18,18]}),mapLayers.satellite.addTo(map),window.ResizeObserver){const a=document.getElementById("map");a&&new ResizeObserver(()=>{map.invalidateSize({animate:!1})}).observe(a.parentElement||a)}mobileMapQuery.addEventListener("change",updateMapMarkers),updateMapMarkers()}function initUserLocationControl(){const e=L.Control.extend({options:{position:"bottomright"},onAdd(){const n=L.DomUtil.create("div","leaflet-bar"),a=L.DomUtil.create("button","",n);return a.type="button",a.id="map-user-location-btn",a.style.width="34px",a.style.height="34px",a.style.display="flex",a.style.alignItems="center",a.style.justifyContent="center",a.style.background="#fff",a.style.border="0",a.style.cursor="pointer",a.innerHTML='<span class="material-symbols-outlined" style="font-size:20px">my_location</span>',L.DomEvent.disableClickPropagation(n),L.DomEvent.on(a,"click",locateUserOnMap),n}});userLocationControl=new e,userLocationControl.addTo(map),updateUserLocationControl()}function updateUserLocationControl(e="idle"){const n=document.getElementById("map-user-location-btn");if(!n)return;const a=e==="loading";n.disabled=a,n.setAttribute("aria-label",t(a?"locatingUser":"locateMe")),n.title=t(a?"locatingUser":"locateMe");const r=n.querySelector(".material-symbols-outlined");r&&(r.textContent=a?"progress_activity":"my_location")}function locateUserOnMap(){if(!map||!navigator.geolocation){updateUserLocationControl(),window.alert(t("locationUnavailable"));return}updateUserLocationControl("loading"),navigator.geolocation.getCurrentPosition(e=>{const n=[e.coords.latitude,e.coords.longitude];lastUserLocation=n,userLocationMarker?userLocationMarker.setLatLng(n):(userLocationMarker=L.circleMarker(n,{radius:9,color:"#ffffff",weight:3,fillColor:"#2563eb",fillOpacity:1}).addTo(map),userLocationMarker.bindPopup("")),userLocationMarker.setPopupContent(t("youAreHere")),userLocationMarker.getElement()?.setAttribute("aria-label",t("youAreHere")),map.flyTo(n,Math.max(map.getZoom(),15),{duration:.8}),updateUserLocationControl()},e=>{updateUserLocationControl(),window.alert(t(e.code===1?"locationDenied":"locationUnavailable"))},{enableHighAccuracy:!0,timeout:1e4,maximumAge:6e4})}function resetMapView(){map&&(map.closePopup(),hideMapQuickCard(),map.fitBounds([[-23.98,-45.46],[-23.69,-45.23]],{padding:[18,18],animate:!0}))}function switchMapLayer(e){Object.values(mapLayers).forEach(n=>map.removeLayer(n)),mapLayers[e]&&(mapLayers[e].addTo(map),currentMapLayerKey=e),["voyager","satellite","topo"].forEach(n=>{const a=document.getElementById(`layer-${n}`);a&&a.classList.toggle("active",n===currentMapLayerKey)}),updateMobileMapLayerToggle()}function initMobileMapLayerToggle(){if(!map||typeof L>"u")return;const e=L.Control.extend({options:{position:"bottomright"},onAdd(){const n=L.DomUtil.create("div","leaflet-bar mobile-map-layer-control"),a=L.DomUtil.create("button","mobile-map-layer-toggle",n);return a.type="button",a.id="mobile-map-layer-toggle",a.innerHTML='<span class="material-symbols-outlined" aria-hidden="true">layers</span>',L.DomEvent.disableClickPropagation(n),L.DomEvent.disableScrollPropagation(n),L.DomEvent.on(a,"click",()=>{switchMapLayer(currentMapLayerKey==="satellite"?"voyager":"satellite")}),n}});new e().addTo(map),updateMobileMapLayerToggle()}function updateMobileMapLayerToggle(){const e=document.getElementById("mobile-map-layer-toggle");if(!e)return;const a=currentMapLayerKey!=="satellite"?"Alternar para satélite":"Alternar para mapa";e.setAttribute("aria-label",a),e.title=a}function getCategoryIcon(e){switch(e){case"praias":return"beach_access";case"cachoeiras":return"water_drop";case"trilhas":return"hiking";case"picos":return"terrain";case"baleias":return"water_lux";case"mergulho":return"scuba_diving";case"cultura":return"museum";case"mirantes":return"visibility";default:return"place"}}function getCategoryLabel(e){return t({praias:"filterBeaches",cachoeiras:"filterWaterfalls",trilhas:"filterTrails",picos:"filterPeaks",baleias:"filterWhales",mergulho:"filterDiving",cultura:"filterCulture",mirantes:"filterLookouts"}[e]||e)}function getRatingLabel(e,n=!1){return typeof e.rating!="number"?t("newInGuide"):`★ ${e.rating}${n?` (${e.reviews})`:""}`}function updateMapMarkers(){if(!map)return;mapMarkerCluster&&(mapMarkerCluster.clearLayers(),map.removeLayer(mapMarkerCluster),mapMarkerCluster=null),mapMarkers.forEach(a=>map.removeLayer(a)),mapMarkers=[];const e=mobileMapQuery.matches;e&&typeof L.markerClusterGroup=="function"&&(mapMarkerCluster=L.markerClusterGroup({maxClusterRadius:28,showCoverageOnHover:!1,zoomToBoundsOnClick:!0,spiderfyOnMaxZoom:!0,spiderfyDistanceMultiplier:1.35,removeOutsideVisibleBounds:!1,iconCreateFunction:a=>{const r=[...new Set(a.getAllChildMarkers().map(c=>c.options.spotCategory))],o=a.getChildCount(),s=t("mapClusterLabel").replace("{n}",o),l=r.map(getCategoryLabel).join(" · ");return L.divIcon({className:"map-category-cluster",html:`<div class="map-cluster-content" role="img" aria-label="${s} ${l}" title="${l}"><strong>${o}</strong><div class="map-cluster-categories">${r.slice(0,2).map(c=>`<span class="pin-${c} material-symbols-outlined" title="${getCategoryLabel(c)}">${getCategoryIcon(c)}</span>`).join("")}</div></div>`,iconSize:[48,44],iconAnchor:[24,22]})}}).addTo(map)),getFilteredSpots().forEach(a=>{const r=getSpotTranslation(a),o=getCategoryIcon(a.category),s=L.divIcon({className:"custom-pin-container main-map-pin",html:`
        <div class="custom-pin" id="pin-${a.id}">
          <div class="pin-pulse pin-${a.category}"></div>
          <div class="pin-icon-wrap pin-${a.category}">
            <span class="material-symbols-outlined text-[16px]">${o}</span>
          </div>
        </div>
      `,iconSize:e?[27,27]:[30,30],iconAnchor:e?[13.5,13.5]:[15,15]}),l=L.marker(a.coords,{icon:s,spotCategory:a.category,keyboard:!0,title:r.title||"",alt:`${r.title} — ${t("spotDetails")}`});l.addTo(mapMarkerCluster||map),l.getElement()?.setAttribute("aria-label",`${r.title} — ${t("spotDetails")}`),l.bindTooltip(`
      <div class="text-xs font-semibold">
        <strong class="text-primary block text-sm font-heading">${r.title||""}</strong>
        <span class="text-on-surface-variant">${r.subtitle||""}</span>
      </div>
    `,{className:"leaflet-tooltip-custom",direction:"auto",offset:[0,-17]}),window.matchMedia("(hover: hover) and (pointer: fine)").matches&&l.on("mouseover",()=>showMapQuickCard(a)),l.on("click",()=>{hideMapQuickCard(),map.flyTo(a.coords,14,{duration:1.2}),openSpotModal(a.id)}),mapMarkers.push(l)})}function showMapQuickCard(e){if(!e)return;quickCardSpotId=e.id;const n=document.getElementById("map-quick-card");if(!n)return;const a=getSpotTranslation(e),r=t(`difficulty${e.specs.difficulty.charAt(0).toUpperCase()+e.specs.difficulty.slice(1)}`);n.innerHTML=`
    <div class="flex gap-3 items-center">
      <img src="${e.image}"${responsiveImageAttrs(e.image,"80px")}${e.id==="pico-de-sao-sebastiao"?' style="object-position:center bottom"':""} alt="${e.id==="pico-de-sao-sebastiao"?e.photoCaption[currentLang]:a.title}" class="w-20 h-20 rounded-xl object-cover shadow-sm flex-shrink-0" />
      <div class="flex-1 min-w-0 space-y-1">
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${getDifficultyBadgeClass(e.specs.difficulty)}">
            ${r}
          </span>
          <span class="text-[11px] font-bold text-amber-600 flex items-center gap-0.5">
            ${getRatingLabel(e)}
          </span>
        </div>
        <h4 class="text-sm font-bold text-primary leading-tight font-heading">${a.title}</h4>
        <p class="text-xs text-on-surface-variant line-clamp-2">${a.subtitle}</p>${responsiveImageAttrs.attribution(e,currentLang)}
        <button onclick="openSpotModal('${e.id}')" class="map-quick-card-action text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-0.5">
          <span>${t("spotDetails")}</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
    <button type="button" onclick="hideMapQuickCard()" aria-label="${t("closeModal")}" class="map-quick-card-action absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-primary shadow flex items-center justify-center">
      <span class="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
    </button>
  `,n.setAttribute("aria-hidden","false"),n.classList.remove("hidden")}function hideMapQuickCard(){quickCardSpotId=null;const e=document.getElementById("map-quick-card");e&&(e.classList.add("hidden"),e.setAttribute("aria-hidden","true"),e.replaceChildren())}function initFilterCarousel(){const e=document.getElementById("category-filter-list");if(!e)return;const n=document.querySelector('[data-filter-scroll="left"]'),a=document.querySelector('[data-filter-scroll="right"]'),r=()=>{const s=Math.max(0,e.scrollWidth-e.clientWidth),l=Math.abs(e.scrollLeft);n&&(n.disabled=l<=4),a&&(a.disabled=l>=s-4)},o=s=>e.scrollBy({left:s*(currentLang==="he"?-1:1)*Math.max(220,e.clientWidth*.72),behavior:"smooth"});n?.addEventListener("click",()=>o(-1)),a?.addEventListener("click",()=>o(1)),e.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),requestAnimationFrame(r)}function normalizeSearchText(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function getFilteredSpots(){return touristSpots.filter(e=>{if(currentCategory!=="all"&&e.category!==currentCategory)return!1;for(let n of activeAttributes)if(!e.attributes[n])return!1;if(searchQuery.trim()){const n=normalizeSearchText(searchQuery),a=getSpotTranslation(e),r=normalizeSearchText(a.title).includes(n),o=normalizeSearchText(a.subtitle).includes(n),s=normalizeSearchText(a.description).includes(n),l=[...a.highlights||[],...e.tags||[]].some(c=>normalizeSearchText(c).includes(n));if(!r&&!o&&!s&&!l)return!1}return!0})}function filterCategory(e){currentCategory=e,document.querySelectorAll(".cat-pill").forEach(n=>{const a=n.getAttribute("data-cat")===e;n.classList.toggle("active",a),n.setAttribute("aria-pressed",String(a)),a&&window.matchMedia("(max-width: 767px)").matches&&n.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}),renderSpotsGrid(),updateMapMarkers()}function toggleAttributeFilter(e){const n=document.getElementById(`attr-${e}`);activeAttributes.has(e)?activeAttributes.delete(e):activeAttributes.add(e);const a=activeAttributes.has(e);n&&(n.classList.toggle("active",a),n.setAttribute("aria-pressed",String(a)),a&&window.matchMedia("(max-width: 767px)").matches&&n.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})),renderSpotsGrid(),updateMapMarkers()}function handleSearch(e){searchQuery=e;const n=document.getElementById("clear-search-btn");n&&n.classList.toggle("hidden",!e),renderSpotsGrid(),updateMapMarkers()}function clearSearch(){const e=document.getElementById("search-input");e&&(e.value=""),searchQuery="",handleSearch("")}function renderCategoryCounts(){const e={all:touristSpots.length,praias:0,cachoeiras:0,trilhas:0,picos:0,baleias:0,mergulho:0,cultura:0,mirantes:0};touristSpots.forEach(n=>{e[n.category]!==void 0&&e[n.category]++}),Object.keys(e).forEach(n=>{const a=document.getElementById(`count-${n}`);a&&(a.innerText=e[n])})}function renderSpotsGrid(){const e=getFilteredSpots();renderCustomSpotsList(e)}function renderCustomSpotsList(e){const n=document.getElementById("spots-grid"),a=document.getElementById("results-count-num");if(a&&(a.innerText=e.length),!n)return;if(e.length===0){n.innerHTML=`
      <div class="col-span-full py-16 text-center space-y-4">
        <span class="material-symbols-outlined text-5xl text-gray-400">search_off</span>
        <p class="text-base text-on-surface-variant font-medium">${t("noResults")}</p>
        <button onclick="filterCategory('all'); clearSearch();" class="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-colors">
          ${t("clearFilters")}
        </button>
      </div>
    `;return}const r=e.map(o=>{try{const s=getSpotTranslation(o),l=s.subtitle||s.description||"";return`
        <article onclick="openSpotModal('${o.id}')" data-category="${o.category}" class="glass-card attraction-card rounded-2xl overflow-hidden cursor-pointer flex flex-col group relative animate-fade-in">
          <div class="attraction-card-photo relative w-full overflow-hidden bg-gray-100">
            <img src="${o.image}"${responsiveImageAttrs(o.image,"(max-width: 640px) 100vw, 400px")}${o.id==="pico-de-sao-sebastiao"?' style="object-position:center bottom"':""} alt="${o.id==="pico-de-sao-sebastiao"?o.photoCaption[currentLang]:s.title}" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div class="attraction-card-body flex-1 flex flex-col">
            <span class="attraction-card-category">
              <span aria-hidden="true" class="material-symbols-outlined">${getCategoryIcon(o.category)}</span>
              ${getCategoryLabel(o.category)}
            </span>
            <h3 class="attraction-card-title font-heading">${s.title}</h3>
            <p class="attraction-card-summary">${l}</p>${responsiveImageAttrs.attribution(o,currentLang)}
            <button type="button" class="attraction-card-details" aria-label="${t("spotDetails")}: ${s.title}">
              <span>${t("spotDetails")}</span>
              <span aria-hidden="true" class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </article>
      `}catch(s){return console.warn("[home] could not render attraction card",o?.id,s),""}}).filter(Boolean);if(!r.length){n.innerHTML=`
      <div class="col-span-full py-16 text-center space-y-3">
        <span class="material-symbols-outlined text-5xl text-gray-400">error_outline</span>
        <p class="text-base text-on-surface-variant font-medium">${t("noResults")}</p>
      </div>
    `;return}n.innerHTML=r.join("")}function getDifficultyBadgeClass(e){switch(e){case"easy":return"bg-emerald-100 text-emerald-800 border border-emerald-300";case"moderate":return"bg-amber-100 text-amber-800 border border-amber-300";case"hard":return"bg-purple-100 text-purple-800 border border-purple-300";case"extreme":return"bg-red-100 text-red-800 border border-red-300";default:return"bg-gray-100 text-gray-800"}}function setViewMode(e){const n=document.getElementById("map-section"),a=document.getElementById("explore-section"),r=document.getElementById("tab-map"),o=document.getElementById("tab-grid");e==="map"?(r&&(r.className="view-tab active px-4 py-1.5 flex items-center gap-1.5"),o&&(o.className="view-tab px-4 py-1.5 flex items-center gap-1.5"),map&&setTimeout(()=>map.invalidateSize(),120)):(o&&(o.className="view-tab active px-4 py-1.5 flex items-center gap-1.5"),r&&(r.className="view-tab px-4 py-1.5 flex items-center gap-1.5"));const s=e==="map"?n:a;if(s){const c=document.querySelector(".site-header"),u=document.querySelector(".home-discovery"),d=(c?c.getBoundingClientRect().height:0)+(window.matchMedia("(min-width: 768px)").matches&&u?u.offsetHeight:0)+12;window.scrollTo({top:Math.max(0,s.getBoundingClientRect().top+window.scrollY-d),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}const l=document.getElementById("bn-map");l&&l.classList.toggle("active",e==="map")}let currentModalImages=[],currentModalImageIndex=0;function getSpotRoadNavigationCoords(e){if(!e)return null;if(typeof resolvePlannerAccess=="function"){const n=resolvePlannerAccess(e,"auto");if(n?.coords)return n.coords}return e.routing?.roadRoutable===!0?e.coords:null}function setSpotUrl(e,n=!1){const a=new URL(window.location.href);e?a.searchParams.set("spot",e):a.searchParams.delete("spot");const r=e?{spotId:e}:{};window.history[n?"replaceState":"pushState"](r,"",a)}let spotModalReturnFocus=null;function toggleSpotTripFromModal(e){typeof toggleSpotInTrip=="function"&&(toggleSpotInTrip(e),openSpotModal(e,{updateUrl:!1}),document.querySelector("#spot-modal .spot-trip-toggle")?.focus({preventScroll:!0}))}function openTripFromSpotModal(){closeSpotModal(),typeof openPlannerSummary=="function"&&openPlannerSummary()}function openSpotModal(e,n={}){const a=touristSpots.find(i=>i.id===e);if(!a)return;selectedSpotId||(spotModalReturnFocus=document.activeElement);const r=document.activeElement;hideMapQuickCard(),selectedSpotId=e,n.updateUrl!==!1&&new URLSearchParams(window.location.search).get("spot")!==e&&setSpotUrl(e),currentModalImages=a.images&&a.images.length>0?a.images:[a.image],currentModalImageIndex=0;const o=getSpotTranslation(a),s=document.getElementById("spot-modal"),l=document.getElementById("spot-modal-content");if(!s||!l)return;const c=getDifficultyBadgeClass(a.specs.difficulty),u=["easy","moderate","hard","extreme"].includes(a.specs.difficulty)?t(`difficulty${a.specs.difficulty.charAt(0).toUpperCase()+a.specs.difficulty.slice(1)}`):"",d=typeof isSpotInTrip=="function"&&isSpotInTrip(a.id);l.innerHTML=`
    <!-- Modal Hero Gallery Slider -->
    <div class="spot-detail-hero relative w-full rounded-2xl overflow-hidden bg-gray-900 shadow-md">
      
      <!-- Main Slide Image -->
      <div class="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden flex items-center justify-center">
        <img id="modal-main-img" src="${currentModalImages[0]}"${responsiveImageAttrs(currentModalImages[0],"(max-width: 768px) 100vw, 900px")}${a.id==="pico-de-sao-sebastiao"?' style="object-position:center bottom"':""} alt="${a.id==="pico-de-sao-sebastiao"?a.photoCaption[currentLang]:o.title}" class="w-full h-full object-cover transition-all duration-500" onerror="this.removeAttribute('srcset');this.removeAttribute('sizes');this.onerror=null;this.src='${a.id==="pico-de-sao-sebastiao"?a.image:"assets/images/baia-de-castelhanos_verified.jpg"}'" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

        <!-- Prev / Next Slider Arrows -->
        ${currentModalImages.length>1?`
          <button aria-label="${t("previousPhoto")}" onclick="prevModalImage(event)" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all z-20">
            <span class="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button aria-label="${t("nextPhoto")}" onclick="nextModalImage(event)" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all z-20">
            <span class="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
          
          <!-- Image Index Indicator -->
          <div class="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold z-20" id="modal-img-counter">
            <bdi>1 / ${currentModalImages.length}</bdi> ${t("photos")}
          </div>
        `:""}
      </div>

      ${a.photoSource?`
        <a id="modal-photo-credit" href="${a.photoSource}" target="_blank" rel="noopener noreferrer" class="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-semibold text-white/90 hover:bg-black/75 transition-colors" onclick="event.stopPropagation()">
          ${t("photoCredit")}: ${a.photoCredit}
        </a>
      `:""}


    </div>

    <!-- License and accurate photo subject for newly added CC-licensed images. -->
    <div id="modal-photo-license" class="text-[11px] text-on-surface-variant leading-relaxed px-1 ${a.photoLicense&&a.photoLicenseUrl?"":"hidden"}" data-photo-license>
      ${a.photoLicense&&a.photoLicenseUrl?`
        ${a.id==="pico-de-sao-sebastiao"?`<details class="rounded-lg border border-black/10 px-2 py-1"><summary class="cursor-pointer font-semibold text-primary">${photoDetailsLabel(currentLang)}</summary><div class="mt-1">`:""}
        <a href="${a.photoLicenseUrl}" target="_blank" rel="noopener noreferrer" class="underline font-semibold">${a.photoLicense}</a>
        · ${t("photoCredit")}: <a href="${a.photoSource}" target="_blank" rel="noopener noreferrer" class="underline">${a.photoCredit}</a>
        ${(()=>{const i=a.photoAttributions&&a.photoAttributions[0]?.adaptation||a.photoAdaptation,p=formatPhotoAdaptation(i,currentLang);return p?` · ${p}`:""})()}
        ${a.photoCaption?` · ${a.photoCaption[currentLang]||a.photoCaption.pt}`:""}
        ${a.id==="pico-de-sao-sebastiao"?"</div></details>":""}
      `:""}
    </div>

    <!-- Thumbnails Gallery Strip -->
    ${currentModalImages.length>1?`
      <div class="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar" id="modal-thumbnails">
        ${currentModalImages.map((i,p)=>`
          <button aria-label="${t("photos")} ${p+1}" onclick="setModalImage(${p})" class="modal-thumb-btn w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 ${p===0?"border-primary scale-105":"border-transparent opacity-70 hover:opacity-100"} transition-all shadow-sm">
            <img src="${i}"${responsiveImageAttrs(i,"80px")} alt="" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.parentElement.style.display='none'" />
          </button>
        `).join("")}
      </div>
    `:""}

    <header class="spot-detail-heading">
      <span class="spot-detail-category"><span aria-hidden="true" class="material-symbols-outlined">${getCategoryIcon(a.category)}</span>${getCategoryLabel(a.category)}</span>
      <h2 id="spot-modal-title">${o.title}</h2>
      <p class="spot-detail-summary">${o.subtitle}</p>
      <div class="spot-detail-meta">${u?`<span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${c}">${u}</span>`:""}<span>${typeof a.rating=="number"?`${getRatingLabel(a,!0)} ${t("reviews")}`:getRatingLabel(a)}</span></div>
    </header>
    <div class="spot-detail-trip" aria-live="polite">
      <button type="button" class="spot-trip-toggle" aria-pressed="${d}" onclick="toggleSpotTripFromModal('${a.id}')"><span aria-hidden="true" class="material-symbols-outlined">${d?"playlist_remove":"playlist_add"}</span><span>${t(d?"spotRemoveTrip":"spotAddTrip")}</span></button>
      ${d?`<button type="button" class="spot-trip-view" onclick="openTripFromSpotModal()">${t("spotViewTrip")}<span aria-hidden="true" class="material-symbols-outlined">route</span></button>`:""}
    </div>
    <!-- Description & Highlights -->
    <div class="space-y-4">
      <p class="text-sm md:text-base text-on-surface-variant leading-relaxed">${o.description}</p>
      
      ${o.highlights?`
        <div class="space-y-2">
          <h4 class="text-xs font-bold text-primary uppercase tracking-wider">${t("experienceHighlights")}</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${o.highlights.map(i=>`
              <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 text-xs font-semibold text-primary">
                <span class="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <span>${i}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>

    <!-- TECHNICAL SPECS GRID -->
    <div class="p-5 rounded-2xl bg-surface-container/80 border border-black/5 space-y-3">
      <h4 class="text-xs font-bold text-primary uppercase tracking-wider">${t("technicalSpecs")}</h4>
      
      <!-- Distance, duration and elevation require explicit per-measure validation before display. -->

      <div class="pt-3 border-t border-black/5 space-y-2 text-xs">
        <div>
          <strong class="text-primary">${t("accessType")}:</strong>
          <span class="text-on-surface-variant ml-1">${o.specs.access}</span>
        </div>
        <div>
          <strong class="text-primary">${t("seaCondition")}:</strong>
          <span class="text-on-surface-variant ml-1">${o.specs.sea}</span>
        </div>
        <div>
          <strong class="text-primary">${t("infrastructure")}:</strong>
          <span class="text-on-surface-variant ml-1">${o.specs.structure}</span>
        </div>
      </div>
    </div>

    <!-- Eco & Borrachudos Tips -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <div class="p-4 rounded-2xl bg-secondary-container/30 border border-secondary/20 space-y-1">
        <strong class="text-secondary font-bold flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">eco</span>
          ${t("ecoTipTitle")}
        </strong>
        <p class="text-on-surface-variant">${o.ecoTip}</p>
      </div>


    </div>

    ${renderLocalRecommendations(a.id)}

    <a href="/lugares/${a.id}/" class="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
      <span class="material-symbols-outlined text-[17px]">article</span>
      <span>${t("attractionPageLink")}</span>
    </a>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 pt-2">
      ${(()=>{const i=getSpotRoadNavigationCoords(a);return i?`<a href="https://www.google.com/maps/dir/?api=1&destination=${i[0]},${i[1]}" target="_blank" rel="noopener noreferrer" class="flex-1 py-3.5 rounded-xl border-2 border-primary text-primary hover:bg-primary/5 text-xs font-bold flex items-center justify-center gap-2 transition-colors">
          <span class="material-symbols-outlined text-[18px]">directions</span>
          <span>${t("openInGoogleMaps")}</span>
        </a>`:""})()}

      <button onclick="closeSpotModal(); openBookingForSpot('${a.id}')" class="flex-1 py-3.5 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-colors">
        <span class="material-symbols-outlined text-[18px]">person_pin</span>
        <span>${t("bookThisTour")}</span>
      </button>
    </div>
  `,s.classList.remove("hidden"),s.classList.add("flex"),(!s.contains(r)||!r.isConnected)&&s.querySelector(".spot-trip-toggle")?.focus({preventScroll:!0})}document.addEventListener("keydown",e=>{const n=document.getElementById("spot-modal");if(e.key!=="Tab"||!n?.classList.contains("flex"))return;const a=[...n.querySelectorAll('button, a[href], select, [tabindex="0"]')].filter(s=>s.getClientRects().length),r=a[0],o=a[a.length-1];e.shiftKey&&(document.activeElement===r||!n.contains(document.activeElement))?(e.preventDefault(),o?.focus()):!e.shiftKey&&(document.activeElement===o||!n.contains(document.activeElement))&&(e.preventDefault(),r?.focus())});function photoDetailsLabel(e){return{pt:"Detalhes da fotografia",en:"Photo details",es:"Detalles de la fotografía",fr:"Détails de la photo",he:"פרטי התמונה"}[e]||"Photo details"}function formatPhotoAdaptation(e,n){return e?typeof e=="object"?e[n]||e.pt||e.en||"":typeof e=="string"?e==="Imagem redimensionada."&&{pt:"Imagem redimensionada.",en:"Resized image.",fr:"Image redimensionnée.",es:"Imagen redimensionada.",he:"תמונה שונה בגודלה."}[n]||e:"":""}function setModalImage(e){if(!currentModalImages||currentModalImages.length===0)return;currentModalImageIndex=(e+currentModalImages.length)%currentModalImages.length;const n=document.getElementById("modal-main-img");if(n){n.removeAttribute("srcset"),n.removeAttribute("sizes");const s=responsiveImageAttrs(currentModalImages[currentModalImageIndex],"(max-width: 768px) 100vw, 900px");if(s){const l=document.createElement("template");l.innerHTML="<img"+s+">",n.sizes=l.content.firstChild.sizes,n.srcset=l.content.firstChild.srcset}n.src=currentModalImages[currentModalImageIndex]}const a=document.getElementById("modal-img-counter");a&&(a.innerHTML=`<bdi>${currentModalImageIndex+1} / ${currentModalImages.length}</bdi> ${t("photos")}`),document.querySelectorAll(".modal-thumb-btn").forEach((s,l)=>{l===currentModalImageIndex?s.className="modal-thumb-btn w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-primary scale-105 transition-all shadow-sm":s.className="modal-thumb-btn w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-transparent opacity-70 hover:opacity-100 transition-all shadow-sm"});const o=typeof touristSpots<"u"&&touristSpots.find(s=>s.id===selectedSpotId);if(o){const s=o.photoAttributions&&o.photoAttributions[currentModalImageIndex]||(currentModalImageIndex===0?{credit:o.photoCredit,source:o.photoSource,license:o.photoLicense,licenseUrl:o.photoLicenseUrl,adaptation:o.photoAdaptation,caption:o.photoCaption}:null),l=document.getElementById("modal-photo-credit");l&&(s&&s.credit&&s.source?(l.href=s.source,l.innerHTML=`${t("photoCredit")}: ${s.credit}`,l.classList.remove("hidden")):l.classList.add("hidden"));const c=document.getElementById("modal-photo-license");if(c)if(s&&s.license&&s.licenseUrl&&s.source&&s.credit){const u=s.adaptation||(currentModalImageIndex===0?o.photoAdaptation:null),d=formatPhotoAdaptation(u,currentLang),i=s.caption?s.caption[currentLang]||s.caption.pt||s.caption:currentModalImageIndex===0&&o.photoCaption?o.photoCaption[currentLang]||o.photoCaption.pt:"",p=`<a href="${s.licenseUrl}" target="_blank" rel="noopener noreferrer" class="underline font-semibold">${s.license}</a> · ${t("photoCredit")}: <a href="${s.source}" target="_blank" rel="noopener noreferrer" class="underline">${s.credit}</a>${d?` · ${d}`:""}${i?` · ${i}`:""}`;c.innerHTML=o.id==="pico-de-sao-sebastiao"?`<details class="rounded-lg border border-black/10 px-2 py-1"><summary class="cursor-pointer font-semibold text-primary">${photoDetailsLabel(currentLang)}</summary><div class="mt-1">${p}</div></details>`:p,c.classList.remove("hidden")}else c.classList.add("hidden")}}function prevModalImage(e){e&&e.stopPropagation(),setModalImage(currentModalImageIndex-1)}function nextModalImage(e){e&&e.stopPropagation(),setModalImage(currentModalImageIndex+1)}function closeSpotModal(e={}){const n=selectedSpotId;selectedSpotId=null,n&&e.updateUrl!==!1&&new URLSearchParams(window.location.search).has("spot")&&setSpotUrl(null,!0);const a=document.getElementById("spot-modal");a&&(a.classList.add("hidden"),a.classList.remove("flex")),n&&spotModalReturnFocus?.isConnected&&spotModalReturnFocus.focus({preventScroll:!0}),spotModalReturnFocus=null}window.addEventListener("popstate",()=>{const e=new URLSearchParams(window.location.search).get("spot");e&&touristSpots.some(n=>n.id===e)?openSpotModal(e,{updateUrl:!1}):selectedSpotId&&closeSpotModal({updateUrl:!1})});let currentServiceCategory="all";function getServiceCategoryLabel(e){return t({all:"servicesAll",tour:"servicesTours",diving:"servicesDiving",food:"servicesFood",stay:"servicesStay",experience:"servicesExperiences",essentials:"servicesPractical",mobility:"servicesMobility"}[e]||"servicesAll")}function setServiceCategory(e){currentServiceCategory=e,renderServicesDirectory()}function renderServicesDirectory(){const e=document.getElementById("services-grid"),n=document.getElementById("services-filters");if(!e||!n)return;const a=["all",...new Set(servicesData.map(o=>o.category))];n.innerHTML=a.map(o=>`<button type="button" onclick="setServiceCategory('${o}')" class="shrink-0 px-3.5 py-2 rounded-full border text-xs font-bold transition-colors ${o===currentServiceCategory?"bg-primary text-white border-primary":"bg-white/70 text-on-surface-variant border-black/10 hover:text-primary"}">${getServiceCategoryLabel(o)}</button>`).join("");const r=(currentServiceCategory==="all"?servicesData:servicesData.filter(o=>o.category===currentServiceCategory)).slice().sort((o,s)=>+!!s.featured-+!!o.featured);e.innerHTML=r.map(o=>{const s=getServiceTranslation(o),l=s.features||s.tags||[],c=o.whatsapp?`<a href="https://wa.me/55${o.whatsapp}?text=${encodeURIComponent(t("localWhatsappMessage"))}" target="_blank" rel="noopener noreferrer" class="flex-1 min-h-11 px-3 py-2.5 rounded-xl bg-[#25D366] text-white text-[11px] font-bold flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chat</span><span>WhatsApp</span></a>`:"",u=o.phone?`<a href="tel:+55${o.phone}" class="flex-1 min-h-11 px-3 py-2.5 rounded-xl glass-panel border border-black/10 text-[11px] font-bold text-primary flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[16px]">call</span><span>${o.phoneDisplay||o.phone}</span></a>`:"",d=o.url?`<a href="${o.url}" target="_blank" rel="noopener noreferrer" class="min-h-11 px-3 py-2.5 rounded-xl glass-panel border border-black/10 text-[11px] font-bold text-on-surface-variant hover:text-primary flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[16px]">language</span><span>${t("localWebsite")}</span></a>`:"";return`<article class="glass-card rounded-2xl overflow-hidden border border-black/5 shadow-sm flex flex-col">
      <div class="h-40 relative overflow-hidden bg-surface-container">
        ${o.image?`<img src="${o.image}" alt="${o.name}" class="w-full h-full object-cover" loading="lazy" decoding="async">`:`<div class="w-full h-full flex items-center justify-center bg-surface-container/70"><span class="material-symbols-outlined text-primary/35 text-5xl">${o.category==="food"?"restaurant":"storefront"}</span></div>`}
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-primary uppercase shadow-sm">${s.type||getServiceCategoryLabel(o.category)}</span>
      </div>
      <div class="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 class="text-lg font-bold text-primary font-heading">${o.name}</h3>
          ${s.tagline?`<p class="text-xs font-semibold text-secondary mt-0.5">${s.tagline}</p>`:""}
        </div>
        <p class="text-xs text-on-surface-variant leading-relaxed">${s.description||""}</p>
        ${l.length?`<div class="flex flex-wrap gap-1.5">${l.slice(0,4).map(i=>`<span class="px-2 py-1 rounded-md bg-surface-container/80 text-[10px] font-semibold text-on-surface-variant">${i}</span>`).join("")}</div>`:""}
        <div class="flex flex-wrap gap-2 pt-1 mt-auto">${c}${u}${d}</div>
      </div>
    </article>`}).join("")}function renderGuides(){const e=document.getElementById("guides-grid");e&&(e.innerHTML=guidesData.map(n=>{const a=getGuideTranslation(n);return`
      <div class="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4 group">
        
        <!-- Profile Header -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            ${n.photo?`<img src="${n.photo}" alt="${n.name}" class="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white flex-shrink-0" />`:'<div class="w-16 h-16 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-3xl">hiking</span></div>'}
            <div>
              <div class="flex items-center gap-1">
                <h3 class="text-base font-bold text-primary font-heading">${n.name}</h3>
                ${n.verification?`<span class="material-symbols-outlined text-secondary text-[16px]" title="${n.verification.label}">verified</span>`:""}
              </div>
              <p class="text-xs font-bold text-secondary">${a.role}</p>
              ${n.rating!=null&&n.reviewsCount!=null?`<div class="text-[11px] text-on-surface-variant/80 flex items-center gap-1 mt-0.5"><span class="text-amber-500">★</span> ${n.rating} (${n.reviewsCount})</div>`:""}
            </div>
          </div>

          <!-- Bio -->
          <p class="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">${a.bio}</p>

          <!-- Specialties Badges -->
          <div class="flex flex-wrap gap-1.5">
            ${a.specialties.map(r=>`
              <span class="px-2 py-0.5 rounded-md bg-surface-container text-[10px] font-semibold text-primary">
                ${r}
              </span>
            `).join("")}
          </div>

          <!-- Languages Spoken -->
          <div class="text-[11px] text-on-surface-variant font-medium pt-1">
            <strong class="text-primary">${t("languagesSpoken")}</strong> ${n.languagesList.map(r=>new Intl.DisplayNames([currentLang],{type:"language"}).of(r)).join(", ")}
          </div>
        </div>

        <!-- Footer: Price & Hire CTA -->
        <div class="pt-3 border-t border-black/5 space-y-2">
          ${n.pricePerDay?`<div class="flex items-center justify-between"><span class="text-xs text-on-surface-variant">${t("dailyFrom")}</span><strong class="text-base font-bold text-primary">R$ ${n.pricePerDay}<span class="text-xs font-normal text-on-surface-variant">${t("guidePricePerDay")}</span></strong></div>`:""}
          ${n.pricePerDay?`<button onclick="openBookingModal('${n.id}')" class="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[16px]">calendar_add_on</span><span>${t("bookNow")}</span></button>`:`<a href="https://wa.me/${n.phone.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(n.whatsappText||"")}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chat</span><span>${t("bookNow")}</span></a>`}
        </div>

      </div>
    `}).join(""))}function populateBookingGuides(){const e=document.getElementById("booking-guide");if(!e)return;const n=e.value;e.innerHTML=guidesData.map(a=>`
    <option value="${a.id}">
      ${a.name}${Number.isFinite(Number(a.pricePerDay))?` • ${t(a.specialtyKey)} (R$ ${a.pricePerDay}${t("guidePricePerDay")})`:""}
    </option>
  `).join(""),n&&guidesData.some(a=>a.id===n)&&(e.value=n)}function openBookingModal(e=null){const n=document.getElementById("booking-modal");if(n){if(e){const a=document.getElementById("booking-guide");a&&(a.value=e)}updateBookingEstimate(),n.classList.remove("hidden"),n.classList.add("flex")}}function openBookingForSpot(e){const n=touristSpots.find(r=>r.id===e),a=document.getElementById("booking-tour");if(n&&a){let r=Array.from(a.options).find(o=>o.value===e);r||(r=new Option("",e),r.dataset.spotId=e,a.add(r)),r.textContent=getSpotTranslation(n).title,a.value=e}openBookingModal()}function closeBookingModal(){const e=document.getElementById("booking-modal");e&&(e.classList.add("hidden"),e.classList.remove("flex"))}function updateBookingEstimate(){const e=document.getElementById("booking-guide"),n=document.getElementById("booking-shift"),a=document.getElementById("booking-participants"),r=document.getElementById("booking-price-display");if(!e||!n||!a||!r)return;const o=guidesData.find(i=>i.id===e.value)||guidesData[0],s=Number(o?.pricePerDay);if(!Number.isFinite(s)){r.innerText="A confirmar";return}const l=parseInt(a.value,10)||1,c=n.value;let u=1;c==="Dia Inteiro"&&(u=1.4),l>4&&(u+=(l-4)*.15);const d=Math.round(s*u);r.innerText=`R$ ${d},00`}function submitBooking(e){e.preventDefault();const n=document.getElementById("booking-guide"),a=document.getElementById("booking-tour"),r=document.getElementById("booking-date"),o=document.getElementById("booking-shift"),s=document.getElementById("booking-participants"),l=document.getElementById("booking-level"),c=document.getElementById("booking-notes"),u=document.getElementById("booking-price-display"),d=guidesData.find(v=>v.id===n.value)||guidesData[0],i=r.value,p=a.selectedOptions[0]?.textContent.trim(),g=o.selectedOptions[0]?.textContent.trim(),m=s.value,b=l.selectedOptions[0]?.textContent.trim(),x=c.value,h=u.innerText;let f="🌿 *"+t("bookingRequest")+`*

`;for(const[v,$]of[["labelGuide",d.name+(d.verification?.label?" ("+d.verification.label+")":"")],["labelTour",p],["labelDate",i],["labelShift",g],["labelParticipants",m],["labelPhysicalLevel",b],["labelObservations",x],["estimatedTotal",h]])$&&(f+="*"+t(v)+"*: "+$+`
`);f+=`
`+t("bookingAvailability");const y=`https://wa.me/${d.phone.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(f)}`;window.open(y,"_blank"),closeBookingModal()}function renderLocalRecommendations(e){const n=servicesData.filter(i=>i.contextSpotIds?.includes(e)),a=n.filter(i=>i.category!=="stay"),r=n.filter(i=>i.category==="stay");if(!a.length&&!r.length)return"";const o=touristSpots.find(i=>i.id===e),s=o&&getSpotTranslation(o).title||"Ilhabela",l=i=>i?.length?`<div class="flex flex-wrap gap-1.5 pt-1">${i.map(p=>`<span class="px-2 py-1 rounded-md bg-surface-container/80 text-[10px] font-semibold text-on-surface-variant border border-black/5 whitespace-nowrap"><span class="material-symbols-outlined text-[12px] text-primary align-middle mr-0.5">check</span>${p}</span>`).join("")}</div>`:"",c=i=>i.whatsapp?`<a href="https://wa.me/55${i.whatsapp}?text=${encodeURIComponent(t("localWhatsappMessage"))}" target="_blank" rel="noopener noreferrer" class="flex-1 min-h-11 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors"><span class="material-symbols-outlined text-[16px]">chat</span><span>${i.whatsappDisplay||"WhatsApp"}</span></a>`:"",u=i=>i.url?`<a href="${i.url}" target="_blank" rel="noopener noreferrer" class="min-h-11 py-2.5 px-4 rounded-xl glass-panel text-on-surface-variant hover:text-primary text-[11px] font-bold border border-black/10 flex items-center justify-center gap-1.5 transition-colors"><span class="material-symbols-outlined text-[16px]">language</span><span>${t("localWebsite")}</span></a>`:"";let d="";return a.length&&(d+=`<section class="pt-6 border-t border-black/10 mt-6 space-y-4"><div><h3 class="text-lg md:text-xl font-extrabold text-primary font-heading uppercase tracking-wide">${t("localServicesTitle")} ${s}</h3><p class="text-xs md:text-sm text-on-surface-variant mt-1">${t("localServicesSubtitle")}</p></div><div class="grid grid-cols-1 gap-5">`,d+=a.map(i=>{const p=getServiceTranslation(i),g=p.type||"",m=p.tagline||"",b=p.description||"",x=p.features||p.tags,h=p.alsoOffers,f=p.highlightTitle,y=p.highlightDesc;return`<article class="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 shadow-sm group"><div class="w-full md:w-2/5 h-48 md:h-auto relative shrink-0">${i.image?`<img src="${i.image}" alt="${i.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async">`:`<div class="w-full h-full bg-surface-container flex flex-col items-center justify-center text-on-surface-variant/50"><span class="material-symbols-outlined text-[32px] mb-2">image</span><span class="text-[10px] uppercase font-bold tracking-wider">${t("localImagePending")}</span></div>`}<div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-primary uppercase shadow-sm">${g}</div></div><div class="p-4 md:p-5 flex flex-col justify-center flex-1 space-y-3"><div><h4 class="text-lg font-bold text-primary font-heading leading-tight">${i.name}</h4>${m?`<p class="text-xs font-semibold text-secondary mt-0.5">${m}</p>`:""}</div><p class="text-xs text-on-surface-variant leading-relaxed">${b}</p>${f?`<div class="bg-primary/5 rounded-lg p-2.5 border-l-2 border-primary"><span class="block text-[10px] font-bold text-primary uppercase mb-0.5">${f}</span><span class="text-xs font-semibold text-on-surface-variant">${y||""}</span></div>`:""}${l(x)}${h?.length?`<p class="text-[11px] text-on-surface-variant"><strong>${t("localAlsoOffers")}</strong> ${h.join("; ")}.</p>`:""}<div class="flex flex-wrap gap-2 pt-2 mt-auto">${c(i)}${i.instagram?`<a href="https://instagram.com/${i.instagram.replace("@","")}" target="_blank" rel="noopener noreferrer" class="min-h-11 py-2.5 px-4 rounded-xl glass-panel text-on-surface-variant hover:text-primary text-[11px] font-bold border border-black/10 flex items-center justify-center gap-1.5 transition-colors"><span>@</span><span>Instagram</span></a>`:""}${u(i)}</div></div></article>`}).join(""),d+="</div></section>"),r.length&&(d+=`<section class="pt-6 border-t border-black/10 mt-6 space-y-4"><div><h3 class="text-lg md:text-xl font-extrabold text-primary font-heading uppercase tracking-wide">${t("localStayTitle")} ${s}</h3><p class="text-xs md:text-sm text-on-surface-variant mt-1">${t("localStaySubtitle")}</p></div><div class="grid grid-cols-1 gap-5">`,d+=r.map(i=>{const p=getServiceTranslation(i),g=p.type||"",m=p.description||"",b=p.features;return`<article class="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 shadow-sm group"><div class="w-full md:w-2/5 h-48 md:h-auto relative shrink-0"><img src="${i.image}" alt="${i.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async"><div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-primary uppercase shadow-sm">${g}</div></div><div class="p-4 md:p-5 flex flex-col justify-center flex-1 space-y-3"><div><h4 class="text-lg font-bold text-primary font-heading leading-tight">${i.name}</h4><p class="text-xs text-on-surface-variant leading-relaxed mt-1.5">${m}</p></div>${l(b)}<div class="flex flex-wrap gap-2 pt-2 mt-auto">${c(i)}${u(i)}</div></div></article>`}).join(""),d+="</div></section>"),d}function translateMapControls(){for(const[e,n]of[[".leaflet-control-zoom-in","zoomIn"],[".leaflet-control-zoom-out","zoomOut"]]){const a=document.querySelector(e);a&&(a.title=t(n),a.setAttribute("aria-label",t(n)))}}
