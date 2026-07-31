import type { Metadata } from "next";
import { CallConfirmedPage } from "@/components/sections/CallConfirmedPage";
import { getCallConfirmedText } from "../call-confirmed/data";

interface IntroConfirmedRouteProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  return {
    title: locale === "it" ? "Call confermata | Morfeus" : "Call confirmed | Morfeus",
    description: locale === "it" ? "La tua intro call con Morfeus è confermata." : "Your intro call with Morfeus is confirmed.",
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function IntroConfirmedRoute(props: IntroConfirmedRouteProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    locale
  } = params;

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
