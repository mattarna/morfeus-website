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
  FreebieHeroSection,
  FreebieThankYouSection,
  FreebieWebinarTeaserSection,
} from "@/funnels/freebie-cowork-setup-skill-2026-04/sections";
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
};
