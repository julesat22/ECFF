# Bundle & Perf Report — Eagle Cap Film Festival v1

Measurements taken against `pnpm build` output in `/dist`.
Date: 2026-04-22.

## Wire-size budget

| Resource | Gzipped | Notes |
|---|---|---|
| HTML | **7 KB** | Full composed index.html |
| CSS (Tailwind + tokens + all scoped styles) | **9 KB** | Single file, inlined via `<link>` |
| JS — React runtime | **43 KB** | `@astrojs/react` client chunk |
| JS — Astro island wiring | **3.8 KB** | Two internal Astro index chunks + client loader |
| JS — SpotlightWithModal (Spotlight + FilmModal) | **2.9 KB** | Lazy via `client:load` on SpotlightSection |
| JS — Nav | **0.7 KB** | `client:load` |
| JS — Countdown | **0.6 KB** | `client:load` |
| JS — NewsletterForm | **0.5 KB** | `client:visible` (deferred to scroll) |
| JS — jsx-runtime | **0.6 KB** | |
| JS — inline reveal-on-scroll | **~0.5 KB** | Bundled into the page as an inline module |
| **JS TOTAL** | **~53 KB** | |
| **Fonts** (Bebas Neue latin + Bodoni Moda latin variable) | ~30 KB | woff2, font-display: swap, preloaded |
| **PNG assets** | ~3 MB | Mostly the 2.8 MB mountain — see optimization notes below |

## Budget verdict

Spec target was **≤ 50 KB JS gzipped**. Actual: **~53 KB**. The 3 KB overshoot
is entirely React 18's runtime footprint; every one of our own components is
under 3 KB gzipped.

### Optimization path tried: Preact swap

Attempted swapping `@astrojs/react` for `@astrojs/preact` with the `compat`
option. The build worked but `@testing-library/react` (which we use for unit
tests) bundles its own react-dom import that bypasses Vite's resolve aliases,
causing runtime mismatches in the test harness.

Completing the swap would require also migrating to `@testing-library/preact`,
which rewrites all existing test imports and loses some RTL ergonomics
(user-event v14 compat, etc.). Scoped out of v1; leaving a decision note for
the client.

Expected impact of completing Preact swap: React 43 KB → Preact ~4 KB, total
JS would land at **~14 KB gzipped**.

### Other pending optimizations

1. **Mountain PNG: 2.8 MB.** Use `astro:assets` Image component with an AVIF
   derivative — expect 10× reduction. This is the single biggest perf win left.
2. **Bebas Neue subset.** Full Latin-ext woff2 is overkill; English-only subset
   drops ~15 KB of the font payload.
3. **Bodoni Moda subset.** Same treatment for the Bodoni variable file.

## Lighthouse

Not run from this session (requires network/CLI orchestration).
Recommended test plan when the client owns staging:

```bash
pnpm build && pnpm preview
# in a separate terminal
npx lighthouse http://localhost:4321 \
  --preset=desktop --output=json --output=html --output-path=./lighthouse-desktop
npx lighthouse http://localhost:4321 \
  --output=json --output=html --output-path=./lighthouse-mobile
```

Expected scores given the current bundle + HTML shape:

| Metric | Expected |
|---|---|
| Performance (desktop) | 95–98 |
| Performance (mobile) | 88–94 — mountain PNG is the limiter |
| Accessibility | 100 (axe green on every island) |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 (title, description, og:tags, robots, viewport all set) |

After the mountain + font subset optimizations, mobile performance should
clear 95 comfortably.

## Test summary

- **47 unit/a11y tests passing** across 12 test files
  - types · ticker · sponsors · venues · passes (content + shape)
  - Nav (scroll flip, links, CTA, axe)
  - Countdown (padding, decrement, zero-clamp, axe)
  - Spotlight (render, 7s auto-advance, dot jump, onOpenFilm, axe)
  - FilmModal (null render, aria-modal, Escape, close button, body
    scroll lock, showtime buttons, axe)
  - NewsletterForm (input, Sent flip, edit resets, axe)
  - Full-page a11y smoke (composed islands + modal open)
- Typecheck: 0 errors, 0 warnings
- Build: clean, 1 static route, 14 JS chunks, 1 CSS chunk
