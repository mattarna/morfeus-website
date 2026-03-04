export type FunnelTrackEventName = "funnel_view" | "cta_click" | "conversion";

export interface FunnelTrackPayload {
  funnel_id: string;
  step_id: string;
  variant?: "A" | "B";
  cta_href?: string;
}
