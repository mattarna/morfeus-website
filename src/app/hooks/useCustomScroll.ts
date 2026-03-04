"use client";

import { useEffect, useRef } from 'react';
import { useScrollStore } from '../store/useScrollStore';
import { TOTAL_LOGICAL_STEPS } from '../lib/scrollConfig';

const DESKTOP_BREAKPOINT = 1024;
const SCROLL_COOLDOWN_MS = 1100;
const GESTURE_COLLECT_MS = 80;
const WHEEL_QUIET_MS = 150;
const MAX_INDEX = TOTAL_LOGICAL_STEPS - 1;

/**
 * Custom scroll hook that handles wheel and keyboard navigation
 * 
 * IMPORTANT: This hook is COMPLETELY DISABLED on mobile.
 * On mobile, native scroll is used and the IntersectionObserver
 * in page.tsx updates the currentIndex.
 * 
 * Trackpad strategy:
 * - Collect wheel deltas for GESTURE_COLLECT_MS to determine direction
 * - Lock immediately, trigger one scroll, then hold the lock
 * - Release only after SCROLL_COOLDOWN_MS AND wheel events have
 *   been quiet for WHEEL_QUIET_MS (momentum fully ended)
 */
export function useCustomScroll(): void {
  const lockedRef = useRef(false);
  const collectingRef = useRef(false);
  const netDeltaRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const collectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const quietCheckTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isDesktopMode = () => {
      if (window.innerWidth < DESKTOP_BREAKPOINT) return false;
      if (window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(hover: none)").matches) {
        return false;
      }
      return true;
    };

    const unlock = () => {
      lockedRef.current = false;
      netDeltaRef.current = 0;
      useScrollStore.getState().setIsScrolling(false);
    };

    const scheduleUnlock = () => {
      if (quietCheckTimerRef.current) clearTimeout(quietCheckTimerRef.current);

      quietCheckTimerRef.current = setTimeout(() => {
        const silenceSince = Date.now() - lastWheelAtRef.current;
        if (silenceSince >= WHEEL_QUIET_MS) {
          unlock();
        } else {
          scheduleUnlock();
        }
      }, WHEEL_QUIET_MS);
    };

    const commitScroll = () => {
      collectingRef.current = false;
      const delta = netDeltaRef.current;
      netDeltaRef.current = 0;

      if (Math.abs(delta) < 1) {
        return;
      }

      lockedRef.current = true;
      useScrollStore.getState().setIsScrolling(true);

      const { currentIndex, next, prev } = useScrollStore.getState();
      const direction = delta > 0 ? 1 : -1;

      if (direction === 1 && currentIndex < MAX_INDEX) {
        next();
      } else if (direction === -1 && currentIndex > 0) {
        prev();
      } else {
        unlock();
        return;
      }

      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        scheduleUnlock();
      }, SCROLL_COOLDOWN_MS);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktopMode()) return;
      if (useScrollStore.getState().isContactFormOpen) return;

      e.preventDefault();
      lastWheelAtRef.current = Date.now();

      if (lockedRef.current) return;

      netDeltaRef.current += e.deltaY;

      if (!collectingRef.current) {
        collectingRef.current = true;
        if (collectTimerRef.current) clearTimeout(collectTimerRef.current);
        collectTimerRef.current = setTimeout(commitScroll, GESTURE_COLLECT_MS);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDesktopMode()) return;
      if (useScrollStore.getState().isContactFormOpen) return;
      if (lockedRef.current) return;

      const { currentIndex, next, prev, setIndex } = useScrollStore.getState();

      const lockAndCooldown = () => {
        lockedRef.current = true;
        useScrollStore.getState().setIsScrolling(true);
        if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
        cooldownTimerRef.current = setTimeout(unlock, SCROLL_COOLDOWN_MS);
      };

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentIndex < MAX_INDEX) {
            next();
            lockAndCooldown();
          }
          break;
          
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentIndex > 0) {
            prev();
            lockAndCooldown();
          }
          break;
          
        case 'Home':
          e.preventDefault();
          setIndex(0);
          lockAndCooldown();
          break;
          
        case 'End':
          e.preventDefault();
          setIndex(MAX_INDEX);
          lockAndCooldown();
          break;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    const handleResize = () => {
      if (!isDesktopMode()) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        netDeltaRef.current = 0;
        lockedRef.current = false;
        collectingRef.current = false;
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (collectTimerRef.current) clearTimeout(collectTimerRef.current);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      if (quietCheckTimerRef.current) clearTimeout(quietCheckTimerRef.current);
    };
  }, []);
}
