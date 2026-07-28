import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";

/* ============================================================
   /lab-ms — /lab riadattata al DS "brand 2026 · Progettato. Provato."
   ------------------------------------------------------------
   Terza route parallela, accanto a /lab (originale) e /lab-ds (la
   variante sull'ALTRO design system, quella sbagliata, che resta).
   Nessuna delle due viene toccata.

   COSA SI CONSERVA: struttura e flusso dell'originale, sezione per
   sezione, nello stesso ordine, con la stessa copy presa dagli stessi
   namespace Lab.* (IT + EN). Cambia solo il vestito.

   COSA CAMBIA: il vestito e' il sistema `.ms` di
   src/components/site/site.css — carta e inchiostro alternati fascia
   per fascia, Clash Display + Satoshi + Plex, firma #533DFC.

   IL MONO. site.css dichiara --font-mono: var(--f-mono), 'IBM Plex
   Mono', monospace. Su exp/font-jakarta --f-mono vale "SF Mono", che
   su Windows non esiste: si cade su IBM Plex Mono se installato,
   altrimenti sul monospace generico del browser. Qui Plex lo CARICO
   davvero via next/font e ci punto --f-mono, cosi' il mono e' quello
   che il DS dichiara invece di una sorpresa dipendente dalla
   macchina. Se preferisci la parita' esatta col tuo /insights, si
   toglie da qui e basta.
   ============================================================ */

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab · variante brand 2026",
  robots: { index: false, follow: false, nocache: true },
};

export default function LabMsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={plexMono.variable}
      style={{ "--f-mono": "var(--font-plex-mono)" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
