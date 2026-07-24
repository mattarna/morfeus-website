import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const SLUG = "casi/valueize-best-seller";

const COPY = {
  it: {
    metaTitle: "Il best-seller che ti stava mangiando vivo · Caso Morfeus",
    metaDesc:
      "Caso #032: un e-commerce DTC scalava in ads il suo prodotto più venduto senza sapere che ogni unità lasciava il conto più vuoto di prima. Tre SKU in rosso scoperti, recupero margine a doppia cifra in un trimestre.",
    crumbsCasi: "Casi",
    crumbsCase: "Valueize · Caso #032",
    tags: ["E-commerce / DTC omnicanale", "PMI digitale 5-50 persone", "Margine per SKU"],
    h1a: "Il best-seller che ti stava ",
    h1emph: "mangiando",
    h1b: " vivo",
    standfirst: "Smetti di pagare per vendere il tuo best-seller senza saperlo.",
    stats: [
      { n: "3", cls: "loss", l: "SKU “di punta” scoperti in rosso netto" },
      { n: "doppia cifra", cls: "gain", l: "recupero sul margine di portafoglio" },
      { n: "1 trimestre", cls: "", l: "per vedere il recupero, solo riallocando budget" },
    ],
    stamp: "Confermato",

    s2: {
      eye: "La casa che bruciava",
      h2a: "Il fatturato cresceva. La cassa no. E nessuno sapeva ",
      h2emph: "perché",
      h2b: ".",
      p1: "Il fatturato cresceva ogni mese e tutti erano contenti. Poi a fine trimestre il commercialista chiedeva perché la cassa non seguiva, e nessuno sapeva rispondere. Il prodotto che andava di più, quello che spingevano in ads e mettevano in vetrina, lo vendevano sottocosto senza saperlo: dopo la commissione del marketplace, il costo merce, la quota di pubblicità allocata e la fetta che si mangiavano i resi, ogni unità lasciava il conto più vuoto di prima.",
      p2a: "Ma nel pannello vendite era il best-seller, quindi lo scalavano. ",
      p2emph: "Stavano facendo benzina con la cassa per crescere su un prodotto che li uccideva piano.",
      figFt: "La cascata del margine",
      figAria: "Cascata che parte dal prezzo di vendita e scende sottraendo commissione marketplace, costo prodotto, ad spend allocata e resi, fino a un margine reale negativo sotto la linea dello zero",
      figLabels: {
        zero: "zero",
        v1: ["prezzo di", "vendita"],
        v2: ["commissione", "marketplace"],
        v3: ["costo", "prodotto"],
        v4: ["ad spend", "allocata"],
        v5: ["resi"],
        v6: ["margine", "reale"],
        neg: "negativo",
      },
      figCapA: "Ogni voce sottratta abbassa la barra un gradino in più: commissione, costo prodotto, ad spend allocata, resi. Sul best-seller la cascata non si fermava allo zero. ",
      figCapB: "Il margine reale finiva sotto la linea, in rosso.",
    },

    s3: {
      eye: "Perché restava irrisolto",
      qA: "“Il cruscotto mostrava fatturato e ROAS lordo. Mai quel che restava davvero ",
      qEmph: "in tasca",
      qB: ".”",
      src: "▸ il numero sbagliato guidava le decisioni",
      p1: "Avevano provato il foglio Excel mensile, ma con tre canali, decine di SKU e tabelle commissioni diverse per marketplace, ricostruire il margine reale prodotto per prodotto era un lavoro da giorni che nessuno aveva tempo di fare bene.",
      p2a: "I cruscotti delle piattaforme mostravano fatturato e ROAS lordo, mai quel che restava davvero in tasca. Così decidevano cosa spingere guardando ",
      p2emph: "il numero sbagliato",
      p2b: ".",
    },

    s4: {
      eye: "Cosa abbiamo costruito",
      h2a: "Il margine vero, SKU per ",
      h2emph: "SKU",
      h2b: ".",
      lead: "Non più una media di negozio: il conto economico reale di ogni singolo prodotto, su ogni canale, riga per riga.",
      rows: [
        { i: "01", b: "Margine effettivo per SKU", p: "Calcolato su ogni singolo prodotto, non sulla media del negozio." },
        { i: "02", b: "Commissioni marketplace reali", p: "Sottratte canale per canale, con le tabelle vere di ciascun marketplace." },
        { i: "03", b: "Costo prodotto e ad spend allocata", p: "Scaricati su ogni unità venduta, non su un forfait medio." },
        { i: "04", b: "Tutti i canali letti insieme", p: "Lo stesso prodotto si confronta dove rende e dove brucia." },
        { i: "05", b: "Aritmetica decimale esatta", p: "Su migliaia di righe, l'arrotondamento sbagliato è proprio dove sparisce il margine." },
      ],
    },

    s5: {
      eye: "Il risultato",
      h2a: "Tre best-seller. Tre ",
      h2emph: "bugie",
      h2b: " diverse.",
      lead: "Stesso prodotto, tre canali, tre verità opposte. Uno rendeva, uno pareggiava, uno bruciava cassa a ogni unità venduta e continuava a essere spinto in ads.",
      figFt: "Margine per canale, stesso SKU",
      figAria: "Tre barre orizzontali dello stesso prodotto su tre canali: canale proprio in margine positivo, marketplace terzi vicino al pareggio, canale ads aggressivo in margine negativo, scoperto e tolto dalla spinta pubblicitaria",
      lbl: { zero: "zero", proprio: "Canale proprio", sano: "margine sano", terzi: "Marketplace terzi", pareggio: "quasi pareggio", ads: "Canale ads aggressivo", tolto: "scoperto e tolto dalla spinta ads" },
      capA: "Lo stesso prodotto, letto sui tre canali insieme: un canale rendeva, uno era al pareggio, uno era già in ",
      capLoss: "margine negativo",
      capMid: " e veniva comunque spinto in ads perché era il best-seller a fatturato. ",
      capB: "Tre SKU così sono stati scoperti e tolti dalla spinta pubblicitaria nella prima settimana.",
    },

    s6: {
      tiles: [
        { k: "SKU in rosso scoperti", n: "3", cls: "loss", p: "Tolti dalla spinta pubblicitaria nella prima settimana." },
        { k: "Recupero margine di portafoglio", n: "doppia cifra", cls: "gain", p: "Solo riallocando il budget sui prodotti giusti." },
        { k: "Tempo per vedere il recupero", n: "1 trimestre", cls: "", p: "Fine delle decisioni di scaling prese sul fatturato invece che sul profitto." },
      ],
    },

    s7: {
      eye: "In una riga",
      h2a: "Smetti di pagare per vendere il tuo best-seller senza ",
      h2emph: "saperlo",
      h2b: ".",
      p: "Quanti dei tuoi “prodotti di punta” stanno bruciando margine sotto ai tuoi occhi? Il ROIometro te lo mette in euro.",
      cta1: "Calcola cosa perdi ▸",
      cta2: "Parla con noi",
      altriEye: "Altri casi",
      cards: [
        { cat: "Cassa & margine", h: "Le fatture le emetti tu. Chi le incassa?", link: "Apri il dossier ▸" },
        { cat: "Onboarding", h: "AG Academy", link: "Apri il dossier ▸" },
      ],
    },
  },
  en: {
    metaTitle: "The best-seller that was eating you alive · Morfeus Case",
    metaDesc:
      "Case #032: a DTC e-commerce was scaling its top-selling product in ads without knowing every unit left the bank account emptier than before. Three SKUs in the red uncovered, double-digit margin recovery in one quarter.",
    crumbsCasi: "Cases",
    crumbsCase: "Valueize · Case #032",
    tags: ["E-commerce / omnichannel DTC", "Digital SMB 5-50 people", "Margin per SKU"],
    h1a: "The best-seller that was ",
    h1emph: "eating",
    h1b: " you alive",
    standfirst: "Stop paying to sell your best-seller without knowing it.",
    stats: [
      { n: "3", cls: "loss", l: "“top” SKUs uncovered as net losses" },
      { n: "double digit", cls: "gain", l: "recovery on portfolio margin" },
      { n: "1 quarter", cls: "", l: "to see the recovery, only reallocating budget" },
    ],
    stamp: "Confirmed",

    s2: {
      eye: "The house was burning",
      h2a: "Revenue was growing. Cash wasn't. And nobody knew ",
      h2emph: "why",
      h2b: ".",
      p1: "Revenue kept growing month after month and everyone was happy. Then at quarter close the accountant asked why cash didn't follow, and no one had an answer. The top-selling product, the one they pushed in ads and put on the front page, they were selling below cost without knowing it: after the marketplace fee, cost of goods, allocated ad spend and the slice eaten by returns, every unit left the account emptier than before.",
      p2a: "But in the sales dashboard it was the best-seller, so they scaled it. ",
      p2emph: "They were burning cash to grow a product that was slowly killing them.",
      figFt: "The margin waterfall",
      figAria: "Waterfall starting from the selling price and stepping down by marketplace fee, product cost, allocated ad spend and returns, down to a real margin below the zero line",
      figLabels: {
        zero: "zero",
        v1: ["selling", "price"],
        v2: ["marketplace", "fee"],
        v3: ["product", "cost"],
        v4: ["allocated", "ad spend"],
        v5: ["returns"],
        v6: ["real", "margin"],
        neg: "negative",
      },
      figCapA: "Every line subtracted drops the bar one step further: fee, product cost, allocated ad spend, returns. On the best-seller the waterfall didn't stop at zero. ",
      figCapB: "The real margin ended below the line, in the red.",
    },

    s3: {
      eye: "Why it stayed unresolved",
      qA: "“The dashboard showed revenue and gross ROAS. Never what actually stayed ",
      qEmph: "in our pocket",
      qB: ".”",
      src: "▸ the wrong number was driving the decisions",
      p1: "They had tried the monthly Excel sheet, but with three channels, dozens of SKUs and different fee tables per marketplace, rebuilding the real margin product by product was a days-long job no one had time to do properly.",
      p2a: "The platform dashboards showed revenue and gross ROAS, never what actually stayed in their pocket. So they decided what to push looking at ",
      p2emph: "the wrong number",
      p2b: ".",
    },

    s4: {
      eye: "What we built",
      h2a: "The real margin, SKU by ",
      h2emph: "SKU",
      h2b: ".",
      lead: "No more store average: the real P&L of every single product, on every channel, line by line.",
      rows: [
        { i: "01", b: "Effective margin per SKU", p: "Computed on every single product, not on the store average." },
        { i: "02", b: "Real marketplace fees", p: "Subtracted channel by channel, with the actual tables of each marketplace." },
        { i: "03", b: "Product cost and allocated ad spend", p: "Charged to each unit sold, not to a blanket average." },
        { i: "04", b: "All channels read together", p: "The same product is compared where it pays and where it burns." },
        { i: "05", b: "Exact decimal arithmetic", p: "Across thousands of rows, the wrong rounding is exactly where margin disappears." },
      ],
    },

    s5: {
      eye: "The result",
      h2a: "Three best-sellers. Three different ",
      h2emph: "lies",
      h2b: ".",
      lead: "Same product, three channels, three opposite truths. One paid off, one broke even, one burned cash on every unit sold and kept getting pushed in ads.",
      figFt: "Margin per channel, same SKU",
      figAria: "Three horizontal bars of the same product on three channels: own channel in positive margin, third-party marketplaces near break-even, aggressive ads channel in negative margin, uncovered and removed from the ad push",
      lbl: { zero: "zero", proprio: "Own channel", sano: "healthy margin", terzi: "Third-party marketplaces", pareggio: "near break-even", ads: "Aggressive ads channel", tolto: "uncovered and removed from ads" },
      capA: "The same product, read across the three channels together: one channel paid off, one was at break-even, one was already in ",
      capLoss: "negative margin",
      capMid: " and was still being pushed in ads because it was the best-seller by revenue. ",
      capB: "Three SKUs like this were uncovered and removed from the ad push in the first week.",
    },

    s6: {
      tiles: [
        { k: "SKUs in the red uncovered", n: "3", cls: "loss", p: "Removed from ad push in the first week." },
        { k: "Portfolio margin recovery", n: "double digit", cls: "gain", p: "Only by reallocating budget to the right products." },
        { k: "Time to see the recovery", n: "1 quarter", cls: "", p: "End of scaling decisions taken on revenue instead of profit." },
      ],
    },

    s7: {
      eye: "In one line",
      h2a: "Stop paying to sell your best-seller without ",
      h2emph: "knowing it",
      h2b: ".",
      p: "How many of your “top products” are burning margin under your eyes? The ROIometro puts it in euros.",
      cta1: "Calculate what you lose ▸",
      cta2: "Talk to us",
      altriEye: "Other cases",
      cards: [
        { cat: "Cash & margin", h: "You issue the invoices. Who's collecting them?", link: "Open the dossier ▸" },
        { cat: "Onboarding", h: "AG Academy", link: "Open the dossier ▸" },
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
    alternates: buildLocaleAlternates(SLUG, safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "article",
      url: `${SITE_URL}/${safeLocale}/${SLUG}`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

const PAGE_STYLES = `
.ms .caso-page .crumbs{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;color:var(--ombra)}
.ms .caso-page .crumbs a{color:var(--lilla)}
.ms .caso-page .tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}
.ms .caso-page .tag{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--lilla);border:1px solid rgba(169,156,255,.3);border-radius:var(--r-pill);padding:4px 11px}
.ms .caso-page .ahead h1{font-size:clamp(30px,5.2vw,54px);font-weight:600;margin:16px 0;max-width:17ch;line-height:1.08;font-family:var(--font-display);letter-spacing:-.02em}
.ms .caso-page .standfirst{font-family:var(--font-emph);font-style:italic;font-size:clamp(18px,2.2vw,24px);color:#c6c4d8;max-width:56ch}
.ms .caso-page .headstats{display:flex;gap:32px;flex-wrap:wrap;margin-top:28px;padding-top:22px;border-top:1px solid var(--riga-scuro)}
.ms .caso-page .headstats .s .n{font-family:var(--font-display);font-weight:600;font-size:clamp(26px,3.4vw,36px);line-height:1}
.ms .caso-page .headstats .s .n.loss{color:var(--anomalia)}
.ms .caso-page .headstats .s .n.gain{color:var(--ok)}
.ms .caso-page .headstats .s .l{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ombra);margin-top:8px;max-width:20ch}
.ms .caso-page .headfoot{display:flex;align-items:center;gap:14px;margin-top:24px;flex-wrap:wrap}
.ms .caso-page .headfoot .stamp{border-color:var(--lilla);color:var(--lilla)}
.ms .caso-page .read{max-width:760px;margin:0 auto}
.ms .caso-page .prose p{font-size:17px;margin:14px 0}
.ms .caso-page .band.carta .prose p{color:#23222e}
.ms .caso-page .band.ink .prose p{color:#c3c1d6}
.ms .caso-page .figure{margin:8px 0 0}
.ms .caso-page .figure .ft{font-family:var(--font-mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:14px}
.ms .caso-page .band.carta .figure .ft{color:var(--firma)}
.ms .caso-page .band.ink .figure .ft{color:var(--lilla)}
.ms .caso-page .figbox{border-radius:var(--r-m);padding:26px 24px}
.ms .caso-page .band.carta .figbox{border:1px solid rgba(20,19,46,.14);background:rgba(20,19,46,.02)}
.ms .caso-page .band.ink .figbox{border:1px solid var(--riga-scuro);background:rgba(255,255,255,.02)}
.ms .caso-page .chart{width:100%;height:auto;display:block;overflow:visible}
.ms .caso-page .chart text{font-family:var(--font-mono);font-size:12px}
.ms .caso-page .figcap{margin-top:14px;font-size:14px;max-width:64ch}
.ms .caso-page .band.carta .figcap{color:#34324a}
.ms .caso-page .band.ink .figcap{color:#c6c4d8}
.ms .caso-page .figcap b{font-weight:700}
.ms .caso-page .band.carta .figcap b{color:var(--inchiostro)}
.ms .caso-page .band.ink .figcap b{color:var(--carta)}
.ms .caso-page .pquote{font-family:var(--font-emph);font-style:italic;font-size:clamp(20px,2.8vw,28px);line-height:1.35;max-width:22ch;margin:0;color:var(--carta)}
.ms .caso-page .pquote .src{display:block;font-family:var(--font-mono);font-style:normal;font-size:11px;letter-spacing:.08em;color:var(--ombra);margin-top:16px}
.ms .caso-page .twogrid{display:grid;grid-template-columns:.85fr 1.15fr;gap:44px;align-items:center}
@media(max-width:860px){.ms .caso-page .twogrid{grid-template-columns:1fr;gap:28px}}
.ms .caso-page .built{display:flex;flex-direction:column;gap:2px;margin-top:24px}
.ms .caso-page .built .row{display:grid;grid-template-columns:auto 1fr;gap:16px;padding:16px 0;border-top:1px solid rgba(20,19,46,.14)}
.ms .caso-page .band.ink .built .row{border-top-color:var(--riga-scuro)}
.ms .caso-page .built .row:first-child{border-top:none}
.ms .caso-page .built .ix{font-family:var(--font-mono);font-size:12px;color:var(--firma);padding-top:3px}
.ms .caso-page .band.ink .built .ix{color:var(--lilla)}
.ms .caso-page .built .row b{font-family:var(--font-display);font-weight:600;font-size:17px}
.ms .caso-page .band.carta .built .row b{color:var(--inchiostro)}
.ms .caso-page .band.ink .built .row b{color:var(--carta)}
.ms .caso-page .built .row p{font-size:14.5px;margin-top:4px}
.ms .caso-page .band.carta .built .row p{color:#34324a}
.ms .caso-page .band.ink .built .row p{color:#c6c4d8}
.ms .caso-page .tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:760px){.ms .caso-page .tiles{grid-template-columns:1fr}}
.ms .caso-page .tile{border:1px solid rgba(20,19,46,.14);background:rgba(20,19,46,.02);border-radius:var(--r-m);padding:22px}
.ms .caso-page .tile .k{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ombra)}
.ms .caso-page .tile .n{font-family:var(--font-display);font-weight:600;font-size:clamp(28px,3.6vw,40px);line-height:1;margin:10px 0 6px;color:var(--inchiostro)}
.ms .caso-page .tile .n.loss{color:var(--anomalia)}
.ms .caso-page .tile .n.gain{color:var(--ok)}
.ms .caso-page .tile p{font-size:13px;color:#34324a}
.ms .caso-page .rgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:24px}
@media(max-width:760px){.ms .caso-page .rgrid{grid-template-columns:1fr}}
.ms .caso-page .rcard{border:1px solid var(--riga-scuro);border-radius:var(--r-m);background:rgba(255,255,255,.02);padding:20px;display:block}
.ms .caso-page .rcard .cat{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--lilla)}
.ms .caso-page .rcard h3{font-size:16px;font-weight:600;margin:8px 0 10px;color:var(--carta);font-family:var(--font-display);letter-spacing:-.02em}
`;

export default function CasoValueizePage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  const url = `${SITE_URL}/${safeLocale}/${SLUG}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        author: { "@id": ORGANIZATION_ID },
        about: { "@id": ORGANIZATION_ID },
        articleSection: isIt ? "Casi" : "Cases",
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
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />

      <div className="caso-page">
        {/* 01 · TESTATA · INCHIOSTRO */}
        <section className="band ink" id="testata">
          <div className="read ahead">
            <div className="crumbs">
              <Link href={`${base}/casi`}>{t.crumbsCasi}</Link> · {t.crumbsCase}
            </div>
            <div className="tags">
              {t.tags.map((tag, i) => (
                <span className="tag" key={i}>
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
                  <div className={s.cls ? `n ${s.cls}` : "n"}>{s.n}</div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="headfoot">
              <span className="stamp">{t.stamp}</span>
            </div>
          </div>
        </section>

        {/* 02 · LA CASA CHE BRUCIAVA · CARTA */}
        <section className="band carta">
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
                <span className="emph">{t.s2.p2emph}</span>
              </p>
            </div>
          </div>
          <div className="wrap figure" style={{ marginTop: 44 }}>
            <div className="ft">{t.s2.figFt}</div>
            <div className="figbox">
              <svg className="chart" viewBox="0 0 720 300" role="img" aria-label={t.s2.figAria}>
                <line x1="10" y1="220" x2="710" y2="220" stroke="rgba(20,19,46,.3)" strokeDasharray="3 4" />
                <text x="712" y="224" fontSize="10" fill="#7A7890">
                  {t.s2.figLabels.zero}
                </text>
                <g stroke="#A99CFF" strokeWidth="1.5" strokeDasharray="4 4">
                  <line x1="115" y1="60" x2="145" y2="90" />
                  <line x1="230" y1="90" x2="260" y2="120" />
                  <line x1="345" y1="120" x2="375" y2="145" />
                  <line x1="460" y1="145" x2="490" y2="170" />
                  <line x1="575" y1="170" x2="605" y2="220" />
                </g>
                <g>
                  <rect x="30" y="60" width="85" height="160" rx="6" fill="#533DFC" />
                  <rect x="145" y="90" width="85" height="130" rx="6" fill="#A99CFF" />
                  <rect x="260" y="120" width="85" height="100" rx="6" fill="#A99CFF" />
                  <rect x="375" y="145" width="85" height="75" rx="6" fill="#A99CFF" />
                  <rect x="490" y="170" width="85" height="50" rx="6" fill="#A99CFF" />
                  <rect x="605" y="220" width="85" height="40" rx="6" fill="#FF5C5C" />
                </g>
                <g fontSize="10.5" fill="#7A7890" textAnchor="middle">
                  <text x="72" y="238">{t.s2.figLabels.v1[0]}</text>
                  <text x="72" y="250">{t.s2.figLabels.v1[1]}</text>
                  <text x="187" y="238">{t.s2.figLabels.v2[0]}</text>
                  <text x="187" y="250">{t.s2.figLabels.v2[1]}</text>
                  <text x="302" y="238">{t.s2.figLabels.v3[0]}</text>
                  <text x="302" y="250">{t.s2.figLabels.v3[1]}</text>
                  <text x="417" y="238">{t.s2.figLabels.v4[0]}</text>
                  <text x="417" y="250">{t.s2.figLabels.v4[1]}</text>
                  <text x="532" y="238">{t.s2.figLabels.v5[0]}</text>
                  <text x="647" y="278">{t.s2.figLabels.v6[0]}</text>
                  <text x="647" y="290">{t.s2.figLabels.v6[1]}</text>
                </g>
                <text
                  x="647"
                  y="266"
                  textAnchor="middle"
                  fill="#FF5C5C"
                  fontStyle="italic"
                  fontSize="14"
                  fontFamily="var(--font-emph)"
                >
                  {t.s2.figLabels.neg}
                </text>
              </svg>
              <p className="figcap">
                {t.s2.figCapA}
                <b>{t.s2.figCapB}</b>
              </p>
            </div>
          </div>
        </section>

        {/* 03 · PERCHÉ RESTAVA IRRISOLTO · INCHIOSTRO */}
        <section className="band ink">
          <div className="wrap twogrid">
            <div>
              <div className="eye">{t.s3.eye}</div>
              <blockquote className="pquote" style={{ marginTop: 14 }}>
                {t.s3.qA}
                <span className="emph">{t.s3.qEmph}</span>
                {t.s3.qB}
                <span className="src">{t.s3.src}</span>
              </blockquote>
            </div>
            <div className="prose">
              <p>{t.s3.p1}</p>
              <p>
                {t.s3.p2a}
                <span className="emph">{t.s3.p2emph}</span>
                {t.s3.p2b}
              </p>
            </div>
          </div>
        </section>

        {/* 04 · COSA ABBIAMO COSTRUITO · CARTA */}
        <section className="band carta">
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
        </section>

        {/* 05 · IL RISULTATO · INCHIOSTRO */}
        <section className="band ink">
          <div className="read">
            <div className="eye">{t.s5.eye}</div>
            <h2 className="h-sect">
              {t.s5.h2a}
              <span className="emph">{t.s5.h2emph}</span>
              {t.s5.h2b}
            </h2>
            <p className="lead">{t.s5.lead}</p>
          </div>
          <div className="wrap figure" style={{ marginTop: 40 }}>
            <div className="ft">{t.s5.figFt}</div>
            <div className="figbox">
              <svg className="chart" viewBox="0 0 640 260" role="img" aria-label={t.s5.figAria}>
                <line x1="300" y1="20" x2="300" y2="240" stroke="rgba(169,156,255,.35)" />
                <text x="300" y="14" textAnchor="middle" fontSize="10" fill="#c6c4d8">
                  {t.s5.lbl.zero}
                </text>

                <rect x="300" y="45" width="180" height="42" rx="6" fill="#1E9E5A" />
                <text x="80" y="71" fontSize="12.5" fill="#c3c1d6">
                  {t.s5.lbl.proprio}
                </text>
                <text x="490" y="71" fontSize="12.5" fill="#1E9E5A" fontWeight="600">
                  {t.s5.lbl.sano}
                </text>

                <rect x="288" y="112" width="24" height="42" rx="5" fill="#A99CFF" />
                <text x="80" y="138" fontSize="12.5" fill="#c3c1d6">
                  {t.s5.lbl.terzi}
                </text>
                <text x="322" y="138" fontSize="12.5" fill="#A99CFF">
                  {t.s5.lbl.pareggio}
                </text>

                <rect x="130" y="179" width="170" height="42" rx="6" fill="#FF5C5C" />
                <text x="80" y="205" fontSize="12.5" fill="#c3c1d6">
                  {t.s5.lbl.ads}
                </text>
                <text x="80" y="240" fontStyle="italic" fontSize="14" fill="#FF5C5C" fontFamily="var(--font-emph)">
                  {t.s5.lbl.tolto}
                </text>
              </svg>
              <p className="figcap">
                {t.s5.capA}
                <span className="loss">{t.s5.capLoss}</span>
                {t.s5.capMid}
                <b>{t.s5.capB}</b>
              </p>
            </div>
          </div>
        </section>

        {/* 06 · TILES RISULTATO · CARTA */}
        <section className="band carta">
          <div className="wrap">
            <div className="tiles">
              {t.s6.tiles.map((tile, i) => (
                <div className="tile" key={i}>
                  <div className="k">{tile.k}</div>
                  <div className={tile.cls ? `n ${tile.cls}` : "n"}>{tile.n}</div>
                  <p>{tile.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 · CTA + CORRELATI · INCHIOSTRO */}
        <section className="band ink ctaq" id="cta">
          <div className="wrap">
            <div className="eye">{t.s7.eye}</div>
            <h2>
              {t.s7.h2a}
              <span className="emph">{t.s7.h2emph}</span>
              {t.s7.h2b}
            </h2>
            <p>{t.s7.p}</p>
            <div className="cta-row">
              <Link className="btn btn-1" href={`${base}/roiometro`}>
                {t.s7.cta1}
              </Link>
              <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com">
                {t.s7.cta2}
              </a>
            </div>
          </div>
          <div className="wrap" style={{ marginTop: 64 }}>
            <div className="eye" style={{ textAlign: "left" }}>
              {t.s7.altriEye}
            </div>
            <div className="rgrid">
              {t.s7.cards.map((c, i) => (
                <span className="rcard" key={i}>
                  <span className="cat">{c.cat}</span>
                  <h3>{c.h}</h3>
                  <span className="btn btn-3">{c.link}</span>
                </span>
              ))}
              <Link className="rcard" href={`${base}/casi`}>
                <span className="cat">{t.crumbsCasi}</span>
                <h3>{t.s7.altriEye}</h3>
                <span className="btn btn-3">{isIt ? "Vedi tutti ▸" : "See all ▸"}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
