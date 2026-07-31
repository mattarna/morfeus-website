import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: Promise<{ locale: string }> };

const SLUG = "casi/brainiac-tesoreria-riconciliata";

const COPY = {
  it: {
    metaTitle: "Le fatture le emetti tu. Chi le incassa? · Caso Brainiac · Morfeus",
    metaDesc:
      "Caso #049 Brainiac: una PMI con due societa scopriva i buchi di cassa quando ce li aveva davanti. Cassa riconciliata sul telefono, 65.000 euro di crediti recuperati nel primo trimestre.",
    articleHeadline:
      "Le fatture le emetti tu. Chi le incassa? · Brainiac, tesoreria riconciliata",
    articleDesc:
      "Caso studio Morfeus #049: come una PMI da circa 10M ha reso visibile la cassa reale su due societa, ha recuperato 65.000 euro di crediti scaduti nel primo trimestre e ha tagliato di 18 giorni i tempi medi d'incasso.",
    stamp: "Confermato",
    crumbsCasi: "Casi",
    crumbsSep: "Cassa e margine",
    crumbsN: "Caso #049",
    tags: ["Studio + costruzioni", "PMI ~10M", "Tesoreria riconciliata"],
    h1a: "Le fatture le emetti tu. Chi le ",
    h1emph: "incassa",
    h1b: "?",
    standfirst:
      "Non e fatturato che ti manca: e l'incassato che nessuno stava inseguendo.",
    headstats: [
      { n: "65.000 euro", l: "crediti scaduti recuperati nel primo trimestre", gain: true },
      { n: "-18", l: "giorni medi d'incasso", gain: true },
      { n: "0", l: "tempo di riconciliazione, avviene da sola", gain: false },
    ],

    s02Eye: "La casa che bruciava",
    s02H2a: "Il gestionale mostrava l'emesso. Mai ",
    s02H2emph: "l'incassato",
    s02H2b: ".",
    s02P1:
      "Il titolare gestiva due realta sotto lo stesso cappello: lo studio e l'impresa di costruzioni. Su progetti che cubano intorno ai 10 milioni, il denaro entrava e usciva su piu conti, piu commesse, con SAL emessi e mai inseguiti. La domanda piu semplice, \"quanto ho davvero in cassa ora, al netto di quello che devo e di quello che mi devono?\", non aveva risposta in meno di mezza giornata di export, fogli e telefonate al commercialista.",
    s02P2a:
      "Il veleno che beveva senza accorgersene: la fattura partiva, finiva in un PDF, e li moriva. Nessuno la riconciliava contro il bonifico. Un SAL da decine di migliaia di euro restava aperto 90, 120 giorni, non perche il cliente non volesse pagare, ma perche nessuno l'aveva sollecitato. ",
    s02P2emph: "I soldi dovuti non urlano: muoiono nel silenzio.",
    fig1Ft: "Le tre verita che non si parlavano",
    fig1Box: ["Gestionale", "conosce l'EMESSO", "Home banking", "conosce i MOVIMENTI", "Commercialista", "chiude DOPO"],
    fig1Unified: "Cassa riconciliata",
    fig1UnifiedSub: "emesso -> incassato si / no",
    fig1Cap1:
      "Tre verita separate: il gestionale conosceva il fatturato, la banca i movimenti, il commercialista i conti a consuntivo. Per unirle qualcuno doveva riconciliare a mano, riga per riga. Quel qualcuno era il titolare, che il tempo non ce l'aveva. ",
    fig1CapB: "Cosi non si faceva mai, e la cassa restava una stima.",

    s03Eye: "Il credito invecchiato",
    s03Q1: "\"Scopri il buco quando ce l'hai sotto il naso, e a fine trimestre ",
    s03Qemph: "60-70 mila euro",
    s03Q2: " erano fermi in fatture che bastava sollecitare.\"",
    s03Src: "il costo reale del non-fare",
    fig2Ft: "Crediti per scaglione d'eta · prima",
    fig2Labels: ["a scadere", "30 gg", "60 gg", "90+ gg"],
    fig2Annot: "dormivano qui",
    fig2Cap1:
      "Il credito vecchio sprofondava invece di saltare all'occhio. Gli scaglioni oltre i 60 giorni, in ",
    fig2CapLoss: "rosso",
    fig2Cap2: ", erano decine di migliaia di euro gia guadagnati e mai incassati. ",
    fig2CapB: "Non un problema di clienti: un problema di visibilita.",

    s04Eye: "Perche restava irrisolto",
    s04H2a: "Aveva tutto. Tranne le tre cose che si ",
    s04H2emph: "parlano",
    s04H2b: ".",
    s04P1:
      "Aveva il commercialista, aveva il gestionale, aveva l'home banking. Il commercialista chiude i conti dopo, non in tempo reale. Il gestionale conosce il fatturato, non l'estratto conto. L'home banking conosce i movimenti, non a quale fattura corrispondono.",
    s04P2a:
      "Per unirle, qualcuno doveva sedersi e riconciliare a mano, riga per riga. E quel qualcuno era lui, che il tempo non ce l'aveva. Non e mancanza di strumenti: e che ",
    s04P2emph: "nessuno strumento, da solo, ti dice quanto hai davvero in cassa",
    s04P2b: ".",

    s05Eye: "Cosa abbiamo costruito",
    s05H2a: "La cassa riconciliata, sul ",
    s05H2emph: "telefono",
    s05H2b: ".",
    s05Lead:
      "Un unico numero certo, aggiornato in continuo. La riconciliazione avviene da sola: ogni fattura confrontata contro la banca, ogni credito invecchiato che chiede di essere sollecitato.",
    s05Rows: [
      { b: "Liquidita reale, in tre secondi", p: "Una vista unica su tutti i conti delle due societa, leggibile dal telefono." },
      { b: "Riconciliazione automatica", p: "Ogni fattura confrontata contro i movimenti bancari: non piu \"emesso\" ma \"incassato si / no\"." },
      { b: "Dovuto invecchiato per scaglioni", p: "A scadere, scaduto 30 / 60 / 90+: il credito vecchio salta all'occhio invece di sprofondare." },
      { b: "Direzione del flusso", p: "Debiti verso fornitori e verso dove va la cassa: il mese sta drenando o riempiendo?" },
      { b: "Il runway", p: "Per quanti giorni la cassa regge al ritmo attuale di uscite, senza nuovi incassi." },
    ],

    s06Eye: "Il risultato",
    s06H2a: "65.000 euro recuperati, solo perche erano ",
    s06H2emph: "visibili",
    s06H2b: ".",
    s06Lead:
      "La cassa ha smesso di essere una stima da ricostruire ed e diventata un numero certo, sempre in tasca. Sollecitare e passato da compito da rimandare a decisione di trenta secondi col caffe in mano.",
    fig3Ft: "Crediti scaduti nel primo trimestre · prima e dopo",
    fig3Line: "crediti scaduti",
    fig3Months: ["gennaio", "febbraio", "marzo"],
    fig3Callout: "65.000 euro recuperati",
    fig3Foot: "solleciti partiti",
    fig3Cap1: "Appena i crediti sono diventati visibili e sollecitati, lo scaduto ha iniziato a scendere: circa ",
    fig3CapB: "65.000 euro rientrati nel primo trimestre",
    fig3Cap2: ", senza un euro di nuovo fatturato.",
    tiles: [
      { k: "Crediti recuperati · Q1", n: "65.000 euro", p: "Solo perche per la prima volta erano visibili e sollecitati.", gain: true },
      { k: "Giorni medi d'incasso", n: "-18", p: "Il sollecito parte appena la fattura sfora, non a fine trimestre.", gain: true },
      { k: "Tempo di riconciliazione", n: "∞ -> 0", p: "Da mezza giornata a fine mese a zero: avviene da sola, in continuo.", gain: false },
    ],

    ctaEye: "In una riga",
    ctaH2a: "Non e fatturato che ti manca: e l'incassato che nessuno stava ",
    ctaH2emph: "inseguendo",
    ctaH2b: ".",
    ctaP: "Quanto hai fermo, ora, in crediti che basterebbe sollecitare? Il ROIometro te lo mette in euro.",
    cta1: "Calcola cosa perdi ▸",
    cta2: "Torna ai casi",
    relatedEye: "Altri casi",
    related: [
      { cat: "Vendite", h: "Vendono tutto tranne la cosa a margine piu alto" },
      { cat: "Margine", h: "Il best-seller che ti stava mangiando vivo" },
      { cat: "Consulenza", h: "Il numero cambiava a ogni click, e ci mettevano la firma" },
    ],
    relatedOpen: "Dossier in arrivo",
  },
  en: {
    metaTitle: "You issue the invoices. Who collects them? · Brainiac case · Morfeus",
    metaDesc:
      "Case #049 Brainiac: an SMB with two companies discovered its cash gaps only when they were already in front of it. Cash reconciled on the phone, 65,000 euro of receivables recovered in the first quarter.",
    articleHeadline:
      "You issue the invoices. Who collects them? · Brainiac, reconciled treasury",
    articleDesc:
      "Morfeus case study #049: how an SMB of about 10M made the real cash position visible across two companies, recovered 65,000 euro of overdue receivables in the first quarter, and cut collection times by 18 days.",
    stamp: "Confirmed",
    crumbsCasi: "Cases",
    crumbsSep: "Cash and margin",
    crumbsN: "Case #049",
    tags: ["Studio + construction", "SMB ~10M", "Reconciled treasury"],
    h1a: "You issue the invoices. Who ",
    h1emph: "collects",
    h1b: " them?",
    standfirst:
      "It's not revenue you're missing: it's the cash no one was chasing.",
    headstats: [
      { n: "65,000 euro", l: "overdue receivables recovered in the first quarter", gain: true },
      { n: "-18", l: "average days to cash", gain: true },
      { n: "0", l: "reconciliation time, it happens on its own", gain: false },
    ],

    s02Eye: "The house that was burning",
    s02H2a: "The ERP showed invoices issued. Never ",
    s02H2emph: "what was collected",
    s02H2b: ".",
    s02P1:
      "The owner ran two entities under the same roof: the studio and the construction firm. On projects worth around 10 million, money moved in and out across multiple accounts, multiple work orders, with progress invoices issued and never followed up. The simplest question, \"how much do I actually have in cash right now, net of what I owe and what is owed to me?\", couldn't be answered in less than half a day of exports, spreadsheets and calls to the accountant.",
    s02P2a:
      "The poison he drank without noticing: the invoice went out, ended up in a PDF, and died there. No one reconciled it against the bank transfer. A progress invoice worth tens of thousands stayed open 90, 120 days, not because the client wouldn't pay, but because no one had chased it. ",
    s02P2emph: "Owed money doesn't scream: it dies in silence.",
    fig1Ft: "The three truths that didn't talk to each other",
    fig1Box: ["ERP", "knows what was ISSUED", "Home banking", "knows the MOVEMENTS", "Accountant", "closes AFTER"],
    fig1Unified: "Reconciled cash",
    fig1UnifiedSub: "issued -> collected yes / no",
    fig1Cap1:
      "Three separate truths: the ERP knew billings, the bank knew movements, the accountant knew the books after the fact. To join them someone had to reconcile by hand, line by line. That someone was the owner, who didn't have the time. ",
    fig1CapB: "So it never got done, and cash stayed an estimate.",

    s03Eye: "Aging receivables",
    s03Q1: "\"You spot the gap only when it's under your nose, and by quarter-end ",
    s03Qemph: "60-70 thousand euro",
    s03Q2: " were stuck in invoices a simple chase would have unlocked.\"",
    s03Src: "the real cost of not-doing",
    fig2Ft: "Receivables by aging bracket · before",
    fig2Labels: ["current", "30 d", "60 d", "90+ d"],
    fig2Annot: "sleeping here",
    fig2Cap1:
      "Old credit sank instead of standing out. The buckets past 60 days, in ",
    fig2CapLoss: "red",
    fig2Cap2: ", were tens of thousands already earned and never collected. ",
    fig2CapB: "Not a client problem: a visibility problem.",

    s04Eye: "Why it stayed unresolved",
    s04H2a: "He had everything. Except the three things that ",
    s04H2emph: "talk to each other",
    s04H2b: ".",
    s04P1:
      "He had the accountant, he had the ERP, he had home banking. The accountant closes the books after the fact, not in real time. The ERP knows billings, not the bank statement. Home banking knows the movements, not which invoice they belong to.",
    s04P2a:
      "To join them, someone had to sit down and reconcile by hand, line by line. And that someone was him, and he didn't have the time. It's not a lack of tools: it's that ",
    s04P2emph: "no single tool tells you how much cash you actually have",
    s04P2b: ".",

    s05Eye: "What we built",
    s05H2a: "Reconciled cash, on the ",
    s05H2emph: "phone",
    s05H2b: ".",
    s05Lead:
      "A single certain number, continuously updated. Reconciliation happens by itself: every invoice matched against the bank, every aged credit that asks to be chased.",
    s05Rows: [
      { b: "Real liquidity, in three seconds", p: "One view over all the accounts of both companies, readable from the phone." },
      { b: "Automatic reconciliation", p: "Every invoice matched against bank movements: no longer \"issued\", now \"collected yes / no\"." },
      { b: "Aged payables by bucket", p: "Current, 30 / 60 / 90+ past due: old credit stands out instead of sinking." },
      { b: "Flow direction", p: "Vendor payables and where cash is going: is the month draining or filling?" },
      { b: "The runway", p: "For how many days cash holds at the current burn, with no new inflows." },
    ],

    s06Eye: "The result",
    s06H2a: "65,000 euro recovered, just because they were ",
    s06H2emph: "visible",
    s06H2b: ".",
    s06Lead:
      "Cash stopped being an estimate to rebuild and became a certain number, always in the pocket. Chasing went from a task to postpone to a thirty-second decision with a coffee in hand.",
    fig3Ft: "Overdue receivables in Q1 · before and after",
    fig3Line: "overdue receivables",
    fig3Months: ["January", "February", "March"],
    fig3Callout: "65,000 euro recovered",
    fig3Foot: "chases sent",
    fig3Cap1: "As soon as receivables became visible and chased, overdue balances started coming down: about ",
    fig3CapB: "65,000 euro back in the first quarter",
    fig3Cap2: ", without a euro of new billing.",
    tiles: [
      { k: "Receivables recovered · Q1", n: "65,000 euro", p: "Only because for the first time they were visible and chased.", gain: true },
      { k: "Average days to cash", n: "-18", p: "The chase goes out the moment the invoice slips, not at quarter-end.", gain: true },
      { k: "Reconciliation time", n: "∞ -> 0", p: "From half a day at month-end to zero: it happens by itself, continuously.", gain: false },
    ],

    ctaEye: "In one line",
    ctaH2a: "It's not revenue you're missing: it's the cash no one was ",
    ctaH2emph: "chasing",
    ctaH2b: ".",
    ctaP: "How much is stuck, right now, in receivables a simple chase would unlock? The ROIometro puts it in euros.",
    cta1: "Calculate what you lose ▸",
    cta2: "Back to the cases",
    relatedEye: "Other cases",
    related: [
      { cat: "Sales", h: "They sell everything except the highest-margin item" },
      { cat: "Margin", h: "The best-seller that was eating you alive" },
      { cat: "Consulting", h: "The number changed on every click, and they were signing off on it" },
    ],
    relatedOpen: "Dossier coming soon",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    alternates: buildLocaleAlternates(SLUG, safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "article",
      url: `${SITE_URL}${localePrefix(safeLocale)}/${SLUG}`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default async function BrainiacCasePage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  const url = `${SITE_URL}${localePrefix(safeLocale)}/${SLUG}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: t.articleHeadline,
        description: t.articleDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        about: { "@id": `${url}#client` },
        articleSection: isIt ? "Casi studio" : "Case studies",
        mainEntityOfPage: url,
      },
      {
        "@type": "Organization",
        "@id": `${url}#client`,
        name: "Brainiac",
        description: isIt
          ? "PMI italiana con studio professionale e impresa di costruzioni, circa 10M di volume."
          : "Italian SMB running a professional studio and a construction firm, around 10M in volume.",
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

      {/* 01 · TESTATA · INCHIOSTRO */}
      <section className="band ink" id="testata">
        <div className="wrap">
          <div className="max-w-[760px] mx-auto">
            <div className="font-plex text-[13px] tracking-[0.08em] text-ombra">
              <Link href={`${base}/casi`} className="text-lilla hover:underline">
                {t.crumbsCasi}
              </Link>
              <span> · {t.crumbsSep} · {t.crumbsN}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-plex text-[13px] tracking-[0.08em] uppercase text-lilla border border-lilla/30 rounded-full px-[11px] py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-clash font-semibold text-[clamp(30px,5.2vw,54px)] leading-[1.08] my-4 max-w-[17ch]">
              {t.h1a}
              <span className="emph">{t.h1emph}</span>
              {t.h1b}
            </h1>
            <p className="font-playfair italic text-[clamp(18px,2.2vw,24px)] text-[#c2c6d4] max-w-[56ch]">
              {t.standfirst}
            </p>
            <div className="flex flex-wrap gap-8 mt-7 pt-[22px] border-t border-riga-scuro">
              {t.headstats.map((s, i) => (
                <div key={i}>
                  <div
                    className={`font-clash font-semibold text-[clamp(26px,3.4vw,36px)] leading-none ${
                      s.gain ? "text-ok" : "text-carta"
                    }`}
                  >
                    {s.n}
                  </div>
                  <div className="font-plex text-[13px] tracking-[0.1em] uppercase text-ombra mt-2 max-w-[20ch]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-[14px] mt-6 flex-wrap">
              <span className="stamp">{t.stamp}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · LA CASA CHE BRUCIAVA · CARTA */}
      <section className="band carta">
        <div className="wrap">
          <div className="max-w-[760px] mx-auto">
            <div className="eye">{t.s02Eye}</div>
            <h2 className="h-sect">
              {t.s02H2a}
              <span className="emph">{t.s02H2emph}</span>
              {t.s02H2b}
            </h2>
            <div className="mt-2">
              <p className="text-[17px] leading-[1.65] text-[#23222e] my-[14px]">{t.s02P1}</p>
              <p className="text-[17px] leading-[1.65] text-[#23222e] my-[14px]">
                {t.s02P2a}
                <span className="emph">{t.s02P2emph}</span>
              </p>
            </div>
          </div>

          <div className="mt-11">
            <div className="font-plex text-[13px] tracking-[0.16em] uppercase text-firma mb-[14px]">
              {t.fig1Ft}
            </div>
            <div className="rounded-[12px] border border-inchiostro/[0.14] bg-inchiostro/[0.02] p-[26px_24px]">
              <svg
                viewBox="0 0 720 260"
                className="w-full h-auto block overflow-visible"
                role="img"
                aria-label={t.fig1Ft}
              >
                <g fontFamily="var(--f-mono), 'IBM Plex Mono', monospace">
                  <rect x="20" y="30" width="180" height="72" rx="10" fill="none" stroke="rgba(11,11,12,.3)" />
                  <text x="110" y="58" textAnchor="middle" fill="#0B0B0C" fontWeight="600" fontSize="14">{t.fig1Box[0]}</text>
                  <text x="110" y="80" textAnchor="middle" fill="#7E8091" fontSize="12">{t.fig1Box[1]}</text>

                  <rect x="270" y="30" width="180" height="72" rx="10" fill="none" stroke="rgba(11,11,12,.3)" />
                  <text x="360" y="58" textAnchor="middle" fill="#0B0B0C" fontWeight="600" fontSize="14">{t.fig1Box[2]}</text>
                  <text x="360" y="80" textAnchor="middle" fill="#7E8091" fontSize="12">{t.fig1Box[3]}</text>

                  <rect x="520" y="30" width="180" height="72" rx="10" fill="none" stroke="rgba(11,11,12,.3)" />
                  <text x="610" y="58" textAnchor="middle" fill="#0B0B0C" fontWeight="600" fontSize="14">{t.fig1Box[4]}</text>
                  <text x="610" y="80" textAnchor="middle" fill="#7E8091" fontSize="12">{t.fig1Box[5]}</text>
                </g>
                <g stroke="#FF5C5C" strokeWidth="2" strokeDasharray="5 5">
                  <line x1="200" y1="66" x2="270" y2="66" />
                  <line x1="450" y1="66" x2="520" y2="66" />
                </g>
                <text x="235" y="56" textAnchor="middle" fill="#FF5C5C" fontFamily="var(--f-mono), monospace" fontSize="16">×</text>
                <text x="485" y="56" textAnchor="middle" fill="#FF5C5C" fontFamily="var(--f-mono), monospace" fontSize="16">×</text>
                <g stroke="#8CA5F7" strokeWidth="2" fill="none">
                  <path d="M110,102 L110,150 L360,150" />
                  <path d="M360,102 L360,150" />
                  <path d="M610,102 L610,150 L360,150" />
                  <path d="M360,150 L360,178" />
                </g>
                <rect x="250" y="180" width="220" height="60" rx="10" fill="rgba(83,61,252,.08)" stroke="#533DFC" strokeWidth="2" />
                <text x="360" y="206" textAnchor="middle" fill="#533DFC" fontFamily="var(--font-display)" fontWeight="600" fontSize="15">
                  {t.fig1Unified}
                </text>
                <text x="360" y="226" textAnchor="middle" fill="#7E8091" fontFamily="var(--f-mono), monospace" fontSize="11">
                  {t.fig1UnifiedSub}
                </text>
              </svg>
              <p className="mt-[14px] text-[14px] leading-[1.6] text-[#3a3b45] max-w-[64ch]">
                {t.fig1Cap1}
                <b className="font-bold text-inchiostro">{t.fig1CapB}</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 · IL CREDITO INVECCHIATO · INCHIOSTRO */}
      <section className="band ink">
        <div className="wrap">
          <div className="grid gap-11 md:grid-cols-[.85fr_1.15fr] items-center">
            <div>
              <div className="eye">{t.s03Eye}</div>
              <blockquote className="font-playfair italic text-[clamp(20px,2.8vw,28px)] leading-[1.35] max-w-[22ch] mt-[14px] text-carta">
                {t.s03Q1}
                <span className="emph">{t.s03Qemph}</span>
                {t.s03Q2}
                <span className="block font-plex not-italic text-[13px] tracking-[0.08em] text-ombra mt-4">
                  ▸ {t.s03Src}
                </span>
              </blockquote>
            </div>
            <div>
              <div className="font-plex text-[13px] tracking-[0.16em] uppercase text-lilla mb-[14px]">
                {t.fig2Ft}
              </div>
              <div className="rounded-[12px] border border-riga-scuro bg-white/[0.02] p-[26px_24px]">
                <svg
                  viewBox="0 0 460 240"
                  className="w-full h-auto block overflow-visible"
                  role="img"
                  aria-label={t.fig2Ft}
                >
                  <line x1="40" y1="185" x2="440" y2="185" stroke="rgba(140,165,247,.3)" />
                  <g>
                    <rect x="60" y="110" width="60" height="75" rx="4" fill="#7E8091" />
                    <rect x="160" y="130" width="60" height="55" rx="4" fill="#7E8091" />
                    <rect x="260" y="95" width="60" height="90" rx="4" fill="#FF5C5C" />
                    <rect x="360" y="70" width="60" height="115" rx="4" fill="#FF5C5C" />
                  </g>
                  <g fontFamily="var(--f-mono), monospace" fontSize="11" fill="#c2c6d4" textAnchor="middle">
                    <text x="90" y="205">{t.fig2Labels[0]}</text>
                    <text x="190" y="205">{t.fig2Labels[1]}</text>
                    <text x="290" y="205">{t.fig2Labels[2]}</text>
                    <text x="390" y="205">{t.fig2Labels[3]}</text>
                  </g>
                  <text
                    x="340"
                    y="52"
                    textAnchor="middle"
                    fill="#FF5C5C"
                    fontFamily="var(--font-playfair), Georgia, serif"
                    fontStyle="italic"
                    fontSize="15"
                  >
                    {t.fig2Annot}
                  </text>
                  <path d="M340,58 L390,66" stroke="#FF5C5C" strokeWidth="1.5" fill="none" />
                </svg>
                <p className="mt-[14px] text-[14px] leading-[1.6] text-[#c2c6d4] max-w-[64ch]">
                  {t.fig2Cap1}
                  <span className="loss">{t.fig2CapLoss}</span>
                  {t.fig2Cap2}
                  <b className="font-bold text-carta">{t.fig2CapB}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · PERCHE RESTAVA IRRISOLTO · CARTA */}
      <section className="band carta">
        <div className="wrap">
          <div className="max-w-[760px] mx-auto">
            <div className="eye">{t.s04Eye}</div>
            <h2 className="h-sect">
              {t.s04H2a}
              <span className="emph">{t.s04H2emph}</span>
              {t.s04H2b}
            </h2>
            <p className="text-[17px] leading-[1.65] text-[#23222e] my-[14px]">{t.s04P1}</p>
            <p className="text-[17px] leading-[1.65] text-[#23222e] my-[14px]">
              {t.s04P2a}
              <span className="emph">{t.s04P2emph}</span>
              {t.s04P2b}
            </p>
          </div>
        </div>
      </section>

      {/* 05 · COSA ABBIAMO COSTRUITO · INCHIOSTRO */}
      <section className="band ink">
        <div className="wrap">
          <div className="max-w-[760px] mx-auto">
            <div className="eye">{t.s05Eye}</div>
            <h2 className="h-sect">
              {t.s05H2a}
              <span className="emph">{t.s05H2emph}</span>
              {t.s05H2b}
            </h2>
            <p className="lead">{t.s05Lead}</p>
            <div className="flex flex-col gap-[2px] mt-6">
              {t.s05Rows.map((r, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[auto_1fr] gap-4 py-4 ${
                    i > 0 ? "border-t border-riga-scuro" : ""
                  }`}
                >
                  <span className="font-plex text-[13px] text-lilla pt-[3px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <b className="font-clash font-semibold text-[17px] text-carta block">{r.b}</b>
                    <p className="text-[#c2c6d4] text-[14.5px] mt-1">{r.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 · IL RISULTATO · CARTA */}
      <section className="band carta">
        <div className="wrap">
          <div className="max-w-[760px] mx-auto">
            <div className="eye">{t.s06Eye}</div>
            <h2 className="h-sect">
              {t.s06H2a}
              <span className="emph">{t.s06H2emph}</span>
              {t.s06H2b}
            </h2>
            <p className="lead">{t.s06Lead}</p>
          </div>

          <div className="mt-10">
            <div className="font-plex text-[13px] tracking-[0.16em] uppercase text-firma mb-[14px]">
              {t.fig3Ft}
            </div>
            <div className="rounded-[12px] border border-inchiostro/[0.14] bg-inchiostro/[0.02] p-[26px_24px]">
              <svg
                viewBox="0 0 720 320"
                className="w-full h-auto block overflow-visible"
                role="img"
                aria-label={t.fig3Ft}
              >
                <line x1="60" y1="40" x2="60" y2="250" stroke="rgba(11,11,12,.22)" />
                <line x1="60" y1="250" x2="670" y2="250" stroke="rgba(11,11,12,.22)" />
                <g stroke="rgba(11,11,12,.08)">
                  <line x1="60" y1="90" x2="670" y2="90" />
                  <line x1="60" y1="140" x2="670" y2="140" />
                  <line x1="60" y1="190" x2="670" y2="190" />
                </g>
                <path
                  d="M60,70 C160,75 260,110 360,150 C460,190 560,215 660,225 L660,250 L60,250 Z"
                  fill="rgba(30,158,90,.10)"
                />
                <path
                  d="M60,70 C160,75 260,110 360,150 C460,190 560,215 660,225"
                  fill="none"
                  stroke="#533DFC"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="70" r="4" fill="#533DFC" />
                <circle cx="360" cy="150" r="4" fill="#533DFC" />
                <circle cx="660" cy="225" r="4" fill="#1E9E5A" />
                <g fontFamily="var(--f-mono), monospace" fontSize="12" fill="#7E8091" textAnchor="middle">
                  <text x="60" y="272">{t.fig3Months[0]}</text>
                  <text x="360" y="272">{t.fig3Months[1]}</text>
                  <text x="660" y="272">{t.fig3Months[2]}</text>
                </g>
                <text x="80" y="60" fill="#533DFC" fontFamily="var(--f-mono), monospace" fontSize="12" fontWeight="600">
                  {t.fig3Line}
                </text>
                <text
                  x="392"
                  y="103"
                  textAnchor="middle"
                  fill="#1E9E5A"
                  fontFamily="var(--font-playfair), Georgia, serif"
                  fontStyle="italic"
                  fontSize="17"
                >
                  {t.fig3Callout}
                </text>
                <path d="M392,110 L368,143" stroke="#1E9E5A" strokeWidth="1.5" fill="none" />
                <text x="660" y="246" textAnchor="end" fill="#1E9E5A" fontFamily="var(--f-mono), monospace" fontSize="12">
                  ↓ {t.fig3Foot}
                </text>
              </svg>
              <p className="mt-[14px] text-[14px] leading-[1.6] text-[#3a3b45] max-w-[64ch]">
                {t.fig3Cap1}
                <b className="font-bold text-inchiostro">{t.fig3CapB}</b>
                {t.fig3Cap2}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {t.tiles.map((tile, i) => (
              <div
                key={i}
                className="rounded-[12px] border border-inchiostro/[0.14] bg-inchiostro/[0.02] p-[22px]"
              >
                <div className="font-plex text-[13px] tracking-[0.1em] uppercase text-ombra">
                  {tile.k}
                </div>
                <div
                  className={`font-clash font-semibold text-[clamp(28px,3.6vw,40px)] leading-none my-[10px_0_6px] mt-[10px] mb-[6px] ${
                    tile.gain ? "text-ok" : "text-inchiostro"
                  }`}
                >
                  {tile.n}
                </div>
                <p className="text-[13px] text-[#3a3b45]">{tile.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 · CTA + CORRELATI · INCHIOSTRO */}
      <section className="band ink ctaq" id="cta">
        <div className="wrap">
          <div className="eye">{t.ctaEye}</div>
          <h2>
            {t.ctaH2a}
            <span className="emph">{t.ctaH2emph}</span>
            {t.ctaH2b}
          </h2>
          <p>{t.ctaP}</p>
          <div className="cta-row">
            <Link className="btn btn-1" href={`${base}/roiometro`}>
              {t.cta1}
            </Link>
            <Link className="btn btn-2-carta" href={`${base}/casi`}>
              {t.cta2}
            </Link>
          </div>
        </div>

        <div className="wrap mt-16">
          <div className="eye text-left">{t.relatedEye}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mt-6">
            {t.related.map((r, i) => (
              <div
                key={i}
                className="rounded-[12px] border border-riga-scuro bg-white/[0.02] p-5"
              >
                <div className="font-plex text-[13px] tracking-[0.1em] uppercase text-lilla">
                  {r.cat}
                </div>
                <h3 className="font-clash font-semibold text-[16px] my-2 text-carta">{r.h}</h3>
                <span className="font-plex text-[13px] text-ombra">{t.relatedOpen}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
