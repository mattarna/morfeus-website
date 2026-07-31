import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { ArchivioCasi } from "@/components/pagine/casi/ArchivioCasi";
import "@/components/pagine/kit.css";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";
import { CASI, PROBLEMI, type ChiaveProblema } from "@/lib/casi";

/* ============================================================
   CASI, pagina hub. Rifatta sul copy approvato 2026-07-28.
   ------------------------------------------------------------
   RITMO: tesi, esplorazione, chiave di lettura, azione.
     hero            ink     la tesi, senza linguaggio da portfolio
     archivio        CARTA   tutti i casi, subito
     come si legge   ink     la chiave di lettura
     CTA             ink     l'azione

   TOLTE il 2026-07-29, su richiesta di Matt: la fascia "parti dal
   tuo problema" e il caso in evidenza. Chi arriva su questa pagina
   vuole vedere i casi, non due schermate di preambolo prima di
   arrivarci: l'archivio filtra gia' per conto suo.

   Il filtro per problema NON e' morto: l'archivio lo legge ancora
   da ?problema=..., quindi i link condivisi e quelli in arrivo da
   altre pagine aprono la lista gia' filtrata. E' sparito solo il
   menu che lo pilotava da qui.

   I CONTENUTI dei casi non stanno qui: vengono da src/lib/casi.ts,
   che a sua volta porta le schede gia' approvate in
   BRAND-2026/site/casi.html. Questa pagina non conosce nessun caso
   per nome.
   ============================================================ */

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ problema?: string }>;
};

const COPY = {
  it: {
    metaTitle: "Casi · Morfeus",
    metaDesc:
      "Ogni caso parte da un punto in cui il valore si stava perdendo: il problema operativo, il sistema costruito, cosa cambia nel lavoro e il valore verificato.",
    hero: {
      eye: "Casi reali. Sistemi in produzione.",
      h1a: "Ogni caso parte da un punto in cui il valore ",
      h1emph: "si stava perdendo",
      h1b: ".",
      copy: "Persone bloccate, sapere disperso, processi lenti, decisioni che arrivano tardi. In ogni caso partiamo dal problema operativo, costruiamo il sistema e verifichiamo cosa cambia.",
      prova: "casi in archivio",
      prova2: "verificati sul campo",
    },
    archivio: {
      eye: "L'archivio",
      h2a: "Otto aziende, otto punti in cui il valore ",
      h2emph: "usciva",
      h2b: ".",
      lead: "Per ogni caso: chi è, dove perdeva valore, cosa abbiamo costruito e cosa è cambiato. I filtri sono per problema e per area, mai per tecnologia usata.",
      perArea: "Area",
      tutte: "Tutte",
      filtroAttivo: "Stai guardando",
      togli: "Mostra tutti",
      timbro: "Confermato",
      nessuno: "Nessun caso con questa combinazione di filtri. Togline uno.",
      uno: "caso",
      molti: "casi",
      suffisso: "in archivio",
    },
    lettura: {
      eye: "Come si legge un caso Morfeus",
      h2a: "Tutti i dossier hanno la ",
      h2emph: "stessa forma",
      h2b: ".",
      lead: "Non è una scelta editoriale, è il metodo. Se un caso non regge questa sequenza, non è un caso: è un aneddoto.",
      readout: "Struttura comune · tre atti",
      sempre: "sempre uguale",
      passi: [
        {
          k: "01 · Il problema",
          t: "Dove usciva il valore",
          p: "Il punto operativo preciso, con il contesto reale dell'azienda. Non un'ipotesi e non una categoria: un fatto che qualcuno viveva ogni giorno.",
        },
        {
          k: "02 · Il sistema",
          t: "Cosa abbiamo costruito",
          p: "Il sistema che chiude quella perdita, descritto per quello che fa nel lavoro delle persone, non per la tecnologia con cui è fatto.",
        },
        {
          k: "03 · Il valore",
          t: "Cosa è cambiato",
          p: "Il numero verificato sul campo, con la sua unità e il suo periodo. Dove il numero non c'è, c'è il cambiamento operativo. Mai una stima travestita da risultato.",
        },
      ],
    },
    cta: {
      eye: "Il tuo caso non deve ancora esistere",
      h2a: "Deve esistere un problema che ",
      h2emph: "vale la pena risolvere",
      h2b: ".",
      p: "Se riconosci un Value Leak nella tua azienda, partiamo da lì. Nessun caso è identico a un altro. Il metodo per capire dove intervenire, invece, è sempre lo stesso.",
      btn: "Parliamo del tuo caso",
      btn2: "Vedi il Metodo",
    },
  },
  en: {
    metaTitle: "Cases · Morfeus",
    metaDesc:
      "Every case starts at a point where value was leaking away: the operating problem, the system built, what changes in the work and the verified value.",
    hero: {
      eye: "Real cases. Systems in production.",
      h1a: "Every case starts at a point where value ",
      h1emph: "was leaking away",
      h1b: ".",
      copy: "People blocked, knowledge scattered, workflows slowed down, decisions arriving late. In every case, we start with the operating problem, build the system and verify what changes.",
      prova: "cases in the archive",
      prova2: "verified in the field",
    },
    archivio: {
      eye: "The archive",
      h2a: "Eight companies, eight points where value was ",
      h2emph: "leaking out",
      h2b: ".",
      lead: "For each case: who they are, where value was leaking, what we built and what changed. Filters are by problem and by area, never by the technology used.",
      perArea: "Area",
      tutte: "All",
      filtroAttivo: "You are viewing",
      togli: "Show all",
      timbro: "Confirmed",
      nessuno: "No case matches this combination of filters. Remove one.",
      uno: "case",
      molti: "cases",
      suffisso: "in the archive",
    },
    lettura: {
      eye: "How to read a Morfeus case",
      h2a: "Every dossier has the ",
      h2emph: "same shape",
      h2b: ".",
      lead: "It isn't an editorial choice, it's the method. If a case doesn't hold this sequence, it isn't a case: it's an anecdote.",
      readout: "Common structure · three acts",
      sempre: "always the same",
      passi: [
        {
          k: "01 · The problem",
          t: "Where value was leaking",
          p: "The precise operating point, with the company's real context. Not a hypothesis and not a category: something someone lived every day.",
        },
        {
          k: "02 · The system",
          t: "What we built",
          p: "The system that closes that leak, described by what it does in people's work, not by the technology it is made of.",
        },
        {
          k: "03 · The value",
          t: "What changed",
          p: "The number verified in the field, with its unit and its period. Where there is no number, there is the operational change. Never an estimate dressed up as a result.",
        },
      ],
    },
    cta: {
      eye: "Your case doesn't have to exist yet",
      h2a: "There just has to be a problem ",
      h2emph: "worth solving",
      h2b: ".",
      p: "If you recognise a Value Leak in your company, we start there. No two cases are alike. The method for finding where to act, on the other hand, is always the same.",
      btn: "Let's talk about your case",
      btn2: "See the Method",
    },
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    alternates: buildLocaleAlternates("casi", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}${localePrefix(safeLocale)}/casi`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default async function CasiPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  /* Il problema arriva dall'URL, non da un click: cosi' la sezione
     "per problema" filtra davvero, la pagina si condivide gia'
     filtrata e funziona anche senza JavaScript. */
  const daUrl = sp?.problema;
  const problemaIniziale =
    daUrl && daUrl in PROBLEMI ? (daUrl as ChiaveProblema) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}${localePrefix(safeLocale)}/casi#collectionpage`,
        url: `${SITE_URL}${localePrefix(safeLocale)}/casi`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: CASI.length,
          itemListElement: CASI.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.titolo[safeLocale],
            url: `${SITE_URL}${localePrefix(safeLocale)}/casi/${c.slug}`,
          })),
        },
      },
    ],
  };

  return (
    <SiteShell locale={safeLocale}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 · HERO · ink */}
      <section className="band ink hero pg" id="hero">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="copy">{t.hero.copy}</p>
          <p className="proofline" style={{ marginTop: 40 }}>
            <b>{CASI.length}</b> {t.hero.prova} · <b>
              {CASI.filter((c) => c.confermato).length}
            </b>{" "}
            {t.hero.prova2}
          </p>
        </div>
      </section>

      {/* 02 · ARCHIVIO · carta */}
      <section className="band carta pg" id="archivio">
        <div className="wrap">
          <div className="eye">{t.archivio.eye}</div>
          <h2 className="h-sect">
            {t.archivio.h2a}
            <span className="emph">{t.archivio.h2emph}</span>
            {t.archivio.h2b}
          </h2>
          <p className="lead">{t.archivio.lead}</p>

          <ArchivioCasi
            locale={safeLocale}
            problemaIniziale={problemaIniziale}
            etichette={{
              perArea: t.archivio.perArea,
              tutte: t.archivio.tutte,
              filtroAttivo: t.archivio.filtroAttivo,
              togli: t.archivio.togli,
              timbro: t.archivio.timbro,
              nessuno: t.archivio.nessuno,
              uno: t.archivio.uno,
              molti: t.archivio.molti,
              suffisso: t.archivio.suffisso,
            }}
          />
        </div>
      </section>

      {/* 03 · COME SI LEGGE · ink */}
      <section className="band ink pg" id="come-si-legge">
        <div className="wrap">
          <div className="eye">{t.lettura.eye}</div>
          <h2 className="h-sect">
            {t.lettura.h2a}
            <span className="emph">{t.lettura.h2emph}</span>
            {t.lettura.h2b}
          </h2>
          <p className="lead">{t.lettura.lead}</p>

          <div className="quadro" style={{ marginTop: 36 }}>
            <div className="readout">
              <span>{t.lettura.readout}</span>
              <span className="on">
                <i />
                {t.lettura.sempre}
              </span>
            </div>
            <div className="tre-quadranti">
              {t.lettura.passi.map((p) => (
                <div className="quadrante" key={p.k}>
                  <div className="cod">{p.k}</div>
                  <div className="titolo-quadrante">{p.t}</div>
                  <div className="quota" style={{ marginTop: 20 }} />
                  <p className="testo-quadrante">{p.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 · CTA · ink */}
      <section className="band ink pg" id="cta">
        <div className="wrap">
          <div className="ctaq">
            <div className="eye justify-center">{t.cta.eye}</div>
            <h2 className="h-sect">
              {t.cta.h2a}
              <span className="emph">{t.cta.h2emph}</span>
              {t.cta.h2b}
            </h2>
            <p>{t.cta.p}</p>
            <div className="cta-row centrata">
              <Link className="btn btn-1" href={`${base}/roiometro`}>
                {t.cta.btn}
              </Link>
              <Link className="btn btn-2-carta" href={`${base}/metodo`}>
                {t.cta.btn2}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
