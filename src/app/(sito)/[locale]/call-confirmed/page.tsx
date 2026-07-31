import type { Metadata } from "next";
import { CallConfirmedPage } from "@/components/sections/CallConfirmedPage";
import { getCallConfirmedText } from "./data";

interface CallConfirmedRouteProps {
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
    description: locale === "it" ? "Pagina di preparazione pre-call Morfeus." : "Morfeus pre-call preparation page.",
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function CallConfirmedRoute(props: CallConfirmedRouteProps) {
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
      text={text}
    />
  );
}
