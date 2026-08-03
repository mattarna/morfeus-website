import type { Metadata } from "next";
import { buildLocalizedPath } from "@/lib/seo/public-indexing";
import { guardiaSoloItaliano } from "@/lib/solo-italiano";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Termini e Condizioni · Bootcamp AI Champion v2 | Morfeus Hub",
    description:
      "Termini e condizioni di iscrizione e partecipazione al Bootcamp AI Champion v2 erogato da Morfeus Hub S.r.l.",
    /* Un canonical solo, italiano, e nessun hreflang: la versione
       inglese non esiste piu' (vedi guardiaSoloItaliano). Prima
       `buildLocaleAlternates` dichiarava una coppia it/en, cioe'
       annunciava ai motori una pagina inglese che serviva italiano. */
    alternates: { canonical: buildLocalizedPath("it", "termini-bootcamp") },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TerminiBootcampLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  guardiaSoloItaliano(locale);
  return children;
}
