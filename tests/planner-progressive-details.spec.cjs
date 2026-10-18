const {test, expect} = require('@playwright/test');

for (const width of [390,1440]) for (const lang of ['pt','en','es','fr','he']) {
  test(`secondary planner details remain accessible: ${lang} ${width}`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    await page.addInitScript(() => {
      localStorage.setItem('ilhabela_trip', JSON.stringify(['praia-do-bonete']));
    });
    await page.goto('/');
    await page.evaluate(lang => { setLanguage(lang); openPlannerSummary(); },lang);
    const organizer=page.locator('#planner-organize-details');
    const transport=page.locator('#planner-transport-details');
    await expect(organizer).toBeVisible();
    await expect(transport).toBeVisible();
    await expect(organizer).not.toHaveAttribute('open','');
    await expect(transport).not.toHaveAttribute('open','');
    await expect(page.locator('#planner-routing-panel button[onclick="plannerOpenGoogleMaps(0)"]')).toBeVisible();
    await expect(page.locator('#planner-preparation button[onclick="plannerOptimizeRoute()"]')).toBeVisible();
    await expect(page.locator('#planner-routing-panel button[onclick="plannerDownloadOffline()"]')).toBeHidden();
    await organizer.locator('summary').click();
    await transport.locator('summary').click();
    await expect(organizer).toHaveAttribute('open','');
    await expect(transport).toHaveAttribute('open','');
    await expect(page.locator('#planner-routing-panel button[onclick="plannerDownloadOffline()"]')).toBeVisible();
    await page.evaluate(() => plannerSetTravelMode('4x4'));
    await expect(organizer).toHaveAttribute('open','');
    await expect(transport).toHaveAttribute('open','');
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
  });
}

test('transport warnings are not hidden by disclosure', async ({page}) => {
  await page.addInitScript(() => localStorage.setItem('ilhabela_trip',JSON.stringify(['praia-do-bonete'])));
  await page.goto('/');
  await page.evaluate(() => openPlannerSummary());
  await expect(page.locator('#planner-transport-details')).not.toHaveAttribute('open','');
  const routing=page.locator('#planner-routing-panel');
  await expect(routing.locator('p').filter({hasText:/Bonete/i}).first()).toBeVisible();
  await expect(page.locator('#planner-maritime-options')).toBeVisible();
});

test('keyboard opens organizer without losing trip controls', async ({page}) => {
  await page.addInitScript(() => localStorage.setItem('ilhabela_trip',JSON.stringify(['praia-do-bonete'])));
  await page.goto('/');
  await page.evaluate(() => openPlannerSummary());
  const details=page.locator('#planner-organize-details');
  await details.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open','');
  await expect(details.locator('select')).toBeVisible();
});
