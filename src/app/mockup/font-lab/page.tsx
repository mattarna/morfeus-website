"use client";

/**
 * /font-lab — confronto dei font del corpo.
 *
 * Nasce da un fallimento del metodo precedente: un toggle ?body= che
 * cambiava font a ogni ricarica. Una differenza di altezza-x del 10% NON
 * si vede confrontando a memoria fra due caricamenti — l'occhio si
 * riadatta. Qui i candidati stanno tutti sulla stessa schermata, stesso
 * testo e stesso corpo, cosi' la differenza e' misurabile a colpo d'occhio.
 *
 * Pagina di lavoro, fuori dal sito: non usa SiteShell, non e' indicizzata.
 */

import { useState } from "react";
import {
  bodyInter,
  bodyJakarta,
  bodyManrope,
  clashDisplay,
  jetbrainsMono,
  satoshi,
} from "@/components/site/fonts";

/* x-height e cap-height sono misurati sulla tabella OS/2 dei file reali
   per Satoshi e Clash. Per i tre da Google sono i valori pubblicati dalle
   rispettive fonderie: non ho i .ttf per verificarli qui (arrivano come
   woff2 compresso), quindi sono dichiarati come tali. */
const FONTS = [
  {
    key: "satoshi",
    label: "Satoshi",
    note: "attuale",
    varName: satoshi.variable,
    css: "var(--font-satoshi)",
    x: "0.500",
    misurato: true,
  },
  {
    key: "jakarta",
    label: "Plus Jakarta Sans",
    note: "scelta del DS B2B",
    varName: bodyJakarta.variable,
    css: "var(--font-body-jakarta)",
    x: "~0.53",
    misurato: false,
  },
  {
    key: "inter",
    label: "Inter",
    note: "il piu' neutro",
    varName: bodyInter.variable,
    css: "var(--font-body-inter)",
    x: "~0.55",
    misurato: false,
  },
  {
    key: "manrope",
    label: "Manrope",
    note: "via di mezzo",
    varName: bodyManrope.variable,
    css: "var(--font-body-manrope)",
    x: "~0.53",
    misurato: false,
  },
] as const;

const HEADLINE = "Il margine non sparisce in un giorno.";
const COPY =
  "Morfeus entra nei tuoi processi, individua i Value Leak e li traduce in euro. Costruiamo i sistemi AI che li chiudono, formiamo le persone che li fanno funzionare e misuriamo il valore recuperato ogni mese.";
const LABEL = "VALUE RECOVERY SYSTEM";

export default function FontLabPage() {
  const [size, setSize] = useState(18);
  const [solo, setSolo] = useState<string | null>(null);
  const [dark, setDark] = useState(true);

  const shown = solo ? FONTS.filter((f) => f.key === solo) : FONTS;
  const allVars = FONTS.map((f) => f.varName)
    .concat(clashDisplay.variable, jetbrainsMono.variable)
    .join(" ");

  const bg = dark ? "#0B0B0C" : "#E4E7F0";
  const fg = dark ? "#E4E7F0" : "#0B0B0C";
  const dim = dark ? "rgba(228,231,240,.55)" : "rgba(11,11,12,.62)";
  const line = dark ? "rgba(228,231,240,.14)" : "rgba(11,11,12,.14)";

  return (
    <div
      className={allVars}
      style={{
        minHeight: "100vh",
        background: bg,
        color: fg,
        padding: "40px clamp(20px, 5vw, 64px) 80px",
        fontFamily: "var(--font-jbmono), monospace",
      }}
    >
      {/* ---- comandi ---- */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 10,
          paddingBottom: 20,
          borderBottom: `1px solid ${line}`,
          marginBottom: 36,
        }}
      >
        <Btn on={solo === null} onClick={() => setSolo(null)} dark={dark}>
          Confronto
        </Btn>
        {FONTS.map((f) => (
          <Btn key={f.key} on={solo === f.key} onClick={() => setSolo(f.key)} dark={dark}>
            {f.label}
          </Btn>
        ))}

        <span style={{ width: 24 }} />

        {[16, 18, 20, 24].map((s) => (
          <Btn key={s} on={size === s} onClick={() => setSize(s)} dark={dark}>
            {s}px
          </Btn>
        ))}

        <span style={{ width: 24 }} />
        <Btn on={false} onClick={() => setDark(!dark)} dark={dark}>
          {dark ? "fascia chiara" : "fascia scura"}
        </Btn>
      </div>

      {shown.map((f) => (
        <section key={f.key} style={{ marginBottom: 56 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              marginBottom: 14,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: dim,
            }}
          >
            <strong style={{ color: fg, fontSize: 13 }}>{f.label}</strong>
            <span>{f.note}</span>
            <span style={{ marginLeft: "auto" }}>
              altezza-x {f.x} {f.misurato ? "(misurata)" : "(dichiarata)"}
            </span>
          </div>

          {/* occhiello in mono: resta uguale fra i candidati, e' il riferimento */}
          <div
            style={{
              fontFamily: "var(--font-jbmono), monospace",
              fontSize: 13,
              letterSpacing: "0.16em",
              color: dim,
              marginBottom: 10,
            }}
          >
            {LABEL}
          </div>

          {/* headline: sempre Clash, non e' la variabile in esame */}
          <h2
            style={{
              fontFamily: "var(--font-clash), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 3.2vw, 44px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              margin: "0 0 14px",
              maxWidth: "20ch",
            }}
          >
            {HEADLINE}
          </h2>

          {/* il paragrafo e' l'unica cosa che cambia */}
          <p
            style={{
              fontFamily: `${f.css}, system-ui, sans-serif`,
              fontSize: size,
              lineHeight: 1.6,
              maxWidth: "62ch",
              margin: "0 0 16px",
              color: dark ? "rgba(228,231,240,.88)" : "rgba(11,11,12,.86)",
            }}
          >
            {COPY}
          </p>

          {/* stesso font anche sul bottone: le CTA lo usano */}
          <button
            type="button"
            style={{
              fontFamily: `${f.css}, system-ui, sans-serif`,
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              background: "#533DFC",
              border: 0,
              borderRadius: 8,
              padding: "13px 22px",
              cursor: "pointer",
            }}
          >
            Prenota una chiamata
          </button>
        </section>
      ))}

      <p style={{ fontSize: 12, color: dim, maxWidth: "70ch", lineHeight: 1.7 }}>
        Guarda le MINUSCOLE, non i titoli: la headline e l&apos;occhiello sono
        identici in tutti i blocchi apposta, servono da riferimento fisso. La
        differenza sta nell&apos;altezza delle lettere basse a parita&apos; di
        font-size — e si vede solo mettendo i paragrafi uno sotto l&apos;altro.
      </p>
    </div>
  );
}

function Btn({
  children,
  on,
  onClick,
  dark,
}: {
  children: React.ReactNode;
  on: boolean;
  onClick: () => void;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: "var(--font-jbmono), monospace",
        fontSize: 13,
        padding: "9px 14px",
        borderRadius: 999,
        cursor: "pointer",
        border: `1px solid ${on ? "#533DFC" : dark ? "rgba(228,231,240,.2)" : "rgba(11,11,12,.2)"}`,
        background: on ? "#533DFC" : "transparent",
        color: on ? "#fff" : dark ? "#E4E7F0" : "#0B0B0C",
      }}
    >
      {children}
    </button>
  );
}
