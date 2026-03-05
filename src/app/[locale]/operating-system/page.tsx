"use client";

import { useEffect, useState } from "react";
import {
  ServiceHeader,
  LandingHero,
  ProofSection,
  ProblemAnalysis,
  BeliefShift,
  ComparisonSection,
  HowItWorksSection,
  AssetsSection,
  WayoutSection,
  FilterSection,
  ROISection,
  PricingSection,
  ContactSection,
  ServiceFAQ,
  ServiceFooter,
  ServiceTimelineNav,
} from "@/components/sections";
import { useSmoothScroll } from "@/components/shared/SmoothScroll";

export default function OperatingSystemPage() {
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
      />
      <ServiceTimelineNav />

      {/* 01 - HERO (Blue) */}
      <LandingHero 
        contentVisible={contentVisible} 
        scrollToContact={scrollToContact} 
      />

      {/* 02 - PROOF (Grid) */}
      <ProofSection />

      {/* 03 - PROBLEM (Blue) */}
      <ProblemAnalysis />

      {/* 04 - BELIEF SHIFT (Grid) */}
      <BeliefShift />

      {/* 05 - COMPARISON (Blue) */}
      <ComparisonSection />

      {/* 06 - HOW IT WORKS (Grid) */}
      <HowItWorksSection scrollToContact={scrollToContact} />

      {/* 07 - ASSETS (Blue) */}
      <AssetsSection />

      {/* 08 - FILTER (Grid) */}
      <FilterSection scrollToContact={scrollToContact} />

      {/* 09 - ROIOMETER (Blue) */}
      <ROISection />

      {/* 10 - PRICING (Grid) */}
      <PricingSection scrollToContact={scrollToContact} />

      {/* 11 - WAY-OUT (Blue) */}
      <WayoutSection />

      {/* 12 - CONTACT (Grid) */}
      <ContactSection scrollToContact={scrollToContact} />

      {/* 13 - FAQ (Blue?) */}
      <ServiceFAQ activeFaq={activeFaq} setActiveFaq={setActiveFaq} />

      {/* 14 - FOOTER (Blue) */}
      <ServiceFooter />
    </div>
  );
}
