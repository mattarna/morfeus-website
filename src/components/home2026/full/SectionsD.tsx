"use client";

/**
 * HOME 2026 · sezioni 12-14: FAQ, CTA finale, Footer.
 * Copy identico alla home di produzione (stesse chiavi next-intl).
 */

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { jumpToIndex } from "../engine/useDemoScroll";

const BOOKING_URL =
  "https://marf.alexcarofiglio.com/book/morfeushub?utm_source=website&utm_medium=organic&utm_campaign=website";

/* ============ [12] FAQ · INCHIOSTRO ============ */

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function FaqPanel({ active }: { active: boolean }) {
  const t = useTranslations("FAQ");
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="panel band ink" data-active={active}>
      <div className="wrap" style={{ width: "100%", maxWidth: 1080 }}>
        <h2
          className="h-sect fx d1"
          style={{ textAlign: "center", marginInline: "auto", maxWidth: "26ch" }}
        >
          {t("headline_1")} <span className="emph">{t("headline_2")}</span>
        </h2>

        <div className="faq-grid fx d2">
          {FAQ_KEYS.map((key) => {
            const open = openKey === key;
            return (
              <div className="faq-item" data-open={open} key={key}>
                <button type="button" onClick={() => setOpenKey(open ? null : key)}>
                  <span>{t(`items.${key}.question`)}</span>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="body">
                  <div>
                    <p>{t(`items.${key}.answer`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ [13] CTA FINALE · CARTA ============ */

export function CtaPanel({ active }: { active: boolean }) {
  const t = useTranslations("CTA");

  return (
    <section className="panel band carta" data-active={active}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <h2 className="cta-h" style={{ marginInline: "auto", maxWidth: "18ch" }}>
          <span className="fx d1" style={{ display: "block" }}>
            {t("headline_1")}
          </span>
          <span className="fx d2" style={{ display: "block" }}>
            {t("headline_2")}
          </span>
          <span className="fx d3" style={{ display: "block" }}>
            <span className="marker-hl">{t("headline_3")}</span>
          </span>
        </h2>

        <p
          className="lead fx d4"
          style={{ marginInline: "auto", marginTop: 22, textAlign: "center" }}
        >
          {t("subheadline")}
        </p>

        <div
          className="fx d5"
          style={{
            marginTop: 34,
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            {t("primary")}
          </a>
          <a className="btn btn-3" href="mailto:hello@morfeushub.com">
            {t("secondary")}
          </a>
        </div>

        <div className="fx d6" style={{ marginTop: 30 }}>
          <span className="cta-chip">
            <span className="dot" />
            {t("microcopy")}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============ [14] FOOTER · INCHIOSTRO ============ */

export function FooterPanel({ active }: { active: boolean }) {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const navItems = [
    { label: t("links.start"), index: 0 },
    { label: t("links.vision"), index: 1 },
    { label: t("links.problem"), index: 2 },
    { label: t("links.services"), index: 3 },
    { label: t("links.method"), index: 5 },
    { label: t("links.roi"), index: 9 },
    { label: t("links.roiometer"), index: 10 },
    { label: t("links.cases"), index: 11 },
    { label: t("links.faq"), index: 12 },
    { label: t("links.book"), index: 13 },
  ];

  return (
    <section className="panel band ink" data-active={active}>
      <div className="wrap foot-grid fx d1">
        {/* Col 1: navigazione */}
        <div>
          <h4>{t("nav")}</h4>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flink"
              onClick={() => jumpToIndex(item.index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Col 2: social */}
        <div>
          <h4>{t("social")}</h4>
          <a href="https://www.linkedin.com/company/morfeus-hub-ai/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            X (Twitter)
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            Youtube
          </a>
        </div>

        {/* Col 3: info */}
        <div>
          <h4>{t("info")}</h4>
          <a href={`/${locale}/privacy`}>{t("privacy")}</a>
          <a href={`/${locale}/cookies`}>Cookie Policy</a>
        </div>

        {/* Col 4: brand + contatti */}
        <div className="foot-brandcol">
          <p className="foot-pill">
            {locale === "it" ? (
              <>
                <span style={{ color: "var(--anomalia)" }}>Pillola rossa</span>
                <span style={{ color: "var(--ombra)" }}> o </span>
                <span style={{ color: "var(--lilla)" }}>pillola blu</span>
                <span style={{ color: "#c6c4d8" }}>. A te la scelta.</span>
              </>
            ) : (
              <>
                <span style={{ color: "var(--anomalia)" }}>Red pill</span>
                <span style={{ color: "var(--ombra)" }}> or </span>
                <span style={{ color: "var(--lilla)" }}>blue pill</span>
                <span style={{ color: "#c6c4d8" }}>. The choice is yours.</span>
              </>
            )}
          </p>

          <div className="foot-meta">
            <a className="mail" href="mailto:hello@morfeushub.com">
              hello@morfeushub.com
            </a>
            <br />
            Milano, Italia
            <br />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>P.IVA 14209210963</span>
          </div>

          <div className="foot-legal">
            ©{year} Morfeus. {t("copyright")}
            <br />
            <span className="love">Made with love, by Morfeus and a lot of AI. 💜</span>
          </div>
        </div>
      </div>

      {/* filigrana + stato sistema */}
      <div className="foot-mark" aria-hidden="true">
        <Image
          src="/images/brand/morfeus-mark.png"
          alt=""
          fill
          sizes="1100px"
          style={{ objectFit: "contain", filter: "brightness(0.9) saturate(1.3)" }}
        />
      </div>
      <div className="foot-status">
        <span className="dot" />
        System Operational
      </div>
    </section>
  );
}
