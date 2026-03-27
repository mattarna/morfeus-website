import type { Metadata } from "next";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const safeLocale = locale === "it" ? "it" : "en";

  return {
    alternates: buildLocaleAlternates("forge", safeLocale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
