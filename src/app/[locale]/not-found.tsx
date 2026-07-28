"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { SiteShell } from "@/components/site";
import { Glifo } from "@/components/pagine/Glifo";
import "@/components/pagine/kit.css";

/* ============================================================
   404, nel sistema `.ms`.
   ------------------------------------------------------------
   Quella di prima era una pagina a se': fondo nero, glitch della
   Matrix, bottoni a pillola bianchi, nessun header e nessun
   footer. Non somigliava a niente del resto del sito, e
   soprattutto lasciava chi ci finiva in un vicolo cieco: due
   bottoni, uno dei quali "torna indietro".

   Una 404 fa un lavoro solo: rimettere in strada. Quindi barra e
   footer come ovunque, e in mezzo le destinazioni vere, non un
   messaggio di errore piu' elegante.

   Client component per un motivo solo: useLocale(). In app router
   not-found.tsx non riceve params, e la lingua serve per i link.
   ============================================================ */

const COPY = {
  it: {
    eye: "Errore 404",
    h1a: "Questa pagina ",
    h1emph: "non esiste",
    h1b: ".",
    lead: "Puo' essere un indirizzo scritto male, un link vecchio o una pagina che abbiamo spostato. In ogni caso non c'e' niente da recuperare qui: qui sotto c'e' dove volevi probabilmente andare.",
    dove: "Dove andare",
    voci: [
      { slug: "", glifo: "bersaglio", t: "Home", d: "Da dove parte tutto." },
      { slug: "metodo", glifo: "elenco", t: "Metodo", d: "Come lavoriamo, passo per passo." },
      { slug: "casi", glifo: "medaglia", t: "Casi", d: "Aziende vere, numeri verificati." },
      { slug: "marf", glifo: "cpu", t: "MARF", d: "Il cruscotto operativo." },
      { slug: "lab", glifo: "stella", t: "LAB", d: "La formazione sui processi reali." },
      { slug: "insights", glifo: "curvaSu", t: "Insights", d: "Gli articoli." },
    ],
    ctaP: "Prenota una chiamata",
    ctaS: "Scrivici",
  },
  en: {
    eye: "Error 404",
    h1a: "This page ",
    h1emph: "does not exist",
    h1b: ".",
    lead: "It might be a mistyped address, an old link or a page we moved. Either way there is nothing to recover here: below is where you were probably heading.",
    dove: "Where to go",
    voci: [
      { slug: "", glifo: "bersaglio", t: "Home", d: "Where everything starts." },
      { slug: "metodo", glifo: "elenco", t: "Method", d: "How we work, step by step." },
      { slug: "casi", glifo: "medaglia", t: "Cases", d: "Real companies, verified numbers." },
      { slug: "marf", glifo: "cpu", t: "MARF", d: "The operating dashboard." },
      { slug: "lab", glifo: "stella", t: "LAB", d: "Training on real workflows." },
      { slug: "insights", glifo: "curvaSu", t: "Insights", d: "The articles." },
    ],
    ctaP: "Book a call",
    ctaS: "Write to us",
  },
} as const;

export default function NotFound() {
  const raw = useLocale();
  const locale: "it" | "en" = raw === "it" ? "it" : "en";
  const t = COPY[locale];
  const base = `/${locale}`;

  return (
    <SiteShell locale={locale}>
      <section className="band ink pg">
        <div className="wrap text-center">
          <div className="eye">{t.eye}</div>
          <h1 className="h-sect">
            {t.h1a}
            <span className="emph">{t.h1emph}</span>
            {t.h1b}
          </h1>
          <p className="lead">{t.lead}</p>

          {/* Il numero non e' il protagonista: e' una quota a margine,
              come su un disegno tecnico. Il protagonista sono le sei
              destinazioni. */}
          <div className="quota-404" aria-hidden="true">
            404
          </div>
        </div>
      </section>

      <section className="band carta pg">
        <div className="wrap">
          <div className="eye">{t.dove}</div>
          <div className="colonne">
            {t.voci.map((v) => (
              <Link key={v.t} href={v.slug ? `${base}/${v.slug}` : base} className="colonna">
                <Glifo nome={v.glifo} />
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </Link>
            ))}
          </div>

          <div className="cta-row centrata">
            <Link className="btn btn-1" href={`${base}/roiometro`}>
              {t.ctaP}
            </Link>
            <a className="btn btn-2-ink" href="mailto:hello@morfeushub.com">
              {t.ctaS}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
