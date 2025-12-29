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
      
      {/* ========================================
          LAYER 2: Scrollable Content
          Uses translateY to move through sections
          ======================================== */}
      <ScrollWrapper>
        {/* Decorative grid lines (inside wrapper to scroll with content) */}
        <GridLines />
        
        {/* Index 0: Hero */}
        <Hero />
        
        {/* Index 1: Vision/Manifesto */}
        <Manifesto />
        
        {/* Index 2: Partners */}
        <Partners />
        
        {/* Index 3: Services */}
        <Services />
        
        {/* Index 4: Process Headline */}
        <ProcessHeadline />
        
        {/* Index 5-7: Process Steps (pinned section) */}
        <ProcessMaster />
        
        {/* Index 8: ROI System */}
        <ROISystem />
        
        {/* Index 9: Case Studies */}
        <CaseStudy />
        
        {/* Index 10: FAQ */}
        <FAQ />
        
        {/* Index 11: Call to Action */}
        <CTA />
        
        {/* Index 12: Footer */}
        <Footer />
      </ScrollWrapper>
    </main>
  );
}
