"use client";

/**
 * HOME 2026 · sezioni 3-8: Services, Partners, ProcessHeadline, Process pinnato.
 * Copy identico alla home di produzione (stesse chiavi next-intl).
 */

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import { jumpToIndex } from "../engine/useDemoScroll";

/* ============ [3] SERVICES · CARTA ============ */

/* Le icone sono le stesse della home di produzione: lucide:network per
   MARF (il Context Hub e' una rete di nodi) e lucide:library per Morf Lab. */
const SERVICE_KEYS = [
  { key: "forge", href: "/forge", icon: "lucide:network" },
  { key: "lab", href: "/lab", icon: "lucide:library" },
] as const;

export function ServicesPanel({ active }: { active: boolean }) {
  const t = useTranslations("Services");
  const locale = useLocale();

  return (
    <section className="panel band carta" data-active={active}>
      <div className="wrap" style={{ width: "100%" }}>
        <div className="svc-head">
          <h2 className="h-sect fx d1" style={{ margin: 0, maxWidth: "16ch" }}>
            {t("title_part1")} <span className="emph">{t("title_part2")}</span>
          </h2>
          <p className="lead fx d2" style={{ maxWidth: "44ch" }}>
            {t("subtitle")}
          </p>
        </div>

        <div className="svc-grid">
          {SERVICE_KEYS.map(({ key, href, icon }, i) => (
            <div className={`svc-card fx d${3 + i}`} key={key}>
              <div className="ck-row">
                <span className="ck-icon" aria-hidden="true">
                  <Icon icon={icon} width={22} />
                </span>
                <span className="ck">{t(`items.${key}.name`)}</span>
              </div>
              <h3>{t(`items.${key}.headline`)}</h3>
              <p>{t(`items.${key}.description`)}</p>
              <div className="ctas">
                <button className="btn btn-1" type="button" onClick={() => jumpToIndex(13)}>
                  {t(`items.${key}.cta_primary`)}
                </button>
                <a className="btn btn-3" href={`/${locale}${href}`}>
                  {t(`items.${key}.cta_secondary`)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ [4] PARTNERS · INCHIOSTRO ============ */

const PARTNERS = [
  { name: "H-FARM", image: "/images/clients-white/H-FARM.png" },
  { name: "Asseprim", image: "/images/clients-white/Asseprim.png" },
  { name: "Sisal", image: "/images/clients-white/Sisal.png" },
  { name: "Sole 24h Formazione", image: "/images/clients-white/Sole_24_Ore.png" },
  { name: "Edison", image: "/images/clients-white/Edison.png" },
  { name: "Zara", image: "/images/clients-white/Zara.png" },
] as const;

export function PartnersPanel({ active }: { active: boolean }) {
  const t = useTranslations("Partners");

  return (
    <section className="panel band ink" data-active={active}>
      <div className="wrap" style={{ width: "100%", textAlign: "center" }}>
        <div className="eye fx d1">Track record</div>
        <h2 className="h-sect fx d2" style={{ marginInline: "auto" }}>
          {t("title")}
        </h2>

        <div className="plogo-grid fx d3">
          {PARTNERS.map((p) => (
            <div className="plogo" key={p.name}>
              <div className="img">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 900px) 45vw, 300px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ [5] PROCESS HEADLINE · CARTA (solo desktop, come in produzione) ============ */

export function ProcessHeadlinePanel({ active }: { active: boolean }) {
  const t = useTranslations("Process");

  return (
    <section className="panel band carta only-desktop" data-active={active}>
      <div className="wrap">
        <h2 className="giant-h fx d1">{t("headline")}</h2>
        <div className="giant-rule fx d2" />
      </div>
    </section>
  );
}

/* ============ [6·7·8] PROCESS · INCHIOSTRO · pinnato, un solo fuoco centrale ============
   Regia come la home di produzione: una passata alla volta, a tutto schermo.
   Numero fantasma gigante dietro, titolo enorme, descrizione.
   In basso la barra a 3 segmenti racconta dove sei nella sequenza. */

const STEP_KEYS = ["understand", "build", "automate"] as const;

export function ProcessPanel({
  active,
  step,
  isDesktop,
}: {
  active: boolean;
  step: 0 | 1 | 2 | 3;
  isDesktop: boolean;
}) {
  const t = useTranslations("Process");
  /* Prima di entrare nella sezione lo step è 0: tienilo sulla passata 1
     così l'ingresso non parte dal vuoto. Su mobile niente pinning. */
  const effStep = isDesktop ? (step === 0 ? 1 : step) : 3;

  return (
    <section className="panel band ink" data-active={active}>
      {/* i cerchi delle passate: uno per Comprendere, due per Costruire, tre per Automatizzare */}
      <div className="met-rings" data-step={effStep} aria-hidden="true">
        <div className="glow" />
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <circle cx="500" cy="500" r="230" className="ring r1" pathLength={1} />
          <circle cx="500" cy="500" r="345" className="ring r2" pathLength={1} />
          <circle cx="500" cy="500" r="465" className="ring r3" pathLength={1} />
        </svg>
      </div>

      <div className="wrap met-wrap">
        <div className="met-stage">
          {STEP_KEYS.map((key, idx) => {
            const n = (idx + 1) as 1 | 2 | 3;
            const state = !isDesktop
              ? "active"
              : effStep === n
                ? "active"
                : effStep > n
                  ? "past"
                  : "future";
            return (
              <div className="met-pane" data-state={state} key={key}>
                <span className="met-ghost" aria-hidden="true">
                  {String(n).padStart(2, "0")}
                </span>
                <div className="met-eye">
                  {t("headline")} · {String(n).padStart(2, "0")} / 03
                </div>
                <h3 className="met-title">{t(`${key}.title`)}</h3>
                <p className="met-desc">{t(`${key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
