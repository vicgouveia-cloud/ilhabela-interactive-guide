const {test, expect} = require('@playwright/test');

for (const width of [390, 1440]) for (const lang of ['pt','en','es','fr','he']) {
  test(`compact boat providers preserve access notices and contacts ${lang} ${width}`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    await page.evaluate(lang => setLanguage(lang),lang);
    const result = await page.evaluate(() => {
      const html = renderPlannerMaritimeOptions([touristSpots.find(s=>s.id==='praia-do-bonete')]);
      const root = document.createElement('div');
      root.innerHTML = html;
      const disclosure = root.querySelector('details');
      return {
        details: root.querySelectorAll('details').length,
        firstName: disclosure?.querySelector('summary')?.textContent,
        initialOpen: disclosure?.open,
        contacts: disclosure?.querySelectorAll('a').length,
        warningPresent: root.textContent.includes(t('plannerBoneteBoatPending')),
        allContactsInDisclosure: root.querySelectorAll('a').length === root.querySelectorAll('details a').length
      };
    });
    expect(result.details).toBe(1);
    expect(result.firstName).toContain('Portinho Passeios');
    expect(result.initialOpen).toBe(false);
    expect(result.contacts).toBeGreaterThan(0);
    expect(result.warningPresent).toBe(true);
    expect(result.allContactsInDisclosure).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('dir', lang==='he'?'rtl':'ltr');
  });
}

test('native provider disclosure opens via keyboard and exposes contact links',async({page})=>{
  await page.goto('/');
  await page.evaluate(()=>{
    const container=document.createElement('div');
    container.id='compact-provider-test';
    container.innerHTML=renderPlannerMaritimeOptions([touristSpots.find(s=>s.id==='praia-do-bonete')]);
    document.body.appendChild(container);
  });
  const disclosure=page.locator('#compact-provider-test details').first();
  const summary=disclosure.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(disclosure).toHaveAttribute('open','');
  await expect(disclosure.locator('a').first()).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(disclosure).not.toHaveAttribute('open','');
});
