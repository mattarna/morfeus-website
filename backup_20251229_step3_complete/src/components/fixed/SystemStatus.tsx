"use client";

import { useScrollStore } from "@/app/store/useScrollStore";

/**
 * SystemStatus - Bottom-right status indicator
 * 
 * Fixed position, visible only on desktop (xl+)
 * Shows "System Operational" with pulsing green dot
 * Hides on Footer section (index 12) to avoid duplicate
 */
export function SystemStatus() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  
  // Hide on Footer section to avoid duplicate
  const shouldHide = currentIndex === 12;

  return (
    <div 
      className={`fixed z-40 pointer-events-none hidden xl:block right-8 bottom-8 transition-opacity duration-500 ${
        shouldHide ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-2 py-2 px-4 rounded-full bg-black/20 border border-white/5 backdrop-blur-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] uppercase font-medium text-slate-500 tracking-widest">
          System Operational
        </span>
      </div>
    </div>
  );
}
