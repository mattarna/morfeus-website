import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const BOOKING_URL =
  "https://marf.alexcarofiglio.com/book/morfeushub?utm_source=website&utm_medium=organic&utm_campaign=website";

/* Casi reali del cluster expertise-business (fonte: /casi). */
const CASE_HREFS = ["ag-academy-onboarding", "scalers-pre-sales", "globia-scoring-deterministico"] as const;

const COPY = {
  it: {
    metaTitle: "MARF · Operating Partner AI · Morfeus",
    metaDesc:
      "MARF è il sistema operativo AI per chi vende expertise: installato in ~30 giorni, migliora ogni mese. Non sviluppo custom a giornate, ma un prodotto che resta in azienda.",
    hero: {
      eye: "Operating Partner · MARF",
      h1a: "Il sistema operativo AI per chi vende ",
      h1emph: "expertise",
      h1b: ".",
      copy: "Non un team che sviluppa a giornate: un prodotto. MARF si installa dentro la tua azienda in circa 30 giorni e migliora ogni mese. L'AI smette di essere un progetto e diventa infrastruttura che resta.",
      lame: "«Paghi lo sviluppo una volta. Il sistema lo tieni per sempre.»",
      cta1: "Richiedi l'assessment gratuito",
      cta2: "Cos'è MARF",
      proof: {
        pre: "▸ PROVA · ",
        b1: "60+ sistemi in produzione",
        mid: " · installato su un'agenzia da ~70 persone e su un cliente €30-40M · dal ",
        b2: "2023",
        post: "",
      },
    },
    problema: {
      eye: "Perché l'AI non ti ha ancora dato ROI",
      h2a: "L'AI a progetti sempre diversi non lascia ",
      h2emph: "asset",
      h2b: ".",
      lead: "Ogni consulenza riparte da zero. Paghi lo sviluppo, ma non accumuli un sistema: il valore se ne va con il fornitore. Dopo sei mesi hai speso, e in mano non resta un'infrastruttura, solo qualche automazione slegata.",
      cards: [
        {
          ck: "A01",
          ct: "Reinventi ogni volta",
          p: "Ogni progetto custom riparte dal foglio bianco. Zero economia di scala, zero memoria.",
        },
        {
          ck: "A02",
          ct: "Il valore esce col fornitore",
          p: "Quando il rapporto finisce, la conoscenza se ne va. Restano pezzi che nessuno sa più far evolvere.",
        },
        {
          ck: "A03",
          ct: "Paghi giornate, non risultati",
          p: "Il custom a tempo premia le ore, non l'impatto. Il tuo margine non entra mai nell'equazione.",
        },
      ],
      pivota: "MARF ribalta questo: ",
      pivotb: "un prodotto che resta in azienda",
      pivotc: " e a ogni progetto diventa più forte. Non compri ore, installi un sistema.",
      curve: {
        axisT: "Tempo →",
        loss: {
          tag: "Valore che decade",
          title: "Progetto spot",
          sub: "Consulenza · agenzia AI · a tempo",
          bullets: [
            "Ogni intervento riparte da zero",
            "Il valore decade dopo la consegna",
            "Dipendi dal progetto successivo",
          ],
        },
        gain: {
          tag: "Valore che compone",
          title: "Sistema MARF",
          sub: "Operating Partner AI · Morfeus",
          bullets: [
            "Ogni sistema rinforza i precedenti",
            "Il valore si accumula mese dopo mese",
            "L'azienda diventa più efficiente nel tempo",
          ],
        },
      },
    },
    marf: {
      eye: "Il prodotto",
      h2a: "Un'infrastruttura AI che vive nei tuoi ",
      h2emph: "processi",
      h2b: ".",
      cards: [
        { n: "01", t: "Raccoglie e pulisce", p: "Porta dentro i dati operativi di ogni reparto e li rende affidabili." },
        { n: "02", t: "Automatizza", p: "Toglie il lavoro ripetitivo e standardizza ciò che oggi dipende dalle persone." },
        { n: "03", t: "Connette", p: "Fa parlare i dati tra reparti, così le decisioni arrivano in tempo." },
      ],
      framea: "Non un SaaS che apri e chiudi: ",
      frameb: "un prodotto con un team dietro",
      framec: ", installato e personalizzato dentro la tua azienda.",
      compound:
        "Ogni mese che passa, MARF conosce meglio la tua azienda: il costo di ogni nuovo intervento scende, il valore accumulato sale.",
      link: "Approfondisci come funziona MARF ▸",
    },
    scala: {
      eye: "Il percorso",
      h2a: "Si parte da un numero, non da un ",
      h2emph: "contratto",
      h2b: ".",
      lead: "Nessun salto nel vuoto. Ogni gradino dimostra valore prima del successivo: il rischio è nostro, non tuo.",
      steps: [
        {
          n: "0",
          t: "Assessment gratuito",
          p: "Il License Check: ti diciamo, con un numero concreto, dove stai lasciando valore sul tavolo.",
        },
        {
          n: "1",
          t: "Assessment a pagamento",
          p: "La diagnosi completa: dove si perde margine, cosa si recupera, con quali priorità.",
        },
        {
          n: "2",
          t: "Sprint MARF · 30 giorni",
          p: "Un primo progetto reale, mai un trial. Tocchi con mano il sistema prima di impegnarti.",
        },
        {
          n: "3",
          t: "Canone + Value Report",
          p: "MARF vive in azienda e migliora ogni mese. Ogni mese un report: valore generato, in euro.",
        },
      ],
      cta: "Richiedi l'assessment gratuito",
      belief: {
        eye: "Perché adesso",
        noTitle: "La convinzione",
        no: [
          "«Prima cresciamo, poi sistemiamo le operazioni.»",
          "«L'AI possiamo affrontarla più avanti.»",
          "«Il problema che non vedo può aspettare.»",
        ],
        yesTitle: "La realtà",
        yes: [
          "Più cresci, più alto è il costo di non aver agito oggi",
          "I costi nascosti mettono radici: diventano strutturali",
          "Il problema che non vedi ha comunque un prezzo",
        ],
        note: "Agire oggi costa meno che agire tra sei mesi, su un'azienda più complessa.",
      },
    },
    filtro: {
      eye: "Il filtro",
      h2a: "Funziona dove c'è un founder che può ",
      h2emph: "decidere",
      h2b: ".",
      lead: "Non è una questione di taglia. È una questione di governance: chi decide, e chi ti dà accesso a chi lavora davvero.",
      yesTitle: "Sei nel posto giusto se",
      yes: [
        "Vendi expertise: agenzia, formazione, consulenza, servizi professionali",
        "C'è un founder o una leadership ristretta che decide",
        "Siete da ~15 persone in su",
        "Dai accesso diretto ai team operativi",
        "Ragioni in ROI, non in costo",
      ],
      noTitle: "Meglio più avanti se",
      no: [
        "Sei una corporate con più livelli di approvazione",
        "Vuoi 'solo provare l'AI' senza un obiettivo operativo",
        "La decisione è diffusa e lenta",
        "Confronti il prezzo con un software",
      ],
      note: "La domanda che conta non è quanto fatturi. È: quanti siete?",
    },
    casi: {
      eye: "La prova",
      h2a: "Aziende come la tua, col ",
      h2emph: "timbro",
      h2b: ".",
      lead: "Expertise business founder-led. La perdita trovata, il sistema costruito, il valore recuperato in euro.",
      stamp: "Confermato",
      open: "Apri il dossier ▸",
      all: "Tutti i casi ▸",
      cards: [
        {
          meta: "CASO #013 · AG ACADEMY · ACADEMY HIGH-TICKET",
          qa: "«Chiudi la vendita. Poi lo studente sparisce nel ",
          qEmph: "buco nero",
          qb: ".»",
          whoB: "25% → 6%",
          whoRest: " rimborsi a 14 giorni · primo accesso da giorni a ore · zero studenti persi",
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
          meta: "CASO #068 · GLOBIA · CONSULENZA & DUE DILIGENCE",
          qa: "«Il numero cambiava a ogni click, e ci mettevano la ",
          qEmph: "firma",
          qb: ".»",
          whoB: "-60%",
          whoRest: " sul tempo di valutazione · riproducibilità 100% · numero difendibile",
        },
      ],
    },
    ponte: {
      eye: "Organizzazioni strutturate",
      h2a: "Troppo grande per un founder unico? Operiamo dentro ",
      h2emph: "Astrolize",
      h2b: ".",
      copy: "Se la tua è una corporate a più livelli, PE-owned o in un contesto regolamentato, MARF da sola non è lo strumento giusto. Ma siamo lo stesso gruppo: dentro Astrolize trovi venture studio, deployment enterprise e la potenza di fuoco per contesti dove serve di più. Non ti perdiamo: ti portiamo dove il problema si risolve davvero.",
      cta: "Parliamone via Astrolize",
    },
    cta: {
      eye: "Il primo passo",
      h2a: "Il primo passo è un numero, ed è ",
      h2emph: "gratis",
      h2b: ".",
      p: "Richiedi il License Check: in poco tempo ti diciamo dove la tua azienda lascia valore sul tavolo. Senza impegno, senza preventivo.",
      cta1: "Richiedi l'assessment gratuito",
      cta2: "Scrivici",
    },
  },
  en: {
    metaTitle: "MARF · AI Operating Partner · Morfeus",
    metaDesc:
      "MARF is the AI operating system for expertise-led businesses: installed in ~30 days, better every month. Not custom dev by the day, but a product that stays in the company.",
    hero: {
      eye: "Operating Partner · MARF",
      h1a: "The AI operating system for businesses that sell ",
      h1emph: "expertise",
      h1b: ".",
      copy: "Not a team that develops by the day: a product. MARF installs inside your company in about 30 days and improves every month. AI stops being a project and becomes infrastructure that stays.",
      lame: "«You pay for the build once. The system, you keep for good.»",
      cta1: "Request the free assessment",
      cta2: "What is MARF",
      proof: {
        pre: "▸ PROOF · ",
        b1: "60+ systems in production",
        mid: " · installed at a ~70-person agency and a €30-40M client · since ",
        b2: "2023",
        post: "",
      },
    },
    problema: {
      eye: "Why AI hasn't given you ROI yet",
      h2a: "AI run as ever-different projects leaves no ",
      h2emph: "assets",
      h2b: ".",
      lead: "Every engagement starts from scratch. You pay for the build but never accumulate a system: the value leaves with the vendor. Six months in, you've spent, and you're left with no infrastructure, just a few disconnected automations.",
      cards: [
        {
          ck: "A01",
          ct: "You reinvent every time",
          p: "Every custom project starts from a blank page. Zero economies of scale, zero memory.",
        },
        {
          ck: "A02",
          ct: "Value leaves with the vendor",
          p: "When the relationship ends, the knowledge goes. You're left with parts no one can evolve.",
        },
        {
          ck: "A03",
          ct: "You pay for days, not results",
          p: "Time-based custom rewards hours, not impact. Your margin never enters the equation.",
        },
      ],
      pivota: "MARF flips this: ",
      pivotb: "a product that stays in the company",
      pivotc: " and gets stronger with every project. You don't buy hours, you install a system.",
      curve: {
        axisT: "Time →",
        loss: {
          tag: "Value that decays",
          title: "One-off project",
          sub: "Consulting · AI agency · time-bound",
          bullets: [
            "Every intervention starts from zero",
            "Value decays after delivery",
            "You depend on the next project",
          ],
        },
        gain: {
          tag: "Value that compounds",
          title: "MARF system",
          sub: "AI Operating Partner · Morfeus",
          bullets: [
            "Every system strengthens the previous ones",
            "Value accumulates month after month",
            "The company gets more efficient over time",
          ],
        },
      },
    },
    marf: {
      eye: "The product",
      h2a: "An AI infrastructure that lives in your ",
      h2emph: "processes",
      h2b: ".",
      cards: [
        { n: "01", t: "Collects and cleans", p: "Brings in the operational data from every department and makes it reliable." },
        { n: "02", t: "Automates", p: "Removes repetitive work and standardizes what today depends on people." },
        { n: "03", t: "Connects", p: "Makes data talk across departments, so decisions arrive on time." },
      ],
      framea: "Not a SaaS you open and close: ",
      frameb: "a product with a team behind it",
      framec: ", installed and customized inside your company.",
      compound:
        "Every month that passes, MARF understands your company better: the cost of each new intervention drops, the accumulated value rises.",
      link: "See how MARF works ▸",
    },
    scala: {
      eye: "The path",
      h2a: "It starts with a number, not a ",
      h2emph: "contract",
      h2b: ".",
      lead: "No leap in the dark. Each step proves value before the next: the risk is ours, not yours.",
      steps: [
        {
          n: "0",
          t: "Free assessment",
          p: "The License Check: with a concrete number, we tell you where you're leaving value on the table.",
        },
        {
          n: "1",
          t: "Paid assessment",
          p: "The full diagnosis: where margin leaks, what can be recovered, in what priority.",
        },
        {
          n: "2",
          t: "MARF Sprint · 30 days",
          p: "A first real project, never a trial. You feel the system before you commit.",
        },
        {
          n: "3",
          t: "Retainer + Value Report",
          p: "MARF lives in the company and improves monthly. Every month, a report: value generated, in euros.",
        },
      ],
      cta: "Request the free assessment",
      belief: {
        eye: "Why now",
        noTitle: "The belief",
        no: [
          "«First we grow, then we fix operations.»",
          "«We can tackle AI later.»",
          "«The problem I don't see can wait.»",
        ],
        yesTitle: "The reality",
        yes: [
          "The more you grow, the higher the cost of not acting today",
          "Hidden costs take root: they become structural",
          "The problem you don't see has a price anyway",
        ],
        note: "Acting today costs less than acting in six months, on a more complex company.",
      },
    },
    filtro: {
      eye: "The filter",
      h2a: "It works where there's a founder who can ",
      h2emph: "decide",
      h2b: ".",
      lead: "It's not about size. It's about governance: who decides, and who gives you access to the people who actually do the work.",
      yesTitle: "You're in the right place if",
      yes: [
        "You sell expertise: agency, training, consulting, professional services",
        "There's a founder or a small leadership that decides",
        "You're ~15 people and up",
        "You give direct access to the operating teams",
        "You think in ROI, not cost",
      ],
      noTitle: "Better later if",
      no: [
        "You're a corporate with multiple approval layers",
        "You want to 'just try AI' with no operational goal",
        "The decision is diffuse and slow",
        "You compare the price to a piece of software",
      ],
      note: "The question that matters isn't how much you bill. It's: how many are you?",
    },
    casi: {
      eye: "The proof",
      h2a: "Companies like yours, with the ",
      h2emph: "stamp",
      h2b: ".",
      lead: "Founder-led expertise businesses. The loss found, the system built, the value recovered in euros.",
      stamp: "Confirmed",
      open: "Open the dossier ▸",
      all: "All cases ▸",
      cards: [
        {
          meta: "CASE #013 · AG ACADEMY · HIGH-TICKET ACADEMY",
          qa: "«You close the sale. Then the student vanishes into a ",
          qEmph: "black hole",
          qb: ".»",
          whoB: "25% → 6%",
          whoRest: " refunds at 14 days · first access from days to hours · zero students lost",
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
          meta: "CASE #068 · GLOBIA · CONSULTING & DUE DILIGENCE",
          qa: "«The number changed on every click, and they put their ",
          qEmph: "signature",
          qb: " on it.»",
          whoB: "-60%",
          whoRest: " on assessment time · 100% reproducibility · a defensible number",
        },
      ],
    },
    ponte: {
      eye: "Structured organizations",
      h2a: "Too big for a single founder? We operate inside ",
      h2emph: "Astrolize",
      h2b: ".",
      copy: "If yours is a multi-layer corporate, PE-owned or in a regulated context, MARF alone isn't the right tool. But we're the same group: inside Astrolize you'll find a venture studio, enterprise deployment and the firepower for contexts that need more. We don't lose you: we take you where the problem actually gets solved.",
      cta: "Let's talk via Astrolize",
    },
    cta: {
      eye: "The first step",
      h2a: "The first step is a number, and it's ",
      h2emph: "free",
      h2b: ".",
      p: "Request the License Check: in a short time we tell you where your company leaves value on the table. No commitment, no quote.",
      cta1: "Request the free assessment",
      cta2: "Write to us",
    },
  },
} as const;

/* Icone dei 3 movimenti MARF (stroke = currentColor, colorate via .card .ico). */
const MARF_ICONS = [
  // 01 · Raccoglie e pulisce → database/strati
  <svg key="i0" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>,
  // 02 · Automatizza → fulmine
  <svg key="i1" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>,
  // 03 · Connette → nodi
  <svg key="i2" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="5" cy="6" r="2.3" />
    <circle cx="19" cy="6" r="2.3" />
    <circle cx="12" cy="18" r="2.3" />
    <path d="M7 6h10M6.6 7.9 10.8 16.2M17.4 7.9 13.2 16.2" />
  </svg>,
];

/* Curva "valore che decade": sale a un picco, poi crolla verso lo zero. */
const CurveLossPlot = (
  <svg className="plot" viewBox="0 0 320 140" fill="none" aria-hidden="true">
    <line className="grid-l" x1="8" y1="42" x2="312" y2="42" />
    <line className="grid-l" x1="8" y1="82" x2="312" y2="82" />
    <line className="grid-l" x1="8" y1="122" x2="312" y2="122" />
    <path className="area" d="M8,120 C30,120 52,36 88,42 C128,47 152,98 200,110 C250,122 286,120 312,120 L312,130 L8,130 Z" />
    <path className="line" d="M8,120 C30,120 52,36 88,42 C128,47 152,98 200,110 C250,122 286,120 312,120" />
    <circle className="end" cx="312" cy="120" r="3.5" />
  </svg>
);

/* Curva "valore che compone": piatta all'inizio, poi accelera verso l'alto. */
const CurveGainPlot = (
  <svg className="plot" viewBox="0 0 320 140" fill="none" aria-hidden="true">
    <line className="grid-l" x1="8" y1="42" x2="312" y2="42" />
    <line className="grid-l" x1="8" y1="82" x2="312" y2="82" />
    <line className="grid-l" x1="8" y1="122" x2="312" y2="122" />
    <path className="area" d="M8,120 C86,118 142,108 200,90 C250,74 286,50 312,20 L312,130 L8,130 Z" />
    <path className="line" d="M8,120 C86,118 142,108 200,90 C250,74 286,50 312,20" />
    <circle className="end" cx="312" cy="20" r="3.5" />
  </svg>
);

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("forge", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/forge`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function ForgePage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${safeLocale}/forge#webpage`,
        url: `${SITE_URL}/${safeLocale}/forge`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "Service",
        name: "MARF · AI Operating Partner",
        serviceType: "AI Operating Partner",
        provider: { "@id": ORGANIZATION_ID },
        description: t.metaDesc,
        areaServed: "IT",
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
            <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {t.hero.cta1}
            </a>
            <a className="btn btn-2-carta" href="#cosa-marf">
              {t.hero.cta2}
            </a>
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

      {/* 02 · IL PROBLEMA (belief shift) · CARTA */}
      <section className="band carta" id="problema">
        <div className="wrap">
          <div className="eye">{t.problema.eye}</div>
          <h2 className="h-sect">
            {t.problema.h2a}
            <span className="emph">{t.problema.h2emph}</span>
            {t.problema.h2b}
          </h2>
          <p className="lead">{t.problema.lead}</p>
          <div className="three" style={{ marginTop: 26 }}>
            {t.problema.cards.map((c, i) => (
              <div className="card" key={i}>
                <div className="ck">{c.ck}</div>
                <div className="ct">{c.ct}</div>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
          <div className="curve">
            <div className="curve-card loss">
              <div className="chead">
                <div>
                  <div className="ctit">{t.problema.curve.loss.title}</div>
                  <div className="csub">{t.problema.curve.loss.sub}</div>
                </div>
                <span className="ctag">{t.problema.curve.loss.tag}</span>
              </div>
              {CurveLossPlot}
              <div className="axis">
                <span>{t.problema.curve.axisT}</span>
              </div>
              <ul>
                {t.problema.curve.loss.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="dot" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="curve-card gain">
              <div className="chead">
                <div>
                  <div className="ctit">{t.problema.curve.gain.title}</div>
                  <div className="csub">{t.problema.curve.gain.sub}</div>
                </div>
                <span className="ctag">{t.problema.curve.gain.tag}</span>
              </div>
              {CurveGainPlot}
              <div className="axis">
                <span>{t.problema.curve.axisT}</span>
              </div>
              <ul>
                {t.problema.curve.gain.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="dot" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="cat" style={{ marginTop: 26 }}>
            {t.problema.pivota}
            <b>{t.problema.pivotb}</b>
            {t.problema.pivotc}
          </p>
        </div>
      </section>

      {/* 03 · COS'È MARF · INCHIOSTRO */}
      <section className="band ink" id="cosa-marf">
        <div className="wrap">
          <div className="eye">{t.marf.eye}</div>
          <h2 className="h-sect">
            {t.marf.h2a}
            <span className="emph">{t.marf.h2emph}</span>
            {t.marf.h2b}
          </h2>
          <div className="three" style={{ marginTop: 28 }}>
            {t.marf.cards.map((c, i) => (
              <div className="card" key={i}>
                {MARF_ICONS[i]}
                <div className="ck">{c.n}</div>
                <div className="ct">{c.t}</div>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
          <p className="cat" style={{ marginTop: 26 }}>
            {t.marf.framea}
            <b>{t.marf.frameb}</b>
            {t.marf.framec}
          </p>
          <p className="compound">{t.marf.compound}</p>
          <p style={{ marginTop: 18 }}>
            <Link className="btn btn-3" href={`${base}/marf`}>
              {t.marf.link}
            </Link>
          </p>
        </div>
      </section>

      {/* 04 · COME SI ENTRA (la scala) · CARTA */}
      <section className="band carta" id="percorso">
        <div className="wrap">
          <div className="eye">{t.scala.eye}</div>
          <h2 className="h-sect">
            {t.scala.h2a}
            <span className="emph">{t.scala.h2emph}</span>
            {t.scala.h2b}
          </h2>
          <p className="lead">{t.scala.lead}</p>
          <div className="four" style={{ marginTop: 28 }}>
            {t.scala.steps.map((s, i) => (
              <div className="card" key={i}>
                <div className="ck">
                  {isIt ? "GRADINO" : "STEP"} {s.n}
                </div>
                <div className="ct">{s.t}</div>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="eye" style={{ marginTop: 44 }}>
            {t.scala.belief.eye}
          </div>
          <div className="isnot" style={{ marginTop: 14 }}>
            <div className="col no">
              <div className="t">{t.scala.belief.noTitle}</div>
              <ul>
                {t.scala.belief.no.map((x, i) => (
                  <li key={i}>
                    <span className="m">✕</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col yes">
              <div className="t">{t.scala.belief.yesTitle}</div>
              <ul>
                {t.scala.belief.yes.map((x, i) => (
                  <li key={i}>
                    <span className="m">→</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="cat" style={{ marginTop: 20 }}>
            <b>{t.scala.belief.note}</b>
          </p>
          <div className="cta-row" style={{ marginTop: 30 }}>
            <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {t.scala.cta}
            </a>
          </div>
        </div>
      </section>

      {/* 05 · PER CHI · E PER CHI NO · INCHIOSTRO */}
      <section className="band ink" id="filtro">
        <div className="wrap">
          <div className="eye">{t.filtro.eye}</div>
          <h2 className="h-sect">
            {t.filtro.h2a}
            <span className="emph">{t.filtro.h2emph}</span>
            {t.filtro.h2b}
          </h2>
          <p className="lead">{t.filtro.lead}</p>
          <div className="two" style={{ marginTop: 26 }}>
            <div className="card sel">
              <div className="ct">{t.filtro.yesTitle}</div>
              <ul className="mt-4 space-y-2.5 font-satoshi text-[14.5px] leading-snug">
                {t.filtro.yes.map((x, i) => (
                  <li className="flex gap-2.5" key={i}>
                    <span style={{ color: "var(--ok)" }}>✓</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="ct">{t.filtro.noTitle}</div>
              <ul className="mt-4 space-y-2.5 font-satoshi text-[14.5px] leading-snug">
                {t.filtro.no.map((x, i) => (
                  <li className="flex gap-2.5" key={i}>
                    <span style={{ color: "var(--anomalia)" }}>✗</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="cat" style={{ marginTop: 24 }}>
            <b>{t.filtro.note}</b>
          </p>
        </div>
      </section>

      {/* 06 · CASI · CARTA */}
      <section className="band carta" id="casi">
        <div className="wrap">
          <div className="eye">{t.casi.eye}</div>
          <h2 className="h-sect">
            {t.casi.h2a}
            <span className="emph">{t.casi.h2emph}</span>
            {t.casi.h2b}
          </h2>
          <p className="lead">{t.casi.lead}</p>
          <div className="three" style={{ marginTop: 26 }}>
            {t.casi.cards.map((c, i) => (
              <Link className="caso transition-colors hover:border-firma/50" href={`${base}/casi/${CASE_HREFS[i]}`} key={i}>
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
                  <span className="stamp">{t.casi.stamp}</span>
                  <span className="btn btn-3" style={{ margin: 0 }}>
                    {t.casi.open}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 22 }}>
            <Link className="btn btn-3" href={`${base}/casi`}>
              {t.casi.all}
            </Link>
          </p>
        </div>
      </section>

      {/* 07 · IL PONTE ASTROLIZE · INCHIOSTRO */}
      <section className="band ink" id="astrolize">
        <div className="wrap">
          <div className="eye">{t.ponte.eye}</div>
          <h2 className="h-sect">
            {t.ponte.h2a}
            <span className="emph">{t.ponte.h2emph}</span>
            {t.ponte.h2b}
          </h2>
          <p className="copy" style={{ maxWidth: "60ch" }}>
            {t.ponte.copy}
          </p>
          <div className="cta-row">
            <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com?subject=Astrolize">
              {t.ponte.cta}
            </a>
          </div>
        </div>
      </section>

      {/* 08 · CTA FINALE · CARTA */}
      <section className="band carta ctaq" id="cta">
        <div className="wrap">
          <div className="eye">{t.cta.eye}</div>
          <h2>
            {t.cta.h2a}
            <span className="emph">{t.cta.h2emph}</span>
            {t.cta.h2b}
          </h2>
          <p style={{ color: "#34324a" }}>{t.cta.p}</p>
          <div className="cta-row">
            <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
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
