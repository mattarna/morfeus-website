import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { StructuredData } from "@/components/shared/SEO/StructuredData";
import { HtmlLang } from "@/components/shared/HtmlLang";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const baseUrl = "https://morfeushub.com";

  return {
    title: {
      default: t("title"),
      template: `%s | Morfeus`,
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "en": `${baseUrl}/en`,
        "it": `${baseUrl}/it`,
        "x-default": `${baseUrl}/en`,
      },
    },
    
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "Morfeus",
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      locale: locale === "en" ? "en_US" : "it_IT",
      type: "website",
    },
    
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/opengraph-image.png`],
      creator: "@morfeushub",
    },
    
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: "/apple-icon.png",
    },
    
    manifest: "/site.webmanifest",
    category: "technology",
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const { locale } = await props.params;
  // Validate the locale
  if (!routing.locales.includes(locale as "en" | "it")) {
    notFound();
  }

  /* QUESTA RIGA DECIDE SE IL SITO E' STATICO O NO.
     Senza, next-intl deve leggere gli header della richiesta per capire
     in che lingua sta rispondendo, e leggere gli header opta l'INTERO
     sottoalbero al rendering dinamico: 46 rotte su 55 finivano
     server-rendered a ogni visita, e le pagine degli articoli leggevano
     i markdown dal disco mentre rispondevano invece che a build.
     Dichiarandola qui, la lingua e' nota in anticipo e le pagine
     tornano a essere HTML cotto una volta sola. */
  setRequestLocale(locale);

  // Explicitly pass locale to getMessages to ensure correct language file is loaded
  const messages = await getMessages({ locale });

  return (
    <>
      <HtmlLang locale={locale} />
      <StructuredData locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
