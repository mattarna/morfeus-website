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

/** Quanto vale ogni scalino, in frazione del peso della dimensione.
 *
 *  NON e' lineare, ed e' una scelta di merito prima che statistica.
 *  Fra "ho una chat dedicata dove e' gia' tutto impostato" (2) e "do solo
 *  i dati nuovi e l'output esce nel mio formato" (3) non c'e' un terzo di
 *  strada: c'e' tutta la differenza fra avere un pezzo e avere un sistema.
 *  L'ultimo scalino vale piu' del doppio del penultimo perche' e' li' che
 *  l'AI Brain comincia a esistere.
 *
 *  Effetto collaterale voluto: salire costa. Sulle 1024 combinazioni
 *  equiprobabili i ranghi bassi passano dal 37% al 61% e gli alti dal 14%
 *  al 6%. Il tetto pero' non si abbassa di un millimetro: chi risponde da
 *  fuoriclasse prende 100 e arriva a 8 come prima. Si stringe il centro,
 *  non la cima. */
const VALORE: Record<Punti, number> = { 0: 0, 1: 0.15, 2: 0.45, 3: 1 };

/** 0-100. Ogni punto e' tracciabile alla risposta che lo ha prodotto.
 *  Il livello non guarda comunque il solo voto: i cancelli leggono la
 *  radiografia, quindi la finezza vera e' sulle 1024 combinazioni. */
export function calcolaVoto(r: Radiografia): number {
  const grezzo = DIMENSIONI.reduce((somma, d) => somma + VALORE[r[d]] * PESI[d], 0);
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

/** Le dimensioni che compaiono nei cancelli, e quindi le uniche che
 *  possono tenere fermo un livello. La correzione pesa nel voto ma non
 *  sbarra: e' un tipo a parte cosi' il compilatore ci impedisce di
 *  scrivere un testo di blocco per una dimensione che non blocca mai. */
export type DimensioneCancello = Extract<
  Dimensione,
  "contesto" | "ripetibilita" | "diffusione" | "controllo"
>;

/** Ordine in cui si cerca il colpevole quando un cancello blocca:
 *  si nomina la mancanza piu' a monte, non la prima che capita. */
const ORDINE_COLPA: DimensioneCancello[] = ["contesto", "ripetibilita", "diffusione", "controllo"];

const MINIMI_CANCELLO: Record<NumeroLivello, Partial<Record<Dimensione, number>>> = {
  1: {}, 2: {}, 3: {}, 4: {},
  5: { contesto: 2 },
  6: { contesto: 2, ripetibilita: 2 },
  7: { contesto: 2, ripetibilita: 2, diffusione: 2 },
  8: { contesto: 2, ripetibilita: 2, diffusione: 3, controllo: 2 },
};

/** La scala come la vede chi deve disegnarla: numero, nome, soglia di
 *  voto e i minimi che il cancello pretende.
 *
 *  E' DERIVATA da LIVELLI e da MINIMI_CANCELLO, non ricopiata: un
 *  cruscotto che disegnasse una scala diversa da quella che il motore
 *  calcola sarebbe il difetto peggiore possibile, perche' la persona
 *  leggerebbe cosa le manca, lo farebbe, e non salirebbe. */
export const SCALA = LIVELLI.map((l) => ({
  numero: l.numero,
  nome: l.nome,
  sogliaMin: l.sogliaMin,
  minimi: MINIMI_CANCELLO[l.numero],
}));

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
  bloccatoDa: DimensioneCancello | null;
};

export function calcolaLivello(r: Radiografia): Livello {
  const voto = calcolaVoto(r);

  /* il livello che il solo punteggio giustificherebbe */
  const perPunteggio = [...LIVELLI].reverse().find((l) => voto >= l.sogliaMin) ?? LIVELLI[0];

  /* si scende finche' il cancello non regge */
  const reale = [...LIVELLI]
    .reverse()
    .find((l) => voto >= l.sogliaMin && l.cancello(r)) ?? LIVELLI[0];

  let bloccatoDa: DimensioneCancello | null = null;
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
  /** Vero quando non le vendiamo niente ma vale comunque una conversazione.
   *  Richiesta di Mattia (2026-07-29): con chi non compra si parla lo stesso,
   *  per raccogliere feedback e capire chi abbiamo davanti. Non e' una call
   *  commerciale e non va presentata come tale: mezz'ora, nessuna vendita.
   *  Oggi scatta solo da LV5 in su, dove la persona ha davvero qualcosa da
   *  raccontare; allargarla piu' in basso e' una scelta di volume da fare
   *  con Mattia, non un default. */
  conversazione: boolean;
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
  const scelta = scegliGradino(profilo, livello, opzioni);
  return {
    ...scelta,
    /* La regola sta qui e in un punto solo: se non gli stiamo vendendo
       niente ma ha abbastanza strada alle spalle, vale una conversazione. */
    conversazione: scelta.gradino === "community" && livello >= 5,
  };
}

function scegliGradino(
  profilo: Profilo,
  livello: NumeroLivello,
  opzioni: Opzioni,
): Omit<Proposta, "conversazione"> {
  const { tasca, leva, intento } = profilo;

  /* ---- chi paga con la tasca dell'azienda ----
     Regola di Matt: al dipendente non si fissa una call commerciale.
     L'unica eccezione e' l'ICP "lead B2B travestito": vuole portarla
     in azienda ED e' abbastanza avanti da reggere la proposta a chi
     decide. Sotto LV5 quella conversazione e' prematura. */
  if (tasca === "azienda") {
    /* Il ponte B2B e' per chi ha una struttura da muovere, cioe' il
       manager: l'ICP lo chiama "lead B2B travestito" perche' ha accesso
       a un budget che non e' il suo portafoglio. Il collaboratore, per
       quanto avanti sia, quella conversazione non puo' portarla, e
       proporgliela e' solo un modo per fargli perdere tempo. */
    if (leva === "struttura" && intento === "team" && livello >= 5) {
      return {
        gradino: "call-b2b",
        motivo: "Manager con una struttura da muovere e l'intento di portarcela: il livello regge la proposta a chi decide.",
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

/* ---------- il conto ---------- */

/** Quanta parte delle ore ripetitive e' realisticamente recuperabile.
 *  Agganciata al LIVELLO e non al voto: il livello e' l'unita' di misura
 *  che la persona vede, e resta stabile se un giorno ritariamo la curva.
 *  Chi e' in basso ha piu' margine perche' non ha ancora recuperato niente;
 *  chi e' in alto ha gia' preso il grosso. */
function fattoreRecupero(livello: NumeroLivello): number {
  if (livello <= 2) return 0.6;
  if (livello <= 4) return 0.5;
  if (livello <= 6) return 0.35;
  return 0.2;
}

export type Conto = {
  oreRecuperabili: number;
  euroMese: number;
  /** Le due componenti restano visibili nel referto: niente numero magico. */
  personale: number;
  team: number;
  /** Vero quando il totale ha toccato il tetto di credibilita'. */
  tetto: boolean;
};

/** Il tetto esiste per non finire nei numeri da fuffa-guru: oltre una certa
 *  cifra il conto smette di convincere e comincia a insospettire. */
const TETTO = 30000;
/** Chi lavora con te eredita meta' del debito di processo di chi decide:
 *  subisce i tuoi processi senza poterli cambiare. L'ora di chi lavora con
 *  te vale il 35% della tua, con un minimo di 35 euro: sotto quella soglia
 *  il costo aziendale pieno di una persona in Italia non ci sta comunque. */
const TEAM_ORE = 0.5;
const TEAM_VALORE = 0.35;
const TEAM_MINIMO = 35;

export function calcolaConto(
  livello: NumeroLivello,
  oreSettimana: number,
  valoreOra: number,
  personeNelTeam = 0,
): Conto {
  const oreRecuperabili = oreSettimana * fattoreRecupero(livello);
  const arrotonda = (n: number) => Math.round(n / 50) * 50;

  const personale = arrotonda(oreRecuperabili * 4.3 * valoreOra);
  const team =
    personeNelTeam > 0
      ? arrotonda(
          personeNelTeam *
            (oreRecuperabili * TEAM_ORE) *
            4.3 *
            Math.max(TEAM_MINIMO, valoreOra * TEAM_VALORE),
        )
      : 0;

  const totale = personale + team;
  return {
    oreRecuperabili: Math.round(oreRecuperabili * 10) / 10,
    euroMese: Math.min(totale, TETTO),
    personale,
    team,
    tetto: totale > TETTO,
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
