// Translations
Object.assign(translations.pt, {
  btnPlanner: "Monte seu roteiro",
  plannerTitle: "Monte seu roteiro",
  plannerSubtitle: "Descubra lugares incríveis",
  btnSkip: "Pular",
  btnLike: "Gostei",
  btnFinish: "Ver Roteiro",
  btnRemove: "Remover",
  emptyPlanner: "Nenhuma atração disponível para esta categoria.",
  filterAll: "Todas",
  plannerSelected: "escolhidos",
  plannerDetails: "Ver detalhes",
  emptySummary: "Você ainda não selecionou nenhum lugar.",
  plannerSummaryTitle: "Seu Roteiro",
  btnBackToDeck: "Voltar para Explorar"
});
Object.assign(translations.en, {
  btnPlanner: "Trip Planner",
  plannerTitle: "Trip Planner",
  plannerSubtitle: "Discover amazing places",
  btnSkip: "Skip",
  btnLike: "Like",
  btnFinish: "View Trip",
  btnRemove: "Remove",
  emptyPlanner: "No more attractions available for this category.",
  filterAll: "All",
  plannerSelected: "selected",
  plannerDetails: "See details",
  emptySummary: "You haven't selected any places yet.",
  plannerSummaryTitle: "Your Trip",
  btnBackToDeck: "Back to Explore"
});
Object.assign(translations.fr, {
  btnPlanner: "Mon Itinéraire",
  plannerTitle: "Mon Itinéraire",
  plannerSubtitle: "Découvrez des endroits incroyables",
  btnSkip: "Passer",
  btnLike: "J'aime",
  btnFinish: "Voir Itinéraire",
  btnRemove: "Supprimer",
  emptyPlanner: "Aucune attraction disponible pour cette catégorie.",
  filterAll: "Toutes",
  plannerSelected: "choisis",
  plannerDetails: "Voir détails",
  emptySummary: "Vous n'avez encore sélectionné aucun endroit.",
  plannerSummaryTitle: "Votre Itinéraire",
  btnBackToDeck: "Retour à l'exploration"
});
Object.assign(translations.es, {
  btnPlanner: "Tu Itinerario",
  plannerTitle: "Tu Itinerario",
  plannerSubtitle: "Descubre lugares increíbles",
  btnSkip: "Omitir",
  btnLike: "Me gusta",
  btnFinish: "Ver Itinerario",
  btnRemove: "Eliminar",
  emptyPlanner: "No hay más atracciones para esta categoría.",
  filterAll: "Todas",
  plannerSelected: "elegidos",
  plannerDetails: "Ver detalles",
  emptySummary: "Aún no has seleccionado ningún lugar.",
  plannerSummaryTitle: "Tu Itinerario",
  btnBackToDeck: "Volver a explorar"
});
Object.assign(translations.he, {
  btnPlanner: "תכנן מסלול",
  plannerTitle: "תכנן מסלול",
  plannerSubtitle: "גלה מקומות מדהימים",
  btnSkip: "דלג",
  btnLike: "אהבתי",
  btnFinish: "צפה במסלול",
  btnRemove: "הסר",
  emptyPlanner: "אין יותר אטרקציות בקטגוריה זו.",
  filterAll: "הכל",
  plannerSelected: "נבחרו",
  plannerDetails: "פרטים",
  emptySummary: "עדיין לא בחרת מקומות.",
  plannerSummaryTitle: "המסלול שלך",
  btnBackToDeck: "חזור לגלות"
});

// State
let tripSelection = [];
let dismissedInSession = new Set();
let plannerFilter = 'all';
let plannerDeckQueue = [];
let currentPlannerView = 'deck'; // 'deck' or 'summary'
let plannerMap = null;
let plannerMapMarkers = [];

// Initialize
function initPlanner() {
  try {
    const saved = localStorage.getItem('ilhabela_trip');
    if (saved) {
      tripSelection = JSON.parse(saved);
      if (!Array.isArray(tripSelection)) tripSelection = [];
    }
  } catch(e) {
    tripSelection = [];
  }
  updatePlannerBadge();
}

function saveTripSelection() {
  localStorage.setItem('ilhabela_trip', JSON.stringify(tripSelection));
  updatePlannerBadge();
}

function updatePlannerBadge() {
  const badge = document.getElementById('planner-count-badge');
  if (badge) badge.textContent = tripSelection.length;
}

function openPlanner(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('planner-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  
  // Re-translate just in case
  modal.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });

  renderPlannerFilters();
  generateDeckQueue();
  renderDeckCard();
}

function closePlanner() {
  const modal = document.getElementById('planner-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

function togglePlannerView() {
  const deck = document.getElementById('planner-deck-view');
  const summary = document.getElementById('planner-summary-view');
  if (currentPlannerView === 'deck') {
    currentPlannerView = 'summary';
    deck.classList.add('hidden');
    deck.classList.remove('flex');
    summary.classList.remove('hidden');
    summary.classList.add('flex');
    renderSummary();
  } else {
    currentPlannerView = 'deck';
    summary.classList.add('hidden');
    summary.classList.remove('flex');
    deck.classList.remove('hidden');
    deck.classList.add('flex');
  }
}

function renderPlannerFilters() {
  const container = document.getElementById('planner-filters');
  const cats = ['all', 'praias', 'cachoeiras', 'trilhas', 'cultura', 'mirantes'];
  
  let html = '';
  cats.forEach(c => {
    let label = c === 'all' ? t('filterAll') : getCategoryLabel(c);
    const activeClass = plannerFilter === c ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container/80';
    html += `<button onclick="setPlannerFilter('${c}')" class="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeClass}">${label}</button>`;
  });
  container.innerHTML = html;
}

function setPlannerFilter(cat) {
  plannerFilter = cat;
  renderPlannerFilters();
  generateDeckQueue();
  renderDeckCard();
}

function generateDeckQueue() {
  plannerDeckQueue = touristSpots.filter(spot => {
    if (tripSelection.includes(spot.id)) return false;
    if (dismissedInSession.has(spot.id)) return false;
    if (plannerFilter !== 'all' && spot.category !== plannerFilter) return false;
    return true;
  });
  // Optional: shuffle array here
}

function renderDeckCard() {
  const container = document.getElementById('planner-cards-container');
  const actions = document.getElementById('planner-actions');
  
  if (plannerDeckQueue.length === 0) {
    container.innerHTML = `<div class="text-center p-8"><span class="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2">check_circle</span><p class="text-sm font-semibold text-on-surface-variant">${t('emptyPlanner')}</p></div>`;
    actions.classList.add('hidden');
    actions.classList.remove('flex');
    return;
  }
  
  actions.classList.remove('hidden');
  actions.classList.add('flex');

  // Render top card
  const spot = plannerDeckQueue[0];
  const tr = getSpotTranslation(spot);
  const catIcon = getCategoryIcon(spot.category);
  const diffClass = getDifficultyBadgeClass(spot.specs.difficulty);
  const diffLabel = t(`difficulty${spot.specs.difficulty.charAt(0).toUpperCase() + spot.specs.difficulty.slice(1)}`);
  
  container.innerHTML = `
    <div id="planner-active-card" class="absolute w-full max-w-sm h-full max-h-[500px] rounded-3xl overflow-hidden shadow-xl bg-white border border-black/5 transform transition-transform duration-300" style="touch-action: pan-y;">
      <img src="${spot.image}" class="w-full h-2/3 object-cover pointer-events-none" />
      <div class="absolute top-3 left-3 flex items-center gap-1.5">
        <span class="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm"><span class="material-symbols-outlined text-[12px]">${catIcon}</span>${getCategoryLabel(spot.category)}</span>
        <span class="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold uppercase shadow-sm ${diffClass}">${diffLabel}</span>
      </div>
      <div class="p-4 h-1/3 flex flex-col justify-center text-center">
        <h3 class="text-xl font-extrabold text-primary font-heading leading-tight">${tr.title}</h3>
        <p class="text-xs text-on-surface-variant line-clamp-2 mt-1">${tr.subtitle}</p>
      </div>
    </div>
  `;

  initSwipe();
}

let startX = 0, currentX = 0;
let cardEl = null;

function initSwipe() {
  cardEl = document.getElementById('planner-active-card');
  if (!cardEl) return;
  cardEl.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; currentX = 0; });
  cardEl.addEventListener('touchmove', (e) => {
    if (!startX) return;
    currentX = e.touches[0].clientX - startX;
    const rotate = currentX * 0.05;
    cardEl.style.transform = `translate(${currentX}px, 0) rotate(${rotate}deg)`;
    cardEl.style.transition = 'none';
  });
  cardEl.addEventListener('touchend', () => {
    if (!startX) return;
    if (currentX > 80) { plannerSwipe('right'); }
    else if (currentX < -80) { plannerSwipe('left'); }
    else {
      cardEl.style.transition = 'transform 0.3s ease';
      cardEl.style.transform = `translate(0px, 0) rotate(0deg)`;
    }
    startX = 0;
  });
}

function plannerSwipe(direction) {
  if (plannerDeckQueue.length === 0) return;
  const spot = plannerDeckQueue.shift();
  
  if (cardEl) {
    cardEl.style.transition = 'transform 0.4s ease';
    cardEl.style.transform = direction === 'left' ? 'translate(-120%, 20px) rotate(-15deg)' : 'translate(120%, 20px) rotate(15deg)';
  }

  if (direction === 'left') {
    dismissedInSession.add(spot.id);
  } else {
    tripSelection.push(spot.id);
    saveTripSelection();
  }

  setTimeout(() => {
    renderDeckCard();
  }, 300);
}

function plannerShowDetails() {
  if (plannerDeckQueue.length === 0) return;
  openSpotModal(plannerDeckQueue[0].id);
}

// Summary View
function renderSummary() {
  const listContainer = document.getElementById('planner-summary-list');
  
  if (tripSelection.length === 0) {
    listContainer.innerHTML = `<div class="text-center py-10"><p class="text-sm font-semibold text-on-surface-variant">${t('emptySummary')}</p></div>`;
    initPlannerMap();
    return;
  }

  let html = '';
  tripSelection.forEach(id => {
    const spot = touristSpots.find(s => s.id === id);
    if (!spot) return;
    const tr = getSpotTranslation(spot);
    html += `
      <div class="flex items-center gap-3 p-2 border border-black/5 rounded-xl bg-surface-container/30">
        <img src="${spot.image}" class="w-16 h-16 rounded-lg object-cover" />
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-primary truncate">${tr.title}</h4>
          <p class="text-xs text-on-surface-variant truncate">${tr.subtitle}</p>
        </div>
        <button onclick="removeFromPlanner('${spot.id}')" class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
          <span class="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    `;
  });
  listContainer.innerHTML = html;
  initPlannerMap();
}

function removeFromPlanner(id) {
  tripSelection = tripSelection.filter(sid => sid !== id);
  saveTripSelection();
  generateDeckQueue(); // In case we want to show it again in the deck
  renderSummary();
}

function initPlannerMap() {
  if (plannerMap) {
    plannerMap.remove();
    plannerMap = null;
  }
  plannerMap = L.map('planner-map', { zoomControl: false, attributionControl: false }).setView([-23.820, -45.365], 11);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(plannerMap);

  plannerMapMarkers = [];
  const bounds = L.latLngBounds();

  tripSelection.forEach((id, index) => {
    const spot = touristSpots.find(s => s.id === id);
    if (!spot) return;
    const tr = getSpotTranslation(spot);
    const catIcon = getCategoryIcon(spot.category);
    
    const icon = L.divIcon({
      className: 'custom-pin-container',
      html: `<div class="custom-pin"><div class="pin-icon-wrap pin-${spot.category}"><span class="material-symbols-outlined text-[16px]">${catIcon}</span></div></div>`,
      iconSize: [30, 30], iconAnchor: [15, 15]
    });

    const marker = L.marker(spot.coords, { icon }).addTo(plannerMap)
      .bindPopup(`<strong class="text-xs">${index+1}. ${tr.title}</strong>`);
    
    bounds.extend(spot.coords);
    plannerMapMarkers.push(marker);
  });

  if (plannerMapMarkers.length > 0) {
    plannerMap.fitBounds(bounds, { padding: [30, 30] });
  }
}

// Hook into app load
document.addEventListener('DOMContentLoaded', () => {
  initPlanner();
});
