import type { Metadata } from "next";

/* ============================================================
   /lab-ms, /lab riadattata al DS "brand 2026 · Progettato. Provato."
   ------------------------------------------------------------
   Route PARALLELA: /lab e /lab-ds restano intatte.

   Struttura e copy sono quelle della pagina online, dagli stessi
   namespace Lab.* in IT e EN. Il disegno e' rifatto nel linguaggio
   del sistema `.ms` di src/components/site/.

   I FONT non stanno qui: li monta SiteShell dal kit vendorato, che
   e' l'unico posto in cui vanno decisi. Oggi sono Clash Display sui
   titoli, Plus Jakarta Sans sui corpi (font ufficiale, deciso
   2026-07-28) e JetBrains Mono su dati ed etichette.

   Prima questo layout caricava IBM Plex Mono e ci puntava --f-mono,
   perche' a monte quella variabile valeva "SF Mono" e cadeva sul
   monospace di sistema. Ora il DS dichiara --font-mono da se':
   l'override era diventato un secondo font caricato per niente, e
   per giunta divergente dal resto del sito.
   ============================================================ */

export const metadata: Metadata = {
  title: "Lab · variante brand 2026",
  robots: { index: false, follow: false, nocache: true },
};

export default function LabMsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
