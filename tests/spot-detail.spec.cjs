const {test,expect}=require('@playwright/test');
for(const width of [390,1440]) for(const lang of ['pt','en','es','fr','he']) {
 test(`spot detail ${lang} ${width}`,async({page},info)=>{
  await page.setViewportSize({width,height:900});
  await page.goto('/');
  await page.waitForFunction(()=>typeof mapMarkers!=='undefined'&&mapMarkers.length>0);
  await page.evaluate(lang=>setLanguage(lang),lang);
  await page.locator('#tab-grid').click();
  const opener=page.locator('#spots-grid .attraction-card-details').first();
  await opener.focus();await page.keyboard.press('Enter');
  const modal=page.locator('#spot-modal');
  await expect(modal).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('dir',lang==='he'?'rtl':'ltr');
  await expect(modal.locator('.spot-trip-toggle')).toBeFocused();
  await expect(modal.locator('.spot-trip-toggle')).toHaveAccessibleName(await page.evaluate(()=>t('spotAddTrip')));
  await expect(modal.locator('#modal-photo-credit')).toHaveAttribute('href',await page.evaluate(()=>touristSpots[0].photoSource));
  await expect(modal.locator('#modal-main-img')).toHaveAttribute('src',await page.evaluate(()=>touristSpots[0].image));
  await expect.poll(()=>modal.locator('#modal-main-img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  for(const key of ['routeDistance','routeDuration','routeElevation']) await expect(modal.getByText(await page.evaluate(k=>t(k),key),{exact:true})).toHaveCount(0);
  expect(await modal.locator('.modal-sheet').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
  expect(await page.evaluate(()=>document.getElementById('spot-modal').contains(document.elementFromPoint(innerWidth/2,innerHeight-30)))).toBe(true);
  await modal.locator('.modal-sheet').evaluate(el=>el.scrollTop=0);
  await page.screenshot({path:info.outputPath(`detail-${lang}-${width}.png`)});
  await modal.locator('.spot-trip-toggle').focus();await page.keyboard.press('Enter');
  await expect(modal.locator('.spot-trip-toggle')).toHaveAttribute('aria-pressed','true');
  await expect(modal.locator('.spot-trip-toggle')).toBeFocused();
  await expect(modal.locator('.spot-trip-view')).toHaveAccessibleName(await page.evaluate(()=>t('spotViewTrip')));
  expect(await page.evaluate(()=>isSpotInTrip(selectedSpotId))).toBe(true);
  await modal.locator('.spot-trip-toggle').press('Enter');
  await expect(modal.locator('.spot-trip-toggle')).toHaveAttribute('aria-pressed','false');
  const first=modal.locator('select').first();await first.focus();await page.keyboard.press('Shift+Tab');
  await expect(modal.locator('[data-contact-entry]')).toBeFocused();
  await page.keyboard.press('Tab');await expect(first).toBeFocused();
  await page.keyboard.press('Escape');await expect(modal).toBeHidden();await expect(opener).toBeFocused();
  await page.locator('#tab-map').click();
  await page.evaluate(()=>mapMarkers[0].fire('click'));
  await expect(modal).toBeVisible();
  await modal.locator('.spot-trip-toggle').click();await modal.locator('.spot-trip-view').click();
  await expect(modal).toBeHidden();await expect(page.locator('#planner-modal')).toBeVisible();
 });
}
test('detail preserves gallery and links on locale changes and hides unvalidated measures for all attractions',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>typeof touristSpots!=='undefined');
 await page.evaluate(()=>openSpotModal('praia-do-bonete'));
 await page.locator('#spot-modal button[onclick="nextModalImage(event)"]').click();
 for(const lang of ['pt','en','es','fr','he']) {
  await page.locator('#spot-modal [data-language-select]').selectOption(lang);
  expect(await page.evaluate(()=>currentModalImageIndex)).toBe(1);
  await expect(page.locator('#modal-main-img')).toHaveAttribute('src',await page.evaluate(()=>touristSpots[0].images[1]));
  await expect(page.locator('#spot-modal .spot-trip-toggle')).toHaveAccessibleName(await page.evaluate(()=>t('spotAddTrip')));
  await expect(page.locator('#spot-modal a[href="/lugares/praia-do-bonete/"]')).toBeAttached();
 }
 const failures=await page.evaluate(()=>{
  const failures=[];
  for(const spot of touristSpots){
   openSpotModal(spot.id);
   const content=document.getElementById('spot-modal-content').textContent;
   if(['routeDistance','routeDuration','routeElevation'].some(k=>content.includes(t(k)))) failures.push(spot.id);
  }
  return failures;
 });
 expect(failures).toEqual([]);
 await page.evaluate(()=>openSpotModal('praia-do-bonete'));
 await page.locator('#spot-modal button[onclick*="openBookingForSpot"]').click();
 await expect(page.locator('#booking-modal')).toBeVisible();
 await expect(page.locator('#booking-tour')).toHaveValue('praia-do-bonete');
});
