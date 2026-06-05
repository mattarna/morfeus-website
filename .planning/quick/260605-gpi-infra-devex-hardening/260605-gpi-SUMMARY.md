---
quick_id: 260605-gpi
title: Infra & DevEx Hardening — Phase 1 (Tier 1)
status: complete
date: 2026-06-05
---

# SUMMARY — Phase 1 (Tier 1)

## Fatto (5 task, commit atomici)

| Task                                          | Commit  | Esito                                          |
| --------------------------------------------- | ------- | ---------------------------------------------- |
| T1 CLAUDE.md + AGENTS.md                      | 8846c9a | orientamento agenti AI                         |
| T2 .gitattributes (eol=lf)                    | 0dbbca0 | stop rumore CRLF/LF                            |
| T3 check:public-assets strict in CI           | efa0e24 | asset oversize → CI rossa                      |
| T4 .env.example + check-env + optin fail-loud | daed3cc | env documentate; optin 500 su list ID mancante |
| T5 husky pre-push + check untracked-imports   | 15c72e7 | footer-bomb bloccata pre-push                  |

Decisioni utente: T4 = `.env.example` + script (no zod). T5 = pre-push veloce (no build, build resta in CI).

## Scoperta importante (durante T5)

Il check `untracked-imports` ha fatto emergere che `src/app/[locale]/layout.tsx` (working copy) importa `ChatbotWidget`, file della feature chatbot esclusa da git. **Falso allarme**: il file ha il flag git **skip-worktree** — la versione su `main` è pulita (niente import chatbot), quindi Vercel NON era rotto e il sito è live. Le parentesi `[locale]` nei pathspec git (glob) avevano dato falsi negativi a status/diff, confondendo la diagnosi. Tutto ripristinato; il file e il flag skip-worktree intatti.

**Fix nello script:** reso skip-worktree-aware (ignora i file con flag `S`, le cui modifiche locali non vengono pushate) + spoglia i commenti. Ora non dà falsi positivi e non bloccherà i push legittimi.

## Verifica

- `npm ci` in sync (mancava `yaml@2.9.0` dopo l'install husky → riconciliato).
- Sequenza CI in locale verde: untracked-imports, lint, typecheck, test, build.
- Pre-commit hook testato (no-op su commit senza file md/css).

## Backlog (Tier 2/3 in ROADMAP.md)

Validazione config funnel in CI, generatore freebie, pipeline immagini, error monitoring, registry single-source, Lighthouse CI, code-splitting, consolidamento doc.
