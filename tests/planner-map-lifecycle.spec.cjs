const { test, expect } = require('@playwright/test');

const locales = ['pt', 'en', 'es', 'fr', 'he'];

for (const lang of locales) {
  for (const width of [390, 1440]) {
    test(`Planner map lifecycle regression: ${lang} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));

      await page.addInitScript(l => localStorage.setItem('ilhabela_lang', l), lang);
      await page.goto('/');
      await page.waitForFunction(() => typeof touristSpots !== 'undefined' && touristSpots.length > 0);

      // --- Scenario 1: Exact reproduction from I18N technical validation ---
      // Open My Trip summary (empty), switch to deck, close, open modal, add Julião
      await page.evaluate(() => openPlannerSummary());
      await expect(page.locator('#planner-map')).toBeHidden();
      expect(await page.evaluate(() => plannerMap)).toBeNull();

      await page.locator('.planner-empty-state button').click(); // to deck
      await expect(page.locator('#planner-active-card')).toBeVisible();

      await page.evaluate(() => closePlanner());
      await expect(page.locator('#planner-modal')).toBeHidden();

      // Add Julião from modal or function, reload, switch language
      await page.evaluate(() => toggleSpotInTrip('praia-do-juliao'));
      await page.reload();
      await page.waitForFunction(() => typeof touristSpots !== 'undefined' && touristSpots.length > 0);
      await page.evaluate(l => setLanguage(l), lang);

      // Reopen My Trip
      await page.evaluate(() => openPlannerSummary());
      await expect(page.locator('#planner-map')).toBeVisible();
      expect(await page.evaluate(() => plannerMap !== null)).toBe(true);

      // Add Curral and Castelhanos
      await page.evaluate(() => {
        toggleSpotInTrip('praia-do-curral');
        toggleSpotInTrip('baia-de-castelhanos');
        renderSummary();
      });

      // Reorder destinations
      const initialMapId = await page.evaluate(() => plannerMap._leaflet_id);
      await page.evaluate(() => movePlannerSpot('praia-do-curral', -1));
      // Verify map instance was reused, NOT destroyed
      const postReorderMapId = await page.evaluate(() => plannerMap._leaflet_id);
      expect(postReorderMapId).toBe(initialMapId);

      // Switch travel modes
      await page.evaluate(() => plannerSetTravelMode('bicycle'));
      await page.evaluate(() => plannerSetTravelMode('4x4'));
      await page.evaluate(() => plannerSetTravelMode('auto'));
      expect(await page.evaluate(() => plannerMap._leaflet_id)).toBe(initialMapId);

      // Open Google Maps URL generation
      await page.evaluate(() => {
        window.open = () => {};
        plannerOpenGoogleMaps();
      });

      // Rapidly remove stops one by one
      await page.evaluate(() => removeFromPlanner('praia-do-juliao'));
      expect(await page.evaluate(() => plannerMap._leaflet_id)).toBe(initialMapId);

      await page.evaluate(() => removeFromPlanner('praia-do-curral'));
      expect(await page.evaluate(() => plannerMap._leaflet_id)).toBe(initialMapId);

      // Remove last stop -> should trigger clean destroyPlannerMap
      await page.evaluate(() => removeFromPlanner('baia-de-castelhanos'));
      await expect(page.locator('#planner-map')).toBeHidden();
      expect(await page.evaluate(() => plannerMap)).toBeNull();

      // Close and reopen planner deck & summary
      await page.evaluate(() => closePlanner());
      await page.evaluate(() => openPlannerSummary());
      await page.locator('.planner-empty-state button').click(); // to deck
      await page.evaluate(() => toggleSpotInTrip('praia-do-curral'));
      await page.evaluate(() => openPlannerSummary());

      await expect(page.locator('#planner-map')).toBeVisible();
      expect(await page.evaluate(() => plannerMap !== null)).toBe(true);
      expect(await page.evaluate(() => plannerMapMarkers.length)).toBeGreaterThan(0);

      // Cleanup
      await page.evaluate(() => removeFromPlanner('praia-do-curral'));
      await page.evaluate(() => closePlanner());

      // Settle all events and verify NO JavaScript errors occurred
      await page.waitForTimeout(400);
      expect(errors).toEqual([]);
    });
  }
}

test('Repeated rapid stress cycle of planner map operations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('/');
  await page.waitForFunction(() => typeof touristSpots !== 'undefined' && touristSpots.length > 0);

  // 10 rapid cycles of open, add, origin pick, switch view, remove, close
  for (let cycle = 0; cycle < 5; cycle++) {
    await page.evaluate(() => {
      toggleSpotInTrip('praia-do-juliao');
      toggleSpotInTrip('praia-do-curral');
      openPlannerSummary();
    });

    // Toggle view back and forth rapidly
    await page.evaluate(() => setPlannerView('deck'));
    await page.evaluate(() => setPlannerView('summary'));

    // Move spots
    await page.evaluate(() => movePlannerSpot('praia-do-curral', -1));

    // Pick origin
    await page.evaluate(() => {
      plannerStartOriginPick();
      saveActiveDayOrigin([-23.82, -45.38]);
    });

    // Remove spots in rapid succession
    await page.evaluate(() => {
      removeFromPlanner('praia-do-juliao');
      removeFromPlanner('praia-do-curral');
    });

    await page.evaluate(() => closePlanner());
  }

  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});
