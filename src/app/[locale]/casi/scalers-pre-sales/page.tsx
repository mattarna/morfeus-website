import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  it: {
    metaTitle: "Entravano in call senza sapere con chi stavano parlando · Caso Morfeus",
    metaDesc:
      "Caso #067: Scalers, consulenza B2B. Il tempo di prep per call passa da 20 minuti a zero, la chiusura sulle call programmate sale di 11 punti in un trimestre.",
    crumbs: { casi: "Casi", sep: " · ", client: "Scalers", n: "Caso #067" },
    tags: ["Consulenza B2B", "PMI 15-60 persone", "Pre-Sales Intelligence"],
    testata: {
      h1a: "Entravano in call senza sapere con chi stavano ",
      h1emph: "parlando",
      h1b: "",
      standfirst: "Smetti di bruciare i lead caldi nei primi cinque minuti di ogni call.",
      stats: [
        { n: "20min → 0", l: "tempo di prep per call", gain: true },
        { n: "+11 punti", l: "call chiuse sulle programmate", gain: true },
        { n: "1 trimestre", l: "periodo di misura", gain: false },
      ],
      stamp: "Confermato",
    },
    problema: {
      eye: "La casa che bruciava",
      h2a: "Ogni call iniziava a ",
      h2emph: "freddo",
      h2b: ".",
      p1: "I consulenti facevano 4-6 call al giorno e ci arrivavano nudi. Preparare davvero un appuntamento, riaprire lo storico, guardare quanto fattura il cliente, ricordarsi dove eravate rimasti, costa 20-25 minuti che, tra una call e l'altra, nessuno ha mai. Così si entrava a freddo: i primi cinque minuti buttati a ricostruire chi fosse l'interlocutore, la domanda generica che lo fa sentire un numero, l'aggancio al suo problema reale mai trovato.",
      p2a: "Su un'agenda da 5 call al giorno significa decine di lead caldi giocati male ogni settimana, e una percentuale di chiusura che resta bassa non perché i venditori siano scarsi, ma perché arrivano impreparati nel momento che conta di più. ",
      p2emph: "Ogni call sprecata è un costo di acquisizione già pagato e gettato.",
      figTitle: "I primi cinque minuti bruciati",
      figLabel: "primi 5 min:",
      figLabel2: "ricostruire chi è",
      figRest: "il resto della call, ormai in ritardo",
      figCap: "20-25 minuti di prep MAI fatti prima di ogni call.",
      svgAria: "Timeline di una call di 30 minuti: i primi cinque minuti, in rosso, spesi a ricostruire chi è l'interlocutore invece di parlare del suo problema",
    },
    perche: {
      eye: "Perché restava irrisolto",
      h2a: "Nessuno aveva mai 20 minuti ",
      h2emph: "liberi",
      h2b: ".",
      p: "Tra una call e l'altra non c'è mai stato lo spazio per prepararsi davvero: riaprire lo storico, controllare i deal aperti, capire quanto fattura chi hai davanti. La prep manuale, in teoria giusta, in pratica semplicemente non accadeva mai. Non era un problema di disciplina dei consulenti: era un problema di tempo che non esisteva nell'agenda.",
    },
    sistema: {
      eye: "Cosa abbiamo costruito",
      h2a: "Il brief è già lì prima di ",
      h2emph: "rispondere",
      h2b: ".",
      lead: "Prima di ogni appuntamento il sistema genera in automatico un brief di preparazione e un piano-chiamata: assembla le prove rilevanti e segnala quanto il lead è pronto. Dopo la call, l'aggiornamento torna nel CRM da solo.",
      rows: [
        { ix: "01", b: "Brief automatico prima di ogni appuntamento", p: "Generato senza che nessuno lo chieda, pronto quando si apre il telefono prima della call." },
        { ix: "02", b: "Storico e deal in un'unica vista", p: "Contesto azienda, deal aperti, dove eravate rimasti: assemblato, non da cercare." },
        { ix: "03", b: "Segnale di quanto il lead è pronto", p: "Il piano-chiamata parte già sapendo se è caldo, tiepido, o ancora presto." },
        { ix: "04", b: "Aggiornamento CRM automatico dopo la call", p: "Nessuna nota manuale: l'esito torna nel sistema da solo." },
      ],
    },
    risultato: {
      eye: "Il risultato",
      h2a: "Da zero prep a +11 punti di ",
      h2emph: "chiusura",
      h2b: ".",
      lead: "Il tempo di prep per call è passato da circa 20 minuti a zero. La percentuale di chiusura sulle call programmate è salita di circa 11 punti in un trimestre. E la frase \"scusi, mi ripeta cosa fa la vostra azienda?\" è sparita dalle riunioni.",
      figTitle: "Chiusura call programmate, in un trimestre",
      figMonths: ["mese 1", "mese 2", "mese 3"],
      figBase: "chiusura base",
      figDelta: "+11 punti",
      figCapA: "La chiusura non è salita con uno scatto isolato: è salita ogni settimana, call dopo call, man mano che i consulenti smettevano di arrivare impreparati. ",
      figCapB: "Circa 11 punti percentuali in più in un trimestre.",
      svgAria: "Linea che sale in modo costante per tre mesi, dalla percentuale di chiusura base a undici punti percentuali in più",
      tiles: [
        { k: "Tempo di prep per call", n: "20min → 0", p: "Il brief è già pronto quando si apre il telefono prima della call.", gain: true },
        { k: "Call chiuse sulle programmate", n: "+11 punti", p: "Non più venditori scarsi: consulenti che arrivano preparati.", gain: true },
        { k: "Periodo di misura", n: "1 trimestre", p: "La curva sale in modo costante, non con un picco isolato.", gain: false },
      ],
    },
    cta: {
      eye: "In una riga",
      h2a: "Smetti di bruciare i lead caldi nei primi cinque minuti di ogni ",
      h2emph: "call",
      h2b: ".",
      p: "Quante call della settimana entrano a freddo? Il ROIometro te lo mette in euro persi.",
      cta1: "Calcola cosa perdi ▸",
      cta2: "Parla con noi",
    },
    correlati: {
      eye: "Altri casi",
      cards: [
        { cat: "Vendite", h3: "Il lead caldo rispondeva a chi arrivava per primo, non a chi era migliore", link: "Apri il dossier ▸" },
        { cat: "Consulenza", h3: "Il venditore preparava l'offerta, mai la vendita", link: "Apri il dossier ▸" },
      ],
      all: "Vedi tutti i casi ▸",
    },
  },
  en: {
    metaTitle: "They walked into calls not knowing who they were talking to · Morfeus Case",
    metaDesc:
      "Case #067: Scalers, B2B consulting. Call prep time drops from 20 minutes to zero; close rate on booked calls climbs 11 points in a quarter.",
    crumbs: { casi: "Cases", sep: " · ", client: "Scalers", n: "Case #067" },
    tags: ["B2B Consulting", "SMB 15-60 people", "Pre-Sales Intelligence"],
    testata: {
      h1a: "They walked into calls not knowing who they were ",
      h1emph: "talking",
      h1b: " to",
      standfirst: "Stop burning hot leads in the first five minutes of every call.",
      stats: [
        { n: "20min → 0", l: "call prep time", gain: true },
        { n: "+11 points", l: "close rate on booked calls", gain: true },
        { n: "1 quarter", l: "measurement window", gain: false },
      ],
      stamp: "Confirmed",
    },
    problema: {
      eye: "The house on fire",
      h2a: "Every call started ",
      h2emph: "cold",
      h2b: ".",
      p1: "The consultants ran 4-6 calls a day and walked in naked. Actually preparing a meeting, reopening the history, checking how much the client bills, remembering where you left off, costs 20-25 minutes that, between calls, nobody has. So they entered cold: first five minutes wasted reconstructing who the person was, a generic question that made them feel like a number, the hook to their real problem never found.",
      p2a: "On a 5-call daily agenda that means dozens of hot leads mishandled every week, and a close rate that stays low not because the reps are bad, but because they arrive unprepared at the moment that matters most. ",
      p2emph: "Every wasted call is an acquisition cost already paid and thrown away.",
      figTitle: "The first five minutes, burned",
      figLabel: "first 5 min:",
      figLabel2: "reconstructing who",
      figRest: "the rest of the call, already behind",
      figCap: "20-25 minutes of prep NEVER done before each call.",
      svgAria: "Timeline of a 30-minute call: the first five minutes, in red, spent reconstructing who the person is instead of talking about their problem",
    },
    perche: {
      eye: "Why it stayed unsolved",
      h2a: "Nobody ever had 20 free ",
      h2emph: "minutes",
      h2b: ".",
      p: "Between one call and the next there was never room to actually prepare: reopen the history, check open deals, understand how much the person in front of you bills. Manual prep, right in theory, in practice simply never happened. It wasn't a discipline problem for the consultants: it was a time problem that did not exist in the calendar.",
    },
    sistema: {
      eye: "What we built",
      h2a: "The brief is already there before you ",
      h2emph: "answer",
      h2b: ".",
      lead: "Before every meeting the system automatically generates a prep brief and a call plan: it assembles the relevant evidence and signals how ready the lead is. After the call, the update flows back into the CRM on its own.",
      rows: [
        { ix: "01", b: "Automatic brief before every meeting", p: "Generated without anyone asking, ready when the phone opens before the call." },
        { ix: "02", b: "History and deals in one view", p: "Company context, open deals, where you left off: assembled, not searched for." },
        { ix: "03", b: "Signal of how ready the lead is", p: "The call plan starts already knowing if it is hot, warm, or still early." },
        { ix: "04", b: "Automatic CRM update after the call", p: "No manual notes: the outcome flows back into the system on its own." },
      ],
    },
    risultato: {
      eye: "The result",
      h2a: "From zero prep to +11 points on ",
      h2emph: "close rate",
      h2b: ".",
      lead: "Prep time per call went from about 20 minutes to zero. The close rate on booked calls climbed roughly 11 points in a quarter. And the line \"sorry, remind me what your company does?\" disappeared from the meetings.",
      figTitle: "Close rate on booked calls, over one quarter",
      figMonths: ["month 1", "month 2", "month 3"],
      figBase: "baseline close",
      figDelta: "+11 points",
      figCapA: "The close rate did not jump in one isolated spike: it climbed every week, call after call, as the consultants stopped arriving unprepared. ",
      figCapB: "About 11 percentage points more in one quarter.",
      svgAria: "A line rising steadily for three months, from the baseline close rate to eleven points higher",
      tiles: [
        { k: "Call prep time", n: "20min → 0", p: "The brief is already there when the phone opens before the call.", gain: true },
        { k: "Close rate on booked calls", n: "+11 points", p: "Not weak reps anymore: consultants who arrive prepared.", gain: true },
        { k: "Measurement window", n: "1 quarter", p: "The curve rises steadily, not in one isolated peak.", gain: false },
      ],
    },
    cta: {
      eye: "In one line",
      h2a: "Stop burning hot leads in the first five minutes of every ",
      h2emph: "call",
      h2b: ".",
      p: "How many calls this week walked in cold? The ROIometer puts that in euros lost.",
      cta1: "Calculate what you lose ▸",
      cta2: "Talk to us",
    },
    correlati: {
      eye: "Other cases",
      cards: [
        { cat: "Sales", h3: "The hot lead answered whoever arrived first, not whoever was better", link: "Open the dossier ▸" },
        { cat: "Consulting", h3: "The rep prepared the offer, never the sale", link: "Open the dossier ▸" },
      ],
      all: "See all cases ▸",
    },
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
    alternates: buildLocaleAlternates("casi/scalers-pre-sales", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "article",
      url: `${SITE_URL}/${safeLocale}/casi/scalers-pre-sales`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default async function ScalersPreSalesCasePage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  const pageUrl = `${SITE_URL}/${safeLocale}/casi/scalers-pre-sales`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    url: pageUrl,
    headline: t.metaTitle,
    description: t.metaDesc,
    inLanguage: isIt ? "it-IT" : "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    about: { "@id": ORGANIZATION_ID },
    articleSection: isIt ? "Casi" : "Cases",
    keywords: t.tags.join(", "),
    mainEntityOfPage: pageUrl,
  };

  return (
    <SiteShell locale={safeLocale}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 · TESTATA · INCHIOSTRO */}
      <section className="band ink hero" id="testata">
        <div className="wrap">
          <div
            className="font-plex text-[13px] tracking-[0.08em]"
            style={{ color: "var(--ombra)" }}
          >
            <Link href={`${base}/casi`} style={{ color: "var(--lilla)" }}>
              {t.crumbs.casi}
            </Link>
            {t.crumbs.sep}
            {t.crumbs.client}
            {t.crumbs.sep}
            {t.crumbs.n}
          </div>
          <div className="mt-[22px] flex flex-wrap gap-2">
            {t.tags.map((tag) => (
              <span
                key={tag}
                className="font-plex text-[13px] uppercase tracking-[0.08em]"
                style={{
                  color: "var(--lilla)",
                  border: "1px solid rgba(140,165,247,.3)",
                  borderRadius: "999px",
                  padding: "4px 11px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4" style={{ maxWidth: "17ch" }}>
            {t.testata.h1a}
            <span className="emph">{t.testata.h1emph}</span>
            {t.testata.h1b}
          </h1>
          <p
            className="font-playfair italic"
            style={{
              fontSize: "clamp(18px,2.2vw,24px)",
              color: "#c2c6d4",
              maxWidth: "56ch",
              marginTop: 16,
            }}
          >
            {t.testata.standfirst}
          </p>
          <div
            className="mt-7 flex flex-wrap gap-8 pt-[22px]"
            style={{ borderTop: "1px solid var(--riga-scuro)" }}
          >
            {t.testata.stats.map((s, i) => (
              <div key={i}>
                <div
                  className="font-clash font-semibold leading-none"
                  style={{
                    fontSize: "clamp(26px,3.4vw,36px)",
                    color: s.gain ? "var(--ok)" : "var(--carta)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-2 font-plex text-[13px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--ombra)", maxWidth: "20ch" }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-[14px]">
            <span className="stamp">{t.testata.stamp}</span>
          </div>
        </div>
      </section>

      {/* 02 · LA CASA CHE BRUCIAVA · CARTA */}
      <section className="band carta" id="problema">
        <div className="wrap">
          <div className="eye">{t.problema.eye}</div>
          <h2 className="h-sect">
            {t.problema.h2a}
            <span className="emph">{t.problema.h2emph}</span>
            {t.problema.h2b}
          </h2>
          <div style={{ maxWidth: "66ch" }}>
            <p style={{ color: "#23222e", fontSize: 17, marginTop: 14, lineHeight: 1.65 }}>
              {t.problema.p1}
            </p>
            <p style={{ color: "#23222e", fontSize: 17, marginTop: 14, lineHeight: 1.65 }}>
              {t.problema.p2a}
              <span className="emph">{t.problema.p2emph}</span>
            </p>
          </div>

          <div style={{ marginTop: 44 }}>
            <div
              className="font-plex uppercase"
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                color: "var(--firma)",
                marginBottom: 14,
              }}
            >
              {t.problema.figTitle}
            </div>
            <div
              style={{
                border: "1px solid rgba(11,11,12,.14)",
                background: "rgba(11,11,12,.02)",
                borderRadius: 12,
                padding: "26px 24px",
              }}
            >
              <svg
                viewBox="0 0 720 200"
                role="img"
                aria-label={t.problema.svgAria}
                style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
              >
                <rect x="60" y="70" width="600" height="46" rx="8" fill="rgba(11,11,12,.05)" stroke="rgba(11,11,12,.14)" />
                <rect x="60" y="70" width="100" height="46" rx="8" fill="#FF5C5C" />
                <rect x="160" y="70" width="500" height="46" fill="#7E8091" opacity="0.22" />
                <line x1="160" y1="70" x2="160" y2="116" stroke="rgba(11,11,12,.3)" strokeWidth="1.5" />
                <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#7E8091">
                  <text x="60" y="140">0 min</text>
                  <text x="150" y="140" fill="#FF5C5C" fontWeight="600">5 min</text>
                  <text x="640" y="140">30 min</text>
                </g>
                <text
                  x="110"
                  y="58"
                  textAnchor="middle"
                  fill="#FF5C5C"
                  fontFamily="Playfair Display, Georgia, serif"
                  fontStyle="italic"
                  fontSize="15"
                >
                  {t.problema.figLabel}
                </text>
                <text
                  x="110"
                  y="150"
                  textAnchor="middle"
                  fill="#0B0B0C"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="11"
                >
                  {t.problema.figLabel2}
                </text>
                <text
                  x="410"
                  y="58"
                  textAnchor="middle"
                  fill="#7E8091"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="11"
                >
                  {t.problema.figRest}
                </text>
              </svg>
              <p
                className="font-plex"
                style={{ marginTop: 14, fontSize: 14, color: "#3a3b45", maxWidth: "64ch" }}
              >
                {t.problema.figCap}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 · PERCHÉ RESTAVA IRRISOLTO · INCHIOSTRO */}
      <section className="band ink" id="perche">
        <div className="wrap">
          <div className="eye">{t.perche.eye}</div>
          <h2 className="h-sect">
            {t.perche.h2a}
            <span className="emph">{t.perche.h2emph}</span>
            {t.perche.h2b}
          </h2>
          <p style={{ color: "#c3c1d6", fontSize: 17, marginTop: 14, maxWidth: "66ch", lineHeight: 1.65 }}>
            {t.perche.p}
          </p>
        </div>
      </section>

      {/* 04 · COSA ABBIAMO COSTRUITO · CARTA */}
      <section className="band carta" id="sistema">
        <div className="wrap">
          <div className="eye">{t.sistema.eye}</div>
          <h2 className="h-sect">
            {t.sistema.h2a}
            <span className="emph">{t.sistema.h2emph}</span>
            {t.sistema.h2b}
          </h2>
          <p className="lead">{t.sistema.lead}</p>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 2 }}>
            {t.sistema.rows.map((r, i) => (
              <div
                key={r.ix}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 16,
                  padding: "16px 0",
                  borderTop: i === 0 ? "none" : "1px solid rgba(11,11,12,.14)",
                }}
              >
                <span
                  className="font-plex"
                  style={{ fontSize: 12, color: "var(--firma)", paddingTop: 3 }}
                >
                  {r.ix}
                </span>
                <div>
                  <b
                    className="font-clash"
                    style={{ fontWeight: 600, fontSize: 17, color: "var(--inchiostro)" }}
                  >
                    {r.b}
                  </b>
                  <p style={{ color: "#3a3b45", fontSize: 14.5, marginTop: 4 }}>{r.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · IL RISULTATO · INCHIOSTRO */}
      <section className="band ink" id="risultato">
        <div className="wrap">
          <div className="eye">{t.risultato.eye}</div>
          <h2 className="h-sect">
            {t.risultato.h2a}
            <span className="emph">{t.risultato.h2emph}</span>
            {t.risultato.h2b}
          </h2>
          <p className="lead">{t.risultato.lead}</p>

          <div style={{ marginTop: 40 }}>
            <div
              className="font-plex uppercase"
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                color: "var(--lilla)",
                marginBottom: 14,
              }}
            >
              {t.risultato.figTitle}
            </div>
            <div
              style={{
                border: "1px solid var(--riga-scuro)",
                background: "rgba(255,255,255,.02)",
                borderRadius: 12,
                padding: "26px 24px",
              }}
            >
              <svg
                viewBox="0 0 720 320"
                role="img"
                aria-label={t.risultato.svgAria}
                style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
              >
                <line x1="60" y1="40" x2="60" y2="250" stroke="rgba(140,165,247,.3)" />
                <line x1="60" y1="250" x2="670" y2="250" stroke="rgba(140,165,247,.3)" />
                <g stroke="rgba(255,255,255,.06)">
                  <line x1="60" y1="90" x2="670" y2="90" />
                  <line x1="60" y1="140" x2="670" y2="140" />
                  <line x1="60" y1="190" x2="670" y2="190" />
                </g>
                <path
                  d="M60,225 C160,215 260,180 360,150 C460,120 560,90 660,70"
                  fill="none"
                  stroke="#533DFC"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="225" r="4" fill="#8CA5F7" />
                <circle cx="360" cy="150" r="4" fill="#8CA5F7" />
                <circle cx="660" cy="70" r="5" fill="#1E9E5A" />
                <g fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#c2c6d4" textAnchor="middle">
                  <text x="60" y="272">{t.risultato.figMonths[0]}</text>
                  <text x="360" y="272">{t.risultato.figMonths[1]}</text>
                  <text x="660" y="272">{t.risultato.figMonths[2]}</text>
                </g>
                <text x="110" y="245" fill="#c2c6d4" fontFamily="IBM Plex Mono, monospace" fontSize="12">
                  {t.risultato.figBase}
                </text>
                <text
                  x="560"
                  y="52"
                  fill="#1E9E5A"
                  fontFamily="Playfair Display, Georgia, serif"
                  fontStyle="italic"
                  fontSize="17"
                >
                  {t.risultato.figDelta}
                </text>
              </svg>
              <p style={{ marginTop: 14, fontSize: 14, color: "#c2c6d4", maxWidth: "64ch" }}>
                {t.risultato.figCapA}
                <b style={{ color: "var(--carta)", fontWeight: 700 }}>{t.risultato.figCapB}</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · TILES RISULTATO · CARTA */}
      <section className="band carta" id="tiles">
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 16,
            }}
            className="[@media(max-width:760px)]:!grid-cols-1"
          >
            {t.risultato.tiles.map((tile, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(11,11,12,.14)",
                  background: "rgba(11,11,12,.02)",
                  borderRadius: 12,
                  padding: 22,
                }}
              >
                <div
                  className="font-plex uppercase"
                  style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--ombra)" }}
                >
                  {tile.k}
                </div>
                <div
                  className="font-clash"
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(28px,3.6vw,40px)",
                    lineHeight: 1,
                    margin: "10px 0 6px",
                    color: tile.gain ? "var(--ok)" : "var(--inchiostro)",
                  }}
                >
                  {tile.n}
                </div>
                <p style={{ fontSize: 13, color: "#3a3b45" }}>{tile.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 · CTA + CORRELATI · INCHIOSTRO */}
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
        <div className="wrap" style={{ marginTop: 64 }}>
          <div className="eye" style={{ textAlign: "left" }}>
            {t.correlati.eye}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 18,
              marginTop: 24,
              textAlign: "left",
            }}
            className="[@media(max-width:760px)]:!grid-cols-1"
          >
            {t.correlati.cards.map((c, i) => (
              <span
                key={i}
                style={{
                  border: "1px solid var(--riga-scuro)",
                  borderRadius: 12,
                  background: "rgba(255,255,255,.02)",
                  padding: 20,
                  display: "block",
                }}
              >
                <div
                  className="font-plex uppercase"
                  style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--lilla)" }}
                >
                  {c.cat}
                </div>
                <h3
                  className="font-clash"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    margin: "8px 0 10px",
                    color: "var(--carta)",
                  }}
                >
                  {c.h3}
                </h3>
                <span className="btn btn-3" style={{ margin: 0 }}>
                  {c.link}
                </span>
              </span>
            ))}
          </div>
          <p style={{ marginTop: 22, textAlign: "left" }}>
            <Link className="btn btn-3" href={`${base}/casi`}>
              {t.correlati.all}
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
