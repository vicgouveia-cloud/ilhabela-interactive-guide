// Explicit, self-contained export: no service worker or automatic/catalog-wide cache.
function offlineEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
}

async function buildOfflineTrip(spots) {
  if (!spots.length || spots.length > 10) throw new Error('Trip limit');
  const language = currentLang;
  const mode = plannerTravelMode;
  const specKeys = {distance: 'routeDistance', duration: 'routeDuration', elevation: 'routeElevation', access: 'accessType', sea: 'seaCondition', structure: 'infrastructure'};
  const specLabels = Object.fromEntries(Object.entries(specKeys).map(([key, label]) => [key, t(label)]));
  const title = t('plannerOfflineTitle'), hint = t('plannerOfflineHint');
  const snapshots = spots.map(spot => ({
    spot, tr: getSpotTranslation(spot), notice: plannerAccessNotice(spot),
    access: resolvePlannerAccess(spot, mode)
  }));
  let bytes = 0;
  const sections = [];
  for (const {spot, tr, notice, access} of snapshots) {
    const url = new URL(spot.image, location.href);
    if (url.origin !== location.origin || !url.pathname.includes('/assets/images/')) throw new Error('Image must be local');
    const response = await fetch(url, {signal: AbortSignal.timeout(15000)});
    if (!response.ok) throw new Error('Image unavailable');
    const reader = response.body.getReader();
    const chunks = [];
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      // Base64 expansion is included in the final 20 MB budget.
      if (bytes > 14 * 1024 * 1024) { await reader.cancel(); throw new Error('Image budget exceeded'); }
      chunks.push(value);
    }
    const blob = new Blob(chunks, {type: (response.headers.get('content-type') || '').split(';')[0]});
    if (!/^image\/(jpeg|png|webp)$/.test(blob.type)) throw new Error('Unsupported image');
    const image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    const esc = offlineEscape;
    sections.push(`<article><h2>${esc(tr.title)}</h2><p>${esc(tr.subtitle)}</p><img alt="${esc(tr.title)}" src="${image}"><p>${esc(tr.description)}</p><p>${esc(notice)}</p><p>${esc(spot.coords.join(', '))}${access?.finalMode ? ' ← ' + esc(access.coords.join(', ')) : ''}</p><dl>${Object.entries(tr.specs).map(([key,value]) => `<dt>${esc(specLabels[key] || key)}</dt><dd>${esc(value)}</dd>`).join('')}</dl><p>${esc(tr.ecoTip)}</p></article>`);
  }
  const html = `<!doctype html><html lang="${language}" dir="${language === 'he' ? 'rtl' : 'ltr'}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'"><title>${offlineEscape(title)}</title><style>body{font:17px system-ui;max-width:760px;margin:auto;padding:24px;color:#003345;background:#faf7f0}article{border-top:1px solid;padding:20px 0}img{max-width:100%;max-height:400px}dt{font-weight:bold}dd{margin:0 0 12px}</style><h1>${offlineEscape(title)}</h1><p>${offlineEscape(hint)}</p><p>${new Date().toISOString()} · ${offlineEscape(getPlannerTravelModeLabel(mode))}</p>${sections.join('')}</html>`;
  const result = new Blob([html], {type:'text/html;charset=utf-8'});
  if (result.size > 20 * 1024 * 1024) throw new Error('File budget exceeded');
  return result;
}

let offlineDownloadBusy = false;
async function plannerDownloadOffline() {
  if (offlineDownloadBusy) return;
  offlineDownloadBusy = true;
  const button = document.querySelector('[onclick="plannerDownloadOffline()"]');
  if (button) button.disabled = true;
  try {
    const spots = tripSelection.map(id => touristSpots.find(spot => spot.id === id)).filter(Boolean);
    const blob = await buildOfflineTrip(spots);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'ilhabela-roteiro-offline.html'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (error) {
    console.warn('[offline] export failed', error);
    alert(t('plannerOfflineError'));
  } finally {
    offlineDownloadBusy = false;
    if (button) button.disabled = false;
  }
}
