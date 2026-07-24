# Morfeus × Claude — Design System

> A sub-brand of **Morfeus** built for the launch of the **Webinar Claude** and
> the Claude products (*corso* + *bootcamp*). It lives inside the Morfeus
> ecosystem but has its own visual personality.

**Version:** 2.0 · Last updated April 2026
**Source of truth:** [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md)

---

## The product

**Morfeus** is a training ecosystem. The **Webinar Claude** sub-brand is a
temporary launch identity for a free webinar + a paid course (corso) +
bootcamp that teach people how to get real work done with **Claude**
(Anthropic). The surfaces this design system must serve:

| Surface | Role |
|---|---|
| Landing page (opt-in) | Single goal: collect the email. Dark, clean, prominent form, pulsing CTA. |
| Thank-you page | Confirmation + anticipation, next step clear. |
| Email | Inverted — light bg, dark text, orange accents. Morfeus black logo. |
| Webinar slides (16:9) | Dark, big titles, little text per slide. Morfeus bottom-left, Claude mark where the product is discussed. |
| Sales page | Long-form dark; alternating section rhythm; repeated CTA. |
| Social ads / LinkedIn | Square or 4:5, headline in orange on dark, works in ~1.5 seconds. |

**Identity in one line:** *Competenza concreta con energia.* Competence with
energy. You know what you're doing and you show it without shouting.

### What this brand is NOT

- Not a copy of Anthropic/Claude.
- Not a rebrand of Morfeus.
- Not a generic infobiz template.
- Not corporate. Not hype.

---

## Sources given to me

- `uploads/BRAND_GUIDELINES.md` — the full v2.0 brand guideline (preserved at repo root).
- `uploads/m-{w,b,c}{,2,3}.png` — 9 logo variants (white, black, colored × symbol/horizontal/stacked).

> No codebase, Figma, or sample slide decks were provided. The UI kits and
> slide templates below are **inferred from the brand guideline** rather than
> reproduced from existing production surfaces. Flag anything that drifts from
> the real launch assets so I can correct it.

---

## Index — what's in this folder

```
./
├── README.md                       ← you are here
├── BRAND_GUIDELINES.md             ← canonical brand doc (v2.0)
├── SKILL.md                        ← agent-skill manifest
├── colors_and_type.css             ← tokens + semantic type (drop-in)
│
├── assets/
│   └── logo/                       ← m-w, m-w2, m-w3 (white), m-b* (black), m-c* (color)
│
├── preview/                        ← design system tab cards (HTML)
│   ├── colors-foundation.html
│   ├── colors-accents.html
│   ├── colors-text.html
│   ├── colors-dominance.html
│   ├── type-display.html
│   ├── type-italic-accent.html
│   ├── type-body.html
│   ├── type-scale.html
│   ├── radii.html
│   ├── shadows-and-glow.html
│   ├── spacing.html
│   ├── buttons.html
│   ├── cards.html
│   ├── form-input.html
│   ├── badges-and-tags.html
│   ├── check-icon.html
│   ├── section-label.html
│   ├── gradient-signature.html
│   ├── atmosphere.html
│   ├── logos.html
│   └── iconography.html
│
├── ui_kits/
│   └── landing_optin/              ← Landing + Thank-you click-through
│       ├── index.html
│       ├── Header.jsx, Hero.jsx, OptinForm.jsx, …
│       └── README.md
│
└── slides/                         ← 16:9 webinar deck templates
    ├── index.html
    ├── TitleSlide.jsx
    ├── SectionSlide.jsx
    ├── BigQuoteSlide.jsx
    ├── BulletSlide.jsx
    └── ProductSlide.jsx
```

---

## Content Fundamentals

Copy in this system is written to match the visual tone: **competent, direct,
warm, not hype.** Specifics:

### Language
- **Italian first.** The whole guideline and the launch run in Italian (`"Guarda il webinar gratuito"`, `"Un evento Morfeus"`). English is acceptable for subtitles and product names (`"Webinar Claude"`) but the default is Italian.
- **Tu, not lei.** Direct, personal. *"Come usare Claude al massimo nel tuo lavoro."*
- **Concrete verbs.** *Usare, generare, lanciare, costruire* — not *empower, unlock, leverage*.

### Casing
- **Sentence case** for headlines, buttons, and body copy.
- **UPPERCASE only** for short eyebrow labels (`PROJECTS`, `SKILLS`, `WEBINAR GRATUITO`) with generous letter-spacing (0.12–0.20em). Never a whole sentence in uppercase.
- Proper nouns stay as-is: **Morfeus**, **Claude**, **Anthropic**.

### Punctuation & emphasis
- **No exclamation stacks.** One `!` max, usually none. The orange glow already carries energy.
- **Playfair italic** replaces *emphasis via caps* — use it for 1–3 keywords inside a headline (`"Come usare Claude al massimo nel tuo lavoro"`).
- **Numerals as numerals** (`3 moduli`, `60 min`) not *tre moduli*.
- **Em-dashes with spaces** ` — ` (European style).

### Vibe / what to avoid
- No stacked emoji in headlines or CTAs — emoji in body copy is fine when it clarifies, never as layout decoration.
- No **"finally"**, **"game-changer"**, **"you won't believe"** — hype words break the tone.
- No rhetorical question stacking. One question, one answer.
- No **corporate filler** (*"our mission is to empower…"*). Say what the thing does.

### Examples (good)
- `Un evento Morfeus. Non un webinar qualunque.`
- `Webinar gratuito · 60 min · Live`
- `Pronto a partire`
- `Guarda il webinar gratuito`
- `Come usare Claude *al massimo* nel tuo lavoro`  ← italic on "al massimo"

### Examples (bad — don't write this)
- `🚀 UNLOCK THE POWER OF CLAUDE!!! 🔥`
- `You won't believe what Claude can do…`
- `Our mission is to empower creators through AI`

---

## Visual Foundations

### Color
Dark is always the bed. The 85/10/4/1 dominance rule is strict:
~85 % foundation (`night` / `deep-space` / `dusk`), ~10 % text, ~4 %
orange (action only), ~1 % violet (structure only). If orange occupies
more than 5 % of the visible surface you've over-used it. Pure greys and
pure white never appear as backgrounds — only as text.

### Type
Three families, each with one job:

- **Clash Display** (600) — all display headings. Geometric sans with personality.
- **Playfair Display Italic** (500) — the accent. 1–3 keywords per headline, always colored (orange by default), never in body, buttons, or labels.
- **Satoshi** (400 / 500 / 700) — body, UI, buttons, labels. Never smaller than 16 px on desktop, 15 px on mobile.

Headline line-height is tight (1.02–1.10), body is generous (1.55–1.65).
Body is `--ghost` at opacity 0.85–0.88 — a soft white, never pure.

### Spacing
No rigid grid — a **rhythm of breathing**. Section padding 80–120 px
vertical desktop, 60–80 px mobile. Card gap 20–24 px. Prose lines never
wider than ~680 px. Section labels sit 48–64 px above their content.

### Backgrounds & imagery
- The page surface is `--night` with a fixed **atmosphere gradient** overlay: violet glow top-left at 10 % opacity, orange glow bottom-right at 8 %. Asymmetric, always. Never visible *consciously* — you feel it, you don't see it.
- Never a flat mid-grey. Never a full-bleed photo as a hero background — a screenshot or portrait sits *on* the dark, not under it.
- No repeating patterns, no stock geometric textures, no mesh gradients.
- Photos of Matt: 4:5, rounded 16–20 px, 1 px `rgba(255,255,255,0.1)` border, optional subtle violet/orange glow behind.
- Screenshots: 12–14 px radius, 1 px `rgba(255,255,255,0.08)` border, `0 10px 40px rgba(0,0,0,0.4)` shadow.

### Gradients
One **signature gradient** only: `linear-gradient(135deg, #6558D4 → #EB7A2E)`
used sparingly on the hero gradient-text and the logo-mark. Never as the
background of a large area. All linear gradients go `135deg`.

### Animation & motion
Motion exists to give feedback, not to entertain.

| What | How | Timing |
|---|---|---|
| CTA primary | `btn-pulse` shadow ring | 3 s infinite, stops on hover |
| Button hover | `translateY(-1px)` + glow intensifies | 0.2 s ease |
| Card hover | `translateY(-4px)` + orange border + shadow | 0.3 s `cubic-bezier(0.4,0,0.2,1)` |
| Input focus | border color → orange | 0.2 s ease |
| Link hover | color → `--orange-hover` | 0.2 s ease |
| Badge dot | opacity pulse | 2 s infinite |

**Forbidden:** scroll-fade-ins, parallax, bouncy springs, decorative loaders, section-entry animations, anything > 0.4 s. Nothing shakes, nothing bounces.

### Hover / press states
- **Buttons** — hover: lighter orange + lift 1 px + stronger glow. Press: darker orange, lift removed.
- **Cards** — hover: border orange-40 %, lift 4 px, bg slightly lighter, drop shadow appears. Never a fill change.
- **Links** — color shifts to `--orange-hover`. No underline by default.
- **Inputs** — focus: orange border, black-60 bg, no outline.

### Borders, radii, shadows
- **Borders:** always **1 px**, always semi-transparent. `rgba(255,255,255,0.06)` at rest, `rgba(255,255,255,0.12)` for inputs, orange at 40 % on hover. Never a solid colored border.
- **Radii:** pill for badges (100 px), **6 px** tag, **10 px** button/input, **14 px** card, **16 px** form card, **20 px** image placeholder.
- **Shadows:** two systems — functional orange glow under CTAs (indicates clickability), and dark drop shadow under lifted surfaces on hover (`0 10px 30px rgba(0,0,0,0.3)`). Inner shadows are never used. No "protection gradient" layer — text sits directly on dark.

### Transparency & blur
- `backdrop-filter: blur(10px)` used on form cards to separate them from atmospheric gradients.
- White overlays start at 0.03 (card rest), 0.05 (card hover), 0.06 (hairlines), 0.12 (input borders). Everything else is a solid token.

### Cards
Almost invisible at rest (3 % white fill, 6 % white border). They wake on
hover — orange border, +4 px lift, dark drop shadow. This is the core
interactive metaphor: **dormant → alive**.

### Layout
- Max content width **1120 px** with **24 px** side padding.
- Prose never wider than **680 px**.
- One H1 per page. One primary CTA per viewport.
- No fixed header at rest on long pages — it appears on scroll (optional).

---

## Iconography

**The brand does not ship a custom icon set.** The guideline defines no
icon family, no sprite, no icon font. The only recurring glyph is the
**orange check mark** used in authority/feature lists — a 26 × 26 rounded-
square chip with orange border, orange-10 % fill, and a `✓` in orange.

### Approach
1. **Use iconography sparingly.** The brand leans on type, space, and
   color — icons clutter the 85/10/4/1 ratio fast. Prefer a section label
   (violet, uppercase) over an icon + label.
2. **When you need icons,** default to **[Lucide](https://lucide.dev/)** — 1.5 px
   stroke, 24 px box, rounded joins — it matches the geometric-sans
   personality of Clash Display and reads well on dark.
   ```html
   <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
   <i data-lucide="check" style="stroke:var(--orange);width:20px;height:20px"></i>
   ```
   **Flagged substitution — confirm with the user before shipping.**
3. **The Morfeus wave mark** (`assets/logo/m-w.png`, `m-c.png`) is the only
   brand symbol. It substitutes for a favicon, app icon, and any "powered
   by Morfeus" footer mark.
4. **Emoji** — never in layout or UI chrome. Acceptable in body copy when
   it clarifies (e.g. `📍 Online` in a meta row), but the brand copy
   examples don't use them — default to off.
5. **Unicode glyphs** — `✓` (orange check), `·` (meta-row separator),
   ` — ` (em-dash). These are the only stand-ins used.

### Files present
- `assets/logo/m-w.png`, `m-w2.png`, `m-w3.png` — white (header on dark).
- `assets/logo/m-b.png`, `m-b2.png`, `m-b3.png` — black (email, PDF, light bg).
- `assets/logo/m-c.png`, `m-c2.png`, `m-c3.png` — violet color (accent slides, special heroes).
- Three forms for each: symbol only, horizontal + wordmark, stacked (symbol above wordmark).

See [`preview/iconography.html`](./preview/iconography.html) for usage.

---

## Fonts — self-hosted

The three families are bundled as **variable TTFs** in
[`assets/fonts/`](./assets/fonts/):

| Family                    | File                                    | Axes          |
| ------------------------- | --------------------------------------- | ------------- |
| Clash Display             | `ClashDisplay-Variable.ttf`             | weight 200–700 |
| Satoshi                   | `Satoshi-Variable.ttf`                  | weight 300–900 |
| Satoshi Italic            | `Satoshi-VariableItalic.ttf`            | weight 300–900 |
| Playfair Display          | `PlayfairDisplay-Variable.ttf`          | weight 400–900 |
| Playfair Display Italic   | `PlayfairDisplay-Italic-Variable.ttf`   | weight 400–900 |

`@font-face` declarations live at the top of
[`colors_and_type.css`](./colors_and_type.css) — the CSS file is the
single include needed per page; nothing loads from CDN. Fallback stacks
(`Plus Jakarta Sans`, `Inter`, `Georgia`) remain in the CSS variables so
the kit degrades gracefully if the font files are ever missing.

---

## Related docs

- [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md) — canonical brand doc.
- [`SKILL.md`](./SKILL.md) — skill manifest for agent use.
- [`colors_and_type.css`](./colors_and_type.css) — tokens + semantic type.
- `ui_kits/landing_optin/` — live landing + thank-you prototype.
- `slides/` — webinar deck templates (16:9).
- `preview/*.html` — individual design-system cards.
