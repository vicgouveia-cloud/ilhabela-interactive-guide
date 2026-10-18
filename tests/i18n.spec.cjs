const {test, expect} = require('@playwright/test');
const locales = ['pt','en','fr','es','he'];
const faults = new WeakMap();
test.beforeEach(async ({page}) => {
  // Vercel supplies analytics in deployments; the static test server does not.
  await page.route('**/_vercel/insights/script.js', route=>route.fulfill({status:200,contentType:'application/javascript',body:''}));
  const errors = []; faults.set(page, errors);
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if(message.type()==='error') errors.push(message.text()); });
});
async function expectMapMarkers(page, count) {
  await expect.poll(()=>page.evaluate(()=>mapMarkers.length)).toBe(count);
  expect(await page.evaluate(()=>mapMarkers.every(m=>mapMarkerCluster ? mapMarkerCluster.hasLayer(m) : map.hasLayer(m)))).toBe(true);
  if(await page.evaluate(()=>Boolean(mapMarkerCluster))) {
    expect(await page.evaluate(()=>mapMarkerCluster.getLayers().length)).toBe(count);
  } else await expect(page.locator('.main-map-pin')).toHaveCount(count);
}
async function ready(page) {
  await page.goto('/');
  await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(50);
  await expectMapMarkers(page, 50);
}
async function language(page, lang) {
  await page.locator('#lang-btn').click();
  await page.locator(`#language-menu button[onclick="setLanguage('${lang}')"]`).click();
  await expect(page.locator('#language-menu')).toBeHidden();
  await expect(page.locator('html')).toHaveAttribute('lang',lang);
  await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
}
test('map quick preview dismisses on map actions and touch opens details directly',async({page})=>{
  await page.addInitScript(()=>{
    const nativeMatchMedia=window.matchMedia.bind(window);
    window.matchMedia=query=>query.includes('(hover: hover)')&&query.includes('(pointer: fine)')
      ? {matches:false,media:query,onchange:null,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){},dispatchEvent(){return false;}}
      : nativeMatchMedia(query);
  });
  await page.setViewportSize({width:390,height:844});
  await ready(page);
  const card=page.locator('#map-quick-card');
  await page.locator('.leaflet-marker-icon').first().dispatchEvent('mouseover');
  await expect(card).toBeHidden();
  await page.evaluate(()=>mapMarkers[0].fire('click'));
  await expect(page.locator('#spot-modal')).toBeVisible();
  await expect(card).toBeHidden();
  await page.evaluate(()=>closeSpotModal());

  await page.evaluate(()=>showMapQuickCard(touristSpots[0]));
  await expect(card).toBeVisible();
  expect(await card.evaluate(el=>getComputedStyle(el).pointerEvents)).toBe('none');
  await page.evaluate(()=>map.fire('click'));
  await expect(card).toBeHidden();
  await page.evaluate(()=>showMapQuickCard(touristSpots[0]));
  await page.locator('#map-quick-card button[aria-label]').click();
  await expect(card).toBeHidden();
  await page.evaluate(()=>showMapQuickCard(touristSpots[0]));
  await page.locator('.map-frame').dispatchEvent('pointerleave');
  await expect(card).toBeHidden();
  await page.evaluate(()=>showMapQuickCard(touristSpots[0]));
  await page.keyboard.press('Escape');
  await expect(card).toBeHidden();
});
test('desktop map preview closes when the pointer leaves the map',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await ready(page);
  const card=page.locator('#map-quick-card');
  await page.evaluate(()=>map.setView(mapMarkers[0].getLatLng(),16,{animate:false}));
  await page.locator('#pin-praia-do-bonete').hover();
  await expect(card).toBeVisible();
  await page.locator('#explore-section').hover();
  await expect(card).toBeHidden();
});
for (const width of [390,1440]) for (const lang of locales) {
  test(`${lang} at ${width}px: every attraction, services, map and locale persistence`, async ({page}, info) => {
    await page.setViewportSize({width,height:900});
    await ready(page); await language(page,lang);
    expect(await page.evaluate(()=>localStorage.getItem('ilhabela_lang'))).toBe(lang);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang',lang);
    await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(50);
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
      for (const value of [spot.tr.description,spot.tr.ecoTip,...spot.tr.highlights,...Object.entries(spot.tr.specs).filter(([key])=>['access','sea','structure'].includes(key)).map(([,value])=>value)]) expect(text).toContain(value);
      expect(text).toContain(data.ui.technicalSpecs);
      expect(text).toContain(data.ui.bookThisTour);
      expect(text).not.toMatch(/undefined|\[object Object\]|Missing translation/);
      const overflow=await page.locator('#spot-modal .modal-sheet').evaluate(el=>el.scrollWidth>el.clientWidth+1);
      expect(overflow,spot.id+' modal overflow').toBe(false);
    }
    // Exact membership for every attraction, including empty contexts.
    for(const spot of data.spots) {
      await page.evaluate(id=>openSpotModal(id),spot.id);
      const expected=await page.evaluate(id=>servicesData.filter(s=>s.contextSpotIds?.includes(id)).map(s=>({name:s.name,tr:s.translations[currentLang],image:s.image,url:s.url,whatsapp:s.whatsapp})),spot.id);
      const articles=page.locator('#spot-modal-content article');
      await expect(articles.locator('h4')).toHaveText(expected.map(s=>s.name));
      for(const service of expected) {
        const article=articles.filter({has:page.getByRole('heading',{name:service.name,exact:true})});
        await expect(article).toHaveCount(1);
        for(const value of Object.values(service.tr).flat()) await expect(article).toContainText(value);
        if(service.image) await expect(article.locator('img')).toHaveAttribute('src',service.image);
        if(service.url) await expect(article.locator('a[href="'+service.url+'"]')).toHaveCount(1);
        const whatsapp=article.locator('a[href^="https://wa.me/"]');
        await expect(whatsapp).toHaveCount(service.whatsapp?1:0);
        if(service.whatsapp) {
          const url=new URL(await whatsapp.getAttribute('href'));
          expect(url.pathname).toBe('/55'+service.whatsapp);
          expect(url.searchParams.get('text')).toBe(data.ui.localWhatsappMessage);
        }
      }
      if(spot.id==='praia-do-portinho') await page.screenshot({path:info.outputPath('portinho-'+lang+'-'+width+'.png')});
    }
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
  for (const lang of ['pt','he']) {
    await page.evaluate(lang=>setLanguage(lang),lang);
    for(const width of [390,1024]) {
      await page.setViewportSize({width,height:900});
      const track=page.locator('#category-filter-list');
      await track.scrollIntoViewIfNeeded();
      await track.evaluate(el=>{el.style.scrollBehavior='auto';el.scrollLeft=0;el.dispatchEvent(new Event('scroll'));});
      const next=page.locator('[data-filter-scroll="right"]');
      if(width===390) {
        await expect(next).toBeHidden();
        // A horizontal wheel gesture exercises the native overflow rail in both directions.
        await track.hover();
        await page.mouse.wheel(lang==='he'?-280:280,0);
      } else {
        await expect(next).toBeVisible();
        await expect(next).toBeEnabled();
        await next.click();
      }
      await expect.poll(()=>track.evaluate(el=>Math.abs(el.scrollLeft))).toBeGreaterThan(10);
      await expect(page.locator('.cat-pill').last()).toBeAttached();
    }
  }
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
  await expectMapMarkers(page, 1);
  await page.locator('#spots-grid button[onclick^="toggleFavorite"]').first().click();
  await expectMapMarkers(page, 0);
  await page.evaluate(()=>toggleFavorite('praia-do-bonete'));
  await page.reload();await expect(page.locator('#saved-count')).toHaveText('1');
  await page.evaluate(()=>filterCategory('cachoeiras'));
  await language(page,'es');
  await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(9);
  await expectMapMarkers(page, 9);
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
