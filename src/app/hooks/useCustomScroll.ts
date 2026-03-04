"use client";

import { useEffect, useRef } from 'react';
import { useScrollStore } from '../store/useScrollStore';
import { TOTAL_LOGICAL_STEPS } from '../lib/scrollConfig';

const DESKTOP_BREAKPOINT = 1024;
const SCROLL_COOLDOWN_MS = 900;
const GESTURE_COLLECT_MS = 90;
const MIN_GESTURE_DELTA = 28;
const MOMENTUM_GAP_MS = 140;
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
 * - Release after SCROLL_COOLDOWN_MS (matches CSS transition duration)
 * - On unlock, reset all refs so residual momentum is filtered by
 *   the collect window + delta threshold
 */
export function useCustomScroll(): void {
  const lockedRef = useRef(false);
  const collectingRef = useRef(false);
  const netDeltaRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const needsQuietAfterUnlockRef = useRef(false);
  const collectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

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
      collectingRef.current = false;
      netDeltaRef.current = 0;
      needsQuietAfterUnlockRef.current = true;
      useScrollStore.getState().setIsScrolling(false);
    };

    const commitScroll = () => {
      collectingRef.current = false;
      const delta = netDeltaRef.current;
      netDeltaRef.current = 0;

      if (Math.abs(delta) < MIN_GESTURE_DELTA) {
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
      cooldownTimerRef.current = setTimeout(unlock, SCROLL_COOLDOWN_MS);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktopMode()) return;
      if (useScrollStore.getState().isContactFormOpen) return;

      e.preventDefault();

      if (lockedRef.current) return;

      const now = Date.now();
      const gapSinceLastWheel = now - lastWheelAtRef.current;
      lastWheelAtRef.current = now;

      // After unlock, ignore trailing momentum until a short quiet gap is detected.
      if (needsQuietAfterUnlockRef.current) {
        if (gapSinceLastWheel < MOMENTUM_GAP_MS) return;
        needsQuietAfterUnlockRef.current = false;
      }

      netDeltaRef.current += e.deltaY;

      if (!collectingRef.current) {
        collectingRef.current = true;
        if (collectTimerRef.current) clearTimeout(collectTimerRef.current);
        // Fixed window: decide quickly, don't wait for full momentum tail.
        collectTimerRef.current = setTimeout(commitScroll, GESTURE_COLLECT_MS);
      }

      // Trigger early if intent is already strong enough.
      if (Math.abs(netDeltaRef.current) >= MIN_GESTURE_DELTA) {
        if (collectTimerRef.current) clearTimeout(collectTimerRef.current);
        commitScroll();
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
        needsQuietAfterUnlockRef.current = false;
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (collectTimerRef.current) clearTimeout(collectTimerRef.current);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);
}
