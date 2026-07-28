"use client";

import { useScrollStore } from "@/app/store/useScrollStore";
import { NAV_POINTS, type NavPoint } from "@/app/lib/scrollConfig";
import { useTranslations } from "next-intl";

const DESKTOP_BREAKPOINT = 1280;

/**
 * TimelineNav - Adaptive section navigation
 *
 * Due varianti, entrambe da md in su: la colonna estesa a sinistra (2xl+)
 * e la colonna compatta a pallini a destra (md..2xl).
 * Sotto md non compare nulla: su mobile la navigazione fra sezioni la
 * fornisce gia' il menu a tutto schermo di HomeHeader.
 */
export function TimelineNav() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const setIndex = useScrollStore((state) => state.setIndex);
  const t = useTranslations("Nav");

  const isActive = (point: NavPoint) => {
    return currentIndex >= point.range[0] && currentIndex <= point.range[1];
  };

  const isCinematicViewport = () => {
    if (typeof window === "undefined") return false;
    if (window.innerWidth < DESKTOP_BREAKPOINT) return false;
    if (
      window.matchMedia("(pointer: coarse)").matches &&
      window.matchMedia("(hover: none)").matches
    ) {
      return false;
    }
    return true;
  };

  const handleNavClick = (point: NavPoint) => {
    if (isCinematicViewport()) {
      setIndex(point.index);
    } else {
      const section = document.getElementById(`section-${point.index}`);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Hide nav only on the Footer section
  const shouldHide = currentIndex === 14;

  return (
    <>
      <nav
        aria-label="Section navigation"
        className={`fixed inset-y-0 left-6 2xl:left-12 z-100 hidden 2xl:flex items-center pointer-events-none transition-all duration-700 ${
          shouldHide ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-5 pointer-events-auto">
          {NAV_POINTS.map((point) => {
            const active = isActive(point);

            return (
              <button
                key={point.label}
                onClick={() => handleNavClick(point)}
                className={`group flex items-center gap-4 cursor-pointer py-1 pl-1 pr-4 transition-all duration-500 ease-out select-none hover:blur-0 hover:opacity-100 ${
                  active
                    ? "opacity-100 blur-0 scale-100 translate-x-2"
                    : "opacity-30 blur-[1.5px] scale-95"
                }`}
              >
                <span className="relative w-3 h-3 flex items-center justify-center">
                  <span
                    className={`rounded-full group-hover:bg-white transition-all duration-300 z-10 ${
                      active ? "bg-white w-2 h-2" : "bg-slate-500 w-1.5 h-1.5"
                    }`}
                  />
                  <span
                    className={`absolute inset-0 bg-white/40 rounded-full blur-xs transition-transform duration-500 ${
                      active ? "scale-150" : "scale-0"
                    }`}
                  />
                </span>

                <span className="text-xs font-medium text-slate-300 group-hover:text-white tracking-wide whitespace-nowrap transition-colors">
                  {t(point.label)}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <nav
        aria-label="Compact section navigation"
        className={`fixed right-3 lg:right-5 top-1/2 z-100 hidden md:flex 2xl:hidden -translate-y-1/2 pointer-events-none transition-all duration-700 ${
          shouldHide ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
        }`}
      >
        <div className="pointer-events-auto flex flex-col items-center gap-2 rounded-full border border-white/10 bg-black/25 px-2.5 py-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          {NAV_POINTS.map((point, index) => {
            const active = isActive(point);

            return (
              <button
                key={point.label}
                onClick={() => handleNavClick(point)}
                aria-label={t(point.label)}
                aria-current={active ? "step" : undefined}
                className="group relative flex h-7 w-7 items-center justify-center rounded-full outline-hidden"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    active
                      ? "h-3 w-3 bg-white shadow-[0_0_18px_rgba(255,255,255,0.75)]"
                      : "h-1.5 w-1.5 bg-slate-500/70 group-hover:h-2 group-hover:w-2 group-hover:bg-white"
                  }`}
                />
                <span className="pointer-events-none absolute right-full mr-3 hidden min-w-max items-center rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white shadow-xl backdrop-blur-xl group-hover:flex">
                  <span className="mr-2 font-mono text-[9px] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {t(point.label)}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
