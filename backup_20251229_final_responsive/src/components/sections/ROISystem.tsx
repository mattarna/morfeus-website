"use client";

import { useState, useCallback, useEffect } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useTranslations } from "next-intl";

const DESKTOP_BREAKPOINT = 1024;

/**
 * ROI System Section - Index 8
 * 
 * Interactive ROI architecture visualization with 5 stages:
 * MAPPING → ARCHITECTURE → EXECUTION → OPTIMIZATION → SCALE
 * 
 * Desktop: Interactive horizontal timeline
 * Mobile: Vertical accordion/stack
 */

interface ROIStep {
  key: string;
  label: string;
  concept: string;
  principle: string;
  explanation: string;
}

export function ROISystem() {
  const t = useTranslations("ROI");
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // On mobile: always visible. On desktop: only when at index 8
  const isActive = !isDesktop || currentIndex === 8;
  
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Build steps from translations
  const roiSteps: ROIStep[] = [
    {
      key: "mapping",
      label: t("steps.mapping.label"),
      concept: t("steps.mapping.concept"),
      principle: t("steps.mapping.principle"),
      explanation: t("steps.mapping.explanation"),
    },
    {
      key: "architecture",
      label: t("steps.architecture.label"),
      concept: t("steps.architecture.concept"),
      principle: t("steps.architecture.principle"),
      explanation: t("steps.architecture.explanation"),
    },
    {
      key: "execution",
      label: t("steps.execution.label"),
      concept: t("steps.execution.concept"),
      principle: t("steps.execution.principle"),
      explanation: t("steps.execution.explanation"),
    },
    {
      key: "optimization",
      label: t("steps.optimization.label"),
      concept: t("steps.optimization.concept"),
      principle: t("steps.optimization.principle"),
      explanation: t("steps.optimization.explanation"),
    },
    {
      key: "scale",
      label: t("steps.scale.label"),
      concept: t("steps.scale.concept"),
      principle: t("steps.scale.principle"),
      explanation: t("steps.scale.explanation"),
    },
  ];

  const handleStepChange = useCallback((index: number) => {
    if (index === activeStep || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Brief exit animation
    setTimeout(() => {
      setActiveStep(index);
      // Allow enter animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  }, [activeStep, isTransitioning]);

  const currentStep = roiSteps[activeStep];

  // Calculate progress percentage for the line
  const progressPercent = (activeStep / (roiSteps.length - 1)) * 100;

  // Mobile Layout: Vertical Stack with Accordion
  if (!isDesktop) {
    return (
      <section className="relative w-full bg-black py-20 px-6">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto text-center mb-10">
          <h2 className="uppercase text-[10px] text-slate-500 tracking-[0.3em] font-medium mb-4">
            {t("label")}
          </h2>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 leading-[1.1]">
            {t("headline_1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/30">
              {t("headline_2")}
            </span>
          </h1>
        </div>

        {/* Vertical Steps */}
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4">
          {roiSteps.map((step, index) => {
            const isExpanded = index === activeStep;
            
            return (
              <button
                key={step.key}
                onClick={() => handleStepChange(index)}
                className={`text-left w-full rounded-xl border transition-all duration-300 outline-none ${
                  isExpanded 
                    ? "bg-white/[0.04] border-white/20" 
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]"
                }`}
              >
                {/* Step Header */}
                <div className="flex items-center justify-between p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    {/* Step Number */}
                    <span className={`text-xs font-mono transition-colors ${
                      isExpanded ? "text-[#4D39EB]" : "text-slate-500"
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* Label */}
                    <span className={`text-sm sm:text-base font-medium tracking-wide transition-colors ${
                      isExpanded ? "text-white" : "text-slate-300"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {/* Expand Icon */}
                  <div className={`w-5 h-5 rounded-full border transition-all ${
                    isExpanded 
                      ? "border-[#4D39EB] bg-[#4D39EB]" 
                      : "border-white/30"
                  }`}>
                    {isExpanded && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                <div 
                  className={`grid transition-all duration-300 ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <p className="text-lg sm:text-xl font-normal text-white mb-2">
                        {step.principle}
                      </p>
                      <p className="text-sm text-slate-400 font-light">
                        {step.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Outcome Footer */}
        <div className="max-w-[1400px] mx-auto text-center mt-10 pt-6 border-t border-white/5">
          <p className="text-[9px] text-slate-500 font-medium tracking-[0.15em] uppercase">
            {t("outcome")}
          </p>
        </div>
      </section>
    );
  }

  // Desktop Layout: Interactive Horizontal Timeline
  return (
    <section className="relative h-screen w-full flex flex-col bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Center vertical line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        {/* Top horizontal line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4D39EB]/5 rounded-full blur-[120px]" />
      </div>

      {/* 1. HEADER */}
      <div 
        className={`flex flex-col z-10 pt-20 md:pt-24 text-center w-full max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <h2 className="uppercase text-[10px] md:text-xs text-slate-500 tracking-[0.3em] font-medium mb-6">
          {t("label")}
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 leading-[1.1]">
          {t("headline_1")}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/30">
            {t("headline_2")}
          </span>
        </h1>
      </div>

      {/* 2. DYNAMIC CONTENT */}
      <div 
        className={`relative z-10 flex-grow flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 transition-all duration-1000 delay-200 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center flex flex-col items-center w-full relative">
          {/* Large Concept Word (Background) - slightly more visible */}
          <h3 
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] font-semibold text-white/[0.06] tracking-tighter select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-500 ease-out ${
              isTransitioning ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
            }`}
          >
            {currentStep.concept}
          </h3>

          {/* Text Content */}
          <div className="relative z-20 flex flex-col items-center gap-4 md:gap-6 py-16 md:py-20">
            {/* Principle */}
            <p 
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-snug max-w-3xl transition-all duration-500 ease-out ${
                isTransitioning ? "opacity-0 translate-y-4 blur-sm" : "opacity-100 translate-y-0 blur-0"
              }`}
            >
              {currentStep.principle}
            </p>

            {/* Explanation */}
            <p 
              className={`text-sm md:text-base lg:text-lg text-slate-400 font-light tracking-wide max-w-xl transition-all duration-500 ease-out delay-75 ${
                isTransitioning ? "opacity-0 translate-y-4 blur-sm" : "opacity-100 translate-y-0 blur-0"
              }`}
            >
              {currentStep.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE INDICATORS */}
      <div 
        className={`relative z-10 w-full max-w-3xl mx-auto px-6 mb-8 md:mb-12 transition-all duration-1000 delay-300 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Labels Row */}
        <div className="flex items-center justify-between mb-3">
          {roiSteps.map((step, index) => {
            const isStepActive = index === activeStep;
            return (
              <div key={`label-${step.key}`} className="flex-1 flex justify-center">
                <span 
                  className={`text-[9px] md:text-[10px] font-medium tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${
                    isStepActive 
                      ? "text-white opacity-100" 
                      : "text-slate-500 opacity-0"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dots Row with Line */}
        <div className="relative flex items-center justify-between">
          {/* Base Line (Track) - perfectly centered */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/10 -translate-y-1/2" />
          
          {/* Progress Line */}
          <div 
            className="absolute top-1/2 left-[10%] h-[1px] bg-[#4D39EB] -translate-y-1/2 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent * 0.8}%` }}
          />

          {/* Indicator Dots */}
          {roiSteps.map((step, index) => {
            const isStepActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <button
                key={step.key}
                onClick={() => handleStepChange(index)}
                className="group flex-1 flex justify-center outline-none select-none focus:outline-none focus:ring-0 active:outline-none relative z-10 py-2"
              >
                {/* Dot */}
                <div 
                  className={`relative w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isStepActive
                      ? "bg-black border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      : isPast
                        ? "bg-[#4D39EB] border border-[#4D39EB] group-hover:border-white"
                        : "bg-black border border-white/30 group-hover:border-white"
                  }`}
                >
                  {/* Inner fill for active */}
                  <div 
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4D39EB] transition-all duration-300 ${
                      isStepActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. FOOTER */}
      <div 
        className={`relative z-10 w-full text-center border-t border-white/5 py-6 px-6 transition-all duration-1000 delay-400 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-[9px] md:text-[10px] text-slate-500 font-medium tracking-[0.2em] uppercase">
          {t("outcome")}
        </p>
      </div>
    </section>
  );
}
