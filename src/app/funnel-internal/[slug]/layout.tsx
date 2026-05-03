import Script from "next/script";
import WcThemeProvider from "@/funnels/webinar-claude-2026-05/WcThemeProvider";
import { CookieConsentFunnel } from "@/components/shared/CookieConsentFunnel";

export default function FunnelSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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
      {params.slug === "webinar-claude" || params.slug === "claude-skill-anatomy" || params.slug === "instagram-carousel-skills" || params.slug === "vocabolario-ai" || params.slug === "claude-unlocked-v2" || params.slug === "claude-unlocked-v3" || params.slug === "bootcamp-ai-champion" || params.slug === "bootcamp-ai-champion-v2" || params.slug === "bootcamp-ai-champion-v3" ? (
        <>
          <link rel="preload" href="/fonts/webinar-claude/ClashDisplay-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/webinar-claude/Satoshi-Variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
          <WcThemeProvider theme={params.slug === "bootcamp-ai-champion" || params.slug === "bootcamp-ai-champion-v2" || params.slug === "bootcamp-ai-champion-v3" ? "bootcamp" : "default"}>
            {children}
          </WcThemeProvider>
        </>
      ) : (
        <>{children}</>
      )}
      {/* GDPR cookie banner — funnel styling */}
      <CookieConsentFunnel />
    </>
  );
}
