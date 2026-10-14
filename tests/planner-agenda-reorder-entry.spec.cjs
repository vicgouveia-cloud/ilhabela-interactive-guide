const { test, expect } = require('@playwright/test');

for (const lang of ['pt','en','es','fr','he']) for (const width of [390,1440]) {
  test(`agenda opens reorder controls ${lang} ${width}`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.addInitScript(()=>localStorage.setItem('ilhabela_trip',JSON.stringify(['praia-do-portinho','baia-de-castelhanos','praia-do-bonete'])));
    await page.goto('/');
    await page.evaluate(value=>{setLanguage(value);openPlannerSummary();},lang);
    const trigger=page.locator('.planner-agenda button[onclick="plannerOpenReorderFromAgenda()"]');
    const editor=page.locator('#planner-organize-details');
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveText(await page.evaluate(()=>t('plannerAgendaReorder')));
    await expect(editor).not.toHaveAttribute('open','');
    await trigger.click();
    await expect(editor).toHaveAttribute('open','');
    await expect(editor.locator('button[onclick^="movePlannerSpot("]')).not.toHaveCount(0);
    await expect(editor.locator('summary')).toBeFocused();
    await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
  });
}

test('manual reordering after optimization discards stale route estimates',async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('ilhabela_trip',JSON.stringify(['praia-do-portinho','baia-de-castelhanos','praia-do-bonete'])));
  await page.goto('/');
  await page.evaluate(()=>openPlannerSummary());
  const result=await page.evaluate(()=>{
    const original=tripSelection.slice();
    // Use a controlled optimization fixture without any external navigation or Valhalla request.
    plannerOptimizedRoute={spotIds:['praia-do-bonete','baia-de-castelhanos','praia-do-portinho'],legs:[],timeSeconds:3000,distanceKm:20};
    const chosen=getPlannerDisplaySpots().map(spot=>spot.id);
    movePlannerSpot(chosen[0],1);
    return {original,chosen,after:tripSelection.slice(),route:plannerOptimizedRoute};
  });
  expect(result.route).toBe(null);
  expect(result.after[0]).toBe(result.chosen[1]);
  expect(result.after[1]).toBe(result.chosen[0]);
  await expect(page.locator('.planner-route-stats')).toHaveCount(0);
});
