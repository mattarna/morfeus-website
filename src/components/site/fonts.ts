import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * ESPERIMENTO (branch exp/font-jakarta) — variante tipografica alternativa.
 * Fonte: BRAND-2026/02_MORFEUS-B2B/site/assets/css/tokens-core.css, dove
 * --font-title e' Plus Jakarta Sans e Clash Display resta al solo logo.
 *
 * preload:false di proposito: il font viene scaricato solo se il CSS lo
 * usa davvero, cioe' solo con la variante attiva. A toggle spento non
 * costa un byte in piu' al visitatore.
 */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
});

/**
 * I tre font qui sotto sono variabili sull'asse wght (verificato nella
 * tabella fvar dei .ttf). Senza il descrittore `weight` next/font genera
 * un @font-face privo di font-weight: il font risulta disponibile al solo
 * peso 400, l'asse variabile non si attiva mai e ogni richiesta di 600/700
 * diventa FINTO GRASSETTO sintetizzato dal browser — contorni a 400
 * ingrassati, che a corpo grande si impastano.
 * Il range va dichiarato, altrimenti regolare i pesi non ha alcun effetto.
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

export const siteFontVars = `${clashDisplay.variable} ${satoshi.variable} ${playfair.variable} ${plusJakarta.variable}`;
