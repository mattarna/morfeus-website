import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Morfeus - Designing AI-Native Organizations",
  description: "We redesign how organizations work, with artificial intelligence built into the system. Transform your organization with intelligent systems.",
  keywords: ["AI", "Artificial Intelligence", "Organizational Design", "AI-Native", "Automation", "ROI Systems", "Morfeus"],
  authors: [{ name: "Morfeus" }],
  openGraph: {
    title: "Morfeus - Designing AI-Native Organizations",
    description: "We redesign how organizations work, with artificial intelligence built into the system. Transform your organization with intelligent systems.",
    url: "https://morfeushub.com",
    siteName: "Morfeus",
    images: [
      {
        url: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fa39a65-8fd6-44a2-8334-b3c76d87bb10_1600w.png",
        width: 1200,
        height: 630,
        alt: "Morfeus - Designing AI-Native Organizations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morfeus - Designing AI-Native Organizations",
    description: "We redesign how organizations work, with artificial intelligence built into the system. Transform your organization with intelligent systems.",
    images: ["https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fa39a65-8fd6-44a2-8334-b3c76d87bb10_1600w.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate the locale
  if (!routing.locales.includes(locale as "en" | "it")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${outfit.variable} font-outfit antialiased bg-black text-slate-300`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

