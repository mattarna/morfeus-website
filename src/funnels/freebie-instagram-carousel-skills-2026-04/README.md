# Funnel: freebie-instagram-carousel-skills

Funnel dedicato al freebie **Instagram Carousel Skills** — un set di 5 skill
per Claude Cowork che automatizzano la produzione di caroselli Instagram
(idea → outline → copy delle slide → brief visivo → caption/hashtag).

## Struttura

- `config.json` — configurazione tecnica del funnel (step, componenti, contenuti).
- Stile visivo: riusa `WcThemeProvider` e `theme.module.css` del funnel webinar.
- Components React: **riutilizzati** dal funnel
  [freebie-cowork-setup-skill-2026-04](../freebie-cowork-setup-skill-2026-04/sections.tsx)
  (`FreebieHeroSection`, `FreebieWebinarTeaserSection`, `FreebieThankYouSection`).
  Cambia solo il contenuto via `config.json`. Nessun codice React duplicato.

## Note operative

- Slug pubblico: `/instagram-carousel-skills`
- Step 1: opt-in (`/instagram-carousel-skills`)
- Step 2: thank-you (`/instagram-carousel-skills/thank-you`)
- Endpoint opt-in: `POST /api/funnels/freebie-instagram-carousel-skills/optin`
- Variabili ambiente richieste:
  - `BREVO_API_KEY` (o `BREVO_API_KEY_V2`)
  - `BREVO_FREEBIE_INSTAGRAM_CAROUSEL_LIST_ID` — list **57** (Freebie_instagram_carousel_skills)
  - `BREVO_WEBINAR_LIST_ID` — list 54 (auto-enrollment al webinar 5 maggio)

## Comportamento Brevo

L'endpoint aggiunge il contatto **a entrambe le liste** (57 + 54): chi scarica
il freebie viene automaticamente iscritto anche al webinar del 5 maggio,
ricevendo:
- L'email automation della list 57 con il link al `.zip`
- L'email automation della list 54 con invito + reminder webinar

Il campo `FORM_NAME` su Brevo viene popolato con `Freebie_instagram_carousel_skills`.

## Risorse pubbliche

- Cover: `public/freebies/instagram-carousel-skills/cover.png`
- Skill .zip: `public/freebies/instagram-carousel-skills/skills.zip`
- Video tutorial: **nessuno al go-live**. Per aggiungerlo basta inserire
  `videoTitle` e `videoEmbedUrl` nel blocco `FreebieThankYou` del `config.json`:
  la sezione video appare automaticamente (se i campi mancano, viene saltata).

## TODO pre-go-live

- [ ] Caricare `cover.png` (16:9) in `public/freebies/instagram-carousel-skills/`
- [ ] Caricare `skills.zip` in `public/freebies/instagram-carousel-skills/`
- [ ] Verifica che `morfeushub.com/instagram-carousel-skills` rende
- [ ] Verifica submit → redirect → download
- [ ] Verifica tracking GTM + Meta Pixel (PageView entrambe, Lead su optin,
  conversion su thank-you)

## TODO post-go-live (opzionale)

- [ ] Quando il video tutorial e' pronto, aggiungere `videoTitle` +
  `videoEmbedUrl` al blocco `FreebieThankYou` in `config.json`
