const { test, expect } = require('@playwright/test');
const locales = ['pt', 'en', 'es', 'fr', 'he'];
test.setTimeout(60000);
const names = {
  pt: ['Escolher lugares', 'Minha viagem', 'Escolher mais lugares'],
  en: ['Choose places', 'My trip', 'Choose more places'],
  es: ['Elegir lugares', 'Mi viaje', 'Elegir más lugares'],
  fr: ['Choisir des lieux', 'Mon voyage', 'Choisir d’autres lieux'],
  he: ['בחירת מקומות', 'הטיול שלי', 'בחירת מקומות נוספים']
};
async function noOverflow(page, selector) {
  expect(await page.locator(selector).evaluate(el => el.scrollWidth <= el.clientWidth + 1), selector).toBe(true);
}
for (const width of [390, 1440]) for (const lang of locales) {
  test(`Map -> choose -> trip: ${lang} at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 844 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(language => localStorage.setItem('ilhabela_lang', language), lang);
    await page.goto('/');
    await page.waitForFunction(() => typeof mapMarkers !== 'undefined' && mapMarkers.length === touristSpots.length);
    if (width < 768) {
      await page.waitForFunction(() => typeof L.markerClusterGroup === 'function' && mapMarkerCluster);
      expect(await page.evaluate(() => mapMarkerCluster.getLayers().length)).toBe(await page.evaluate(() => touristSpots.length));
      await expect(page.locator('#map .map-category-cluster').first()).toBeVisible();
      // Keep the target in the viewport and end any initial fit animation.
      await page.evaluate(() => {
        const spot = touristSpots.find(spot => spot.id === 'praia-do-juliao');
        map.stop();
        map.setView(spot.coords, 18, { animate: false });
      });
      await expect.poll(() => page.evaluate(() => map.getZoom())).toBe(18);
      await page.evaluate(() => {
        const marker = mapMarkers.find(marker => marker.options.title === getSpotTranslation(touristSpots.find(spot => spot.id === 'praia-do-juliao')).title);
        const parent = mapMarkerCluster.getVisibleParent(marker);
        if (parent !== marker && parent?.spiderfy) parent.spiderfy();
      });
      await expect(page.locator('#pin-praia-do-juliao')).toBeVisible();
      const size = await page.locator('#pin-praia-do-juliao .pin-icon-wrap').boundingBox();
      expect(size.width).toBe(27);
      await page.evaluate(() => resetMapView());
    } else {
      expect(await page.evaluate(() => mapMarkerCluster)).toBeNull();
      await expect(page.locator('#map .main-map-pin')).toHaveCount(await page.evaluate(() => touristSpots.length));
      const size = await page.locator('#map .main-map-pin .pin-icon-wrap').first().boundingBox();
      expect(size.width).toBe(36);
    }
    await page.evaluate(() => filterCategory('cachoeiras'));
    expect(await page.evaluate(() => mapMarkers.length)).toBe(await page.evaluate(() => getFilteredSpots().length));
    if (width < 768) expect(await page.evaluate(() => mapMarkerCluster.getLayers().length)).toBe(await page.evaluate(() => getFilteredSpots().length));
    await page.evaluate(() => filterCategory('all'));
    await page.screenshot({ path: info.outputPath(`map-${lang}-${width}.png`) });

    await page.evaluate(() => openPlannerSummary());
    await expect(page.locator('#planner-title')).toHaveText(names[lang][1]);
    await expect(page.locator('#planner-map')).toBeHidden();
    expect(await page.evaluate(() => plannerMap)).toBeNull();
    await expect(page.locator('.planner-empty-state button')).toHaveText(names[lang][0]);
    await expect(page.locator('#planner-back-to-deck')).toBeHidden();
    await noOverflow(page, '#planner-modal');
    await page.screenshot({ path: info.outputPath(`empty-${lang}-${width}.png`) });
    await page.locator('.planner-empty-state button').click();
    await expect(page.locator('#planner-title')).toHaveText(names[lang][0]);
    await expect(page.locator('#planner-active-card')).toBeVisible();
    await noOverflow(page, '#planner-deck-view');
    const card = await page.locator('#planner-active-card').boundingBox();
    expect(card.x).toBeGreaterThanOrEqual(0);
    expect(card.x + card.width).toBeLessThanOrEqual(width);
    const filters = page.locator('.planner-filter-rail');
    expect(await filters.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(width < 768);
    if (width < 768) {
      expect(card.height).toBeGreaterThan(500);
      await expect(page.locator('#planner-close')).toBeHidden();
      await expect(page.locator('.site-header')).toBeHidden();
      const nav = await page.locator('#bottom-nav').boundingBox();
      const actions = await page.locator('#planner-actions').boundingBox();
      expect(actions.y + actions.height).toBeLessThanOrEqual(nav.y + 1);
      await expect(page.locator('#bottom-nav a').last()).toHaveText(names[lang][1]);
    } else {
      await expect(page.locator('#planner-close')).toBeVisible();
      expect(card.height).toBeLessThanOrEqual(500);
    }
    // Language changes in the open deck preserve its queue and selection.
    const first = await page.evaluate(() => plannerDeckQueue[0].id);
    await page.evaluate(language => setLanguage(language), lang);
    expect(await page.evaluate(() => plannerDeckQueue[0].id)).toBe(first);
    await page.screenshot({ path: info.outputPath(`choose-${lang}-${width}.png`) });
    await page.locator('#planner-actions button').nth(1).click();
    await expect(page.locator('#spot-modal')).toBeVisible();
    if (width < 768) {
      const nav = await page.locator('#bottom-nav').boundingBox();
      await expect.poll(async () => {
        const sheet = await page.locator('#spot-modal .modal-sheet').boundingBox();
        return sheet.y + sheet.height;
      }).toBeLessThanOrEqual(nav.y + 1);
      await noOverflow(page, '#spot-modal .modal-sheet');
    }
    await page.evaluate(() => closeSpotModal());
    await page.evaluate(() => {
      const card = document.getElementById('planner-active-card');
      const touch = clientX => new Touch({ identifier: 1, target: card, clientX, clientY: 200 });
      card.dispatchEvent(new TouchEvent('touchstart', { touches: [touch(100)], bubbles: true }));
      card.dispatchEvent(new TouchEvent('touchmove', { touches: [touch(220)], bubbles: true }));
      card.dispatchEvent(new TouchEvent('touchend', { touches: [], bubbles: true }));
    });
    await expect(page.locator('#planner-count-badge')).toHaveText('1');
    await expect.poll(() => page.evaluate(() => plannerDeckQueue[0]?.id)).not.toBe(first);
    const skip = await page.evaluate(() => plannerDeckQueue[0].id);
    await page.evaluate(() => plannerSwipe('left'));
    await expect.poll(() => page.evaluate(() => plannerDeckQueue[0]?.id)).not.toBe(skip);
    expect(await page.evaluate(() => tripSelection)).toEqual([first]);
    await page.evaluate(() => {
      for (const id of ['praia-do-juliao', 'praia-do-curral', 'baia-de-castelhanos']) if (!isSpotInTrip(id)) toggleSpotInTrip(id);
      openPlannerSummary();
    });
    await expect(page.locator('#planner-title')).toHaveText(names[lang][1]);
    await expect(page.locator('#planner-map')).toBeVisible();
    await expect(page.locator('#planner-back-to-deck [data-i18n]')).toHaveText(names[lang][2]);
    await expect(page.locator('#planner-summary-list')).toContainText(await page.evaluate(() => t('plannerRouteSection')));
    await noOverflow(page, '#planner-summary-view');
    await noOverflow(page, '#planner-summary-list');
    if (width < 768) {
      const before = await page.locator('#planner-map').boundingBox();
      await page.locator('#planner-summary-view').evaluate(el => { el.scrollTop = 200; });
      const after = await page.locator('#planner-map').boundingBox();
      expect(before.y - after.y).toBeGreaterThan(150);
      expect(await page.locator('#planner-summary-list').evaluate(el => getComputedStyle(el).overflowY)).toBe('visible');
      await page.evaluate(() => plannerStartOriginPick());
      await expect.poll(() => page.locator('#planner-summary-view').evaluate(el => el.scrollTop)).toBeLessThan(2);
      await page.evaluate(() => { plannerOriginPickMode = false; });
    } else {
      expect(await page.locator('#planner-summary-list').evaluate(el => getComputedStyle(el).overflowY)).toBe('auto');
    }
    await page.screenshot({ path: info.outputPath(`trip-${lang}-${width}.png`) });
    // Verify persistence, Google Maps endpoint and the last-removal empty state.
    const selection = await page.evaluate(() => [...tripSelection]);
    await page.evaluate(() => closePlanner());
    await page.reload();
    expect(await page.evaluate(() => tripSelection)).toEqual(selection);
    await page.evaluate(() => openPlannerSummary());
    page.on('dialog', dialog => dialog.accept());
    const navigation = await page.evaluate(() => {
      let url;
      window.open = value => { url = value; };
      plannerOpenGoogleMaps();
      const spots = getOptimizedRouteSpots(getActiveTripSpots().filter(spot => isSpotRoutableForMode(spot, plannerTravelMode))).slice(0, 4);
      return { url, endpoint: resolvePlannerAccess(spots[spots.length - 1], plannerTravelMode).coords.join(',') };
    });
    expect(new URL(navigation.url).searchParams.get('destination')).toBe(navigation.endpoint);
    await page.evaluate(() => [...tripSelection].forEach(id => removeFromPlanner(id)));
    await expect(page.locator('#planner-map')).toBeHidden();
    await expect(page.locator('.planner-empty-state button')).toBeVisible();
    if (width < 768) {
      await page.locator('#bottom-nav a').first().click();
      await expect(page.locator('#planner-modal')).toBeHidden();
      await expect(page.locator('.site-header')).toBeVisible();
    }
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}
test('mobile clustering fallback keeps every attraction when the plugin is unavailable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/leaflet.markercluster.js', route => route.abort());
  await page.goto('/');
  await page.waitForFunction(() => mapMarkers.length === touristSpots.length);
  expect(await page.evaluate(() => mapMarkerCluster)).toBeNull();
  await expect(page.locator('#map .main-map-pin')).toHaveCount(await page.evaluate(() => touristSpots.length));
});
test('resizing switches clustering without losing trip selection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.waitForFunction(() => mapMarkerCluster);
  await page.evaluate(() => toggleSpotInTrip('praia-do-juliao'));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForFunction(() => !mapMarkerCluster);
  await expect(page.locator('#map .main-map-pin')).toHaveCount(await page.evaluate(() => touristSpots.length));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() => mapMarkerCluster);
  expect(await page.evaluate(() => tripSelection)).toEqual(['praia-do-juliao']);
});
