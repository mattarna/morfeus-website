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

  /* Spezza l'ultima parola della riga enfatizzata: e' quella che porta
     la sottolineatura. Calcolata, non scritta a mano, cosi' regge anche
     in inglese. */
  const p3 = t("headline_part3");
  const cut = p3.trimEnd().lastIndexOf(" ");
  const headlineTail =
    cut > -1 ? { head: p3.slice(0, cut + 1), last: p3.slice(cut + 1) } : { head: "", last: p3 };

  return (
    <section className="panel band ink hero-panel" data-active={active}>
      <div className="grid-anim" aria-hidden="true" />
      <div className="wrap">
        <div className="chip26 fx d1">
          <span className="dot" />
          {t("over_headline")}
        </div>

        <h1 className="hero-h1">
          <span className="fx d2 fade-1" style={{ display: "block" }}>
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
            <span className="emph">
              {/* La sottolineatura sta SOLO sull'ultima parola. Non e' una
                  scelta estetica: .u26 conteneva l'intera frase, che va a
                  capo, ed era la radice di tutti i modi in cui il segno si
                  e' rotto. Un elemento inline spezzato su due righe non ha
                  una scatola sola, quindi l'SVG assoluto dentro ci finiva
                  sopra a pezzi. Una parola sola non si spezza mai: il
                  problema sparisce invece di essere aggirato. */}
              {headlineTail.head}
              <span className="u26">
                {headlineTail.last}
                {/* Tratto unico in due passate, la seconda piu' scarica,
                    come un pennarello che ripassa. non-scaling-stroke
                    tiene lo spessore costante mentre il tracciato si
                    adatta alla larghezza della parola. */}
                <svg className="uline" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                  <path className="p1" d="M2 5.6 C 26 2.9, 62 3.3, 98 4.6" />
                  <path className="p2" d="M6 8.6 C 34 7.1, 68 7.4, 95 8.1" />
                </svg>
              </span>
            </span>
          </span>
        </h1>

        <p className="hero-sub fx d5">{t("subheadline")}</p>

        <div className="hero-ctas fx d6">
          <button className="btn btn-1" type="button" onClick={() => jumpToIndex(13)}>
            {t("cta_primary")}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="btn btn-3" type="button" onClick={() => jumpToIndex(10)}>
            {t("cta_secondary")}
          </button>
        </div>
      </div>

      {/* Il cartiglio (TAVOLA / REVISIONE / SCALA / OGGETTO) stava qui in
          basso a destra ed era l'unico elemento che teneva la hero
          asimmetrica. Con la hero centrata (approvata 2026-07-28) non c'e'
          piu' un lato libero dove appoggiarlo senza sbilanciare tutto. */}
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
/* I mini visual della home di produzione. Rappresentano il problema, non
   il servizio, ed ereditano il colore dalla riga (currentColor): tinta
   piena a riposo, Forge in hover. Le opacita' interne raccontano il
   degrado e sono tarate per restare leggibili anche senza hover. */

/** Le informazioni si fermano: un percorso che si interrompe a meta'. */
function LeakVisualFlow() {
  return (
    <svg viewBox="0 0 120 48" fill="none" aria-hidden="true">
      <line x1="10" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M58 24 H110" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.55" />
      <line x1="51" y1="13" x2="51" y2="35" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="10" cy="24" r="4" fill="currentColor" />
      <circle cx="44" cy="24" r="4" fill="currentColor" />
      <circle cx="110" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

/** Il sapere resta nella testa di pochi: tutto converge su un nodo solo. */
function LeakVisualKnowledge() {
  return (
    <svg viewBox="0 0 120 48" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.55">
        <line x1="60" y1="24" x2="16" y2="10" />
        <line x1="60" y1="24" x2="16" y2="38" />
        <line x1="60" y1="24" x2="104" y2="10" />
        <line x1="60" y1="24" x2="104" y2="38" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.8">
        <circle cx="16" cy="10" r="3" />
        <circle cx="16" cy="38" r="3" />
        <circle cx="104" cy="10" r="3" />
        <circle cx="104" cy="38" r="3" />
      </g>
      <circle cx="60" cy="24" r="12" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
      <circle cx="60" cy="24" r="6.5" fill="currentColor" />
    </svg>
  );
}

/** Lavoro che un sistema dovrebbe assorbire: una coda che si accumula. */
function LeakVisualManual() {
  return (
    <svg viewBox="0 0 120 48" fill="none" aria-hidden="true">
      <rect x="10" y="7" width="44" height="5" rx="2.5" fill="currentColor" opacity="0.4" />
      <rect x="10" y="18" width="62" height="5" rx="2.5" fill="currentColor" opacity="0.6" />
      <rect x="10" y="29" width="82" height="5" rx="2.5" fill="currentColor" opacity="0.8" />
      <rect x="10" y="40" width="100" height="5" rx="2.5" fill="currentColor" opacity="1" />
    </svg>
  );
}

/* I colori sono quelli della palette ufficiale, non i blue/indigo/purple
   di Tailwind usati in produzione: stessa progressione, tinte nostre. */
const LEAKS = [
  { key: "flow", Visual: LeakVisualFlow, tint: "var(--lilla)" },
  { key: "knowledge", Visual: LeakVisualKnowledge, tint: "#6475fa" },
  { key: "manual", Visual: LeakVisualManual, tint: "var(--firma)" },
] as const;

export function Problem({ active }: { active: boolean }) {
  const t = useTranslations("Problem");

  return (
    <section className="panel band ink tight" data-active={active}>
      <div className="wrap" style={{ width: "100%" }}>
        <div className="prob-head">
          <div>
            <div className="eye fx d1">{t("label")}</div>
            {/* 20ch spezzava "Il margine non sparisce in un giorno." (36
                caratteri) in due righe. Allargato quanto basta perche' ogni
                frase stia su una riga sola: la headline passa da tre righe
                a due, e la riga risparmiata va ai contenuti sotto. */}
            <h2
              className="h-sect fx d2"
              style={{ maxWidth: "min(100%, 820px)", margin: "10px 0 0" }}
            >
              {t("headline_1")}
              <br />
              <span style={{ color: "var(--ombra)" }}>{t("headline_2")}</span>
            </h2>
          </div>
          <p className="lead fx d3">{t("intro")}</p>
        </div>

        <div className="leaks fx d4">
          {LEAKS.map(({ key, Visual, tint }, i) => (
            <div className="leak-row" key={key}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <div className="viz" style={{ color: tint }}>
                <Visual />
              </div>
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
