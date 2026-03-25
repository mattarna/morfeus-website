"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_SECTION_IDS = [
  "hero",
  "proof",
  "problem-analysis",
  "belief-shift",
  "comparison",
  "how-it-works",
  "assets",
  "filter",
  "roi-section",
  "pricing",
  "way-out",
  "contact",
  "faq",
  "footer"
] as const;

interface ServiceTimelineNavProps {
  sectionIds?: readonly string[];
  namespace?: string;
}

export function ServiceTimelineNav({ sectionIds = DEFAULT_SECTION_IDS, namespace = "Offerta.nav_timeline" }: ServiceTimelineNavProps) {
  const t = useTranslations(namespace);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed left-4 md:left-6 xl:left-4 top-1/2 -translate-y-1/2 z-[200] hidden xl:flex flex-col gap-4">
      {sectionIds.map((id) => {
        const isActive = activeSection === id;
        const isHovered = hoveredSection === id;
        const label = t(id);

        return (
          <div
            key={id}
            className="relative flex items-center justify-start group"
            onMouseEnter={() => setHoveredSection(id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-10 ml-2 px-4 py-2 rounded-xl bg-[#0A0C10]/80 backdrop-blur-xl border border-white/10 pointer-events-none shadow-2xl"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">
                    {label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => scrollToSection(id)}
              className="relative w-8 h-8 flex items-center justify-center transition-all duration-300"
            >
              <div
                className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                  isActive
                    ? "border-majorelle scale-100 opacity-100"
                    : "border-white/10 scale-50 opacity-0 group-hover:scale-75 group-hover:opacity-100"
                }`}
              />
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-majorelle shadow-[0_0_12px_#533DFC]"
                    : "bg-white/20 group-hover:bg-white/40"
                }`}
              />
              {isActive && (
                <motion.div
                  layoutId="pulse"
                  className="absolute inset-0 rounded-full bg-majorelle/20"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
