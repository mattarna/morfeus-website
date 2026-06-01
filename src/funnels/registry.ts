import type { FunnelConfig, FunnelRegistryItem } from "@/funnels/types";
import { isReservedSlug } from "@/lib/reserved-slugs";
import webinarClaudeMay2026Config from "@/funnels/webinar-claude-2026-05/config.json";
import claudeUnlockedConfig from "@/funnels/webinar-claude-2026-05/sales-v3-config.json";
import bootcampAiChampion3aEdizioneConfig from "@/funnels/webinar-claude-2026-05/bootcamp-v3-config.json";
import freebieCoworkSetupSkillConfig from "@/funnels/freebie-cowork-setup-skill-2026-04/config.json";
import freebieInstagramCarouselSkillsConfig from "@/funnels/freebie-instagram-carousel-skills-2026-04/config.json";
import freebieVocabolarioAiConfig from "@/funnels/freebie-vocabolario-ai-2026-04/config.json";
import freebieDesignSystemBlueprintConfig from "@/funnels/freebie-design-system-blueprint-2026-05/config.json";
import playbookConfig from "@/funnels/playbook-2026-05/config.json";
import asseprimWebinarConfig from "@/funnels/asseprim-18-maggio-2026/config.json";
import formazioneFinanziataConfig from "@/funnels/formazione-finanziata-ai-2026/config.json";

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
  indexable: true,
  runtime: {
    fontPack: "webinar",
    theme: "default",
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(webinarClaudeMay2026Item, webinarClaudeMay2026Config as FunnelConfig);

const freebieCoworkSetupSkillItem: FunnelRegistryItem = {
  slug: "claude-skill-anatomy",
  locale: "it",
  indexable: false,
  runtime: {
    fontPack: "webinar",
    theme: "default",
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(freebieCoworkSetupSkillItem, freebieCoworkSetupSkillConfig as FunnelConfig);

const freebieInstagramCarouselSkillsItem: FunnelRegistryItem = {
  slug: "instagram-carousel-skills",
  locale: "it",
  indexable: false,
  runtime: {
    fontPack: "webinar",
    theme: "default",
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(freebieInstagramCarouselSkillsItem, freebieInstagramCarouselSkillsConfig as FunnelConfig);

const freebieVocabolarioAiItem: FunnelRegistryItem = {
  slug: "vocabolario-ai",
  locale: "it",
  indexable: true,
  runtime: {
    fontPack: "webinar",
    theme: "default",
    metadataPreset: "vocabolario-page",
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(freebieVocabolarioAiItem, freebieVocabolarioAiConfig as FunnelConfig);

const freebieDesignSystemBlueprintItem: FunnelRegistryItem = {
  slug: "design-system-skill",
  locale: "it",
  indexable: false,
  runtime: {
    fontPack: "webinar",
    theme: "default",
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(freebieDesignSystemBlueprintItem, freebieDesignSystemBlueprintConfig as FunnelConfig);

const claudeUnlockedItem: FunnelRegistryItem = {
  slug: "claude-unlocked",
  locale: "it",
  indexable: true,
  runtime: {
    fontPack: "webinar",
    theme: "default",
    metadataPreset: "claude-unlocked-sales",
    chatbotStepIds: ["sales"],
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(claudeUnlockedItem, claudeUnlockedConfig as FunnelConfig);

const bootcampAiChampion3aEdizioneItem: FunnelRegistryItem = {
  slug: "bootcamp-ai-champion-3a-edizione",
  locale: "it",
  indexable: true,
  runtime: {
    fontPack: "webinar",
    theme: "bootcamp",
    chatbotStepIds: ["sales"],
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(bootcampAiChampion3aEdizioneItem, bootcampAiChampion3aEdizioneConfig as FunnelConfig);

const playbookItem: FunnelRegistryItem = {
  slug: "playbook-imprenditore-milionario",
  locale: "it",
  indexable: false,
  runtime: {
    fontPack: "playbook",
    metadataPreset: "playbook",
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(playbookItem, playbookConfig as FunnelConfig);

const asseprimWebinarItem: FunnelRegistryItem = {
  slug: "asseprim-18-maggio-2026",
  locale: "it",
  indexable: false,
  runtime: {
    fontPack: "webinar",
    theme: "default",
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(asseprimWebinarItem, asseprimWebinarConfig as FunnelConfig);

const formazioneFinanziataItem: FunnelRegistryItem = {
  slug: "formazione-finanziata-2026",
  locale: "it",
  indexable: true,
  runtime: {
    fontPack: "webinar",
    theme: "finanziata",
    metadataPreset: "formazione-finanziata",
  },
  abTest: {
    enabled: false,
    variants: ["A"]
  }
};

registerFunnel(formazioneFinanziataItem, formazioneFinanziataConfig as FunnelConfig);
