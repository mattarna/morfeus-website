"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"scanning" | "revealing" | "done">("scanning");

  useEffect(() => {
    // Phase 1: Scanning animation (1.2s)
    const scanTimer = setTimeout(() => {
      setPhase("revealing");
    }, 1200);

    // Phase 2: Revealing animation (0.8s)
    const revealTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(revealTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-all duration-700 ${
        phase === "revealing" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Scan Line */}
      <div
        className={`absolute left-0 right-0 h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent shadow-[0_0_30px_10px_rgba(168,85,247,0.5)] ${
          phase === "scanning" ? "animate-scan" : "opacity-0"
        }`}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Logo Container */}
      <div className={`relative ${phase === "scanning" ? "animate-glitch" : ""}`}>
        {/* Logo */}
        <div className="relative">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] md:tracking-[0.4em] text-white"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            MORFEUS
          </h1>
          
          {/* Purple Glow */}
          <div 
            className="absolute inset-0 blur-2xl opacity-50"
            style={{
              background: "radial-gradient(ellipse at center, rgba(168,85,247,0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Subtitle */}
        <p className="text-center text-[10px] md:text-xs tracking-[0.5em] text-white/40 mt-4 md:mt-6 uppercase">
          Loading
          <span className="inline-flex ml-1">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
            <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
          </span>
        </p>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-8 md:w-12 h-8 md:h-12 border-l-2 border-t-2 border-[#a855f7]/30" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 md:w-12 h-8 md:h-12 border-r-2 border-t-2 border-[#a855f7]/30" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 md:w-12 h-8 md:h-12 border-l-2 border-b-2 border-[#a855f7]/30" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 md:w-12 h-8 md:h-12 border-r-2 border-b-2 border-[#a855f7]/30" />

      {/* Styles */}
      <style jsx>{`
        @keyframes scan {
          0% {
            top: -10%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }

        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
            opacity: 1;
          }
          20% {
            transform: translate(-2px, 1px);
          }
          40% {
            transform: translate(2px, -1px);
          }
          60% {
            transform: translate(-1px, 2px);
          }
          80% {
            transform: translate(1px, -2px);
          }
        }

        .animate-scan {
          animation: scan 1.2s ease-in-out forwards;
        }

        .animate-glitch {
          animation: glitch 0.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

