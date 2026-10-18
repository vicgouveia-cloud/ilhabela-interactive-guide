const {test,expect}=require('@playwright/test');
for(const lang of ['pt','en','es','fr','he'])for(const width of [320,390,1440]){
 test('routing warnings remain visible without visit estimates: '+lang+' '+width,async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto('/');
  const state=await page.evaluate(lang=>{
   setLanguage(lang);tripSelection=['praia-do-curral','praia-do-juliao'];
   tripDays={};activeTripDay=1;tripCompletedStops={};plannerTravelMode='auto';
   plannerOptimizedRoute={spotIds:[...tripSelection],distanceKm:5,timeSeconds:600,shape:[]};
   openPlannerSummary();
   return {covered:getPlannerVisitEstimate().covered,partial:t('plannerRoutePartialEstimateHint'),approximate:t('plannerApproximateEstimate'),road:t('planner4x4RouteHint')};
  },lang);
  expect(state.covered).toBe(0);
  await expect(page.locator('#planner-transport-details')).not.toHaveAttribute('open','');
  const partial=page.locator('.planner-route-stats').getByText(state.partial,{exact:false});
  await expect(partial).toBeVisible();
  await page.evaluate(()=>{
   plannerTravelMode='4x4';tripSelection=['praia-do-curral','baia-de-castelhanos'];
   plannerOptimizedRoute={spotIds:[...tripSelection],distanceKm:24,timeSeconds:3600,shape:[]};renderSummary();
  });
  await expect(page.locator('.planner-route-stats')).toContainText(state.approximate);
  await expect(page.locator('.planner-route-stats').getByText(state.road,{exact:false})).toBeVisible();
  expect(await page.evaluate(()=>document.getElementById('planner-modal').scrollWidth<=innerWidth+1)).toBe(true);
  await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
 });
}
