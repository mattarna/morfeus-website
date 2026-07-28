import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const GLOSSARY_CHIP_MAP: Record<string, string> = {
  ROIometro: "roiometro",
  "Value Leak": "value-leak",
  MARF: "marf",
  embedded: "marf",
  "Value Report": "value-report",
  "AI Champion": "ai-champion",
};

const COPY = {
  it: {
    metaTitle: "Metodo — Morfeus",
    metaDesc:
      "Il metodo Morfeus: dalla perdita invisibile (Value Leak) al valore misurato in euro. Diagnosi col ROIometro, sistema MARF embedded, Value Report mensile, autonomia con l'AI Champion. Modello Pilot to Retainer: il rischio lo prendiamo noi.",
    hero: {
      eye: "Il metodo",
      h1a: "Dalla perdita invisibile al ",
      h1emph: "valore misurato",
      h1b: ".",
      copy: "Non un servizio a progetto, ma un sistema ripetibile. Troviamo dove la tua azienda perde margine, costruiamo i sistemi di AI che lo recuperano, e ti diciamo ogni mese quanto valore hai generato. In euro.",
      cta1: "Prova il ROIometro",
      cta2: "Parla con noi",
      proof: { pre: "▸ IL PATTO · ", b: "Dimostriamo prima", post: " · il rischio lo prendiamo noi · misurato in euro" },
      model: {
        k: "Il modello",
        step1: "Pilot",
        arr: "↓ criteri di accettazione oggettivi",
        step2: "Retainer",
        pBold: "Dimostriamo prima su un perimetro delimitato. Il rischio lo prendiamo noi.",
        pRest: " Superato il Pilot, diventiamo Operating Partner continuativo.",
      },
    },
    frame: {
      eye: "Il frame",
      h2a: "Non «come uso l'AI». ",
      h2emph: "Dove perdo valore",
      h2b: " mentre scalo.",
      lead: "Mentre un'azienda cresce, errori, tempo e dati frammentati degradano il margine senza che nessuno se ne accorga. Sono i Value Leak: le perdite invisibili. Noi le quantifichiamo in euro e costruiamo i sistemi che le prevengono. Non è taglio costi: è recupero strutturale di margine.",
      stats: [
        { n: "Value Leak", l: "le perdite di margine che le PMI non vedono" },
        { n: "Margin Recovery", l: "trovarle, quantificarle, chiuderle con l'AI" },
      ],
      lameA: "Senza governance, l'AI scala il caos. Con governance, scala il ",
      lameEmph: "valore",
      lameB: ".",
    },
    log: {
      eye: "Il dispositivo di prova",
      h2a: "La diagnosi non è una slide. È un ",
      h2emph: "log",
      h2b: ".",
      lead: "Quando entriamo, il sistema gira e lascia traccia. Ogni perdita trovata è un numero, non un'impressione.",
      tt: "morfeus · diagnose",
      cmd: "morfeus diagnose",
      l1: "03:47 · scanning processi · reparto per reparto...",
      hit: "▸ 12 perdite trovate · €31.400/mese",
      l2: "03:47 · report pronto · CRM aggiornato",
    },
    fasi: {
      eye: "Come lavoriamo · 4 fasi",
      h2a: "Quattro fasi, una sola ",
      h2emph: "disciplina",
      h2b: ".",
      lead: "Dalla diagnosi in euro all'autonomia interna: ogni fase ha un deliverable concreto, non una promessa.",
    },
    deliverLabel: "Deliverable",
    phases: [
      {
        pn: "01",
        h3: "Diagnosi",
        chips: ["ROIometro", "Value Leak"],
        p: "Mappiamo i processi reparto per reparto e troviamo dove si perde margine. Con il ROIometro la conversazione si sposta da «quanto costa Morfeus» a «quanto ti costa il problema»: una perdita mensile, in euro.",
        points: [
          "Diagnosi reparto per reparto, sui dati reali",
          "Perdita mensile quantificata in euro",
          "Nessuna slide: numeri su cui decidere",
        ],
        deliver: "La mappa dei Value Leak, in euro.",
      },
      {
        pn: "02",
        h3: "Sistema",
        chips: ["MARF", "embedded"],
        p: "Installiamo MARF dentro l'azienda: l'infrastruttura AI proprietaria di Morfeus. Non un SaaS, ma un layer embedded che raccoglie e pulisce i dati operativi, automatizza il lavoro ripetitivo e fa parlare tra loro i reparti per proteggere il margine.",
        points: [
          "Installata e personalizzata nei tuoi sistemi",
          "Dati operativi puliti e connessi",
          "Ogni progetto la rende più potente",
        ],
        deliver: "MARF in produzione, che gira ogni giorno.",
      },
      {
        pn: "03",
        h3: "Valore",
        chips: ["Value Report"],
        p: "I criteri di valore si definiscono oggettivamente all'inizio e si verificano ogni mese. Il COO riceve il log settimanale di cosa è stato fatto; il CEO il Value Report mensile: quanto valore è stato generato, in euro. Il rinnovo diventa una non-decisione.",
        points: [
          "Criteri di valore definiti a monte",
          "Log settimanale operativo al COO",
          "Value Report mensile al CEO",
        ],
        deliver: "Il Value Report mensile.",
      },
      {
        pn: "04",
        h3: "Autonomia",
        chips: ["AI Champion"],
        p: "Formiamo gli AI Champion: una persona per reparto, non necessariamente IT, che sperimenta, capisce cosa funziona, lo trasforma in procedura e lo passa ai colleghi. Così l'AI passa da dipendenza esterna a competenza interna scalabile.",
        points: [
          "Una persona per reparto, autonoma",
          "Procedure che restano in azienda",
          "Il sistema regge e cresce senza di noi",
        ],
        deliver: "La capability interna, permanente.",
      },
    ],
    model: {
      eye: "Il modello commerciale",
      h2a: "Dimostriamo prima. Decidi ",
      h2emph: "dopo",
      h2b: ".",
      lead: "Due fasi, un solo patto: il rischio della prova lo prendiamo noi. Superato il Pilot, il rinnovo diventa una non-decisione.",
      cards: [
        {
          ck: "Fase 1 · Pilot",
          ct: "Un perimetro, criteri chiari.",
          p: "Partiamo da un Pilot delimitato, con criteri di accettazione oggettivi e nessun impegno annuale a monte. Mostriamo il valore su un caso reale prima di chiederti di scalare.",
          sel: true,
        },
        {
          ck: "Fase 2 · Retainer",
          ct: "Operating Partner continuativo.",
          p: "Superato il Pilot, diventiamo il tuo Operating Partner: presenza continuativa, sistemi che evolvono, valore misurato ogni mese nel Value Report. Il rinnovo diventa una non-decisione.",
          sel: false,
        },
      ],
    },
    prodotti: {
      eye: "I due prodotti",
      h2a: "Lo stesso metodo prende ",
      h2emph: "due forme",
      h2b: ".",
      lead: "Uno costruisce i sistemi che restano in azienda. L'altro forma le persone che li usano. Spesso viaggiano insieme.",
      link: "Scopri",
      cards: [
        {
          ck: "Operating Partner",
          ct: "MARF",
          p: "L'AI si installa in azienda in circa 30 giorni e migliora ogni mese. Non un progetto: un'infrastruttura che resta.",
          bullets: ["Sistemi che recuperano margine", "Value Report mensile, in euro", "Canone, non giornate"],
          href: "forge",
        },
        {
          ck: "Formazione",
          ct: "LAB",
          p: "Il team impara a usare l'AI sui casi veri della tua azienda, fino a diventare autonomo.",
          bullets: ["Sui tuoi processi, non su slide", "Un LAB, tre porte", "AI Champion interni"],
          href: "lab",
        },
      ],
    },
    cta: {
      eye: "Parliamone",
      h2a: "Il problema che non vedi ha un ",
      h2emph: "prezzo",
      h2b: ". Calcolalo.",
      p: "Il primo passo non è un preventivo. È capire, in euro, dove la tua azienda perde valore ogni giorno.",
      cta1: "Prova il ROIometro ▸",
      cta2: "Parla con noi",
    },
  },
  en: {
    metaTitle: "Method — Morfeus",
    metaDesc:
      "The Morfeus method: from the invisible loss (Value Leak) to value measured in euros. Diagnosis with the ROIometro, embedded MARF system, monthly Value Report, autonomy with the AI Champion. Pilot to Retainer model: we take the risk.",
    hero: {
      eye: "The method",
      h1a: "From the invisible loss to ",
      h1emph: "measured value",
      h1b: ".",
      copy: "Not a project-based service, but a repeatable system. We find where your company loses margin, build the AI systems that recover it, and tell you every month how much value you generated. In euros.",
      cta1: "Try the ROIometro",
      cta2: "Talk to us",
      proof: { pre: "▸ THE PACT · ", b: "We prove it first", post: " · we take the risk · measured in euros" },
      model: {
        k: "The model",
        step1: "Pilot",
        arr: "↓ objective acceptance criteria",
        step2: "Retainer",
        pBold: "We prove it first on a bounded scope. We take the risk.",
        pRest: " Once the Pilot is passed, we become your continuous Operating Partner.",
      },
    },
    frame: {
      eye: "The frame",
      h2a: "Not «how I use AI». ",
      h2emph: "Where I lose value",
      h2b: " as I scale.",
      lead: "As a company grows, errors, time and fragmented data erode margin without anyone noticing. These are the Value Leaks: the invisible losses. We quantify them in euros and build the systems that prevent them. It's not cost-cutting: it's structural margin recovery.",
      stats: [
        { n: "Value Leak", l: "the margin losses SMEs don't see" },
        { n: "Margin Recovery", l: "find them, quantify them, close them with AI" },
      ],
      lameA: "Without governance, AI scales chaos. With governance, it scales ",
      lameEmph: "value",
      lameB: ".",
    },
    log: {
      eye: "The proof device",
      h2a: "The diagnosis isn't a slide. It's a ",
      h2emph: "log",
      h2b: ".",
      lead: "When we come in, the system runs and leaves a trace. Every loss found is a number, not an impression.",
      tt: "morfeus · diagnose",
      cmd: "morfeus diagnose",
      l1: "03:47 · scanning processes · department by department...",
      hit: "▸ 12 losses found · €31,400/month",
      l2: "03:47 · report ready · CRM updated",
    },
    fasi: {
      eye: "How we work · 4 phases",
      h2a: "Four phases, one single ",
      h2emph: "discipline",
      h2b: ".",
      lead: "From the diagnosis in euros to internal autonomy: every phase has a concrete deliverable, not a promise.",
    },
    deliverLabel: "Deliverable",
    phases: [
      {
        pn: "01",
        h3: "Diagnosis",
        chips: ["ROIometro", "Value Leak"],
        p: "We map processes department by department and find where margin is lost. With the ROIometro the conversation shifts from «how much does Morfeus cost» to «how much is the problem costing you»: a monthly loss, in euros.",
        points: [
          "Department-by-department diagnosis, on real data",
          "Monthly loss quantified in euros",
          "No slides: numbers to decide on",
        ],
        deliver: "The map of Value Leaks, in euros.",
      },
      {
        pn: "02",
        h3: "System",
        chips: ["MARF", "embedded"],
        p: "We install MARF inside the company: Morfeus's proprietary AI infrastructure. Not a SaaS, but an embedded layer that collects and cleans operational data, automates repetitive work, and makes departments talk to each other to protect margin.",
        points: [
          "Installed and customized in your systems",
          "Operational data cleaned and connected",
          "Every project makes it more powerful",
        ],
        deliver: "MARF in production, running every day.",
      },
      {
        pn: "03",
        h3: "Value",
        chips: ["Value Report"],
        p: "Value criteria are defined objectively upfront and verified every month. The COO gets the weekly log of what was done; the CEO the monthly Value Report: how much value was generated, in euros. Renewal becomes a non-decision.",
        points: [
          "Value criteria agreed upfront",
          "Weekly operational log to the COO",
          "Monthly Value Report to the CEO",
        ],
        deliver: "The monthly Value Report.",
      },
      {
        pn: "04",
        h3: "Autonomy",
        chips: ["AI Champion"],
        p: "We train the AI Champions: one person per department, not necessarily IT, who experiments, understands what works, turns it into a procedure and passes it on to colleagues. AI goes from external dependency to a scalable internal skill.",
        points: [
          "One autonomous person per department",
          "Procedures that stay in the company",
          "The system holds and grows without us",
        ],
        deliver: "The internal capability, permanent.",
      },
    ],
    model: {
      eye: "The commercial model",
      h2a: "We prove it first. You decide ",
      h2emph: "after",
      h2b: ".",
      lead: "Two phases, one single pact: we take the risk of the proof. Once the Pilot is passed, renewal becomes a non-decision.",
      cards: [
        {
          ck: "Phase 1 · Pilot",
          ct: "One scope, clear criteria.",
          p: "We start from a bounded Pilot, with objective acceptance criteria and no upfront annual commitment. We show value on a real case before asking you to scale.",
          sel: true,
        },
        {
          ck: "Phase 2 · Retainer",
          ct: "Continuous Operating Partner.",
          p: "Once the Pilot is passed, we become your Operating Partner: continuous presence, systems that evolve, value measured every month in the Value Report. Renewal becomes a non-decision.",
          sel: false,
        },
      ],
    },
    prodotti: {
      eye: "Two products",
      h2a: "The same method takes ",
      h2emph: "two forms",
      h2b: ".",
      lead: "One builds the systems that stay in the company. The other trains the people who use them. Often they travel together.",
      link: "Discover",
      cards: [
        {
          ck: "Operating Partner",
          ct: "MARF",
          p: "AI installs inside the company in about 30 days and improves every month. Not a project: infrastructure that stays.",
          bullets: ["Systems that recover margin", "Monthly Value Report, in euros", "A retainer, not billed days"],
          href: "forge",
        },
        {
          ck: "Training",
          ct: "LAB",
          p: "The team learns to use AI on your company's real cases, all the way to autonomy.",
          bullets: ["On your processes, not slides", "One LAB, three doors", "Internal AI Champions"],
          href: "lab",
        },
      ],
    },
    cta: {
      eye: "Let's talk",
      h2a: "The problem you don't see has a ",
      h2emph: "price",
      h2b: ". Calculate it.",
      p: "The first step isn't a quote. It's understanding, in euros, where your company loses value every day.",
      cta1: "Try the ROIometro ▸",
      cta2: "Talk to us",
    },
  },
} as const;

/* Icone dei due prodotti (stroke = currentColor, colorate via .card .ico). */
const PROD_ICONS = [
  // MARF → infrastruttura / chip
  <svg key="p0" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="1.5" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </svg>,
  // LAB → formazione / tocco
  <svg key="p1" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
  </svg>,
];

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("metodo", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/metodo`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
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

  const chipClass =
    "font-plex text-[11px] tracking-[0.02em] text-firma bg-firma/[0.07] border border-firma/30 rounded-md px-2.5 py-[5px]";

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
          <div className="grid gap-10 md:grid-cols-[1.45fr_.85fr] items-start">
            <div>
              <div className="eye">{t.hero.eye}</div>
              <h1>
                {t.hero.h1a}
                <span className="emph">{t.hero.h1emph}</span>
                {t.hero.h1b}
              </h1>
              <p className="copy">{t.hero.copy}</p>
              <div className="cta-row">
                <Link className="btn btn-1" href={`${base}/roiometro`}>
                  {t.hero.cta1}
                </Link>
                <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com">
                  {t.hero.cta2}
                </a>
              </div>
              <p className="proofline">
                {t.hero.proof.pre}
                <b>{t.hero.proof.b}</b>
                {t.hero.proof.post}
              </p>
            </div>
            <div className="rounded-xl p-6 border border-riga-scuro bg-white/[0.02]">
              <div className="font-plex text-[10px] tracking-[0.14em] uppercase text-lilla">
                {t.hero.model.k}
              </div>
              <div className="flex items-center gap-3 mt-4 font-clash font-semibold text-[19px] text-carta">
                <span className="w-[7px] h-[7px] rounded-full bg-firma shrink-0" aria-hidden />
                {t.hero.model.step1}
              </div>
              <div className="font-plex text-[11px] text-ombra my-2 ml-[3px] pl-3.5 border-l border-riga-scuro">
                {t.hero.model.arr}
              </div>
              <div className="flex items-center gap-3 mt-2 font-clash font-semibold text-[19px] text-carta">
                <span className="w-[7px] h-[7px] rounded-full bg-firma shrink-0" aria-hidden />
                {t.hero.model.step2}
              </div>
              <p className="text-[#c2c6d4] text-[13.5px] mt-4 leading-relaxed">
                <b className="text-carta font-semibold">{t.hero.model.pBold}</b>
                {t.hero.model.pRest}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · IL FRAME · CARTA */}
      <section className="band carta" id="frame">
        <div className="wrap">
          <div className="eye">{t.frame.eye}</div>
          <h2 className="h-sect">
            {t.frame.h2a}
            <span className="emph">{t.frame.h2emph}</span>
            {t.frame.h2b}
          </h2>
          <p className="lead">{t.frame.lead}</p>
          <div className="grid sm:grid-cols-2 gap-5 mt-8 border-t border-[rgba(11,11,12,0.16)]">
            {t.frame.stats.map((s) => (
              <div className="pt-6" key={s.n}>
                <div className="font-clash font-semibold text-[clamp(24px,3.2vw,32px)] tracking-[-0.02em] text-firma">
                  {s.n}
                </div>
                <div className="text-[#3a3b45] text-sm mt-2 max-w-[30ch]">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="font-clash font-medium text-[clamp(18px,2.4vw,26px)] leading-[1.3] mt-11 max-w-[26ch] text-inchiostro">
            {t.frame.lameA}
            <span className="emph">{t.frame.lameEmph}</span>
            {t.frame.lameB}
          </p>
        </div>
      </section>

      {/* 03 · LOG A VISTA · INCHIOSTRO */}
      <section className="band ink" id="log">
        <div className="wrap">
          <div className="eye">{t.log.eye}</div>
          <h2 className="h-sect">
            {t.log.h2a}
            <span className="emph">{t.log.h2emph}</span>
            {t.log.h2b}
          </h2>
          <p className="lead">{t.log.lead}</p>
          <div className="mt-6 border border-riga-scuro rounded-xl bg-black/[0.28] overflow-hidden max-w-[640px]">
            <div className="flex items-center gap-2 px-4 py-[11px] border-b border-riga-scuro">
              <span className="w-[9px] h-[9px] rounded-full bg-riga-scuro" aria-hidden />
              <span className="w-[9px] h-[9px] rounded-full bg-riga-scuro" aria-hidden />
              <span className="w-[9px] h-[9px] rounded-full bg-riga-scuro" aria-hidden />
              <span className="font-plex text-[10px] tracking-[0.12em] uppercase text-ombra ml-1.5">
                {t.log.tt}
              </span>
            </div>
            <pre className="font-plex text-[13px] leading-[1.9] text-[#aeb2c2] px-5 py-[18px] whitespace-pre-wrap break-words">
              <span className="text-lilla">$</span> <span className="text-lilla">{t.log.cmd}</span>
              {"\n"}
              {t.log.l1}
              {"\n"}
              <span className="text-ok font-semibold">{t.log.hit}</span>
              {"\n"}
              {t.log.l2}
            </pre>
          </div>
        </div>
      </section>

      {/* 04 · LE 4 FASI · CARTA */}
      <section className="band carta" id="fasi">
        <div className="wrap">
          <div className="eye">{t.fasi.eye}</div>
          <h2 className="h-sect">
            {t.fasi.h2a}
            <span className="emph">{t.fasi.h2emph}</span>
            {t.fasi.h2b}
          </h2>
          <p className="lead">{t.fasi.lead}</p>
          <div className="mt-8">
            {t.phases.map((p) => (
              <div
                className="grid md:grid-cols-[.72fr_1.28fr] gap-11 items-start py-11 border-t border-[rgba(11,11,12,0.16)] first:border-t-0 first:pt-1.5"
                id={p.pn}
                key={p.pn}
              >
                <div>
                  <div className="font-plex text-[13px] tracking-[0.04em] text-firma">{p.pn}</div>
                  <h3 className="font-clash font-semibold text-[clamp(22px,3vw,30px)] mt-2.5 text-inchiostro">
                    {p.h3}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.chips.map((c) => {
                      const glossaryId = GLOSSARY_CHIP_MAP[c];
                      if (!glossaryId) {
                        return (
                          <span className={chipClass} key={c}>
                            {c}
                          </span>
                        );
                      }

                      return (
                        <Link className={chipClass} href={`${base}/glossario#${glossaryId}`} key={c}>
                          {c}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-base text-[#3a3b45]">{p.p}</p>
                  <ul className="list-none mt-[18px] flex flex-col gap-2.5">
                    {p.points.map((pt) => (
                      <li
                        className="grid grid-cols-[auto_1fr] gap-3 text-[#3a3b45] text-[15px]"
                        key={pt}
                      >
                        <span className="text-firma font-plex" aria-hidden>
                          →
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-[22px] inline-flex items-center gap-3 font-playfair italic text-[17px] text-inchiostro">
                    <span className="font-plex not-italic text-[10px] font-semibold tracking-[0.12em] uppercase text-firma border border-[rgba(11,11,12,0.14)] rounded-md px-[9px] py-[5px]">
                      {t.deliverLabel}
                    </span>
                    {p.deliver}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · MODELLO COMMERCIALE · INCHIOSTRO */}
      <section className="band ink" id="modello">
        <div className="wrap">
          <div className="eye">{t.model.eye}</div>
          <h2 className="h-sect">
            {t.model.h2a}
            <span className="emph">{t.model.h2emph}</span>
            {t.model.h2b}
          </h2>
          <p className="lead">{t.model.lead}</p>
          <div className="two" style={{ marginTop: 26 }}>
            {t.model.cards.map((c) => (
              <div className={c.sel ? "card sel" : "card"} key={c.ck}>
                <div className="ck">{c.ck}</div>
                <div className="ct">{c.ct}</div>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · I DUE PRODOTTI · CARTA */}
      <section className="band carta" id="prodotti">
        <div className="wrap">
          <div className="eye">{t.prodotti.eye}</div>
          <h2 className="h-sect">
            {t.prodotti.h2a}
            <span className="emph">{t.prodotti.h2emph}</span>
            {t.prodotti.h2b}
          </h2>
          <p className="lead">{t.prodotti.lead}</p>
          <div className="two" style={{ marginTop: 28 }}>
            {t.prodotti.cards.map((c, i) => (
              <div className="card" key={c.ct}>
                {PROD_ICONS[i]}
                <div className="ck">{c.ck}</div>
                <div className="ct">{c.ct}</div>
                <p>{c.p}</p>
                <ul className="blist gain">
                  {c.bullets.map((b, j) => (
                    <li key={j}>
                      <span className="bd" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: 16 }}>
                  <Link className="btn btn-3" href={`${base}/${c.href}`}>
                    {t.prodotti.link} {c.ct} ▸
                  </Link>
                </p>
              </div>
            ))}
          </div>
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
            <Link className="btn btn-1" href={`${base}/roiometro`}>
              {t.cta.cta1}
            </Link>
            <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com">
              {t.cta.cta2}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
