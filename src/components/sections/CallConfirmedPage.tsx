"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { PreCallHeader } from "./PreCallHeader";
import { PreCallSectionShell } from "./PreCallSectionShell";
import { PreCallForm } from "./PreCallForm";
import { ServiceBackgroundGrid } from "./ServiceBackgroundGrid";
import { trackPrecallEvent } from "@/lib/tracking/precall";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

/** Pre-call VSL — https://youtu.be/rsau3BV5Yx0 */
const CALL_CONFIRMED_VIDEO_EMBED = "https://www.youtube.com/embed/rsau3BV5Yx0";
const PRECALL_VIDEO_LINKEDIN = CALL_CONFIRMED_VIDEO_EMBED;
const PRECALL_VIDEO_COLDEMAIL = CALL_CONFIRMED_VIDEO_EMBED;
// TODO: replace with real backend URL if needed
const PRECALL_INTAKE_ENDPOINT = "/api/precall-intake";

type SearchValue = string | string[] | undefined;

function getSingle(value: SearchValue): string {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }
  return "";
}

interface CallConfirmedPageProps {
  locale: string;
  searchParams: Record<string, SearchValue>;
  text: {
    badge: string;
    preTitle: string;
    headlineWithName: string;
    headlineWithoutName: string;
    durationLabel: string;
    dateFallback: string;
    videoLabel: string;
    videoTitle: string;
    videoPlaceholder: string;
    videoDescription: string;
    agendaLabel: string;
    agendaTitle: string;
    agendaSubtitle: string;
    agendaCards: ReadonlyArray<{ step: string; title: string; body: string }>;
    agendaDisclaimer: string;
    prepLabel: string;
    prepTitle: string;
    prepSubtitle: string;
    prepItems: ReadonlyArray<{ icon: string; title: string; body: string }>;
    credibilityLabel: string;
    credibilityTitle: string;
    credibilityBody: string;
    stats: ReadonlyArray<string>;
    logosLabel: string;
    form: {
      preLabel: string;
      title: string;
      subtitle: string;
      submitLabel: string;
      submittingLabel: string;
      privacyNote: string;
      statusTitle: string;
      statusBody: string;
      statusFallback: string;
      fields: {
        sector: string;
        revenue: string;
        friction: string;
        repeatingProblem: string;
        repeatingProblemPlaceholder: string;
      };
      options: {
        sector: ReadonlyArray<{ label: string; value: string }>;
        revenue: ReadonlyArray<{ label: string; value: string }>;
        friction: ReadonlyArray<{ label: string; value: string }>;
      };
      errors: {
        generic: string;
      };
    };
  };
}

export function CallConfirmedPage({ locale, searchParams, text }: CallConfirmedPageProps) {
  const name = getSingle(searchParams.name);
  const date = getSingle(searchParams.date);
  const time = getSingle(searchParams.time);
  const source = getSingle(searchParams.source);
  const form = getSingle(searchParams.form);
  const headline = name
    ? text.headlineWithName.replace("{name}", name)
    : text.headlineWithoutName;

  const slotText = date && time ? `${date} · ${time} · ${text.durationLabel}` : text.dateFallback;

  const videoVariant = source === "cold_email" ? "cold_email" : "linkedin";
  const selectedVideoUrl =
    videoVariant === "cold_email" ? PRECALL_VIDEO_COLDEMAIL : PRECALL_VIDEO_LINKEDIN;
  const isPlaceholderVideo =
    !selectedVideoUrl || selectedVideoUrl.includes("example.com");

  useEffect(() => {
    trackPrecallEvent("precall_page_view", {
      locale,
      page_id: "call-confirmed",
      source: source || "unknown"
    });
  }, [locale, source]);

  useEffect(() => {
    trackPrecallEvent("precall_video_variant_loaded", {
      locale,
      source: source || "unknown",
      variant: videoVariant
    });
  }, [locale, source, videoVariant]);

  const logos = useMemo(
    () => [
      { name: "Club Moritzino", src: "/images/clients-white/Club_Moritzino.png" },
      { name: "H-FARM", src: "/images/clients-white/H-FARM.png" },
      { name: "Studio Rotella", src: "/images/clients-white/Studio_Rotella.png" },
      { name: "Victor", src: "/images/clients-white/Victor.png" },
      { name: "Common", src: "/images/clients-white/Common.png" },
      { name: "Confcommercio", src: "/images/clients-white/Confcommercio.png" },
    ],
    []
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050508] pb-24 text-white">
      <ServiceBackgroundGrid />
      <PreCallHeader locale={locale} />

      <motion.div 
        className="pt-24"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <PreCallSectionShell number="01" variant="transparent">
          <motion.div variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 backdrop-blur-md">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                {text.badge}
              </span>
            </div>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">{text.preTitle}</motion.p>
          <motion.h1 variants={fadeInUp} className="max-w-4xl text-[2.5rem] font-black uppercase tracking-[-0.03em] leading-[1.1] md:text-6xl lg:text-7xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/70">
              {headline}
            </span>
          </motion.h1>
          <motion.div variants={fadeInUp} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-vista/80 backdrop-blur-sm">
            <Icon icon="solar:calendar-bold" className="h-4 w-4" />
            {slotText}
          </motion.div>

          {/* VSL - Moved here for Above the Fold visibility */}
          {locale === "it" && (
            <motion.div variants={fadeInUp} className="mt-16">
              <div className="group relative overflow-hidden rounded-[2rem] border border-majorelle/20 bg-black/30 shadow-2xl">
                <div className="absolute -inset-10 rounded-[4rem] opacity-[0.05] blur-[100px] bg-majorelle pointer-events-none" />
                {isPlaceholderVideo ? (
                  <div className="flex aspect-video items-center justify-center gap-3 text-slate-300">
                    <Icon icon="solar:play-circle-bold" className="h-12 w-12 text-majorelle opacity-80 group-hover:scale-110 transition-transform duration-500" />
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60">{text.videoPlaceholder}</span>
                  </div>
                ) : (
                  <iframe
                    src={selectedVideoUrl}
                    title={text.videoTitle}
                    className="aspect-video w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
              <p className="mt-8 max-w-4xl text-lg font-light leading-relaxed text-slate-400">
                {text.videoDescription}
              </p>
            </motion.div>
          )}
        </PreCallSectionShell>

        <PreCallSectionShell number="02" variant="deep">
          <motion.div variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vista/20 bg-vista/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-vista" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-vista/80">{text.agendaLabel}</span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="mb-8 max-w-4xl text-4xl font-black uppercase tracking-[-0.03em] leading-[1.1] text-white md:text-5xl lg:text-6xl">
            {text.agendaTitle}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mb-12 text-2xl font-light leading-relaxed text-slate-400">{text.agendaSubtitle}</motion.p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {text.agendaCards.map((card, idx) => (
              <motion.article 
                key={card.step} 
                variants={fadeInUp}
                className="group relative rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-10 transition-all duration-500 hover:border-majorelle/30 hover:bg-white/[0.05]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-majorelle">{card.step}</span>
                  <div className="h-12 w-12 rounded-xl bg-majorelle/10 flex items-center justify-center border border-majorelle/20 opacity-40 group-hover:opacity-100 transition-opacity">
                    <Icon icon={["solar:chart-2-bold-duotone", "solar:medal-star-bold-duotone", "solar:map-bold-duotone"][idx]} className="h-6 w-6 text-majorelle" />
                  </div>
                </div>
                <h3 className="mb-6 text-2xl font-bold uppercase tracking-tight text-white">{card.title}</h3>
                <p className="text-xl font-light leading-relaxed text-slate-400">{card.body}</p>
              </motion.article>
            ))}
          </div>
          <motion.div variants={fadeInUp} className="mt-12 rounded-2xl border border-forge/20 bg-[#1a110a] p-8 text-base font-light leading-relaxed text-forge/80">
            <div className="flex items-center gap-3 mb-4">
              <Icon icon="solar:danger-bold" className="h-6 w-6 text-forge" />
              <span className="font-bold uppercase tracking-widest text-xs">Attenzione</span>
            </div>
            {text.agendaDisclaimer}
          </motion.div>
        </PreCallSectionShell>

        <PreCallSectionShell number="03" variant="transparent">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vista/20 bg-vista/5 px-4 py-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-vista" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-vista/80">{text.prepLabel}</span>
              </div>
              <h2 className="mb-8 text-4xl font-black uppercase tracking-[-0.03em] leading-[1.1] text-white md:text-5xl">
                {text.prepTitle}
              </h2>
              <p className="text-2xl font-light leading-relaxed text-slate-400">{text.prepSubtitle}</p>
            </motion.div>
            <div className="space-y-6">
              {text.prepItems.map((item) => (
                <motion.article 
                  key={item.title} 
                  variants={fadeInUp}
                  className="group rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-5xl grayscale group-hover:grayscale-0 transition-all duration-500">{item.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-3">{item.title}</h3>
                      <p className="text-xl font-light leading-relaxed text-slate-400">{item.body}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </PreCallSectionShell>

        <PreCallSectionShell number="04" variant="deep">
          <motion.div variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vista/20 bg-vista/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-vista" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-vista/80">{text.credibilityLabel}</span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="mb-8 max-w-4xl text-4xl font-black uppercase tracking-[-0.03em] leading-[1.1] text-white md:text-5xl lg:text-6xl">
            {text.credibilityTitle}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mb-12 text-2xl font-light leading-relaxed text-slate-400 max-w-4xl">{text.credibilityBody}</motion.p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
            {text.stats.map((stat) => (
              <motion.div 
                key={stat} 
                variants={fadeInUp}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center"
              >
                <span className="text-lg font-bold uppercase tracking-[0.1em] text-vista/70">{stat}</span>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeInUp} className="pt-12 border-t border-white/5">
            <p className="text-lg font-bold uppercase tracking-[0.3em] text-slate-500 mb-12">{text.logosLabel}</p>
            <div className="grid grid-cols-2 gap-12 md:grid-cols-3 items-center">
              {logos.map((logo) => (
                <div 
                  key={logo.name} 
                  className="relative h-20 w-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 md:h-24"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </PreCallSectionShell>

        <PreCallSectionShell number="05" variant="transparent">
          <PreCallForm
            locale={locale}
            endpoint={PRECALL_INTAKE_ENDPOINT}
            source={source}
            callDate={date}
            callTime={time}
            initialComplete={form === "complete"}
            text={text.form}
          />
        </PreCallSectionShell>
      </motion.div>
    </main>
  );
}
