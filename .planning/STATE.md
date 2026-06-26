---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: SEO/GEO Architecture
status: planning
last_updated: "2026-06-26"
last_activity: 2026-06-26
progress:
  total_phases: 6
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# STATE

**Last activity:** 2026-06-26 — Roadmap v1.1 creata (6 fasi, 27 requisiti mappati al 100%).

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-26)

**Core value:** Architettura tecnica/strutturale completa SEO + GEO/AEO — lo scheletro pronto in cui versare i contenuti.
**Current focus:** Phase 1 — Measure First (prossima da pianificare)

## Current Position

Phase: 0 of 6 (not started)
Plan: —
Status: Ready to plan Phase 1
Last activity: 2026-06-26 — Roadmap creata, requirements mappati

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**

- Total plans completed: 0
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
| ----- | ----- | ----- | -------- |
| -     | -     | -     | -        |

_Updated after each plan completion_

## Accumulated Context

### Decisions

- [Roadmap]: Phase numbering starts at 1 (milestone v1.1, no previous executed phases).
- [Roadmap]: Phase 4 (Content Hub) dipende da Phase 2 ma non da Phase 3 — può partire in parallelo con Phase 3 se necessario; dipendenza da Phase 3 è schema (non bloccante sul routing MDX).
- [Roadmap]: Phase 5 dipende da Phase 3 (DefinedTermSchema) e Phase 4 (hub live per llms-full.txt) — eseguire dopo entrambe.
- [Roadmap]: Phase 6 dipende solo da Phase 2 (Organization schema corretto) — teoricamente parallelizzabile con Phase 3/4/5, ma conviene eseguirla ultima (off-site amplifica solo segnali on-site già solidi).
- [Arch]: `src/app/[locale]/layout.tsx` NON ha skip-worktree (solo il root `src/app/layout.tsx`). Fix lang richiede rimozione skip-worktree solo dal root layout.
- [Arch]: `public/llms.txt` statico ha precedenza sul route handler Next.js — va eliminato quando si attiva il route handler (Phase 5).

### Pending Todos

None.

### Blockers/Concerns

- **lang fix (Phase 2):** Richiede `git update-index --no-skip-worktree src/app/layout.tsx` + merge consapevole con la versione locale (che ha chatbot). Fare merge esplicitamente, non sovrascrivere.
- **Wikidata (Phase 6):** Eleggibilità a notorietà non verificata — valutare prima di investire tempo nella creazione dell'item.

## Session Continuity

Last session: 2026-06-26
Stopped at: Roadmap creata, STATE e REQUIREMENTS traceability aggiornati
Resume file: None — `/gsd-plan-phase 1` per iniziare
