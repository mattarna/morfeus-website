"use client";

import { motion } from "framer-motion";

export function ServiceBackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main Gradient Glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(30, 58, 95, 0.15) 0%, transparent 50%)"
        }}
      />

      {/* Dynamic Aura Glows */}
      <motion.div 
        animate={{ 
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-majorelle/10 blur-[120px]"
      />
      
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1.1, 1, 1.1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] rounded-full bg-midnight-blue/20 blur-[150px]"
      />

      <motion.div 
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          x: [0, 40, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[10%] left-[10%] w-[60%] h-[60%] rounded-full bg-persian-blue/10 blur-[150px]"
      />

      <div className="absolute inset-0 flex justify-between px-[10%]">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-px h-full" style={{ background: `linear-gradient(to bottom, transparent 0%, rgba(71, 85, 105, ${i === 3 ? '0.12' : '0.06'}) 20%, rgba(71, 85, 105, ${i === 3 ? '0.12' : '0.06'}) 80%, transparent 100%)` }} />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col justify-between py-[15%]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-px" style={{ background: "linear-gradient(to right, transparent 0%, rgba(71, 85, 105, 0.08) 20%, rgba(71, 85, 105, 0.08) 80%, transparent 100%)" }} />
        ))}
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
    </div>
  );
}

