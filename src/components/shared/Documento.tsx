import Script from "next/script";

/* ============================================================
   IL DOCUMENTO HTML, UNO SOLO PER TUTTO IL SITO
   ------------------------------------------------------------
   Next vuole <html> e <body> nel layout radice, e il layout
   radice non sa in che lingua sta rispondendo: sta sopra il
   segmento /[locale]. Per questo la lingua era scritta fissa a
   "it" e un componente client la correggeva dopo, cioe' i
   crawler leggevano "italiano" anche sulle pagine inglesi.

   La soluzione e' avere DUE layout radice (route group `(sito)`
   e `(fuori-lingua)`), ognuno col suo <html>. Ma due layout
   vogliono dire due copie di GTM, Meta Pixel, Consent Mode e
   delle classi del body: il giorno che qualcuno ne tocca una
   sola, meta' sito perde il tracciamento e nessuno se ne
   accorge.

   Quindi la copia non esiste: la testa e il corpo del documento
   stanno qui, e i due layout passano solo la lingua.
   ============================================================ */

const GTM_ID = "GTM-WPT8RFKZ";
const META_PIXEL_ID = "978948495077175";

export function Documento({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Preconnessioni per lo sfondo animato (UnicornStudio). Lo script
            arriva da jsDelivr, la scena da un'origine AWS: aprire in
            anticipo la connessione a jsDelivr toglie un giro di handshake
            quando lo sfondo si carica. Sull'origine AWS solo dns-prefetch,
            non preconnect: e' un sottodominio con hash d'infrastruttura che
            non controlliamo (puo' cambiare lato UnicornStudio), quindi ci
            fermiamo alla risoluzione DNS, l'unico costo sempre sicuro.
            jsDelivr senza crossOrigin: lo script si scarica in no-cors, e un
            preconnect con crossOrigin diverso aprirebbe una seconda
            connessione a vuoto. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="dns-prefetch"
          href="https://sl-11a463aaedf44600a99367660fd6fa70.ecs.us-east-1.on.aws"
        />
        <meta
          name="facebook-domain-verification"
          content="241durpovws57gda4slstym71fhjnf"
        />
        {/* Gli esperimenti tipografico e di palette sono chiusi: Clash
            Display e la Official Palette v1.0 sono il default del design
            system (fonts.ts, site.css, tailwind.config.ts). I toggle
            ?font e ?palette non esistono piu'.
            Questo blocco serve solo a ripulire le vecchie scelte rimaste
            in localStorage: senza, chi aveva provato una variante se la
            ritroverebbe incollata addosso per sempre. Rimuovibile fra
            qualche settimana. */}
        <script
          id="font-experiment-cleanup"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  localStorage.removeItem("morfeus-font-exp");
                  localStorage.removeItem("morfeus-palette-exp");
                  localStorage.removeItem("morfeus-body-test");
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
              })(window,document,'script','dataLayer','${GTM_ID}');
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
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="font-dm-sans antialiased bg-night text-ghost-white">
        {/* GTM Noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
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
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
