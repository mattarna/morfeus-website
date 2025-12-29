import { create } from 'zustand';
import { TOTAL_LOGICAL_STEPS } from '../lib/scrollConfig';

/**
 * Zustand store for managing scroll state
 * 
 * @property currentIndex - Current logical scroll position (0 to TOTAL_LOGICAL_STEPS - 1)
 * @property isScrolling - Whether scroll animation is in progress (for cooldown)
 */
interface ScrollState {
  currentIndex: number;
  isScrolling: boolean;
  isContactFormOpen: boolean;
  setIndex: (index: number) => void;
  setIsScrolling: (status: boolean) => void;
  setIsContactFormOpen: (status: boolean) => void;
  next: () => void;
  prev: () => void;
}

const MAX_INDEX = TOTAL_LOGICAL_STEPS - 1;

export const useScrollStore = create<ScrollState>((set) => ({
  currentIndex: 0,
  isScrolling: false,
  isContactFormOpen: false,
  
  setIndex: (index) => set({ 
    currentIndex: Math.max(0, Math.min(index, MAX_INDEX)) 
  }),
  
  setIsScrolling: (status) => set({ isScrolling: status }),
  
  setIsContactFormOpen: (status) => set({ isContactFormOpen: status }),
  
  next: () => set((state) => ({ 
    currentIndex: Math.min(state.currentIndex + 1, MAX_INDEX) 
  })),
  
  prev: () => set((state) => ({ 
    currentIndex: Math.max(state.currentIndex - 1, 0) 
  })),
}));
