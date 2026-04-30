import {
  FunnelAgenda,
  FunnelCTABox,
  FunnelCheckoutButton,
  FunnelHero,
  FunnelOfferStack,
  FunnelThankYouSummary,
  FunnelValueBullets,
  FunnelVideoSales
} from "@/components/funnels/FunnelPrimitives";
import {
  SalesAudienceSection,
  SalesB2BSection,
  SalesBenefitsSection,
  SalesBonusSection,
  SalesBootcampBridgeSection,
  SalesBridgeSection,
  SalesComparisonSection,
  SalesFAQSection,
  SalesFinalCTASection,
  SalesFooterSection,
  SalesGuaranteeSection,
  SalesHeaderSection,
  SalesHeroSection,
  SalesMechanismSection,
  SalesModulesSection,
  SalesOfferSection,
  SalesProblemSection,
  SalesPromiseLetterSection,
  SalesProofSection,
  SalesReviewsSection,
  SalesStickyBarSection,
  SalesThankYouSection,
  SalesThreeLevelsSection,
  SalesUpsellBootcampSection,
  SalesUrgencySection,
  WebinarAudienceSection,
  WebinarBannerSection,
  WebinarChangeSection,
  WebinarFAQSection,
  WebinarLogosSection,
  WebinarFinalCTASection,
  WebinarFooterSection,
  WebinarHeaderSection,
  WebinarHeroSection,
  WebinarHostSection,
  WebinarLearnPointsSection,
  WebinarLetterSection,
  WebinarSocialProofSection,
  WebinarStickyBarSection,
  WebinarThankYouSection
} from "@/funnels/webinar-claude-2026-05/sections";
import {
  WebinarReplayCardsSection,
  WebinarReplayContextSection,
  WebinarReplayFAQSection,
  WebinarReplayFooterSection,
  WebinarReplayHeaderSection,
  WebinarReplayVideoSection,
} from "@/funnels/webinar-claude-2026-05/sections-replay";
import { WebinarTeamHubSection } from "@/funnels/webinar-claude-2026-05/sections-team-hub";
import {
  SalesV2AudienceSection,
  SalesV2B2BSection,
  SalesV2BenefitsSection,
  SalesV2BonusSection,
  SalesV2BootcampBridgeSection,
  SalesV2BridgeSection,
  SalesV2ComparisonSection,
  SalesV2FAQSection,
  SalesV2FinalCTASection,
  SalesV2FooterSection,
  SalesV2GuaranteeSection,
  SalesV2HeaderSection,
  SalesV2HeroSection,
  SalesV2MechanismSection,
  SalesV2ModulesSection,
  SalesV2OfferSection,
  SalesV2ProblemSection,
  SalesV2PromiseLetterSection,
  SalesV2ProofSection,
  SalesV2ReviewsSection,
  SalesV2StickyBarSection,
  SalesV2ThreeLevelsSection,
  SalesV2UpsellBootcampSection,
  SalesV2UrgencySection,
} from "@/funnels/webinar-claude-2026-05/sections-v2";
import {
  FreebieHeroSection,
  FreebieThankYouSection,
  FreebieWebinarTeaserSection,
} from "@/funnels/freebie-cowork-setup-skill-2026-04/sections";
import {
  BootcampHeaderSection,
  BootcampHeroSection,
  BootcampLevelGapSection,
  BootcampWhyAloneSection,
  BootcampMethodSection,
  BootcampTransformationSection,
  BootcampProgramSection,
  BootcampFoundersSection,
  BootcampResultsSection,
  BootcampAudienceSection,
  BootcampB2BSection,
  BootcampOfferSection,
  BootcampGuaranteeSection,
  BootcampFAQSection,
  BootcampFinalCTASection,
  BootcampFooterSection,
  BootcampStickyBarSection,
  BootcampThankYouSection,
} from "@/funnels/webinar-claude-2026-05/sections-bootcamp";
import {
  BootcampV2HeaderSection,
  BootcampV2HeroSection,
  BootcampV2LevelGapSection,
  BootcampV2DisarmoEgoSection,
  BootcampV2WhyAloneSection,
  BootcampV2MethodSection,
  BootcampV2TransformationSection,
  BootcampV2ProgramSection,
  BootcampV2FoundersSection,
  BootcampV2ResultsSection,
  BootcampV2AudienceSection,
  BootcampV2B2BSection,
  BootcampV2PensaSeSection,
  BootcampV2LaSceltaSection,
  BootcampV2OfferSection,
  BootcampV2GuaranteeSection,
  BootcampV2FAQSection,
  BootcampV2FinalCTASection,
  BootcampV2FooterSection,
  BootcampV2StickyBarSection,
} from "@/funnels/webinar-claude-2026-05/sections-bootcamp-v2";
import type { FunnelComponentName, FunnelStepConfig } from "@/funnels/types";

interface RenderProps {
  accentColor: string;
  step: FunnelStepConfig;
}

type ComponentRenderer = (props: RenderProps) => JSX.Element | null;

export const funnelComponentMap: Record<FunnelComponentName, ComponentRenderer> = {
  Hero: ({ accentColor, step }) =>
    step.content.Hero ? <FunnelHero accentColor={accentColor} content={step.content.Hero} /> : null,
  ValueBullets: ({ step }) =>
    step.content.ValueBullets ? <FunnelValueBullets content={step.content.ValueBullets} /> : null,
  Agenda: ({ step }) => (step.content.Agenda ? <FunnelAgenda content={step.content.Agenda} /> : null),
  CTABox: ({ accentColor, step }) =>
    step.content.CTABox ? <FunnelCTABox accentColor={accentColor} content={step.content.CTABox} /> : null,
  ThankYouSummary: ({ step }) =>
    step.content.ThankYouSummary ? <FunnelThankYouSummary content={step.content.ThankYouSummary} /> : null,
  VideoSales: ({ step }) =>
    step.content.VideoSales ? <FunnelVideoSales content={step.content.VideoSales} /> : null,
  OfferStack: ({ step }) =>
    step.content.OfferStack ? <FunnelOfferStack content={step.content.OfferStack} /> : null,
  CheckoutButton: ({ accentColor, step }) =>
    step.content.CheckoutButton ? (
      <FunnelCheckoutButton accentColor={accentColor} content={step.content.CheckoutButton} />
    ) : null,
  WebinarHeader: () => <WebinarHeaderSection />,
  WebinarHero: ({ accentColor, step }) =>
    step.content.WebinarHero ? <WebinarHeroSection accentColor={accentColor} step={step} /> : null,
  WebinarSocialProof: () => <WebinarSocialProofSection />,
  WebinarLetter: () => <WebinarLetterSection />,
  WebinarLearnPoints: () => <WebinarLearnPointsSection />,
  WebinarAudience: () => <WebinarAudienceSection />,
  WebinarHost: () => <WebinarHostSection />,
  WebinarChange: () => <WebinarChangeSection />,
  WebinarFinalCTA: ({ accentColor, step }) =>
    step.content.WebinarFinalCTA ? <WebinarFinalCTASection accentColor={accentColor} step={step} /> : null,
  WebinarFooter: () => <WebinarFooterSection />,
  WebinarThankYou: ({ accentColor, step }) =>
    step.content.WebinarThankYou ? <WebinarThankYouSection accentColor={accentColor} step={step} /> : null,
  WebinarBanner: () => <WebinarBannerSection />,
  WebinarLogos: () => <WebinarLogosSection />,
  WebinarStickyBar: () => <WebinarStickyBarSection />,
  WebinarFAQ: () => <WebinarFAQSection />,
  WebinarReplayHeader: ({ accentColor, step }) =>
    step.content.WebinarReplayHeader ? <WebinarReplayHeaderSection accentColor={accentColor} step={step} /> : null,
  WebinarReplayVideo: ({ accentColor, step }) =>
    step.content.WebinarReplayVideo ? <WebinarReplayVideoSection accentColor={accentColor} step={step} /> : null,
  WebinarReplayContext: () => <WebinarReplayContextSection />,
  WebinarReplayCards: ({ accentColor, step }) =>
    step.content.WebinarReplayCards ? <WebinarReplayCardsSection accentColor={accentColor} step={step} /> : null,
  WebinarReplayFAQ: () => <WebinarReplayFAQSection />,
  WebinarReplayFooter: () => <WebinarReplayFooterSection />,
  WebinarTeamHub: () => <WebinarTeamHubSection />,
  FreebieHero: ({ accentColor, step }) =>
    step.content.FreebieHero ? <FreebieHeroSection accentColor={accentColor} step={step} /> : null,
  FreebieWebinarTeaser: ({ accentColor, step }) =>
    step.content.FreebieWebinarTeaser ? <FreebieWebinarTeaserSection accentColor={accentColor} step={step} /> : null,
  FreebieThankYou: ({ accentColor, step }) =>
    step.content.FreebieThankYou ? <FreebieThankYouSection accentColor={accentColor} step={step} /> : null,
  SalesHeader: () => <SalesHeaderSection />,
  SalesHero: ({ accentColor, step }) =>
    step.content.SalesHero ? <SalesHeroSection accentColor={accentColor} step={step} /> : null,
  SalesBridge: () => <SalesBridgeSection />,
  SalesThreeLevels: ({ accentColor, step }) =>
    step.content.SalesPricing ? <SalesThreeLevelsSection accentColor={accentColor} step={step} /> : null,
  SalesProblem: () => <SalesProblemSection />,
  SalesMechanism: () => <SalesMechanismSection />,
  SalesBenefits: () => <SalesBenefitsSection />,
  SalesPromiseLetter: () => <SalesPromiseLetterSection />,
  SalesModules: ({ accentColor, step }) =>
    step.content.SalesPricing ? <SalesModulesSection accentColor={accentColor} step={step} /> : null,
  SalesProof: ({ accentColor, step }) =>
    step.content.SalesPricing ? <SalesProofSection accentColor={accentColor} step={step} /> : null,
  SalesReviews: () => <SalesReviewsSection />,
  SalesAudience: ({ accentColor, step }) =>
    step.content.SalesPricing ? <SalesAudienceSection accentColor={accentColor} step={step} /> : null,
  SalesComparison: ({ accentColor, step }) =>
    step.content.SalesPricing ? <SalesComparisonSection accentColor={accentColor} step={step} /> : null,
  SalesBonus: () => <SalesBonusSection />,
  SalesOffer: ({ accentColor, step }) =>
    step.content.SalesPricing ? <SalesOfferSection accentColor={accentColor} step={step} /> : null,
  SalesUpsellBootcamp: () => <SalesUpsellBootcampSection />,
  SalesGuarantee: () => <SalesGuaranteeSection />,
  SalesFAQ: () => <SalesFAQSection />,
  SalesBootcampBridge: () => <SalesBootcampBridgeSection />,
  SalesUrgency: ({ accentColor, step }) =>
    step.content.SalesUrgency && step.content.SalesPricing ? <SalesUrgencySection accentColor={accentColor} step={step} /> : null,
  SalesFinalCTA: ({ accentColor, step }) =>
    step.content.SalesFinalCTA && step.content.SalesPricing ? <SalesFinalCTASection accentColor={accentColor} step={step} /> : null,
  SalesB2B: () => <SalesB2BSection />,
  SalesFooter: () => <SalesFooterSection />,
  SalesStickyBar: ({ accentColor, step }) => <SalesStickyBarSection accentColor={accentColor} step={step} />,
  SalesThankYou: ({ accentColor, step }) =>
    step.content.SalesThankYou ? <SalesThankYouSection accentColor={accentColor} step={step} /> : null,
  SalesV2Header: () => <SalesV2HeaderSection />,
  SalesV2Hero: ({ accentColor, step }) =>
    step.content.SalesV2Hero ? <SalesV2HeroSection accentColor={accentColor} step={step} /> : null,
  SalesV2Bridge: () => <SalesV2BridgeSection />,
  SalesV2ThreeLevels: ({ accentColor, step }) =>
    step.content.SalesV2Pricing ? <SalesV2ThreeLevelsSection accentColor={accentColor} step={step} /> : null,
  SalesV2Problem: () => <SalesV2ProblemSection />,
  SalesV2Mechanism: () => <SalesV2MechanismSection />,
  SalesV2Benefits: () => <SalesV2BenefitsSection />,
  SalesV2PromiseLetter: () => <SalesV2PromiseLetterSection />,
  SalesV2Modules: ({ accentColor, step }) =>
    step.content.SalesV2Pricing ? <SalesV2ModulesSection accentColor={accentColor} step={step} /> : null,
  SalesV2Proof: ({ accentColor, step }) =>
    step.content.SalesV2Pricing ? <SalesV2ProofSection accentColor={accentColor} step={step} /> : null,
  SalesV2Reviews: () => <SalesV2ReviewsSection />,
  SalesV2Audience: ({ accentColor, step }) =>
    step.content.SalesV2Pricing ? <SalesV2AudienceSection accentColor={accentColor} step={step} /> : null,
  SalesV2Comparison: ({ accentColor, step }) =>
    step.content.SalesV2Pricing ? <SalesV2ComparisonSection accentColor={accentColor} step={step} /> : null,
  SalesV2Bonus: () => <SalesV2BonusSection />,
  SalesV2Offer: ({ accentColor, step }) =>
    step.content.SalesV2Pricing ? <SalesV2OfferSection accentColor={accentColor} step={step} /> : null,
  SalesV2UpsellBootcamp: () => <SalesV2UpsellBootcampSection />,
  SalesV2Guarantee: () => <SalesV2GuaranteeSection />,
  SalesV2FAQ: () => <SalesV2FAQSection />,
  SalesV2BootcampBridge: () => <SalesV2BootcampBridgeSection />,
  SalesV2Urgency: ({ accentColor, step }) =>
    step.content.SalesV2Urgency && step.content.SalesV2Pricing ? <SalesV2UrgencySection accentColor={accentColor} step={step} /> : null,
  SalesV2FinalCTA: ({ accentColor, step }) =>
    step.content.SalesV2FinalCTA && step.content.SalesV2Pricing ? <SalesV2FinalCTASection accentColor={accentColor} step={step} /> : null,
  SalesV2B2B: () => <SalesV2B2BSection />,
  SalesV2Footer: () => <SalesV2FooterSection />,
  SalesV2StickyBar: ({ accentColor, step }) => <SalesV2StickyBarSection accentColor={accentColor} step={step} />,
  BootcampHeader: () => <BootcampHeaderSection />,
  BootcampHero: ({ accentColor, step }) => <BootcampHeroSection accentColor={accentColor} step={step} />,
  BootcampLevelGap: () => <BootcampLevelGapSection />,
  BootcampWhyAlone: () => <BootcampWhyAloneSection />,
  BootcampMethod: ({ accentColor, step }) => <BootcampMethodSection accentColor={accentColor} step={step} />,
  BootcampTransformation: () => <BootcampTransformationSection />,
  BootcampProgram: () => <BootcampProgramSection />,
  BootcampFounders: () => <BootcampFoundersSection />,
  BootcampResults: () => <BootcampResultsSection />,
  BootcampAudience: () => <BootcampAudienceSection />,
  BootcampB2B: ({ accentColor, step }) => <BootcampB2BSection accentColor={accentColor} step={step} />,
  BootcampOffer: ({ accentColor, step }) => <BootcampOfferSection accentColor={accentColor} step={step} />,
  BootcampGuarantee: () => <BootcampGuaranteeSection />,
  BootcampFAQ: ({ accentColor, step }) => <BootcampFAQSection accentColor={accentColor} step={step} />,
  BootcampFinalCTA: ({ accentColor, step }) => <BootcampFinalCTASection accentColor={accentColor} step={step} />,
  BootcampFooter: () => <BootcampFooterSection />,
  BootcampStickyBar: ({ accentColor, step }) => <BootcampStickyBarSection accentColor={accentColor} step={step} />,
  BootcampThankYou: ({ accentColor, step }) =>
    step.content.BootcampThankYou ? <BootcampThankYouSection accentColor={accentColor} step={step} /> : null,
  BootcampV2Header: () => <BootcampV2HeaderSection />,
  BootcampV2Hero: ({ accentColor, step }) => <BootcampV2HeroSection accentColor={accentColor} step={step} />,
  BootcampV2LevelGap: () => <BootcampV2LevelGapSection />,
  BootcampV2DisarmoEgo: () => <BootcampV2DisarmoEgoSection />,
  BootcampV2WhyAlone: () => <BootcampV2WhyAloneSection />,
  BootcampV2Method: () => <BootcampV2MethodSection />,
  BootcampV2Transformation: () => <BootcampV2TransformationSection />,
  BootcampV2Program: () => <BootcampV2ProgramSection />,
  BootcampV2Founders: () => <BootcampV2FoundersSection />,
  BootcampV2Results: () => <BootcampV2ResultsSection />,
  BootcampV2Audience: ({ accentColor, step }) => <BootcampV2AudienceSection accentColor={accentColor} step={step} />,
  BootcampV2B2B: ({ accentColor, step }) => <BootcampV2B2BSection accentColor={accentColor} step={step} />,
  BootcampV2PensaSe: () => <BootcampV2PensaSeSection />,
  BootcampV2LaScelta: () => <BootcampV2LaSceltaSection />,
  BootcampV2Offer: ({ accentColor, step }) => <BootcampV2OfferSection accentColor={accentColor} step={step} />,
  BootcampV2Guarantee: () => <BootcampV2GuaranteeSection />,
  BootcampV2FAQ: () => <BootcampV2FAQSection />,
  BootcampV2FinalCTA: ({ accentColor, step }) => <BootcampV2FinalCTASection accentColor={accentColor} step={step} />,
  BootcampV2Footer: () => <BootcampV2FooterSection />,
  BootcampV2StickyBar: ({ accentColor, step }) => <BootcampV2StickyBarSection accentColor={accentColor} step={step} />,
};
