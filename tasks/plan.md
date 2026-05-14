# Eagle Cap Film Festival — Implementation Plan

Derived from [SPEC.md](../SPEC.md) and the design handoff at [`design_handoff_eagle_cap_site 3/`](../../Desktop/design_handoff_eagle_cap_site%203/).

---

## Dependency graph

```
Foundation (T01 → T02 → T03 → T04)
       │
       ▼
Static sections (T05–T10) — independent of each other, all depend on T04
       │
       ▼
     CHECKPOINT A: static visual QA
       │
       ▼
Interactive islands (T11 → T12, T13, T14 → T15, T16)
       │
       ▼
     CHECKPOINT B: interactions verified
       │
       ▼
A11y + verification (T17 → T18 → T19)
       │
       ▼
     CHECKPOINT C: ready to deploy
```

**Notes on the graph**
- T11 (`useScrollReveal`) is a prerequisite for retrofitting static sections with reveal behavior — done after static sections ship so the hook isn't blocked on finalized markup.
- T12 (Nav) can run in parallel with T13/T14 but sits above them in the page; landing it first de-risks the dark/light flip interaction that touches every section boundary.
- T15 (FilmModal) depends on T14 (Spotlight) because the Spotlight CTAs open it.
- T16 (NewsletterForm) depends on T10 (SiteFooter shell) since it's hydrated inside the footer.

---

## Slicing strategy

Each task is a **vertical slice** — content, component, styles, and "wired into the page" all land together. No horizontal layers like "port all data first, then build all components." Avoiding that pattern keeps each commit shippable and keeps the page in a visible-progress state throughout.

Two exceptions (pragmatic):
- **T04** scaffolds the base layout + shared types + an empty index route so later tasks have a place to mount into. Without this, every section task would duplicate setup.
- **T11** retrofits `reveal` behavior across all six static sections at once because the hook is trivial and per-section wiring is mechanical.

---

## Tasks

### Phase 0 — Foundation

#### T01 — Scaffold project

**Vertical slice:** empty Astro site running on `pnpm dev` with the target toolchain in place.

**Acceptance criteria**
- `pnpm install && pnpm dev` serves `http://localhost:4321` with a default Astro page
- `package.json` lists: `astro@^5`, `@astrojs/react`, `@astrojs/vercel`, `react@^18`, `react-dom@^18`, `typescript`
- `astro.config.mjs` enables the React integration and sets `output: 'static'` with the Vercel adapter
- `tsconfig.json` is strict; path alias `@/*` → `src/*` configured in both `tsconfig.json` and `astro.config.mjs`
- `.gitignore` excludes `node_modules`, `dist`, `.astro`, `.vercel`, `.env*`

**Verification**
```bash
pnpm install && pnpm dev   # renders default page at :4321
pnpm build                 # builds to ./dist without errors
pnpm typecheck             # astro check passes
```

---

#### T02 — Design tokens, fonts, assets

**Vertical slice:** a blank page renders with the correct fonts loaded, the yellow accent visible, and asset files reachable.

**Acceptance criteria**
- Tailwind v4 installed and wired via Vite plugin; `src/styles/globals.css` imports Tailwind and declares `:root` custom properties matching [styles.css](../../Desktop/design_handoff_eagle_cap_site%203/styles.css) `:root` block (black, off-white, yellow, ink, paper, rule, rule-dark, muted, muted-dark)
- `tailwind.config.ts` extends theme with:
  - `colors.yellow = '#ffea00'`, `colors.ink`, `colors.paper`, `colors.offwhite`
  - `fontFamily.display = ['"Bebas Neue"', ...]`, `fontFamily.serif = ['"Bodoni Moda"', ...]`, `fontFamily.mono = ['ui-monospace', ...]`
- Fontsource packages installed: `@fontsource/bebas-neue`, `@fontsource-variable/bodoni-moda`
- Fonts imported in `BaseLayout.astro` with `<link rel="preload" as="font" ... crossorigin>` for regular weights; `font-display: swap` set
- `public/assets/` contains all four PNGs copied from the handoff (`mountain.png`, `logo-black.png`, `logo-offwhite.png`, `logo-small-black.png`)
- A temporary probe on `index.astro` (`<h1 class="font-display text-yellow">TEST</h1>`) renders in Bebas Neue yellow

**Verification**
```bash
pnpm dev                                        # fonts visually correct
curl -I http://localhost:4321/assets/mountain.png   # returns 200
```

---

#### T03 — Test infrastructure

**Vertical slice:** a single passing Vitest test + a single passing axe assertion on an empty page prove the test harness is real before anything depends on it.

**Acceptance criteria**
- Vitest installed with `jsdom` env; `@testing-library/react`, `@testing-library/jest-dom`, `axe-core`, `jest-axe` installed
- `vitest.config.ts` configured (or `vite.config.ts` shared with Astro) with jsdom and globals
- `tests/setup.ts` imports `@testing-library/jest-dom`
- `tests/smoke.test.tsx` — mounts `<h1>hello</h1>`, asserts it rendered AND asserts `expect(await axe(container)).toHaveNoViolations()`
- `pnpm test` passes

**Verification**
```bash
pnpm test   # one passing test, exit 0
```

---

#### T04 — BaseLayout, shared types, placeholder index

**Vertical slice:** the page has its outer chrome (html, meta, skip link, font preload) and a list of section types defined; later tasks compose their sections into this layout.

**Acceptance criteria**
- `src/layouts/BaseLayout.astro` renders `<html lang="en">`, full `<head>` (title, description, viewport, og:tags stubbed, font preload, analytics stub as HTML comment), `<body>` with `<a class="skip-link">Skip to main content</a>` and `<slot />`
- Skip link visually hidden by default, visible on focus (Tailwind `sr-only focus:not-sr-only`)
- `src/lib/types.ts` exports `type Film`, `type Pass`, `type Venue`, `type Sponsor`, `type Spotlight`, `type TickerItem`, `type Showtime` — field shapes match the data in [data.jsx](../../Desktop/design_handoff_eagle_cap_site%203/data.jsx)
- `src/pages/index.astro` uses `<BaseLayout>` and renders a `<main id="main">` with placeholder text
- Tabbing into the page reveals the skip link; pressing Enter scrolls to `#main`

**Verification**
- Manual keyboard test in browser: Tab → skip link appears → Enter → focus lands on `<main>`
- `pnpm typecheck` green

---

### Phase 1 — Static sections

Each task below: ports its own content file from [data.jsx](../../Desktop/design_handoff_eagle_cap_site%203/data.jsx), builds the `.astro` component(s), applies Tailwind styles matching [styles.css](../../Desktop/design_handoff_eagle_cap_site%203/styles.css) for that section, composes into `index.astro`, verifies visually.

#### T05 — Ticker

**Acceptance criteria**
- `src/content/ticker.ts` exports `TICKER_ITEMS: TickerItem[]` with exactly the 6 items from the handoff
- `src/components/sections/Ticker.astro` renders a black strip, off-white Bebas text, yellow `✦` dots, 60s linear infinite CSS animation, track duplicated for seamless loop
- No JavaScript shipped for this section (verify in DevTools Network tab)
- Composed into `index.astro` after Nav placeholder

**Verification**
- Animation runs smoothly in dev
- Network tab shows zero JS bundles attributable to Ticker

---

#### T06 — Editorial (Field Notes)

**Acceptance criteria**
- `src/components/sections/Editorial.astro` renders the "Field Notes · 03" section per spec: 1fr / 1.2fr two-column, mountain image with gradient overlay + monospace photo caption on left, kicker/H2/dek/two paragraphs/byline on right
- Yellow 32px rule precedes the kicker
- Italic "the size" yellow within the H2
- Uses `assets/mountain.png` as a background image
- Added to `index.astro` in order

**Verification**
- Matches the design reference visually; responsive collapse at ≤ 980px to a single column

---

#### T07 — Sponsors

**Acceptance criteria**
- `src/content/sponsors.ts` exports `SPONSORS: Sponsor[]` (10 items from handoff)
- `src/components/sections/Sponsors.astro` renders two-column top (240px / 1fr gap 64px): "Made possible by" + "Friends of the Festival" on left, 5-column sponsor grid on right
- Each sponsor cell: Bebas name + mono sub-label, right/bottom hairline borders, hover darkens text
- Added to `index.astro`

**Verification**
- Visual match; hover state darkens text from muted to ink

---

#### T08 — Venues

**Acceptance criteria**
- `src/content/venues.ts` exports `VENUES: Venue[]` (6 items from handoff)
- `src/components/sections/Venues.astro` renders SectionHead ("The Map" / "Six rooms, *one walkable* town.") + 3-column grid of 6 cards
- Each card: mono venue number, Bebas name, italic address, bottom row (bold capacity + muted description), hairline borders with correct 3n/last-row handling
- Hover: subtle darkening
- Added to `index.astro` with `id="venues"`

**Verification**
- Visual match; anchor link `#venues` scrolls to section

---

#### T09 — Passes

**Acceptance criteria**
- `src/content/passes.ts` exports `PASSES: Pass[]` (3 items from handoff)
- `src/components/sections/Passes.astro` renders full-bleed black section, 3-column grid of pass cards
- Each card: 1px off-white border, 32×28 padding, min-height 440px, column flex with mono label, Bebas price with small `$`, italic pname, `+` bullet list of perks, `Select Pass →` bottom row separated by top hairline
- Middle card (A2) is yellow bg / black text with "Most Popular" black badge
- Hover flips border from dim to full off-white
- Added to `index.astro` with `id="passes"`

**Verification**
- Visual match; featured card visibly distinct

---

#### T10 — SiteFooter (static shell)

**Acceptance criteria**
- `src/components/sections/SiteFooter.astro` renders the static footer: 4-column top (brand + 3 link lists), hairline rule, bottom row (copyright left + placeholder `<form>` right — real form replaced in T16), giant `ECFF · 2026` decorative mega wordmark at 8% opacity
- `aria-hidden="true"` on the decorative wordmark
- Newsletter form present as plain HTML (no React) with static "Subscribe →" button — upgrade to island in T16
- Added to `index.astro` as last element

**Verification**
- Visual match; no JS shipped for footer

---

### CHECKPOINT A — Static pass

**Gate**
- All six static sections render in correct order in `index.astro`: Nav placeholder → Ticker → Hero placeholder → Spotlight placeholder → Editorial → Venues → Passes → Sponsors → Footer
- Visual QA against design handoff: colors, fonts, spacing, grid layouts all match
- `pnpm build` succeeds
- **Bundle check**: total client JS < 5 KB (should be ~0; only islands add JS in Phase 2)

---

### Phase 2 — Interactive islands

#### T11 — useScrollReveal + retrofit

**Vertical slice:** add the reveal-on-scroll behavior and apply it across all existing sections in one pass.

**Acceptance criteria**
- `src/lib/useScrollReveal.ts` — React hook using `IntersectionObserver` with `rootMargin: '0px 0px -10% 0px'`, adds `.in` class to observed elements, unobserves after reveal
- A thin `<ScrollReveal />` island wraps children and applies the hook (`client:visible` directive)
- CSS in `globals.css`: `.reveal { opacity: 0; transform: translateY(24px); transition: opacity 800ms ease, transform 800ms ease; } .reveal.in { opacity: 1; transform: none; }`
- Each section from Phase 1 gets the `reveal` class applied to the container that should fade/translate in
- **Respect `prefers-reduced-motion: reduce`** — the transition becomes instant (0ms)

**Verification**
- Scroll into each section: smooth 800ms fade + translate
- OS setting "Reduce motion" enabled: sections appear immediately, no transition
- `pnpm build` JS budget still under target (adds ~1 KB)

---

#### T12 — Nav (with scroll flip)

**Vertical slice:** sticky nav with logo, links, CTA; dark-on-hero → light-on-scroll transition; underline-on-hover.

**Acceptance criteria**
- `src/components/islands/Nav/Nav.tsx` (client:load) — sticky, flips modes at `scrollY > 700` with 300ms transition on bg/color/border
- Sub-components (each ≤ 50 lines): `NavLinks.tsx`, `NavCTA.tsx`
- `src/lib/useNavFlip.ts` — React hook wrapping the scroll listener; returns `isDark: boolean`; listener is `passive: true`
- Logo swaps: `logo-offwhite.png` on dark, `logo-small-black.png` on light
- Three links: About · Venues · Passes (anchors to `#about`, `#venues`, `#passes`)
- Yellow `Get Passes` CTA with `↗` glyph anchors to `#passes`
- Hover on links animates a 2px yellow underline
- Respects `prefers-reduced-motion: reduce` (transition time 0)
- Tab order: skip link → logo → links → CTA
- Keyboard focus: visible yellow ring ≥ 2px on every interactive element

**Verification**
- Scroll past 700px: nav flips modes with animation
- Tab through nav: focus ring visible at each step
- Browser devtools lighthouse a11y spot-check: no nav violations

---

#### T13 — Hero + Countdown

**Vertical slice:** the whole hero lands together — Edition label, eyebrow, three-line title with italic middle line, mono ✦ label, 4-cell meta strip, countdown digits, mountain image.

**Acceptance criteria**
- `src/content/festival.ts` exports `FEST` (dates, place, edition, etc., startDate as ISO string parsed in Countdown)
- `src/components/sections/Hero.astro` renders the static shell (vertical edition label, eyebrow row, title, ✦ mono label, meta grid, countdown label + mountain image), mounts `<Countdown client:load />` for the digits
- `src/components/islands/Countdown/Countdown.tsx` — uses `setInterval(1000)` to recompute `{d, h, m, s}` from `FEST.startDate`
- `src/components/islands/Countdown/CountdownBlock.tsx` — one block (digits + unit label)
- Days block uses yellow accent; Hours/Min/Sec use off-white
- Visually hidden `<p aria-live="off">` with minute-granularity summary ("4 days, 17 hours until opening night") updated on minute rollover (announced via `aria-live="polite"` only when it changes)
- Mountain image: `mix-blend-mode: screen, opacity: 0.9`, `alt=""`, `aria-hidden="true"`
- Italic "lights go down" in Bodoni inside the countdown label
- `id="top"` on the hero

**Verification**
- Countdown ticks every second; days show yellow
- With `prefers-reduced-motion`: countdown still ticks (it's content, not motion); no hover lift on the hero
- Screen reader spot-check: countdown is not spammed every second

---

#### T14 — Spotlight carousel

**Vertical slice:** the full Spotlight section including auto-advance, poster, details, dots.

**Acceptance criteria**
- `src/content/spotlights.ts` exports `SPOTLIGHTS: Spotlight[]` (3 items from handoff)
- `src/components/sections/SpotlightSection.astro` renders SectionHead + mounts `<Spotlight client:load />`
- `src/components/islands/Spotlight/Spotlight.tsx` — manages `idx` state, 7s `setInterval` auto-advance, renders `SpotlightPoster` + `SpotlightDetails` + `SpotlightDots`
- `SpotlightPoster.tsx` — poster with diagonal yellow-stripe pattern at 8% opacity + noise + inner border ring, top row (ECFF · 2026 + N° 01/03), top-right tag (Opening Night / Centerpiece / Closing Night), vertical premiere text, big Bebas title bottom-left
- `SpotlightDetails.tsx` — eyebrow, italic H3, dek, 6-cell meta grid (Director / Year · Country / Runtime / Format / Language / Shot in), two buttons (primary yellow `View Film →` + outline `Showtimes`)
- `SpotlightDots.tsx` — 3 dot paginators; click sets `idx`; `aria-label="Spotlight N"` on each
- Every sub-component ≤ 50 lines
- Auto-advance **pauses when `prefers-reduced-motion: reduce`**
- Both buttons call a callback that T15 wires to open the modal (placeholder no-op for now, replaced in T15)
- `id="about"` on the section

**Verification**
- Auto-advances every 7s
- Clicking a dot jumps to that spotlight
- Reduced-motion mode: no auto-advance
- Each sub-component file is ≤ 50 lines

---

#### T15 — FilmModal + Spotlight wiring

**Vertical slice:** clicking a Spotlight CTA opens a modal with focus trap, closes on Esc / backdrop / ×.

**Acceptance criteria**
- `src/components/islands/FilmModal/FilmModal.tsx` — portal (into `document.body`), `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the film title H2
- `FilmModalBody.tsx` — title, director, synopsis, 4-fact grid, showtimes list, two buttons
- `ShowtimeRow.tsx` — single showtime row: Bebas time + mono venue/date + `Reserve →`
- **Focus trap** with `focus-trap-react` (or hand-rolled tab-cycle); focus moves to close button on open; focus restored to the triggering element on close
- Escape key closes; backdrop click closes; `×` button closes
- Body scroll locked while open (`document.body.style.overflow = 'hidden'`)
- `src/content/films.ts` exports `FILMS: Film[]` — port the 3 films that Spotlight maps to (matching on title); include the full showtimes structure
- Spotlight wires its callback: looks up the matching film by title, sets modal state, passes to FilmModal
- State lives in a small `<SpotlightWithModal client:load />` wrapper that owns both `idx` and `modalFilm` — keeps the composition inside one island

**Verification**
- Click `View Film`: modal opens, focus in modal, body scroll locked
- Tab cycles only within modal
- Esc / × / backdrop all close; focus returns to trigger
- Screen reader announces "dialog" on open

---

#### T16 — NewsletterForm

**Vertical slice:** upgrade the static footer form to a React island with stubbed submit.

**Acceptance criteria**
- `src/components/islands/NewsletterForm.tsx` — controlled email input, `type="email" required`, submit handler `preventDefault` + flips button text to `Sent ✓` for 3s then resets to `Subscribe →` (or stays `Sent ✓` until input is re-edited — pick one and document in the component)
- Input has no visible label but `aria-label="Email address"`; placeholder is `you@domain.com`
- Invalid email: browser-native validation surfaces the error; focus ring yellow on input
- `SiteFooter.astro` replaces the static form with `<NewsletterForm client:visible />`
- Form errors and success state announced via `aria-live="polite"` region

**Verification**
- Submit valid email: button shows `Sent ✓`
- Submit invalid email: native validation prevents submit, focus stays in field
- Keyboard-only flow works end-to-end

---

### CHECKPOINT B — Interactions verified

**Gate**
- Manual tour of the page: nav flips, countdown ticks, spotlight auto-advances, modal opens/closes with proper focus, newsletter form submits
- Keyboard-only navigation covers every interactive element; focus ring always visible
- `prefers-reduced-motion: reduce` respected by: ticker (pause), spotlight auto-advance (pause), scroll reveal (instant), hover lifts (none)
- `pnpm build` succeeds
- **Bundle check**: total client JS ≤ 50 KB gzipped (the spec budget)

---

### Phase 3 — A11y + verification

#### T17 — Reduced motion + contrast pass

**Acceptance criteria**
- Audit every animation/transition; each one wrapped in `@media (prefers-reduced-motion: reduce) { transition: none; animation: none; }` where appropriate
- Ticker: adds `animation-play-state: paused` under reduced motion
- Spotlight auto-advance: interval doesn't start
- Scroll reveal: no transition
- Hover lifts on nav-cta, buttons, pass cards: no transform
- Contrast audit: run real color math on every text/bg pair
  - `--muted-dark` (rgba(243,239,234,0.55)) on `--black` (#000) = ~3.2:1 (FAILS)
  - Bump to `rgba(243,239,234,0.7)` → ~4.6:1 (passes AA)
  - Re-verify all other pairs; document the audit result in a `tests/contrast-audit.md` file

**Verification**
- Manual reduced-motion toggle in OS confirms all motion stops
- WebAIM contrast checker (or equivalent tool) called out by token and passes

---

#### T18 — Countdown test + axe smoke test

**Acceptance criteria**
- `tests/countdown.test.tsx` — mounts `<Countdown />` with a fixed `Date.now()` mock returning a date 10d 5h 30m 15s before `FEST.startDate`; asserts `10`, `05`, `30`, `15` appear; advances fake timers by 1000ms and asserts seconds decrement
- `tests/a11y.smoke.test.tsx` — renders a mock page mounting all key components (Nav, Hero with Countdown, Spotlight, FilmModal open/closed, Passes, Footer with NewsletterForm); asserts `toHaveNoViolations()`
- `pnpm test` passes with both tests

**Verification**
```bash
pnpm test   # both tests pass, exit 0
```

---

#### T19 — Bundle + Lighthouse verification

**Acceptance criteria**
- `pnpm build` produces `./dist`
- Total client JS (sum of all `.js` in `dist/_astro/`) ≤ 50 KB gzipped — measure with `gzip -c dist/_astro/*.js | wc -c`
- `pnpm preview` serves the prod build; Lighthouse (CLI or DevTools) run against it:
  - Performance ≥ 95 (mobile throttled), ≥ 98 (desktop)
  - Accessibility = 100
  - Best Practices ≥ 95
  - SEO ≥ 95
- FCP < 1.0s on "Fast 3G" Lighthouse throttling
- Results saved to `tests/lighthouse-report.md` (or a screenshot)

**Verification**
```bash
pnpm build && pnpm preview
# in separate terminal:
npx lighthouse http://localhost:4321 --preset=desktop --output=json
```

---

### CHECKPOINT C — Ready to deploy

**Gate**
- All tests pass (`pnpm test`)
- All typechecks pass (`pnpm typecheck`)
- `pnpm build` succeeds
- JS budget met (≤ 50 KB gzipped)
- Lighthouse targets met
- Manual QA checklist (written inline in the tasks above) green
- Ready for Vercel deploy

---

## Out of plan (future tasks)

- Real newsletter ESP integration
- Real analytics (GA4 / Plausible)
- Pass purchase checkout (Stripe / Eventive)
- CMS migration (content → Sanity or similar)
- Mobile refinement below 480px
- Tweaks panel — explicitly excluded per SPEC.md

---

## Risks & open questions

1. **Font loading strategy.** If the variable Bodoni Moda file is > 60 KB, we may need to subset (Latin-only) to stay inside the total asset budget. Decision: subset via `unicode-range` if needed; revisit at T02.
2. **Poster art.** The design renders posters as CSS compositions (stripes, noise, ring, title) — no actual film poster images. This is intentional per the handoff. If the client expects real posters, that's a scope change that touches T14/T15.
3. **Focus trap library vs. hand-roll.** `focus-trap-react` is ~3 KB gzipped. If it pushes the bundle over budget, hand-roll tab cycling in ~30 lines. Decision deferred to T15 measurement.
4. **Reduced-motion countdown.** Should the countdown freeze under reduced motion? No — it's content, not decoration. Confirmed in T13.
