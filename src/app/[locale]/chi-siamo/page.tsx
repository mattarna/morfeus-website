import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { ORGANIZATION_ID, WEBSITE_ID, SITE_URL } from "@/lib/seo/entity-ids";
import { teamMembers } from "@/app/lib/team-data";
import { SiteShell, MethodTabs, TrainingCTA, type MethodPhase } from "@/components/site";

type Props = { params: { locale: string } };

const FOUNDER_SLUGS = ["matteo", "alex", "simone", "matteo-alvazzi"] as const;

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const COPY = {
  it: {
    metaTitle: "Chi siamo — Morfeus",
    metaDesc:
      "Morfeus è l'Operating Partner AI delle aziende in scaling: troviamo i Value Leak, costruiamo i sistemi che recuperano margine, e lo misuriamo in euro.",
    demoLabel: "dimostrativo",
    hero: {
      label: "Chi siamo",
      h1pre: "Recuperiamo il ",
      h1hl: "margine",
      h1post: " che la tua azienda perde mentre scala.",
      copy: "Morfeus entra nelle aziende in scaling come Operating Partner. Troviamo dove si perde valore ogni giorno, i Value Leak, costruiamo i sistemi di AI che lo recuperano, e lo riportiamo al CEO ogni mese.",
      hnoteB: "In euro.",
      hnotePost: " Misurato, non promesso.",
      ctaSolid: "Prova il ROIometro",
      tlink: "Il nostro metodo",
      stats: [
        { n: "2.500", suf: "+", l: "persone formate sull'AI applicata" },
        { n: "60", suf: "+", l: "sistemi in produzione, non prototipi", demo: true },
        { pre: "€", n: "4M+", l: "margine recuperato per i clienti", demo: true },
      ],
    },
    strip: {
      k: "Operating Partner",
      items: [
        { b: "Dentro", rest: "i tuoi processi" },
        { b: "Misurati", rest: "ogni mese" },
        { b: "Autonomia", rest: "che resta" },
      ],
    },
    what: {
      label: "Cosa siamo",
      state: "Un Operating Partner, non un fornitore.",
      note: "*Restiamo dentro i processi, con ownership diretta sui risultati.",
      rows: [
        { neg: "non un'AI agency", pre: "Un ", b: "team operativo embedded", post: " che lavora dentro la tua azienda." },
        { neg: "non a progetto", pre: "Una ", b: "presenza continuativa", post: ", misurata ogni mese sui risultati." },
        { neg: "non un vendor", pre: "Valutati su ", b: "quanto valore generiamo", post: ", in euro." },
      ],
      catPre: "La categoria che ci diamo è ",
      catB: "Control System as a Service",
      catPost: ": sistemi in produzione, non slide.",
    },
    numbers: {
      label: "La prova, in numeri",
      h2pre: "Misuriamo il ",
      h2hl: "valore",
      h2post: ", non l'attività.",
      pPre: "Ogni mese il CEO riceve un ",
      pB: "Value Report",
      pPost: ": il valore generato in euro, non un elenco di cose fatte. È quello che rende il rinnovo una non-decisione.",
      cells: [
        { n: "2.500+", l: "persone formate sull'AI", acc: true },
        { n: "60+", l: "sistemi in produzione", demo: true },
        { n: "€4M+", l: "margine recuperato per i clienti", demo: true },
        { n: "dal 2023", l: "Operating Partner sul campo" },
      ],
    },
    method: {
      label: "Come lavoriamo",
      h2pre: "Un sistema, ",
      h2hl: "ripetibile",
      h2post: ".",
      lead: "Dalla perdita invisibile alla capability che resta in azienda. Senza di noi.",
      phases: [
        { ix: "01", title: "Diagnosi", h3: "Troviamo le perdite, in euro", pl: "Mappiamo i processi reparto per reparto e quantifichiamo i Value Leak: la perdita mensile, in euro, con il ROIometro.", chips: ["ROIometro", "Value Leak"], points: ["Diagnosi reparto per reparto", "Perdita mensile quantificata in euro", "Nessuna slide: solo numeri"], link: { label: "Scopri il ROIometro", slug: "roiometro" } },
        { ix: "02", title: "Sistema", h3: "Costruiamo l'infrastruttura, dentro l'azienda", pl: "Installiamo MARF nei tuoi sistemi: l'infrastruttura AI proprietaria che pulisce e connette i dati e recupera margine. Embedded, non un SaaS.", chips: ["MARF", "embedded"], points: ["Installata e personalizzata dentro l'azienda", "Dati operativi puliti e connessi", "Ogni progetto la rende più potente"], link: { label: "Cos'è MARF", slug: "marf" } },
        { ix: "03", title: "Valore", h3: "Misuriamo quanto generiamo, ogni mese", pl: "I criteri di valore si definiscono all'inizio e si verificano ogni mese. Il COO riceve il log settimanale, il CEO il Value Report mensile.", chips: ["Value Report"], points: ["Criteri di valore oggettivi, definiti a monte", "Log settimanale al COO", "Value Report mensile al CEO, in euro"], link: { label: "Come misuriamo", slug: "metodo" } },
        { ix: "04", title: "Autonomia", h3: "La capability resta in azienda", pl: "Formiamo gli AI Champion: una persona per reparto che diventa autonoma e diffonde la pratica. L'AI da dipendenza esterna a competenza interna.", chips: ["AI Champion"], points: ["Una persona per reparto, autonoma", "Procedure che restano", "Il sistema regge e cresce senza di noi"], link: { label: "AI Champion Program", slug: "ai-champion" } },
      ],
    },
    foundersSec: {
      label: "Le persone",
      h2pre: "Quattro founder, una sola ",
      h2hl: "accountability",
      h2post: ".",
    },
    proof: {
      label: "La prova",
      h2pre: "Quello che dicono dal ",
      h2hl: "boardroom",
      h2post: ".",
      demoTag: "testimonianza dimostrativa",
      cards: [
        { q: "In due mesi hanno chiuso una falla da 1,2 milioni nel processo di preventivazione. Non un report: un sistema che gira ancora oggi.", who: "CFO", ctx: "· gruppo manifatturiero" },
        { q: "Hanno smesso di venderci tecnologia e hanno iniziato a misurare il margine. Il Value Report mensile ha cambiato il modo in cui ragioniamo.", who: "CEO", ctx: "· azienda di servizi" },
      ],
      pull: { q: "Non un fornitore in più da gestire. Un partner che si misura sui nostri numeri.", who: "Direttore Operations · cliente Morfeus · testimonianza dimostrativa" },
    },
    cta: {
      label: "Parliamone",
      h2pre: "Scopri quanto margine stai ",
      h2hl: "perdendo",
      h2post: ".",
      p: "Il primo passo non è un preventivo. È capire, in euro, dove la tua azienda perde valore ogni giorno.",
      ctaSolid: "Prova il ROIometro",
      tlink: "Parla con noi",
    },
    founders: {
      matteo: { role: "CEO & Co-Founder", bio: "Tiene insieme visione e mercato. È la voce di Morfeus verso l'esterno." },
      alex: { role: "Co-Founder · AI Architecture", bio: "Disegna l'architettura dei sistemi in produzione. Un modello che non gira non esiste." },
      simone: { role: "Co-Founder · Operations", bio: "Porta ogni progetto davvero in produzione, dentro i processi del cliente." },
      "matteo-alvazzi": { role: "CTO & Partner", bio: "Guida tecnologia e standard. Trasforma l'AI in infrastruttura affidabile." },
    } as Record<string, { role: string; bio: string }>,
  },
  en: {
    metaTitle: "About — Morfeus",
    metaDesc:
      "Morfeus is the AI Operating Partner for scaling companies: we find the Value Leaks, build the systems that recover margin, and measure it in euros.",
    demoLabel: "illustrative",
    hero: {
      label: "About us",
      h1pre: "We recover the ",
      h1hl: "margin",
      h1post: " your company loses as it scales.",
      copy: "Morfeus embeds into scaling companies as an Operating Partner. We find where value leaks every day, build the AI systems that recover it, and report it to the CEO every month.",
      hnoteB: "In euros.",
      hnotePost: " Measured, not promised.",
      ctaSolid: "Try the ROIometro",
      tlink: "Our method",
      stats: [
        { n: "2,500", suf: "+", l: "people trained on applied AI" },
        { n: "60", suf: "+", l: "systems in production, not prototypes", demo: true },
        { pre: "€", n: "4M+", l: "margin recovered for clients", demo: true },
      ],
    },
    strip: {
      k: "Operating Partner",
      items: [
        { b: "Inside", rest: "your processes" },
        { b: "Measured", rest: "every month" },
        { b: "Autonomy", rest: "that stays" },
      ],
    },
    what: {
      label: "What we are",
      state: "An Operating Partner, not a vendor.",
      note: "*We stay inside the processes, with direct ownership of the results.",
      rows: [
        { neg: "not an AI agency", pre: "An ", b: "embedded operating team", post: " working inside your company." },
        { neg: "not project-based", pre: "A ", b: "continuous presence", post: ", measured every month on results." },
        { neg: "not a vendor", pre: "Judged on ", b: "how much value we generate", post: ", in euros." },
      ],
      catPre: "The category we give ourselves is ",
      catB: "Control System as a Service",
      catPost: ": systems in production, not slides.",
    },
    numbers: {
      label: "The proof, in numbers",
      h2pre: "We measure ",
      h2hl: "value",
      h2post: ", not activity.",
      pPre: "Every month the CEO receives a ",
      pB: "Value Report",
      pPost: ": the value generated in euros, not a list of things done. It's what makes renewal a non-decision.",
      cells: [
        { n: "2,500+", l: "people trained on AI", acc: true },
        { n: "60+", l: "systems in production", demo: true },
        { n: "€4M+", l: "margin recovered for clients", demo: true },
        { n: "since 2023", l: "Operating Partner in the field" },
      ],
    },
    method: {
      label: "How we work",
      h2pre: "One system, ",
      h2hl: "repeatable",
      h2post: ".",
      lead: "From the invisible loss to a capability that stays in the company. Without us.",
      phases: [
        { ix: "01", title: "Diagnosis", h3: "We find the losses, in euros", pl: "We map processes department by department and quantify the Value Leaks: the monthly loss, in euros, with the ROIometro.", chips: ["ROIometro", "Value Leak"], points: ["Department-by-department diagnosis", "Monthly loss quantified in euros", "No slides: numbers only"], link: { label: "Discover the ROIometro", slug: "roiometro" } },
        { ix: "02", title: "System", h3: "We build the infrastructure, inside the company", pl: "We install MARF in your systems: the proprietary AI infrastructure that cleans and connects data and recovers margin. Embedded, not a SaaS.", chips: ["MARF", "embedded"], points: ["Installed and customized inside the company", "Operational data cleaned and connected", "Every project makes it more powerful"], link: { label: "What is MARF", slug: "marf" } },
        { ix: "03", title: "Value", h3: "We measure what we generate, every month", pl: "Value criteria are defined upfront and verified every month. The COO gets the weekly log, the CEO the monthly Value Report.", chips: ["Value Report"], points: ["Objective value criteria, agreed upfront", "Weekly log to the COO", "Monthly Value Report to the CEO, in euros"], link: { label: "How we measure", slug: "metodo" } },
        { ix: "04", title: "Autonomy", h3: "The capability stays in the company", pl: "We train the AI Champions: one person per department who becomes autonomous and spreads the practice. AI from external dependency to internal skill.", chips: ["AI Champion"], points: ["One autonomous person per department", "Procedures that stay", "The system holds and grows without us"], link: { label: "AI Champion Program", slug: "ai-champion" } },
      ],
    },
    foundersSec: {
      label: "The people",
      h2pre: "Four founders, one single ",
      h2hl: "accountability",
      h2post: ".",
    },
    proof: {
      label: "The proof",
      h2pre: "What they say from the ",
      h2hl: "boardroom",
      h2post: ".",
      demoTag: "illustrative testimonial",
      cards: [
        { q: "In two months they closed a €1.2M leak in the quoting process. Not a report: a system that still runs today.", who: "CFO", ctx: "· manufacturing group" },
        { q: "They stopped selling us technology and started measuring margin. The monthly Value Report changed how we think.", who: "CEO", ctx: "· services company" },
      ],
      pull: { q: "Not one more vendor to manage. A partner measured on our numbers.", who: "Head of Operations · Morfeus client · illustrative testimonial" },
    },
    cta: {
      label: "Let's talk",
      h2pre: "Find out how much margin you're ",
      h2hl: "losing",
      h2post: ".",
      p: "The first step isn't a quote. It's understanding, in euros, where your company loses value every day.",
      ctaSolid: "Try the ROIometro",
      tlink: "Talk to us",
    },
    founders: {
      matteo: { role: "CEO & Co-Founder", bio: "Holds vision and market together. He is the voice of Morfeus to the outside." },
      alex: { role: "Co-Founder · AI Architecture", bio: "Designs the architecture of systems in production. A model that doesn't run doesn't exist." },
      simone: { role: "Co-Founder · Operations", bio: "Takes every project truly into production, inside the client's processes." },
      "matteo-alvazzi": { role: "CTO & Partner", bio: "Leads technology and standards. Turns AI into reliable infrastructure." },
    } as Record<string, { role: string; bio: string }>,
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
    ...teamMembers[slug],
    role: t.founders[slug].role,
    bio: t.founders[slug].bio,
  }));

  const phases: MethodPhase[] = t.method.phases.map((p) => ({
    ix: p.ix,
    title: p.title,
    h3: p.h3,
    pl: p.pl,
    chips: [...p.chips],
    points: [...p.points],
    link: { label: p.link.label, href: `${base}/${p.link.slug}` },
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

      {/* 01 HERO (light) */}
      <section className="hero wrap">
        <div>
          <span className="label">{t.hero.label}</span>
          <h1 style={{ marginTop: 18 }}>
            {t.hero.h1pre}<span className="hl">{t.hero.h1hl}</span>{t.hero.h1post}
            <span style={{ color: "var(--forge)" }}>*</span>
          </h1>
          <p className="copy">{t.hero.copy}</p>
          <p className="hnote">* <b>{t.hero.hnoteB}</b>{t.hero.hnotePost}</p>
          <div className="hero-cta">
            <a className="btn btn-solid" href={`${base}/roiometro`}>{t.hero.ctaSolid}</a>
            <Link className="tlink" href={`${base}/metodo`}>{t.hero.tlink} <Arrow /></Link>
          </div>
        </div>
        <div className="hstats">
          {t.hero.stats.map((s, i) => (
            <div className="hstat" key={i}>
              <div className="n">
                {"pre" in s && s.pre ? <span className="u">{s.pre}</span> : null}
                {s.n}
                {"suf" in s && s.suf ? <span className="u">{s.suf}</span> : null}
              </div>
              <div className="l">{s.l}</div>
              {"demo" in s && s.demo ? <span className="demo">{t.demoLabel}</span> : null}
            </div>
          ))}
        </div>
      </section>

      {/* credential strip (light) */}
      <div className="strip">
        <div className="row">
          <div className="k">{t.strip.k}</div>
          <div className="items">
            {t.strip.items.map((it, i) => (
              <div className="it-cell" key={i}><b>{it.b}</b> {it.rest}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 02 COSA SIAMO (dark) */}
      <section className="sec dark">
        <div className="wrap">
          <span className="label h-eyebrow">{t.what.label}</span>
          <div className="def">
            <div>
              <p className="state">{t.what.state}<span className="ast">*</span></p>
              <p className="note">{t.what.note}</p>
            </div>
            <div className="rows">
              {t.what.rows.map((r, i) => (
                <div className="r" key={i}>
                  <div className="neg">{r.neg}</div>
                  <div className="pos">{r.pre}<b>{r.b}</b>{r.post}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="cat">{t.what.catPre}<b>{t.what.catB}</b>{t.what.catPost}</p>
        </div>
      </section>

      {/* 03 NUMERI (light) */}
      <section className="sec">
        <div className="wrap">
          <span className="label h-eyebrow">{t.numbers.label}</span>
          <div className="measure">
            <div className="copy">
              <h2 className="h2">{t.numbers.h2pre}<span className="hl">{t.numbers.h2hl}</span>{t.numbers.h2post}</h2>
              <p>{t.numbers.pPre}<b>{t.numbers.pB}</b>{t.numbers.pPost}</p>
            </div>
            <div className="statgrid">
              {t.numbers.cells.map((c, i) => (
                <div className={`cell ${"acc" in c && c.acc ? "acc" : ""}`.trim()} key={i}>
                  {"demo" in c && c.demo ? <span className="demo">{t.demoLabel}</span> : null}
                  <div className="n">{c.n}</div>
                  <div className="l">{c.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 METODO (dark) */}
      <section className="sec dark">
        <div className="wrap">
          <span className="label h-eyebrow">{t.method.label}</span>
          <h2 className="h2">{t.method.h2pre}<span className="hl">{t.method.h2hl}</span>{t.method.h2post}</h2>
          <p className="lead">{t.method.lead}</p>
          <MethodTabs phases={phases} />
        </div>
      </section>

      {/* 05 FOUNDER (light) */}
      <section className="sec">
        <div className="wrap">
          <span className="label h-eyebrow">{t.foundersSec.label}</span>
          <h2 className="h2">{t.foundersSec.h2pre}<span className="hl">{t.foundersSec.h2hl}</span>{t.foundersSec.h2post}</h2>
          <div className="team">
            {founders.map((f) => (
              <article className="mem" key={f.slug} id={f.slug}>
                <div className="portrait">
                  <Image src={f.image} alt={f.name} fill sizes="(max-width:900px) 50vw, 260px" />
                </div>
                <h3>{f.name}</h3>
                <div className="role">{f.role}</div>
                <p className="bio">{f.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 PROVA (light cards + dark pullquote) */}
      <section className="sec">
        <div className="wrap">
          <span className="label h-eyebrow">{t.proof.label}</span>
          <h2 className="h2">{t.proof.h2pre}<span className="hl">{t.proof.h2hl}</span>{t.proof.h2post}</h2>
          <div className="tgrid">
            {t.proof.cards.map((c, i) => (
              <div className="tcard" key={i}>
                <div className="qm" aria-hidden>&ldquo;</div>
                <p className="q">{c.q}</p>
                <p className="who"><b>{c.who}</b> <span>{c.ctx}</span></p>
                <span className="demo-tag">{t.proof.demoTag}</span>
              </div>
            ))}
          </div>
          <div className="pull">
            <span className="pq">&ldquo;{t.proof.pull.q}&rdquo;</span>
            <p className="who">{t.proof.pull.who}</p>
          </div>
        </div>
      </section>

      {/* 07 FORMAZIONE & COMMUNITY (light) */}
      <TrainingCTA locale={safeLocale} />

      {/* 08 CTA (light) */}
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
