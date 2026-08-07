/* ============================================================
   IL REFERTO CHE SOPRAVVIVE ALLA CHIUSURA DELLA PAGINA
   ------------------------------------------------------------
   Il referto e' gia' una funzione pura delle risposte: Referto()
   ricalcola livello, conto e gradino da zero ogni volta. Quindi per
   farlo rivedere non serve salvare il referto, bastano le RISPOSTE.
   Sono nove valori corti: ci stanno in un indirizzo.

   NEL LINK NON C'E' IL NOME, e non e' una dimenticanza. Un nome in
   una querystring finisce nei log del server, nell'intestazione
   Referer verso i siti terzi e nella cronologia condivisa: e' un
   dato personale sparso in posti che non controlliamo. Il link porta
   solo le risposte, che non identificano nessuno. Il referto col
   nome resta dove il nome sta gia': sul dispositivo di chi lo ha
   fatto (vedi la memoria locale in Collaudo.tsx).

   PERCHE' NON UN JSON IN CHIARO. Un indirizzo che si legge e' un
   indirizzo che si modifica: chiunque si costruirebbe il livello che
   preferisce. La codifica non e' sicurezza (chi vuole barare ci
   riesce comunque, sono dati suoi), e' attrito: toglie la tentazione
   di cambiare una cifra a mano e poi mandarci uno screenshot.

   REGOLA DURA DELLA DECODIFICA: se un valore non e' fra quelli
   previsti, si torna null. Mai tirare a indovinare: un referto
   sbagliato che sembra giusto e' peggio di un link rotto, perche'
   nessuno se ne accorge.
   ============================================================ */

import {
  DICHIARATO_OPZIONI,
  INTENTO_OPZIONI,
  MESTIERI_OPZIONI,
  RUOLI_OPZIONI,
  URGENZA_OPZIONI,
  VALORE_OPZIONI,
} from "./domande";
import type { Intento, Punti, Radiografia } from "./motore";

/** Le risposte che bastano a ridisegnare un referto identico.
 *  Tutto il resto (tasca, leva, persone nel team) si ricava dal
 *  ruolo: tenerlo qui vorrebbe dire poterlo contraddire. */
export type RisposteReferto = {
  mestiere: string;
  ruolo: string;
  dichiarato: string;
  intento: Intento;
  urgenza: string;
  punti: Radiografia;
  ore: number;
  valoreOra: number;
};

/** Cambiare l'ordine dei campi o il loro significato invalida i link
 *  gia' in giro. Se serve, si alza il numero e si tiene il ramo
 *  vecchio nella decodifica: i link vivono nelle email, e le email
 *  non si aggiornano. */
const VERSIONE = "1";

/** L'ordine e' un contratto: e' l'ordine in cui i punti finiscono
 *  nelle cinque cifre del codice. */
const ASSI = ["contesto", "ripetibilita", "correzione", "controllo", "diffusione"] as const;

const ORE_MAX = 100;

const idsDi = (lista: readonly { id: string | number }[]) =>
  new Set(lista.map((o) => String(o.id)));

const MESTIERI_OK = idsDi(MESTIERI_OPZIONI);
const RUOLI_OK = idsDi(RUOLI_OPZIONI);
const DICHIARATI_OK = idsDi(DICHIARATO_OPZIONI);
const INTENTI_OK = idsDi(INTENTO_OPZIONI);
const URGENZE_OK = idsDi(URGENZA_OPZIONI);
const VALORI_OK = idsDi(VALORE_OPZIONI);

/* base64 "url-safe": senza +, / e = un indirizzo non ha bisogno di
   essere ri-codificato, e non si spezza quando qualcuno lo incolla
   in chat che mangiano la punteggiatura finale. */
function inBase64Url(testo: string): string {
  return btoa(testo).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function daBase64Url(codice: string): string | null {
  try {
    return atob(codice.replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    return null;
  }
}

export function codificaReferto(r: RisposteReferto): string {
  const punti = ASSI.map((a) => String(r.punti[a] ?? 0)).join("");
  return inBase64Url(
    [VERSIONE, r.mestiere, r.ruolo, r.dichiarato, r.intento, r.urgenza, punti, r.ore, r.valoreOra].join("~")
  );
}

export function decodificaReferto(codice: string | undefined | null): RisposteReferto | null {
  if (!codice) return null;

  const testo = daBase64Url(codice);
  if (!testo) return null;

  const p = testo.split("~");
  if (p.length !== 9 || p[0] !== VERSIONE) return null;

  const [, mestiere, ruolo, dichiarato, intento, urgenza, cifre, oreTesto, valoreTesto] = p;

  if (!MESTIERI_OK.has(mestiere)) return null;
  if (!RUOLI_OK.has(ruolo)) return null;
  if (!DICHIARATI_OK.has(dichiarato)) return null;
  if (!INTENTI_OK.has(intento)) return null;
  if (!URGENZE_OK.has(urgenza)) return null;

  /* Cinque cifre da 0 a 3: sono i punti degli assi. Qualsiasi altra
     cosa (quattro cifre, una lettera, un 7) non e' una radiografia. */
  if (!/^[0-3]{5}$/.test(cifre)) return null;

  const ore = Number(oreTesto);
  if (!Number.isInteger(ore) || ore < 0 || ore > ORE_MAX) return null;

  /* Il valore dell'ora non e' libero: e' una delle fasce del test. Se
     lo fosse, chiunque potrebbe gonfiare il conto in euro mettendo un
     numero a caso nell'indirizzo, e il referto mostrerebbe una cifra
     che noi non abbiamo mai calcolato. */
  if (!VALORI_OK.has(valoreTesto)) return null;

  const punti = Object.fromEntries(
    ASSI.map((a, i) => [a, Number(cifre[i]) as Punti])
  ) as Radiografia;

  return {
    mestiere,
    ruolo,
    dichiarato,
    intento: intento as Intento,
    urgenza,
    punti,
    ore,
    valoreOra: Number(valoreTesto),
  };
}

/** L'indirizzo completo da mostrare e da mandare per email. Assoluto
 *  e non relativo: questo link vive fuori dal sito (email, WhatsApp,
 *  appunti), dove un "/playground/referto" non vuol dire niente. */
export function indirizzoReferto(r: RisposteReferto): string {
  return `https://playground.morfeushub.com/referto?r=${codificaReferto(r)}`;
}
