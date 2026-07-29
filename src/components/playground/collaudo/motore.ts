/* ============================================================
   IL COLLAUDO · il motore
   ------------------------------------------------------------
   Logica pura: nessun DOM, nessun React, nessun testo di pagina.
   Qui dentro c'e' solo COME si misura, non COSA si dice.

   Spec: 01_MORFEUS/06_PROJECTS/INFOBUSINESS/05_FUNNEL/COLLAUDO_V2_SPEC.md

   Perche' e' un file a se'. Il difetto della versione precedente
   era che il punteggio viveva sparso dentro la funzione che
   disegnava il referto: impossibile verificarlo senza compilare
   il questionario a mano. Qui si testa in isolamento.
   ============================================================ */

/* ---------- le 5 dimensioni ---------- */

/** Le dimensioni sono FISSE per tutti. Cambiano le scene che le
 *  misurano (vestite sul mestiere di chi risponde), mai cosa si
 *  misura: altrimenti due voti uguali non parlano della stessa cosa,
 *  ed e' esattamente il difetto che ha fatto rifare la V1. */
export type Dimensione =
  | "contesto"      /* l'AI sa chi sei PRIMA di lavorare */
  | "ripetibilita"  /* il lavoro che rifai e' una routine o riparte da zero */
  | "correzione"    /* l'errore diventa istruzione o resta tuo */
  | "controllo"     /* verifichi by design, alla cieca, o tutto a mano */
  | "diffusione";   /* il sistema vive fuori dalla tua testa */

export type Punti = 0 | 1 | 2 | 3;
export type Radiografia = Record<Dimensione, Punti>;

/** Somma 100. Contesto e ripetibilita' pesano di piu' perche' sono la
 *  tesi AI Brain; diffusione pesa meno ma comanda i cancelli (sotto). */
export const PESI: Record<Dimensione, number> = {
  contesto: 25,
  ripetibilita: 25,
  correzione: 20,
  controllo: 15,
  diffusione: 15,
};

export const DIMENSIONI = Object.keys(PESI) as Dimensione[];

/** 0-100. Ogni punto e' tracciabile alla risposta che lo ha prodotto.
 *  Risoluzione misurata (vedi motore.test.ts): 1024 radiografie distinte,
 *  che dopo l'arrotondamento danno 57 voti diversi. La V1 di voti ne
 *  aveva 16 in tutto. Il livello non guarda comunque il solo voto: i
 *  cancelli leggono la radiografia, quindi la finezza vera e' sui 1024. */
export function calcolaVoto(r: Radiografia): number {
  const grezzo = DIMENSIONI.reduce((somma, d) => somma + (r[d] / 3) * PESI[d], 0);
  return Math.round(grezzo);
}

/* ---------- gli 8 livelli, con i cancelli ---------- */

export type NumeroLivello = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Arco = "L1" | "L2" | "L3" | "L4";

type DefLivello = {
  numero: NumeroLivello;
  nome: string;
  sogliaMin: number;
  arco: Arco;
  /** Il cancello. Non basta il punteggio: da LV5 in su serve anche la
   *  sostanza. Sono cumulativi (il 7 contiene il 6, che contiene il 5). */
  cancello: (r: Radiografia) => boolean;
};

/** L'arco L1-L4 e' quello canonico della narrativa Playground.
 *  Gli 8 livelli non sono una scala parallela: sono la sua lettura fine. */
const LIVELLI: DefLivello[] = [
  { numero: 1, nome: "Spettatore", sogliaMin: 0, arco: "L1", cancello: () => true },
  { numero: 2, nome: "Utente", sogliaMin: 15, arco: "L1", cancello: () => true },
  { numero: 3, nome: "Prompter", sogliaMin: 30, arco: "L2", cancello: () => true },
  { numero: 4, nome: "Collezionista", sogliaMin: 45, arco: "L2", cancello: () => true },
  { numero: 5, nome: "Costruttore", sogliaMin: 57, arco: "L3",
    cancello: (r) => r.contesto >= 2 },
  { numero: 6, nome: "Operatore", sogliaMin: 69, arco: "L3",
    cancello: (r) => r.contesto >= 2 && r.ripetibilita >= 2 },
  { numero: 7, nome: "AI Champion", sogliaMin: 81, arco: "L4",
    cancello: (r) => r.contesto >= 2 && r.ripetibilita >= 2 && r.diffusione >= 2 },
  { numero: 8, nome: "Architetto", sogliaMin: 91, arco: "L4",
    cancello: (r) => r.contesto >= 2 && r.ripetibilita >= 2 && r.diffusione === 3 && r.controllo >= 2 },
];

/** Ordine in cui si cerca il colpevole quando un cancello blocca:
 *  si nomina la mancanza piu' a monte, non la prima che capita. */
const ORDINE_COLPA: Dimensione[] = ["contesto", "ripetibilita", "diffusione", "controllo"];

const MINIMI_CANCELLO: Record<NumeroLivello, Partial<Record<Dimensione, number>>> = {
  1: {}, 2: {}, 3: {}, 4: {},
  5: { contesto: 2 },
  6: { contesto: 2, ripetibilita: 2 },
  7: { contesto: 2, ripetibilita: 2, diffusione: 2 },
  8: { contesto: 2, ripetibilita: 2, diffusione: 3, controllo: 2 },
};

export type Livello = {
  numero: NumeroLivello;
  nome: string;
  arco: Arco;
  voto: number;
  /** Dove sarebbe arrivato col solo punteggio. Uguale a `numero` se nessun
   *  cancello ha bloccato. */
  numeroAritmetico: NumeroLivello;
  /** La dimensione che ha tenuto fermo il livello, quando e' successo.
   *  E' il dato piu' utile del referto: dice PERCHE' non sale. */
  bloccatoDa: Dimensione | null;
};

export function calcolaLivello(r: Radiografia): Livello {
  const voto = calcolaVoto(r);

  /* il livello che il solo punteggio giustificherebbe */
  const perPunteggio = [...LIVELLI].reverse().find((l) => voto >= l.sogliaMin) ?? LIVELLI[0];

  /* si scende finche' il cancello non regge */
  const reale = [...LIVELLI]
    .reverse()
    .find((l) => voto >= l.sogliaMin && l.cancello(r)) ?? LIVELLI[0];

  let bloccatoDa: Dimensione | null = null;
  if (reale.numero < perPunteggio.numero) {
    const minimi = MINIMI_CANCELLO[perPunteggio.numero];
    bloccatoDa =
      ORDINE_COLPA.find((d) => {
        const min = minimi[d];
        return min !== undefined && r[d] < min;
      }) ?? null;
  }

  return {
    numero: reale.numero,
    nome: reale.nome,
    arco: reale.arco,
    voto,
    numeroAritmetico: perPunteggio.numero,
    bloccatoDa,
  };
}

/* ---------- chi hai davanti ---------- */

/** Da chi escono i soldi. E' la variabile che l'ICP mette per prima:
 *  un manager non tira fuori di tasca sua le cifre della cima. */
export type Tasca = "mia" | "azienda";

/** Cosa moltiplica l'AI Brain: solo la tua produttivita', o una struttura. */
export type Leva = "solo" | "struttura" | "nessuna";

export type Intento = "imparare" | "applicare" | "delegare" | "team";

export type Profilo = {
  tasca: Tasca;
  leva: Leva;
  intento: Intento;
};

/* ---------- il gradino ---------- */

/** Solo prodotti che esistono davvero (CATALOGO_PRODOTTI).
 *  `call` e' il veicolo dell'high-ticket: il prezzo non compare mai
 *  nel referto, si fa in call. */
export type Gradino =
  | "community"
  | "claude-unlocked"
  | "bootcamp"
  | "call"
  | "call-b2b";

export type Proposta = {
  gradino: Gradino;
  /** Perche' questo e non un altro. Nota interna, per il referto e per
   *  chi poi richiama. Fattuale, non copy. */
  motivo: string;
  /** Vero quando il Bootcamp sarebbe stato la risposta ma le iscrizioni
   *  sono chiuse: la persona va taggata per l'apertura. */
  listaAttesaBootcamp: boolean;
};

export type Opzioni = {
  /** Interruttore, non una data: il Bootcamp compare solo a iscrizioni aperte. */
  bootcampAperto: boolean;
};

export function calcolaProposta(
  profilo: Profilo,
  livello: NumeroLivello,
  opzioni: Opzioni,
): Proposta {
  const { tasca, leva, intento } = profilo;

  /* ---- chi paga con la tasca dell'azienda ----
     Regola di Matt: al dipendente non si fissa una call commerciale.
     L'unica eccezione e' l'ICP "lead B2B travestito": vuole portarla
     in azienda ED e' abbastanza avanti da reggere la proposta a chi
     decide. Sotto LV5 quella conversazione e' prematura. */
  if (tasca === "azienda") {
    if (intento === "team" && livello >= 5) {
      return {
        gradino: "call-b2b",
        motivo: "Tasca aziendale ma intento di portarla in azienda, con un livello che regge la proposta a chi decide.",
        listaAttesaBootcamp: false,
      };
    }
    if (livello <= 2) {
      return {
        gradino: "community",
        motivo: "Tasca aziendale, livello iniziale: si entra gratis, il corso resta il passo dopo.",
        listaAttesaBootcamp: false,
      };
    }
    if (livello <= 4) {
      return {
        gradino: "claude-unlocked",
        motivo: "Tasca aziendale: percorso individuale, mai una call commerciale.",
        listaAttesaBootcamp: false,
      };
    }
    /* Da LV5 in su il corso d'ingresso non ha piu' niente da dargli: sa gia'
       usare Claude con metodo. Con la tasca dell'azienda l'high-ticket e'
       fuori portata, quindi l'unica proposta onesta e' la stanza, dove trova
       gente al suo livello. Meglio non vendergli niente che vendergli sotto. */
    return {
      gradino: "community",
      motivo: "Tasca aziendale ma livello alto: il corso d'ingresso sarebbe sotto di lui, e l'high-ticket non lo paga di tasca sua.",
      listaAttesaBootcamp: false,
    };
  }

  /* ---- tasca propria + struttura + intento di estenderla ----
     Vince sul livello: e' l'ICP primario, e la conversazione riguarda
     l'azienda, non un corso per se'. */
  if (leva === "struttura" && (intento === "team" || intento === "delegare")) {
    return {
      gradino: "call",
      motivo: "Titolare con struttura che vuole estenderla oltre se stesso: si parla della struttura, non di un corso.",
      listaAttesaBootcamp: false,
    };
  }

  const sogliaBootcamp = leva === "struttura" ? 5 : 4;

  /* ---- il vertice ---- */
  if (livello >= 7) {
    return {
      gradino: "call",
      motivo: `Livello ${livello}: un altro corso non sposta niente, il passo e' la call.`,
      listaAttesaBootcamp: false,
    };
  }

  /* ---- la fascia Bootcamp ---- */
  if (livello >= sogliaBootcamp) {
    if (opzioni.bootcampAperto) {
      return {
        gradino: "bootcamp",
        motivo: `Livello ${livello}: ha le basi per lavorare sul proprio caso in aula.`,
        listaAttesaBootcamp: false,
      };
    }
    /* iscrizioni chiuse: non si lascia un vicolo cieco */
    if (leva === "struttura") {
      return {
        gradino: "call",
        motivo: "Bootcamp chiuso, ma tasca e struttura reggono il percorso individuale.",
        listaAttesaBootcamp: true,
      };
    }
    return {
      gradino: "claude-unlocked",
      motivo: "Bootcamp chiuso: intanto il corso, e va avvisato all'apertura.",
      listaAttesaBootcamp: true,
    };
  }

  /* ---- la partenza ---- */
  return {
    gradino: "claude-unlocked",
    motivo: `Livello ${livello}: prima le fondamenta, il resto viene dopo.`,
    listaAttesaBootcamp: false,
  };
}

/* ---------- l'esito completo ---------- */

export type Esito = {
  radiografia: Radiografia;
  livello: Livello;
  proposta: Proposta;
  /** La dimensione piu' debole: e' da qui che parte il piano nel referto.
   *  A parita' di punti vince quella che pesa di piu'. */
  puntoDebole: Dimensione;
};

export function collauda(
  radiografia: Radiografia,
  profilo: Profilo,
  opzioni: Opzioni,
): Esito {
  const livello = calcolaLivello(radiografia);
  return {
    radiografia,
    livello,
    proposta: calcolaProposta(profilo, livello.numero, opzioni),
    puntoDebole: [...DIMENSIONI].sort(
      (a, b) => radiografia[a] - radiografia[b] || PESI[b] - PESI[a],
    )[0],
  };
}
