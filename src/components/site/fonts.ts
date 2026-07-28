import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

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

export const satoshi = localFont({
  src: [
    {
      path: "../../../public/fonts/webinar-claude/Satoshi-Variable.ttf",
      style: "normal",
    },
    {
      path: "../../../public/fonts/webinar-claude/Satoshi-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900", // fvar: wght 300-900
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

export const siteFontVars = `${clashDisplay.variable} ${satoshi.variable} ${playfair.variable} ${jetbrainsMono.variable}`;
