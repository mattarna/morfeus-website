import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  it: {
    metaTitle:
      "Cyberangels Report CFO · Il report tecnico che finisce nel cassetto, e con lui il rinnovo — Caso Morfeus",
    metaDesc:
      "Caso #027 Cyberangels Report Engine. In un'azienda moda strutturata il report di sicurezza arrivava pieno di CVE e severità, il CFO non lo capiva e il rinnovo restava appeso. Ora arriva integro fino al tavolo che firma.",
    crumbCasi: "Casi",
    crumbTail: "Cyberangels Report Engine · Caso #027",
    tags: ["Moda / fashion strutturata", "Media impresa / quotata (50-250 addetti)"],
    h1a: "Il tuo report tecnico finisce nel cassetto del CFO, e con lui il ",
    h1emph: "rinnovo",
    h1b: "",
    standfirst:
      "Se chi firma non capisce il report, non hai un cliente difficile: hai un report scritto per la persona sbagliata.",
    headstats: [
      { n: "più alto", l: "tasso di rinnovo", gain: true },
      { n: "più corti", l: "cicli di approvazione", gain: true },
      { n: "il CFO", l: "non il tecnico, è chi legge ora", gain: false },
    ],
    stamp: "Confermato",
    s2: {
      eye: "La casa che bruciava",
      h2a: "Un report solidissimo, per la persona ",
      h2emph: "sbagliata",
      h2b: ".",
      p1: "Consegni un report pieno di numeri tecnici: vulnerabilità contate, CVE, severità. Tu lo trovi solidissimo. Ma chi decide la spesa in un'azienda moda strutturata non è un tecnico: è un direttore, un CFO, un board che ragiona in collezioni, margine, reputazione del marchio. Apre il PDF, vede una lista di sigle che non parlano la sua lingua, e lo chiude.",
      p2a: "Non perché non gli importi la sicurezza: perché nessuno gli ha mai tradotto quei conteggi in \"ecco cosa rischia il tuo marchio e perché questa spesa si giustifica\". Risultato: il rinnovo resta appeso, l'upsell non parte. ",
      p2emph:
        "Ogni trimestre che il valore non viene dimostrato a chi firma è un budget che va su un'altra voce",
      p2b: ", e in un'azienda di marchio basta un incidente reputazionale per cambiare tutto, ma a quel punto è tardi.",
      figLabel: "Due linguaggi che non si parlano",
      figCapA:
        "A sinistra il report che il tecnico trova solidissimo. A destra le domande a cui deve rispondere chi firma la spesa. ",
      figCapB: "Nessuno ha mai costruito il ponte tra i due.",
      svgTitle:
        "Un report tecnico pieno di CVE e severità a sinistra, ciò che il board capisce, collezioni margine reputazione, a destra, collegati da una freccia rotta con una X rossa",
      svgReport: "Report tecnico",
      svgReportLines: ["CVE-2024-xxxx", "Severità: Alta", "47 vulnerabilità", "CVSS 8.6 / 9.1 / 7.4"],
      svgBoard: "Ciò che il board capisce",
      svgBoardLines: ["Collezioni?", "Margine?", "Reputazione del marchio?"],
      svgRotto: "comunicazione rotta",
    },
    s3: {
      eye: "Perché restava irrisolto",
      h2a: "Nessuno aveva mai tradotto i conteggi in ",
      h2emph: "rischio di marchio",
      h2b: ".",
      p: "Il lavoro tecnico veniva fatto bene: assessment corretto, vulnerabilità individuate, severità classificate. Ma quel lavoro restava scritto nella lingua di chi lo produce, non di chi deve firmarne il valore. Un CFO o un consiglio in un'azienda moda strutturata non ha gli strumenti per convertire da solo \"47 vulnerabilità, severità alta\" in \"questo è il rischio per il marchio, questa la spesa che lo giustifica\". E nessuno glielo aveva mai tradotto: così il report restava un documento tecnico invece di diventare una decisione di business.",
    },
    s4: {
      eye: "Cosa abbiamo costruito",
      h2a: "Lo stesso assessment, letto dal ",
      h2emph: "board",
      h2b: ".",
      lead: "Lo stesso lavoro tecnico diventa un report leggibile dal cliente finale, che racconta la postura in linguaggio business invece che in conteggi di vulnerabilità, brandizzato in PDF pronto da portare in consiglio.",
      rows: [
        {
          b: "Da CVE e severità a rischio di marchio",
          p: "Gli stessi dati tecnici, riscritti nel linguaggio con cui un board ragiona: collezioni, margine, reputazione.",
        },
        {
          b: "Da PDF grezzo a documento brandizzato",
          p: "Pronto da portare in consiglio così com'è, senza che qualcuno debba prima ripulirlo o tradurlo a voce.",
        },
        {
          b: "Da 40 problemi a priorità che contano",
          p: "Non una lista piatta di vulnerabilità: le poche cose che decidono davvero l'esposizione del marchio.",
        },
        {
          b: "Da \"ci pensiamo\" a decisione motivata",
          p: "Chi firma capisce perché quella spesa protegge il marchio, e decide invece di rimandare.",
        },
      ],
    },
    s5: {
      eye: "Il risultato",
      h2a: "Il report arriva integro fino al tavolo che ",
      h2emph: "firma",
      h2b: ".",
      lead: "Invece di morire sulla scrivania del tecnico, il report arriva leggibile fino a chi decide. Tasso di rinnovo più alto e cicli di approvazione più corti, perché il decisore non deve farsi tradurre niente da nessuno.",
      figLabel: "Dove muore il report, prima e dopo",
      figCapA:
        "Prima, il report sopravviveva all'apertura ma moriva prima della firma: chi doveva decidere non capiva cosa stava leggendo. Dopo, ",
      figCapB: "il funnel resta ampio fino al rinnovo firmato",
      figCapC: ", perché il documento che arriva al board è già nella sua lingua.",
      svgTitle:
        "Due funnel a confronto: prima il report si restringe quasi ad azzerarsi dopo essere stato aperto dal board, dopo resta ampio fino al rinnovo firmato",
      prima: "PRIMA",
      dopo: "DOPO",
      inviato: "Report inviato · 100%",
      aperto: "Aperto dal board",
      firmato: "Rinnovo firmato",
      primaNote: "si azzera dopo l'apertura",
      dopoNote: "resta ampio fino alla firma",
    },
    s6: {
      tiles: [
        {
          k: "Tasso di rinnovo",
          n: "più alto",
          gain: true,
          p: "Chi firma capisce il rischio di marchio, non solo una lista di CVE.",
        },
        {
          k: "Cicli di approvazione",
          n: "più corti",
          gain: true,
          p: "Il documento arriva già pronto per il consiglio, non serve tradurlo a voce.",
        },
        {
          k: "Lettore",
          n: "il CFO",
          gain: false,
          p: "Non il tecnico: il report è scritto per la persona che firma la spesa.",
        },
      ],
    },
    cta: {
      eye: "In una riga",
      h2a: "Se chi firma non capisce il report, non hai un cliente difficile: hai un report scritto per la persona ",
      h2emph: "sbagliata",
      h2b: ".",
      p: "Quanti dei tuoi report finiscono nel cassetto invece che sul tavolo che firma? Il ROIometro te lo mette in euro.",
      cta1: "Calcola cosa perdi ▸",
      cta2: "Parla con noi",
      allCasi: "Vedi tutti i casi ▸",
      related: "Altri casi",
      rel: [
        {
          cat: "Cyberangels · Sales Advisor",
          h: "Stessa famiglia prodotto, il momento della vendita",
          link: "Apri il dossier ▸",
        },
        {
          cat: "GLOBIA · Scoring",
          h: "Uno scoring difendibile invece che una consulenza opinabile",
          link: "Apri il dossier ▸",
        },
      ],
    },
    clientName: "Cyberangels",
  },
  en: {
    metaTitle:
      "Cyberangels CFO Report · The tech report that ends up in the drawer, and the renewal with it — Morfeus Case",
    metaDesc:
      "Case #027 Cyberangels Report Engine. In a structured fashion company the security report arrived full of CVEs and severity ratings, the CFO didn't understand it and renewal stayed on hold. Now it reaches the table that signs, intact.",
    crumbCasi: "Cases",
    crumbTail: "Cyberangels Report Engine · Case #027",
    tags: ["Fashion / structured brand", "Mid-market / listed (50-250 employees)"],
    h1a: "Your technical report ends up in the CFO's drawer, and the ",
    h1emph: "renewal",
    h1b: " with it",
    standfirst:
      "If the person who signs doesn't understand the report, you don't have a difficult client: you have a report written for the wrong person.",
    headstats: [
      { n: "higher", l: "renewal rate", gain: true },
      { n: "shorter", l: "approval cycles", gain: true },
      { n: "the CFO", l: "not the tech lead, is who reads it now", gain: false },
    ],
    stamp: "Confirmed",
    s2: {
      eye: "The house that was burning",
      h2a: "A rock-solid report, for the ",
      h2emph: "wrong",
      h2b: " person.",
      p1: "You deliver a report full of technical numbers: vulnerabilities counted, CVEs, severity. You find it rock-solid. But the person who decides spending in a structured fashion company is not a tech lead: it's a director, a CFO, a board that thinks in collections, margin, brand reputation. They open the PDF, see a list of acronyms that don't speak their language, and close it.",
      p2a: "Not because they don't care about security: because no one ever translated those counts into \"here is what your brand risks and why this spend is justified\". Result: the renewal stays on hold, the upsell doesn't start. ",
      p2emph:
        "Every quarter that value is not proven to the person who signs is a budget that goes to another line",
      p2b: ", and in a brand-driven company one reputational incident is enough to change everything, but by then it's too late.",
      figLabel: "Two languages that don't meet",
      figCapA:
        "On the left, the report the tech lead finds rock-solid. On the right, the questions the person who signs the spend has to answer. ",
      figCapB: "No one ever built the bridge between the two.",
      svgTitle:
        "A technical report full of CVEs and severity ratings on the left, what the board understands, collections margin reputation, on the right, connected by a broken arrow with a red X",
      svgReport: "Technical report",
      svgReportLines: ["CVE-2024-xxxx", "Severity: High", "47 vulnerabilities", "CVSS 8.6 / 9.1 / 7.4"],
      svgBoard: "What the board understands",
      svgBoardLines: ["Collections?", "Margin?", "Brand reputation?"],
      svgRotto: "broken communication",
    },
    s3: {
      eye: "Why it stayed unresolved",
      h2a: "No one had ever translated the counts into ",
      h2emph: "brand risk",
      h2b: ".",
      p: "The technical work was done well: correct assessment, vulnerabilities identified, severity classified. But that work stayed written in the language of who produces it, not of who has to sign off on its value. A CFO or a board in a structured fashion company doesn't have the tools to convert on their own \"47 vulnerabilities, high severity\" into \"this is the risk for the brand, this is the spend that justifies it\". And no one had ever translated it for them: so the report stayed a technical document instead of becoming a business decision.",
    },
    s4: {
      eye: "What we built",
      h2a: "The same assessment, read by the ",
      h2emph: "board",
      h2b: ".",
      lead: "The same technical work becomes a report readable by the end client, telling the security posture in business language instead of vulnerability counts, brand-designed as a PDF ready to be brought into the boardroom.",
      rows: [
        {
          b: "From CVEs and severity to brand risk",
          p: "The same technical data, rewritten in the language a board reasons in: collections, margin, reputation.",
        },
        {
          b: "From raw PDF to brand-designed document",
          p: "Ready to be brought into the boardroom as is, without anyone having to clean it up first or translate it aloud.",
        },
        {
          b: "From 40 problems to priorities that matter",
          p: "Not a flat list of vulnerabilities: the few things that really decide the brand's exposure.",
        },
        {
          b: "From \"let's think about it\" to a motivated decision",
          p: "The person who signs understands why that spend protects the brand, and decides instead of postponing.",
        },
      ],
    },
    s5: {
      eye: "The result",
      h2a: "The report arrives intact to the table that ",
      h2emph: "signs",
      h2b: ".",
      lead: "Instead of dying on the tech lead's desk, the report arrives readable all the way to the decision-maker. Higher renewal rate and shorter approval cycles, because the decision-maker doesn't have to have anything translated to them by anyone.",
      figLabel: "Where the report dies, before and after",
      figCapA:
        "Before, the report survived the opening but died before the signature: the person who had to decide didn't understand what they were reading. After, ",
      figCapB: "the funnel stays wide up to the signed renewal",
      figCapC: ", because the document that reaches the board is already in their language.",
      svgTitle:
        "Two funnels compared: before, the report narrows almost to zero after being opened by the board, after, it stays wide up to the signed renewal",
      prima: "BEFORE",
      dopo: "AFTER",
      inviato: "Report sent · 100%",
      aperto: "Opened by the board",
      firmato: "Renewal signed",
      primaNote: "collapses to zero after opening",
      dopoNote: "stays wide up to the signature",
    },
    s6: {
      tiles: [
        {
          k: "Renewal rate",
          n: "higher",
          gain: true,
          p: "The person who signs understands the brand risk, not just a list of CVEs.",
        },
        {
          k: "Approval cycles",
          n: "shorter",
          gain: true,
          p: "The document arrives ready for the board, no verbal translation needed.",
        },
        {
          k: "Reader",
          n: "the CFO",
          gain: false,
          p: "Not the tech lead: the report is written for the person who signs the spend.",
        },
      ],
    },
    cta: {
      eye: "In one line",
      h2a: "If the person who signs doesn't understand the report, you don't have a difficult client: you have a report written for the ",
      h2emph: "wrong",
      h2b: " person.",
      p: "How many of your reports end up in the drawer instead of on the table that signs? The ROIometer puts it in euros.",
      cta1: "Calculate what you lose ▸",
      cta2: "Talk to us",
      allCasi: "See all cases ▸",
      related: "Other cases",
      rel: [
        {
          cat: "Cyberangels · Sales Advisor",
          h: "Same product family, the moment of the sale",
          link: "Open the dossier ▸",
        },
        {
          cat: "GLOBIA · Scoring",
          h: "A defensible scoring instead of an opinable consultancy",
          link: "Open the dossier ▸",
        },
      ],
    },
    clientName: "Cyberangels",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    alternates: buildLocaleAlternates("casi/cyberangels-report-cfo", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "article",
      url: `${SITE_URL}/${safeLocale}/casi/cyberangels-report-cfo`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default async function CasoCyberangelsReportCfoPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  const pageUrl = `${SITE_URL}/${safeLocale}/casi/cyberangels-report-cfo`;
  const clientOrgId = `${SITE_URL}/#org-cyberangels`;

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
        about: [{ "@id": ORGANIZATION_ID }, { "@id": clientOrgId }],
        mainEntityOfPage: pageUrl,
      },
      {
        "@type": "Organization",
        "@id": clientOrgId,
        name: t.clientName,
        description: isIt
          ? "Servizio di cybersecurity, famiglia prodotto Cyberangels."
          : "Cybersecurity service, Cyberangels product family.",
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
          <div className="font-plex text-[13px] tracking-[0.08em] uppercase text-ombra">
            <Link href={`${base}/casi`} className="text-lilla hover:text-carta">
              {t.crumbCasi}
            </Link>
            <span> · {t.crumbTail}</span>
          </div>
          <div className="flex gap-2 flex-wrap mt-6">
            {t.tags.map((tag) => (
              <span
                key={tag}
                className="font-plex text-[13px] tracking-[0.08em] uppercase text-lilla border border-lilla/30 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-clash font-semibold text-[clamp(30px,5.2vw,54px)] leading-[1.08] tracking-[-0.02em] my-4 max-w-[17ch]">
            {t.h1a}
            <span className="emph">{t.h1emph}</span>
            {t.h1b}
          </h1>
          <p className="font-playfair italic text-[clamp(18px,2.2vw,24px)] text-[#c2c6d4] max-w-[56ch]">
            {t.standfirst}
          </p>
          <div className="flex gap-8 flex-wrap mt-7 pt-6 border-t border-riga-scuro">
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
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <span className="stamp">{t.stamp}</span>
          </div>
        </div>
      </section>

      {/* 02 · LA CASA CHE BRUCIAVA · CARTA */}
      <section className="band carta">
        <div className="wrap">
          <div className="eye">{t.s2.eye}</div>
          <h2 className="h-sect">
            {t.s2.h2a}
            <span className="emph">{t.s2.h2emph}</span>
            {t.s2.h2b}
          </h2>
          <div className="max-w-[64ch]">
            <p className="text-[17px] my-4 text-[#23222e]">{t.s2.p1}</p>
            <p className="text-[17px] my-4 text-[#23222e]">
              {t.s2.p2a}
              <span className="emph">{t.s2.p2emph}</span>
              {t.s2.p2b}
            </p>
          </div>

          <div className="mt-11">
            <div className="font-plex text-[13px] tracking-[0.16em] uppercase text-firma mb-3.5">
              {t.s2.figLabel}
            </div>
            <div className="rounded-xl border border-inchiostro/[0.14] bg-inchiostro/[0.02] p-6">
              <svg
                viewBox="0 0 720 260"
                role="img"
                aria-label={t.s2.svgTitle}
                className="w-full h-auto block overflow-visible font-plex"
              >
                <g>
                  <rect x="30" y="40" width="260" height="150" rx="10" fill="#0B0B0C" />
                  <text
                    x="160"
                    y="70"
                    textAnchor="middle"
                    fill="#E4E7F0"
                    fontWeight="600"
                    fontSize="14"
                  >
                    {t.s2.svgReport}
                  </text>
                  {t.s2.svgReportLines.map((line, i) => (
                    <text key={i} x="55" y={100 + i * 22} fill="#c2c6d4" fontSize="12">
                      {line}
                    </text>
                  ))}

                  <rect
                    x="430"
                    y="40"
                    width="260"
                    height="150"
                    rx="10"
                    fill="none"
                    stroke="rgba(11,11,12,.25)"
                    strokeDasharray="6 6"
                  />
                  <text
                    x="560"
                    y="70"
                    textAnchor="middle"
                    fill="#0B0B0C"
                    fontWeight="600"
                    fontSize="14"
                  >
                    {t.s2.svgBoard}
                  </text>
                  {t.s2.svgBoardLines.map((line, i) => (
                    <text key={i} x="455" y={102 + i * 24} fill="#7E8091" fontSize="12">
                      {line}
                    </text>
                  ))}
                </g>
                <line
                  x1="290"
                  y1="115"
                  x2="430"
                  y2="115"
                  stroke="#FF5C5C"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <text
                  x="360"
                  y="100"
                  textAnchor="middle"
                  fill="#FF5C5C"
                  fontWeight="700"
                  fontSize="22"
                >
                  ×
                </text>
                <text
                  x="360"
                  y="230"
                  textAnchor="middle"
                  fill="#FF5C5C"
                  fontFamily="Playfair Display, Georgia, serif"
                  fontStyle="italic"
                  fontSize="15"
                >
                  {t.s2.svgRotto}
                </text>
              </svg>
              <p className="mt-3.5 text-[14px] max-w-[64ch] text-[#3a3b45]">
                {t.s2.figCapA}
                <b className="font-bold text-inchiostro">{t.s2.figCapB}</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 · PERCHÉ RESTAVA IRRISOLTO · INCHIOSTRO */}
      <section className="band ink">
        <div className="wrap">
          <div className="eye">{t.s3.eye}</div>
          <h2 className="h-sect">
            {t.s3.h2a}
            <span className="emph">{t.s3.h2emph}</span>
            {t.s3.h2b}
          </h2>
          <div className="max-w-[64ch]">
            <p className="text-[17px] my-4 text-[#c3c1d6]">{t.s3.p}</p>
          </div>
        </div>
      </section>

      {/* 04 · COSA ABBIAMO COSTRUITO · CARTA */}
      <section className="band carta">
        <div className="wrap">
          <div className="eye">{t.s4.eye}</div>
          <h2 className="h-sect">
            {t.s4.h2a}
            <span className="emph">{t.s4.h2emph}</span>
            {t.s4.h2b}
          </h2>
          <p className="lead">{t.s4.lead}</p>
          <div className="flex flex-col gap-0.5 mt-6">
            {t.s4.rows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_1fr] gap-4 py-4 border-t border-inchiostro/[0.14] first:border-t-0"
              >
                <span className="font-plex text-[13px] text-firma pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <b className="font-clash font-semibold text-[17px] text-inchiostro">{r.b}</b>
                  <p className="text-[14.5px] text-[#3a3b45] mt-1">{r.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · IL RISULTATO · INCHIOSTRO */}
      <section className="band ink">
        <div className="wrap">
          <div className="eye">{t.s5.eye}</div>
          <h2 className="h-sect">
            {t.s5.h2a}
            <span className="emph">{t.s5.h2emph}</span>
            {t.s5.h2b}
          </h2>
          <p className="lead">{t.s5.lead}</p>

          <div className="mt-10">
            <div className="font-plex text-[13px] tracking-[0.16em] uppercase text-lilla mb-3.5">
              {t.s5.figLabel}
            </div>
            <div className="rounded-xl border border-riga-scuro bg-white/[0.02] p-6">
              <svg
                viewBox="0 0 720 320"
                role="img"
                aria-label={t.s5.svgTitle}
                className="w-full h-auto block overflow-visible font-plex"
              >
                <g fontSize="11" fill="#c2c6d4">
                  <text x="30" y="30" fill="#FF5C5C" fontWeight="600">
                    {t.s5.prima}
                  </text>
                  <text x="390" y="30" fill="#1E9E5A" fontWeight="600">
                    {t.s5.dopo}
                  </text>
                </g>
                {/* PRIMA */}
                <g>
                  <rect x="30" y="50" width="300" height="34" rx="4" fill="#533DFC" />
                  <text x="40" y="72" fill="#E4E7F0" fontSize="12">
                    {t.s5.inviato}
                  </text>
                  <rect x="30" y="104" width="220" height="34" rx="4" fill="#7E8091" />
                  <text x="40" y="126" fill="#E4E7F0" fontSize="12">
                    {t.s5.aperto}
                  </text>
                  <rect x="30" y="158" width="26" height="34" rx="4" fill="#FF5C5C" />
                  <text x="66" y="180" fill="#FF5C5C" fontSize="12">
                    {t.s5.firmato}
                  </text>
                </g>
                <text
                  x="30"
                  y="210"
                  fill="#FF5C5C"
                  fontFamily="Playfair Display, Georgia, serif"
                  fontStyle="italic"
                  fontSize="14"
                >
                  {t.s5.primaNote}
                </text>
                {/* DOPO */}
                <g>
                  <rect x="390" y="50" width="300" height="34" rx="4" fill="#533DFC" />
                  <text x="400" y="72" fill="#E4E7F0" fontSize="12">
                    {t.s5.inviato}
                  </text>
                  <rect x="390" y="104" width="280" height="34" rx="4" fill="#8CA5F7" />
                  <text x="400" y="126" fill="#0B0B0C" fontSize="12">
                    {t.s5.aperto}
                  </text>
                  <rect x="390" y="158" width="255" height="34" rx="4" fill="#1E9E5A" />
                  <text x="400" y="180" fill="#E4E7F0" fontSize="12">
                    {t.s5.firmato}
                  </text>
                </g>
                <text
                  x="390"
                  y="210"
                  fill="#1E9E5A"
                  fontFamily="Playfair Display, Georgia, serif"
                  fontStyle="italic"
                  fontSize="14"
                >
                  {t.s5.dopoNote}
                </text>
              </svg>
              <p className="mt-3.5 text-[14px] max-w-[64ch] text-[#c2c6d4]">
                {t.s5.figCapA}
                <b className="font-bold text-carta">{t.s5.figCapB}</b>
                {t.s5.figCapC}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · TILES RISULTATO · CARTA */}
      <section className="band carta">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.s6.tiles.map((tile, i) => (
              <div
                key={i}
                className="border border-inchiostro/[0.14] bg-inchiostro/[0.02] rounded-xl p-6"
              >
                <div className="font-plex text-[13px] tracking-[0.1em] uppercase text-ombra">
                  {tile.k}
                </div>
                <div
                  className={`font-clash font-semibold text-[clamp(28px,3.6vw,40px)] leading-none my-2.5 ${
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

      {/* 07 · IN UNA RIGA + CTA + CORRELATI · INCHIOSTRO */}
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

        <div className="wrap mt-16">
          <div className="eye text-left">{t.cta.related}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {t.cta.rel.map((r, i) => (
              <span
                key={i}
                className="border border-riga-scuro rounded-xl bg-white/[0.02] p-5 block"
              >
                <span className="block font-plex text-[13px] tracking-[0.1em] uppercase text-lilla">
                  {r.cat}
                </span>
                <span className="block font-clash font-semibold text-[16px] text-carta mt-2 mb-2.5">
                  {r.h}
                </span>
                <span className="btn btn-3 inline-block">{r.link}</span>
              </span>
            ))}
          </div>
          <p className="mt-6 text-left">
            <Link className="btn btn-3" href={`${base}/casi`}>
              {t.cta.allCasi}
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
