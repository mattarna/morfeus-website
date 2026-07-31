import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { Briciole } from "@/components/shared/SEO/Briciole";
import { NOME_CASO, NOME_INDICE_CASI } from "@/lib/seo/briciole-casi";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  it: {
    metaTitle:
      "Vendono tutto tranne ciò che rende di più · Caso Morfeus",
    metaDesc:
      "Caso #016: un MSP aveva l'assessment più redditizio del listino e i commerciali lo evitavano. Ora sicurezza in oltre il 70% delle call, ticket medio +30%.",
    crumbs: { casi: "Casi", sep: " · ", title: "Cyberangels Sales Advisor", num: " · Caso #016" },
    tags: ["MSP / reseller IT", "Micro-PMI 5-30 persone"],
    h1a: "I tuoi commerciali vendono di tutto. Tranne l'unica cosa con il ",
    h1emph: "margine più alto",
    h1b: ".",
    standfirst:
      "I tuoi venditori smettono di evitare il servizio più redditizio perché non sanno spiegarlo: ora lo aprono in un clic.",
    headstats: [
      { n: "70%+", l: "delle call commerciali con sicurezza presente", gain: true },
      { n: "+30%", l: "ticket medio per cliente", gain: true },
      { n: "30-40min → 1 clic", l: "tempo di preparazione di una call", gain: false },
    ],
    stamp: "Confermato",
    casaEye: "La casa che bruciava",
    casaH2a: "La merce più pregiata del listino, chiusa in ",
    casaH2emph: "cassaforte",
    casaH2b: ".",
    casaP1:
      "L'MSP aveva la merce più pregiata del mercato in cassaforte e non riusciva a venderla. I tecnici giravano gli assessment di sicurezza dei clienti, pieni di rilievi, vulnerabilità, esposizioni, ma quei dati arrivavano al commerciale come un PDF di 40 pagine che lui non capiva. E un venditore che non capisce ciò che ha in mano non vende: cambia argomento.",
    casaP2a: "Così le call ripiegavano su quello che il commerciale sapeva vendere: connettività, licenze Microsoft, il backup, mentre ",
    casaP2emph:
      "la sicurezza, il servizio col margine più grasso e la ritenzione più alta, restava sul tavolo a ogni singola chiamata",
    casaP2b:
      ". Ogni mese così era margine regalato: non per mancanza di clienti, non per mancanza di dati, ma perché nessuno trasformava l'intelligence cyber in parole di vendita.",
    fig1Ft: "Cosa vendono, cosa non vendono mai · prima",
    fig1AriaLabel:
      "Confronto tra ciò che i commerciali vendono sempre, connettività licenze e backup, e ciò che non vendono quasi mai, la sicurezza",
    fig1RowA: "Connettività / Licenze / Backup",
    fig1RowB: "Sicurezza (assessment)",
    fig1LabelA: "quasi sempre",
    fig1LabelB: "quasi mai",
    fig1Cap1: "Nella grande maggioranza delle chiamate, i commerciali vendevano ciò che sapevano spiegare: connettività, licenze, backup. La sicurezza, in ",
    fig1CapLoss: "rosso",
    fig1Cap2: ", restava fuori quasi sempre. ",
    fig1CapBold: "Non un problema di domanda: un problema di linguaggio.",
    perchEye: "Perché restava irrisolto",
    perchH2a: "Un venditore non diventa analista con un ",
    perchH2emph: "corso",
    perchH2b: ".",
    perchP1:
      "Avevano provato a formare i commerciali sulla cybersecurity: mesi di slide, webinar, certificazioni leggere. Non aveva funzionato: un venditore non diventa analista di sicurezza con un corso.",
    perchP2a: "Avevano anche provato a far affiancare un tecnico in call: costoso, non scalabile, e il tecnico parlava in tecnichese spegnendo la vendita. Il PDF dell'assessment restava ",
    perchP2emph: "un documento da consegnare, non uno strumento per chiudere",
    perchP2b: ".",
    costrEye: "Cosa abbiamo costruito",
    costrH2a: "Il brief di vendita, in un ",
    costrH2emph: "clic",
    costrH2b: ".",
    costrLead:
      "L'assessment tecnico entra da una parte, esce un brief che un commerciale può usare in call: postura, priorità, esposizione, prezzo, script. E un guardrail che non finge mai di sapere quello che non sa.",
    built: [
      { b: "Postura di sicurezza in linguaggio business", p: "Per vettore, tradotta dal tecnichese: non conteggi di vulnerabilità, ma rischio spiegabile." },
      { b: "Rilievi prioritizzati", p: "Non 40 problemi: i 3-4 che contano davvero per quel cliente, in quella call." },
      { b: "Esposizione normativa", p: "Già inquadrata, pronta da citare senza dover consultare nessuno." },
      { b: "Bundle di servizi con prezzo reale", p: "Dal listino del partner, mai inventato: il commerciale propone un numero vero." },
      { b: "Script completo", p: "Apertura, pitch, obiezioni, chiusura: pronto da leggere o da adattare al volo." },
      { b: "Guardrail anti-figuraccia", p: "Se i dati non bastano, il brief segnala “dati insufficienti” invece di inventare." },
    ],
    risEye: "Il risultato",
    risH2a: "Da quasi zero call a oltre il ",
    risH2emph: "70%",
    risH2b: ".",
    risLead:
      "Servizi di sicurezza presenti in oltre il 70% delle call commerciali, contro una manciata di volte prima. Ticket medio per cliente cresciuto di circa il 30% grazie ai bundle ad alto margine entrati nel discorso. Tempo di preparazione di una call da 30-40 minuti a un clic. Un commerciale junior che ora conduce conversazioni di sicurezza che prima richiedevano il titolare.",
    fig2Ft: "Sicurezza in call: prima e dopo",
    fig2AriaLabel: "Barre a confronto: la percentuale di call con sicurezza presente, quasi zero prima, oltre il 70% dopo",
    fig2Before: "prima",
    fig2After: "dopo",
    fig2Cap1: "Prima, la sicurezza compariva in una manciata di call, in ",
    fig2CapLoss: "grigio spento",
    fig2Cap2: ". Dopo il brief in un clic, è presente in ",
    fig2CapGain: "oltre il 70%",
    fig2Cap3: " delle chiamate. ",
    fig2CapBold: "Stesso assessment, stesso tecnico: solo tradotto in parole di vendita.",
    tiles: [
      { k: "Sicurezza in call", n: "70%+", p: "Contro una manciata di volte prima del brief in un clic.", gain: true },
      { k: "Ticket medio", n: "+30%", p: "Grazie ai bundle ad alto margine entrati nel discorso di vendita.", gain: true },
      { k: "Prep chiamata", n: "1 clic", p: "Da 30-40 minuti di lettura del PDF a un brief pronto all'istante.", gain: false },
    ],
    ctaEye: "In una riga",
    ctaH2a: "I tuoi venditori smettono di evitare il servizio più redditizio perché non sanno spiegarlo: ora lo aprono in un ",
    ctaH2emph: "clic",
    ctaH2b: ".",
    ctaP: "Quanto margine stai regalando ogni mese perché la sicurezza non entra mai in call? Il ROIometro te lo mette in euro.",
    cta1: "Calcola cosa perdi ▸",
    cta2: "Parla con noi",
    correlEye: "Altri casi",
    correl: [
      { cat: "Cyberangels · Report", h: "Il report che nessuno leggeva, ora nessuno lo salta", cta: "Apri il dossier ▸" },
      { cat: "Vendite", h: "Il lead caldo che si raffreddava prima di essere richiamato", cta: "Apri il dossier ▸" },
    ],
    allCases: "Vedi tutti i casi ▸",
  },
  en: {
    metaTitle:
      "They sell all but the highest-margin service · Morfeus case",
    metaDesc:
      "Case #016: an MSP had the most profitable assessment in its catalog and reps avoided it. Now security is in over 70% of calls, average ticket +30%.",
    crumbs: { casi: "Cases", sep: " · ", title: "Cyberangels Sales Advisor", num: " · Case #016" },
    tags: ["MSP / IT reseller", "Micro-SMB 5-30 people"],
    h1a: "Your sales reps sell everything. Except the one thing with the ",
    h1emph: "highest margin",
    h1b: ".",
    standfirst:
      "Your sellers stop avoiding the most profitable service because they can't explain it: now they open it in one click.",
    headstats: [
      { n: "70%+", l: "of sales calls with security in the pitch", gain: true },
      { n: "+30%", l: "average ticket per client", gain: true },
      { n: "30-40min → 1 click", l: "call preparation time", gain: false },
    ],
    stamp: "Confirmed",
    casaEye: "The house that was burning",
    casaH2a: "The most valuable item in the catalog, locked in a ",
    casaH2emph: "safe",
    casaH2b: ".",
    casaP1:
      "The MSP had the most valuable good on the market locked in a safe and couldn't sell it. Technicians ran client security assessments full of findings, vulnerabilities, exposures, but that data reached the sales rep as a 40-page PDF he didn't understand. And a seller who doesn't understand what he's holding doesn't sell: he changes the subject.",
    casaP2a: "So calls fell back on what the rep knew how to sell: connectivity, Microsoft licenses, backup, while ",
    casaP2emph:
      "security, the service with the fattest margin and the highest retention, was left on the table on every single call",
    casaP2b:
      ". Every month like that was margin given away: not for lack of clients, not for lack of data, but because nobody was turning cyber intelligence into sales words.",
    fig1Ft: "What they sell, what they never sell · before",
    fig1AriaLabel:
      "Comparison between what reps sell almost always (connectivity, licenses and backup) and what they almost never sell (security)",
    fig1RowA: "Connectivity / Licenses / Backup",
    fig1RowB: "Security (assessment)",
    fig1LabelA: "almost always",
    fig1LabelB: "almost never",
    fig1Cap1: "In the vast majority of calls, reps sold what they knew how to explain: connectivity, licenses, backup. Security, in ",
    fig1CapLoss: "red",
    fig1Cap2: ", was left out almost always. ",
    fig1CapBold: "Not a demand problem: a language problem.",
    perchEye: "Why it stayed unsolved",
    perchH2a: "A seller doesn't become an analyst with a ",
    perchH2emph: "course",
    perchH2b: ".",
    perchP1:
      "They had tried to train reps on cybersecurity: months of slides, webinars, light certifications. It hadn't worked: a seller doesn't become a security analyst with a course.",
    perchP2a: "They had also tried having a technician sit in on calls: expensive, not scalable, and the technician spoke in tech-speak, killing the sale. The assessment PDF stayed ",
    perchP2emph: "a document to be delivered, not a tool to close deals",
    perchP2b: ".",
    costrEye: "What we built",
    costrH2a: "The sales brief, in one ",
    costrH2emph: "click",
    costrH2b: ".",
    costrLead:
      "The technical assessment goes in one end, out comes a brief a rep can use in a call: posture, priorities, exposure, price, script. And a guardrail that never pretends to know what it doesn't.",
    built: [
      { b: "Security posture in business language", p: "Per vector, translated from tech-speak: not vulnerability counts, but explainable risk." },
      { b: "Prioritized findings", p: "Not 40 problems: the 3-4 that really matter for that client, in that call." },
      { b: "Regulatory exposure", p: "Already framed, ready to cite without having to consult anyone." },
      { b: "Service bundles with real pricing", p: "From the partner's price list, never made up: the rep proposes a real number." },
      { b: "Complete script", p: "Opening, pitch, objections, close: ready to read or adapt on the fly." },
      { b: "Anti-blunder guardrail", p: "If data is insufficient, the brief flags “insufficient data” instead of making things up." },
    ],
    risEye: "The result",
    risH2a: "From almost zero calls to over ",
    risH2emph: "70%",
    risH2b: ".",
    risLead:
      "Security services present in over 70% of sales calls, versus a handful of times before. Average ticket per client grew by about 30% thanks to high-margin bundles entering the conversation. Call preparation time from 30-40 minutes to one click. A junior rep now leads security conversations that used to require the owner.",
    fig2Ft: "Security in calls: before and after",
    fig2AriaLabel: "Bar comparison: the percentage of calls with security in the pitch, almost zero before, over 70% after",
    fig2Before: "before",
    fig2After: "after",
    fig2Cap1: "Before, security appeared in a handful of calls, in ",
    fig2CapLoss: "faded gray",
    fig2Cap2: ". After the brief in one click, it's present in ",
    fig2CapGain: "over 70%",
    fig2Cap3: " of calls. ",
    fig2CapBold: "Same assessment, same technician: just translated into sales words.",
    tiles: [
      { k: "Security in calls", n: "70%+", p: "Versus a handful of times before the brief in one click.", gain: true },
      { k: "Average ticket", n: "+30%", p: "Thanks to high-margin bundles entering the sales conversation.", gain: true },
      { k: "Call prep", n: "1 click", p: "From 30-40 minutes reading the PDF to a brief ready instantly.", gain: false },
    ],
    ctaEye: "In one line",
    ctaH2a: "Your sellers stop avoiding the most profitable service because they can't explain it: now they open it in one ",
    ctaH2emph: "click",
    ctaH2b: ".",
    ctaP: "How much margin are you giving away every month because security never enters the call? The ROIometer puts it in euros.",
    cta1: "Calculate what you lose ▸",
    cta2: "Talk to us",
    correlEye: "Other cases",
    correl: [
      { cat: "Cyberangels · Report", h: "The report nobody read, now nobody skips", cta: "Open the dossier ▸" },
      { cat: "Sales", h: "The hot lead that went cold before being called back", cta: "Open the dossier ▸" },
    ],
    allCases: "See all cases ▸",
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
    alternates: buildLocaleAlternates("casi/cyberangels-sales-advisor", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "article",
      url: `${SITE_URL}${localePrefix(safeLocale)}/casi/cyberangels-sales-advisor`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

// -----------------------------------------------------------------------------
// Inline style helpers (mockup-specific classes non presenti in site.css)
// -----------------------------------------------------------------------------
const S = {
  read: { maxWidth: 760, margin: "0 auto" } as React.CSSProperties,
  crumbs: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.08em",
    color: "var(--ombra)",
  } as React.CSSProperties,
  crumbLink: { color: "var(--lilla)" } as React.CSSProperties,
  tags: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 22 } as React.CSSProperties,
  tag: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--lilla)",
    border: "1px solid rgba(140,165,247,.3)",
    borderRadius: 999,
    padding: "4px 11px",
  } as React.CSSProperties,
  h1: {
    fontSize: "clamp(30px,5.2vw,54px)",
    fontWeight: 600,
    margin: "16px 0",
    maxWidth: "17ch",
  } as React.CSSProperties,
  standfirst: {
    fontFamily: "var(--font-emph)",
    fontStyle: "italic",
    fontSize: "clamp(18px,2.2vw,24px)",
    color: "#c2c6d4",
    maxWidth: "56ch",
  } as React.CSSProperties,
  headstats: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
    marginTop: 28,
    paddingTop: 22,
    borderTop: "1px solid var(--riga-scuro)",
  } as React.CSSProperties,
  hsN: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "clamp(26px,3.4vw,36px)",
    lineHeight: 1,
  } as React.CSSProperties,
  hsL: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--ombra)",
    marginTop: 8,
    maxWidth: "20ch",
  } as React.CSSProperties,
  headfoot: { display: "flex", alignItems: "center", gap: 14, marginTop: 24, flexWrap: "wrap" } as React.CSSProperties,
  proseP: { fontSize: 17, margin: "14px 0" } as React.CSSProperties,
  figFt: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: 14,
  } as React.CSSProperties,
  figBoxInk: {
    borderRadius: 12,
    padding: "26px 24px",
    border: "1px solid var(--riga-scuro)",
    background: "rgba(255,255,255,.02)",
  } as React.CSSProperties,
  figBoxCarta: {
    borderRadius: 12,
    padding: "26px 24px",
    border: "1px solid rgba(11,11,12,.14)",
    background: "rgba(11,11,12,.02)",
  } as React.CSSProperties,
  figCap: { marginTop: 14, fontSize: 14, maxWidth: "64ch" } as React.CSSProperties,
  chart: { width: "100%", height: "auto", display: "block", overflow: "visible" } as React.CSSProperties,
  built: { display: "flex", flexDirection: "column", gap: 2, marginTop: 24 } as React.CSSProperties,
  builtRow: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: 16,
    padding: "16px 0",
    borderTop: "1px solid rgba(11,11,12,.14)",
  } as React.CSSProperties,
  builtRowFirst: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: 16,
    padding: "16px 0",
    borderTop: "none",
  } as React.CSSProperties,
  builtIx: { fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--firma)", paddingTop: 3 } as React.CSSProperties,
  builtB: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: 17,
    color: "var(--inchiostro)",
  } as React.CSSProperties,
  builtP: { color: "#3a3b45", fontSize: 14.5, marginTop: 4 } as React.CSSProperties,
  tiles: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 16,
    marginTop: 24,
  } as React.CSSProperties,
  tile: {
    border: "1px solid var(--riga-scuro)",
    background: "rgba(255,255,255,.02)",
    borderRadius: 12,
    padding: 22,
  } as React.CSSProperties,
  tileK: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--ombra)",
  } as React.CSSProperties,
  tileN: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "clamp(28px,3.6vw,40px)",
    lineHeight: 1,
    margin: "10px 0 6px",
    color: "var(--carta)",
  } as React.CSSProperties,
  tileNGain: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "clamp(28px,3.6vw,40px)",
    lineHeight: 1,
    margin: "10px 0 6px",
    color: "var(--ok)",
  } as React.CSSProperties,
  tileP: { fontSize: 13, color: "#c2c6d4" } as React.CSSProperties,
  rgrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 18,
    marginTop: 24,
  } as React.CSSProperties,
  rcard: {
    border: "1px solid var(--riga-scuro)",
    borderRadius: 12,
    background: "rgba(255,255,255,.02)",
    padding: 20,
  } as React.CSSProperties,
  rcardCat: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--lilla)",
  } as React.CSSProperties,
  rcardH: {
    fontSize: 16,
    fontWeight: 600,
    margin: "8px 0 10px",
    color: "var(--carta)",
  } as React.CSSProperties,
  rcardCta: { color: "var(--lilla)" } as React.CSSProperties,
  standStamp: {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 600,
    padding: "5px 12px",
    border: "2px solid var(--lilla)",
    color: "var(--lilla)",
    borderRadius: 8,
    transform: "rotate(-4deg)",
  } as React.CSSProperties,
};

export default async function CyberangelsSalesAdvisorPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  const pageUrl = `${SITE_URL}${localePrefix(safeLocale)}/casi/cyberangels-sales-advisor`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        about: [
          { "@id": ORGANIZATION_ID },
          { "@id": `${pageUrl}#client-cyberangels` },
        ],
        articleSection: isIt ? "Casi studio" : "Case studies",
        keywords: [
          "MSP",
          "cybersecurity sales",
          "AI sales enablement",
          "Cyberangels",
          "Morfeus case study",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${pageUrl}#client-cyberangels`,
        name: "Cyberangels",
        description: isIt
          ? "MSP e reseller IT specializzato in cybersecurity per micro-PMI."
          : "MSP and IT reseller specialized in cybersecurity for micro-SMBs.",
      },
    ],
  };

  return (
    <SiteShell locale={safeLocale}>
      <Briciole
        locale={safeLocale}
        voci={[
          { nome: NOME_INDICE_CASI[safeLocale], percorso: "casi" },
          { nome: NOME_CASO["cyberangels-sales-advisor"][safeLocale], percorso: "casi/cyberangels-sales-advisor" },
        ]}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 · TESTATA · INCHIOSTRO */}
      <section className="band ink" id="testata">
        <div className="wrap">
          <div style={S.read}>
            <div style={S.crumbs}>
              <Link href={`${base}/casi`} style={S.crumbLink}>
                {t.crumbs.casi}
              </Link>
              {t.crumbs.sep}
              {t.crumbs.title}
              {t.crumbs.num}
            </div>
            <div style={S.tags}>
              {t.tags.map((tag, i) => (
                <span key={i} style={S.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 style={S.h1}>
              {t.h1a}
              <span className="emph">{t.h1emph}</span>
              {t.h1b}
            </h1>
            <p style={S.standfirst}>{t.standfirst}</p>
            <div style={S.headstats}>
              {t.headstats.map((s, i) => (
                <div key={i}>
                  <div style={{ ...S.hsN, color: s.gain ? "var(--ok)" : "var(--carta)" }}>{s.n}</div>
                  <div style={S.hsL}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={S.headfoot}>
              <span style={S.standStamp}>{t.stamp}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · LA CASA CHE BRUCIAVA · CARTA */}
      <section className="band carta">
        <div className="wrap">
          <div style={S.read}>
            <div className="eye">{t.casaEye}</div>
            <h2 className="h-sect">
              {t.casaH2a}
              <span className="emph">{t.casaH2emph}</span>
              {t.casaH2b}
            </h2>
            <div>
              <p style={{ ...S.proseP, color: "#23222e" }}>{t.casaP1}</p>
              <p style={{ ...S.proseP, color: "#23222e" }}>
                {t.casaP2a}
                <span className="emph">{t.casaP2emph}</span>
                {t.casaP2b}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 44 }}>
            <div style={{ ...S.figFt, color: "var(--firma)" }}>{t.fig1Ft}</div>
            <div style={S.figBoxCarta}>
              <svg style={S.chart} viewBox="0 0 720 220" role="img" aria-label={t.fig1AriaLabel}>
                <g fontFamily="var(--font-mono)" fontSize={12} fill="#0B0B0C">
                  <text x={20} y={42}>{t.fig1RowA}</text>
                  <text x={20} y={140}>{t.fig1RowB}</text>
                </g>
                <rect x={20} y={56} width={640} height={30} rx={6} fill="rgba(11,11,12,.06)" />
                <rect x={20} y={56} width={630} height={30} rx={6} fill="#533DFC" />
                <text
                  x={660}
                  y={76}
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                  fontSize={12}
                  fill="#fff"
                  fontWeight={600}
                  style={{ mixBlendMode: "difference" }}
                >
                  {t.fig1LabelA}
                </text>
                <rect x={20} y={154} width={640} height={30} rx={6} fill="rgba(11,11,12,.06)" />
                <rect x={20} y={154} width={26} height={30} rx={6} fill="#FF5C5C" />
                <text x={60} y={174} fontFamily="var(--font-mono)" fontSize={12} fill="#FF5C5C" fontWeight={600}>
                  {t.fig1LabelB}
                </text>
              </svg>
              <p style={{ ...S.figCap, color: "#3a3b45" }}>
                {t.fig1Cap1}
                <span className="loss">{t.fig1CapLoss}</span>
                {t.fig1Cap2}
                <b style={{ color: "var(--inchiostro)", fontWeight: 700 }}>{t.fig1CapBold}</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 · PERCHÉ RESTAVA IRRISOLTO · INCHIOSTRO */}
      <section className="band ink">
        <div className="wrap">
          <div style={S.read}>
            <div className="eye">{t.perchEye}</div>
            <h2 className="h-sect">
              {t.perchH2a}
              <span className="emph">{t.perchH2emph}</span>
              {t.perchH2b}
            </h2>
            <div>
              <p style={{ ...S.proseP, color: "#c3c1d6" }}>{t.perchP1}</p>
              <p style={{ ...S.proseP, color: "#c3c1d6" }}>
                {t.perchP2a}
                <span className="emph">{t.perchP2emph}</span>
                {t.perchP2b}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · COSA ABBIAMO COSTRUITO · CARTA */}
      <section className="band carta">
        <div className="wrap">
          <div style={S.read}>
            <div className="eye">{t.costrEye}</div>
            <h2 className="h-sect">
              {t.costrH2a}
              <span className="emph">{t.costrH2emph}</span>
              {t.costrH2b}
            </h2>
            <p className="lead">{t.costrLead}</p>
            <div style={S.built}>
              {t.built.map((r, i) => (
                <div key={i} style={i === 0 ? S.builtRowFirst : S.builtRow}>
                  <span style={S.builtIx}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b style={S.builtB}>{r.b}</b>
                    <p style={S.builtP}>{r.p}</p>
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
          <div style={S.read}>
            <div className="eye">{t.risEye}</div>
            <h2 className="h-sect">
              {t.risH2a}
              <span className="emph">{t.risH2emph}</span>
              {t.risH2b}
            </h2>
            <p className="lead">{t.risLead}</p>
          </div>

          <div style={{ marginTop: 40 }}>
            <div style={{ ...S.figFt, color: "var(--lilla)" }}>{t.fig2Ft}</div>
            <div style={S.figBoxInk}>
              <svg style={S.chart} viewBox="0 0 460 240" role="img" aria-label={t.fig2AriaLabel}>
                <line x1={40} y1={195} x2={440} y2={195} stroke="rgba(140,165,247,.3)" />
                <g>
                  <rect x={90} y={180} width={90} height={15} rx={4} fill="#7E8091" />
                  <rect x={280} y={55} width={90} height={140} rx={4} fill="#1E9E5A" />
                </g>
                <text
                  x={135}
                  y={60}
                  textAnchor="middle"
                  fill="#c2c6d4"
                  fontFamily="var(--font-mono)"
                  fontSize={14}
                >
                  &lt;10%
                </text>
                <text
                  x={325}
                  y={45}
                  textAnchor="middle"
                  fill="#1E9E5A"
                  style={{ fontFamily: "var(--font-emph)", fontStyle: "italic" }}
                  fontSize={17}
                >
                  70%+
                </text>
                <g fontFamily="var(--font-mono)" fontSize={11} fill="#c2c6d4" textAnchor="middle">
                  <text x={135} y={215}>{t.fig2Before}</text>
                  <text x={325} y={215}>{t.fig2After}</text>
                </g>
              </svg>
              <p style={{ ...S.figCap, color: "#c2c6d4" }}>
                {t.fig2Cap1}
                <span className="loss">{t.fig2CapLoss}</span>
                {t.fig2Cap2}
                <span className="gain">{t.fig2CapGain}</span>
                {t.fig2Cap3}
                <b style={{ color: "var(--carta)", fontWeight: 700 }}>{t.fig2CapBold}</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · TILES RISULTATO · CARTA (tiles ink-styled per contrasto) */}
      <section className="band carta">
        <div className="wrap">
          <div style={S.tiles}>
            {t.tiles.map((tile, i) => (
              <div
                key={i}
                style={{
                  ...S.tile,
                  border: "1px solid rgba(11,11,12,.14)",
                  background: "rgba(11,11,12,.02)",
                }}
              >
                <div style={S.tileK}>{tile.k}</div>
                <div
                  style={{
                    ...(tile.gain ? S.tileNGain : S.tileN),
                    color: tile.gain ? "var(--ok)" : "var(--inchiostro)",
                  }}
                >
                  {tile.n}
                </div>
                <p style={{ ...S.tileP, color: "#3a3b45" }}>{tile.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 · IN UNA RIGA + CTA + CORRELATI · INCHIOSTRO */}
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
            <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com">
              {t.cta2}
            </a>
          </div>
        </div>

        <div className="wrap" style={{ marginTop: 64 }}>
          <div className="eye" style={{ textAlign: "left" }}>
            {t.correlEye}
          </div>
          <div style={S.rgrid}>
            {t.correl.map((c, i) => (
              <div key={i} style={S.rcard}>
                <div style={S.rcardCat}>{c.cat}</div>
                <h3 style={S.rcardH}>{c.h}</h3>
                <span style={S.rcardCta}>{c.cta}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 22, textAlign: "left" }}>
            <Link className="btn btn-3" href={`${base}/casi`}>
              {t.allCases}
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
