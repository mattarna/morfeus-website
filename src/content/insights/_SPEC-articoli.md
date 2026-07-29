# Spec articoli Insights (.md → sito)

> Convenzione per gli articoli del blog. Ogni articolo è un file `.md` con front-matter YAML. Il dev renderizza il body Markdown e **genera schema + meta dal front-matter**. Obiettivo: impeccabili per SEO, GEO (citabilità LLM) e leggibilità.

## Front-matter (YAML) — campi
```yaml
title:            # H1 dell'articolo (può essere lungo e umano)
slug:             # url: /insights/<slug>
metaTitle:        # <title> SEO, max ~60 caratteri
metaDescription:  # meta description, max ~155 caratteri, con la keyword
category:         # uno dei pilastri: Margine & ROI | Adozione | Automazione | PMI | Formazione | Casi
tags: []          # 2-4 tag
topicTags: []     # tag tematici specifici e multipli (es. LLM, Anthropic, News, Leak, Agente, Skill, MARF...). Resi come chip cliccabili sulle card e filtrabili.
author:           # nome reale
authorRole:       # ruolo reale
datePublished:    # YYYY-MM-DD
dateModified:     # YYYY-MM-DD (aggiornare a ogni revisione → freshness)
readingTime:      # "N min"
targetQuery:      # query principale che l'articolo intercetta
tldr:             # risposta answer-first in 2-4 frasi (usata anche per meta/snippet)
relatedTerms: []  # termini proprietari linkati (Value Leak, MARF, ROIometro...)
internalLinks: [] # URL interni da linkare nel corpo
faq:              # coppie Q/A → schema FAQPage
  - q:
    a:
sources:          # fonti esterne citate → link nel corpo + E-E-A-T
  - title:
    url:
schema: [Article, FAQPage, BreadcrumbList]   # JSON-LD che il dev deve emettere
```

## Schema JSON-LD che il dev genera (dal front-matter)
- `Article`/`BlogPosting`: title, metaDescription, datePublished, dateModified, author→Person (con sameAs LinkedIn), publisher→Organization, mainEntityOfPage.
- `FAQPage`: dalla lista `faq`.
- `BreadcrumbList`: Home › Insights › <category> › <title>.
- Le `sources` vanno rese come link reali nel corpo (no link finti).

## Struttura del corpo (ordine fisso)
1. **TL;DR / In breve** in cima (il campo `tldr`, in un box). È la risposta diretta: ciò che gli LLM citano.
2. H2 = **domande reali** (match con People-Also-Ask). Ogni sezione risponde subito, poi approfondisce.
3. Paragrafi brevi (2-4 frasi). Liste dove aiutano. Almeno **un dato con fonte**.
4. **Link interni** a termini proprietari / ROIometro / articoli correlati (ancore descrittive, non "clicca qui").
5. **FAQ** in coda (le stesse del front-matter).
6. **CTA** finale coerente (ROIometro o "parla con noi"), mai aggressiva.

## Regole di qualità (non negoziabili)
- **Voce Morfeus**: da operatore, niente hype, niente gergo, **niente trattini lunghi (em dash)**, niente triadi da AI. Frasi parlate.
- **Answer-first**: la risposta nelle prime 2-3 righe di ogni sezione (vince snippet + citazione LLM).
- **Nessun numero inventato**: solo dati con fonte o numeri Morfeus confermati. I claim non verificati si tagliano.
- **Una keyword principale** per articolo (in title, H1, primo paragrafo, uno H2, meta). Niente keyword stuffing.
- **Leggibilità**: scansionabile in 20 secondi (titoli + TL;DR + grassetti misurati). Reading time onesto.
- **Interlinking**: ogni articolo linka ≥3 pagine interne e viene linkato dall'hub/pilastro.
- **Lunghezza**: quanto serve a rispondere meglio del primo risultato, non di più. Di norma 1.200-1.800 parole per i pillar.

## Workflow
Bozza (Claude) → validazione fatti/numeri (voi) → pubblicazione (dev). `dateModified` aggiornata a ogni revisione.
