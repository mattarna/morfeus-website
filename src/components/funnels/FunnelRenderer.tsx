import { funnelComponentMap } from "@/components/funnels/componentMap";
import type { FunnelConfig, FunnelStepConfig } from "@/funnels/types";

interface FunnelRendererProps {
  funnel: FunnelConfig;
  step: FunnelStepConfig;
}

export function FunnelRenderer({ funnel, step }: FunnelRendererProps) {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white md:px-10 md:py-14">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {step.componentOrder.map((componentName) => {
          const Component = funnelComponentMap[componentName];
          if (!Component) {
            return null;
          }
          return (
            <Component
              key={`${step.id}-${componentName}`}
              accentColor={funnel.accentColor}
              step={step}
            />
          );
        })}
      </div>
    </main>
  );
}
