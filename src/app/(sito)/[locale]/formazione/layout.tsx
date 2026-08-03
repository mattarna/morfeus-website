import type { Metadata } from "next";

/* Pagina interna: elenca i percorsi formativi (Founder Mastery,
   Marketing Mastery, Formazione Morfeus). Non deve comparire in
   sitemap ne` essere indicizzata. Vedi anche NON_INDEXABLE_LOCALE_PREFIXES
   se in futuro serve bloccarla anche in robots.txt. */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function FormazioneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
