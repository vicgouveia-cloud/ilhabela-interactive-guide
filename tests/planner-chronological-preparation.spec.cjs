const {test,expect}=require('@playwright/test');

for(const width of [390,1440]) for(const lang of ['pt','en','es','fr','he']){
  test(`day preparation comes before route execution ${lang} ${width}`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.addInitScript(()=>localStorage.setItem('ilhabela_trip',JSON.stringify(['baia-de-castelhanos','praia-do-bonete','praia-do-portinho'])));
    await page.goto('/');
    await page.evaluate(language=>{setLanguage(language);openPlannerSummary()},lang);
    const prep=page.locator('#planner-preparation');
    await expect(prep).toBeVisible();
    await expect(prep.locator('#planner-origin-actions')).toBeVisible();
    await expect(prep.locator('button[onclick="plannerSetTravelMode(\'4x4\')"]')).toBeVisible();
    await expect(prep.locator('button[onclick="plannerOptimizeRoute()"]')).toBeVisible();
    await expect(page.locator('#planner-routing-panel button[onclick="plannerOptimizeRoute()"]')).toHaveCount(0);
    const domOrder=await page.evaluate(()=>{
      const list=document.querySelector('#planner-summary-list');
      return Array.from(list.querySelectorAll('#planner-preparation,#planner-maritime-options,#planner-routing-panel,.planner-progress,.planner-agenda'))
        .map(n=>n.id||Array.from(n.classList).find(v=>v.startsWith('planner-')));
    });
    expect(domOrder[0]).toBe('planner-preparation');
    expect(domOrder.indexOf('planner-routing-panel')).toBeLessThan(domOrder.indexOf('planner-progress'));
    expect(domOrder.indexOf('planner-progress')).toBeLessThan(domOrder.indexOf('planner-agenda'));
    expect(await prep.evaluate(node=>node.textContent)).toContain(await page.evaluate(()=>t('plannerReadyPendingTitle')));
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
    await prep.locator('button[onclick="plannerSetTravelMode(\'4x4\')"]').click();
    await expect(page.locator('#planner-preparation')).toBeVisible();
    await expect(page.locator('#planner-routing-panel')).toBeVisible();
  });
}

test('origin is editable only once, with return-to-origin and Google Maps retained',async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('ilhabela_trip',JSON.stringify(['baia-de-castelhanos','praia-do-bonete','praia-do-portinho'])));
  await page.goto('/');
  await page.evaluate(()=>openPlannerSummary());
  await expect(page.locator('#planner-origin-actions')).toHaveCount(1);
  await expect(page.locator('#planner-preparation button[onclick="plannerStartOriginPick()"]')).toBeVisible();
  await expect(page.locator('#planner-routing-panel button[onclick="plannerOpenGoogleMaps(0)"]')).toBeVisible();
  await expect(page.locator('#planner-maritime-options')).toBeVisible();
});

test('without selected places existing empty-state remains unchanged',async({page})=>{
  await page.addInitScript(()=>localStorage.removeItem('ilhabela_trip'));
  await page.goto('/');
  await page.evaluate(()=>openPlannerSummary());
  await expect(page.locator('.planner-empty-state')).toBeVisible();
  await expect(page.locator('#planner-preparation')).toHaveCount(0);
});
