"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useTranslations } from "next-intl";

const DESKTOP_BREAKPOINT = 1024;

/**
 * FAQ Section - Index 12
 * 
 * Accordion-style FAQ with:
 * - Two-column grid layout on desktop, single column on mobile
 * - Smooth expand/collapse animations using CSS grid
 * - Rotating chevron icon
 * - Only one item open at a time
 */

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export function HomeFAQ() {
  const t = useTranslations("FAQ");
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // On mobile: always visible. On desktop: only when at index 12
  const isActive = !isDesktop || currentIndex === 12;
  
  const faqItems: FAQItem[] = [
    {
      id: "q1",
      question: t("items.q1.question"),
      answer: t("items.q1.answer"),
    },
    {
      id: "q2",
      question: t("items.q2.question"),
      answer: t("items.q2.answer"),
    },
    {
      id: "q3",
      question: t("items.q3.question"),
      answer: t("items.q3.answer"),
    },
    {
      id: "q4",
      question: t("items.q4.question"),
      answer: t("items.q4.answer"),
    },
    {
      id: "q5",
      question: t("items.q5.question"),
      answer: t("items.q5.answer"),
    },
    {
      id: "q6",
      question: t("items.q6.question"),
      answer: t("items.q6.answer"),
    },
  ];

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string, question: string) => {
    const isOpening = openId !== id;
    if (isOpening && typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "faq_open",
        question_text: question,
      });
    }
    setOpenId(isOpening ? id : null);
  };

  return (
    <section className="relative z-0 min-h-screen lg:h-screen w-full bg-black overflow-hidden flex flex-col justify-center px-6 py-20 lg:py-0">
      <div className={`relative z-10 max-w-[1400px] mx-auto w-full transition-all duration-1000 ${
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal tracking-tighter text-center mb-8 sm:mb-12 md:mb-16 leading-[0.95]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-1">
            {t("headline_1")}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-[#E0CCFA]/70 pb-1">
            {t("headline_2")}
          </span>
        </h2>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {faqItems.map((item) => (
            <div 
              key={item.id}
              className={`group border rounded-2xl transition-all duration-500 overflow-hidden ${
                openId === item.id 
                  ? "bg-white/[0.04] border-white/25 shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)]" 
                  : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleItem(item.id, item.question)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none select-none focus:outline-none focus:ring-0 active:outline-none group/btn"
              >
                <span className={`text-lg md:text-xl font-normal transition-all duration-500 tracking-tight ${
                  openId === item.id ? "text-white scale-[1.01]" : "text-white/70 group-hover/btn:text-white"
                }`}>
                  {item.question}
                </span>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${
                  openId === item.id ? "border-white/40 bg-white/10" : "border-white/10 group-hover/btn:border-white/30"
                }`}>
                  <Icon 
                    icon="lucide:chevron-down" 
                    className={`w-4 h-4 text-slate-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      openId === item.id ? "rotate-180 text-white" : "group-hover/btn:text-slate-300"
                    }`}
                  />
                </div>
              </button>

              <div 
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  openId === item.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 md:p-8 pt-0 md:pt-0">
                    <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-[90%]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
