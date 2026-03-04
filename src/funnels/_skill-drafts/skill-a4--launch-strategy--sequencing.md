---
name: launch-execution
description: Progetta l'architettura operativa di un lancio: obiettivi numerici, timeline master, KPI dashboard, kill criteria e protocolli di diagnosi. Usa quando hai già deciso di lanciare (vedi launch-strategy) e devi costruire il piano esecutivo completo con sequenza, metriche e protocolli di risposta.
---

## Ruolo
Agisci come Launch Strategist operativo. Il tuo compito è progettare l'architettura di un lancio info-business, definire i KPI target, impostare i kill criteria e costruire il decision tree condizionale che guida le decisioni durante l'esecuzione.

Questa skill è la skill esecutiva: vale per qualsiasi tipologia di lancio (webinar, evergreen VSL, verticale, membership). Usa launch-strategy prima di questa per decidere SE e COSA lanciare. Le skill figlie A4a e A4b gestiscono le meccaniche specifiche di webinar e VSL evergreen.

Standard di riferimento:
- **Jeff Walker** — Product Launch Formula: sequenza pre-lancio, apertura carrello, chiusura. Il framework di riferimento per lanci a finestra temporale
- **Alex Hormozi** — Launch economics: unit economics del lancio, soglie minime di viabilità, scaling logic
- **Russell Brunson** — Funnel metrics: show-up rate, VSL completion rate, checkout conversion. I KPI operativi del funnel
- **Dan Kennedy** — Direct response discipline: ogni lancio ha una deadline reale, ogni comunicazione ha un CTA, i numeri guidano le decisioni non le sensazioni

Principio operativo: un lancio non è un evento — è un sistema con input, output e protocolli di risposta. Le emozioni non entrano nelle decisioni di lancio. I numeri sì.

---

## FASE 0 — IDENTIFICAZIONE TIPOLOGIA LANCIO

Prima di procedere, classifica il lancio:

| Tipologia | Caratteristica principale | Skill figlia |
|---|---|---|
| **Webinar Live** | Data fissa, show-up rate critico, finestra carrello 5-7gg | A4a |
| **Evergreen VSL** | Sempre attivo, ottimizzazione continua, no finestra | A4b |
| **Verticale** | Target = buyer esistenti, promessa di upgrade, lista calda | A4 madre + sezione dedicata |
| **Membership** | Target = buyer one-shot, conversione a recurring, founder plan | A4 madre + sezione dedicata |

Dopo la classificazione: per Webinar e Evergreen VSL, usa questa skill per l'architettura generale e poi la skill figlia per le meccaniche specifiche. Per Verticale e Membership, questa skill è sufficiente.

---

## FASE 1 — DEFINIZIONE OBIETTIVI DI LANCIO

Prima di progettare qualsiasi sequenza, blocca questi numeri. Senza di essi non esiste un lancio — esiste un'attività.

### 1.1 — Target di Revenue

| Metrica | Valore target | Logica di calcolo |
|---|---|---|
| **Revenue target lancio** | €[X] | Obiettivo primario |
| **Revenue minimo accettabile** | €[X] | Sotto questa soglia il lancio è un fallimento operativo |
| **Revenue stretch** | €[X] | Scenario ottimistico — trigger per scaling paid |

### 1.2 — Unit Economics del Lancio

Compila questa tabella prima di lanciare:

| Metrica | Valore | Come calcolarlo |
|---|---|---|
| **Prezzo prodotto** | €[X] | Definito in offer-design-pricing |
| **Vendite minime necessarie** | [N] | Revenue minimo / Prezzo |
| **Vendite target** | [N] | Revenue target / Prezzo |
| **Lista disponibile** | [N contatti] | Email list + audience raggiungibile |
| **CR email → opt-in atteso** | [%] | Benchmark: 10-25% lista calda |
| **CR opt-in → acquisto atteso** | [%] | Benchmark: 1-3% per lancio webinar |
| **Lead necessari** | [N] | Vendite target / CR opt-in→acquisto |
| **Gap lista** | [N] | Lead necessari - Lista disponibile |

**Regola**: Se il gap lista è significativo e non hai paid acquisition pianificata, il revenue target è irrealistico. Dichiara il problema prima di lanciare, non dopo.

### 1.3 — Vincoli Non Negoziabili

- **Data go-live**: [data]
- **Data chiusura carrello**: [data]
- **Finestra lancio**: [N giorni]
- **Budget paid acquisition**: €[X] o €0
- **Capacità di delivery**: [N studenti massimi gestibili]

---

## FASE 2 — ARCHITETTURA DELLA SEQUENZA

### 2.1 — Le 4 Macro-Fasi di Qualsiasi Lancio

```
PRE-LANCIO → LANCIO → CARRELLO → POST-LANCIO
(valore)      (offerta)  (urgenza)   (analisi)
```

**Fase 1 — Pre-lancio** (7-21 giorni prima)
Obiettivo: costruire valore percepito e anticipazione PRIMA di mostrare l'offerta.
- Contenuto educativo sul problema/soluzione (zero pitch)
- Social proof e case study in formato narrativo
- Teaser del prodotto senza reveal completo
- Raccolta opt-in per lista lancio segmentata

**Fase 2 — Lancio** (giorno 0)
Obiettivo: reveal dell'offerta completa con massima attenzione.
- Webinar live OPPURE email di apertura VSL
- Reveal prezzo dopo aver costruito il valore percepito
- Apertura carrello con early adopter pricing (48-72h)

**Fase 3 — Carrello aperto** (3-7 giorni)
Obiettivo: convertire i lead caldi, gestire le obiezioni, creare urgenza reale.
- Email sequenza obiezioni (una per giorno)
- Contenuto aggiuntivo di valore (non solo pitch)
- Scarcity reale comunicata con anticipo
- Sequenza di chiusura nelle ultime 24h

**Fase 4 — Chiusura e Post-lancio** (ultimo giorno + 7 giorni dopo)
Obiettivo: massimizzare le ultime vendite, analizzare i dati, preparare il prossimo step.
- Email chiusura carrello (sequenza 24h/6h/1h)
- Pagina di downsell o waitlist per chi non ha comprato
- Survey post-acquisto entro 48h
- Retroanalisi dati lancio entro 7 giorni

### 2.2 — Timeline Master

Costruisci la timeline specifica del lancio con questa struttura:

| Giorno | Fase | Azione | Canale | KPI da monitorare |
|---|---|---|---|---|
| -21 | Pre-lancio | [Azione] | [Email/Social] | [Metrica] |
| -14 | Pre-lancio | [Azione] | [Email/Social] | [Metrica] |
| -7 | Pre-lancio | [Azione] | [Email/Social] | [Metrica] |
| 0 | Lancio | Go-live offerta | [Tutti] | Vendite h1, h6, h24 |
| +1 | Carrello | [Azione] | Email | CR giornaliero |
| +3 | Carrello | [Azione] | Email | CR cumulativo |
| +5 | Chiusura | Sequenza close | Email | Vendite finestre |
| +7 | Post | Analisi | Interno | Tutti i KPI |

---

## FASE 3 — DASHBOARD KPI

### 3.1 — KPI per Fase

**Pre-lancio**
| KPI | Formula | Benchmark | Soglia allarme |
|---|---|---|---|
| Opt-in rate email | Opt-in / Email inviate | 15-25% lista calda | <10% |
| Crescita lista lancio | Nuovi opt-in / giorno | Dipende da traffico | Trend negativo |
| Open rate email pre-lancio | Aperture / Inviate | 30-45% lista calda | <20% |
| Engagement contenuto | Like/commenti/condivisioni | Baseline storica | -30% vs baseline |

**Lancio (giorno 0)**
| KPI | Formula | Benchmark | Soglia allarme |
|---|---|---|---|
| Vendite H1 | Vendite prima ora | 20-30% del totale lancio | <10% totale atteso |
| Vendite H24 | Vendite primo giorno | 40-50% del totale lancio | <25% totale atteso |
| CR checkout | Acquisti / Checkout aperti | 60-80% | <50% |
| Tasso rimborso | Rimborsi / Acquisti | <5% | >10% |

**Carrello aperto**
| KPI | Formula | Benchmark | Soglia allarme |
|---|---|---|---|
| CR giornaliero | Vendite giorno / Lead lista | 0.3-1% | <0.1% |
| CR cumulativo lancio | Vendite totali / Lead lista | 1-3% | <0.5% |
| Open rate email lancio | Aperture / Inviate | 25-40% | <15% |
| Click rate email | Click / Aperture | 5-15% | <3% |

**Post-lancio**
| KPI | Formula | Benchmark | Soglia allarme |
|---|---|---|---|
| Revenue totale | Vendite × Prezzo - Rimborsi | Target definito in F1 | <Revenue minimo |
| AOV | Revenue / Acquirenti | Prezzo + order bump | = Prezzo base only |
| Costo acquisizione (se paid) | Spesa ads / Acquirenti | <30% prezzo prodotto | >50% prezzo prodotto |
| NPS early | Survey 48h post-acquisto | >7/10 | <5/10 |

### 3.2 — Review Cadence

| Frequenza | Durata | Focus | Chi decide |
|---|---|---|---|
| **Giornaliera** (durante lancio) | 20 min | KPI giornalieri vs target, anomalie | Founder |
| **Settimanale** | 60 min | Trend, aggiustamenti tattici, performance canali | Founder + team |
| **Post-lancio** | 120 min | Retroanalisi completa, decisioni per lancio successivo | Founder |

---

## FASE 4 — KILL CRITERIA & PROTOCOLLI DI DIAGNOSI

Questa è la sezione più importante per proteggere il business. I kill criteria sono soglie pre-definite che attivano protocolli specifici — non decisioni prese sotto pressione emotiva durante il lancio.

### 4.1 — Kill Criteria per Livello

**LIVELLO 1 — Allarme** (monitora e aggiusta)
Attivato quando uno o più KPI sono in zona allarme ma il lancio è ancora recuperabile.

Trigger:
- Vendite H24 < 25% del target giornaliero
- Open rate email < 15%
- CR checkout < 50%

Protocollo:
1. Identifica il collo di bottiglia (traffico? conversion? checkout?)
2. Esegui diagnosi rapida (vedi 4.2)
3. Implementa aggiustamento tattico entro 24h
4. Monitora per altre 24h prima di escalare

**LIVELLO 2 — Intervento** (cambia tattica attiva)
Attivato quando il Livello 1 non ha risolto o i KPI sono criticamente sotto soglia.

Trigger:
- Revenue cumulativo dopo 48h < 30% del target totale
- CR cumulativo < 0.3% dopo 3 giorni di carrello
- Tasso rimborso > 10%

Protocollo:
1. Aggiungi bonus non previsto per aumentare valore percepito
2. Estendi la finestra di early adopter con motivazione credibile
3. Invia email personale (tono diverso — non broadcast)
4. Valuta downsell a prezzo inferiore per recuperare conversioni

**LIVELLO 3 — Stop** (interrompi o ridimensiona)
Attivato quando il lancio non è recuperabile nei termini originali.

Trigger:
- Revenue proiettato a fine lancio < Revenue minimo accettabile (definito in F1)
- Problema tecnico grave non risolvibile entro 4h (Stripe, email, piattaforma)
- Evento esterno che rende il lancio inappropriato

Protocollo:
1. Chiudi il carrello anticipatamente con comunicazione trasparente
2. Offri waitlist per prossimo lancio
3. Analizza causa root (non cercare colpevoli — cerca il sistema rotto)
4. Non lanciare di nuovo senza aver identificato e corretto il problema

### 4.2 — Albero di Diagnosi

Quando le vendite sono sotto soglia, segui questo albero prima di agire:

```
VENDITE BASSE
│
├── Traffico insufficiente? (opt-in sotto target)
│   ├── SÌ → Problema di acquisizione: più contenuto, paid, outreach
│   └── NO → vai avanti
│
├── Engagement basso? (open rate < 15%, click rate < 3%)
│   ├── SÌ → Problema di copy o lista fredda: testa subject diverso, segmenta
│   └── NO → vai avanti
│
├── Click ma no acquisto? (traffico sales page ma CR basso)
│   ├── SÌ → Problema di offerta o pricing: rivedi stack, aggiungi bonus, testa prezzo
│   └── NO → vai avanti
│
├── Checkout aperto ma no completamento? (CR checkout < 50%)
│   ├── SÌ → Problema tecnico o attrito: testa checkout, verifica Stripe, semplifica
│   └── NO → vai avanti
│
└── Tutto funziona ma volume basso?
    └── Problema di dimensione lista o awareness: il lancio è troppo presto
        → Valuta estensione pre-lancio o cambio target
```

### 4.3 — Piano Incidenti Tecnici

| Scenario | Probabilità | Protocollo | Tempo max risoluzione |
|---|---|---|---|
| Stripe down | Bassa | Switch a PayPal temporaneo + email lista | 2h |
| Link email rotti | Media | Resend con link corretto + scusa breve | 1h |
| Piattaforma corso down | Bassa | Comunicazione proattiva + timeline fix | 4h |
| Email non consegnate | Media | Verifica dominio, switch provider se critico | 2h |
| Webinar non funziona | Media | Switch a Zoom backup + comunicazione real-time | 30min |

---

## FASE 5 — SEZIONI SPECIALI

### 5A — Lancio Verticale (upgrade buyer esistenti)

Quando il target è la lista buyer del corso base:

**Differenze operative chiave**:
- Pre-lancio più corto (3-5 giorni) — la fiducia è già costruita
- Nessun bisogno di rebuild della promessa centrale — vai diretto al beneficio incrementale
- Pricing: usa la logica di upgrade (sconto per chi ha già comprato il base)
- Email: tono di comunità, non di acquisition. "Sei già dentro, questo è il passo successivo"
- KPI target più alti: CR atteso 5-10% (lista calda di buyer vs lista fredda)

**Sequenza semplificata**:
- Giorno -3: teaser esclusivo per buyer
- Giorno -1: reveal offerta con prezzo upgrade
- Giorno 0: apertura carrello
- Giorno +3: chiusura con reminder finale

### 5B — Membership Launch (da one-shot a recurring)

Quando l'obiettivo è convertire buyer one-shot in membri ricorrenti:

**Differenze operative chiave**:
- La proposta di valore non è "impara qualcosa di nuovo" ma "resta aggiornato + community + accesso continuo"
- Founder Plan: i primi N posti a prezzo bloccato per sempre — crea urgenza reale e premia i early adopter
- Framing: non è un costo mensile — è un investimento a rendimento continuo
- KPI specifici: MRR acquisito nel lancio, churn atteso mese 2-3, LTV proiettato

**Sequenza semplificata**:
- Giorno -7: comunicazione ai buyer dell'apertura imminente
- Giorno -3: reveal del Founder Plan e benefici esclusivi
- Giorno 0: apertura con posti limitati reali
- Giorno +5: chiusura Founder Plan (prezzi salgono o posti esauriti)

---

## FASE 6 — DOCUMENTO LAUNCH PLAN FINALE

Dopo le fasi di analisi, produci il documento in questo formato:

---

### LAUNCH PLAN — [Nome Prodotto] — [Data Lancio]
*Versione: [data] | Tipologia: [Webinar/Evergreen/Verticale/Membership]*

#### OBIETTIVI
- Revenue target: €[X]
- Revenue minimo: €[X]
- Vendite target: [N]
- Vendite minime: [N]
- Finestra lancio: [N giorni] — dal [data] al [data]

#### UNIT ECONOMICS
[Tabella da Fase 1.2]

#### TIMELINE MASTER
[Tabella da Fase 2.2]

#### KPI DASHBOARD
[Tabelle da Fase 3.1 con valori specifici del lancio]

#### KILL CRITERIA ATTIVI
- Livello 1 trigger: [KPI specifici con valori]
- Livello 2 trigger: [KPI specifici con valori]
- Livello 3 trigger: [KPI specifici con valori]

#### PIANO INCIDENTI
[Tabella da Fase 4.3]

#### IPOTESI DA VALIDARE
- [ ] [Ipotesi CR] — come misurare
- [ ] [Ipotesi lista] — come verificare
- [ ] [Ipotesi pricing] — come testare

---

## REGOLE OPERATIVE

1. **Numeri prima della sequenza**: Non esiste una sequenza di lancio senza obiettivi numerici definiti. La Fase 1 è obbligatoria — non saltarla.
2. **Kill criteria pre-definiti**: I protocolli di risposta si decidono PRIMA del lancio, non durante. Durante il lancio si eseguono, non si progettano.
3. **Scarcity reale**: Qualsiasi meccanismo di urgenza usato deve avere una motivazione credibile e reale. Vedi offer-design-pricing per i principi.
4. **Review cadence rispettata**: La review giornaliera di 20 minuti durante il lancio non è opzionale. È il sistema di early warning.
5. **Post-lancio obbligatorio**: La retroanalisi entro 7 giorni non è celebrazione né autopsia — è il sistema di apprendimento per il lancio successivo.
6. **Italia come frizione**: Proof system più importante, fiducia più lenta da costruire, ticket medio più conservativo. Questi parametri influenzano i benchmark KPI — non la struttura del lancio.

---

## SALVATAGGIO OUTPUT

Al termine della sessione, salva il documento prodotto (Fase 6 — Launch Plan) in:

```
src/funnels/<funnel-slug>/context/launch-execution.md
```

Se la cartella `context/` non esiste ancora, creala. Questo documento è il riferimento operativo durante tutta la durata del lancio.
