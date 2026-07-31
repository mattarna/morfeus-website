import type { Metadata, Viewport } from "next";
import { Documento } from "@/components/shared/Documento";
import { SITE_URL } from "@/lib/seo/entity-ids";
import "../globals.css";

/* Layout radice delle rotte SENZA prefisso di lingua: funnel,
   playground, mockup. Qui il contenuto e' scritto in italiano e non
   esiste un segmento /[locale] da cui dedurre altro, quindi la lingua
   e' dichiarata italiana e basta. Il gemello con la lingua vera sta in
   (sito)/[locale]/layout.tsx. */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0B0C", // Night
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Morfeus – AI-Native Organization Design",
    template: `%s | Morfeus`,
  },
  description:
    "Integriamo l'Intelligenza Artificiale nel DNA delle organizzazioni. Ripensiamo strutture, processi e decisioni per l'era AI-Native.",
  authors: [{ name: "Morfeus Team" }],
  creator: "Morfeus",
  publisher: "Morfeus",
  /* Indirizzi assoluti e non percorsi relativi: le immagini social
     stavano come file-convenzione alla radice di src/app, e da quando
     la radice non ha piu' un layout uscivano come
     http://localhost:3000/opengraph-image.png. Ora sono file normali
     in public/ e l'indirizzo lo scriviamo per intero. */
  openGraph: {
    title: "Morfeus – AI-Native Organization Design",
    description:
      "Integriamo l'Intelligenza Artificiale nel DNA delle organizzazioni. Ripensiamo strutture, processi e decisioni per l'era AI-Native.",
    siteName: "Morfeus",
    locale: "it_IT",
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/twitter-image.png`],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function LayoutFuoriLingua({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Documento lang="it">{children}</Documento>;
}
