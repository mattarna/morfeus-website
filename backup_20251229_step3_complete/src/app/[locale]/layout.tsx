import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { StructuredData } from "@/components/SEO/StructuredData";

// Optimized font loading with preload and subset
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark",
};

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
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: `%s | Morfeus`,
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "Morfeus", url: baseUrl }],
    creator: "Morfeus",
    publisher: "Morfeus",
    
    // Robots configuration
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
    
    // Alternate languages (hreflang)
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "en": `${baseUrl}/en`,
        "it": `${baseUrl}/it`,
        "x-default": `${baseUrl}/en`,
      },
    },
    
    // Open Graph
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
    
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fa39a65-8fd6-44a2-8334-b3c76d87bb10_1600w.png"],
      creator: "@morfeushub",
    },
    
    // Icons
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    
    // Manifest for PWA
    manifest: "/site.webmanifest",
    
    // Category
    category: "technology",
  };
}

export default async function RootLayout({
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
    <html lang={locale}>
      <head>
        {/* Structured Data for SEO */}
        <StructuredData locale={locale} />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Preconnect for critical third-party origins */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.variable} font-outfit antialiased bg-black text-slate-300`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
