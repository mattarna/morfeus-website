export type PrecallEventName =
  | "precall_page_view"
  | "precall_video_variant_loaded"
  | "precall_watch_video_click"
  | "precall_form_start"
  | "precall_form_submit_success"
  | "precall_form_submit_error"
  | "precall_case_cta_click";

type PrecallPayload = Record<string, string | number | boolean | null | undefined>;

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export function trackPrecallEvent(event: PrecallEventName, payload: PrecallPayload = {}): void {
  if (!hasWindow()) {
    return;
  }

  const targetWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  targetWindow.dataLayer = targetWindow.dataLayer || [];
  targetWindow.dataLayer.push({
    event,
    ...payload
  });
}
