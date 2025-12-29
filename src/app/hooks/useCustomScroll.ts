"use client";

import { useEffect, useRef } from 'react';
import { useScrollStore } from '../store/useScrollStore';
import { TOTAL_LOGICAL_STEPS } from '../lib/scrollConfig';

/**
 * Custom scroll hook that handles wheel and keyboard navigation
 * 
 * Features:
 * - Prevents native scroll on desktop (width >= 1024px)
 * - Moves through logical steps with 1000ms cooldown
 * - Supports wheel, arrow keys, Page Up/Down, Home/End
 * - Passes through on mobile for native scroll
 */
export function useCustomScroll(): void {
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const SCROLL_COOLDOWN_MS = 1000;
    const SCROLL_THRESHOLD = 40;
    const TOUCH_THRESHOLD = 50;
    const DESKTOP_BREAKPOINT = 1024;
    const MAX_INDEX = TOTAL_LOGICAL_STEPS - 1;

    const isMobile = () => window.innerWidth < DESKTOP_BREAKPOINT;

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
      if (isMobile()) return;
      
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

    const handleTouchStart = (e: TouchEvent) => {
      if (isMobile()) return;
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile() || touchStartRef.current === null || isScrollingRef.current) return;
      if (useScrollStore.getState().isContactFormOpen) return;

      const touchEnd = e.touches[0].clientY;
      const deltaY = touchStartRef.current - touchEnd;

      if (Math.abs(deltaY) > TOUCH_THRESHOLD) {
        e.preventDefault();
        const { currentIndex, next, prev } = useScrollStore.getState();
        const direction = deltaY > 0 ? 1 : -1;

        if (direction === 1 && currentIndex < MAX_INDEX) {
          next();
          triggerScrollCooldown();
        } else if (direction === -1 && currentIndex > 0) {
          prev();
          triggerScrollCooldown();
        }
        touchStartRef.current = null;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile()) return;
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

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
}
