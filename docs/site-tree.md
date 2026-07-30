# Site tree — Morfeus

**Base URL:** `https://morfeushub.com`
**Fonte:** struttura `src/app/`, `src/proxy.ts`, `src/lib/seo/public-indexing.ts`, `src/lib/reserved-slugs.ts`, `src/funnels/registry.ts`.
**Aggiorna questo file** quando aggiungi una route, uno slug o un funnel.

> **Stato:** allineato al branch `exp/pagine-2026` il **2026-07-30**.
> Le pagine marcate 🆕 **non sono ancora in produzione**: escono con lo spedizione di questo branch.
> Per la procedura di messa online vedi **[go-live.md](./go-live.md)**.

---

## Legenda

| Simbolo | Significato                          |
| ------- | ------------------------------------ |
| 🆕      | Nuova, non ancora live in produzione |
| ✅      | Live oggi su morfeushub.com          |
| 🔒      | Non indicizzabile (noindex)          |
| ↪️      | Redirect verso un'altra URL          |
| 🧪      | Interna / anteprima, non pubblica    |

Le route del sito madre esistono sempre in **due lingue**: `/it/…` e `/en/…`.
EN è la lingua di default: `/en/casi` redirige a `/casi` (prefisso `as-needed`), entrambe valide.

---

## Area A — Ingresso

| Ruolo                   | URL                      | Stato                                                          |
| ----------------------- | ------------------------ | -------------------------------------------------------------- |
| Root                    | `/` ↪️ `/en`             | ✅                                                             |
| Homepage                | `/it` · `/en`            | ✅ **contenuto nuovo dal 30/07**: è la scena 2026 (`Home2026`) |
| ~~Anteprima home 2026~~ | `/it/home-2026` ↪️ `/it` | rimossa, redirect 308                                          |

---

## Area B — Sito madre, pagine 2026 🆕

Il cuore del restyle. Tutte indicizzabili, tutte con `buildLocaleAlternates` (canonical + hreflang).

| Pagina         | URL             | Stato | Nel menu            |
| -------------- | --------------- | ----- | ------------------- |
| Chi siamo      | `/it/chi-siamo` | 🆕    | ✅                  |
| Metodo         | `/it/metodo`    | 🆕    | ✅                  |
| MARF           | `/it/marf`      | 🆕    | ✅                  |
| LAB            | `/it/lab`       | ✅    | ✅                  |
| Casi (hub)     | `/it/casi`      | 🆕    | ✅                  |
| Insights (hub) | `/it/insights`  | 🆕    | ✅                  |
| Glossario      | `/it/glossario` | 🆕    | menu mobile         |
| Impara l'AI    | `/it/impara-ai` | 🆕    | menu mobile         |
| FAQ            | `/it/faq`       | 🆕    | menu mobile         |
| ROIometro      | `/it/roiometro` | 🆕    | —                   |
| Forge          | `/it/forge`     | ✅    | — (linkata dal Lab) |

> ⚠️ **forge vs marf** — decisione aperta. `/marf` è la pagina MARF rifatta ed è quella nel menu; `/forge` è la vecchia pagina MARF riusata come "offerta Morf Forge" e ha ancora il `metaTitle` di MARF. Due pagine vicine: o si separano nettamente (copy + title distinti) o `/forge` ↪️ `/marf`.

---

## Area C — Casi (dettaglio) 🆕

Otto casi reali. Sostituiscono i vecchi `case-study/[slug]` generici (5 verticali).

`/it/casi/…`

| Slug                              |
| --------------------------------- |
| `ag-academy-onboarding`           |
| `brainiac-tesoreria-riconciliata` |
| `cyberangels-report-cfo`          |
| `cyberangels-sales-advisor`       |
| `globia-scoring-deterministico`   |
| `marf-lead-caldo`                 |
| `scalers-pre-sales`               |
| `valueize-best-seller`            |

---

## Area D — Insights (articoli) 🆕

Tredici articoli. `/it/insights/…`

| Slug                                          |
| --------------------------------------------- |
| `value-leak`                                  |
| `agenti-ai-in-azienda`                        |
| `ai-act-pmi-alfabetizzazione`                 |
| `ai-intelligenza-artificiale-posti-di-lavoro` |
| `ai-per-le-pmi-da-dove-iniziare`              |
| `automazione-preventivi-documenti-ai`         |
| `come-integrare-ai-nei-processi`              |
| `come-misurare-il-roi-dell-ai`                |
| `come-scegliere-consulenza-ai`                |
| `competenze-ai-azienda-ai-champion`           |
| `perche-progetti-ai-falliscono`               |
| `quanto-costa-l-ai-in-azienda`                |
| `saas-o-sistema-ai-su-misura`                 |

---

## Area E — Legale

| Pagina           | URL                    | Stato                                           |
| ---------------- | ---------------------- | ----------------------------------------------- |
| Privacy          | `/it/privacy`          | ✅ (rifatta sul DS 2026, aggiornata 30/07/2026) |
| Cookie policy    | `/it/cookies`          | ✅ (idem, + sezione Brevo)                      |
| Termini Corso    | `/it/termini-corso`    | ✅                                              |
| Termini Bootcamp | `/it/termini-bootcamp` | ✅                                              |

---

## Area F — Post-chiamata 🔒

Non indicizzabili (`NON_INDEXABLE_LOCALE_PREFIXES` + robots.txt).

| Pagina            | URL                            |
| ----------------- | ------------------------------ |
| Call confirmed    | `/it/call-confirmed`           |
| Thank you         | `/it/call-confirmed/thank-you` |
| Intro confirmed   | `/it/intro-confirmed`          |
| Booking confirmed | `/it/booking-confirmed`        |

---

## Area G — Portal team 🔒

| Pagina | URL                                                     |
| ------ | ------------------------------------------------------- |
| Indice | `/it/portal`                                            |
| Membri | `/it/portal/{matteo,alex,simone,matteo-alvazzi,davide}` |

---

## Area H — Interne / anteprima 🧪

Non linkate dal sito, non in sitemap.

| Path                                              | Cosa                                                                                                                                  | Noindex                  |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `/mockup/optin-premium` · `/mockup/optin-infobiz` | Mockup design review                                                                                                                  | ⚠️ **non in robots.txt** |
| `/playground` · `/playground/metodo`              | Sotto-brand AI Playground. **Vive su `playground.morfeushub.com`** (live). Il ramo `/playground` sul dominio madre lo serve via proxy | ✅ via proxy             |

---

## Area I — Funnel (root, senza prefisso lingua)

Registrati in `src/funnels/registry.ts`, riscritti dal proxy su `/funnel-internal/<slug>`.

| Funnel                      | URL                                                         | Indicizzabile |
| --------------------------- | ----------------------------------------------------------- | ------------- |
| Webinar Claude              | `/webinar-claude` + `/thank-you`                            | ✅            |
| Claude Unlocked             | `/claude-unlocked` + `/access-9x4q2k7n`                     | ✅            |
| Bootcamp AI Champion 3ª ed. | `/bootcamp-ai-champion-3a-edizione` + `/access-25-m3p8r7q4` | ✅            |
| Vocabolario AI              | `/vocabolario-ai`                                           | ✅            |
| Claude Skill Anatomy        | `/claude-skill-anatomy` + `/thank-you`                      | 🔒            |
| Instagram Carousel Skills   | `/instagram-carousel-skills` + `/thank-you`                 | 🔒            |
| AI Design System Blueprint  | `/design-system-skill`                                      | 🔒            |

**Oscurati (404):** `/bootcamp-ai-champion`, `-v2`, `-v3`, `/claude-unlocked-v1`, `-v2`, `-v3`.

---

## Area J — Strumenti

| Risorsa        | URL                                                                | Note                                                        |
| -------------- | ------------------------------------------------------------------ | ----------------------------------------------------------- |
| Sitemap        | `/sitemap.xml`                                                     | Generata da `INDEXABLE_LOCALE_PATHS` + funnel indicizzabili |
| Robots         | `/robots.txt`                                                      | Statico in `public/`                                        |
| Guida agli LLM | `/llms.txt`                                                        | Statico, allineato alle pagine 2026                         |
| API            | `/api/contact`, `/api/precall-intake`, `/api/funnels/<slug>/optin` | —                                                           |

---

## Mappa redirect — vecchio → nuovo

Configurati in `next.config.mjs` (`async redirects()`, `permanent: true` → **308**, equivalente SEO del 301).

| Vecchia URL                              | Nuova                               | Stato oggi                                                                  |
| ---------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| `/{it,en}/operating-system`              | `/{loc}/forge`                      | ⚠️ codificato, **in produzione risponde ancora 200** → si attiva al go-live |
| `/operating-system`                      | `/forge`                            | idem                                                                        |
| `/{it,en}/offerta`                       | `/{loc}/forge`                      | codificato                                                                  |
| `/{it,en}/case-study`                    | `/{loc}/casi`                       | ⚠️ codificato, **in produzione risponde ancora 200**                        |
| `/{it,en}/case-study/:slug`              | `/{loc}/casi`                       | idem                                                                        |
| `/{it,en}/home-2026`                     | `/{loc}`                            | **nuovo 30/07** — era l'anteprima                                           |
| `/playbook`                              | `/playbook-imprenditore-milionario` | attivo                                                                      |
| `/bootcamp-ai-champion-seconda-edizione` | `go.morfeushub.com/…`               | attivo                                                                      |

**Le pagine nuove non richiedono redirect**: oggi rispondono 404, quindi sono aggiunte pure. L'unica sostituzione vera è la **home** (stessa URL, contenuto nuovo).

---

## Route legacy ancora nel codice

Cartelle presenti ma non raggiungibili (il redirect vince sul routing). Restano per rollback; si possono rimuovere quando i redirect sono stati live per qualche mese.

| Cartella                              | Nota                                   |
| ------------------------------------- | -------------------------------------- |
| `src/app/[locale]/case-study/[slug]/` | Sostituita da `casi/`; redirect attivo |
| `src/app/[locale]/operating-system/`  | Sostituita da `forge`; redirect attivo |
| `src/app/[locale]/servizi/`           | Solo `README.md`, nessuna pagina → 404 |

---

## Albero logico

```
/                              ↪️ /en
├── {it,en}/
│   ├── (home)                 ← Home2026 (swap fatto il 30/07)
│   ├── chi-siamo/ metodo/ marf/ lab/ forge/               🆕 (lab, forge già live)
│   ├── casi/                  🆕 hub + 8 casi
│   ├── insights/              🆕 hub + 13 articoli
│   ├── glossario/ impara-ai/ faq/ roiometro/                🆕
│   ├── privacy/ cookies/ termini-corso/ termini-bootcamp/
│   ├── call-confirmed/{,thank-you} intro-confirmed/ booking-confirmed/   🔒
│   ├── portal/[slug]          🔒
│   ├── case-study/[slug]      ↪️ casi (legacy)
│   └── operating-system/      ↪️ forge (legacy)
│
├── mockup/{optin-premium,optin-infobiz}     🧪
├── playground/{,metodo}                     🧪 noindex via proxy
├── api/…
├── sitemap.ts → /sitemap.xml
└── funnel-internal/[slug]/[[...step]]       ← target rewrite dei funnel
```

---

## Dove si dichiara cosa (fonti di verità)

Se aggiungi una pagina, questi file vanno toccati **insieme**, o l'albero si disallinea:

| File                             | Cosa dichiara                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `src/lib/seo/public-indexing.ts` | `INDEXABLE_LOCALE_PATHS` → **guida la sitemap**. Se non è qui, non è in sitemap. |
| `public/llms.txt`                | Pagine offerte agli agenti AI                                                    |
| `public/robots.txt`              | Aree bloccate ai crawler                                                         |
| `src/lib/reserved-slugs.ts`      | Slug non usabili come funnel (evita collisioni)                                  |
| `next.config.mjs`                | Redirect da URL vecchie                                                          |
| `docs/site-tree.md`              | **questo file**                                                                  |

---

> **Rimossa il 2026-07-30:** la pagina `/{it,en}/playground` del sito madre. Il Playground vive
> sul sottodominio `playground.morfeushub.com`, e due pagine sullo stesso argomento si facevano
> concorrenza. Non era mai stata live (404 in produzione), quindi nessun redirect necessario.
> Lo slug `playground` resta in `reserved-slugs.ts`: il ramo `/playground` serve il sottodominio.

_Ultimo allineamento: 2026-07-30 — pagine 2026 (chi-siamo, metodo, marf, casi, insights, glossario, impara-ai, faq, roiometro, home-2026), loader del sito, footer con sfumatura viola, header a burger sotto 1536px._
