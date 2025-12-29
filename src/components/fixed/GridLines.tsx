"use client";

/**
 * GridLines - Decorative vertical lines
 * 
 * Positioned inside ScrollWrapper (absolute)
 * Height: 1300vh to cover all sections
 * Matches legacy structure exactly
 */
export function GridLines() {
  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-[1300vh] z-[1] pointer-events-none px-6 md:px-10 flex justify-between"
      style={{
        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
      }}
    >
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-[1.5px] h-full bg-white/[0.06]" />
      ))}
    </div>
  );
}
