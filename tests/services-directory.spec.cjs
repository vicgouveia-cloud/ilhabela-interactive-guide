const { test, expect } = require('@playwright/test');

const locales = ['pt', 'en', 'fr', 'es', 'he'];

async function openDirectory(page) {
  await page.goto('/servicos/');
  await expect(page.locator('#services-page-grid > article').first()).toBeVisible();
}

test('services directory renders catalog and canonical card actions', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });

  await openDirectory(page);

  const expected = await page.evaluate(() => servicesData.length);
  await expect(page.locator('#services-page-grid > article')).toHaveCount(expected);
  await expect(page.locator('#services-page-status')).toContainText(String(expected));

  const actions = await page.locator('#services-page-grid > article').evaluateAll(cards =>
    cards.map(card => [...card.querySelectorAll('a')].map(a => a.getAttribute('href')))
  );
  expect(actions.flat().some(href => href?.startsWith('https://www.google.com/maps/search/'))).toBe(true);
  expect(actions.flat().some(href => href?.startsWith('https://wa.me/55'))).toBe(true);
  expect(actions.flat().some(href => href?.startsWith('tel:+55'))).toBe(true);
  expect(actions.flat().some(href => href?.includes('instagram.com/'))).toBe(true);
  expect(errors).toEqual([]);
});

test('category and directory-specific filters match service data', async ({ page }) => {
  await openDirectory(page);

  for (const category of ['food', 'tour', 'essentials']) {
    const button = page.locator(`[data-service-page-category="${category}"]`);
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    const expected = await page.evaluate(value => servicesData.filter(service => service.category === value).length, category);
    await expect(page.locator('#services-page-grid > article')).toHaveCount(expected);
  }

  await page.locator('[data-service-page-category="tour"]').click();
  const tourSelect = page.locator('#services-tour-filter');
  await expect(tourSelect).toBeVisible();
  await tourSelect.selectOption('boat-tour');
  const expectedBoat = await page.evaluate(() => servicesData.filter(service =>
    service.category === 'tour' && (service.activities || []).includes('boat-tour')
  ).length);
  await expect(page.locator('#services-page-grid > article')).toHaveCount(expectedBoat);

  await page.locator('[data-service-page-category="essentials"]').click();
  const practicalSelect = page.locator('#services-practical-filter');
  await expect(practicalSelect).toBeVisible();
  await practicalSelect.selectOption('car-rental');
  const expectedRental = await page.evaluate(() => servicesData.filter(service =>
    service.category === 'essentials' && (service.activities || []).includes('car-rental')
  ).length);
  await expect(page.locator('#services-page-grid > article')).toHaveCount(expectedRental);

  await page.locator('[data-service-page-category="food"]').click();
  const foodSelect = page.locator('[data-service-food-filter="type"]');
  await expect(foodSelect).toBeVisible();
  const option = await foodSelect.locator('option:not([value="all"])').first().getAttribute('value');
  expect(option).toBeTruthy();
  await foodSelect.selectOption(option);
  const expectedFood = await page.evaluate(value => servicesData.filter(service =>
    service.category === 'food' && (service.serviceType || []).includes(value)
  ).length, option);
  await expect(page.locator('#services-page-grid > article')).toHaveCount(expectedFood);
});

test('geolocation sorts services by distance and distance filter can reach empty state', async ({ page, context }) => {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: -23.778, longitude: -45.358 });
  await openDirectory(page);

  await page.locator('#services-nearby').click();
  await expect(page.locator('#services-distance-wrap')).toBeVisible();
  await expect(page.locator('#services-location-note')).toBeVisible();
  await expect(page.locator('#services-page-grid [class*="text-secondary"]').first()).toContainText('km');

  await page.evaluate(() => {
    const select = document.getElementById('services-distance');
    select.innerHTML += '<option value="0">Até 0 km</option>';
    select.value = '0';
    select.dispatchEvent(new Event('change'));
  });
  await expect(page.locator('#services-page-grid > article')).toHaveCount(0);
  await expect(page.locator('#services-page-grid')).toContainText(/Nenhum serviço|No services|Aucun service|No se encontraron|לא נמצאו/);
});

test('geolocation failure is handled without breaking the directory', async ({ page, context }) => {
  await context.clearPermissions();
  await openDirectory(page);

  await page.locator('#services-nearby').click();
  await expect(page.locator('#services-location-note')).toBeVisible();
  await expect(page.locator('#services-distance-wrap')).toBeHidden();
  await expect(page.locator('#services-page-grid > article').first()).toBeVisible();
});

for (const lang of locales) {
  test(`services directory supports ${lang} and preserves active category`, async ({ page }) => {
    await openDirectory(page);
    await page.locator('[data-service-page-category="food"]').click();

    await page.locator('#lang-btn').click();
    await page.locator(`#language-menu button[onclick="setLanguage('${lang}')"]`).click();

    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('html')).toHaveAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    await expect(page.locator('[data-service-page-category="food"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#services-food-filters')).toBeVisible();

    const expected = await page.evaluate(() => servicesData.filter(service => service.category === 'food').length);
    await expect(page.locator('#services-page-grid > article')).toHaveCount(expected);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}
