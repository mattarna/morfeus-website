import { guardiaSoloItaliano } from "@/lib/solo-italiano";

/* Esiste solo per la guardia: la pagina e' un componente client e non
   puo' fermare il routing da sola. Vedi src/lib/solo-italiano.ts. */
export default async function TerminiCorsoLayout({
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
