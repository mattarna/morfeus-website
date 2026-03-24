"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { trackPrecallEvent } from "@/lib/tracking/precall";
import { PreCallHeader } from "./PreCallHeader";
import { PreCallSectionShell } from "./PreCallSectionShell";
import { ServiceBackgroundGrid } from "./ServiceBackgroundGrid";
import { Icon } from "@iconify/react";

import { CaseStudyVisuals } from "./CaseStudyVisuals";

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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// TODO: replace with real webinar URL
const PLACEHOLDER_WEBINAR_URL = "https://example.com/webinar-recording";

interface CaseMetric {
  label: string;
  before: string;
  after: string;
  timeframe: string;
}

interface CaseStudyTemplateProps {
  locale: string;
  slug: string;
  content: {
    metaTitle: string;
    problemLabel: string;
    interventionLabel: string;
    resultsLabel: string;
    heroLabel: string;
    heroHeadline: string;
    heroSubtitle: string;
    videoPlaceholder: string;
    problemTitle: string;
    problemBody: string;
    interventionTitle: string;
    interventionBody: string;
    resultsTitle: string;
    metrics: CaseMetric[];
    quote: string;
    attribution: string;
    ctaLabel: string;
    ctaHeadline: string;
    ctaCards: {
      newsletterTitle: string;
      newsletterBody: string;
      newsletterLinkLabel: string;
      webinarTitle: string;
      webinarBody: string;
      webinarLinkLabel: string;
      linkedinTitle: string;
      linkedinBody: string;
      linkedinLinkLabel: string;
    };
  };
}

function FormattedBodyText({ text }: { text: string }) {
  return (
    <div className="space-y-6">
      {text.split(/\n\n+/).map((paragraph, idx) => (
        <motion.p
          key={idx}
          variants={fadeInUp}
          className="max-w-5xl text-2xl font-light leading-relaxed text-slate-400 pl-1"
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}

export function CaseStudyTemplate({ locale, slug, content }: CaseStudyTemplateProps) {
  useEffect(() => {
    trackPrecallEvent("precall_page_view", {
      locale,
      page_id: `case-study-${slug}`
    });
  }, [locale, slug]);

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
        <PreCallSectionShell id="precall-video" number="01" variant="transparent">
          <motion.div variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-majorelle/20 bg-majorelle/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-majorelle" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-majorelle/80">{content.heroLabel}</span>
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="max-w-4xl text-[2.5rem] font-black uppercase tracking-[-0.03em] leading-[1.1] md:text-6xl lg:text-7xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/70">
              {content.heroHeadline}
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-8 max-w-4xl text-xl font-light leading-relaxed text-slate-300">{content.heroSubtitle}</motion.p>

          <motion.div variants={fadeInUp} className="group relative mt-12 overflow-hidden rounded-[2.5rem] border border-majorelle/20 bg-black/30 shadow-2xl">
            <div className="absolute -inset-10 rounded-[4rem] opacity-[0.05] blur-[100px] bg-majorelle pointer-events-none" />
            <div className="flex aspect-video w-full items-center justify-center text-sm text-slate-500 font-mono uppercase tracking-widest">
              {content.videoPlaceholder}
            </div>
          </motion.div>
        </PreCallSectionShell>

        <PreCallSectionShell number="02" variant="deep">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-red-400">{content.problemLabel}</span>
                </div>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="mb-8 text-4xl font-black uppercase tracking-[-0.03em] leading-[1.1] text-white md:text-5xl">{content.problemTitle}</motion.h2>
              <FormattedBodyText text={content.problemBody} />
            </div>
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <CaseStudyVisuals slug={slug} type="problem" />
            </motion.div>
          </div>
        </PreCallSectionShell>

        <PreCallSectionShell number="03" variant="transparent">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-majorelle/20 bg-majorelle/5 px-4 py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-300">{content.interventionLabel}</span>
                </div>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="mb-8 text-4xl font-black uppercase tracking-[-0.03em] leading-[1.1] text-white md:text-5xl">{content.interventionTitle}</motion.h2>
              <FormattedBodyText text={content.interventionBody} />
            </div>
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <CaseStudyVisuals slug={slug} type="intervention" />
            </motion.div>
          </div>
        </PreCallSectionShell>

        <PreCallSectionShell number="04" variant="deep">
          <motion.div variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vista/20 bg-vista/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-vista" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-vista/80">{content.resultsLabel}</span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="mb-12 text-4xl font-black uppercase tracking-[-0.03em] leading-[1.1] text-white md:text-5xl">{content.resultsTitle}</motion.h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.metrics.map((metric) => (
              <motion.div
                key={`${metric.label}-${metric.after}`}
                variants={fadeInUp}
                className="group relative flex flex-col items-center text-center rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-10 transition-all duration-500 hover:border-majorelle/30 hover:bg-white/[0.05]"
              >
                <span className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-majorelle transition-colors">{metric.label}</span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black tracking-tighter text-white">{metric.after}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-mono text-slate-500">
                  <span className="line-through opacity-50">{metric.before}</span>
                  <span className="text-majorelle font-bold">→</span>
                  <span className="text-majorelle font-bold">{metric.timeframe}</span>
                </div>
                
                {/* Visual indicator (Progress Bar) */}
                <div className="w-full h-1.5 bg-white/5 rounded-full mt-8 overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-majorelle via-vista to-majorelle shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </PreCallSectionShell>

        <PreCallSectionShell number="05" variant="transparent">
          <motion.div 
            variants={fadeInUp}
            className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-10 backdrop-blur-xl md:p-16 lg:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 p-12 text-majorelle/5 pointer-events-none">
              <Icon icon="solar:double-quotes-l-bold" className="w-48 h-48" />
            </div>
            
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-majorelle/10 blur-[100px] pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-vista/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-12 relative">
                <div className="absolute inset-0 rounded-full bg-majorelle/20 blur-xl animate-pulse" />
                <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-majorelle to-indigo-800 p-[2px] shadow-2xl">
                  <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    <Icon icon="solar:user-circle-bold" className="h-16 w-16 text-majorelle/80" />
                  </div>
                </div>
              </div>
              
              <blockquote className="max-w-4xl text-2xl font-medium italic leading-relaxed text-white md:text-3xl lg:text-4xl">
                <span aria-hidden="true" className="not-italic text-majorelle/50">
                  {"\u201C"}
                </span>
                {content.quote}
                <span aria-hidden="true" className="not-italic text-majorelle/50">
                  {"\u201D"}
                </span>
              </blockquote>
              
              <div className="mt-12 flex flex-col items-center">
                <span className="text-xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  {content.attribution.split(' · ')[0]}
                </span>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-majorelle shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {content.attribution.split(' · ').slice(1).join(' · ')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </PreCallSectionShell>

        <PreCallSectionShell number="06" variant="deep">
          <motion.div variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vista/20 bg-vista/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-vista" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-vista/80">{content.ctaLabel}</span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="mb-12 max-w-4xl text-4xl font-black uppercase tracking-[-0.03em] leading-[1.1] text-white md:text-5xl">{content.ctaHeadline}</motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { 
                id: 'newsletter', 
                title: content.ctaCards.newsletterTitle, 
                body: content.ctaCards.newsletterBody, 
                label: "ISCRIVITI", 
                href: "https://matteoarnaboldi.substack.com", 
                icon: "solar:letter-bold-duotone",
                primary: true
              },
              { 
                id: 'webinar', 
                title: content.ctaCards.webinarTitle, 
                body: content.ctaCards.webinarBody, 
                label: "GUARDA ORA", 
                href: PLACEHOLDER_WEBINAR_URL, 
                icon: "solar:videocamera-record-bold-duotone" 
              },
              { 
                id: 'linkedin', 
                title: content.ctaCards.linkedinTitle, 
                body: content.ctaCards.linkedinBody, 
                label: "SEGUICI", 
                href: "https://www.linkedin.com/company/morfeus", 
                icon: "solar:share-circle-bold-duotone" 
              }
            ].map((card) => (
              <motion.div 
                key={card.id} 
                variants={fadeInUp}
                className={`group relative flex flex-col rounded-[2.5rem] border p-8 transition-all duration-500 overflow-hidden ${
                  card.primary 
                    ? 'border-majorelle/30 bg-majorelle/[0.03] hover:bg-majorelle/[0.06]' 
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                {card.primary && (
                  <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <Icon icon="solar:star-fall-bold-duotone" className="w-24 h-24 text-majorelle" />
                  </div>
                )}
                
                <div className={`mb-8 h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                  card.primary 
                    ? 'bg-majorelle/10 border-majorelle/20 group-hover:scale-110 group-hover:rotate-3' 
                    : 'bg-white/5 border-white/10 group-hover:border-vista/30'
                }`}>
                  <Icon icon={card.icon} className={`h-7 w-7 transition-colors ${
                    card.primary ? 'text-majorelle' : 'text-slate-400 group-hover:text-vista'
                  }`} />
                </div>

                <h3 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white">{card.title}</h3>
                <p className="mb-10 text-base font-light leading-relaxed text-slate-400">{card.body}</p>
                
                <div className="mt-auto pt-6 border-t border-white/5">
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackPrecallEvent("precall_case_cta_click", {
                        locale,
                        case_slug: slug,
                        target_url: card.href
                      })
                    }
                    className={`inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] transition-all ${
                      card.primary ? 'text-majorelle group-hover:gap-5' : 'text-vista group-hover:text-white group-hover:gap-5'
                    }`}
                  >
                    {card.label}
                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </PreCallSectionShell>
      </motion.div>
    </main>
  );
}
