"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { teamMembers, globalLinks, TeamMember } from "@/app/lib/team-data";

export default function FounderPortalPage() {
  const t = useTranslations("Portal");
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [mounted, setMounted] = useState(false);
  const [member, setMember] = useState<TeamMember | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Decrypt Animation Effect
  const decryptName = useCallback((targetName: string) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayName(
        targetName
          .split("")
          .map((letter, index) => {
            if (index < iteration) return targetName[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= targetName.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
    if (slug && teamMembers[slug]) {
      setMember(teamMembers[slug]);
      decryptName(teamMembers[slug].name);
    } else if (slug) {
      router.push("/portal");
    }
  }, [slug, router, decryptName]);

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
    link.setAttribute("download", `${member.slug}-morfeus.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Morfeus - ${member.name}`,
          text: member.tagline,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030508] text-white flex flex-col items-center px-6 py-10 overflow-x-hidden font-sans">
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
        {/* HEADER: PROFILE PIC & NAME */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="relative w-36 h-36 mb-6">
            <div className="absolute -inset-2 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
            <div className="relative w-full h-full rounded-full border-2 border-indigo-500/30 p-1 bg-[#0a0c10]">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase h-9">
            {displayName}
          </h1>
          <div className="flex flex-col gap-2">
            <span className="text-indigo-400 font-mono text-xs md:text-sm uppercase tracking-[0.3em] font-bold">
              {member.role}
            </span>
            <span className="text-slate-400 text-sm md:text-base font-light tracking-wide italic">
              &quot;{member.tagline}&quot;
            </span>
          </div>
        </div>

        {/* SECTION 1: DIRECT CONTACT */}
        <div className="w-full mb-12 animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-800" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Contatto Diretto</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-800" />
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { icon: "solar:phone-bold", href: `tel:${member.phone}`, color: "text-emerald-400 bg-emerald-400/10" },
              { icon: "simple-icons:whatsapp", href: `https://wa.me/${member.phone.replace(/\+/g, '')}`, color: "text-green-400 bg-green-400/10" },
              { icon: "solar:letter-bold", href: `mailto:${member.email}`, color: "text-blue-400 bg-blue-400/10" },
              { icon: "simple-icons:linkedin", href: member.linkedin, color: "text-indigo-400 bg-indigo-400/10" },
            ].map((act, i) => (
              <a 
                key={i} 
                href={act.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`aspect-square rounded-2xl flex items-center justify-center border border-white/5 transition-all active:scale-90 ${act.color} hover:scale-105`}
              >
                <Icon icon={act.icon} className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* CONTACT DETAILS TEXT */}
          <div className="flex flex-col gap-3 mb-8 px-2">
            <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
              <Icon icon="solar:letter-linear" className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-mono tracking-wider">{member.email}</span>
            </a>
            <a href={`tel:${member.phone}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
              <Icon icon="solar:phone-linear" className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-mono tracking-wider">{member.phone}</span>
            </a>
          </div>

          {/* HERO ACTION: SAVE CONTACT */}
          <button 
            onClick={generateVCard}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all active:scale-[0.98]"
          >
            <Icon icon="solar:user-plus-bold" className="w-5 h-5" />
            {t("save_contact")}
          </button>
        </div>

        {/* SECTION 2: MORFEUS ECOSYSTEM */}
        <div className="w-full mb-12 animate-fadeIn" style={{ animationDelay: "600ms" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-800" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Morfeus Ecosystem</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-800" />
          </div>

          <div className="space-y-4">
            {globalLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative block w-full active:scale-[0.98] transition-all"
              >
                <div className="relative flex items-center gap-4 px-6 py-5 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm overflow-hidden group-hover:bg-white/[0.06] transition-colors">
                  <Icon icon={link.icon} className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                  <span className="flex-1 text-base font-medium text-slate-300 group-hover:text-white transition-colors">
                    {t(`links.${link.key}`)}
                  </span>
                  <Icon icon="solar:arrow-right-up-linear" className="w-5 h-5 text-slate-600 group-hover:text-white transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SHARE & FOOTER */}
        <button 
          onClick={handleShare} 
          className="w-full py-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center gap-3 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-xs font-mono uppercase tracking-[0.2em] mb-12 animate-fadeIn"
          style={{ animationDelay: "800ms" }}
        >
          <Icon icon="solar:share-bold" className="w-4 h-4" />
          {t("share")}
        </button>

        <div className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em] animate-fadeIn" style={{ animationDelay: "900ms" }}>
          System Operational • 2026
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] animate-toastIn">
          <div className="px-6 py-3 rounded-full bg-indigo-600 text-white text-[10px] font-mono uppercase tracking-widest shadow-2xl border border-white/20">
            [ SISTEMA: LINK COPIATO ]
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-toastIn {
          animation: toastIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
