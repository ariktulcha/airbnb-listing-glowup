# Three-City Validation Sprint: Athens, Madrid, Paris

*Created: 2026-07-03*

## Objective

Validate Airbnb Listing Glow-Up across **three destinations in parallel**: Athens, Madrid, and Paris.

The goal is not to prove that AI can rewrite listings. The goal is to prove whether we can:

1. find weak-but-fixable listings,
2. find a reachable host or property operator,
3. create a compelling watermarked preview quickly,
4. get replies and paid interest for a one-time $300 listing upgrade.

## Critical rule

Do **not** overbuild before this sprint produces evidence.

No SaaS.  
No full scraper.  
No large blog/content engine.  
No heavy branding work.  
No promise of guaranteed bookings, ranking, revenue, or occupancy.

## Sprint structure

Run each city as a separate mini-experiment, but keep the same scorecard and offer.

| City | Lead target | Preview target | Success threshold | Notes |
|---|---:|---:|---:|---|
| Athens | 100 listings | 20 previews | 1 paid or 3 serious replies | Likely strong first city: many independent hosts, visible photo/copy gaps. |
| Madrid | 100 listings | 20 previews | 1 paid or 3 serious replies | Competitive, but large market. Contactability may be harder. |
| Paris | 100 listings | 20 previews | 1 paid or 3 serious replies | Massive market, high ADR, but more regulation/professional operators and harder differentiation. |

Total sprint target: **300 listings researched, 60 previews created, 60 ethical outreach attempts.**

## Offer used in all three markets

**Full Airbnb Listing Glow-Up — $300**

Includes:
- 10–20 enhanced photos
- cover photo recommendation
- optimized photo order
- 3 title options
- rewritten Airbnb-ready description
- photo captions
- 30-second vertical video/reel from existing photos
- mini competitor/pricing note
- top 10 action list
- final paste-ready delivery file

## Qualification filter

Only pitch listings that score **70/100 or higher**.

Avoid leads where:
- the property itself looks bad,
- reviews are poor,
- ADR is too low for a $300 offer,
- the host is impossible to reach,
- the listing is already professionally managed and polished,
- the pitch would feel creepy or legally risky.

## Lead scoring model

| Factor | Points | What good looks like |
|---|---:|---|
| Bad photos but decent property | 25 | Dark, badly ordered, awkward cover photo, but apartment itself looks fixable. |
| Weak title/description | 20 | Generic title, weak first paragraph, missing guest persona, no emotional hook. |
| ADR above $100 | 15 | One extra booking can plausibly pay for the package. |
| 20+ reviews / active listing | 15 | Demand exists; listing is not abandoned. |
| Rating above 4.6 | 10 | Guest experience likely good enough; presentation is the issue. |
| Contact info found | 10 | Host/property manager/direct website/social/OTA cross-listing found. |
| Clear competitor gap | 5 | Nearby competitors look meaningfully better at similar price. |
| **Total** | **100** | Pitch only 70+. |

## Preview package per lead

Each preview must be fast and visual. Target: **10–15 minutes per lead**.

Minimum preview:
1. listing score out of 100,
2. 3 biggest listing problems,
3. one improved/watermarked photo mockup or cover-photo recommendation,
4. better title,
5. rewritten first paragraph,
6. 3 concrete fixes,
7. CTA: unlock full package for $300.

## Outreach principle

The host must feel helped, not stalked.

Do not say: “I scraped your listing and edited your photos.”

Say: “I made a small private watermarked preview showing how your listing presentation could look more professional. No fake edits, no booking guarantees — just clearer photos/copy/presentation.”

## Metrics to track

Per city:
- listings reviewed,
- leads above 70,
- contacts found,
- previews created,
- messages sent,
- replies,
- serious replies,
- paid clients,
- objections,
- time per preview,
- time per full delivery.

## Decision rule after first batch

After 20 previews per city:

| Result | Decision |
|---|---|
| 1+ paid customer | Continue that city and create next 50 previews. |
| 3+ serious replies | Improve close/checkout/trust and continue. |
| Replies but price objections | Test $149 diagnostic / $300 full package ladder. |
| No replies but good contact rate | Improve outreach and preview asset. |
| Bad contact rate | Change sourcing route or city. |
| Bad lead quality | Change target segment/neighborhood/filter. |

## City hypotheses

### Athens

Hypothesis: strongest early market. Many independent hosts, good tourism demand, visible listing-quality variance, and potentially easier contact discovery through property names, Booking/Vrbo cross-listings, small operators, and local agencies.

Priority neighborhoods to inspect first:
- Plaka
- Koukaki
- Monastiraki
- Psyrri
- Syntagma
- Neos Kosmos
- Kolonaki

### Madrid

Hypothesis: large enough to find many weak listings, but contactability and professional competition may be mixed.

Priority neighborhoods to inspect first:
- Centro
- Malasaña
- Chueca
- La Latina
- Lavapiés
- Salamanca
- Retiro

### Paris

Hypothesis: high ADR can support $300, but market is more regulated and professionalized. Strong for high-value hosts, harder for cold outreach.

Priority areas to inspect first:
- Le Marais
- Latin Quarter
- Montmartre
- Bastille
- Saint-Germain
- Canal Saint-Martin
- Eiffel/Trocadéro area

## First execution order

1. Build one shared lead sheet using `templates/lead-scoring.csv`.
2. Research 30 listings per city first, not 100.
3. Score and compare lead quality/contactability across cities.
4. Expand the best city to 100 first.
5. Create 20 previews in the highest-contactability city.
6. Only then create previews for the other cities.

This avoids wasting 60 preview builds if one city clearly has bad contactability.
