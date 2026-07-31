import type { Metadata } from "next";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const safeLocale = locale === "it" ? "it" : "en";
  const isIt = safeLocale === "it";

  /* Senza queste due righe la pagina ereditava titolo e description
     del layout, cioe' era identica alla home e a /cookies agli occhi
     di un motore: tre indirizzi diversi, una sola descrizione. */
  return {
    title: isIt ? "Privacy policy" : "Privacy policy",
    description: isIt
      ? "Come Morfeus (Numanity S.r.l.) tratta i dati di chi visita il sito, compila un modulo o prenota una call: quali dati, per quali finalita', per quanto tempo."
      : "How Morfeus (Numanity S.r.l.) handles the data of anyone who visits the site, fills in a form or books a call: which data, for which purposes, for how long.",
    alternates: buildLocaleAlternates("privacy", safeLocale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
