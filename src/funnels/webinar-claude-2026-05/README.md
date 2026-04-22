# Funnel: webinar-claude

Funnel dedicato al webinar gratuito su Claude (5 maggio 2026, ore 18:00).

## Struttura

- `context/` - strategia, posizionamento, vincoli e guardrail copy.
- `copy/` - copy operativi per opt-in e thank-you.
- `config.json` - configurazione tecnica del funnel (step, componenti, contenuti).

## Note operative

- Slug pubblico: `/webinar-claude`
- Step 1: opt-in (`/webinar-claude`)
- Step 2: thank-you (`/webinar-claude/thank-you`)
- Endpoint opt-in: `POST /api/funnels/webinar-claude/optin`
- Variabili ambiente richieste:
  - `BREVO_API_KEY` (o `BREVO_API_KEY_V2`)
  - `BREVO_WEBINAR_LIST_ID` (opzionale ma consigliata per segmentazione)
