# PROJECT — Morfeus Website

**Stack:** Next.js 16 / React 19 / Tailwind CSS 4 (App Router), TypeScript, deploy su Vercel (push su `main` → deploy automatico).
**Dominio:** sito marketing + sistema funnel config-driven (landing, freebie, sales, bootcamp). Email via **Brevo**.

## Current Milestone: v1.1 SEO/GEO Architecture

**Goal:** Costruire l'intera architettura tecnica/strutturale per massimizzare SEO e visibilità negli LLM (GEO/AEO) — lo scheletro pronto in cui versare i contenuti dopo. La produzione di contenuti continuativa è fuori scope.

**Target features:**

- Layer entità/identità (JSON-LD arricchito, pagina Chi siamo IT+EN, Service schema, testi Wikidata/Crunchbase)
- Fondamenta AEO tecniche (schema components, llms.txt→mappa + llms-full.txt, sitemap pulita, fix lang/hreflang)
- Hub contenuti vuoto-ma-pronto (/risorse|/blog, template answer-first, RSS, internal linking, SSR leggero)
- Information architecture dai VoC (tassonomia domande buyer B2B-first + scaffold pagine termini proprietari)
- Mega-pagine → URL granulari (metodo, ROIometro, FAQ)
- Scaffolding di misura (GA4 referral-LLM, prompt-panel, Bing/GSC)

**Key context:** ICP B2B-first (aziende €5-100M in scaling; buyer CEO/COO/CFO). Il sito pubblico "Morf" resta com'è — solo correzione spelling (Morf non Morph) + arricchimento segnali entità, NIENTE riscrittura del modello d'offerta (in transizione). Mercato IT+EN. Strategia completa: `docs/seo-geo-master-plan.md`. Vincolo: `src/app/[locale]/layout.tsx` ha flag git skip-worktree (versione locale ≠ main).

## Architettura funnel (essenziale)

- Ogni funnel = cartella in `src/funnels/<nome>/` con `config.json` (step + `componentOrder` + `content`).
- Registrazione: `src/funnels/registry.ts` (slug, locale, `indexable`, runtime/metadataPreset).
- Render: `src/components/funnels/componentMap.tsx` mappa i nomi-componente alle sezioni React.
- Contratto: `src/funnels/component-contract.ts` (nomi validi) + `loader.ts` (validazione).
- Routing: URL pubblico `/<slug>` → riscritto a `/funnel-internal/<slug>` da `src/proxy.ts`.
- Optin → Brevo: `src/app/api/funnels/<freebie>/optin/route.ts` + mapping liste in `src/lib/brevo/lists.ts`.

## CI/CD

- `.github/workflows/quality-gates.yml` (attiva): `npm ci` → `check:public-assets` → `lint` → `typecheck` → `test` → `build`.
- Comandi: `npm run build | typecheck | test | lint | check:public-assets`.

## Doc esistenti

- `.cursor/rules/*.mdc` (per Cursor), `docs/brevo.md`, `docs/site-tree.md`, `src/funnels/README.md`.
- `CLAUDE.md` — orientamento per Claude Code (presente).
- `docs/seo-geo-master-plan.md` — strategia SEO/GEO (milestone v1.1).

## Regole dure (lezioni 2026-06-05)

- Committa SEMPRE i file sorgente untracked importati da codice tracciato (caso "footer bomb").
- Tieni `package-lock.json` in sync (`npm ci` è strict).
- **Niente garanzia "14 giorni"** nelle copy: non esiste.
- Gira la sequenza CI in locale prima del push.

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):

1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):

1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---

_Last updated: 2026-06-26 — Milestone v1.1 SEO/GEO Architecture started_
