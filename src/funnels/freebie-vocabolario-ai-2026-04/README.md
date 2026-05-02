# Funnel: freebie-vocabolario-ai

Pagina pubblica freebie del funnel webinar Claude: **Vocabolario AI + Claude**.

Risorsa gratuita della Warm Up Week (Day 5) condivisa via post LinkedIn. Diversa
dagli altri freebie della stessa famiglia (cowork-setup-skill,
instagram-carousel-skills): **non c'è opt-in inline e non c'è thank-you**. La
pagina è 100% pubblica, indexable, ottimizzata per SEO organico ("vocabolario
AI", "termini Claude"). Tutti i CTA aprono un **modal popup** con il form
2-step del webinar (`OptinFormTwoStep` riusato da
`webinar-claude-2026-05/sections.tsx`).

## Slug e routing

- Slug pubblico: `/vocabolario-ai`
- Single step `page` (path vuoto)
- `indexable: true`, finisce in `sitemap.ts` automaticamente
- Meta SEO custom (title + description + canonical + OG + Twitter card) gestiti
  in `src/app/funnel-internal/[slug]/[[...step]]/page.tsx` con un branch
  dedicato sullo slug

## Stile

Riusa `WcThemeProvider` + `theme.module.css` del funnel webinar (palette
arancione + viola, font Clash Display + Satoshi). L'attivazione del tema è in
`src/app/funnel-internal/[slug]/layout.tsx` (slug aggiunto alla condizione).

## Componenti

- `WebinarHeader`: logo only (riusato dal webinar funnel)
- `VocabolarioPage`: sezione gigante che contiene tutto:
  - Hero con badge "Warm Up Week · Day 5"
  - Search bar real-time client-side (filtra term, body, keywords)
  - Sidebar TOC sticky (desktop ≥960px) con scroll-spy
  - 3 sezioni: Vocabolario AI · Vocabolario Claude (Prodotti + Operativi) · Cosa puoi farci
  - 2 inline CTA tra le sezioni
  - Final CTA hero
  - Sticky CTA mobile (auto-show dopo l'hero, auto-hide vicino al final CTA)
  - Modal popup con form 2-step
- `WebinarFooter`: disclaimer + © (riusato dal webinar funnel)

## Dati

In `data.ts`:
- `AI_TERMS`: 47 termini AI (ordine alfabetico)
- `CLAUDE_PRODUCTS`: 8 prodotti Claude
- `CLAUDE_OPS`: 19 termini operativi Claude
- `USE_CASE_GROUPS`: 7 categorie, 20 use case totali

Ogni termine ha `id` (slug per anchor), `term`, `body`, `keywords?`. La search
normalizza diacritici e fa AND su tutti i token della query, cercando in
term + body + keywords.

## Form modal: comportamento

Il modal racchiude `OptinFormTwoStep` con:
- `successRedirect="/webinar-claude/thank-you"` (stessa TY del webinar)
- `source="webinar-claude-vocabolario"` per marcatura sorgente nei dati Brevo
- Step 1: email. Step 2: nome + ruolo + privacy
- Submit POST `/api/funnels/webinar-claude/optin` (riusa endpoint webinar)
- ESC per chiudere, click overlay per chiudere, scroll body locked

## Tracking GA4

Eventi pushed su `window.dataLayer`:
- `vocabolario_view`: al mount della pagina
- `vocabolario_search`: su query (debounced 800ms, primi 60 char)
- `vocabolario_section_anchor`: click sul TOC sidebar
- `vocabolario_cta_webinar_click`: apertura modal (con `source`: hero,
  sidebar, inline-1, inline-2, final-cta, sticky)
- `webinar_optin_complete`: al submit del form (tramite `OptinFormTwoStep`)
- Meta Pixel `Lead`: al submit del form (tramite `OptinFormTwoStep`)

## Per aggiornare i contenuti

- **Aggiungere/rimuovere termini**: edita `data.ts` (AI_TERMS, CLAUDE_PRODUCTS,
  CLAUDE_OPS). Aggiorna `count` automaticamente in `NAV_ITEMS`.
- **Aggiungere/rimuovere use case**: edita `USE_CASE_GROUPS` in `data.ts`.
- **Modificare copy hero/CTA finale**: hardcoded in `sections.tsx`
  (`VocabolarioPageSection`).
- **Cambiare meta SEO**: edita il branch su `params.slug === "vocabolario-ai"`
  in `src/app/funnel-internal/[slug]/[[...step]]/page.tsx`.
