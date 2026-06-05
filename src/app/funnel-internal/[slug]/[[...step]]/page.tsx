import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { FunnelRenderer } from "@/components/funnels/FunnelRenderer";
import { FunnelTrackingBridge } from "@/components/funnels/FunnelTrackingBridge";
import { MarfChatbot } from "@/components/funnels/MarfChatbot";
import { getFunnelStepByPath, loadFunnelConfig } from "@/funnels/loader";
import { getFunnelRegistryItem } from "@/funnels/registry";

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
  const runtime = getFunnelRegistryItem(params.slug)?.runtime;
  const metadataPreset = runtime?.metadataPreset;

  if (step?.noindex) {
    return {
      title: step.title,
      robots: { index: false, follow: false, nocache: true },
    };
  }

  if (metadataPreset === "claude-unlocked-sales" && step?.id === "sales") {
    const title = step.title;
    const description =
      "Il corso Claude Morfeus per usare Claude come uno strumento di lavoro reale. 10 moduli, sessioni live, garanzia 14 giorni.";
    const url = `https://morfeushub.com/${params.slug}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url,
        siteName: "Morfeus Hub",
        images: [
          {
            url: "/claude-unlocked/cover-16x9.png",
            width: 1920,
            height: 1080,
            alt: "Claude Unlocked — Corso Claude Morfeus",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/claude-unlocked/cover-16x9.png"],
      },
    };
  }

  if (metadataPreset === "vocabolario-page" && step?.id === "page") {
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

  if (metadataPreset === "formazione-finanziata" && step?.id === "sales") {
    const title = "AI Zero to Operator — Corso AI rimborsabile fino al 100% | Morfeus Hub";
    const description =
      "Corso pratico da 40 ore per professionisti e aziende in Lombardia. Rimborsabile fino al 100% (P.IVA) e 90% (aziende) con il bando Formazione Continua di Regione Lombardia (FSE+). Parti da zero, esci con un sistema AI funzionante.";
    const url = `https://morfeushub.com/${params.slug}`;
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        type: "website",
        url,
        siteName: "Morfeus Hub",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  if (metadataPreset === "freebie-hub") {
    const title = "Risorse gratuite sull'AI: corsi, skill e guide | Morfeus";
    const description =
      "Corsi, skill per Claude e guide operative gratuite di Morfeus. Dal corso AI Fundamentals (6 ore) alle skill per il tuo Design System: materiale pronto da applicare nel lavoro vero, senza fuffa.";
    const url = "https://morfeushub.com/risorse-gratuite";
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        type: "website",
        url,
        siteName: "Morfeus Hub",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  if (metadataPreset === "playbook") {
    const title =
      step?.id === "index"
        ? "Playbook Imprenditore Milionario | Morfeus"
        : `${step?.title ?? "Playbook"} | Morfeus`;
    const description =
      "I materiali operativi di Infobusiness Milionario: 7 moduli, quick win, framework, checklist e playbook completi.";
    return {
      title,
      description,
      robots: { index: false, follow: false },
      alternates: {
        canonical: step?.path
          ? `/playbook-imprenditore-milionario/${step.path}`
          : "/playbook-imprenditore-milionario",
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: step?.path
          ? `https://morfeushub.com/playbook-imprenditore-milionario/${step.path}`
          : "https://morfeushub.com/playbook-imprenditore-milionario",
        siteName: "Morfeus Hub",
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
  const runtime = getFunnelRegistryItem(params.slug)?.runtime;

  const step = getFunnelStepByPath(funnel, params.step ?? []);
  if (!step) {
    notFound();
  }

  const cookieName = `mf_ab_${params.slug}`;
  const variantCookie = cookies().get(cookieName)?.value;
  const variant = variantCookie === "A" || variantCookie === "B" ? variantCookie : undefined;
  const isConversionStep = step.isConversion === true;
  const showMarfChatbot = Boolean(
    runtime?.chatbotStepIds?.includes(step.id),
  );

  return (
    <>
      <FunnelTrackingBridge
        funnelId={funnel.id}
        stepId={step.id}
        variant={variant}
        isConversionStep={isConversionStep}
      />
      <FunnelRenderer funnel={funnel} step={step} />
      {showMarfChatbot && <MarfChatbot />}
    </>
  );
}
