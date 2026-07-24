import type { Metadata } from "next";
import { Home2026 } from "@/components/home2026/full/Home2026";

/**
 * DEMO INTERNA · HOME 2026, candidata brand 2026 della home ufficiale.
 * Struttura, scroll e copy identici alla home online; scena "Dossier".
 * Non linkata, non indicizzata: serve a valutare la direzione.
 */
export const metadata: Metadata = {
  title: "Home 2026 · Morfeus",
  robots: { index: false, follow: false },
};

export default function Home2026Page() {
  return <Home2026 />;
}
