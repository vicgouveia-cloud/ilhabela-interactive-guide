# Contact header UX verification

Base: origin/main 96751f40d069d93b09901299898f0b914f63dd68. Isolated branch: ux/contact-header. Open documentation PRs #9 and #10 are excluded. Existing checkouts were preserved.

## Change

44px envelope button next to the language selector on PT/EN home and Services. It opens the existing shared contact dialog. New inviting heading/introduction in PT, EN, ES, FR and HE; Hebrew keeps RTL. Existing footer and contextual attraction/service entries remain. Visible provider copy is replaced with an explanation that email is optional and enables a reply.

The Formspree endpoint, payload, submission implementation, success/error feedback, validation and context handling are unchanged. No Production deployment, merge or Vercel configuration change was performed.

## Verification

`npx playwright test tests/contact.spec.cjs tests/contact-send.spec.cjs tests/contact-header.spec.cjs`: **6 passed**.

- Header/menu/modal at 390x844 and 1440x844 for all five languages; geometry checks confirm logo, contact and language selector do not overlap.
- Accessible translated label, Enter, initial focus, Tab loop, Escape, close button and focus restoration.
- Single shared dialog; PT/EN home and Services header entries.
- Attraction and service context, static attraction entry, compact 400px height.
- 30 intercepted successful submissions across languages/sizes/context types; validation, honeypot, duplicate prevention, network failure, provider rejection, preserved draft and feedback.
- Requests to https://formspree.io/f/xeaejbqe were intercepted: **no real messages sent**. Live provider delivery was not exercised.
- `git diff --check` passed.

Existing tests expecting Portuguese now explicitly set the browser locale to pt-BR, preventing browser-language detection from invalidating their text assertions.

Broader audit limitation: `node tests/audit-i18n.cjs` fails with `ReferenceError: localRecommendations is not defined`. Reproduced in the pre-existing img-02 checkout (b58cebf); outside this UX scope.

All 20 screenshots (header and dialog, five languages, two sizes) are generated locally by contact-header.spec.cjs. Representative PT/HE mobile and PT desktop captures are committed here. PT and HE mobile screenshots were visually inspected.
