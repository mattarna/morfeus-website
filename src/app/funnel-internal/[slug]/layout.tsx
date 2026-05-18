import Script from "next/script";
import WcThemeProvider from "@/funnels/webinar-claude-2026-05/WcThemeProvider";
import { CookieConsentFunnel } from "@/components/shared/CookieConsentFunnel";
import { getFunnelRegistryItem } from "@/funnels/registry";

function FunnelRuntimeStyles({ fontPack }: { fontPack: "webinar" | "playbook" }) {
  if (fontPack === "playbook") {
    return (
      <>
        <link rel="preload" href="/fonts/webinar-claude/ClashDisplay-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/webinar-claude/Satoshi-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/webinar-claude/PlayfairDisplay-Italic-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face { font-family: 'Clash Display'; src: url('/fonts/webinar-claude/ClashDisplay-Variable.ttf') format('truetype'); font-weight: 200 700; font-style: normal; font-display: swap; }
          @font-face { font-family: 'Satoshi'; src: url('/fonts/webinar-claude/Satoshi-Variable.ttf') format('truetype'); font-weight: 300 900; font-style: normal; font-display: swap; }
          @font-face { font-family: 'Satoshi'; src: url('/fonts/webinar-claude/Satoshi-VariableItalic.ttf') format('truetype'); font-weight: 300 900; font-style: italic; font-display: swap; }
          @font-face { font-family: 'Playfair Display'; src: url('/fonts/webinar-claude/PlayfairDisplay-Variable.ttf') format('truetype'); font-weight: 400 900; font-style: normal; font-display: swap; }
          @font-face { font-family: 'Playfair Display'; src: url('/fonts/webinar-claude/PlayfairDisplay-Italic-Variable.ttf') format('truetype'); font-weight: 400 900; font-style: italic; font-display: swap; }
          html { scroll-padding-top: 96px; }
          @media (max-width: 640px) { html { scroll-padding-top: 76px; } }
        ` }} />
      </>
    );
  }

  return (
    <>
      <link rel="preload" href="/fonts/webinar-claude/ClashDisplay-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/webinar-claude/Satoshi-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/webinar-claude/PlayfairDisplay-Italic-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
    </>
  );
}

export default function FunnelSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const runtime = getFunnelRegistryItem(params.slug)?.runtime;
  const fontPack = runtime?.fontPack;
  const theme = runtime?.theme;

  return (
    <>
      {/* Meta Pixel — fires on all funnel pages; set NEXT_PUBLIC_META_PIXEL_ID in env */}
      {pixelId && (
        <Script
          id="meta-pixel-funnel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${pixelId}');
              fbq('track','PageView');
            `,
          }}
        />
      )}
      {fontPack === "webinar" && theme ? (
        <>
          <FunnelRuntimeStyles fontPack={fontPack} />
          <WcThemeProvider theme={theme}>
            {children}
          </WcThemeProvider>
        </>
      ) : fontPack === "playbook" ? (
        <>
          <FunnelRuntimeStyles fontPack={fontPack} />
          {children}
        </>
      ) : (
        <>{children}</>
      )}
      {/* GDPR cookie banner — funnel styling */}
      <CookieConsentFunnel />
    </>
  );
}
