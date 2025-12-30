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
 * Detect if device is truly mobile (touch-primary, no hover)
 */
function checkIsMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check viewport width
  if (window.innerWidth < DESKTOP_BREAKPOINT) return true;
  
  // Check if touch is primary input (catches tablets)
  if (window.matchMedia('(pointer: coarse)').matches && 
      window.matchMedia('(hover: none)').matches) {
    return true;
  }
  
  return false;
}

/**
 * ScrollWrapper - Core scrolling container
 * 
 * Desktop Mode (>= 1024px, non-touch):
 * - Position: absolute, top: 0, left: 0
 * - Uses translateY to move through sections
 * - 1000ms transition with easeInOutCubic timing
 * - Disables native scroll
 * 
 * Mobile Mode (< 1024px OR touch-primary device):
 * - Position: relative (normal document flow)
 * - Native scroll enabled - NO INTERFERENCE
 * - No translateY transforms
 */
export function ScrollWrapper({ children }: ScrollWrapperProps) {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize custom scroll handling (only active on desktop)
  useCustomScroll();

  // Track viewport size for responsive behavior
  useEffect(() => {
    setIsMounted(true);
    
    const checkViewport = () => {
      const isMobile = checkIsMobileDevice();
      setIsDesktop(!isMobile);
    };
    
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Disable native scroll on desktop only
  useEffect(() => {
    if (!isMounted) return;

    if (isDesktop) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // CRITICAL: Ensure scroll is ALWAYS enabled on mobile
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    
    // Cleanup: always restore scroll on unmount
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isDesktop, isMounted]);

  const translateY = getTranslateVh(currentIndex);

  // Mobile: Simple relative container with NO interference
  if (!isMounted || !isDesktop) {
    return (
      <div 
        style={{ 
          position: "relative", 
          width: "100%",
          minHeight: "100vh"
        }}
      >
        {children}
      </div>
    );
  }

  // Desktop: absolute positioning with translateY transforms
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        transform: `translateY(-${translateY}vh)`,
        transition: `transform ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
