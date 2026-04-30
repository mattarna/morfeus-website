import type { Metadata } from "next";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const safeLocale = locale === "it" ? "it" : "en";

  return {
    title: "Termini e Condizioni — Bootcamp AI Champion v2 | Morfeus Hub",
    description:
      "Termini e condizioni di iscrizione e partecipazione al Bootcamp AI Champion v2 erogato da Morfeus Hub S.r.l.",
    alternates: buildLocaleAlternates("termini-bootcamp", safeLocale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TerminiBootcampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
