# CLAUDE.md — Morfeus Website

Guida operativa per agenti AI (Claude Code). Leggi questo PRIMA di esplorare: ti orienta in 30 secondi.

## Cos'è

Sito marketing **Next.js 16 / React 19 / Tailwind CSS 4** (App Router, TypeScript) con un **sistema funnel config-driven** (landing, freebie, sales, bootcamp). Deploy su **Vercel**: push su `main` → deploy automatico. Email/lead via **Brevo**.

Versioni **bloccate senza caret** (`next` 16.2.11, `react`/`react-dom` 19.2.4, `eslint-config-next` 16.2.11): è un sito che fattura, non si lascia decidere a un range quale versione builda su Vercel.

## Comandi

```bash
npm run dev               # sviluppo
npm run build             # build di produzione (autorevole)
npm run typecheck         # tsc --noEmit
npm run test              # vitest
npm run lint              # eslint (flat config: eslint.config.mjs)
npm run check:public-assets[:strict]  # policy asset in public/
```

**La CI (`.github/workflows/quality-gates.yml`) gira `npm ci → check:public-assets → lint → typecheck → test → build` su ogni push/PR.** Prima di pushare, gira la sequenza in locale.

## Le due metà del repo

Il repo contiene **due sistemi diversi** che condividono solo il dominio. Capire in quale ti trovi è la prima cosa da fare:

|                    | **Sito madre**                        | **Funnel**                               |
| ------------------ | ------------------------------------- | ---------------------------------------- |
| URL                | `/{it,en}/<pagina>`                   | `/<slug>` (senza lingua)                 |
| Dove               | `src/app/[locale]/…`                  | `src/funnels/<nome>/config.json`         |
| Come si costruisce | componenti React scritti a mano       | **config-driven**: JSON → `componentMap` |
| Guscio             | `SiteShell` (header + footer + `.ms`) | `funnel-internal` + preset               |
| Aggiungerne uno    | 6 registri da toccare (sotto)         | runbook freebie (sotto)                  |

**Mappa completa delle pagine: [`docs/site-tree.md`](docs/site-tree.md). Messa in produzione: [`docs/go-live.md`](docs/go-live.md).**

## Sito madre — pagine 2026

Il restyle 2026 (chi-siamo, metodo, marf, casi, insights, glossario, impara-ai, faq, roiometro) vive sotto `src/app/[locale]/`. Ogni pagina è un **server component** avvolto in `SiteShell`.

| Percorso                                 | Cosa                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `src/components/site/SiteShell.tsx`      | Guscio: `.ms` + font + header + footer + loader. **Tutto ciò che è "del sito" si monta qui**, non pagina per pagina |
| `src/components/site/SiteHeader.tsx`     | Barra. Nav piena da **1536px** (`2xl`), sotto barra compatta col burger                                             |
| `src/components/site/SiteMobileMenu.tsx` | Burger + pannello, visibile sotto 1536                                                                              |
| `src/components/site/SiteFooter.tsx`     | Footer con griglia, filigrana M e sfumatura viola                                                                   |
| `src/components/site/site.css`           | **Design system**: token `.ms`, fasce `.band.ink` / `.band.carta`, bottoni, header, footer                          |
| `src/components/pagine/kit.css`          | Dispositivi delle pagine: `quadro`, `readout`, `quota`, `scheda`                                                    |
| `src/components/site/loader/`            | Loader d'ingresso (una volta per sessione, chiave `morfeus_loaded`)                                                 |
| `src/components/site/booking.ts`         | `BOOKING_URL` — **unica fonte** per "Prenota una chiamata"                                                          |
| `src/components/home2026/`               | Home 2026: scroll a scatti (deck) + `demo.css`, skin `.d26`                                                         |

### Convenzioni che non si negoziano

- **Fasce, non pagine bianche.** Ogni sezione è `<section className="band ink pg">` o `band carta pg`. Il colore dei token cambia dentro la fascia: un valore tarato su `ink` non regge su `carta`.
- **Il marchio non si ridisegna.** Si usano i file: `/images/brand/morfeus-mark.png` (lockup 2064×267) e `/logo/m-w.png` (sola M). Mai ricomporlo con font + SVG.
- **Griglia di fondo: un token solo.** `--grid` in `site.css` (oggi 44px). Chi disegna una griglia legge `var(--grid)`, non un numero.
- **Prenotare = `BOOKING_URL`.** Nessuna CTA "prenota" deve puntare a una pagina interna.

### Aggiungere una pagina al sito madre — i 6 registri

Toccarne uno solo lascia il sito disallineato. In ordine:

1. `src/app/[locale]/<slug>/page.tsx` — la pagina, dentro `SiteShell`, con `buildLocaleAlternates(<slug>, locale)` nei metadata (canonical + hreflang).
2. `src/lib/seo/public-indexing.ts` → `INDEXABLE_LOCALE_PATHS`. **Se non è qui, non entra in sitemap.**
3. `src/lib/reserved-slugs.ts` — così nessun funnel può rubare lo slug.
4. `public/llms.txt` — se va offerta agli agenti AI.
5. `SiteHeader` / `SiteMobileMenu` / `SiteFooter` — se va in navigazione.
6. `docs/site-tree.md` — l'albero.

Se **sostituisce** una pagina esistente, aggiungi anche il redirect in `next.config.mjs` (`permanent: true`): il 308 passa il posizionamento, cancellare e basta lo brucia.

## Worktree

Il repo lavora a **worktree paralleli**, uno per filone. `git worktree list` per vederli.
`mf-pages` (`exp/pagine-2026`) = pagine 2026 · `mf-playground` = sotto-brand Playground · `mf-clash`, `pd2026` = prove font.

⚠️ **Più sessioni possono scrivere sullo stesso worktree.** Prima di committare, `git status`: se vedi file che non hai toccato, sono di un'altra sessione. **Stagia solo i tuoi path** (`git add <path>`), mai `git add -A`, o ti porti dentro il lavoro in corso di qualcun altro. È già successo.

## Mappa del repo — funnel

| Percorso                                              | Cosa                                                                                                              |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/funnels/<nome>/config.json`                      | Definizione di un funnel (step, `componentOrder`, `content`)                                                      |
| `src/funnels/registry.ts`                             | Registra ogni funnel (slug, locale, `indexable`, runtime/metadataPreset)                                          |
| `src/components/funnels/componentMap.tsx`             | Mappa nome-componente → sezione React                                                                             |
| `src/funnels/component-contract.ts`                   | Elenco nomi-componente validi (+ `loader.ts` valida)                                                              |
| `src/proxy.ts`                                        | Routing `/<slug>` → `/funnel-internal/<slug>` + X-Robots per non-indexable (era `middleware.ts` prima di Next 16) |
| `src/app/funnel-internal/[slug]/[[...step]]/page.tsx` | Render funnel + `generateMetadata` (preset SEO)                                                                   |
| `src/lib/brevo/lists.ts`                              | Mapping chiave logica → env var della lista Brevo                                                                 |
| `src/app/api/funnels/<freebie>/optin/route.ts`        | Endpoint optin → Brevo                                                                                            |
| `src/lib/reserved-slugs.ts`                           | Slug riservati (non usabili come funnel)                                                                          |

## Come aggiungere un FREEBIE (runbook)

1. Crea `src/funnels/freebie-<nome>-<anno>-<mese>/config.json` (copia da un freebie esistente): step `optin` (path `""`) con `FreebieHero` + step `thank-you` (path `"thank-you"`, `isConversion: true`, `noindex: true`) con `FreebieThankYou`.
2. Crea l'API route `src/app/api/funnels/freebie-<nome>/optin/route.ts` (copia esistente; cambia la chiave `getBrevoListId(...)` e il `DEFAULT_FORM_NAME`).
3. Aggiungi il mapping lista in `src/lib/brevo/lists.ts` (`FREEBIE_...: "BREVO_FREEBIE_..._LIST_ID"`).
4. Registra in `src/funnels/registry.ts` (`registerFunnel(...)`, `indexable: false`).
5. Metti la cover in `public/freebies/<nome>/cover.png` (ottimizzata: <500KB).
6. Imposta l'env var della lista su **Vercel** (`BREVO_FREEBIE_..._LIST_ID`), altrimenti l'optin sottoscrive senza lista.
7. Verifica: `npm run typecheck && npm run test && npm run build`.

I componenti freebie condivisi (`FreebieHero`, `FreebieThankYou`, `FreebieWebinarTeaser`, `FreebieHub`) vivono in `src/funnels/freebie-cowork-setup-skill-2026-04/sections.tsx` e `freebie-hub-2026-06/sections.tsx`.

## 🧱 Blueprint-first — struttura ASCII prima di costruire

**Prima di creare QUALCOSA con una struttura** (landing/pagina, funnel, sequenza email, componente, documento, deck, architettura cartelle/file, sistema), NON partire dal codice o dalla copy: **prima disegna in chat uno scheletro ASCII a blocchi**, ogni blocco con etichetta + una riga di razionale (perché sta lì / che lavoro fa). Poi **aspetta l'OK di Matt** prima di costruire. Serve ad allinearci sulla struttura prima di investire nel dettaglio.

- Vale anche fuori dalle landing: ogni volta che la cosa ha sezioni / layout / gerarchia.
- **Eccezione:** modifiche triviali o one-shot (un fix puntuale, un singolo elemento, una copy breve) non lo richiedono. Nel dubbio, fallo o chiedi.

## ⛔ Regole dure (lezioni reali)

- **Committa SEMPRE i file sorgente untracked importati** da codice tracciato. Un file presente solo sul tuo disco passa la build locale ma rompe Vercel (`Module not found`). Controlla `git status` per `??` su file `.ts/.tsx` importati. _(il pre-push hook lo verifica)_
- **Tieni `package-lock.json` in sync** con `package.json` (`npm ci` è strict; un lock disallineato = CI rossa). Dopo `npm install` di una dep, committa anche il lock.
- **Niente garanzia "14 giorni" / "soddisfatti o rimborsati"** nelle copy: **non esiste**, è pubblicità ingannevole. (Eccezioni reali e diverse: rimborso regionale Formazione Finanziata, garanzia di _trasferimento_ dei bootcamp.)
- **Gira la sequenza CI in locale prima del push.** Vercel e GitHub Actions buildano su clone pulito: ciò che funziona solo localmente non basta.
- **Il chatbot NON è nel repo, e 3 file hanno `skip-worktree`.** `.git/info/exclude` (ignore locale, non committato) tiene fuori `src/chatbot/`, `src/app/api/chatbot/`, `src/components/shared/ChatbotWidget.tsx`, `.chatbot-data/`. Perché le modifiche locali che li _importano_ non finissero nei commit, questi 3 file hanno il bit `skip-worktree`: **`src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/app/hooks/useCustomScroll.ts`**.
  Conseguenza: **git ignora le loro modifiche** — `git status` dice "pulito" mentre disco e `HEAD` divergono, `git add -A` non li vede, e il build locale (che usa il disco) passa mentre Vercel (che usa il commit) fallisce. È già successo: ha rotto la CI nella migrazione a Next 16.
  Regole: non rimuovere il bit; **non committare quei file con la versione su disco** (importano il chatbot → Vercel `Module not found`); se uno va corretto, parti da `git show HEAD:<file>` e committa **solo** la modifica necessaria. Per vedere i file marcati: `git ls-files -v | grep -v "^H "`.
- **La verifica autorevole è il build da CLONE PULITO del branch committato**, non il build nella tua cartella: `git clone --branch <branch> --single-branch . <tmp> && cd <tmp> && npm ci && npm run build`. È l'unico modo di accorgersi che disco e repo divergono.
- **Mai passare `npm run build` dentro una pipe** (`| grep`, `| tail`): il codice di uscita diventa quello dell'ultimo comando della pipe e **un build fallito sembra riuscito**. Controlla `$?` di ogni passo.
- **`tsc --noEmit` non basta per le rotte.** I tipi `PageProps`/`LayoutProps` che validano `params`/`searchParams` li genera Next durante `next build`: non sono nel sorgente. Solo il build li vede.
- **Niente backup (`*.bak`) né immagini >8MB in git.** Ottimizza gli asset (resize + re-encode) prima di committare.
- **Telefono utente → sempre l'attributo Brevo `TELEFONO_`** (`BREVO_ATTR.TELEFONO`). MAI `SMS`/`WHATSAPP`/`LANDLINE_NUMBER` per l'input utente: i campi nativi validano il formato (E.164) e fanno fallire l'intero optin. `TELEFONO_` è testo libero. Vedi `docs/brevo.md` (REGOLA TELEFONO).
- **Mai un comando in pipe se ti serve il suo exit code.** `npm run build | tail` restituisce l'exit di `tail`: un build fallito sembra riuscito. Vale per `tsc`, `lint`, `test`, `check:public-assets:strict`. Redirigi su file e leggi `$?`.
- **Mai `next build` mentre gira `next dev` nella stessa cartella.** Si contendono `.next` e escono errori fantasma (`routes-manifest.json` mancante, `Cannot find module for page`) che non c'entrano col codice. Ferma il dev server e `rm -rf .next` prima di buildare.
- **Il clone di verifica va in un path CORTO** (es. `C:\ck`). Con `core.longpaths` disattivo, su Windows il checkout fallisce a metà e sembra che manchi la cartella `app`.
- **Una modifica CSS non è fatta finché non la vedi nel CSS SERVITO.** Il sorgente dice cosa hai scritto, non cosa vince: una regola può esserci ed essere battuta da una più specifica. Occhio a `.band.ink` — sono **due** classi, non una. Vedi `.cursor/rules/styling-standards.mdc`.
- **Mai sostituire un intervallo di righe in un file CSS**, solo il blocco esatto: è così che sono sparite due regole della headline senza nessun errore.
- **CSS a token per le fasce, Tailwind per i widget.** Il criterio: se un valore cambia significato dentro `.band.ink` / `.band.carta`, è un token. Vedi `.cursor/rules/styling-standards.mdc`.
- **Contrasto e corpi si misurano, non si guardano.** Minimo 4.5:1 (3:1 sopra i 24px), pavimento 13px per le etichette, 16-18px per testo che spiega o converte. Un valore tarato su fondo scuro non regge su fondo chiaro.
- **I variable font vanno dichiarati con il range dei pesi** in `next/font` (`weight: "200 700"`). Senza, l'asse non si attiva e ogni 600/700 è finto grassetto.

## Altri doc

- **`docs/site-tree.md`** — mappa completa delle pagine, redirect, cosa è live e cosa no
- **`docs/go-live.md`** — checklist di messa in produzione, decisioni aperte, audit
- `.cursor/rules/styling-standards.mdc` — CSS vs Tailwind, specificità, font, leggibilità
- `.cursor/rules/verification-standards.mdc` — come verificare davvero una modifica
- `.cursor/rules/*.mdc` — regole dettagliate (architettura, componenti, SEO, visual identity) per Cursor
- `docs/brevo.md` — integrazione Brevo (liste, attributi, API key)
- `src/funnels/README.md` — pattern funnel
- `.planning/` — stato GSD (PROJECT, ROADMAP, STATE, task)
