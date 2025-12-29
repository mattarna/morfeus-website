"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Error Page Component
 * 
 * Next.js 14 error boundary for route segments.
 * This catches runtime errors and displays a recovery UI.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-lg text-center">
        {/* Animated Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#4D39EB]/30 animate-ping" />
          
          {/* Inner circle */}
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
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
          System Malfunction
        </h2>
        <p className="text-slate-400 mb-4 leading-relaxed">
          Something unexpected happened. Don&apos;t worry — your progress is safe.
        </p>
        
        {/* Error digest for debugging */}
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
          
          <Link
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
          </Link>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4D39EB] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
            Attempting Recovery
          </span>
        </div>
      </div>
    </div>
  );
}

