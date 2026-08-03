import type { Metadata } from "next";
import { guardiaSoloItaliano } from "@/lib/solo-italiano";

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

export default async function FormazioneLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  /* L'offerta formativa e' italiana: la pagina non esiste in inglese.
     Copre anche /formazione/accedi, che sta sotto questo layout.
     Vedi src/lib/solo-italiano.ts. */
  const { locale } = await params;
  guardiaSoloItaliano(locale);
  return children;
}
