/* ============================================================
   Le icone degli asset, INLINE.
   ------------------------------------------------------------
   La pagina vecchia le prendeva da Iconify (`solar:*`), che le
   scarica dalla sua API al primo render: dove quella richiesta non
   passa — blocco privacy, rete d'ufficio, offline — restano nove
   caselle vuote. E' gia' successo sulle card della home.

   Stessi soggetti delle `solar:*` che il file di traduzione dichiara
   (chart, users, settings, link, clapperboard, chat, map, cpu,
   widget), ridisegnati a tratto perche' vivano nel bundle. Il colore
   arriva da `currentColor`, cosi' la cassetta che le contiene puo'
   accenderle al passaggio.
   ============================================================ */

const base = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** chart · dashboard operativa */
const Chart = (
  <svg {...base}>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <rect x="7" y="11" width="3" height="6" rx="1" />
    <rect x="13" y="7" width="3" height="10" rx="1" />
    <rect x="19" y="13" width="2" height="4" rx="1" />
  </svg>
);

/** users · agente commerciale */
const Users = (
  <svg {...base}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.6a3.2 3.2 0 0 1 0 6.3M17.5 14.4a5.5 5.5 0 0 1 3 5.6" />
  </svg>
);

/** settings · automazione processi */
const Settings = (
  <svg {...base}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M19.1 4.9l-2.2 2.2M7.1 16.9l-2.2 2.2" />
  </svg>
);

/** link · system integration */
const Link = (
  <svg {...base}>
    <path d="M10 13.5a4 4 0 0 0 5.7.4l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7" />
    <path d="M14 10.5a4 4 0 0 0-5.7-.4l-3 3a4 4 0 0 0 5.7 5.7l1.7-1.7" />
  </svg>
);

/** clapperboard · agenti marketing */
const Clap = (
  <svg {...base}>
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path d="m3.5 8 3-4M9.5 8l3-4M15.5 8l3-4" />
  </svg>
);

/** chat · chatbot e assistenti */
const Chat = (
  <svg {...base}>
    <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-4.5A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z" />
    <circle cx="9.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="13" cy="12" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

/** map · analisi e mappatura */
const Map = (
  <svg {...base}>
    <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);

/** cpu · agenti autonomi */
const Cpu = (
  <svg {...base}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
  </svg>
);

/** widget · interfacce custom */
const Widget = (
  <svg {...base}>
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
  </svg>
);

/** Nell'ordine dei nove asset del file di traduzione. */
export const ICONE_ASSET = [Chart, Users, Settings, Link, Clap, Chat, Map, Cpu, Widget];

/* ---------- i quattro punti del riquadro MARF ----------
   I nomi li dichiara gia' il file di traduzione (database, robot,
   brain, network).

   RIDISEGNATE il 2026-07-31 in DUOTONE. Erano monolinea a tratto 1.6:
   quattro fili sottili identici di peso, che a chip pieno sparivano.
   Ora ognuna ha una SAGOMA piena tenue dietro (`fill` in currentColor a
   bassa opacita') e il TRATTO netto sopra: e' lo stile "solar" delle
   icone che il file di traduzione citava — piu' corpo, piu' presenza,
   la stessa famiglia grafica delle app che la pagina descrive. Il
   colore arriva sempre da `currentColor`, quindi la cassetta le accende
   al passaggio senza che qui si scriva un colore. */

/** database · tutti i dati in un unico luogo */
const Database = (
  <svg {...base}>
    <path
      d="M4.5 6v12c0 1.6 3.36 2.9 7.5 2.9s7.5-1.3 7.5-2.9V6Z"
      fill="currentColor"
      fillOpacity={0.16}
      stroke="none"
    />
    <ellipse cx="12" cy="6" rx="7.5" ry="2.9" />
    <path d="M4.5 6v6c0 1.6 3.36 2.9 7.5 2.9s7.5-1.3 7.5-2.9V6" />
    <path d="M4.5 12v6c0 1.6 3.36 2.9 7.5 2.9s7.5-1.3 7.5-2.9v-6" />
  </svg>
);

/** robot · assistenti che lavorano per te */
const Robot = (
  <svg {...base}>
    <rect x="4" y="8" width="16" height="11" rx="3.2" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <rect x="4" y="8" width="16" height="11" rx="3.2" />
    <path d="M12 4.4V8M8.4 2.8h7.2" />
    <circle cx="12" cy="3" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="9.2" cy="13" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="14.8" cy="13" r="1.3" fill="currentColor" stroke="none" />
    <path d="M1.9 12v3.2M22.1 12v3.2M9.5 16.6h5" />
  </svg>
);

/** brain · decisioni basate sui dati reali */
const Brain = (
  <svg {...base}>
    <path
      d="M12 4.7a3.1 3.1 0 0 0-5.8-1.5A2.9 2.9 0 0 0 3.7 8a3.1 3.1 0 0 0 .5 4.8A3 3 0 0 0 6.8 17.6 3.1 3.1 0 0 0 12 19.1Z"
      fill="currentColor"
      fillOpacity={0.16}
      stroke="none"
    />
    <path d="M12 4.7a3.1 3.1 0 0 0-5.8-1.5A2.9 2.9 0 0 0 3.7 8a3.1 3.1 0 0 0 .5 4.8A3 3 0 0 0 6.8 17.6 3.1 3.1 0 0 0 12 19.1Z" />
    <path d="M12 4.7a3.1 3.1 0 0 1 5.8-1.5A2.9 2.9 0 0 1 20.3 8a3.1 3.1 0 0 1-.5 4.8 3 3 0 0 1-2.6 4.8A3.1 3.1 0 0 1 12 19.1Z" />
    <path d="M12 4.7v14.4M8.3 8.4h1.4M14.3 11.6h1.4" />
  </svg>
);

/** network · business unit che parlano tra loro */
const Network = (
  <svg {...base}>
    <path d="m10.4 6.6-5.6 9.3M13.6 6.6l5.6 9.3M7.2 18h9.6" />
    <circle cx="12" cy="4.6" r="2.6" fill="currentColor" fillOpacity={0.16} />
    <circle cx="4.8" cy="18" r="2.6" fill="currentColor" fillOpacity={0.16} />
    <circle cx="19.2" cy="18" r="2.6" fill="currentColor" fillOpacity={0.16} />
  </svg>
);

/** Nell'ordine dei quattro punti MARF del file di traduzione. */
export const ICONE_MARF = [Database, Robot, Brain, Network];

/* ---------- il blocco "cosa includiamo dal primo progetto" ----------
   Stessi soggetti che usava la VECCHIA pagina in questo punto
   (`solar:cpu-bolt-bold-duotone` per MARF e `solar:map-bold-duotone` per
   l'assessment), ridisegnati nello stesso duotone dei quattro MARF.
   Piu' due per i riquadri di coda, che erano gli unici blocchi della
   sezione senza un segno. */

/** cpu-bolt · MARF incluso, l'infrastruttura che si installa */
const CpuBolt = (
  <svg {...base}>
    <rect x="6.5" y="6.5" width="11" height="11" rx="2.4" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <rect x="6.5" y="6.5" width="11" height="11" rx="2.4" />
    <path d="M10 2.6v3.9M14 2.6v3.9M10 17.5v3.9M14 17.5v3.9M2.6 10h3.9M2.6 14h3.9M17.5 10h3.9M17.5 14h3.9" />
    <path d="m12.6 9.2-2.2 3.4h3.2l-2.2 3.4" strokeWidth={1.5} />
  </svg>
);

/** map · assessment strategico, la mappa di dove si perde valore */
const MapPin = (
  <svg {...base}>
    <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);

/** shield · enterprise e requisiti di sicurezza */
const Shield = (
  <svg {...base}>
    <path d="M12 2.8l7.2 2.7v6c0 4.4-3 8.2-7.2 9.7-4.2-1.5-7.2-5.3-7.2-9.7v-6Z" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <path d="M12 2.8l7.2 2.7v6c0 4.4-3 8.2-7.2 9.7-4.2-1.5-7.2-5.3-7.2-9.7v-6Z" />
    <path d="m9.2 11.8 2 2 3.6-3.7" strokeWidth={1.5} />
  </svg>
);

/** nota · la precisazione finale */
const Nota = (
  <svg {...base}>
    <path d="M5.5 3.4h9L19 7.9v12.7h-13.5Z" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <path d="M5.5 3.4h9L19 7.9v12.7h-13.5Z" />
    <path d="M14.2 3.6v4.4H19" />
    <path d="M8.6 12.4h6.8M8.6 16h4.6" strokeWidth={1.5} />
  </svg>
);

/** Nell'ordine dei due "incluso" del file di traduzione. */
export const ICONE_INCLUSO = [CpuBolt, MapPin];
/** I due riquadri di coda: Enterprise, Nota finale. */
export const ICONE_CODA = [Shield, Nota];

/* ---------- i quattro SINTOMI e le tre TRAPPOLE ----------
   Le schede erano sette rettangoli di solo testo, uno identico
   all'altro: per capire di cosa parlava una bisognava leggerla. Ogni
   icona qui dice il soggetto prima della lettura, cosi' scorrendo si
   trova subito quella che riguarda te. Stesso duotone del resto. */

/** S01 · i numeri arrivano tardi: barre piu' un orologio */
const Ritardo = (
  <svg {...base}>
    <rect x="2.5" y="4.2" width="11.5" height="11.3" rx="2" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <rect x="2.5" y="4.2" width="11.5" height="11.3" rx="2" />
    <path d="M5.6 12.6v-2.4M8.2 12.6V8.2M10.9 12.6v-1.4" strokeWidth={1.5} />
    <circle cx="18.1" cy="18.1" r="3.9" fill="currentColor" fillOpacity={0.16} />
    <circle cx="18.1" cy="18.1" r="3.9" />
    <path d="M18.1 16.1v2.1l1.4.9" strokeWidth={1.5} />
  </svg>
);

/** S02 · i costi indiretti crescono: la salita ripida */
const Salita = (
  <svg {...base}>
    <path d="M3 20.4V17L8.6 11.4l4 3.5L20.4 7v13.4Z" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <path d="M3 3v16.4a1.6 1.6 0 0 0 1.6 1.6H21" />
    <path d="M5.4 16.6 10 11.9l3.6 3.2 6.4-7.4" />
    <path d="M15.9 7.7h4.6v4.6" strokeWidth={1.5} />
  </svg>
);

/** S03 · cio' che funzionava si inceppa: il blocco che si crepa */
const Crepa = (
  <svg {...base}>
    <rect x="3.4" y="4.4" width="17.2" height="15.2" rx="2.2" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <rect x="3.4" y="4.4" width="17.2" height="15.2" rx="2.2" />
    <path d="M12.7 4.4 10.3 10.4l3.3 2.1-2.7 7.1" strokeWidth={1.5} />
  </svg>
);

/** S04 · i manager fanno i pompieri: la fiamma */
const Fiamma = (
  <svg {...base}>
    <path
      d="M12 2.6c.5 3.1-1.5 4.4-3.2 6.2-1.7 1.8-2.8 3.7-2.8 5.8a6 6 0 0 0 12 0c0-2.6-1.3-4.5-2.6-5.9-.5 1-1.2 1.6-2.1 1.9.9-2.7.3-5.7-1.3-8Z"
      fill="currentColor"
      fillOpacity={0.16}
      stroke="none"
    />
    <path d="M12 2.6c.5 3.1-1.5 4.4-3.2 6.2-1.7 1.8-2.8 3.7-2.8 5.8a6 6 0 0 0 12 0c0-2.6-1.3-4.5-2.6-5.9-.5 1-1.2 1.6-2.1 1.9.9-2.7.3-5.7-1.3-8Z" />
    <path d="M12 20a2.9 2.9 0 0 1-1.5-5.4c.5 1 1.3 1.5 2.3 1.6A2.9 2.9 0 0 1 12 20Z" strokeWidth={1.5} />
  </svg>
);

/** T01 · si compra il tool prima di capire: il cartellino */
const Cartellino = (
  <svg {...base}>
    <path
      d="M11.4 2.8H19a1.4 1.4 0 0 1 1.4 1.4v7.6l-8.9 8.9a1.7 1.7 0 0 1-2.4 0l-6.5-6.5a1.7 1.7 0 0 1 0-2.4Z"
      fill="currentColor"
      fillOpacity={0.16}
      stroke="none"
    />
    <path d="M11.4 2.8H19a1.4 1.4 0 0 1 1.4 1.4v7.6l-8.9 8.9a1.7 1.7 0 0 1-2.4 0l-6.5-6.5a1.7 1.7 0 0 1 0-2.4Z" />
    <circle cx="16.4" cy="7" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

/** T02 · manca chi sa farla funzionare: la persona e l'ingranaggio */
const Competenza = (
  <svg {...base}>
    <circle cx="8.8" cy="7.2" r="3.2" fill="currentColor" fillOpacity={0.16} />
    <circle cx="8.8" cy="7.2" r="3.2" />
    <path d="M3 20.4a5.8 5.8 0 0 1 11.6 0" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <path d="M3 20.4a5.8 5.8 0 0 1 11.6 0" />
    <circle cx="18" cy="14.6" r="2.5" />
    <path d="M18 11.1v1.1M18 17v1.1M14.5 14.6h1.1M20.4 14.6h1.1" strokeWidth={1.4} />
  </svg>
);

/** T03 · investimenti senza ritorno: la curva che scende */
const Discesa = (
  <svg {...base}>
    <path d="M5.4 8.6 10 13.3l3.6-2.6 6.4 6.8v3.3H5.4Z" fill="currentColor" fillOpacity={0.16} stroke="none" />
    <path d="M3 3v16.4a1.6 1.6 0 0 0 1.6 1.6H21" />
    <path d="M5.4 8.6 10 13.3l3.6-2.6 6.4 6.8" />
    <path d="M20.5 13.2v4.6h-4.6" strokeWidth={1.5} />
  </svg>
);

/** Nell'ordine dei quattro sintomi del file di traduzione. */
export const ICONE_SINTOMI = [Ritardo, Salita, Crepa, Fiamma];
/** Nell'ordine delle tre trappole. */
export const ICONE_TRAPPOLE = [Cartellino, Competenza, Discesa];
