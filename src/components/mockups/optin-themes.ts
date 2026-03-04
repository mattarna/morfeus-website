/**
 * Theme config for opt-in mockup pages.
 * Identical structure, different visual styles: infobiz (warm purple) vs premium (black).
 */

export type OptinThemeVariant = "infobiz" | "premium";

export interface OptinThemeConfig {
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  cardTextColor: string;
  headlineColor: string;
  subheadlineColor: string;
  /** Hero: su card chiara (infobiz) serve testo scuro; su card scura (premium) testo chiaro */
  heroHeadlineColor: string;
  heroSubheadlineColor: string;
  bodyColor: string;
  highlightBg: string;
  highlightText: string;
  ctaBg: string;
  ctaBorder: string;
  ctaText: string;
  ctaHover: string;
  inputBg: string;
  inputBorder: string;
  inputFocusBorder: string;
  labelColor: string;
  logoColor: string;
}

export const optinThemeConfig: Record<OptinThemeVariant, OptinThemeConfig> = {
  infobiz: {
    pageBg: "bg-[#1a1625]",
    cardBg: "bg-white",
    cardBorder: "border-0",
    cardShadow: "shadow-[0_4px_24px_rgba(0,0,0,0.15)]",
    cardTextColor: "text-gray-800",
    headlineColor: "text-white",
    subheadlineColor: "text-[#a1a1aa]",
    heroHeadlineColor: "text-white",
    heroSubheadlineColor: "text-[#a1a1aa]",
    bodyColor: "text-[#71717a]",
    highlightBg: "bg-[rgba(251,191,36,0.25)]",
    highlightText: "text-[#fbbf24]",
    ctaBg: "bg-[#7c3aed]",
    ctaBorder: "border-0",
    ctaText: "text-white",
    ctaHover: "hover:brightness-110",
    inputBg: "bg-gray-100",
    inputBorder: "border border-gray-200",
    inputFocusBorder: "focus:border-[#7c3aed]/60 focus:ring-2 focus:ring-[#7c3aed]/20",
    labelColor: "text-gray-600",
    logoColor: "text-white",
  },
  premium: {
    pageBg: "bg-[#050508]",
    cardBg: "bg-white/[0.02]",
    cardBorder: "border border-white/[0.06]",
    cardShadow: "shadow-none",
    cardTextColor: "text-[#a1a1aa]",
    headlineColor: "text-[#fafafa]",
    subheadlineColor: "text-[#71717a]",
    heroHeadlineColor: "text-[#fafafa]",
    heroSubheadlineColor: "text-[#71717a]",
    bodyColor: "text-[#52525b]",
    highlightBg: "bg-[rgba(251,191,36,0.15)]",
    highlightText: "text-[#fbbf24]",
    ctaBg: "bg-transparent",
    ctaBorder: "border border-white/40",
    ctaText: "text-white",
    ctaHover: "hover:bg-white/[0.06] hover:border-white/60",
    inputBg: "bg-white/[0.04]",
    inputBorder: "border-white/[0.08]",
    inputFocusBorder: "focus:border-[#fbbf24]/50 focus:ring-2 focus:ring-[#fbbf24]/20",
    labelColor: "text-[#52525b]",
    logoColor: "text-[#a1a1aa]",
  },
};
