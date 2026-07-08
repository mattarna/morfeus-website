import { Fraunces, IBM_Plex_Mono, Playfair_Display } from "next/font/google";

/**
 * Official-site type system.
 * Brand 2026 ("Progettato. Provato."): Clash Display (display) + Satoshi (body)
 * sono self-hosted da Fontshare (TODO: woff2 in public/fonts); finche non ci sono,
 * il fallback e Outfit/DM Sans via tailwind fontFamily.
 * Qui carichiamo cio che e disponibile su next/font/google: Playfair (keyword italic)
 * e IBM Plex Mono (etichette/dati). Fraunces resta per compat con le pagine v7 non ancora migrate.
 */
export const fraunces = Fraunces({
  variable: "--f-d",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  variable: "--f-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic"],
  display: "swap",
});

export const siteFontVars = `${fraunces.variable} ${plexMono.variable} ${playfair.variable}`;
