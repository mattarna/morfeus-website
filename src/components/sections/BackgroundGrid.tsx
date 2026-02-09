"use client";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(30, 58, 95, 0.15) 0%, transparent 50%)"
        }}
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

