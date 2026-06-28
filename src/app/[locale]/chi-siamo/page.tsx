import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { ORGANIZATION_ID, WEBSITE_ID, SITE_URL } from "@/lib/seo/entity-ids";
import { teamMembers } from "@/app/lib/team-data";
import { SiteHeader, SiteFooter, SiteMark } from "@/components/site";
import "@/components/site/site.css";

type Props = { params: { locale: string } };

const FOUNDER_SLUGS = ["matteo", "alex", "simone", "matteo-alvazzi"] as const;

// Mono labels ("forge hand"), scoped to this page — no layout change.
const mono = JetBrains_Mono({ variable: "--mf-mono", subsets: ["latin"], weight: ["500"], display: "swap" });

const COPY = {
  it: {
    metaTitle: "Chi è Morfeus — consulenza e formazione AI per aziende in scaling",
    metaDesc:
      "Morfeus (Numanity S.r.l.) è la società italiana di consulenza e formazione AI: entriamo nelle aziende in scaling come Operating Partner e recuperiamo il margine perso con sistemi AI. Founder, metodo, numeri.",
    // disambiguation: solo in JSON-LD (GEO/SEO), mai a video
    disambiguation:
      "Morfeus (Numanity S.r.l.) è la società italiana di consulenza e formazione AI per aziende in scaling. Da non confondere con morfeus.dev (un framework di agenti AI), con i prodotti Morpheus di NVIDIA o HPE, né con morpheusbusiness.ai.",
    eyebrow: "Chi siamo",
    h1a: "Chi è",
    h1accent: "Morfeus",
    lede:
      "La società italiana di consulenza e formazione AI che entra nelle aziende in scaling come Operating Partner: troviamo dove perdono margine e costruiamo sistemi AI che lo recuperano, misurato in euro.",
    ctaPrimary: "Scopri come lavoriamo",
    ctaSecondary: "I founder",
    trust: [["2.500+", "persone formate"], ["10k+", "lettori AI Espresso"], ["1.000+", "AI Playground"], ["Milano", "· dal 2023"]],
    doLabel: "01 · Cosa facciamo",
    doH2a: "Non siamo",
    doH2accent: "un'AI agency",
    doBody:
      "Entriamo nei processi e nei dati di un'azienda, troviamo le perdite invisibili di margine mentre scala e le chiudiamo con sistemi AI che ogni mese dicono quanto valore hanno generato — in euro, non in slide.",
    fronts: [
      { tag: "Per te", title: "Lo facciamo per te", body: "Come Operating Partner B2B: entriamo, costruiamo, restiamo, e siamo misurati sui risultati. Non un progetto una tantum: una presenza che resta finché il valore non è dimostrato." },
      { tag: "Con te", title: "Costruiamo competenza AI", body: "Formazione, community e divulgazione, per rendere l'AI una competenza interna scalabile — non una dipendenza esterna. Le persone restano, e con loro la capacità di usarla." },
    ],
    notusLabel: "02 · La differenza",
    fLabel: "03 · I founder",
    fH2a: "Quattro founder,",
    fH2accent: "un'ossessione",
    fSub: "Trasformare l'AI in risultati misurabili.",
    founderTaglines: {
      matteo: "Porta l'AI dentro il conto economico.",
      alex: "Architettura e ingegneria dei sistemi AI.",
      simone: "Operations, ossessionato dal ROI.",
      "matteo-alvazzi": "Progetta organizzazioni AI-native.",
    } as Record<string, string>,
    facts: [["2023", "Fondazione"], ["Milano", "Sede"], ["2.500+", "Persone formate"], ["10k+", "Lettori AI Espresso"], ["1.000+", "AI Playground"]],
    ctaPill: "Parliamone",
    ctaH2a: "Il margine perso",
    ctaH2accent: "si può trovare",
    ctaLede: "Se la tua azienda sta scalando e senti che il margine si perde da qualche parte, possiamo trovarlo.",
    ctaButton: "Scopri come lavoriamo →",
  },
  en: {
    metaTitle: "About Morfeus — AI consulting & training for scaling companies",
    metaDesc:
      "Morfeus (Numanity S.r.l.) is the Italian AI consulting & training company: we embed into scaling businesses as an Operating Partner and recover lost margin with AI systems. Founders, method, numbers.",
    disambiguation:
      "Morfeus (Numanity S.r.l.) is the Italian AI consulting and training company for scaling businesses. Not to be confused with morfeus.dev (an AI agent framework), NVIDIA's or HPE's Morpheus products, or morpheusbusiness.ai.",
    eyebrow: "About us",
    h1a: "Who is",
    h1accent: "Morfeus",
    lede:
      "The Italian AI consulting & training company that embeds into scaling businesses as an Operating Partner: we find where they lose margin and build AI systems that recover it, measured in euros.",
    ctaPrimary: "See how we work",
    ctaSecondary: "The founders",
    trust: [["2,500+", "people trained"], ["10k+", "AI Espresso readers"], ["1,000+", "AI Playground"], ["Milan", "· since 2023"]],
    doLabel: "01 · What we do",
    doH2a: "We are not",
    doH2accent: "an AI agency",
    doBody:
      "We embed into a company's processes and data, find the invisible margin losses as it scales, and close them with AI systems that report — every month — how much value they generated, in euros, not slides.",
    fronts: [
      { tag: "For you", title: "We do it for you", body: "As a B2B Operating Partner: we embed, we build, we stay, and we are measured on results. Not a one-off project — a presence that stays until the value is proven." },
      { tag: "With you", title: "We build AI capability", body: "Training, community and education to make AI a scalable internal skill — not an external dependency. The people stay, and with them the ability to use it." },
    ],
    notusLabel: "02 · The difference",
    fLabel: "03 · The founders",
    fH2a: "Four founders,",
    fH2accent: "one obsession",
    fSub: "Turning AI into measurable results.",
    founderTaglines: {
      matteo: "Brings AI into the P&L.",
      alex: "AI architecture & engineering.",
      simone: "Operations, obsessed with ROI.",
      "matteo-alvazzi": "Designs AI-native organizations.",
    } as Record<string, string>,
    facts: [["2023", "Founded"], ["Milan", "HQ"], ["2,500+", "People trained"], ["10k+", "AI Espresso readers"], ["1,000+", "AI Playground"]],
    ctaPill: "Let’s talk",
    ctaH2a: "The lost margin",
    ctaH2accent: "can be found",
    ctaLede: "If your company is scaling and you feel margin slipping somewhere, we can find it.",
    ctaButton: "See how we work →",
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

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/${safeLocale}/chi-siamo#aboutpage`,
    url: `${SITE_URL}/${safeLocale}/chi-siamo`,
    name: t.metaTitle,
    description: t.metaDesc,
    disambiguatingDescription: t.disambiguation,
    inLanguage: isIt ? "it-IT" : "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: { "@id": ORGANIZATION_ID },
  };

  const founders = FOUNDER_SLUGS.map((slug) => ({ ...teamMembers[slug], tagline: t.founderTaglines[slug] }));

  return (
    <div className={`mf ${mono.variable}`}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <div className="wrap">
        <SiteHeader locale={safeLocale} />

        <main>
          {/* HERO */}
          <section className="hero">
            <div className="c">
              <div className="grid">
                <div>
                  <span className="pill"><span className="dot" aria-hidden />{t.eyebrow}</span>
                  <h1 className="htitle">
                    <span className="grad">{t.h1a}</span>
                    <br />
                    <span className="gradc">{t.h1accent}</span>
                  </h1>
                  <p className="lede">{t.lede}</p>
                  <div className="ctas">
                    <Link href={`${base}/forge`} className="btn">{t.ctaPrimary} →</Link>
                    <a href="#founders" className="btn-ghost">{t.ctaSecondary}</a>
                  </div>
                </div>
                <SiteMark />
              </div>
            </div>
          </section>

          {/* TRUST */}
          <section className="band trust">
            <div className="c">
              <div className="row">
                {t.trust.map(([v, l]) => (
                  <span className="it" key={l}><b>{v}</b> {l}</span>
                ))}
              </div>
            </div>
          </section>

          {/* COSA FACCIAMO */}
          <section className="sec">
            <div className="c">
              <div className="shead">
                <span className="pill">{t.doLabel}</span>
                <h2 className="htitle"><span className="grad">{t.doH2a}</span> <span className="gradc">{t.doH2accent}</span></h2>
                <div className="rule" />
                <p className="sub" style={{ maxWidth: "64ch" }}>{t.doBody}</p>
              </div>
              <div className="fronts">
                {t.fronts.map((f, i) => (
                  <div className="front card" key={f.title}>
                    <div className="gn">0{i + 1}</div>
                    <div>
                      <span className="pill tag">{f.tag}</span>
                      <h3>{f.title}</h3>
                      <p>{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COSA NON SIAMO (prosa) */}
          <section className="band sec notus">
            <div className="c">
              <span className="pill">{t.notusLabel}</span>
              <div className="rule" style={{ margin: "26px 0 30px" }} />
              {isIt ? (
                <p className="big">Non vendiamo <b>slide</b>. Non lasciamo <b>dipendenza</b>. Restiamo finché il valore non è <b>in euro</b>.</p>
              ) : (
                <p className="big">We don’t sell <b>slides</b>. We don’t leave <b>dependency</b>. We stay until the value is <b>in euros</b>.</p>
              )}
              {isIt ? (
                <p className="close">Siamo una società italiana di consulenza e formazione AI per aziende in scaling: <b>entriamo, costruiamo, restiamo — e ci misuriamo in euro.</b></p>
              ) : (
                <p className="close">We are an Italian AI consulting &amp; training company for scaling businesses: <b>we embed, we build, we stay — and we measure in euros.</b></p>
              )}
            </div>
          </section>

          {/* FOUNDER */}
          <section className="sec" id="founders">
            <div className="c">
              <div className="shead">
                <span className="pill">{t.fLabel}</span>
                <h2 className="htitle"><span className="grad">{t.fH2a}</span> <span className="gradc">{t.fH2accent}</span></h2>
                <div className="rule" />
                <p className="sub">{t.fSub}</p>
              </div>
              <div className="fgrid">
                {founders.map((m) => (
                  <div className="fc card" key={m.slug}>
                    <div className="ph">
                      <Image src={m.image} alt={m.name} fill sizes="(max-width:860px) 50vw, 260px" />
                    </div>
                    <div className="nm">{m.name}</div>
                    <div className="rl">{m.role}</div>
                    <div className="tg">{m.tagline}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NUMERI */}
          <section className="band sec">
            <div className="c">
              <div className="nums">
                {t.facts.map(([v, l]) => (
                  <div key={l}>
                    <div className="pnum">{v}</div>
                    <div className="l">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="sec">
            <div className="c">
              <div className="ctapanel">
                <span className="pill" style={{ marginBottom: "22px" }}>{t.ctaPill}</span>
                <h2 className="htitle"><span className="grad">{t.ctaH2a}</span> <span className="gradc">{t.ctaH2accent}</span></h2>
                <p className="lede">{t.ctaLede}</p>
                <div className="row">
                  <Link href={`${base}/forge`} className="btn">{t.ctaButton}</Link>
                  <a href="mailto:hello@morfeushub.com" className="btn-ghost">hello@morfeushub.com</a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter locale={safeLocale} />
      </div>
    </div>
  );
}
