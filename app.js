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

// Initialize on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initMap();
  renderCategoryCounts();
  renderSpotsGrid();
  renderGuides();
  updateSavedCountDisplay();
  populateBookingGuides();

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
  
  map = L.map('map', {
    center: ilhabelaCenter,
    zoom: 11,
    minZoom: 10,
    maxZoom: 18,
    zoomControl: false
  });

  // Custom Zoom Control (bottom-right)
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Map Tile Layers
  mapLayers.voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  });

  mapLayers.satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri & Earthstar Geographics',
    maxZoom: 19
  });

  mapLayers.topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenTopoMap',
    maxZoom: 17
  });

  mapLayers.voyager.addTo(map);

  // Render Markers
  updateMapMarkers();
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
      if (key === layerKey) {
        btn.className = 'px-3 py-1.5 rounded-lg bg-primary text-white transition-all';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-primary transition-all';
      }
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
    default: return 'place';
  }
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
        <div class="custom-pin pin-${spot.category}" id="pin-${spot.id}">
          <div class="pin-pulse pin-${spot.category}"></div>
          <div class="pin-icon-wrap pin-${spot.category}">
            <span class="material-symbols-outlined text-[20px]">${catIcon}</span>
          </div>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21]
    });

    const marker = L.marker(spot.coords, { icon: customIcon }).addTo(map);

    // Hover Tooltip
    marker.bindTooltip(`
      <div class="text-xs font-semibold">
        <strong class="text-primary block text-sm font-heading">${tr.title || ''}</strong>
        <span class="text-on-surface-variant">${tr.subtitle || ''}</span>
      </div>
    `, {
      className: 'leaflet-tooltip-custom',
      direction: 'top',
      offset: [0, -22]
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
            ★ ${spot.rating}
          </span>
        </div>
        <h4 class="text-sm font-bold text-primary truncate font-heading">${tr.title}</h4>
        <p class="text-xs text-on-surface-variant line-clamp-1">${tr.subtitle}</p>
        <button onclick="openSpotModal('${spot.id}')" class="text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-0.5">
          <span>${t('spotDetails')}</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  `;
  card.classList.remove('hidden');
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
  const counts = { all: touristSpots.length, praias: 0, cachoeiras: 0, trilhas: 0, picos: 0, baleias: 0, mergulho: 0 };
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
          <img src="${spot.image}" alt="${tr.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <!-- Category & Difficulty Badges -->
          <div class="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <span class="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-primary shadow-sm flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">${getCategoryIcon(spot.category)}</span>
              ${t(`filter${spot.category.charAt(0).toUpperCase() + spot.category.slice(1)}`)}
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
            <span class="text-amber-400">★</span> ${spot.rating} (${spot.reviews})
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

  if (mode === 'map') {
    if (mapSec) mapSec.classList.remove('hidden');
    if (gridSec) gridSec.classList.remove('hidden');
    if (btnMap) btnMap.className = 'px-4 py-1.5 rounded-full bg-primary text-white shadow-sm flex items-center gap-1.5 transition-all';
    if (btnGrid) btnGrid.className = 'px-4 py-1.5 rounded-full text-on-surface-variant hover:text-primary flex items-center gap-1.5 transition-all';
    if (map) map.invalidateSize();
    mapSec.scrollIntoView({ behavior: 'smooth' });
  } else {
    if (btnGrid) btnGrid.className = 'px-4 py-1.5 rounded-full bg-primary text-white shadow-sm flex items-center gap-1.5 transition-all';
    if (btnMap) btnMap.className = 'px-4 py-1.5 rounded-full text-on-surface-variant hover:text-primary flex items-center gap-1.5 transition-all';
    gridSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- SPOT DETAILS MODAL ---
function openSpotModal(spotId) {
  const spot = touristSpots.find(s => s.id === spotId);
  if (!spot) return;
  selectedSpotId = spotId;

  const tr = getSpotTranslation(spot);
  const modal = document.getElementById('spot-modal');
  const content = document.getElementById('spot-modal-content');
  if (!modal || !content) return;

  const diffClass = getDifficultyBadgeClass(spot.specs.difficulty);
  const diffLabel = t(`difficulty${spot.specs.difficulty.charAt(0).toUpperCase() + spot.specs.difficulty.slice(1)}`);
  const isFav = savedFavorites.has(spot.id);

  content.innerHTML = `
    <!-- Modal Hero -->
    <div class="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden bg-gray-100 shadow-md">
      <img src="${spot.image}" alt="${tr.title}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      
      <div class="absolute bottom-6 left-6 right-6 text-white space-y-2">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase ${diffClass}">
            ${diffLabel}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold">
            ★ ${spot.rating} (${spot.reviews} avaliações)
          </span>
        </div>
        <h2 class="text-2xl md:text-3xl font-extrabold font-heading text-white">${tr.title}</h2>
        <p class="text-xs md:text-sm text-white/80 line-clamp-2">${tr.subtitle}</p>
      </div>

      <button onclick="toggleFavorite('${spot.id}', event); openSpotModal('${spot.id}');" class="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
        <span class="material-symbols-outlined text-[22px] ${isFav ? 'text-red-500 fill-current' : ''}">favorite</span>
      </button>
    </div>

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

    <!-- Action Buttons (Google Maps & Hire Guide) -->
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
