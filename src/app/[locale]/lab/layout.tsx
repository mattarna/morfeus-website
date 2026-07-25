import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/shared/SmoothScroll";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const safeLocale = locale === "it" ? "it" : "en";

  return {
    alternates: buildLocaleAlternates("lab", safeLocale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
