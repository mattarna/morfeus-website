import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const PLAYGROUND_URL =
  "https://morfeus-ai-playground.circle.so/join?invitation_token=3e3d851f1b5c16a3dcdd249f6ab67f37af107f74-57169ac8-4206-407a-914d-a1ef537dc2f7";

const COPY = {
  it: {
    metaTitle: "Playground · Morfeus",
    metaDesc:
      "Playground, di Morfeus: il campo di prova dove misuri il tuo AI Brain e impari a lavorare con l'AI davvero.",
    badge: "di Morfeus",
    heroTitleA: "Playground: il campo di prova dove ti misuri e cambi come ",
    heroTitleEmph: "lavori",
    heroTitleB: ".",
    heroCopy:
      "Morfeus governa il cambio di forma nelle aziende. Il Playground porta la stessa disciplina sulle persone: dove ti misuri con l'AI, capisci a che livello sei davvero e impari a lavorarci per farla funzionare, non solo per averla provata.",
    cta1: "Entra nell'AI Playground",
    cta2: "Impara l'AI",
    note: "Community attiva su Circle. Stessa disciplina Morfeus, lato persone.",
    whatEye: "Cos'è",
    whatTitleA: "Non un corso in più. Un ",
    whatTitleEmph: "posto dove ti misurano",
    whatTitleB: " davvero.",
    whatLead:
      "Morfeus insegna solo cose che ha già fatto davvero, nelle aziende. Il Playground è dove quella stessa pratica arriva a te, singolarmente: non teoria sull'AI, ma un banco di prova che ti dice a che livello sei e cosa fare per salire.",
    cards: [
      {
        k: "Il principio",
        t: "Si misura, non si chiede.",
        p: "Niente questionari di autovalutazione: scenari concreti di lavoro con l'AI. Ogni risposta rivela un livello reale e insegna qualcosa, prima ancora del risultato finale.",
      },
      {
        k: "Il patto",
        t: "Frizione, non promesse facili.",
        p: "Si entra livellati, si fatica dentro. Senza frizione ricevi un'informazione. Con la frizione sviluppi una convinzione operativa che resta.",
      },
    ],
    entryEye: "Il punto di ingresso",
    entryTitleA: "Il gemello del ROIometro, per ",
    entryTitleEmph: "te",
    entryTitleB: ".",
    entryLead:
      "Morfeus misura l'azienda: dove perde, quanto. Il Playground misura te: a che livello sei con l'AI, davvero. Stesso principio, mano diversa.",
    testRef: "Ingresso community · pratica guidata · progressione reale",
    free: "Gratis",
    testTitle: "Misura il tuo AI Brain.",
    testBody:
      "Non un quiz da curiosi. Scenari reali, pratica guidata, feedback e progressione. Entri nella community con un contesto chiaro su dove sei e su cosa fare dopo.",
    testMeta: [
      { k: "Accesso", v: "immediato" },
      { k: "Formato", v: "community + risorse" },
      { k: "Output", v: "livello + prossimo passo" },
    ],
    insideEye: "Cosa trovi dentro",
    insideTitleA: "Un percorso per ogni livello di ",
    insideTitleEmph: "partenza",
    insideTitleB: ".",
    insideLead:
      "Non un catalogo di corsi. Un ambiente dove community, materiali e prove pratiche si tengono insieme.",
    products: [
      {
        c: "#F26B21",
        t: "Claude Unlocked",
        p: "Per partire da zero o quasi: dalla pagina bianca a un contesto persistente che lavora per te.",
      },
      {
        c: "#A6E22E",
        t: "Bootcamp AI Champion",
        p: "Per chi vuole delegare pezzi interi del proprio lavoro o portare la disciplina nel team.",
      },
      {
        c: "#E8650A",
        t: "Community",
        p: "La stanza dove chi costruisce con l'AI si dice cosa funziona davvero. Aperta, operativa, viva.",
      },
    ],
    finalEye: "Da dove iniziare",
    finalTitleA: "Non sai da che livello parti. Il Playground te lo ",
    finalTitleEmph: "mostra",
    finalTitleB: ".",
    finalCopy:
      "Entri, ti misuri, trovi il gradino giusto. Poi lavori con gli altri, non da solo.",
  },
  en: {
    metaTitle: "Playground · Morfeus",
    metaDesc:
      "Playground, by Morfeus: the proving ground where you measure your AI Brain and learn how to work with AI for real.",
    badge: "by Morfeus",
    heroTitleA: "Playground: the proving ground where you measure yourself and change how you ",
    heroTitleEmph: "work",
    heroTitleB: ".",
    heroCopy:
      "Morfeus governs change inside companies. Playground brings that same discipline to people: you measure yourself against AI, understand what level you are really at, and learn to work with it so it becomes useful instead of merely interesting.",
    cta1: "Join the AI Playground",
    cta2: "Learn AI",
    note: "Active Circle community. Same Morfeus discipline, person-side.",
    whatEye: "What it is",
    whatTitleA: "Not one more course. A ",
    whatTitleEmph: "place where you get measured",
    whatTitleB: " for real.",
    whatLead:
      "Morfeus teaches only what it has already done in real companies. Playground is where that same practice reaches you as an individual: not theory about AI, but a proving ground that tells you where you are and what to do to move up.",
    cards: [
      {
        k: "The principle",
        t: "It gets measured, not declared.",
        p: "No self-assessment questionnaires: concrete work scenarios with AI. Every answer reveals a real level and teaches something before the final outcome arrives.",
      },
      {
        k: "The pact",
        t: "Friction, not easy promises.",
        p: "You enter leveled, and you work inside. Without friction you receive information. With friction you build an operating conviction that stays with you.",
      },
    ],
    entryEye: "Entry point",
    entryTitleA: "The twin of the ROIometro, for ",
    entryTitleEmph: "you",
    entryTitleB: ".",
    entryLead:
      "Morfeus measures the company: where it loses, and how much. Playground measures you: what level you are really at with AI. Same principle, different hand.",
    testRef: "Community entry · guided practice · real progression",
    free: "Free",
    testTitle: "Measure your AI Brain.",
    testBody:
      "Not a quiz for the curious. Real scenarios, guided practice, feedback, and progression. You enter the community with a clear sense of where you are and what to do next.",
    testMeta: [
      { k: "Access", v: "immediate" },
      { k: "Format", v: "community + resources" },
      { k: "Output", v: "level + next step" },
    ],
    insideEye: "What you find inside",
    insideTitleA: "A path for every starting ",
    insideTitleEmph: "level",
    insideTitleB: ".",
    insideLead:
      "Not a catalog of courses. An environment where community, materials, and practical tests stay connected.",
    products: [
      {
        c: "#F26B21",
        t: "Claude Unlocked",
        p: "For people starting from zero or close to it: from the blank page to a persistent context that works for you.",
      },
      {
        c: "#A6E22E",
        t: "Bootcamp AI Champion",
        p: "For those who want to delegate whole chunks of their work or bring the discipline into the team.",
      },
      {
        c: "#E8650A",
        t: "Community",
        p: "The room where people building with AI tell each other what actually works. Open, practical, alive.",
      },
    ],
    finalEye: "Where to start",
    finalTitleA: "If you do not know your level yet, Playground will ",
    finalTitleEmph: "show",
    finalTitleB: " it to you.",
    finalCopy:
      "You enter, measure yourself, find the right step, and then work with others instead of alone.",
  },
} as const;

const MARK_PATHS = [
  "M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z",
  "M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z",
  "M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z",
];

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("playground", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/playground`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function PlaygroundPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${safeLocale}/playground#webpage`,
        url: `${SITE_URL}/${safeLocale}/playground`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
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

      <section className="band ink hero" id="hero">
        <div className="wrap">
          <span className="badge-madre">
            <svg viewBox="0 0 1000 476" fill="currentColor" aria-hidden="true">
              {MARK_PATHS.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
            {t.badge}
          </span>
          <h1 style={{ marginTop: 16 }}>
            {t.heroTitleA}
            <span className="emph">{t.heroTitleEmph}</span>
            {t.heroTitleB}
          </h1>
          <p className="copy">{t.heroCopy}</p>
          <div className="cta-row">
            <a className="btn btn-1" href={PLAYGROUND_URL} target="_blank" rel="noopener noreferrer">
              {t.cta1}
            </a>
            <Link className="btn btn-2-carta" href={`${base}/impara-ai`}>
              {t.cta2}
            </Link>
          </div>
          <p className="nota">{t.note}</p>
        </div>
      </section>

      <section className="band carta" id="cosa-e">
        <div className="wrap">
          <div className="eye">{t.whatEye}</div>
          <h2 className="h-sect">
            {t.whatTitleA}
            <span className="mk">{t.whatTitleEmph}</span>
            {t.whatTitleB}
          </h2>
          <p className="lead">{t.whatLead}</p>
          <div className="two" style={{ marginTop: 26 }}>
            {t.cards.map((card) => (
              <div className="card" key={card.t}>
                <div className="ck">{card.k}</div>
                <div className="ct">{card.t}</div>
                <p>{card.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band ink" id="entry">
        <div className="wrap">
          <div className="eye">{t.entryEye}</div>
          <h2 className="h-sect">
            {t.entryTitleA}
            <span className="emph">{t.entryTitleEmph}</span>
            {t.entryTitleB}
          </h2>
          <p className="lead">{t.entryLead}</p>
          <div className="collaudo">
            <div className="top">
              <span className="ref">{t.testRef}</span>
              <span className="tag">{t.free}</span>
            </div>
            <h3>{t.testTitle}</h3>
            <p style={{ maxWidth: "56ch", fontSize: 15 }}>{t.testBody}</p>
            <div className="livelli" aria-hidden="true">
              <div className="l on" />
              <div className="l on" />
              <div className="l" />
            </div>
            <div className="meta">
              {t.testMeta.map((item) => (
                <div key={item.k}>
                  {item.k}
                  <b>{item.v}</b>
                </div>
              ))}
            </div>
            <div className="cta-row">
              <a className="btn btn-1" href={PLAYGROUND_URL} target="_blank" rel="noopener noreferrer">
                {t.cta1}
              </a>
              <Link className="btn btn-2-ink" href={`${base}/impara-ai`}>
                {t.cta2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band carta" id="inside">
        <div className="wrap">
          <div className="eye">{t.insideEye}</div>
          <h2 className="h-sect">
            {t.insideTitleA}
            <span className="mk">{t.insideTitleEmph}</span>
            {t.insideTitleB}
          </h2>
          <p className="lead">{t.insideLead}</p>
          <div className="three" style={{ marginTop: 26 }}>
            {t.products.map((item) => (
              <div className="prod" key={item.t}>
                <span className="dot" style={{ background: item.c }} />
                <h4>{item.t}</h4>
                <p>{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band ink ctaq" id="cta">
        <div className="wrap">
          <div className="eye">{t.finalEye}</div>
          <h2>
            {t.finalTitleA}
            <span className="emph">{t.finalTitleEmph}</span>
            {t.finalTitleB}
          </h2>
          <p>{t.finalCopy}</p>
          <div className="cta-row">
            <a className="btn btn-1" href={PLAYGROUND_URL} target="_blank" rel="noopener noreferrer">
              {t.cta1}
            </a>
            <Link className="btn btn-2-carta" href={`${base}/impara-ai`}>
              {t.cta2}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
