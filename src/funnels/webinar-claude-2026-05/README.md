# Funnel: webinar-claude + claude-unlocked-v1

Cartella unica con i componenti React condivisi per **due funnel registrati**:
- `webinar-claude` — opt-in + thank-you del webinar gratuito (5 maggio 2026, ore 18:00)
- `claude-unlocked-v1` — sales page del Corso Claude (top-level slug, single step)

Le sezioni `Sales*` in `sections.tsx` sono usate solo dal funnel `claude-unlocked-v1`. Le sezioni `Webinar*` sono usate solo dal funnel `webinar-claude`. Il design system (`WcThemeProvider`, `theme.module.css`, primitive `Accent`/`Badge`/`SectionLabel`/`PrimaryButton`) è condiviso fra entrambi.

## Struttura

- `context/` — strategia, posizionamento, vincoli e guardrail copy.
- `copy/` — copy operativi (opt-in, thank-you, sales page master).
  - `SALES_PAGE_CORSO_COMPLETA_V1.md` — documento master della sales page (14 blocchi, 3 varianti).
- `config.json` — configurazione del funnel **`webinar-claude`** (opt-in + thank-you).
- `sales-config.json` — configurazione del funnel **`claude-unlocked-v1`** (sales page, single step).
- `sections.tsx` — tutti i componenti React (`Webinar*` + `Sales*`).
- `sections.module.css` — utility responsive condivise.
- `theme.module.css` + `WcThemeProvider.tsx` — design system condiviso.

## Step e URL

| Funnel | Step | URL pubblico | Tipo | isConversion |
|---|---|---|---|---|
| `webinar-claude` | `optin` | `/webinar-claude` | Lead capture (form Brevo) | false |
| `webinar-claude` | `thank-you` | `/webinar-claude/thank-you` | Conferma post-iscrizione | true |
| `claude-unlocked-v1` | `sales` | `/claude-unlocked-v1` | Sales page Corso Claude | true |

## Sales page — varianti dinamiche

La sales page (`/claude-unlocked-v1`) personalizza copy e CTA in base alla provenienza del visitatore via query string `?src=`:

| Variante | URL                                | Audience                                   |
|----------|------------------------------------|--------------------------------------------|
| LIVE     | `/claude-unlocked-v1?src=live`   | Partecipanti live YouTube (chat)           |
| REPLAY   | `/claude-unlocked-v1?src=replay` | Pagina replay + email replay (default)     |
| EMAIL    | `/claude-unlocked-v1?src=email`  | Lista email senza webinar / organic social |

Fallback (nessun parametro) = `replay`.

Cinque blocchi cambiano copy per variante (Hero, Bridge, Problem, Urgency, FinalCTA) + la FAQ aggiunge un item per la coorte email. Tutti gli altri blocchi sono identici.

## Sales page — TODO pre-go-live

1. **Checkout URL reali**: sostituire i placeholder Stripe in `sales-config.json` step `sales` (`checkoutUrlEarlyBird`, `checkoutUrlStandard`, `checkoutUrlFull`) con i link reali.
2. **Screenshot moduli**: ogni `ModuleAccordion` ha uno slot TODO commentato per inserire screenshot/mockup di Claude in azione (Project setup, CoWork, Skills, ecc.). Da riempire quando gli asset sono pronti.
3. **Foto founder coppia**: la sales page usa `/matteo-arnaboldi-hoodie.png` (Matteo solo). Se disponibile una foto di Matteo + Alex insieme di qualità professionale, sostituire in `SalesProofSection`.
4. **Deadline countdown**: i timestamp `earlyBirdDeadlineIso` e `standardDeadlineIso` in `sales-config.json` step `sales` sono calcolati a partire dal webinar 5 maggio 2026 18:00 CEST. Modificare se la finestra di lancio cambia.

## Sales page — struttura sezioni (variante REPLAY default)

```
1.  SalesHeader        — logo only
2.  SalesHero          — headline variant + scala prezzo + CTA + proof bar
3.  SalesBridge        — ponte dal webinar (variant-aware)
4.  SalesProblem       — costo dell'inazione + box dato concreto (variant-aware)
5.  SalesMechanism     — 3 step + effetti collaterali
6.  SalesModules       — 10 moduli ACCORDION (Module 0 pre-aperto) + CTA inline
7.  SalesProof         — founder photo + authority story + logo wall (logos 64px) + CTA inline
8.  SalesAudience      — per chi è / NON è + CTA inline
9.  SalesComparison    — tabella 4-col / mobile stack + CTA inline
10. SalesBonus         — 4 bonus card (drum-roll prima dell'offerta)
11. SalesOffer         — stack + reveal prezzo grande + scala visiva
12. SalesGuarantee     — watermark "14"
13. SalesFAQ           — 8 FAQ (+ 1 per email variant)
14. SalesUrgency       — timer countdown + body variant-aware
15. SalesFinalCTA      — recap stack + CTA + chiusura tipografica
16. SalesB2B           — outline button → calendar
17. SalesFooter        — disclaimer Anthropic + AGCM
18. SalesStickyBar     — CTA mobile (auto-hide vicino offerta)
```

CTA principali: **8 totali** — Hero, dopo Modules, dopo Proof, dopo Audience, dopo Comparison, Offer, Urgency, Final + StickyBar mobile.

## Note operative

- Slug pubblici: `/webinar-claude` (lead gen) + `/claude-unlocked-v1` (sales)
- Endpoint opt-in: `POST /api/funnels/webinar-claude/optin`
- Variabili ambiente richieste:
  - `BREVO_API_KEY` (o `BREVO_API_KEY_V2`)
  - `BREVO_WEBINAR_LIST_ID` (opzionale ma consigliata per segmentazione)

## Tracking GA4 (sales page)

- `sales_view` (con `variant`) all'apertura della pagina
- `sales_cta_click` (con `block`, `variant`, `pricing_stage`, `price`) su ogni CTA principale (hero, offerta, urgenza, finale)
- `sales_b2b_call_click` su CTA B2B
- `sales_sticky_click` su CTA sticky mobile
- `InitiateCheckout` Meta Pixel su tutti i checkout
