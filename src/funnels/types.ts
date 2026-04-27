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
  | "WebinarStickyBar"
  | "WebinarBanner"
  | "WebinarLogos"
  | "WebinarFAQ"
  | "FreebieHero"
  | "FreebieWebinarTeaser"
  | "FreebieThankYou"
  | "SalesHeader"
  | "SalesHero"
  | "SalesBridge"
  | "SalesProblem"
  | "SalesMechanism"
  | "SalesBenefits"
  | "SalesPromiseLetter"
  | "SalesModules"
  | "SalesProof"
  | "SalesReviews"
  | "SalesAudience"
  | "SalesComparison"
  | "SalesBonus"
  | "SalesOffer"
  | "SalesGuarantee"
  | "SalesFAQ"
  | "SalesUrgency"
  | "SalesFinalCTA"
  | "SalesB2B"
  | "SalesFooter"
  | "SalesStickyBar";

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
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarFAQContent {}

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

export interface FreebieHeroContent {
  badge: string;
  headline: string;
  headlineAccent?: string;
  subheadline: string;
  coverSrc: string;
  coverAlt: string;
  formTitle: string;
  formMicrocopy: string;
  formSubmitLabel: string;
  formName: string;
  privacyText: string;
  privacyHref: string;
  successRedirect: string;
  rolesOptions: string[];
  rolesPlaceholder: string;
}

export interface FreebieWebinarTeaserContent {
  eyebrow: string;
  title: string;
  body: string;
  eventLabel: string;
}

// ─── Sales Page (corso-claude) ──────────────────────────────────────────────

export type SalesVariant = "live" | "replay" | "email";

export interface SalesPricingContent {
  earlyBirdPrice: number;
  standardPrice: number;
  fullPrice: number;
  currency: "EUR";
  earlyBirdDeadlineIso: string;
  standardDeadlineIso: string;
  checkoutUrlEarlyBird: string;
  checkoutUrlStandard: string;
  checkoutUrlFull: string;
  b2bCallUrl: string;
}

export interface SalesHeroVariantCopy {
  badge: string;
  headlinePre: string;
  headlinePost: string;
  headlineAccent: string;
  headlineEnd: string;
  subheadline: string;
  ctaLabel: string;
  microcopy: string;
}

export interface SalesHeroContent {
  live: SalesHeroVariantCopy;
  replay: SalesHeroVariantCopy;
  email: SalesHeroVariantCopy;
  proofBar: string[];
  /**
   * VSL (Video Sales Letter) — autoplay muted with facade pattern.
   * Set vslYoutubeId to a real YouTube video ID to enable. When the value is
   * missing or equals "PLACEHOLDER_VIDEO_ID", the player area falls back to
   * showing the static thumbnail with play overlay (no iframe loaded).
   */
  vslYoutubeId?: string;
  vslThumbnailSrc?: string;
  vslTitle?: string;
}

export interface SalesUrgencyVariantCopy {
  headlinePre: string;
  headlineAccent: string;
  headlineEnd: string;
  timerLabel: string;
  ctaLabel: string;
}

export interface SalesUrgencyContent {
  live: SalesUrgencyVariantCopy;
  replay: SalesUrgencyVariantCopy;
  email: SalesUrgencyVariantCopy;
}

export interface SalesFinalCTAVariantCopy {
  headlinePre: string;
  headlineAccent: string;
  headlineEnd: string;
  ctaLabel: string;
  closingPre: string;
  closingAccent: string;
  closingEnd: string;
}

export interface SalesFinalCTAContent {
  live: SalesFinalCTAVariantCopy;
  replay: SalesFinalCTAVariantCopy;
  email: SalesFinalCTAVariantCopy;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesHeaderContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesBridgeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesProblemContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesMechanismContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesBenefitsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesPromiseLetterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesModulesContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesProofContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesReviewsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesAudienceContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesComparisonContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesBonusContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesOfferContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesGuaranteeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesFAQContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesB2BContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesFooterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesStickyBarContent {}

export interface FreebieThankYouContent {
  greetingPrefix: string;
  greetingFallback: string;
  body: string;
  webinarCardTitle: string;
  webinarCardBody: string;
  eventDateLabel: string;
  calendarGoogleHref: string;
  calendarGoogleLabel: string;
  calendarIcsFileName: string;
  calendarIcsContent: string;
  calendarIcsLabel: string;
  videoTitle: string;
  videoEmbedUrl: string;
  downloadTitle: string;
  downloadBody: string;
  downloadHref: string;
  downloadLabel: string;
  stepsTitle: string;
  steps: string[];
  bottomCtasEyebrow: string;
  bottomCtasTitle: string;
  bottomCtas: Array<{
    icon: string;
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  }>;
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
    WebinarFAQ?: WebinarFAQContent;
    WebinarFinalCTA?: WebinarFinalCTAContent;
    WebinarFooter?: WebinarFooterContent;
    WebinarThankYou?: WebinarThankYouContent;
    FreebieHero?: FreebieHeroContent;
    FreebieWebinarTeaser?: FreebieWebinarTeaserContent;
    FreebieThankYou?: FreebieThankYouContent;
    SalesHeader?: SalesHeaderContent;
    SalesHero?: SalesHeroContent;
    SalesBridge?: SalesBridgeContent;
    SalesProblem?: SalesProblemContent;
    SalesMechanism?: SalesMechanismContent;
    SalesBenefits?: SalesBenefitsContent;
    SalesPromiseLetter?: SalesPromiseLetterContent;
    SalesModules?: SalesModulesContent;
    SalesProof?: SalesProofContent;
    SalesReviews?: SalesReviewsContent;
    SalesAudience?: SalesAudienceContent;
    SalesComparison?: SalesComparisonContent;
    SalesBonus?: SalesBonusContent;
    SalesOffer?: SalesOfferContent;
    SalesGuarantee?: SalesGuaranteeContent;
    SalesFAQ?: SalesFAQContent;
    SalesUrgency?: SalesUrgencyContent;
    SalesFinalCTA?: SalesFinalCTAContent;
    SalesB2B?: SalesB2BContent;
    SalesFooter?: SalesFooterContent;
    SalesStickyBar?: SalesStickyBarContent;
    SalesPricing?: SalesPricingContent;
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
  indexable?: boolean;
  abTest: {
    enabled: boolean;
    variants: FunnelVariant[];
  };
}
