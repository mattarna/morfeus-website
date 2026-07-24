import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { ORGANIZATION_ID, WEBSITE_ID, SITE_URL } from "@/lib/seo/entity-ids";
import { teamMembers } from "@/app/lib/team-data";
import { SiteShell } from "@/components/site";

type Props = { params: { locale: string } };

const FOUNDER_SLUGS = ["matteo", "alex", "simone", "matteo-alvazzi"] as const;

const COPY = {
  it: {
    metaTitle: "Chi siamo — Morfeus",
    metaDesc:
      "Morfeus è l'AI Operating Partner delle aziende in scaling: troviamo i Value Leak, costruiamo i sistemi che recuperano margine e formiamo i team. Misurato in euro, ogni mese.",
    hero: {
      eye: "Chi siamo",
      h1a: "Recuperiamo il ",
      h1emph: "margine",
      h1b: " che la tua azienda perde mentre scala.",
      copy: "Morfeus entra nelle aziende in scaling come AI Operating Partner. Troviamo dove si perde valore ogni giorno, i Value Leak, costruiamo i sistemi che lo recuperano e formiamo chi resta. Il risultato si riporta al CEO ogni mese: in euro, misurato, non promesso.",
      lame: "«Scaling doesn't fix your problems, it multiplies them.»",
      cta1: "Calcola cosa perdi",
      cta2: "Il nostro metodo",
      proof: { pre: "▸ PROVA · ", b1: "60+ sistemi in produzione", mid: " · margine recuperato per i clienti ", b2: "€4M+", post: " · dal 2023" },
    },
    numeri: {
      eye: "La prova, in numeri",
      h2a: "Misuriamo il ",
      h2emph: "valore",
      h2b: ", non l'attività.",
      pa: "Ogni mese il CEO riceve un ",
      pb: "Value Report",
      pc: ": il valore generato in euro, non un elenco di cose fatte. I criteri si definiscono a monte e si verificano sul campo. È quello che rende il rinnovo una non-decisione.",
      cells: [
        { k: "Formazione", n: "2.500+", l: "persone formate sull'AI applicata" },
        { k: "Produzione", n: "60+", l: "sistemi in produzione, non prototipi" },
        { k: "Valore recuperato", n: "€4M+", l: "margine recuperato per i clienti", gain: true },
        { k: "Sul campo", n: "dal 2023", l: "Operating Partner, dentro le aziende" },
      ],
    },
    cosa: {
      eye: "Cosa siamo",
      h2a: "Un Operating Partner, non un ",
      h2emph: "fornitore",
      h2b: ".",
      state: "Restiamo dentro i processi, con ownership diretta sui risultati.",
      note: "Vediamo dove perde la tua azienda, anche dove tu non puoi.",
      rows: [
        { neg: "non un'AI agency", a: "Un ", b: "team operativo embedded", c: " che lavora dentro la tua azienda." },
        { neg: "non a progetto", a: "Una ", b: "presenza continuativa", c: ", misurata ogni mese sui risultati." },
        { neg: "non un vendor", a: "Valutati su ", b: "quanto valore generiamo", c: ", in euro." },
      ],
      cata: "La categoria che ci diamo è ",
      catb: "Control System as a Service",
      catc: ": sistemi in produzione, non slide.",
    },
    offerte: {
      eye: "Le due offerte",
      h2a: "Entriamo noi. Oppure formiamo i ",
      h2emph: "tuoi",
      h2b: ".",
      lead: "Due porte, la stessa disciplina: quello che insegniamo è quello che pratichiamo ogni giorno nelle aziende clienti.",
      c1: { ck: "Offerta 1 · Operating Partner", ct: "Entriamo noi.", pa: "Sistemi e agenti AI in produzione dentro l'azienda, col nome sui risultati. Il valore si accumula come ", pb: "MARF", pc: ", l'infrastruttura proprietaria che migliora a ogni progetto, ed è misurato mese su mese nel Value Report.", foot: "SISTEMI · AGENTI · MARF CHE SI ACCUMULA" },
      c2: { ck: "Offerta 2 · Formazione aziendale", ct: "Formiamo i tuoi.", pa: "Workshop, policy AI e la figura dell'", pb: "AI Champion", pc: " interno: una persona per reparto che diventa autonoma e diffonde la pratica. La stessa dottrina che ha già formato 2.500+ persone, portata dentro i tuoi team.", foot: "WORKSHOP · POLICY AI · AI CHAMPION · 2.500+ FORMATI" },
    },
    founder: {
      eye: "Le persone",
      h2a: "Quattro founder, una sola ",
      h2emph: "accountability",
      h2b: ".",
      bios: {
        matteo: { role: "CEO & Co-Founder", bio: "Tiene insieme visione e mercato. È la voce di Morfeus verso l'esterno." },
        alex: { role: "Co-Founder · AI Architecture", bio: "Disegna l'architettura dei sistemi in produzione. Un modello che non gira non esiste." },
        simone: { role: "Co-Founder · Operations", bio: "Porta ogni progetto davvero in produzione, dentro i processi del cliente." },
        "matteo-alvazzi": { role: "CTO & Partner", bio: "Guida tecnologia e standard. Trasforma l'AI in infrastruttura affidabile." },
      } as Record<string, { role: string; bio: string }>,
    },
    casi: {
      eye: "Il patto, reso formato",
      h2a: "Ogni cliente è un caso ",
      h2emph: "schedato",
      h2b: ".",
      lead: "Non testimonianze generiche: evidenze, numeri di partenza, risultato misurato. Se porta il timbro, è stato verificato sul campo.",
      stamp: "Confermato",
      open: "Apri il dossier ▸",
      all: "Vedi tutti i casi ▸",
      cards: [
        { meta: "CASO #049 · BRAINIAC · TESORERIA RICONCILIATA", q: "«Non è fatturato che ti manca: è l'incassato che nessuno stava inseguendo.»", who: { b: "65.000€", rest: " recuperati nel primo trimestre · -18gg sui tempi d'incasso" } },
        { meta: "CASO #016 · CYBERANGELS SALES ADVISOR", q: "«I tuoi venditori smettono di evitare il servizio più redditizio perché non sanno spiegarlo: ora lo aprono in un clic.»", who: { b: "70%+", rest: " delle call con la sicurezza dentro · ticket medio +30%" } },
      ],
    },
    cta: {
      eye: "La misura, prima di tutto",
      h2a: "Il problema che non vedi ha un ",
      h2emph: "prezzo",
      h2b: ".",
      p: "Il primo passo non è un preventivo. È capire, in euro, dove la tua azienda perde valore ogni giorno.",
      cta1: "Calcolalo ▸",
      cta2: "Parla con noi",
    },
  },
  en: {
    metaTitle: "About — Morfeus",
    metaDesc:
      "Morfeus is the AI Operating Partner for scaling companies: we find the Value Leaks, build the systems that recover margin, and train the teams. Measured in euros, every month.",
    hero: {
      eye: "About us",
      h1a: "We recover the ",
      h1emph: "margin",
      h1b: " your company loses as it scales.",
      copy: "Morfeus embeds into scaling companies as an AI Operating Partner. We find where value leaks every day, build the systems that recover it, and train the people who stay. The result is reported to the CEO every month: in euros, measured, not promised.",
      lame: "«Scaling doesn't fix your problems, it multiplies them.»",
      cta1: "Calculate what you lose",
      cta2: "Our method",
      proof: { pre: "▸ PROOF · ", b1: "60+ systems in production", mid: " · margin recovered for clients ", b2: "€4M+", post: " · since 2023" },
    },
    numeri: {
      eye: "The proof, in numbers",
      h2a: "We measure ",
      h2emph: "value",
      h2b: ", not activity.",
      pa: "Every month the CEO receives a ",
      pb: "Value Report",
      pc: ": the value generated in euros, not a list of things done. Criteria are set upfront and verified in the field. It's what makes renewal a non-decision.",
      cells: [
        { k: "Training", n: "2,500+", l: "people trained on applied AI" },
        { k: "Production", n: "60+", l: "systems in production, not prototypes" },
        { k: "Value recovered", n: "€4M+", l: "margin recovered for clients", gain: true },
        { k: "In the field", n: "since 2023", l: "Operating Partner, inside companies" },
      ],
    },
    cosa: {
      eye: "What we are",
      h2a: "An Operating Partner, not a ",
      h2emph: "vendor",
      h2b: ".",
      state: "We stay inside the processes, with direct ownership of the results.",
      note: "We see where your company leaks, even where you can't.",
      rows: [
        { neg: "not an AI agency", a: "An ", b: "embedded operating team", c: " working inside your company." },
        { neg: "not project-based", a: "A ", b: "continuous presence", c: ", measured every month on results." },
        { neg: "not a vendor", a: "Judged on ", b: "how much value we generate", c: ", in euros." },
      ],
      cata: "The category we give ourselves is ",
      catb: "Control System as a Service",
      catc: ": systems in production, not slides.",
    },
    offerte: {
      eye: "The two offers",
      h2a: "We embed. Or we train ",
      h2emph: "yours",
      h2b: ".",
      lead: "Two doors, the same discipline: what we teach is what we practice every day inside client companies.",
      c1: { ck: "Offer 1 · Operating Partner", ct: "We embed.", pa: "AI systems and agents in production inside the company, with our name on the results. Value compounds as ", pb: "MARF", pc: ", the proprietary infrastructure that improves with every project, measured month over month in the Value Report.", foot: "SYSTEMS · AGENTS · COMPOUNDING MARF" },
      c2: { ck: "Offer 2 · Corporate training", ct: "We train yours.", pa: "Workshops, AI policy and the internal ", pb: "AI Champion", pc: ": one person per department who becomes autonomous and spreads the practice. The same doctrine that has already trained 2,500+ people, brought inside your teams.", foot: "WORKSHOPS · AI POLICY · AI CHAMPION · 2,500+ TRAINED" },
    },
    founder: {
      eye: "The people",
      h2a: "Four founders, one single ",
      h2emph: "accountability",
      h2b: ".",
      bios: {
        matteo: { role: "CEO & Co-Founder", bio: "Holds vision and market together. He is the voice of Morfeus to the outside." },
        alex: { role: "Co-Founder · AI Architecture", bio: "Designs the architecture of systems in production. A model that doesn't run doesn't exist." },
        simone: { role: "Co-Founder · Operations", bio: "Takes every project truly into production, inside the client's processes." },
        "matteo-alvazzi": { role: "CTO & Partner", bio: "Leads technology and standards. Turns AI into reliable infrastructure." },
      } as Record<string, { role: string; bio: string }>,
    },
    casi: {
      eye: "The pact, made a record",
      h2a: "Every client is a filed ",
      h2emph: "case",
      h2b: ".",
      lead: "Not generic testimonials: evidence, starting numbers, measured result. If it carries the stamp, it was verified in the field.",
      stamp: "Confirmed",
      open: "Open the dossier ▸",
      all: "See all cases ▸",
      cards: [
        { meta: "CASE #049 · BRAINIAC · RECONCILED TREASURY", q: "«It's not the revenue you're missing: it's the cash no one was chasing.»", who: { b: "€65,000", rest: " recovered in the first quarter · -18 days on collection times" } },
        { meta: "CASE #016 · CYBERANGELS SALES ADVISOR", q: "«Your sales reps stop avoiding the most profitable service because they can't explain it: now they open it in one click.»", who: { b: "70%+", rest: " of calls with security in the pitch · avg ticket +30%" } },
      ],
    },
    cta: {
      eye: "The measure, first of all",
      h2a: "The problem you don't see has a ",
      h2emph: "price",
      h2b: ".",
      p: "The first step isn't a quote. It's understanding, in euros, where your company loses value every day.",
      cta1: "Calculate it ▸",
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
    alternates: buildLocaleAlternates("chi-siamo", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/chi-siamo`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function ChiSiamoPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const founders = FOUNDER_SLUGS.map((slug) => ({
    slug,
    name: teamMembers[slug].name,
    linkedin: teamMembers[slug].linkedin,
    image: teamMembers[slug].image,
    role: t.founder.bios[slug].role,
    bio: t.founder.bios[slug].bio,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/${safeLocale}/chi-siamo#aboutpage`,
        url: `${SITE_URL}/${safeLocale}/chi-siamo`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        mainEntity: { "@id": ORGANIZATION_ID },
      },
      ...founders.map((f) => ({
        "@type": "Person",
        "@id": `${SITE_URL}/${safeLocale}/chi-siamo#${f.slug}`,
        name: f.name,
        jobTitle: f.role,
        worksFor: { "@id": ORGANIZATION_ID },
        sameAs: [f.linkedin],
      })),
    ],
  };

  return (
    <SiteShell locale={safeLocale}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 · HERO · INCHIOSTRO */}
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
            <div className="cta-row">
              <a className="btn btn-1" href={`${base}/roiometro`}>
                {t.hero.cta1}
              </a>
              <Link className="btn btn-2-carta" href={`${base}/metodo`}>
                {t.hero.cta2}
              </Link>
            </div>
            <p className="proofline">
              {t.hero.proof.pre}
              <b>{t.hero.proof.b1}</b>
              {t.hero.proof.mid}
              <b>{t.hero.proof.b2}</b>
              {t.hero.proof.post}
            </p>
          </div>
        </section>

        {/* 02 · LA PROVA IN NUMERI · CARTA */}
        <section className="band carta" id="numeri">
          <div className="wrap">
            <div className="eye">{t.numeri.eye}</div>
            <div className="measure">
              <div className="copy">
                <h2 className="h-sect">
                  {t.numeri.h2a}
                  <span className="emph">{t.numeri.h2emph}</span>
                  {t.numeri.h2b}
                </h2>
                <p>
                  {t.numeri.pa}
                  <b>{t.numeri.pb}</b>
                  {t.numeri.pc}
                </p>
              </div>
              <div className="statgrid">
                {t.numeri.cells.map((c, i) => (
                  <div className="cell" key={i}>
                    <div className="k">{c.k}</div>
                    <div className={"gain" in c && c.gain ? "n gain" : "n"}>{c.n}</div>
                    <div className="l">{c.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 · COSA SIAMO · INCHIOSTRO */}
        <section className="band ink" id="cosa-siamo">
          <div className="wrap">
            <div className="eye">{t.cosa.eye}</div>
            <h2 className="h-sect">
              {t.cosa.h2a}
              <span className="emph">{t.cosa.h2emph}</span>
              {t.cosa.h2b}
            </h2>
            <div className="def">
              <div>
                <p className="state">{t.cosa.state}</p>
                <p className="note">{t.cosa.note}</p>
              </div>
              <div className="rows">
                {t.cosa.rows.map((r, i) => (
                  <div className="r" key={i}>
                    <div className="neg">{r.neg}</div>
                    <div className="pos">
                      {r.a}
                      <b>{r.b}</b>
                      {r.c}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="cat">
              {t.cosa.cata}
              <b>{t.cosa.catb}</b>
              {t.cosa.catc}
            </p>
          </div>
        </section>

        {/* 04 · LE DUE OFFERTE · CARTA */}
        <section className="band carta" id="offerte">
          <div className="wrap">
            <div className="eye">{t.offerte.eye}</div>
            <h2 className="h-sect">
              {t.offerte.h2a}
              <span className="emph">{t.offerte.h2emph}</span>
              {t.offerte.h2b}
            </h2>
            <p className="lead">{t.offerte.lead}</p>
            <div className="two" style={{ marginTop: 26 }}>
              <div className="card sel">
                <div className="ck">{t.offerte.c1.ck}</div>
                <div className="ct">{t.offerte.c1.ct}</div>
                <p>
                  {t.offerte.c1.pa}
                  <b>{t.offerte.c1.pb}</b>
                  {t.offerte.c1.pc}
                </p>
                <div className="off-foot f1">{t.offerte.c1.foot}</div>
              </div>
              <div className="card">
                <div className="ck">{t.offerte.c2.ck}</div>
                <div className="ct">{t.offerte.c2.ct}</div>
                <p>
                  {t.offerte.c2.pa}
                  <b>{t.offerte.c2.pb}</b>
                  {t.offerte.c2.pc}
                </p>
                <div className="off-foot f2">{t.offerte.c2.foot}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 · LE PERSONE · INCHIOSTRO */}
        <section className="band ink" id="founder">
          <div className="wrap">
            <div className="eye">{t.founder.eye}</div>
            <h2 className="h-sect">
              {t.founder.h2a}
              <span className="emph">{t.founder.h2emph}</span>
              {t.founder.h2b}
            </h2>
            <div className="four" style={{ marginTop: 30 }}>
              {founders.map((f) => (
                <div className="mem" key={f.slug} id={f.slug}>
                  <span className="face">
                    <Image src={f.image} alt={f.name} fill sizes="64px" className="face-img" />
                  </span>
                  <h3>{f.name}</h3>
                  <div className="role">{f.role}</div>
                  <p className="bio">{f.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 · I CASI COL TIMBRO · CARTA */}
        <section className="band carta" id="casi">
          <div className="wrap">
            <div className="eye">{t.casi.eye}</div>
            <h2 className="h-sect">
              {t.casi.h2a}
              <span className="emph">{t.casi.h2emph}</span>
              {t.casi.h2b}
            </h2>
            <p className="lead">{t.casi.lead}</p>
            <div className="two" style={{ marginTop: 26 }}>
              {t.casi.cards.map((c, i) => (
                <div className="caso" key={i}>
                  <div className="meta">{c.meta}</div>
                  <p className="q">{c.q}</p>
                  <p className="who">
                    <b>{c.who.b}</b>
                    {c.who.rest}
                  </p>
                  <div className="row-bottom">
                    <span className="stamp">{t.casi.stamp}</span>
                    <Link className="btn btn-3" href={`${base}/casi`} style={{ margin: 0 }}>
                      {t.casi.open}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 22 }}>
              <Link className="btn btn-3" href={`${base}/casi`}>
                {t.casi.all}
              </Link>
            </p>
          </div>
        </section>

        {/* 07 · CTA QUOTA · INCHIOSTRO */}
        <section className="band ink ctaq" id="cta">
          <div className="wrap">
            <div className="eye">{t.cta.eye}</div>
            <h2>
              {t.cta.h2a}
              <span className="emph">{t.cta.h2emph}</span>
              {t.cta.h2b}
            </h2>
            <p>{t.cta.p}</p>
            <div className="cta-row">
              <a className="btn btn-1" href={`${base}/roiometro`}>
                {t.cta.cta1}
              </a>
              <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com">
                {t.cta.cta2}
              </a>
            </div>
          </div>
        </section>
    </SiteShell>
  );
}
