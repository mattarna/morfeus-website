"use client";

import { useState } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { NAV_POINTS, type NavPoint } from "@/app/lib/scrollConfig";
import { useTranslations } from "next-intl";

const DESKTOP_BREAKPOINT = 1280;

/**
 * TimelineNav - Adaptive section navigation
 */
export function TimelineNav() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const setIndex = useScrollStore((state) => state.setIndex);
  const t = useTranslations("Nav");
  const [isMobileSwitcherOpen, setIsMobileSwitcherOpen] = useState(false);

  const isActive = (point: NavPoint) => {
    return currentIndex >= point.range[0] && currentIndex <= point.range[1];
  };

  const activePoint = NAV_POINTS.find((point) => isActive(point)) ?? NAV_POINTS[0];
  const activeIndex = NAV_POINTS.findIndex((point) => point.label === activePoint.label);
  const progress = ((activeIndex + 1) / NAV_POINTS.length) * 100;

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
    setIsMobileSwitcherOpen(false);
  };

  // Hide nav only on the Footer section
  const shouldHide = currentIndex === 14;

  return (
    <>
      <nav
        aria-label="Section navigation"
        className={`fixed inset-y-0 left-6 2xl:left-12 z-[100] hidden 2xl:flex items-center pointer-events-none transition-all duration-700 ${
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
                    className={`absolute inset-0 bg-white/40 rounded-full blur-sm transition-transform duration-500 ${
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
        className={`fixed right-3 lg:right-5 top-1/2 z-[100] hidden md:flex 2xl:hidden -translate-y-1/2 pointer-events-none transition-all duration-700 ${
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
                className="group relative flex h-7 w-7 items-center justify-center rounded-full outline-none"
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

      <div
        className={`fixed bottom-4 left-4 right-4 z-[100] md:hidden transition-all duration-500 ${
          shouldHide ? "opacity-0 translate-y-6 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <button
          type="button"
          onClick={() => setIsMobileSwitcherOpen(true)}
          className="relative w-full overflow-hidden rounded-full border border-white/10 bg-black/55 px-5 py-3 text-left shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          aria-label="Open section navigation"
        >
          <span className="flex items-center justify-between gap-4">
            <span className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
                {String(activeIndex + 1).padStart(2, "0")} / {String(NAV_POINTS.length).padStart(2, "0")}
              </span>
              <span className="block truncate text-sm font-semibold text-white">
                {t(activePoint.label)}
              </span>
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Menu
            </span>
          </span>
          <span className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[120] md:hidden transition-all duration-300 ${
          isMobileSwitcherOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMobileSwitcherOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMobileSwitcherOpen(false)}
          aria-label="Close section navigation"
        />
        <div
          className={`absolute bottom-0 left-0 right-0 max-h-[78svh] overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#07070a] p-5 pb-7 shadow-[0_-30px_80px_rgba(0,0,0,0.6)] transition-transform duration-500 ${
            isMobileSwitcherOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Sections
              </p>
              <p className="mt-1 text-lg font-semibold text-white">{t(activePoint.label)}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileSwitcherOpen(false)}
              className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300"
            >
              Close
            </button>
          </div>

          <div className="grid gap-2">
            {NAV_POINTS.map((point, index) => {
              const active = isActive(point);

              return (
                <button
                  key={point.label}
                  type="button"
                  onClick={() => handleNavClick(point)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                    active
                      ? "border-white/25 bg-white/[0.08] text-white"
                      : "border-white/8 bg-white/[0.02] text-slate-400"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`font-mono text-[10px] ${active ? "text-white" : "text-slate-600"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-sm font-medium">{t(point.label)}</span>
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      active ? "bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]" : "bg-slate-700"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
