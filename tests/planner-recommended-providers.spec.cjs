const { test, expect } = require('@playwright/test');

test('planner recommendation helper falls back and only returns explicitly recommended matches', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(() => {
    const a = { id: 'a', featured: false };
    const b = { id: 'b', featured: true };
    const c = { id: 'c', featured: true };
    return {
      none: preferRecommendedPlannerProviders([a]).map(x => x.id),
      one: preferRecommendedPlannerProviders([a, b]).map(x => x.id),
      multiple: preferRecommendedPlannerProviders([a, b, c]).map(x => x.id),
      empty: preferRecommendedPlannerProviders([]).length
    };
  });
  expect(result).toEqual({ none: ['a'], one: ['b'], multiple: ['b', 'c'], empty: 0 });
});

test('maritime provider selection validates eligibility before applying recommendation', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(() => {
    const eligible = {
      id: '__test_eligible',
      featured: true,
      serviceArea: { scope: 'island', modes: ['boat'], verifiedModes: ['boat'] },
      activities: ['boat-tour']
    };
    const nonEligible = {
      id: '__test_noneligible',
      featured: true,
      serviceArea: { scope: 'island', modes: ['4x4'], verifiedModes: ['4x4'] },
      activities: ['boat-tour']
    };
    const normal = { ...eligible, id: '__test_normal', featured: false };
    servicesData.push(normal, nonEligible);
    const profile = { requiredMode: 'boat', requiredActivity: 'boat-tour' };
    const baseline = getMaritimeProvidersForProfile(profile).map(x => x.id);
    servicesData.push(eligible);
    const selected = getMaritimeProvidersForProfile(profile).map(x => x.id);
    return { baseline, selected };
  });
  expect(result.baseline).toContain('__test_normal');
  expect(result.baseline).not.toContain('__test_noneligible');
  expect(result.selected).toEqual(['__test_eligible']);
});

test('nautical experience selection honors qualifying recommendation', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(() => {
    const profile = Object.values(nauticalExperienceProfiles).find(p => p.spotIds.length && p.requiredMode && p.requiredActivity);
    if (!profile) return { available: false };
    const base = {
      serviceArea: { scope: 'island', modes: [profile.requiredMode], verifiedModes: [profile.requiredMode] },
      activities: [profile.requiredActivity]
    };
    servicesData.push({ ...base, id: '__nautical_normal', featured: false });
    const baseline = getNauticalExperienceOptionsForSpot(profile.spotIds[0])[0].providers.map(x => x.id);
    servicesData.push({ ...base, id: '__nautical_featured', featured: true });
    const selected = getNauticalExperienceOptionsForSpot(profile.spotIds[0])[0].providers.map(x => x.id);
    return { available: true, baseline, selected };
  });
  expect(result.available).toBe(true);
  expect(result.baseline).toContain('__nautical_normal');
  expect(result.selected).toEqual(['__nautical_featured']);
});

for (const language of ['pt', 'en', 'es', 'fr', 'he']) {
  test(`planner preserves locale, RTL and operator warnings: ${language}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.evaluate(lang => setLanguage(lang), language);
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(page.locator('html')).toHaveAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
    expect(await page.evaluate(() => Boolean(t('plannerBoatProviderHint') && t('plannerMeetingPointUnknown')))).toBe(true);
  });
}
