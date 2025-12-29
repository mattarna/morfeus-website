"use client";

import { Icon } from "@iconify/react";
import { useScrollStore } from "@/app/store/useScrollStore";

/**
 * Hero Section - Index 0
 * 
 * Full viewport height, centered content
 * Features: Badge, Headlines, Subheadline, CTAs
 */
export function Hero() {
  const setIndex = useScrollStore((state) => state.setIndex);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Local Aura Glow */}
      <div className="absolute top-0 w-full flex justify-center pointer-events-none z-0">
        <div className="w-[300px] md:w-[600px] xl:w-[800px] h-[300px] md:h-[400px] bg-[#4e39ec]/15 rounded-full blur-[80px] md:blur-[100px] xl:blur-[120px] -translate-y-1/2 mix-blend-screen opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Badge */}
        <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]">
          <span className="text-[9px] md:text-[10px] uppercase font-semibold text-indigo-300 tracking-[0.1em]">
            New Intelligence Architecture
          </span>
        </div>

        {/* Headlines */}
        <div className="flex flex-col items-center text-center space-y-[-0.2em] max-w-6xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl bg-clip-text leading-[0.9] font-semibold text-transparent tracking-tighter bg-gradient-to-b from-white via-white to-white/40 pb-2">
            DESIGNING
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-semibold text-white tracking-tighter pb-2 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            INTELLIGENT
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl bg-clip-text leading-[0.9] font-semibold text-transparent tracking-tighter bg-gradient-to-t from-white via-white to-white/40">
            ORGANIZATIONS
          </h1>
        </div>

        {/* Subheadline */}
        <p className="md:text-xl leading-relaxed md:max-w-[600px] mt-8 text-base font-light text-slate-400/80 tracking-wide text-center max-w-[340px]">
          Transforming business structures through adaptive intelligence and human-centric design systems
        </p>

        {/* CTAs */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-6 z-10">
          <button 
            onClick={() => setIndex(11)}
            className="group h-12 px-8 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] w-full sm:w-auto"
          >
            Start Building
            <Icon icon="lucide:arrow-right" width={18} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button 
            onClick={() => setIndex(1)}
            className="text-[15px] font-medium text-slate-400 hover:text-white transition-colors tracking-wide"
          >
            Read Manifesto
          </button>
        </div>
      </div>
    </section>
  );
}
