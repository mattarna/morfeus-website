import type { Metadata } from "next";
import { SiteShell } from "@/components/site";
import "@/components/pagine/kit.css";

/* ============================================================
   FORMAZIONE, pagina hub-of-hubs
   ------------------------------------------------------------
   Elenca i percorsi formativi come card cliccabili. Ogni percorso
   e` un hub statico gia` deployato sotto /public con slug hashato:
   la card e` un semplice <a href> assoluto (non <Link>, sono fuori
   dal router Next).

   La pagina e` INTERNA: noindex nel layout.tsx, non compare in
   sitemap (non aggiunta a INDEXABLE_LOCALE_PATHS) e non e` in
   SiteHeader / SiteFooter. Vive solo per chi conosce /formazione.

   Copy solo IT: la struttura tiene EN pronta per traduzione futura,
   ma per ora i due oggetti sono identici a livello di stringhe.
   ============================================================ */

type Props = { params: Promise<{ locale: string }> };

type Percorso = {
  chiave: string;
  href: string;
  titolo: string;
  sottotitolo: string;
  quota1: string;
  quota2: string;
};

const COPY = {
  it: {
    metaTitle: "Formazione · percorsi interni · Morfeus",
    eye: "Libreria · percorsi interni",
    h1: "Formazione",
    lead: "I percorsi Morfeus, ognuno con la sua libreria di lezioni. L'accesso e` riservato: hai ricevuto un link, quello e` la porta.",
    apri: "Apri il percorso",
    nota: "Altri percorsi sono in costruzione. Vengono aggiunti qui appena sono pronti.",
    percorsi: [
      {
        chiave: "founder-mastery",
        href: "/founder-mastery-453eb9d7f8/",
        titolo: "Founder Mastery",
        sottotitolo:
          "Il mestiere dell'operatore-fondatore: come si manda avanti e si fa crescere un'azienda piccola e agile.",
        quota1: "82 lezioni",
        quota2: "4 Atti · Sopravvivere, Uscire dalle tue mani, Guidare il team, Moltiplicare",
      },
      {
        chiave: "marketing-mastery",
        href: "/marketing-mastery-f254dcab0c/index.html",
        titolo: "Marketing Mastery",
        sottotitolo:
          "Come si costruisce un'acquisizione che funziona: mercato, offerta, canale, misura.",
        quota1: "In corso di produzione",
        quota2: "Livello 0 completo + Blocco A · il mercato",
      },
      {
        chiave: "formazione-morfeus",
        href: "/formazione-morfeus-bf0efbde6e/",
        titolo: "Formazione Morfeus",
        sottotitolo:
          "Le fondamenta: il Metodo Morfeus e il Corso Claude. La base su cui poggia tutto il resto.",
        quota1: "141 lezioni",
        quota2: "Metodo Morfeus · Corso Claude · Materiale avanzato",
      },
    ] as Percorso[],
  },
  en: {
    metaTitle: "Formazione · percorsi interni · Morfeus",
    eye: "Libreria · percorsi interni",
    h1: "Formazione",
    lead: "I percorsi Morfeus, ognuno con la sua libreria di lezioni. L'accesso e` riservato: hai ricevuto un link, quello e` la porta.",
    apri: "Apri il percorso",
    nota: "Altri percorsi sono in costruzione. Vengono aggiunti qui appena sono pronti.",
    percorsi: [
      {
        chiave: "founder-mastery",
        href: "/founder-mastery-453eb9d7f8/",
        titolo: "Founder Mastery",
        sottotitolo:
          "Il mestiere dell'operatore-fondatore: come si manda avanti e si fa crescere un'azienda piccola e agile.",
        quota1: "82 lezioni",
        quota2: "4 Atti · Sopravvivere, Uscire dalle tue mani, Guidare il team, Moltiplicare",
      },
      {
        chiave: "marketing-mastery",
        href: "/marketing-mastery-f254dcab0c/index.html",
        titolo: "Marketing Mastery",
        sottotitolo:
          "Come si costruisce un'acquisizione che funziona: mercato, offerta, canale, misura.",
        quota1: "In corso di produzione",
        quota2: "Livello 0 completo + Blocco A · il mercato",
      },
      {
        chiave: "formazione-morfeus",
        href: "/formazione-morfeus-bf0efbde6e/",
        titolo: "Formazione Morfeus",
        sottotitolo:
          "Le fondamenta: il Metodo Morfeus e il Corso Claude. La base su cui poggia tutto il resto.",
        quota1: "141 lezioni",
        quota2: "Metodo Morfeus · Corso Claude · Materiale avanzato",
      },
    ] as Percorso[],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  return {
    title: { absolute: t.metaTitle },
  };
}

export default async function FormazionePage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";

  return (
    <SiteShell locale={safeLocale}>
      <section className="band ink pg" id="hero">
        <div className="wrap">
          <div className="eye">{t.eye}</div>
          <h1>{t.h1}</h1>
          <p className="copy" style={{ maxWidth: 720, marginTop: 20 }}>
            {t.lead}
          </p>
        </div>
      </section>

      <section className="band ink pg" id="percorsi" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 22,
              marginTop: 8,
            }}
            className="grid-percorsi"
          >
            {t.percorsi.map((p) => (
              <a
                key={p.chiave}
                href={p.href}
                className="scheda"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span className="filo" aria-hidden />
                <span className="cod">{p.titolo}</span>
                <p style={{ marginTop: 14, flex: 1 }}>{p.sottotitolo}</p>
                <div
                  style={{
                    marginTop: 22,
                    paddingTop: 18,
                    borderTop: "1px solid var(--surf-bd)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <span className="quota">{p.quota1}</span>
                  <span className="quota">{p.quota2}</span>
                </div>
                <span
                  style={{
                    marginTop: 20,
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--lilla)",
                  }}
                >
                  {t.apri} &nbsp;→
                </span>
              </a>
            ))}
          </div>
          <p
            style={{
              marginTop: 40,
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--ombra)",
            }}
          >
            {t.nota}
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .grid-percorsi { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 620px) {
          .grid-percorsi { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SiteShell>
  );
}
