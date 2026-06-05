# ROADMAP — Infra & DevEx Hardening

Obiettivo: ambiente di sviluppo AI-assisted più performante e a prova di errore.
Origine: sessione di debug/cleanup del 2026-06-05 (build rotta da file untracked, lockfile drift, drift su file core, asset oversize).

## Phase 1 — Fondamenta (Tier 1) ← ATTIVA

Alto ROI, basso rischio. Chiude alla radice la classe di bug emersa oggi.

1. `CLAUDE.md` (+ `AGENTS.md`) — orientamento agenti AI
2. `.gitattributes` (`* text=auto eol=lf`) — stop al rumore CRLF/LF
3. `check:public-assets` STRICT in CI (ora solo warning)
4. `.env.example` + validazione env (zod) all'avvio — variabili Brevo/Meta
5. Pre-push hook (husky + lint-staged) + check "sorgente untracked importato"

→ Piano: `.planning/quick/260605-gpi-infra-devex-hardening/260605-gpi-PLAN.md`

## Phase 2 — Qualità & performance (Tier 2) — backlog

6. Validazione config funnel in CI (schema + componentOrder + asset esistenti)
7. Generatore scaffold nuovo freebie (`scripts/new-freebie.mjs`)
8. Pipeline ottimizzazione immagini automatica + push verso `next/image`
9. Error monitoring (Sentry o Vercel Monitoring)
10. Generatore registry/sitemap come single source of truth

## Phase 3 — Avanzato & debito (Tier 3) — backlog

11. Lighthouse CI / budget performance
12. Code-splitting mega-file (`sections.tsx` ~8000 righe) — debito noto
13. Consolidamento doc (`.cursor/rules` + README + `docs/`) con indice unico
