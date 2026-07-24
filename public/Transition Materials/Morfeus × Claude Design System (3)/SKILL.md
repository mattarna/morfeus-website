---
name: morfeus-claude-design
description: Use this skill to generate well-branded interfaces and assets for Morfeus × Claude (the Webinar Claude launch by Morfeus), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill first, and explore the other available files. `BRAND_GUIDELINES.md` is the canonical source of truth; `colors_and_type.css` is a drop-in stylesheet of tokens + semantic type.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out of `assets/` and create static HTML files for the user to view — use the components in `ui_kits/landing_optin/` and `slides/` as reference implementations. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few questions (surface, audience, tone, length), and act as an expert designer who outputs HTML artifacts _or_ production code depending on the need.

Key constraints to remember:
- Dark foundation always. 85 / 10 / 4 / 1 dominance (foundation / text / orange / violet).
- Orange is for action only; violet is for structure only.
- Playfair Display Italic on 1–3 keywords per headline, always colored.
- Body text never below 16 px desktop / 15 px mobile, always `ghost` at opacity 0.85–0.88.
- Italian copy first. Sentence case. No hype, no exclamation stacks, no emoji in layout.
