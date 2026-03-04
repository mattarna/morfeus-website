"use client";

import { useEffect, useRef } from 'react';
import { useScrollStore } from '../store/useScrollStore';
import { TOTAL_LOGICAL_STEPS } from '../lib/scrollConfig';

const DESKTOP_BREAKPOINT = 1024;
const SCROLL_COOLDOWN_MS = 1000;
const SCROLL_THRESHOLD = 20;
const MAX_INDEX = TOTAL_LOGICAL_STEPS - 1;

/**
 * Custom scroll hook that handles wheel and keyboard navigation
 * 
 * IMPORTANT: This hook is COMPLETELY DISABLED on mobile.
 * On mobile, native scroll is used and the IntersectionObserver
 * in page.tsx updates the currentIndex.
 * 
 * Features (Desktop only):
 * - Prevents native scroll
 * - Moves through logical steps with 1000ms cooldown
 * - Supports wheel and arrow keys
 */
export function useCustomScroll(): void {
  const isScrollingRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isDesktopMode = () => {
      if (window.innerWidth < DESKTOP_BREAKPOINT) return false;
      if (window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(hover: none)").matches) {
        return false;
      }
      return true;
    };

    const triggerScrollCooldown = () => {
      isScrollingRef.current = true;
      accumulatedDeltaRef.current = 0;
      useScrollStore.getState().setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        useScrollStore.getState().setIsScrolling(false);
      }, SCROLL_COOLDOWN_MS);
    };

    const handleWheel = (e: WheelEvent) => {
      // Keep native behavior on mobile/tablet.
      if (!isDesktopMode()) return;
      
      if (useScrollStore.getState().isContactFormOpen) return;
      
      e.preventDefault();

      if (isScrollingRef.current) return;
      accumulatedDeltaRef.current += e.deltaY;
      if (Math.abs(accumulatedDeltaRef.current) < SCROLL_THRESHOLD) return;

      const { currentIndex, next, prev } = useScrollStore.getState();
      const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;

      if (direction === 1 && currentIndex < MAX_INDEX) {
        next();
        triggerScrollCooldown();
      } else if (direction === -1 && currentIndex > 0) {
        prev();
        triggerScrollCooldown();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDesktopMode()) return;
      if (useScrollStore.getState().isContactFormOpen) return;
      if (isScrollingRef.current) return;

      const { currentIndex, next, prev, setIndex } = useScrollStore.getState();

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentIndex < MAX_INDEX) {
            next();
            triggerScrollCooldown();
          }
          break;
          
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentIndex > 0) {
            prev();
            triggerScrollCooldown();
          }
          break;
          
        case 'Home':
          e.preventDefault();
          setIndex(0);
          triggerScrollCooldown();
          break;
          
        case 'End':
          e.preventDefault();
          setIndex(MAX_INDEX);
          triggerScrollCooldown();
          break;
      }
    };

    // Register listeners globally; handlers self-gate to desktop mode.
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Handle resize transition (desktop <-> mobile) without requiring remount.
    const handleResize = () => {
      if (!isDesktopMode()) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        accumulatedDeltaRef.current = 0;
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
}
