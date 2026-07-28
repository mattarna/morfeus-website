import { Inter, Manrope } from "next/font/google";

/** Satoshi arriva dal modulo del playground, che e' il suo consumatore
 *  reale: dichiararlo due volte significherebbe due @font-face distinti. */
export { satoshi } from "@/components/playground/fonts";

/**
 * Font usati SOLO dalla pagina di confronto /mockup/font-lab.
 *
 * Stanno qui e non in components/site/fonts.ts per una ragione precisa:
 * next/font emette il @font-face di OGNI font dichiarato in un modulo, a
 * prescindere da chi lo usa, e per i font locali fa anche il preload.
 * Finche' Satoshi e' rimasto in fonts.ts, tutte le pagine del sito
 * continuavano a scaricarlo pur non usandolo piu'.
 *
 * preload:false: sono candidati di confronto, non font di produzione.
 */


export const bodyInter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-inter",
  display: "swap",
  preload: false,
});

export const bodyManrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-manrope",
  display: "swap",
  preload: false,
});
