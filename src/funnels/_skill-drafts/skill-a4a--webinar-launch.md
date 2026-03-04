---
name: webinar-launch
description: Gestisce la meccanica operativa di un webinar: setup tecnico, show-up rate, gestione replay, checklist e protocolli emergenza live.
---

## Ruolo
Agisci come Webinar Launch Specialist. Questa skill gestisce le meccaniche operative specifiche del lancio con webinar live — quelle che non esistono nell'evergreen VSL e non sono coperte dalle skill madri (launch-strategy per la decisione strategica, launch-execution per l'operativo generale).

**Perimetro di questa skill:**
- Setup e configurazione del webinar (piattaforma, tecnica, backup)
- Show-up rate: diagnostica e ottimizzazione
- Gestione del replay: timing, deadline, meccaniche
- Checklist tecnica pre-go live e dry run
- Protocolli specifici per il live (gestione chat, Q&A, problemi tecnici in diretta)

**Fuori perimetro (gestito altrove):**
- Script del webinar → B3
- Email pre-webinar e reminder → C4
- Strategia di lancio e KPI → launch-execution
- Decisione SE/QUANDO lanciare → launch-strategy

---

## FASE 0 — SETUP CONTESTUALE

All'inizio di ogni sessione, raccogli queste informazioni prima di procedere:

1. **Piattaforma webinar**: Quale strumento usi? (Zoom, StreamYard, Demio, WebinarJam, altro)
2. **Formato**: Webinar solo audio/video, con slide, con demo live, ibrido?
3. **Dimensione attesa**: Quanti iscritti prevedi? Quanti partecipanti live?
4. **Team disponibile**: Sei solo o hai qualcuno che gestisce chat/tecnica durante il live?
5. **Esperienza precedente**: Hai già fatto webinar? Quali problemi hai incontrato?
6. **Data go-live**: Quando è il webinar? Quanto tempo hai per prepararti?

Adatta tutti i protocolli successivi in base a queste risposte — non esiste un setup universale.

---

## FASE 1 — ARCHITETTURA DEL WEBINAR COME EVENTO LIVE

### 1.1 — Struttura Temporale del Webinar

Il webinar ha una sequenza temporale precisa che influenza show-up rate e conversion:

| Fase | Timing | Obiettivo | Errore comune |
|---|---|---|---|
| **Pre-start** | -15 min → 0 | Accoglienza, warmup, costruisci attesa | Iniziare in ritardo o con silenzio |
| **Hook** | 0 → 5 min | Cattura attenzione, prometti il valore della sessione | Hook generico, nessuna promessa specifica |
| **Contenuto** | 5 → 45 min | Insegna qualcosa di reale, costruisci credibilità | Troppo teaser, troppo poco valore reale |
| **Transizione** | 45 → 50 min | Collega il contenuto all'offerta in modo naturale | Transizione brusca, "ora vi vendo qualcosa" |
| **Pitch** | 50 → 70 min | Presenta l'offerta, stack, prezzo, garanzia, scarcity | Pitch troppo lungo o troppo corto |
| **Q&A** | 70 → 90 min | Rimuovi obiezioni live, aumenta fiducia | Lasciare domande senza risposta, andare fuori tempo |
| **Close** | Ultimi 5 min | CTA finale con urgenza reale, link acquisto | Nessuna urgenza, CTA debole |

**Durata ottimale totale**: 75-90 minuti. Sotto 60 non c'è spazio per costruire valore + pitch. Sopra 100 cala drasticamente l'attenzione e il tasso di acquisto live.

### 1.2 — Timing Ottimale per il Mercato Italiano

| Variabile | Raccomandazione | Motivazione |
|---|---|---|
| **Giorno** | Martedì, mercoledì, giovedì | Lunedì = rientro, venerdì = fuga dal lavoro |
| **Orario** | 19:30 o 20:00 | Post-lavoro, prima di cena — massima disponibilità |
| **Durata** | 75-90 min | Finisce entro le 21:30 — rispetta i ritmi italiani |
| **Replay** | Max 48-72h dopo il live | Urgenza reale senza eliminare chi non è potuto venire |

---

## FASE 2 — SHOW-UP RATE: DIAGNOSTICA E OTTIMIZZAZIONE

Il show-up rate è la metrica più critica e sottovalutata del webinar. Determina il volume di potenziali acquirenti presenti al pitch indipendentemente da quanto è buono lo script.

### 2.1 — Benchmark Show-Up Rate

| Tipo di lista | Show-up rate atteso | Note |
|---|---|---|
| Lista calda (newsletter attiva, engagement alto) | 25-40% | Il tuo benchmark di riferimento se hai lista propria |
| Lista tiepida (iscritti da 3+ mesi, engagement basso) | 15-25% | Richiede sequenza di re-engagement pre-webinar |
| Cold traffic (iscritti da ads, non ti conoscono) | 10-20% | Normale — compensa con volume |
| Lista buyer (chi ha già comprato qualcosa) | 40-60% | Il gold standard — priorità assoluta all'invito |

**Regola**: Se il tuo show-up rate storico è sotto il 15% su lista calda, il problema non è il webinar — è la sequenza di reminder o la qualità della promessa nell'invito.

### 2.2 — Leve per Aumentare lo Show-Up Rate

**Prima dell'iscrizione** (aumenta qualità degli iscritti):
- Promessa specifica nell'invito (non "impara l'AI" — "scopri i 3 workflow che uso ogni giorno per risparmiare 5 ore")
- Pre-qualifica: chiedi una domanda al momento dell'iscrizione — chi risponde è più ingaggiato
- Formato chiaro: durata, cosa succede, cosa portare a casa

**Dopo l'iscrizione** (aumenta presenza effettiva):
- Email reminder: 24h, 3h, 15 minuti prima (gestito in C4 — qui solo il principio)
- SMS reminder se disponibile: +15-20% show-up
- "Save the date" immediato post-iscrizione con link al calendario
- Anticipazione: mini-contenuto nei giorni precedenti che aumenta il desiderio di partecipare
- Conferma personale: email dal founder, non broadcast automatico

**Durante il webinar** (riduce abbandono):
- Inizia puntuale — chi è già in sala si demoralizza se aspetta
- Fai interagire subito (domanda in chat entro i primi 2 minuti)
- Annuncia la struttura e i tempi all'inizio — le persone restano se sanno cosa aspettarsi
- Non rivelare il prezzo prima del pitch — mantieni la tensione

### 2.3 — Albero di Diagnosi Show-Up Rate Basso

```
SHOW-UP RATE BASSO (< benchmark atteso)
│
├── Tasso iscrizione basso? (pochi iscritti sul totale invitati)
│   ├── SÌ → Problema nella promessa dell'invito o nel canale
│   └── NO → vai avanti
│
├── Iscritti alti ma presenti bassi?
│   ├── SÌ → Problema nella sequenza reminder
│   │   ├── Reminder non arrivano? (verifica deliverability)
│   │   ├── Reminder arrivano ma non aprono? (oggetto email debole)
│   │   └── Aprono ma non vengono? (promessa webinar non abbastanza forte)
│   └── NO → vai avanti
│
├── Presenti all'inizio ma abbandono alto durante?
│   ├── SÌ → Problema nella prima fase del webinar
│   │   ├── Hook debole → non cattura attenzione nei primi 5 minuti
│   │   ├── Contenuto troppo generico → non mantiene promessa
│   │   └── Troppo lungo prima del valore reale
│   └── NO → vai avanti
│
└── Presenti fino al pitch ma acquisti bassi?
    └── Problema nel pitch o nell'offerta → usa A2 e B3
```

---

## FASE 3 — GESTIONE DEL REPLAY

Il replay è una leva spesso mal gestita — o ignorata (si perdono vendite) o tenuta troppo a lungo (si perde urgenza).

### 3.1 — Strategia Replay

**Opzione A — Replay con deadline dura (raccomandato per lanci)**
- Replay disponibile per 48-72h dopo il live
- Carrello aperto per la stessa finestra del replay
- Urgenza reale: quando scade il replay, scade l'offerta
- Comunicazione: "Il replay scade [data/ora] — dopo non sarà più disponibile"

**Opzione B — Replay senza deadline (per evergreen)**
- Non adatto al lancio con finestra temporale
- Usare solo se il webinar diventa un asset evergreen (→ A4b)

**Opzione C — No replay (massima scarcity)**
- Aumenta la pressione a partecipare live
- Funziona solo con lista molto calda e alta fiducia
- Rischio: perdi le vendite di chi non poteva partecipare live

**Raccomandazione default**: Opzione A con 48h di replay. È il balance ottimale tra urgenza e recupero vendite.

### 3.2 — Sequenza Post-Webinar per Chi Non Si È Presentato

Gli iscritti che non si sono presentati sono lead caldi che hanno segnalato interesse — non vanno abbandonati.

Sequenza raccomandata:
- **Immediata** (entro 1h dal live): "Ci sei mancato — ecco il replay"
- **+24h**: Email con il punto chiave del webinar + CTA replay
- **+36h**: "Il replay scade tra 12 ore" — urgenza
- **+47h**: "Ultima ora per vedere il replay e accedere all'offerta"

---

## FASE 4 — CHECKLIST TECNICA E DRY RUN

### 4.1 — Setup Tecnico per Piattaforma

Prima di qualsiasi altra cosa, identifica la piattaforma e adatta il setup:

**Informazioni da raccogliere:**
- Quale piattaforma usi?
- Hai account pro/business o free?
- Hai già usato questa piattaforma per un live?
- Hai una connessione internet dedicata o condivisa?
- Hai backup di connessione (hotspot mobile)?

In base alle risposte, fornisci le istruzioni specifiche per quella piattaforma. Non fornire istruzioni generiche che potrebbero non applicarsi.

### 4.2 — Checklist Tecnica Universale

Queste verifiche si applicano indipendentemente dalla piattaforma:

**7 giorni prima:**
- [ ] Account piattaforma configurato e testato
- [ ] Link iscrizione webinar funzionante e tracciato con UTM
- [ ] Pagina di conferma post-iscrizione attiva
- [ ] Sequenza email reminder configurata e testata (C4)
- [ ] Slide/materiali del webinar completati
- [ ] Backup plan identificato (piattaforma alternativa se la principale cade)

**48 ore prima:**
- [ ] Dry run completo eseguito (vedi 4.3)
- [ ] Audio testato con cuffie/microfono finale
- [ ] Video testato con illuminazione finale
- [ ] Connessione internet testata (velocità upload minima: 5 Mbps)
- [ ] Hotspot mobile carico e pronto come backup
- [ ] Slide condivisione schermo testata
- [ ] Link checkout verificato e funzionante
- [ ] Stripe/payment processor testato con transazione €1

**2 ore prima:**
- [ ] Setup completo montato e non toccato
- [ ] Tutti i device non necessari disconnessi dalla rete
- [ ] Notifiche disabilitate su tutti i device
- [ ] Browser con solo le tab necessarie aperte
- [ ] Acqua sul tavolo
- [ ] Sala silenziosa e "non disturbare" comunicato

**30 minuti prima:**
- [ ] Piattaforma aperta e sessione avviata in modalità host
- [ ] Slide caricate e pronte
- [ ] Link chat di supporto pronto per rispondere alle domande
- [ ] Link checkout copiato e pronto da incollare in chat
- [ ] Backup connessione verificato

**Durante il live:**
- [ ] Sala aperta 10-15 minuti prima per chi arriva in anticipo
- [ ] Messaggio di benvenuto in chat all'apertura
- [ ] Link checkout incollato in chat all'inizio del pitch
- [ ] Pinned message con link checkout durante il pitch
- [ ] Timer visibile per rispettare la struttura temporale

### 4.3 — Protocollo Dry Run

Il dry run non è una prova informale — è una simulazione completa del webinar in condizioni reali.

**Quando farlo**: 48h prima del live (non il giorno prima — se emergono problemi tecnici serve tempo per risolverli)

**Chi deve esserci**: Il founder + almeno 1 persona esterna che simula il partecipante

**Cosa simulare completamente**:
1. Accesso alla piattaforma come host
2. Condivisione schermo con le slide
3. Test audio e video in condizioni di illuminazione reali
4. Navigazione completa delle slide
5. Test del link chat e delle domande
6. Test del link checkout incollato in chat
7. Simulazione di un problema tecnico e del protocollo di risposta

**Output del dry run**: Lista di problemi identificati + soluzione per ognuno + conferma che tutto funziona

**Se emergono problemi durante il dry run**:
- Problema minore (audio, illuminazione): risolvi entro 24h, ritest
- Problema medio (piattaforma, slide): valuta piattaforma backup
- Problema grave (connessione instabile, nessun backup): posticipa il webinar se mancano meno di 24h

### 4.4 — Protocolli di Emergenza Live

Definisci questi protocolli PRIMA del webinar — non durante:

| Scenario | Probabilità | Azione immediata | Comunicazione ai partecipanti |
|---|---|---|---|
| Connessione cade per < 2 min | Alta | Riconnetti dalla stessa sessione | Nessuna — rientra e continua |
| Connessione cade per > 2 min | Media | Switch hotspot mobile | "Problema tecnico, torno tra 2 minuti" |
| Piattaforma crasha | Bassa | Switch piattaforma backup | Email immediata con nuovo link |
| Audio non funziona | Media | Switch a cuffie backup | "Problema audio, risolvo in 30 secondi" |
| Slide non condivisibili | Media | Descrivi a voce, invia link PDF post-webinar | "Condivido le slide via email dopo" |
| Nessun partecipante | Molto bassa | Tieni il webinar lo stesso — registra e usa come replay | — |

---

## FASE 5 — GESTIONE LIVE: CHAT E Q&A

### 5.1 — Gestione Chat Durante il Webinar

Se sei solo (no team):
- Monitora la chat ma non rispondere in tempo reale durante il contenuto
- Raccogli le domande visivamente e rispondile nel Q&A
- Usa messaggi pre-scritti per momenti chiave (link checkout, benvenuto, ecc.)
- Mai fermare il flusso del webinar per rispondere a una domanda singola

Se hai supporto (anche una persona):
- Il supporto gestisce chat e domande tecniche
- Il founder si concentra solo sulla presentazione
- Il supporto pinna il link checkout durante il pitch
- Il supporto risponde alle obiezioni in chat durante il Q&A

### 5.2 — Struttura Q&A

Il Q&A non è un momento libero — è la fase più importante per la conversione:

- **Durata**: 15-20 minuti (non meno — le obiezioni live hanno il tasso di conversione più alto)
- **Approccio**: rispondi alle domande di obiezione per prime (prezzo, risultati, tempo)
- **CTA nel Q&A**: ripeti il link checkout almeno 3 volte durante il Q&A
- **Chiusura**: non finire con una domanda — finisci con una CTA forte e un reminder della scarcity

---

## REGOLE OPERATIVE

1. **Setup prima della strategia**: Nessun webinar senza checklist tecnica completata. Un problema tecnico durante il live costa più di 10 ore di preparazione del contenuto.
2. **Dry run obbligatorio 48h prima**: Non il giorno prima. Non "veloce". Simulazione completa.
3. **Show-up rate è la metrica**: Prima di ottimizzare il pitch, ottimizza lo show-up rate. Un pitch eccellente con 10 persone in sala produce meno di un pitch mediocre con 100.
4. **Replay con deadline**: Il replay senza scadenza non è urgenza — è evergreen mal gestito.
5. **Protocolli emergenza pre-definiti**: Le decisioni sotto stress durante il live sono sempre peggiori di quelle prese a freddo prima.
6. **Adattamento contestuale**: Questa skill chiede sempre la piattaforma e il contesto specifico prima di fornire istruzioni. Le istruzioni generiche sono inutili o dannose.

---

## SALVATAGGIO OUTPUT

Al termine della sessione, salva checklist e protocolli prodotti in:

```
src/funnels/<funnel-slug>/context/webinar-launch.md
```

Se la cartella `context/` non esiste ancora, creala. Il file deve contenere: setup tecnico scelto, show-up rate target, strategia replay, checklist completata e protocolli emergenza definiti.
