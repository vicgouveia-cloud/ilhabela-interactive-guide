const {test, expect} = require('@playwright/test');
for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  test(`Pico concise attribution in ${lang}`, async ({page}) => {
    await page.goto('/');
    await page.evaluate(lang => setLanguage(lang), lang);
    const card = page.locator('#spots-grid article').filter({has:page.locator('img[src*="pico-de-sao-sebastiao-autoral-original"]')});
    const byline = card.locator('[data-photo-attribution]');
    await expect(byline).toContainText('Acervo pessoal — Ilhabela Trip');
    await expect(byline).not.toContainText('WebP');
    await expect(byline).not.toContainText('©');
    await page.evaluate(() => openSpotModal('pico-de-sao-sebastiao'));
    const details = page.locator('#modal-photo-license details');
    await expect(details).toHaveCount(1);
    await expect(details).not.toHaveAttribute('open');
    await expect(details.locator('summary')).toHaveText(await page.evaluate(lang => photoDetailsLabel(lang), lang));
    await details.locator('summary').click();
    await expect(details).toHaveAttribute('open');
    await expect(details.locator('a').first()).toHaveAttribute('href', '/assets/images/pico-de-sao-sebastiao-autoral.PROVENANCE.md');
    await expect(details).toContainText(await page.evaluate(lang => touristSpots.find(s => s.id === 'pico-de-sao-sebastiao').photoCaption[lang], lang));
  });
}
for (const url of ['/o-que-fazer/', '/en/o-que-fazer/', '/lugares/pico-de-sao-sebastiao/', '/en/lugares/pico-de-sao-sebastiao/']) {
  test(`static Pico attribution at ${url}`, async ({page}) => {
    await page.goto(url);
    const visible = await page.locator('body').innerText();
    expect(visible).toContain('Acervo pessoal — Ilhabela Trip');
    expect(visible).not.toContain('converted to WebP');
    expect(visible).not.toContain('convertidas para WebP');
    expect(visible).not.toContain('Original preserved;');
    expect(visible).not.toContain('Original preservado;');
  });
}
