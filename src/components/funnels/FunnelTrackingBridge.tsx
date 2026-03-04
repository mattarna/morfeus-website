"use client";

import { useEffect } from "react";
import type { FunnelTrackEventName, FunnelTrackPayload } from "@/funnels/tracking";

interface FunnelTrackingBridgeProps {
  funnelId: string;
  stepId: string;
  variant?: "A" | "B";
  isConversionStep: boolean;
}

function pushEvent(eventName: FunnelTrackEventName, payload: FunnelTrackPayload) {
  if (typeof window === "undefined" || !window.dataLayer) {
    return;
  }

  window.dataLayer.push({
    event: eventName,
    ...payload
  });
}

export function FunnelTrackingBridge({
  funnelId,
  stepId,
  variant,
  isConversionStep
}: FunnelTrackingBridgeProps) {
  useEffect(() => {
    const basePayload: FunnelTrackPayload = {
      funnel_id: funnelId,
      step_id: stepId,
      ...(variant ? { variant } : {})
    };

    pushEvent("funnel_view", basePayload);

    if (isConversionStep) {
      pushEvent("conversion", basePayload);
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const ctaElement = target?.closest("[data-funnel-cta='true']") as HTMLElement | null;
      if (!ctaElement) {
        return;
      }

      const ctaHref = ctaElement.getAttribute("data-cta-href") ?? undefined;
      pushEvent("cta_click", {
        ...basePayload,
        ...(ctaHref ? { cta_href: ctaHref } : {})
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [funnelId, stepId, variant, isConversionStep]);

  return null;
}
