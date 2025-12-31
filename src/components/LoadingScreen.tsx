"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"scanning" | "revealing" | "done">("scanning");

  useEffect(() => {
    // Phase 1: Scanning animation (1.5s)
    const scanTimer = setTimeout(() => {
      setPhase("revealing");
    }, 1500);

    // Phase 2: Revealing animation (0.8s)
    const revealTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2300);

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
        className={`absolute left-0 right-0 h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-[#4D39EB] to-transparent shadow-[0_0_30px_10px_rgba(77,57,235,0.5)] ${
          phase === "scanning" ? "animate-scan" : "opacity-0"
        }`}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(77,57,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(77,57,235,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Logo Container */}
      <div className={`relative flex flex-col items-center ${phase === "scanning" ? "animate-breathe" : ""}`}>
        {/* Logo Image */}
        <div className="relative">
          <img 
            src="/icon.png" 
            alt="Morfeus" 
            className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 animate-glow"
          />
          
          {/* Purple Glow behind logo */}
          <div 
            className="absolute inset-0 blur-3xl opacity-40 -z-10 scale-[2] animate-pulse-slow"
            style={{
              background: "radial-gradient(ellipse at center, rgba(77,57,235,0.6) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* MORFEUS Text */}
        <h1 
          className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] md:tracking-[0.4em] text-white mt-6 md:mt-8 opacity-80"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          MORFEUS
        </h1>

        {/* Loading indicator */}
        <div className="flex items-center gap-2 mt-6 md:mt-8">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4D39EB] animate-dot-1"></span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4D39EB] animate-dot-2"></span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4D39EB] animate-dot-3"></span>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-8 md:w-12 h-8 md:h-12 border-l-2 border-t-2 border-[#4D39EB]/30" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 md:w-12 h-8 md:h-12 border-r-2 border-t-2 border-[#4D39EB]/30" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 md:w-12 h-8 md:h-12 border-l-2 border-b-2 border-[#4D39EB]/30" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 md:w-12 h-8 md:h-12 border-r-2 border-b-2 border-[#4D39EB]/30" />

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

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.95;
          }
        }

        @keyframes glow {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 20px rgba(77,57,235,0.3));
          }
          50% {
            filter: brightness(1.1) drop-shadow(0 0 30px rgba(77,57,235,0.5));
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(2);
          }
          50% {
            opacity: 0.6;
            transform: scale(2.2);
          }
        }

        @keyframes dot-bounce {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scan {
          animation: scan 1.5s ease-in-out forwards;
        }

        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-dot-1 {
          animation: dot-bounce 1.4s ease-in-out infinite;
        }

        .animate-dot-2 {
          animation: dot-bounce 1.4s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .animate-dot-3 {
          animation: dot-bounce 1.4s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

