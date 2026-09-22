(() => {
  const grid = document.getElementById('services-page-grid');
  const filters = document.getElementById('services-page-filters');
  if (!grid || !filters) return;

  let category = 'all';
  let directoryLocation = null;

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
  const mapUrl = service => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(service.name + ' Ilhabela SP');

  window.renderServicesPage = function renderServicesPage() {
    const categories = ['all', ...new Set(servicesData.map(service => service.category))];
    filters.innerHTML = categories.map(item => `<button type="button" data-service-page-category="${item}" class="shrink-0 px-3.5 py-2 rounded-full border text-xs font-bold ${item === category ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-black/10'}">${getServiceCategoryLabel(item)}</button>`).join('');
    filters.querySelectorAll('[data-service-page-category]').forEach(button => button.addEventListener('click', () => { category = button.dataset.servicePageCategory; window.renderServicesPage(); }));

    const limit = document.getElementById('services-distance')?.value || 'all';
    let rows = servicesData.map(service => {
      const coords = serviceCoords(service);
      return { service, distance: directoryLocation && coords ? distanceKm(directoryLocation, coords) : null };
    });
    if (category !== 'all') rows = rows.filter(row => row.service.category === category);
    if (directoryLocation) {
      if (limit !== 'all') rows = rows.filter(row => row.distance !== null && row.distance <= Number(limit));
      rows.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
    }

    const status = document.getElementById('services-page-status');
    if (status) status.textContent = `${rows.length} ${t('navServices').toLowerCase()}`;
    grid.innerHTML = rows.map(({ service, distance }) => {
      const tr = getServiceTranslation(service);
      const details = tr.features || tr.tags || [];
      const image = service.image ? `<img src="/${service.image.replace(/^\//, '')}" alt="${service.name}" class="w-full h-full object-cover" loading="lazy" decoding="async">` : `<div class="w-full h-full flex items-center justify-center bg-surface-container/70"><span class="material-symbols-outlined text-primary/35 text-5xl">${service.category === 'food' ? 'restaurant' : 'storefront'}</span></div>`;
      const whatsapp = service.whatsapp ? `<a href="https://wa.me/55${service.whatsapp}?text=${encodeURIComponent(t('localWhatsappMessage'))}" target="_blank" rel="noopener noreferrer" class="min-h-11 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">chat</span>WhatsApp</a>` : '';
      const phone = service.phone ? `<a href="tel:+55${service.phone}" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">call</span>${service.phoneDisplay || service.phone}</a>` : '';
      const website = service.url ? `<a href="${service.url}" target="_blank" rel="noopener noreferrer" class="min-h-11 px-3 rounded-xl border border-black/10 text-primary text-xs font-bold flex items-center justify-center gap-1"><span class="material-symbols-outlined text-[16px]">language</span>${t('localWebsite')}</a>` : '';
      return `<article class="glass-card rounded-2xl overflow-hidden border border-black/5 shadow-sm flex flex-col"><div class="h-40 relative overflow-hidden bg-surface-container">${image}<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-extrabold text-primary uppercase">${tr.type || getServiceCategoryLabel(service.category)}</span></div><div class="p-4 flex flex-col flex-1 gap-3"><div><h2 class="text-lg font-bold text-primary font-heading">${service.name}</h2>${distance !== null ? `<p class="text-xs font-bold text-secondary mt-1"><span class="material-symbols-outlined text-[14px] align-middle">near_me</span> ${distance.toFixed(1)} km</p>` : ''}</div><p class="text-xs text-on-surface-variant leading-relaxed">${tr.description}</p>${details.length ? `<div class="flex flex-wrap gap-1.5">${details.slice(0,4).map(item => `<span class="px-2 py-1 rounded-md bg-surface-container text-[10px] font-semibold text-on-surface-variant">${item}</span>`).join('')}</div>` : ''}<div class="grid grid-cols-2 gap-2 mt-auto pt-1"><a href="${mapUrl(service)}" target="_blank" rel="noopener noreferrer" class="col-span-2 min-h-11 px-3 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[17px]">map</span>Google Maps</a>${whatsapp}${phone}${website}</div></div></article>`;
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