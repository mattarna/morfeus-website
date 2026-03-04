# Skill Map — Registro Skill Marketing

Questo file è il registro ufficiale di tutte le skill marketing del progetto.

**Regola operativa**: ogni volta che una skill viene creata o pubblicata, aggiungere o aggiornare la riga corrispondente in questo documento.

---

## Registro skill

| Codice | Nome Cursor | Cartella definitiva | File draft | Stato |
|--------|-------------|---------------------|------------|-------|
| A1 | `icp-positioning` | `.cursor/skills/icp-positioning/` | `skill-a1--icp--positioning.md` | draft |
| A2 | `offer-design-pricing` | `.cursor/skills/offer-design-pricing/` | `skill-a2--offer-design--pricing.md` | draft |
| A3 | `competitive-intelligence` | `.cursor/skills/competitive-intelligence/` | `skill-a3--competitive-intelligence.md` | draft |
| A4 | `launch-execution` | `.cursor/skills/launch-execution/` | `skill-a4--launch-strategy--sequencing.md` | draft |
| A4e | `launch-strategy` | `.cursor/skills/launch-strategy/` | `skill-a4--execution.md` | draft |
| A4a | `webinar-launch` | `.cursor/skills/webinar-launch/` | `skill-a4a--webinar-launch.md` | draft |
| B1 | `vsl-script` | `.cursor/skills/vsl-script/` | `skill-b1--vsl-script.md` | draft |
| B2 | `sales-page-longform` | `.cursor/skills/sales-page-longform/` | `skill-b2--sales-page-longform.md` | draft |
| B5 | `optin-page-playbook` | `.cursor/skills/optin-page-playbook/` | `skill-b5--optin-lead-magnet.md` | draft |

---

## Come leggere il registro

- **Codice**: identificativo interno (A = strategica, B = copy/esecutiva, numero = ordine logico).
- **Nome Cursor**: nome definitivo usato nel campo `name` del frontmatter `SKILL.md` e come nome cartella in `.cursor/skills/`.
- **Cartella definitiva**: dove va il file quando passa da draft a published.
- **File draft**: posizione in `_skill-drafts/` durante la fase di revisione.
- **Stato**: `draft` = in revisione | `published` = attiva in `.cursor/skills/`.

---

## Come aggiungere una nuova skill

1. Crea il file nella cartella `_skill-drafts/` con naming `skill-<codice>--<descrizione>.md`.
2. Aggiungi una riga in questo registro con stato `draft`.
3. Dopo revisione e approvazione, sposta in `.cursor/skills/<nome-cursor>/SKILL.md`.
4. Aggiorna lo stato in questo registro da `draft` a `published`.

---

## Come usare i riferimenti interni nelle skill

Nei file draft i riferimenti ad altre skill usano il codice interno (es. `A1`, `B2`).
Nella versione pubblicata (`.cursor/skills/`), sostituire ogni codice con il nome Cursor corrispondente da questa tabella.

Esempio:
- Draft: `"usa i dati di A1 per l'ICP"`
- Published: `"usa i dati della skill icp-positioning"`
