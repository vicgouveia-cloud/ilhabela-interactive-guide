const { test, expect } = require('@playwright/test');

// Browser policies can independently block Storage reads and writes.
for (const width of [390, 1440]) {
  for (const denied of ['both', 'read', 'write']) {
    test(`planner initializes and edits offline with ${denied} storage denied at ${width}px`, async ({page}) => {
      await page.setViewportSize({width, height:844});
      await page.route('**/_vercel/insights/script.js', route => route.fulfill({status:200,contentType:'application/javascript',body:''}));
      const errors=[]; page.on('pageerror', error=>errors.push(error.message));
      await page.addInitScript(mode => {
        const get=Storage.prototype.getItem, set=Storage.prototype.setItem;
        Storage.prototype.getItem=function(key) {
          if(mode==='both'||mode==='read') throw new DOMException('Blocked','SecurityError');
          return get.call(this,key);
        };
        Storage.prototype.setItem=function(key,value) {
          if(mode==='both'||mode==='write') throw new DOMException('Blocked','SecurityError');
          return set.call(this,key,value);
        };
      },denied);
      await page.goto('/');
      await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(50);
      await page.evaluate(() => {
        plannerSetTravelMode('bicycle'); // empty trip, without a map transition
        toggleSpotInTrip('praia-do-juliao');
        tripDays['praia-do-juliao']=2;
        tripDayOrigins[2]=[-23.82,-45.36];
        tripDayReturnToOrigin[2]=true;
        tripCompletedStops['2:praia-do-juliao']=true;
        saveTripSelection();
      });
      expect(await page.evaluate(() => ({
        mode:plannerTravelMode, selected:tripSelection.slice(),
        day:getSpotTripDay('praia-do-juliao'), origin:tripDayOrigins[2],
        returnToOrigin:tripDayReturnToOrigin[2], completed:tripCompletedStops['2:praia-do-juliao']
      }))).toEqual({mode:'bicycle',selected:['praia-do-juliao'],day:2,
        origin:[-23.82,-45.36],returnToOrigin:true,completed:true});
      expect(errors).toEqual([]);
    });
  }

  test(`planner persists on next action after storage recovers at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:844});
    await page.route('**/_vercel/insights/script.js',route=>route.fulfill({status:200,contentType:'application/javascript',body:''}));
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.addInitScript(()=>{
      window.__storageDenied=window.name!=='storage-restored';
      const get=Storage.prototype.getItem,set=Storage.prototype.setItem;
      Storage.prototype.getItem=function(key){
        if(window.__storageDenied) throw new DOMException('Blocked','SecurityError');
        return get.call(this,key);
      };
      Storage.prototype.setItem=function(key,value){
        if(window.__storageDenied) throw new DOMException('Blocked','SecurityError');
        return set.call(this,key,value);
      };
    });
    await page.goto('/');
    await page.evaluate(()=>{
      plannerSetTravelMode('bicycle');
      toggleSpotInTrip('praia-do-juliao');
      window.__storageDenied=false;
      window.name='storage-restored';
      plannerSetTravelMode('pedestrian');
      saveTripSelection();
    });
    expect(await page.evaluate(()=>({
      mode:localStorage.getItem('ilhabela_travel_mode'),
      selection:JSON.parse(localStorage.getItem('ilhabela_trip'))
    }))).toEqual({mode:'pedestrian',selection:['praia-do-juliao']});
    await page.reload();
    await expect(page.locator('#spots-grid > .glass-card')).toHaveCount(50);
    expect(await page.evaluate(()=>({mode:plannerTravelMode,selection:tripSelection.slice()})))
      .toEqual({mode:'pedestrian',selection:['praia-do-juliao']});
    expect(errors).toEqual([]);
  });
}
