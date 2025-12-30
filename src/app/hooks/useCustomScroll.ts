"use client";

import { useEffect, useRef } from 'react';
import { useScrollStore } from '../store/useScrollStore';
import { TOTAL_LOGICAL_STEPS } from '../lib/scrollConfig';

const DESKTOP_BREAKPOINT = 1024;
const SCROLL_COOLDOWN_MS = 1000;
const SCROLL_THRESHOLD = 40;
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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // === CRITICAL: Check if we're on mobile AT MOUNT TIME ===
    // If mobile, don't register ANY custom scroll handlers
    const checkIsMobile = () => {
      // Check viewport width
      if (window.innerWidth < DESKTOP_BREAKPOINT) return true;
      
      // Also check if device has touch as primary input (tablets in portrait, etc.)
      // This prevents issues on large touch devices
      if (window.matchMedia('(pointer: coarse)').matches && 
          window.matchMedia('(hover: none)').matches) {
        return true;
      }
      
      return false;
    };

    // If mobile at mount, exit immediately - don't register anything
    if (checkIsMobile()) {
      return;
    }

    // === DESKTOP ONLY CODE BELOW ===

    const triggerScrollCooldown = () => {
      isScrollingRef.current = true;
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
      // Double-check we're still on desktop (in case of resize)
      if (window.innerWidth < DESKTOP_BREAKPOINT) return;
      
      if (useScrollStore.getState().isContactFormOpen) return;
      
      e.preventDefault();

      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;

      const { currentIndex, next, prev } = useScrollStore.getState();
      const direction = e.deltaY > 0 ? 1 : -1;

      if (direction === 1 && currentIndex < MAX_INDEX) {
        next();
        triggerScrollCooldown();
      } else if (direction === -1 && currentIndex > 0) {
        prev();
        triggerScrollCooldown();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < DESKTOP_BREAKPOINT) return;
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

    // Register listeners ONLY on desktop
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Handle resize: if user resizes to mobile, we need to clean up
    const handleResize = () => {
      if (checkIsMobile()) {
        // Reset overflow when switching to mobile
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
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
