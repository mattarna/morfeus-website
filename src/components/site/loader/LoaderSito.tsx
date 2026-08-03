"use client";

import { useState, useSyncExternalStore } from "react";
import { LoaderGriglia } from "./LoaderGriglia";
import { eUnIngressoDaFuori } from "./ingresso";

/* ============================================================
   Il loader del sito: dove si decide SE mostrarlo.
   ------------------------------------------------------------
   Il come lo sa LoaderGriglia. Qui c'e' solo la regola: UNA VOLTA
   PER SESSIONE, su qualunque pagina sia la prima che tocchi. Chi
   entra da un caso trovato su Google lo vede li'; quando poi passa
   a Insights non lo rivede. Se fosse legato alla home, chi non
   passa dalla home non lo vedrebbe mai, e chi ci torna dopo aver
   letto tre pagine se lo ribeccherebbe.

   LA CHIAVE E' QUELLA CHE USA GIA' LA HOME (`morfeus_loaded`), non
   una nuova. Cosi' la home e le pagine si passano la palla: chi ha
   gia' visto il loader entrando dalla home non lo rivede su un
   caso, e viceversa. Due chiavi diverse avrebbero significato
   vederlo due volte nella stessa visita.

   La lettura sta nell'inizializzatore dello stato, non in un
   effetto: letta dopo, il loader farebbe in tempo a comparire per
   un fotogramma prima di accorgersi di essere gia' stato visto.
   ============================================================ */

export const CHIAVE_SESSIONE = "morfeus_loaded";

/* Il sipario e' un fatto DESKTOP. Su telefono era uno schermo nero
   opaco (z-index 9999) tenuto fino a 2,4s a ogni prima visita di
   sessione: la prima cosa che il visitatore mobile vedeva era il
   caricamento, non il sito, e l'LCP mobile stava a 8,9s su 4G perche'
   l'hero dipingeva solo quando il sipario volava via. Su desktop l'LCP
   e' gia' a 2s e il sipario non pesa: li' resta.
   Stessa soglia che il resto del sito usa per "desktop" (isDesktopMode
   in engine/useDemoScroll): >=1280px di larghezza e non-touch. Non
   importiamo quella funzione per non legare il loader, usato in tutto
   il sito, al motore della sola home. */
function eDesktop(): boolean {
  if (window.innerWidth < 1280) return false;
  if (
    window.matchMedia("(pointer: coarse)").matches &&
    window.matchMedia("(hover: none)").matches
  ) {
    return false;
  }
  return true;
}

/* Siamo sul client? Il portal ha bisogno di document.body. */
const useSulClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

export function LoaderSito() {
  const sulClient = useSulClient();
  /* Letta una volta sola al montaggio, non a ogni render: se una
     navigazione parte mentre il sipario e' ancora in scena, deve poter
     finire il suo giro invece di sparire a meta'. */
  const [daMostrare] = useState(() => {
    if (typeof window === "undefined") return false;
    /* Solo desktop: su telefono il sipario non parte proprio, cosi'
       l'hero e' subito la prima cosa dipinta. */
    if (!eDesktop()) return false;
    /* Ci siamo arrivati navigando dentro il sito: qui comandano le
       squadre, il sipario e' roba d'ingresso e resta chiuso. Vale
       anche quando lo storage e' negato, che e' il caso in cui il
       cancello di sessione non protegge nulla. */
    if (!eUnIngressoDaFuori()) return false;
    try {
      return sessionStorage.getItem(CHIAVE_SESSIONE) !== "true";
    } catch {
      /* navigazione privata con storage negato: meglio mostrarlo una
         volta di troppo che rompere la pagina */
      return true;
    }
  });
  const [finito, setFinito] = useState(false);

  if (!sulClient || !daMostrare || finito) return null;

  return (
    <LoaderGriglia
      onFine={() => {
        try {
          sessionStorage.setItem(CHIAVE_SESSIONE, "true");
        } catch {
          /* pazienza: al massimo lo rivede alla pagina dopo */
        }
        setFinito(true);
      }}
    />
  );
}
