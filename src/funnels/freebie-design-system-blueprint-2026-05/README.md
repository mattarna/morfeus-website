# Funnel: freebie-design-system-blueprint

Funnel dedicato al freebie **AI Design System Blueprint** - una skill scaricabile
per Claude che guida l'utente nella creazione (o nell'organizzazione) di un
design system completo, leggibile sia da umani sia da qualsiasi AI per generare
asset on-brand in modo consistente.

## Struttura

- `config.json` - configurazione tecnica del funnel (step, componenti, contenuti).
- Stile visivo: riusa `WcThemeProvider` e `theme.module.css` del funnel webinar
  (font, palette, gradienti).
- Sections: riusa i componenti `FreebieHeroSection`, `FreebieWebinarTeaserSection`,
  `FreebieThankYouSection` definiti in
  [src/funnels/freebie-cowork-setup-skill-2026-04/sections.tsx](../freebie-cowork-setup-skill-2026-04/sections.tsx)
  (i componenti leggono tutto il contenuto da `step.content`, quindi non servono
  duplicazioni). Componenti riusati dal webinar: `WebinarHeader`, `WebinarFooter`.

## Note operative

- Slug pubblico: `/design-system-skill`
- Step 1: opt-in (`/design-system-skill`)
- Step 2: thank-you (`/design-system-skill/thank-you`)
- Endpoint opt-in: `POST /api/funnels/freebie-design-system-blueprint/optin`
- Variabili ambiente richieste:
  - `BREVO_API_KEY` (o `BREVO_API_KEY_V2`)
  - `BREVO_FREEBIE_DESIGN_SYSTEM_LIST_ID` - list 61 (Freebie_design_system_blueprint)
  - `BREVO_WEBINAR_LIST_ID` - list 54 (auto-enrollment al webinar 5 maggio)

## Comportamento Brevo

L'endpoint aggiunge il contatto **a entrambe le liste** (61 + 54): chi scarica
il freebie viene automaticamente iscritto anche al webinar del 5 maggio,
ricevendo:
- L'email automation della list 61 con il link al .zip
- L'email automation della list 54 con invito + reminder webinar

Il campo `FORM_NAME` su Brevo viene popolato con `Freebie_design_system_blueprint`
(matcha il nome della list 61 per coerenza).

## Risorse pubbliche

- Cover: `public/freebies/design-system-blueprint/cover.png`
- Skill .zip: `public/freebies/design-system-blueprint/skill.zip`
- Video tutorial: YouTube `2wU9OnWOcIQ` (embed: `https://www.youtube.com/embed/2wU9OnWOcIQ`)

## TODO pre go-live

1. Creare list **61** su Brevo con nome esatto `Freebie_design_system_blueprint`
   e collegarci l'automation che invia il link al .zip.
2. Aggiungere su Vercel l'env var `BREVO_FREEBIE_DESIGN_SYSTEM_LIST_ID=61`
   (production + preview).
