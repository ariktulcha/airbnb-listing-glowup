# Athens / Madrid / Paris Execution Plan

*Created: 2026-07-03*

## Bottom line

We will validate three destinations in parallel, but we should **not** create 60 previews immediately.

The smart sequence:

1. research 30 listings per city,
2. measure lead quality and contactability,
3. expand the best city first,
4. create previews only for leads above 70/100,
5. compare reply rates by city.

This protects us from wasting time if Paris or Madrid has weak contactability.

## Workstreams

### Workstream A — Lead sourcing

Target: 30 initial listings per city.

Sources to check:
- Airbnb search manually
- listing titles/property names copied into Google
- same property on Booking.com
- same property on Vrbo
- property manager website
- Instagram/Facebook property page
- Google Business Profile
- LinkedIn property manager/host
- local STR/property management directories

### Workstream B — Scoring

Use `templates/lead-scoring.csv`.

Score each listing:
- photo gap,
- copy gap,
- ADR fit,
- activity/reviews,
- rating,
- contactability,
- competitor gap.

Lead status:
- `raw`
- `scored`
- `qualified_70_plus`
- `preview_created`
- `outreach_sent`
- `replied`
- `serious_reply`
- `paid`
- `rejected`

### Workstream C — Preview production

Use `templates/preview-brief-template.md`.

Each preview should include:
- score,
- 3 issues,
- one watermarked visual direction,
- 3 title options,
- rewritten opening paragraph,
- 3 quick fixes,
- $300 CTA.

### Workstream D — Outreach

Use `templates/outreach-scripts.md`.

Test:
- permission-first message,
- preview-first message,
- property-manager message.

Track city-level results separately.

## City-specific strategy

### Athens

Initial hypothesis: best first city.

Why:
- independent hosts likely common,
- tourism market is strong,
- many apartments are decent but under-presented,
- contact routes may be easier through Booking/Vrbo/property pages.

Priority segments:
- central apartments with 20+ reviews,
- family/couple apartments near tourist zones,
- listings with good rating but weak cover photo/title.

### Madrid

Initial hypothesis: strong inventory, mixed contactability.

Why:
- big market,
- many listings,
- some hosts are professionalized,
- differentiating may require sharper competitor note.

Priority segments:
- central 1–2 bedroom apartments,
- listings with generic Spanish/English copy,
- visually decent apartments with bad photo order.

### Paris

Initial hypothesis: high ADR, harder market.

Why:
- hosts can afford $300,
- competition is intense,
- regulation/professionalization may complicate outreach,
- cold messages may feel more sensitive.

Priority segments:
- independent-looking apartments,
- high review count but weak visuals,
- listings where presentation is clearly below price level.

## First 48 hours

### Day 1

- Set up master lead sheet.
- Collect 30 raw leads per city.
- Do contactability research on at least 10 leads per city.
- Identify which city has best combination of weak listings + reachable hosts.

### Day 2

- Expand strongest city to 100 leads.
- Score all leads.
- Select top 20.
- Create first 5 previews.
- Send first 5 outreach messages to test framing before doing all 20.

## Decision checkpoint

After 5 outreach messages in the leading city:

- If replies are positive: create remaining 15 previews.
- If no replies but opens/clicks happen: improve preview/CTA.
- If no contactability: switch leading city.
- If responses say “too expensive”: test $149 diagnostic / $300 full package.

## Deliverables created in this repo

- `13-three-city-validation-sprint.md`
- `14-athens-madrid-paris-execution-plan.md`
- `templates/lead-scoring.csv`
- `templates/preview-brief-template.md`
- `templates/outreach-scripts.md`
- `templates/landing-page-copy.md`
- `templates/sample-audit-delivery.md`
