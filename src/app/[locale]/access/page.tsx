"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AccessPage() {
  const t = useTranslations("Access");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-screen bg-[#030508]" />;

  const links = [
    {
      title: t("links.homepage_it"),
      url: "https://www.morfeushub.com/it",
      icon: "solar:home-2-linear",
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: t("links.homepage_en"),
      url: "https://www.morfeushub.com/en",
      icon: "solar:global-linear",
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: t("links.ai_espresso"),
      url: "https://matteoarnaboldi.substack.com/",
      icon: "solar:letter-linear",
      color: "from-orange-500 to-red-600",
    },
    {
      title: t("links.linkedin"),
      url: "https://www.linkedin.com/company/morfeus-hub-ai/",
      icon: "simple-icons:linkedin",
      color: "from-blue-700 to-indigo-800",
    },
    {
      title: t("links.youtube"),
      url: "https://www.youtube.com/@MorfeusHub",
      icon: "simple-icons:youtube",
      color: "from-red-600 to-rose-700",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#030508] text-white flex flex-col items-center px-6 py-12 overflow-x-hidden font-sans">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 20%, rgba(77, 57, 235, 0.1) 0%, transparent 70%)"
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
        <div className="mb-8 animate-fadeIn">
          <div className="relative w-48 h-16 transition-transform duration-500 hover:scale-105">
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
        <div className="text-center mb-10 space-y-2 animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <h1 className="text-xs md:text-sm font-mono text-indigo-400 uppercase tracking-[0.2em]">{t("bio")}</h1>
          <p className="text-slate-400 text-[10px] md:text-xs font-light tracking-wide">{t("tagline")}</p>
        </div>

        {/* LINKS LIST */}
        <div className="w-full space-y-4 mb-12">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full transition-all duration-300 active:scale-[0.98]"
              style={{ 
                animation: `fadeIn 0.6s ease-out forwards ${200 + index * 100}ms`,
                opacity: 0 
              }}
            >
              {/* Button Outer Glow */}
              <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r ${link.color} opacity-20 blur-sm group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Button Inner Body */}
              <div className="relative flex items-center gap-4 px-6 py-4 rounded-xl bg-[#0a0c10]/80 border border-white/5 backdrop-blur-md overflow-hidden">
                {/* Hover Slide Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${link.color} translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-10`} />
                
                <Icon 
                  icon={link.icon} 
                  className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300 relative z-10" 
                />
                
                <span className="flex-1 text-sm font-medium tracking-wide text-slate-200 group-hover:text-white transition-colors duration-300 relative z-10">
                  {link.title}
                </span>

                <Icon 
                  icon="solar:arrow-right-up-linear" 
                  className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" 
                />
              </div>
            </a>
          ))}
        </div>

        {/* FOOTER / SOCIALS */}
        <div className="flex gap-8 text-slate-500 animate-fadeIn" style={{ animationDelay: "800ms" }}>
          <a href="https://www.linkedin.com/company/morfeus-hub-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Icon icon="simple-icons:linkedin" className="w-5 h-5" />
          </a>
          <a href="https://x.com/MorfeusHub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Icon icon="simple-icons:x" className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/@MorfeusHub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Icon icon="simple-icons:youtube" className="w-5 h-5" />
          </a>
        </div>
        
        <div className="mt-8 text-[10px] font-mono text-slate-600 uppercase tracking-widest animate-fadeIn" style={{ animationDelay: "900ms" }}>
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
