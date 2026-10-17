# I18N/services technical repair — validation blocked

Date: 2026-10-17 (America/Sao_Paulo).

## Remote state verified

- Repository: vicgouveia-cloud/ilhabela-interactive-guide.
- Main: `565d20ebf05926328e87bc416c650737311bb0cf`.
- PR #23: `35d260f5dadbcf1da2c5a5b9b2432ee0fe8d726f`, open, Vercel successful at inspection.
- Technical branch: `fix/i18n-services-audit`, created directly from main.
- The original uncommitted two-test draft remains untouched in `i18n-pr23-fix`; an additional patch backup was saved outside this checkout.

## Changes prepared

- Faithful EN/ES/FR/HE access translation for Poço do Furado, keeping the park name and final walking segment.
- The repaired audit exposed Portuguese specifications in five attractions: Poço do Furado, Mirante do Baepi, Mirante do Morro da Cruz, Mirante dos Barreiros and Cachoeira do Poço Fundo. Localized those specifications without changing their facts, Portuguese copy or routing metadata.
- Localized copied descriptions in ES/FR/HE for Canal Burguer, Apple Cake, D’aqui and D’ Perú; no new commercial claims.
- Replaced removed recommendation globals with `servicesData` and exact `contextSpotIds` contracts. Loaded existing planner/multimodal catalogs and checked the contact-owned catalogs.
- Updated the attraction count to 50 and waterfall count to 9. Map checks cover underlying markers and cluster membership instead of demanding one visible icon per attraction on mobile.
- Modal tests check the canonical displayed specifications (access, sea and infrastructure); distance/duration/elevation remain intentionally hidden by existing production code.
- Updated the old licensed-photo audit from its historical 28-photo/six-placeholder assumptions to the approved 34-photo library, retaining exact licensed-photo and metadata checks. No photo changed.
- Replaced obsolete home CTA selectors with the existing My Trip navigation, retaining route/storage/error assertions. This test now exposes the runtime blocker below instead of stopping at a removed element.
- A one-rule CSS repair orders physical resets before `inset-inline-end`, to fix the existing offscreen language menu. The full post-fix responsive test was interrupted by the separate planner failure and is not certified green.

Production changes are limited to translations and the language-menu CSS rule. The map, planner, service architecture, layout structure, SEO and media remain unchanged.

## Confirmed legacy failures

- The original i18n audit throws `localRecommendations is not defined` on main. The original tests are byte-identical between main and PR #23.
- The original desktop i18n E2E expects 40 cards and receives 50 on main.
- Runtime data evaluated from both original commits contains the exact Portuguese Poço do Furado access text in all five languages.
- The original photo audit fails `34 !== 28` on unchanged main.
- At 320 px, unchanged main renders the language menu at x=250.375 with width=160, beyond the 320 px viewport. A screenshot was visually inspected for this specific failure.

## Validation and stopping point

- All nine static stages used by `npm test` were exercised successfully after their relevant repairs (generator, reconciled attractions, images, licensed photos, i18n, attraction pages, discovery, sitemap, SEO i18n).
- Focused i18n run: 13 passed, one failed (language menu bounds), three not run. The CSS correction came afterward; it has not received a completed full focused run.
- `npm test -- --output=test-results-full --reporter=line` started all static stages and a 393-test browser suite. It reached test 110 before being intentionally stopped when a real runtime problem was independently confirmed. This is not a successful full-suite result.
- The focused updated My Trip journey fails on both this branch and the untouched original main served separately. No suite was disabled, no failure assertion was removed, and runtime errors remain asserted.

## Blocking runtime defect — no merge

Reproduction at 390 px / pt-BR: open My Trip, open the selection deck, close it, add Julião from its modal, reload, switch language, reopen My Trip, add/reorder Curral, build the road-navigation URL, remove both stops, close and reopen the planner/deck. The flow throws an asynchronous Leaflet exception:

```
TypeError: Cannot read properties of undefined (reading '_leaflet_pos')
    at Pe (leaflet@1.9.4/dist/leaflet.js:5:21430)
    at e._getMapPanePos (leaflet@1.9.4/dist/leaflet.js:5:43374)
    at e._getNewPixelOrigin (leaflet@1.9.4/dist/leaflet.js:5:43731)
    at e._move (leaflet@1.9.4/dist/leaflet.js:5:40075)
    at e._onZoomTransitionEnd (leaflet@1.9.4/dist/leaflet.js:5:47344)
```

Observed in both the technical checkout and original main `565d20e`. The stack suggests a zoom transition completing after a map pane has been removed; that is a diagnosis to investigate, not an established root cause. The main-map marker clustering itself was not changed.

The user explicitly required stopping for a newly discovered nontrivial runtime/architecture regression. Investigation of the planner map lifecycle is therefore required before certification, any technical merge, PR #23 update/merge, or production release. No merge or production deployment was performed by this task. The original main and PR #23 heads remain the reference versions above.

Local logs, reproduction traces and generated screenshots were preserved in the sibling `i18n-technical-evidence-20261017` folder and ignored test-output directories. Screenshots from other scenarios were generated but not visually reviewed.
