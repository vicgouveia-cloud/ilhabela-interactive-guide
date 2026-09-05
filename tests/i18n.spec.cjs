const {test, expect} = require('@playwright/test');
const locales = ['pt','en','fr','es','he'];
const faults = new WeakMap();
test.beforeEach(async ({page}) => {
  const errors = []; faults.set(page, errors);
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if(message.type()==='error') errors.push(message.text()); });
});
async function ready(page) {
  await page.goto('/');
  await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(40);
  await expect(page.locator('.leaflet-marker-icon')).toHaveCount(40);
}
async function language(page, lang) {
  await page.locator('#lang-btn').click();
  await page.locator(`#language-menu button[onclick="setLanguage('${lang}')"]`).click();
  await expect(page.locator('#language-menu')).toBeHidden();
  await expect(page.locator('html')).toHaveAttribute('lang',lang);
  await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
}
for (const width of [390,1440]) for (const lang of locales) {
  test(`${lang} at ${width}px: every attraction, services, map and locale persistence`, async ({page}, info) => {
    await page.setViewportSize({width,height:900});
    await ready(page); await language(page,lang);
    expect(await page.evaluate(()=>localStorage.getItem('ilhabela_lang'))).toBe(lang);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang',lang);
    await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(40);
    const untranslated = await page.evaluate(() => {
      const mismatches = [];
      for (const el of document.querySelectorAll('[data-i18n]')) if (el.textContent !== t(el.dataset.i18n)) mismatches.push(el.dataset.i18n);
      for (const attr of ['placeholder','aria-label','title','alt']) for (const el of document.querySelectorAll(`[data-i18n-${attr}]`)) if (el.getAttribute(attr) !== t(el.getAttribute(`data-i18n-${attr}`))) mismatches.push(attr);
      return mismatches;
    });
    expect(untranslated).toEqual([]);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true);
    const data = await page.evaluate(()=>({spots:touristSpots.map(s=>({id:s.id,tr:getSpotTranslation(s)})),ui:translations[currentLang]}));
    for (const spot of data.spots) {
      await page.evaluate(id=>openSpotModal(id),spot.id);
      await expect(page.locator('#spot-modal-title')).toHaveText(spot.tr.title);
      const text=await page.locator('#spot-modal-content').textContent();
      for (const value of [spot.tr.description,spot.tr.ecoTip,...spot.tr.highlights,...Object.values(spot.tr.specs)]) expect(text).toContain(value);
      expect(text).toContain(data.ui.technicalSpecs);
      expect(text).toContain(data.ui.bookThisTour);
      expect(text).not.toMatch(/undefined|\[object Object\]|Missing translation/);
      const overflow=await page.locator('#spot-modal .modal-sheet').evaluate(el=>el.scrollWidth>el.clientWidth+1);
      expect(overflow,spot.id+' modal overflow').toBe(false);
    }
    await page.evaluate(()=>openSpotModal('praia-do-portinho'));
    for(const name of ['Portinho Passeios','Quiosque Maxx Beach','Portinho Divers','La Gloria House']) await expect(page.locator('#spot-modal-content')).toContainText(name);
    await expect(page.locator('#spot-modal-content a[href^="https://wa.me/"]')).toHaveCount(4);
    const localCopy = await page.evaluate(()=>Object.entries(localRecommendationTranslations).filter(([name])=>name!=='Chagas Passeios').flatMap(([,catalog])=>Object.values(catalog[currentLang]).flat()));
    const localText = await page.locator('#spot-modal-content').textContent();
    for(const value of localCopy) expect(localText).toContain(value);
    await page.screenshot({path:info.outputPath(`portinho-${lang}-${width}.png`)});
    await page.evaluate(()=>openSpotModal('praia-do-veloso'));
    await expect(page.locator('#spot-modal-content')).toContainText('Chagas Passeios');
    const chagas = await page.evaluate(()=>Object.values(localRecommendationTranslations['Chagas Passeios'][currentLang]).flat());
    const velosoText = await page.locator('#spot-modal-content').textContent();
    for(const value of chagas) expect(velosoText).toContain(value);
    await page.evaluate(()=>closeSpotModal());
    await page.evaluate(()=>showMapQuickCard(touristSpots[0]));
    await expect(page.locator('#map-quick-card')).toContainText(data.spots[0].tr.title);
    await page.evaluate(()=>switchMapLayer('topo'));
    expect(await page.evaluate(()=>map.hasLayer(mapLayers.topo))).toBe(true);
    await page.evaluate(()=>resetMapView());
    await expect(page.locator('#map-quick-card')).toBeHidden();
    expect(faults.get(page)).toEqual([]);
  });
}
test('dropdown click, hover, outside click, Escape and keyboard focus',async({page})=>{
  await ready(page);
  const menu=page.locator('#language-menu'),button=page.locator('#lang-btn');
  await button.hover();await expect(menu).toBeHidden();
  await button.click();await expect(menu).toBeVisible();
  await button.click();await expect(menu).toBeHidden();
  await button.click();await page.locator('h1').click();await expect(menu).toBeHidden();
  await button.click();await page.keyboard.press('Escape');await expect(menu).toBeHidden();await expect(button).toBeFocused();
  await page.keyboard.press('Enter');await expect(menu).toBeVisible();
  await page.keyboard.press('Tab');await page.keyboard.press('Enter');await expect(menu).toBeHidden();
  await expect(button).toHaveAttribute('aria-expanded','false');
  await page.evaluate(()=>showMapQuickCard(touristSpots[0]));
  await language(page,'he');
  await expect(page.locator('#map-quick-card')).toContainText(await page.evaluate(()=>getSpotTranslation(touristSpots[0]).title));
  expect(faults.get(page)).toEqual([]);
});
test('small mobile and tablet layouts, including RTL category scrolling',async({page})=>{
  await ready(page);
  for(const width of [320,768,1024]) {
    await page.setViewportSize({width,height:900});
    for(const lang of locales) {
      await language(page,lang);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1),`${lang} ${width}`).toBe(true);
      await page.locator('#lang-btn').click();
      const box = await page.locator('#language-menu').boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(width);
      await page.keyboard.press('Escape');
    }
  }
  await page.setViewportSize({width:390,height:900});
  await page.evaluate(()=>{const el=document.getElementById('category-filter-list');el.scrollLeft=0;el.dispatchEvent(new Event('scroll'));});
  await page.locator('[data-filter-scroll="right"]').click();
  await expect.poll(()=>page.locator('#category-filter-list').evaluate(el=>Math.abs(el.scrollLeft))).toBeGreaterThan(10);
  expect(faults.get(page)).toEqual([]);
});
test('open modal language switches preserve gallery, booking choices and drafts',async({page})=>{
  await ready(page);
  await page.locator('#spots-grid .glass-card').first().click();
  await page.evaluate(()=>setModalImage(1));
  for(const lang of locales){
    await page.locator('#spot-modal [data-language-select]').selectOption(lang);
    expect(await page.evaluate(()=>currentModalImageIndex)).toBe(1);
    await expect(page.locator('#spot-modal-title')).toHaveText(await page.evaluate(()=>getSpotTranslation(touristSpots[0]).title));
  }
  await page.locator('#spot-modal button[onclick*="openBookingForSpot"]').click();
  await expect(page.locator('#booking-tour')).toHaveValue('praia-do-bonete');
  await page.locator('#booking-guide').selectOption('guide-marina-silva');
  await page.locator('#booking-shift').selectOption('Dia Inteiro');
  await page.locator('#booking-notes').fill('Family request');
  for(const lang of locales){
    await page.locator('#booking-modal [data-language-select]').selectOption(lang);
    await expect(page.locator('#booking-guide')).toHaveValue('guide-marina-silva');
    await expect(page.locator('#booking-tour')).toHaveValue('praia-do-bonete');
    await expect(page.locator('#booking-notes')).toHaveValue('Family request');
    const result=await page.evaluate(()=>{
      let url;const previous=window.open;window.open=value=>{url=value;};
      submitBooking({preventDefault(){}});window.open=previous;openBookingModal();
      return {url,shift:document.getElementById('booking-shift').selectedOptions[0].textContent,heading:t('bookingRequest')};
    });
    const message=new URL(result.url).searchParams.get('text');
    expect(message).toContain(result.heading);expect(message).toContain(result.shift);expect(message).toContain('Family request');
  }
  await page.keyboard.press('Escape');
  await language(page,'en');
  await expect(page.locator('#spot-modal')).toBeHidden();
  expect(faults.get(page)).toEqual([]);
});
test('favorites and filters survive language change and storage reload',async({page})=>{
  await ready(page);
  await page.locator('#spots-grid button[onclick^="toggleFavorite"]').first().click();
  await page.locator('#btn-saved-counter').click();
  await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(1);
  await language(page,'fr');
  await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(1);
  await expect(page.locator('.leaflet-marker-icon')).toHaveCount(1);
  await page.locator('#spots-grid button[onclick^="toggleFavorite"]').first().click();
  await expect(page.locator('.leaflet-marker-icon')).toHaveCount(0);
  await page.evaluate(()=>toggleFavorite('praia-do-bonete'));
  await page.reload();await expect(page.locator('#saved-count')).toHaveText('1');
  await page.evaluate(()=>filterCategory('cachoeiras'));
  await language(page,'es');
  await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(7);
  await expect(page.locator('.leaflet-marker-icon')).toHaveCount(7);
  await page.evaluate(()=>filterCategory('all'));
  await page.locator('#search-input').fill('Jabaquara');
  await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(1);
  expect(faults.get(page)).toEqual([]);
});
test('invalid and unavailable localStorage do not prevent initialization',async({page})=>{
  await page.addInitScript(()=>{localStorage.setItem('ilhabela_lang','__proto__');localStorage.setItem('ilhabela_saved','{bad json');});
  await ready(page);await expect(page.locator('html')).toHaveAttribute('lang','pt');
  expect(faults.get(page)).toEqual([]);
  await page.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error('blocked');};Storage.prototype.setItem=()=>{throw new Error('blocked');};});
  await ready(page);await language(page,'he');
  expect(faults.get(page)).toEqual([]);
});
