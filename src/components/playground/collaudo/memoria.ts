/* ============================================================
   LA MEMORIA DEL COLLAUDO · sul dispositivo di chi lo ha fatto
   ------------------------------------------------------------
   Il referto viveva solo in useState: bastava chiudere il tab, o un
   telefono che scarta l'app, e dodici domande sparivano.

   Qui si salva il minimo per rivederlo: il CODICE del link (non le
   risposte sciolte) piu' il nome. Salvare il codice non e' un
   risparmio di righe, e' avere una forma sola: la validazione al
   ritorno e' la stessa del link condiviso, quindi non esistono due
   idee diverse di "referto valido" che possono divergere.

   IL NOME STA QUI E NON NEL LINK. Sul dispositivo di chi ha fatto il
   collaudo il nome c'e' gia' (l'ha appena scritto lui): tenercelo non
   aggiunge niente a quello che sappiamo. Nel link no, perche' un link
   si condivide e finisce nei log altrui. Vedi permalink.ts.

   NIENTE DI DELICATO QUI DENTRO: nome e risposte, non l'email. Se un
   giorno servisse salvare anche quella, non farlo senza chiederselo:
   e' un dato di contatto su un dispositivo che puo' essere condiviso.
   ============================================================ */

import { codificaReferto, decodificaReferto, type RisposteReferto } from "./permalink";

/** La versione e' nella chiave, non nel valore: quando la forma
 *  cambia, la memoria vecchia smette di essere letta invece di essere
 *  interpretata male, e nessuno deve scrivere una migrazione. */
const CHIAVE = "morfeus.playground.collaudo.v1";

export type RefertoRicordato = {
  risposte: RisposteReferto;
  nome: string;
  /** Quando e' stato fatto. Serve a dire "il tuo referto del 7 agosto"
   *  invece di un generico "il tuo referto". */
  quando: number;
};

/** Tutto in try: la memoria locale non e' garantita. In navigazione
 *  privata, con le terze parti bloccate o con il disco pieno, scrivere
 *  LANCIA. Un collaudo non puo' fallire per un salvataggio comodo. */
export function ricordaReferto(risposte: RisposteReferto, nome: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      CHIAVE,
      JSON.stringify({ codice: codificaReferto(risposte), nome, quando: Date.now() })
    );
  } catch {
    /* pazienza: si perde la comodita' di rivederlo, non il referto */
  }
}

export function leggiRefertoRicordato(): RefertoRicordato | null {
  if (typeof window === "undefined") return null;
  try {
    const grezzo = window.localStorage.getItem(CHIAVE);
    if (!grezzo) return null;

    const salvato = JSON.parse(grezzo) as { codice?: string; nome?: string; quando?: number };
    /* Si passa dalla stessa decodifica del link: se un id e' cambiato
       con un rilascio, il ricordo scade da solo invece di ridisegnare
       un referto che non esiste piu'. */
    const risposte = decodificaReferto(salvato.codice);
    if (!risposte) return null;

    return {
      risposte,
      nome: typeof salvato.nome === "string" ? salvato.nome : "",
      quando: typeof salvato.quando === "number" ? salvato.quando : 0,
    };
  } catch {
    return null;
  }
}

export function dimenticaReferto(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CHIAVE);
  } catch {
    /* niente da fare, e non e' un problema di chi sta usando la pagina */
  }
}
