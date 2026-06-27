# Entity Data — Morfeus (source of truth)

> Dati che alimentano: JSON-LD Organization/Person (Fase 2), Course schema (Fase 3),
> DefinedTerm (Fase 5), profili off-site Wikidata/Crunchbase/GBP (Fase 6).
> ✅ = confermato · ⬜ = serve da Matteo · ✏️ = bozza mia da validare

## Naming (CRITICO per la disambiguazione — confermare)

- **Ragione sociale (legalName):** Numanity S.r.l. ✅
- **Brand pubblico (name):** Morfeus ✅ _(domain morfeushub.com, LinkedIn morfeus-hub-ai, YouTube @MorfeusHub — "Morfues" era un refuso)_
- **alternateName:** "Morfeus Hub", "Morf"
- **Linea prodotti:** "Morf" (es. Morf Lab, Morf Forge) — MAI "Morph"
- ✅ brand `name` = **"Morfeus"** (alternateName "Morfeus Hub") — confermato da Matteo 2026-06-26.

## Organization

- legalName: **Numanity S.r.l.** ✅
- Codice Fiscale / n. Registro Imprese: **14209210963** ✅ → `vatID` / `taxID`
- Forma giuridica: S.r.l. ✅
- **Indirizzo:** Via Jacopo Dal Verme 7, 20159 Milano (MI), Italia ✅ → `address` (PostalAddress)
- Dominio: https://morfeushub.com ✅
- Email ufficiale (unica): **hello@morfeushub.com** ✅
- foundingDate: **2023** ✅
- **sameAs** ✅:
  - https://www.linkedin.com/company/morfeus-hub-ai/
  - https://www.instagram.com/morfeushub.ai/
  - https://www.youtube.com/@MorfeusHub
- Logo: `/images/brand/morfeus-mark.png` (referenziato in StructuredData) — ⬜ confermare che esista/sia il logo giusto
- **disambiguatingDescription** (frase-entità canonica — lock 2026-06-26): _"Morfeus (Numanity S.r.l.) è la società italiana di consulenza e formazione AI che entra nelle aziende in scaling come Operating Partner: trova dove perdono margine e costruisce sistemi AI — agenti, automazioni e competenze interne — che lo recuperano, misurato in euro."_

## Founders (Person schema + pagina /chi-siamo) — ✅ dal repo (`src/app/lib/team-data.ts`)

| Nome             | Ruolo                                      | LinkedIn                                   | Foto                                     |
| ---------------- | ------------------------------------------ | ------------------------------------------ | ---------------------------------------- |
| Matteo Arnaboldi | CEO & Co-Founder                           | linkedin.com/in/matteo-arnaboldi/          | /images/team/Profile-matt.jpg            |
| Alex Carofiglio  | Co-founder (AI Architecture & Engineering) | linkedin.com/in/alex-carofiglio-aa4788186/ | /images/team/Profile-alex.webp           |
| Simone Zin       | Co-founder (Operations)                    | linkedin.com/in/simone-zin-9b745b210/      | /images/team/Profile-Simo.webp           |
| Matteo Alvazzi   | CTO & Partner                              | linkedin.com/in/matteo-alvazzi-delfrate/   | /images/team/Profile-matteo-alvazzi.webp |

Team (non-founder, opz. per /chi-siamo): Davide Bertolini — Marketing AI Expert.
Founder asset extra: Substack "AI Espresso" di Matteo A. (matteoarnaboldi.substack.com) → sameAs della Person, non dell'Organization.

## Courses (Course schema — Fase 3) — ✅ li estraggo io dai funnel

Fonti nel repo: `claude-unlocked` (sales-v3-config), `bootcamp-ai-champion-3a-edizione`, `formazione-finanziata-2026`.
→ Nessun lavoro tuo: pesco nome/ore/prezzo/formato/date dai config. Ti chiedo conferma solo se trovo buchi.

## Termini proprietari (DefinedTerm — Fase 5)

✏️ bozzo io dai vostri doc (icp.md/positioning/grafo) → tua validazione:
MARF · ROIometro · AI Champion Program · Salescraft
