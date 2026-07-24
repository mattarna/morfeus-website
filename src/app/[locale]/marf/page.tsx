import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const COPY = {
  it: {
    metaTitle: "MARF · Morfeus",
    metaDesc:
      "MARF è l'infrastruttura AI proprietaria di Morfeus, installata dentro l'azienda cliente. Cos'è, come funziona e perché conta.",
    crumbs: "Glossario · Termini proprietari",
    termTag: "Termine proprietario Morfeus",
    tldr: "L'infrastruttura AI proprietaria di Morfeus, installata dentro l'azienda cliente, che migliora a ogni progetto.",
    defTitle: "Definizione",
    defText:
      "MARF è l'infrastruttura AI proprietaria di Morfeus. Viene installata e personalizzata dentro l'azienda del cliente, non è un SaaS: raccoglie e pulisce i dati operativi di ogni reparto, automatizza il lavoro ripetitivo e fa parlare tra loro i dati per proteggere il margine. Ogni progetto la alimenta: ogni nuovo deployment è più potente del precedente.",
    whatTitle: "Cos'è",
    whatText:
      "MARF è il layer di intelligenza che resta in azienda. Non uno strumento che usi e chiudi, ma un'infrastruttura che vive nei processi: legge i dati dove nascono, li ordina, e li mette al servizio delle decisioni e delle automazioni che difendono il margine.",
    howEye: "Come funziona",
    howTitleA: "Tre movimenti, ripetuti e affinati a ogni ",
    howTitleEmph: "progetto",
    howTitleB: ".",
    howCards: [
      { n: "01", t: "Raccoglie e pulisce", p: "Porta dentro i dati operativi di ogni reparto e li rende affidabili." },
      { n: "02", t: "Automatizza", p: "Toglie il lavoro ripetitivo e standardizza ciò che oggi dipende dalle persone." },
      { n: "03", t: "Connette", p: "Fa parlare i dati tra reparti, così le decisioni arrivano in tempo." },
    ],
    whyEye: "Perché conta",
    whyTitleA: "MARF è il ",
    whyTitleEmph: "moat",
    whyTitleB: ".",
    whyLead:
      "È il motivo per cui Morfeus è difficile da sostituire. Più progetti la attraversano, più diventa potente e cucita sull'azienda. Non compri una licenza che vale uguale per tutti; costruisci un asset che migliora con te.",
    compareTitle: "Cosa non è",
    noLabel: "Non è",
    yesLabel: "È",
    noItems: [
      "Un SaaS che usi dall'esterno",
      "Un chatbot",
      "Un tool generico uguale per tutti",
    ],
    yesItems: [
      "Infrastruttura embedded, dentro l'azienda",
      "Personalizzata sui tuoi dati e processi",
      "Un asset che migliora a ogni progetto",
    ],
    exampleEye: "Un esempio",
    example:
      "\"Nella preventivazione, MARF ha unito i dati di vendite e produzione, ha automatizzato la stima e ha chiuso la falla di margine. Oggi gira ancora, e a ogni preventivo impara.\"",
    relatedEye: "Termini collegati",
    relatedTitle: "Dove MARF si aggancia.",
    related: [
      { label: "Operating Partner", href: "#operating-partner", body: "Il modello con cui Morfeus opera dentro l'azienda." },
      { label: "Value Leak", href: "#value-leak", body: "Le perdite di margine invisibili nei processi." },
      { label: "ROIometro", href: "/roiometro", body: "Quanto perdi e quanto puoi recuperare." },
      { label: "Value Report", href: "#value-report", body: "Il valore generato, in euro, ogni mese." },
    ],
    ctaEye: "Vedilo sui tuoi dati",
    ctaTitleA: "Quanto margine può ",
    ctaTitleEmph: "recuperare",
    ctaTitleB: " MARF da te?",
    cta1: "Prova il ROIometro",
    cta2: "Parla con noi",
  },
  en: {
    metaTitle: "MARF · Morfeus",
    metaDesc:
      "MARF is Morfeus's proprietary AI infrastructure, installed inside the client company. What it is, how it works, and why it matters.",
    crumbs: "Glossary · Proprietary terms",
    termTag: "Morfeus proprietary term",
    tldr: "Morfeus's proprietary AI infrastructure, installed inside the client company, that gets stronger with every project.",
    defTitle: "Definition",
    defText:
      "MARF is Morfeus's proprietary AI infrastructure. It is installed and customized inside the client's company, not delivered as a SaaS: it collects and cleans operational data from every department, automates repetitive work, and makes data talk to data to protect margin. Every project feeds it: each new deployment is stronger than the previous one.",
    whatTitle: "What it is",
    whatText:
      "MARF is the intelligence layer that stays inside the company. Not a tool you use and close, but an infrastructure that lives in the processes: it reads data where it is born, orders it, and puts it to work for decisions and automations that defend margin.",
    howEye: "How it works",
    howTitleA: "Three movements, repeated and refined with every ",
    howTitleEmph: "project",
    howTitleB: ".",
    howCards: [
      { n: "01", t: "Collects and cleans", p: "It brings in operational data from every department and makes it reliable." },
      { n: "02", t: "Automates", p: "It removes repetitive work and standardizes what today still depends on people." },
      { n: "03", t: "Connects", p: "It makes data talk across departments, so decisions arrive on time." },
    ],
    whyEye: "Why it matters",
    whyTitleA: "MARF is the ",
    whyTitleEmph: "moat",
    whyTitleB: ".",
    whyLead:
      "It is why Morfeus is hard to replace. The more projects run through it, the more powerful and company-shaped it becomes. You do not buy a license that is worth the same for everyone; you build an asset that improves with you.",
    compareTitle: "What it is not",
    noLabel: "It is not",
    yesLabel: "It is",
    noItems: [
      "A SaaS you use from the outside",
      "A chatbot",
      "A generic tool that is the same for everyone",
    ],
    yesItems: [
      "Embedded infrastructure, inside the company",
      "Customized on your data and processes",
      "An asset that gets better with every project",
    ],
    exampleEye: "An example",
    example:
      "\"In quoting, MARF joined sales and production data, automated estimation, and closed the margin leak. It is still running today, and it learns on every quote.\"",
    relatedEye: "Related terms",
    relatedTitle: "Where MARF connects.",
    related: [
      { label: "Operating Partner", href: "#operating-partner", body: "The model through which Morfeus operates inside the company." },
      { label: "Value Leak", href: "#value-leak", body: "The invisible margin losses inside processes." },
      { label: "ROIometro", href: "/roiometro", body: "How much you lose and how much you can recover." },
      { label: "Value Report", href: "#value-report", body: "The value generated, in euros, every month." },
    ],
    ctaEye: "See it on your data",
    ctaTitleA: "How much margin could MARF ",
    ctaTitleEmph: "recover",
    ctaTitleB: " for you?",
    cta1: "Try the ROIometro",
    cta2: "Talk to us",
  },
} as const;

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("marf", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/marf`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function MarfPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `${SITE_URL}/${safeLocale}/marf#term`,
        name: "MARF",
        description: t.metaDesc,
        inDefinedTermSet: `${SITE_URL}/${safeLocale}/glossario#glossary`,
        url: `${SITE_URL}/${safeLocale}/marf`,
        isPartOf: { "@id": WEBSITE_ID },
        provider: { "@id": ORGANIZATION_ID },
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

      <section className="band carta" id="testata" style={{ paddingTop: "calc(60px + clamp(48px,7vw,80px))" }}>
        <div className="read">
          <div className="crumbs">
            <Link href={`${base}/glossario`}>{t.crumbs.split(" · ")[0]}</Link> · {t.crumbs.split(" · ")[1]}
          </div>
          <span className="termtag">{t.termTag}</span>
          <h1 className="term-h1">MARF</h1>
          <p className="tldr">{t.tldr}</p>
        </div>

        <div className="defbox">
          <div className="k">{t.defTitle}</div>
          <p>{t.defText}</p>
        </div>

        <div className="readsec">
          <h2 className="h-sect" style={{ fontSize: "clamp(24px,3.4vw,34px)" }}>
            {t.whatTitle}
          </h2>
          <p>{t.whatText}</p>
        </div>
      </section>

      <section className="band ink" id="come-funziona">
        <div className="wrap">
          <div className="eye">{t.howEye}</div>
          <h2 className="h-sect">
            {t.howTitleA}
            <span className="emph">{t.howTitleEmph}</span>
            {t.howTitleB}
          </h2>
          <div className="three" style={{ marginTop: 26 }}>
            {t.howCards.map((card) => (
              <div className="card howcard" key={card.n}>
                <div className="n">{card.n}</div>
                <h3>{card.t}</h3>
                <p>{card.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band carta" id="perche-conta">
        <div className="wrap">
          <div className="eye">{t.whyEye}</div>
          <h2 className="h-sect">
            {t.whyTitleA}
            <span className="emph">{t.whyTitleEmph}</span>
            {t.whyTitleB}
          </h2>
          <p className="lead">{t.whyLead}</p>

          <h2 className="h-sect" style={{ fontSize: "clamp(24px,3.4vw,34px)", marginTop: 44 }}>
            {t.compareTitle}
          </h2>
          <div className="isnot">
            <div className="col no">
              <div className="t">{t.noLabel}</div>
              <ul>
                {t.noItems.map((item) => (
                  <li key={item}>
                    <span className="m">x</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col yes">
              <div className="t">{t.yesLabel}</div>
              <ul>
                {t.yesItems.map((item) => (
                  <li key={item}>
                    <span className="m">-&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band ink" id="esempio">
        <div className="read">
          <div className="eye">{t.exampleEye}</div>
          <p className="example">{t.example}</p>
        </div>
      </section>

      <section className="band carta" id="correlati">
        <div className="wrap">
          <div className="eye">{t.relatedEye}</div>
          <h2 className="h-sect" style={{ fontSize: "clamp(24px,3.4vw,34px)" }}>
            {t.relatedTitle}
          </h2>
          <div className="four" style={{ marginTop: 24 }}>
            {t.related.map((item) => (
              <Link
                className="card rcard"
                href={item.href.startsWith("/") ? `${base}${item.href}` : `${base}/glossario${item.href}`}
                key={item.label}
              >
                <div className="term">{item.label}</div>
                <p>{item.body}</p>
              </Link>
            ))}
          </div>

          <div className="ctaq" style={{ marginTop: 72 }}>
            <div className="eye">{t.ctaEye}</div>
            <h2>
              {t.ctaTitleA}
              <span className="emph">{t.ctaTitleEmph}</span>
              {t.ctaTitleB}
            </h2>
            <div className="cta-row">
              <Link className="btn btn-1" href={`${base}/roiometro`}>
                {t.cta1}
              </Link>
              <a className="btn btn-2-ink" href="mailto:hello@morfeushub.com">
                {t.cta2}
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
