import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { FunnelRenderer } from "@/components/funnels/FunnelRenderer";
import { FunnelTrackingBridge } from "@/components/funnels/FunnelTrackingBridge";
import { getFunnelStepByPath, loadFunnelConfig } from "@/funnels/loader";

interface FunnelPageProps {
  params: {
    slug: string;
    step?: string[];
  };
}

export function generateMetadata({ params }: FunnelPageProps): Metadata {
  const funnel = loadFunnelConfig(params.slug);
  if (!funnel) return {};
  const step = getFunnelStepByPath(funnel, params.step ?? []);
  if (step?.noindex) {
    return {
      title: step.title,
      robots: { index: false, follow: false, nocache: true },
    };
  }
  // Vocabolario AI — SEO meta dedicati (pagina pubblica indicizzabile)
  if (params.slug === "vocabolario-ai" && step?.id === "page") {
    const title = "Vocabolario AI: la guida ai termini di AI e Claude | Morfeus";
    const description =
      "60+ termini di AI spiegati senza fuffa: LLM, RAG, MCP, fine-tuning, prompt engineering. Più una sezione dedicata a Claude (Cowork, Skill, Memory, Projects). La guida che ti serve per parlare il linguaggio dell'intelligenza artificiale.";
    return {
      title,
      description,
      alternates: { canonical: "/vocabolario-ai" },
      openGraph: {
        title,
        description,
        type: "article",
        url: "https://morfeushub.com/vocabolario-ai",
        siteName: "Morfeus Hub",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }
  return {};
}

export default function FunnelPage({ params }: FunnelPageProps) {
  const funnel = loadFunnelConfig(params.slug);
  if (!funnel) {
    notFound();
  }

  const step = getFunnelStepByPath(funnel, params.step ?? []);
  if (!step) {
    notFound();
  }

  const cookieName = `mf_ab_${params.slug}`;
  const variantCookie = cookies().get(cookieName)?.value;
  const variant = variantCookie === "A" || variantCookie === "B" ? variantCookie : undefined;
  const isConversionStep = step.isConversion === true;

  return (
    <>
      <FunnelTrackingBridge
        funnelId={funnel.id}
        stepId={step.id}
        variant={variant}
        isConversionStep={isConversionStep}
      />
      <FunnelRenderer funnel={funnel} step={step} />
    </>
  );
}
