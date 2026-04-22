import type { FunnelConfig, FunnelRegistryItem } from "@/funnels/types";
import { isReservedSlug } from "@/lib/reserved-slugs";
import webinarClaudeMay2026Config from "@/funnels/webinar-claude-2026-05/config.json";

export const funnelRegistry: Record<string, FunnelRegistryItem> = {};

const funnelConfigMap: Record<string, FunnelConfig> = {};

export function registerFunnel(item: FunnelRegistryItem, config: FunnelConfig): void {
  if (isReservedSlug(item.slug)) {
    throw new Error(
      `Cannot register funnel with slug "${item.slug}": it collides with a reserved site slug. ` +
      `Check src/lib/reserved-slugs.ts for the full list.`
    );
  }
  funnelRegistry[item.slug] = item;
  funnelConfigMap[item.slug] = config;
}

export function getFunnelRegistryItem(slug: string): FunnelRegistryItem | null {
  return funnelRegistry[slug] ?? null;
}

export function isRegisteredFunnelSlug(slug: string): boolean {
  return Boolean(funnelRegistry[slug]);
}

export function getRegisteredFunnelConfig(slug: string): FunnelConfig | null {
  return funnelConfigMap[slug] ?? null;
}

const webinarClaudeMay2026Item: FunnelRegistryItem = {
  slug: "webinar-claude",
  locale: "it",
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(webinarClaudeMay2026Item, webinarClaudeMay2026Config as FunnelConfig);
