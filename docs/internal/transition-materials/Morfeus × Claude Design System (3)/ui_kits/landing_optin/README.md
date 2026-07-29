# Landing Opt-in Kit — Morfeus × Claude

A click-through prototype of the **Webinar Claude** landing page and
its thank-you screen. One file per concern.

## Screens

1. **Landing** — hero, badge, hero form, 3 modules, authority list, final CTA, footer.
2. **Thank you** — confirmation, email echo, next-step (calendar), back link.

## Components

| File | Exports |
|---|---|
| `Primitives.jsx` | `Logo`, `Header`, `Footer`, `Badge`, `SectionLabel`, `Button`, `Input`, `Card`, `CheckItem` |
| `Sections.jsx`   | `Hero`, `OptinForm`, `AuthoritySection`, `ModulesSection`, `FinalCTA`, `ThankYou` |
| `index.html`     | Composes everything + screen routing |

## Visual rules being exercised

- **85 / 10 / 4 / 1** dominance — dark dominates, one orange CTA block at a time.
- **Playfair italic accent** on 1–3 keywords per H1/H2 (`al massimo`, `reali`, `concreto`, `partire`, `vediamo`).
- **Card hover** — dormant → orange border + 4 px lift.
- **Button states** — primary orange with glow, lifts on hover, darkens on press.
- **Form card** — 1 px gradient border via CSS mask, backdrop-blur.
- **Section labels** — uppercase violet with a hairline prefix.
- **Badge with pulsing dot** — the only "always-on" animation.

## Not (yet) covered

- Sales page (long-form). Would reuse these components with extra section rhythm.
- Email template (inverted, light bg). Easy to add — just swap foundation tokens.
- Logged-in states / member area — not in scope for this launch.
