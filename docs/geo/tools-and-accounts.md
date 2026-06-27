# GEO/SEO — Strumenti & Account (dove prendere i dati)

> Registro degli strumenti/account per SEO + GEO: cosa danno, stato, chi li gestisce.
> Così non dimentichiamo dove vivono i dati. Aggiornato: 2026-06-26.

## ✅ Attivi (i dati arrivano da qui)

| Strumento                    | Dashboard                                                              | A cosa serve                                                                                                                                                                                                               | Stato                                                          | Owner                            |
| ---------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------- |
| **Google Search Console**    | search.google.com/search-console                                       | Query organiche **reali**, impression/click, copertura indicizzazione, submit sitemap                                                                                                                                      | ✅ creato 2026-06-26 · sitemap inviata · dati in 1-3 settimane | Matteo                           |
| **Bing Webmaster Tools**     | bing.com/webmasters                                                    | SEO Bing + **AI Performance (BETA)** = AI Visibility Insights (Intents / Topics / Citation Share) → cruscotto **GEO** per ChatGPT & Copilot (usano l'indice Bing). Anche: Keyword Research, Site Scan, IndexNow, Backlinks | ✅ verificato · sitemap inviata                                | Matteo                           |
| **GA4 + Google Tag Manager** | analytics.google.com · tagmanager.google.com                           | Traffico sito + **segmento referral-LLM** (chatgpt/perplexity/gemini/copilot/claude). Container `GTM-WPT8RFKZ`, Consent Mode v2                                                                                            | ⚙️ live sul sito · canale referral-LLM da creare (Fase 1)      | Matteo (UI) + Claude (doc)       |
| **Prompt panel** (manuale)   | ChatGPT · Perplexity · Gemini · Google AI Overviews · Copilot · Claude | Tracciare **citazioni/risposte** negli LLM (la metrica GEO vera)                                                                                                                                                           | 📝 template da creare (Fase 1), run mensile                    | Claude (template) + Matteo (run) |

## ❌ Non disponibili → alternative

| Strumento                        | Stato                             | Cosa usiamo invece                                                                    |
| -------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| **Semrush**                      | non in possesso                   | **Bing Keyword Research** (gratis) + **GSC** (query reali) + mining domande di Claude |
| **Google Ads / Keyword Planner** | non attivabile                    | idem sopra (la traccia keyword non è bloccante: GEO ≠ volumi)                         |
| **Ahrefs**                       | MCP disconnesso (era disponibile) | opzionale/futuro (Brand Radar = menzioni AI)                                          |

## 🔗 Altri (stack, non SEO/GEO core)

- **Vercel** — hosting/deploy (push su `main` = deploy automatico).
- **Brevo** — email/lead.
- **Meta Pixel** — id `978948495077175` (tracking ads, non SEO).

## 🧭 Mappa: dato → dove serve

- **GSC – query** → Fase 5 (tassonomia buyer, IA-01) + keyword reali per i contenuti.
- **Bing – AI Performance** → baseline GEO (citazioni) + KPI mensile.
- **GA4 – referral-LLM** → KPI traffico da LLM (MEAS-01).
- **Prompt panel** → KPI citazioni LLM (MEAS-02).

## ⏳ Azioni umane in sospeso

- [ ] GSC: lasciar accumulare (1-3 sett.) → poi export _Query, 12 mesi, it+en_.
- [ ] Bing: aprire **AI Performance** e segnare la baseline.
- [ ] GA4: creare il canale/segmento **referral-LLM** (in Fase 1, con la doc che preparo io).
