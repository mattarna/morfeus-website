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
