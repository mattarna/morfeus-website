import type { ReactNode } from "react";
import { clashDisplay, playfair, satoshi } from "@/components/site/fonts";
import { plexMono, inter } from "@/components/playground/fonts";
import "@/components/playground/playground.css";

/**
 * Shell del sotto-brand AI Playground (staging, IT-only).
 * Fornisce lo scope `.pg` + le variabili font. La nav/footer/sottotrama
 * sono nel PlaygroundChrome, così le pagine funnel possono restare isolate.
 * Fuori dall'albero [locale]: nessun provider next-intl qui.
 */
export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`pg ${clashDisplay.variable} ${satoshi.variable} ${playfair.variable} ${plexMono.variable} ${inter.variable}`}
    >
      {children}
    </div>
  );
}
