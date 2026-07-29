"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import "./loader.css";

/* ============================================================
   A · LO STRUMENTO CHE SI ACCENDE
   ------------------------------------------------------------
   Un secondo, tre battute:
     0-280ms   le quattro crocette di registro, una alla volta
     240-700   il readout si scrive in mono
     340-800   il marchio si riempie con una passata dall'alto
     300-fine  la quota misura, e il numero e' quello VERO
     fine      lo stato si accende, il quadro si apre

   LA MISURA NON E' FINTA. Il numero che sale e' l'avanzamento
   reale del caricamento (document.readyState + i font), non un
   timer che finge. Se la pagina e' gia' pronta, il loader dura il
   minimo e sparisce: nessuno aspetta per il gusto di guardare
   un'animazione. Il vecchio loader imponeva 2,3 secondi a tutti,
   sempre, anche quando il sito era pronto in 400ms.

   `minimo` esiste perche' un lampo di 80ms e' peggio di niente:
   si vede uno sfarfallio e non si capisce cosa sia stato.
   ============================================================ */

type Props = {
  /** Le classi delle variabili font: il portal esce da SiteShell e
   *  senza queste eredita il font di sistema. */
  classiFont?: string;
  /** Quanto dura al minimo, anche a pagina gia' pronta. */
  minimo?: number;
  /** Il tetto: oltre questo si va avanti comunque, pagina pronta o no.
   *  Un loader che aspetta una risorsa lenta e' una pagina rotta. */
  massimo?: number;
  etichetta?: string;
  onFine?: () => void;
};

type Fase = "misura" | "pronto" | "uscita" | "finito";

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

export function LoaderStrumento({
  classiFont = "",
  minimo = 900,
  massimo = 2400,
  etichetta = "Avvio · sistema",
  onFine,
}: Props) {
  const [fase, setFase] = useState<Fase>("misura");
  const montato = useSulClient();
  const barra = useRef<HTMLElement>(null);
  const numero = useRef<HTMLSpanElement>(null);
  /* La callback viaggia in un ref cosi' i timer chiamano sempre
     l'ultima versione senza far ripartire tutta la coreografia a
     ogni render del genitore. L'assegnazione sta in un effetto:
     scrivere un ref durante il render e' vietato. */
  const fineRef = useRef(onFine);
  useEffect(() => {
    fineRef.current = onFine;
  }, [onFine]);

  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const timer: ReturnType<typeof setTimeout>[] = [];

    /* Quanto e' pronta davvero la pagina: due segnali da meta'
       ciascuno, il documento e i font. */
    const pronta = () =>
      (document.readyState === "complete" ? 0.5 : document.readyState === "interactive" ? 0.25 : 0) +
      ((document as Document & { fonts?: { status: string } }).fonts?.status === "loaded" ? 0.5 : 0);

    /* Una sola porta d'uscita, chiamabile due volte senza danno: ci
       arrivano sia la misura finita sia la rete di sicurezza, e senza
       la guardia si accavallerebbero due sequenze di chiusura. */
    let chiuso = false;
    const chiudi = () => {
      if (chiuso) return;
      chiuso = true;
      cancelAnimationFrame(raf);
      if (barra.current) barra.current.style.width = "100%";
      if (numero.current) numero.current.textContent = "100";
      setFase("pronto");
      timer.push(setTimeout(() => setFase("uscita"), 260));
      timer.push(
        setTimeout(() => {
          setFase("finito");
          fineRef.current?.();
        }, 520)
      );
    };

    /* Rete di sicurezza. Il ciclo che misura gira su
       requestAnimationFrame, e una scheda non visibile lo sospende:
       chi apre il sito in una scheda di fondo e ci torna dopo un
       minuto si troverebbe il loader ancora li'. I timer invece
       continuano (rallentati, ma continuano), quindi la chiusura
       forzata passa di qui e non dal rAF. */
    timer.push(setTimeout(chiudi, massimo));

    const tick = () => {
      const t = performance.now() - t0;
      const perTempo = Math.min(1, t / minimo);
      /* Il MINORE fra "quanto e' pronta" e "quanto tempo e' passato".
         Preso cosi', la barra e' onesta in tutti e due i versi:
         - pagina gia' in cache: e' il tempo a fare da freno, la barra
           riempie in `minimo` invece di schizzare a 100 e restare
           ferma li' a fissarti (misurato: succedeva davvero);
         - pagina lenta: la barra si pianta al livello vero, per
           esempio a meta' finche' i font non arrivano, che e' esatta-
           mente cio' che una misura deve fare.
         Il pavimento a 0,06 esiste solo perche' una barra a zero al
         primo fotogramma sembra rotta. */
      const q = Math.min(perTempo, Math.max(pronta(), 0.06));
      if (barra.current) barra.current.style.width = `${q * 100}%`;
      if (numero.current) numero.current.textContent = String(Math.round(q * 100)).padStart(3, "0");

      if ((q >= 1 && t >= minimo) || t >= massimo) {
        chiudi();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timer.forEach(clearTimeout);
    };
  }, [minimo, massimo]);

  if (!montato || fase === "finito") return null;

  const testo = etichetta.toUpperCase();

  return createPortal(
    <div className={`ms ldr-host ${classiFont}`}>
      <div className="ldr" data-fase={fase} role="status" aria-label={etichetta}>
        <div className="ldr-griglia" aria-hidden="true" />

        <div className="ldr-quadro">
          <i className="ldr-ang a1" aria-hidden="true" />
          <i className="ldr-ang a2" aria-hidden="true" />
          <i className="ldr-ang a3" aria-hidden="true" />
          <i className="ldr-ang a4" aria-hidden="true" />

          <div className="ldr-readout">
            {/* --n e --w servono all'effetto macchina da scrivere:
                tanti passi quanti sono i caratteri, larghezza finale
                in `ch`. Funziona perche' il font e' monospaziato. */}
            <span
              className="ldr-eti"
              style={
                { "--n": testo.length, "--w": `${testo.length}ch` } as React.CSSProperties
              }
            >
              {testo}
            </span>
            <span className="ldr-stato">
              <i />
              {fase === "misura" ? "Misura" : "Pronto"}
            </span>
          </div>

          <div className="ldr-corpo">
            <div className="ldr-marchio">
              {/* il lockup ufficiale, non una ricostruzione */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/morfeus-mark.png" alt="Morfeus" width={2064} height={267} />
            </div>

            <div className="ldr-quota">
              <span className="ldr-tacca" aria-hidden="true" />
              <span className="ldr-linea" aria-hidden="true">
                <i ref={barra as React.RefObject<HTMLElement>} />
              </span>
              <span className="ldr-tacca" aria-hidden="true" />
              <span className="ldr-num" ref={numero}>
                000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
