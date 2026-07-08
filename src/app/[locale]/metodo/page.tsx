import type { Metadata } from "next";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";
import { SiteShell } from "@/components/site";

type Props = { params: { locale: string } };

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const COPY = {
  it: {
    metaTitle: "Metodo — Morfeus",
    metaDesc:
      "Il metodo Morfeus: dalla perdita invisibile (Value Leak) al valore misurato in euro. Diagnosi, sistema (MARF), Value Report mensile, autonomia (AI Champion). Modello Pilot → Retainer.",
    hero: {
      label: "Il metodo",
      h1pre: "Dalla perdita invisibile al ",
      h1hl: "valore misurato",
      h1post: ".",
      copy: "Non un servizio a progetto, ma un sistema ripetibile. Troviamo dove la tua azienda perde margine, costruiamo i sistemi di AI che lo recuperano, e ti diciamo ogni mese quanto valore hai generato. In euro.",
      ctaSolid: "Prova il ROIometro",
      tlink: "Parla con noi",
      model: {
        k: "Il modello",
        step1: "Pilot",
        arr: "↓ criteri di accettazione oggettivi",
        step2: "Retainer",
        p: "Dimostriamo prima su un perimetro delimitato, poi diventiamo Operating Partner continuativo. Il rischio lo prendiamo noi.",
      },
    },
    frame: {
      label: "Il frame",
      h2pre: "Non «come uso l'AI». ",
      h2hl: "Dove perdo valore",
      h2post: " mentre scalo.",
      lead: "Mentre un'azienda cresce, errori, tempo e dati frammentati degradano il margine senza che nessuno se ne accorga. Sono i Value Leak: le perdite invisibili. Noi le quantifichiamo in euro e costruiamo i sistemi che le prevengono. Non è taglio costi: è recupero strutturale di margine.",
      stats: [
        { n: "Value Leak", l: "le perdite di margine che le PMI non vedono" },
        { n: "Margin Recovery", l: "trovarle, quantificarle, chiuderle con l'AI" },
      ],
    },
    phasesLabel: "Come lavoriamo · 4 fasi",
    phases: [
      { dark: false, pn: "01", h3: "Diagnosi", chip: "ROIometro · Value Leak", p: "Mappiamo i processi reparto per reparto e troviamo dove si perde margine. Con il ROIometro la conversazione si sposta da «quanto costa Morfeus» a «quanto ti costa il problema»: una perdita mensile, in euro.", points: ["Diagnosi reparto per reparto, sui dati reali", "Perdita mensile quantificata in euro", "Nessuna slide: numeri su cui decidere"], deliver: "La mappa dei Value Leak, in euro." },
      { dark: true, pn: "02", h3: "Sistema", chip: "MARF · embedded", p: "Installiamo MARF dentro l'azienda: l'infrastruttura AI proprietaria di Morfeus. Non un SaaS, ma un layer embedded che raccoglie e pulisce i dati operativi, automatizza il lavoro ripetitivo e fa parlare tra loro i reparti per proteggere il margine.", points: ["Installata e personalizzata nei tuoi sistemi", "Dati operativi puliti e connessi", "Ogni progetto la rende più potente"], deliver: "MARF in produzione, che gira ogni giorno." },
      { dark: false, pn: "03", h3: "Valore", chip: "Value Report", p: "I criteri di valore si definiscono oggettivamente all'inizio e si verificano ogni mese. Il COO riceve il log settimanale di cosa è stato fatto; il CEO il Value Report mensile: quanto valore è stato generato, in euro. Il rinnovo diventa una non-decisione.", points: ["Criteri di valore definiti a monte", "Log settimanale operativo al COO", "Value Report mensile al CEO"], deliver: "Il Value Report mensile." },
      { dark: true, pn: "04", h3: "Autonomia", chip: "AI Champion", p: "Formiamo gli AI Champion: una persona per reparto, non necessariamente IT, che sperimenta, capisce cosa funziona, lo trasforma in procedura e lo passa ai colleghi. Così l'AI passa da dipendenza esterna a competenza interna scalabile.", points: ["Una persona per reparto, autonoma", "Procedure che restano in azienda", "Il sistema regge e cresce senza di noi"], deliver: "La capability interna, permanente." },
    ],
    deliverLabel: "Deliverable",
    model: {
      label: "Il modello commerciale",
      h2pre: "Dimostriamo prima. Decidi ",
      h2hl: "dopo",
      h2post: ".",
      cards: [
        { t: "Fase 1 · Pilot", h3: "Un perimetro, criteri chiari", p: "Partiamo da un Pilot delimitato, con criteri di accettazione oggettivi e nessun impegno annuale a monte. Mostriamo il valore su un caso reale prima di chiederti di scalare." },
        { t: "Fase 2 · Retainer", h3: "Operating Partner continuativo", p: "Superato il Pilot, diventiamo il tuo Operating Partner: presenza continuativa, sistemi che evolvono, valore misurato ogni mese nel Value Report." },
      ],
    },
    cta: { label: "Parliamone", h2pre: "Inizia dalla ", h2hl: "diagnosi", h2post: ".", p: "Il primo passo non è un preventivo. È capire, in euro, dove la tua azienda perde valore ogni giorno.", ctaSolid: "Prova il ROIometro", tlink: "Parla con noi" },
  },
  en: {
    metaTitle: "Method — Morfeus",
    metaDesc:
      "The Morfeus method: from the invisible loss (Value Leak) to value measured in euros. Diagnosis, system (MARF), monthly Value Report, autonomy (AI Champion). Pilot → Retainer model.",
    hero: {
      label: "The method",
      h1pre: "From the invisible loss to ",
      h1hl: "measured value",
      h1post: ".",
      copy: "Not a project-based service, but a repeatable system. We find where your company loses margin, build the AI systems that recover it, and tell you every month how much value you generated. In euros.",
      ctaSolid: "Try the ROIometro",
      tlink: "Talk to us",
      model: {
        k: "The model",
        step1: "Pilot",
        arr: "↓ objective acceptance criteria",
        step2: "Retainer",
        p: "We prove it first on a bounded scope, then become your continuous Operating Partner. We take the risk.",
      },
    },
    frame: {
      label: "The frame",
      h2pre: "Not «how I use AI». ",
      h2hl: "Where I lose value",
      h2post: " as I scale.",
      lead: "As a company grows, errors, time and fragmented data erode margin without anyone noticing. These are the Value Leaks: the invisible losses. We quantify them in euros and build the systems that prevent them. It's not cost-cutting: it's structural margin recovery.",
      stats: [
        { n: "Value Leak", l: "the margin losses SMEs don't see" },
        { n: "Margin Recovery", l: "find them, quantify them, close them with AI" },
      ],
    },
    phasesLabel: "How we work · 4 phases",
    phases: [
      { dark: false, pn: "01", h3: "Diagnosis", chip: "ROIometro · Value Leak", p: "We map processes department by department and find where margin is lost. With the ROIometro the conversation shifts from «how much does Morfeus cost» to «how much is the problem costing you»: a monthly loss, in euros.", points: ["Department-by-department diagnosis, on real data", "Monthly loss quantified in euros", "No slides: numbers to decide on"], deliver: "The map of Value Leaks, in euros." },
      { dark: true, pn: "02", h3: "System", chip: "MARF · embedded", p: "We install MARF inside the company: Morfeus's proprietary AI infrastructure. Not a SaaS, but an embedded layer that collects and cleans operational data, automates repetitive work, and makes departments talk to each other to protect margin.", points: ["Installed and customized in your systems", "Operational data cleaned and connected", "Every project makes it more powerful"], deliver: "MARF in production, running every day." },
      { dark: false, pn: "03", h3: "Value", chip: "Value Report", p: "Value criteria are defined objectively upfront and verified every month. The COO gets the weekly log of what was done; the CEO the monthly Value Report: how much value was generated, in euros. Renewal becomes a non-decision.", points: ["Value criteria agreed upfront", "Weekly operational log to the COO", "Monthly Value Report to the CEO"], deliver: "The monthly Value Report." },
      { dark: true, pn: "04", h3: "Autonomy", chip: "AI Champion", p: "We train the AI Champions: one person per department, not necessarily IT, who experiments, understands what works, turns it into a procedure and passes it on to colleagues. AI goes from external dependency to a scalable internal skill.", points: ["One autonomous person per department", "Procedures that stay in the company", "The system holds and grows without us"], deliver: "The internal capability, permanent." },
    ],
    deliverLabel: "Deliverable",
    model: {
      label: "The commercial model",
      h2pre: "We prove it first. You decide ",
      h2hl: "after",
      h2post: ".",
      cards: [
        { t: "Phase 1 · Pilot", h3: "One scope, clear criteria", p: "We start from a bounded Pilot, with objective acceptance criteria and no upfront annual commitment. We show value on a real case before asking you to scale." },
        { t: "Phase 2 · Retainer", h3: "Continuous Operating Partner", p: "Once the Pilot is passed, we become your Operating Partner: continuous presence, systems that evolve, value measured every month in the Value Report." },
      ],
    },
    cta: { label: "Let's talk", h2pre: "Start from the ", h2hl: "diagnosis", h2post: ".", p: "The first step isn't a quote. It's understanding, in euros, where your company loses value every day.", ctaSolid: "Try the ROIometro", tlink: "Talk to us" },
  },
} as const;

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("metodo", safeLocale),
    openGraph: { title: t.metaTitle, description: t.metaDesc, type: "website", url: `${SITE_URL}/${safeLocale}/metodo`, siteName: "Morfeus", locale: isIt ? "it_IT" : "en_US" },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function MetodoPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${safeLocale}/metodo#webpage`,
        url: `${SITE_URL}/${safeLocale}/metodo`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/${safeLocale}/metodo#howto`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        step: t.phases.map((p, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: p.h3,
          text: p.p,
        })),
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

      {/* HERO */}
      <section className="hero wrap">
        <div>
          <span className="label">{t.hero.label}</span>
          <h1 style={{ marginTop: 18 }}>{t.hero.h1pre}<span className="hl">{t.hero.h1hl}</span>{t.hero.h1post}</h1>
          <p className="copy">{t.hero.copy}</p>
          <div className="hero-cta">
            <a className="btn btn-solid" href={`${base}/roiometro`}>{t.hero.ctaSolid}</a>
            <a className="tlink" href="mailto:hello@morfeushub.com">{t.hero.tlink} <Arrow /></a>
          </div>
        </div>
        <div className="modelcard">
          <div className="k">{t.hero.model.k}</div>
          <div className="step"><span className="d" aria-hidden />{t.hero.model.step1}</div>
          <div className="arr">{t.hero.model.arr}</div>
          <div className="step"><span className="d" aria-hidden />{t.hero.model.step2}</div>
          <p>{t.hero.model.p}</p>
        </div>
      </section>

      {/* FRAME (dark) */}
      <section className="sec dark">
        <div className="wrap">
          <span className="label h-eyebrow">{t.frame.label}</span>
          <h2 className="h2">{t.frame.h2pre}<span className="hl">{t.frame.h2hl}</span>{t.frame.h2post}</h2>
          <p className="lead">{t.frame.lead}</p>
          <div className="frame-stats">
            {t.frame.stats.map((s) => (
              <div key={s.n}><div className="n">{s.n}</div><div className="l">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASES (alternating) */}
      {t.phases.map((p, i) => (
        <section className={p.dark ? "sec dark" : "sec"} key={p.pn}>
          <div className="wrap">
            {i === 0 && <span className="label h-eyebrow">{t.phasesLabel}</span>}
            <div className="phase">
              <div>
                <div className="pn">{p.pn}</div>
                <h3>{p.h3}</h3>
                <span className="chip">{p.chip}</span>
              </div>
              <div className="pbody">
                <p>{p.p}</p>
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}><span className="a" aria-hidden>→</span><span>{pt}</span></li>
                  ))}
                </ul>
                <div className="deliver"><b>{t.deliverLabel}</b> {p.deliver}</div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* MODELLO COMMERCIALE */}
      <section className="sec">
        <div className="wrap">
          <span className="label h-eyebrow">{t.model.label}</span>
          <h2 className="h2">{t.model.h2pre}<span className="hl">{t.model.h2hl}</span>{t.model.h2post}</h2>
          <div className="twostep">
            {t.model.cards.map((c) => (
              <div className="tscard" key={c.t}>
                <div className="t">{c.t}</div>
                <h3>{c.h3}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta wrap">
        <span className="label">{t.cta.label}</span>
        <h2>{t.cta.h2pre}<span className="hl">{t.cta.h2hl}</span>{t.cta.h2post}</h2>
        <p>{t.cta.p}</p>
        <div className="cta-row">
          <a className="btn btn-solid" href={`${base}/roiometro`}>{t.cta.ctaSolid}</a>
          <a className="tlink" href="mailto:hello@morfeushub.com">{t.cta.tlink} <Arrow /></a>
        </div>
      </section>
    </SiteShell>
  );
}
