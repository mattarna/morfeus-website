# Funnel: webinar-claude + claude-unlocked-v1/v2 + bootcamp-ai-champion (v1/v2)

Cartella unica con i componenti React condivisi per **cinque funnel registrati**:
- `webinar-claude` — opt-in + thank-you del webinar gratuito (5 maggio 2026, ore 18:00)
- `claude-unlocked-v1` — sales page del Corso Claude (versione live, indexable). Copy "v1".
- `claude-unlocked-v2` — sales page del Corso Claude (versione in confronto, **non indexable**). Copy revisionato dal documento `SALES_PAGE_CORSO_COPY_FINALE.md` del 29 aprile 2026. Palette arancione invariata. **Da confrontare side-by-side con v1; alla fine del confronto si tiene solo una.**
- `bootcamp-ai-champion` — sales page del Bootcamp AI Champion — terza edizione. **Palette lime** distinta dal corso (`#B5F03A`).
- `bootcamp-ai-champion-v2` — sales page Bootcamp v2 (in confronto, non indexable).

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
| `webinar-claude` | `replay` | `/webinar-claude/replay` | Pagina replay post-webinar (video + 2 card prodotto) | false |
| `claude-unlocked-v1` | `sales` | `/claude-unlocked-v1` | Sales page Corso Claude | true |
| `claude-unlocked-v1` | `thank-you` | `/claude-unlocked-v1/access-9x4q2k7n` | TY page post-acquisto corso (onboarding + upsell bootcamp) — slug offuscato | true |
| `bootcamp-ai-champion` | `sales` | `/bootcamp-ai-champion` | Sales page Bootcamp AI Champion (3a edizione) | true |
| `bootcamp-ai-champion` | `thank-you` | `/bootcamp-ai-champion/access-25-m3p8r7q4` | TY page post-acquisto bootcamp (onboarding + roadmap) — slug offuscato | true |

## Replay page (`/webinar-claude/replay`)

Pagina di atterraggio post-webinar (link replay via email) — orientata alla decisione: corso o call bootcamp.

Struttura sezioni:
1. `WebinarReplayHeader` — sticky top (logo + countdown 7 maggio 23:59 CEST)
2. `WebinarReplayVideo` — embed YouTube `Pa2-LKvlJ3g` + link "guarda su YouTube" con UTM
3. `WebinarReplayContext` — bridge "Hai visto il sistema. Questo è il passo successivo."
4. `WebinarReplayCards` — 2 card affiancate (Claude Unlocked corso arancione · AI Champion bootcamp lime). Prezzo corso dinamico via JS lato client (147 → 297 → 397) basato su `countdownIso` + `standardDeadlineIso`.
5. `WebinarReplayFAQ` — 3 FAQ accordion (corso→bootcamp credito · price ladder · sales-call)
6. `WebinarReplayFooter` — minimal (P.IVA + © 2026)

Tracking GA4 / Meta Pixel:
- `youtube_link_click`, `cta_corso_click` (con stage + price), `cta_bootcamp_click`, `info_corso_click`, `info_bootcamp_click`
- `InitiateCheckout` Meta Pixel sul CTA corso

Replay — TODO pre-go-live:
1. **Calendly Mattia**: il campo `WebinarReplayCards.bootcamp.callUrl` è vuoto → CTA bootcamp render con `href="#"` no-op (cursor: not-allowed). Inserire l'URL reale per attivare il bottone.
2. **Stripe URLs**: `checkoutUrlEarlyBird/Standard/Full` riusano gli stessi placeholder di `sales-config.json` (`buy.morfeushub.com/corso-claude-{147,297,397}`). Sostituire con i link reali insieme alla sales page (TODO #1 della sales page).
3. **Deadline countdown**: `countdownIso` = `2026-05-07T23:59:59+02:00` (CEST), `standardDeadlineIso` = `2026-05-12T23:59:59+02:00`. Modificare se cambia la finestra di lancio.

## Sales page — varianti dinamiche

La sales page (`/claude-unlocked-v1`) personalizza copy e CTA in base alla provenienza del visitatore via query string `?src=`:

| Variante | URL                                | Audience                                   |
|----------|------------------------------------|--------------------------------------------|
| LIVE     | `/claude-unlocked-v1?src=live`   | Partecipanti live YouTube (chat)           |
| REPLAY   | `/claude-unlocked-v1?src=replay` | Pagina replay + email replay (default)     |
| EMAIL    | `/claude-unlocked-v1?src=email`  | Lista email senza webinar / organic social |

Fallback (nessun parametro) = `replay`.

Cinque blocchi cambiano copy per variante (Hero, Bridge, Problem, Urgency, FinalCTA) + la FAQ aggiunge un item per la coorte email. Tutti gli altri blocchi sono identici.

## TY page corso (`/claude-unlocked-v1/access-9x4q2k7n`)

> **Slug offuscato**: il path non è `/thank-you` per evitare che utenti curiosi accedano alle risorse a tentativi. Lo slug va inserito esattamente così nel redirect URL di Stripe (success_url) — se cambia, aggiornare anche Stripe.

Pagina post-acquisto del Corso Claude Unlocked (renderizzata dopo lo Stripe redirect). Stesso design system della sales (palette arancione), ma struttura ridotta: niente sticky bar, niente offerta. Header logo + thank-you content + footer disclaimer.

Struttura sezioni:
1. `SalesHeader` — logo only
2. `SalesThankYou` — sezione conferma + 6 blocchi (Hero, Notice tecnica, 3 prossimi passi, 4 live, Upsell bootcamp con credito 147€, Supporto)
3. `SalesFooter` — disclaimer Anthropic + AGCM

Configurabile in `sales-config.json` step `thank-you`:
- `circleUrl`, `module0Url` — link alla piattaforma corso (vuoto = href="#" no-op)
- `bootcampSalesUrl` — default `/bootcamp-ai-champion`
- `supportEmail` — default `matteo@morfeushub.com`
- `liveSessions[]` — 4 card date (default: 12/19/26 maggio + 2 giugno 2026)

TY corso — TODO pre-go-live:
1. **Circle URL**: `circleUrl` e `module0Url` sono vuoti → CTA Step 1/Step 2 puntano a `href="#"`. Inserire l'URL reale dello space Circle del corso e il deeplink al Modulo 0 quando disponibili.
2. **Date sessioni live**: `liveSessions[]` ha date placeholder. Aggiornare se cambia il calendario.

## TY page bootcamp (`/bootcamp-ai-champion/access-25-m3p8r7q4`)

> **Slug offuscato**: stesso ragionamento della TY corso — il path non è indovinabile. Inserire esattamente così nel redirect URL di Stripe (success_url) del bootcamp.

Pagina post-acquisto del Bootcamp AI Champion v3 (renderizzata dopo lo Stripe redirect). Palette lime invariata, struttura più ricca della TY corso perché l'accesso non è immediato (gestione attesa + onboarding pre-Live #1).

Struttura sezioni:
1. `BootcampHeader` — logo only
2. `BootcampThankYou` — Hero "Sei uno dei 25" + Notice tecnica + 4 step prossimi passi (2 lime priorità massima, 2 violetti priorità alta) + Timeline 4-tappe + 7 sessioni live + Card supporto Mattia
3. `BootcampFooter` — disclaimer Anthropic + AGCM

Configurabile in `bootcamp-config.json` step `thank-you`:
- `whatsappGroupUrl` — invite gruppo WhatsApp bootcamp (vuoto = href="#" no-op)
- `circleUrl` — space Circle bootcamp (vuoto = href="#" no-op)
- `claudeUrl` — default `https://claude.ai`
- `mattiaEmail` — default `mattia@morfeushub.com`

TY bootcamp — TODO pre-go-live:
1. **WhatsApp invite**: `whatsappGroupUrl` vuoto → CTA Step 1 punta a `href="#"`. Inserire l'invite link reale del gruppo WhatsApp bootcamp.
2. **Circle URL**: `circleUrl` vuoto → CTA Step 2 punta a `href="#"`. Inserire l'URL reale dello space Circle del bootcamp.
3. **Email Mattia**: `mattiaEmail` default `mattia@morfeushub.com`. Aggiornare se diverso.
4. **Roadmap timeline**: i 4 voci timeline ("Adesso", "Entro fine maggio", "Prima settimana di giugno", "~13 settimane dopo") sono hardcoded nel componente — modificare in `BootcampThankYouSection` se cambia la finestra di lancio.
5. **7 sessioni live**: titoli e descrizioni hardcoded nel componente, allineati alla v3 del bootcamp.

## Sales page — TODO pre-go-live

1. **Checkout URL reali**: sostituire i placeholder Stripe in `sales-config.json` step `sales` (`checkoutUrlEarlyBird`, `checkoutUrlStandard`, `checkoutUrlFull`) con i link reali.
2. **Screenshot moduli**: ogni `ModuleAccordion` ha uno slot TODO commentato per inserire screenshot/mockup di Claude in azione (Project setup, CoWork, Skills, ecc.). Da riempire quando gli asset sono pronti.
3. **Foto founder coppia**: la sales page usa `/matteo-arnaboldi-hoodie.png` (Matteo solo). Se disponibile una foto di Matteo + Alex insieme di qualità professionale, sostituire in `SalesProofSection`.
4. **Deadline countdown**: i timestamp `earlyBirdDeadlineIso` e `standardDeadlineIso` in `sales-config.json` step `sales` sono calcolati a partire dal webinar 5 maggio 2026 18:00 CEST. Modificare se la finestra di lancio cambia.

## Sales page v2 — TODO pre-go-live (in confronto, palette arancione invariata)

URL: `/claude-unlocked-v2` (non indexable). Stessa logica varianti `?src=live|replay|email` di v1.

Differenze strutturali con v1:
- `Bridge` ora variant-aware (LIVE/REPLAY identici, EMAIL completamente riscritta — niente blockquote, headline diversa)
- `Problem` rifatto in stile narrativo (compresso/medio/esteso) — rimosse 3 cards e LevelLadder per matchare il doc
- `Benefits` ridotto da 6 → 4 card concrete (Francesca + tono + sostituzione + ricominciare-da-zero)
- `PromiseLetter` riscritta come "lettera dal tuo io di tra 6 mesi" (era da Matteo) — body più breve, firma cambiata
- `Mechanism` mantiene 3 step ma include sotto-blocco "Effetti collaterali" (4 bullet)
- `FinalCTA` body sostituito con RECAP STACK universale (era body narrativo email-only)
- `Bonus` (drum-roll bonus card) e `UpsellBootcamp` (upsell mid-page) **rimossi** dal componentOrder — il doc non li prevede
- Headline section: tutte allineate al doc copy

Item pendenti del doc copy `SALES_PAGE_CORSO_COPY_FINALE.md` (29 aprile 2026):
1. **Checkout URL reali** (item #1 del doc) — `checkoutUrl*` in `sales-v2-config.json` sono placeholder identici a v1
2. **URL Calendly B2B** (item #2 del doc) — usato `https://marf.alexcarofiglio.com/book/morfeushub` (default v1)
3. **Testimonianze reali** (item #3 del doc) — `SalesV2ReviewsSection` ha placeholder etichettati TODO (Francesca / Giulio / Luca generici). Sostituire con 2-3 testimonianze reali con nome, ruolo, foto, risultato specifico
4. **Foto founder Matt + Alex** (item #4 del doc) — `SalesV2ProofSection` usa `/matteo-arnaboldi-hoodie.png` (solo Matteo). Sostituire con foto coppia naturale quando disponibile
5. **Permesso nomi aziendali** (item #5 del doc) — `SalesV2ProofSection` e `SalesV2B2BSection` citano già "Enel, Sisal, BNP Paribas, Zara" come nel v1. Se i permessi non sono confermati, sostituire con testo generico tipo "grandi aziende italiane in energia, finanza, retail, gaming"
6. **Deadline esatta early bird** (item #6 del doc) — `earlyBirdDeadlineIso` in `sales-v2-config.json` (default 2026-05-06T18:00:00+02:00)
7. **Deadline fine periodo standard** (item #7 del doc) — `standardDeadlineIso` (default 2026-05-12T18:00:00+02:00)
8. **URL pagina Bootcamp AI Champion** (item #8 del doc) — `SalesV2BootcampBridgeSection` punta a `https://go.morfeushub.com/bootcamp-ai-champion-seconda-edizione/`. Aggiornare se cambia.
9. **Conferma bonus Hormozi** (item #9 del doc) — attualmente NON incluso nello stack (4 voci: corso 297€ + 4 live 197€ + skill pack 97€ + aggiornamenti). Se confermato, aggiungere stack item con valore 97€ e ricalcolare totale (591€ → 688€)

### Workflow di confronto v1 vs v2

1. Apri side-by-side `/claude-unlocked-v1` e `/claude-unlocked-v2` con stessa variante (es. `?src=replay` su entrambe)
2. Confronto desktop + mobile, golden path scroll completo + ognuno dei 3 variant URL
3. Decisione finale: tieni una versione, rimuovi l'altra (config, sections file, type entries, registry, componentMap)

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
