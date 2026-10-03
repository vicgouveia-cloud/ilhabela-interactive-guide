const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {
  await page.goto('/');
  await page.waitForFunction(() => typeof isValidPlannerOrigin === 'function');
  await page.evaluate(() => {
    tripSelection = ['praia-do-curral', 'praia-do-pereque'];
    tripDays = {'praia-do-pereque': 2};
    activeTripDay = 1;
    tripDayOrigins = {};
    tripDayReturnToOrigin = {};
    tripCompletedStops = {};
    plannerOptimizedRoute = null;
    plannerTravelMode = 'auto';
    window.confirm = () => true;
    openPlannerSummary();
  });
});

test('shared map location defines a valid first-leg origin and completed stops still omit it', async ({page}) => {
  const result = await page.evaluate(() => {
    lastUserLocation = [-23.81, -45.37];
    navigator.geolocation.getCurrentPosition = () => { throw new Error('Cached location should be reused'); };
    plannerUseMyLocation();
    let opened;
    window.open = value => { opened = value; };
    plannerOpenGoogleMaps();
    const first = opened;
    plannerNavigateToSpot('praia-do-curral');
    const individual = opened;
    tripSelection.push('praia-grande');
    tripCompletedStops['1:praia-do-curral'] = true;
    plannerOpenGoogleMaps();
    const remaining = opened;
    plannerNavigateToSpot('praia-grande');
    return {origin: plannerOrigin, first, individual, remaining, next: opened,
      stored: JSON.parse(localStorage.getItem('ilhabela_trip_origins'))};
  });
  expect(result.origin).toEqual([-23.81, -45.37]);
  expect(result.stored['1']).toEqual(result.origin);
  for (const url of [result.first, result.individual]) {
    expect(new URL(url).searchParams.get('origin')).toBe('-23.81,-45.37');
  }
  for (const url of [result.remaining, result.next]) {
    expect(new URL(url).searchParams.get('origin')).toBeNull();
  }
});

test('fresh geolocation, denial and manual map selection preserve separate day origins', async ({page}) => {
  const result = await page.evaluate(() => {
    lastUserLocation = [null, null];
    navigator.geolocation.getCurrentPosition = success => success({coords: {latitude: -23.8, longitude: -45.36}});
    plannerUseMyLocation();
    const fresh = plannerOrigin;
    setActiveTripDay(2);
    let message;
    window.alert = value => { message = value; };
    navigator.geolocation.getCurrentPosition = (success, failure) => failure({code: 1});
    plannerUseMyLocation();
    const denied = plannerOrigin;
    plannerStartOriginPick();
    plannerMap.fire('click', {latlng: {lat: -23.82, lng: -45.38}});
    const manual = plannerOrigin;
    setActiveTripDay(1);
    return {fresh, denied, message, manual, restored: plannerOrigin,
      stored: JSON.parse(localStorage.getItem('ilhabela_trip_origins'))};
  });
  expect(result.fresh).toEqual([-23.8, -45.36]);
  expect(result.denied).toBeNull();
  expect(result.message).toBe('Não foi possível acessar sua localização.');
  expect(result.manual).toEqual([-23.82, -45.38]);
  expect(result.restored).toEqual(result.fresh);
  expect(result.stored).toEqual({'1': result.fresh, '2': result.manual});
  await page.reload();
  await page.waitForFunction(() => typeof getActiveDayOrigin === 'function');
  expect(await page.evaluate(() => { activeTripDay = 2; return getActiveDayOrigin(); })).toEqual(result.manual);
});

test('invalid persisted origins become pending while valid days survive reload', async ({page}) => {
  await page.evaluate(() => {
    localStorage.setItem('ilhabela_trip', JSON.stringify(tripSelection));
    localStorage.setItem('ilhabela_trip_days', JSON.stringify(tripDays));
    localStorage.setItem('ilhabela_trip_origins', JSON.stringify({1: [null, null], 2: [-23.82, -45.38], 3: [91, 0], 4: ['-23.8', '-45.3']}));
    localStorage.setItem('ilhabela_trip_returns', JSON.stringify({1: true}));
  });
  await page.reload();
  await page.waitForFunction(() => typeof plannerOpenGoogleMaps === 'function');
  const result = await page.evaluate(() => {
    activeTripDay = 1;
    openPlannerSummary();
    let url;
    window.open = value => { url = value; };
    plannerOpenGoogleMaps();
    return {origin: plannerOrigin, text: document.getElementById('planner-summary-list').innerText,
      stored: JSON.parse(localStorage.getItem('ilhabela_trip_origins')), url, returnNavigated: plannerNavigateToOrigin()};
  });
  expect(result.origin).toBeNull();
  expect(result.text).toContain('Origem ainda não definida');
  expect(result.stored).toEqual({'2': [-23.82, -45.38]});
  expect(new URL(result.url).searchParams.get('origin')).toBeNull();
  expect(new URL(result.url).searchParams.get('destination')).not.toBe(',');
  expect(result.returnNavigated).toBe(false);
});

test('invalid coordinates are rejected at save and never leak into Maps URLs', async ({page}) => {
  const result = await page.evaluate(() => {
    const invalid = [null, undefined, [null, null], [NaN, 0], [0, Infinity], ['', 0], ['1', 2], [91, 0], [0, -181], [0], [0, 0, 0], {lat: 0, lng: 0}];
    const rows = invalid.map(coords => {
      saveActiveDayOrigin(null);
      saveActiveDayOrigin(coords);
      const saved = getActiveDayOrigin();
      plannerOrigin = coords;
      tripDayReturnToOrigin = {1: true};
      const urls = [];
      window.open = value => { urls.push(value); };
      plannerOpenGoogleMaps();
      plannerNavigateToSpot('praia-do-curral');
      const returned = plannerNavigateToOrigin();
      return {saved, urls, returned, pending: getPlannerDayReadiness(getActiveTripSpots()).pending.some(item => item.key === 'origin')};
    });
    return {rows, boundaries: [[0, 0], [-90, -180], [90, 180]].map(isValidPlannerOrigin)};
  });
  expect(result.boundaries).toEqual([true, true, true]);
  for (const row of result.rows) {
    expect(row.saved).toBeNull();
    expect(row.pending).toBe(true);
    expect(row.returned).toBe(false);
    expect(row.urls).toHaveLength(2);
    for (const url of row.urls) {
      const params = new URL(url).searchParams;
      expect(params.has('origin')).toBe(false);
      expect(params.get('destination')).toBe('-23.8625,-45.4294');
      expect(decodeURIComponent(url)).not.toMatch(/(?:null|NaN|undefined|Infinity|origin=,)/);
    }
  }
});
