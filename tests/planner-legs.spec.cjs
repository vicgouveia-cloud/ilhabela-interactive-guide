const {test, expect} = require('@playwright/test');

test('response legs map reordered endpoints, origin and return; stale and uncovered links stay hidden', async ({page}) => {
  let calls = 0;
  await page.route('**/optimized_route', async route => {
    calls++;
    await route.fulfill({json: {trip: {
      locations: [0, 2, 1, 3].map(original_index => ({original_index})),
      summary: {length: 15, time: 1800},
      legs: [1, 2, 3].map(n => ({shape: '??', summary: {length: n, time: n * 60}}))
    }}});
  });
  await page.goto('/');
  await page.waitForFunction(() => typeof plannerLegState === 'function');
  const result = await page.evaluate(async () => {
    tripSelection = ['praia-do-curral', 'praia-grande'];
    tripDays = {}; activeTripDay = 1; tripCompletedStops = {};
    tripDayOrigins = {1: [-23.8, -45.36]}; plannerOrigin = tripDayOrigins[1];
    tripDayReturnToOrigin = {1: true}; plannerTravelMode = 'auto'; window.confirm = () => true;
    openPlannerSummary();
    await plannerOptimizeRoute();
    const legs = plannerOptimizedRoute.legs;
    const html = renderPlannerDayAgenda(getPlannerDisplaySpots());
    const wrong = renderPlannerLegEstimate('origin', 'praia-do-curral');
    tripCompletedStops['1:praia-grande'] = true;
    const completed = renderPlannerLegEstimate('origin', 'praia-grande');
    delete tripCompletedStops['1:praia-grande'];
    tripSelection.reverse();
    const reordered = renderPlannerLegEstimate('origin', 'praia-grande');
    tripSelection.reverse();
    tripSelection.splice(1, 0, 'naufragio-aymore');
    plannerOptimizedRoute.legState = plannerLegState();
    const specialHtml = renderPlannerDayAgenda(getPlannerDisplaySpots());
    return {legs, html, wrong, completed, reordered, specialHtml};
  });
  expect(calls).toBe(1);
  expect(result.legs.map(leg => [leg.from, leg.to])).toEqual([
    ['origin', 'praia-grande'], ['praia-grande', 'praia-do-curral'], ['praia-do-curral', 'return']
  ]);
  expect((result.html.match(/class="planner-leg-estimate/g) || []).length).toBe(3);
  expect(result.wrong).toBe(''); expect(result.completed).toBe(''); expect(result.reordered).toBe('');
  expect((result.specialHtml.match(/class="planner-leg-estimate/g) || []).length).toBe(2);
});

test('gateway estimate is inbound only; absent origin and translations fit mobile and desktop', async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof plannerLegState === 'function');
  for (const width of [390, 1440]) {
    await page.setViewportSize({width, height: 900});
    for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
      const result = await page.evaluate(lang => {
        setLanguage(lang);
        tripSelection = ['praia-do-curral', 'praia-do-juliao']; tripDays = {}; activeTripDay = 1;
        tripCompletedStops = {}; tripDayOrigins = {}; plannerOrigin = null;
        tripDayReturnToOrigin = {1: true}; plannerTravelMode = 'auto';
        plannerOptimizedRoute = {spotIds: [...tripSelection], shape: [], legs: [
          {from: 'origin', to: 'praia-do-curral', distanceKm: 1, timeSeconds: 60},
          {from: 'praia-do-curral', to: 'praia-do-juliao', distanceKm: 6.4, timeSeconds: 720},
          {from: 'praia-do-juliao', to: 'return', distanceKm: 1, timeSeconds: 60}
        ], legState: plannerLegState()};
        openPlannerSummary();
        const lines = [...document.querySelectorAll('.planner-leg-estimate')];
        return {count: lines.length, text: lines[0]?.textContent, access: t('plannerLegAccess'),
          outbound: renderPlannerLegEstimate('praia-do-juliao', 'return'),
          overflow: lines.some(el => el.scrollWidth > el.clientWidth + 1)};
      }, lang);
      expect(result.count).toBe(1); expect(result.text).toContain('≈ 12 min');
      expect(result.text).toContain(result.access); expect(result.outbound).toBe('');
      expect(result.overflow).toBe(false);
    }
  }
});

test('incomplete endpoint mapping or absent leg summaries produces no invented estimates', async ({page}) => {
  await page.route('**/optimized_route', route => route.fulfill({json: {trip: {
    locations: [{original_index: 0}, {original_index: 1}], summary: {length: 1, time: 60}, legs: [{shape: '??'}]
  }}}));
  await page.goto('/');
  await page.waitForFunction(() => typeof plannerLegState === 'function');
  const legs = await page.evaluate(async () => {
    tripSelection = ['praia-do-curral', 'praia-grande']; tripDays = {}; activeTripDay = 1;
    tripCompletedStops = {}; tripDayOrigins = {}; plannerOrigin = null; tripDayReturnToOrigin = {};
    plannerTravelMode = 'auto'; window.confirm = () => true;
    await plannerOptimizeRoute(); return plannerOptimizedRoute.legs;
  });
  expect(legs).toEqual([]);
});
