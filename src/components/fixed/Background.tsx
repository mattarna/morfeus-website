"use client";

import Script from "next/script";

/**
 * Background - Animated background using UnicornStudio
 * 
 * Fixed position, covers entire viewport
 * Injects UnicornStudio script using next/script for optimization
 */
export function Background() {
  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
            window.UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
          }
        }}
      />
      
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
    </>
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
