const {test, expect} = require('@playwright/test');

test('accepted submissions whitelist context and optional email across languages and sizes', async ({page}) => {
  const payloads = [];
  await page.route('https://formspree.io/f/xeaejbqe', async route => {
    payloads.push(route.request().postDataJSON());
    await route.fulfill({json: {ok: true}});
  });
  await page.goto('/');
  await page.waitForFunction(() => typeof openContact === 'function');
  for (const width of [390, 1440]) {
    await page.setViewportSize({width, height: 844});
    for (const language of ['pt', 'en', 'es', 'fr', 'he']) {
      for (const type of ['general', 'attraction', 'service']) {
        await page.evaluate(({type, language}) => openContact({type, language, id: type === 'general' ? '' : 'test-id',
          name: type === 'general' ? '' : 'Test context', sourceUrl: 'https://ilhabelatrip.com/test',
          tripSelection: ['private'], geolocation: [1, 2]}), {type, language});
        await page.locator('#contact-subject').fill('Teste de assunto');
        await page.locator('#contact-message').fill('Mensagem suficientemente longa para testar.');
        if (type === 'service') await page.locator('#contact-email').fill('visitor@example.com');
        await page.locator('#contact-send').click();
        await expect(page.locator('#contact-send')).toBeDisabled();
        await expect(page.locator('#contact-subject')).toHaveValue('');
        expect(await page.locator('#contact-dialog').getAttribute('dir')).toBe(language === 'he' ? 'rtl' : 'ltr');
        expect(await page.locator('#contact-dialog').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
        const payload = payloads.at(-1);
        expect(Object.keys(payload).sort()).toEqual(['subject', 'message', 'contextType', 'contextId', 'contextName', 'language', 'sourceUrl', ...(type === 'service' ? ['email'] : [])].sort());
        expect(payload.contextType).toBe(type); expect(payload.language).toBe(language);
        if (type === 'service') expect(payload.email).toBe('visitor@example.com');
        await expect(page.locator('#contact-close')).toBeFocused();
        await page.keyboard.press('Escape');
      }
    }
  }
  expect(payloads).toHaveLength(30);
});

test('validation, honeypot, pending duplicate protection and network/provider errors keep content', async ({page}) => {
  let calls = 0;
  let release;
  await page.route('https://formspree.io/f/xeaejbqe', async route => {
    calls++;
    if (calls === 1) { await new Promise(resolve => { release = resolve; }); await route.abort(); }
    else await route.fulfill({status: 422, json: {errors: [{message: '<img src=x onerror=alert(1)>'}]}});
  });
  await page.goto('/');
  await page.waitForFunction(() => typeof openContact === 'function');
  await page.evaluate(() => openContact());
  await page.locator('#contact-send').click();
  expect(calls).toBe(0);
  await page.locator('#contact-subject').fill('Assunto válido');
  await page.locator('#contact-message').fill('Mensagem de teste válida.');
  await page.locator('#contact-email').fill('invalid');
  await page.locator('#contact-send').click(); expect(calls).toBe(0);
  await page.locator('#contact-email').fill('');
  await page.locator('[name="_gotcha"]').evaluate(el => { el.value = 'spam'; });
  await page.locator('#contact-send').click(); expect(calls).toBe(0);
  await page.locator('[name="_gotcha"]').evaluate(el => { el.value = ''; });
  await page.locator('#contact-send').click();
  await expect.poll(() => calls).toBe(1);
  await page.evaluate(() => {
    document.querySelector('#contact-dialog form').dispatchEvent(new Event('submit', {cancelable: true}));
  });
  expect(calls).toBe(1);
  await page.keyboard.press('Escape');
  await expect(page.locator('#contact-dialog')).toBeVisible();
  release();
  await expect(page.locator('#contact-send')).toBeEnabled();
  await expect(page.locator('#contact-status')).toContainText('Seu texto foi mantido');
  await expect(page.locator('#contact-subject')).toHaveValue('Assunto válido');
  await expect(page.locator('#contact-message')).toHaveValue('Mensagem de teste válida.');
  await page.locator('#contact-send').click();
  await expect.poll(() => calls).toBe(2);
  await expect(page.locator('#contact-send')).toBeEnabled();
  await expect(page.locator('#contact-status img')).toHaveCount(0);
  await expect(page.locator('#contact-message')).toHaveValue('Mensagem de teste válida.');
});
