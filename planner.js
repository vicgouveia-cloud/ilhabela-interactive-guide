
// Planner map semantics: distinguish experience coordinates from access/navigation points.
Object.assign(translations.pt, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "Local da experiência — não é ponto de acesso terrestre", plannerMapFinalDestination: "Destino final — a navegação pode terminar antes, no ponto de acesso" });
Object.assign(translations.en, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "Experience location — not a terrestrial access point", plannerMapFinalDestination: "Final destination — navigation may end earlier at the access point" });
Object.assign(translations.fr, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "Lieu de l'expérience — ce n'est pas un point d'accès terrestre", plannerMapFinalDestination: "Destination finale — la navigation peut se terminer plus tôt au point d'accès" });
Object.assign(translations.es, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "Lugar de la experiencia — no es un punto de acceso terrestre", plannerMapFinalDestination: "Destino final — la navegación puede terminar antes en el punto de acceso" });
Object.assign(translations.he, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "מיקום החוויה — אינו נקודת גישה יבשתית", plannerMapFinalDestination: "היעד הסופי — הניווט עשוי להסתיים קודם בנקודת הגישה" });

﻿// Translations
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

// Route-planner translations. Kept separate so the existing planner copy remains untouched.
Object.assign(translations.pt, {
  plannerRoadSection: "Trecho por estrada",
  plannerSpecialSection: "Acessos especiais",
  plannerUseLocation: "Usar minha localização",
  plannerLocationReady: "Localização definida",
  plannerLocationDenied: "Não foi possível acessar sua localização.",
  plannerOpenGoogleMaps: "Abrir no Google Maps",
  plannerNoRoadStops: "Nenhuma atração selecionada pode ser enviada como destino rodoviário com segurança.",
  plannerSpecialHint: "Estes lugares continuam no roteiro, mas exigem acesso especial e não entram na rota do modo selecionado.",
  plannerGoogleLimit: "Para compatibilidade com o Google Maps no celular, abra no máximo 4 atrações rodoviárias por vez.",
  plannerRoutingUnknown: "Acesso a confirmar",
  plannerModeRoad: "Estrada", plannerModeTrail: "Trilha", plannerModeBoat: "Barco", plannerMode4x4: "4x4", plannerModeDiving: "Mergulho"
});
Object.assign(translations.en, {
  plannerRoadSection: "Road segment", plannerSpecialSection: "Special access",
  plannerUseLocation: "Use my location", plannerLocationReady: "Location set",
  plannerLocationDenied: "We couldn't access your location.", plannerOpenGoogleMaps: "Open in Google Maps",
  plannerNoRoadStops: "None of the selected attractions can safely be sent as a road destination.",
  plannerSpecialHint: "These places stay in your trip, but require special access and are not included in the selected travel mode route.",
  plannerGoogleLimit: "For mobile Google Maps compatibility, open no more than 4 road attractions at a time.",
  plannerRoutingUnknown: "Access to confirm",
  plannerModeRoad: "Road", plannerModeTrail: "Trail", plannerModeBoat: "Boat", plannerMode4x4: "4x4", plannerModeDiving: "Diving"
});
Object.assign(translations.fr, {
  plannerRoadSection: "Trajet routier", plannerSpecialSection: "Accès spéciaux",
  plannerUseLocation: "Utiliser ma position", plannerLocationReady: "Position définie",
  plannerLocationDenied: "Impossible d'accéder à votre position.", plannerOpenGoogleMaps: "Ouvrir dans Google Maps",
  plannerNoRoadStops: "Aucune attraction sélectionnée ne peut être envoyée en toute sécurité comme destination routière.",
  plannerSpecialHint: "Ces lieux restent dans votre itinéraire, mais nécessitent un accès spécial et ne sont pas inclus dans l’itinéraire du mode de déplacement sélectionné.",
  plannerGoogleLimit: "Pour la compatibilité avec Google Maps sur mobile, ouvrez au maximum 4 attractions routières à la fois.",
  plannerRoutingUnknown: "Accès à confirmer",
  plannerModeRoad: "Route", plannerModeTrail: "Sentier", plannerModeBoat: "Bateau", plannerMode4x4: "4x4", plannerModeDiving: "Plongée"
});
Object.assign(translations.es, {
  plannerRoadSection: "Tramo por carretera", plannerSpecialSection: "Accesos especiales",
  plannerUseLocation: "Usar mi ubicación", plannerLocationReady: "Ubicación definida",
  plannerLocationDenied: "No se pudo acceder a tu ubicación.", plannerOpenGoogleMaps: "Abrir en Google Maps",
  plannerNoRoadStops: "Ninguna atracción seleccionada puede enviarse con seguridad como destino por carretera.",
  plannerSpecialHint: "Estos lugares siguen en tu itinerario, pero requieren acceso especial y no se incluyen en la ruta del modo de desplazamiento seleccionado.",
  plannerGoogleLimit: "Para compatibilidad con Google Maps en móvil, abre como máximo 4 atracciones por carretera a la vez.",
  plannerRoutingUnknown: "Acceso por confirmar",
  plannerModeRoad: "Carretera", plannerModeTrail: "Sendero", plannerModeBoat: "Barco", plannerMode4x4: "4x4", plannerModeDiving: "Buceo"
});
Object.assign(translations.he, {
  plannerRoadSection: "קטע כביש", plannerSpecialSection: "גישה מיוחדת",
  plannerUseLocation: "השתמש במיקום שלי", plannerLocationReady: "המיקום הוגדר",
  plannerLocationDenied: "לא ניתן לגשת למיקום שלך.", plannerOpenGoogleMaps: "פתח ב-Google Maps",
  plannerNoRoadStops: "אין אטרקציות שנבחרו שניתן לשלוח בבטחה כיעד כביש.",
  plannerSpecialHint: "המקומות האלה נשארים במסלול, אך דורשים גישה מיוחדת ואינם נכללים במסלול של אמצעי הנסיעה שנבחר.",
  plannerGoogleLimit: "לתאימות עם Google Maps בנייד, פתח עד 4 אטרקציות כביש בכל פעם.",
  plannerRoutingUnknown: "גישה לאישור",
  plannerModeRoad: "כביש", plannerModeTrail: "שביל", plannerModeBoat: "סירה", plannerMode4x4: "4x4", plannerModeDiving: "צלילה"
});

Object.assign(translations.pt, {
  plannerOptimize: "Otimizar roteiro", plannerOptimizing: "Otimizando…", plannerOptimized: "Roteiro otimizado",
  plannerRouteUnavailable: "Não foi possível otimizar a rota agora. Seu roteiro continua disponível.",
  plannerRouteNeedsStops: "Escolha pelo menos 2 atrações rodoviárias para otimizar.",
  plannerRouteDistance: "Distância", plannerRouteDriveTime: "Tempo em deslocamento"
});
Object.assign(translations.en, {
  plannerOptimize: "Optimize route", plannerOptimizing: "Optimizing…", plannerOptimized: "Optimized route",
  plannerRouteUnavailable: "The route could not be optimized right now. Your trip is still available.",
  plannerRouteNeedsStops: "Choose at least 2 road attractions to optimize.",
  plannerRouteDistance: "Distance", plannerRouteDriveTime: "Travel time"
});
Object.assign(translations.fr, {
  plannerOptimize: "Optimiser l’itinéraire", plannerOptimizing: "Optimisation…", plannerOptimized: "Itinéraire optimisé",
  plannerRouteUnavailable: "Impossible d’optimiser l’itinéraire pour le moment. Votre sélection reste disponible.",
  plannerRouteNeedsStops: "Choisissez au moins 2 attractions routières à optimiser.",
  plannerRouteDistance: "Distance", plannerRouteDriveTime: "Temps de trajet"
});
Object.assign(translations.es, {
  plannerOptimize: "Optimizar ruta", plannerOptimizing: "Optimizando…", plannerOptimized: "Ruta optimizada",
  plannerRouteUnavailable: "No se pudo optimizar la ruta ahora. Tu itinerario sigue disponible.",
  plannerRouteNeedsStops: "Elige al menos 2 atracciones por carretera para optimizar.",
  plannerRouteDistance: "Distancia", plannerRouteDriveTime: "Tiempo de viaje"
});
Object.assign(translations.he, {
  plannerOptimize: "מטב מסלול", plannerOptimizing: "מבצע אופטימיזציה…", plannerOptimized: "מסלול ממוטב",
  plannerRouteUnavailable: "לא ניתן למטב את המסלול כרגע. המסלול שבחרת עדיין זמין.",
  plannerRouteNeedsStops: "בחר לפחות 2 אטרקציות כביש לאופטימיזציה.",
  plannerRouteDistance: "מרחק", plannerRouteDriveTime: "זמן נסיעה"
});

Object.assign(translations.pt, { plannerTravelMode: "Deslocamento", plannerTravelAuto: "Carro", plannerTravelBicycle: "Bicicleta", plannerTravelPedestrian: "A pé", plannerRouteSection: "Rota", plannerModeHint: "A rota considera apenas lugares compatíveis com o modo escolhido." });
Object.assign(translations.en, { plannerTravelMode: "Travel mode", plannerTravelAuto: "Car", plannerTravelBicycle: "Bicycle", plannerTravelPedestrian: "Walking", plannerRouteSection: "Route", plannerModeHint: "The route includes only places compatible with the selected mode." });
Object.assign(translations.fr, { plannerTravelMode: "Déplacement", plannerTravelAuto: "Voiture", plannerTravelBicycle: "Vélo", plannerTravelPedestrian: "À pied", plannerRouteSection: "Itinéraire", plannerModeHint: "L’itinéraire inclut uniquement les lieux compatibles avec le mode choisi." });
Object.assign(translations.es, { plannerTravelMode: "Desplazamiento", plannerTravelAuto: "Coche", plannerTravelBicycle: "Bicicleta", plannerTravelPedestrian: "A pie", plannerRouteSection: "Ruta", plannerModeHint: "La ruta incluye solo lugares compatibles con el modo elegido." });
Object.assign(translations.he, { plannerTravelMode: "אופן הגעה", plannerTravelAuto: "רכב", plannerTravelBicycle: "אופניים", plannerTravelPedestrian: "ברגל", plannerRouteSection: "מסלול", plannerModeHint: "המסלול כולל רק מקומות המתאימים לאופן ההגעה שנבחר." });

Object.assign(translations.pt, { plannerVisitTime: "Tempo nas atrações", plannerTotalEstimate: "Duração estimada", plannerPartialEstimate: "Estimativa parcial", plannerPartialEstimateHint: "Alguns lugares ainda não têm tempo de permanência estimado." });
Object.assign(translations.en, { plannerVisitTime: "Time at attractions", plannerTotalEstimate: "Estimated duration", plannerPartialEstimate: "Partial estimate", plannerPartialEstimateHint: "Some places do not yet have an estimated visit time." });
Object.assign(translations.fr, { plannerVisitTime: "Temps aux attractions", plannerTotalEstimate: "Durée estimée", plannerPartialEstimate: "Estimation partielle", plannerPartialEstimateHint: "Certains lieux n'ont pas encore de durée de visite estimée." });
Object.assign(translations.es, { plannerVisitTime: "Tiempo en las atracciones", plannerTotalEstimate: "Duración estimada", plannerPartialEstimate: "Estimación parcial", plannerPartialEstimateHint: "Algunos lugares aún no tienen tiempo de visita estimado." });
Object.assign(translations.he, { plannerVisitTime: "זמן באטרקציות", plannerTotalEstimate: "משך זמן משוער", plannerPartialEstimate: "הערכה חלקית", plannerPartialEstimateHint: "לחלק מהמקומות עדיין אין זמן ביקור משוער." });

// State
let tripSelection = [];
let dismissedInSession = new Set();
let plannerFilter = 'all';
let plannerDeckQueue = [];
let currentPlannerView = 'deck'; // 'deck' or 'summary'
let plannerMap = null;
let plannerMapMarkers = [];
let plannerOrigin = null;
let plannerTravelMode = localStorage.getItem('ilhabela_travel_mode') || 'auto';
let plannerOptimizedRoute = null;
let plannerRouteLine = null;
const VALHALLA_ENDPOINT = 'https://valhalla1.openstreetmap.de/optimized_route';

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
  const cats = ['all', 'praias', 'cachoeiras', 'trilhas', 'cultura', 'mirantes', 'picos', 'baleias', 'mergulho'];
  
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

  const selectedSpots = tripSelection.map(id => touristSpots.find(s => s.id === id)).filter(Boolean);
  const roadSpots = selectedSpots.filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
  const specialSpots = selectedSpots.filter(spot => !isSpotRoutableForMode(spot, plannerTravelMode));

  let html = renderPlannerRoutingPanel(roadSpots, specialSpots);
  html += renderPlannerMaritimeOptions(selectedSpots);
  html += renderPlannerNauticalExperiences(selectedSpots);
  selectedSpots.forEach(spot => {
    const id = spot.id;
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

function getPlannerTravelModeLabel(mode) {
  const keys = { auto: 'plannerTravelAuto', bicycle: 'plannerTravelBicycle', pedestrian: 'plannerTravelPedestrian', '4x4': 'plannerTravel4x4' };
  return t(keys[mode] || keys.auto);
}

function isSpotRoutableForMode(spot, mode = plannerTravelMode) {
  return !!resolvePlannerAccess(spot, mode);
}

function plannerSetTravelMode(mode) {
  if (!['auto', 'bicycle', 'pedestrian', '4x4'].includes(mode) || mode === plannerTravelMode) return;
  plannerTravelMode = mode;
  localStorage.setItem('ilhabela_travel_mode', mode);
  plannerOptimizedRoute = null;
  renderSummary();
}

function getPlannerModeLabel(mode) {
  const keys = { road: 'plannerModeRoad', trail: 'plannerModeTrail', boat: 'plannerModeBoat', '4x4': 'plannerMode4x4', diving: 'plannerModeDiving' };
  return keys[mode] ? t(keys[mode]) : t('plannerRoutingUnknown');
}

function formatPlannerDuration(seconds) {
  const mins = Math.max(1, Math.round((seconds || 0) / 60));
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  return rest ? `${hours}h ${rest}min` : `${hours}h`;
}

function getOptimizedRouteSpots(roadSpots) {
  if (!plannerOptimizedRoute?.spotIds?.length) return roadSpots;
  const byId = new Map(roadSpots.map(spot => [spot.id, spot]));
  const ordered = plannerOptimizedRoute.spotIds.map(id => byId.get(id)).filter(Boolean);
  return ordered.length === roadSpots.length ? ordered : roadSpots;
}

function formatPlannerMinutes(minutes) {
  const mins = Math.max(0, Math.round(minutes || 0));
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60), rest = mins % 60;
  return rest ? `${hours}h ${rest}min` : `${hours}h`;
}

function getPlannerVisitEstimate() {
  const selected = tripSelection.map(id => touristSpots.find(spot => spot.id === id)).filter(Boolean);
  let min = 0, max = 0, covered = 0;
  selected.forEach(spot => {
    const range = spot.planning?.visitDurationMinutes;
    if (!range || !Number.isFinite(range.min) || !Number.isFinite(range.max)) return;
    min += range.min; max += range.max; covered++;
  });
  return { min, max, covered, total: selected.length, partial: covered < selected.length };
}

function formatPlannerRange(min, max) {
  return min === max ? formatPlannerMinutes(min) : `${formatPlannerMinutes(min)}–${formatPlannerMinutes(max)}`;
}

function renderPlannerRoutingPanel(roadSpots, specialSpots) {
  const orderedRoadSpots = getOptimizedRouteSpots(roadSpots);
  const travelModes = [
    ['auto', 'directions_car', 'plannerTravelAuto'],
    ['bicycle', 'directions_bike', 'plannerTravelBicycle'],
    ['pedestrian', 'directions_walk', 'plannerTravelPedestrian'],
    ['4x4', 'directions_car', 'plannerMode4x4']
  ];
  const modeSelector = `<div><div class="text-[11px] font-bold text-on-surface-variant mb-1.5">${t('plannerTravelMode')}</div><div class="flex gap-2 overflow-x-auto">${travelModes.map(([mode, icon, key]) => `<button type="button" onclick="plannerSetTravelMode('${mode}')" class="shrink-0 px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${plannerTravelMode === mode ? 'bg-primary text-white border-primary' : 'bg-surface-container text-primary border-black/10'}"><span class="material-symbols-outlined text-[16px]">${icon}</span>${t(key)}</button>`).join('')}</div><p class="text-[10px] text-on-surface-variant mt-1.5">${t('plannerModeHint')}</p></div>`;
  const roadNames = orderedRoadSpots.map(spot => getSpotTranslation(spot).title);
  const visit = getPlannerVisitEstimate();
  const travelMinutes = plannerOptimizedRoute ? Math.round((plannerOptimizedRoute.timeSeconds || 0) / 60) : 0;
  const visitStats = visit.covered
    ? `<div class="text-xs text-primary space-y-1"><div><strong>${t('plannerVisitTime')}:</strong> ${formatPlannerRange(visit.min, visit.max)}</div>${plannerOptimizedRoute ? `<div><strong>${t('plannerTotalEstimate')}:</strong> ${formatPlannerRange(visit.min + travelMinutes, visit.max + travelMinutes)}</div>` : ''}${visit.partial ? `<div class="text-[11px] text-on-surface-variant"><strong>${t('plannerPartialEstimate')}.</strong> ${t('plannerPartialEstimateHint')}</div>` : ''}</div>`
    : visit.total
      ? `<div class="text-[11px] text-on-surface-variant"><strong>${t('plannerPartialEstimate')}.</strong> ${t('plannerPartialEstimateHint')}</div>`
      : '';
  const routeStats = plannerOptimizedRoute
    ? `<div class="flex gap-4 text-xs font-bold text-primary"><span>${t('plannerRouteDistance')}: ${(plannerOptimizedRoute.distanceKm || 0).toFixed(1)} km</span><span>${t('plannerRouteDriveTime')}: ${formatPlannerDuration(plannerOptimizedRoute.timeSeconds)}</span></div>`
    : '';
  const specialRows = specialSpots.map(spot => {
    const modes = (spot.routing?.modes || ['unknown']).map(getPlannerModeLabel).join(' · ');
    return `<li class="flex items-center justify-between gap-3 py-1.5"><span class="font-semibold">${getSpotTranslation(spot).title}</span><span class="text-[11px] text-on-surface-variant">${modes}</span></li>`;
  }).join('');
  const canOpenMaps = roadSpots.length > 0 && roadSpots.length <= 4;

  return `
    <div class="space-y-3 mb-4">
      <div class="rounded-2xl border border-black/10 bg-white p-4 space-y-3">
        ${modeSelector}
        ${[...roadSpots, ...specialSpots].map(spot => plannerAccessNotice(spot) ? `<p class="text-xs text-primary"><strong>${getSpotTranslation(spot).title}:</strong> ${plannerAccessNotice(spot)}</p>` : '').join('')}
        <button type="button" onclick="plannerDownloadOffline()" class="px-3 py-2 rounded-xl border text-xs font-bold">${t('plannerOfflineDownload')}</button>
        <p class="text-xs text-on-surface-variant">${t('plannerOfflineHint')}</p>
        <div class="flex items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-extrabold text-primary">${t('plannerRouteSection')} · ${getPlannerTravelModeLabel(plannerTravelMode)}</h3>
            <p class="text-xs text-on-surface-variant">${roadNames.length ? roadNames.join(' · ') : t('plannerNoRoadStops')}</p>
          </div>
          <span class="material-symbols-outlined text-secondary">route</span>
        </div>
        ${routeStats}
        ${visitStats}
        <div class="flex flex-wrap gap-2">
          <button type="button" onclick="plannerUseMyLocation()" class="px-3 py-2 rounded-xl border border-black/10 bg-surface-container text-xs font-bold text-primary">
            <span class="material-symbols-outlined text-[15px] align-middle">my_location</span>
            <span id="planner-location-label">${plannerOrigin ? t('plannerLocationReady') : t('plannerUseLocation')}</span>
          </button>
          <button type="button" onclick="plannerOptimizeRoute()" ${roadSpots.length >= 2 ? '' : 'disabled'} class="px-3 py-2 rounded-xl bg-secondary text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed">
            ${plannerOptimizedRoute ? t('plannerOptimized') : t('plannerOptimize')}
          </button>
          <button type="button" onclick="plannerOpenGoogleMaps()" ${canOpenMaps ? '' : 'disabled'} class="px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed">
            ${t('plannerOpenGoogleMaps')}
          </button>
        </div>
        ${roadSpots.length > 4 ? `<p class="text-[11px] text-tertiary">${t('plannerGoogleLimit')}</p>` : ''}
      </div>
      ${specialSpots.length ? `
        <div class="rounded-2xl border border-black/10 bg-surface-container/40 p-4">
          <h3 class="text-sm font-extrabold text-primary mb-1">${t('plannerSpecialSection')}</h3>
          <p class="text-[11px] text-on-surface-variant mb-2">${t('plannerSpecialHint')}</p>
          <ul class="text-xs text-primary divide-y divide-black/5">${specialRows}</ul>
        </div>` : ''}
    </div>`;
}

function plannerUseMyLocation() {
  if (typeof lastUserLocation !== 'undefined' && lastUserLocation) {
    plannerOrigin = [lastUserLocation.lat, lastUserLocation.lng];
    renderSummary();
    return;
  }
  if (!navigator.geolocation) {
    alert(t('plannerLocationDenied'));
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    plannerOrigin = [position.coords.latitude, position.coords.longitude];
    renderSummary();
  }, () => alert(t('plannerLocationDenied')), {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000
  });
}

function plannerDecodePolyline6(encoded) {
  const coordinates = [];
  let index = 0, lat = 0, lon = 0;
  while (index < encoded.length) {
    let shift = 0, result = 0, byte;
    do { byte = encoded.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
    lat += (result & 1) ? ~(result >> 1) : (result >> 1);
    shift = 0; result = 0;
    do { byte = encoded.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
    lon += (result & 1) ? ~(result >> 1) : (result >> 1);
    coordinates.push([lat / 1e6, lon / 1e6]);
  }
  return coordinates;
}

async function plannerOptimizeRoute() {
  const roadSpots = tripSelection.map(id => touristSpots.find(spot => spot.id === id)).filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
  if (roadSpots.length < 2) { alert(t('plannerRouteNeedsStops')); return; }
  if (!plannerConfirmAccess(roadSpots)) return;

  const locations = [];
  if (plannerOrigin) locations.push({ lat: plannerOrigin[0], lon: plannerOrigin[1], type: 'break' });
  roadSpots.forEach(spot => { const coords = resolvePlannerAccess(spot, plannerTravelMode).coords; locations.push({ lat: coords[0], lon: coords[1], type: 'break' }); });

  try {
    const button = document.querySelector('[onclick="plannerOptimizeRoute()"]');
    if (button) { button.disabled = true; button.textContent = t('plannerOptimizing'); }
    const payload = { locations, costing: plannerTravelMode === '4x4' ? 'auto' : plannerTravelMode, units: 'kilometers' };
    const response = await fetch(VALHALLA_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Client-Id': 'ilhabela-guide' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Valhalla ${response.status}`);
    const data = await response.json();
    const trip = data.trip;
    if (!trip?.legs?.length || !trip.summary) throw new Error('Invalid Valhalla response');

    const orderedOriginalIndexes = (trip.locations || [])
      .map(location => Number(location.original_index))
      .filter(Number.isFinite);
    const originOffset = plannerOrigin ? 1 : 0;
    const orderedIds = orderedOriginalIndexes
      .filter(index => index >= originOffset)
      .map(index => roadSpots[index - originOffset]?.id)
      .filter(Boolean);
    if (orderedIds.length !== roadSpots.length) throw new Error('Incomplete optimized order');

    const shape = trip.legs.map(leg => plannerDecodePolyline6(leg.shape)).flat();
    plannerOptimizedRoute = {
      spotIds: orderedIds,
      distanceKm: Number(trip.summary.length) || 0,
      timeSeconds: Number(trip.summary.time) || 0,
      shape
    };
    renderSummary();
  } catch (error) {
    console.warn('[planner] route optimization unavailable', error);
    plannerOptimizedRoute = null;
    renderSummary();
    alert(t('plannerRouteUnavailable'));
  }
}

function plannerOpenGoogleMaps() {
  let roadSpots = tripSelection
    .map(id => touristSpots.find(spot => spot.id === id))
    .filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
  roadSpots = getOptimizedRouteSpots(roadSpots);
  if (!roadSpots.length) {
    alert(t('plannerNoRoadStops'));
    return;
  }
  if (roadSpots.length > 4) {
    alert(t('plannerGoogleLimit'));
    return;
  }

  const googleTravelMode = { auto: 'driving', bicycle: 'bicycling', pedestrian: 'walking', '4x4': 'driving' }[plannerTravelMode] || 'driving';
  const params = new URLSearchParams({ api: '1', travelmode: googleTravelMode });
  if (plannerOrigin) params.set('origin', plannerOrigin.join(','));
  if (!plannerConfirmAccess(roadSpots)) return;
  const points = roadSpots.map(spot => resolvePlannerAccess(spot, plannerTravelMode).coords.join(','));
  params.set('destination', points[points.length - 1]);
  if (points.length > 1) params.set('waypoints', points.slice(0, -1).join('|'));
  window.open(`https://www.google.com/maps/dir/?${params.toString()}`, '_blank', 'noopener,noreferrer');
}

function removeFromPlanner(id) {
  plannerOptimizedRoute = null;
  tripSelection = tripSelection.filter(sid => sid !== id);
  saveTripSelection();
  generateDeckQueue(); // In case we want to show it again in the deck
  renderSummary();
}

function initPlannerMap() {
  plannerRouteLine = null;
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

    const markerContext = getPlannerMapMarkerContext(spot);
    const marker = L.marker(spot.coords, { icon }).addTo(plannerMap)
      .bindPopup(`<strong class="text-xs">${index+1}. ${tr.title}</strong>${markerContext.label ? `<br><span class="text-[10px] text-on-surface-variant">${markerContext.label}</span>` : ''}`);
    
    bounds.extend(spot.coords);
    plannerMapMarkers.push(marker);
  });

  if (plannerOptimizedRoute?.shape?.length) {
    plannerRouteLine = L.polyline(plannerOptimizedRoute.shape, { weight: 5, opacity: 0.8 }).addTo(plannerMap);
    plannerOptimizedRoute.shape.forEach(coord => bounds.extend(coord));
  }
  if (plannerOrigin) {
    L.circleMarker(plannerOrigin, { radius: 7, weight: 3, fillOpacity: 1 }).addTo(plannerMap).bindPopup(t('plannerLocationReady'));
    bounds.extend(plannerOrigin);
  }
  if (plannerMapMarkers.length > 0 || plannerOptimizedRoute?.shape?.length) {
    plannerMap.fitBounds(bounds, { padding: [30, 30] });
  }
}

function getPlannerMapMarkerContext(spot) {
  const nautical = typeof getNauticalExperienceOptionsForSpot === 'function'
    ? getNauticalExperienceOptionsForSpot(spot.id)
    : [];
  if (nautical.length) return { kind: 'experience', label: t('plannerMapExperienceLocation') };
  const access = resolvePlannerAccess(spot, plannerTravelMode);
  if (access && (access.coords[0] !== spot.coords[0] || access.coords[1] !== spot.coords[1])) {
    return { kind: 'destination', label: t('plannerMapFinalDestination') };
  }
  return { kind: 'standard', label: '' };
}

// Hook into app load
document.addEventListener('DOMContentLoaded', () => {
  initPlanner();
});
