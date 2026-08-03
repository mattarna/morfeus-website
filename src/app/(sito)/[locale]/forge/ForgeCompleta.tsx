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
import { SmoothScrollProvider, useSmoothScroll } from "@/components/shared/SmoothScroll";

/* ============================================================
   MORF FORGE · sales page completa (14 sezioni)
   ------------------------------------------------------------
   La rotta /forge era stata semplificata alla versione "expertise"
   a 8 sezioni (forge-ms). Qui torna la pagina COMPLETA: hero, prove,
   problema, belief-shift, comparazione, come-funziona, asset, filtro,
   ROIometro, prezzi, way-out, contatto, FAQ, footer.

   Riusa i componenti in `components/sections/` (gia' su main) col loro
   namespace i18n di default ("Offerta"). E' un componente client
   perche' porta stato e osservatori di scroll; sta dentro il proprio
   SmoothScrollProvider, che il layout del gruppo (sito) non fornisce.
   ============================================================ */

function ForgeBody() {
  const { scrollTo } = useSmoothScroll();
  const [contentVisible, setContentVisible] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const scrollToContact = () => scrollTo("#contact");

  useEffect(() => {
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
      setShowStickyCta(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#030508] text-white">
      <ServiceHeader
        showStickyCta={showStickyCta}
        isHeaderHidden={isHeaderHidden}
        scrollToContact={scrollToContact}
      />
      <ServiceTimelineNav />

      {/* 01 - HERO */}
      <LandingHero contentVisible={contentVisible} scrollToContact={scrollToContact} />

      {/* 02 - PROOF */}
      <ProofSection />

      {/* 03 - PROBLEM */}
      <ProblemAnalysis />

      {/* 04 - BELIEF SHIFT */}
      <BeliefShift />

      {/* 05 - COMPARISON */}
      <ComparisonSection />

      {/* 06 - HOW IT WORKS */}
      <HowItWorksSection scrollToContact={scrollToContact} />

      {/* 07 - ASSETS */}
      <AssetsSection />

      {/* 08 - FILTER */}
      <FilterSection scrollToContact={scrollToContact} />

      {/* 09 - ROIOMETER */}
      <ROISection />

      {/* 10 - PRICING */}
      <PricingSection scrollToContact={scrollToContact} />

      {/* 11 - WAY-OUT */}
      <WayoutSection />

      {/* 12 - CONTACT */}
      <ContactSection scrollToContact={scrollToContact} />

      {/* 13 - FAQ */}
      <ServiceFAQ activeFaq={activeFaq} setActiveFaq={setActiveFaq} />

      {/* 14 - FOOTER */}
      <ServiceFooter />
    </div>
  );
}

export function ForgeCompleta() {
  return (
    <SmoothScrollProvider>
      <ForgeBody />
    </SmoothScrollProvider>
  );
}
