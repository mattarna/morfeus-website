import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "@/styles/ds2026/tokens.css";
import "@/styles/ds2026/components.css";

/* ============================================================
   /lab-ds — VARIANTE DI DESIGN di /lab sul DS 2026.
   ------------------------------------------------------------
   Route PARALLELA: /it/lab resta intatta, riga per riga. Serve per
   confrontarle affiancate in due schede, non per sostituirla.
   Se la variante vince, promuoverla e' un rename; se perde, si
   cancella questa cartella e non resta traccia.

   Perche' una route e non un override CSS su /lab: 10 delle 13
   sezioni di quella pagina (le "Service..." e le "Landing...") sono
   CONDIVISE con /forge — stesse istanze, cambia solo il prop
   `namespace`. Restilizzarle avrebbe rifatto anche /forge, senza
   che nessuno l'abbia chiesto.

   I FONT stanno qui e non in globals: caricati da questo layout,
   Next li serve solo sulle route che scendono da qui.
   ============================================================ */

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/* Clash Display: SOLO il wordmark del logo (regola DS del 2026-07-26, che
   lo ha declassato da font dei titoli a firma del logo). Self-hostato dal
   .woff2 vendorato in src/styles/ds2026/fonts/ — mai da Fontshare, che
   fallisce in silenzio sul fallback. Un peso solo: 600 e' l'unico che serve. */
const clashDisplay = localFont({
  src: "../../../styles/ds2026/fonts/ClashDisplay-Semibold.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-clash-display",
  display: "swap",
});

/* Il sitemap e' a whitelist (INDEXABLE_LOCALE_PATHS), quindi questa route non
   ci finisce da sola. Il noindex e' la seconda serratura: una variante di
   design non deve comparire in SERP ne' finire in un LLM come se fosse
   l'offerta vera. */
export const metadata: Metadata = {
  title: "Lab · variante DS 2026",
  robots: { index: false, follow: false, nocache: true },
};

export default function LabDsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${jakarta.variable} ${geistMono.variable} ${clashDisplay.variable} ds2026 min-h-dvh`}
    >
      {children}
    </div>
  );
}
