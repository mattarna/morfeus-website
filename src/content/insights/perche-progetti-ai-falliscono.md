---
title: "Perché il 95% dei progetti di AI fallisce (e come essere nel 5% che funziona)"
slug: "perche-progetti-ai-falliscono"
metaTitle: "Perché il 95% dei progetti AI fallisce | Morfeus"
metaDescription: "Il 95% dei progetti di AI in azienda non produce risultati (MIT, 2025). Non è colpa dei modelli: ecco le cause reali e come essere nel 5% che funziona."
category: "Margine & ROI"
tags: ["adozione AI", "ROI", "progetti AI"]
topicTags: ["MIT", "ROI", "Adozione", "POC", "News"]
author: "Matteo Arnaboldi"
authorRole: "CEO & Co-Founder, Morfeus"
datePublished: "2026-06-29"
dateModified: "2026-07-09"
readingTime: "7 min"
targetQuery: "perché i progetti di intelligenza artificiale falliscono"
tldr: "Il MIT NANDA ha misurato che il 95% dei progetti di AI generativa in azienda non genera alcun impatto misurabile sul conto economico (The GenAI Divide, 2025). Non è un problema di modelli: è un problema di integrazione nei processi, di monitoraggio quotidiano e di chi risponde dei risultati. I progetti costruiti con partner specializzati riescono circa il 67% delle volte, contro un terzo per gli sviluppi puramente interni. Il 5% che funziona parte da un perimetro delimitato, un problema misurato in euro, e una persona che lo segue ogni giorno."
relatedTerms: ["Value Leak", "ROIometro", "Pilot → Retainer", "AI Champion", "MARF"]
internalLinks: ["/roiometro", "/insights/value-leak", "/marf", "/ai-champion", "/metodo"]
faq:
  - q: "Da cosa dipende davvero il fallimento dei progetti di AI?"
    a: "Non dalla qualità dei modelli, che oggi è alta. Dipende da quanto l'AI viene integrata nei processi reali: un perimetro chiaro, un responsabile quotidiano, un monitoraggio costante. Senza questi tre elementi, anche il modello migliore resta una demo."
  - q: "Conviene costruire l'AI internamente o con un partner?"
    a: "La ricerca MIT mostra che le soluzioni costruite con partner specializzati riescono circa il 67% delle volte, contro un terzo per gli sviluppi puramente interni. Non perché il partner abbia un modello migliore, ma perché ha già visto dove si rompe l'integrazione."
  - q: "Come capisco se il mio progetto AI sta per fallire?"
    a: "Segnali tipici: nessuno sa dire quale numero deve migliorare, non c'è una persona che controlla cosa risponde il sistema ogni giorno, il progetto è fermo in fase pilota da mesi e a deciderne il destino è solo l'IT, senza i reparti operativi."
sources:
  - title: "MIT NANDA, The GenAI Divide: State of AI in Business 2025 (via Fortune)"
    url: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/"
schema: [Article, FAQPage, BreadcrumbList]
coverKind: "loop-spezzato"
---

**In breve.** Il MIT NANDA ha misurato che il 95% dei progetti di AI generativa in azienda non genera alcun impatto misurabile sul conto economico. Non è un problema di modelli: è un problema di integrazione nei processi, di monitoraggio quotidiano e di chi ne risponde. Chi costruisce con un partner specializzato riesce circa il 67% delle volte, contro un terzo per gli sviluppi puramente interni. Il 5% che funziona parte da un perimetro delimitato, un problema misurato in euro, e una persona che lo segue ogni giorno.

## Un pilot che funzionava benissimo, finché non ha risposto a un cliente vero

Un istituto finanziario con qualche migliaio di dipendenti aveva appena finito di distribuire agenti AI su tutta l'organizzazione. Il progetto era stato calato dall'alto, sponsorizzato in comitato di direzione, e la demo era stata impeccabile: risposte rapide, tono corretto, casi d'uso coperti uno dopo l'altro. Nessuno in sala aveva niente da obiettare.

Poi qualcuno ha notato una risposta che non tornava. Non un errore clamoroso, il tipo di imprecisione che passa inosservata finché non tocca il cliente sbagliato al momento sbagliato. È lì che è emersa la domanda che nessuno si era fatto prima del lancio: chi controlla, ogni giorno, cosa rispondono davvero questi agenti? La risposta era nessuno. Il pilot tecnicamente funzionava. Il processo che doveva contenerlo, monitorarlo e correggerlo non esisteva.

## Il pattern ha un nome, e il MIT lo ha misurato su scala

Quello che abbiamo visto in quel caso non è un incidente isolato. È esattamente il pattern che _The GenAI Divide: State of AI in Business_, la ricerca 2025 dell'iniziativa NANDA del MIT, ha misurato su 300 deployment pubblici, 150 interviste a manager e un sondaggio su 350 dipendenti: solo il 5% dei progetti di AI generativa in azienda porta a un'accelerazione reale di ricavi o margine. Il restante 95% resta senza impatto misurabile sul conto economico.

<figure class="figure">
  <div class="ft">Il divario partner vs interno</div>
  <h4>Chi costruisce da solo fallisce due volte su tre.</h4>
  <svg class="chart" viewBox="0 0 640 320" role="img" aria-label="Grafico a barre: progetti AI costruiti con partner specializzato riescono nel 67% dei casi, contro il 33% degli sviluppi interni">
    <line class="gridln" x1="80" y1="60" x2="80" y2="260"/>
    <line class="gridln" x1="80" y1="60" x2="600" y2="60"/>
    <line class="gridln" x1="80" y1="160" x2="600" y2="160"/>
    <line class="axis" x1="80" y1="260" x2="600" y2="260"/>
    <text x="72" y="64" text-anchor="end" font-size="11">100%</text>
    <text x="72" y="164" text-anchor="end" font-size="11">50%</text>
    <text x="72" y="264" text-anchor="end" font-size="11">0%</text>
    <rect class="lineM" x="160" y="126" width="120" height="134" fill="currentColor" opacity="0.35"/>
    <rect class="lineR" x="380" y="192" width="120" height="68" fill="currentColor" opacity="0.9"/>
    <text class="lblR" x="220" y="118" text-anchor="middle" font-weight="700">67%</text>
    <text class="lblM" x="440" y="184" text-anchor="middle" font-weight="700">33%</text>
    <text x="220" y="282" text-anchor="middle" font-size="12">Con partner specializzato</text>
    <text x="440" y="282" text-anchor="middle" font-size="12">Sviluppo interno</text>
    <text x="340" y="308" text-anchor="middle" font-size="11" opacity="0.7">Tasso di riuscita dei progetti di AI generativa in azienda</text>
  </svg>
  <div class="legend"><span><i class="r"></i>Partner specializzato</span><span><i class="m"></i>Sviluppo interno</span></div>
  <figcaption>Fonte: MIT NANDA, <i>The GenAI Divide 2025</i>, su 300 deployment. Non è il modello a fare la differenza: è chi ha già visto dove si rompe l'integrazione.</figcaption>
</figure>

Il dato ha fatto rumore perché suona come un giudizio sulla tecnologia. Letto da dentro un progetto reale, dice qualcos'altro: il fallimento non è un evento raro e imprevedibile, è quasi sempre la stessa cosa che si ripete. Il MIT lo chiama _learning gap_, la distanza tra un modello che sa rispondere bene in laboratorio e un'organizzazione che sa cosa farne ogni giorno.

## Perché non è colpa dei modelli

Il riflesso comune, davanti a un progetto AI che non porta risultati, è incolpare il modello: non capisce abbastanza, sbaglia troppo, non è ancora maturo. La ricerca smentisce questa lettura. I modelli generalisti oggi funzionano, e in laboratorio si comportano bene quasi sempre. Quello che manca non è nel modello. È tra il modello e il lavoro vero.

<blockquote class="pquote">"Il pilot tecnicamente funzionava. Il processo che doveva contenerlo, monitorarlo e correggerlo non esisteva."</blockquote>

Il caso della banca lo mostra bene: la tecnologia non aveva bisogno di essere migliore. Aveva bisogno di un perimetro definito (quali domande può gestire da solo, quali no), di qualcuno che leggesse un campione di conversazioni ogni settimana, e di un criterio chiaro per capire quando intervenire. Senza questi tre elementi, anche il modello più bravo del mondo produce lo stesso risultato: funziona in demo, si rompe nel primo caso anomalo, e nessuno se ne accorge finché non è già un problema.

## La differenza si vede nel perimetro, non nella dimensione

L'anno scorso abbiamo seguito un general contractor edile di circa 50 persone che voleva automatizzare un solo processo: l'invio e il tracciamento dei preventivi ai clienti. Nessun agente onnicomprensivo, nessuna ambizione di coprire ogni reparto. Un processo, criteri di accettazione definiti prima di iniziare, e una persona interna che ogni settimana verificava che il sistema facesse esattamente quello che doveva fare. Oggi quel processo gira, misura il tempo risparmiato, e nessuno in azienda si chiede se "funziona": lo vedono nei numeri.

La differenza tra questo caso e quello della banca non è la dimensione dell'azienda, né il budget, né la sofisticazione del modello usato. È che nel secondo caso il perimetro era chiaro fin dal primo giorno, e qualcuno ne rispondeva. È esattamente il confine tra il 5% e il 95% descritto dal MIT, visto da vicino: non vince chi ha l'AI più avanzata, vince chi ha impostato meglio cosa deve fare, chi la controlla, e come si misura il risultato.

## Come impostare un progetto perché stia nel 5%

Il modo in cui lavoriamo in Morfeus nasce proprio per evitare l'errore che abbiamo visto ripetersi: partire dal tool invece che dal problema, restare in demo, lasciare che il sistema viva senza nessuno che ne risponda.

- **Diagnosi.** Prima di parlare di tecnologia, misuriamo dove l'azienda sta perdendo valore ogni giorno. Con il [ROIometro](/roiometro) quella sensazione diventa un numero, e i punti di perdita diventano [Value Leak](/insights/value-leak) quantificati in euro.
- **Sistema.** Costruiamo su un perimetro delimitato, in produzione fin dal primo giorno, non in una demo isolata. Il sistema si appoggia su [MARF](/marf), l'infrastruttura che resta in azienda e si estende nel tempo invece di ripartire da zero a ogni progetto.
- **Valore.** Ogni mese un Value Report mostra cosa il sistema ha effettivamente prodotto, in euro, non in slide.
- **Autonomia.** Formiamo un [AI Champion](/ai-champion) per reparto: la persona che ogni giorno controlla, corregge e fa evolvere il sistema, così la capacità resta dentro l'azienda anche il giorno dopo che noi ce ne siamo andati.

<div class="gtable">
  <div class="cap">Le cinque cause di fallimento più comuni, e la contromisura Morfeus</div>
  <table class="rng">
    <thead><tr><th>Causa di fallimento</th><th>Il segnale in azienda</th><th class="v">Contromisura</th></tr></thead>
    <tbody>
      <tr><td>Nessun perimetro definito</td><td class="note-td">"Facciamo AI ovunque", nessun caso d'uso prioritario</td><td class="v">Un processo, criteri d'accettazione</td></tr>
      <tr><td>Nessuno che risponda ogni giorno</td><td class="note-td">Il sistema gira, ma non è di nessuno</td><td class="v">AI Champion di reparto</td></tr>
      <tr><td>Zero monitoraggio delle risposte</td><td class="note-td">Nessuno legge cosa il sistema dice ai clienti</td><td class="v">Review settimanale su campione</td></tr>
      <tr><td>Metriche tecniche, non in euro</td><td class="note-td">"Accuracy 92%" ma il CFO non capisce l'impatto</td><td class="v">Value Report mensile</td></tr>
      <tr><td>Progetto calato dall'IT</td><td class="note-td">I reparti operativi non erano nella stanza</td><td class="v">Diagnosi con chi vive il processo</td></tr>
    </tbody>
  </table>
</div>

Il filo che lega questi quattro passaggi è lo stesso che abbiamo visto mancare nel caso della banca e presente in quello del general contractor: un perimetro chiaro, e qualcuno che se ne prende cura ogni giorno.

## In sintesi

Il 95% misurato dal MIT non è una condanna della tecnologia, è una diagnosi sul metodo. Un pilot può essere tecnicamente impeccabile e fallire comunque, se nessuno lo integra nei processi e nessuno ne risponde ogni giorno. La domanda da cui partire non è quale AI comprare, ma dove stai perdendo valore oggi, e chi la controllerà domani.

<div class="inlinecta">
  <div><h3>Vuoi sapere da che parte stai?</h3><p>In pochi minuti il ROIometro ti dice quanto un processo ti costa oggi e quanto puoi recuperare. È il primo passo per non finire nel 95%.</p></div>
  <a class="btn btn-1" href="/roiometro">Prova il ROIometro</a>
</div>
