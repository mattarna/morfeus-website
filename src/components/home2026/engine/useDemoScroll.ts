"use client";

/**
 * Motore di scroll della HOME 2026 (candidata brand 2026).
 * Copia parametrizzata del motore di produzione (useCustomScroll + scrollConfig):
 * stesso snap, stessi timing, stessa mappa a 15 indici con Process pinnato.
 * Il motore di produzione NON viene toccato.
 *
 * Mappa (identica alla home online):
 *   0 Hero · 1 Manifesto · 2 Problem · 3 Services · 4 Partners ·
 *   5 ProcessHeadline · 6-8 Process (pinnato a 600vh) ·
 *   9 ROISystem · 10 ROIometro · 11 Cases · 12 FAQ · 13 CTA · 14 Footer
 */

import { useEffect, useRef, useState } from "react";
import { create } from "zustand";

export const DEMO_TOTAL_STEPS = 15;
const MAX_INDEX = DEMO_TOTAL_STEPS - 1;

const DESKTOP_BREAKPOINT = 1280;
const SCROLL_COOLDOWN_MS = 900;
const GESTURE_COLLECT_MS = 90;
const MIN_GESTURE_DELTA = 28;
const MOMENTUM_GAP_MS = 140;

export const DEMO_TRANSITION = "transform 1000ms cubic-bezier(0.645, 0.045, 0.355, 1.000)";

interface DemoScrollState {
  currentIndex: number;
  setIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
}

const clamp = (i: number) => Math.max(0, Math.min(i, MAX_INDEX));

export const useDemoStore = create<DemoScrollState>((set) => ({
  currentIndex: 0,
  setIndex: (index) => set({ currentIndex: clamp(index) }),
  next: () => set((s) => ({ currentIndex: clamp(s.currentIndex + 1) })),
  prev: () => set((s) => ({ currentIndex: clamp(s.currentIndex - 1) })),
}));

/** Indice logico → traslazione in vh. Identica a scrollConfig di produzione. */
export function getDemoTranslateVh(index: number): number {
  const i = clamp(index);
  if (i <= 5) return i * 100;
  if (i <= 8) return 600; /* Process pinnato */
  return 700 + (i - 9) * 100;
}

/** Passata attiva del Process: 0 fuori sezione, 1 rilievo, 2 costruzione, 3 collaudo. */
export function getDemoProcessStep(index: number): 0 | 1 | 2 | 3 {
  const i = clamp(index);
  if (i < 6) return 0;
  if (i === 6) return 1;
  if (i === 7) return 2;
  return 3;
}

/* Altezza minima per il pinning. I pannelli desktop sono height:100vh
   con overflow:hidden e scroll nativo bloccato: se il viewport si
   accorcia, il contenuto viene TAGLIATO e nessuno puo' raggiungerlo.
   E' il caso dello zoom al 200% (WCAG 1.4.4), che dimezza sia larghezza
   sia altezza in pixel CSS: su schermi molto larghi la larghezza resta
   sopra 1280 e il ramo desktop non scattava indietro da solo.
   Sotto questa soglia si passa al comportamento mobile — pannelli che
   crescono e scroll nativo — invece di nascondere contenuto. */
const DESKTOP_MIN_HEIGHT = 660;

export function isDesktopMode(): boolean {
  if (typeof window === "undefined") return false;
  if (window.innerWidth < DESKTOP_BREAKPOINT) return false;
  if (window.innerHeight < DESKTOP_MIN_HEIGHT) return false;
  if (
    window.matchMedia("(pointer: coarse)").matches &&
    window.matchMedia("(hover: none)").matches
  ) {
    return false;
  }
  return true;
}

/** Rileva desktop/mobile con aggiornamento su resize. */
export function useIsDesktop(): boolean {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const check = () => setDesktop(isDesktopMode());
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return desktop;
}

/**
 * Salta a un indice: snap su desktop, scrollIntoView su mobile.
 * Le sezioni sono wrappate in div id="h26-<indice>" dentro Home2026.
 */
export function jumpToIndex(index: number): void {
  if (isDesktopMode()) {
    useDemoStore.getState().setIndex(index);
    return;
  }
  /* Mobile: scroll nativo. Se il target non esiste o è nascosto
     (es. ProcessHeadline, solo desktop), ripiega sul successivo visibile. */
  for (let n = index; n < DEMO_TOTAL_STEPS; n++) {
    const el = document.getElementById(`h26-${n}`);
    if (el && el.getBoundingClientRect().height > 0) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }
}

/**
 * Wheel + tastiera → scatti di indice. Stessa strategia trackpad della
 * produzione: finestra di raccolta, lock, cooldown, filtro del momentum.
 */
export function useDemoScroll(): void {
  const lockedRef = useRef(false);
  const collectingRef = useRef(false);
  const netDeltaRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const needsQuietRef = useRef(false);
  const collectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unlock = () => {
      lockedRef.current = false;
      collectingRef.current = false;
      netDeltaRef.current = 0;
      needsQuietRef.current = true;
    };

    const lockAndCooldown = () => {
      lockedRef.current = true;
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(unlock, SCROLL_COOLDOWN_MS);
    };

    const commitScroll = () => {
      collectingRef.current = false;
      const delta = netDeltaRef.current;
      netDeltaRef.current = 0;

      if (Math.abs(delta) < MIN_GESTURE_DELTA) return;

      const { currentIndex, next, prev } = useDemoStore.getState();
      const direction = delta > 0 ? 1 : -1;

      if (direction === 1 && currentIndex < MAX_INDEX) {
        next();
        lockAndCooldown();
      } else if (direction === -1 && currentIndex > 0) {
        prev();
        lockAndCooldown();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktopMode()) return;
      e.preventDefault();

      if (lockedRef.current) return;

      const now = Date.now();
      const gap = now - lastWheelAtRef.current;
      lastWheelAtRef.current = now;

      if (needsQuietRef.current) {
        if (gap < MOMENTUM_GAP_MS) return;
        needsQuietRef.current = false;
      }

      netDeltaRef.current += e.deltaY;

      if (!collectingRef.current) {
        collectingRef.current = true;
        if (collectTimerRef.current) clearTimeout(collectTimerRef.current);
        collectTimerRef.current = setTimeout(commitScroll, GESTURE_COLLECT_MS);
      }

      if (Math.abs(netDeltaRef.current) >= MIN_GESTURE_DELTA) {
        if (collectTimerRef.current) clearTimeout(collectTimerRef.current);
        commitScroll();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDesktopMode()) return;
      if (lockedRef.current) return;

      const target = e.target;
      if (target instanceof Element) {
        const tag = target.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select") return;
      }

      const { currentIndex, next, prev, setIndex } = useDemoStore.getState();

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          if (currentIndex < MAX_INDEX) {
            next();
            lockAndCooldown();
          }
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (currentIndex > 0) {
            prev();
            lockAndCooldown();
          }
          break;
        case "Home":
          e.preventDefault();
          setIndex(0);
          lockAndCooldown();
          break;
        case "End":
          e.preventDefault();
          setIndex(MAX_INDEX);
          lockAndCooldown();
          break;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      if (collectTimerRef.current) clearTimeout(collectTimerRef.current);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);
}
