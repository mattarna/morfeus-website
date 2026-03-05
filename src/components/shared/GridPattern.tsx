"use client";

export function GridPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Radial Gradient Glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(83, 61, 252, 0.05) 0%, transparent 100%)"
        }}
      />
      
      {/* Vertical Lines */}
      <div className="absolute inset-0 flex justify-between px-[5%] md:px-[10%]">
        {[...Array(7)].map((_, i) => (
          <div 
            key={i} 
            className="w-px h-full" 
            style={{ 
              background: `linear-gradient(to bottom, transparent 0%, rgba(140, 165, 247, ${i === 3 ? '0.08' : '0.04'}) 20%, rgba(140, 165, 247, ${i === 3 ? '0.08' : '0.04'}) 80%, transparent 100%)` 
            }} 
          />
        ))}
      </div>

      {/* Horizontal Lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-[10%]">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="w-full h-px" 
            style={{ 
              background: "linear-gradient(to right, transparent 0%, rgba(140, 165, 247, 0.03) 20%, rgba(140, 165, 247, 0.03) 80%, transparent 100%)" 
            }} 
          />
        ))}
      </div>

      {/* Grain / Noise */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />
    </div>
  );
}
