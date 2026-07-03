# AI Engine Spec

Long-term internal system for semi-automating the service.

## Input

- Airbnb URL
- optionally: uploaded photos, host notes, competitor URLs, target guest persona

## Module 1: Listing intake

Extract or collect title, description, amenities, host info, reviews, photos, rating, price, location/area, availability if accessible, and nearby competitors.

Note: Airbnb scraping has platform/legal risks. Start with user-submitted URLs and manual extraction.

## Module 2: Listing score

Scores:
- photo quality
- title strength
- description strength
- amenity completeness
- review sentiment
- pricing competitiveness
- trust/expectation alignment
- guest persona clarity
- competitor gap
- overall conversion score

Output example:

> Your listing scores 54/100. Biggest issues: weak cover photo, generic title, unclear sleeping arrangement, no emotional hook, missing workspace angle.

## Module 3: Photo analysis

For each image:
- brightness
- sharpness
- angle
- clutter
- room type
- emotional appeal
- duplicate/redundant photo
- keep/remove/reorder
- suggested caption
- enhancement potential

Outputs:
- best cover photo
- recommended photo order
- photos to remove
- missing photos to shoot
- enhanced versions

## Module 4: Text rewrite

Generate title options, short description, long description, photo captions, house rules rewrite, guest expectation notes, neighborhood description, amenities emphasis, and persona-specific versions.

Personas: couples, families, digital nomads, business travelers, budget travelers, luxury weekenders.

## Module 5: Review mining

Analyze reviews for repeated compliments, repeated complaints, guest language, hidden selling points, risk areas, expectation mismatches, and operational fixes.

Example insight:

> Guests repeatedly mention the balcony and coffee shop downstairs. These should appear in the first 3 photos and first paragraph.

## Module 6: Market/competitor comparison

Compare nearby listings by photo quality, title style, ADR, rating, review count, amenities, and positioning angle.

Output example:

> Your listing is priced like premium, but presented like budget.

## Module 7: Sales preview generator

Create a personalized mini landing page:
- current listing screenshot
- score
- 3 problems
- before/after photo preview with watermark
- new title preview
- short video with watermark
- CTA: Unlock full package — $300

## Module 8: Delivery generator

After payment:
- export final photos
- export video
- generate Airbnb-ready copy file
- generate implementation checklist
- generate follow-up recommendations

## Development sequence

- Version 0: Manual/AI-assisted. No scraping engine.
- Version 1: Semi-automated listing URL intake and preview generator.
- Version 2: Lead engine that searches markets and scores prospects.
- Version 3: Host dashboard / SaaS or internal ops platform.
