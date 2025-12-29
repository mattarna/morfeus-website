"use client";

import { useEffect } from "react";

/**
 * Background - Animated background using UnicornStudio
 * 
 * Fixed position, covers entire viewport
 * Injects UnicornStudio script dynamically
 */
export function Background() {
  useEffect(() => {
    // Only inject if not already present
    if (window.UnicornStudio?.isInitialized) return;

    window.UnicornStudio = { isInitialized: false, init: () => {} };
    
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
    script.onload = () => {
      if (!window.UnicornStudio.isInitialized && window.UnicornStudio.init) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
      }}
    >
      <div className="absolute inset-0">
        <div 
          data-us-project="ILgOO23w4wEyPQOKyLO4" 
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}

// TypeScript declaration for UnicornStudio global
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}
