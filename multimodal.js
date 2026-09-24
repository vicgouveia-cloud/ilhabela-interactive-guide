// Gateway coordinates supplied by the user on 2026-09-24; never replace beach coordinates.
const roadWalkingGateways = {
  'praia-do-juliao': [-23.853583875006763, -45.41239561211879],
  'praia-da-feiticeira': [-23.84660565107699, -45.410130644310605]
};
const boneteTrailGateway = [-23.936275064037446, -45.42730164154816];
const castelhanosParkGateway = [-23.839249751545807, -45.36002116037754];
touristSpots.forEach(spot => {
  const coords = roadWalkingGateways[spot.id];
  spot.routing.accessOptions = coords ? [{
    id: 'road-walk', mode: 'trail', approachModes: ['auto', 'bicycle'],
    gateway: { coords, verified: true, source: 'user:2026-09-24' },
    finalMode: 'pedestrian'
  }] : spot.routing.modes.map(mode => ({
    id: mode, mode, gateway: null, approachModes: [], finalMode: mode
  }));
  if (spot.id === 'praia-do-bonete') {
    // Sepituba is the verified road gateway for the trail. Boat embarkation stays independent.
    spot.routing.accessOptions = [
      { id: 'road-trail', mode: 'trail', approachModes: ['auto', 'bicycle'], gateway: { name: 'Ponta da Sepituba', coords: boneteTrailGateway, verified: true, source: 'user:2026-09-24' }, finalMode: 'trail' },
      { id: 'boat', mode: 'boat', approachModes: [], gateway: null, finalMode: 'boat' }
    ];
  }
  if (spot.id === 'baia-de-castelhanos') {
    // Common cars stop at the verified park gate. A 4x4 may continue to the attraction.
    spot.routing.accessOptions = [
      { id: 'common-car', mode: 'road', approachModes: ['auto'], gateway: { name: 'Entrada do Parque', coords: castelhanosParkGateway, verified: true, source: 'user:2026-09-24' }, finalMode: '4x4', vehicleRequirement: '4x4-after-gateway' },
      { id: 'own-4x4', mode: '4x4', approachModes: ['4x4'], gateway: { coords: spot.coords, verified: true, source: 'destination' }, finalMode: null, vehicleRequirement: '4x4' },
      { id: 'boat', mode: 'boat', approachModes: [], gateway: null, finalMode: 'boat' }
    ];
  }
});

function resolvePlannerAccess(spot, mode) {
  if (!spot) return null;
  const option = spot.routing?.accessOptions?.find(option => option.approachModes.includes(mode) && option.gateway?.verified);
  if (option) return { coords: option.gateway.coords, destination: spot.coords, finalMode: option.finalMode };
  const modes = spot.routing?.modes || [];
  const allowed = mode === 'pedestrian' ? modes.includes('road') || modes.includes('trail')
    : mode === 'bicycle' ? modes.includes('road') : spot.routing?.roadRoutable === true;
  return allowed ? { coords: spot.coords, destination: spot.coords, finalMode: null } : null;
}

const multimodalCopy = {
  pt: ['Trecho final a pé; a navegação termina no acesso rodoviário. Caminhada não incluída no tempo de deslocamento.', 'Confirmar rota com trecho final a pé?', 'Embarque a confirmar com o operador', 'Gateway exato a confirmar', 'Baixar roteiro offline', 'Arquivo com dados e uma foto por lugar. Até 10 lugares e 20 MB. Sem mapas, navegação ou atualização offline.', 'Não foi possível baixar o roteiro completo. Verifique a conexão e os limites.', 'Roteiro offline'],
  en: ['Final segment on foot; navigation ends at the road access. Walking is excluded from travel time.', 'Confirm route with a final walking segment?', 'Confirm embarkation with the operator', 'Exact gateway to be confirmed', 'Download offline trip', 'File with details and one photo per place. Up to 10 places and 20 MB. No offline maps, navigation or updates.', 'Could not download the complete trip. Check your connection and the limits.', 'Offline trip'],
  fr: ['Dernier tronçon à pied ; la navigation se termine à l’accès routier. Marche exclue du temps de trajet.', 'Confirmer le trajet avec un dernier tronçon à pied ?', 'Embarquement à confirmer avec l’opérateur', 'Point d’accès exact à confirmer', 'Télécharger l’itinéraire hors ligne', 'Fichier avec informations et une photo par lieu. Maximum 10 lieux et 20 Mo. Sans cartes, navigation ni mises à jour hors ligne.', 'Impossible de télécharger l’itinéraire complet. Vérifiez la connexion et les limites.', 'Itinéraire hors ligne'],
  es: ['Tramo final a pie; la navegación termina en el acceso por carretera. Caminata excluida del tiempo de viaje.', '¿Confirmar ruta con tramo final a pie?', 'Confirmar embarque con el operador', 'Punto de acceso exacto por confirmar', 'Descargar itinerario sin conexión', 'Archivo con datos y una foto por lugar. Hasta 10 lugares y 20 MB. Sin mapas, navegación ni actualizaciones sin conexión.', 'No se pudo descargar el itinerario completo. Revisa la conexión y los límites.', 'Itinerario sin conexión'],
  he: ['הקטע האחרון ברגל; הניווט מסתיים בגישה מהכביש. זמן ההליכה אינו כלול בזמן הנסיעה.', 'לאשר מסלול עם קטע אחרון ברגל?', 'יש לאשר את נקודת העלייה לסירה עם המפעיל', 'נקודת הגישה המדויקת דורשת אישור', 'הורדת מסלול לשימוש ללא רשת', 'קובץ עם מידע ותמונה אחת לכל מקום. עד 10 מקומות ו־20 MB. ללא מפות, ניווט או עדכונים ללא רשת.', 'לא ניתן להוריד את המסלול המלא. בדקו את החיבור והמגבלות.', 'מסלול ללא רשת']
};
Object.entries(multimodalCopy).forEach(([lang, copy]) => {
  ['plannerFinalWalk', 'plannerConfirmWalk', 'plannerBoatPending', 'plannerGatewayPending', 'plannerOfflineDownload', 'plannerOfflineHint', 'plannerOfflineError', 'plannerOfflineTitle'].forEach((key, index) => translations[lang][key] = copy[index]);
});

function plannerAccessNotice(spot) {
  if (resolvePlannerAccess(spot, plannerTravelMode)?.finalMode) return t('plannerFinalWalk');
  if (spot.id === 'praia-do-bonete') return `${getPlannerModeLabel('trail')}: Ponta da Sepituba. ${getPlannerModeLabel('boat')}: ${t('plannerBoatPending')}.`;
  if (spot.id === 'baia-de-castelhanos' && plannerTravelMode === 'auto') return `Carro comum: a navegação termina na entrada do Parque. Para seguir de veículo até Castelhanos, use 4x4.`;
  return '';
}

function plannerConfirmAccess(spots) {
  const walking = spots.filter(spot => resolvePlannerAccess(spot, plannerTravelMode)?.finalMode);
  return !walking.length || window.confirm(walking.map(spot => getSpotTranslation(spot).title).join(', ') + '\n' + t('plannerFinalWalk') + '\n' + t('plannerConfirmWalk'));
}
