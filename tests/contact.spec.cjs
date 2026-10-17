const {test, expect} = require('@playwright/test');

test.use({locale: 'pt-BR'});

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

test('contact stays in the header, not on service cards or attraction modals', async ({page}) => {
 await page.goto('/?spot=praia-do-curral');
 await page.waitForFunction(()=>typeof openContact==='function');
 await page.evaluate(()=>openSpotModal('praia-do-curral'));
 await expect(page.locator('#spot-modal [data-contact-entry]')).toHaveCount(0);
 await page.evaluate(()=>closeSpotModal());
 await page.goto('/servicos/');
 await page.waitForFunction(()=>document.querySelectorAll('#services-page-grid article').length>0);
 await expect(page.locator('#services-page-grid [data-contact-entry]')).toHaveCount(0);
 await page.locator('header .contact-header-entry').click();
 await expect(page.locator('#contact-dialog')).toBeVisible();
});

test('static attraction opens the shared panel with context and sending available', async ({page}) => {
  await page.goto('/lugares/praia-do-curral/');
  const entry = page.locator('[data-contact-entry]');
  await entry.click();
  await expect(page.locator('#contact-title')).toHaveText('Fale com a gente');
  await expect(page.locator('#contact-about')).toHaveText('Sobre: Praia do Curral');
  await expect(page.locator('#contact-note')).toContainText('receber uma resposta');
  await expect(page.locator('#contact-send')).toBeEnabled();
  await page.keyboard.press('Escape');
  await expect(entry).toBeFocused();
});
