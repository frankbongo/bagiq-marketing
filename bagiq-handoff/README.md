# BagIQ V4 Landing Page — Design Handoff

A React (UMD + Babel-standalone) landing page mock for **bagiq.app**, the combined V1+V2 direction. Pure HTML/CSS/JSX — no build step required to view.

## What's in this folder

- `index.html` — Open this to view the design. Loads React + Babel from CDN and renders `<BagiqV4 />`.
- `brand.css` — Design tokens (colors, type, shadows, pill buttons, flight badges).
- `bagiq-shared.jsx` — Shared product components (`<BagMap>`, `<BagIdentityBanner>`, `<StatsRow>`, `<FlightChips>`, `<RecommendationCard>`, `<GapCallout>`, `<OverlapCallout>`, `<DetoxCard>`, `<BagIdentityChip>`, `<Footer>`).
- `bagiq-app-v4.jsx` — The actual page (`<BagiqV4 />`) and its inline mini-visual SVGs.
- `assets/logo.png` — BagIQ wordmark.
- `v4-screenshot.png` (one level up) — Full-page render for visual reference.

## How to view locally

```
cd handoff
python3 -m http.server 8000
# open http://localhost:8000
```

(`file://` will not work because of module/babel fetch.)

## Page structure (top → bottom)

1. **Nav** — logo + links (The Bag Map / Disc Detox / How it works / FAQ) + maroon CTA pill.
2. **Hero** — animated bag-identity chip, big "Fix your bag in under a minute." headline, primary + outline CTAs, white trust pill ("Free · forever / No account · no signup / Any device · mobile, tablet, desktop").
3. **Centered product preview** — white card containing `<BagIdentityBanner>`, `<BagMap>` (left), and a `<RecommendationCard>` with "Fill the gap" caption (right).
4. **Three answers** — section titled *"BagIQ answers three questions every disc golfer asks."* Three cards using mini SVG visuals:
   - **Gap analysis** — `<MissingMapVisual>`: discs + dashed pink "+" gap markers.
   - **Overlap** — `<OverlapMapVisual>`: discs with a dashed orange ellipse around an overlapping pair.
   - **Next disc** — `<DiscListPicksVisual>`: stacked rows of DiscList™ picks with arrow CTAs.
5. **Disc Detox** — dark section, big "Two discs. One slot." headline, Conservative/Aggressive mode notes, and a cream Detox card mock with two `<DetoxCard>` rows (Keep / Remove / Lock buttons + flight chips).
6. **Powered by DiscList™** — cream split: left text, right column of three `<V4FixRow>` rows ranked 01–03 (price, classification, in-stock state).
7. **Three steps. Two minutes.** — three numbered cards (Add your discs / Tell BagIQ how you throw / Get your Bag Map).
8. **Maroon CTA block** — "Most bag advice is wrong." headline + email signup form.
9. **Footer** — "Powered by DiscList™ · Built by Golf With Discs" + Licensing / Privacy / contact.

## Design tokens (excerpt — full set in `brand.css`)

| Token | Value | Use |
|---|---|---|
| `--primary` | `#7C0236` | BagIQ maroon |
| `--bg` | `#FDF9F4` | Page background cream |
| `--surface` | `#FFFFFF` | Cards |
| `--surface2` | `#F0E8DF` | Soft warm panel |
| `--surface3` | `#F7F1E8` | Slightly lighter warm panel |
| `--border` | `#E8DED2` | Default border |
| `--text` | `#111111` | Body text |
| `--text2` | `#4A4842` | Secondary text |
| `--text3` | `#8A8478` | Tertiary / labels |
| `--speed` | `#E67E22` | Flight: Speed |
| `--glide` | `#3498DB` | Flight: Glide |
| `--turn` | `#9B59B6` | Flight: Turn |
| `--fade` | `#27AE60` | Flight: Fade |

**Type:** `Manrope 800` for display/headings (`letter-spacing: -0.025em`), `Inter 400/500/600/700/800` for body. Both loaded from Google Fonts in `index.html`.

## Reusable components (rebuild these as real React/Vue/Astro components when porting)

| Component | What it is |
|---|---|
| `<BagMap>` | The 2-axis Speed × Stability chart. Discs are colored circles labeled with initials (putter green, mid blue, fairway orange, driver maroon). Gap "+" markers, lock badges, warning bubbles, filter pills. |
| `<BagIdentityBanner>` | Maroon→pink gradient header card with bag name, tagline, coverage progress bar. |
| `<RecommendationCard>` | Disc card with pastel-blue hero, brand/name/category, flight chips, DiscList # badge, capability tags, "Where to buy" + "Add to bag" buttons. |
| `<FlightChips>` | Four colored squares (Speed/Glide/Turn/Fade) with values. |
| `<StatsRow>` | Coverage / Gaps / Overlap / Bag tiles (4-up). |
| `<GapCallout>` / `<OverlapCallout>` | Tinted callout bars with eyebrow + title + body. |
| `<DetoxCard>` | Single disc card with Keep / Remove / Lock buttons. |
| `<BagIdentityChip>` | Pulsing maroon dot chip that cycles through identity phrases. |

## Mock data lives in `bagiq-shared.jsx`

- `SAMPLE_DISCS` — the 10 discs that populate the Bag Map (matches the "Chaos bag" screenshot).
- `SAMPLE_GAPS` — the two `+` markers (OS FW @ speed 7.5, US DRV @ speed 9.5).
- `CAT_COLOR` — putter/mid/fairway/driver fill colors.

## Notes for porting

- The components use inline-style objects (heritage of the React UMD + Babel setup) — when porting to Tailwind/CSS modules, the visual values to lift are in those style objects.
- All copy in the page is intentional — no Lorem ipsum.
- The "Powered by BagIQ" footer credit and DiscList™ attribution are required per the product README.
- Both fonts must be present or layout reflows.
