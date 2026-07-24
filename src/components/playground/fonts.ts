import { IBM_Plex_Mono, Inter } from "next/font/google";

/**
 * Font del sotto-brand AI Playground.
 * Clash/Satoshi/Playfair sono locali e condivisi col sito (site/fonts.ts).
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
