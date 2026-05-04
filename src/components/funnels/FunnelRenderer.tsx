import { funnelComponentMap } from "@/components/funnels/componentMap";
import type { FunnelConfig, FunnelStepConfig } from "@/funnels/types";

interface FunnelRendererProps {
  funnel: FunnelConfig;
  step: FunnelStepConfig;
}

export function FunnelRenderer({ funnel, step }: FunnelRendererProps) {
  const sections = step.componentOrder.map((componentName) => {
    const Component = funnelComponentMap[componentName];
    if (!Component) return null;
    return (
      <Component
        key={`${step.id}-${componentName}`}
        accentColor={funnel.accentColor}
        step={step}
      />
    );
  });

  if (funnel.layout === "bare") {
    return (
      <>
        <a href="#main-content" className="skip-link">
          Salta al contenuto
        </a>
        <main id="main-content">{sections}</main>
      </>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Salta al contenuto
      </a>
      <main id="main-content" className="min-h-screen bg-black px-6 py-10 text-white md:px-10 md:py-14">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">{sections}</div>
      </main>
    </>
  );
}
