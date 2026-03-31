import type { Metadata } from "next";
import { CallConfirmedPage } from "@/components/sections/CallConfirmedPage";
import { getCallConfirmedText } from "../call-confirmed/data";

interface IntroConfirmedRouteProps {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "it" ? "Call confermata — Morfeus" : "Call confirmed — Morfeus",
    description: locale === "it" ? "La tua intro call con Morfeus è confermata." : "Your intro call with Morfeus is confirmed.",
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function IntroConfirmedRoute({ params: { locale }, searchParams }: IntroConfirmedRouteProps) {
  const text = await getCallConfirmedText(locale);

  return (
    <CallConfirmedPage
      locale={locale}
      searchParams={searchParams}
      hideForm={true}
      text={text}
    />
  );
}
