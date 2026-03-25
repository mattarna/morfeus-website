"use client";

import { useEffect, useState } from "react";
import {
  ServiceHeader,
  LandingHero,
  ProofSection,
  ProblemAnalysis,
  ComparisonSection,
  HowItWorksSection,
  ContactSection,
  ServiceFAQ,
  ServiceFooter,
  ServiceTimelineNav,
  LabLevelsSection,
  LabOutcomesSection,
  LabInvestmentSection,
  LabProgramSection,
  LabBridgeSection,
} from "@/components/sections";
import { useSmoothScroll } from "@/components/shared/SmoothScroll";

const LAB_SECTION_IDS = [
  "hero",
  "proof",
  "problem-analysis",
  "levels",
  "comparison",
  "how-it-works",
  "outcomes",
  "investment",
  "ai-champ",
  "bridge",
  "contact",
  "faq",
  "footer",
] as const;

const LAB_FOOTER_NAV_IDS = [
  "hero",
  "how-it-works",
  "comparison",
  "ai-champ",
  "contact",
] as const;

export default function LabPage() {
  const { scrollTo } = useSmoothScroll();
  const [contentVisible, setContentVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const scrollToContact = () => scrollTo("#contact");

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setContentVisible(true), 100);

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        const isAnyCtaVisible = entries.some((entry) => entry.isIntersecting);
        setIsHeaderHidden(isAnyCtaVisible);
      },
      { threshold: 0.1, rootMargin: "-50px 0px -50px 0px" }
    );

    const observeCtas = () => {
      const ctas = document.querySelectorAll(".on-page-cta");
      ctas.forEach((cta) => ctaObserver.observe(cta));
    };

    observeCtas();

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) {
    return <div className="h-screen w-full bg-[#030508]" />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030508] text-white overflow-x-hidden">
      <ServiceHeader
        showStickyCta={showStickyCta}
        isHeaderHidden={isHeaderHidden}
        scrollToContact={scrollToContact}
        namespace="Lab"
      />
      <ServiceTimelineNav
        sectionIds={LAB_SECTION_IDS}
        namespace="Lab.nav_timeline"
      />

      {/* 01 - HERO (Blue) */}
      <LandingHero
        contentVisible={contentVisible}
        scrollToContact={scrollToContact}
        namespace="Lab.hero"
        visualCoreType="lab"
        showProof={false}
      />

      {/* 02 - PROOF (Grid) */}
      <ProofSection namespace="Lab" />

      {/* 03 - PROBLEM (Blue) */}
      <ProblemAnalysis namespace="Lab.problem_analysis" />

      {/* 04 - LEVELS (Grid) */}
      <LabLevelsSection />

      {/* 05 - COMPARISON (Blue) */}
      <ComparisonSection namespace="Lab.comparison" variant="split" />

      {/* 06 - HOW IT WORKS (Grid) */}
      <HowItWorksSection
        scrollToContact={scrollToContact}
        namespace="Lab.how_it_works"
        stepIds={["1", "2", "3"]}
        showMarfBox={false}
        showSecondaryCta={true}
        secondaryCtaTargetId="how-it-works"
      />

      {/* 07 - OUTCOMES (Blue) */}
      <LabOutcomesSection />

      {/* 08 - INVESTMENT (Grid) */}
      <LabInvestmentSection
        scrollToContact={scrollToContact}
      />

      {/* 09 - AI CHAMP PROGRAM (Blue) */}
      <LabProgramSection />

      {/* 10 - BRIDGE (Grid) */}
      <LabBridgeSection />

      {/* 11 - CONTACT (Grid) */}
      <ContactSection
        scrollToContact={scrollToContact}
        namespace="Lab.contact"
        bookingUrl="https://cal.com/morfeus/lab-assessment"
      />

      {/* 12 - FAQ (Grid) */}
      <ServiceFAQ
        activeFaq={activeFaq}
        setActiveFaq={setActiveFaq}
        namespace="Lab.faq_lab"
      />

      {/* 13 - FOOTER (Blue) */}
      <ServiceFooter
        namespace="Lab.landing_footer"
        navLinkIds={LAB_FOOTER_NAV_IDS}
      />
    </div>
  );
}
