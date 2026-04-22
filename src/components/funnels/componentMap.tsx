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
};
