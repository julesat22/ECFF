# Eagle Cap Film Festival — Specification

Single-page marketing site for the inaugural Eagle Cap Film Festival.
Reference: [`design_handoff_eagle_cap_site 3/`](../Desktop/design_handoff_eagle_cap_site%203/)

---

## 1. Objective

A performant, accessible, single-page marketing site that announces the inaugural Eagle Cap Film Festival (Joseph, Oregon · June 11–14, 2026) and drives three actions: browsing the three spotlight films, understanding venues and passes, and capturing email signups.

**Target users**
- Festival attendees (casual locals + film enthusiasts traveling in)
- Filmmakers evaluating submission
- Potential sponsors

**Success criteria**
- Pixel-accurate port of the design handoff (colors, typography, spacing, motion)
- WCAG 2.1 AA compliant
- Lighthouse performance ≥ 95 mobile, ≥ 98 desktop
- Total client JS ≤ 50 KB gzipped (hard budget)
- First Contentful Paint < 1.0s on fast 3G

---

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | **Astro 5** with `@astrojs/react` integration |
| UI language | **React 18 + TypeScript** for interactive islands only; Astro components (`.astro`) for static sections |
| Styling | **Tailwind CSS v4** (Vite plugin) + a small CSS file for design tokens and global resets |
| Fonts | **Fontsource** — `@fontsource/bebas-neue` and `@fontsource-variable/bodoni-moda`, self-hosted woff2, preloaded, `font-display: swap` |
| Icons | Inline SVG — no icon library |
| Package manager | pnpm |
| Deployment | Vercel (`@astrojs/vercel` adapter) |

**Why Astro.** A single long marketing page is the archetype use case: static HTML for 90% of the surface, React hydration only for the five interactive pieces (countdown, spotlight carousel, film modal, nav flip, newsletter form). This beats Next.js App Router on JS-shipped by a meaningful margin for this shape of site.

---

## 3. Commands

```bash
pnpm install        # install deps
pnpm dev            # dev server on :4321
pnpm build          # production build to ./dist
pnpm preview        # preview prod build locally
pnpm test           # vitest (unit tests only)
pnpm typecheck      # astro check + tsc --noEmit
pnpm lint           # eslint
pnpm format         # prettier --write
```

---

## 4. Project Structure

```
eagle-cap-film-festival/
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   └── assets/                         # from design handoff
│       ├── mountain.png
│       ├── logo-black.png
│       ├── logo-offwhite.png
│       └── logo-small-black.png
├── src/
│   ├── pages/
│   │   └── index.astro                 # composes all sections
│   ├── layouts/
│   │   └── BaseLayout.astro            # <html>, meta, font preload, analytics stub
│   ├── components/
│   │   ├── sections/                   # one file per top-level section
│   │   │   ├── Ticker.astro
│   │   │   ├── Hero.astro
│   │   │   ├── SpotlightSection.astro
│   │   │   ├── Editorial.astro
│   │   │   ├── Venues.astro
│   │   │   ├── Passes.astro
│   │   │   ├── Sponsors.astro
│   │   │   └── SiteFooter.astro
│   │   ├── islands/                    # React — interactive only
│   │   │   ├── Nav/
│   │   │   │   ├── Nav.tsx
│   │   │   │   ├── NavLinks.tsx
│   │   │   │   └── NavCTA.tsx
│   │   │   ├── Countdown/
│   │   │   │   ├── Countdown.tsx
│   │   │   │   └── CountdownBlock.tsx
│   │   │   ├── Spotlight/
│   │   │   │   ├── Spotlight.tsx
│   │   │   │   ├── SpotlightPoster.tsx
│   │   │   │   ├── SpotlightDetails.tsx
│   │   │   │   └── SpotlightDots.tsx
│   │   │   ├── FilmModal/
│   │   │   │   ├── FilmModal.tsx
│   │   │   │   ├── FilmModalBody.tsx
│   │   │   │   └── ShowtimeRow.tsx
│   │   │   └── NewsletterForm.tsx
│   │   └── ui/                         # shared static primitives
│   │       ├── Kicker.astro
│   │       ├── HairlineRule.astro
│   │       └── SkipLink.astro
│   ├── content/                        # hardcoded data (ported from data.jsx)
│   │   ├── festival.ts
│   │   ├── ticker.ts
│   │   ├── spotlights.ts
│   │   ├── venues.ts
│   │   ├── passes.ts
│   │   └── sponsors.ts
│   ├── lib/
│   │   ├── types.ts                    # Film, Pass, Venue, Sponsor
│   │   ├── useScrollReveal.ts
│   │   └── useNavFlip.ts
│   └── styles/
│       └── globals.css                 # @import tailwindcss; :root tokens
└── tests/
    ├── countdown.test.tsx
    └── a11y.smoke.test.tsx
```

### The 50-line rule (hard)

Every component file must be ≤ 50 lines of logic (imports, type aliases, and closing JSX tags don't count). If a component grows past 50, extract a sub-component into a sibling file. Feature folders group related pieces (e.g. `Spotlight/Spotlight.tsx` + `Spotlight/SpotlightPoster.tsx` + `Spotlight/SpotlightDetails.tsx`).

---

## 5. Code Style

- **TypeScript strict mode** on; no `any` (use `unknown` + narrowing)
- **Named exports only** — no default exports
- Props inline when < 3 props; extract `type XProps = { ... }` otherwise
- File naming: `PascalCase.tsx` / `PascalCase.astro` for components, `camelCase.ts` for utilities and content modules
- Path aliases: `@/components`, `@/content`, `@/lib`, `@/styles` (configured in `tsconfig.json` + `astro.config.mjs`)
- Tailwind classes sorted via `prettier-plugin-tailwindcss`
- Design tokens live in `tailwind.config.ts` (`colors.yellow`, `fontFamily.display`, etc.) — no raw hex or rgba in components
- Comments: only for non-obvious *why*. No "what" comments; no multi-paragraph docstrings
- Prettier defaults (single quotes, 2-space, no semicolons, trailing commas)

---

## 6. Testing Strategy

Intentionally minimal — external client scope, manual QA before launch.

- **Vitest + @testing-library/react** unit tests for:
  - `Countdown` — computes correct days/hours/minutes/seconds from a mocked `Date`
- **axe-core smoke test** — mounts the built page and asserts zero AA violations
- No e2e. Manual QA checklist lives in `tests/MANUAL_QA.md` (generated during implementation)

---

## 7. Accessibility (Non-negotiable — WCAG 2.1 AA)

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`
- Skip link as first focusable element ("Skip to main content")
- Focus trap + restore in film modal; Escape and backdrop click both close; `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- All interactive elements keyboard reachable with a visible focus ring (yellow `#ffea00`, ≥ 2px)
- Color contrast ≥ 4.5:1 for all text — **audit `--muted-dark` on black (0.55 alpha, currently ~3.2:1 — will bump to 0.7)**
- `prefers-reduced-motion: reduce` respected by: ticker, scroll reveal, spotlight auto-advance, hover lifts, countdown fade-in
- `alt` text on every image; decorative elements `aria-hidden="true"`
- Countdown: no `aria-live` (too noisy); visually hidden `<p>` with a human summary updated on minute boundaries

---

## 8. Boundaries

### Always
- Match the design handoff pixel-accurately
- Keep every component ≤ 50 lines; split into sibling files otherwise
- Use design tokens (tailwind theme) — no ad-hoc hex or pixel values
- Respect `prefers-reduced-motion`
- Run `pnpm lint && pnpm typecheck && pnpm build` green before committing
- Commits in imperative mood, ≤ 72 char subject

### Ask first
- Before adding a new third-party dependency
- Before wiring a real analytics / ESP / payment integration
- Before deviating from the handoff design
- Before changing stack or project structure

### Never
- Ship the Tweaks dev panel (strip entirely)
- Use default exports
- Hard-code secrets or API keys
- Exceed the 50 KB JS budget without explicit approval
- Modify files in the design handoff folder (it's reference, not source)
- Add emojis to source code or commits unless requested

---

## 9. Out of Scope (v1)

- Real newsletter provider — stubbed: `preventDefault` + local "Sent ✓" state
- Real analytics — stubbed: commented `<script>` placeholder in `BaseLayout.astro`
- Pass purchase flow — CTAs anchor to `#passes` only
- CMS integration — content is hardcoded TS modules, structured to migrate later
- Mobile < 480px refinement (handoff only specifies ≤ 980px breakpoint)
- i18n
- PR/CI pipeline beyond `pnpm build`
