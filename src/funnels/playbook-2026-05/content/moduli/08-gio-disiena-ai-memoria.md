# Modulo 08 — AI Memory Architecture: Come Non Farsi Fottere dalle AI

| Campo | Valore |
|-------|--------|
| Modulo | 08 |
| Speaker | Joe Di Siena (coaching client di Rich Schefren dal 2014, nel marketing dal 2008) |
| Titolo | AI Memory Architecture: Come Non Farsi Fottere dalle AI |
| Tipo | tattico |
| Durata | 30 min |
| Tags | AI, memoria, WikiLLM, RAG, MCP server, auto-research, articulation gap |

[← Modulo precedente](./07-michelangelo-meta-ads.md) | [Torna all'indice](../index.md)

---

## In 30 Secondi

L'AI ha amnesia e tu non sai comunicarle quello che conosci davvero. Joe Di Siena (coaching client di Rich Schefren dal 2014, nel marketing dal 2008) mostra il costo nascosto: 173 ore/anno sprecate, output mediocri, zero compounding. La soluzione: costruire un sistema di memoria proprietaria (WikiLLM) sul tuo disco, non nel cloud, che rende la tua AI 10x più potente. Tre pilastri: Memoria in bottiglia, MCP Server, Auto-Research.

---

## Quick Win — Fai Questo Entro 48 Ore

### QW1: Fai il Test dell'Amnesia

Apri la tua chat AI principale, senza MCP, senza memoria di progetto. Chiedi: "Quali sono le specifiche per il mio prodotto principale?", "Scrivi un paragrafo nel mio tono di voce", "Descrivi in dettaglio il mio cliente ideale." Continua a fare domande. Ti renderai conto che l'AI non ti conosce: ti dà solo l'illusione della conoscenza.

**Come rendere il test diagnostico:** crea 10 domande specifiche sul tuo business che solo tu sapresti rispondere. Falle a 3 AI diverse. La distanza tra risposta AI e realtà = il tuo articulation gap + amnesia gap combinati. Questo diventa il tuo benchmark di partenza.

### QW2: Compila il Tuo Core Context

Stanotte. Crea un file .md con il tuo core context completo:

**Identità e posizionamento:** chi sei, cosa fai, per chi, cosa NON fai.

**Tono di voce REALE**, non "diretto e professionale" ma: lunghezza media frasi, verbi preferiti, punteggiatura, parole che non usi MAI, parole che usi SEMPRE, pattern ricorrenti, tipo di metafore. Esempio di Joe: "frasi max 14 parole, inizio con verbo imperativo, mai punti esclamativi, una metafora per paragrafo, domanda secca + affermazione di 4-6 parole."

**Cliente ideale REALE**, non "imprenditore 35-55 anni" ma: segnali comportamentali del cliente giusto (come risponde alle mail, quanto parla vs ascolta, cosa chiede nei primi contatti) e red flag del cliente sbagliato (cerca un salvatore, usa "asap" ripetutamente, manda vocali da 4 minuti, chiede sconti subito).

**Principi operativi:** regole non negoziabili, decisioni già prese che non vanno rimesse in discussione.

### QW3: Scegli UN'Area Lavorativa da Potenziare

Non partire con tutto. Scegli un'area (copy, ads, email, contenuti, vendita) usando il criterio: dove spendi più tempo + dove l'impatto sul fatturato è maggiore + dove la qualità è più inconsistente. Per quell'area, documenta: 3 esempi del tuo lavoro migliore, 3 errori che ripeti, le regole non scritte che applichi senza pensarci.

---

## Playbook Completo

### Azioni Medio Termine — Entro 30 Joerni

#### MT1: Costruisci la Tua Wiki Personale (WikiLLM)

L'architettura a strati di Joe:

```
/memoria/
├── raw/                    # materiale grezzo non filtrato
│   ├── trascrizioni/
│   ├── appunti/
│   └── riferimenti/
├── wiki/                   # conoscenza filtrata e strutturata
│   ├── chi-sono.md
│   ├── tono-di-voce.md
│   ├── cliente-ideale.md
│   ├── offerte.md
│   ├── copy-rules.md
│   ├── errori-comuni.md
│   └── principi.md
├── index.md                # mappa: per ogni domanda, dove cercare
└── filtri.md               # criteri: cosa entra nella wiki, cosa no
```

**L'index.md è il fulcro:** "Se devo scrivere copy, consulta: tono-di-voce.md, copy-rules.md, cliente-ideale.md." Senza mappa, l'AI naviga a caso nei tuoi file.

**Il filtro è critico:** file sporchi nella wiki = conoscenza inquinata = output che l'AI pensa siano giusti ma non lo sono.

#### MT2: Implementa i Filtri della Memoria

Crea un documento con i criteri per decidere cosa entra nella wiki:

1. **È confermato dall'esperienza?** Testato e funziona almeno 3 volte → wiki. Teoria/ipotesi → raw.
2. **È coerente con i miei principi?** Se contraddice: o aggiorno i principi (decisione consapevole), o scarto.
3. **È specifico del mio contesto?** Framework generico → raw. Framework adattato con dati reali → wiki.
4. **Ha data di scadenza?** Dati di mercato → raw con data. Principi di copy → wiki.
5. **Posso agire su questa base?** Sì → wiki. Solo "interessante" → raw o scarta.

#### MT3: Articola la Tua Tacit Knowledge

Il concetto chiave di Michael Polanyi (filosofo anni '60): noi conosciamo più di quello che riusciamo a dire. Come un ciclista che sa pedalare ma non sa spiegare come fa a stare in equilibrio.

**Metodo di estrazione:**
- Per 1 settimana, ogni azione nell'area scelta, annota PERCHÉ hai fatto quella scelta
- Intervista a te stesso: "Come faccio a sapere quando è pronto?", "Cosa noto per primo quando non funziona?", "Se dovessi insegnare questo a un clone in 30 minuti?"
- Trasforma in regole: SE [condizione] → ALLORA [azione] PERCHÉ [ragione]
- Queste regole diventano file wiki

#### MT4: Installa un MCP Server per la Memoria

Rendi la wiki accessibile automaticamente a ogni nuova chat.

**Dal più semplice al più avanzato:**
- **Livello 1:** Copia file .md in custom instructions/project knowledge (immediato, limitato)
- **Livello 2:** Claude Projects o GPT con knowledge base (più strutturato, memoria sulla piattaforma)
- **Livello 3:** MCP Server locale, la wiki sta sul tuo disco, ogni AI-client compatibile la consulta (proprietà totale, quello che raccomanda Joe)
- **Livello 4:** RAG completo con database vettoriale locale (per 100+ documenti)

### Progetti Strategici — Entro 90 Joerni

#### PS1: Implementa l'Auto-Research (Metodo Karpathy)

Il concetto di Andrej Karpathy (co-founder OpenAI) implementato da Joe: non accettare il primo output. Per ogni deliverable critico:

```
1. Genera 5 versioni diverse
2. Auto-valuta su criteri dalla TUA wiki
3. Scarta le 3 più deboli
4. Dalle 2 rimaste, crea versione finale combinando i punti di forza
5. Consegna SOLO il top + ragionamento
```

Caso Shopify: 93 persone testate overnight, 53% più rapido, codice zero. Caso Joe: 100 varianti di una sales bridge generate e testate di notte, al mattino i risultati.

#### PS2: Sistema di Conoscenza Proprietaria Completa

Espandi la wiki iniziale a tutte le aree: posizionamento, offerte, copy, funnel, ads, vendita, delivery, errori. Obiettivo: se domani dovessi trasferire il tuo know-how a un collaboratore o a un'AI, la wiki contiene tutto.

#### PS3: Separa la Memoria dal Cloud

La tua memoria deve stare sul TUO disco. Come dice Joe: "Se continuate a usare Cloud/GPT come avete sempre fatto, state permettendo al padrone di casa di buttarvi fuori a calci senza preavviso." Piano: backup tutto dal cloud → installa sistema locale → la wiki locale diventa single source of truth → il cloud diventa client, non server della conoscenza.

---

## Framework

### Framework: La Piramide dell'Esecuzione

| Campo | Dettaglio |
|-------|-----------|
| Problema che risolve | Non sai cosa delegare all'AI e cosa tenere |
| Quando usarlo | Per decidere dove investire il tuo tempo vs delegare |
| Limiti | Non spiega come sviluppare il pensiero strategico |

**I 5 livelli:**
1. **Operatività** → esecuzione pura → AI fa meglio del 90% (morto)
2. **Skill tecniche** → produzione output → AI competente (morente)
3. **Tattica** → esecuzione strategie → AI in crescita
4. **Strategia** → pianificazione, direzione → umano + AI come sparring
5. **Pensiero strategico** → cosa fare QUANDO e cosa NON fare QUANDO → solo umano

Tre cose resteranno: pensiero strategico, esperienza, capacità di costruire sistemi.

### Framework: L'Architettura WikiLLM

| Campo | Dettaglio |
|-------|-----------|
| Problema che risolve | AI amnesia + articulation gap = 173 ore/anno sprecate |
| Quando usarlo | Ogni volta che apri una nuova chat e devi rispiegare tutto |
| Limiti | Richiede investimento iniziale, qualità dipende dai filtri |

**4 strati:**
1. **Raw files** → materiale grezzo, non filtrato
2. **Wiki** → conoscenza filtrata in file .md strutturati (il cuore)
3. **Index** → mappa che dice all'AI dove trovare cosa (il fulcro)
4. **MCP Server** → rende tutto accessibile automaticamente

Principio: "Gli umani abbandonano le wiki, ma le AI adorano le wiki."

### Framework: Auto-Research (Metodo Karpathy)

| Campo | Dettaglio |
|-------|-----------|
| Problema che risolve | Ti accontenti del primo output mediocre |
| Quando usarlo | Per ogni output critico: copy, ads, email, sales page |
| Limiti | Richiede più token, i criteri di valutazione devono essere buoni |

**Il workflow:**
Richiesta → Genera 5+ versioni → Auto-valuta su criteri dalla wiki → Scarta le deboli → Sintetizza le top → Consegna solo il migliore

### Framework: L'Articulation Gap (Polanyi)

| Campo | Dettaglio |
|-------|-----------|
| Problema che risolve | Sai fare cose che non sai spiegare all'AI |
| Quando usarlo | Quando l'output AI è "giusto ma non tuo" |
| Limiti | Non tutta la tacit knowledge è articolabile |

Quello che dici: "Scrivi nel mio tono diretto e professionale"
Quello che l'AI vorrebbe: "Frasi max 14 parole, verbo imperativo, mai punti esclamativi, una metafora per paragrafo, domanda secca + affermazione 4-6 parole"

---

## Knowledge Base — Concetti Chiave

### AI Come Amplificatore, Non Equalizzatore
L'AI non porta tutti allo stesso livello. Chi è ignorante sarà 10x più ignorante. Chi ha esperienza sarà 10x più esperto. L'AI ha creato l'"epistemia digitale": la convinzione di sapere ciò che non si è studiato.

### Memory in a Bottle (Rich Schefren)
Concetto spiegato da Rich Schefren a Joe: mettere la tua memoria in un contenitore persistente che ogni nuova chat eredita automaticamente. Non un tool o un trucco, un'architettura. Il know-how sul TUO disco, non nel cloud del provider. I marketer americani stanno comprando Mac M4 per salvare la memoria in locale.

### Il Filtro della Memoria
L'errore più comune: dare tutto alla memoria senza filtri. La memoria deve verificare: "quello che è stato detto in questa chat è allineato con i principi già stabiliti? Se no, lo scarto." Senza filtri, inquini la conoscenza e l'AI produce output che pensa siano giusti ma non lo sono.

### Tacita Conoscenza (Michael Polanyi)
Filosofo anni '60. Concetto: noi conosciamo più di quello che riusciamo a esprimere. Il ciclista sa pedalare ma non sa spiegare come mantiene l'equilibrio. Applicato all'AI: il gap tra quello che sai e quello che riesci a scrivere nelle istruzioni costa 173 ore/anno e output mediocri.

### Il Caso dell'Agente AI che Ha Fallito
Azienda che ha sostituito un dipendente con un agente AI. L'agente ha fallito: 60 clienti offline per 15 ore, unico modo di contatto era un Google Form. Il dipendente è stato riassunto a 4x lo stipendio. Lezione: l'AI senza memoria strutturata e supervisione strategica è un rischio, non un vantaggio.

---

## Checklist Prioritizzata

### P1 — Urgente (fai SUBITO)
- [ ] Fai il test dell'amnesia su 3 AI diverse
- [ ] Compila il core context in file .md (identità, tono granulare, cliente comportamentale, principi)
- [ ] Scegli UN'area lavorativa e documenta best practice + errori

### P2 — Importante (entro 30 giorni)
- [ ] Costruisci la wiki: cartelle raw/ → wiki/ → index.md
- [ ] Crea i filtri della memoria
- [ ] Articola la tacit knowledge per l'area scelta
- [ ] Implementa MCP server o equivalente
- [ ] Testa l'auto-research su un output reale

### P3 — Strategico (entro 90 giorni)
- [ ] Espandi la wiki a tutte le aree del business
- [ ] Migra la memoria dal cloud al disco locale
- [ ] Sistematizza l'auto-research come workflow default

---

## Connessioni con Altri Moduli

| Modulo | Come si collega |
|--------|----------------|
| [01 - Le Nuove Regole](./01-marco-regole-infobusiness.md) | Marco indica AI come leva strategica, Joe spiega COME implementarla con WikiLLM senza farsi fottere |
| [02 - Offerte e Conversione](./02-michele-offerte-conversione.md) | L'avatar comportamentale di Michele (segnali, red flag) diventa un file wiki. L'articulation gap spiega perché le pre-qualifiche generiche non funzionano |
| [03 - The War Machine](./03-roberto-war-machine.md) | Roberto testa varianti di VSL/ads manualmente, l'auto-research di Joe automatizza il testing su scala (100+ varianti overnight) |
| [04 - Creatività e Advertising](./04-federico-creativita-advertising.md) | Federico genera angoli creativi, l'auto-research li testa in automatico e seleziona i migliori per look/originalità/engagement |
| [05 - Formula Partner](./05-formula-partner-incubatore.md) | Il know-how del founder deve scalare, la wiki rende la conoscenza trasferibile e persistente |
| [06 - Vendita Etica](./06-simone-vendita-etica.md) | Simone parla di voce autentica, l'articulation gap di Joe spiega perché è così difficile replicarla (la tacit knowledge non si trasferisce con "scrivi come me") |
| [07 - Meta Ads](./07-michelangelo-meta-ads.md) | Dati proprietari delle ads, nella wiki come conoscenza strutturata consultabile dall'AI per decisioni future |

---

[← Modulo precedente](./07-michelangelo-meta-ads.md) | [Torna all'indice](../index.md)
