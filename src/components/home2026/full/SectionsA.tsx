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
          {/* part2 e' vuota nel copy B2B (la headline sta in due righe di
              testo + la riga enfatizzata): saltata, per non lasciare uno
              span a vuoto in mezzo. */}
          {t("headline_part2") ? (
            <span className="fx d3" style={{ display: "block" }}>
              {t("headline_part2")}
            </span>
          ) : null}
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

/* ============ [2] I VALUE LEAK · INCHIOSTRO ============ */

/* I VALUE LEAK — allineata alla home di produzione: la sezione non e'
   piu' "Il Problema" (4 anomalie + scheda di rilievo con una cifra
   inventata), ma tre righe che nominano dove esce il margine.
   La cifra della vecchia scheda era un placeholder: toglierla e' parte
   del punto, il numero arriva dalla diagnosi, non dalla home. */
const LEAK_KEYS = ["flow", "knowledge", "manual"] as const;

export function Problem({ active }: { active: boolean }) {
  const t = useTranslations("Problem");

  return (
    <section className="panel band ink tight" data-active={active}>
      <div className="wrap" style={{ width: "100%" }}>
        <div className="prob-head">
          <div>
            <div className="eye fx d1">{t("label")}</div>
            <h2 className="h-sect fx d2" style={{ maxWidth: "20ch", margin: "10px 0 0" }}>
              {t("headline_1")}
              <br />
              <span style={{ color: "var(--ombra)" }}>{t("headline_2")}</span>
            </h2>
          </div>
          <p className="lead fx d3">{t("intro")}</p>
        </div>

        <div className="leaks fx d4">
          {LEAK_KEYS.map((key, i) => (
            <div className="leak-row" key={key}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(`leaks.${key}.title`)}</h3>
              <p>{t(`leaks.${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <p className="leak-closing fx d5">{t("closing")}</p>
      </div>
    </section>
  );
}
