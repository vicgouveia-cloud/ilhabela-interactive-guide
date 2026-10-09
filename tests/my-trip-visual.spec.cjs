const {test, expect} = require('@playwright/test');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
for (const width of [390, 1440]) for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  test(`my trip visual and controls ${lang} ${width}`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    if (process.env.TRIP_STAGE === 'before') {
      for (const file of ['planner.js', 'styles.css', 'translations.js']) {
        const body = execFileSync('git', ['show', `a2a1db7fcbc402d42aa4ae25fd8e423a16526054:${file}`], {cwd:path.resolve(__dirname, '..'), encoding:'utf8'});
        await page.route(`**/${file}*`, route => route.fulfill({body, contentType:file.endsWith('.css') ? 'text/css' : 'text/javascript'}));
      }
    }
    await page.goto('/');
    await page.waitForFunction(() => typeof openPlannerSummary === 'function');
    await page.evaluate(lang => {
      setLanguage(lang);
      tripSelection = ['praia-do-curral', 'praia-grande', 'praia-do-juliao', 'baia-de-castelhanos', 'praia-do-bonete'];
      tripDays = {}; tripDayOrigins = {}; tripDayReturnToOrigin = {}; tripCompletedStops = {};
      activeTripDay = 1; plannerTravelMode = 'auto'; plannerOptimizedRoute = null;
      window.confirm = () => true;
      window.open = url => { window.lastNavigation = url; };
      openPlannerSummary();
    }, lang);
    const list = page.locator('#planner-summary-list');
    await expect(page.locator('html')).toHaveAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    await expect(page.locator('#planner-origin-actions')).toContainText(await page.evaluate(() => t('plannerOriginQuestion').replace('{n}', 1)));
    await page.screenshot({path:path.resolve(__dirname, '../../my-trip-evidence', process.env.TRIP_STAGE || 'after', `${lang}-${width}-pending.png`)});
    await page.locator('button[onclick="movePlannerSpot(\'praia-grande\', -1)"]').click();
    expect(await page.evaluate(() => tripSelection.slice(0, 2))).toEqual(['praia-grande', 'praia-do-curral']);
    await page.locator('select[onchange*="setSpotTripDay(\'praia-do-bonete\'"]').selectOption('2');
    await page.locator('button[onclick="setActiveTripDay(2)"]').click();
    expect(await page.evaluate(() => getActiveTripSpots().map(s => s.id))).toEqual(['praia-do-bonete']);
    await page.evaluate(() => saveActiveDayOrigin([-23.8, -45.36]));
    await expect(page.locator('#planner-origin-actions button').last()).toHaveText(await page.evaluate(() => t('plannerOriginChange')));
    await page.locator('button[onclick="setActiveTripDay(1)"]').click();
    expect(await page.evaluate(() => plannerOrigin)).toBeNull();
    await page.evaluate(() => {
      saveActiveDayOrigin([-23.81, -45.37]);
      setActiveDayReturn(true);
    });
    await page.route('**/optimized_route', route => {
      const payload = route.request().postDataJSON();
      return route.fulfill({json:{trip:{locations:payload.locations.map((_, original_index) => ({original_index})), summary:{length:10,time:1200}, legs:payload.locations.slice(1).map(() => ({shape:'',summary:{length:2,time:240}}))}}});
    });
    await page.locator('button[onclick="plannerOptimizeRoute()"]').click();
    await expect(page.locator('.planner-leg-estimate').first()).toBeVisible();
    await expect(page.locator('#planner-routing-panel')).toContainText(await page.evaluate(() => t('plannerPartialEstimate')));
    await page.locator('button[onclick="plannerOpenGoogleMaps(0)"]').click();
    expect(new URL(await page.evaluate(() => window.lastNavigation)).searchParams.get('origin')).toBe('-23.81,-45.37');
    await list.evaluate(el => { el.scrollTop = 0; });
    await page.locator('#planner-summary-view').evaluate(el => { el.scrollTop = 0; });
    await page.screenshot({path:path.resolve(__dirname, '../../my-trip-evidence', process.env.TRIP_STAGE || 'after', `${lang}-${width}-configured.png`)});
    await page.locator('#planner-origin-actions').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.resolve(__dirname, '../../my-trip-evidence', process.env.TRIP_STAGE || 'after', `${lang}-${width}-origin.png`)});
    await page.locator('select[onchange*="setSpotTripDay"]').first().scrollIntoViewIfNeeded();
    await page.screenshot({path:path.resolve(__dirname, '../../my-trip-evidence', process.env.TRIP_STAGE || 'after', `${lang}-${width}-cards.png`)});
    await page.locator('button[onclick="setPlannerStopCompleted(\'praia-grande\', true)"]').click();
    expect(await page.evaluate(() => isPlannerStopCompleted('praia-grande', 1))).toBe(true);
    await page.locator('button[onclick="setPlannerStopCompleted(\'praia-grande\', false)"]').click();
    expect(await page.evaluate(() => isPlannerStopCompleted('praia-grande', 1))).toBe(false);
    const overflow = await page.evaluate(() => ['planner-modal','planner-summary-view','planner-summary-list','planner-routing-panel','planner-origin-actions'].filter(id => {
      const el = document.getElementById(id); return el.scrollWidth > el.clientWidth + 1;
    }));
    expect(overflow).toEqual([]);
    if (process.env.TRIP_STAGE !== 'before') {
      await expect(page.locator('button[onclick="setActiveTripDay(1)"]')).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('button[onclick="movePlannerSpot(\'praia-do-curral\', -1)"]')).toHaveAccessibleName(await page.evaluate(() => t('plannerMoveUp')));
      const target = page.locator('button[onclick="movePlannerSpot(\'praia-do-curral\', -1)"]');
      await target.focus();
      await page.keyboard.press('Enter');
      expect(await page.evaluate(() => tripSelection[0])).toBe('praia-do-curral');
      const controls = await page.locator('.planner-edit-card').first().locator('button, select').evaluateAll(elements => elements.map(el => {
        const box = el.getBoundingClientRect(); return {x:box.x,y:box.y,width:box.width,height:box.height};
      }));
      expect(controls.every(box => box.width >= 44 && box.height >= 44)).toBe(true);
      for (let i = 0; i < controls.length; i++) for (let j = i + 1; j < controls.length; j++) {
        const a = controls[i], b = controls[j];
        expect(Math.min(a.x+a.width,b.x+b.width) > Math.max(a.x,b.x) && Math.min(a.y+a.height,b.y+b.height) > Math.max(a.y,b.y)).toBe(false);
      }
    }
    await page.locator('button[onclick="plannerStartOriginPick()"]').click();
    await expect(page.locator('#planner-origin-map-hint')).toBeInViewport();
    await page.evaluate(() => plannerMap.fire('click',{latlng:{lat:-23.82,lng:-45.38}}));
    expect(await page.evaluate(() => plannerOrigin)).toEqual([-23.82,-45.38]);
    expect(await page.evaluate(() => tripDayOrigins[2])).toEqual([-23.8,-45.36]);
    await page.locator('button[onclick="removeFromPlanner(\'baia-de-castelhanos\')"]').click();
    expect(await page.evaluate(() => isSpotInTrip('baia-de-castelhanos'))).toBe(false);
    await page.reload();
    await page.waitForFunction(() => typeof isSpotInTrip === 'function');
    expect(await page.evaluate(() => isSpotInTrip('baia-de-castelhanos'))).toBe(false);
    expect(await page.evaluate(() => tripDayOrigins[2])).toEqual([-23.8,-45.36]);
  });
}
