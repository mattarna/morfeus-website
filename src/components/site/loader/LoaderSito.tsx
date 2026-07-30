"use client";

import { useState, useSyncExternalStore } from "react";
import { LoaderGriglia } from "./LoaderGriglia";

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

/* Siamo sul client? Il portal ha bisogno di document.body. */
const useSulClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

export function LoaderSito() {
  const sulClient = useSulClient();
  const [giaVisto] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(CHIAVE_SESSIONE) === "true";
    } catch {
      /* navigazione privata con storage negato: meglio mostrarlo una
         volta di troppo che rompere la pagina */
      return false;
    }
  });
  const [finito, setFinito] = useState(false);

  if (!sulClient || giaVisto || finito) return null;

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
