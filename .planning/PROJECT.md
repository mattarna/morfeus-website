# PROJECT — Morfeus Website

**Stack:** Next.js 14 (App Router), TypeScript, deploy su Vercel (push su `main` → deploy automatico).
**Dominio:** sito marketing + sistema funnel config-driven (landing, freebie, sales, bootcamp). Email via **Brevo**.

## Architettura funnel (essenziale)

- Ogni funnel = cartella in `src/funnels/<nome>/` con `config.json` (step + `componentOrder` + `content`).
- Registrazione: `src/funnels/registry.ts` (slug, locale, `indexable`, runtime/metadataPreset).
- Render: `src/components/funnels/componentMap.tsx` mappa i nomi-componente alle sezioni React.
- Contratto: `src/funnels/component-contract.ts` (nomi validi) + `loader.ts` (validazione).
- Routing: URL pubblico `/<slug>` → riscritto a `/funnel-internal/<slug>` da `src/middleware.ts`.
- Optin → Brevo: `src/app/api/funnels/<freebie>/optin/route.ts` + mapping liste in `src/lib/brevo/lists.ts`.

## CI/CD

- `.github/workflows/quality-gates.yml` (attiva): `npm ci` → `check:public-assets` → `lint` → `typecheck` → `test` → `build`.
- Comandi: `npm run build | typecheck | test | lint | check:public-assets`.

## Doc esistenti

- `.cursor/rules/*.mdc` (per Cursor), `docs/brevo.md`, `docs/site-tree.md`, `src/funnels/README.md`.
- **Manca** `CLAUDE.md` (orientamento per Claude Code) — coperto dal Tier 1.

## Regole dure (lezioni 2026-06-05)

- Committa SEMPRE i file sorgente untracked importati da codice tracciato (caso "footer bomb").
- Tieni `package-lock.json` in sync (`npm ci` è strict).
- **Niente garanzia "14 giorni"** nelle copy: non esiste.
- Gira la sequenza CI in locale prima del push.
