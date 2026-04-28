# Funnel: webinar-claude + claude-unlocked-v1 + bootcamp-ai-champion

Cartella unica con i componenti React condivisi per **tre funnel registrati**:
- `webinar-claude` — opt-in + thank-you del webinar gratuito (5 maggio 2026, ore 18:00)
- `claude-unlocked-v1` — sales page del Corso Claude (top-level slug, single step)
- `bootcamp-ai-champion` — sales page del Bootcamp AI Champion — terza edizione (top-level slug, single step). **Palette lime** distinta dal corso (`#B5F03A`).

Le sezioni `Sales*` in `sections.tsx` sono usate solo dal funnel `claude-unlocked-v1`. Le sezioni `Webinar*` sono usate solo dal funnel `webinar-claude`. Le sezioni `Bootcamp*` in `sections-bootcamp.tsx` sono usate solo dal funnel `bootcamp-ai-champion`. Il design system (`WcThemeProvider`, `theme.module.css`) è condiviso fra tutti e tre; il theme variant `data-theme="bootcamp"` cambia il gradient di sfondo della sales del bootcamp.

## Struttura

- `context/` — strategia, posizionamento, vincoli e guardrail copy.
- `copy/` — copy operativi (opt-in, thank-you, sales page master).
  - `SALES_PAGE_CORSO_COMPLETA_V1.md` — documento master della sales page (14 blocchi, 3 varianti).
- `config.json` — configurazione del funnel **`webinar-claude`** (opt-in + thank-you).
- `sales-config.json` — configurazione del funnel **`claude-unlocked-v1`** (sales page, single step).
- `bootcamp-config.json` — configurazione del funnel **`bootcamp-ai-champion`** (sales page bootcamp, single step). Copy master in `public/SALES_PAGE_BOOTCAMP_AI_CHAMPION_V2.md`.
- `sections.tsx` — componenti React `Webinar*` + `Sales*` (palette arancione).
- `sections-bootcamp.tsx` — componenti React `Bootcamp*` (palette lime, primitive locali distinte).
- `sections.module.css` — utility responsive condivise.
- `theme.module.css` + `WcThemeProvider.tsx` — design system condiviso (con variant `data-theme="bootcamp"`).

## Step e URL

| Funnel | Step | URL pubblico | Tipo | isConversion |
|---|---|---|---|---|
| `webinar-claude` | `optin` | `/webinar-claude` | Lead capture (form Brevo) | false |
| `webinar-claude` | `thank-you` | `/webinar-claude/thank-you` | Conferma post-iscrizione | true |
| `claude-unlocked-v1` | `sales` | `/claude-unlocked-v1` | Sales page Corso Claude | true |
| `bootcamp-ai-champion` | `sales` | `/bootcamp-ai-champion` | Sales page Bootcamp AI Champion (3a edizione) | true |

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

## Bootcamp AI Champion — note operative

- Slug pubblico: `/bootcamp-ai-champion`
- Palette: lime `#B5F03A` (CTA, accenti) — distinta dall'arancione del corso. Background gradient bootcamp impostato via `data-theme="bootcamp"` sul `WcThemeProvider`.
- Copy master: `public/SALES_PAGE_BOOTCAMP_AI_CHAMPION_V2.md` (14 sezioni). Hardcoded nei componenti `Bootcamp*Section`. Solo prezzo/listino/stack-value/URL Calendly sono in `bootcamp-config.json` (chiave `BootcampPricing`).
- Prezzo attuale: **1.297 EUR** (anchor visivo: `~~4.632 EUR~~ → 1.297 EUR`, listino 1.500 in micro-copy).
- Niente blocco early bird modulare, niente countdown, niente varianti `?src=`.
- Tracking GA4: `bootcamp_cta_click` (con `block`) su ogni CTA principale, `bootcamp_sticky_click` sulla sticky mobile.

### Bootcamp — TODO pre-go-live

1. **Calendly Mattia**: il campo `callUrl` in `bootcamp-config.json` è vuoto → tutti i 6 CTA puntano a `href="#"` (rendering completo, click no-op). Inserire l'URL reale della call di selezione di Mattia in un solo punto del config per attivare tutti i bottoni insieme.
2. **Foto Alex Carofiglio**: la card founder di Alex mostra placeholder "Foto in arrivo". Inserire `imgSrc` reale in `BootcampFoundersSection` quando disponibile (Matteo usa già `/matteo-arnaboldi-hoodie.png`).
3. **Testimonianze cohort 1 e 2**: `BootcampResultsSection` ha uno slot dedicato — inserire 3–5 video o testo prima del go-live.
4. **Pacchetto plugin/skill bonus**: il line-item nello stack offerta dice "Dettaglio del pacchetto in arrivo prima del go-live" — sostituire con elenco esatto.
5. **Date prima cohort**: il copy non cita date specifiche (evergreen). Se vuoi metterle, aggiungile nell'hero o nella sezione Programma.
