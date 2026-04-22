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
  WebinarFinalCTASection,
  WebinarHeroSection,
  WebinarHostSection,
  WebinarLearnPointsSection,
  WebinarSocialProofSection,
  WebinarThankYouSection
} from "@/components/funnels/WebinarClaudeSections";
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
  WebinarHero: ({ accentColor, step }) =>
    step.content.WebinarHero ? (
      <WebinarHeroSection accentColor={accentColor} content={step.content.WebinarHero} />
    ) : null,
  WebinarSocialProof: ({ step }) =>
    step.content.WebinarSocialProof ? (
      <WebinarSocialProofSection content={step.content.WebinarSocialProof} />
    ) : null,
  WebinarLearnPoints: ({ step }) =>
    step.content.WebinarLearnPoints ? (
      <WebinarLearnPointsSection content={step.content.WebinarLearnPoints} />
    ) : null,
  WebinarAudience: ({ step }) =>
    step.content.WebinarAudience ? <WebinarAudienceSection content={step.content.WebinarAudience} /> : null,
  WebinarHost: ({ step }) =>
    step.content.WebinarHost ? <WebinarHostSection content={step.content.WebinarHost} /> : null,
  WebinarFinalCTA: ({ accentColor, step }) =>
    step.content.WebinarFinalCTA ? (
      <WebinarFinalCTASection accentColor={accentColor} content={step.content.WebinarFinalCTA} />
    ) : null,
  WebinarThankYou: ({ accentColor, step }) =>
    step.content.WebinarThankYou ? (
      <WebinarThankYouSection accentColor={accentColor} content={step.content.WebinarThankYou} />
    ) : null
};
