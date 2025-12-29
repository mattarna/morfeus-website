"use client";

import { useScrollStore } from "@/app/store/useScrollStore";
import { getActiveProcessStep } from "@/app/lib/scrollConfig";

/**
 * Process step data with background images from legacy code
 */
const PROCESS_STEPS = [
  {
    title: "Understand",
    description: "You can't control what you don't understand.",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fdbe5f57-22fa-42cb-beb8-4b34767dd5f4_3840w.png",
  },
  {
    title: "Build", 
    description: "Where AI moves through the organization with intent.",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b4466bd6-6f95-4b07-b087-4b4ca1d6cdb0_3840w.png",
  },
  {
    title: "Automate",
    description: "When systems work, effort disappears.",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c4bf0d3-0c1c-4190-8fc2-d097326fd811_3840w.png",
  },
] as const;

/**
 * ProcessMaster Section - Indices 5-7 (pinned)
 * 
 * This section handles the pinned process steps with Z-Space cinematic zoom.
 * Uses background images from legacy code.
 * 
 * Animation: "Z-Space" Cinematic Zoom
 * - Previous step: scales up (1.3), blurs heavily, fades out (flying past camera)
 * - Current step: scales from 0.6 to 1, sharpens (coming from deep space)
 * - Next step: invisible, waiting in deep space
 */
export function ProcessMaster() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const activeStep = getActiveProcessStep(currentIndex);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {PROCESS_STEPS.map((step, index) => {
        const stepNumber = index + 1; // 1, 2, 3
        const state = getStepState(stepNumber, activeStep);
        
        return (
          <ProcessStep
            key={step.title}
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
        className="step-bg absolute inset-0 z-0 w-full h-full"
        style={{
          ...bgStyles,
          transition: `
            opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.8s cubic-bezier(0.16, 1, 0.3, 1),
            filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)
          `,
        }}
      >
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 pointer-events-none z-20" />
        
        {/* Background image */}
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover mix-blend-screen opacity-90"
        />
      </div>

      {/* Text Content */}
      <div
        className="step-content relative z-30 flex flex-col items-center justify-center h-full gap-8 text-center max-w-4xl px-6 mx-auto"
        style={{
          ...contentStyles,
          transition: `
            opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
            transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s
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
