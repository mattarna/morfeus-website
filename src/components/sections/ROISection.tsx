"use client";

import { HomeROIMeter } from "./HomeROIMeter";

export function ROISection() {
  return (
    <section id="roi-section" className="relative z-[100] bg-[#0a111a] border-y border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
      <HomeROIMeter />
    </section>
  );
}
