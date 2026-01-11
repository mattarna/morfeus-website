import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://morfeushub.com"),
  title: {
    default: "Morfeus – AI-Native Organization Design",
    template: `%s | Morfeus`,
  },
  description: "Integriamo l'Intelligenza Artificiale nel DNA delle organizzazioni. Ripensiamo strutture, processi e decisioni per l'era AI-Native.",
  keywords: ["AI Organization Design", "Intelligenza Artificiale Aziendale", "Automazione Processi", "Digital Transformation", "Morfeus Hub"],
  authors: [{ name: "Morfeus Team" }],
  creator: "Morfeus",
  publisher: "Morfeus",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "it-IT": "/it",
    },
  },
  openGraph: {
    title: "Morfeus – AI-Native Organization Design",
    description: "We integrate AI into the DNA of organizations. Rethinking structure, processes, and decisions.",
    url: "https://morfeushub.com",
    siteName: "Morfeus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 800,
        height: 800,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morfeus – AI-Native Organization Design",
    description: "We integrate AI into the DNA of organizations. Rethinking structure, processes, and decisions.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Consent Mode v2 Inizializzazione */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });
              gtag('set', 'ads_data_redaction', true);
            `,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WPT8RFKZ');
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} font-outfit antialiased bg-black text-slate-300`}>
        {/* GTM Noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPT8RFKZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
