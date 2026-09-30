// Gateway coordinates supplied by the user; never replace attraction coordinates.
const boneteTrailGateway = [-23.936275064037446, -45.42730164154816];
const roadWalkingGateways = {
  'pico-do-baepi': [-23.802132860104887, -45.35514446231041],
  'praia-do-juliao': [-23.853583875006763, -45.41239561211879],
  'praia-da-feiticeira': [-23.84660565107699, -45.410130644310605],
  'praia-da-pacuiba': [-23.727308751868794, -45.31890535121027],
  'praia-da-ponta-azeda': [-23.74302141213607, -45.348752682254734],
  'praia-do-pinto': [-23.741868315370972, -45.34807300404768],
  'praia-do-jabaquara': [-23.736889822090436, -45.29377785097268],
  'praia-do-barreiros': [-23.76356965576912, -45.348813572867364],
  'praia-de-santa-tereza': [-23.771601878012316, -45.351412997079635],
  'cachoeira-da-toca': [-23.826654676666603, -45.341884430628895],
  'cachoeira-do-veloso': [-23.876020628872798, -45.43576108900807],
  'cachoeira-do-paqueta': [-23.869517499616304, -45.423931160172216],
  'cachoeira-dos-tres-tombos': [-23.854116510544785, -45.405701165557744],
  'cachoeira-da-laje': boneteTrailGateway,
  'poco-do-furado': [-23.833094685835388, -45.36101034668008],
  'mirante-do-baepi': [-23.802132860104887, -45.35514446231041]
};
const castelhanosParkGateway = [-23.839249751545807, -45.36002116037754];
touristSpots.forEach(spot => {
  const coords = roadWalkingGateways[spot.id];
  spot.routing.accessOptions = coords ? [{
    id: 'road-walk', mode: 'trail', approachModes: ['auto', '4x4', 'bicycle'],
    gateway: { coords, verified: true, source: 'user:2026-09-24' },
    finalMode: 'pedestrian'
  }] : spot.routing.modes.map(mode => ({
    id: mode, mode, gateway: null, approachModes: [], finalMode: mode
  }));
  if (spot.id === 'praia-do-bonete') {
    // Sepituba is the verified road gateway for the trail. Boat embarkation stays independent.
    spot.routing.accessOptions = [
      { id: 'road-trail', mode: 'trail', approachModes: ['auto', '4x4', 'bicycle'], gateway: { name: 'Ponta da Sepituba', coords: boneteTrailGateway, verified: true, source: 'user:2026-09-24' }, finalMode: 'trail' },
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
  if (option) return { coords: option.gateway.coords, destination: spot.coords, finalMode: option.finalMode, gatewayName: option.gateway.name || null, accessId: option.id };
  const modes = spot.routing?.modes || [];
  const allowed = mode === 'pedestrian' ? modes.includes('road') || modes.includes('trail')
    : mode === 'bicycle' ? modes.includes('road') : spot.routing?.roadRoutable === true;
  return allowed ? { coords: spot.coords, destination: spot.coords, finalMode: null } : null;
}

const multimodalCopy = {
  pt: ['Trecho final a pé; a navegação termina no acesso rodoviário. Caminhada não incluída no tempo de deslocamento.', 'Confirmar rota com trecho final a pé?', 'Embarque a confirmar com o operador', 'Gateway exato a confirmar', 'Baixar roteiro offline', 'Arquivo com dados e uma foto por lugar. Até 10 lugares e 20 MB. Sem mapas, navegação ou atualização offline.', 'Não foi possível baixar o roteiro completo. Verifique a conexão e os limites.', 'Roteiro offline', 'A navegação de carro comum termina na entrada do Parque. Para seguir de veículo, use 4x4.'],
  en: ['Final segment on foot; navigation ends at the road access. Walking is excluded from travel time.', 'Confirm route with a final walking segment?', 'Confirm embarkation with the operator', 'Exact gateway to be confirmed', 'Download offline trip', 'File with details and one photo per place. Up to 10 places and 20 MB. No offline maps, navigation or updates.', 'Could not download the complete trip. Check your connection and the limits.', 'Offline trip', 'Navigation by regular car ends at the park entrance. To continue by vehicle, use a 4x4.'],
  fr: ['Dernier tronçon à pied ; la navigation se termine à l’accès routier. Marche exclue du temps de trajet.', 'Confirmer le trajet avec un dernier tronçon à pied ?', 'Embarquement à confirmer avec l’opérateur', 'Point d’accès exact à confirmer', 'Télécharger l’itinéraire hors ligne', 'Fichier avec informations et une photo par lieu. Maximum 10 lieux et 20 Mo. Sans cartes, navigation ni mises à jour hors ligne.', 'Impossible de télécharger l’itinéraire complet. Vérifiez la connexion et les limites.', 'Itinéraire hors ligne', 'La navigation en voiture ordinaire se termine à l’entrée du parc. Pour continuer en véhicule, utilisez un 4x4.'],
  es: ['Tramo final a pie; la navegación termina en el acceso por carretera. Caminata excluida del tiempo de viaje.', '¿Confirmar ruta con tramo final a pie?', 'Confirmar embarque con el operador', 'Punto de acceso exacto por confirmar', 'Descargar itinerario sin conexión', 'Archivo con datos y una foto por lugar. Hasta 10 lugares y 20 MB. Sin mapas, navegación ni actualizaciones sin conexión.', 'No se pudo descargar el itinerario completo. Revisa la conexión y los límites.', 'Itinerario sin conexión', 'La navegación en coche común termina en la entrada del parque. Para continuar en vehículo, usa un 4x4.'],
  he: ['הקטע האחרון ברגל; הניווט מסתיים בגישה מהכביש. זמן ההליכה אינו כלול בזמן הנסיעה.', 'לאשר מסלול עם קטע אחרון ברגל?', 'יש לאשר את נקודת העלייה לסירה עם המפעיל', 'נקודת הגישה המדויקת דורשת אישור', 'הורדת מסלול לשימוש ללא רשת', 'קובץ עם מידע ותמונה אחת לכל מקום. עד 10 מקומות ו־20 MB. ללא מפות, ניווט או עדכונים ללא רשת.', 'לא ניתן להוריד את המסלול המלא. בדקו את החיבור והמגבלות.', 'מסלול ללא רשת', 'הניווט ברכב רגיל מסתיים בכניסה לפארק. כדי להמשיך ברכב, יש להשתמש ב־4x4.']
};
Object.entries(multimodalCopy).forEach(([lang, copy]) => {
  ['plannerFinalWalk', 'plannerConfirmWalk', 'plannerBoatPending', 'plannerGatewayPending', 'plannerOfflineDownload', 'plannerOfflineHint', 'plannerOfflineError', 'plannerOfflineTitle', 'planner4x4Handoff'].forEach((key, index) => translations[lang][key] = copy[index]);
});

function plannerAccessNotice(spot) {
  const resolved = resolvePlannerAccess(spot, plannerTravelMode);
  if (spot.id === 'baia-de-castelhanos' && resolved?.accessId === 'common-car') return t('plannerCastelhanosAutoHandoff');
  if (spot.id === 'baia-de-castelhanos' && resolved?.accessId === 'own-4x4') return t('plannerCastelhanos4x4Direct');
  if (resolved?.finalMode === '4x4') return `${getPlannerModeLabel('4x4')}: ${t('planner4x4Handoff')}`;
  if (spot.id === 'praia-do-bonete' && resolved?.accessId === 'road-trail') return t('plannerBoneteTrailHandoff');
  if (resolved?.finalMode === 'pedestrian' || resolved?.finalMode === 'trail') {
    const accessLabel = resolved.gatewayName || (spot.id === 'praia-do-juliao' ? t('plannerJuliaoAccess') : t('plannerRoadAccess'));
    return `${t('plannerNavigateThenWalk').replace('{access}', accessLabel).replace('{destination}', getSpotTranslation(spot).title)} ${t('plannerFinalWalk')}`;
  }
  if (spot.id === 'praia-do-bonete') return `${getPlannerModeLabel('trail')}: Ponta da Sepituba. ${getPlannerModeLabel('boat')}: ${t('plannerBoatPending')}.`;
  return '';
}

function plannerConfirmAccess(spots) {
  const walking = spots.filter(spot => ['pedestrian', 'trail'].includes(resolvePlannerAccess(spot, plannerTravelMode)?.finalMode));
  return !walking.length || window.confirm(walking.map(spot => getSpotTranslation(spot).title).join(', ') + '\n' + t('plannerFinalWalk') + '\n' + t('plannerConfirmWalk'));
}


// Maritime compatibility is intentionally independent from editorial contextSpotIds.
// A route declares destinations; providers are matched only by explicit service capability.

// Maritime and nautical planner copy.
Object.assign(translations.pt, {
  plannerReadyResolve: "Resolver",
  plannerReadyDay: "Dia sem pendências conhecidas no guia", plannerReadyPendingTitle: "Antes de sair", plannerReadyOriginPending: "Defina a origem deste dia.", plannerReadyBoatPending: "Confirme o embarque por barco para {destination}.", plannerReadyMeetingPending: "Confirme o ponto de encontro para {destination}.",
  plannerAgendaTitle: "Agenda do Dia {n}", plannerAgendaHint: "Sequência planejada do início ao retorno.", plannerAgendaStart: "Início do dia", plannerAgendaOriginPending: "Origem ainda não definida", plannerAgendaReturn: "Retorno", plannerAgendaReturnHint: "Voltar à origem definida para este dia.",
  plannerDay: "Dia", plannerDayOriginReady: "Origem do Dia {n} definida", plannerDayOrigin: "Origem do Dia {n}", plannerTapMapOrigin: "Toque no mapa…", plannerChooseMapOrigin: "Escolher origem no mapa", plannerClearOrigin: "Limpar origem", plannerReturnOrigin: "Retornar à origem", plannerRoadAccess: "acesso rodoviário", plannerJuliaoAccess: "Acesso à Praia do Julião", plannerNavigateThenWalk: "Navegue até {access}. Depois, siga a pé até {destination}.",
  plannerCastelhanosAutoHandoff: "Carro comum: navegue somente até a Entrada do Parque. Para continuar de veículo até Castelhanos, é necessário 4x4.",
  plannerCastelhanos4x4Direct: "4x4: a rota pode seguir até Castelhanos; a Entrada do Parque não é o destino final deste modo.",
  plannerCastelhanosBoatPending: "Alternativa por barco: o guia ainda não possui um ponto de embarque validado para Castelhanos. Confirme embarque, horário, disponibilidade e condições diretamente com o operador.",
  plannerBoneteTrailHandoff: "De carro, navegue até Ponta da Sepituba. A partir dali, o acesso ao Bonete continua por trilha; não trate a praia como destino rodoviário.",
  plannerBoneteBoatPending: "Alternativa por barco: o guia ainda não possui um ponto de embarque validado para o Bonete. Confirme embarque, horário, disponibilidade e condições diretamente com o operador.",
  plannerBoatOptions: "Opções de barco",
  plannerBoatOptionsHint: "Alternativas marítimas para destinos selecionados. O ponto de embarque depende do roteiro e do prestador.",
  plannerBoatProviderHint: "Prestadores com cobertura marítima confirmada em Ilhabela. Confirme saída, horário, disponibilidade e condições diretamente com o prestador.",
  plannerNauticalExperiences: "Experiências náuticas",
  plannerNauticalExperiencesHint: "Atividades selecionadas que dependem de operação especializada e não são simples trechos de transporte.",
  plannerWhaleWatching: "Observação de baleias", plannerDivingExperience: "Mergulho",
  plannerExperienceLocationHint: "O ponto no mapa representa o local da experiência, não um destino de acesso terrestre.",
  plannerMeetingPointConfirmed: "Use o ponto de encontro confirmado pelo prestador para iniciar o deslocamento.",
  plannerMeetingPointUnknown: "Ponto de encontro/embarque ainda não definido no guia. Confirme com o prestador antes de se deslocar.",
  plannerProviderDetailsHint: "Confirme também horário, disponibilidade, condições e requisitos diretamente com o prestador.",
  plannerContactProvider: "Falar pelo WhatsApp", plannerProviderWebsite: "Site do prestador"
});
Object.assign(translations.en, {
  plannerReadyResolve: "Resolve",
  plannerReadyDay: "No known pending items for this day", plannerReadyPendingTitle: "Before you go", plannerReadyOriginPending: "Set the origin for this day.", plannerReadyBoatPending: "Confirm boat boarding for {destination}.", plannerReadyMeetingPending: "Confirm the meeting point for {destination}.",
  plannerAgendaTitle: "Day {n} agenda", plannerAgendaHint: "Planned sequence from start to return.", plannerAgendaStart: "Start of day", plannerAgendaOriginPending: "Origin not set yet", plannerAgendaReturn: "Return", plannerAgendaReturnHint: "Return to the origin set for this day.",
  plannerDay: "Day", plannerDayOriginReady: "Day {n} origin set", plannerDayOrigin: "Day {n} origin", plannerTapMapOrigin: "Tap the map…", plannerChooseMapOrigin: "Choose origin on map", plannerClearOrigin: "Clear origin", plannerReturnOrigin: "Return to origin", plannerRoadAccess: "road access", plannerJuliaoAccess: "Julião Beach access", plannerNavigateThenWalk: "Navigate to {access}. Then continue on foot to {destination}.",
  plannerCastelhanosAutoHandoff: "Regular car: navigate only to the Park Entrance. To continue by vehicle to Castelhanos, a 4x4 is required.",
  plannerCastelhanos4x4Direct: "4x4: the route may continue to Castelhanos; the Park Entrance is not the final destination in this mode.",
  plannerCastelhanosBoatPending: "Boat alternative: the guide does not yet have a validated boarding point for Castelhanos. Confirm boarding, time, availability and conditions directly with the operator.",
  plannerBoneteTrailHandoff: "By car, navigate to Ponta da Sepituba. From there, access to Bonete continues by trail; do not treat the beach as a road destination.",
  plannerBoneteBoatPending: "Boat alternative: the guide does not yet have a validated boarding point for Bonete. Confirm boarding, time, availability and conditions directly with the operator.",
  plannerBoatOptions: "Boat options",
  plannerBoatOptionsHint: "Maritime alternatives for selected destinations. The boarding point depends on the route and provider.",
  plannerBoatProviderHint: "Providers with confirmed maritime coverage in Ilhabela. Confirm departure point, time, availability and conditions directly with the provider.",
  plannerNauticalExperiences: "Nautical experiences",
  plannerNauticalExperiencesHint: "Selected activities that depend on specialized operation and are not simply transport legs.",
  plannerWhaleWatching: "Whale watching", plannerDivingExperience: "Diving",
  plannerExperienceLocationHint: "The point on the map represents the experience location, not a terrestrial access destination.",
  plannerMeetingPointConfirmed: "Use the meeting point confirmed by the provider to begin your journey.",
  plannerMeetingPointUnknown: "The meeting/boarding point is not yet defined in the guide. Confirm it with the provider before traveling.",
  plannerProviderDetailsHint: "Also confirm time, availability, conditions and requirements directly with the provider.",
  plannerContactProvider: "Contact on WhatsApp", plannerProviderWebsite: "Provider website"
});
Object.assign(translations.fr, {
  plannerReadyResolve: "Résoudre",
  plannerReadyDay: "Aucune étape en attente connue pour cette journée", plannerReadyPendingTitle: "Avant de partir", plannerReadyOriginPending: "Définissez l’origine de cette journée.", plannerReadyBoatPending: "Confirmez l’embarquement en bateau pour {destination}.", plannerReadyMeetingPending: "Confirmez le point de rendez-vous pour {destination}.",
  plannerAgendaTitle: "Programme du Jour {n}", plannerAgendaHint: "Séquence prévue du départ au retour.", plannerAgendaStart: "Début de la journée", plannerAgendaOriginPending: "Origine pas encore définie", plannerAgendaReturn: "Retour", plannerAgendaReturnHint: "Retourner à l’origine définie pour cette journée.",
  plannerDay: "Jour", plannerDayOriginReady: "Origine du Jour {n} définie", plannerDayOrigin: "Origine du Jour {n}", plannerTapMapOrigin: "Touchez la carte…", plannerChooseMapOrigin: "Choisir l’origine sur la carte", plannerClearOrigin: "Effacer l’origine", plannerReturnOrigin: "Retour à l’origine", plannerRoadAccess: "accès routier", plannerJuliaoAccess: "Accès à la plage de Julião", plannerNavigateThenWalk: "Naviguez jusqu’à {access}. Puis continuez à pied jusqu’à {destination}.",
  plannerCastelhanosAutoHandoff: "Voiture ordinaire : naviguez uniquement jusqu’à l’Entrée du Parc. Pour continuer en véhicule jusqu’à Castelhanos, un 4x4 est nécessaire.",
  plannerCastelhanos4x4Direct: "4x4 : l’itinéraire peut continuer jusqu’à Castelhanos ; l’Entrée du Parc n’est pas la destination finale dans ce mode.",
  plannerCastelhanosBoatPending: "Alternative en bateau : le guide ne dispose pas encore d’un point d’embarquement validé pour Castelhanos. Confirmez l’embarquement, l’horaire, la disponibilité et les conditions directement avec l’opérateur.",
  plannerBoneteTrailHandoff: "En voiture, naviguez jusqu’à Ponta da Sepituba. À partir de là, l’accès au Bonete continue par sentier ; ne considérez pas la plage comme une destination routière.",
  plannerBoneteBoatPending: "Alternative en bateau : le guide ne dispose pas encore d’un point d’embarquement validé pour Bonete. Confirmez l’embarquement, l’horaire, la disponibilité et les conditions directement avec l’opérateur.",
  plannerBoatOptions: "Options en bateau",
  plannerBoatOptionsHint: "Alternatives maritimes pour les destinations sélectionnées. Le point d'embarquement dépend de l'itinéraire et du prestataire.",
  plannerBoatProviderHint: "Prestataires avec couverture maritime confirmée à Ilhabela. Confirmez le départ, l'heure, la disponibilité et les conditions directement avec le prestataire.",
  plannerNauticalExperiences: "Expériences nautiques",
  plannerNauticalExperiencesHint: "Activités sélectionnées nécessitant une opération spécialisée et qui ne sont pas de simples trajets de transport.",
  plannerWhaleWatching: "Observation des baleines", plannerDivingExperience: "Plongée",
  plannerExperienceLocationHint: "Le point sur la carte représente le lieu de l'expérience, pas une destination d'accès terrestre.",
  plannerMeetingPointConfirmed: "Utilisez le point de rendez-vous confirmé par le prestataire pour commencer votre déplacement.",
  plannerMeetingPointUnknown: "Le point de rendez-vous/d'embarquement n'est pas encore défini dans le guide. Confirmez-le avec le prestataire avant de vous déplacer.",
  plannerProviderDetailsHint: "Confirmez également l'heure, la disponibilité, les conditions et les exigences directement avec le prestataire.",
  plannerContactProvider: "Contacter sur WhatsApp", plannerProviderWebsite: "Site du prestataire"
});
Object.assign(translations.es, {
  plannerReadyResolve: "Resolver",
  plannerReadyDay: "No hay pendientes conocidos para este día", plannerReadyPendingTitle: "Antes de salir", plannerReadyOriginPending: "Define el origen de este día.", plannerReadyBoatPending: "Confirma el embarque en barco para {destination}.", plannerReadyMeetingPending: "Confirma el punto de encuentro para {destination}.",
  plannerAgendaTitle: "Agenda del Día {n}", plannerAgendaHint: "Secuencia planificada desde el inicio hasta el regreso.", plannerAgendaStart: "Inicio del día", plannerAgendaOriginPending: "Origen aún no definido", plannerAgendaReturn: "Regreso", plannerAgendaReturnHint: "Volver al origen definido para este día.",
  plannerDay: "Día", plannerDayOriginReady: "Origen del Día {n} definido", plannerDayOrigin: "Origen del Día {n}", plannerTapMapOrigin: "Toca el mapa…", plannerChooseMapOrigin: "Elegir origen en el mapa", plannerClearOrigin: "Borrar origen", plannerReturnOrigin: "Regresar al origen", plannerRoadAccess: "acceso por carretera", plannerJuliaoAccess: "Acceso a la Playa de Julião", plannerNavigateThenWalk: "Navega hasta {access}. Luego continúa a pie hasta {destination}.",
  plannerCastelhanosAutoHandoff: "Coche común: navega solamente hasta la Entrada del Parque. Para continuar en vehículo hasta Castelhanos, es necesario un 4x4.",
  plannerCastelhanos4x4Direct: "4x4: la ruta puede continuar hasta Castelhanos; la Entrada del Parque no es el destino final en este modo.",
  plannerCastelhanosBoatPending: "Alternativa en barco: la guía todavía no tiene un punto de embarque validado para Castelhanos. Confirma embarque, horario, disponibilidad y condiciones directamente con el operador.",
  plannerBoneteTrailHandoff: "En coche, navega hasta Ponta da Sepituba. Desde allí, el acceso a Bonete continúa por sendero; no trates la playa como destino por carretera.",
  plannerBoneteBoatPending: "Alternativa en barco: la guía todavía no tiene un punto de embarque validado para Bonete. Confirma embarque, horario, disponibilidad y condiciones directamente con el operador.",
  plannerBoatOptions: "Opciones en barco",
  plannerBoatOptionsHint: "Alternativas marítimas para los destinos seleccionados. El punto de embarque depende de la ruta y del prestador.",
  plannerBoatProviderHint: "Prestadores con cobertura marítima confirmada en Ilhabela. Confirma salida, horario, disponibilidad y condiciones directamente con el prestador.",
  plannerNauticalExperiences: "Experiencias náuticas",
  plannerNauticalExperiencesHint: "Actividades seleccionadas que dependen de una operación especializada y no son simples tramos de transporte.",
  plannerWhaleWatching: "Avistamiento de ballenas", plannerDivingExperience: "Buceo",
  plannerExperienceLocationHint: "El punto del mapa representa el lugar de la experiencia, no un destino de acceso terrestre.",
  plannerMeetingPointConfirmed: "Usa el punto de encuentro confirmado por el prestador para iniciar el desplazamiento.",
  plannerMeetingPointUnknown: "El punto de encuentro/embarque aún no está definido en la guía. Confírmalo con el prestador antes de desplazarte.",
  plannerProviderDetailsHint: "Confirma también horario, disponibilidad, condiciones y requisitos directamente con el prestador.",
  plannerContactProvider: "Consultar por WhatsApp", plannerProviderWebsite: "Sitio del prestador"
});
Object.assign(translations.he, {
  plannerReadyResolve: "לטיפול",
  plannerReadyDay: "אין משימות ידועות שממתינות ליום זה", plannerReadyPendingTitle: "לפני היציאה", plannerReadyOriginPending: "הגדירו נקודת מוצא ליום זה.", plannerReadyBoatPending: "אשרו את נקודת העלייה לסירה עבור {destination}.", plannerReadyMeetingPending: "אשרו את נקודת המפגש עבור {destination}.",
  plannerAgendaTitle: "תוכנית ליום {n}", plannerAgendaHint: "רצף מתוכנן מתחילת היום ועד החזרה.", plannerAgendaStart: "תחילת היום", plannerAgendaOriginPending: "נקודת המוצא טרם הוגדרה", plannerAgendaReturn: "חזרה", plannerAgendaReturnHint: "חזרה לנקודת המוצא שהוגדרה ליום זה.",
  plannerDay: "יום", plannerDayOriginReady: "נקודת המוצא ליום {n} הוגדרה", plannerDayOrigin: "נקודת מוצא ליום {n}", plannerTapMapOrigin: "הקישו על המפה…", plannerChooseMapOrigin: "בחירת נקודת מוצא במפה", plannerClearOrigin: "ניקוי נקודת המוצא", plannerReturnOrigin: "חזרה לנקודת המוצא", plannerRoadAccess: "גישה מהכביש", plannerJuliaoAccess: "גישה לחוף Julião", plannerNavigateThenWalk: "נווטו עד {access}. לאחר מכן המשיכו ברגל עד {destination}.",
  plannerCastelhanosAutoHandoff: "רכב רגיל: יש לנווט רק עד כניסת הפארק. כדי להמשיך ברכב עד Castelhanos נדרש 4x4.",
  plannerCastelhanos4x4Direct: "4x4: המסלול יכול להמשיך עד Castelhanos; כניסת הפארק אינה היעד הסופי במצב זה.",
  plannerCastelhanosBoatPending: "חלופה בסירה: עדיין אין במדריך נקודת עלייה מאומתת ל-Castelhanos. יש לאשר עם המפעיל את נקודת העלייה, השעה, הזמינות והתנאים.",
  plannerBoneteTrailHandoff: "ברכב יש לנווט עד Ponta da Sepituba. משם הגישה לבונטה ממשיכה בשביל; אין להתייחס לחוף כיעד כביש.",
  plannerBoneteBoatPending: "חלופה בסירה: עדיין אין במדריך נקודת עלייה מאומתת לבונטה. יש לאשר עם המפעיל את נקודת העלייה, השעה, הזמינות והתנאים.",
  plannerBoatOptions: "אפשרויות שיט",
  plannerBoatOptionsHint: "חלופות ימיות ליעדים שנבחרו. נקודת העלייה לסירה תלויה במסלול ובספק השירות.",
  plannerBoatProviderHint: "ספקים עם כיסוי ימי מאומת באיליאבלה. יש לאשר ישירות עם הספק את נקודת היציאה, השעה, הזמינות והתנאים.",
  plannerNauticalExperiences: "חוויות ימיות",
  plannerNauticalExperiencesHint: "פעילויות נבחרות הדורשות הפעלה מקצועית ואינן רק מקטעי תחבורה.",
  plannerWhaleWatching: "צפייה בלווייתנים", plannerDivingExperience: "צלילה",
  plannerExperienceLocationHint: "הנקודה במפה מייצגת את מקום החוויה ולא יעד לגישה יבשתית.",
  plannerMeetingPointConfirmed: "השתמשו בנקודת המפגש שאושרה על ידי הספק כדי להתחיל את הדרך.",
  plannerMeetingPointUnknown: "נקודת המפגש/העלייה לסירה עדיין אינה מוגדרת במדריך. יש לאשר אותה עם הספק לפני היציאה.",
  plannerProviderDetailsHint: "יש לאשר ישירות עם הספק גם שעה, זמינות, תנאים ודרישות.",
  plannerContactProvider: "פנייה ב-WhatsApp", plannerProviderWebsite: "אתר הספק"
});

const maritimeRouteProfiles = {
  'bonete': {
    spotIds: ['praia-do-bonete'],
    requiredMode: 'boat',
    requiredActivity: 'boat-tour',
    embarkation: null
  },
  'east-coast': {
    spotIds: ['praia-da-fome', 'saco-do-eustaquio', 'baia-de-castelhanos'],
    requiredMode: 'boat',
    requiredActivity: 'boat-tour',
    embarkation: null
  },
  'south-remote-coast': {
    spotIds: ['praia-da-enchova', 'praia-de-indaiauba'],
    requiredMode: 'boat',
    requiredActivity: 'boat-tour',
    embarkation: null
  },
  'north-remote-coast': {
    spotIds: ['praia-do-poco'],
    requiredMode: 'boat',
    requiredActivity: 'boat-tour',
    embarkation: null
  }
};

const nauticalExperienceProfiles = {
  'whale-watching': {
    spotIds: ['ponto-baleias-sul-sepituba', 'ponto-baleias-canal'],
    requiredMode: 'boat',
    requiredActivity: 'whale-watching',
    meetingPoint: null
  },
  'diving': {
    spotIds: ['naufragio-aymore', 'santuario-ilha-das-cabras', 'naufragio-principe-de-asturias'],
    requiredMode: 'diving',
    requiredActivity: 'diving',
    meetingPoint: null
  }
};

function getNauticalExperienceOptionsForSpot(spotId) {
  return Object.entries(nauticalExperienceProfiles)
    .filter(([, profile]) => profile.spotIds.includes(spotId))
    .map(([id, profile]) => ({
      id,
      ...profile,
      providers: servicesData.filter(service => {
        const modes = service.serviceArea?.modes || [];
        const verifiedModes = service.serviceArea?.verifiedModes || [];
        const activities = service.activities || [];
        return service.serviceArea?.scope === 'island' &&
          modes.includes(profile.requiredMode) &&
          verifiedModes.includes(profile.requiredMode) &&
          activities.includes(profile.requiredActivity);
      })
    }));
}

function getMaritimeRouteProfilesForSpot(spotId) {
  return Object.entries(maritimeRouteProfiles)
    .filter(([, profile]) => profile.spotIds.includes(spotId))
    .map(([id, profile]) => ({ id, ...profile }));
}

function getMaritimeProvidersForProfile(profile) {
  if (!profile) return [];
  return servicesData.filter(service => {
    const modes = service.serviceArea?.modes || [];
    const activities = service.activities || [];
    const verifiedModes = service.serviceArea?.verifiedModes || [];
    return service.serviceArea?.scope === 'island' &&
      modes.includes(profile.requiredMode) &&
      verifiedModes.includes(profile.requiredMode) &&
      activities.includes(profile.requiredActivity);
  });
}

function getMaritimeOptionsForSpot(spotId) {
  return getMaritimeRouteProfilesForSpot(spotId).map(profile => ({
    ...profile,
    providers: getMaritimeProvidersForProfile(profile)
  }));
}


function getMaritimeOptionsForSpots(spots) {
  const selectedIds = new Set((spots || []).map(spot => spot.id));
  return Object.entries(maritimeRouteProfiles)
    .map(([id, profile]) => {
      const matchingSpotIds = profile.spotIds.filter(spotId => selectedIds.has(spotId));
      if (!matchingSpotIds.length) return null;
      return {
        id,
        ...profile,
        matchingSpotIds,
        providers: getMaritimeProvidersForProfile(profile)
      };
    })
    .filter(Boolean);
}

function getNauticalExperienceOptionsForSpots(spots) {
  const selectedIds = new Set((spots || []).map(spot => spot.id));
  return Object.entries(nauticalExperienceProfiles)
    .map(([id, profile]) => {
      const matchingSpotIds = profile.spotIds.filter(spotId => selectedIds.has(spotId));
      if (!matchingSpotIds.length) return null;
      const sample = getNauticalExperienceOptionsForSpot(matchingSpotIds[0])[0];
      return { id, ...profile, matchingSpotIds, providers: sample?.providers || [] };
    })
    .filter(Boolean);
}

function renderPlannerProviderActions(provider) {
  if (!provider) return '';
  const whatsapp = provider.whatsapp
    ? `<a href="https://wa.me/55${provider.whatsapp}?text=${encodeURIComponent(t('localWhatsappMessage'))}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-[11px] font-bold text-white"><span class="material-symbols-outlined text-[15px]">chat</span><span>${t('plannerContactProvider')}</span></a>`
    : '';
  const website = provider.url
    ? `<a href="${provider.url}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-2 text-[11px] font-bold text-primary"><span class="material-symbols-outlined text-[15px]">language</span><span>${t('plannerProviderWebsite')}</span></a>`
    : '';
  if (!whatsapp && !website) return '';
  return `<div class="flex flex-wrap gap-2 pt-1">${whatsapp}${website}</div>`;
}

function renderPlannerNauticalExperiences(spots) {
  const options = getNauticalExperienceOptionsForSpots(spots);
  if (!options.length) return '';

  const labels = {
    'whale-watching': t('plannerWhaleWatching'),
    'diving': t('plannerDivingExperience')
  };
  const cards = options.map(option => {
    const destinationNames = option.matchingSpotIds
      .map(id => touristSpots.find(spot => spot.id === id))
      .filter(Boolean)
      .map(spot => getSpotTranslation(spot).title)
      .join(' · ');
    const providers = option.providers.map(provider =>
      `<div class="rounded-lg border border-black/10 bg-white p-2 space-y-2"><div class="text-[11px] font-bold text-primary">${provider.name}</div>${renderPlannerProviderActions(provider)}</div>`
    ).join('');
    return `<div class="rounded-xl border border-black/10 bg-white p-3 space-y-2">
      <div class="text-xs font-extrabold text-primary">${labels[option.id] || option.id}</div>
      <div class="text-xs font-semibold text-on-surface-variant">${destinationNames}</div>
      <div class="grid gap-2">${providers}</div>
      <p class="text-[10px] text-on-surface-variant">${t('plannerExperienceLocationHint')}</p>
      <p class="text-[10px] font-semibold text-on-surface-variant">${option.meetingPoint
        ? t('plannerMeetingPointConfirmed')
        : t('plannerMeetingPointUnknown')}</p>
      <p class="text-[10px] text-on-surface-variant">${t('plannerProviderDetailsHint')}</p>
    </div>`;
  }).join('');

  return `<div id="planner-nautical-options" class="rounded-2xl border border-black/10 bg-surface-container/40 p-4 space-y-3">
    <div>
      <h3 class="text-sm font-extrabold text-primary">${t('plannerNauticalExperiences')}</h3>
      <p class="text-xs text-on-surface-variant">${t('plannerNauticalExperiencesHint')}</p>
    </div>
    ${cards}
  </div>`;
}

function renderPlannerMaritimeOptions(spots) {
  const options = getMaritimeOptionsForSpots(spots);
  if (!options.length) return '';

  const cards = options.map(option => {
    const destinationNames = option.matchingSpotIds
      .map(id => touristSpots.find(spot => spot.id === id))
      .filter(Boolean)
      .map(spot => getSpotTranslation(spot).title)
      .join(' · ');
    const providers = option.providers.map(provider =>
      `<div class="rounded-lg border border-black/10 bg-white p-2 space-y-2"><div class="text-[11px] font-bold text-primary">${provider.name}</div>${renderPlannerProviderActions(provider)}</div>`
    ).join('');
    const includesBonete = option.matchingSpotIds.includes('praia-do-bonete');
    const includesCastelhanos = option.matchingSpotIds.includes('baia-de-castelhanos');
    return `<div class="rounded-xl border border-black/10 bg-white p-3 space-y-2">
      <div class="text-xs font-bold text-primary">${destinationNames}</div>
      ${includesBonete ? `<p class="text-[11px] font-semibold text-tertiary">${t('plannerBoneteBoatPending')}</p>` : ''}
      ${includesCastelhanos ? `<p class="text-[11px] font-semibold text-tertiary">${t('plannerCastelhanosBoatPending')}</p>` : ''}
      <div class="grid gap-2">${providers}</div>
      <p class="text-[10px] text-on-surface-variant">${t('plannerBoatProviderHint')}</p>
    </div>`;
  }).join('');

  return `<div id="planner-maritime-options" class="rounded-2xl border border-black/10 bg-surface-container/40 p-4 space-y-3">
    <div>
      <h3 class="text-sm font-extrabold text-primary">${t('plannerBoatOptions')}</h3>
      <p class="text-xs text-on-surface-variant">${t('plannerBoatOptionsHint')}</p>
    </div>
    ${cards}
  </div>`;
}
