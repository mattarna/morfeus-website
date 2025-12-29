"use client";

import { ScrollWrapper } from "@/components/ScrollWrapper";
import dynamic from "next/dynamic";

// Fixed UI Components (always visible, positioned fixed)
import { Background } from "@/components/fixed/Background";
import { Header } from "@/components/fixed/Header";
import { TimelineNav } from "@/components/fixed/TimelineNav";
import { SystemStatus } from "@/components/fixed/SystemStatus";
import { GridLines } from "@/components/fixed/GridLines";

// Section Components - Core (Immediately visible)
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";

// Section Components - Lazy Loaded (Below the fold)
const Partners = dynamic(() => import("@/components/sections/Partners").then(m => m.Partners));
const Services = dynamic(() => import("@/components/sections/Services").then(m => m.Services));
const ProcessHeadline = dynamic(() => import("@/components/sections/ProcessHeadline").then(m => m.ProcessHeadline));
const ProcessMaster = dynamic(() => import("@/components/sections/ProcessMaster").then(m => m.ProcessMaster));
const ROISystem = dynamic(() => import("@/components/sections/ROISystem").then(m => m.ROISystem));
const CaseStudy = dynamic(() => import("@/components/sections/CaseStudy").then(m => m.CaseStudy));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => m.FAQ));
const CTA = dynamic(() => import("@/components/sections/CTA").then(m => m.CTA));
const Footer = dynamic(() => import("@/components/sections/Footer").then(m => m.Footer));

// Overlay Components
const ContactForm = dynamic(() => import("@/components/ContactForm").then(m => m.ContactForm));
const CookieConsent = dynamic(() => import("@/components/CookieConsent").then(m => m.CookieConsent));

import { useScrollStore } from "@/app/store/useScrollStore";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";

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
  const setIndex = useScrollStore((state) => state.setIndex);
  const locale = useLocale();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Mobile Scroll Detection: Update currentIndex when sections enter viewport
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const indexStr = id.replace("section-", "");
            const index = parseInt(indexStr);
            if (!isNaN(index)) {
              setIndex(index);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("[id^='section-']");
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, [setIndex]);

  return (
    <main 
      className="relative min-h-screen w-full bg-black text-white overflow-x-hidden lg:overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
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
