"use client";

/**
 * SystemStatus - Bottom-right status indicator
 * 
 * Fixed position, visible only on desktop (xl+)
 * Shows "System Operational" with pulsing green dot
 */
export function SystemStatus() {
  return (
    <div className="fixed z-40 pointer-events-none hidden xl:block right-8 bottom-8">
      <div className="flex items-center gap-2 py-2 px-4 rounded-full bg-black/20 border border-white/5 backdrop-blur-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] uppercase font-medium text-slate-500 tracking-widest">
          System Operational
        </span>
      </div>
    </div>
  );
}
