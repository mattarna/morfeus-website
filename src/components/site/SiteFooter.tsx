import { HomeFooter } from "@/components/sections/HomeFooter";

/**
 * Official-site footer — same footer as the home page (HomeFooter), per Matteo.
 * `forceActive` keeps it always visible (the home gates it on its 14-step
 * scroll store, which doesn't exist on content pages).
 */
export function SiteFooter() {
  return <HomeFooter forceActive />;
}
