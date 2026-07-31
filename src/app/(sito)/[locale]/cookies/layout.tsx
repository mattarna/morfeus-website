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

  /* Come per /privacy: senza titolo e description propri la pagina
     era un doppione della home per un motore di ricerca. */
  return {
    title: isIt ? "Cookie policy" : "Cookie policy",
    description: isIt
      ? "Quali cookie usa il sito di Morfeus, a cosa servono tecnici, analitici e di marketing, e come cambiare il consenso in qualsiasi momento."
      : "Which cookies the Morfeus website uses, what technical, analytics and marketing cookies are for, and how to change your consent at any time.",
    alternates: buildLocaleAlternates("cookies", safeLocale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
