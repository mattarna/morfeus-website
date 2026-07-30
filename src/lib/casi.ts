/* ============================================================
   REGISTRO DEI CASI
   ------------------------------------------------------------
   Prima d'ora i casi vivevano in due posti che non si parlavano:
   otto page.tsx scritti a mano, con i dati annegati nella prosa,
   e un array di slug dentro l'hub. Aggiungere un caso voleva dire
   scrivere una pagina e ricordarsi di toccare un altro file.

   Qui i dati stanno una volta sola. Da questo registro escono
   l'archivio dell'hub, i filtri, il caso in evidenza e i dati
   strutturati. Aggiungere un caso e' una voce in questo file.

   FONTE dei contenuti: le schede gia' approvate in
   BRAND-2026/02_MORFEUS-B2B/site/casi.html (data-cat, data-tags,
   titoli, sintesi, numeri, timbro). Non sono riscritti: sono
   portati. L'unico caso che li' non c'era e' Brainiac, i cui dati
   arrivano dalla sua pagina.

   IL "PROBLEMA" E' L'UNICO CAMPO DEDOTTO DA ME.
   La copy nuova chiede di far entrare il visitatore per problema
   operativo, non per settore, e i quattro problemi sono fissati
   nel brief. La mappatura caso -> problema non esisteva da nessuna
   parte: l'ho scritta leggendo i casi, ed e' la sola cosa di
   questo file che va guardata prima di considerarla vera.
   ============================================================ */

export const PROBLEMI = {
  sapere: {
    it: "Il sapere resta nella testa di pochi",
    en: "Knowledge lives in too few heads",
  },
  ripetitivo: {
    it: "Il team perde tempo in attività ripetitive",
    en: "The team loses time to repetitive work",
  },
  decisioni: {
    it: "Le informazioni non arrivano a chi deve decidere",
    en: "Information does not reach the people who need to decide",
  },
  commerciale: {
    it: "Il processo commerciale dipende da passaggi manuali",
    en: "The sales process depends on manual handoffs",
  },
} as const;

export type ChiaveProblema = keyof typeof PROBLEMI;
export type Area = "Vendite" | "Operations" | "Margine" | "Reporting";

/* Le etichette delle aree, tradotte come quelle dei problemi.
   I nomi dentro il tipo Area restano in italiano perche' sono CHIAVI:
   le usano gli otto casi e le classi del colore, e cambiarle vorrebbe
   dire toccare tutto per una ragione di sola lingua. A schermo, pero',
   non si mostra piu' la chiave: sulla pagina inglese i filtri dicevano
   VENDITE e MARGINE in mezzo a un testo tutto inglese, e Operations e
   Reporting sembravano tradotti solo perche' si scrivono uguale nelle
   due lingue. */
export const AREE_ETICHETTE: Record<Area, { it: string; en: string }> = {
  Vendite: { it: "Vendite", en: "Sales" },
  Operations: { it: "Operations", en: "Operations" },
  Margine: { it: "Margine", en: "Margin" },
  Reporting: { it: "Reporting", en: "Reporting" },
};

export type Caso = {
  slug: string;
  /** area aziendale, dal data-cat delle schede approvate */
  area: Area;
  /** il problema operativo da cui si entra, dedotto (vedi testa file) */
  problema: ChiaveProblema;
  /** chi e', in una riga: settore o tipo di azienda */
  chi: { it: string; en: string };
  /** la taglia, dove la scheda originale la dichiarava */
  taglia?: string;
  titolo: { it: string; en: string };
  sintesi: { it: string; en: string };
  /** i numeri gia' verificati. Niente stime, niente arrotondamenti nuovi. */
  numeri: { valore: string; etichetta: { it: string; en: string } }[];
  /** il timbro "Confermato" delle schede: sta solo dove era gia' */
  confermato: boolean;
  tags: string[];
};

export const CASI: Caso[] = [
  {
    slug: "cyberangels-report-cfo",
    area: "Reporting",
    problema: "decisioni",
    chi: { it: "Moda, media impresa", en: "Fashion, mid-sized company" },
    taglia: "50-250",
    titolo: {
      it: "Il report finisce nel cassetto del CFO",
      en: "The report ends up in the CFO's drawer",
    },
    sintesi: {
      it: "Un report tecnicamente solido moriva sulla scrivania di chi firma, perché scritto nella lingua sbagliata. Lo stesso assessment, tradotto in rischio e spesa, adesso arriva integro fino al tavolo che decide.",
      en: "A technically sound report died on the desk of the person who signs, because it was written in the wrong language. The same assessment, translated into risk and cost, now reaches the table that decides.",
    },
    numeri: [
      {
        valore: "Il board lo legge",
        etichetta: { it: "esito verificato", en: "verified outcome" },
      },
    ],
    confermato: true,
    tags: ["report", "CFO", "board", "reporting", "sicurezza", "rinnovo"],
  },
  {
    slug: "cyberangels-sales-advisor",
    area: "Vendite",
    problema: "sapere",
    chi: { it: "Sicurezza informatica, MSP", en: "Cybersecurity, MSP" },
    titolo: {
      it: "Il servizio col margine più alto, sbloccato",
      en: "The highest-margin service, unlocked",
    },
    sintesi: {
      it: "Il sapere tecnico restava nella testa di chi lo produceva e non arrivava mai in call. Un brief commerciale lo ha reso disponibile a chi vende.",
      en: "Technical knowledge stayed in the heads of the people who produced it and never made it into a sales call. A commercial brief made it available to the people who sell.",
    },
    numeri: [
      {
        valore: "70%+",
        etichetta: { it: "call con la sicurezza in agenda", en: "calls with security on the agenda" },
      },
      { valore: "+30%", etichetta: { it: "ticket medio", en: "average ticket" } },
    ],
    confermato: true,
    tags: ["sicurezza", "vendita", "MSP", "brief commerciale", "margine"],
  },
  {
    slug: "marf-lead-caldo",
    area: "Vendite",
    problema: "commerciale",
    chi: { it: "Call center energia", en: "Energy call center" },
    taglia: "Micro-PMI · 12 persone",
    titolo: {
      it: "Il lead caldo che stasera non richiami, domani è morto",
      en: "The warm lead you don't call back tonight is dead tomorrow",
    },
    sintesi: {
      it: "Metà dei lead pagati non veniva richiamata. Una board per venditore ha portato il secondo contatto dal 50% a oltre il 90%.",
      en: "Half the paid leads were never called back. A board per salesperson took second contact from 50% to over 90%.",
    },
    numeri: [
      {
        valore: "50→90%+",
        etichetta: { it: "secondo contatto", en: "second contact" },
      },
    ],
    confermato: true,
    tags: ["lead", "energia", "call center", "follow-up", "board"],
  },
  {
    slug: "scalers-pre-sales",
    area: "Vendite",
    problema: "commerciale",
    chi: { it: "Consulenza B2B", en: "B2B consulting" },
    taglia: "PMI · 15-60 persone",
    titolo: {
      it: "Entravano in call senza sapere con chi parlavano",
      en: "They joined calls without knowing who they were talking to",
    },
    sintesi: {
      it: "Quattro-sei call al giorno, tutte a freddo. Un brief automatico pre-call ha alzato le chiusure di circa 11 punti in un trimestre.",
      en: "Four to six calls a day, all cold. An automatic pre-call brief raised close rates by around 11 points in a quarter.",
    },
    numeri: [
      { valore: "+11 punti", etichetta: { it: "chiusure", en: "close rate" } },
    ],
    confermato: true,
    tags: ["pre-sales", "brief", "call", "consulenza", "chiusura"],
  },
  {
    slug: "valueize-best-seller",
    area: "Margine",
    problema: "decisioni",
    chi: { it: "E-commerce DTC", en: "DTC e-commerce" },
    taglia: "PMI digitale · 5-50",
    titolo: {
      it: "Il best-seller che ti stava mangiando vivo",
      en: "The best-seller that was eating you alive",
    },
    sintesi: {
      it: "Il fatturato cresceva, la cassa no. Il margine reale SKU per SKU ha scoperto tre best-seller in perdita, spinti in ads.",
      en: "Revenue was growing, cash was not. Real margin SKU by SKU found three best-sellers running at a loss, pushed in ads.",
    },
    numeri: [
      { valore: "3 SKU", etichetta: { it: "in rosso, trovati", en: "in the red, found" } },
    ],
    confermato: true,
    tags: ["margine", "SKU", "e-commerce", "pricing", "ads", "cassa"],
  },
  {
    slug: "brainiac-tesoreria-riconciliata",
    area: "Margine",
    problema: "ripetitivo",
    chi: { it: "PMI con due società", en: "SME with two legal entities" },
    titolo: {
      it: "Le fatture le emetti tu. Chi le incassa?",
      en: "You issue the invoices. Who collects them?",
    },
    sintesi: {
      it: "I buchi di cassa si scoprivano quando erano già davanti. La riconciliazione, che prima era lavoro manuale ripetuto, adesso avviene da sola e la cassa si legge dal telefono.",
      en: "Cash gaps were discovered only once they had arrived. Reconciliation, once repeated manual work, now happens on its own and cash is readable from a phone.",
    },
    numeri: [
      {
        valore: "65.000 €",
        etichetta: {
          it: "crediti scaduti recuperati nel primo trimestre",
          en: "overdue receivables recovered in the first quarter",
        },
      },
      { valore: "-18", etichetta: { it: "giorni medi d'incasso", en: "average days to collect" } },
    ],
    confermato: true,
    tags: ["cassa", "tesoreria", "riconciliazione", "crediti", "incassi"],
  },
  {
    slug: "ag-academy-onboarding",
    area: "Operations",
    problema: "ripetitivo",
    chi: { it: "Academy", en: "Academy" },
    taglia: "PMI · 20-60 persone",
    titolo: {
      it: "Hai chiuso la vendita. Poi lo studente sparisce",
      en: "You closed the sale. Then the student disappears",
    },
    sintesi: {
      it: "Un quarto degli studenti evaporava nei primi quattordici giorni per accessi non consegnati. Una board di onboarding ha portato i rimborsi dal 25% al 6%.",
      en: "A quarter of students evaporated in the first fourteen days because access was never delivered. An onboarding board took refunds from 25% to 6%.",
    },
    numeri: [{ valore: "25→6%", etichetta: { it: "rimborsi", en: "refunds" } }],
    confermato: true,
    tags: ["onboarding", "rimborsi", "academy", "retention", "board"],
  },
  {
    slug: "globia-scoring-deterministico",
    area: "Operations",
    problema: "decisioni",
    chi: { it: "Due diligence", en: "Due diligence" },
    taglia: "Micro-PMI · 5-25 persone",
    titolo: {
      it: "Il numero cambiava a ogni click",
      en: "The number changed with every click",
    },
    sintesi: {
      it: "Un tool di scoring AI dava un voto diverso allo stesso input. Un motore a formule fisse ha reso il punteggio riproducibile e difendibile.",
      en: "An AI scoring tool gave a different score for the same input. A fixed-formula engine made the score reproducible and defensible.",
    },
    numeri: [
      { valore: "-60%", etichetta: { it: "tempo per valutazione", en: "time per assessment" } },
      { valore: "100%", etichetta: { it: "riproducibile", en: "reproducible" } },
    ],
    confermato: true,
    tags: ["scoring", "due diligence", "riproducibile", "difendibile"],
  },
];

/** Il caso in evidenza dell'hub. Uno solo, dichiarato qui e non
    scelto a caso in pagina, cosi' cambiarlo e' una riga. */
export const CASO_IN_EVIDENZA = "cyberangels-report-cfo";

export function getCaso(slug: string) {
  return CASI.find((c) => c.slug === slug);
}

export function casiPerProblema(chiave: ChiaveProblema) {
  return CASI.filter((c) => c.problema === chiave);
}
