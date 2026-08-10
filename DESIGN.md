# Design System: Hibachi Lou

---

`name: Hibachi Lou
description: Pittsburgh's hibachi food truck — fire, flavor, and the 412.
colors:
  grill-ember: "oklch(58.405% 0.22683 26.856)"
  warm-parchment: "oklch(96.478% 0.01257 86.799)"
  charcoal: "oklch(19.404% 0.00628 55.877)"
  seared-gold: "oklch(84.391% 0.15125 87.869)"
  card-white: "oklch(99.42% 0.00681 88.607)"
  ash: "oklch(91.476% 0.01891 83.026)"
  smoke: "oklch(52.098% 0.01636 74.235)"
  border-warm: "oklch(86.998% 0.02252 80.64)"
typography:
  display:
    fontFamily: "The Seasons, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "The Seasons, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  title:
    fontFamily: "The Seasons, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.2em"
rounded:
  sm: "calc(0.625rem * 0.6)"
  md: "calc(0.625rem * 0.8)"
  lg: "0.625rem"
  xl: "calc(0.625rem * 1.4)"
  2xl: "1rem"
spacing:
  section: "6rem"
  container: "1rem"
  card: "1.5rem"
  gap: "1.5rem"
  tight: "0.5rem"
components:
  button-primary:
    backgroundColor: "{colors.grill-ember}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "oklch(46.7% 0.18146 26.856)"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "32px"
  button-outline-hover:
    backgroundColor: "{colors.ash}"
    textColor: "{colors.charcoal}"
  card-default:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  input-default:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
    height: "32px"
  badge-default:
    backgroundColor: "{colors.grill-ember}"
    textColor: "{colors.card-white}"
    rounded: "9999px"
    padding: "2px 8px"
    height: "20px"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "9999px"
    padding: "8px 16px"
  chip-filter-active:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.grill-ember}"
    rounded: "9999px"
    padding: "8px 16px"`
---

## Overview

### Creative North Star: "The Street Flame"

Raw, unapologetic street-food energy meets editorial craft. The design speaks in fire and grit — uppercase serif headlines that hit like a food truck menu board, warm parchment backgrounds that carry the warmth of a griddle, and a single ember-red accent that burns through every surface it touches. The system is dense where it matters (navigation, labels, data) and generous where the experience breathes (hero sections, imagery, the space around headings). Photography and the grill itself do the heavy visual lifting; the interface stays tonal, typographic, and out of the way.

There is no softness here. No pastels, no rounded-everything, no frosted glass. The Seasons serif carries the voice — a font that feels hand-lettered on a chalkboard without the affectation. Geist Sans and Geist Mono handle the utilities: clean, tight, and invisible. The system is light-mode by default because food is better in daylight, and the warm parchment background keeps the whole page feeling like a sun-bleached food stall.

**Key Characteristics:**

- Uppercase, tight-leading serif headlines as the dominant visual element
- A single, deliberate primary red (Grill Ember) used sparingly for maximum impact
- Warm, desaturated neutrals that feel tactile — paper, charcoal, ash
- Monospace for metadata, dates, prices, and system labels
- GSAP-driven page loader and scroll-triggered entrance animations
- Full-bleed photography sections with dark overlays for text contrast
- Continuous marquee ticker as a brand heartbeat element

## Colors

The palette is a grill: ember against warm paper, charcoal for contrast, and gold where the sear catches light.

### Primary

- **Grill Ember** (`oklch(58.405% 0.22683 26.856)`): The single accent. CTA buttons, the marquee bar, active states, blockquote borders, hover transitions on links. Used on ≤10% of any given screen.

### Neutral

- **Warm Parchment** (`oklch(96.478% 0.01257 86.799)`): Page background. Warm off-white with a hint of straw — never pure white.
- **Charcoal** (`oklch(19.404% 0.00628 55.877)`): Primary text, headings, and high-contrast foreground elements. Near-black with a warm undertone.
- **Card White** (`oklch(99.42% 0.00681 88.607)`): Card and popover surfaces. Sits just above Warm Parchment to create tonal separation without shadow.
- **Ash** (`oklch(91.476% 0.01891 83.026)`): Muted backgrounds, button hover states, secondary surfaces. The mid-warm neutral.
- **Smoke** (`oklch(52.098% 0.01636 74.235)`): Secondary text, placeholders, metadata. The reading-weight neutral.
- **Border Warm** (`oklch(86.998% 0.02252 80.64)`): Borders and dividers. Visible but quiet.

### Accent

- **Seared Gold** (`oklch(84.391% 0.15125 87.869)`): Accent highlights, the schedule section background, and anywhere warmth needs emphasis without reaching for the primary red.

### Named Rules

**The One Flame Rule.** Grill Ember is the only saturated color in the system. It appears on CTAs, the marquee, and active states — never as a background wash, never as a gradient, never paired with another saturated hue. Its rarity is the heat.

## Typography

**Display Font:** The Seasons (with Georgia fallback)
**Body Font:** Geist Sans (with system-ui fallback)
**Label/Mono Font:** Geist Mono (with ui-monospace fallback)

**Character:** The Seasons is a transitional serif with hand-lettered warmth — it reads like a menu board painted by someone who trained in calligraphy. Paired against Geist's mechanical precision, the contrast creates a system that feels both personal and professional: the chef and the operation.

### Hierarchy

- **Display** (700, `clamp(3rem, 8vw, 5rem)`, 0.88): Hero headlines. Uppercase, tight leading, stacked line breaks. The loudest voice on any page.
- **Headline** (700, `clamp(2rem, 5vw, 3.75rem)`, 0.88): Section headings. Same tight leading as display, smaller scale. Uppercase.
- **Title** (600, 1.5rem, 1.2): Card titles, sub-section heads, navigation brand mark. The Seasons at reading weight.
- **Body** (400, 1.125rem, 1.6): Paragraph text. Geist Sans, relaxed leading, max 65–75ch measure.
- **Label** (500, 0.75rem, 1.4, tracking 0.2em, uppercase): Section kickers, metadata, dates, prices, filter chips. Geist Mono. The system's utilitarian voice.

### Rules

**The Board Rule.** All display and headline text is uppercase. Mixed-case headings are body, not display.

## Layout

The layout is a single-column editorial spine: `max-w-6xl` (72rem / 1152px) centered with `px-4` gutters. Sections stack vertically with `py-24` (6rem) breathing room between them. Content grids appear inside this spine — 2-column and 3-column on `md:` breakpoints, collapsing to single-column on mobile.

The hero section fills `min-h-[calc(100vh-4rem)]` below the sticky nav. Full-bleed imagery sections (the "IT'S NOT JUST FOOD" cinematic and the schedule map) break out of the content spine to fill the viewport width.

- **Container:** `max-w-6xl` (1152px), `px-4` (16px) gutters
- **Section rhythm:** `py-24` (96px) vertical padding
- **Grid gaps:** `gap-6` (24px) for card grids, `gap-4` (16px) for tight grids, `gap-8` (32px) for text-heavy layouts
- **Breakpoint:** `md:` (768px) is the primary responsive break. Desktop uses multi-column grids; mobile stacks.
- **Image containers:** `aspect-[4/3]` for menu cards, hero imagery, and catering cards

## Elevation & Depth

Flat by default. Surfaces are differentiated by tonal layering — Card White sits above Warm Parchment, which sits above Ash — not by ambient shadow. Depth is earned through interaction.

- Cards have no resting shadow. On hover, they lift (`-translate-y-1`) and gain `shadow-lg`.
- The sticky nav uses `backdrop-blur` and `bg-background/90` to separate from scroll content — this is a functional depth cue, not decoration.
- The dark cinematic section uses `bg-black/60` overlay on photography, creating depth through contrast rather than elevation.
- The mobile nav drawer uses `shadow-lg` because it literally sits above the page.

### Named Rules

**The Flat Grill Rule.** No surface carries an ambient shadow at rest. Shadows appear only as a response to hover, focus, or overlay. If it's not moving, it's flat.

## Shapes

The form language is soft-cornered rectangles. Nothing is a pill except badges and filter chips (which are small controls). Nothing is sharp-cornered except the marquee bar (which is a full-width band, not a container).

- **Cards:** `rounded-2xl` (1rem) — generously curved containers
- **Buttons:** `rounded-lg` (0.625rem) — slightly tighter than cards, tactile
- **Inputs:** `rounded-lg` (0.625rem) — matches buttons for visual alignment in forms
- **Badges:** `rounded-full` (9999px) — pill shape, small scale only
- **Filter chips:** `rounded-full` (9999px) — pill shape, consistent with badges
- **Image containers:** `rounded-2xl` (1rem) with `overflow-hidden` — images clip to the card radius
- **Borders:** `1px solid` using `border-warm`. Single declaration; no doubles, no thick left-bars.

## Components

### Buttons

Tactile and direct — buttons feel physical, like pressing a hot plate.

- **Shape:** Softly rounded (0.625rem radius)
- **Primary:** Solid Grill Ember fill, Card White text, uppercase labels, `h-8` (32px) default / `h-12` (48px) for `lg` size with `px-8` generous padding
- **Hover:** Darkened primary (`primary/80`), `translate-y-px` active press on non-popup buttons
- **Outline:** Transparent background, `border-warm` border, Charcoal text. Hover fills with Ash.
- **Ghost:** No border, no background. Hover fills with Ash. Used for icon buttons (menu toggle, close).
- **Focus:** `ring-3` with `ring/50` — visible but not aggressive.

### Filter Chips (Schedule section)

- **Style:** Pill-shaped (`rounded-full`), transparent background with `border-black/30`, Charcoal text
- **Active state:** Inverted — Charcoal fill, Grill Ember text
- **Transition:** `transition-colors` for smooth state change

### Cards / Containers

Firm containers with clear borders.

- **Corner Style:** `rounded-2xl` (1rem)
- **Background:** Card White (`oklch(99.42%)`) — subtle tonal lift above the page background
- **Shadow Strategy:** None at rest. `shadow-lg` + `-translate-y-1` on hover.
- **Border:** `ring-1 ring-foreground/10` — a fine, warm hairline
- **Internal Padding:** `p-6` (24px) for content areas, variable by size prop
- **Image treatment:** Images fill the card top with `object-cover`, clipped by the card's border radius

### Inputs / Fields

- **Style:** Transparent background, `border-input` stroke, `rounded-lg` (0.625rem)
- **Focus:** `border-ring` + `ring-3 ring-ring/50` — clear but not loud
- **Error:** `border-destructive` + `ring-3 ring-destructive/20`
- **Disabled:** `bg-input/50`, `opacity-50`, no pointer events

### Navigation

- **Style:** Sticky header, `h-16` (64px), `backdrop-blur` with `bg-background/90`
- **Typography:** `text-sm font-medium`, uppercase link labels
- **Default:** Charcoal text
- **Hover:** `text-primary` (Grill Ember) — the flame peeks through
- **Mobile:** Right-drawer with `shadow-lg`, stacked links at `text-base`
- **Brand mark:** The Seasons serif, `text-base font-semibold tracking-wide`, uppercase "HIBACHI LOU"

### Marquee Ticker

The brand heartbeat. A continuous horizontal scroll powered by GSAP.

- **Background:** Solid Grill Ember fill, full viewport width
- **Typography:** Geist Mono, `text-sm`, uppercase, `tracking-widest`, Card White text
- **Content:** Brand name, city, area code, separated by bullet characters
- **Animation:** Linear scroll, 24s duration, infinite repeat, GSAP-driven

### Page Loader

A cinematic entrance sequence.

- **Background:** Full-screen Warm Parchment
- **Brand:** The Seasons display text "HIBACHI LOU", centered
- **Metadata:** Geist Mono, "PITTSBURGH / 412", centered below brand
- **Progress:** 1px-height bar in bottom-left, scales from 0 to full on `power3.inOut`
- **Counter:** Large Geist Mono numerals in bottom-right
- **Exit:** Slides up on `power4.inOut`, then hides

## Do's and Don'ts

### Do

- **Do** use uppercase for all display and headline text. The Seasons speaks loudest in caps.
- **Do** keep Grill Ember to ≤10% of any screen. CTAs, the marquee, active states, and blockquote borders — that's the full list.
- **Do** use Geist Mono for all metadata: dates, prices, section numbers, kickers, and filter labels. It separates system voice from content voice.
- **Do** use `aspect-[4/3]` for food photography containers. It matches the landscape orientation of grill and plating shots.
- **Do** use `leading-[0.88]` on display and headline text. Tight leading is the typographic signature.
- **Do** let photography do the color work. The UI palette is deliberately muted so food imagery carries the saturation.

### Don't

- **Don't** use gradient text, gradient backgrounds, or multi-color accents. The palette is ember + neutrals. Period.
- **Don't** apply ambient shadows to resting cards. Shadows are earned through interaction.
- **Don't** use mixed-case headings in The Seasons. If it's not uppercase, it's body text in Geist.
- **Don't** use Grill Ember as a background fill except on the marquee ticker and the CTA footer section. Everywhere else it's a foreground accent.
- **Don't** introduce a second saturated hue. No blues, greens, or purples. The warmth of the palette is the point.
- **Don't** use rounded-full (pill) shape on anything larger than a badge or filter chip. Cards, buttons, and containers are `rounded-lg` or `rounded-2xl`.
