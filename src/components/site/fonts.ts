import localFont from "next/font/local";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

/* ---------------------------------------------------------------
   TEST font del corpo (temporaneo) — ?body=jakarta|inter|manrope
   Satoshi ha altezza-x 0.500 e rapporto cap/x 1.48 (misurati sul .ttf):
   le minuscole appaiono ~10% piu' piccole di un font da testo a parita'
   di font-size. Questi tre candidati servono a vedere la differenza sulla
   pagina vera invece che a stimarla.
   preload:false: a test spento non scaricano nulla.
   --------------------------------------------------------------- */
/** Font del corpo del DS. Scelto al posto di Satoshi, che ha altezza-x
 *  0.500 e rapporto cap/x 1.48 (misurati sul .ttf): le minuscole
 *  apparivano ~10% piu' piccole a parita' di font-size, ed e' il motivo
 *  per cui il testo sembrava piccolo anche dopo aver alzato i corpi. */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

/**
 * Il mono del DS era una catena rotta: --font-mono puntava a
 * "SF Mono" (font Apple, assente su Windows e mai caricato) e poi al nome
 * LETTERALE "IBM Plex Mono", che non corrisponde a nessun @font-face —
 * next/font genera nomi offuscati, e l'unico Plex caricato in questo repo
 * e' legato al playground. La catena cadeva su `monospace`, cioe' Courier
 * New: aste sottilissime e altezza-x bassa, il peggio possibile per le
 * etichette a 13px. Non era un problema di corpo, era il font sbagliato.
 *
 * JetBrains Mono e' scelto per l'altezza-x, la piu' alta fra i mono
 * disponibili in next/font/google su Next 14 (Geist Mono, che usa il DS
 * B2B, non c'e' ancora in questa versione).
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jbmono",
  display: "swap",
});

/**
 * I tre font sono variabili sull'asse wght (verificato nella tabella fvar
 * dei .ttf). Senza il descrittore `weight` next/font genera un @font-face
 * privo di font-weight: il font risulta disponibile al solo peso 400, l'asse
 * variabile non si attiva mai e ogni richiesta di 600/700 diventa FINTO
 * GRASSETTO sintetizzato dal browser — contorni a 400 ingrassati, che a
 * corpo grande si impastano. Il range va dichiarato, altrimenti regolare i
 * pesi non ha alcun effetto.
 */
export const clashDisplay = localFont({
  src: "../../../public/fonts/webinar-claude/ClashDisplay-Variable.ttf",
  variable: "--font-clash",
  display: "swap",
  weight: "200 700", // fvar: wght 200-700
});


export const playfair = localFont({
  src: [
    {
      path: "../../../public/fonts/webinar-claude/PlayfairDisplay-Variable.ttf",
      style: "normal",
    },
    {
      path: "../../../public/fonts/webinar-claude/PlayfairDisplay-Italic-Variable.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
  weight: "400 900", // fvar: wght 400-900
});

/* Usati SOLO da /font-lab, non dal sito. */
export const siteFontVars = `${clashDisplay.variable} ${playfair.variable} ${jetbrainsMono.variable} ${plusJakarta.variable}`;
