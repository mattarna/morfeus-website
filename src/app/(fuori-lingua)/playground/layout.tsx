import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";

/* ============================================================
   /playground · il layout della landing della community.
   ------------------------------------------------------------
   NON usa SiteShell, ed e' voluto: il playground ha la sua barra
   flottante, il suo footer e una palette che non e' quella del sito
   madre. Infilarlo nella shell B2B vorrebbe dire due header e due
   identita' sulla stessa pagina.

   I FONT stanno qui e non nel layout radice: sono solo di questa
   pagina, e caricarli per tutto il sito significherebbe farli
   scaricare anche a chi legge le pagine B2B, che usano altro.
   Self-hosted da next/font: niente richiesta a Google, niente salto
   di layout al caricamento.

   Le variabili hanno il prefisso `--font-pg-` per non incrociarsi
   con quelle del design system, che vivono nello stesso documento.
   ============================================================ */

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-pg-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-pg-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  /* La landing vive su playground.morfeushub.com. Il canonical punta
     li' anche quando la rotta viene servita dal dominio principale,
     o due host servirebbero la stessa pagina e Google ne sceglierebbe
     uno a caso. */
  metadataBase: new URL("https://playground.morfeushub.com"),
  alternates: { canonical: "/" },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${jakarta.variable} ${geistMono.variable}`}>{children}</div>;
}
