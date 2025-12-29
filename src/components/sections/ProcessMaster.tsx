"use client";

import { useState, useEffect } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { getActiveProcessStep } from "@/app/lib/scrollConfig";
import { useTranslations } from "next-intl";
import Image from "next/image";

const DESKTOP_BREAKPOINT = 1024;

/**
 * ProcessMaster Section - Indices 5-7 (pinned on desktop)
 * 
 * Desktop: Pinned scroll with Z-space animation
 * Mobile: Vertical timeline with all steps visible
 */
export function ProcessMaster() {
  const t = useTranslations("Process");
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const activeStep = getActiveProcessStep(currentIndex);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const PROCESS_STEPS = [
    {
      key: "understand",
      title: t("understand.title"),
      description: t("understand.description"),
      image: "/images/percorso%20(5).png",
    },
    {
      key: "build",
      title: t("build.title"),
      description: t("build.description"),
      image: "/images/percorso%20(1).png",
    },
    {
      key: "automate",
      title: t("automate.title"),
      description: t("automate.description"),
      image: "/images/percorso%20(6).png",
    },
  ];

  // Mobile Layout: Vertical Timeline
  if (!isDesktop) {
    return (
      <section className="relative w-full bg-black py-20 px-6">
        {/* Section Header */}
        <div className="max-w-[1400px] mx-auto mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-normal tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-[#E0CCFA]/70 leading-[0.9]">
            {t("headline")}
          </h2>
        </div>

        {/* Vertical Steps */}
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.key}
              className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[300px] sm:min-h-[350px] flex items-end"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover opacity-60 mix-blend-screen"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 p-6 sm:p-8 w-full">
                {/* Step Number */}
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#4D39EB] font-semibold mb-2 block">
                  Step {String(index + 1).padStart(2, '0')}
                </span>
                
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-tight mb-3">
                  {step.title}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop Layout: Pinned with Z-Space Animation
  return (
    <section className="relative h-screen w-full bg-transparent overflow-hidden">
      {PROCESS_STEPS.map((step, index) => {
        const stepNumber = index + 1; // 1, 2, 3
        const state = getStepState(stepNumber, activeStep);
        
        return (
          <ProcessStep
            key={step.key}
            title={step.title}
            description={step.description}
            image={step.image}
            state={state}
          />
        );
      })}
    </section>
  );
}

/**
 * Determines the animation state for a step
 */
function getStepState(
  stepNumber: number, 
  activeStep: 0 | 1 | 2 | 3
): "past" | "active" | "future" {
  // Before process section - all steps hidden in deep space
  if (activeStep === 0) {
    return "future";
  }
  
  if (stepNumber < activeStep) return "past";
  if (stepNumber === activeStep) return "active";
  return "future";
}

/**
 * Individual process step with Z-Space animation
 */
function ProcessStep({ 
  title, 
  description, 
  image,
  state 
}: { 
  title: string;
  description: string;
  image: string;
  state: "past" | "active" | "future";
}) {
  const isActive = state === "active";

  // Background image animation styles
  const getBgStyles = () => {
    switch (state) {
      case "past":
        // Flying past the camera - zoomed in, blurred, faded
        return {
          opacity: 0,
          transform: "scale(1.3) perspective(1000px) translateZ(100px)",
          filter: "blur(20px) brightness(0.5)",
        };
      case "active":
        // In focus - normal scale, sharp
        return {
          opacity: 1,
          transform: "scale(1) perspective(1000px) translateZ(0)",
          filter: "blur(0px) brightness(1)",
        };
      case "future":
        // In deep space - zoomed out, blurred, faded
        return {
          opacity: 0,
          transform: "scale(0.6) perspective(1000px) translateZ(-100px)",
          filter: "blur(20px) brightness(0.5)",
        };
    }
  };

  // Text content animation styles
  const getContentStyles = () => {
    switch (state) {
      case "active":
        return {
          opacity: 1,
          transform: "scale(1) translateY(0)",
        };
      default:
        return {
          opacity: 0,
          transform: "scale(0.9) translateY(40px)",
        };
    }
  };

  const bgStyles = getBgStyles();
  const contentStyles = getContentStyles();

  return (
    <div
      className="process-step absolute inset-0"
      style={{
        zIndex: isActive ? 10 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition: "z-index 0s 0s",
      }}
    >
      {/* Background Image with Z-Space Animation */}
      <div
        className="step-bg absolute inset-0 z-0 w-full h-full will-change-transform"
        style={{
          ...bgStyles,
          transition: `
            opacity 1600ms cubic-bezier(0.25, 1, 0.5, 1),
            transform 2000ms cubic-bezier(0.25, 1, 0.5, 1),
            filter 2000ms cubic-bezier(0.25, 1, 0.5, 1)
          `,
        }}
      >
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 pointer-events-none z-20" />
        
        {/* Background image */}
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover mix-blend-screen opacity-90"
          priority={state === "active"}
        />
      </div>

      {/* Text Content */}
      <div
        className="step-content relative z-30 flex flex-col items-center justify-center h-full gap-8 text-center max-w-4xl px-6 mx-auto"
        style={{
          ...contentStyles,
          transition: `
            opacity 1400ms cubic-bezier(0.25, 1, 0.5, 1) 300ms,
            transform 1600ms cubic-bezier(0.25, 1, 0.5, 1) 200ms
          `,
        }}
      >
        <h2 className="text-4xl md:text-6xl font-normal tracking-tighter text-white drop-shadow-2xl leading-none">
          {title}
        </h2>
        <p className="text-lg md:text-xl font-light text-slate-300 max-w-md tracking-wide leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
