# MORFEUS — CURSOR BRIEF
## Funnel Pre-Call: Specifiche Tecniche Complete

---

## 0. CONTESTO

Stai costruendo le pagine web del funnel pre-call di Morfeus (morfeushub.com).

Morfeus è un AI Operating Partner per aziende italiane in scaling. Il funnel pre-call serve a preparare un prospect che ha appena prenotato una discovery call. Le pagine vengono mostrate dopo la prenotazione — non sono pagine pubbliche.

**Stack esistente:** Next.js. Il sito è già costruito con stile, font, colori e componenti definiti. **Non reinventare lo stile. Usare i componenti, le variabili CSS e il sistema di design già presenti nel progetto.**

**Lingua:** Tutto in italiano.

---

## 1. PAGINE DA COSTRUIRE

| # | Pagina | Route | Priorità |
|---|--------|-------|----------|
| 1 | Thank You Page | `/it/call-confermata` | ALTA — prima da costruire |
| 2 | Caso Studio Sales (default) | `/it/casi-studio/sales` | ALTA |
| 3 | Caso Studio Operations & Dati | `/it/casi-studio/operations` | MEDIA |
| 4 | Caso Studio Amministrativo | `/it/casi-studio/amministrativo` | MEDIA |
| 5 | Caso Studio E-commerce | `/it/casi-studio/ecommerce` | MEDIA |
| 6 | Caso Studio Info Business | `/it/casi-studio/info-business` | MEDIA |

---

## 2. PAGINA 1 — THANK YOU PAGE

**Route:** `/it/call-confermata`

**Trigger:** Redirect automatico da Calendly/booking system dopo la prenotazione.

### 2.1 Parametri URL attesi

| Parametro | Tipo | Esempio | Comportamento |
|-----------|------|---------|---------------|
| `name` | string | `Marco` | Mostrare nella headline |
| `date` | string | `Lunedì 24 Marzo` | Mostrare nel blocco data/ora |
| `time` | string | `15:00` | Mostrare nel blocco data/ora |
| `source` | string | `linkedin` o `cold_email` | Determina quale video mostrare |
| `form` | string | `complete` | Se presente, nasconde il form e mostra stato B |

**Tutti i parametri sono opzionali.** La pagina deve funzionare anche senza parametri, con fallback graceful.

### 2.2 Struttura sezioni

#### SEZIONE 1 — Hero

```
Badge verde: "Prenotazione confermata" (con dot animato verde)

Pre-title (Forge color, uppercase): "La tua call con Morfeus"

Headline (dinamica con parametro ?name):
  SE name presente: "Ciao [name], grazie di aver prenotato la tua chiamata."
  SE name assente: "Grazie di aver prenotato la tua chiamata."

Blocco data/ora (pill con bordo sottile):
  SE date e time presenti: "[date] · [time] · 30 minuti"
  SE assenti: "Call confermata · 30 minuti"
```

#### SEZIONE 2 — Video

```
Label (Majorelle, uppercase): "Prima della call"

Headline: "Lasciaci presentare."

Player video (embed iframe — YouTube o Vimeo):
  SE ?source=linkedin → embed video LinkedIn (URL: [PLACEHOLDER_VIDEO_LINKEDIN])
  SE ?source=cold_email → embed video Cold Email (URL: [PLACEHOLDER_VIDEO_COLDEMAIL])
  SE source assente o altro valore → embed video LinkedIn (default)
  
  Il container video deve avere aspect-ratio 16/9, bordo sottile Majorelle,
  border-radius 16px. Usare iframe embed standard YouTube/Vimeo.
  
  Finché i video non sono caricati, mostrare un placeholder con:
  - Icona play (cerchio Majorelle)
  - Testo: "Video in arrivo"

Testo sotto il player:
  "In questo video ci presentiamo, ti spieghiamo come lavoriamo
  e ti mostriamo cosa facciamo concretamente —
  così arrivi alla call già con il contesto giusto."
```

#### SEZIONE 3 — Agenda della Call

```
Label: "Cosa faremo insieme"
Headline: "30 minuti. Tre cose."
Sottotitolo: "Non è una presentazione. È una sessione di lavoro."

Tre card affiancate (grid 3 colonne, responsive → 1 colonna mobile):

  Card 1:
    Step label (Majorelle): "01 · Diagnosi"
    Titolo: "Capire dove perdi margine senza saperlo."
    Body: "Partiamo dal tuo contesto. Processi, team, punti di attrito. Numeri, non teoria."

  Card 2:
    Step label: "02 · Valutazione"
    Titolo: "Capire se e come possiamo aiutarti."
    Body: "Se vediamo spazio di intervento reale, te lo diciamo con i numeri. Se non c'è fit, te lo diciamo lo stesso."

  Card 3:
    Step label: "03 · Prossimo passo"
    Titolo: "Decidere insieme cosa ha senso fare."
    Body: "Usciamo con una direzione. O costruiamo qualcosa insieme, o esci con più chiarezza di prima."

Disclaimer sotto le card (bordo sinistro Forge):
  "Non è una demo del prodotto. Non è una call di vendita.
  Non è per chi cerca informazioni generiche.
  È per chi sente che nella propria azienda qualcosa non torna — e vuole capire dove."
```

#### SEZIONE 4 — Come Prepararti

```
Layout a due colonne: testo a sinistra, punti a destra. Responsive → colonna unica.

Colonna sinistra:
  Label: "Prima di collegarti"
  Headline: "Come prepararti. Cinque minuti adesso valgono trenta minuti in call."
  Sottotitolo: "Non chiediamo nessun documento. Non c'è nessun test.
  Basta che tu arrivi con la testa nel posto giusto."

Colonna destra (quattro punti con icona + titolo + body):

  Punto 1:
    Icona: 🎯
    Titolo: "Identifica una cosa che non riesci a misurare."
    Body: "C'è sempre un'area dell'azienda dove senti che si perde qualcosa, ma non riesci a quantificarlo. Sales, operations, dati. Portala alla call."

  Punto 2:
    Icona: 🔁
    Titolo: "Pensa al problema che si ripete."
    Body: "Non cerchiamo la crisi del momento. Cerchiamo quello che succede ogni settimana, ogni mese, e che non è mai risolto davvero."

  Punto 3:
    Icona: 💬
    Titolo: "Porta un esempio concreto, non un'opinione."
    Body: "\"Penso che il problema sia nel commerciale\" vale poco.
    \"Abbiamo chiuso 3 clienti su 20 contatti questo mese e non so perché\" vale molto."

  Punto 4:
    Icona: 🚫
    Titolo: "Lascia fuori le domande generiche sull'AI."
    Body: "Non siamo qui per spiegare cos'è l'intelligenza artificiale. Siamo qui per capire dove la tua azienda perde e come chiudere quel buco."
```

#### SEZIONE 5 — Credibilità

```
Label: "Chi siamo"
Headline: "Non una consulenza. Un team embedded."

Testo:
  "Lavoriamo con aziende italiane in scaling tra €5M e €100M di fatturato.
  Entriamo dentro l'operatività, troviamo dove si perde margine, e lo chiudiamo.
  Ogni mese consegniamo un numero in euro: quanto abbiamo prodotto.
  Non slide. Numeri."

Tre stat pill affiancate:
  "€5M – €100M · Fatturato delle aziende clienti"
  "60 gg · Way-out clause — zero lock-in"
  "€0 · In slide. Solo numeri reali."

Label loghi: "Alcune aziende con cui lavoriamo"
Loghi: [PLACEHOLDER — inserire img tag con i PNG white dei loghi clienti]
  I loghi esistono già nella cartella assets del progetto come PNG white on transparent.
  Usare filter: grayscale(1) brightness(1.8) opacity: 0.5 sulla row dei loghi.
```

#### SEZIONE 6 — CTA / Form

**Stato A — Form da compilare (default, quando ?form != 'complete')**

```
Pre-label: "Due minuti. Adesso."
Headline: "Aiutaci ad arrivare preparati quanto te."
Sottotitolo: "Tre domande veloci. Servono al nostro team per entrare nella call già
con il contesto giusto sul tuo business. Niente CRM, niente commerciale, niente spam."

Form — 4 campi visibili + hidden fields:

  Campo 1: Settore (select, required)
    Opzioni: Manufacturing / Produzione | Servizi B2B | Tech / SaaS |
             Retail / E-commerce | Info Business / Formazione | Altro

  Campo 2: Fatturato annuo (select, required)
    Opzioni: €1M – €5M | €5M – €10M | €10M – €25M |
             €25M – €50M | €50M – €100M | Oltre €100M

  Campo 3: Dove senti più attrito? (select, required)
    Opzioni: Sales / Commerciale | Operations / Processi |
             Dati / Decisioni / Reporting | Area Amministrativa | Marketing | Altro

  Campo 4: In una frase: il problema che si ripete (textarea, required)
    Placeholder: "Es. \"Chiudiamo meno del 20% dei preventivi e non capisco perché\"
    oppure \"I dati ci arrivano tardi e le decisioni si prendono senza numeri\""

  Hidden fields:
    - source: valore dal parametro URL ?source (default: '')
    - call_date: valore dal parametro URL ?date (default: '')
    - call_time: valore dal parametro URL ?time (default: '')

CTA bottone: "Invia e chiudi il ciclo"  →  (arrow icon)
Nota sotto: "Nessun uso commerciale dei dati. Servono solo per la call."

SUBMIT HANDLER:
  - Raccogliere i dati del form
  - POST a: [ENDPOINT_MARF_PLACEHOLDER] — lasciare come costante configurabile
  - In caso di successo: nascondere Stato A, mostrare Stato B (senza reload pagina)
  - In caso di errore: mostrare messaggio errore inline, non bloccare
  - Passare sempre tutti i dati inclusi i hidden fields
```

**Stato B — Form già compilato**

Condizioni di attivazione:
1. Submit del form completato con successo
2. Parametro URL `?form=complete` presente al caricamento

```
Icona check verde (cerchio con ✓)
Headline: "Sei pronto."
Testo:
  "Abbiamo tutto quello che ci serve.
  Il nostro team arriverà alla call già con il tuo contesto.
  Adesso tocca a te: metti la call in calendario e presentati."

Blocco data/ora ripetuto:
  SE date e time disponibili: "[date] · [time]"
  SE non disponibili: mostrare solo "Call confermata"
```

---

## 3. PAGINE 2-6 — CASO STUDIO

**Struttura identica per tutte e 5 le pagine.** Solo il contenuto cambia.

### 3.1 Struttura sezioni

#### SEZIONE 1 — Hero

```
Label (Majorelle, uppercase): [vedi tabella contenuti §4.3]
Headline: [vedi tabella contenuti §4.3]
Sottotitolo: [vedi tabella contenuti §4.3]

VIDEO EMBED (iframe YouTube o Vimeo) — immediatamente dopo il sottotitolo, before/above fold:
  Placeholder: container 16/9 con bordo Majorelle e testo "[VIDEO — da inserire]"
  Ogni pagina ha il suo video specifico.
```

#### SEZIONE 2 — Il Problema

```
Label: "Il Problema"
Headline: [vedi tabella contenuti §4.3]
Testo: [vedi tabella contenuti §4.3]
```

#### SEZIONE 3 — L'Intervento

```
Label: "L'Intervento"
Headline: [vedi tabella contenuti §4.3]
Testo: [vedi tabella contenuti §4.3]
```

#### SEZIONE 4 — I Risultati

```
Label: "I Risultati"
Headline: [vedi tabella contenuti §4.3] — sempre formato: "[N] mesi." o "[N] settimane."

Metriche — layout righe:
  [Label metrica]    [Valore prima]  →  [Valore dopo]  · (timeframe)
  
  Stile: label bold Night, freccia muted, valore dopo Majorelle bold, timeframe Light italic
  
  [vedi tabella contenuti §4.3 per le metriche di ogni pagina]
```

#### SEZIONE 5 — La Voce del Cliente

```
Citazione:
  Bordo sinistro spesso Forge
  Testo in corsivo, size leggermente più grande del body
  Formato: "[testo citazione]"

Attribuzione sotto: [ruolo, settore, città]
```

#### SEZIONE 6 — CTA Tripla

```
Label: "Continua ad approfondire"
Headline: "Tre modi per arrivare alla call ancora più preparato."

Tre blocchi affiancati (grid 3 colonne, responsive → colonna unica):

  Blocco 1 — Newsletter:
    Titolo: "AI Espresso"
    Body: "La newsletter settimanale di Matteo Arnaboldi su AI e operatività aziendale."
    Link: "matteoarnaboldi.substack.com"  (apre in nuova tab)

  Blocco 2 — Webinar:
    Titolo: "Webinar Morfeus"
    Body: "Guarda la registrazione del nostro ultimo webinar: come trovare le perdite di margine invisibili in un'azienda in scaling."
    Link: "[PLACEHOLDER_WEBINAR_URL]"  (apre in nuova tab)

  Blocco 3 — LinkedIn:
    Titolo: "LinkedIn"
    Body: "Seguici per contenuti settimanali su AI, operazioni e scaling."
    Link: "linkedin.com/company/morfeus"  (apre in nuova tab)

Nessun bottone CTA commerciale in questa sezione.
```

### 3.2 Routing — quale pagina viene mandata

La logica di routing è gestita dalla sequenza email (esterna a queste pagine). Le pagine sono statiche. Il routing si basa sulla risposta al campo "area di attrito" nel form della Thank You Page.

| Risposta form | Pagina |
|---------------|--------|
| Sales / Commerciale | `/it/casi-studio/sales` |
| Operations / Processi | `/it/casi-studio/operations` |
| Dati / Decisioni | `/it/casi-studio/operations` |
| Area Amministrativa | `/it/casi-studio/amministrativo` |
| Retail / E-commerce (settore) | `/it/casi-studio/ecommerce` |
| Info Business / Formazione (settore) | `/it/casi-studio/info-business` |
| Form non compilato | `/it/casi-studio/sales` (default) |

### 3.3 Contenuti per pagina

---

**PAGINA 2 — Sales** (`/it/casi-studio/sales`)

S1 Hero:
- Label: `Caso Studio · Area Sales`
- Headline: `Chiudevano il 12% delle trattative. Non sapevano perché.`
- Sottotitolo: `Azienda di servizi B2B · Lombardia · €14M di fatturato · 34 persone · pipeline commerciale gestita interamente a memoria.`

S2 Problema:
- Headline: `Tre commerciali. Un buon prodotto. Zero visibilità su cosa succedeva tra il primo contatto e la firma.`
- Testo: `Il pipeline esisteva solo nella testa del responsabile senior. I follow-up dipendevano dalla sua memoria. Le trattative giacevano ferme per giorni senza che nessuno lo sapesse. Tempo medio tra l'invio di un'offerta e il contatto successivo: 11 giorni. In un mercato reattivo, 11 giorni di silenzio equivalgono spesso a una trattativa persa — senza saperlo.`

S3 Intervento:
- Headline: `Abbiamo reso visibile quello che era invisibile.`
- Testo: `Prima settimana: osservazione. Riunioni, materiali, conversazioni con il team. Niente proposte prima di capire. Poi: sistema di gestione pipeline su MARF con stati chiari e criteri di avanzamento. Qualificazione a tre domande per ogni nuova opportunità. Alert automatici su follow-up scaduti. Dashboard settimanale per il direttore — aggiornamento automatico ogni mattina alle 7:30. Il pipeline è passato da 47 opportunità dichiarate a 31 reali. Meno rumore, più chiarezza. Nelle prime due settimane dall'attivazione degli alert, il team ha ricontattato 14 trattative ferme. Tre si sono chiuse nel giro di due settimane.`

S4 Risultati:
- Headline: `Sei mesi.`
- Metriche:
  - `Tasso di chiusura | 12% | 31% | mese 6`
  - `Tempo medio di chiusura | 67 giorni | 38 giorni | mesi 4-6`
  - `Follow-up eseguiti nei 4 giorni dall'offerta | 33% | 91% | dal mese 2`
  - `Revenue incrementale | — | +€340k | cumulata 6 mesi`

S5 Citazione:
- `"Prima passavo ogni lunedì mattina a capire dove eravamo. Adesso lo so già la domenica sera, e il lunedì mattina lo uso per lavorare."`
- `Responsabile Commerciale Senior · Servizi B2B · Lombardia`

---

**PAGINA 3 — Operations & Dati** (`/it/casi-studio/operations`)

S1 Hero:
- Label: `Caso Studio · Operations & Dati`
- Headline: `Il COO passava due giorni a settimana a raccogliere dati che già esistevano.`
- Sottotitolo: `Azienda manifatturiera · Vicenza · €27M di fatturato · 61 persone · tre stabilimenti, undici fonti dati separate, zero visibilità unificata.`

S2 Problema:
- Headline: `I dati c'erano. Nessuno li vedeva nel momento giusto.`
- Testo: `Ogni lunedì: raccolta Excel dai tre stabilimenti, consolidamento manuale, verifica con il gestionale. Due giorni interi. I dati che il COO guardava avevano tre o quattro giorni di anzianità. Tre episodi negli ultimi sei mesi in cui un problema rilevato in ritardo aveva generato costi non pianificati: penali, rilavorazioni. €54k di costo documentato in un semestre. Tutto evitabile con visibilità in tempo reale.`

S3 Intervento:
- Headline: `Abbiamo collegato quello che c'era già. Zero sostituzione di sistemi.`
- Testo: `Audit di due settimane: undici fonti dati mappate. ERP legacy, MES di produzione, Excel dei responsabili, sistema qualità, fogli presenze. Niente sostituito. Layer di integrazione su MARF: raccolta automatica ogni 4 ore dalle fonti principali. Dashboard operativa accessibile da qualsiasi dispositivo, incluso il telefono in stabilimento. Tre alert automatici su soglie critiche definite dal COO: resa sotto soglia, commessa in ritardo, scarto di lotto fuori range. Il COO non cerca i problemi. I problemi vengono da lui.`

S4 Risultati:
- Headline: `Quattro mesi.`
- Metriche:
  - `Tempo COO su raccolta e consolidamento dati | ~2 giorni/settimana | ~1.5 ore/settimana | dal mese 2`
  - `Latenza media dei dati operativi | 48-72 ore | 4 ore | dal mese 2`
  - `Problemi rilevati prima che diventassero critici | 23% | 81% | media mesi 3-4`
  - `Costi da problemi rilevati in ritardo | ~€54k/semestre | ~€9k/semestre | proiezione mese 4`

S5 Citazione:
- `"Avevo sempre la sensazione di guidare guardando nello specchietto retrovisore. Adesso guardo avanti, e quando c'è qualcosa sul percorso lo vedo in tempo."`
- `COO · Componentistica industriale · Vicenza`

---

**PAGINA 4 — Amministrativo** (`/it/casi-studio/amministrativo`)

S1 Hero:
- Label: `Caso Studio · Area Amministrativa`
- Headline: `Tre persone brave. In un lavoro sbagliato.`
- Sottotitolo: `Studio di consulenza · Milano · €8.8M di fatturato · 26 persone · tre risorse amministrative sempre in ritardo, sempre sotto pressione, con nessun problema di competenza.`

S2 Problema:
- Headline: `Il 65% del loro tempo andava su tre attività automatizzabili.`
- Testo: `Ogni mese: riconciliazione manuale dei timesheet di 16 consulenti (tre giorni), gestione note spese via email con ricevute in formati diversi (6 ore settimanali), preparazione report mensile per i soci raccogliendo dati da tre sistemi diversi (due giorni). Il team non era inefficiente. Stava eseguendo correttamente un processo mal progettato.`

S3 Intervento:
- Headline: `Automatizzare la parte ordinaria. Lasciare alle persone la parte che conta.`
- Testo: `Timesheet: sistema strutturato su MARF che sostituisce 16 Excel diversi. Validazione in tempo reale — se un consulente inserisce un'anomalia, il sistema la segnala subito, non a fine mese. Note spese: approvazione automatica sotto soglia, un click sopra soglia, percorso standard sopra €200. Il consulente fotografa la ricevuta dal telefono. Tempo: 20 secondi invece di un'email. Report mensile: generazione automatica ogni primo lunedì del mese, formato definitivo. Il CFO verifica in 30 minuti invece di costruirlo in due giorni.`

S4 Risultati:
- Headline: `Tre mesi.`
- Metriche:
  - `Ore settimanali su attività ripetitive | ~31 ore | ~8 ore | dal mese 2`
  - `Chiusura fatturazione fine mese | 4-5 giorni | 1.5 giorni | dal mese 2`
  - `Errori e discrepanze timesheet | 35% dei timesheet | 2% dei timesheet | mese 3`
  - `Capacità liberata per attività a valore | ~30% del tempo | ~65% del tempo | mese 3`

S5 Citazione:
- `"Le mie colleghe adesso fanno cose che prima non avevano mai tempo di fare. E non hanno più paura del fine mese."`
- `CFO · Studio di consulenza organizzativa · Milano`

---

**PAGINA 5 — E-commerce** (`/it/casi-studio/ecommerce`)

S1 Hero:
- Label: `Caso Studio · E-commerce`
- Headline: `Ogni cliente costava acquisirlo. Quasi nessuno tornava.`
- Sottotitolo: `E-commerce B2C arredamento · Nord Italia · €10.9M di fatturato · 19 persone · buon traffico, buone recensioni, tasso di riacquisto all'11%.`

S2 Problema:
- Headline: `Stavano investendo in acquisizione su un secchio bucato.`
- Testo: `Tasso di abbandono carrello al 74% — nella media del settore, quindi mai considerato urgente. Ma tre clienti su quattro che aggiungono al carrello spariscono senza ricevere nessuna comunicazione di recupero. Solo l'11% dei clienti riacquistava entro 90 giorni. La media del segmento è 22-28%. LTV medio a 12 mesi: €148, mai misurato prima. Ogni punto percentuale di riacquisto in più vale circa €90k di revenue annua senza spendere un euro in advertising.`

S3 Intervento:
- Headline: `Smesso di rincorrere nuovi clienti. Iniziato a coltivare quelli esistenti.`
- Testo: `Tre punti di abbandono analizzati: pagina prodotto, configuratore (semplificato da 5 a 3 step), checkout (costi spedizione mostrati in anticipo). Sequenza recupero carrelli automatizzata in tre step: promemoria a 45 minuti, domanda genuina a 24 ore, sconto 5% a 72 ore. Si ferma al primo acquisto. Sistema post-acquisto segmentato: email di benvenuto dopo consegna, tre email editoriali in 30 giorni, promemoria di riacquisto calibrato sul ciclo di vita del prodotto, sequenza di riattivazione per clienti inattivi da 120+ giorni.`

S4 Risultati:
- Headline: `Cinque mesi.`
- Metriche:
  - `Tasso abbandono carrello | 74% | 52% | media mesi 4-5`
  - `Tasso di recupero carrelli abbandonati | 0% | 14% | media mesi 2-5`
  - `Tasso di riacquisto entro 90 giorni | 11% | 27% | media mesi 4-5`
  - `LTV medio cliente a 12 mesi | €148 | €224 (proiezione) | mese 5`
  - `Revenue incrementale da automazioni | — | +€218k | cumulata 5 mesi`

S5 Citazione:
- `"Prima ogni cliente costava acquisirlo e poi spariva. Adesso il cliente che acquisisco vale molto di più, e parte di quel valore arriva senza spendere un euro in più in pubblicità."`
- `CEO · E-commerce arredamento B2C · Nord Italia`

---

**PAGINA 6 — Info Business** (`/it/casi-studio/info-business`)

S1 Hero:
- Label: `Caso Studio · Info Business`
- Headline: `L'azienda cresceva finché il fondatore reggeva.`
- Sottotitolo: `Formazione manageriale B2B · Milano · €5.4M di fatturato · 13 persone · ogni trattativa passava per il fondatore. Due figure commerciali perse in tre anni.`

S2 Problema:
- Headline: `Il capitale commerciale era intrappolato nella testa di una sola persona.`
- Testo: `18 ore a settimana del fondatore su attività commerciali dirette. Ogni trattativa: dalla prima call alla firma. Nessun processo documentato, nessun materiale, nessun sistema di supporto. Il problema non era trovare commerciali. Era che senza un sistema replicabile, ogni nuova figura commerciale galleggiava senza struttura e se ne andava entro otto mesi. Era già successo due volte.`

S3 Intervento:
- Headline: `Abbiamo estratto quello che era nella sua testa e lo abbiamo reso replicabile.`
- Testo: `16 ore di conversazioni registrate con il fondatore: come qualifica, quali segnali cerca, come gestisce le obiezioni, cosa rende una proposta vincente. Da lì: un Sales Playbook di 28 pagine con il processo completo. Sistema di nurturing su MARF per i 3.400 iscritti alla newsletter e i partecipanti ai webinar: sequenza per livello di consapevolezza, criterio automatico di passaggio a lead caldo, notifica al commerciale entro 24 ore. Onboarding del nuovo commerciale con il playbook come guida, affiancamento su cinque call. Il fondatore supervisiona con alert solo su eccezioni. Zero micromanagement.`

S4 Risultati:
- Headline: `Sette mesi.`
- Metriche:
  - `Ore settimanali fondatore su commerciale diretto | 18 ore | 5 ore | media mesi 6-7`
  - `Lead qualificati mensili | 8 in media | 24 in media | media mesi 5-7`
  - `Tasso conversione proposta → firma | 41% | 46% | mesi 5-7`
  - `Revenue da trattative gestite senza il fondatore | €0 | +€390k | cumulata mesi 5-7`

S5 Citazione:
- `"Per la prima volta in dieci anni sono andato in vacanza una settimana senza guardare il telefono. E quando sono tornato, nessuno aveva bisogno di me per recuperare il tempo perso."`
- `Fondatore · Formazione manageriale B2B · Milano`

---

## 4. REGOLE GENERALI DI IMPLEMENTAZIONE

**Nav:** Identica al sito esistente su tutte le pagine. Nessun link aggiuntivo, nessuna modifica.

**Footer:** Non presente su queste pagine. Le pagine del funnel non hanno footer.

**SEO / Meta:**
- `noindex, nofollow` su tutte le 6 pagine — non sono pagine pubbliche
- Title tag: `[Titolo pagina] — Morfeus`
- Nessun og:image necessario

**Animazioni:**
- Usare le stesse animazioni già presenti nel sito (fadeUp on scroll, glow breathe)
- Non aggiungere animazioni nuove non presenti nel design system esistente

**Placeholder da sostituire dopo la build:**
```
[PLACEHOLDER_VIDEO_LINKEDIN]     → URL YouTube/Vimeo video pre-call (variante LinkedIn)
[PLACEHOLDER_VIDEO_COLDEMAIL]    → URL YouTube/Vimeo video pre-call (variante cold email)
[PLACEHOLDER_WEBINAR_URL]        → URL registrazione webinar
[ENDPOINT_MARF_PLACEHOLDER]      → Endpoint API MARF per submit form
```

**Loghi clienti:** Cercare nella cartella assets del progetto i PNG white on transparent. Se non presenti, lasciare placeholder con blocchi grigi della dimensione corretta.

---

## 5. ORDINE DI COSTRUZIONE RACCOMANDATO

1. `call-confermata` — Thank You Page (blocca tutto il funnel)
2. `casi-studio/sales` — pagina default (prima da testare nel flusso reale)
3. `casi-studio/operations`, `casi-studio/amministrativo`, `casi-studio/ecommerce`, `casi-studio/info-business` — in parallelo, stessa struttura

Le pagine caso studio condividono la stessa struttura: costruire una, usarla come template per le altre quattro.
