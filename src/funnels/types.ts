export type FunnelVariant = "A" | "B";

export type FunnelComponentName =
  | "Hero"
  | "ValueBullets"
  | "Agenda"
  | "CTABox"
  | "ThankYouSummary"
  | "VideoSales"
  | "OfferStack"
  | "CheckoutButton"
  | "WebinarHeader"
  | "WebinarHero"
  | "WebinarSocialProof"
  | "WebinarLetter"
  | "WebinarLearnPoints"
  | "WebinarAudience"
  | "WebinarHost"
  | "WebinarChange"
  | "WebinarFinalCTA"
  | "WebinarFooter"
  | "WebinarThankYou"
  | "WebinarStickyBar";

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

export interface WebinarHeroContent {
  badge: string;
  headline: string;
  subheadline: string;
  eventLabel: string;
  countdownIso?: string;
  formTitle?: string;
  formMicrocopy?: string;
  formSubmitLabel?: string;
  formSuccessRedirect?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface WebinarSocialProofContent {
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export interface WebinarLearnPointsContent {
  title: string;
  points: Array<{
    title: string;
    body: string;
  }>;
}

export interface WebinarAudienceContent {
  title: string;
  bullets: string[];
}

export interface WebinarHostContent {
  title: string;
  body: string;
}

export interface WebinarFinalCTAContent {
  title: string;
  body: string;
  countdownIso?: string;
  formTitle?: string;
  formMicrocopy?: string;
  formSubmitLabel?: string;
  formSuccessRedirect?: string;
  ctaLabel: string;
  ctaHref: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarHeaderContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarFooterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarLetterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarChangeContent {}

export interface WebinarThankYouContent {
  title: string;
  body: string;
  checklist: string[];
  eventDateLabel?: string;
  youtubeLabel?: string;
  calendarLabel?: string;
  calendarGoogleHref?: string;
  calendarIcsFileName?: string;
  calendarIcsContent?: string;
  ctaLabel: string;
  ctaHref: string;
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
    WebinarHeader?: WebinarHeaderContent;
    WebinarHero?: WebinarHeroContent;
    WebinarSocialProof?: WebinarSocialProofContent;
    WebinarLetter?: WebinarLetterContent;
    WebinarLearnPoints?: WebinarLearnPointsContent;
    WebinarAudience?: WebinarAudienceContent;
    WebinarHost?: WebinarHostContent;
    WebinarChange?: WebinarChangeContent;
    WebinarFinalCTA?: WebinarFinalCTAContent;
    WebinarFooter?: WebinarFooterContent;
    WebinarThankYou?: WebinarThankYouContent;
  };
}

export interface FunnelConfig {
  id: string;
  slug: string;
  locale: "it" | "en";
  accentColor: string;
  layout?: "default" | "bare";
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
