# STATE

**Last activity:** 2026-06-05 — Completato quick 260605-gpi (infra devex hardening Tier 1, T1-T5).

## Current

- Repo sano: build verde, CI `quality-gates` attiva, lockfile in sync, ~130MB bloat rimossi, immagini ottimizzate.
- Tier 1 infra completo: CLAUDE.md, .gitattributes, CI strict, .env.example+check-env, husky pre-push (anti footer-bomb).
- Nota: `src/app/[locale]/layout.tsx` ha flag git **skip-worktree** (versione locale con chatbot, NON su main — by design).

## Active work

- Nessuna. Tier 2/3 in backlog (ROADMAP.md).

### Blockers/Concerns

- Nessuno.

### Quick Tasks Completed

| #          | Description                              | Date       | Commit  | Directory                                                                     |
| ---------- | ---------------------------------------- | ---------- | ------- | ----------------------------------------------------------------------------- |
| 260605-gpi | Infra & DevEx Hardening — Tier 1 (T1-T5) | 2026-06-05 | 15c72e7 | [260605-gpi-infra-devex-hardening](./quick/260605-gpi-infra-devex-hardening/) |
