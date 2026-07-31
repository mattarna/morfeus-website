"use client";

import { useTranslations, useLocale } from "next-intl";

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

  /* ANIMATO IN CSS, NON IN JAVASCRIPT, e sempre montato.
     Prima era un motion.div dentro AnimatePresence, con initial
     opacity 0 e translateY(-100%). Il difetto di quell'impianto e' il
     modo in cui FALLISCE: se l'animazione non parte -- per qualunque
     ragione, da una libreria che non si inizializza a un tab che non
     compone frame -- l'elemento resta allo stato iniziale, cioe'
     invisibile e fuori schermo, e il menu non si apre. E' quello che
     succedeva su /forge e /lab, dove il bottone diventava ✕ ma non
     compariva niente.
     In CSS il fallimento e' grazioso: se la transizione non parte,
     l'elemento e' comunque nello stato finale, quindi si vede. Per un
     menu di navigazione questa differenza non e' un dettaglio.
     E' lo stesso impianto di HomeHeader, il menu della home, che
     funziona. */
  return (
    <div
      aria-hidden={!isOpen}
      /* `inert` e non solo pointer-events: il pannello ora resta sempre
         nel documento, e senza questo i suoi tredici bottoni sarebbero
         raggiungibili col tasto Tab anche a menu chiuso -- il fuoco
         sparirebbe dentro una cosa invisibile. `inert` spegne tutto il
         sottoalbero: clic, fuoco, lettori di schermo. */
      inert={!isOpen}
      className={`fixed inset-0 z-150 bg-black md:hidden flex flex-col pt-24 pb-8 px-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
          {/* Subtle grid lines background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white" />
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-white" />
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between overflow-y-auto">
            {/* Nav Links */}
            <div className="flex flex-col gap-1">
              {SECTION_IDS.map((id, i) => (
                <button
                  key={id}
                  onClick={() => handleLinkClick(id)}
                  /* entrano una dopo l'altra: il ritardo e' inline
                     perche' dipende dall'indice, e Tailwind non genera
                     classi da valori calcolati */
                  style={{ transitionDelay: isOpen ? `${120 + i * 30}ms` : "0ms" }}
                  className={`flex items-center gap-4 py-3 text-left group transition-all duration-500 ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
                  }`}
                >
                  <span className="text-[10px] font-mono text-indigo-500/50 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                    {t(id)}
                  </span>
                </button>
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
                  <a href="mailto:hello@morfeushub.com" className="text-sm text-white font-medium">hello@morfeushub.com</a>
                </div>
                <div className="flex gap-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors">LI</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors">IG</a>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}
