# Suites Ondas do Mar — draft, pending source completion

Checked 2026-10-29. Baseline: c02a121ac62364b9e5af357d9e2497bc9ac24e32.

## Official source

https://www.instagram.com/suitesondasdomar/ — supplied by the guide owner and read in a public browser session. Profile title: Suites Ondas do Mar. Bio identifies Ilhabela, rooms, views, pets welcome and reservations phone (12) 991264617. No website link was visible. Individual posts require login and were not read. Search fetch was throttled; browser reading succeeded.

The ficha uses the profile name, Instagram and the published phone. WhatsApp capability is not verified, so no WhatsApp link is added. Description is limited to the bio. No rates, amenities, ratings, exact coordinates or nearby attraction are inferred.

## Address candidate, not included

https://www.booking.com/hotel/br/suites-ondas-do-mar-ilhabela.html lists Av. Governador Mário Covas Júnior, 19470, CEP 11641-800. Another Booking listing has a similar name at the same address. This is secondary evidence and has not been corroborated by the official profile. The ficha therefore uses only Ilhabela - SP, which the official bio confirms. The existing Maps search is consequently broad and is not an exact pin.

## Photo and rights: pending

No photo is copied, downloaded, hotlinked or licensed by assumption. Public Instagram visibility does not establish permission to reuse photographs. The draft uses the existing service icon fallback. A supplied photograph and permission from its rights holder, including required credit, are still needed to complete the requested photo validation.

## Architecture and release

Uses additional-spots.js servicesData and serviceTranslations, category stay, activities lodging, compact presentation and existing alternative accommodation filter (no verified hotel/pousada/hostel classification). No new component or route. Existing international generator consumes the same catalog. Five translations supplied.

Regression fixture freezes all 129 preexisting records, the attraction catalog, taxonomy and global translations. New catalog total: 130, gastronomy unchanged at 68. Historical count assertions and the older Porto/Tempero comparison explicitly exclude the new record; the new preservation audit protects every old record in full.

Draft only: pending exact address, photo rights, user homologation and separate publication approval. Do not merge or promote on the basis of this draft. Local validation must precede any Vercel build; do not request a deployment manually.

## Local validation

- `npm run build`: passed; international service pages regenerated from the shared catalog.
- `npm run test:audits`: 31 of 32 passed on the final suite run; the remaining historical stay count expected 10 instead of 11. Corrected only that assertion and reran `audit-essentials-mobility-standalone.cjs`: passed. All 32 audits therefore passed, with the corrected count verified separately.
- `audit-ondas-do-mar-preservation.cjs`: passed after tightening the contact, source, photo and exact-address checks.
- Playwright `services-ondas-do-mar.spec.cjs` and `international-services-itineraries.spec.cjs`: 18/18 passed on local Chromium, mobile and desktop, including Hebrew RTL, category exclusion and international static output.
- Existing catalog: 129 records preserved; new total 130, including 11 stays and 68 food services. All 50 attractions, their routing data, taxonomy and global translations preserved.
- Full browser suite was not run. This is not user homologation or authorization to publish.
