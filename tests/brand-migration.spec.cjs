const {test, expect} = require('@playwright/test');
const remote = !!process.env.PREVIEW_URL;
for (const width of [1280,390]) test(`main navigation and five languages at ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:844});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('#spots-grid > *').first()).toBeVisible();
  for (const lang of ['pt','en','fr','es','he']) {
    await page.locator('#lang-btn').click();
    await page.locator(`#language-menu button[onclick="setLanguage('${lang}')"]`).click();
    await expect(page.locator('html')).toHaveAttribute('lang',lang);
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    if(!remote) {
      await expect(page.locator('[data-i18n="brandTitle"]').first()).toHaveText('Ilhabela Trip');
      await expect(page).toHaveTitle(/Ilhabela Trip/);
    }
  }
  for(const path of ['/servicos/','/o-que-fazer/','/praias/','/cachoeiras/','/trilhas/','/roteiros/2-dias/','/roteiros/3-dias/','/lugares/praia-do-bonete/','/?view=trip']) {
    const response=await page.goto(path);
    expect(response.status(),path).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    if(path!=='/?view=trip') await expect(page.locator('a[href="/"]').first()).toBeVisible();
    if(!remote && path!=='/?view=trip') expect(await page.locator('body').innerText()).toContain('Ilhabela Trip');
  }
  expect(errors).toEqual([]);
});
