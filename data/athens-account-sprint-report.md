# Athens account-based validation sprint report

## Bottom line

The Athens sprint should continue, but it must become **account-based**, not listing-based.

The first Athens pass proved that reachable inventory exists. It did **not** yet prove market demand, because many of the strongest listing candidates route to the same operator inbox.

**New validation unit:** one distinct host/operator account.

**Do not count five UPSTREET listings as five tests. Count them as one UPSTREET account test.**

## What changed

Previous logic:

> Find weak listings → create previews → contact hosts.

Revised logic:

> Find distinct reachable accounts → pick one representative weak-but-fixable listing/page per account → send a permission-first micro-audit offer → measure replies/payment.

This avoids false confidence from over-sampling one reachable agency.

## Account research result

Created: `data/athens-account-crm.csv`

The CRM contains **20 distinct Athens-relevant accounts** with public websites/contact routes and one example listing/page each.

Priority split:

| Priority | Count | Meaning |
|---|---:|---|
| A | 9 | Best first outreach candidates |
| B | 9 | Useful second wave / more hotel-like or polished |
| C | 1 | Contactability control but weak $300 economics |
| Needs manual verification | 1 | Do not send until contact/listing page is rechecked |

## First 10 accounts to contact

Use `data/outbox/athens-account-outreach.md`.

| # | Account | Why first |
|---:|---|---|
| 1 | UPSTREET | Strong central Athens inventory; prior preview already exists. |
| 2 | Cloudkeys | Clear short-term-rental/property-management angle. |
| 3 | My Greek Vacations | Large Athens inventory and property-management navigation. |
| 4 | Athens BnB Stays | Small operator, likely more personal and reachable. |
| 5 | ArisHost | Explicit Airbnb property-management positioning. |
| 6 | IVY Vacation Rentals | Athens apartment listings + property-management arm. |
| 7 | Homz | Short-term-rental apartments/studios with WhatsApp/contact. |
| 8 | Live in Athens | Boutique short-stay apartments; strong story angle. |
| 9 | Bill & John | Professional operator; useful B2B pilot test. |
| 10 | Urban Stripes Athens | Strong boutique apartment brand; high-quality audit required. |

## What to send

Do **permission-first** outreach first, not full unsolicited previews.

Message promise:

- private micro-audit
- one specific listing/page
- no fake edits
- no guaranteed bookings/ranking
- practical title/copy/photo-order recommendations
- optional $300 full upgrade only after interest

## Do not send yet

Do not send the full $300 pitch in the first line.

Do not attach unrequested edited photos.

Do not mention Airbnb scraping.

Do not imply their listing is bad or embarrassing.

Do not use TulchaTravel or any travel-tour identity.

## Sprint metric

After 10 account messages:

| Result | Decision |
|---|---|
| 1 paid client | Continue Athens and build delivery process. |
| 2+ serious replies | Create/send deeper previews and improve closing assets. |
| Replies but price objections | Test $149 diagnostic / $300 full upgrade ladder. |
| No replies but messages clearly delivered | Improve subject line, trust proof, and preview format. |
| Bad deliverability/contact route | Shift to forms/WhatsApp/LinkedIn/direct operator channels. |

After 20 account messages:

- **1 paid client or 3 serious replies = continue.**
- **0 serious replies = change channel/segment before building product.**

## Recommended tracking columns

Use `data/athens-account-crm.csv` and add these fields during execution:

- message_sent_date
- channel_used
- subject_line
- delivered_yes_no
- reply_yes_no
- reply_type
- objection
- preview_sent_yes_no
- call_booked_yes_no
- paid_yes_no
- notes

## Strategic read

Athens is still a good first market, but likely as a **B2B operator/service sale**, not purely as independent-host cold outreach.

The strongest pitch is:

> We improve one listing/page so guests understand the value faster. Start with one property; if useful, repeat across the portfolio.

For operators, keep the door open to:

- $300 one-listing upgrade
- $750 three-listing pilot
- $2,000–$2,500 ten-listing batch

But sell only the first listing first.

## Immediate next action

Human review the first 10 messages in `data/outbox/athens-account-outreach.md`, then send manually through the listed public routes.

The project should not build more software until this batch produces replies or payment.
