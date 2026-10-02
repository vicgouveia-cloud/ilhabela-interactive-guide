const {test, expect} = require('@playwright/test');
test('routing and Google Maps exclude completed stops while preserving pending optimized order', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof getPlannerPendingSpots === 'function');
  const mapsResult = await page.evaluate(() => {
    activeTripDay = 1;
    plannerTravelMode = 'auto';
    plannerOrigin = null;
    tripSelection = ['praia-do-curral', 'praia-do-pereque', 'praia-grande'];
    tripCompletedStops = {'1:praia-do-curral': true};
    plannerOptimizedRoute = {
      spotIds: ['praia-do-curral', 'praia-grande', 'praia-do-pereque'],
      distanceKm: 5,
      timeSeconds: 600,
      shape: []
    };
    window.confirm = () => true;
    let opened;
    window.open = value => { opened = value; };
    const pending = getPlannerPendingSpots();
    const ordered = getOptimizedRouteSpots(
      pending.filter(spot => isSpotRoutableForMode(spot, plannerTravelMode))
    );
    const expected = ordered.map(spot => resolvePlannerAccess(spot, plannerTravelMode).coords.join(','));
    plannerOpenGoogleMaps();
    return { opened, pending: pending.map(spot => spot.id), expected };
  });
  const mapsParams = new URL(mapsResult.opened).searchParams;
  expect(mapsResult.pending).toEqual(['praia-do-pereque', 'praia-grande']);
  expect(mapsParams.get('destination')).toBe(mapsResult.expected.at(-1));
  expect(mapsParams.get('waypoints')).toBe(mapsResult.expected.slice(0, -1).join('|'));

  let payload;
  await page.route('**/optimized_route', async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({json:{trip:{
      locations:[{original_index:0},{original_index:1}],
      summary:{length:2,time:300},
      legs:[{shape:'??'}]
    }}});
  });
  const coords = await page.evaluate(async () => {
    activeTripDay = 1;
    plannerTravelMode = 'auto';
    plannerOrigin = null;
    tripSelection = ['praia-do-curral', 'praia-do-pereque', 'praia-grande'];
    tripCompletedStops = {'1:praia-do-curral': true};
    plannerOptimizedRoute = null;
    window.confirm = () => true;
    const remaining = getPlannerPendingSpots()
      .filter(spot => isSpotRoutableForMode(spot, plannerTravelMode))
      .map(spot => resolvePlannerAccess(spot, plannerTravelMode).coords);
    await plannerOptimizeRoute();
    return remaining;
  });
  expect(payload.locations).toEqual(coords.map(([lat, lon]) => ({lat, lon, type: 'break'})));
});

test('completed day offers return navigation only when return-to-origin is configured', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof plannerNavigateToOrigin === 'function');
  const result = await page.evaluate(() => {
    activeTripDay = 1;
    plannerTravelMode = 'auto';
    plannerOrigin = [-23.80, -45.36];
    tripSelection = ['praia-do-curral'];
    tripCompletedStops = {'1:praia-do-curral': true};
    tripDayReturnToOrigin = {1: true};
    const spots = getActiveTripSpots();
    const enabledHtml = renderPlannerVisitProgress(spots);
    let opened;
    window.open = value => { opened = value; };
    const navigated = plannerNavigateToOrigin();

    tripDayReturnToOrigin = {};
    const disabledHtml = renderPlannerVisitProgress(spots);
    return { enabledHtml, disabledHtml, opened, navigated };
  });
  const params = new URL(result.opened).searchParams;
  expect(result.enabledHtml).toContain('Navegar de volta à origem');
  expect(result.disabledHtml).not.toContain('Navegar de volta à origem');
  expect(result.navigated).toBe(true);
  expect(params.get('destination')).toBe('-23.8,-45.36');
  expect(params.get('origin')).toBeNull();
  expect(params.get('travelmode')).toBe('driving');
});

test('undo targets the most recently completed stop even after visible order changes', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof getPlannerLastCompletedStop === 'function');
  const result = await page.evaluate(() => {
    activeTripDay = 1;
    tripSelection = ['praia-do-curral', 'praia-do-pereque', 'praia-grande'];
    tripCompletedStops = {};
    tripCompletedStops['1:praia-do-curral'] = true;
    tripCompletedStops['1:praia-do-pereque'] = true;

    const reordered = [
      touristSpots.find(spot => spot.id === 'praia-do-pereque'),
      touristSpots.find(spot => spot.id === 'praia-do-curral'),
      touristSpots.find(spot => spot.id === 'praia-grande')
    ];
    const last = getPlannerLastCompletedStop(reordered);
    const html = renderPlannerVisitProgress(reordered);
    return { lastId: last?.id || null, html };
  });
  expect(result.lastId).toBe('praia-do-pereque');
  expect(result.html).toContain("setPlannerStopCompleted('praia-do-pereque', false)");
  expect(result.html).not.toContain("setPlannerStopCompleted('praia-do-curral', false)");
});

test('completed-day card keeps an undo action for the last completed stop', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof renderPlannerVisitProgress === 'function');
  const result = await page.evaluate(() => {
    activeTripDay = 1;
    tripSelection = ['praia-do-curral', 'praia-do-pereque'];
    tripCompletedStops = {
      '1:praia-do-curral': true,
      '1:praia-do-pereque': true
    };
    const spots = getActiveTripSpots();
    return renderPlannerVisitProgress(spots);
  });
  expect(result).toContain('Dia concluído');
  expect(result).toContain('Desfazer última');
  expect(result).toContain("setPlannerStopCompleted('praia-do-pereque', false)");
});

test('first next-stop navigation uses the configured day origin but later stops use current location', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof plannerNavigateToSpot === 'function');
  const result = await page.evaluate(() => {
    activeTripDay = 1;
    plannerTravelMode = 'auto';
    plannerOrigin = [-23.80, -45.36];
    tripSelection = ['praia-do-curral', 'praia-do-pereque'];
    tripCompletedStops = {};
    window.confirm = () => true;
    const opened = [];
    window.open = value => { opened.push(value); };

    plannerNavigateToSpot('praia-do-curral');
    tripCompletedStops['1:praia-do-curral'] = true;
    plannerNavigateToSpot('praia-do-pereque');

    return opened;
  });
  const first = new URL(result[0]).searchParams;
  const second = new URL(result[1]).searchParams;
  expect(first.get('origin')).toBe('-23.8,-45.36');
  expect(second.get('origin')).toBeNull();
});

test('next-stop card navigates safely to resolved access and hides terrestrial action when unresolved', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof plannerNavigateToSpot === 'function' && typeof renderPlannerVisitProgress === 'function');
  const result = await page.evaluate(() => {
    plannerTravelMode = 'auto';
    tripSelection = ['praia-do-juliao'];
    const juliao = touristSpots.find(spot => spot.id === 'praia-do-juliao');
    const aymore = touristSpots.find(spot => spot.id === 'naufragio-aymore');
    window.confirm = () => true;
    let opened;
    window.open = value => { opened = value; };
    const navigated = plannerNavigateToSpot('praia-do-juliao');
    const juliaoHtml = renderPlannerVisitProgress([juliao]);
    const aymoreHtml = renderPlannerVisitProgress([aymore]);
    return { opened, navigated, juliaoHtml, aymoreHtml, access: resolvePlannerAccess(juliao, 'auto') };
  });
  const params = new URL(result.opened).searchParams;
  expect(result.navigated).toBe(true);
  expect(params.get('destination')).toBe(result.access.coords.join(','));
  expect(params.get('travelmode')).toBe('driving');
  expect(result.juliaoHtml).toContain('Navegar até próxima');
  expect(result.aymoreHtml).not.toContain('Navegar até próxima');
});

test('regular-car routes require confirmation before a final 4x4 handoff', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof plannerConfirmAccess === 'function');
  const result = await page.evaluate(() => {
    const castelhanos = touristSpots.find(spot => spot.id === 'baia-de-castelhanos');
    plannerTravelMode = 'auto';
    const prompts = [];
    window.confirm = message => { prompts.push(message); return false; };
    let opened = false;
    window.open = () => { opened = true; };
    tripSelection = ['baia-de-castelhanos'];
    plannerOpenGoogleMaps();
    const blockedPrompt = prompts[0] || '';

    prompts.length = 0;
    plannerTravelMode = '4x4';
    window.confirm = message => { prompts.push(message); return false; };
    plannerOpenGoogleMaps();
    return {
      blockedPrompt,
      opened,
      direct4x4Prompts: prompts.slice(),
      autoAccess: resolvePlannerAccess(castelhanos, 'auto'),
      directAccess: resolvePlannerAccess(castelhanos, '4x4')
    };
  });
  expect(result.autoAccess.finalMode).toBe('4x4');
  expect(result.blockedPrompt).toContain('4x4');
  expect(result.blockedPrompt).toContain('trecho final');
  expect(result.opened).toBe(true);
  expect(result.directAccess.finalMode).toBeNull();
  expect(result.direct4x4Prompts).toEqual([]);
});

test('4x4 route estimates are explicitly marked as approximate road-routing references', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof renderPlannerRoutingPanel === 'function');
  const html = await page.evaluate(() => {
    plannerTravelMode = '4x4';
    tripSelection = ['praia-do-curral', 'baia-de-castelhanos'];
    plannerOptimizedRoute = {
      spotIds: ['praia-do-curral', 'baia-de-castelhanos'],
      distanceKm: 24,
      timeSeconds: 3600,
      shape: []
    };
    const selected = getActiveTripSpots();
    const road = selected.filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
    const special = selected.filter(spot => !isSpotRoutableForMode(spot, plannerTravelMode));
    return renderPlannerRoutingPanel(road, special);
  });
  expect(html).toContain('Estimativa aproximada');
  expect(html).toContain('roteamento rodoviário padrão apenas como referência');
  expect(html).toContain('não valida condições da estrada');
});

test('total duration is marked partial when calculated route omits final access segments', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof renderPlannerRoutingPanel === 'function');
  const result = await page.evaluate(() => {
    plannerTravelMode = 'auto';
    plannerOptimizedRoute = { spotIds: ['praia-do-curral', 'praia-do-juliao'], distanceKm: 5, timeSeconds: 600, shape: [] };
    tripSelection = ['praia-do-curral', 'praia-do-juliao'];
    const selected = getActiveTripSpots();
    const road = selected.filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
    const special = selected.filter(spot => !isSpotRoutableForMode(spot, plannerTravelMode));
    const partialHtml = renderPlannerRoutingPanel(road, special);

    plannerOptimizedRoute = { spotIds: ['praia-do-curral', 'praia-do-pereque'], distanceKm: 5, timeSeconds: 600, shape: [] };
    tripSelection = ['praia-do-curral', 'praia-do-pereque'];
    const normalSelected = getActiveTripSpots();
    const normalRoad = normalSelected.filter(spot => isSpotRoutableForMode(spot, plannerTravelMode));
    const normalSpecial = normalSelected.filter(spot => !isSpotRoutableForMode(spot, plannerTravelMode));
    const normalHtml = renderPlannerRoutingPanel(normalRoad, normalSpecial);
    return { partialHtml, normalHtml };
  });
  expect(result.partialHtml).toContain('Estimativa parcial');
  expect(result.partialHtml).toContain('não inclui trechos finais');
  expect(result.normalHtml).toContain('Duração estimada');
  expect(result.normalHtml).not.toContain('não inclui trechos finais');
});

test('day readiness flags unresolved access and required 4x4 handoffs', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof getPlannerDayReadiness === 'function');
  const result = await page.evaluate(() => {
    plannerOrigin = [-23.80, -45.36];
    plannerTravelMode = 'auto';
    const find = id => touristSpots.find(s => s.id === id);
    return {
      castelhanos: getPlannerDayReadiness([find('baia-de-castelhanos')]),
      cabecuda: getPlannerDayReadiness([find('trilha-da-cabecuda-farol')]),
      juliao: getPlannerDayReadiness([find('praia-do-juliao')])
    };
  });
  expect(result.castelhanos.ready).toBe(false);
  expect(result.castelhanos.pending.some(item => item.key === '4x4:baia-de-castelhanos')).toBe(true);
  expect(result.cabecuda.ready).toBe(false);
  expect(result.cabecuda.pending.some(item => item.key === 'access:trilha-da-cabecuda-farol')).toBe(true);
  expect(result.juliao.ready).toBe(true);
});

test('optimized route order is reflected in agenda and map without moving special-access stops', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof getPlannerDisplaySpots === 'function');
  const result = await page.evaluate(() => {
    const ids = ['praia-do-curral', 'praia-do-bonete', 'praia-do-pereque', 'praia-grande'];
    tripSelection = ids.slice();
    plannerOptimizedRoute = {
      spotIds: ['praia-grande', 'praia-do-curral', 'praia-do-pereque'],
      distanceKm: 1,
      timeSeconds: 60,
      shape: []
    };
    const visible = getPlannerDisplaySpots().map(spot => spot.id);
    const agenda = renderPlannerDayAgenda(getPlannerDisplaySpots());
    initPlannerMap();
    const markerTitles = plannerMapMarkers
      .filter(marker => marker.getPopup && marker.getPopup())
      .map(marker => marker.getPopup().getContent());
    return { visible, agenda, markerTitles };
  });
  expect(result.visible).toEqual(['praia-grande', 'praia-do-bonete', 'praia-do-curral', 'praia-do-pereque']);
  expect(result.agenda.indexOf('Praia Grande')).toBeLessThan(result.agenda.indexOf('Praia do Bonete'));
  expect(result.agenda.indexOf('Praia do Bonete')).toBeLessThan(result.agenda.indexOf('Praia do Curral'));
  expect(result.markerTitles[0]).toContain('1. Praia Grande');
  expect(result.markerTitles.some(title => title.includes('2. Praia do Bonete'))).toBe(true);
});

test('planner map shows a separate access marker when navigation ends before the attraction', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof openPlannerSummary === 'function');
  const result = await page.evaluate(() => {
    tripSelection = ['praia-do-juliao'];
    plannerTravelMode = 'auto';
    openPlannerSummary();
    return {
      markerCount: plannerMapMarkers.length,
      attractionCoords: touristSpots.find(s => s.id === 'praia-do-juliao').coords,
      accessCoords: resolvePlannerAccess(touristSpots.find(s => s.id === 'praia-do-juliao'), 'auto').coords
    };
  });
  expect(result.markerCount).toBe(2);
  expect(result.accessCoords).not.toEqual(result.attractionCoords);
});

test('pedestrian mode uses verified gateways for final-walk attractions', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof resolvePlannerAccess === 'function');
  const result = await page.evaluate(() => {
    const find = id => touristSpots.find(s => s.id === id);
    return {
      juliao: resolvePlannerAccess(find('praia-do-juliao'), 'pedestrian'),
      feiticeira: resolvePlannerAccess(find('praia-da-feiticeira'), 'pedestrian')
    };
  });
  expect(result.juliao.coords).toEqual([-23.853583875006763, -45.41239561211879]);
  expect(result.juliao.finalMode).toBe('pedestrian');
  expect(result.feiticeira.coords).toEqual([-23.84660565107699, -45.410130644310605]);
  expect(result.feiticeira.finalMode).toBe('pedestrian');
});

test('special-access offshore pins never fall through into pedestrian or bicycle Maps routes', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof resolvePlannerAccess === 'function');
  const result = await page.evaluate(() => {
    const find = id => touristSpots.find(s => s.id === id);
    return {
      aymorePedestrian: resolvePlannerAccess(find('naufragio-aymore'), 'pedestrian'),
      aymoreBicycle: resolvePlannerAccess(find('naufragio-aymore'), 'bicycle'),
      cabrasPedestrian: resolvePlannerAccess(find('santuario-ilha-das-cabras'), 'pedestrian'),
      cabrasBicycle: resolvePlannerAccess(find('santuario-ilha-das-cabras'), 'bicycle'),
      curralPedestrian: resolvePlannerAccess(find('praia-do-curral'), 'pedestrian'),
      curralBicycle: resolvePlannerAccess(find('praia-do-curral'), 'bicycle')
    };
  });
  expect(result.aymorePedestrian).toBeNull();
  expect(result.aymoreBicycle).toBeNull();
  expect(result.cabrasPedestrian).toBeNull();
  expect(result.cabrasBicycle).toBeNull();
  expect(result.curralPedestrian).not.toBeNull();
  expect(result.curralBicycle).not.toBeNull();
});

test('Agua Branca car navigation ends at park entrance before walking', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof resolvePlannerAccess === 'function');
  const result = await page.evaluate(() => {
    tripSelection = ['trilha-da-agua-branca'];
    plannerOrigin = null;
    plannerOptimizedRoute = null;
    plannerTravelMode = 'auto';
    window.confirm = () => true;
    let url;
    window.open = value => { url = value; };
    const spot = touristSpots.find(s => s.id === 'trilha-da-agua-branca');
    plannerOpenGoogleMaps();
    return {url, access: resolvePlannerAccess(spot, 'auto'), notice: plannerAccessNotice(spot), roadRoutable: spot.routing.roadRoutable};
  });
  const params = new URL(result.url).searchParams;
  expect(params.get('destination')).toBe('-23.839249751545807,-45.36002116037754');
  expect(params.get('travelmode')).toBe('driving');
  expect(result.access.finalMode).toBe('trail');
  expect(result.access.gatewayName).toContain('Entrada');
  expect(result.notice).toContain('Trecho final a pé');
  expect(result.roadRoutable).toBe(false);
});

test('validated Bonete trailhead is used by Maps and optimizer', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof resolvePlannerAccess === 'function');
  const maps = await page.evaluate(() => {
    tripSelection = ['trilha-do-bonete'];
    plannerOrigin = null;
    plannerOptimizedRoute = null;
    window.confirm = () => true;
    let url;
    window.open = value => { url = value; };
    return ['auto','4x4','bicycle','pedestrian'].map(mode => {
      plannerTravelMode = mode;
      plannerOpenGoogleMaps();
      return {mode, url, notice: plannerAccessNotice(touristSpots.find(s => s.id === 'trilha-do-bonete'))};
    });
  });
  for (const {mode, url, notice} of maps) {
    const params = new URL(url).searchParams;
    expect(params.get('destination')).toBe('-23.936275064037446,-45.42730164154816');
    expect(params.get('travelmode')).toBe({auto:'driving','4x4':'driving',bicycle:'bicycling',pedestrian:'walking'}[mode]);
    expect(notice).toContain('Trecho final a pé');
  }
  let payload;
  await page.route('**/optimized_route', async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({json:{trip:{locations:[{original_index:0},{original_index:1}],summary:{length:2,time:300},legs:[{shape:'??'}]}}});
  });
  await page.evaluate(async () => {
    tripSelection = ['praia-do-curral','trilha-do-bonete'];
    plannerTravelMode = 'auto';
    await plannerOptimizeRoute();
  });
  expect(payload.locations[1]).toMatchObject({lat:-23.936275064037446,lon:-45.42730164154816});
  expect(payload.costing).toBe('auto');
});

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

test('offline export follows optimized order for the active day', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof buildOfflineTrip === 'function' && typeof getPlannerDisplaySpots === 'function');
  const html = await page.evaluate(async () => {
    activeTripDay = 1;
    tripSelection = ['praia-do-curral', 'praia-do-bonete', 'praia-do-pereque', 'praia-grande'];
    plannerOptimizedRoute = {
      spotIds: ['praia-grande', 'praia-do-curral', 'praia-do-pereque'],
      distanceKm: 1,
      timeSeconds: 60,
      shape: []
    };
    const spots = tripSelection.map(id => touristSpots.find(spot => spot.id === id)).filter(Boolean);
    return (await buildOfflineTrip(spots)).text();
  });
  const grande = html.indexOf('Praia Grande');
  const bonete = html.indexOf('Praia do Bonete');
  const curral = html.indexOf('Praia do Curral');
  const pereque = html.indexOf('Praia do Perequê');
  expect(grande).toBeGreaterThan(-1);
  expect(grande).toBeLessThan(bonete);
  expect(bonete).toBeLessThan(curral);
  expect(curral).toBeLessThan(pereque);
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


test('planner renders maritime candidates without claiming verified coverage', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof renderPlannerMaritimeOptions === 'function');
  const result = await page.evaluate(() => {
    const ids = ['praia-do-bonete', 'praia-da-fome', 'saco-do-eustaquio', 'baia-de-castelhanos'];
    const spots = ids.map(id => touristSpots.find(spot => spot.id === id)).filter(Boolean);
    const html = renderPlannerMaritimeOptions(spots);
    return { html, options: getMaritimeOptionsForSpots(spots) };
  });
  expect(result.options.map(option => option.id).sort()).toEqual(['bonete', 'east-coast']);
  expect(result.html).toContain('Opções de barco');
  expect(result.html).toContain('Chagas Passeios');
  expect(result.html).toContain('Portinho Passeios');
  expect(result.html).toContain('cobertura marítima confirmada');
  expect(result.html).toContain('Confirme saída, horário, disponibilidade e condições');
  expect(result.html).not.toContain('embarque em Perequê');
});


test('remote coastal beaches use maritime transport profiles without activity-only spots', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof getMaritimeOptionsForSpot === 'function');
  const result = await page.evaluate(() => ({
    enchova: getMaritimeOptionsForSpot('praia-da-enchova'),
    indaiauba: getMaritimeOptionsForSpot('praia-de-indaiauba'),
    poco: getMaritimeOptionsForSpot('praia-do-poco'),
    whales: getMaritimeOptionsForSpot('ponto-baleias-canal'),
    wreck: getMaritimeOptionsForSpot('naufragio-aymore')
  }));
  expect(result.enchova[0].id).toBe('south-remote-coast');
  expect(result.indaiauba[0].id).toBe('south-remote-coast');
  expect(result.poco[0].id).toBe('north-remote-coast');
  for (const options of [result.enchova, result.indaiauba, result.poco]) {
    expect(options[0].providers.map(provider => provider.id).sort()).toEqual(['chagas-passeios', 'portinho-passeios']);
    expect(options[0].embarkation).toBeNull();
  }
  expect(result.whales).toEqual([]);
  expect(result.wreck).toEqual([]);
});


test('nautical experiences keep whale watching and diving providers separate', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof getNauticalExperienceOptionsForSpot === 'function');
  const result = await page.evaluate(() => ({
    whaleSouth: getNauticalExperienceOptionsForSpot('ponto-baleias-sul-sepituba'),
    whaleCanal: getNauticalExperienceOptionsForSpot('ponto-baleias-canal'),
    aymore: getNauticalExperienceOptionsForSpot('naufragio-aymore'),
    cabras: getNauticalExperienceOptionsForSpot('santuario-ilha-das-cabras'),
    asturias: getNauticalExperienceOptionsForSpot('naufragio-principe-de-asturias'),
    beach: getNauticalExperienceOptionsForSpot('praia-do-bonete')
  }));
  for (const options of [result.whaleSouth, result.whaleCanal]) {
    expect(options[0].id).toBe('whale-watching');
    expect(options[0].providers.map(provider => provider.id)).toEqual(['portinho-passeios']);
  }
  for (const options of [result.aymore, result.cabras, result.asturias]) {
    expect(options[0].id).toBe('diving');
    expect(options[0].providers.map(provider => provider.id)).toEqual(['portinho-divers']);
  }
  expect(result.beach).toEqual([]);
});


test('planner renders nautical experiences separately from boat transport', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof renderPlannerNauticalExperiences === 'function');
  const result = await page.evaluate(() => {
    const ids = ['ponto-baleias-canal', 'naufragio-aymore'];
    const spots = ids.map(id => touristSpots.find(spot => spot.id === id)).filter(Boolean);
    return {
      experiences: renderPlannerNauticalExperiences(spots),
      maritime: renderPlannerMaritimeOptions(spots)
    };
  });
  expect(result.experiences).toContain('Experiências náuticas');
  expect(result.experiences).toContain('Observação de baleias');
  expect(result.experiences).toContain('Portinho Passeios');
  expect(result.experiences).toContain('Mergulho');
  expect(result.experiences).toContain('Portinho Divers');
  expect(result.maritime).toBe('');
});


test('nautical experience guidance does not treat experience coordinates as terrestrial destination', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof renderPlannerNauticalExperiences === 'function');
  const result = await page.evaluate(() => {
    const spot = touristSpots.find(item => item.id === 'naufragio-aymore');
    const option = getNauticalExperienceOptionsForSpot('naufragio-aymore')[0];
    return {
      meetingPoint: option.meetingPoint,
      html: renderPlannerNauticalExperiences([spot])
    };
  });
  expect(result.meetingPoint).toBeNull();
  expect(result.html).toContain('não um destino de acesso terrestre');
  expect(result.html).toContain('Ponto de encontro/embarque ainda não definido no guia');
  expect(result.html).toContain('Confirme com o prestador antes de se deslocar');
});
