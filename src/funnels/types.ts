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
  | "WebinarReplayHeader"
  | "WebinarReplayVideo"
  | "WebinarReplayCountdownBanner"
  | "WebinarReplayContext"
  | "WebinarReplayCards"
  | "WebinarReplayFAQ"
  | "WebinarReplayFooter"
  | "WebinarTeamHub"
  | "FreebieHero"
  | "FreebieWebinarTeaser"
  | "FreebieThankYou"
  | "VocabolarioPage"
  | "SalesHeader"
  | "SalesHero"
  | "SalesBridge"
  | "SalesThreeLevels"
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
  | "SalesUpsellBootcamp"
  | "SalesGuarantee"
  | "SalesFAQ"
  | "SalesBootcampBridge"
  | "SalesUrgency"
  | "SalesFinalCTA"
  | "SalesB2B"
  | "SalesFooter"
  | "SalesStickyBar"
  | "SalesThankYou"
  | "SalesV2Header"
  | "SalesV2Hero"
  | "SalesV2Bridge"
  | "SalesV2ThreeLevels"
  | "SalesV2Problem"
  | "SalesV2Mechanism"
  | "SalesV2EffettiCollaterali"
  | "SalesV2Benefits"
  | "SalesV2PromiseLetter"
  | "SalesV2Modules"
  | "SalesV2Proof"
  | "SalesV2Reviews"
  | "SalesV2Audience"
  | "SalesV2Comparison"
  | "SalesV2Bonus"
  | "SalesV2Offer"
  | "SalesV2UpsellBootcamp"
  | "SalesV2Guarantee"
  | "SalesV2FAQ"
  | "SalesV2BootcampBridge"
  | "SalesV2Urgency"
  | "SalesV2FinalCTA"
  | "SalesV2B2B"
  | "SalesV2Footer"
  | "SalesV2StickyBar"
  | "SalesV3Header"
  | "SalesV3Hero"
  | "SalesV3Bridge"
  | "SalesV3ThreeLevels"
  | "SalesV3Problem"
  | "SalesV3Mechanism"
  | "SalesV3EffettiCollaterali"
  | "SalesV3Benefits"
  | "SalesV3PromiseLetter"
  | "SalesV3Modules"
  | "SalesV3Proof"
  | "SalesV3Reviews"
  | "SalesV3Audience"
  | "SalesV3Comparison"
  | "SalesV3Bonus"
  | "SalesV3Offer"
  | "SalesV3UpsellBootcamp"
  | "SalesV3Guarantee"
  | "SalesV3FAQ"
  | "SalesV3BootcampBridge"
  | "SalesV3Urgency"
  | "SalesV3FinalCTA"
  | "SalesV3B2B"
  | "SalesV3Footer"
  | "SalesV3StickyBar"
  | "BootcampHeader"
  | "BootcampHero"
  | "BootcampLevelGap"
  | "BootcampWhyAlone"
  | "BootcampMethod"
  | "BootcampTransformation"
  | "BootcampProgram"
  | "BootcampFounders"
  | "BootcampResults"
  | "BootcampAudience"
  | "BootcampROI"
  | "BootcampB2B"
  | "BootcampOffer"
  | "BootcampGuarantee"
  | "BootcampFAQ"
  | "BootcampFinalCTA"
  | "BootcampFooter"
  | "BootcampStickyBar"
  | "BootcampThankYou"
  | "BootcampV2Header"
  | "BootcampV2Hero"
  | "BootcampV2LevelGap"
  | "BootcampV2DisarmoEgo"
  | "BootcampV2WhyAlone"
  | "BootcampV2Method"
  | "BootcampV2Transformation"
  | "BootcampV2Program"
  | "BootcampV2Founders"
  | "BootcampV2Results"
  | "BootcampV2Audience"
  | "BootcampV2B2B"
  | "BootcampV2PensaSe"
  | "BootcampV2LaScelta"
  | "BootcampV2Offer"
  | "BootcampV2Guarantee"
  | "BootcampV2FAQ"
  | "BootcampV2FinalCTA"
  | "BootcampV2Footer"
  | "BootcampV2StickyBar"
  | "BootcampV3Header"
  | "BootcampV3Hero"
  | "BootcampV3LevelGap"
  | "BootcampV3WhyAlone"
  | "BootcampV3Method"
  | "BootcampV3Transformation"
  | "BootcampV3Program"
  | "BootcampV3Founders"
  | "BootcampV3Results"
  | "BootcampV3Audience"
  | "BootcampV3ROI"
  | "BootcampV3B2B"
  | "BootcampV3Offer"
  | "BootcampV3Guarantee"
  | "BootcampV3FAQ"
  | "BootcampV3FinalCTA"
  | "BootcampV3Footer"
  | "BootcampV3StickyBar"
  | "BootcampV3ThankYou";

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

// ─── Webinar Replay ─────────────────────────────────────────────────────────

export interface WebinarReplayHeaderContent {
  label?: string;
}

export interface WebinarReplayVideoContent {
  youtubeId: string;
  watchOnYoutubeUrl: string;
}

export interface WebinarReplayCountdownBannerContent {
  countdownIso: string;
  label?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarReplayContextContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarReplayFAQContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarReplayFooterContent {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebinarTeamHubContent {}

export interface WebinarReplayCardsContent {
  countdownIso: string;
  standardDeadlineIso: string;
  corso: {
    earlyBirdPrice: number;
    standardPrice: number;
    fullPrice: number;
    currency: "EUR";
    checkoutUrlEarlyBird: string;
    checkoutUrlStandard: string;
    checkoutUrlFull: string;
    salesPageUrl: string;
  };
  bootcamp: {
    earlyBirdDeadlineIso: string;
    callUrl: string;
    salesPageUrl: string;
  };
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
  optinEndpoint?: string;
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
export interface SalesThreeLevelsContent {}
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
export interface SalesUpsellBootcampContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesBootcampBridgeContent {}
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

export interface SalesThankYouContent {
  /** URL invite alla community Circle (space corso) */
  circleUrl: string;
  /** URL del corso bonus gratuito "AI Fundamentals" su Circle */
  aiFundamentalsUrl: string;
  /** URL della lezione di introduzione del corso Claude Unlocked su Circle */
  introLessonUrl: string;
  /** URL del calendario appuntamenti su Circle (sessioni live) */
  calendarUrl: string;
  /** URL della sales page del Bootcamp AI Champion */
  bootcampSalesUrl: string;
  /** Email di supporto / contatto */
  supportEmail: string;
  /** Le 4 sessioni live del corso (data + giorno) */
  liveSessions: Array<{
    n: string;
    title: string;
    dateLabel: string;
  }>;
}

// ─── Sales Page v2 (corso-claude — copy nuovo, in fase di confronto) ────────

export type SalesV2Variant = "live" | "replay" | "email";

export interface SalesV2PricingContent {
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

export interface SalesV2HeroVariantCopy {
  badge: string;
  headlinePre: string;
  headlinePost: string;
  headlineAccent: string;
  headlineEnd: string;
  subheadline: string;
  ctaLabel: string;
  microcopy: string;
}

export interface SalesV2HeroContent {
  live: SalesV2HeroVariantCopy;
  replay: SalesV2HeroVariantCopy;
  email: SalesV2HeroVariantCopy;
  proofBar: string[];
  vslYoutubeId?: string;
  vslThumbnailSrc?: string;
  vslTitle?: string;
}

export interface SalesV2UrgencyVariantCopy {
  headlinePre: string;
  headlineAccent: string;
  headlineEnd: string;
  timerLabel: string;
  ctaLabel: string;
}

export interface SalesV2UrgencyContent {
  live: SalesV2UrgencyVariantCopy;
  replay: SalesV2UrgencyVariantCopy;
  email: SalesV2UrgencyVariantCopy;
}

export interface SalesV2FinalCTAVariantCopy {
  headlinePre: string;
  headlineAccent: string;
  headlineEnd: string;
  ctaLabel: string;
  closingPre: string;
  closingAccent: string;
  closingEnd: string;
}

export interface SalesV2FinalCTAContent {
  live: SalesV2FinalCTAVariantCopy;
  replay: SalesV2FinalCTAVariantCopy;
  email: SalesV2FinalCTAVariantCopy;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2HeaderContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2BridgeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2ThreeLevelsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2ProblemContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2MechanismContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2EffettiCollateraliContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2BenefitsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2PromiseLetterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2ModulesContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2ProofContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2ReviewsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2AudienceContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2ComparisonContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2BonusContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2OfferContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2UpsellBootcampContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2BootcampBridgeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2GuaranteeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2FAQContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2B2BContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2FooterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV2StickyBarContent {}

// ─── Sales Page v3 (corso-claude — design "cream aggressivo", in confronto) ──

export type SalesV3Variant = "live" | "replay" | "email";

export interface SalesV3PricingContent {
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

export interface SalesV3HeroVariantCopy {
  badge: string;
  headlinePre: string;
  headlinePost: string;
  headlineAccent: string;
  headlineEnd: string;
  subheadline: string;
  ctaLabel: string;
  microcopy: string;
}

export interface SalesV3HeroContent {
  live: SalesV3HeroVariantCopy;
  replay: SalesV3HeroVariantCopy;
  email: SalesV3HeroVariantCopy;
  proofBar: string[];
  vslYoutubeId?: string;
  vslThumbnailSrc?: string;
  vslTitle?: string;
}

export interface SalesV3UrgencyVariantCopy {
  headlinePre: string;
  headlineAccent: string;
  headlineEnd: string;
  timerLabel: string;
  ctaLabel: string;
}

export interface SalesV3UrgencyContent {
  live: SalesV3UrgencyVariantCopy;
  replay: SalesV3UrgencyVariantCopy;
  email: SalesV3UrgencyVariantCopy;
}

export interface SalesV3FinalCTAVariantCopy {
  headlinePre: string;
  headlineAccent: string;
  headlineEnd: string;
  ctaLabel: string;
  closingPre: string;
  closingAccent: string;
  closingEnd: string;
}

export interface SalesV3FinalCTAContent {
  live: SalesV3FinalCTAVariantCopy;
  replay: SalesV3FinalCTAVariantCopy;
  email: SalesV3FinalCTAVariantCopy;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3HeaderContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3BridgeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3ThreeLevelsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3ProblemContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3MechanismContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3EffettiCollateraliContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3BenefitsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3PromiseLetterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3ModulesContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3ProofContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3ReviewsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3AudienceContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3ComparisonContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3BonusContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3OfferContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3UpsellBootcampContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3BootcampBridgeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3GuaranteeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3FAQContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3B2BContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3FooterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SalesV3StickyBarContent {}

// ─── Bootcamp AI Champion (sales page) ──────────────────────────────────────

export interface BootcampPricingContent {
  /** Prezzo attuale in EUR (es. 1297) */
  currentPrice: number;
  /** Prezzo di listino barrato in EUR (es. 1500) */
  listPrice: number;
  /** Valore totale percepito dello stack in EUR (es. 4632) */
  stackValue: number;
  currency: "EUR";
  /** URL Calendly call di selezione con Mattia. Vuoto = CTA renderizzato ma href="#" no-op */
  callUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampHeaderContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampLevelGapContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampWhyAloneContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampMethodContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampTransformationContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampProgramContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampFoundersContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampResultsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampAudienceContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampROIContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampB2BContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampOfferContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampGuaranteeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampFAQContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampHeroContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampFinalCTAContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampFooterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampStickyBarContent {}

export interface BootcampThankYouContent {
  /** URL invite del gruppo WhatsApp bootcamp */
  whatsappGroupUrl: string;
  /** URL della piattaforma Circle (space bootcamp) */
  circleUrl: string;
  /** URL claude.ai per attivare Claude Pro */
  claudeUrl: string;
  /** Email di supporto bootcamp */
  supportEmail: string;
}

// ─── Bootcamp AI Champion v2 (sales page — copy nuovo, in fase di confronto) ──

export interface BootcampV2PricingContent {
  /** Prezzo pieno standard in EUR (es. 1500) */
  currentPrice: number;
  /** Prezzo early bird 48h post-webinar in EUR (es. 1297) */
  earlyBirdPrice: number;
  /** Prezzo di listino barrato in EUR (es. 1500) */
  listPrice: number;
  /** Valore totale percepito dello stack in EUR (es. 8900) */
  stackValue: number;
  currency: "EUR";
  /** URL Calendly call di selezione con Mattia. Vuoto = CTA renderizzato ma href="#" no-op */
  callUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2HeaderContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2HeroContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2LevelGapContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2DisarmoEgoContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2WhyAloneContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2MethodContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2TransformationContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2ProgramContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2FoundersContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2ResultsContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2AudienceContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2B2BContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2PensaSeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2LaSceltaContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2OfferContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2GuaranteeContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2FAQContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2FinalCTAContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2FooterContent {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BootcampV2StickyBarContent {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VocabolarioPageContent {}

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
  videoTitle?: string;
  videoEmbedUrl?: string;
  videoThumbnailSrc?: string;
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
  /** Se true, applica meta robots noindex/nofollow a questa singola step (es. pagine interne / TY page). Indipendente dal flag indexable a livello funnel. */
  noindex?: boolean;
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
    WebinarReplayHeader?: WebinarReplayHeaderContent;
    WebinarReplayVideo?: WebinarReplayVideoContent;
    WebinarReplayCountdownBanner?: WebinarReplayCountdownBannerContent;
    WebinarReplayContext?: WebinarReplayContextContent;
    WebinarReplayCards?: WebinarReplayCardsContent;
    WebinarReplayFAQ?: WebinarReplayFAQContent;
    WebinarReplayFooter?: WebinarReplayFooterContent;
    WebinarTeamHub?: WebinarTeamHubContent;
    FreebieHero?: FreebieHeroContent;
    FreebieWebinarTeaser?: FreebieWebinarTeaserContent;
    FreebieThankYou?: FreebieThankYouContent;
    VocabolarioPage?: VocabolarioPageContent;
    SalesHeader?: SalesHeaderContent;
    SalesHero?: SalesHeroContent;
    SalesBridge?: SalesBridgeContent;
    SalesThreeLevels?: SalesThreeLevelsContent;
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
    SalesUpsellBootcamp?: SalesUpsellBootcampContent;
    SalesGuarantee?: SalesGuaranteeContent;
    SalesFAQ?: SalesFAQContent;
    SalesBootcampBridge?: SalesBootcampBridgeContent;
    SalesUrgency?: SalesUrgencyContent;
    SalesFinalCTA?: SalesFinalCTAContent;
    SalesB2B?: SalesB2BContent;
    SalesFooter?: SalesFooterContent;
    SalesStickyBar?: SalesStickyBarContent;
    SalesPricing?: SalesPricingContent;
    SalesThankYou?: SalesThankYouContent;
    SalesV2Header?: SalesV2HeaderContent;
    SalesV2Hero?: SalesV2HeroContent;
    SalesV2Bridge?: SalesV2BridgeContent;
    SalesV2ThreeLevels?: SalesV2ThreeLevelsContent;
    SalesV2Problem?: SalesV2ProblemContent;
    SalesV2Mechanism?: SalesV2MechanismContent;
    SalesV2EffettiCollaterali?: SalesV2EffettiCollateraliContent;
    SalesV2Benefits?: SalesV2BenefitsContent;
    SalesV2PromiseLetter?: SalesV2PromiseLetterContent;
    SalesV2Modules?: SalesV2ModulesContent;
    SalesV2Proof?: SalesV2ProofContent;
    SalesV2Reviews?: SalesV2ReviewsContent;
    SalesV2Audience?: SalesV2AudienceContent;
    SalesV2Comparison?: SalesV2ComparisonContent;
    SalesV2Bonus?: SalesV2BonusContent;
    SalesV2Offer?: SalesV2OfferContent;
    SalesV2UpsellBootcamp?: SalesV2UpsellBootcampContent;
    SalesV2Guarantee?: SalesV2GuaranteeContent;
    SalesV2FAQ?: SalesV2FAQContent;
    SalesV2BootcampBridge?: SalesV2BootcampBridgeContent;
    SalesV2Urgency?: SalesV2UrgencyContent;
    SalesV2FinalCTA?: SalesV2FinalCTAContent;
    SalesV2B2B?: SalesV2B2BContent;
    SalesV2Footer?: SalesV2FooterContent;
    SalesV2StickyBar?: SalesV2StickyBarContent;
    SalesV2Pricing?: SalesV2PricingContent;
    SalesV3Header?: SalesV3HeaderContent;
    SalesV3Hero?: SalesV3HeroContent;
    SalesV3Bridge?: SalesV3BridgeContent;
    SalesV3ThreeLevels?: SalesV3ThreeLevelsContent;
    SalesV3Problem?: SalesV3ProblemContent;
    SalesV3Mechanism?: SalesV3MechanismContent;
    SalesV3EffettiCollaterali?: SalesV3EffettiCollateraliContent;
    SalesV3Benefits?: SalesV3BenefitsContent;
    SalesV3PromiseLetter?: SalesV3PromiseLetterContent;
    SalesV3Modules?: SalesV3ModulesContent;
    SalesV3Proof?: SalesV3ProofContent;
    SalesV3Reviews?: SalesV3ReviewsContent;
    SalesV3Audience?: SalesV3AudienceContent;
    SalesV3Comparison?: SalesV3ComparisonContent;
    SalesV3Bonus?: SalesV3BonusContent;
    SalesV3Offer?: SalesV3OfferContent;
    SalesV3UpsellBootcamp?: SalesV3UpsellBootcampContent;
    SalesV3Guarantee?: SalesV3GuaranteeContent;
    SalesV3FAQ?: SalesV3FAQContent;
    SalesV3BootcampBridge?: SalesV3BootcampBridgeContent;
    SalesV3Urgency?: SalesV3UrgencyContent;
    SalesV3FinalCTA?: SalesV3FinalCTAContent;
    SalesV3B2B?: SalesV3B2BContent;
    SalesV3Footer?: SalesV3FooterContent;
    SalesV3StickyBar?: SalesV3StickyBarContent;
    SalesV3Pricing?: SalesV3PricingContent;
    BootcampHeader?: BootcampHeaderContent;
    BootcampHero?: BootcampHeroContent;
    BootcampLevelGap?: BootcampLevelGapContent;
    BootcampWhyAlone?: BootcampWhyAloneContent;
    BootcampMethod?: BootcampMethodContent;
    BootcampTransformation?: BootcampTransformationContent;
    BootcampProgram?: BootcampProgramContent;
    BootcampFounders?: BootcampFoundersContent;
    BootcampResults?: BootcampResultsContent;
    BootcampAudience?: BootcampAudienceContent;
    BootcampROI?: BootcampROIContent;
    BootcampB2B?: BootcampB2BContent;
    BootcampOffer?: BootcampOfferContent;
    BootcampGuarantee?: BootcampGuaranteeContent;
    BootcampFAQ?: BootcampFAQContent;
    BootcampFinalCTA?: BootcampFinalCTAContent;
    BootcampFooter?: BootcampFooterContent;
    BootcampStickyBar?: BootcampStickyBarContent;
    BootcampPricing?: BootcampPricingContent;
    BootcampThankYou?: BootcampThankYouContent;
    BootcampV2Header?: BootcampV2HeaderContent;
    BootcampV2Hero?: BootcampV2HeroContent;
    BootcampV2LevelGap?: BootcampV2LevelGapContent;
    BootcampV2DisarmoEgo?: BootcampV2DisarmoEgoContent;
    BootcampV2WhyAlone?: BootcampV2WhyAloneContent;
    BootcampV2Method?: BootcampV2MethodContent;
    BootcampV2Transformation?: BootcampV2TransformationContent;
    BootcampV2Program?: BootcampV2ProgramContent;
    BootcampV2Founders?: BootcampV2FoundersContent;
    BootcampV2Results?: BootcampV2ResultsContent;
    BootcampV2Audience?: BootcampV2AudienceContent;
    BootcampV2B2B?: BootcampV2B2BContent;
    BootcampV2PensaSe?: BootcampV2PensaSeContent;
    BootcampV2LaScelta?: BootcampV2LaSceltaContent;
    BootcampV2Offer?: BootcampV2OfferContent;
    BootcampV2Guarantee?: BootcampV2GuaranteeContent;
    BootcampV2FAQ?: BootcampV2FAQContent;
    BootcampV2FinalCTA?: BootcampV2FinalCTAContent;
    BootcampV2Footer?: BootcampV2FooterContent;
    BootcampV2StickyBar?: BootcampV2StickyBarContent;
    BootcampV2Pricing?: BootcampV2PricingContent;
    BootcampV3Header?: BootcampHeaderContent;
    BootcampV3Hero?: BootcampHeroContent;
    BootcampV3LevelGap?: BootcampLevelGapContent;
    BootcampV3WhyAlone?: BootcampWhyAloneContent;
    BootcampV3Method?: BootcampMethodContent;
    BootcampV3Transformation?: BootcampTransformationContent;
    BootcampV3Program?: BootcampProgramContent;
    BootcampV3Founders?: BootcampFoundersContent;
    BootcampV3Results?: BootcampResultsContent;
    BootcampV3Audience?: BootcampAudienceContent;
    BootcampV3ROI?: BootcampROIContent;
    BootcampV3B2B?: BootcampB2BContent;
    BootcampV3Offer?: BootcampOfferContent;
    BootcampV3Guarantee?: BootcampGuaranteeContent;
    BootcampV3FAQ?: BootcampFAQContent;
    BootcampV3FinalCTA?: BootcampFinalCTAContent;
    BootcampV3Footer?: BootcampFooterContent;
    BootcampV3StickyBar?: BootcampStickyBarContent;
    BootcampV3ThankYou?: BootcampThankYouContent;
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
