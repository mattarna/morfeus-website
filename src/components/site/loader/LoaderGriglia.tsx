"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import "./loader.css";

/* ============================================================
   IL LOADER DEL SITO · la griglia che compone il marchio
   ------------------------------------------------------------
   Quattro battute:
     celle    le celle si accendono dal centro verso fuori dentro
              la sagoma della M
     marchio  le celle si spengono, la M piena resta al loro posto
     volo     il fondo si ritira e la M va ad atterrare sulla M
              della testata, dove il lockup vero la raccoglie
     finito

   LA SAGOMA NON E' RIDISEGNATA: le celle sono ritagliate dal file
   del marchio con una maschera CSS. Quindi la forma e' quella
   ufficiale al pixel, e se il marchio cambia file cambia anche qui
   senza toccare una riga.

   L'ATTERRAGGIO E' MISURATO, NON SCRITTO. Il componente legge dove
   sta davvero il lockup in testata (getBoundingClientRect) e ci
   porta la M con una FLIP. Un valore scritto a mano sarebbe giusto
   su un solo schermo: la testata cambia altezza fra telefono e
   desktop.

   Le due M combaciano da sole, e non per fortuna: dentro il lockup
   la M occupa 562x267 px (misurati sull'alfa del PNG), rapporto
   2,10, ed e' esattamente il rapporto di m-w.png (1000x476). Basta
   quindi portare la M all'altezza del marchio in testata e al suo
   bordo sinistro: la larghezza torna da se'. Se un domani il lockup
   cambia file, questa coincidenza va rimisurata.

   CHI LO MONTA. Le pagine passano da SiteShell, che monta LoaderSito
   (il cancello: una volta per sessione). La home ha un cancello suo,
   piu' vecchio, e monta direttamente questo componente: la chiave di
   sessione pero' e' la stessa, `morfeus_loaded`.

   L'ATTESA STA IN MEZZO, NON IN FONDO. Se la pagina non e' ancora
   pronta quando la M e' composta, si aspetta li' e poi si vola.
   Cosi' il tempo morto capita in un momento in cui c'e' qualcosa
   da guardare, e la chiusura resta sempre della stessa lunghezza.
   ============================================================ */

const COLONNE = 20;
const RIGHE = 10;

type Props = {
  /** Le classi delle variabili font. Qui dentro non c'e' testo,
   *  quindi non serve: resta per chi montasse il loader in un albero
   *  che un domani ne avesse bisogno. */
  classiFont?: string;
  minimo?: number;
  massimo?: number;
  onFine?: () => void;
};

type Fase = "celle" | "marchio" | "volo" | "finito";

/* Siamo sul client? Serve perche' il portal ha bisogno di
   document.body, che sul server non esiste. Non e' un useState +
   useEffect (che React 19 segnala come render a cascata): questo
   restituisce false nella resa del server e true dopo l'idratazione,
   senza passare da uno stato. */
const useSulClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

export function LoaderGriglia({
  classiFont = "",
  minimo = 900,
  massimo = 2400,
  onFine,
}: Props) {
  const [fase, setFase] = useState<Fase>("celle");
  const [accese, setAccese] = useState(false);
  const montato = useSulClient();
  const marchio = useRef<HTMLDivElement>(null);
  /* La callback viaggia in un ref cosi' i timer chiamano sempre
     l'ultima versione senza far ripartire tutta la coreografia a
     ogni render del genitore. L'assegnazione sta in un effetto:
     scrivere un ref durante il render e' vietato. */
  const fineRef = useRef(onFine);
  useEffect(() => {
    fineRef.current = onFine;
  }, [onFine]);

  /* L'ordine di accensione: dal centro verso fuori, con un pizzico di
     disordine. Senza il disordine si vede un'onda circolare perfetta e
     sembra un'animazione di sistema; con troppo, sembra rumore. */
  const ritardi = useMemo(() => {
    const celle = Array.from({ length: COLONNE * RIGHE }, (_, i) => {
      const x = (i % COLONNE) / (COLONNE - 1) - 0.5;
      const y = Math.floor(i / COLONNE) / (RIGHE - 1) - 0.5;
      const d = Math.hypot(x * 1.15, y);
      /* jitter deterministico: niente Math.random, altrimenti server e
         client disegnerebbero due ordini diversi e React protesta */
      const j = (((i * 2654435761) % 1000) / 1000 - 0.5) * 0.12;
      return { i, d: d + j };
    });
    const ordinate = [...celle].sort((a, b) => a.d - b.d);
    const out = new Array<number>(celle.length);
    ordinate.forEach((c, pos) => {
      out[c.i] = Math.round((pos / celle.length) * 520);
    });
    return out;
  }, []);

  /* Accensione: un frame dopo il montaggio, cosi' la transizione parte
     davvero invece di trovarsi gia' nello stato finale al primo paint.
     Il timer non e' una cintura di troppo: in una scheda non visibile
     il rAF resta sospeso, e senza di lui le celle non si accenderebbero
     mai. */
  useEffect(() => {
    if (!montato) return;
    const r = requestAnimationFrame(() => setAccese(true));
    const t = setTimeout(() => setAccese(true), 80);
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t);
    };
  }, [montato]);

  useEffect(() => {
    if (!montato) return;
    const t0 = performance.now();
    const timer: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    document.documentElement.classList.add("ldg-vola");

    const pronta = () =>
      document.readyState === "complete" &&
      (document as Document & { fonts?: { status: string } }).fonts?.status !== "loading";

    /* battuta 2: le celle hanno finito (520 di stagger + 180 di
       transizione), entra la M piena */
    timer.push(setTimeout(() => setFase("marchio"), 700));

    /* battuta 3: si vola appena la pagina e' pronta, mai prima del
       minimo e mai oltre il massimo */
    const attendi = () => {
      const t = performance.now() - t0;
      if ((pronta() && t >= minimo) || t >= massimo) {
        vola();
        return;
      }
      raf = requestAnimationFrame(attendi);
    };
    timer.push(setTimeout(() => (raf = requestAnimationFrame(attendi)), 760));

    /* Rete di sicurezza: l'attesa gira su requestAnimationFrame, che
       una scheda non visibile sospende. I timer no, quindi il volo
       parte comunque entro il tetto. */
    timer.push(setTimeout(() => vola(), massimo));

    let volato = false;
    const vola = () => {
      if (volato) return;
      volato = true;
      cancelAnimationFrame(raf);
      const el = marchio.current;
      const bersaglio = document.querySelector<HTMLElement>('[data-marchio="testata"]');
      const r = el?.getBoundingClientRect();
      const b = bersaglio?.getBoundingClientRect();

      /* Nessun bersaglio (o testata fuori schermo perche' la pagina e'
         gia' scrollata): niente volo, si chiude con una dissolvenza.
         Un atterraggio a vuoto e' peggio di nessun atterraggio. */
      if (el && r && b && b.height > 0 && b.top >= 0) {
        /* Il rettangolo del bersaglio non e' sempre il marchio. Nella
           testata delle pagine il lockup e' un'immagine a misura e i
           due coincidono; su quella della home sta dentro un riquadro
           fisso con object-contain, quindi il marchio e' piu' piccolo
           del suo riquadro e ci sta centrato dentro. Senza questo
           conto la M atterrerebbe fuori posto proprio sulla pagina
           piu' vista. LOCKUP e' il rapporto del file: 2064/267. */
        const LOCKUP = 2064 / 267;
        const altaDisegnata = Math.min(b.height, b.width / LOCKUP);
        const largaDisegnata = altaDisegnata * LOCKUP;
        const sinistra = b.left + (b.width - largaDisegnata) / 2;
        const alto = b.top + (b.height - altaDisegnata) / 2;

        const scala = altaDisegnata / r.height;
        el.style.transform = `translate(${sinistra - r.left}px, ${alto - r.top}px) scale(${scala})`;
      }
      setFase("volo");

      timer.push(
        setTimeout(() => {
          /* la testata riprende il suo marchio proprio mentre la M
             atterra: da li' in poi ne esiste una sola */
          document.documentElement.classList.remove("ldg-vola");
          document.documentElement.classList.add("ldg-atterrato");
        }, 460)
      );
      timer.push(
        setTimeout(() => {
          setFase("finito");
          fineRef.current?.();
        }, 700)
      );
    };

    return () => {
      cancelAnimationFrame(raf);
      timer.forEach(clearTimeout);
      document.documentElement.classList.remove("ldg-vola");
      document.documentElement.classList.remove("ldg-atterrato");
    };
  }, [montato, minimo, massimo]);

  if (!montato || fase === "finito") return null;

  return createPortal(
    <div className={`ms ldg-host ${classiFont}`}>
      <div className="ldg" data-fase={fase} role="status" aria-label="Caricamento">
        <div className="ldg-fondo" aria-hidden="true" />

        <div className="ldg-campo">
          <div
            className="ldg-celle"
            style={{
              gridTemplateColumns: `repeat(${COLONNE}, 1fr)`,
              gridTemplateRows: `repeat(${RIGHE}, 1fr)`,
            }}
            aria-hidden="true"
          >
            {ritardi.map((ms, i) => (
              <span
                key={i}
                className="ldg-cella"
                data-on={accese ? "1" : "0"}
                style={{ transitionDelay: `${ms}ms` }}
              />
            ))}
          </div>

          <div className="ldg-marchio" ref={marchio}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/m-w.png" alt="Morfeus" width={1000} height={476} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
