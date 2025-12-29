"use client";

import { ReactNode, useEffect, useState } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { getTranslateVh } from "@/app/lib/scrollConfig";
import { useCustomScroll } from "@/app/hooks/useCustomScroll";

interface ScrollWrapperProps {
  children: ReactNode;
}

const DESKTOP_BREAKPOINT = 1024;
const TRANSITION_DURATION = "1000ms";
const TRANSITION_EASING = "cubic-bezier(0.645, 0.045, 0.355, 1.000)";

/**
 * ScrollWrapper - Core scrolling container
 * 
 * Desktop Mode (>= 1024px):
 * - Position: absolute, top: 0, left: 0
 * - Uses translateY to move through sections
 * - 1000ms transition with easeInOutCubic timing
 * - Disables native scroll
 * 
 * Mobile Mode (< 1024px):
 * - Position: relative (normal document flow)
 * - Native scroll enabled
 * - No translateY transforms
 */
export function ScrollWrapper({ children }: ScrollWrapperProps) {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Initialize custom scroll handling (only active on desktop)
  useCustomScroll();

  // Track viewport size for responsive behavior
  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Disable native scroll on desktop only
  useEffect(() => {
    if (isDesktop) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isDesktop]);

  const translateY = getTranslateVh(currentIndex);

  // Mobile: normal document flow with relative positioning
  // Desktop: absolute positioning with translateY transforms
  return (
    <div
      style={{
        position: isDesktop ? "absolute" : "relative",
        top: isDesktop ? 0 : undefined,
        left: isDesktop ? 0 : undefined,
        width: "100%",
        transform: isDesktop ? `translateY(-${translateY}vh)` : "none",
        transition: isDesktop ? `transform ${TRANSITION_DURATION} ${TRANSITION_EASING}` : "none",
        willChange: isDesktop ? "transform" : "auto",
      }}
    >
      {children}
    </div>
  );
}
