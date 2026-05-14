# Eagle Cap Film Festival — Task List

See [plan.md](./plan.md) for full acceptance criteria and verification steps.
Status legend: `[ ]` pending · `[~]` in progress · `[x]` done

---

## Phase 0 — Foundation

- [ ] **T01** Scaffold Astro + React + TS + Tailwind v4 + Vercel adapter + pnpm
- [ ] **T02** Design tokens (`globals.css` + Tailwind theme), Fontsource fonts, assets to `public/`
- [ ] **T03** Test infrastructure (Vitest + RTL + axe-core) with one passing smoke test
- [ ] **T04** `BaseLayout.astro` + skip link + `src/lib/types.ts` + placeholder `index.astro`

## Phase 1 — Static sections

- [ ] **T05** Ticker section (CSS-only animation, no JS)
- [ ] **T06** Editorial / Field Notes section
- [ ] **T07** Sponsors section
- [ ] **T08** Venues section
- [ ] **T09** Passes section
- [ ] **T10** SiteFooter static shell (form upgraded in T16)

### ▶ CHECKPOINT A — Static pass
- [ ] Visual QA: all six static sections render in correct order
- [ ] `pnpm build` green
- [ ] Client JS bundle ~0 KB

## Phase 2 — Interactive islands

- [ ] **T11** `useScrollReveal` hook + retrofit `reveal` class to all Phase 1 sections
- [ ] **T12** Nav island (sticky, scroll-flip at 700px, underline-on-hover, keyboard focus)
- [ ] **T13** Hero + Countdown island (days/hours/min/sec, yellow days accent)
- [ ] **T14** Spotlight carousel (7s auto-advance, dots, reduced-motion pause)
- [ ] **T15** FilmModal + wire Spotlight CTAs (focus trap, Esc/backdrop close, body scroll lock)
- [ ] **T16** NewsletterForm island (stubbed submit, `Sent ✓`, aria-label, aria-live)

### ▶ CHECKPOINT B — Interactions verified
- [ ] Manual keyboard-only tour of the full page passes
- [ ] `prefers-reduced-motion: reduce` respected everywhere
- [ ] `pnpm build` green
- [ ] Client JS ≤ 50 KB gzipped

## Phase 3 — Accessibility + verification

- [ ] **T17** Reduced-motion audit across all motion; contrast audit + bump `--muted-dark` to 0.7 alpha
- [ ] **T18** `tests/countdown.test.tsx` + `tests/a11y.smoke.test.tsx`
- [ ] **T19** Bundle size check + Lighthouse run; save results to `tests/lighthouse-report.md`

### ▶ CHECKPOINT C — Ready to deploy
- [ ] `pnpm test` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` passes
- [ ] Client JS ≤ 50 KB gzipped
- [ ] Lighthouse: Perf ≥ 95 mobile / ≥ 98 desktop · A11y = 100 · BP ≥ 95 · SEO ≥ 95
- [ ] FCP < 1.0s on Fast 3G

---

## Progress summary

**Total tasks:** 19 (plus 3 checkpoint gates)
**Current phase:** Phase 0 — Foundation
**Next up:** T01 — Scaffold project
