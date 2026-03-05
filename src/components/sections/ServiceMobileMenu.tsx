"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_IDS = [
  "hero",
  "proof",
  "problem-analysis",
  "belief-shift",
  "comparison",
  "how-it-works",
  "assets",
  "filter",
  "roi-section",
  "pricing",
  "way-out",
  "contact",
  "faq"
] as const;

interface ServiceMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

export function ServiceMobileMenu({ isOpen, onClose, scrollToSection }: ServiceMobileMenuProps) {
  const t = useTranslations("Offerta.nav_timeline");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "it" : "en";

  const handleLinkClick = (id: string) => {
    scrollToSection(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[150] bg-black md:hidden flex flex-col pt-24 pb-8 px-6"
        >
          {/* Subtle grid lines background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white" />
            <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-white" />
            <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between overflow-y-auto">
            {/* Nav Links */}
            <div className="flex flex-col gap-1">
              {SECTION_IDS.map((id, i) => (
                <motion.button
                  key={id}
                  onClick={() => handleLinkClick(id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-4 py-3 text-left group"
                >
                  <span className="text-[10px] font-mono text-indigo-500/50 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                    {t(id)}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom: Language & Socials */}
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-6">
              {/* Language Switch */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Language</span>
                <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10">
                  <a 
                    href={`/${locale}`}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                      locale === locale ? "bg-indigo-600 text-white" : "text-slate-400"
                    }`}
                  >
                    {locale.toUpperCase()}
                  </a>
                  <a 
                    href={`/${otherLocale}`}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all text-slate-400 hover:text-white`}
                  >
                    {otherLocale.toUpperCase()}
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Contact</span>
                  <a href="mailto:info@morfeushub.com" className="text-sm text-white font-medium">info@morfeushub.com</a>
                </div>
                <div className="flex gap-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors">LI</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors">IG</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
