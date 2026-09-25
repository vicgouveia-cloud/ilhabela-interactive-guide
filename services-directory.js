(() => {
  const grid = document.getElementById('services-page-grid');
  const filters = document.getElementById('services-page-filters');
  const foodFilters = document.getElementById('services-food-filters');
  if (!grid || !filters) return;

  let category = 'all';
  let directoryLocation = null;
  let practicalFilter = 'all';
  let tourFilter = 'all';
  const foodFilterState = { type: 'all', format: 'all', specialty: 'all', occasion: 'all' };
  const resetCategoryFilters = () => {
    Object.keys(foodFilterState).forEach(key => { foodFilterState[key] = 'all'; });
  };

  const getSpotCoords = spot => {
    if (!spot) return null;
    if (Array.isArray(spot.coords)) return spot.coords;
    if (Number.isFinite(spot.lat) && Number.isFinite(spot.lng)) return [spot.lat, spot.lng];
    if (Number.isFinite(spot.latitude) && Number.isFinite(spot.longitude)) return [spot.latitude, spot.longitude];
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
  const mapUrl = service => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(service.name + (service.serviceArea?.scope === 'regional' ? ' São Sebastião SP' : ' Ilhabela SP'));

  const labelFor = (dimension, id) => {
    const entry = serviceTaxonomy?.[dimension]?.[id];
    return entry?.[currentLang] || id;
  };
  const renderFoodFilters = () => {
    if (!foodFilters) return;
    if (category === 'tour') {
      foodFilters.classList.remove('hidden');
      const tourOptions = [
        ['all', 'Todos'],
        ['transfer', 'Transfer / receptivo'],
        ['boat-tour', 'Passeios de barco'],
        ['4x4-tour', 'Passeios 4x4'],
        ['guided-hiking', 'Trilhas guiadas']
      ];
      foodFilters.innerHTML = `<label class="flex flex-col gap-1 text-[11px] font-bold text-on-surface-variant"><span>Tipo de passeio</span><select id="services-tour-filter" class="min-h-10 px-3 rounded-xl border border-black/10 bg-surface text-xs font-bold text-primary">${tourOptions.map(([id, label]) => `<option value="${id}"${id === tourFilter ? ' selected' : ''}>${label}</option>`).join('')}</select></label>`;
      document.getElementById('services-tour-filter')?.addEventListener('change', event => {
        tourFilter = event.target.value;
        window.renderServicesPage();
      });
      return;
    }
    if (category === 'essentials') {
      foodFilters.classList.remove('hidden');
      const practicalOptions = [
        ['all', 'Todos'],
        ['car-rental', 'Aluguel de carro'],
        ['bike-rental', 'Aluguel de bicicleta'],
        ['nautical-support', 'Apoio náutico']
      ];
      foodFilters.innerHTML = `<label class="flex flex-col gap-1 text-[11px] font-bold text-on-surface-variant"><span>Tipo de serviço</span><select id="services-practical-filter" class="min-h-10 px-3 rounded-xl border border-black/10 bg-surface text-xs font-bold text-primary">${practicalOptions.map(([id, label]) => `<option value="${id}"${id === practicalFilter ? ' selected' : ''}>${label}</option>`).join('')}</select></label>`;
      document.getElementById('services-practical-filter')?.addEventListener('change', event => {
        practicalFilter = event.target.value;
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

  window.renderServicesPage = function renderServicesPage() {
    const categories = ['all', ...new Set(servicesData.map(service => service.category))];
    filters.innerHTML = categories.map(item => `<button type="button" data-service-page-category="${item}" class="shrink-0 px-3.5 py-2 rounded-full border text-xs font-bold ${item === category ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-black/10'}">${getServiceCategoryLabel(item)}</button>`).join('');
    filters.querySelectorAll('[data-service-page-category]').forEach(button => button.addEventListener('click', () => {
      const nextCategory = button.dataset.servicePageCategory;
      if (nextCategory !== category || nextCategory === 'all') resetCategoryFilters();
      category = nextCategory;
      if (category !== 'essentials') practicalFilter = 'all';
      if (category !== 'tour') tourFilter = 'all';
      window.renderServicesPage();
    }));

    renderFoodFilters();

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
    if (status) status.textContent = `${rows.length} ${t('navServices').toLowerCase()}`;

    grid.innerHTML = rows.map(({ service, distance }) => {
      const tr = getServiceTranslation(service);
      const activityLabels = {
        'car-rental': 'Aluguel de carro',
        'bike-rental': 'Aluguel de bicicleta',
        'airport-transfer': 'Transfer aeroporto',
        'private-transfer': 'Transfer privativo',
        'nautical-support': 'Apoio náutico',
        'marina': 'Marina',
        'lodging': 'Hospedagem'
      };
      const details = (tr.features || tr.tags || []).length
        ? (tr.features || tr.tags || [])
        : (service.activities || []).map(activity => activityLabels[activity]).filter(Boolean);
      const image = service.image ? `<img src="/${service.image.replace(/^\//, '')}" alt="${service.name}" class="w-full h-full object-cover" loading="lazy" decoding="async">` : `<div class="w-full h-full flex items-center justify-center bg-surface-container/70"><span class="material-symbols-outlined text-primary/35 text-5xl">${service.category === 'food' ? 'restaurant' : 'storefront'}</span></div>`;
      const whatsapp = service.whatsapp ? `<a href="https://wa.me/55${service.whatsapp}?text=${encodeURIComponent(t('localWhatsappMessage'))}" target="_blank" rel="noopener noreferrer" class="min-h-11 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">chat</span>WhatsApp</a>` : '';
      const phone = service.phone ? `<a href="tel:+55${service.phone}" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">call</span>${service.phoneDisplay || service.phone}</a>` : '';
      const website = service.url ? `<a href="${service.url}" target="_blank" rel="noopener noreferrer" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">language</span>${t('localWebsite')}</a>` : '';
      const featured = service.presentation === 'featured';
      const imageHeight = featured ? 'h-56' : 'h-28';
      const cardTitle = featured ? 'text-xl' : 'text-base';
      return `<article class="glass-card rounded-2xl overflow-hidden border border-black/5 shadow-sm flex flex-col ${featured ? 'md:col-span-2' : ''}"><div class="${imageHeight} relative overflow-hidden bg-surface-container">${image}<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-extrabold text-primary uppercase">${tr.type || getServiceCategoryLabel(service.category)}</span></div><div class="${featured ? 'p-5' : 'p-4'} flex flex-col flex-1 gap-2.5"><div><h2 class="${cardTitle} font-bold text-primary font-heading">${service.name}</h2>${distance !== null ? `<p class="text-xs font-bold text-secondary mt-1"><span class="material-symbols-outlined text-[14px] align-middle">near_me</span> ${distance.toFixed(1)} km</p>` : ''}</div><p class="text-xs text-on-surface-variant leading-relaxed">${tr.description}</p>${details.length ? `<div class="flex flex-wrap gap-1.5">${details.slice(0,4).map(item => `<span class="px-2 py-1 rounded-md bg-surface-container text-[10px] font-semibold text-on-surface-variant">${item}</span>`).join('')}</div>` : ''}<div class="grid grid-cols-2 gap-2 mt-auto pt-1"><a href="${mapUrl(service)}" target="_blank" rel="noopener noreferrer" class="col-span-2 min-h-11 px-3 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[17px]">map</span>Google Maps</a>${whatsapp}${phone}${website}</div></div></article>`;
    }).join('');
  };

  document.getElementById('services-nearby')?.addEventListener('click', () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(position => {
      directoryLocation = [position.coords.latitude, position.coords.longitude];
      document.getElementById('services-distance-wrap')?.classList.remove('hidden');
      document.getElementById('services-location-note')?.classList.remove('hidden');
      window.renderServicesPage();
    });
  });
  document.getElementById('services-distance')?.addEventListener('change', () => window.renderServicesPage());
  window.renderServicesPage();
})();
