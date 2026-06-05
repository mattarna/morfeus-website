---
quick_id: 260605-gpi
title: Infra & DevEx Hardening — Phase 1 (Tier 1)
status: ready
worktrees: false # path con spazi → esecuzione sequenziale su main
must_haves:
  truths:
    - Un agente AI fresco si orienta nel repo senza esplorare (CLAUDE.md)
    - I bug "footer bomb" (sorgente untracked importato) sono bloccati prima del push
    - Asset oversize/vietati falliscono la CI invece di passare con warning
    - Le env richieste (Brevo/Meta) sono documentate e verificabili
    - Niente più diff fantasma da fine-riga CRLF/LF
  artifacts:
    - CLAUDE.md
    - AGENTS.md
    - .gitattributes
    - .env.example
    - scripts/check-env.mjs
    - scripts/check-untracked-imports.mjs
    - .husky/pre-commit, .husky/pre-push
  key_links:
    - .github/workflows/quality-gates.yml
    - src/lib/brevo/lists.ts
    - scripts/check-public-assets.mjs
---

# Phase 1 — Infra & DevEx Hardening (Tier 1)

Ogni task = 1 commit atomico. Dopo i task che toccano dipendenze (T5), gira l'intera sequenza CI in locale prima del push. Esecuzione su `main`, worktree OFF.

## T1 — CLAUDE.md + AGENTS.md (orientamento agenti)

- **files:** `CLAUDE.md` (new), `AGENTS.md` (new)
- **action:** `CLAUDE.md` root con: overview stack, comandi (build/typecheck/test/lint/check:public-assets + "CI deve passare"), architettura funnel (config.json→registry→componentMap→sezioni; routing /<slug> via middleware; reserved slugs; pattern liste Brevo in `src/lib/brevo/lists.ts`), runbook "come aggiungere un freebie", rimandi ai doc esistenti (`.cursor/rules`, `docs/brevo.md`, `src/funnels/README.md`), e le **regole dure** (commit untracked imported source, lockfile in sync, no garanzia "14 giorni", gira CI in locale pre-push). `AGENTS.md` = puntatore sottile a CLAUDE.md.
- **verify:** entrambi esistono; i path citati in CLAUDE.md esistono davvero (`registry.ts`, `componentMap.tsx`, `middleware.ts`, `lists.ts`).
- **done:** un agente legge CLAUDE.md e sa muoversi senza esplorazione.
- **rischio:** nullo (solo doc).

## T2 — .gitattributes (normalizzazione fine-riga)

- **files:** `.gitattributes` (new)
- **action:** `* text=auto eol=lf` + regole binarie per immagini/font (`*.png/jpg/ico/woff2/ttf binary`) per non corrompere i binari. **NO** mass-renormalize ora (eviterebbe un commit enorme e rumoroso) — gli attributi agiscono sui file man mano che vengono toccati.
- **verify:** `git check-attr text -- src/app/layout.tsx` → `text: auto`; build ancora verde.
- **done:** niente più warning "LF→CRLF" sui prossimi edit.
- **rischio:** basso.

## T3 — check:public-assets STRICT in CI

- **files:** `.github/workflows/quality-gates.yml` (edit)
- **action:** cambiare lo step `npm run check:public-assets` → `npm run check:public-assets:strict` (fallisce su asset oversize/cartelle vietate).
- **nota:** le 2 cartelle "blocked" locali sono untracked → assenti sul clone CI → CI passa. Nessun asset oversize tracciato resta (già compressi). **Il pre-push NON userà strict** (le cartelle local-only darebbero falsi rossi): strict è una verifica da clone pulito = CI.
- **verify:** la CI vede solo asset tracciati; nessun oversize → step verde. (Localmente strict fallisce per le cartelle untracked: atteso, non blocca.)
- **done:** un futuro asset >8MB committato fa fallire la CI.
- **rischio:** basso (verificato che non ci sono asset oversize tracciati).

## T4 — .env.example + verifica env ⚠️ DECISIONE

- **files:** `.env.example` (new), `scripts/check-env.mjs` (new)
- **action:** `.env.example` documenta tutte le env richieste (da `src/lib/brevo/lists.ts`: `BREVO_API_KEY_V2`/`BREVO_API_KEY`, tutte le `BREVO_*_LIST_ID`, `NEXT_PUBLIC_META_PIXEL_ID`). `scripts/check-env.mjs`: script Node che legge `process.env` e segnala le mancanti (`--strict` per fallire), stile `check-public-assets`.
- **DECISIONE da confermare:** l'idea originale era "validazione **zod** all'avvio". Rischio: un validatore zod che fa `throw` all'import può **rompere la build Vercel** (il build non ha sempre le secret runtime). Opzioni:
  - **(A) Consigliata:** `.env.example` + `scripts/check-env.mjs` (zero dipendenze, zero rischio build) + rendere l'optin route fail-loud se manca il `LIST_ID` (oggi sottoscrive in silenzio senza lista).
  - (B) Aggiungere `zod` + `src/lib/env.ts` con validazione **lazy/non-fatale** (parse on-demand, non throw all'import) usato dallo script.
- **verify:** `node scripts/check-env.mjs` elenca le env mancanti senza crashare; build verde.
- **done:** dimenticare una env Brevo è visibile subito, non un fallimento silenzioso.
- **rischio:** A = nullo; B = basso (se lazy).

## T5 — Pre-push hook (husky) + check untracked-import

- **files:** `package.json` + `package-lock.json` (add devDep husky, lint-staged), `.husky/pre-commit` (new), `.husky/pre-push` (new), `scripts/check-untracked-imports.mjs` (new)
- **action:**
  - `npm i -D husky lint-staged` → mantenere lockfile in sync.
  - `scripts/check-untracked-imports.mjs`: scansiona `src/` per import relativi, risolve al file, e **fallisce se un file sorgente importato è untracked** (`git ls-files`). → blocca la "footer bomb".
  - `.husky/pre-push`: `node scripts/check-untracked-imports.mjs && npm run typecheck && npm run lint`. (Build resta in CI: il typecheck + untracked-check coprono già i build-break da import; il pre-push resta veloce.)
  - `.husky/pre-commit`: `lint-staged` (prettier/eslint sui file staged).
- **DECISIONE minore:** includere anche `npm run build` nel pre-push (più sicuro, +~30s a ogni push) o lasciarlo solo in CI (default consigliato).
- **verify:** dopo l'install, `npm ci` resta valido; `node scripts/check-untracked-imports.mjs` esce 0 sul repo pulito; un push di prova con un import untracked viene bloccato.
- **done:** la classe "footer bomb" è impossibile da pushare.
- **rischio:** medio (aggiunge dipendenze → lockfile sync obbligatorio + CI da rifare verde).

## Ordine di esecuzione (commit atomici)

1. T1 → commit 2. T2 → commit 3. T3 → commit 4. T4 → commit 5. T5 → commit
   Poi: sequenza CI completa in locale (`npm ci` + check + lint + typecheck + test + build) → push.
