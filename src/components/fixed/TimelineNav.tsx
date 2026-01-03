"use client";

import { useScrollStore } from "@/app/store/useScrollStore";
import { NAV_POINTS } from "@/app/lib/scrollConfig";
import { useTranslations } from "next-intl";

/**
 * TimelineNav - Left sidebar navigation
 */
export function TimelineNav() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const setIndex = useScrollStore((state) => state.setIndex);
  const t = useTranslations("Nav");

  const isActive = (navIndex: number) => {
    const point = NAV_POINTS[navIndex];
    return currentIndex >= point.range[0] && currentIndex <= point.range[1];
  };

  // Hide nav only on the Footer section
  const shouldHide = currentIndex === 12;

  return (
    <nav 
      className={`fixed inset-y-0 left-6 md:left-12 z-[100] hidden xl:flex items-center pointer-events-none transition-all duration-700 ${
        shouldHide ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"
      }`}
    >
      <div className="flex flex-col gap-5 pointer-events-auto">
        {NAV_POINTS.map((point, index) => {
          const active = isActive(index);
          
          return (
            <button
              key={point.label}
              onClick={() => setIndex(point.index)}
              className={`group flex items-center gap-4 cursor-pointer py-1 pl-1 pr-4 transition-all duration-500 ease-out select-none hover:blur-0 hover:opacity-100 ${
                active
                  ? "opacity-100 blur-0 scale-100 translate-x-2"
                  : "opacity-30 blur-[1.5px] scale-95"
              }`}
            >
              {/* Dot */}
              <div className="relative w-3 h-3 flex items-center justify-center">
                <div
                  className={`rounded-full group-hover:bg-white transition-all duration-300 z-10 ${
                    active ? "bg-white w-2 h-2" : "bg-slate-500 w-1.5 h-1.5"
                  }`}
                />
                {/* Glow */}
                <div
                  className={`absolute inset-0 bg-white/40 rounded-full blur-sm transition-transform duration-500 ${
                    active ? "scale-150" : "scale-0"
                  }`}
                />
              </div>

              {/* Label */}
              <span className="text-xs font-medium text-slate-300 group-hover:text-white tracking-wide whitespace-nowrap transition-colors">
                {t(point.label)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
