const { test, expect } = require('@playwright/test');

for (const width of [320, 390, 1440]) for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  test('day selector precedes map: ' + lang + ' ' + width, async ({page}) => {
    await page.setViewportSize({width, height: 800});
    await page.addInitScript(() => {
      localStorage.setItem('ilhabela_trip', JSON.stringify(['praia-do-curral', 'praia-do-portinho']));
      localStorage.setItem('ilhabela_trip_days', JSON.stringify({'praia-do-portinho': 2}));
    });
    await page.goto('/');
    await page.evaluate(lang => {setLanguage(lang); openPlannerSummary();}, lang);
    const tabs = page.locator('#planner-day-selector');
    await expect(tabs).toBeVisible();
    await expect(tabs.locator('button')).toHaveCount(2);
    await expect(tabs.locator('button').first()).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => Boolean(document.getElementById('planner-day-selector').compareDocumentPosition(document.getElementById('planner-map')) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    await tabs.locator('button').nth(1).click();
    await expect(tabs.locator('button').nth(1)).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => getActiveTripSpots().map(s => s.id))).toEqual(['praia-do-portinho']);
    await expect(page.locator('html')).toHaveAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    expect(await page.locator('#planner-summary-view').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  });
}

test('empty trip keeps day navigation hidden', async ({page}) => {
  await page.addInitScript(() => {localStorage.removeItem('ilhabela_trip'); localStorage.removeItem('ilhabela_saved');});
  await page.goto('/');
  await page.evaluate(() => openPlannerSummary());
  await expect(page.locator('.planner-empty-state')).toBeVisible();
  await expect(page.locator('#planner-day-selector')).toBeHidden();
  await expect(page.locator('#planner-map')).toBeHidden();
});
