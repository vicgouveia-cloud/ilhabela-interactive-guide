// Ilhabela Interactive Guide - Main Application Logic
let map = null;
let mapLayers = {};
let mapMarkers = [];
let currentLang = localStorage.getItem('ilhabela_lang') || 'pt';
let currentCategory = 'all';
let activeAttributes = new Set();
let searchQuery = '';
let savedFavorites = new Set(JSON.parse(localStorage.getItem('ilhabela_saved') || '[]'));
let selectedSpotId = null;

// Curated photo library. Every entry below was matched to the named attraction;
// the source remains visible in the gallery so visitors can verify provenance.
const verifiedPhotoLibrary = {
  'praia-do-bonete': { images: ['assets/images/praia-do-bonete_verified.jpg', 'assets/images/praia-do-bonete_verified_2.jpg', 'assets/images/praia-do-bonete_verified_3.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Praia_do_Bonete_(Ilhabela)' },
  'baia-de-castelhanos': { images: ['assets/images/baia-de-castelhanos_verified.jpg', 'assets/images/baia-de-castelhanos_verified_2.jpg', 'assets/images/mirante-do-coracao_verified.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Praia_de_Castelhanos' },
  'praia-da-fome': { images: ['assets/images/praia-da-fome_verified.jpg', 'assets/images/praia-da-fome_verified_2.jpg', 'assets/images/praia-da-fome_verified_3.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Praia_da_Fome_(Ilhabela)' },
  'praia-do-juliao': { images: ['assets/images/praia-do-juliao_verified.jpg', 'assets/images/praia-do-juliao_verified_2.jpg', 'assets/images/praia-do-juliao_verified_3.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/praias/praia-do-juliao' },
  'praia-do-curral': { images: ['assets/images/praia-do-curral_verified.jpg', 'assets/images/praia-do-curral_verified_2.jpg', 'assets/images/praia-do-curral_verified_3.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Praia_do_Curral_(Ilhabela)' },
  'praia-da-armacao': { images: ['assets/images/praia-da-armacao_verified.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Cachorro_caminhando_pela_Praia_da_Arma%C3%A7%C3%A3o.jpg' },
  'praia-do-veloso': { images: ['assets/images/praia-do-veloso_verified.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Ilhabela_-_Praia_do_Veloso.jpg' },
  'praia-da-siriuba': { images: ['assets/images/praia-da-siriuba_verified.jpg', 'assets/images/praia-da-siriuba_verified_2.jpg', 'assets/images/praia-da-siriuba_verified_3.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/praias/praia-da-siriuba' },
  'praia-da-enchova': { images: ['assets/images/praia-da-enchova_verified.jpg', 'assets/images/praia-da-enchova_verified_2.jpg', 'assets/images/praia-da-enchova_verified_3.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/praias/praia-das-enchovas' },
  'praia-de-indaiauba': { images: ['assets/images/praia-de-indaiauba_verified.jpg'], credit: 'Prefeitura de Ilhabela', source: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15452/conheca-42-praias-de-ilhabela' },
  'cachoeira-da-laje': { images: ['assets/images/cachoeira-da-laje_verified.jpg'], credit: 'Arthur Grangeiro de Souza · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela_-_Arthur_Grangeiro_de_Souza_(165).jpg' },
  'cachoeira-da-toca': { images: ['assets/images/cachoeira-da-toca_verified.png'], credit: 'Miquel Girones · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:ILHABELACACHO.png' },
  'cachoeira-do-veloso': { images: ['assets/images/cachoeira-do-veloso_verified.jpg'], credit: 'Italo Reis · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Cachoeira_do_Veloso,_em_Ilhabela.jpg' },
  'cachoeira-do-paqueta': { images: ['assets/images/cachoeira-do-paqueta_verified.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/pontos-turisticos/cachoeira-do-paqueta/' },
  'cachoeira-do-gato': { images: ['assets/images/cachoeira-do-gato_verified.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/cachoeiras/cachoeira-do-gato/' },
  'cachoeira-dos-tres-tombos': { images: ['assets/images/cachoeira-dos-tres-tombos_verified.jpg'], credit: 'Virto.Photo · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Cachoeira_dos_Tr%C3%AAs_Tombos.jpg' },
  'cachoeira-da-friagem': { images: ['assets/images/cachoeira-da-friagem_verified.webp'], credit: 'Trilhabela', source: 'https://trilhabela.com.br/passeio/cachoeira-da-friagem-ilhabela/' },
  'trilha-da-agua-branca': { images: ['assets/images/trilha-da-agua-branca_verified.jpg'], credit: 'Acervo Ilhabela.com.br', source: 'https://www.ilhabela.com.br/cachoeiras/cachoeiras-trilha-da-agua-branca/' },
  'mirante-do-coracao': { images: ['assets/images/mirante-do-coracao_verified.jpg'], credit: 'Louise Cristina Araujo Ferri · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Mirante_do_Cora%C3%A7%C3%A3o_-_Praia_de_Castelhanos.jpg' },
  'pico-do-baepi': { images: ['assets/images/pico-do-baepi_verified.jpg'], credit: 'Igorh84 · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Pico_do_Baepi.jpg' },
  'pico-de-sao-sebastiao': { images: ['assets/images/pico-de-sao-sebastiao_verified.jpg'], credit: 'Grupo IMS Ilhabela · Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela.jpg' },
  'ponto-baleias-canal': { images: ['assets/images/ponto-baleias-canal_verified.jpg'], credit: 'Projeto Baleia à Vista · Ilhabela.com.br', source: 'https://www.ilhabela.com.br/dicas/baleia-a-vista-em-ilhabela/' },
  'naufragio-aymore': { images: ['assets/images/naufragio-aymore_verified.jpg'], credit: 'Acervo Reserving · mergulho em naufrágios de Ilhabela', source: 'https://activities.reserving.com/d/ilhabela/diving-at-ilhabela-shipwrecks-lstJW6LQ' },
  'santuario-ilha-das-cabras': { images: ['assets/images/santuario-ilha-das-cabras_verified.jpg', 'assets/images/santuario-ilha-das-cabras_verified_2.jpg', 'assets/images/santuario-ilha-das-cabras_verified_3.jpg'], credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/Category:Ilha_das_Cabras_(Ilhabela)' }
};

touristSpots.forEach(spot => {
  const verified = verifiedPhotoLibrary[spot.id];
  if (!verified) return;
  spot.image = verified.images[0];
  spot.images = verified.images;
  spot.photoCredit = verified.credit;
  spot.photoSource = verified.source;
});

// Initialize on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initMap();
  renderCategoryCounts();
  renderSpotsGrid();
  renderGuides();
  updateSavedCountDisplay();
  populateBookingGuides();
  initFilterCarousel();

  // Set default booking date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }
});

// --- I18N SYSTEM ---
function initI18n() {
  setLanguage(currentLang, false);
}

function setLanguage(lang, rerender = true) {
  if (!translations[lang]) lang = 'pt';
  currentLang = lang;
  localStorage.setItem('ilhabela_lang', lang);

  // Update HTML tag dir & lang
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';

  // Update current language label
  const labelEl = document.getElementById('current-lang-label');
  if (labelEl) labelEl.innerText = lang.toUpperCase();

  // Translate all DOM elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  if (rerender) {
    renderSpotsGrid();
    renderGuides();
    updateMapMarkers();
    populateBookingGuides();
    if (selectedSpotId) openSpotModal(selectedSpotId);
  }
}

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || (translations['pt'] && translations['pt'][key]) || key;
}

function getSpotTranslation(spot) {
  if (spot.translations && spot.translations[currentLang]) {
    return spot.translations[currentLang];
  }
  return spot.translations ? (spot.translations['pt'] || spot.translations['en']) : {};
}

function getGuideTranslation(guide) {
  if (guide.translations && guide.translations[currentLang]) {
    return guide.translations[currentLang];
  }
  return guide.translations ? (guide.translations['pt'] || guide.translations['en']) : {};
}

// --- LEAFLET MAP INITIALIZATION ---
function initMap() {
  const ilhabelaCenter = [-23.824, -45.365];
  const archipelagoBounds = L.latLngBounds(
    [-24.02, -45.50],
    [-23.65, -45.18]
  );
  
  map = L.map('map', {
    center: ilhabelaCenter,
    zoom: 11,
    minZoom: 10,
    maxZoom: 18,
    zoomControl: false,
    maxBounds: archipelagoBounds,
    maxBoundsViscosity: 1.0,
    worldCopyJump: false
  });

  // Custom Zoom Control (bottom-right)
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.control.scale({ position: 'bottomleft', imperial: false, maxWidth: 120 }).addTo(map);

  // Map Tile Layers (100% Free & Sem necessidade de API Key)
  mapLayers.voyager = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>',
    maxZoom: 19,
    noWrap: true,
    bounds: archipelagoBounds
  });

  mapLayers.satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri & Earthstar Geographics',
    maxZoom: 19,
    noWrap: true,
    bounds: archipelagoBounds
  });

  mapLayers.topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, USGS, NOAA, OpenStreetMap contributors',
    maxZoom: 18,
    noWrap: true,
    bounds: archipelagoBounds
  });

  mapLayers.satellite.addTo(map);

  // Keep the initial and reset view focused on the municipality's archipelago.
  map.fitBounds([[-23.98, -45.46], [-23.69, -45.23]], { padding: [18, 18] });

  // Invalidate size on container resize (fixes mobile orientation change / layout shifts)
  if (window.ResizeObserver) {
    const mapEl = document.getElementById('map');
    if (mapEl) {
      new ResizeObserver(() => {
        map.invalidateSize({ animate: false });
      }).observe(mapEl.parentElement || mapEl);
    }
  }

  // Render Markers
  updateMapMarkers();
}

function resetMapView() {
  if (!map) return;
  map.closePopup();
  document.getElementById('map-quick-card')?.classList.add('hidden');
  map.fitBounds([[-23.98, -45.46], [-23.69, -45.23]], { padding: [18, 18], animate: true });
}

function switchMapLayer(layerKey) {
  Object.values(mapLayers).forEach(layer => map.removeLayer(layer));
  if (mapLayers[layerKey]) {
    mapLayers[layerKey].addTo(map);
  }

  // Update button active state
  ['voyager', 'satellite', 'topo'].forEach(key => {
    const btn = document.getElementById(`layer-${key}`);
    if (btn) {
      btn.classList.toggle('active', key === layerKey);
    }
  });
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'praias': return 'beach_access';
    case 'cachoeiras': return 'water_drop';
    case 'trilhas': return 'hiking';
    case 'picos': return 'terrain';
    case 'baleias': return 'water_lux';
    case 'mergulho': return 'scuba_diving';
    case 'cultura': return 'museum';
    case 'mirantes': return 'visibility';
    default: return 'place';
  }
}

function getCategoryLabel(cat) {
  const keys = {
    praias: 'filterBeaches', cachoeiras: 'filterWaterfalls', trilhas: 'filterTrails',
    picos: 'filterPeaks', baleias: 'filterWhales', mergulho: 'filterDiving',
    cultura: 'filterCulture', mirantes: 'filterLookouts'
  };
  return t(keys[cat] || cat);
}

function getRatingLabel(spot, withReviews = false) {
  if (typeof spot.rating !== 'number') return t('newInGuide');
  return `★ ${spot.rating}${withReviews ? ` (${spot.reviews})` : ''}`;
}

function updateMapMarkers() {
  if (!map) return;

  // Clear existing markers
  mapMarkers.forEach(m => map.removeLayer(m));
  mapMarkers = [];

  const filtered = getFilteredSpots();

  filtered.forEach(spot => {
    const tr = getSpotTranslation(spot);
    const catIcon = getCategoryIcon(spot.category);

    const customIcon = L.divIcon({
      className: 'custom-pin-container',
      html: `
        <div class="custom-pin" id="pin-${spot.id}">
          <div class="pin-pulse pin-${spot.category}"></div>
          <div class="pin-icon-wrap pin-${spot.category}">
            <span class="material-symbols-outlined text-[16px]">${catIcon}</span>
          </div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const marker = L.marker(spot.coords, {
      icon: customIcon,
      keyboard: true,
      title: tr.title || '',
      alt: `${tr.title || 'Atração'} — abrir detalhes`
    }).addTo(map);

    // Hover Tooltip
    marker.bindTooltip(`
      <div class="text-xs font-semibold">
        <strong class="text-primary block text-sm font-heading">${tr.title || ''}</strong>
        <span class="text-on-surface-variant">${tr.subtitle || ''}</span>
      </div>
    `, {
      className: 'leaflet-tooltip-custom',
      direction: 'auto',
      offset: [0, -17]
    });

    // Hover preview card
    marker.on('mouseover', () => {
      showMapQuickCard(spot);
    });

    // Click to Open Modal
    marker.on('click', () => {
      map.flyTo(spot.coords, 14, { duration: 1.2 });
      openSpotModal(spot.id);
    });

    mapMarkers.push(marker);
  });
}

function showMapQuickCard(spot) {
  const card = document.getElementById('map-quick-card');
  if (!card) return;

  const tr = getSpotTranslation(spot);
  const diffLabel = t(`difficulty${spot.specs.difficulty.charAt(0).toUpperCase() + spot.specs.difficulty.slice(1)}`);
  
  card.innerHTML = `
    <div class="flex gap-3 items-center">
      <img src="${spot.image}" alt="${tr.title}" class="w-20 h-20 rounded-xl object-cover shadow-sm flex-shrink-0" />
      <div class="flex-1 min-w-0 space-y-1">
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${getDifficultyBadgeClass(spot.specs.difficulty)}">
            ${diffLabel}
          </span>
          <span class="text-[11px] font-bold text-amber-600 flex items-center gap-0.5">
            ${getRatingLabel(spot)}
          </span>
        </div>
        <h4 class="text-sm font-bold text-primary leading-tight font-heading">${tr.title}</h4>
        <p class="text-xs text-on-surface-variant line-clamp-2">${tr.subtitle}</p>
        <button onclick="openSpotModal('${spot.id}')" class="text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-0.5">
          <span>${t('spotDetails')}</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  `;
  card.classList.remove('hidden');
}

function initFilterCarousel() {
  const track = document.getElementById('category-filter-list');
  if (!track) return;
  const left = document.querySelector('[data-filter-scroll="left"]');
  const right = document.querySelector('[data-filter-scroll="right"]');
  const update = () => {
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    left.disabled = track.scrollLeft <= 4;
    right.disabled = track.scrollLeft >= max - 4;
  };
  left?.addEventListener('click', () => track.scrollBy({ left: -Math.max(220, track.clientWidth * .72), behavior: 'smooth' }));
  right?.addEventListener('click', () => track.scrollBy({ left: Math.max(220, track.clientWidth * .72), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  requestAnimationFrame(update);
}

// --- FILTERING LOGIC ---
function getFilteredSpots() {
  return touristSpots.filter(spot => {
    // Category filter
    if (currentCategory !== 'all' && spot.category !== currentCategory) {
      return false;
    }

    // Attribute filters
    for (let attr of activeAttributes) {
      if (!spot.attributes[attr]) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const tr = getSpotTranslation(spot);
      const matchTitle = tr.title && tr.title.toLowerCase().includes(q);
      const matchSub = tr.subtitle && tr.subtitle.toLowerCase().includes(q);
      const matchDesc = tr.description && tr.description.toLowerCase().includes(q);
      const matchTags = spot.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchSub && !matchDesc && !matchTags) {
        return false;
      }
    }

    return true;
  });
}

function filterCategory(cat) {
  currentCategory = cat;
  
  // Update category pill styles
  document.querySelectorAll('.cat-pill').forEach(btn => {
    const isCat = btn.getAttribute('data-cat') === cat;
    if (isCat) {
      btn.classList.add('active', 'bg-primary', 'text-white');
      btn.classList.remove('text-on-surface-variant');
    } else {
      btn.classList.remove('active', 'bg-primary', 'text-white');
      btn.classList.add('text-on-surface-variant');
    }
  });

  renderSpotsGrid();
  updateMapMarkers();
}

function toggleAttributeFilter(attr) {
  const btn = document.getElementById(`attr-${attr}`);
  if (activeAttributes.has(attr)) {
    activeAttributes.delete(attr);
    if (btn) {
      btn.classList.remove('bg-primary', 'text-white', 'border-primary');
      btn.classList.add('bg-white/60', 'text-on-surface-variant');
    }
  } else {
    activeAttributes.add(attr);
    if (btn) {
      btn.classList.add('bg-primary', 'text-white', 'border-primary');
      btn.classList.remove('bg-white/60', 'text-on-surface-variant');
    }
  }

  renderSpotsGrid();
  updateMapMarkers();
}

function handleSearch(val) {
  searchQuery = val;
  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !val);
  }
  renderSpotsGrid();
  updateMapMarkers();
}

function clearSearch() {
  const input = document.getElementById('search-input');
  if (input) input.value = '';
  searchQuery = '';
  handleSearch('');
}

function filterFavorites() {
  if (savedFavorites.size === 0) {
    alert(t('noResults'));
    return;
  }
  // Filter spots to saved only
  const spots = touristSpots.filter(s => savedFavorites.has(s.id));
  renderCustomSpotsList(spots);
  
  // Scroll to explore section
  const el = document.getElementById('explore-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function toggleFavorite(spotId, event) {
  if (event) event.stopPropagation();
  if (savedFavorites.has(spotId)) {
    savedFavorites.delete(spotId);
  } else {
    savedFavorites.add(spotId);
  }
  localStorage.setItem('ilhabela_saved', JSON.stringify(Array.from(savedFavorites)));
  updateSavedCountDisplay();
  renderSpotsGrid();
}

function updateSavedCountDisplay() {
  const counter = document.getElementById('saved-count');
  if (counter) counter.innerText = savedFavorites.size;
}

function renderCategoryCounts() {
  const counts = { all: touristSpots.length, praias: 0, cachoeiras: 0, trilhas: 0, picos: 0, baleias: 0, mergulho: 0, cultura: 0, mirantes: 0 };
  touristSpots.forEach(s => {
    if (counts[s.category] !== undefined) counts[s.category]++;
  });

  Object.keys(counts).forEach(key => {
    const el = document.getElementById(`count-${key}`);
    if (el) el.innerText = counts[key];
  });
}

// --- BENTO GRID RENDERER ---
function renderSpotsGrid() {
  const filtered = getFilteredSpots();
  renderCustomSpotsList(filtered);
}

function renderCustomSpotsList(spots) {
  const grid = document.getElementById('spots-grid');
  const countDisplay = document.getElementById('results-count-num');
  if (countDisplay) countDisplay.innerText = spots.length;

  if (!grid) return;

  if (spots.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center space-y-4">
        <span class="material-symbols-outlined text-5xl text-gray-400">search_off</span>
        <p class="text-base text-on-surface-variant font-medium">${t('noResults')}</p>
        <button onclick="filterCategory('all'); clearSearch();" class="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-colors">
          ${t('clearFilters')}
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = spots.map(spot => {
    const tr = getSpotTranslation(spot);
    const isFav = savedFavorites.has(spot.id);
    const diffClass = getDifficultyBadgeClass(spot.specs.difficulty);
    const diffLabel = t(`difficulty${spot.specs.difficulty.charAt(0).toUpperCase() + spot.specs.difficulty.slice(1)}`);

    return `
      <div onclick="openSpotModal('${spot.id}')" class="glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col group relative animate-fade-in">
        
        <!-- Image Banner -->
        <div class="relative h-52 w-full overflow-hidden bg-gray-100">
          <img src="${spot.image}" alt="${tr.title}" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <!-- Category & Difficulty Badges -->
          <div class="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <span class="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-primary shadow-sm flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">${getCategoryIcon(spot.category)}</span>
              ${getCategoryLabel(spot.category)}
            </span>
            <span class="px-2 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${diffClass}">
              ${diffLabel}
            </span>
          </div>

          <!-- Favorite Button -->
          <button onclick="toggleFavorite('${spot.id}', event)" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md shadow-md flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors z-10">
            <span class="material-symbols-outlined text-[20px] ${isFav ? 'text-red-500 fill-current' : ''}">favorite</span>
          </button>

          <!-- Rating Pill -->
          <div class="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
            <span class="text-amber-400">${typeof spot.rating === 'number' ? '★' : '●'}</span> ${getRatingLabel(spot, true).replace('★ ', '')}
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-1.5">
            <h3 class="text-lg font-bold text-primary group-hover:text-primary-container transition-colors font-heading truncate">${tr.title}</h3>
            <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">${tr.subtitle || tr.description}</p>
          </div>

          <!-- Quick Specs Breakdown -->
          <div class="pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold text-on-surface-variant">
            <span class="flex items-center gap-1" title="Distância">
              <span class="material-symbols-outlined text-[15px] text-primary">straighten</span>
              ${spot.specs.distance.split('(')[0]}
            </span>
            <span class="flex items-center gap-1" title="Tempo">
              <span class="material-symbols-outlined text-[15px] text-primary">timer</span>
              ${spot.specs.duration.split('(')[0]}
            </span>
          </div>

          <!-- Button View -->
          <button class="w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-xs font-bold text-primary transition-all duration-300 flex items-center justify-center gap-1.5">
            <span>${t('spotDetails')}</span>
            <span class="material-symbols-outlined text-[16px]">visibility</span>
          </button>
        </div>

      </div>
    `;
  }).join('');
}

function getDifficultyBadgeClass(diff) {
  switch (diff) {
    case 'easy': return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
    case 'moderate': return 'bg-amber-100 text-amber-800 border border-amber-300';
    case 'hard': return 'bg-purple-100 text-purple-800 border border-purple-300';
    case 'extreme': return 'bg-red-100 text-red-800 border border-red-300';
    default: return 'bg-gray-100 text-gray-800';
  }
}

// --- VIEW MODE SWITCHER (MAP / GRID) ---
function setViewMode(mode) {
  const mapSec = document.getElementById('map-section');
  const gridSec = document.getElementById('explore-section');
  const btnMap = document.getElementById('tab-map');
  const btnGrid = document.getElementById('tab-grid');

  // Top tab buttons
  if (mode === 'map') {
    if (btnMap) btnMap.className = 'view-tab active px-4 py-1.5 flex items-center gap-1.5';
    if (btnGrid) btnGrid.className = 'view-tab px-4 py-1.5 flex items-center gap-1.5';
    if (map) { setTimeout(() => map.invalidateSize(), 120); }
    if (mapSec) mapSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    if (btnGrid) btnGrid.className = 'view-tab active px-4 py-1.5 flex items-center gap-1.5';
    if (btnMap) btnMap.className = 'view-tab px-4 py-1.5 flex items-center gap-1.5';
    if (gridSec) gridSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Sync bottom nav active state (mobile)
  const bnMap  = document.getElementById('bn-map');
  const bnGrid = document.getElementById('bn-grid');
  if (bnMap)  bnMap.classList.toggle('active', mode === 'map');
  if (bnGrid) bnGrid.classList.toggle('active', mode === 'grid');
}


// --- SPOT DETAILS MODAL & PHOTO GALLERY ---
let currentModalImages = [];
let currentModalImageIndex = 0;

function openSpotModal(spotId) {
  const spot = touristSpots.find(s => s.id === spotId);
  if (!spot) return;
  selectedSpotId = spotId;

  // Setup Gallery
  currentModalImages = (spot.images && spot.images.length > 0) ? spot.images : [spot.image];
  currentModalImageIndex = 0;

  const tr = getSpotTranslation(spot);
  const modal = document.getElementById('spot-modal');
  const content = document.getElementById('spot-modal-content');
  if (!modal || !content) return;

  const diffClass = getDifficultyBadgeClass(spot.specs.difficulty);
  const diffLabel = t(`difficulty${spot.specs.difficulty.charAt(0).toUpperCase() + spot.specs.difficulty.slice(1)}`);
  const isFav = savedFavorites.has(spot.id);

  content.innerHTML = `
    <!-- Modal Hero Gallery Slider -->
    <div class="relative w-full rounded-2xl overflow-hidden bg-gray-900 shadow-md">
      
      <!-- Main Slide Image -->
      <div class="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden flex items-center justify-center">
        <img id="modal-main-img" src="${currentModalImages[0]}" alt="${tr.title}" class="w-full h-full object-cover transition-all duration-500" onerror="this.src='assets/images/baia-de-castelhanos_verified.jpg'" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

        <!-- Prev / Next Slider Arrows -->
        ${currentModalImages.length > 1 ? `
          <button onclick="prevModalImage(event)" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all z-20">
            <span class="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button onclick="nextModalImage(event)" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all z-20">
            <span class="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
          
          <!-- Image Index Indicator -->
          <div class="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold z-20" id="modal-img-counter">
            1 / ${currentModalImages.length} fotos
          </div>
        ` : ''}
      </div>

      <!-- Floating Title & Badges -->
      <div class="absolute bottom-4 left-4 right-4 text-white space-y-1.5 z-10 pointer-events-none">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${diffClass}">
            ${diffLabel}
          </span>
          <span class="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold">
            ${typeof spot.rating === 'number' ? `${getRatingLabel(spot, true)} avaliações` : getRatingLabel(spot)}
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-white leading-tight">${tr.title}</h2>
        <p class="text-xs text-white/80 line-clamp-1">${tr.subtitle}</p>
      </div>

      ${spot.photoSource ? `
        <a id="modal-photo-credit" href="${spot.photoSource}" target="_blank" rel="noopener noreferrer" class="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-semibold text-white/90 hover:bg-black/75 transition-colors" onclick="event.stopPropagation()">
          Foto: ${spot.photoCredit}
        </a>
      ` : ''}

      <!-- Favorite Button -->
      <button onclick="toggleFavorite('${spot.id}', event); openSpotModal('${spot.id}');" class="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors z-20">
        <span class="material-symbols-outlined text-[22px] ${isFav ? 'text-red-500 fill-current' : ''}">favorite</span>
      </button>
    </div>

    <!-- Thumbnails Gallery Strip -->
    ${currentModalImages.length > 1 ? `
      <div class="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar" id="modal-thumbnails">
        ${currentModalImages.map((img, idx) => `
          <button onclick="setModalImage(${idx})" class="modal-thumb-btn w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 ${idx === 0 ? 'border-primary scale-105' : 'border-transparent opacity-70 hover:opacity-100'} transition-all shadow-sm">
            <img src="${img}" alt="" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.parentElement.style.display='none'" />
          </button>
        `).join('')}
      </div>
    ` : ''}

    <!-- Description & Highlights -->
    <div class="space-y-4">
      <p class="text-sm md:text-base text-on-surface-variant leading-relaxed">${tr.description}</p>
      
      ${tr.highlights ? `
        <div class="space-y-2">
          <h4 class="text-xs font-bold text-primary uppercase tracking-wider">Destaques da Experiência</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${tr.highlights.map(h => `
              <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 text-xs font-semibold text-primary">
                <span class="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>

    <!-- TECHNICAL SPECS GRID -->
    <div class="p-5 rounded-2xl bg-surface-container/80 border border-black/5 space-y-3">
      <h4 class="text-xs font-bold text-primary uppercase tracking-wider">Ficha Técnica & Infraestrutura</h4>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <span class="text-on-surface-variant/70 block text-[11px]">${t('routeDistance')}</span>
          <strong class="text-primary font-bold">${spot.specs.distance}</strong>
        </div>
        <div>
          <span class="text-on-surface-variant/70 block text-[11px]">${t('routeDuration')}</span>
          <strong class="text-primary font-bold">${spot.specs.duration}</strong>
        </div>
        <div>
          <span class="text-on-surface-variant/70 block text-[11px]">${t('routeElevation')}</span>
          <strong class="text-primary font-bold">${spot.specs.elevation}</strong>
        </div>
      </div>

      <div class="pt-3 border-t border-black/5 space-y-2 text-xs">
        <div>
          <strong class="text-primary">${t('accessType')}:</strong>
          <span class="text-on-surface-variant ml-1">${spot.specs.access}</span>
        </div>
        <div>
          <strong class="text-primary">${t('seaCondition')}:</strong>
          <span class="text-on-surface-variant ml-1">${spot.specs.sea}</span>
        </div>
        <div>
          <strong class="text-primary">${t('infrastructure')}:</strong>
          <span class="text-on-surface-variant ml-1">${spot.specs.structure}</span>
        </div>
      </div>
    </div>

    <!-- Eco & Borrachudos Tips -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <div class="p-4 rounded-2xl bg-secondary-container/30 border border-secondary/20 space-y-1">
        <strong class="text-secondary font-bold flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">eco</span>
          ${t('ecoTipTitle')}
        </strong>
        <p class="text-on-surface-variant">${tr.ecoTip || 'Preserve a natureza e leve seu lixo de volta.'}</p>
      </div>

      <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
        <strong class="text-amber-800 font-bold flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">pest_control</span>
          ${t('repellentTipTitle')}
        </strong>
        <p class="text-amber-900">${t('repellentTipText')}</p>
      </div>
    </div>

    ${renderLocalRecommendations(spot.id)}

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 pt-2">
      <a href="https://www.google.com/maps/dir/?api=1&destination=${spot.coords[0]},${spot.coords[1]}" target="_blank" class="flex-1 py-3.5 rounded-xl border-2 border-primary text-primary hover:bg-primary/5 text-xs font-bold flex items-center justify-center gap-2 transition-colors">
        <span class="material-symbols-outlined text-[18px]">directions</span>
        <span>${t('openInGoogleMaps')}</span>
      </a>

      <button onclick="closeSpotModal(); openBookingForSpot('${tr.title}')" class="flex-1 py-3.5 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-colors">
        <span class="material-symbols-outlined text-[18px]">person_pin</span>
        <span>Contratar Guia para este Roteiro</span>
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function setModalImage(idx) {
  if (!currentModalImages || currentModalImages.length === 0) return;
  currentModalImageIndex = (idx + currentModalImages.length) % currentModalImages.length;
  
  const imgEl = document.getElementById('modal-main-img');
  if (imgEl) {
    imgEl.src = currentModalImages[currentModalImageIndex];
  }

  const counterEl = document.getElementById('modal-img-counter');
  if (counterEl) {
    counterEl.innerText = `${currentModalImageIndex + 1} / ${currentModalImages.length} fotos`;
  }

  const thumbBtns = document.querySelectorAll('.modal-thumb-btn');
  thumbBtns.forEach((btn, i) => {
    if (i === currentModalImageIndex) {
      btn.className = 'modal-thumb-btn w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-primary scale-105 transition-all shadow-sm';
    } else {
      btn.className = 'modal-thumb-btn w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-transparent opacity-70 hover:opacity-100 transition-all shadow-sm';
    }
  });
}

function prevModalImage(e) {
  if (e) e.stopPropagation();
  setModalImage(currentModalImageIndex - 1);
}

function nextModalImage(e) {
  if (e) e.stopPropagation();
  setModalImage(currentModalImageIndex + 1);
}

function closeSpotModal() {
  const modal = document.getElementById('spot-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// --- CERTIFIED LOCAL GUIDES RENDERER ---
function renderGuides() {
  const grid = document.getElementById('guides-grid');
  if (!grid) return;

  grid.innerHTML = guidesData.map(guide => {
    const tr = getGuideTranslation(guide);

    return `
      <div class="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4 group">
        
        <!-- Profile Header -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <img src="${guide.photo}" alt="${guide.name}" class="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white flex-shrink-0" />
            <div>
              <div class="flex items-center gap-1">
                <h3 class="text-base font-bold text-primary font-heading">${guide.name}</h3>
                <span class="material-symbols-outlined text-secondary text-[16px]" title="CADASTUR Verificado">verified</span>
              </div>
              <p class="text-xs font-bold text-secondary">${tr.role}</p>
              <div class="text-[11px] text-on-surface-variant/80 flex items-center gap-1 mt-0.5">
                <span class="text-amber-500">★</span> ${guide.rating} (${guide.reviewsCount})
              </div>
            </div>
          </div>

          <!-- Bio -->
          <p class="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">${tr.bio}</p>

          <!-- Specialties Badges -->
          <div class="flex flex-wrap gap-1.5">
            ${guide.specialties.map(spec => `
              <span class="px-2 py-0.5 rounded-md bg-surface-container text-[10px] font-semibold text-primary">
                ${spec}
              </span>
            `).join('')}
          </div>

          <!-- Languages Spoken -->
          <div class="text-[11px] text-on-surface-variant font-medium pt-1">
            <strong class="text-primary">${t('languagesSpoken')}</strong> ${guide.languages.join(', ')}
          </div>
        </div>

        <!-- Footer: Price & Hire CTA -->
        <div class="pt-3 border-t border-black/5 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs text-on-surface-variant">Diária a partir de:</span>
            <strong class="text-base font-bold text-primary">R$ ${guide.pricePerDay}<span class="text-xs font-normal text-on-surface-variant">${t('guidePricePerDay')}</span></strong>
          </div>

          <button onclick="openBookingModal('${guide.id}')" class="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">calendar_add_on</span>
            <span>${t('bookNow')}</span>
          </button>
        </div>

      </div>
    `;
  }).join('');
}

// --- BOOKING MODAL LOGIC ---
function populateBookingGuides() {
  const select = document.getElementById('booking-guide');
  if (!select) return;

  select.innerHTML = guidesData.map(g => `
    <option value="${g.id}">
      ${g.name} • ${t(g.specialtyKey)} (R$ ${g.pricePerDay}/dia)
    </option>
  `).join('');
}

function openBookingModal(guideId = null) {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  if (guideId) {
    const select = document.getElementById('booking-guide');
    if (select) select.value = guideId;
  }

  updateBookingEstimate();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openBookingForSpot(spotTitle) {
  const tourSelect = document.getElementById('booking-tour');
  if (tourSelect) {
    // Attempt match or add option
    tourSelect.value = spotTitle;
  }
  openBookingModal();
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function updateBookingEstimate() {
  const guideSelect = document.getElementById('booking-guide');
  const shiftSelect = document.getElementById('booking-shift');
  const participantsInput = document.getElementById('booking-participants');
  const priceDisplay = document.getElementById('booking-price-display');

  if (!guideSelect || !shiftSelect || !participantsInput || !priceDisplay) return;

  const guide = guidesData.find(g => g.id === guideSelect.value) || guidesData[0];
  const participants = parseInt(participantsInput.value, 10) || 1;
  const shift = shiftSelect.value;

  let multiplier = 1.0;
  if (shift === 'Dia Inteiro') multiplier = 1.4;
  if (participants > 4) multiplier += (participants - 4) * 0.15;

  const estimated = Math.round(guide.pricePerDay * multiplier);
  priceDisplay.innerText = `R$ ${estimated},00`;
}

function submitBooking(event) {
  event.preventDefault();

  const guideSelect = document.getElementById('booking-guide');
  const tourSelect = document.getElementById('booking-tour');
  const dateInput = document.getElementById('booking-date');
  const shiftSelect = document.getElementById('booking-shift');
  const participantsInput = document.getElementById('booking-participants');
  const levelSelect = document.getElementById('booking-level');
  const notesInput = document.getElementById('booking-notes');
  const priceDisplay = document.getElementById('booking-price-display');

  const guide = guidesData.find(g => g.id === guideSelect.value) || guidesData[0];
  const date = dateInput.value;
  const tour = tourSelect.value;
  const shift = shiftSelect.value;
  const participants = participantsInput.value;
  const level = levelSelect.value;
  const notes = notesInput.value;
  const price = priceDisplay.innerText;

  // Format WhatsApp text based on current language
  let message = `🌿 *Solicitação de Agendamento - Ilhabela Interactive Guide*\n\n`;
  message += `👤 *Guia:* ${guide.name} (CADASTUR ${guide.cadastur})\n`;
  message += `🗺️ *Roteiro:* ${tour}\n`;
  message += `📅 *Data:* ${date}\n`;
  message += `⏰ *Período:* ${shift}\n`;
  message += `👥 *Participantes:* ${participants} pessoas\n`;
  message += `🏃 *Nível do Grupo:* ${level}\n`;
  if (notes) message += `📝 *Observações:* ${notes}\n`;
  message += `💰 *Orçamento Estimado:* ${price}\n\n`;
  message += `Olá ${guide.name}! Gostaria de confirmar a disponibilidade para esta data.`;

  const encodedUrl = `https://wa.me/${guide.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp in new tab
  window.open(encodedUrl, '_blank');
  closeBookingModal();
}
function renderLocalRecommendations(spotId) {
  let html = '';
  
  // 1. Servi�os e Atividades
  if (typeof localRecommendations !== 'undefined' && localRecommendations[spotId] && localRecommendations[spotId].length > 0) {
    const recs = localRecommendations[spotId];
    html += `
    <div class="pt-6 border-t border-black/10 mt-6 space-y-4">
      <div>
        <h3 class="text-lg md:text-xl font-extrabold text-primary font-heading uppercase tracking-wide">Servi�os e Atividades na ${t('title')}</h3>
        <p class="text-xs md:text-sm text-on-surface-variant mt-1">Conhe�a os servi�os locais para aproveitar ainda mais sua visita.</p>
      </div>
      <div class="grid grid-cols-1 gap-5">
    `;
    
    recs.forEach(rec => {
      html += `
        <div class="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 shadow-sm group">
          <div class="w-full md:w-2/5 h-48 md:h-auto relative shrink-0">
            <img src="${rec.image}" alt="${rec.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-primary uppercase shadow-sm">
              ${rec.type}
            </div>
          </div>
          <div class="p-4 md:p-5 flex flex-col justify-center flex-1 space-y-3">
            <div>
              <h4 class="text-lg font-bold text-primary font-heading leading-tight">${rec.name}</h4>
              ${rec.tagline ? `<p class="text-xs font-semibold text-secondary mt-0.5">${rec.tagline}</p>` : ''}
            </div>
            
            <p class="text-xs text-on-surface-variant leading-relaxed">${rec.description}</p>
            
            ${rec.highlightTitle ? `
              <div class="bg-primary/5 rounded-lg p-2.5 border-l-2 border-primary">
                <span class="block text-[10px] font-bold text-primary uppercase mb-0.5">${rec.highlightTitle}</span>
                <span class="text-xs font-semibold text-on-surface-variant">${rec.highlightDesc}</span>
              </div>
            ` : ''}

            ${rec.features ? `
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${rec.features.map(f => `<span class="px-2 py-1 rounded-md bg-surface-container/80 text-[10px] font-semibold text-on-surface-variant border border-black/5 whitespace-nowrap"><span class="text-primary mr-1 opacity-70">�</span>${f}</span>`).join('')}
              </div>
            ` : ''}
            
            ${rec.alsoOffers ? `
              <div class="text-[11px] text-on-surface-variant mt-1">
                <span class="font-bold">Tamb�m oferece:</span> ${rec.alsoOffers.join('; ')}.
              </div>
            ` : ''}
            
            ${rec.tags ? `
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${rec.tags.map(t => `<span class="px-2 py-1 rounded-md bg-secondary-container/30 text-[10px] font-bold text-secondary border border-secondary/20 whitespace-nowrap">#${t}</span>`).join('')}
              </div>
            ` : ''}

            <div class="flex flex-wrap gap-2 pt-2 mt-auto">
              ${rec.whatsapp ? `
                <a href="https://wa.me/55${rec.whatsapp}?text=Ol�,%20vim%20pelo%20Ilhabela%20Guide!" target="_blank" class="flex-1 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors">
                  <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span>${rec.whatsappDisplay || 'WhatsApp'}</span>
                </a>
              ` : ''}
              ${rec.instagram ? `
                <a href="https://instagram.com/${rec.instagram.replace('@', '')}" target="_blank" class="py-2.5 px-4 rounded-xl glass-panel text-on-surface-variant hover:text-pink-600 text-[11px] font-bold border border-black/10 flex items-center justify-center gap-1.5 transition-colors">
                  <span class="text-base leading-none">@</span>
                  <span>Instagram</span>
                </a>
              ` : ''}
              ${rec.url ? `
                <a href="${rec.url}" target="_blank" class="py-2.5 px-4 rounded-xl glass-panel text-on-surface-variant hover:text-primary text-[11px] font-bold border border-black/10 flex items-center justify-center gap-1.5 transition-colors">
                  <span class="material-symbols-outlined text-[16px]">language</span>
                  <span>Acessar Site</span>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    });
    
    html += `</div></div>`;
  }

  // 2. Hospedagem
  if (typeof localAccommodations !== 'undefined' && localAccommodations[spotId] && localAccommodations[spotId].length > 0) {
    const stays = localAccommodations[spotId];
    html += `
    <div class="pt-6 border-t border-black/10 mt-6 space-y-4">
      <div>
        <h3 class="text-lg md:text-xl font-extrabold text-primary font-heading uppercase tracking-wide">Onde ficar perto da ${t('title')}</h3>
        <p class="text-xs md:text-sm text-on-surface-variant mt-1">Hospedagem recomendada para a sua visita.</p>
      </div>
      <div class="grid grid-cols-1 gap-5">
    `;
    
    stays.forEach(stay => {
      html += `
        <div class="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row border border-black/5 shadow-sm group">
          <div class="w-full md:w-2/5 h-48 md:h-auto relative shrink-0">
            <img src="${stay.image}" alt="${stay.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-primary uppercase shadow-sm">
              ${stay.type}
            </div>
          </div>
          <div class="p-4 md:p-5 flex flex-col justify-center flex-1 space-y-3">
            <h4 class="text-lg font-bold text-primary font-heading leading-tight">${stay.name}</h4>
            
            ${stay.features ? `
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${stay.features.map(f => `<span class="px-2 py-1 rounded-md bg-surface-container/80 text-[10px] font-semibold text-on-surface-variant border border-black/5 whitespace-nowrap"><span class="text-primary mr-1 opacity-70">�</span>${f}</span>`).join('')}
              </div>
            ` : ''}

            <div class="flex flex-wrap gap-2 pt-2 mt-auto">
              ${stay.url ? `
                <a href="${stay.url}" target="_blank" class="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white text-[11px] font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors">
                  <span class="material-symbols-outlined text-[16px]">hotel</span>
                  <span>Ver hospedagem e Reservar</span>
                </a>
              ` : ''}
              ${stay.whatsapp ? `
                <a href="https://wa.me/55${stay.whatsapp}" target="_blank" class="py-2.5 px-4 rounded-xl glass-panel text-on-surface-variant hover:text-[#1EBE5D] text-[11px] font-bold border border-black/10 flex items-center justify-center gap-1.5 transition-colors">
                  <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span>D�vidas?</span>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    });
    
    html += `</div></div>`;
  }
  
  return html;
}
