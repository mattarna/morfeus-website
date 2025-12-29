"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

/**
 * Locale-specific 404 Page
 * 
 * A cinematic, Matrix-inspired "Not Found" page
 * with glitch effects and animated elements.
 * 
 * This inherits the HTML structure from the parent layout.
 */
export default function NotFound() {
  const locale = useLocale();
  const [glitchText, setGlitchText] = useState("404");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const t = {
    en: {
      title: "Reality not found",
      description: "The page you're looking for has been unplugged from the Matrix.",
      cta: "Take the red pill",
      back: "Go back",
      status: "System Error",
    },
    it: {
      title: "Realtà non trovata",
      description: "La pagina che cerchi è stata scollegata dalla Matrix.",
      cta: "Prendi la pillola rossa",
      back: "Torna indietro",
      status: "Errore di Sistema",
    },
  };

  const text = t[locale as keyof typeof t] || t.en;

  // Glitch effect on the 404 text
  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";
    let interval: NodeJS.Timeout;
    
    const startGlitch = () => {
      let iterations = 0;
      interval = setInterval(() => {
        setGlitchText(
          "404".split("").map((char, index) => {
            if (index < iterations) return "404"[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }).join("")
        );
        
        iterations += 1/3;
        if (iterations >= 4) {
          clearInterval(interval);
          setGlitchText("404");
        }
      }, 50);
    };

    startGlitch();
    const loopInterval = setInterval(startGlitch, 4000);
    
    return () => {
      clearInterval(interval);
      clearInterval(loopInterval);
    };
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(77, 57, 235, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(77, 57, 235, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #4D39EB 0%, transparent 70%)",
          transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />
      
      <div 
        className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* 404 Number with Glitch Effect */}
        <div className="relative mb-8">
          <h1 
            className="text-[150px] sm:text-[200px] md:text-[280px] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 select-none"
            style={{
              textShadow: "0 0 80px rgba(77, 57, 235, 0.5)",
            }}
          >
            {glitchText}
          </h1>
          
          {/* Glitch layers */}
          <span 
            className="absolute inset-0 text-[150px] sm:text-[200px] md:text-[280px] font-bold tracking-tighter leading-none text-[#4D39EB]/30 select-none pointer-events-none"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-2px, 0)",
              animation: "glitch1 2s infinite",
            }}
            aria-hidden="true"
          >
            {glitchText}
          </span>
          <span 
            className="absolute inset-0 text-[150px] sm:text-[200px] md:text-[280px] font-bold tracking-tighter leading-none text-[#8B5CF6]/30 select-none pointer-events-none"
            style={{
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(2px, 0)",
              animation: "glitch2 2s infinite",
            }}
            aria-hidden="true"
          >
            {glitchText}
          </span>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
            {text.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-md font-light">
            {text.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${locale}`}
            className="group h-14 px-10 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
          >
            <span>{text.cta}</span>
            <svg 
              className="w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="h-14 px-10 bg-white/5 border border-white/10 text-white text-[15px] font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span>{text.back}</span>
          </button>
        </div>

        {/* System Status - Moved inside flow to avoid overlap */}
        <div className="mt-16 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4D39EB] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
            {text.status}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch1 {
          0%, 100% { transform: translate(-2px, 0); }
          25% { transform: translate(2px, -1px); }
          50% { transform: translate(-1px, 1px); }
          75% { transform: translate(1px, -2px); }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translate(2px, 0); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(1px, -1px); }
          75% { transform: translate(-1px, 2px); }
        }
      `}</style>
    </main>
  );
}
