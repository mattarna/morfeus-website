/**
 * Scroll Configuration
 * 
 * Defines the logical scroll system that maps user scroll actions
 * to section transitions. This mimics the legacy HTML/JS behavior.
 * 
 * SECTION MAPPING:
 * ================
 * Index 0:  Hero           → translateY: 0vh
 * Index 1:  Manifesto      → translateY: 100vh
 * Index 2:  Problem        → translateY: 200vh
 * Index 3:  Services       → translateY: 300vh
 * Index 4:  Partners       → translateY: 400vh
 * Index 5:  ProcessHeadline → translateY: 500vh
 * Index 6:  ProcessStep1   → translateY: 600vh (pinned section)
 * Index 7:  ProcessStep2   → translateY: 600vh (pinned - same position)
 * Index 8:  ProcessStep3   → translateY: 600vh (pinned - same position)
 * Index 9:  ROI            → translateY: 700vh
 * Index 10: ROIometer      → translateY: 800vh
 * Index 11: CaseStudy      → translateY: 900vh
 * Index 12: FAQ            → translateY: 1000vh
 * Index 13: CTA            → translateY: 1100vh
 * Index 14: Footer         → translateY: 1200vh
 */

export const TOTAL_LOGICAL_STEPS = 15 as const;

/**
 * Navigation point for the sidebar navigation
 */
export interface NavPoint {
  label: string;
  index: number;
  range: [number, number]; // Range of indices this nav point covers
}

/**
 * Navigation points displayed in the sidebar
 * Each point can cover multiple logical indices (e.g., Method covers 5-8)
 */
export const NAV_POINTS: NavPoint[] = [
  { label: "Start",       index: 0,  range: [0, 0] },
  { label: "Vision",      index: 1,  range: [1, 1] },
  { label: "Problem",     index: 2,  range: [2, 2] },
  { label: "Services",    index: 3,  range: [3, 3] },
  { label: "Partners",    index: 4,  range: [4, 4] },
  { label: "Method",      index: 5,  range: [5, 8] },
  { label: "ROI",         index: 9,  range: [9, 9] },
  { label: "ROIometer",   index: 10, range: [10, 10] },
  { label: "Cases",       index: 11, range: [11, 11] },
  { label: "FAQ",         index: 12, range: [12, 12] },
  { label: "Book a call", index: 13, range: [13, 14] },
];

/**
 * Clamps an index to valid range [0, TOTAL_LOGICAL_STEPS - 1]
 */
export function clampIndex(index: number): number {
  return Math.max(0, Math.min(index, TOTAL_LOGICAL_STEPS - 1));
}

/**
 * Converts logical scroll index to translateY value in vh units.
 * Handles pinned sections (Process steps 6-8 stay at 600vh).
 */
export function getTranslateVh(index: number): number {
  const i = clampIndex(index);

  // Indices 0-5: Linear progression (0, 100, 200, 300, 400, 500)
  if (i <= 5) return i * 100;
  
  // Indices 6-8: Pinned at 600vh (Process section)
  if (i <= 8) return 600;
  
  // Indices 9-14: Continue from 700vh
  // 9→700, 10→800, 11→900, 12→1000, 13→1100, 14→1200
  return 700 + (i - 9) * 100;
}

/**
 * Returns which process step should be active (1, 2, or 3)
 * Returns 0 if not in process section
 */
export function getActiveProcessStep(index: number): 0 | 1 | 2 | 3 {
  const i = clampIndex(index);
  
  if (i < 6) return 0;  // Before process section
  if (i === 6) return 1; // Step 1: Understand
  if (i === 7) return 2; // Step 2: Build
  if (i >= 8) return 3;  // Step 3: Automate
  
  return 0;
}
