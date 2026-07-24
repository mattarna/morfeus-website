"use client";

/**
 * HOME 2026 · sezioni 0-2: Hero, Manifesto, Problem.
 * Copy identico alla home di produzione (stesse chiavi next-intl).
 * Problem è l'unica sezione RIDISEGNATA (da dashboard SaaS a scheda di rilievo).
 */

import { useTranslations } from "next-intl";
import { jumpToIndex } from "../engine/useDemoScroll";

/* ============ [0] HERO · INCHIOSTRO ============ */

export function Hero({ active }: { active: boolean }) {
  const t = useTranslations("Hero");

  return (
    <section className="panel band ink hero-panel" data-active={active}>
      <div className="grid-anim" aria-hidden="true" />
      <div className="wrap">
        <div className="chip26 fx d1">
          <span className="dot" />
          {t("over_headline")}
        </div>

        <h1 className="hero-h1">
          <span className="fx d2" style={{ display: "block" }}>
            {t("headline_part1")}
          </span>
          <span className="fx d3" style={{ display: "block" }}>
            {t("headline_part2")}
          </span>
          <span className="fx d4" style={{ display: "block" }}>
            <span className="emph u26">
              {t("headline_part3")}
              <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                <path className="dr" d="M2 7 Q 30 3 55 6 T 98 5" pathLength={1} />
              </svg>
            </span>
          </span>
        </h1>

        <p className="hero-sub fx d5">{t("subheadline")}</p>

        <div className="hero-ctas fx d6">
          <button className="btn btn-1" type="button" onClick={() => jumpToIndex(13)}>
            {t("cta_primary")}
          </button>
          <button className="btn btn-3" type="button" onClick={() => jumpToIndex(10)}>
            {t("cta_secondary")}
          </button>
        </div>
      </div>

      <div className="cartiglio fx d7">
        {[
          ["Tavola", "01 / 14"],
          ["Revisione", "2026.07"],
          ["Scala", "1 : 1"],
          ["Oggetto", "Recupero margine"],
        ].map(([k, v]) => (
          <div className="row" key={k}>
            <span>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ [1] MANIFESTO · CARTA ============ */

export function ManifestoPanel({ active }: { active: boolean }) {
  const t = useTranslations("Manifesto");

  return (
    <section className="panel band carta" data-active={active}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="eye fx d1">Vision</div>
        <p className="manifesto-txt fx d2" style={{ margin: "24px auto 0" }}>
          {t("text")}
        </p>
        <div className="manifesto-sign fx d3">Progettato. Provato.</div>
      </div>
    </section>
  );
}

/* ============ [2] PROBLEM · INCHIOSTRO · ridisegnata come scheda di rilievo ============ */

const PAIN_KEYS = ["costs", "talent", "processes", "data"] as const;

const BREAKDOWN = [
  { key: "ops", value: 38 },
  { key: "decisions", value: 27 },
  { key: "waste", value: 22 },
  { key: "errors", value: 13 },
] as const;

export function Problem({ active }: { active: boolean }) {
  const t = useTranslations("Problem");
  const headlineParts = t("headline").split(".");

  return (
    <section className="panel band ink tight" data-active={active}>
      <div className="wrap" style={{ width: "100%" }}>
        {/* testata orizzontale: titolo + lead affiancati */}
        <div className="prob-head">
          <h2 className="h-sect fx d1" style={{ maxWidth: "20ch", margin: 0 }}>
            {headlineParts[0]}.
            {headlineParts[1] ? <span style={{ color: "var(--ombra)" }}>{headlineParts[1]}</span> : null}
          </h2>
          <p className="lead fx d2">{t("body")}</p>
        </div>

        <div className="prob-grid">
          {/* SINISTRA · anomalie in griglia 2×2 */}
          <div className="anomalie fx d3">
            {PAIN_KEYS.map((key, i) => (
              <div className="anomalia-row" key={key}>
                <span className="n">A{String(i + 1).padStart(2, "0")}</span>
                <h3>{t(`cards.${key}.title`)}</h3>
                <p>{t(`cards.${key}.desc`)}</p>
              </div>
            ))}
          </div>

          {/* DESTRA · la scheda di rilievo */}
          <div className="scheda fx d4">
          <div className="sk-label">{t("ticker.label")}</div>
          <div className="sk-value">
            €47.000<small>/ MESE</small>
          </div>
          <p className="sk-sub">{t("ticker.sub")}</p>

          <div className="sk-bars">
            {BREAKDOWN.map((item) => (
              <div className="sk-bar" key={item.key}>
                <div className="top">
                  <span>{t(`ticker.breakdown.${item.key}`)}</span>
                  <b>{item.value}%</b>
                </div>
                <div className="track">
                  <div className="fill" style={{ "--w": `${item.value}%` } as React.CSSProperties} />
                </div>
              </div>
            ))}
          </div>

          <div className="sk-cta">
            <button
              className="btn btn-1"
              type="button"
              style={{ width: "100%" }}
              onClick={() => jumpToIndex(10)}
            >
              {t("cta")}
            </button>
            <p className="sk-note">{t("microcopy")}</p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
