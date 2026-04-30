import { getRegisteredFunnelConfig, getFunnelRegistryItem } from "@/funnels/registry";
import type { FunnelComponentName, FunnelConfig, FunnelStepConfig } from "@/funnels/types";

const allowedComponents: FunnelComponentName[] = [
  "Hero",
  "ValueBullets",
  "Agenda",
  "CTABox",
  "ThankYouSummary",
  "VideoSales",
  "OfferStack",
  "CheckoutButton",
  "WebinarHeader",
  "WebinarHero",
  "WebinarSocialProof",
  "WebinarLetter",
  "WebinarLearnPoints",
  "WebinarAudience",
  "WebinarHost",
  "WebinarChange",
  "WebinarFinalCTA",
  "WebinarFooter",
  "WebinarThankYou",
  "WebinarStickyBar",
  "WebinarBanner",
  "WebinarLogos",
  "WebinarFAQ",
  "WebinarReplayHeader",
  "WebinarReplayVideo",
  "WebinarReplayContext",
  "WebinarReplayCards",
  "WebinarReplayFAQ",
  "WebinarReplayFooter",
  "FreebieHero",
  "FreebieWebinarTeaser",
  "FreebieThankYou",
  "SalesHeader",
  "SalesHero",
  "SalesBridge",
  "SalesThreeLevels",
  "SalesProblem",
  "SalesMechanism",
  "SalesBenefits",
  "SalesPromiseLetter",
  "SalesModules",
  "SalesProof",
  "SalesReviews",
  "SalesAudience",
  "SalesComparison",
  "SalesBonus",
  "SalesOffer",
  "SalesUpsellBootcamp",
  "SalesGuarantee",
  "SalesFAQ",
  "SalesBootcampBridge",
  "SalesUrgency",
  "SalesFinalCTA",
  "SalesB2B",
  "SalesFooter",
  "SalesStickyBar",
  "SalesV2Header",
  "SalesV2Hero",
  "SalesV2Bridge",
  "SalesV2ThreeLevels",
  "SalesV2Problem",
  "SalesV2Mechanism",
  "SalesV2Benefits",
  "SalesV2PromiseLetter",
  "SalesV2Modules",
  "SalesV2Proof",
  "SalesV2Reviews",
  "SalesV2Audience",
  "SalesV2Comparison",
  "SalesV2Bonus",
  "SalesV2Offer",
  "SalesV2UpsellBootcamp",
  "SalesV2Guarantee",
  "SalesV2FAQ",
  "SalesV2BootcampBridge",
  "SalesV2Urgency",
  "SalesV2FinalCTA",
  "SalesV2B2B",
  "SalesV2Footer",
  "SalesV2StickyBar",
  "BootcampHeader",
  "BootcampHero",
  "BootcampLevelGap",
  "BootcampWhyAlone",
  "BootcampMethod",
  "BootcampTransformation",
  "BootcampProgram",
  "BootcampFounders",
  "BootcampResults",
  "BootcampAudience",
  "BootcampB2B",
  "BootcampOffer",
  "BootcampGuarantee",
  "BootcampFAQ",
  "BootcampFinalCTA",
  "BootcampFooter",
  "BootcampStickyBar",
  "BootcampV2Header",
  "BootcampV2Hero",
  "BootcampV2LevelGap",
  "BootcampV2DisarmoEgo",
  "BootcampV2WhyAlone",
  "BootcampV2Method",
  "BootcampV2Transformation",
  "BootcampV2Program",
  "BootcampV2Founders",
  "BootcampV2Results",
  "BootcampV2Audience",
  "BootcampV2B2B",
  "BootcampV2PensaSe",
  "BootcampV2LaScelta",
  "BootcampV2Offer",
  "BootcampV2Guarantee",
  "BootcampV2FAQ",
  "BootcampV2FinalCTA",
  "BootcampV2Footer",
  "BootcampV2StickyBar"
];

function hasUniqueStepIds(steps: FunnelStepConfig[]): boolean {
  const ids = new Set(steps.map((step) => step.id));
  return ids.size === steps.length;
}

function hasValidComponentOrder(step: FunnelStepConfig): boolean {
  return step.componentOrder.every((name) => allowedComponents.includes(name));
}

function validateFunnelConfig(config: FunnelConfig): void {
  if (!config.id || !config.slug) {
    throw new Error("Invalid funnel config: missing id or slug.");
  }

  if (!Array.isArray(config.steps) || config.steps.length === 0) {
    throw new Error(`Invalid funnel config '${config.slug}': at least one step is required.`);
  }

  if (!hasUniqueStepIds(config.steps)) {
    throw new Error(`Invalid funnel config '${config.slug}': duplicate step ids found.`);
  }

  for (const step of config.steps) {
    if (!step.id || !step.title) {
      throw new Error(`Invalid funnel config '${config.slug}': each step must have id and title.`);
    }

    if (!hasValidComponentOrder(step)) {
      throw new Error(`Invalid funnel config '${config.slug}': invalid component in componentOrder.`);
    }
  }
}

export function loadFunnelConfig(slug: string): FunnelConfig | null {
  const registeredItem = getFunnelRegistryItem(slug);
  if (!registeredItem) {
    return null;
  }

  const config = getRegisteredFunnelConfig(slug);
  if (!config) {
    return null;
  }

  validateFunnelConfig(config);
  return config;
}

export function getFunnelStepByPath(config: FunnelConfig, subPath: string[]): FunnelStepConfig | null {
  const normalizedPath = subPath.length === 0 ? "" : subPath.join("/");
  return config.steps.find((step) => step.path === normalizedPath) ?? null;
}
