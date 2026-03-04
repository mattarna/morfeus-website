export type FunnelVariant = "A" | "B";

export type FunnelComponentName =
  | "Hero"
  | "ValueBullets"
  | "Agenda"
  | "CTABox"
  | "ThankYouSummary"
  | "VideoSales"
  | "OfferStack"
  | "CheckoutButton";

export interface HeroContent {
  eyebrow?: string;
  headline: string;
  subheadline: string;
}

export interface ValueBulletsContent {
  title: string;
  items: string[];
}

export interface AgendaContent {
  title: string;
  points: string[];
}

export interface CTABoxContent {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ThankYouSummaryContent {
  title: string;
  body: string;
  checklist?: string[];
}

export interface VideoSalesContent {
  title: string;
  description: string;
  videoUrl?: string;
}

export interface OfferStackContent {
  title: string;
  items: string[];
  priceLabel: string;
}

export interface CheckoutButtonContent {
  label: string;
  href: string;
}

export interface FunnelStepConfig {
  id: string;
  title: string;
  path: string;
  isConversion?: boolean;
  componentOrder: FunnelComponentName[];
  content: {
    Hero?: HeroContent;
    ValueBullets?: ValueBulletsContent;
    Agenda?: AgendaContent;
    CTABox?: CTABoxContent;
    ThankYouSummary?: ThankYouSummaryContent;
    VideoSales?: VideoSalesContent;
    OfferStack?: OfferStackContent;
    CheckoutButton?: CheckoutButtonContent;
  };
}

export interface FunnelConfig {
  id: string;
  slug: string;
  locale: "it" | "en";
  accentColor: string;
  steps: FunnelStepConfig[];
}

export interface FunnelRegistryItem {
  slug: string;
  locale: "it" | "en";
  abTest: {
    enabled: boolean;
    variants: FunnelVariant[];
  };
}
