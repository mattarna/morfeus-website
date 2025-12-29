"use client";

import { useScrollStore } from "@/app/store/useScrollStore";

/**
 * GridLines - Decorative vertical lines
 * 
 * Positioned inside ScrollWrapper (absolute)
 * Height: 1300vh to cover all sections
 * Matches legacy structure exactly
 */
export function GridLines() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  
  // Hide lines from index 4 (Process/Method) to 9 (Case Study)
  // They will be visible again in FAQ (10), CTA (11) and Footer (12)
  const isHiddenRange = currentIndex >= 4 && currentIndex <= 9;

  return (
    <div
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-[1300vh] z-[2] pointer-events-none px-6 md:px-10 flex justify-between transition-opacity duration-1000 ${
        isHiddenRange ? "opacity-0" : "opacity-100"
      }`}
      style={{
        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
      }}
    >
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-[1px] md:w-[1.5px] h-full bg-white/[0.04] md:bg-white/[0.08]" />
      ))}
    </div>
  );
}
