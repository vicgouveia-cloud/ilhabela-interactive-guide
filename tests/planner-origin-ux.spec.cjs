const {test, expect} = require('@playwright/test');

for (const lang of ['pt', 'en', 'es', 'fr', 'he']) {
  for (const width of [390, 1440]) {
    test(`origin UX ${lang} ${width}: absent, denied, accepted, manual, changed and per day`, async ({page}) => {
      await page.setViewportSize({width, height: 900});
      await page.goto('/');
      await page.waitForFunction(() => typeof renderPlannerOriginActions === 'function');
      await page.evaluate(lang => {
        setLanguage(lang);
        tripSelection = ['praia-do-curral', 'praia-do-pereque'];
        tripDays = {'praia-do-pereque': 2};
        tripDayOrigins = {};
        tripDayReturnToOrigin = {};
        tripCompletedStops = {};
        activeTripDay = 1;
        lastUserLocation = null;
        openPlannerSummary();
        window.alert = () => {};
      }, lang);
      const actions = page.locator('#planner-origin-actions');
      await expect(actions.locator('button')).toHaveCount(2);
      const absent = await page.evaluate(() => ({question: t('plannerOriginQuestion').replace('{n}', 1), hint: t('plannerOriginMapsHint'), use: t('plannerUseLocation')}));
      await expect(actions).toContainText(absent.question);
      await expect(actions).toContainText(absent.hint);
      await expect(actions.locator('button').first()).toHaveText(absent.use);
      await page.evaluate(() => {
        navigator.geolocation.getCurrentPosition = (success, failure) => failure({code: 1});
      });
      await actions.locator('button').first().click();
      await expect(actions.locator('[role="alert"]')).toBeVisible();
      await actions.locator('button').last().click();
      const mapHint = page.locator('#planner-origin-map-hint');
      await expect(mapHint).toBeVisible();
      await expect(mapHint).toHaveText(await page.evaluate(() => t('plannerOriginMapInstruction').replace('{n}', 1)));
      await page.locator('#planner-summary-list').evaluate(el => { el.scrollTop = el.scrollHeight; });
      await expect(mapHint).toBeInViewport();
      await page.evaluate(() => plannerMap.fire('click', {latlng: {lat: -23.81, lng: -45.37}}));
      await expect(mapHint).toBeHidden();
      await expect(actions.locator('[role="alert"]')).toHaveCount(0);
      await expect(actions.locator('button').first()).toHaveText(absent.use);
      await expect(actions.locator('button').last()).toHaveText(await page.evaluate(() => t('plannerOriginChange')));
      await actions.locator('button').last().click();
      await page.evaluate(() => plannerMap.fire('click', {latlng: {lat: -23.82, lng: -45.38}}));
      expect(await page.evaluate(() => plannerOrigin)).toEqual([-23.82, -45.38]);
      await page.evaluate(() => {
        setActiveTripDay(2);
        navigator.geolocation.getCurrentPosition = success => success({coords: {latitude: -23.8, longitude: -45.36}});
      });
      await expect(actions).toContainText(await page.evaluate(() => t('plannerOriginQuestion').replace('{n}', 2)));
      await actions.locator('button').first().click();
      expect(await page.evaluate(() => plannerOrigin)).toEqual([-23.8, -45.36]);
      await page.evaluate(() => setActiveTripDay(1));
      expect(await page.evaluate(() => plannerOrigin)).toEqual([-23.82, -45.38]);
      const overflow = await page.evaluate(() => {
        const panel = document.getElementById('planner-summary-list');
        const area = document.getElementById('planner-origin-actions');
        const buttons = [...area.querySelectorAll('button')].map(el => el.getBoundingClientRect());
        return {panel: panel.scrollWidth > panel.clientWidth + 1, actions: area.scrollWidth > area.clientWidth + 1,
          overlap: buttons.length === 2 && Math.min(buttons[0].right, buttons[1].right) > Math.max(buttons[0].left, buttons[1].left)
            && Math.min(buttons[0].bottom, buttons[1].bottom) > Math.max(buttons[0].top, buttons[1].top)};
      });
      expect(overflow).toEqual({panel: false, actions: false, overlap: false});
    });
  }
}
