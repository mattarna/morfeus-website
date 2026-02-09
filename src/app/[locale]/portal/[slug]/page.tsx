"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { teamMembers, globalLinks, TeamMember } from "@/app/lib/team-data";

export default function FounderPortalPage() {
  const t = useTranslations("Portal");
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [mounted, setMounted] = useState(false);
  const [member, setMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    setMounted(true);
    if (slug && teamMembers[slug]) {
      setMember(teamMembers[slug]);
    } else if (slug) {
      // If slug exists but member not found, redirect to main portal
      router.push("/portal");
    }
  }, [slug, router]);

  if (!mounted || !member) return <div className="h-screen bg-[#030508]" />;

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${member.name}
ORG:Morfeus
TITLE:${member.role}
TEL;TYPE=CELL:${member.phone}
EMAIL:${member.email}
URL:${member.linkedin}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${member.slug}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Morfeus - ${member.name}`,
          text: `${member.name} - ${member.role}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for desktop: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiato negli appunti!");
    }
  };

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
        {/* PROFILE SECTION */}
        <div className="mb-6 animate-fadeIn flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
            {/* Pulse Glow Effect */}
            <div className="absolute -inset-1 rounded-full bg-indigo-500/50 blur-md animate-pulse" />
            <div className="relative w-full h-full rounded-full border-2 border-indigo-500/30 overflow-hidden bg-[#0a0c10]">
              <Image 
                src={member.image} 
                alt={member.name} 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-1 uppercase text-center">
            {member.name}
          </h1>
          <p className="text-indigo-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8 text-center">
            {member.role}
          </p>

          {/* QUICK ACTIONS */}
          <div className="flex justify-center gap-4 md:gap-6 mb-12 w-full">
            {[
              { icon: "solar:phone-bold", label: t("call"), href: `tel:${member.phone}`, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
              { icon: "simple-icons:whatsapp", label: t("whatsapp"), href: `https://wa.me/${member.phone.replace(/\+/g, '')}`, color: "bg-green-500/10 text-green-500 border-green-500/20" },
              { icon: "solar:letter-bold", label: t("email"), href: `mailto:${member.email}`, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
              { icon: "solar:user-plus-bold", label: t("save_contact"), onClick: generateVCard, color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
            ].map((action, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                {action.href ? (
                  <a 
                    href={action.href}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-90 ${action.color} hover:scale-110`}
                  >
                    <Icon icon={action.icon} className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                ) : (
                  <button 
                    onClick={action.onClick}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-90 ${action.color} hover:scale-110`}
                  >
                    <Icon icon={action.icon} className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                )}
                <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
                  {action.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LOGO (Small separator) */}
        <div className="w-full flex items-center gap-4 mb-8 opacity-30">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-500" />
          <div className="relative w-8 h-8">
            <Image src="/favicon.ico" alt="Morfeus" fill className="object-contain grayscale" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-500" />
        </div>

        {/* BIO / TAGLINE */}
        <div className="text-center mb-10 space-y-2 animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xs md:text-sm font-mono text-indigo-400 uppercase tracking-[0.2em]">{t("bio")}</h2>
          <p className="text-slate-400 text-[10px] md:text-xs font-light tracking-wide">{t("tagline")}</p>
        </div>

        {/* LINKS LIST */}
        <div className="w-full space-y-4 mb-12">
          {globalLinks.map((link, index) => (
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
              <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r ${link.color} opacity-20 blur-sm group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative flex items-center gap-4 px-6 py-4 rounded-xl bg-[#0a0c10]/80 border border-white/5 backdrop-blur-md overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${link.color} translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-10`} />
                <Icon 
                  icon={link.icon} 
                  className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300 relative z-10" 
                />
                <span className="flex-1 text-sm font-medium tracking-wide text-slate-200 group-hover:text-white transition-colors duration-300 relative z-10">
                  {t(`links.${link.key}`)}
                </span>
                <Icon 
                  icon="solar:arrow-right-up-linear" 
                  className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" 
                />
              </div>
            </a>
          ))}
        </div>

        {/* SHARE BUTTON */}
        <button
          onClick={handleShare}
          className="w-full mb-12 py-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-mono uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 hover:bg-indigo-500/10 active:scale-95 animate-fadeIn"
          style={{ animationDelay: "800ms" }}
        >
          <Icon icon="solar:share-bold" className="w-4 h-4" />
          {t("share")}
        </button>

        {/* FOOTER */}
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
