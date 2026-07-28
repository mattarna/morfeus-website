import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0B0C", // Night
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
    <html lang="it" suppressHydrationWarning>
      <head>
        <meta
          name="facebook-domain-verification"
          content="241durpovws57gda4slstym71fhjnf"
        />
        {/* ============================================================
            ESPERIMENTO FONT (temporaneo, branch exp/font-jakarta)
              ?font=jakarta → Plus Jakarta Sans + Geist Mono
              ?font=off     → torna a Clash Display + Satoshi (stato attuale)
            La scelta resta in localStorage.
            Spento di default: senza il flag non aggiunge classi e non
            scarica nulla — le pagine restano identiche a prima.
            Regole in src/components/site/site-font-experiment.css.
            Geist Mono arriva da CDN perche' next/font/google su Next 14
            non ce l'ha in lista; Plus Jakarta Sans e' self-hostata da
            next/font (vedi components/site/fonts.ts).
            Per rimuovere l'esperimento: cancella questo blocco.
            ============================================================ */}
        <script
          id="font-experiment"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var KEY = "morfeus-font-exp";
                  var q = new URLSearchParams(window.location.search).get("font");
                  if (q === "jakarta") localStorage.setItem(KEY, "jakarta");
                  else if (q) localStorage.removeItem(KEY);
                  if (localStorage.getItem(KEY) !== "jakarta") return;

                  document.documentElement.classList.add("font-exp-jakarta");

                  var l = document.createElement("link");
                  l.rel = "stylesheet";
                  l.href = "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap";
                  document.head.appendChild(l);

                  document.addEventListener("DOMContentLoaded", function () {
                    var b = document.createElement("div");
                    b.className = "font-exp-badge";
                    b.textContent = "font exp · plus jakarta sans + geist mono · ?font=off";
                    document.body.appendChild(b);
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Consent Mode v2 Inizializzazione */}
        <Script
          id="consent-mode"
          strategy="afterInteractive"
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
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '978948495077175');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="font-dm-sans antialiased bg-night text-ghost-white">
        {/* GTM Noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPT8RFKZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Meta Pixel Noscript */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=978948495077175&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
