"use client";

import { ScrollWrapper } from "@/components/ScrollWrapper";
import { LoadingScreen } from "@/components/LoadingScreen";
import dynamic from "next/dynamic";

// Fixed UI Components (always visible, positioned fixed)
import { HomeBackground } from "@/components/fixed/HomeBackground";
import { HomeHeader } from "@/components/fixed/HomeHeader";
import { TimelineNav } from "@/components/fixed/TimelineNav";
import { SystemStatus } from "@/components/fixed/SystemStatus";
import { GridLines } from "@/components/fixed/GridLines";

// Section Components - Core (Immediately visible)
import { HomeHero } from "@/components/sections/HomeHero";
import { Manifesto } from "@/components/sections/Manifesto";

// Section Components - Lazy Loaded (Below the fold)
const HomeProblem = dynamic(() => import("@/components/sections/HomeProblem").then(m => m.HomeProblem));
const Partners = dynamic(() => import("@/components/sections/Partners").then(m => m.Partners));
const Services = dynamic(() => import("@/components/sections/Services").then(m => m.Services));
const ProcessHeadline = dynamic(() => import("@/components/sections/ProcessHeadline").then(m => m.ProcessHeadline));
const ProcessMaster = dynamic(() => import("@/components/sections/ProcessMaster").then(m => m.ProcessMaster));
const ROISystem = dynamic(() => import("@/components/sections/ROISystem").then(m => m.ROISystem));
const HomeROIMeter = dynamic(() => import("@/components/sections/HomeROIMeter").then(m => m.HomeROIMeter));
const CaseStudy = dynamic(() => import("@/components/sections/CaseStudy").then(m => m.CaseStudy));
const HomeFAQ = dynamic(() => import("@/components/sections/HomeFAQ").then(m => m.HomeFAQ));
const CTA = dynamic(() => import("@/components/sections/CTA").then(m => m.CTA));
const HomeFooter = dynamic(() => import("@/components/sections/HomeFooter").then(m => m.HomeFooter));

// Overlay Components
const ContactForm = dynamic(() => import("@/components/shared/ContactForm").then(m => m.ContactForm));
const CookieConsent = dynamic(() => import("@/components/shared/CookieConsent").then(m => m.CookieConsent));

import { useScrollStore } from "@/app/store/useScrollStore";
import { useLocale } from "next-intl";
import { useEffect, useRef, useCallback, useState } from "react";

const DESKTOP_BREAKPOINT = 1024;

/**
 * Home Page
 * 
 * Architecture:
 * =============
 * 1. Fixed UI Layer (z-index layered, always visible)
 *    - Background: Animated UnicornStudio background (z-0)
 *    - Header: Top navigation with logo and CTA (z-100)
 *    - TimelineNav: Left sidebar navigation (z-100)
 *    - SystemStatus: Bottom-right status indicator (z-40)
 * 
 * 2. Scroll Layer (position: absolute, uses translateY)
 *    - ScrollWrapper: Controls physical scroll position
 *    - GridLines: Decorative vertical lines (inside wrapper)
 *    - Sections: Each 100vh tall, stacked vertically
 * 
 * Scroll System:
 * ==============
 * - 15 logical indices (0-14)
 * - Each scroll action moves to next/prev index
 * - 1000ms transition + cooldown between scrolls
 * - Indices 5-7 are "pinned" (Process section)
 */
export default function Home() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const isContactFormOpen = useScrollStore((state) => state.isContactFormOpen);
  const setIsContactFormOpen = useScrollStore((state) => state.setIsContactFormOpen);
  const setIndex = useScrollStore((state) => state.setIndex);
  const locale = useLocale();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastIndexRef = useRef<number>(-1);
  
  // Loading state - check sessionStorage to avoid showing on every navigation
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Handle initialization and sessionStorage
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('morfeus_loaded');
    if (hasLoadedBefore) {
      setIsLoading(false);
      setContentVisible(true);
    }
  }, []);

  // Handle loading complete
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    try {
      sessionStorage.setItem('morfeus_loaded', 'true');
    } catch (e) {
      // Handle cases where sessionStorage is disabled (e.g. private mode)
      console.warn("sessionStorage not available:", e);
    }
    // Trigger content entrance animation
    setTimeout(() => setContentVisible(true), 100);
  }, []);

  // Debounced setIndex to prevent rapid re-renders
  const updateIndex = useCallback((index: number) => {
    if (lastIndexRef.current !== index) {
      lastIndexRef.current = index;
      setIndex(index);
    }
  }, [setIndex]);

  // Track section views (Desktop & Mobile)
  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      const targetWindow = window as Window & { dataLayer: Record<string, unknown>[] };
      const sectionNames = [
        "Hero", "Manifesto", "Problem", "Services", "Partners", "Process",
        "Process_Step_1", "Process_Step_2", "Process_Step_3",
        "ROISystem", "ROIometer", "CaseStudy", "FAQ", "CTA", "Footer"
      ];

      const name = sectionNames[currentIndex] || `Section-${currentIndex}`;

      // Delay to ensure the user actually stays on the section (avoid tracking during fast scrolls)
      const timer = setTimeout(() => {
        targetWindow.dataLayer.push({
          event: "section_view",
          section_id: currentIndex,
          section_name: name,
        });
      }, 2000); // 2 seconds threshold

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Mobile Scroll Detection: Update currentIndex when sections enter viewport
  useEffect(() => {
    // Check if mobile using same logic as ScrollWrapper
    const checkIsMobile = () => {
      if (window.innerWidth < DESKTOP_BREAKPOINT) return true;
      if (window.matchMedia('(pointer: coarse)').matches && 
          window.matchMedia('(hover: none)').matches) {
        return true;
      }
      return false;
    };

    if (!checkIsMobile()) return;

    // Use a higher threshold to reduce callbacks
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let mostVisibleIndex = -1;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const id = entry.target.id;
            const indexStr = id.replace("section-", "");
            const index = parseInt(indexStr);
            if (!isNaN(index)) {
              mostVisibleIndex = index;
            }
          }
        });
        
        if (mostVisibleIndex !== -1) {
          updateIndex(mostVisibleIndex);
        }
      },
      { 
        threshold: [0.3, 0.5, 0.7],  // Multiple thresholds for smoother detection
        rootMargin: "-10% 0px -10% 0px"  // Shrink the detection area slightly
      }
    );

    const sections = document.querySelectorAll("[id^='section-']");
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, [updateIndex]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Fixed UI Components (always visible, positioned fixed) 
          Moved outside <main> to avoid transform/containing block issues on mobile */}
      <HomeBackground />
      <HomeHeader />
      <TimelineNav />
      <SystemStatus />
      
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
        locale={locale} 
      />
      
      {/* Cookie Consent Banner (GDPR) */}
      <CookieConsent />
      
      <main 
        className={`relative min-h-screen w-full text-white transition-all duration-1000 ease-out ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* ========================================
            LAYER 2: Scrollable Content
            Uses translateY to move through sections
            ======================================== */}
        <ScrollWrapper>
          {/* Decorative grid lines (inside wrapper to scroll with content) */}
          <GridLines />
        
        {/* Index 0: Hero */}
        <div id="section-0"><HomeHero /></div>
        
        {/* Index 1: Vision/Manifesto */}
        <div id="section-1"><Manifesto /></div>
        
        {/* Index 2: Problem */}
        <div id="section-2"><HomeProblem /></div>
        
        {/* Index 3: Services */}
        <div id="section-3"><Services /></div>
        
        {/* Index 4: Partners */}
        <div id="section-4"><Partners /></div>
        
        {/* Index 5: Process Headline */}
        <div id="section-5"><ProcessHeadline /></div>
        
        {/* Index 6-8: Process Steps (pinned section) */}
        <div id="section-6"><ProcessMaster /></div>
        
        {/* Index 9: ROI System */}
        <div id="section-9"><ROISystem /></div>
        
        {/* Index 10: ROIometer */}
        <div id="section-10"><HomeROIMeter /></div>
        
        {/* Index 11: Case Studies */}
        <div id="section-11"><CaseStudy /></div>
        
        {/* Index 12: FAQ */}
        <div id="section-12"><HomeFAQ /></div>
        
        {/* Index 13: Call to Action */}
        <div id="section-13"><CTA /></div>

        {/* Index 14: Footer */}
        <div id="section-14"><HomeFooter /></div>
      </ScrollWrapper>
    </main>
    </>
  );
}
