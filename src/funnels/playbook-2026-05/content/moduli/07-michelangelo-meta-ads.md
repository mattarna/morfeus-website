# Modulo 07 — Framework Operativo per Gestire le Campagne Meta: Stabilita' Algoritmica, Budget e Iterazione Creativa

| Campo | Valore |
|-------|--------|
| Modulo | 07 |
| Speaker | Michelangelo (media buyer, 10-15M€/anno di budget gestito) |
| Titolo | Framework Operativo per Gestire le Campagne Meta: Stabilita' Algoritmica, Budget e Iterazione Creativa |
| Tipo | tecnico-operativo |
| Durata | 33 min |
| Tags | Meta Ads, stabilita' algoritmica, CPA, budget scaling, stop loss, creative testing, OMTM, tracking, MCP Meta, AI |

[← Modulo precedente](./06-simone-vendita-etica.md) | [Torna all'indice](../index.md)

---

## In 30 Secondi

Michelangelo presenta un framework operativo completo per gestire le campagne Meta senza emotivita'. Il sistema si basa su quattro pilastri: (1) tracking impeccabile come prerequisito, (2) stabilita' algoritmica (50 conversioni/settimana per ad set), (3) stop loss per creativita' e regole di scaling (+10% con condizioni precise), (4) OMTM come bussola strategica. L'obiettivo finale: codificare tutto il framework in Claude tramite MCP Meta per esecuzione quotidiana sistematica. Filosofia di base: sperimentazione veloce con iterazione continua, non batch creativi massicci.

---

## Quick Win — Fai Questo Entro 48 Ore

### QW1: Audit del Tracking

Accedi al tuo account Meta e verifica: i segnali della customer journey arrivano correttamente? Il pixel e' installato? Il server-side tracking e' configurato? Gli eventi di conversione si registrano?

[+] **Perche' il tracking e' il problema #1 (dall'esperienza di Michelangelo):**
Michelangelo gestisce 10-15 milioni di euro di budget pubblicitario annuo. La causa piu' frequente di "campagne che non funzionano" non e' la creativita', non e' il targeting, non e' il budget: e' il tracciamento. "Spesso il tracciamento e' neanche zoppo, peggio che peggio."

Senza dati corretti, gli algoritmi di Meta:
- Non sanno chi ha convertito e chi no
- Non possono ottimizzare per il tuo obiettivo reale
- Tornano risultati instabili e inaffidabili
- Ti fanno prendere decisioni su dati sbagliati

La verifica pratica:
1. **Pixel:** installato su tutte le pagine? Registra gli eventi correttamente? (Verifica con il Pixel Helper di Meta)
2. **Server-side tracking:** configurato? I dati server-side matchano con quelli client-side? (Meta Events Manager → Diagnostics)
3. **Conversioni:** gli eventi di conversione che stai ottimizzando corrispondono all'azione di business che ti interessa? Se ottimizzi per "ViewContent" ma ti serve "Purchase", i dati che dai all'algoritmo sono fuorvianti
4. **Google Tag Manager:** se lo usi, i tag si attivano correttamente? I trigger sono configurati per gli eventi giusti?

Se il tracking non e' perfetto, fermati e sistemalo prima di qualsiasi altra azione. Ogni euro speso con tracking rotto e' un euro sprecato.

### QW2: Calcola il Budget Settimanale Minimo

Prendi il tuo CPA target (se lo conosci) e moltiplica per 50. Questo e' il budget settimanale minimo che l'algoritmo di Meta necessita per raggiungere la stabilita' algoritmica.

[+] **La formula e il perche' (dal framework di Michelangelo):**

```
Budget settimanale minimo = CPA target × 50
```

I 50 non sono un numero arbitrario: e' il numero di conversioni settimanali che Meta richiede, nella sua documentazione ufficiale, per raggiungere la stabilita' algoritmica per singolo ad set.

Esempi:
- CPA target 5€ → budget minimo 250€/settimana → ~1.000€/mese
- CPA target 10€ → budget minimo 500€/settimana → ~2.000€/mese
- CPA target 50€ → budget minimo 2.500€/settimana → ~10.000€/mese
- CPA target 100€ → budget minimo 5.000€/settimana → ~20.000€/mese

Se il tuo budget attuale e' sotto questa soglia, hai tre opzioni:
1. **Aumenta il budget** (se il cash flow lo permette)
2. **Cambia l'evento di conversione** a uno piu' alto nel funnel (es. da "Purchase" a "Lead") dove il CPA e' piu' basso
3. **Consolida gli ad set** per concentrare il budget

Quello che NON puoi fare: lamentarti che "le campagne non funzionano" mentre spendi un terzo di quello che l'algoritmo necessita.

**Se non conosci il tuo CPA:** la risposta viene da Federico (intervento 04). Alloca un piccolo budget che ti puoi permettere per scoprire le numeriche. Datti delle aspettative, tocca il mercato, misura. Non puoi definire un CPA target senza dati: devi andarli a prendere.

### QW3: Verifica la Stabilita' Algoritmica

Per ogni ad set attivo, verifica: quante conversioni hai ottenuto negli ultimi 7 giorni? Se sono meno di 50, stai operando fuori dalla stabilita' algoritmica.

[+] **La metafora della casa e le conseguenze (da Michelangelo):**
Michelangelo usa una metafora efficace: "E' come se voi a casa di qualcun altro entrate con le scarpe sporche e lui voleva che entraste con le ciabatte. Siete a casa di qualcun altro, dovete sottostare alle condizioni che la documentazione ufficiale di Meta espone."

Le conseguenze di operare fuori stabilita':
- **Targeting sporco:** l'algoritmo non ha abbastanza dati per capire chi e' il tuo cliente ideale. Mostra le ads a persone a caso.
- **Risultati instabili:** un giorno il CPA e' 5€, il giorno dopo e' 50€. Non riesci a prevedere niente.
- **Decisioni impossibili:** come fai a sapere se una creativita' funziona o no se i dati non sono stabili?
- **Spreco budget:** stai pagando Meta per mostrare ads a persone sbagliate con risultati imprevedibili.

Le "zone grigie" esistono: ci sono situazioni dove le campagne funzionano anche senza 50 conversioni piene. Michelangelo lo ammette. Ma consiglia di trattarle come eccezioni per esperti, non come regola operativa.

### QW4: Definisci lo Stop Loss per Creativita'

Prima di lanciare qualsiasi nuova creativita', decidi: quanto sono disposto a spendere per valutarla? Scrivi il numero e rispettalo.

[+] **Il sistema dello stop loss (dal framework di Michelangelo):**

```
Stop loss per creativita' = X × CPA target
```

Dove X e' il moltiplicatore che scegli in base a quanto vuoi essere ragionevolmente certo del risultato.

Il principio: ogni creativita' ha diritto a un budget di test. Se raggiunge quel budget e non rispetta il CPA target, la spengi. Fine. Nessuna eccezione emotiva ("ma magari domani riparte...").

**Come scegliere X:**
- **X = 1-2:** test minimale. Utile se hai budget molto limitato e tante creativita' da testare. Rischio: falsi negativi (spengi creativita' che avrebbero funzionato con piu' dati).
- **X = 3-5:** test ragionevole. Buon compromesso per la maggior parte dei business.
- **X = 5-10:** test robusto. Per chi ha budget e vuole alta certezza.
- **X = 10+:** test statisticamente forte. Per budget elevati dove il costo del falso positivo e' alto.

**L'errore degli standard americani:**
Michelangelo critica duramente chi applica ciecamente regole come "testa con 3× CPA" prese da contesti americani. Il suo esempio: spendere 200€ per testare una creativita' ha senso se il tuo CPA e' 80€ (2.5× CPA). Non ha senso se il tuo CPA e' 5€ (40× CPA — stai bruciando soldi per una certezza che non ti serve).

Il principio: contestualizza TUTTO. Il tuo CPA, il tuo budget, il tuo mercato sono diversi da quelli del guru americano.

---

## Playbook Completo

### Azioni Medio Termine — Entro 30 Giorni

#### MT1: Definisci l'OMTM e Allinea il Team

Scegli l'unica metrica che conta per il tuo business in questo momento. Comunicala al team. Implementa sprint settimanali (lunedi' mattina) dove tutti si allineano su quella metrica.

[+] **L'OMTM nel dettaglio (dal framework di Michelangelo):**
OMTM = One Metric That Matters. Non tre metriche, non cinque. Una.

**Come sceglierla:**
La scelta dipende dalla fase del business:
- **Fase di lancio/acquisizione:** CAC (Customer Acquisition Cost). Quanto costa acquisire un cliente? Se non sai acquisire clienti in modo sostenibile, niente altro conta.
- **Fase di crescita:** ROAS o CPA su specifici segmenti. Stai scalando, devi assicurarti che la scalata sia profittevole.
- **Business consolidato:** LTV (Lifetime Value). Hai gia' il motore di acquisizione, ora devi massimizzare il valore di ogni cliente.
- **Fase di crisi:** la metrica che sta sanguinando. Se il CPA e' esploso, l'OMTM e' il CPA finche' non lo riporti in target.

**La regola critica: quando l'OMTM cambia, TUTTO cambia.**
Michelangelo e' esplicito: "Al cambiare dell'OMTM tutto il sistema deve adeguarsi a essa stessa, perche' deve andare il sistema nella direzione di facilitare la metrica da condizionare."

Questo significa che se passi da CAC a LTV come OMTM, le campagne, il targeting, le creativita', il budget allocation — tutto si ricalibra. Non puoi cambiare l'OMTM e lasciare le campagne come prima.

**Il collegamento strategia → tattica:**
Se un ad set e' algoritmicamente stabile e performa bene sul CPA, ma va contro l'OMTM strategico (es. porta clienti a basso LTV), va fermato. "La strategia governa la tattica."

#### MT2: Calcola Quante Creativita' Puoi Testare

Formula semplice: Budget totale ÷ (Stop loss per creativita') = numero massimo di creativita'.

[+] **L'errore delle 100 creativita' (caso reale di Michelangelo):**
Un cliente ha fatto registrare al frontman 100 inserzioni: varianti di hook, body, CTA, angoli diversi. Tutte caricate in campagna. Risultato catastrofico.

Il calcolo: se il CPA e' 10€ e lo stop loss e' 3× CPA = 30€ per creativita', servono 3.000€ per testare tutte e 100. Ma il budget mensile era molto inferiore. Risultato: dopo 3 mesi stavano ancora testando il primo batch di creativita'. Nel frattempo il mercato era cambiato, il messaggio non era piu' rilevante, il business era in difficolta'.

La regola di Michelangelo: "Si fa iterazione continua, non si prende un blocco di cento inserzioni e si spiaccica dentro la campagna." Crei le creativita' che puoi testare ADESSO. Valuti. Impari. Crei il prossimo batch basato su quello che hai imparato. Ripeti.

Il ciclo iterativo deve essere veloce perche':
1. Il mercato cambia: il messaggio di oggi non funziona tra 3 mesi
2. I dati di oggi informano le creativita' di domani
3. L'apprendimento e' composto: ogni ciclo migliora il successivo

#### MT3: Crea il Framework di Scaling

Scrivi le regole per scalare il budget. Devono essere chiare, non ambigue, applicabili da chiunque (o da Claude).

[+] **Le regole di scaling di Michelangelo:**

**AUMENTO del budget (+10%):**
Condizioni (TUTTE devono essere vere):
1. CPA ≤ CPA target OPPURE ROAS ≥ ROAS target
2. KPI validi negli ultimi 7 giorni, incluso oggi
3. Non hai raggiunto il max budget sostenibile (vincolo cash flow)
4. Spesa ultimi 30 giorni ≥ 5× budget giornaliero (la campagna ha avuto tempo di apprendere)

**DIMINUZIONE del budget:**
Quando: CPA > CPA target in modo consistente.
Azione: riduci il budget per dare un segnale negativo all'algoritmo. NON lasciare campagne "sanguinanti" attive sperando che migliorino.

**Vincoli operativi:**
- Max 2 modifiche al budget al giorno (sia in aumento che in diminuzione)
- Dopo ogni modifica: zona morta. Lascia tempo all'algoritmo per ricalibrarsi
- Ogni modifica deve avere un sistema, delle condizioni, delle regole. Non "a caso perche' mi e' comodo"

**Il meccanismo dei rinforzi:**
Gli algoritmi di Meta funzionano per rinforzi positivi e negativi.
- Aumenti il budget = rinforzo positivo ("sono soddisfatto, dammi di piu'")
- Diminuisci il budget = rinforzo negativo ("non va bene, cambia")
- Lasci invariato = nessun segnale

Se non invii segnali, l'algoritmo non sa cosa vuoi. Se invii segnali contraddittori (aumento-diminuzione-aumento in un giorno), l'algoritmo si confonde.

**Scaling e asta competitiva:**
Il budget iniziale condiziona quanto forte entri in asta rispetto ai competitor. Budget alto = bid alto = posizionamento alto nel feed/stories. Ma: budget alto brucia piu' creativita'. Se non hai una struttura di refresh creativo costante, parti basso e scala gradualmente.

#### MT4: Audit di Tutte le Campagne Attive

Prendi ogni campagna attiva e passa il framework:

[+] **Checklist di audit per campagna:**

Per ogni campagna/ad set/creativita':
1. **Stabilita' algoritmica:** ho 50+ conversioni negli ultimi 7 giorni su questo ad set?
2. **CPA:** il CPA e' in target? Se no, da quanto tempo?
3. **Stop loss:** le creativita' attive hanno raggiunto lo stop loss? Se si' e sono fuori CPA, perche' sono ancora attive?
4. **Campagne sanguinanti:** ci sono campagne che perdono soldi da giorni/settimane lasciate attive "perche' potrebbero migliorare"? SPEGNI
5. **Segnali all'algoritmo:** gli ultimi segnali inviati (modifiche budget) erano coerenti? O contraddittori?
6. **Tracking:** gli eventi di conversione registrati corrispondono alle conversioni reali?
7. **OMTM:** questa campagna contribuisce all'OMTM del business?

Se trovi campagne che violano 2+ punti, fermale immediatamente. Analizza. Poi reimplementa con il framework corretto.

#### MT5: Costruisci il Ciclo Iterativo Veloce

Implementa il ciclo: lancia → misura → decidi → refresh → ripeti. Con cadenza settimanale.

[+] **Il ciclo settimanale di gestione campagne:**

```
LUNEDI': Sprint OMTM
├── Review KPI settimana precedente
├── Stabilita' algoritmica per ad set
├── CPA vs. target per campagna
└── Decisioni: cosa scalare, cosa fermare, cosa testare

MARTEDI'-MERCOLEDI': Implementazione
├── Scaling delle campagne performanti (+10%)
├── Stop delle campagne non performanti
├── Lancio nuove creativita' (quelle pianificate lunedi')
└── Verifica stop loss raggiunti

GIOVEDI'-VENERDI': Monitoraggio leggero
├── Verifica che i cambiamenti di budget stiano producendo effetti
├── Nessuna modifica impulsiva (zone morte)
└── Brief per il prossimo batch di creativita'

SABATO-DOMENICA: Produzione creativa
├── Le creativita' per il lunedi' successivo
├── Basate sui dati della settimana
└── Angoli testati nell'organico (collegamento intervento 04, Federico)
```

La filosofia di Michelangelo: la sperimentazione veloce. "Cadere, rialzarsi, cadere, rialzarsi, una volta in piu' rispetto alle volte che cadi." Il ciclo settimanale e' il ritmo che permette l'iterazione continua senza l'ansia del monitoraggio quotidiano ossessivo.

---

### Progetti Strategici — Entro 90 Giorni

#### PS1: Struttura il Refresh Creativo come Sistema Continuo

Le campagne a budget elevato bruciano creativita' velocemente. Senza un sistema di produzione continua, le performance crollano.

[+] **Perche' il refresh creativo e' un sistema, non un evento:**
Michelangelo spiega il meccanismo: quando entri in asta con un budget alto (es. 1.000€/giorno), il tuo bid e' alto. Ti posizioni in alto nel feed e nelle stories. Le performance iniziali sono ottime. Ma: il budget alto brucia le creativita' piu' velocemente. Il pubblico si satura, la frequenza sale, il CPA aumenta.

Se non hai nuove creativita' pronte, sei bloccato: o diminuisci il budget (e perdi il posizionamento) o continui a spendere su creativita' esaurite (e bruci soldi).

La soluzione e' un sistema:
1. **Produzione settimanale:** un numero fisso di nuove creativita' ogni settimana, basate sui dati della settimana precedente
2. **Angoli dall'organico:** il collegamento con Federico (intervento 04) e' diretto. L'organico e' il laboratorio dove testi messaggi e angoli a costo zero. Quelli che performano nell'organico diventano creativita' paid
3. **Obiezioni dalla vendita:** il collegamento con Marco+socio (intervento 05) e' altrettanto diretto. Le obiezioni che arrivano dalla rete vendita diventano angoli creativi per le ads
4. **Iterazione, non reinvenzione:** il prossimo batch di creativita' non parte da zero. Parte da cio' che hai imparato: quali hook funzionano, quali angoli performano, quali messaggi il mercato rifiuta

#### PS2: Collega MCP Meta a Claude con il Framework Operativo

L'obiettivo finale di Michelangelo: dare a Claude il framework completo e farlo operare quotidianamente sulle campagne.

[+] **Come funziona e perche' e' importante:**
Michelangelo mostra dal vivo come collegare l'MCP (Meta Conversions Protocol/server-side) a Claude. L'obiettivo non e' "far gestire le campagne all'AI" in modo generico. E' dare a Claude un framework di regole specifiche e farlo operare secondo quelle regole.

Il vantaggio: Claude non ha emotivita'. Quando gestisci 10-15 milioni di budget, le campagne oscillano. La tentazione di intervenire impulsivamente e' forte. Michelangelo racconta di essere andato "in bagno in diarrea cinque volte" la notte prima di lanciare la sua prima campagna da 250K per una multinazionale farmaceutica.

Il framework in Claude opera cosi':
- **A livello campagna:** verifica OMTM, budget vs. target, stabilita' generale
- **A livello ad set:** verifica stabilita' algoritmica, CPA vs. target, decisione scala/ferma
- **A livello creativita':** verifica stop loss, performance vs. CPA, decisione mantieni/spegni/duplica

L'avvertimento critico di Michelangelo: "L'AI non sostituisce la competenza." Se dai a Claude un framework sbagliato, Claude esegue un framework sbagliato in modo sistematico. L'AI amplifica la qualita' delle tue decisioni, non le sostituisce. Prima costruisci la competenza, poi codificala in un framework, poi dallo a Claude.

#### PS3: Implementa Sprint Settimanali sull'OMTM

Lo sprint settimanale e' il ritmo operativo che collega la strategia (OMTM) alla tattica (campagne).

[+] **La struttura dello sprint (dal principio di Michelangelo):**
Ogni lunedi' mattina, il team si allinea su:
1. **Qual e' l'OMTM?** (potrebbe essere cambiata)
2. **Come siamo andati la settimana scorsa?** (dati, non sensazioni)
3. **Cosa ha funzionato e cosa no?** (campagne, creativita', ad set)
4. **Cosa cambiamo questa settimana?** (scaling, stop, nuovi test)
5. **Quante creativita' lanciamo?** (basato sul budget disponibile e lo stop loss)

Il principio sottostante: senza un obiettivo chiaro e un momento strutturato per rivederlo, le decisioni sulle campagne diventano reattive e emotive. "Senza obiettivi li teniamo a caso."

#### PS4: Evolvi il Framework per le Zone Grigie

Le regole base (50 conversioni, stop loss, +10% scaling) sono il punto di partenza. Con esperienza e dati, il framework diventa piu' sofisticato.

[+] **Cosa sono le zone grigie (accennate da Michelangelo):**
Michelangelo ammette che la stabilita' algoritmica non e' binaria. Ci sono situazioni dove:
- Hai 35 conversioni (non 50) ma le campagne funzionano
- La duplicazione di creativita' "dovrebbe" penalizzare ma nel tuo caso non lo fa
- Le regole base di Advantage+ (Andromeda) cambiano il comportamento degli ad set
- Il mercato ha stagionalita' che richiedono eccezioni temporanee

Ma avverte: "E' troppo complesso dare queste informazioni in questo modo." Le zone grigie sono per chi ha gia' padroneggiato le regole base e ha abbastanza esperienza per riconoscere le eccezioni. Inizia con le regole. Poi, con dati ed esperienza, evolvi.

La sequenza corretta:
1. Impara le regole (questo playbook)
2. Applicale per almeno 3 mesi senza eccezioni
3. Raccogli dati su dove le regole sembrano troppo rigide
4. Testa deviazioni controllate con piccoli budget
5. Se funzionano, aggiorna il framework
6. Ripeti

---

## Framework

### Framework 1: L'OMTM (One Metric That Matters)

| Campo | Dettaglio |
|-------|-----------|
| Problema che risolve | I team lavorano su metriche diverse, non allineati. Ognuno ottimizza per il suo KPI senza una direzione unitaria |
| Quando usarlo | Come primo step prima di qualsiasi ottimizzazione. Se non hai definito l'OMTM, qualsiasi azione sulle campagne e' priva di direzione |
| Limiti | L'OMTM cambia nel tempo: va rivista regolarmente |

```
DEFINISCI UNA SOLA METRICA CHE COMANDA
│
├── Fase acquisizione → CAC (Customer Acquisition Cost)
├── Business consolidato → LTV (Lifetime Value)
└── Fasi intermedie → dipende dal collo di bottiglia attuale
    │
    ▼
ALLINEA IL TEAM
├── Sprint settimanale (lunedi' mattina)
├── Tutti devono conoscere l'OMTM
└── Tutte le decisioni passano per: "questo migliora l'OMTM?"
    │
    ▼
QUANDO L'OMTM CAMBIA
├── Tutto il sistema si adegua
├── Budget, campagne, KPI operativi, decisioni del team
└── La strategia governa la tattica:
    └── Campagna stabile ma fuori OMTM → va fermata
```

### Framework 2: La Formula del Budget e la Stabilita' Algoritmica

| Campo | Dettaglio |
|-------|-----------|
| Problema che risolve | La maggior parte degli advertiser lancia campagne con budget insufficiente, poi si lamenta che "le campagne non funzionano" |
| Quando usarlo | Prima di lanciare qualsiasi campagna. E come diagnostica quando le campagne "non funzionano" |
| Limiti | Zone grigie esistono (sotto 50 conversioni ma funziona), ma vanno trattate come eccezioni |

```
STEP 1: DEFINISCI IL CPA TARGET
└── Se non lo conosci: alloca un piccolo budget test per scoprirlo

STEP 2: CALCOLA IL BUDGET SETTIMANALE MINIMO
└── CPA target × 50 = budget settimanale consigliato
    └── Esempio: CPA 10€ × 50 = 500€/settimana

STEP 3: VERIFICA LA STABILITA' ALGORITMICA
└── Requisito Meta: 50 conversioni in 7 giorni per ad set
    ├── SE stabile: puoi ottimizzare, scalare, aggiungere ad set
    └── SE non stabile: sei "a casa di altri con le scarpe sporche"
        └── Risultati instabili, targeting impreciso, spreco budget

STEP 4: CONFRONTA CON IL TUO BUDGET REALE
├── Budget reale ≥ budget calcolato → OK, puoi procedere
└── Budget reale < budget calcolato → PROBLEMA
    └── Opzioni: aumenta budget, cambia obiettivo di conversione
        (evento piu' alto nel funnel), o riduci CPA target
```

### Framework 3: Il Sistema di Testing Creativo (Stop Loss)

| Campo | Dettaglio |
|-------|-----------|
| Problema che risolve | Due errori opposti: testare troppe creativita' con budget insufficiente, oppure testare troppo poco |
| Quando usarlo | Ogni volta che lanci nuove creativita'. Definisci lo stop loss PRIMA di lanciare, non durante |
| Limiti | Il moltiplicatore X va contestualizzato al tuo CPA e budget, non copiato da standard americani |

```
STEP 1: CALCOLA QUANTE CREATIVITA' PUOI TESTARE
└── Budget totale ÷ CPA = numero di inserzioni testabili
    └── Esempio: 1.000€ ÷ 10€ CPA = 100 impressioni equivalenti
        └── Ma se lo stop loss e' 2× CPA = max 50 creativita'
        └── Se lo stop loss e' 5× CPA = max 20 creativita'

STEP 2: DEFINISCI LO STOP LOSS PER CREATIVITA'
└── Stop loss = X × CPA
    ├── X = 1: test minimale (poco affidabile)
    ├── X = 2-3: test ragionevole per budget limitato
    ├── X = 5-10: test robusto per budget medio
    └── X = 10+: alta certezza statistica (budget elevato)

ATTENZIONE: NON COPIARE STANDARD AMERICANI
├── "3× CPA" non e' una regola universale
├── 200€ per creativita' ha senso a CPA 80€, non a CPA 5€
└── Contestualizza SEMPRE al tuo CPA e al tuo budget

STEP 3: CREA SOLO LE CREATIVITA' CHE PUOI TESTARE
├── NON creare 100 inserzioni se puoi testarne 20
├── Il ciclo iterativo deve essere veloce
├── In 3 mesi il mercato cambia: il messaggio di oggi non funziona domani
└── Iterazione continua > batch dump

STEP 4: APPLICA LO STOP LOSS
├── Creativita' ha raggiunto lo stop loss + CPA fuori target → SPEGNI
├── Creativita' ha raggiunto lo stop loss + CPA in target → MANTIENI/DUPLICA
└── Creativita' non ha raggiunto lo stop loss → LASCIA GIRARE
```

### Framework 4: Le Regole di Scaling e Gestione Campagne

| Campo | Dettaglio |
|-------|-----------|
| Problema che risolve | Le campagne vengono gestite a istinto: si aumenta quando ci si sente ottimisti, si diminuisce quando si ha paura |
| Quando usarlo | Come framework operativo quotidiano. Puo' essere dato a Claude tramite MCP per esecuzione senza emotivita' |
| Limiti | Le regole base vanno evolute con esperienza per gestire le zone grigie |

```
SCALING DEL BUDGET (rinforzo positivo)
├── QUANDO: CPA ≤ CPA target O ROAS ≥ ROAS target
├── CONDIZIONI:
│   ├── KPI validi negli ultimi 7 giorni (incluso oggi)
│   ├── Non raggiunto il max budget sostenibile (cash flow)
│   └── Spesa ultimi 30gg ≥ 5× budget giornaliero
├── COME: +10% di incremento
└── FREQUENZA: max 2 modifiche al giorno

DIMINUZIONE DEL BUDGET (rinforzo negativo)
├── QUANDO: CPA > CPA target
├── AZIONE: ridurre budget, segnale negativo all'algoritmo
└── NON lasciare campagne sanguinanti attive "sperando"

GESTIONE AD SET
├── PUBBLICARE nuovi ad set:
│   ├── SE oltre 50 conversioni settimanali (stabile)
│   └── SE hai budget sufficiente per sostenere un altro ad set
├── SPEGNERE ad set:
│   ├── SE non raggiungi stabilita' algoritmica
│   └── E hai speso almeno il budget minimo (CPA × 50)
└── PRINCIPIO: "Funziona → avanti. Non funziona → stacca."

GESTIONE CREATIVITA'
├── SPEGNERE: ha raggiunto stop loss + fuori CPA target
├── MANTENERE: in CPA target, performa
├── DUPLICARE: performa bene (attenzione: Advantage+ cambia le regole)
└── REFRESH: le non-performanti vanno sostituite, non lasciate

ZONE MORTE
├── Dopo ogni modifica, lasciare tempo all'algoritmo
├── Non muovere compulsivamente
└── Gli algoritmi hanno bisogno di stabilita' per apprendere

VINCOLO ASTA E BUDGET INIZIALE
├── Budget alto iniziale = bid alto = posizionamento alto
├── MA: brucia piu' creativita', serve refresh costante
└── Se non hai struttura di refresh: parti basso e scala
```

---

## Knowledge Base — Concetti Chiave

### L'AI non sostituisce la competenza

Michelangelo apre con un avvertimento: l'AI (Claude, ChatGPT) applicata alle campagne senza competenza produce disastri. Clienti che dicono "Claude mi ha detto che le campagne dovresti ottimizzarle cosi'" non capiscono che l'AI non ha tutto il contesto: i test fatti prima, la fase in cui si trovano le campagne, i fattori esterni alla campagna. L'AI va governata con testa, con conoscenza di causa, con scelte logiche. Non smettere mai di costruire competenze dirette.

### Il tracking e' la base di tutto

Prima di qualsiasi ottimizzazione: il tracciamento deve essere fatto per bene. Server-side tracking, pixel, Google Tag Manager — lo strumento non importa, ma i segnali della customer journey devono arrivare agli algoritmi. Senza dati corretti, gli algoritmi non possono ottimizzare. La causa piu' frequente di "campagne che non funzionano" e' il tracciamento rotto.

### La sperimentazione veloce come filosofia

La presentazione e' il frutto di una convinzione viscerale: la sperimentazione veloce. Cadere, rialzarsi, cadere, rialzarsi — una volta in piu' rispetto a quelle che cadi. Iterazione continua, non batch massicci.

### La stabilita' algoritmica

La stabilita' algoritmica e' il raggiungimento di almeno 50 eventi di conversione negli ultimi 7 giorni, per singolo ad set. Michelangelo la ribadisce a ogni evento perche' "quotidianamente mi scontro con account pubblicitari che non tengono in considerazione questo principio." Se operi fuori dalla stabilita' algoritmica: il pubblico e' sporco (targeting impreciso), i risultati non sono stabili, le performance sono imprevedibili.

### Il metodo di lavoro

Il messaggio ripetuto 4 volte di fila: "Il metodo di lavoro, il metodo di lavoro, il metodo di lavoro, il metodo di lavoro." Non prendere decisioni sul backend "perche' vi e' comodo". Non prendere decisioni sull'account pubblicitario "perche' vi e' comodo". Decidete un metodo di lavoro, perfezionatelo, seguitelo.

### Advantage+ (Andromeda)

Con i cambiamenti di Advantage+ (che Michelangelo chiama "Andromeda"), il livello ad set governa molto piu' di prima. Se l'ad set e' fuori dal CPA target e la creativita' e' fuori, quasi sicuramente va spenta. Meta dice che penalizza se duplichi le creativita', ma nelle zone grigie della stabilita' algoritmica ci sono eccezioni.

### Come determinare il CPA se non lo conosci

Se non hai dati storici: alloca un piccolo budget che ti puoi permettere per capire le numeriche. Tocca il mercato sul serio: e' l'unico modo per scoprire i tuoi costi reali. Datti delle aspettative, poi misura. Se non fissi un CPA target, non saprai mai quando le cose non funzionano perche' non hai un riferimento. (Collegamento diretto con l'intervento 04, Federico)

### Dati e numeri citati

- Budget pubblicitario annuo gestito: 10-15 milioni di euro
- Collaborazione con Federico: formalmente dal 2020-21, informalmente dal 2018-19, progetti insieme dal 2016
- Prima campagna multinazionale farmaceutica: 250K di budget in 2 settimane
- Stabilita' algoritmica Meta: 50 conversioni in 7 giorni per ad set
- Budget scaling: incrementi del 10%
- Modifiche budget: massimo 2 al giorno
- Tempo minimo prima di muovere una campagna: spesa 30gg ≥ 5× budget giornaliero
- Clienti in sala: Simone Rossi e Davide (clienti da 4 anni)

### Errori da evitare

- Affidarsi ciecamente all'AI senza competenze proprie
- Tracking assente o zoppo
- Budget insufficiente (sotto la soglia CPA × 50 settimanali)
- Creare troppe creativita' rispetto al budget
- Applicare standard americani senza contestualizzare
- Muovere il budget a caso senza un sistema
- Lasciare campagne sanguinanti attive "perche' potrebbero funzionare"
- Operare fuori dalla stabilita' algoritmica e lamentarsi dei risultati
- Prendere decisioni emotive

---

## Checklist Prioritizzata

### P1 — Urgente (fai SUBITO)
- [ ] Verifica il tracking: server-side tracking, pixel, GTM — i segnali della customer journey devono arrivare a Meta. Se il tracciamento e' "zoppo o peggio", qualsiasi ottimizzazione e' costruita su fondamenta marce
- [ ] Definisci il tuo CPA target: qual e' il costo per acquisizione che il tuo business puo' sostenere? Se non lo conosci, alloca un piccolo budget test per scoprirlo (collegamento intervento 04, Federico)
- [ ] Calcola il budget settimanale minimo: CPA target × 50. Confrontalo con il tuo budget attuale. Se stai spendendo meno, le campagne non hanno mai avuto la possibilita' di funzionare
- [ ] Verifica la stabilita' algoritmica: per ogni ad set attivo, stai raggiungendo 50 conversioni negli ultimi 7 giorni? Se no, opzioni: aumentare budget, consolidare ad set, cambiare evento di conversione

### P2 — Importante (entro 30 giorni)
- [ ] Definisci l'OMTM: qual e' l'unica metrica che conta per il tuo business in questo momento? Scegli UNA, comunica al team, allinea gli sprint settimanali su quella metrica
- [ ] Calcola quante creativita' puoi testare: Budget totale ÷ CPA = numero di inserzioni testabili. Non crearne piu' di quelle che puoi effettivamente validare
- [ ] Definisci lo stop loss per creativita': Stop loss = X × CPA. Decidi X in base al tuo contesto (non copiando standard americani). Scrivi la regola e seguila senza eccezioni emotive
- [ ] Crea il framework di scaling: regole scritte per quando aumentare (+10%, condizioni), quando diminuire, quante modifiche al giorno (max 2), quanto aspettare dopo ogni modifica (zone morte)
- [ ] Audit delle campagne attive con il framework: stabilita' algoritmica? CPA in target? Stop loss rispettato? Campagne sanguinanti da spegnere?

### P3 — Strategico (entro 90 giorni)
- [ ] Costruisci la struttura di refresh creativo: sistema di produzione continua settimanale, angoli dall'organico, obiezioni dalla vendita, iterazione basata sui dati
- [ ] Collega MCP Meta a Claude: implementa il framework operativo in Claude tramite MCP. Claude esegue la tattica, tu supervisioni la strategia
- [ ] Implementa gli sprint settimanali sull'OMTM: ogni lunedi' il team si allinea su dati, decisioni, creativita' da lanciare
- [ ] Evolvi il framework per le zone grigie: dopo almeno 3 mesi di applicazione delle regole base, testa deviazioni controllate con piccoli budget

---

## Connessioni con Altri Moduli

| Modulo | Come si collega |
|--------|----------------|
| [01 - Marco](./01-marco-regole-infobusiness.md) | Il cash flow come vincolo al budget pubblicitario. Se il business non ha flusso di cassa sufficiente per CPA × 50 settimanali, il problema non e' la campagna ma il modello di business |
| [03 - Roberto](./03-roberto-war-machine.md) | I funnel multi-layer richiedono stabilita' algoritmica al Layer 1 (ads). Se le campagne non sono stabili, il Layer 2 (nurture) non riceve lead e il Layer 3 (vendita) non ha prospect qualificati |
| [04 - Federico](./04-federico-organico-laboratorio.md) | Le creativita' sono il carburante delle campagne. L'organico come laboratorio per testare angoli a costo zero alimenta direttamente il refresh creativo paid. CPA target: se non lo conosci, il metodo di Federico per toccare il mercato si applica |
| [05 - Formula Partner](./05-formula-partner-incubatore.md) | La sperimentazione veloce e il pivot in 24 ore si applicano anche alle campagne. Le obiezioni dalla rete vendita diventano angoli creativi per le ads |
| [06 - Simone](./06-simone-vendita-etica.md) | Il ciclo iterativo lancia → misura → decidi → refresh → ripeti e' la versione ads del principio di sperimentazione continua |

---

[← Modulo precedente](./06-simone-vendita-etica.md) | [Torna all'indice](../index.md)
