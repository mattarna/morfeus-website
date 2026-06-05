import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./sections.module.css";

export function SalesFooterSection() {
  const muted: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 11,
    lineHeight: 1.6,
    color: "var(--muted)",
    opacity: 0.75,
  };

  return (
    <footer
      className={styles.footerInner}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/m-w.png" alt="Morfeus" style={{ height: 20, display: "block" }} />
          <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
            morfeushub.com
          </span>
          <span aria-hidden style={{ color: "var(--muted)", opacity: 0.4 }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/claude-unlocked/logo-mark-light.png"
              alt="Claude Unlocked"
              style={{ height: 22, width: 22, display: "block", borderRadius: 5 }}
            />
            <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.85 }}>
              Claude Unlocked
            </span>
          </span>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)", display: "flex", gap: 16 }}>
          <Link href="/it/privacy" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Privacy Policy</Link>
          <Link href="/it/cookies" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Cookie Policy</Link>
          <Link href="/it/termini-corso" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Termini e Condizioni</Link>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={muted}>
          <strong style={{ color: "var(--muted)", opacity: 1 }}>Disclaimer:</strong> I prodotti e servizi venduti su questo sito non costituiscono proiezione, promessa o garanzia di guadagno. I risultati individuali possono variare e dipendono dall&apos;impegno, dall&apos;esperienza e dalle condizioni individuali di ciascun partecipante.
        </p>
        <p style={muted}>
          Il Corso Claude Morfeus è un prodotto formativo indipendente. Claude è un marchio di Anthropic, PBC. Questo corso non è affiliato a, sponsorizzato da, o approvato da Anthropic.
        </p>
        <p style={muted}>
          Questo contenuto rispetta le linee guida AGCM in materia di correttezza pubblicitaria e pratiche commerciali.
        </p>
        <p style={{ ...muted, marginTop: 6 }}>
          Morfeus Hub S.r.l. — P.IVA 14209210963 — Milano, Italia
        </p>
        <p style={{ ...muted, marginTop: 4, opacity: 1 }}>
          © 2026 Morfeus Hub S.r.l. — Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
