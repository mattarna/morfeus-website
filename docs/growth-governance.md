# Growth Governance

This document defines the operating rules for adding pages, funnels, and assets without degrading project quality.

## 1) New Funnel Gate

- Register the slug in `src/funnels/registry.ts` with explicit runtime settings (`fontPack`, `theme`, metadata preset, chatbot steps).
- Confirm no slug collision with `src/lib/reserved-slugs.ts`.
- Validate config through loader path (`loadFunnelConfig`) before merge.
- Add/adjust tests when introducing new component names or metadata behavior.

## 2) New Site Page Gate

- Implement `generateMetadata` with canonical + alternates (`buildLocaleAlternates`) for IT/EN parity.
- Keep copy in locale message files and avoid hardcoded page copy in TSX.
- Verify route appears correctly in sitemap policy (`src/lib/seo/public-indexing.ts` when applicable).

## 3) Public Assets Gate

- Follow `docs/public-asset-policy.md`.
- Run `npm run check:public-assets` before opening PR.
- Large files and transition packs must be stored outside `public/` unless explicitly justified.

## 4) Mandatory Checks Before Merge

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## 5) Weekly Health Review

- Run `npm run report:health` and track:
  - Funnel files above 1000 lines.
  - `eslint-disable` count inside `src/funnels`.
  - Presence of blocked public directories.
- Create a small debt ticket for each high-risk delta.
