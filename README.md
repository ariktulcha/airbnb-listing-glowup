# Airbnb Listing Glow-Up Strategy

A working strategy repository for a new productized service that finds underperforming Airbnb / short-term-rental listings and transforms their presentation: photos, copy, video, ranking signals, and guest positioning.

**Working thesis:** many hosts have decent properties but weak digital presentation. A focused service can create a visible before/after preview, then sell a one-time upgrade package.

**Core offer draft:**

> Send us your Airbnb link. We analyze the listing, improve the presentation, and deliver an Airbnb-ready upgrade package in 48–72 hours.

**Primary package:** `Full Listing Glow-Up — $300`

Includes:
- 10–20 enhanced photos
- cover photo recommendation
- optimized photo order
- rewritten title and description
- photo captions
- 30-second vertical video from existing photos
- top 10 fixes
- competitor/pricing note
- Airbnb-ready paste file

## Repo map

- `01-vision.md` — clarified vision and business model
- `02-customer-problems.md` — problems the company solves
- `03-market-and-competitor-research.md` — SaaS/service competitor research
- `04-fiverr-upwork-marketplace-research.md` — freelancer marketplace research
- `05-product-packages-and-pricing.md` — proposed offers and pricing ladder
- `06-go-to-market.md` — website, blog, lead magnet, social, outbound
- `07-validation-sprint.md` — 7-day test plan before overbuilding
- `08-ai-engine-spec.md` — future backend engine modules
- `09-legal-and-risk-notes.md` — Airbnb/platform, copyright, image ethics, outreach risk
- `10-brand-and-positioning.md` — naming, messaging, homepage copy
- `11-discord-continuation-prompt.md` — prompt to continue this project in Discord
- `12-next-actions.md` — immediate next execution checklist

## Static website

This repo now includes a production-ready Astro static marketing site suitable for GitHub Pages, Netlify, or any static host.

```bash
npm install
npm run build
npm run preview
```

Generated files are emitted to `dist/`. The static lead form at `/score/` includes Netlify Forms attributes; for GitHub Pages, connect the form to Formspree, Basin, or another endpoint.

## Strategic conclusion

Do **not** compete as an Airbnb copywriter. Compete as an **Airbnb listing transformation engine**: visual before/after, better copy, stronger positioning, video, and a practical action plan.


## Deployment

This site is configured for Netlify with `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `dist`
- Lead form: `/score/` uses Netlify Forms and redirects to `/thank-you/`
- Next integration step: connect Resend for notification + lead-magnet delivery once domain/email details are ready.
