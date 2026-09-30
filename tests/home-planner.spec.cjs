const { test, expect } = require('@playwright/test');

for (const width of [390, 1440]) {
  test(`Home planner CTA and existing trip flow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    const cta = page.locator('#home-continue-trip');
    const label = page.locator('#home-trip-action-label');
    await expect(cta).toBeVisible();
    await expect(label).toHaveText('Montar meu roteiro');
    await cta.click();
    await expect(page.locator('#planner-modal')).toBeVisible();
    await expect(page.locator('#planner-count-badge')).toHaveText('0');
    await expect(page.locator('#planner-deck-view')).toBeVisible();
    expect(await page.evaluate(() => tripSelection)).toEqual([]);
    await page.evaluate(() => closePlanner());

    // Exercise the existing attraction detail action, without replacing card logic.
    await page.evaluate(() => openSpotModal('praia-do-juliao'));
    await page.locator('#spot-modal button[onclick="toggleSpotTripFromModal(\'praia-do-juliao\')"]').click();
    await page.evaluate(() => closeSpotModal());
    await expect(label).toHaveText('Continuar minha viagem');
    await page.reload();
    await expect(label).toHaveText('Continuar minha viagem');
    await page.evaluate(() => setLanguage('en'));
    await expect(label).toHaveText('Continue my trip');
    await page.evaluate(() => setLanguage('pt'));
    await cta.click();
    await expect(page.locator('#planner-summary-view')).toBeVisible();
    await expect(page.locator('#planner-summary-list')).toContainText('Trecho final a pé');

    await page.evaluate(() => {
      toggleSpotInTrip('praia-do-curral');
      renderSummary();
      movePlannerSpot('praia-do-curral', -1);
    });
    expect(await page.evaluate(() => tripSelection)).toEqual(['praia-do-curral', 'praia-do-juliao']);
    page.on('dialog', dialog => dialog.accept());
    const navigation = await page.evaluate(() => {
      let url;
      window.open = value => { url = value; };
      plannerOpenGoogleMaps();
      return { url, gateway: resolvePlannerAccess(touristSpots.find(s => s.id === 'praia-do-juliao'), 'auto').coords };
    });
    expect(new URL(navigation.url).searchParams.get('destination')).toBe(navigation.gateway.join(','));

    await page.evaluate(() => {
      removeFromPlanner('praia-do-curral');
      removeFromPlanner('praia-do-juliao');
      closePlanner();
    });
    await expect(label).toHaveText('Montar meu roteiro');
    await cta.click();
    await expect(page.locator('#planner-deck-view')).toBeVisible();
    await expect(page.locator('#planner-count-badge')).toHaveText('0');
    expect(errors).toEqual([]);
  });
}
