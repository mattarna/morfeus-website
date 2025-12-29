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
 * Index 2:  Partners       → translateY: 200vh
 * Index 3:  Services       → translateY: 300vh
 * Index 4:  ProcessHeadline → translateY: 400vh
 * Index 5:  ProcessStep1   → translateY: 500vh (pinned section)
 * Index 6:  ProcessStep2   → translateY: 500vh (pinned - same position)
 * Index 7:  ProcessStep3   → translateY: 500vh (pinned - same position)
 * Index 8:  ROI            → translateY: 600vh
 * Index 9:  CaseStudy      → translateY: 700vh
 * Index 10: FAQ            → translateY: 800vh
 * Index 11: CTA            → translateY: 900vh
 * Index 12: Footer         → translateY: 1000vh
 */

export const TOTAL_LOGICAL_STEPS = 13 as const;

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
 * Each point can cover multiple logical indices (e.g., Method covers 4-7)
 */
export const NAV_POINTS: NavPoint[] = [
  { label: "Start",       index: 0,  range: [0, 0] },
  { label: "Vision",      index: 1,  range: [1, 1] },
  { label: "Partners",    index: 2,  range: [2, 2] },
  { label: "Services",    index: 3,  range: [3, 3] },
  { label: "Method",      index: 4,  range: [4, 7] },
  { label: "ROI",         index: 8,  range: [8, 8] },
  { label: "Cases",       index: 9,  range: [9, 9] },
  { label: "FAQ",         index: 10, range: [10, 10] },
  { label: "Book a call", index: 11, range: [11, 12] },
];

/**
 * Clamps an index to valid range [0, TOTAL_LOGICAL_STEPS - 1]
 */
export function clampIndex(index: number): number {
  return Math.max(0, Math.min(index, TOTAL_LOGICAL_STEPS - 1));
}

/**
 * Converts logical scroll index to translateY value in vh units.
 * Handles pinned sections (Process steps 5-7 stay at 500vh).
 */
export function getTranslateVh(index: number): number {
  const i = clampIndex(index);

  // Indices 0-4: Linear progression (0, 100, 200, 300, 400)
  if (i <= 4) return i * 100;
  
  // Indices 5-7: Pinned at 500vh (Process section)
  if (i <= 7) return 500;
  
  // Indices 8-12: Continue from 600vh
  // 8→600, 9→700, 10→800, 11→900, 12→1000
  return 600 + (i - 8) * 100;
}

/**
 * Returns which process step should be active (1, 2, or 3)
 * Returns 0 if not in process section
 */
export function getActiveProcessStep(index: number): 0 | 1 | 2 | 3 {
  const i = clampIndex(index);
  
  if (i < 5) return 0;  // Before process section
  if (i === 5) return 1; // Step 1: Understand
  if (i === 6) return 2; // Step 2: Build
  if (i >= 7) return 3;  // Step 3: Automate
  
  return 0;
}
