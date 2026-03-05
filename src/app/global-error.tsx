"use client";

import { useEffect } from "react";

/**
 * Global Error Boundary
 * 
 * This component catches errors in the root layout and must include
 * its own <html> and <body> tags since it replaces the entire page.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-lg text-center">
            {/* Animated Icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-[#4D39EB]/30 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#4D39EB]/20 to-[#8B5CF6]/20 flex items-center justify-center border border-[#4D39EB]/40">
                <svg 
                  className="w-10 h-10 text-[#4D39EB]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
            </div>

            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
              Critical System Error
            </h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Something went wrong at the application level. We&apos;re working to restore normal operations.
            </p>
            
            {error.digest && (
              <p className="text-xs text-slate-600 mb-8 font-mono">
                Error ID: {error.digest}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="group h-14 px-10 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
              >
                <svg 
                  className="w-5 h-5 transition-transform group-hover:rotate-180" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
                <span>Try again</span>
              </button>
              
              <a
                href="/"
                className="h-14 px-10 bg-white/5 border border-white/10 text-white text-[15px] font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
                <span>Go home</span>
              </a>
            </div>

            {/* Bottom decoration */}
            <div className="mt-16 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
                System Recovery
              </span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
