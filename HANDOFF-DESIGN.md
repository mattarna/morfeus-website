# HANDOFF — Design premium per le pagine crawlabili (non-home)

**Per:** un nuovo AI coding agent che lavora in questa repo (sito Morfeus, Next.js 14 App Router, TS, Tailwind).
**Da:** la sessione SEO/GEO (Claude Code) — 2026-06-26.
**La tua missione:** rendere le **pagine pubbliche non-home** un sito **da 1 milione di euro** a livello di design, **restando facilmente crawlabili da LLM e motori**. Parti da `/chi-siamo`, e costruisci un **design system riusabile** che le future pagine contenuto erediteranno.

---

## ⛓️ Confine di responsabilità (importante: non mischiare)

- **TU possiedi il LAYER VISIVO/UX** delle pagine contenuto non-home.
- Una **sessione parallela possiede la STRUTTURA SEO/GEO** (libreria schema `schema-dts`, `llms.txt`/`llms-full.txt`, `sitemap.ts`, pipeline contenuti MDX, tassonomia IA, registry/funnel). **NON toccare quella roba.**
- Se una pagina ha già contenuto + JSON-LD corretti (es. `/chi-siamo`), tu **cambi solo il design**, **preservando contenuto e schema**.

## 🎯 Principio guida (non negoziabile)

- **La HOME resta com'è** (`src/app/[locale]/page.tsx` — design attuale OK, scroll-hijack incluso). **Non toccarla.**
- **Tutte le altre pagine pubbliche** (ora `/chi-siamo`; in arrivo: hub `/blog`, pagine dei termini proprietari, shadow page FAQ/metodo) devono essere:
  1. **Facilmente crawlabili** — **Server Component (SSR)**, contenuto reale nell'HTML iniziale, markup semantico, **JSON-LD intatto**, **NESSUNO scroll-hijack**, nessun gating del contenuto lato client, veloci.
  2. **Design da 1M €** — non "una pagina di informazioni": un design **stupendo, on-brand, 2026**. Premium **non** vuol dire scroll-hijack: si può essere bellissimi _e_ crawlabili (tipografia, spazi, motivi grafici, micro-animazioni on-scroll che **non nascondono** il contenuto, componenti raffinati).

## 🚀 Primo task: ridisegnare `/chi-siamo`

- **File:** `src/app/[locale]/chi-siamo/page.tsx` (Server Component, IT+EN, indicizzabile).
- **Stato attuale:** contenuto + JSON-LD `AboutPage`/`Person` **corretti — PRESERVALI**. Il design è un MVP spoglio → **portalo a livello premium**, mantenendo **stesse sezioni, stesso contenuto, stesso schema, IT/EN**.
- **Sezioni approvate (non cambiare la struttura):** Hero (risposta in cima) · Cosa facciamo (2 facce) · Cosa NON siamo (disambiguazione) · Founder (4 card) · Come lavoriamo · Formazione/Community/Divulgazione · Fatti/Numeri · CTA.

## 🎨 Riferimenti brand & design (usali)

- **Token Tailwind** (`tailwind.config.ts`): `night #0B0B0C`, `ghost-white #E4E7F0`, `majorelle #533DFC`, `neon #6475FA`, `vista #8CA5F7`, `persian #392CB8`, `midnight #201F6E`, `forge #E8650A`. Font: `font-outfit` (titoli), `font-dm-sans` (testo), `font-prodigy`.
- **Il sito live come asticella estetica:** studia `src/app/[locale]/page.tsx` e `src/app/[locale]/forge/page.tsx` + i loro componenti (`src/components/sections/`, `src/components/fixed/`) per il linguaggio visivo (gradienti, il "mark" Morfeus, grid lines, stile bottoni).
- **Materiali design system:** `public/Transition Materials/Morfeus × Claude Design System (3)/`.
- **Regole visual identity:** `.cursor/rules/*.mdc`.
- **Skill disponibile:** `morfeus-brand` (applica palette/typography ufficiali) — usala se aiuta.

## 🔒 Vincoli duri

- **Crawlabilità:** Server Component; niente `"use client"` sull'intera pagina (solo isole client per interazioni isolate); contenuto nell'HTML; JSON-LD preservato; **no scroll-hijack**.
- **Bilingue IT+EN:** la copy è nell'oggetto `COPY` della pagina. Mantieni entrambe.
- **Naming:** brand **Morfeus**, prodotti **Morf** (Morf Lab/Forge) — **MAI "Morph"**. Legale: **Numanity S.r.l.** Dati entità: `docs/geo/entity-data.md` (founder, indirizzo, sameAs, frase-entità canonica).
- **Non toccare:** la home, i funnel, `src/app/[locale]/layout.tsx` (ha flag git **skip-worktree**!), e la struttura SEO (`sitemap.ts`, `llms*`, `schema-dts`, MDX, `registry.ts`).
- **Design SYSTEM, non one-off:** estrai i pattern premium in **componenti riusabili** (es. `src/components/site/`) così l'hub e le pagine-termine futuri ereditano il look.
- **CI verde obbligatoria** prima di "fatto": `npm run lint && npm run typecheck && npm run test && npm run build`. Niente claim falsi nelle copy (vedi `CLAUDE.md`).
- **Git:** lavora su un branch dedicato partendo da `feat/seo-geo-architecture` → `git checkout -b feat/premium-design`. Commit atomici. **NON fare push** (push su main = deploy). Il merge lo coordina Matteo.

## 🧭 Workflow consigliato (direzione-prima, poi build)

Il design è soggettivo e deve colpire un'asticella "$1M" — **non costruire alla cieca**:

1. **Proponi prima una DIREZIONE visiva**: 1-2 mockup rapidi (o una spec stretta — trattamento hero, scala tipografica, uso colore, sistema di motivi, stile componenti) per `/chi-siamo`. **Fatti dare l'OK da Matteo.**
2. **Poi costruisci** il redesign + estrai i componenti riusabili.
3. **Mostra a Matteo live** (dev server: `npm run dev` → `/it/chi-siamo` e `/en/chi-siamo`) per il via libera.

## ✅ Verifica finale

Dev server attivo: apri `/it/chi-siamo` + `/en/chi-siamo` e conferma: look premium · contenuto presente nell'HTML (view-source) · JSON-LD intatto · zero errori console · responsive + dark.

## 📚 Leggi prima di iniziare

`CLAUDE.md` · `docs/seo-geo-master-plan.md` · `docs/geo/entity-data.md` · `src/app/[locale]/chi-siamo/page.tsx` · `tailwind.config.ts` · una pagina premium esistente (`forge`).

---

_Contesto completo del progetto SEO/GEO: `.planning/` (milestone v1.1) e `docs/geo/`. Ma il tuo scope è SOLO il design delle pagine non-home, partendo da /chi-siamo._
