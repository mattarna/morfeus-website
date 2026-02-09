"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { globalLinks } from "@/app/lib/team-data";

export default function GeneralPortalPage() {
  const t = useTranslations("Portal");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-screen bg-[#030508]" />;

  return (
    <div className="relative min-h-screen w-full bg-[#030508] text-white flex flex-col items-center px-6 py-12 overflow-x-hidden font-sans">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 20%, rgba(77, 57, 235, 0.12) 0%, transparent 70%)"
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
        
        {/* Architectural Grid Lines */}
        <div className="absolute inset-0 flex justify-around opacity-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-px h-full bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* LOGO SECTION */}
        <div className="mb-12 animate-fadeIn">
          <div className="relative w-56 h-20 transition-transform duration-500 hover:scale-105">
            <Image 
              src="/images/m-w2.png" 
              alt="Morfeus Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* BIO SECTION */}
        <div className="text-center mb-16 space-y-4 animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <h1 className="text-sm md:text-base font-mono text-indigo-400 uppercase tracking-[0.25em] font-bold px-4 leading-relaxed">
            {t("bio")}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-light tracking-widest uppercase opacity-80">
            {t("tagline")}
          </p>
        </div>

        {/* SEPARATOR */}
        <div className="w-full flex items-center gap-4 mb-12 opacity-20">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white" />
          <Icon icon="solar:planet-linear" className="w-4 h-4 text-white" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white" />
        </div>

        {/* LINKS LIST */}
        <div className="w-full space-y-4 mb-16">
          {globalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full transition-all duration-300 active:scale-[0.98]"
              style={{ 
                animation: `fadeIn 0.6s ease-out forwards ${300 + index * 100}ms`,
                opacity: 0 
              }}
            >
              <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r ${link.color} opacity-20 blur-sm group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative flex items-center gap-5 px-6 py-5 rounded-xl bg-[#0a0c10]/80 border border-white/5 backdrop-blur-md overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${link.color} translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-10`} />
                <Icon 
                  icon={link.icon} 
                  className="w-7 h-7 text-slate-300 group-hover:text-white transition-colors duration-300 relative z-10" 
                />
                <span className="flex-1 text-base font-medium tracking-wide text-slate-200 group-hover:text-white transition-colors duration-300 relative z-10">
                  {t(`links.${link.key}`)}
                </span>
                <Icon 
                  icon="solar:arrow-right-up-linear" 
                  className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" 
                />
              </div>
            </a>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-auto text-[10px] font-mono text-slate-700 uppercase tracking-[0.5em] animate-fadeIn" style={{ animationDelay: "900ms" }}>
          System Operational • 2026
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
