"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

interface FAQSectionProps {
  activeFaq: number | null;
  setActiveFaq: (index: number | null) => void;
}

export function FAQSection({ activeFaq, setActiveFaq }: FAQSectionProps) {
  const t = useTranslations("Offerta");

  return (
    <section id="faq" className="relative z-[120] py-24 md:py-40 px-6 bg-[#05070a] border-t border-white/[0.03] overflow-visible">
      {/* Module ID Tag */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#030303] border border-white/10 rounded-full z-[130]">
        <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase whitespace-nowrap">{t("faq_operating_system.tag")}</span>
      </div>

      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-6">
            {t("faq_operating_system.sectionTitle")}
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
        </div>

        {/* FAQ Accordion List - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {[...Array(9)].map((_, i) => {
              const index = i + 1;
              const isOpen = activeFaq === index;
              
              return (
                <div 
                  key={index} 
                  className={`relative group border border-white/[0.05] rounded-2xl transition-all duration-500 overflow-hidden ${
                    isOpen ? 'bg-white/[0.03] border-white/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 md:py-6 text-left outline-none"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                        isOpen ? 'text-indigo-500' : 'text-slate-600'
                      }`}>
                        Q_{String(index).padStart(2, '0')}
                      </span>
                      <h3 className={`text-base md:text-lg font-bold transition-all duration-300 ${
                        isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {t(`faq_operating_system.items.${index}.q`)}
                      </h3>
                    </div>
                    
                    <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-600'}`}>
                      <Icon icon="solar:alt-arrow-down-linear" className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 md:pb-8 ml-0 md:ml-14">
                      <div className="h-px w-8 bg-cyan-500/30 mb-4" />
                      <p 
                        className="text-sm md:text-base text-slate-400 font-light leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: t(`faq_operating_system.items.${index}.a`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200 font-medium">$1</strong>') 
                        }} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {[...Array(9)].map((_, i) => {
              const index = i + 10;
              const isOpen = activeFaq === index;
              
              return (
                <div 
                  key={index} 
                  className={`relative group border border-white/[0.05] rounded-2xl transition-all duration-500 overflow-hidden ${
                    isOpen ? 'bg-white/[0.03] border-white/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 md:py-6 text-left outline-none"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                        isOpen ? 'text-indigo-500' : 'text-slate-600'
                      }`}>
                        Q_{String(index).padStart(2, '0')}
                      </span>
                      <h3 className={`text-base md:text-lg font-bold transition-all duration-300 ${
                        isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {t(`faq_operating_system.items.${index}.q`)}
                      </h3>
                    </div>
                    
                    <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-600'}`}>
                      <Icon icon="solar:alt-arrow-down-linear" className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 md:pb-8 ml-0 md:ml-14">
                      <div className="h-px w-8 bg-cyan-500/30 mb-4" />
                      <p 
                        className="text-sm md:text-base text-slate-400 font-light leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: t(`faq_operating_system.items.${index}.a`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200 font-medium">$1</strong>') 
                        }} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Schematic Line */}
        <div className="mt-32 pt-12 border-t border-white/5 flex justify-between items-center opacity-30">
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em]">System_End_Transmission</span>
          <div className="flex gap-4">
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <div className="w-1 h-1 rounded-full bg-slate-700" />
          </div>
        </div>

      </div>
    </section>
  );
}

