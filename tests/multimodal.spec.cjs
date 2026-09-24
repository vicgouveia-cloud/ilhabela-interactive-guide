const {test, expect} = require('@playwright/test');
test('gateway routing, confirmation, separate Bonete alternatives and offline file', async ({page, context}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof buildOfflineTrip === 'function');
  const result = await page.evaluate(() => {
    const find = id => touristSpots.find(s => s.id === id);
    return {
      juliao: resolvePlannerAccess(find('praia-do-juliao'), 'auto'),
      feiticeira: resolvePlannerAccess(find('praia-da-feiticeira'), 'auto'),
      normal: resolvePlannerAccess(find('praia-do-curral'), 'auto'),
      curral: find('praia-do-curral').coords,
      bonete: find('praia-do-bonete').routing.accessOptions,
      boneteCar: resolvePlannerAccess(find('praia-do-bonete'), 'auto'),
      castelhanosCar: resolvePlannerAccess(find('baia-de-castelhanos'), 'auto'),
      castelhanos4x4: resolvePlannerAccess(find('baia-de-castelhanos'), '4x4'),
      castelhanos: find('baia-de-castelhanos').coords
    };
  });
  expect(result.juliao.coords).toEqual([-23.853583875006763, -45.41239561211879]);
  expect(result.juliao.destination).not.toEqual(result.juliao.coords);
  expect(result.feiticeira.coords).toEqual([-23.84660565107699, -45.410130644310605]);
  expect(result.normal.coords).toEqual(result.curral);
  expect(result.bonete.map(o => o.mode)).toEqual(['trail','boat']);
  expect(result.bonete[0].gateway.coords).toEqual([-23.936275064037446, -45.42730164154816]);
  expect(result.bonete[1].gateway).toBeNull();
  expect(result.boneteCar.coords).toEqual([-23.936275064037446, -45.42730164154816]);
  expect(result.boneteCar.finalMode).toBe('trail');
  expect(result.castelhanosCar.coords).toEqual([-23.839249751545807, -45.36002116037754]);
  expect(result.castelhanosCar.finalMode).toBe('4x4');
  expect(result.castelhanos4x4.coords).toEqual(result.castelhanos);
  expect(result.castelhanos4x4.finalMode).toBeNull();
  await page.evaluate(() => {
    tripSelection = ['praia-do-curral', 'praia-do-juliao'];
    openPlanner(); togglePlannerView();
  });
  await expect(page.locator('#planner-summary-list')).toContainText('Trecho final a pé');
  page.on('dialog', dialog => dialog.accept());
  let payload;
  await page.route('**/optimized_route', async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({json:{trip:{locations:[{original_index:0},{original_index:1}],summary:{length:2,time:300},legs:[{shape:'??'}]}}});
  });
  await page.evaluate(() => plannerOptimizeRoute());
  expect(payload.locations[1]).toMatchObject({lat:result.juliao.coords[0],lon:result.juliao.coords[1]});
  const maps = await page.evaluate(() => {
    let url; window.open = value => { url = value; };
    plannerOpenGoogleMaps(); return url;
  });
  expect(new URL(maps).searchParams.get('destination')).toBe(result.juliao.coords.join(','));
  const html = await page.evaluate(async () => (await buildOfflineTrip(tripSelection.map(id => touristSpots.find(s => s.id === id)))).text());
  expect(html).toContain('data:image/jpeg;base64,');
  expect(html).not.toContain('<script');
  await context.setOffline(true);
  await page.setContent(html);
  await expect(page.locator('article')).toHaveCount(2);
  expect(await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode().then(() => img.naturalWidth > 0))))).toEqual([true,true]);
});

test('offline export rejects missing photos and excess selection', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof buildOfflineTrip === 'function');
  expect(await page.evaluate(async () => {
    try { await buildOfflineTrip(touristSpots.slice(0,11)); return false; } catch { return true; }
  })).toBe(true);
  await page.route('**/assets/images/**', route => route.abort());
  expect(await page.evaluate(async () => {
    try { await buildOfflineTrip([touristSpots[0]]); return false; } catch { return true; }
  })).toBe(true);
});


test('maritime profiles match providers by capability without context links', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof getMaritimeOptionsForSpot === 'function');
  const data = await page.evaluate(() => ({
    bonete: getMaritimeOptionsForSpot('praia-do-bonete'),
    fome: getMaritimeOptionsForSpot('praia-da-fome'),
    eustaquio: getMaritimeOptionsForSpot('saco-do-eustaquio'),
    castelhanos: getMaritimeOptionsForSpot('baia-de-castelhanos')
  }));
  for (const options of [data.bonete, data.fome, data.eustaquio, data.castelhanos]) {
    expect(options).toHaveLength(1);
    expect(options[0].embarkation).toBeNull();
    expect(options[0].providers.map(provider => provider.id).sort()).toEqual(['chagas-passeios', 'portinho-passeios']);
  }
  expect(data.fome[0].id).toBe('east-coast');
  expect(data.eustaquio[0].id).toBe('east-coast');
  expect(data.castelhanos[0].id).toBe('east-coast');
});
