import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { StructuredData } from "@/components/shared/SEO/StructuredData";
import { Documento } from "@/components/shared/Documento";
import { PageTransitionProvider } from "@/components/shared/PageTransition";
import { buildLocaleAlternates, type SupportedLocale } from "@/lib/seo/public-indexing";
import { SITE_URL } from "@/lib/seo/entity-ids";
import type { Metadata, Viewport } from "next";
import "../../globals.css";

/* Il viewport stava nel vecchio layout radice, che non esiste piu':
   ogni gruppo se lo porta. Identico all'altro, per non avere due siti
   che si comportano diversamente sul telefono. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0B0C", // Night
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  /* Host e prefissi passano dagli helper come nel resto del sito:
     qui erano scritti a mano, e la home restava l'unica pagina con
     canonical sul dominio nudo e con /en davanti. */
  const baseUrl = SITE_URL;
  const safeLocale: SupportedLocale = locale === "it" ? "it" : "en";

  /* Il titolo nel messaggio non porta piu' il prefisso "Morfeus - ":
     ci pensa il template, e prima il marchio finiva scritto due volte
     ("Morfeus - ... | Morfeus"). Nelle anteprime social il template non
     si applica, quindi li' il marchio va aggiunto a mano. */
  const titoloConMarchio = `${t("title")} | Morfeus`;

  return {
    /* Lo dichiarava il vecchio layout radice per tutto il sito. Senza,
       i canonical e gli hreflang restano percorsi relativi e non
       diventano indirizzi assoluti. */
    metadataBase: new URL(SITE_URL),
    title: {
      /* Il marchio va scritto qui dentro: il template vale per le
         pagine figlie, non per questo titolo. Finche' esisteva un
         layout radice sopra, era il SUO template ad aggiungerlo, ed e'
         anche il motivo per cui usciva doppio. */
      default: titoloConMarchio,
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
    
    alternates: buildLocaleAlternates("", safeLocale),

    openGraph: {
      title: titoloConMarchio,
      description: t("description"),
      url: `${baseUrl}${buildLocaleAlternates("", safeLocale).canonical}`,
      siteName: "Morfeus",
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: titoloConMarchio,
        },
      ],
      locale: locale === "en" ? "en_US" : "it_IT",
      type: "website",
    },
    
    twitter: {
      card: "summary_large_image",
      title: titoloConMarchio,
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

  /* Questo e' il layout RADICE delle pagine con la lingua: <html> lo
     apre Documento, e `lang` arriva dal segmento dell'indirizzo, non
     dagli header. Per questo la lingua e' giusta gia' nell'HTML servito
     e le pagine restano prerenderizzate. Il vecchio componente HtmlLang,
     che correggeva l'attributo dopo il primo render lato client, non
     serve piu' e non c'e' piu'. */
  return (
    <Documento lang={locale}>
      <StructuredData locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </NextIntlClientProvider>
    </Documento>
  );
}
