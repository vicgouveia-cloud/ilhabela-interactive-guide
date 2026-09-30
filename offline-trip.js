// Explicit, self-contained export: no service worker or automatic/catalog-wide cache.
function offlineEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
}

async function buildOfflineTrip(spots) {
  if (!spots.length || spots.length > 10) throw new Error('Trip limit');
  const language = currentLang;
  const mode = plannerTravelMode;
  const esc = offlineEscape;
  const specKeys = {distance: 'routeDistance', duration: 'routeDuration', elevation: 'routeElevation', access: 'accessType', sea: 'seaCondition', structure: 'infrastructure'};
  const specLabels = Object.fromEntries(Object.entries(specKeys).map(([key, label]) => [key, t(label)]));
  const title = t('plannerOfflineTitle');
  const copy = {
    pt: {ready:'Seu roteiro de Ilhabela está disponível sem internet.', mode:'Modo de deslocamento', online:'Mapas e navegação precisam de conexão com a internet.', generated:'Gerado em', day:'Dia', origin:'Origem planejada', returnOrigin:'Retorno à origem', yes:'Sim', no:'Não', noOrigin:'Não definida', imageMissing:'Foto indisponível no arquivo offline', access:'Como chegar'},
    en: {ready:'Your Ilhabela trip is available offline.', mode:'Travel mode', online:'Maps and navigation require an internet connection.', generated:'Generated on', day:'Day', origin:'Planned origin', returnOrigin:'Return to origin', yes:'Yes', no:'No', noOrigin:'Not set', imageMissing:'Photo unavailable in the offline file', access:'How to get there'},
    fr: {ready:'Votre itinéraire à Ilhabela est disponible hors ligne.', mode:'Mode de déplacement', online:'Les cartes et la navigation nécessitent une connexion Internet.', generated:'Généré le', day:'Jour', origin:'Origine prévue', returnOrigin:'Retour à l’origine', yes:'Oui', no:'Non', noOrigin:'Non définie', imageMissing:'Photo indisponible dans le fichier hors ligne', access:'Comment y arriver'},
    es: {ready:'Tu itinerario de Ilhabela está disponible sin conexión.', mode:'Modo de desplazamiento', online:'Los mapas y la navegación requieren conexión a Internet.', generated:'Generado el', day:'Día', origin:'Origen planificado', returnOrigin:'Regreso al origen', yes:'Sí', no:'No', noOrigin:'No definido', imageMissing:'Foto no disponible en el archivo sin conexión', access:'Cómo llegar'},
    he: {ready:'המסלול שלכם באיליאבלה זמין ללא חיבור לאינטרנט.', mode:'אופן ההתניידות', online:'מפות וניווט דורשים חיבור לאינטרנט.', generated:'נוצר בתאריך', day:'יום', origin:'נקודת מוצא מתוכננת', returnOrigin:'חזרה לנקודת המוצא', yes:'כן', no:'לא', noOrigin:'לא הוגדרה', imageMissing:'התמונה אינה זמינה בקובץ הלא מקוון', access:'איך מגיעים'}
  }[language] || {ready:'Your Ilhabela trip is available offline.', mode:'Travel mode', online:'Maps and navigation require an internet connection.', generated:'Generated on', day:'Day', origin:'Planned origin', returnOrigin:'Return to origin', yes:'Yes', no:'No', noOrigin:'Not set', imageMissing:'Photo unavailable in the offline file', access:'How to get there'};

  let bytes = 0;
  async function getOfflineImage(spot) {
    try {
      const url = new URL(spot.image, location.href);
      if (url.origin !== location.origin || !url.pathname.includes('/assets/images/')) return null;
      const response = await fetch(url, {signal: AbortSignal.timeout(15000)});
      if (!response.ok || !response.body) return null;
      const reader = response.body.getReader();
      const chunks = [];
      let imageBytes = 0;
      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        imageBytes += value.byteLength;
        if (bytes + imageBytes > 14 * 1024 * 1024) { await reader.cancel(); return null; }
        chunks.push(value);
      }
      const blob = new Blob(chunks, {type:(response.headers.get('content-type') || '').split(';')[0]});
      if (!/^image\/(jpeg|png|webp)$/.test(blob.type)) return null;
      bytes += imageBytes;
      return await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('[offline] image skipped', spot.id, error);
      return null;
    }
  }

  const days = [...new Set(spots.map(spot => getSpotTripDay(spot.id)))].sort((a,b) => a-b);
  const daySections = [];
  for (const day of days) {
    const daySpots = spots.filter(spot => getSpotTripDay(spot.id) === day);
    const origin = tripDayOrigins?.[day];
    const returnToOrigin = !!tripDayReturnToOrigin?.[day];
    const articles = [];
    for (const spot of daySpots) {
      const tr = getSpotTranslation(spot);
      const notice = plannerAccessNotice(spot);
      const access = resolvePlannerAccess(spot, mode);
      const image = await getOfflineImage(spot);
      const imageHtml = image ? `<img alt="${esc(tr.title)}" src="${image}">` : `<p class="muted">${esc(copy.imageMissing)}</p>`;
      const accessHtml = notice ? `<p><strong>${esc(copy.access)}:</strong> ${esc(notice)}</p>` : '';
      articles.push(`<article><h3>${esc(tr.title)}</h3><p>${esc(tr.subtitle)}</p>${imageHtml}<p>${esc(tr.description)}</p>${accessHtml}<p>${esc(spot.coords.join(', '))}${access?.finalMode ? ' ← ' + esc(access.coords.join(', ')) : ''}</p><dl>${Object.entries(tr.specs || {}).map(([key,value]) => `<dt>${esc(specLabels[key] || key)}</dt><dd>${esc(value)}</dd>`).join('')}</dl><p>${esc(tr.ecoTip)}</p></article>`);
    }
    daySections.push(`<section><h2>${esc(copy.day)} ${day}</h2><div class="day-meta"><p><strong>${esc(copy.origin)}:</strong> ${esc(Array.isArray(origin) ? origin.join(', ') : copy.noOrigin)}</p><p><strong>${esc(copy.returnOrigin)}:</strong> ${esc(returnToOrigin ? copy.yes : copy.no)}</p></div>${articles.join('')}</section>`);
  }

  const generatedAt = new Intl.DateTimeFormat(language === 'he' ? 'he-IL' : language === 'pt' ? 'pt-BR' : language, {dateStyle:'medium', timeStyle:'short'}).format(new Date());
  const html = `<!doctype html><html lang="${language}" dir="${language === 'he' ? 'rtl' : 'ltr'}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'"><title>${esc(title)}</title><style>body{font:17px system-ui;max-width:760px;margin:auto;padding:24px;color:#003345;background:#faf7f0}section{border-top:2px solid;padding-top:18px;margin-top:28px}article{border-top:1px solid;padding:20px 0}img{max-width:100%;max-height:400px}dt{font-weight:bold}dd{margin:0 0 12px}.day-meta,.muted{color:#52656b}</style><h1>${esc(title)}</h1><p>${esc(copy.ready)}</p><p><strong>${esc(copy.generated)}:</strong> ${esc(generatedAt)}</p><p><strong>${esc(copy.mode)}:</strong> ${esc(getPlannerTravelModeLabel(mode))}</p><p>${esc(copy.online)}</p>${daySections.join('')}</html>`;
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
