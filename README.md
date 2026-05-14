# Eagle Cap Film Festival

Single-page marketing site for the inaugural Eagle Cap Film Festival — Joseph, Oregon, November 5–7, 2026.

Live target: [eaglecapfilmfest.org](https://eaglecapfilmfest.org) (not yet deployed)

---

## Run it locally

```bash
pnpm install
pnpm dev
```

Opens at http://localhost:4321.

Other scripts:

```bash
pnpm build       # production build to ./dist
pnpm preview     # preview the prod build locally
pnpm test        # run vitest (48 tests)
pnpm typecheck   # astro check
```

Requires Node 18+ and pnpm 10+.

---

## Tech stack

- **Astro 5** — static output, zero JS by default
- **React 18** — only for the 5 interactive islands (Nav, Countdown, Spotlight carousel, Film modal, Newsletter form)
- **TypeScript** — strict mode
- **Tailwind CSS v4** — via `@tailwindcss/vite`, CSS-first config in `globals.css`
- **Fontsource** — self-hosted Bebas Neue + Bodoni Moda Variable (no Google Fonts call)
- **Vitest 2** + Testing Library + jest-axe — 48 tests covering content shape, component behavior, and a11y

No backend, no database, no API. Static HTML/CSS/JS to a CDN. Target host: Vercel or Netlify.

---

## What's left

### Must-have before launch
- [ ] Hosting + DNS (Vercel or Netlify; point `eaglecapfilmfest.org`)
- [ ] Newsletter ESP wiring (Mailchimp / Buttondown / ConvertKit / Beehiiv)
- [ ] Submit-a-Film flow (FilmFreeway URL or self-hosted form)
- [ ] Ticketing / donation provider (Eventive, GiveButter, Donorbox, or Stripe Donations)
- [ ] Real footer link hrefs: Letterboxd, Press Room, Contact
- [ ] Privacy + Terms pages

### Should-have before public announcement
- [ ] `@astrojs/sitemap` + `robots.txt`
- [ ] JSON-LD `Event` schema in `BaseLayout`
- [ ] Analytics (Plausible recommended)
- [ ] Branded 404 page
- [ ] Sentry error tracking + uptime monitor
- [ ] CSP headers via host config
- [ ] Astro 5.x → 6.x upgrade (clears 3 advisory items, none currently exploitable)

### Nice-to-have post-launch
- [ ] Mountain PNG → AVIF via `astro:assets`
- [ ] Subset Bebas Neue + Bodoni Moda to Latin only
- [ ] Real Lighthouse run on deployed URL
- [ ] Cross-browser QA (Chrome, Safari, Firefox, mobile Safari, mobile Chrome)
- [ ] Screen-reader pass (VoiceOver + NVDA)
- [ ] Centerpiece + Closing Night film reveals when announced
