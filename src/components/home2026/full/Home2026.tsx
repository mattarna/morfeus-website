"use client";

/**
 * HOME 2026 · candidata brand 2026 della home ufficiale.
 * Stessa struttura, stesso scroll, stesso copy della home online (15 indici,
 * Process pinnato 6-8), messa in scena "Dossier": fasce piene carta/inchiostro
 * che si sfogliano come pagine. Unica sezione ridisegnata: Problem.
 */

import "@/components/site/site.css";
import "../demo.css";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { siteFontVars } from "@/components/site/fonts";
import { HomeBackground } from "@/components/fixed/HomeBackground";
import { DemoStage, type RailPoint } from "../engine/DemoStage";
import {
  getDemoProcessStep,
  jumpToIndex,
  useDemoStore,
  useIsDesktop,
} from "../engine/useDemoScroll";
import { Hero, ManifestoPanel, Problem } from "./SectionsA";
import { PartnersPanel, ProcessHeadlinePanel, ProcessPanel, ServicesPanel } from "./SectionsB";
import { CasesPanel, RoiMeterPanel, RoiSystemPanel } from "./SectionsC";
import { CtaPanel, FaqPanel, FooterPanel } from "./SectionsD";

/* Fascia per indice: decide anche il colore dell'header fisso. */
const BAND: ("ink" | "carta")[] = [
  "ink", // 0 hero
  "carta", // 1 manifesto
  "ink", // 2 problem
  "carta", // 3 services
  "ink", // 4 partners
  "carta", // 5 process headline
  "ink", // 6 process
  "ink", // 7 process
  "ink", // 8 process
  "carta", // 9 roi system
  "ink", // 10 roiometro
  "carta", // 11 cases
  "ink", // 12 faq
  "carta", // 13 cta
  "ink", // 14 footer
];

export function Home2026() {
  const i = useDemoStore((s) => s.currentIndex);
  const isDesktop = useIsDesktop();
  const locale = useLocale();
  const tFooter = useTranslations("Footer");
  const tHero = useTranslations("Hero");

  /* Su mobile tutte le sezioni sono attive (scroll nativo, niente snap). */
  const act = (n: number) => !isDesktop || i === n;
  const actProcess = !isDesktop || (i >= 6 && i <= 8);
  const step = getDemoProcessStep(i);

  const railPoints: RailPoint[] = [
    { label: tFooter("links.start"), index: 0, range: [0, 0] },
    { label: tFooter("links.vision"), index: 1, range: [1, 1] },
    { label: tFooter("links.problem"), index: 2, range: [2, 2] },
    { label: tFooter("links.services"), index: 3, range: [3, 3] },
    { label: locale === "it" ? "Partner" : "Partners", index: 4, range: [4, 4] },
    { label: tFooter("links.method"), index: 5, range: [5, 8] },
    { label: tFooter("links.roi"), index: 9, range: [9, 9] },
    { label: tFooter("links.roiometer"), index: 10, range: [10, 10] },
    { label: tFooter("links.cases"), index: 11, range: [11, 11] },
    { label: tFooter("links.faq"), index: 12, range: [12, 12] },
    { label: tFooter("links.book"), index: 13, range: [13, 14] },
  ];

  /* Marchio ufficiale (stesso SVG di SiteHeader, tre "onde"). */

  /* Nav reale cross-pagina (esce dalla home verso le pagine 2026). */
  const navItems: [string, string][] =
    locale === "en"
      ? [
          ["chi-siamo", "About"],
          ["metodo", "Method"],
          ["forge", "MARF"],
          ["lab", "LAB"],
          ["casi", "Cases"],
          ["insights", "Insights"],
        ]
      : [
          ["chi-siamo", "Chi siamo"],
          ["metodo", "Metodo"],
          ["forge", "MARF"],
          ["lab", "LAB"],
          ["casi", "Casi"],
          ["insights", "Insights"],
        ];

  const header = (
    <header className="top-header" data-band={BAND[i]}>
      {/* Logo ufficiale: e' un'immagine (mark + wordmark gia' disegnati),
          non un SVG piu' testo in Clash Display. Il wordmark del brand ha
          un lettering proprio, non e' un font di sistema. */}
      <button
        className="wordmark"
        type="button"
        onClick={() => jumpToIndex(0)}
        aria-label="Morfeus, torna all'inizio"
      >
        <Image
          src="/images/brand/morfeus-mark.png"
          alt="Morfeus"
          width={130}
          height={16}
          priority
        />
      </button>

      <nav className="topnav" aria-label="Pagine del sito">
        {navItems.map(([slug, label]) => (
          <Link key={slug} href={`/${locale}/${slug}`}>
            {label}
          </Link>
        ))}
      </nav>

      <div className="topright">
        {/* Toggle lingua, mancava del tutto in questa home */}
        <a className="langswitch" href={`/${locale === "it" ? "en" : "it"}/home-2026`}>
          <span data-on={locale === "it"}>IT</span>
          <span aria-hidden="true">/</span>
          <span data-on={locale === "en"}>EN</span>
        </a>
        <button className="btn btn-1" type="button" onClick={() => jumpToIndex(13)}>
          {tHero("cta_primary")}
        </button>
      </div>
    </header>
  );

  return (
    <div className={`ms d26 d26-bg ${siteFontVars}`}>
      {/* Sfondo animato UnicornStudio, lo stesso della home di produzione.
          E' fixed a z-index:-1: perche' si veda, le fasce scure devono
          essere trasparenti (vedi .d26-bg in demo.css). */}
      <HomeBackground />
      <DemoStage points={railPoints} header={header}>
        <div id="h26-0">
          <Hero active={act(0)} />
        </div>
        <div id="h26-1">
          <ManifestoPanel active={act(1)} />
        </div>
        <div id="h26-2">
          <Problem active={act(2)} />
        </div>
        <div id="h26-3">
          <ServicesPanel active={act(3)} />
        </div>
        <div id="h26-4">
          <PartnersPanel active={act(4)} />
        </div>
        <div id="h26-5">
          <ProcessHeadlinePanel active={act(5)} />
        </div>
        <div id="h26-6">
          <ProcessPanel active={actProcess} step={step} isDesktop={isDesktop} />
        </div>
        <div id="h26-9">
          <RoiSystemPanel active={act(9)} />
        </div>
        <div id="h26-10">
          <RoiMeterPanel active={act(10)} />
        </div>
        <div id="h26-11">
          <CasesPanel active={act(11)} />
        </div>
        <div id="h26-12">
          <FaqPanel active={act(12)} />
        </div>
        <div id="h26-13">
          <CtaPanel active={act(13)} />
        </div>
        <div id="h26-14">
          <FooterPanel active={act(14)} />
        </div>
      </DemoStage>
    </div>
  );
}
