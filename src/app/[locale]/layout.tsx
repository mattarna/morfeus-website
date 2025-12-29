import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { StructuredData } from "@/components/SEO/StructuredData";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
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
          url: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fa39a65-8fd6-44a2-8334-b3c76d87bb10_1600w.png",
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
      images: ["https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fa39a65-8fd6-44a2-8334-b3c76d87bb10_1600w.png"],
      creator: "@morfeushub",
    },
    
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    
    manifest: "/site.webmanifest",
    category: "technology",
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate the locale
  if (!routing.locales.includes(locale as "en" | "it")) {
    notFound();
  }

  // Explicitly pass locale to getMessages to ensure correct language file is loaded
  const messages = await getMessages({ locale });

  return (
    <>
      <StructuredData locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
