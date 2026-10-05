const {test, expect} = require('@playwright/test');

test('general contact: five languages, sizes, focus, keyboard, backdrop and compact viewport', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof openContact === 'function');
  for (const width of [390, 1440]) {
    for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
      await page.setViewportSize({width, height: 844});
      await page.evaluate(lang => setLanguage(lang), lang);
      const entry = page.locator('footer [data-contact-entry]');
      await entry.click();
      await expect(page.locator('#contact-subject')).toBeFocused();
      await expect(page.locator('#contact-about')).toBeHidden();
      await expect(page.locator('#contact-send')).toBeEnabled();
      expect(await page.locator('#contact-dialog').getAttribute('dir')).toBe(lang === 'he' ? 'rtl' : 'ltr');
      await page.keyboard.press('Tab');
      await expect(page.locator('#contact-message')).toBeFocused();
      await page.locator('#contact-message').fill('Uma mensagem de teste');
      await page.keyboard.press('Tab');
      await expect(page.locator('#contact-send')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.locator('#contact-close')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.locator('#contact-email')).toBeFocused();
      await page.mouse.click(2, 2);
      await expect(page.locator('#contact-dialog')).toBeVisible();
      await expect(page.locator('#contact-message')).toHaveValue('Uma mensagem de teste');
      await page.setViewportSize({width, height: 400});
      expect(await page.locator('#contact-dialog').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
      await page.locator('#contact-close').click();
      await expect(entry).toBeFocused();
      await page.setViewportSize({width, height: 844});
      await entry.click();
      await expect(page.locator('#contact-message')).toHaveValue('');
      await page.keyboard.press('Escape');
      await expect(page.locator('#contact-dialog')).not.toBeVisible();
      await expect(entry).toBeFocused();
    }
  }
});

test('attraction and service entries pass explicit context without private data', async ({page}) => {
  await page.goto('/?spot=praia-do-curral');
  await page.waitForFunction(() => typeof openContact === 'function');
  await page.evaluate(() => {
    const original = openContact;
    window.openContact = input => { window.contactCaptured = input; original(input); };
    openSpotModal('praia-do-curral');
  });
  const entry = page.locator('#spot-modal [data-contact-entry]');
  await entry.click();
  await expect(page.locator('#contact-about')).toContainText('Praia do Curral');
  const context = await page.evaluate(() => window.contactCaptured);
  expect(context.type).toBe('attraction'); expect(context.id).toBe('praia-do-curral');
  expect(context.sourceUrl).toContain('spot=praia-do-curral');
  expect(Object.keys(context).sort()).toEqual(['type', 'id', 'name', 'language', 'sourceUrl'].sort());
  await page.keyboard.press('Escape');
  await expect(entry).toBeFocused();
  await expect(page.locator('#spot-modal')).toBeVisible();
  await page.evaluate(() => closeSpotModal());
  await page.goto('/servicos/');
  await page.waitForFunction(() => typeof openContact === 'function');
  await page.evaluate(() => {
    const original = openContact;
    window.openContact = input => { window.contactCaptured = input; original(input); };
  });
  const service = page.locator('[data-contact-type="service"]').first();
  await expect(service).toHaveCount(1);
  const id = await service.getAttribute('data-contact-id');
  await service.click();
  expect((await page.evaluate(() => window.contactCaptured)).id).toBe(id);
  expect((await page.evaluate(() => window.contactCaptured)).type).toBe('service');
  await expect(page.locator('#contact-about')).toBeVisible();
});

test('static attraction opens the shared panel with context and sending available', async ({page}) => {
  await page.goto('/lugares/praia-do-curral/');
  const entry = page.locator('[data-contact-entry]');
  await entry.click();
  await expect(page.locator('#contact-title')).toHaveText('Dúvidas e sugestões');
  await expect(page.locator('#contact-about')).toHaveText('Sobre: Praia do Curral');
  await expect(page.locator('#contact-note')).toContainText('enviada pelo Formspree');
  await expect(page.locator('#contact-send')).toBeEnabled();
  await page.keyboard.press('Escape');
  await expect(entry).toBeFocused();
});
