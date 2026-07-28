import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const CASE_HREFS = [
  "brainiac-tesoreria-riconciliata",
  "cyberangels-sales-advisor",
  "valueize-best-seller",
  "globia-scoring-deterministico",
  "ag-academy-onboarding",
  "marf-lead-caldo",
  "scalers-pre-sales",
  "cyberangels-report-cfo",
] as const;

const COPY = {
  it: {
    metaTitle: "Casi · Morfeus",
    metaDesc:
      "Lo schedario dei casi Morfeus: aziende reali, la perdita trovata, il sistema costruito, il valore recuperato in euro. Ogni caso col timbro è stato verificato sul campo.",
    hero: {
      eye: "Lo schedario",
      h1a: "Ogni cliente è un caso ",
      h1emph: "schedato",
      h1b: ".",
      copy: "Non raccontiamo l'AI: mostriamo cosa abbiamo trovato e cosa abbiamo recuperato. Per ogni azienda: la perdita localizzata, il sistema costruito, il valore misurato in euro. Ogni caso col timbro è stato verificato sul campo.",
      lame: "«Ogni perdita ha un colpevole. Lo troviamo.»",
      stats: [
        { n: "€4M+", l: "margine recuperato per i clienti", gain: true },
        { n: "75", l: "casi documentati in libreria", gain: false },
        { n: "8", l: "prodotti in produzione", gain: false },
      ],
    },
    indice: {
      eye: "L'indice",
      h2a: "I casi, per ",
      h2emph: "prodotto",
      h2b: ".",
      lead: "Un caso per ciascun prodotto in produzione. Per ognuno: la casa che bruciava, perché restava irrisolto, il sistema, il risultato misurato.",
      stamp: "Confermato",
      open: "Apri il dossier ▸",
      note: "▸ 8 casi, uno per prodotto in produzione. Dalla libreria Morfeus di 75 casi documentati.",
      cards: [
        {
          meta: "CASO #049 · BRAINIAC · STUDIO E COSTRUZIONI ~€10M",
          qa: "«Le fatture le emetti tu. Chi le ",
          qEmph: "incassa",
          qb: "?»",
          whoB: "65.000€",
          whoRest: " recuperati nel primo trimestre · -18 giorni d'incasso · riconciliazione automatica",
        },
        {
          meta: "CASO #016 · CYBERANGELS SALES ADVISOR · MSP / RESELLER IT",
          qa: "«Vendono tutto tranne la cosa a margine più ",
          qEmph: "alto",
          qb: ".»",
          whoB: "70%+",
          whoRest: " delle call con la sicurezza dentro · ticket medio +30% · prep chiamata in un clic",
        },
        {
          meta: "CASO #032 · VALUEIZE · E-COMMERCE / DTC",
          qa: "«Il best-seller che ti stava ",
          qEmph: "mangiando",
          qb: " vivo.»",
          whoB: "3 SKU in rosso",
          whoRest: " scoperti · recupero margine a doppia cifra · in un trimestre",
        },
        {
          meta: "CASO #068 · GLOBIA · CONSULENZA & DUE DILIGENCE",
          qa: "«Il numero cambiava a ogni click, e ci mettevano la ",
          qEmph: "firma",
          qb: ".»",
          whoB: "-60%",
          whoRest: " sul tempo di valutazione · riproducibilità 100% · numero difendibile in due diligence",
        },
        {
          meta: "CASO #013 · AG ACADEMY · ACADEMY HIGH-TICKET",
          qa: "«Chiudi la vendita. Poi lo studente sparisce nel ",
          qEmph: "buco nero",
          qb: ".»",
          whoB: "25% → 6%",
          whoRest: " rimborsi a 14 giorni · primo accesso da giorni a ore · zero studenti persi",
        },
        {
          meta: "CASO #001 · MARF · CALL CENTER VENDITA ENERGIA",
          qa: "«Ogni lead caldo che non richiami stasera, domani è ",
          qEmph: "morto",
          qb: ".»",
          whoB: "50% → 90%+",
          whoRest: " sul secondo contatto · primo richiamo da ore a minuti · chiusura a doppia cifra",
        },
        {
          meta: "CASO #067 · SCALERS · SERVIZI PROFESSIONALI B2B",
          qa: "«Entravano in call senza sapere con chi stavano ",
          qEmph: "parlando",
          qb: ".»",
          whoB: "+11 punti",
          whoRest: " di call chiuse · prep da 20 minuti a zero · in un trimestre",
        },
        {
          meta: "CASO #027 · CYBERANGELS REPORT ENGINE · MODA STRUTTURATA",
          qa: "«Il tuo report tecnico finisce nel cassetto del CFO, e con lui il ",
          qEmph: "rinnovo",
          qb: ".»",
          whoB: "Rinnovi più alti",
          whoRest: " · cicli di approvazione più corti · scritto per il CFO, non per il tecnico",
        },
      ],
    },
    formato: {
      eye: "Il formato",
      h2a: "Come si legge un ",
      h2emph: "caso",
      h2b: ".",
      lead: "Ogni dossier segue la stessa struttura. È il patto reso formato: mostriamo solo quello che è stato fatto davvero, con le prove.",
      steps: [
        { ix: "01", h3: "Il problema", p: "Dove l'azienda perdeva valore, prima di noi. Il contesto reale, non un'ipotesi." },
        { ix: "02", h3: "I numeri di partenza", p: "La perdita quantificata in euro col ROIometro. Il punto zero, misurato." },
        { ix: "03", h3: "Il sistema", p: "Cosa abbiamo costruito e messo in produzione. MARF, agenti, o formazione." },
        { ix: "04", h3: "Il risultato", p: "Il valore recuperato, verificato. Il timbro Confermato arriva solo qui." },
      ],
    },
    cta: {
      eye: "Il tuo caso",
      h2a: "Il prossimo dossier potrebbe essere il ",
      h2emph: "tuo",
      h2b: ".",
      p: "Il primo passo non è un preventivo. È capire, in euro, dove la tua azienda perde valore ogni giorno.",
      cta1: "Calcola cosa perdi ▸",
      cta2: "Parla con noi",
    },
  },
  en: {
    metaTitle: "Cases · Morfeus",
    metaDesc:
      "The Morfeus case file: real companies, the loss found, the system built, the value recovered in euros. Every case with the stamp was verified in the field.",
    hero: {
      eye: "The case file",
      h1a: "Every client is a filed ",
      h1emph: "case",
      h1b: ".",
      copy: "We don't talk about AI: we show what we found and what we recovered. For every company: the loss located, the system built, the value measured in euros. Every case with the stamp was verified in the field.",
      lame: "«Every loss has a culprit. We find it.»",
      stats: [
        { n: "€4M+", l: "margin recovered for clients", gain: true },
        { n: "75", l: "documented cases in the library", gain: false },
        { n: "8", l: "products in production", gain: false },
      ],
    },
    indice: {
      eye: "The index",
      h2a: "The cases, by ",
      h2emph: "product",
      h2b: ".",
      lead: "One case per product in production. For each: the house on fire, why it stayed unsolved, the system, the measured result.",
      stamp: "Confirmed",
      open: "Open the dossier ▸",
      note: "▸ 8 cases, one per product in production. From the Morfeus library of 75 documented cases.",
      cards: [
        {
          meta: "CASE #049 · BRAINIAC · ACCOUNTING & CONSTRUCTION ~€10M",
          qa: "«You issue the invoices. Who ",
          qEmph: "collects",
          qb: " them?»",
          whoB: "€65,000",
          whoRest: " recovered in the first quarter · -18 days on collection · automatic reconciliation",
        },
        {
          meta: "CASE #016 · CYBERANGELS SALES ADVISOR · MSP / IT RESELLER",
          qa: "«They sell everything except the highest-",
          qEmph: "margin",
          qb: " thing.»",
          whoB: "70%+",
          whoRest: " of calls with security in the pitch · avg ticket +30% · one-click call prep",
        },
        {
          meta: "CASE #032 · VALUEIZE · E-COMMERCE / DTC",
          qa: "«The best-seller that was ",
          qEmph: "eating",
          qb: " you alive.»",
          whoB: "3 SKUs in the red",
          whoRest: " uncovered · double-digit margin recovery · in one quarter",
        },
        {
          meta: "CASE #068 · GLOBIA · CONSULTING & DUE DILIGENCE",
          qa: "«The number changed on every click, and they put their ",
          qEmph: "signature",
          qb: " on it.»",
          whoB: "-60%",
          whoRest: " on assessment time · 100% reproducibility · a defensible number in due diligence",
        },
        {
          meta: "CASE #013 · AG ACADEMY · HIGH-TICKET ACADEMY",
          qa: "«You close the sale. Then the student vanishes into a ",
          qEmph: "black hole",
          qb: ".»",
          whoB: "25% → 6%",
          whoRest: " refunds at 14 days · first access from days to hours · zero students lost",
        },
        {
          meta: "CASE #001 · MARF · ENERGY SALES CALL CENTER",
          qa: "«Every hot lead you don't call back tonight is ",
          qEmph: "dead",
          qb: " by morning.»",
          whoB: "50% → 90%+",
          whoRest: " on second contact · first callback from hours to minutes · double-digit close rate",
        },
        {
          meta: "CASE #067 · SCALERS · B2B PROFESSIONAL SERVICES",
          qa: "«They entered the call not knowing who they were ",
          qEmph: "talking",
          qb: " to.»",
          whoB: "+11 points",
          whoRest: " of calls closed · prep from 20 minutes to zero · in one quarter",
        },
        {
          meta: "CASE #027 · CYBERANGELS REPORT ENGINE · STRUCTURED FASHION",
          qa: "«Your technical report ends up in the CFO's drawer, and the ",
          qEmph: "renewal",
          qb: " with it.»",
          whoB: "Higher renewals",
          whoRest: " · shorter approval cycles · written for the CFO, not the technician",
        },
      ],
    },
    formato: {
      eye: "The format",
      h2a: "How to read a ",
      h2emph: "case",
      h2b: ".",
      lead: "Every dossier follows the same structure. It's the pact made a format: we show only what was actually done, with the proof.",
      steps: [
        { ix: "01", h3: "The problem", p: "Where the company was losing value, before us. The real context, not a hypothesis." },
        { ix: "02", h3: "The starting numbers", p: "The loss quantified in euros with the ROIometer. The zero point, measured." },
        { ix: "03", h3: "The system", p: "What we built and put into production. MARF, agents, or training." },
        { ix: "04", h3: "The result", p: "The value recovered, verified. The Confirmed stamp lands only here." },
      ],
    },
    cta: {
      eye: "Your case",
      h2a: "The next dossier could be ",
      h2emph: "yours",
      h2b: ".",
      p: "The first step isn't a quote. It's understanding, in euros, where your company loses value every day.",
      cta1: "Calculate what you lose ▸",
      cta2: "Talk to us",
    },
  },
} as const;

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("casi", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/casi`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function CasiPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/${safeLocale}/casi#collectionpage`,
        url: `${SITE_URL}/${safeLocale}/casi`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: t.indice.cards.length,
          itemListElement: t.indice.cards.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.meta,
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

      {/* 01 · TESTATA (lo schedario) · INCHIOSTRO */}
      <section className="band ink hero" id="hero">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="copy">{t.hero.copy}</p>
          <p className="lame">{t.hero.lame}</p>
          <div className="mt-9 flex flex-wrap gap-8 border-t border-[color:var(--riga-scuro)] pt-5">
            {t.hero.stats.map((s, i) => (
              <div key={i}>
                <div
                  className="font-clash text-[clamp(26px,3.2vw,34px)] font-semibold leading-none"
                  style={s.gain ? { color: "var(--ok)" } : undefined}
                >
                  {s.n}
                </div>
                <div className="mt-2 font-plex text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--ombra)]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 · INDICE CASI · CARTA */}
      <section className="band carta" id="indice">
        <div className="wrap">
          <div className="eye">{t.indice.eye}</div>
          <h2 className="h-sect">
            {t.indice.h2a}
            <span className="emph">{t.indice.h2emph}</span>
            {t.indice.h2b}
          </h2>
          <p className="lead">{t.indice.lead}</p>
          <div className="two" style={{ marginTop: 26 }}>
            {t.indice.cards.map((c, i) => (
              <Link
                className="caso transition-colors hover:border-firma/50"
                href={`${base}/casi/${CASE_HREFS[i]}`}
                key={i}
              >
                <div className="meta">{c.meta}</div>
                <p className="q">
                  {c.qa}
                  <span className="emph">{c.qEmph}</span>
                  {c.qb}
                </p>
                <p className="who">
                  <b>{c.whoB}</b>
                  {c.whoRest}
                </p>
                <div className="row-bottom">
                  <span className="stamp">{t.indice.stamp}</span>
                  <span className="btn btn-3" style={{ margin: 0 }}>
                    {t.indice.open}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p
            className="font-plex text-[11px]"
            style={{ marginTop: 22, color: "var(--ombra)" }}
          >
            {t.indice.note}
          </p>
        </div>
      </section>

      {/* 03 · COME LEGGIAMO UN CASO · INCHIOSTRO */}
      <section className="band ink" id="formato">
        <div className="wrap">
          <div className="eye">{t.formato.eye}</div>
          <h2 className="h-sect">
            {t.formato.h2a}
            <span className="emph">{t.formato.h2emph}</span>
            {t.formato.h2b}
          </h2>
          <p className="lead">{t.formato.lead}</p>
          <div className="four" style={{ marginTop: 28 }}>
            {t.formato.steps.map((s, i) => (
              <div className="card" key={i}>
                <div className="font-plex text-[11px] tracking-[0.08em] text-[color:var(--lilla)]">
                  {s.ix}
                </div>
                <h3 className="mt-[10px] text-[17px] font-semibold text-[color:var(--carta)]">
                  {s.h3}
                </h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · CTA QUOTA · CARTA */}
      <section className="band carta ctaq" id="cta">
        <div className="wrap">
          <div className="eye">{t.cta.eye}</div>
          <h2>
            {t.cta.h2a}
            <span className="emph">{t.cta.h2emph}</span>
            {t.cta.h2b}
          </h2>
          <p style={{ color: "#3a3b45" }}>{t.cta.p}</p>
          <div className="cta-row">
            <a className="btn btn-1" href={`${base}/roiometro`}>
              {t.cta.cta1}
            </a>
            <a className="btn btn-2-ink" href="mailto:hello@morfeushub.com">
              {t.cta.cta2}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
