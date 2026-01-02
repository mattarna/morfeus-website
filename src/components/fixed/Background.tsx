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
        className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden"
        style={{
          height: '100dvh',
          width: '100vw',
          maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            data-us-project="ILgOO23w4wEyPQOKyLO4" 
            className="absolute inset-0 w-full h-full scale-[1.02] md:scale-100" // Slight overscale on mobile to prevent white edges
            style={{ 
              width: '100%', 
              height: '100%',
              transformOrigin: 'center center'
            }}
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
