"use client";

import { useEffect, useState } from "react";
import { 
  BackgroundGrid, 
  Header, 
  HeroSection, 
  ProofSection, 
  FilterSection, 
  ProblemSection, 
  ComparisonSection, 
  HowItWorksSection, 
  DeliverySection, 
  PricingSection, 
  ContactSection, 
  FAQSection, 
  FooterSection 
} from "@/components/sections";

export default function OperatingSystemPage() {
  const [contentVisible, setContentVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setContentVisible(true), 100);

    // Intersection Observer to hide header when on-page CTAs are visible
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        const isAnyCtaVisible = entries.some((entry) => entry.isIntersecting);
        setIsHeaderHidden(isAnyCtaVisible);
      },
      { threshold: 0.1, rootMargin: "-50px 0px -50px 0px" }
    );

    // Observe all elements with 'on-page-cta' class
    const observeCtas = () => {
      const ctas = document.querySelectorAll(".on-page-cta");
      ctas.forEach((cta) => ctaObserver.observe(cta));
    };

    // Initial observation
    observeCtas();

    const handleScroll = () => {
      // Show sticky background almost immediately after scroll starts
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
      <BackgroundGrid />
      
      <Header 
        showStickyCta={showStickyCta} 
        isHeaderHidden={isHeaderHidden} 
        scrollToContact={scrollToContact} 
      />

      <HeroSection 
        contentVisible={contentVisible} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        scrollToContact={scrollToContact} 
      />

      <ProofSection />

      <FilterSection scrollToContact={scrollToContact} />

      <ProblemSection />

      <ComparisonSection />

      <HowItWorksSection scrollToContact={scrollToContact} />

      <DeliverySection />

      <PricingSection scrollToContact={scrollToContact} />

      <ContactSection scrollToContact={scrollToContact} />

      <FAQSection activeFaq={activeFaq} setActiveFaq={setActiveFaq} />

      <FooterSection />
    </div>
  );
}
