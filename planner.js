
// Planner map semantics: distinguish experience coordinates from access/navigation points.
Object.assign(translations.pt, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "Local da experiência — não é ponto de acesso terrestre", plannerMapFinalDestination: "Destino final — a navegação pode terminar antes, no ponto de acesso", plannerMapAccessPoint: "Ponto de acesso / fim da navegação" });
Object.assign(translations.en, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "Experience location — not a terrestrial access point", plannerMapFinalDestination: "Final destination — navigation may end earlier at the access point", plannerMapAccessPoint: "Access point / navigation endpoint" });
Object.assign(translations.fr, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "Lieu de l'expérience — ce n'est pas un point d'accès terrestre", plannerMapFinalDestination: "Destination finale — la navigation peut se terminer plus tôt au point d'accès", plannerMapAccessPoint: "Point d'accès / fin de la navigation" });
Object.assign(translations.es, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "Lugar de la experiencia — no es un punto de acceso terrestre", plannerMapFinalDestination: "Destino final — la navegación puede terminar antes en el punto de acceso", plannerMapAccessPoint: "Punto de acceso / fin de la navegación" });
Object.assign(translations.he, {
  plannerTravel4x4: "4x4", plannerMapExperienceLocation: "מיקום החוויה — אינו נקודת גישה יבשתית", plannerMapFinalDestination: "היעד הסופי — הניווט עשוי להסתיים קודם בנקודת הגישה", plannerMapAccessPoint: "נקודת גישה / סוף הניווט" });

﻿// Translations
Object.assign(translations.pt, {
  btnPlanner: "Escolher lugares",
  plannerTitle: "Escolher lugares",
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
  plannerSummaryTitle: "Minha viagem",
  btnBackToDeck: "Escolher mais lugares"
});
Object.assign(translations.en, {
  btnPlanner: "Choose places",
  plannerTitle: "Choose places",
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
  plannerSummaryTitle: "My trip",
  btnBackToDeck: "Choose more places"
});
Object.assign(translations.fr, {
  btnPlanner: "Choisir des lieux",
  plannerTitle: "Choisir des lieux",
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
  plannerSummaryTitle: "Mon voyage",
  btnBackToDeck: "Choisir d’autres lieux"
});
Object.assign(translations.es, {
  btnPlanner: "Elegir lugares",
  plannerTitle: "Elegir lugares",
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
  plannerSummaryTitle: "Mi viaje",
  btnBackToDeck: "Elegir más lugares"
});
Object.assign(translations.he, {
  btnPlanner: "בחירת מקומות",
  plannerTitle: "בחירת מקומות",
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
  plannerSummaryTitle: "הטיול שלי",
  btnBackToDeck: "בחירת מקומות נוספים"
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
  plannerGoogleLimit: "Para compatibilidade com o Google Maps no celular, roteiros maiores são divididos em trechos de até 4 atrações.",
  plannerOpenGoogleMapsSegment: "Abrir trecho {n} no Google Maps",
  plannerRoutingUnknown: "Acesso a confirmar",
  plannerModeRoad: "Estrada", plannerModeTrail: "Trilha", plannerModeBoat: "Barco", plannerMode4x4: "4x4", plannerModeDiving: "Mergulho"
});
Object.assign(translations.en, {
  plannerRoadSection: "Road segment", plannerSpecialSection: "Special access",
  plannerUseLocation: "Use my location", plannerLocationReady: "Location set",
  plannerLocationDenied: "We couldn't access your location.", plannerOpenGoogleMaps: "Open in Google Maps",
  plannerNoRoadStops: "None of the selected attractions can safely be sent as a road destination.",
  plannerSpecialHint: "These places stay in your trip, but require special access and are not included in the selected travel mode route.",
  plannerGoogleLimit: "For mobile Google Maps compatibility, longer routes are split into segments of up to 4 attractions.",
  plannerOpenGoogleMapsSegment: "Open segment {n} in Google Maps",
  plannerRoutingUnknown: "Access to confirm",
  plannerModeRoad: "Road", plannerModeTrail: "Trail", plannerModeBoat: "Boat", plannerMode4x4: "4x4", plannerModeDiving: "Diving"
});
Object.assign(translations.fr, {
  plannerRoadSection: "Trajet routier", plannerSpecialSection: "Accès spéciaux",
  plannerUseLocation: "Utiliser ma position", plannerLocationReady: "Position définie",
  plannerLocationDenied: "Impossible d'accéder à votre position.", plannerOpenGoogleMaps: "Ouvrir dans Google Maps",
  plannerNoRoadStops: "Aucune attraction sélectionnée ne peut être envoyée en toute sécurité comme destination routière.",
  plannerSpecialHint: "Ces lieux restent dans votre itinéraire, mais nécessitent un accès spécial et ne sont pas inclus dans l’itinéraire du mode de déplacement sélectionné.",
  plannerGoogleLimit: "Pour la compatibilité avec Google Maps sur mobile, les itinéraires plus longs sont divisés en segments de 4 attractions maximum.",
  plannerOpenGoogleMapsSegment: "Ouvrir le segment {n} dans Google Maps",
  plannerRoutingUnknown: "Accès à confirmer",
  plannerModeRoad: "Route", plannerModeTrail: "Sentier", plannerModeBoat: "Bateau", plannerMode4x4: "4x4", plannerModeDiving: "Plongée"
});
Object.assign(translations.es, {
  plannerRoadSection: "Tramo por carretera", plannerSpecialSection: "Accesos especiales",
  plannerUseLocation: "Usar mi ubicación", plannerLocationReady: "Ubicación definida",
  plannerLocationDenied: "No se pudo acceder a tu ubicación.", plannerOpenGoogleMaps: "Abrir en Google Maps",
  plannerNoRoadStops: "Ninguna atracción seleccionada puede enviarse con seguridad como destino por carretera.",
  plannerSpecialHint: "Estos lugares siguen en tu itinerario, pero requieren acceso especial y no se incluyen en la ruta del modo de desplazamiento seleccionado.",
  plannerGoogleLimit: "Para compatibilidad con Google Maps en móvil, las rutas más largas se dividen en tramos de hasta 4 atracciones.",
  plannerOpenGoogleMapsSegment: "Abrir tramo {n} en Google Maps",
  plannerRoutingUnknown: "Acceso por confirmar",
  plannerModeRoad: "Carretera", plannerModeTrail: "Sendero", plannerModeBoat: "Barco", plannerMode4x4: "4x4", plannerModeDiving: "Buceo"
});
Object.assign(translations.he, {
  plannerRoadSection: "קטע כביש", plannerSpecialSection: "גישה מיוחדת",
  plannerUseLocation: "השתמש במיקום שלי", plannerLocationReady: "המיקום הוגדר",
  plannerLocationDenied: "לא ניתן לגשת למיקום שלך.", plannerOpenGoogleMaps: "פתח ב-Google Maps",
  plannerNoRoadStops: "אין אטרקציות שנבחרו שניתן לשלוח בבטחה כיעד כביש.",
  plannerSpecialHint: "המקומות האלה נשארים במסלול, אך דורשים גישה מיוחדת ואינם נכללים במסלול של אמצעי הנסיעה שנבחר.",
  plannerGoogleLimit: "לתאימות עם Google Maps בנייד, מסלולים ארוכים יותר מחולקים למקטעים של עד 4 אטרקציות.",
  plannerOpenGoogleMapsSegment: "פתח מקטע {n} ב-Google Maps",
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

Object.assign(translations.pt, { plannerVisitTime: "Tempo nas atrações", plannerTotalEstimate: "Duração estimada", plannerPartialEstimate: "Estimativa parcial", plannerPartialEstimateHint: "Alguns lugares ainda não têm tempo de permanência estimado.", plannerRoutePartialEstimateHint: "O tempo de deslocamento não inclui trechos finais a pé, 4x4, barco ou outros acessos fora da rota calculada." });
Object.assign(translations.en, { plannerVisitTime: "Time at attractions", plannerTotalEstimate: "Estimated duration", plannerPartialEstimate: "Partial estimate", plannerPartialEstimateHint: "Some places do not yet have an estimated visit time.", plannerRoutePartialEstimateHint: "Travel time excludes final walking, 4x4, boat, or other access segments outside the calculated route." });
Object.assign(translations.fr, { plannerVisitTime: "Temps aux attractions", plannerTotalEstimate: "Durée estimée", plannerPartialEstimate: "Estimation partielle", plannerPartialEstimateHint: "Certains lieux n'ont pas encore de durée de visite estimée.", plannerRoutePartialEstimateHint: "Le temps de trajet exclut les derniers tronçons à pied, en 4x4, en bateau ou les autres accès hors de l’itinéraire calculé." });
Object.assign(translations.es, { plannerVisitTime: "Tiempo en las atracciones", plannerTotalEstimate: "Duración estimada", plannerPartialEstimate: "Estimación parcial", plannerPartialEstimateHint: "Algunos lugares aún no tienen tiempo de visita estimado.", plannerRoutePartialEstimateHint: "El tiempo de desplazamiento no incluye tramos finales a pie, en 4x4, en barco u otros accesos fuera de la ruta calculada." });
Object.assign(translations.he, { plannerVisitTime: "זמן באטרקציות", plannerTotalEstimate: "משך זמן משוער", plannerPartialEstimate: "הערכה חלקית", plannerPartialEstimateHint: "לחלק מהמקומות עדיין אין זמן ביקור משוער.", plannerRoutePartialEstimateHint: "זמן הנסיעה אינו כולל מקטעים סופיים ברגל, ב־4x4, בסירה או גישות אחרות שמחוץ למסלול המחושב." });
Object.assign(translations.pt, { plannerApproximateEstimate: "Estimativa aproximada", planner4x4RouteHint: "No modo 4x4, sequência, distância e tempo usam roteamento rodoviário padrão apenas como referência. Isso não valida condições da estrada, restrições locais nem trafegabilidade off-road." });
Object.assign(translations.en, { plannerApproximateEstimate: "Approximate estimate", planner4x4RouteHint: "In 4x4 mode, sequence, distance and time use standard road routing only as a reference. This does not validate road conditions, local restrictions or off-road passability." });
Object.assign(translations.fr, { plannerApproximateEstimate: "Estimation approximative", planner4x4RouteHint: "En mode 4x4, l’ordre, la distance et le temps utilisent un routage routier standard uniquement comme référence. Cela ne valide ni l’état de la route, ni les restrictions locales, ni la praticabilité hors route." });
Object.assign(translations.es, { plannerApproximateEstimate: "Estimación aproximada", planner4x4RouteHint: "En modo 4x4, la secuencia, la distancia y el tiempo usan el enrutamiento vial estándar solo como referencia. Esto no valida el estado del camino, restricciones locales ni transitabilidad fuera de carretera." });
Object.assign(translations.he, { plannerApproximateEstimate: "הערכה משוערת", planner4x4RouteHint: "במצב 4x4, הסדר, המרחק והזמן משתמשים בניווט כביש רגיל כהערכה בלבד. הדבר אינו מאמת את מצב הדרך, מגבלות מקומיות או עבירות בשטח." });
Object.assign(translations.pt, { plannerNavigateNext: "Navegar até próxima" });
Object.assign(translations.en, { plannerNavigateNext: "Navigate to next" });
Object.assign(translations.fr, { plannerNavigateNext: "Naviguer vers la prochaine" });
Object.assign(translations.es, { plannerNavigateNext: "Navegar a la siguiente" });
Object.assign(translations.he, { plannerNavigateNext: "נווטו לתחנה הבאה" });
Object.assign(translations.pt, { plannerNavigateReturn: "Navegar de volta à origem" });
Object.assign(translations.en, { plannerNavigateReturn: "Navigate back to origin" });
Object.assign(translations.fr, { plannerNavigateReturn: "Naviguer vers le point de départ" });
Object.assign(translations.es, { plannerNavigateReturn: "Navegar de regreso al origen" });
Object.assign(translations.he, { plannerNavigateReturn: "נווטו חזרה לנקודת ההתחלה" });

// State
let tripSelection = [];
let tripDays = {};
let dismissedInSession = new Set();
let plannerFilter = 'all';
let plannerDeckQueue = [];
let currentPlannerView = 'deck'; // 'deck' or 'summary'
let activeTripDay = 1;
let plannerMap = null;
let plannerMapMarkers = [];
let plannerOrigin = null;
let tripDayOrigins = {};
let tripDayReturnToOrigin = {};
let tripCompletedStops = {};
let plannerTravelMode = localStorage.getItem('ilhabela_travel_mode') || 'auto';
let plannerOptimizedRoute = null;
let plannerRouteRevision = 0;
let plannerRouteLine = null;
let plannerOriginPickMode = false;
let plannerOriginErrorDay = null;

const plannerOriginCopy = {
  pt: ['De onde você vai sair no Dia {n}?', 'Escolher no mapa', 'Escolher outro ponto no mapa', 'Sem origem definida, o Google Maps poderá usar sua localização atual.', 'Toque no mapa para definir a origem do Dia {n}.', 'Não foi possível acessar sua localização. Escolha no mapa de onde você vai sair.'],
  en: ['Where will you start Day {n}?', 'Choose on map', 'Choose another point on map', 'Without a set origin, Google Maps may use your current location.', 'Tap the map to set the origin for Day {n}.', 'We couldn’t access your location. Choose your starting point on the map.'],
  es: ['¿Desde dónde saldrás el Día {n}?', 'Elegir en el mapa', 'Elegir otro punto en el mapa', 'Sin un origen definido, Google Maps podrá usar tu ubicación actual.', 'Toca el mapa para definir el origen del Día {n}.', 'No se pudo acceder a tu ubicación. Elige en el mapa desde dónde saldrás.'],
  fr: ['D’où partirez-vous le Jour {n} ?', 'Choisir sur la carte', 'Choisir un autre point sur la carte', 'Sans origine définie, Google Maps pourra utiliser votre position actuelle.', 'Touchez la carte pour définir l’origine du Jour {n}.', 'Impossible d’accéder à votre position. Choisissez votre point de départ sur la carte.'],
  he: ['מאיפה תצאו ביום {n}?', 'בחירה במפה', 'בחירת נקודה אחרת במפה', 'אם לא הוגדרה נקודת מוצא, Google Maps עשוי להשתמש במיקום הנוכחי שלכם.', 'הקישו על המפה כדי להגדיר נקודת מוצא ליום {n}.', 'לא ניתן לגשת למיקום שלכם. בחרו במפה את נקודת היציאה.']
};
Object.entries(plannerOriginCopy).forEach(([lang, copy]) => Object.assign(translations[lang], {
  plannerOriginQuestion: copy[0], plannerOriginChoose: copy[1], plannerOriginChange: copy[2],
  plannerOriginMapsHint: copy[3], plannerOriginMapInstruction: copy[4], plannerOriginFailureHint: copy[5]
}));

function renderPlannerOriginActions() {
  const defined = isValidPlannerOrigin(plannerOrigin);
  return `<div id="planner-origin-actions" class="mt-2 space-y-2">
    <p>${t('plannerOriginQuestion').replace('{n}', activeTripDay)}</p>
    ${plannerOriginErrorDay === activeTripDay ? `<p role="alert">${t('plannerOriginFailureHint')}</p>` : ''}
    <div class="flex flex-wrap gap-2">
      <button type="button" onclick="plannerUseMyLocation()" class="px-3 py-2 rounded-xl border border-black/10 bg-white text-primary font-bold">${t('plannerUseLocation')}</button>
      <button type="button" onclick="plannerStartOriginPick()" class="px-3 py-2 rounded-xl border border-black/10 bg-white text-primary font-bold">${t(defined ? 'plannerOriginChange' : 'plannerOriginChoose')}</button>
    </div>
    ${!defined ? `<p>${t('plannerOriginMapsHint')}</p>` : ''}
  </div>`;
}

function plannerShowLocationFailure() {
  plannerOriginErrorDay = activeTripDay;
  renderSummary();
  alert(t('plannerLocationDenied'));
  document.getElementById('planner-origin-actions')?.scrollIntoView({behavior: 'smooth', block: 'center'});
}
const VALHALLA_ENDPOINT = 'https://valhalla1.openstreetmap.de/optimized_route';

function trackGuideEvent(name, data = {}) {
  if (typeof window.va !== 'function') return;
  window.va('event', { name, data });
}


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
  try {
    const savedDays = JSON.parse(localStorage.getItem('ilhabela_trip_days') || '{}');
    tripDays = savedDays && typeof savedDays === 'object' && !Array.isArray(savedDays) ? savedDays : {};
  } catch(e) {
    tripDays = {};
  }
  try {
    const savedOrigins = JSON.parse(localStorage.getItem('ilhabela_trip_origins') || '{}');
    tripDayOrigins = savedOrigins && typeof savedOrigins === 'object' && !Array.isArray(savedOrigins) ? savedOrigins : {};
    Object.keys(tripDayOrigins).forEach(day => {
      if (!isValidPlannerOrigin(tripDayOrigins[day])) delete tripDayOrigins[day];
    });
    localStorage.setItem('ilhabela_trip_origins', JSON.stringify(tripDayOrigins));
    const savedReturns = JSON.parse(localStorage.getItem('ilhabela_trip_returns') || '{}');
    tripDayReturnToOrigin = savedReturns && typeof savedReturns === 'object' && !Array.isArray(savedReturns) ? savedReturns : {};
    const savedCompleted = JSON.parse(localStorage.getItem('ilhabela_trip_completed') || '{}');
    tripCompletedStops = savedCompleted && typeof savedCompleted === 'object' && !Array.isArray(savedCompleted) ? savedCompleted : {};
    Object.keys(tripCompletedStops).forEach(key => {
      if (key.includes(':') || !tripCompletedStops[key]) return;
      tripCompletedStops[`${getSpotTripDay(key)}:${key}`] = true;
      delete tripCompletedStops[key];
    });
  } catch(e) {
    tripDayOrigins = {};
    tripDayReturnToOrigin = {};
    tripCompletedStops = {};
  }
  const validSpotIds = new Set(touristSpots.map(spot => spot.id));
  // One-time compatibility migration: legacy favorites now belong to Minha Viagem.
  try {
    const legacySaved = JSON.parse(localStorage.getItem('ilhabela_saved') || '[]');
    if (Array.isArray(legacySaved)) {
      legacySaved.filter(id => validSpotIds.has(id)).forEach(id => {
        if (!tripSelection.includes(id)) tripSelection.push(id);
      });
    }
  } catch(e) { /* Invalid legacy data is ignored. */ }
  const validSelection = tripSelection.filter(id => validSpotIds.has(id));
  if (validSelection.length !== tripSelection.length) tripSelection = validSelection;
  localStorage.setItem('ilhabela_trip', JSON.stringify(tripSelection));
  Object.keys(tripDays).forEach(id => {
    if (!validSpotIds.has(id) || !tripSelection.includes(id)) delete tripDays[id];
  });
  localStorage.setItem('ilhabela_trip_days', JSON.stringify(tripDays));
  updatePlannerBadge();
}

function invalidatePlannerRoute() {
  plannerOptimizedRoute = null;
  plannerRouteRevision++;
}

function saveTripSelection() {
  localStorage.setItem('ilhabela_trip', JSON.stringify(tripSelection));
  Object.keys(tripDays).forEach(id => {
    if (!tripSelection.includes(id)) delete tripDays[id];
  });
  const usedDays = new Set(tripSelection.map(id => getSpotTripDay(id)));
  Object.keys(tripDayOrigins).forEach(day => {
    if (!usedDays.has(Number(day))) delete tripDayOrigins[day];
  });
  Object.keys(tripDayReturnToOrigin).forEach(day => {
    if (!usedDays.has(Number(day))) delete tripDayReturnToOrigin[day];
  });
  Object.keys(tripCompletedStops).forEach(key => {
    const separator = key.indexOf(':');
    const id = separator >= 0 ? key.slice(separator + 1) : key;
    const day = separator >= 0 ? Number(key.slice(0, separator)) : getSpotTripDay(id);
    if (!tripSelection.includes(id) || getSpotTripDay(id) !== day) delete tripCompletedStops[key];
  });
  localStorage.setItem('ilhabela_trip_days', JSON.stringify(tripDays));
  localStorage.setItem('ilhabela_trip_origins', JSON.stringify(tripDayOrigins));
  localStorage.setItem('ilhabela_trip_returns', JSON.stringify(tripDayReturnToOrigin));
  localStorage.setItem('ilhabela_trip_completed', JSON.stringify(tripCompletedStops));
  updatePlannerBadge();
}

function getSpotTripDay(id) {
  const day = Number(tripDays[id]);
  return Number.isInteger(day) && day > 0 ? day : 1;
}

function setSpotTripDay(id, day) {
  if (!tripSelection.includes(id)) return;
  const parsedDay = Math.max(1, Math.min(30, parseInt(day, 10) || 1));
  const previousDay = getSpotTripDay(id);
  tripDays[id] = parsedDay;
  if (previousDay !== parsedDay) delete tripCompletedStops[`${previousDay}:${id}`];
  localStorage.setItem('ilhabela_trip_days', JSON.stringify(tripDays));
  localStorage.setItem('ilhabela_trip_completed', JSON.stringify(tripCompletedStops));
  invalidatePlannerRoute();
  renderSummary();
}

function isValidPlannerOrigin(coords) {
  return Array.isArray(coords) && coords.length === 2
    && Number.isFinite(coords[0]) && Number.isFinite(coords[1])
    && Math.abs(coords[0]) <= 90 && Math.abs(coords[1]) <= 180;
}

function getActiveDayOrigin() {
  const origin = tripDayOrigins[activeTripDay];
  return isValidPlannerOrigin(origin) ? origin : null;
}

function saveActiveDayOrigin(coords) {
  if (coords !== null && !isValidPlannerOrigin(coords)) return false;
  if (coords) tripDayOrigins[activeTripDay] = coords;
  else delete tripDayOrigins[activeTripDay];
  localStorage.setItem('ilhabela_trip_origins', JSON.stringify(tripDayOrigins));
  plannerOrigin = coords || null;
  invalidatePlannerRoute();
  renderSummary();
}

function setActiveDayReturn(enabled) {
  tripDayReturnToOrigin[activeTripDay] = !!enabled;
  localStorage.setItem('ilhabela_trip_returns', JSON.stringify(tripDayReturnToOrigin));
  invalidatePlannerRoute();
  renderSummary();
}

function setActiveTripDay(day) {
  plannerOriginPickMode = false;
  activeTripDay = Math.max(1, parseInt(day, 10) || 1);
  plannerOrigin = getActiveDayOrigin();
  invalidatePlannerRoute();
  renderSummary();
}

function getActiveTripSpots() {
  return tripSelection
    .filter(id => getSpotTripDay(id) === activeTripDay)
    .map(id => touristSpots.find(spot => spot.id === id))
    .filter(Boolean);
}

function isSpotInTrip(id) {
  return tripSelection.includes(id);
}

function toggleSpotInTrip(id) {
  if (!touristSpots.some(spot => spot.id === id)) return false;
  invalidatePlannerRoute();
  const wasInTrip = isSpotInTrip(id);
  if (wasInTrip) {
    tripSelection = tripSelection.filter(spotId => spotId !== id);
  } else {
    tripSelection.push(id);
  }
  saveTripSelection();
  trackGuideEvent('Trip Spot', { action: wasInTrip ? 'remove' : 'add', spotId: id });
  return isSpotInTrip(id);
}

function updatePlannerBadge() {
  const badge = document.getElementById('planner-count-badge');
  if (badge) badge.textContent = tripSelection.length;
  const continueButton = document.getElementById('home-continue-trip');
  const continueLabel = document.getElementById('home-trip-action-label');
  const tripCount = document.getElementById('home-trip-count');
  if (continueButton) {
    continueButton.hidden = false;
    continueButton.classList.add('flex');
  }
  if (continueLabel) {
    continueLabel.dataset.i18n = tripSelection.length ? 'homeContinueTrip' : 'homeBuildTrip';
    continueLabel.textContent = t(continueLabel.dataset.i18n);
  }
  if (tripCount) {
    if (!tripSelection.length) {
      tripCount.textContent = '';
    } else {
      const countKey = tripSelection.length === 1 ? 'homeTripCountOne' : 'homeTripCount';
      tripCount.textContent = t(countKey).replace('{n}', tripSelection.length);
    }
  }
}

function openHomeTripPlanner() {
  trackGuideEvent('Planner Open', { source: 'home', state: tripSelection.length ? 'continue' : 'start' });
  if (tripSelection.length) openPlannerSummary();
  else openPlanner(null, { view: 'deck' });
}

function updatePlannerHeading() {
  const title = document.getElementById('planner-title');
  if (title) {
    title.dataset.i18n = currentPlannerView === 'summary' ? 'navTrip' : 'choosePlaces';
    title.textContent = t(title.dataset.i18n);
  }
  const counter = document.getElementById('planner-summary-toggle');
  if (counter) {
    counter.disabled = currentPlannerView === 'summary';
    counter.setAttribute('aria-label', t('navTrip'));
  }
}

function setPlannerView(view) {
  const deck = document.getElementById('planner-deck-view');
  const summary = document.getElementById('planner-summary-view');
  currentPlannerView = view === 'summary' ? 'summary' : 'deck';
  const showSummary = currentPlannerView === 'summary';
  updatePlannerHeading();
  deck.classList.toggle('hidden', showSummary);
  deck.classList.toggle('flex', !showSummary);
  summary.classList.toggle('hidden', !showSummary);
  summary.classList.toggle('flex', showSummary);
  if (showSummary) renderSummary();
  else {
    renderPlannerFilters();
    generateDeckQueue();
    renderDeckCard();
  }
}

function openPlanner(e, options = {}) {
  if (e) e.preventDefault();
  const modal = document.getElementById('planner-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('planner-open');
  window.dispatchEvent(new Event('planner-visibility-change'));
  
  // Re-translate just in case
  modal.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });

  setPlannerView(options.view || currentPlannerView);
}

function openPlannerSummary() {
  openPlanner(null, { view: 'summary' });
}

function closePlanner() {
  plannerOriginPickMode = false;
  const modal = document.getElementById('planner-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
  document.body.classList.remove('planner-open');
  window.dispatchEvent(new Event('planner-visibility-change'));
}

function togglePlannerView() {
  setPlannerView(currentPlannerView === 'deck' ? 'summary' : 'deck');
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
    invalidatePlannerRoute();
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
function getPlannerCompletionKey(id, day = getSpotTripDay(id)) {
  return `${day}:${id}`;
}

function isPlannerStopCompleted(id, day = getSpotTripDay(id)) {
  return !!tripCompletedStops[getPlannerCompletionKey(id, day)];
}

function setPlannerStopCompleted(id, completed = true) {
  if (!tripSelection.includes(id)) return;
  const key = getPlannerCompletionKey(id, activeTripDay);
  if (completed) tripCompletedStops[key] = true;
  else delete tripCompletedStops[key];
  localStorage.setItem('ilhabela_trip_completed', JSON.stringify(tripCompletedStops));
  renderSummary();
}

function getPlannerNextStop(spots) {
  return spots.find(spot => !isPlannerStopCompleted(spot.id, activeTripDay)) || null;
}
function getPlannerPendingSpots(spots = getActiveTripSpots()) {
  return spots.filter(spot => !isPlannerStopCompleted(spot.id, activeTripDay));
}

function getPlannerLastCompletedStop(spots) {
  const byId = new Map(spots.map(spot => [spot.id, spot]));
  const prefix = `${activeTripDay}:`;
  const completedKeys = Object.keys(tripCompletedStops).filter(key => tripCompletedStops[key] && key.startsWith(prefix));
  for (let index = completedKeys.length - 1; index >= 0; index--) {
    const id = completedKeys[index].slice(prefix.length);
    if (byId.has(id)) return byId.get(id);
  }
  return null;
}


function plannerNavigateToSpot(id) {
  const spot = touristSpots.find(item => item.id === id);
  const access = resolvePlannerAccess(spot, plannerTravelMode);
  if (!spot || !access) return false;
  if (!plannerConfirmAccess([spot])) return false;
  const googleTravelMode = { auto: 'driving', bicycle: 'bicycling', pedestrian: 'walking', '4x4': 'driving' }[plannerTravelMode] || 'driving';
  const params = new URLSearchParams({
    api: '1',
    destination: access.coords.join(','),
    travelmode: googleTravelMode
  });
  const hasCompletedStops = getActiveTripSpots().some(item => isPlannerStopCompleted(item.id, activeTripDay));
  if (isValidPlannerOrigin(plannerOrigin) && !hasCompletedStops) params.set('origin', plannerOrigin.join(','));
  trackGuideEvent('Navigation Open', { source: 'next_stop', mode: plannerTravelMode });
  window.open(`https://www.google.com/maps/dir/?${params.toString()}`, '_blank', 'noopener,noreferrer');
  return true;
}

function plannerNavigateToOrigin() {
  if (!isValidPlannerOrigin(plannerOrigin) || !tripDayReturnToOrigin[activeTripDay]) return false;
  const googleTravelMode = { auto: 'driving', bicycle: 'bicycling', pedestrian: 'walking', '4x4': 'driving' }[plannerTravelMode] || 'driving';
  const params = new URLSearchParams({
    api: '1',
    destination: plannerOrigin.join(','),
    travelmode: googleTravelMode
  });
  trackGuideEvent('Navigation Open', { source: 'return_origin', mode: plannerTravelMode });
  window.open(`https://www.google.com/maps/dir/?${params.toString()}`, '_blank', 'noopener,noreferrer');
  return true;
}

function renderPlannerVisitProgress(spots) {
  if (!spots.length) return '';
  const next = getPlannerNextStop(spots);
  const completedCount = spots.filter(spot => isPlannerStopCompleted(spot.id, activeTripDay)).length;
  const lastCompleted = getPlannerLastCompletedStop(spots);
  if (!next) {
    const canReturnToOrigin = isValidPlannerOrigin(plannerOrigin) && !!tripDayReturnToOrigin[activeTripDay];
    return `<div class="rounded-2xl border border-secondary/20 bg-secondary/10 p-4"><div class="flex items-center gap-2 text-sm font-extrabold text-primary"><span class="material-symbols-outlined">task_alt</span>${t('plannerVisitDayComplete')}</div><p class="mt-1 text-xs text-on-surface-variant">${t('plannerVisitDayCompleteHint')}</p><div class="mt-3 flex flex-wrap gap-2">${canReturnToOrigin ? `<button type="button" onclick="plannerNavigateToOrigin()" class="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white"><span class="material-symbols-outlined mr-1 align-middle text-[15px]">keyboard_return</span>${t('plannerNavigateReturn')}</button>` : ''}${lastCompleted ? `<button type="button" onclick="setPlannerStopCompleted('${lastCompleted.id}', false)" class="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-bold text-primary">${t('plannerVisitUndo')}</button>` : ''}</div></div>`;
  }
  const tr = getSpotTranslation(next);
  const notice = plannerAccessNotice(next);
  const nextAccess = resolvePlannerAccess(next, plannerTravelMode);
  return `<div class="rounded-2xl border border-primary/15 bg-white p-4">
    <div class="mb-2 flex items-center justify-between gap-3"><div><div class="text-[10px] font-extrabold uppercase tracking-wide text-secondary">${t('plannerVisitNext')}</div><h3 class="text-base font-extrabold text-primary">${tr.title}</h3></div><div class="text-[11px] font-bold text-on-surface-variant">${completedCount}/${spots.length}</div></div>
    ${notice ? `<p class="mb-3 flex items-start gap-1.5 text-xs text-tertiary"><span class="material-symbols-outlined text-[16px]">conversion_path</span><span>${notice}</span></p>` : ''}
    <div class="flex flex-wrap gap-2">${nextAccess ? `<button type="button" onclick="plannerNavigateToSpot('${next.id}')" class="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white"><span class="material-symbols-outlined mr-1 align-middle text-[15px]">navigation</span>${t('plannerNavigateNext')}</button>` : ''}<button type="button" onclick="setPlannerStopCompleted('${next.id}', true)" class="rounded-xl bg-secondary px-3 py-2 text-xs font-bold text-white">${t('plannerVisitMarkDone')}</button>${lastCompleted ? `<button type="button" onclick="setPlannerStopCompleted('${lastCompleted.id}', false)" class="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-bold text-primary">${t('plannerVisitUndo')}</button>` : ''}</div>
  </div>`;
}

function getPlannerDayReadiness(spots) {
  const pending = [];
  if (!isValidPlannerOrigin(plannerOrigin)) pending.push({ key: 'origin', label: t('plannerReadyOriginPending'), action: 'origin' });
  spots.forEach(spot => {
    const title = getSpotTranslation(spot).title;
    const access = resolvePlannerAccess(spot, plannerTravelMode);
    const maritime = typeof getMaritimeRouteProfilesForSpot === 'function' ? getMaritimeRouteProfilesForSpot(spot.id) : [];
    const nautical = typeof getNauticalExperienceOptionsForSpot === 'function' ? getNauticalExperienceOptionsForSpot(spot.id) : [];
    if (access?.finalMode === '4x4' && plannerTravelMode !== '4x4') {
      pending.push({ key: '4x4:' + spot.id, label: t('plannerReady4x4Pending').replace('{destination}', title), action: 'routing' });
    } else if (!access && !maritime.length && !nautical.length) {
      pending.push({ key: 'access:' + spot.id, label: t('plannerReadyAccessPending').replace('{destination}', title), action: 'routing' });
    }
    if (maritime.some(profile => !profile.embarkation)) {
      pending.push({ key: 'boat:' + spot.id, label: t('plannerReadyBoatPending').replace('{destination}', title), action: 'maritime' });
    }
    if (nautical.some(profile => !profile.meetingPoint)) {
      pending.push({ key: 'meeting:' + spot.id, label: t('plannerReadyMeetingPending').replace('{destination}', title), action: 'maritime' });
    }
  });
  const unique = [...new Map(pending.map(item => [item.key, item])).values()];
  return { pending: unique, ready: unique.length === 0 };
}

function renderPlannerDayAgenda(spots) {
  const originSet = isValidPlannerOrigin(plannerOrigin);
  const returnSet = originSet && !!tripDayReturnToOrigin[activeTripDay];
  const readiness = getPlannerDayReadiness(spots);
  const readinessHtml = readiness.ready
    ? `<div class="mb-3 flex items-center gap-2 rounded-xl bg-secondary/10 px-3 py-2 text-[11px] font-bold text-primary"><span class="material-symbols-outlined text-[16px]">check_circle</span><span>${t('plannerReadyDay')}</span></div>`
    : `<div class="mb-3 rounded-xl border border-tertiary/20 bg-tertiary/5 px-3 py-2"><div class="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold text-tertiary"><span class="material-symbols-outlined text-[16px]">pending_actions</span><span>${t('plannerReadyPendingTitle')}</span></div><ul class="space-y-1 text-[11px] text-on-surface-variant">${readiness.pending.map(item => `<li><button type="button" onclick="plannerResolvePending('${item.action}')" class="group flex w-full items-start justify-between gap-2 rounded-lg px-1 py-1 text-left hover:bg-white/70"><span>• ${item.label}</span><span class="shrink-0 font-bold text-primary group-hover:underline">${t('plannerReadyResolve')}</span></button></li>`).join('')}</ul></div>`;
  const stopRows = spots.map((spot, index) => {
    const tr = getSpotTranslation(spot);
    const access = resolvePlannerAccess(spot, plannerTravelMode);
    const notice = plannerAccessNotice(spot);
    const hasHandoff = !!access?.finalMode || (access && (access.coords[0] !== spot.coords[0] || access.coords[1] !== spot.coords[1]));
    const previous = index ? spots[index - 1].id : 'origin';
    return `${renderPlannerLegEstimate(previous, spot.id)}<div class="relative flex gap-3 pb-4">
      <div class="flex w-7 shrink-0 flex-col items-center">
        <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-extrabold text-white">${index + 1}</div>
        ${index < spots.length - 1 || returnSet ? '<div class="mt-1 min-h-5 w-px flex-1 bg-primary/20"></div>' : ''}
      </div>
      <div class="min-w-0 flex-1 rounded-xl border border-black/5 bg-surface-container/30 px-3 py-2">
        <div class="text-sm font-bold text-primary">${tr.title}</div>
        <div class="text-[11px] text-on-surface-variant">${tr.subtitle}</div>
        ${hasHandoff && notice ? `<div class="mt-1.5 flex items-start gap-1.5 text-[11px] font-semibold text-tertiary"><span class="material-symbols-outlined text-[15px]">conversion_path</span><span>${notice}</span></div>` : ''}
      </div>
    </div>`;
  }).join('');
  const originRow = `<div class="flex gap-3 pb-3">
    <div class="flex w-7 shrink-0 flex-col items-center"><div class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-secondary bg-white text-secondary"><span class="material-symbols-outlined text-[15px]">trip_origin</span></div>${spots.length ? '<div class="mt-1 min-h-5 w-px flex-1 bg-primary/20"></div>' : ''}</div>
    <div class="pt-1 text-xs min-w-0 flex-1"><strong class="text-primary">${t('plannerAgendaStart')}</strong><div class="text-on-surface-variant">${originSet ? t('plannerDayOriginReady').replace('{n}', activeTripDay) : t('plannerAgendaOriginPending')}</div>${renderPlannerOriginActions()}</div>
  </div>`;
  const returnRow = returnSet ? `${spots.length ? renderPlannerLegEstimate(spots[spots.length - 1].id, 'return') : ''}<div class="flex gap-3">
    <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-white text-secondary"><span class="material-symbols-outlined text-[15px]">home_pin</span></div>
    <div class="pt-1 text-xs"><strong class="text-primary">${t('plannerAgendaReturn')}</strong><div class="text-on-surface-variant">${t('plannerAgendaReturnHint')}</div></div>
  </div>` : '';
  return `<div class="rounded-2xl border border-black/10 bg-white p-4">
    <div class="mb-3 flex items-center justify-between gap-3"><div><h3 class="text-sm font-extrabold text-primary">${t('plannerAgendaTitle').replace('{n}', activeTripDay)}</h3><p class="text-[11px] text-on-surface-variant">${t('plannerAgendaHint')}</p></div><span class="material-symbols-outlined text-secondary">format_list_numbered</span></div>
    ${readinessHtml}${originRow}${plannerOptimizedRoute?.legState === plannerLegState() && plannerOptimizedRoute?.legs?.length ? `<p class="mb-2 text-[11px] text-on-surface-variant">${t('plannerEstimatedLegs')}</p>` : ''}${stopRows}${returnRow}
  </div>`;
}

const plannerLegCopy = {
  pt: ['Deslocamentos estimados', 'até o acesso'], en: ['Estimated travel legs', 'to the access point'],
  es: ['Desplazamientos estimados', 'hasta el acceso'], fr: ['Trajets estimés', 'jusqu’à l’accès'],
  he: ['מקטעי נסיעה משוערים', 'עד לנקודת הגישה']
};
Object.entries(plannerLegCopy).forEach(([lang, copy]) => Object.assign(translations[lang], {
  plannerEstimatedLegs: copy[0], plannerLegAccess: copy[1]
}));

function plannerLegState() {
  return JSON.stringify([activeTripDay, plannerTravelMode, getActiveDayOrigin(), !!tripDayReturnToOrigin[activeTripDay],
    getActiveTripSpots().map(spot => [spot.id, !!isPlannerStopCompleted(spot.id, activeTripDay), resolvePlannerAccess(spot, plannerTravelMode)])]);
}

function renderPlannerLegEstimate(from, to) {
  const route = plannerOptimizedRoute;
  if (!route || route.legState !== plannerLegState()) return '';
  if (from === 'origin' && !isValidPlannerOrigin(plannerOrigin)) return '';
  const leg = route.legs?.find(item => item.from === from && item.to === to);
  if (!leg) return '';
  const source = touristSpots.find(spot => spot.id === from);
  const sourceAccess = source && resolvePlannerAccess(source, plannerTravelMode);
  // A final walk/trail/4x4 handoff cannot imply departure from the attraction itself.
  if (sourceAccess && (sourceAccess.finalMode || sourceAccess.coords.some((value, i) => value !== source.coords[i]))) return '';
  const destination = touristSpots.find(spot => spot.id === to);
  const access = destination && resolvePlannerAccess(destination, plannerTravelMode);
  const gateway = access && (access.finalMode || access.coords.some((value, i) => value !== destination.coords[i]));
  const distance = new Intl.NumberFormat(currentLang, {minimumFractionDigits: 1, maximumFractionDigits: 1}).format(leg.distanceKm);
  return `<p class="planner-leg-estimate mb-2 ms-10 text-[11px] text-on-surface-variant">≈ ${Math.round(leg.timeSeconds / 60)} min · ${distance} km${gateway ? ` · ${t('plannerLegAccess')}` : ''}</p>`;
}

function renderSummary() {
  const mapHint = document.getElementById('planner-origin-map-hint');
  mapHint.hidden = !plannerOriginPickMode || tripSelection.length === 0;
  mapHint.textContent = t('plannerOriginMapInstruction').replace('{n}', activeTripDay);
  const listContainer = document.getElementById('planner-summary-list');
  
  const isEmpty = tripSelection.length === 0;
  document.getElementById('planner-summary-view').classList.toggle('is-empty', isEmpty);
  document.getElementById('planner-map').hidden = isEmpty;
  document.getElementById('planner-back-to-deck').hidden = isEmpty;
  if (isEmpty) {
    plannerOriginPickMode = false;
    if (plannerMap) { plannerMap.remove(); plannerMap = null; }
    plannerMapMarkers = [];
    plannerRouteLine = null;
    listContainer.innerHTML = `<div class="planner-empty-state">
      <span class="material-symbols-outlined" aria-hidden="true">travel_explore</span>
      <h3>${t('tripEmptyTitle')}</h3>
      <p>${t('tripEmptyHint')}</p>
      <button type="button" onclick="setPlannerView('deck')">${t('choosePlaces')}</button>
    </div>`;
    return;
  }

  const allSelectedSpots = tripSelection.map(id => touristSpots.find(s => s.id === id)).filter(Boolean);
  const maxTripDay = Math.max(1, ...allSelectedSpots.map(spot => getSpotTripDay(spot.id)));
  if (activeTripDay > maxTripDay) activeTripDay = maxTripDay;
  plannerOrigin = getActiveDayOrigin();
  const selectedSpots = getActiveTripSpots();
  const displaySpots = getPlannerDisplaySpots(selectedSpots);
  const roadSpots = selectedSpots.filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
  const specialSpots = selectedSpots.filter(spot => !isSpotRoutableForMode(spot, plannerTravelMode));

  let html = `<div class="flex gap-2 overflow-x-auto pb-1">
    ${Array.from({ length: maxTripDay }, (_, index) => index + 1).map(day => `<button onclick="setActiveTripDay(${day})" class="shrink-0 px-4 py-2 rounded-xl text-xs font-extrabold border ${activeTripDay === day ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-black/10'}">${t('plannerDay')} ${day}</button>`).join('')}
  </div>`;
  html += renderPlannerVisitProgress(displaySpots);
  html += renderPlannerDayAgenda(displaySpots);
  html += renderPlannerRoutingPanel(roadSpots, specialSpots);
  html += renderPlannerMaritimeOptions(selectedSpots);
  html += renderPlannerNauticalExperiences(selectedSpots);
  displaySpots.forEach((spot, index) => {
    const id = spot.id;
    const tr = getSpotTranslation(spot);
    html += `
      <div class="flex items-center gap-2 p-2 border border-black/5 rounded-xl bg-surface-container/30">
        <div class="w-6 text-center text-xs font-extrabold text-primary/60">${index + 1}</div>
        <img src="${spot.image}" class="w-16 h-16 rounded-lg object-cover" />
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-primary truncate">${tr.title}</h4>
          <p class="text-xs text-on-surface-variant truncate">${tr.subtitle}</p>
          <label class="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-on-surface-variant">
            ${t('plannerDay')}
            <select onchange="setSpotTripDay('${spot.id}', this.value)" class="rounded-lg border border-black/10 bg-white px-1.5 py-1 text-[11px] text-primary">
              ${Array.from({ length: Math.min(30, maxTripDay + 1) }, (_, dayIndex) => dayIndex + 1).map(day => `<option value="${day}" ${getSpotTripDay(spot.id) === day ? 'selected' : ''}>${day}</option>`).join('')}
            </select>
          </label>
        </div>
        <div class="flex flex-col">
          <button onclick="movePlannerSpot('${spot.id}', -1)" ${index === 0 ? 'disabled' : ''} class="p-1 rounded-full text-primary disabled:opacity-20 hover:bg-primary/5" aria-label="Mover para cima">
            <span class="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
          </button>
          <button onclick="movePlannerSpot('${spot.id}', 1)" ${index === selectedSpots.length - 1 ? 'disabled' : ''} class="p-1 rounded-full text-primary disabled:opacity-20 hover:bg-primary/5" aria-label="Mover para baixo">
            <span class="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
          </button>
        </div>
        <button onclick="removeFromPlanner('${spot.id}')" class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors" aria-label="Remover">
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
  invalidatePlannerRoute();
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
function getPlannerDisplaySpots(spots = getActiveTripSpots()) {
  if (!plannerOptimizedRoute?.spotIds?.length) return spots;
  const optimizedById = new Map(
    plannerOptimizedRoute.spotIds
      .map(id => spots.find(spot => spot.id === id))
      .filter(Boolean)
      .map(spot => [spot.id, spot])
  );
  if (optimizedById.size !== plannerOptimizedRoute.spotIds.length) return spots;
  const orderedRoadSpots = plannerOptimizedRoute.spotIds.map(id => optimizedById.get(id));
  let roadIndex = 0;
  return spots.map(spot => optimizedById.has(spot.id) ? orderedRoadSpots[roadIndex++] : spot);
}


function formatPlannerMinutes(minutes) {
  const mins = Math.max(0, Math.round(minutes || 0));
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60), rest = mins % 60;
  return rest ? `${hours}h ${rest}min` : `${hours}h`;
}

function getPlannerVisitEstimate() {
  const selected = getActiveTripSpots();
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
  const routeCoveragePartial = [...roadSpots, ...specialSpots].some(spot => {
    const access = resolvePlannerAccess(spot, plannerTravelMode);
    return !access || !!access.finalMode || (access.coords[0] !== spot.coords[0] || access.coords[1] !== spot.coords[1]);
  });
  const totalEstimateLabel = plannerTravelMode === '4x4'
    ? t('plannerApproximateEstimate')
    : routeCoveragePartial ? t('plannerPartialEstimate') : t('plannerTotalEstimate');
  const routeCoverageHint = plannerOptimizedRoute && routeCoveragePartial
    ? `<div class="text-[11px] text-on-surface-variant"><strong>${t('plannerPartialEstimate')}.</strong> ${t('plannerRoutePartialEstimateHint')}</div>`
    : '';
  const visitStats = visit.covered
    ? `<div class="text-xs text-primary space-y-1"><div><strong>${t('plannerVisitTime')}:</strong> ${formatPlannerRange(visit.min, visit.max)}</div>${plannerOptimizedRoute ? `<div><strong>${totalEstimateLabel}:</strong> ${formatPlannerRange(visit.min + travelMinutes, visit.max + travelMinutes)}</div>` : ''}${routeCoverageHint}${visit.partial ? `<div class="text-[11px] text-on-surface-variant"><strong>${t('plannerPartialEstimate')}.</strong> ${t('plannerPartialEstimateHint')}</div>` : ''}</div>`
    : visit.total
      ? `<div class="text-[11px] text-on-surface-variant"><strong>${t('plannerPartialEstimate')}.</strong> ${t('plannerPartialEstimateHint')}</div>`
      : '';
  const routeStats = plannerOptimizedRoute
    ? `<div class="space-y-1"><div class="flex gap-4 text-xs font-bold text-primary"><span>${t('plannerRouteDistance')}: ${(plannerOptimizedRoute.distanceKm || 0).toFixed(1)} km</span><span>${t('plannerRouteDriveTime')}: ${formatPlannerDuration(plannerOptimizedRoute.timeSeconds)}</span></div>${plannerTravelMode === '4x4' ? `<p class="text-[11px] font-semibold text-tertiary">${t('planner4x4RouteHint')}</p>` : ''}</div>`
    : '';
  const specialRows = specialSpots.map(spot => {
    const modes = (spot.routing?.modes || ['unknown']).map(getPlannerModeLabel).join(' · ');
    return `<li class="flex items-center justify-between gap-3 py-1.5"><span class="font-semibold">${getSpotTranslation(spot).title}</span><span class="text-[11px] text-on-surface-variant">${modes}</span></li>`;
  }).join('');
  const canOpenMaps = roadSpots.length > 0;
  const mapsSegments = [];
  for (let i = 0; i < orderedRoadSpots.length; i += 4) mapsSegments.push(orderedRoadSpots.slice(i, i + 4));
  const mapsButtons = mapsSegments.length > 1
    ? mapsSegments.map((segment, index) => `<button type="button" onclick="plannerOpenGoogleMaps(${index})" class="px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold">${t('plannerOpenGoogleMapsSegment').replace('{n}', index + 1)}</button>`).join('')
    : `<button type="button" onclick="plannerOpenGoogleMaps(0)" ${canOpenMaps ? '' : 'disabled'} class="px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed">${t('plannerOpenGoogleMaps')}</button>`;

  return `
    <div class="space-y-3 mb-4">
      <div id="planner-routing-panel" class="rounded-2xl border border-black/10 bg-white p-4 space-y-3">
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
          ${isValidPlannerOrigin(plannerOrigin) ? `<button type="button" onclick="saveActiveDayOrigin(null)" class="px-3 py-2 rounded-xl border border-black/10 bg-white text-xs font-bold text-primary">${t('plannerClearOrigin')}</button>
          <label class="px-3 py-2 rounded-xl border border-black/10 bg-white text-xs font-bold text-primary inline-flex items-center gap-2">
            <input type="checkbox" onchange="setActiveDayReturn(this.checked)" ${tripDayReturnToOrigin[activeTripDay] ? 'checked' : ''}>
            ${t('plannerReturnOrigin')}
          </label>` : ''}
          <button type="button" onclick="plannerOptimizeRoute()" ${roadSpots.length >= 2 ? '' : 'disabled'} class="px-3 py-2 rounded-xl bg-secondary text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed">
            ${plannerOptimizedRoute ? t('plannerOptimized') : t('plannerOptimize')}
          </button>
          ${mapsButtons}
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

function plannerResolvePending(action) {
  if (action === 'origin') {
    plannerStartOriginPick();
    requestAnimationFrame(() => {
      const map = document.getElementById('planner-origin-map-hint');
      if (map) map.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return;
  }
  if (action === 'maritime') {
    requestAnimationFrame(() => {
      const target = document.getElementById('planner-maritime-options') || document.getElementById('planner-nautical-options');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return;
  }
  if (action === 'routing') {
    requestAnimationFrame(() => {
      const target = document.getElementById('planner-routing-panel');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function plannerStartOriginPick() {
  plannerOriginErrorDay = null;
  plannerOriginPickMode = true;
  renderSummary();
  document.getElementById('planner-origin-map-hint')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function plannerUseMyLocation() {
  plannerOriginErrorDay = null;
  if (typeof lastUserLocation !== 'undefined' && isValidPlannerOrigin(lastUserLocation)) {
    saveActiveDayOrigin([...lastUserLocation]);
    return;
  }
  if (!navigator.geolocation) {
    plannerShowLocationFailure();
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    saveActiveDayOrigin([position.coords.latitude, position.coords.longitude]);
  }, () => plannerShowLocationFailure(), {
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
  const routeRevision = plannerRouteRevision;
  const roadSpots = getPlannerPendingSpots().filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
  if (roadSpots.length < 2) { alert(t('plannerRouteNeedsStops')); return; }
  if (!plannerConfirmAccess(roadSpots)) return;

  const locations = [];
  if (isValidPlannerOrigin(plannerOrigin)) locations.push({ lat: plannerOrigin[0], lon: plannerOrigin[1], type: 'break' });
  roadSpots.forEach(spot => { const coords = resolvePlannerAccess(spot, plannerTravelMode).coords; locations.push({ lat: coords[0], lon: coords[1], type: 'break' }); });
  if (isValidPlannerOrigin(plannerOrigin) && tripDayReturnToOrigin[activeTripDay]) locations.push({ lat: plannerOrigin[0], lon: plannerOrigin[1], type: 'break' });

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
    if (routeRevision !== plannerRouteRevision) return;
    const trip = data.trip;
    if (!trip?.legs?.length || !trip.summary) throw new Error('Invalid Valhalla response');

    const orderedOriginalIndexes = (trip.locations || [])
      .map(location => Number(location.original_index))
      .filter(Number.isFinite);
    const originOffset = isValidPlannerOrigin(plannerOrigin) ? 1 : 0;
    const orderedIds = orderedOriginalIndexes
      .filter(index => index >= originOffset && index < originOffset + roadSpots.length)
      .map(index => roadSpots[index - originOffset]?.id)
      .filter(Boolean);
    if (orderedIds.length !== roadSpots.length) throw new Error('Incomplete optimized order');

    const shape = trip.legs.map(leg => plannerDecodePolyline6(leg.shape)).flat();
    const endpointIds = [
      ...(isValidPlannerOrigin(plannerOrigin) ? ['origin'] : []), ...roadSpots.map(spot => spot.id),
      ...(isValidPlannerOrigin(plannerOrigin) && tripDayReturnToOrigin[activeTripDay] ? ['return'] : [])
    ];
    const indexes = (trip.locations || []).map(location => Number(location.original_index));
    const safelyMapped = indexes.length === endpointIds.length && new Set(indexes).size === endpointIds.length
      && indexes.every(index => Number.isInteger(index) && index >= 0 && index < endpointIds.length)
      && trip.legs.length === indexes.length - 1;
    const legs = safelyMapped ? trip.legs.flatMap((leg, i) => {
      const length = leg.summary?.length, time = leg.summary?.time;
      return Number.isFinite(length) && length >= 0 && Number.isFinite(time) && time >= 0
        ? [{from: endpointIds[indexes[i]], to: endpointIds[indexes[i + 1]], distanceKm: length, timeSeconds: time}] : [];
    }) : [];
    plannerOptimizedRoute = {
      spotIds: orderedIds,
      distanceKm: Number(trip.summary.length) || 0,
      timeSeconds: Number(trip.summary.time) || 0,
      shape,
      legs,
      legState: plannerLegState()
    };
    trackGuideEvent('Route Optimized', { mode: plannerTravelMode, stops: String(roadSpots.length) });
    renderSummary();
  } catch (error) {
    if (routeRevision !== plannerRouteRevision) return;
    console.warn('[planner] route optimization unavailable', error);
    plannerOptimizedRoute = null;
    renderSummary();
    alert(t('plannerRouteUnavailable'));
  }
}

function plannerOpenGoogleMaps(segmentIndex = 0) {
  let roadSpots = getPlannerPendingSpots()
    .filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
  roadSpots = getOptimizedRouteSpots(roadSpots);
  if (!roadSpots.length) {
    alert(t('plannerNoRoadStops'));
    return;
  }

  const segmentSpots = roadSpots.slice(segmentIndex * 4, segmentIndex * 4 + 4);
  if (!segmentSpots.length) return;

  const googleTravelMode = { auto: 'driving', bicycle: 'bicycling', pedestrian: 'walking', '4x4': 'driving' }[plannerTravelMode] || 'driving';
  const params = new URLSearchParams({ api: '1', travelmode: googleTravelMode });
  if (!plannerConfirmAccess(segmentSpots)) return;
  const hasCompletedStops = getActiveTripSpots().some(item => isPlannerStopCompleted(item.id, activeTripDay));
  if (segmentIndex === 0 && isValidPlannerOrigin(plannerOrigin) && !hasCompletedStops) {
    params.set('origin', plannerOrigin.join(','));
  } else if (segmentIndex > 0) {
    const previousSpot = roadSpots[segmentIndex * 4 - 1];
    const previousAccess = previousSpot && resolvePlannerAccess(previousSpot, plannerTravelMode);
    if (previousAccess) params.set('origin', previousAccess.coords.join(','));
  }
  const points = segmentSpots.map(spot => resolvePlannerAccess(spot, plannerTravelMode).coords.join(','));
  const isFinalSegment = (segmentIndex + 1) * 4 >= roadSpots.length;
  if (isValidPlannerOrigin(plannerOrigin) && tripDayReturnToOrigin[activeTripDay] && isFinalSegment) {
    params.set('destination', plannerOrigin.join(','));
    params.set('waypoints', points.join('|'));
  } else {
    params.set('destination', points[points.length - 1]);
    if (points.length > 1) params.set('waypoints', points.slice(0, -1).join('|'));
  }
  trackGuideEvent('Navigation Open', { source: 'full_route', mode: plannerTravelMode });
  window.open(`https://www.google.com/maps/dir/?${params.toString()}`, '_blank', 'noopener,noreferrer');
}

function movePlannerSpot(id, direction) {
  if (plannerOptimizedRoute?.spotIds?.length) {
    const visibleDayIds = getPlannerDisplaySpots().map(spot => spot.id);
    const dayIdSet = new Set(visibleDayIds);
    let visibleIndex = 0;
    tripSelection = tripSelection.map(spotId => {
      if (!dayIdSet.has(spotId)) return spotId;
      return visibleDayIds[visibleIndex++];
    });
  }
  const dayIds = tripSelection.filter(spotId => getSpotTripDay(spotId) === activeTripDay);
  const dayIndex = dayIds.indexOf(id);
  const targetDayIndex = dayIndex + direction;
  if (dayIndex < 0 || targetDayIndex < 0 || targetDayIndex >= dayIds.length) return;
  const otherId = dayIds[targetDayIndex];
  const fromIndex = tripSelection.indexOf(id);
  const toIndex = tripSelection.indexOf(otherId);
  invalidatePlannerRoute();
  [tripSelection[fromIndex], tripSelection[toIndex]] = [tripSelection[toIndex], tripSelection[fromIndex]];
  saveTripSelection();
  renderSummary();
}

function removeFromPlanner(id) {
  invalidatePlannerRoute();
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
  plannerMap.on('click', event => {
    if (!plannerOriginPickMode) return;
    plannerOriginPickMode = false;
    saveActiveDayOrigin([event.latlng.lat, event.latlng.lng]);
  });
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>',
    maxZoom: 19
  }).addTo(plannerMap);

  plannerMapMarkers = [];
  const bounds = L.latLngBounds();

  getPlannerDisplaySpots().forEach((spot, index) => {
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

    const access = resolvePlannerAccess(spot, plannerTravelMode);
    const hasSeparateAccess = access && (access.coords[0] !== spot.coords[0] || access.coords[1] !== spot.coords[1]);
    if (hasSeparateAccess) {
      const accessLabel = access.gatewayName || t('plannerMapAccessPoint');
      const accessMarker = L.circleMarker(access.coords, { radius: 6, weight: 2, fillOpacity: 0.85 }).addTo(plannerMap)
        .bindPopup(`<strong class="text-xs">${t('plannerMapAccessPoint')}</strong><br><span class="text-[10px] text-on-surface-variant">${accessLabel}</span>`);
      bounds.extend(access.coords);
      plannerMapMarkers.push(accessMarker);
    }
  });

  if (plannerOptimizedRoute?.shape?.length) {
    plannerRouteLine = L.polyline(plannerOptimizedRoute.shape, { weight: 5, opacity: 0.8 }).addTo(plannerMap);
    plannerOptimizedRoute.shape.forEach(coord => bounds.extend(coord));
  }
  if (isValidPlannerOrigin(plannerOrigin)) {
    L.circleMarker(plannerOrigin, { radius: 7, weight: 3, fillOpacity: 1 }).addTo(plannerMap).bindPopup(t('plannerDayOrigin').replace('{n}', activeTripDay));
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
  const params = new URLSearchParams(window.location.search);
  const requestedSpotId = params.get('spot');
  if (params.get('add') === 'trip' && requestedSpotId && touristSpots.some(spot => spot.id === requestedSpotId)) {
    if (!isSpotInTrip(requestedSpotId)) toggleSpotInTrip(requestedSpotId);
    params.delete('add');
    const nextUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '') + window.location.hash;
    window.history.replaceState(window.history.state, '', nextUrl);
  }
  if (params.get('view') === 'trip') {
    requestAnimationFrame(() => openPlannerSummary());
  }
});
