import WcThemeProvider from "@/funnels/webinar-claude-2026-05/WcThemeProvider";

export default function FunnelSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  if (params.slug === "webinar-claude") {
    return <WcThemeProvider>{children}</WcThemeProvider>;
  }
  return <>{children}</>;
}
