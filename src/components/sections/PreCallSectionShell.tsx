import { ReactNode } from "react";
import { GridPattern } from "../shared/GridPattern";

interface PreCallSectionShellProps {
  id?: string;
  children: ReactNode;
  className?: string;
  showGrid?: boolean;
  number?: string;
  variant?: "transparent" | "deep";
}

export function PreCallSectionShell({ 
  id, 
  children, 
  className = "",
  showGrid = true,
  number,
  variant = "deep"
}: PreCallSectionShellProps) {
  const bgClass = variant === "transparent" ? "bg-transparent" : "bg-[#0a111a]/80 backdrop-blur-md";

  return (
    <section
      id={id}
      className={`relative z-10 border-y border-white/[0.05] ${bgClass} px-6 py-20 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] md:px-10 md:py-24 xl:px-40 ${className}`}
    >
      {showGrid && <GridPattern />}
      
      {number && (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none select-none">
          <span className="text-[12rem] md:text-[18rem] font-black text-white/[0.02] font-mono tracking-tighter">
            {number}
          </span>
        </div>
      )}
      
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}
