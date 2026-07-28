import localFont from "next/font/local";
import { IBM_Plex_Mono, Inter } from "next/font/google";

/**
 * Font del sotto-brand AI Playground.
 * Clash e Playfair sono locali e condivisi col sito (site/fonts.ts).
 * Satoshi invece vive QUI: non e' piu' il font del corpo del DS (sostituito
 * da Plus Jakarta Sans) e lasciarlo in site/fonts.ts faceva scaricare il
 * suo @font-face a tutte le pagine del sito, che non lo usano piu' —
 * next/font emette il @font-face di ogni font dichiarato in un modulo.
 * Qui aggiungiamo IBM Plex Mono (mono) e Inter (fallback display/body),
 * che il prototipo HTML caricava via Google Fonts.
 */
export const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--pg-mono",
  display: "swap",
});

export const inter = Inter({
  weight: ["400", "600", "800", "900"],
  subsets: ["latin"],
  variable: "--pg-inter",
  display: "swap",
});

/** Font del corpo del playground. Non e' piu' il font del corpo del sito. */
export const satoshi = localFont({
  src: [
    { path: "../../../public/fonts/webinar-claude/Satoshi-Variable.ttf", style: "normal" },
    { path: "../../../public/fonts/webinar-claude/Satoshi-VariableItalic.ttf", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});
