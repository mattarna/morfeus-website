"use client";

/**
 * Footer Section - Index 12
 * 
 * Minimal footer with copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black">
      <div className="text-center">
        <p className="text-xs text-slate-600 font-medium tracking-widest uppercase">
          Morfeus Intelligence © {currentYear}
        </p>
      </div>
    </section>
  );
}
