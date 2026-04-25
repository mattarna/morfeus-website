# Funnel: freebie-cowork-setup-skill

Funnel dedicato al freebie **Cowork Setup Creator** — una skill scaricabile per
Claude Cowork che fa il setup completo del workspace dell'utente.

## Struttura

- `config.json` — configurazione tecnica del funnel (step, componenti, contenuti).
- Stile visivo: riusa `WcThemeProvider` e `theme.module.css` del funnel webinar (font, palette, gradienti).
- Sections: `FreebieHero`, `FreebieWebinarTeaser`, `FreebieThankYou` definite in [src/funnels/freebie-cowork-setup-skill-2026-04/sections.tsx](./sections.tsx).
  Componenti riusati dal webinar: `WebinarHeader`, `WebinarFooter`.

## Note operative

- Slug pubblico: `/claude-skill-anatomy`
- Step 1: opt-in (`/claude-skill-anatomy`)
- Step 2: thank-you (`/claude-skill-anatomy/thank-you`)
- Endpoint opt-in: `POST /api/funnels/freebie-cowork-setup-skill/optin`
- Variabili ambiente richieste:
  - `BREVO_API_KEY` (o `BREVO_API_KEY_V2`)
  - `BREVO_FREEBIE_SKILL_LIST_ID` — list 56 (Freebie_cowork_setup_skill)
  - `BREVO_WEBINAR_LIST_ID` — list 54 (auto-enrollment al webinar 5 maggio)

## Comportamento Brevo

L'endpoint aggiunge il contatto **a entrambe le liste** (56 + 54): chi scarica
il freebie viene automaticamente iscritto anche al webinar del 5 maggio,
ricevendo:
- L'email automation della list 56 con il link al .zip
- L'email automation della list 54 con invito + reminder webinar

Il campo `FORM_NAME` su Brevo viene popolato con `Freebie_cowork_setup_skill`
(matcha il nome della list 56 per coerenza).

## Risorse pubbliche

- Cover: `public/freebies/cowork-setup-creator/cover.png`
- Skill .zip: `public/freebies/cowork-setup-creator/skill.zip`
- Video tutorial: YouTube `8hLlWYbnywo` (embed: `https://www.youtube.com/embed/8hLlWYbnywo`)

## Per replicare per un freebie futuro

1. Duplica questa cartella con nuovo slug (es. `freebie-XYZ-2026-MM`)
2. Aggiorna `config.json`: `id`, `slug`, copy, `formName`, `successRedirect`, `downloadHref`, `videoEmbedUrl`
3. Crea nuova lista su Brevo + nuova env var (es. `BREVO_FREEBIE_XYZ_LIST_ID`)
4. Duplica l'endpoint `/api/funnels/freebie-cowork-setup-skill/optin` cambiando solo la chiave list e il default FORM_NAME
5. Registra il nuovo slug in [src/funnels/registry.ts](../registry.ts)
6. Aggiungi lo slug alla condizione tema in [src/app/funnel-internal/[slug]/layout.tsx](../../app/funnel-internal/[slug]/layout.tsx)
