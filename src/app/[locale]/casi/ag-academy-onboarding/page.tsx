import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const COPY = {
  it: {
    metaTitle: "AG Academy · Onboarding studenti · Caso #013 — Morfeus",
    metaDesc:
      "Caso #013: un'academy high-ticket perdeva un quarto dei ricavi nei primi 14 giorni post-vendita. Rimborsi dal 25% al 6%, primo accesso da due giorni a poche ore.",
    crumbsCasi: "Casi",
    crumbsMid: "Onboarding studenti",
    crumbsN: "Caso #013",
    tags: ["Academy high-ticket", "PMI 20-60 persone", "Onboarding studenti"],
    h1a: "Hai chiuso la vendita. Poi lo studente sparisce nel ",
    h1emph: "buco nero",
    h1b: ".",
    standfirst:
      "Non perdi più i clienti che hai già pagato per acquisire, nel punto più stupido in cui si possano perdere.",
    stats: [
      { n: "25%→6%", l: "rimborsi nei primi 14 giorni", gain: true },
      { n: "2gg→ore", l: "tempo medio al primo accesso", gain: true },
      { n: "0", l: "studenti persi tra le maglie", gain: false },
    ],
    stamp: "Confermato",
    s2: {
      eye: "La casa che bruciava",
      h2a: "Il momento più pericoloso non era la vendita: era il giorno ",
      h2emph: "dopo",
      h2b: ".",
      p1: "Lo studente firmava, pagava 4.000 euro, e poi cadeva nel silenzio. Accessi non consegnati per due giorni. Mai aggiunto al gruppo. La mail di benvenuto partita a uno su tre. Intanto la testa dello studente, appena uscita dall'entusiasmo dell'acquisto, ricominciava a dubitare.",
      p2a: "E al quattordicesimo giorno arrivava la mail che bruciava tutto: «vorrei il rimborso». Su un'academy che chiudeva ~40 studenti al mese, un quarto che evaporava nei primi giorni significava ",
      p2emph1: "40.000 euro di fatturato già incassato e restituito",
      p2b: ", ogni mese, non per un problema di prodotto ma perché nessuno aveva mandato un link. Il coach giurava di «averlo già fatto», ma nessuno sapeva chi era a che punto. ",
      p2emph2: "Il churn non si vedeva: si scopriva.",
      figTitle: "Il buco nero dei 14 giorni",
      figCapA: "Il funnel post-vendita si assottigliava a ogni stadio, ma nessuno lo misurava: si scopriva solo quando un quarto degli studenti, quasi a metà percorso, chiedeva indietro i soldi. ",
      figCapB: "Su 40 iscritti al mese, dieci se ne andavano così.",
      funnel: ["Acquisto · 100%", "Accessi consegnati", "Gruppo", "Operativo · giorno 14"],
      refundBig: "25% chiede il rimborso",
      refundSmall: "prima del giorno 14",
    },
    s3: {
      eye: "Perché restava irrisolto",
      quoteA: "«Il coach giurava di ",
      quoteEmph: "averlo già fatto",
      quoteB: ". Ma nessuno sapeva chi era a che punto.»",
      quoteSrc: "▸ zero visibilità sullo stato di ciascuno studente",
      p: "Non era un problema di volontà: i coach ci provavano. Era che nessuno stato dello studente era scritto da nessuna parte. «Ho mandato gli accessi» viveva nella testa di una persona, non in un sistema. Con più coach e più studenti in parallelo, la memoria umana smetteva di bastare, e ogni buco restava invisibile finché non arrivava la mail di rimborso.",
    },
    s4: {
      eye: "Cosa abbiamo costruito",
      h2a: "Il post-vendita, su una board che nessuno può ",
      h2emph: "ignorare",
      h2b: ".",
      lead: "Abbiamo trasformato il post-vendita in un board kanban dove ogni studente avanza per stage chiari. Ogni stage è una colonna; nessuno studente può restare fermo senza che si veda. Il carico di ogni coach è visibile, e l'avanzamento è una metrica, non una promessa.",
      rows: [
        { i: "01", b: "Acquisto", p: "Lo studente entra in board nell'istante in cui paga: nessun ingresso silenzioso." },
        { i: "02", b: "Accessi consegnati", p: "Login e materiali inviati e confermati, non solo «dovrebbero essere partiti»." },
        { i: "03", b: "Gruppo", p: "Aggiunta al gruppo community tracciata come stage, non come task perso in chat." },
        { i: "04", b: "Kickoff", p: "Prima call o sessione di avvio fissata e completata, con owner assegnato." },
        { i: "05", b: "Operativo", p: "Lo studente sta lavorando dentro il percorso: il rischio rimborso è alle spalle." },
      ],
    },
    s5: {
      eye: "Il risultato",
      h2a: "Il buco nero ha smesso di ",
      h2emph: "esistere",
      h2b: ".",
      lead: "Rimborsi nei primi 14 giorni crollati dal 25% al 6%. Tempo medio dall'acquisto al primo accesso da ~2 giorni a poche ore. Zero studenti «persi» tra le maglie: ogni stage vive sulla board, non nella testa di qualcuno.",
      figTitle: "Rimborsi nei primi 14 giorni · prima e dopo",
      figCapA: "Un quarto degli studenti che se ne andava nei primi 14 giorni valeva circa ",
      figCapB: "40.000€ al mese",
      figCapC: " già incassati e restituiti. Con la board, quello scaglione è sceso al 6%: due, tre studenti al mese invece di dieci.",
      prima: "prima",
      dopo: "dopo",
      annot: "-40.000€/mese",
      tiles: [
        { k: "Rimborsi primi 14 giorni", n: "25%→6%", p: "Da un quarto degli studenti a una frazione minima.", gain: true },
        { k: "Tempo al primo accesso", n: "2gg→ore", p: "Da giorni di attesa a poche ore dall'acquisto.", gain: true },
        { k: "Studenti persi tra le maglie", n: "0", p: "Ogni stage è visibile: nessuno resta fermo senza che si veda.", gain: false },
      ],
    },
    cta: {
      eye: "In una riga",
      h2a: "Non perdi più i clienti che hai già pagato per acquisire, nel punto più stupido in cui si possano ",
      h2emph: "perdere",
      h2b: ".",
      p: "Quanti studenti stai perdendo ora, nel silenzio tra l'acquisto e il primo accesso? Il ROIometro te lo mette in euro.",
      cta1: "Calcola cosa perdi ▸",
      cta2: "Vedi tutti i casi",
    },
    altri: {
      eye: "Altri casi",
      cards: [
        { cat: "Cassa & margine", h: "Le fatture le emetti tu. Chi le incassa?", cta: "Presto disponibile" },
        { cat: "Margine", h: "Il best-seller che ti stava mangiando vivo", cta: "Presto disponibile" },
      ],
    },
  },
  en: {
    metaTitle: "AG Academy · Student onboarding · Case #013 — Morfeus",
    metaDesc:
      "Case #013: a high-ticket academy was losing a quarter of its revenue in the first 14 days after the sale. Refunds from 25% to 6%, first login from two days to a few hours.",
    crumbsCasi: "Cases",
    crumbsMid: "Student onboarding",
    crumbsN: "Case #013",
    tags: ["High-ticket academy", "SMB 20-60 people", "Student onboarding"],
    h1a: "You closed the sale. Then the student disappears into the ",
    h1emph: "black hole",
    h1b: ".",
    standfirst:
      "You stop losing the customers you already paid to acquire, at the dumbest possible spot to lose them.",
    stats: [
      { n: "25%→6%", l: "refunds in the first 14 days", gain: true },
      { n: "2d→hours", l: "average time to first login", gain: true },
      { n: "0", l: "students lost in the cracks", gain: false },
    ],
    stamp: "Confirmed",
    s2: {
      eye: "The house that was burning",
      h2a: "The most dangerous moment wasn't the sale: it was the day ",
      h2emph: "after",
      h2b: ".",
      p1: "The student signed, paid 4,000 euros, and then fell into silence. Access not delivered for two days. Never added to the group. Welcome email sent to one out of three. Meanwhile the student's head, just past the excitement of buying, started to doubt again.",
      p2a: "And on the fourteenth day came the email that burned everything down: «I'd like a refund». For an academy closing ~40 students a month, a quarter evaporating in the first days meant ",
      p2emph1: "40,000 euros of revenue cashed in and paid back",
      p2b: ", every month, not because of a product problem but because nobody had sent a link. The coach swore he'd «already done it», but nobody knew who was where. ",
      p2emph2: "The churn wasn't seen: it was discovered.",
      figTitle: "The 14-day black hole",
      figCapA: "The post-sale funnel thinned out at every stage, but nobody measured it: it only surfaced when a quarter of students, almost halfway through, asked for their money back. ",
      figCapB: "Out of 40 enrollments a month, ten left this way.",
      funnel: ["Purchase · 100%", "Access delivered", "Group", "Active · day 14"],
      refundBig: "25% ask for a refund",
      refundSmall: "before day 14",
    },
    s3: {
      eye: "Why it kept happening",
      quoteA: "«The coach swore he had ",
      quoteEmph: "already done it",
      quoteB: ". But nobody knew who was where.»",
      quoteSrc: "▸ zero visibility on the state of each student",
      p: "It wasn't a matter of will: the coaches were trying. It was that no student state was written down anywhere. «I sent the access» lived inside one person's head, not in a system. With more coaches and more students in parallel, human memory stopped being enough, and every hole stayed invisible until the refund email arrived.",
    },
    s4: {
      eye: "What we built",
      h2a: "The post-sale, on a board nobody can ",
      h2emph: "ignore",
      h2b: ".",
      lead: "We turned the post-sale into a kanban board where every student moves through clear stages. Each stage is a column; no student can stay stuck without it showing. Every coach's load is visible, and progress is a metric, not a promise.",
      rows: [
        { i: "01", b: "Purchase", p: "The student enters the board the moment they pay: no silent entry." },
        { i: "02", b: "Access delivered", p: "Logins and materials sent and confirmed, not just «should have gone out»." },
        { i: "03", b: "Group", p: "Community group add-in tracked as a stage, not a task lost in chat." },
        { i: "04", b: "Kickoff", p: "First call or onboarding session booked and completed, with an owner assigned." },
        { i: "05", b: "Active", p: "The student is working inside the path: the refund risk is behind them." },
      ],
    },
    s5: {
      eye: "The result",
      h2a: "The black hole stopped ",
      h2emph: "existing",
      h2b: ".",
      lead: "Refunds in the first 14 days collapsed from 25% to 6%. Average time from purchase to first login went from ~2 days to a few hours. Zero students «lost» in the cracks: every stage lives on the board, not in someone's head.",
      figTitle: "Refunds in the first 14 days · before and after",
      figCapA: "A quarter of students leaving in the first 14 days was worth about ",
      figCapB: "€40,000 a month",
      figCapC: " cashed in and paid back. With the board, that bracket dropped to 6%: two or three students a month instead of ten.",
      prima: "before",
      dopo: "after",
      annot: "-€40,000/month",
      tiles: [
        { k: "First-14-day refunds", n: "25%→6%", p: "From a quarter of students to a tiny fraction.", gain: true },
        { k: "Time to first login", n: "2d→hours", p: "From days of waiting to a few hours after purchase.", gain: true },
        { k: "Students lost in the cracks", n: "0", p: "Every stage is visible: no one stays stuck unseen.", gain: false },
      ],
    },
    cta: {
      eye: "In one line",
      h2a: "You stop losing the customers you already paid to acquire, at the dumbest possible spot to ",
      h2emph: "lose them",
      h2b: ".",
      p: "How many students are you losing right now, in the silence between purchase and first login? The ROIometer puts it in euros for you.",
      cta1: "Calculate what you lose ▸",
      cta2: "See all cases",
    },
    altri: {
      eye: "Other cases",
      cards: [
        { cat: "Cash & margin", h: "You issue the invoices. Who's collecting them?", cta: "Coming soon" },
        { cat: "Margin", h: "The bestseller that was eating you alive", cta: "Coming soon" },
      ],
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
    alternates: buildLocaleAlternates("casi/ag-academy-onboarding", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "article",
      url: `${SITE_URL}/${safeLocale}/casi/ag-academy-onboarding`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

const CASE_CSS = `
.ms .case-013 .read{max-width:760px;margin:0 auto}
.ms .case-013 .crumbs{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;color:var(--ombra)}
.ms .case-013 .crumbs a{color:var(--lilla)}
.ms .case-013 .tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}
.ms .case-013 .tag{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--lilla);border:1px solid rgba(140,165,247,.3);border-radius:var(--r-pill);padding:4px 11px}
.ms .case-013 .ahead h1{font-size:clamp(30px,5.2vw,54px);font-weight:600;margin:16px 0;max-width:17ch;line-height:1.08}
.ms .case-013 .standfirst{font-family:var(--font-emph);font-style:italic;font-size:clamp(18px,2.2vw,24px);color:#c2c6d4;max-width:56ch}
.ms .case-013 .headstats{display:flex;gap:32px;flex-wrap:wrap;margin-top:28px;padding-top:22px;border-top:1px solid var(--riga-scuro)}
.ms .case-013 .headstats .s .n{font-family:var(--font-display);font-weight:600;font-size:clamp(26px,3.4vw,36px);line-height:1}
.ms .case-013 .headstats .s .n.gain{color:var(--ok)}
.ms .case-013 .headstats .s .l{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ombra);margin-top:8px;max-width:20ch}
.ms .case-013 .headfoot{display:flex;align-items:center;gap:14px;margin-top:24px;flex-wrap:wrap}
.ms .case-013 .prose p{font-size:17px;margin:14px 0}
.ms .band.carta .case-013 .prose p{color:#23222e}
.ms .band.ink .case-013 .prose p{color:#c3c1d6}
.ms .case-013 .figure{margin:44px auto 0;max-width:var(--maxw)}
.ms .case-013 .figure .ft{font-family:var(--font-mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:14px}
.ms .band.carta .case-013 .figure .ft{color:var(--firma)}
.ms .band.ink .case-013 .figure .ft{color:var(--lilla)}
.ms .case-013 .figbox{border-radius:var(--r-m);padding:26px 24px}
.ms .band.carta .case-013 .figbox{border:1px solid rgba(11,11,12,.14);background:rgba(11,11,12,.02)}
.ms .band.ink .case-013 .figbox{border:1px solid var(--riga-scuro);background:rgba(255,255,255,.02)}
.ms .case-013 .chart{width:100%;height:auto;display:block;overflow:visible}
.ms .case-013 .chart text{font-family:var(--font-mono);font-size:12px}
.ms .case-013 .figcap{margin-top:14px;font-size:14px;max-width:64ch}
.ms .band.carta .case-013 .figcap{color:#3a3b45}
.ms .band.ink .case-013 .figcap{color:#c2c6d4}
.ms .band.carta .case-013 .figcap b{color:var(--inchiostro);font-weight:700}
.ms .band.ink .case-013 .figcap b{color:var(--carta);font-weight:700}
.ms .case-013 .pquote{font-family:var(--font-emph);font-style:italic;font-size:clamp(20px,2.8vw,28px);line-height:1.35;max-width:22ch;margin:0;color:var(--carta)}
.ms .case-013 .pquote .src{display:block;font-family:var(--font-mono);font-style:normal;font-size:11px;letter-spacing:.08em;color:var(--ombra);margin-top:16px}
.ms .case-013 .two-col{display:grid;grid-template-columns:.85fr 1.15fr;gap:44px;align-items:center}
@media(max-width:760px){.ms .case-013 .two-col{grid-template-columns:1fr}}
.ms .case-013 .built{display:flex;flex-direction:column;gap:2px;margin-top:24px}
.ms .case-013 .built .row{display:grid;grid-template-columns:auto 1fr;gap:16px;padding:16px 0;border-top:1px solid rgba(11,11,12,.14)}
.ms .case-013 .built .row:first-child{border-top:none}
.ms .case-013 .built .ix{font-family:var(--font-mono);font-size:12px;color:var(--firma);padding-top:3px}
.ms .case-013 .built .row b{font-family:var(--font-display);font-weight:600;font-size:17px;color:var(--inchiostro);display:block}
.ms .case-013 .built .row p{color:#3a3b45;font-size:14.5px;margin-top:4px}
.ms .case-013 .tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px;max-width:var(--maxw);margin-left:auto;margin-right:auto}
@media(max-width:760px){.ms .case-013 .tiles{grid-template-columns:1fr}}
.ms .case-013 .tile{border:1px solid var(--riga-scuro);background:rgba(255,255,255,.02);border-radius:var(--r-m);padding:22px}
.ms .case-013 .tile .k{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ombra)}
.ms .case-013 .tile .n{font-family:var(--font-display);font-weight:600;font-size:clamp(28px,3.6vw,40px);line-height:1;margin:10px 0 6px;color:var(--carta)}
.ms .case-013 .tile .n.gain{color:var(--ok)}
.ms .case-013 .tile p{font-size:13px;color:#c3c1d6}
.ms .case-013 .rgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:24px}
@media(max-width:760px){.ms .case-013 .rgrid{grid-template-columns:1fr}}
.ms .case-013 .rcard{border:1px solid rgba(11,11,12,.14);border-radius:var(--r-m);background:rgba(11,11,12,.02);padding:20px;display:block}
.ms .case-013 .rcard .cat{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--firma)}
.ms .case-013 .rcard h3{font-size:16px;font-weight:600;margin:8px 0 10px;color:var(--inchiostro);font-family:var(--font-display)}
.ms .case-013 .rcard .soon{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;color:var(--ombra);text-transform:uppercase}
.ms .case-013 .cta-center{text-align:center}
.ms .case-013 .cta-center h2{font-size:clamp(26px,4.2vw,40px);max-width:22ch;margin:12px auto 0}
.ms .case-013 .cta-center p{color:#3a3b45;max-width:48ch;margin:16px auto 0;font-size:15.5px}
.ms .case-013 .cta-center .cta-row{display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:wrap;margin-top:28px}
.ms .case-013 .emph-loss{color:var(--anomalia);font-weight:600}
`;

export default function CaseAgAcademyPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/${safeLocale}/casi/ag-academy-onboarding#article`,
    url: `${SITE_URL}/${safeLocale}/casi/ag-academy-onboarding`,
    headline: t.metaTitle,
    description: t.metaDesc,
    inLanguage: isIt ? "it-IT" : "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    author: { "@id": ORGANIZATION_ID },
    about: { "@id": ORGANIZATION_ID },
    articleSection: isIt ? "Casi" : "Cases",
  };

  return (
    <SiteShell locale={safeLocale}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CASE_CSS }} />

      <div className="case-013">
        {/* 01 · TESTATA · INCHIOSTRO */}
        <section className="band ink" id="testata">
          <div className="wrap">
            <div className="read ahead">
              <div className="crumbs">
                <Link href={`${base}/casi`}>{t.crumbsCasi}</Link> · {t.crumbsMid} · {t.crumbsN}
              </div>
              <div className="tags">
                {t.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <h1>
                {t.h1a}
                <span className="emph">{t.h1emph}</span>
                {t.h1b}
              </h1>
              <p className="standfirst">{t.standfirst}</p>
              <div className="headstats">
                {t.stats.map((s, i) => (
                  <div className="s" key={i}>
                    <div className={s.gain ? "n gain" : "n"}>{s.n}</div>
                    <div className="l">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="headfoot">
                <span className="stamp">{t.stamp}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 02 · LA CASA CHE BRUCIAVA · CARTA */}
        <section className="band carta">
          <div className="wrap">
            <div className="read">
              <div className="eye">{t.s2.eye}</div>
              <h2 className="h-sect">
                {t.s2.h2a}
                <span className="emph">{t.s2.h2emph}</span>
                {t.s2.h2b}
              </h2>
              <div className="prose">
                <p>{t.s2.p1}</p>
                <p>
                  {t.s2.p2a}
                  <span className="emph">{t.s2.p2emph1}</span>
                  {t.s2.p2b}
                  <span className="emph">{t.s2.p2emph2}</span>
                </p>
              </div>
            </div>
            <div className="figure">
              <div className="ft">{t.s2.figTitle}</div>
              <div className="figbox">
                <svg
                  className="chart"
                  viewBox="0 0 720 360"
                  role="img"
                  aria-label={t.s2.figTitle}
                >
                  <g>
                    <path d="M30,40 L690,40 L690,90 L30,90 Z" fill="rgba(83,61,252,.10)" stroke="#533DFC" strokeWidth="2" />
                    <text x="360" y="70" textAnchor="middle" fill="#0B0B0C" fontFamily="var(--font-mono)" fontWeight="600" fontSize="14">
                      {t.s2.funnel[0]}
                    </text>
                    <path d="M70,105 L650,105 L650,150 L70,150 Z" fill="rgba(83,61,252,.09)" stroke="#533DFC" strokeWidth="2" />
                    <text x="360" y="132" textAnchor="middle" fill="#0B0B0C" fontFamily="var(--font-mono)" fontWeight="600" fontSize="14">
                      {t.s2.funnel[1]}
                    </text>
                    <path d="M110,165 L610,165 L610,210 L110,210 Z" fill="rgba(83,61,252,.08)" stroke="#533DFC" strokeWidth="2" />
                    <text x="360" y="192" textAnchor="middle" fill="#0B0B0C" fontFamily="var(--font-mono)" fontWeight="600" fontSize="14">
                      {t.s2.funnel[2]}
                    </text>
                    <path d="M150,225 L570,225 L570,270 L150,270 Z" fill="rgba(83,61,252,.07)" stroke="#533DFC" strokeWidth="2" />
                    <text x="360" y="252" textAnchor="middle" fill="#0B0B0C" fontFamily="var(--font-mono)" fontWeight="600" fontSize="14">
                      {t.s2.funnel[3]}
                    </text>
                  </g>
                  <path
                    d="M650,150 L700,150 L700,300 L520,300"
                    fill="none"
                    stroke="#FF5C5C"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                  <rect x="390" y="300" width="260" height="52" rx="10" fill="rgba(255,92,92,.10)" stroke="#FF5C5C" strokeWidth="2" />
                  <text x="520" y="322" textAnchor="middle" fill="#FF5C5C" fontFamily="var(--font-display)" fontWeight="600" fontSize="14">
                    {t.s2.refundBig}
                  </text>
                  <text x="520" y="340" textAnchor="middle" fill="#7E8091" fontFamily="var(--font-mono)" fontSize="11">
                    {t.s2.refundSmall}
                  </text>
                </svg>
                <p className="figcap">
                  {t.s2.figCapA}
                  <b>{t.s2.figCapB}</b>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 · PERCHÉ RESTAVA IRRISOLTO · INCHIOSTRO */}
        <section className="band ink">
          <div className="wrap">
            <div className="two-col">
              <div>
                <div className="eye">{t.s3.eye}</div>
                <blockquote className="pquote" style={{ marginTop: 14 }}>
                  {t.s3.quoteA}
                  <span className="emph">{t.s3.quoteEmph}</span>
                  {t.s3.quoteB}
                  <span className="src">{t.s3.quoteSrc}</span>
                </blockquote>
              </div>
              <div className="prose">
                <p>{t.s3.p}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 04 · COSA ABBIAMO COSTRUITO · CARTA */}
        <section className="band carta">
          <div className="wrap">
            <div className="read">
              <div className="eye">{t.s4.eye}</div>
              <h2 className="h-sect">
                {t.s4.h2a}
                <span className="emph">{t.s4.h2emph}</span>
                {t.s4.h2b}
              </h2>
              <p className="lead">{t.s4.lead}</p>
              <div className="built">
                {t.s4.rows.map((r) => (
                  <div className="row" key={r.i}>
                    <span className="ix">{r.i}</span>
                    <div>
                      <b>{r.b}</b>
                      <p>{r.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 05 · IL RISULTATO · INCHIOSTRO */}
        <section className="band ink">
          <div className="wrap">
            <div className="read">
              <div className="eye">{t.s5.eye}</div>
              <h2 className="h-sect">
                {t.s5.h2a}
                <span className="emph">{t.s5.h2emph}</span>
                {t.s5.h2b}
              </h2>
              <p className="lead">{t.s5.lead}</p>
            </div>
            <div className="figure">
              <div className="ft">{t.s5.figTitle}</div>
              <div className="figbox">
                <svg
                  className="chart"
                  viewBox="0 0 460 260"
                  role="img"
                  aria-label={t.s5.figTitle}
                >
                  <line x1="40" y1="205" x2="420" y2="205" stroke="rgba(140,165,247,.3)" />
                  <rect x="90" y="55" width="90" height="150" rx="6" fill="#FF5C5C" />
                  <rect x="280" y="169" width="90" height="36" rx="6" fill="#1E9E5A" />
                  <text x="135" y="45" textAnchor="middle" fill="#FF5C5C" fontFamily="var(--font-display)" fontWeight="600" fontSize="20">
                    25%
                  </text>
                  <text x="325" y="159" textAnchor="middle" fill="#1E9E5A" fontFamily="var(--font-display)" fontWeight="600" fontSize="20">
                    6%
                  </text>
                  <text x="135" y="225" textAnchor="middle" fill="#c2c6d4" fontFamily="var(--font-mono)" fontSize="12">
                    {t.s5.prima}
                  </text>
                  <text x="325" y="225" textAnchor="middle" fill="#c2c6d4" fontFamily="var(--font-mono)" fontSize="12">
                    {t.s5.dopo}
                  </text>
                  <text
                    x="135"
                    y="90"
                    textAnchor="middle"
                    fill="#FF5C5C"
                    fontFamily="var(--font-emph)"
                    fontStyle="italic"
                    fontSize="14"
                  >
                    {t.s5.annot}
                  </text>
                  <path d="M135,96 L135,120" stroke="#FF5C5C" strokeWidth="1.5" fill="none" />
                </svg>
                <p className="figcap">
                  {t.s5.figCapA}
                  <b>{t.s5.figCapB}</b>
                  {t.s5.figCapC}
                </p>
              </div>
            </div>
            <div className="tiles">
              {t.s5.tiles.map((tile, i) => (
                <div className="tile" key={i}>
                  <div className="k">{tile.k}</div>
                  <div className={tile.gain ? "n gain" : "n"}>{tile.n}</div>
                  <p>{tile.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 · IN UNA RIGA + CTA + CORRELATI · CARTA */}
        <section className="band carta" id="cta">
          <div className="wrap">
            <div className="cta-center">
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
                <Link className="btn btn-2-carta" href={`${base}/casi`}>
                  {t.cta.cta2}
                </Link>
              </div>
            </div>
            <div className="wrap" style={{ marginTop: 64 }}>
              <div className="eye" style={{ textAlign: "left" }}>
                {t.altri.eye}
              </div>
              <div className="rgrid">
                {t.altri.cards.map((c, i) => (
                  <span className="rcard" key={i}>
                    <span className="cat">{c.cat}</span>
                    <h3>{c.h}</h3>
                    <span className="soon">{c.cta}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
