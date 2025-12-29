"use client";

import { ScrollWrapper } from "@/components/ScrollWrapper";

// Fixed UI Components (always visible, positioned fixed)
import { Background } from "@/components/fixed/Background";
import { Header } from "@/components/fixed/Header";
import { TimelineNav } from "@/components/fixed/TimelineNav";
import { SystemStatus } from "@/components/fixed/SystemStatus";
import { GridLines } from "@/components/fixed/GridLines";

// Section Components (scroll through these)
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Partners } from "@/components/sections/Partners";
import { Services } from "@/components/sections/Services";
import { ProcessHeadline } from "@/components/sections/ProcessHeadline";
import { ProcessMaster } from "@/components/sections/ProcessMaster";
import { ROISystem } from "@/components/sections/ROISystem";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { ContactForm } from "@/components/ContactForm";
import { CookieConsent } from "@/components/CookieConsent";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useLocale } from "next-intl";

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
 * - 13 logical indices (0-12)
 * - Each scroll action moves to next/prev index
 * - 1000ms transition + cooldown between scrolls
 * - Indices 5-7 are "pinned" (Process section)
 */
export default function Home() {
  const isContactFormOpen = useScrollStore((state) => state.isContactFormOpen);
  const setIsContactFormOpen = useScrollStore((state) => state.setIsContactFormOpen);
  const locale = useLocale();

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-x-hidden lg:overflow-hidden">
      {/* ========================================
          LAYER 1: Fixed UI Components
          These stay in place while content scrolls
          ======================================== */}
      <Background />
      <Header />
      <TimelineNav />
      <SystemStatus />
      
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
        locale={locale} 
      />
      
      {/* Cookie Consent Banner (GDPR) */}
      <CookieConsent />
      
      {/* ========================================
          LAYER 2: Scrollable Content
          Uses translateY to move through sections
          ======================================== */}
      <ScrollWrapper>
        {/* Decorative grid lines (inside wrapper to scroll with content) */}
        <GridLines />
        
        {/* Index 0: Hero */}
        <div id="section-0"><Hero /></div>
        
        {/* Index 1: Vision/Manifesto */}
        <div id="section-1"><Manifesto /></div>
        
        {/* Index 2: Partners */}
        <div id="section-2"><Partners /></div>
        
        {/* Index 3: Services */}
        <div id="section-3"><Services /></div>
        
        {/* Index 4: Process Headline */}
        <div id="section-4"><ProcessHeadline /></div>
        
        {/* Index 5-7: Process Steps (pinned section) */}
        <div id="section-5"><ProcessMaster /></div>
        
        {/* Index 8: ROI System */}
        <div id="section-8"><ROISystem /></div>
        
        {/* Index 9: Case Studies */}
        <div id="section-9"><CaseStudy /></div>
        
        {/* Index 10: FAQ */}
        <div id="section-10"><FAQ /></div>
        
        {/* Index 11: Call to Action */}
        <div id="section-11"><CTA /></div>
        
        {/* Index 12: Footer */}
        <div id="section-12"><Footer /></div>
      </ScrollWrapper>
    </main>
  );
}
