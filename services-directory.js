(() => {
  const grid = document.getElementById('services-page-grid');
  const filters = document.getElementById('services-page-filters');
  const foodFilters = document.getElementById('services-food-filters');
  if (!grid || !filters) return;

  let category = 'all';
  let directoryLocation = null;
  let locationNoteState = null;
  let locationRequestId = 0;
  let practicalFilter = 'all';
  let tourFilter = 'all';
  const foodFilterState = { type: 'all', format: 'all', specialty: 'all', occasion: 'all' };
  let filterFocusTarget = null;
  const resetCategoryFilters = () => {
    Object.keys(foodFilterState).forEach(key => { foodFilterState[key] = 'all'; });
  };

  const validCoords = coords => Array.isArray(coords)
    && Number.isFinite(coords[0]) && coords[0] >= -90 && coords[0] <= 90
    && Number.isFinite(coords[1]) && coords[1] >= -180 && coords[1] <= 180;
  const getSpotCoords = spot => {
    if (!spot) return null;
    if (validCoords(spot.coords)) return spot.coords;
    const latLng = [spot.lat, spot.lng];
    if (validCoords(latLng)) return latLng;
    const latitudeLongitude = [spot.latitude, spot.longitude];
    if (validCoords(latitudeLongitude)) return latitudeLongitude;
    return null;
  };
  const serviceCoords = service => {
    const ref = service.baseLocation?.spotId || service.baseLocation?.nearSpotId || service.contextSpotIds?.[0];
    return getSpotCoords(touristSpots.find(spot => spot.id === ref));
  };
  const distanceKm = (a, b) => {
    const toRad = value => value * Math.PI / 180, R = 6371;
    const dLat = toRad(b[0] - a[0]), dLon = toRad(b[1] - a[1]);
    const value = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(value));
  };
  const mapUrl = service => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(service.baseLocation?.address ? `${service.name}, ${service.baseLocation.address}` : `${service.name} Ilhabela SP`);

  const labelFor = (dimension, id) => {
    const entry = serviceTaxonomy?.[dimension]?.[id];
    return entry?.[currentLang] || id;
  };
  const renderFoodFilters = () => {
    if (!foodFilters) return;
    const directoryLabels = {
      tourType: { pt: 'Tipo de passeio', en: 'Tour type', fr: 'Type d’excursion', es: 'Tipo de paseo', he: 'סוג סיור' },
      practicalType: { pt: 'Tipo de serviço', en: 'Service type', fr: 'Type de service', es: 'Tipo de servicio', he: 'סוג שירות' },
      all: { pt: 'Todos', en: 'All', fr: 'Tous', es: 'Todos', he: 'הכול' },
      transfer: { pt: 'Transfer / receptivo', en: 'Transfer / reception', fr: 'Transfert / accueil', es: 'Traslado / receptivo', he: 'הסעות / קבלה' },
      boatTour: { pt: 'Passeios de barco', en: 'Boat tours', fr: 'Excursions en bateau', es: 'Paseos en barco', he: 'סיורי סירה' },
      fourByFour: { pt: 'Passeios 4x4', en: '4x4 tours', fr: 'Excursions 4x4', es: 'Paseos 4x4', he: 'סיורי 4x4' },
      guidedHiking: { pt: 'Trilhas guiadas', en: 'Guided hikes', fr: 'Randonnées guidées', es: 'Senderismo guiado', he: 'טיולים רגליים מודרכים' },
      carRental: { pt: 'Aluguel de carro', en: 'Car rental', fr: 'Location de voiture', es: 'Alquiler de auto', he: 'השכרת רכב' },
      bikeRental: { pt: 'Aluguel de bicicleta', en: 'Bike rental', fr: 'Location de vélo', es: 'Alquiler de bicicleta', he: 'השכרת אופניים' },
      nauticalSupport: { pt: 'Apoio náutico', en: 'Nautical support', fr: 'Services nautiques', es: 'Apoyo náutico', he: 'שירותים ימיים' },
      marina: { pt: 'Marina', en: 'Marina', fr: 'Marina', es: 'Marina', he: 'מרינה' }
    };
    const dl = key => directoryLabels[key]?.[currentLang] || directoryLabels[key]?.pt || key;
    if (category === 'tour') {
      foodFilters.classList.remove('hidden');
      const tourOptions = [
        ['all', dl('all')],
        ['transfer', dl('transfer')],
        ['boat-tour', dl('boatTour')],
        ['4x4-tour', dl('fourByFour')],
        ['guided-hiking', dl('guidedHiking')]
      ];
      foodFilters.innerHTML = `<label class="flex flex-col gap-1 text-[11px] font-bold text-on-surface-variant"><span>${dl('tourType')}</span><select id="services-tour-filter" class="min-h-10 px-3 rounded-xl border border-black/10 bg-surface text-xs font-bold text-primary">${tourOptions.map(([id, label]) => `<option value="${id}"${id === tourFilter ? ' selected' : ''}>${label}</option>`).join('')}</select></label>`;
      document.getElementById('services-tour-filter')?.addEventListener('change', event => {
        tourFilter = event.target.value;
        filterFocusTarget = '#services-tour-filter';
        window.renderServicesPage();
      });
      return;
    }
    if (category === 'essentials') {
      foodFilters.classList.remove('hidden');
      const practicalOptions = [
        ['all', dl('all')],
        ['car-rental', dl('carRental')],
        ['bike-rental', dl('bikeRental')],
        ['nautical-support', dl('nauticalSupport')],
        ['marina', dl('marina')]
      ];
      foodFilters.innerHTML = `<label class="flex flex-col gap-1 text-[11px] font-bold text-on-surface-variant"><span>${dl('practicalType')}</span><select id="services-practical-filter" class="min-h-10 px-3 rounded-xl border border-black/10 bg-surface text-xs font-bold text-primary">${practicalOptions.map(([id, label]) => `<option value="${id}"${id === practicalFilter ? ' selected' : ''}>${label}</option>`).join('')}</select></label>`;
      document.getElementById('services-practical-filter')?.addEventListener('change', event => {
        practicalFilter = event.target.value;
        filterFocusTarget = '#services-practical-filter';
        window.renderServicesPage();
      });
      return;
    }
    if (category !== 'food') {
      foodFilters.classList.add('hidden');
      foodFilters.innerHTML = '';
      return;
    }

    foodFilters.classList.remove('hidden');
    const fields = [
      ['type', 'serviceType'],
      ['format', 'serviceFormats'],
      ['specialty', 'serviceSpecialties'],
      ['occasion', 'serviceOccasions']
    ];
    foodFilters.innerHTML = fields.map(([dimension, field]) => {
      const values = [...new Set(servicesData.filter(s => s.category === 'food').flatMap(s => s[field] || []))];
      const options = ['all', ...values].map(id => {
        const selected = id === foodFilterState[dimension] ? ' selected' : '';
        const text = id === 'all' ? serviceTaxonomy.labels.all[currentLang] : labelFor(dimension, id);
        return `<option value="${id}"${selected}>${text}</option>`;
      }).join('');
      return `<label class="flex flex-col gap-1 text-[11px] font-bold text-on-surface-variant"><span>${serviceTaxonomy.labels[dimension][currentLang]}</span><select data-service-food-filter="${dimension}" class="min-h-10 px-3 rounded-xl border border-black/10 bg-surface text-xs font-bold text-primary">${options}</select></label>`;
    }).join('');
    foodFilters.querySelectorAll('[data-service-food-filter]').forEach(select => {
      select.addEventListener('change', () => {
        foodFilterState[select.dataset.serviceFoodFilter] = select.value;
        filterFocusTarget = `[data-service-food-filter="${select.dataset.serviceFoodFilter}"]`;
        window.renderServicesPage();
      });
    });
  };

  const matchesFoodFilters = service => {
    if (service.category !== 'food') return true;
    return (
      (foodFilterState.type === 'all' || (service.serviceType || []).includes(foodFilterState.type)) &&
      (foodFilterState.format === 'all' || (service.serviceFormats || []).includes(foodFilterState.format)) &&
      (foodFilterState.specialty === 'all' || (service.serviceSpecialties || []).includes(foodFilterState.specialty)) &&
      (foodFilterState.occasion === 'all' || (service.serviceOccasions || []).includes(foodFilterState.occasion))
    );
  };

  const distanceLabels = {
    label: { pt: 'Distância:', en: 'Distance:', fr: 'Distance :', es: 'Distancia:', he: 'מרחק:' },
    all: { pt: 'Todos', en: 'All', fr: 'Tous', es: 'Todos', he: 'הכול' },
    upTo: { pt: 'Até', en: 'Up to', fr: 'Jusqu’à', es: 'Hasta', he: 'עד' }
  };
  const renderDistanceLabels = () => {
    const label = document.getElementById('services-distance-label');
    if (label) label.textContent = distanceLabels.label[currentLang] || distanceLabels.label.pt;
    const select = document.getElementById('services-distance');
    if (!select) return;
    [...select.options].forEach(option => {
      option.textContent = option.value === 'all'
        ? (distanceLabels.all[currentLang] || distanceLabels.all.pt)
        : `${distanceLabels.upTo[currentLang] || distanceLabels.upTo.pt} ${option.value} km`;
    });
  };

  const messages = {
    success: {
      pt: 'As distâncias são aproximadas, calculadas pela localização editorial de referência de cada serviço.',
      en: 'Distances are approximate, calculated from each service’s editorial reference location.',
      fr: 'Les distances sont approximatives et calculées à partir du lieu de référence éditorial de chaque service.',
      es: 'Las distancias son aproximadas y se calculan desde la ubicación editorial de referencia de cada servicio.',
      he: 'המרחקים משוערים ומחושבים לפי מיקום הייחוס העריכתי של כל שירות.'
    },
    error: {
      pt: 'Não foi possível acessar sua localização. Verifique a permissão do navegador e tente novamente.',
      en: 'Your location could not be accessed. Check your browser permission and try again.',
      fr: 'Impossible d’accéder à votre position. Vérifiez l’autorisation du navigateur et réessayez.',
      es: 'No fue posible acceder a tu ubicación. Verifica el permiso del navegador e inténtalo de nuevo.',
      he: 'לא ניתן לגשת למיקום שלך. יש לבדוק את הרשאת הדפדפן ולנסות שוב.'
    }
  };

  window.renderServicesPage = function renderServicesPage() {
    const categories = ['all', ...new Set(servicesData.map(service => service.category))];
    filters.innerHTML = categories.map(item => `<button type="button" data-service-page-category="${item}" aria-pressed="${item === category}" class="shrink-0 px-3.5 py-2 rounded-full border text-xs font-bold ${item === category ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-black/10'}">${getServiceCategoryLabel(item)}</button>`).join('');
    filters.querySelectorAll('[data-service-page-category]').forEach(button => button.addEventListener('click', () => {
      const nextCategory = button.dataset.servicePageCategory;
      if (nextCategory !== category || nextCategory === 'all') resetCategoryFilters();
      category = nextCategory;
      if (category !== 'essentials') practicalFilter = 'all';
      if (category !== 'tour') tourFilter = 'all';
      window.renderServicesPage();
    }));

    renderFoodFilters();
    renderDistanceLabels();
    if (filterFocusTarget) {
      const target = document.querySelector(filterFocusTarget);
      filterFocusTarget = null;
      target?.focus();
    }
    const locationNote = document.getElementById('services-location-note');
    if (locationNoteState && locationNote) {
      locationNote.textContent = messages[locationNoteState][currentLang] || messages[locationNoteState].pt;
      locationNote.classList.remove('hidden');
    }

    const limit = document.getElementById('services-distance')?.value || 'all';
    let rows = servicesData.map(service => {
      const coords = serviceCoords(service);
      return { service, distance: directoryLocation && coords ? distanceKm(directoryLocation, coords) : null };
    });
    if (category !== 'all') rows = rows.filter(row => row.service.category === category);
    rows = rows.filter(row => matchesFoodFilters(row.service));
    if (category === 'essentials' && practicalFilter !== 'all') {
      rows = rows.filter(row => (row.service.activities || []).includes(practicalFilter));
    }
    if (category === 'tour' && tourFilter !== 'all') {
      rows = rows.filter(row => {
        const activities = row.service.activities || [];
        const modes = row.service.serviceArea?.verifiedModes || [];
        return tourFilter === 'transfer'
          ? activities.includes('private-transfer') || activities.includes('airport-transfer') || modes.includes('transfer')
          : activities.includes(tourFilter);
      });
    }
    if (directoryLocation) {
      if (limit !== 'all') rows = rows.filter(row => row.distance !== null && row.distance <= Number(limit));
      rows.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
    }

    const status = document.getElementById('services-page-status');
    if (status) {
      const resultLabels = {
        pt: { one: 'serviço', other: 'serviços' },
        en: { one: 'service', other: 'services' },
        fr: { one: 'service', other: 'services' },
        es: { one: 'servicio', other: 'servicios' },
        he: { one: 'שירות', other: 'שירותים' }
      };
      const labels = resultLabels[currentLang] || resultLabels.pt;
      status.textContent = `${rows.length} ${rows.length === 1 ? labels.one : labels.other}`;
    }

    if (!rows.length) {
      const emptyMessages = {
        pt: 'Nenhum serviço encontrado com os filtros selecionados.',
        en: 'No services found with the selected filters.',
        fr: 'Aucun service trouvé avec les filtres sélectionnés.',
        es: 'No se encontraron servicios con los filtros seleccionados.',
        he: 'לא נמצאו שירותים התואמים למסננים שנבחרו.'
      };
      grid.innerHTML = `<div class="md:col-span-2 lg:col-span-3 rounded-2xl border border-black/5 bg-white p-6 text-sm text-on-surface-variant text-center">${emptyMessages[currentLang] || emptyMessages.pt}</div>`;
      return;
    }

    grid.innerHTML = rows.map(({ service, distance }) => {
      const tr = getServiceTranslation(service);
      const activityLabels = {
        'car-rental': { pt: 'Aluguel de carro', en: 'Car rental', fr: 'Location de voiture', es: 'Alquiler de auto', he: 'השכרת רכב' },
        'bike-rental': { pt: 'Aluguel de bicicleta', en: 'Bike rental', fr: 'Location de vélo', es: 'Alquiler de bicicleta', he: 'השכרת אופניים' },
        'airport-transfer': { pt: 'Transfer aeroporto', en: 'Airport transfer', fr: 'Transfert aéroport', es: 'Traslado al aeropuerto', he: 'הסעה משדה התעופה' },
        'private-transfer': { pt: 'Transfer privativo', en: 'Private transfer', fr: 'Transfert privé', es: 'Traslado privado', he: 'הסעה פרטית' },
        'nautical-support': { pt: 'Apoio náutico', en: 'Nautical support', fr: 'Services nautiques', es: 'Apoyo náutico', he: 'שירותים ימיים' },
        'marina': { pt: 'Marina', en: 'Marina', fr: 'Marina', es: 'Marina', he: 'מרינה' },
        'lodging': { pt: 'Hospedagem', en: 'Accommodation', fr: 'Hébergement', es: 'Alojamiento', he: 'אירוח' },
        'guided-hiking': { pt: 'Trilhas guiadas', en: 'Guided hikes', fr: 'Randonnées guidées', es: 'Senderismo guiado', he: 'טיולים רגליים מודרכים' },
        'trekking': { pt: 'Trekking', en: 'Trekking', fr: 'Trekking', es: 'Trekking', he: 'טרקים' },
        'waterfall-tour': { pt: 'Passeios a cachoeiras', en: 'Waterfall tours', fr: 'Excursions aux cascades', es: 'Paseos a cascadas', he: 'סיורי מפלים' },
        'birdwatching': { pt: 'Observação de aves', en: 'Birdwatching', fr: 'Observation des oiseaux', es: 'Observación de aves', he: 'צפרות' },
        'boat-tour': { pt: 'Passeios de barco', en: 'Boat tours', fr: 'Excursions en bateau', es: 'Paseos en barco', he: 'סיורי סירה' },
        '4x4-tour': { pt: 'Passeios 4x4', en: '4x4 tours', fr: 'Excursions 4x4', es: 'Paseos 4x4', he: 'סיורי 4x4' },
        'whale-watching': { pt: 'Observação de baleias', en: 'Whale watching', fr: 'Observation des baleines', es: 'Avistamiento de ballenas', he: 'צפייה בלווייתנים' },
        'caicara-canoe': { pt: 'Canoa caiçara', en: 'Caiçara canoe', fr: 'Canoë caiçara', es: 'Canoa caiçara', he: 'קאנו קאיסרה' },
        'introductory-dive': { pt: 'Batismo de mergulho', en: 'Introductory dive', fr: 'Baptême de plongée', es: 'Bautismo de buceo', he: 'צלילת היכרות' },
        'diving': { pt: 'Mergulho', en: 'Diving', fr: 'Plongée', es: 'Buceo', he: 'צלילה' },
        'diving-course': { pt: 'Curso de mergulho', en: 'Diving course', fr: 'Cours de plongée', es: 'Curso de buceo', he: 'קורס צלילה' },
        'equipment-rental': { pt: 'Aluguel de equipamentos', en: 'Equipment rental', fr: 'Location de matériel', es: 'Alquiler de equipos', he: 'השכרת ציוד' },
        'food': { pt: 'Comida', en: 'Food', fr: 'Cuisine', es: 'Comida', he: 'אוכל' },
        'drinks': { pt: 'Bebidas', en: 'Drinks', fr: 'Boissons', es: 'Bebidas', he: 'משקאות' },
        'snorkeling': { pt: 'Snorkeling', en: 'Snorkeling', fr: 'Snorkeling', es: 'Snorkel', he: 'שנורקלינג' }
      };
      const details = (tr.features || tr.tags || []).length
        ? (tr.features || tr.tags || [])
        : (service.activities || []).map(activity => activityLabels[activity]?.[currentLang]).filter(Boolean);
      const image = service.image ? `<img src="/${service.image.replace(/^\//, '')}" alt="${service.name}" class="w-full h-full object-cover" loading="lazy" decoding="async">` : `<div class="w-full h-full flex items-center justify-center bg-surface-container/70"><span class="material-symbols-outlined text-primary/35 text-5xl">${service.category === 'food' ? 'restaurant' : 'storefront'}</span></div>`;
      const whatsapp = service.whatsapp ? `<a href="https://wa.me/55${service.whatsapp}?text=${encodeURIComponent(t('localWhatsappMessage'))}" target="_blank" rel="noopener noreferrer" class="min-h-11 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">chat</span>WhatsApp</a>` : '';
      const phone = service.phone ? `<a href="tel:+55${service.phone}" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">call</span>${service.phoneDisplay || service.phone}</a>` : '';
      const website = service.url ? `<a href="${service.url}" target="_blank" rel="noopener noreferrer" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">language</span>${t('localWebsite')}</a>` : '';
      const instagram = service.instagram ? `<a href="https://www.instagram.com/${service.instagram.replace(/^@/, '')}/" target="_blank" rel="noopener noreferrer" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">photo_camera</span>Instagram</a>` : '';
      const featured = service.presentation === 'featured';
      const imageHeight = featured ? 'h-56' : 'h-28';
      const cardTitle = featured ? 'text-xl' : 'text-base';
      return `<article class="glass-card rounded-2xl overflow-hidden border border-black/5 shadow-sm flex flex-col ${featured ? 'md:col-span-2' : ''}"><div class="${imageHeight} relative overflow-hidden bg-surface-container">${image}<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-extrabold text-primary uppercase">${tr.type || getServiceCategoryLabel(service.category)}</span></div><div class="${featured ? 'p-5' : 'p-4'} flex flex-col flex-1 gap-2.5"><div><h2 class="${cardTitle} font-bold text-primary font-heading">${service.name}</h2>${distance !== null ? `<p class="text-xs font-bold text-secondary mt-1"><span class="material-symbols-outlined text-[14px] align-middle">near_me</span> ${distance.toFixed(1)} km</p>` : ''}</div><p class="text-xs text-on-surface-variant leading-relaxed">${tr.description}</p>${details.length ? `<div class="flex flex-wrap gap-1.5">${details.slice(0,4).map(item => `<span class="px-2 py-1 rounded-md bg-surface-container text-[10px] font-semibold text-on-surface-variant">${item}</span>`).join('')}</div>` : ''}<div class="grid grid-cols-2 gap-2 mt-auto pt-1"><a href="${mapUrl(service)}" target="_blank" rel="noopener noreferrer" class="col-span-2 min-h-11 px-3 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[17px]">map</span>Google Maps</a>${whatsapp}${phone}${website}${instagram}</div></div></article>`;
    }).join('');
  };

  document.getElementById('services-nearby')?.addEventListener('click', () => {
    const requestId = ++locationRequestId;
    const note = document.getElementById('services-location-note');
    const showLocationError = () => {
      if (requestId !== locationRequestId) return;
      directoryLocation = null;
      locationNoteState = 'error';
      const distanceSelect = document.getElementById('services-distance');
      if (distanceSelect) distanceSelect.value = 'all';
      document.getElementById('services-distance-wrap')?.classList.add('hidden');
      if (note) {
        note.textContent = messages.error[currentLang] || messages.error.pt;
        note.classList.remove('hidden');
      }
      window.renderServicesPage();
    };
    if (!navigator.geolocation) {
      showLocationError();
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      if (requestId !== locationRequestId) return;
      const nextLocation = [position.coords.latitude, position.coords.longitude];
      if (!validCoords(nextLocation)) {
        showLocationError();
        return;
      }
      directoryLocation = nextLocation;
      locationNoteState = 'success';
      document.getElementById('services-distance-wrap')?.classList.remove('hidden');
      if (note) {
        note.textContent = messages.success[currentLang] || messages.success.pt;
        note.classList.remove('hidden');
      }
      window.renderServicesPage();
    }, showLocationError);
  });
  document.getElementById('services-distance')?.addEventListener('change', () => window.renderServicesPage());
  window.renderServicesPage();
})();
