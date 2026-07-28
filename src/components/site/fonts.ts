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

export const clashDisplay = localFont({
  src: "../../../public/fonts/webinar-claude/ClashDisplay-Variable.ttf",
  variable: "--font-clash",
  display: "swap",
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
});

export const siteFontVars = `${clashDisplay.variable} ${satoshi.variable} ${playfair.variable} ${plusJakarta.variable}`;
