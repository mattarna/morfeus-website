"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_LINK_IDS = ["hero", "how-it-works", "comparison", "roi-section", "pricing", "contact"] as const;

export function ServiceFooter() {
  const t = useTranslations("Offerta.landing_footer");

  return (
    <footer id="footer" className="relative z-[150] bg-[#0a111a] border-t border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] pt-24 pb-32 px-6 xl:px-40 overflow-visible">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="flex flex-col gap-8 items-center md:items-start">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">{t("nav_title")}</h4>
            <ul className="flex flex-col gap-4 items-center md:items-start">
              {NAV_LINK_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-lg text-slate-400 hover:text-white transition-colors font-light"
                  >
                    {t(`nav_links.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8 items-center md:items-start">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">{t("info_title")}</h4>
            <ul className="flex flex-col gap-4 items-center md:items-start">
              <li>
                <Link href="/privacy" className="text-lg text-slate-400 hover:text-white transition-colors font-light">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-lg text-slate-400 hover:text-white transition-colors font-light">
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-2 items-center lg:items-end">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">{t("contact_title")}</h4>
            <div className="flex flex-col gap-3 items-center lg:items-end">
              <a href="mailto:hello@morfeushub.com" className="text-2xl md:text-4xl font-black text-white hover:text-indigo-400 transition-colors text-center lg:text-right">
                hello@morfeushub.com
              </a>
              <p className="text-lg text-slate-500 font-light tracking-wide">{t("location")}</p>
              <p className="text-xs font-mono text-slate-700 uppercase tracking-widest mt-4">P.IVA 14209210963</p>
            </div>
          </div>
        </div>

        <div className="mb-24 text-center">
          <div className="h-px w-12 bg-white/10 mx-auto mb-8" />
          <p className="text-[11px] md:text-[13px] font-black tracking-[0.3em] uppercase text-center">
            {t.rich("brand_quote", {
              spanRose: (chunks) => <span className="text-rose-500">{chunks}</span>,
              spanOr: (chunks) => <span className="text-slate-500 mx-3">{chunks}</span>,
              spanIndigo: (chunks) => <span className="text-indigo-500">{chunks}</span>,
              spanSub: (chunks) => <span className="text-slate-400">{chunks}</span>
            })}
          </p>
        </div>

        <div className="pt-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-8 opacity-30 grayscale brightness-200">
                <Image src="/images/m-w2.png" alt="Morfeus" fill className="object-contain" />
              </div>
              <p className="text-[10px] text-slate-700 font-mono tracking-widest uppercase text-center md:text-left">
                © {new Date().getFullYear()} Morfeus. {t("copyright")}
              </p>
            </div>
            <p className="text-[11px] text-slate-600 font-light flex items-center gap-2 uppercase tracking-widest text-center md:text-right">
              <span className="text-indigo-500 text-lg">◆</span>
              {t("made_by")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
