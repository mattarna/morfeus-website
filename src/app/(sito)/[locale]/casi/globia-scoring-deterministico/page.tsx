import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { Briciole } from "@/components/shared/SEO/Briciole";
import { NOME_CASO, NOME_INDICE_CASI } from "@/lib/seo/briciole-casi";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: Promise<{ locale: string }> };

const SLUG = "casi/globia-scoring-deterministico";

const COPY = {
  it: {
    metaTitle:
      "Il numero cambiava a ogni click · Caso Morfeus",
    metaDesc:
      "Caso #068: GLOBIA aveva uno scoring AI che dava un voto diverso allo stesso input. Ora il punteggio è deterministico e il tempo di valutazione cala del 60%.",
    crumbsCasi: "Casi",
    crumbsSep: " · GLOBIA · Caso #068",
    tags: [
      "Consulenza e due diligence",
      "Micro-PMI 5-25 persone",
      "Scoring deterministico",
    ],
    h1a: "Il numero cambiava a ogni click, e loro dovevano metterci la ",
    h1emph: "firma",
    h1b: ".",
    standfirst:
      "Un punteggio che non cambia a tua insaputa e che puoi difendere voce per voce davanti a chi deve firmare.",
    headstats: [
      { n: "-60%", l: "tempo per valutazione, rispetto al foglio a mano", gain: true },
      { n: "100%", l: "riproducibilità: stesso input, stesso output, sempre", gain: true },
      { n: "“Difendibile”", l: "il numero, voce per voce, davanti a chi firma", gain: false },
    ],
    stamp: "Confermato",
    // Sezione 02
    s2eye: "La casa che bruciava",
    s2h2a: "Stesso input. Punteggio ",
    s2h2emph: "diverso",
    s2h2b: " ogni volta.",
    s2p1:
      "Avevano provato a velocizzare le valutazioni con un tool di scoring basato su AI. Sulla carta era magia: rispondi al questionario, esce il punteggio. Nella realtà era una bomba a orologeria. Lo stesso identico input, rigenerato dieci minuti dopo, dava un voto diverso. Un cliente in riunione chiedeva “da dove esce questo 68?” e il consulente non sapeva rispondere: il modello non spiegava il calcolo, e alla volta successiva il 68 era diventato 74.",
    s2p2a:
      "Per una boutique che vive di credibilità tecnica, questo non è un fastidio: è un veleno. Il costo non era il software: era ",
    s2p2emph: "la fiducia bruciata davanti al cliente",
    s2p2b:
      ", le ore perse a “controllare a mano” un output che doveva farti risparmiare tempo, e il rischio che una valutazione finisse in un dossier vincolante senza una metodologia che reggesse a una contestazione.",
    figA_title: "Lo stesso input, output diversi",
    figA_ariaLabel:
      "Grafico a linea instabile: lo stesso input rigenerato più volte produce punteggi diversi, 68, 74, 61, 70",
    figA_annot: "“da dove esce questo numero?”",
    figA_axis: "punteggio",
    figA_xlabel: "stesso input",
    figA_xticks: [
      "rigenerazione 1",
      "rigenerazione 2",
      "rigenerazione 3",
      "rigenerazione 4",
    ],
    figA_capA:
      "Stesso questionario, stesso input, rigenerato più volte: il punteggio oscillava senza una ragione dichiarata, da 68 a 74 a 61 a 70. ",
    figA_capB:
      "Un consulente non può difendere in riunione un numero che nemmeno lui sa spiegare.",
    // Sezione 03
    s3eye: "Perché restava irrisolto",
    s3h2a: "Difendibile o veloce. Mai ",
    s3h2emph: "insieme",
    s3h2b: ".",
    s3p1:
      "Avevano già tentato due strade. Lo scoring a mano su foglio di calcolo: difendibile ma lentissimo, e ogni consulente pesava le voci a modo suo, quindi due valutazioni della stessa azienda divergevano.",
    s3p2a:
      "E il tool AI: veloce ma non riproducibile, non spiegabile, e con il difetto fatale di inventare un punteggio anche quando i dati erano incompleti, proprio il caso in cui un professionista deve dire ",
    s3p2emph: "“qui mi mancano elementi”",
    s3p2b: ", non sparare una cifra.",
    // Sezione 04
    s4eye: "Cosa abbiamo costruito",
    s4h2a: "Il punteggio che non cambia idea a tua ",
    s4h2emph: "insaputa",
    s4h2b: ".",
    s4lead:
      "Cinque elementi, dal questionario al numero finale, che rendono lo scoring ripetibile e spiegabile in ogni sua parte.",
    s4rows: [
      {
        ix: "01",
        b: "Formule ponderate e fisse",
        p: "Il questionario diventa un punteggio 0-100 calcolato con formule ponderate e fisse: stesso input, stesso output, sempre.",
      },
      {
        ix: "02",
        b: "Sotto-punteggi per layer",
        p: "Sotto-punteggi pesati per layer, così il consulente vede da quali aree arriva il voto.",
      },
      {
        ix: "03",
        b: "Bande di esito chiare",
        p: "Traducono il numero in un verdetto leggibile dal cliente.",
      },
      {
        ix: "04",
        b: "Null-on-missing",
        p: "Dove manca un layer il sistema lo dichiara, non lo inventa.",
      },
      {
        ix: "05",
        b: "Metodo e input sempre visibili",
        p: "Alla domanda “da dove esce questo numero?” la risposta è a schermo.",
      },
    ],
    // Sezione 05
    s5eye: "Il risultato",
    s5h2a: "Stesso input. Stesso output. ",
    s5h2emph: "Sempre",
    s5h2b: ".",
    s5lead:
      "Tempo per valutazione ridotto di circa il 60% rispetto al foglio di calcolo a mano. Le contestazioni in riunione, che prima facevano saltare la fiducia, ora si chiudono in trenta secondi aprendo il dettaglio. Zero valutazioni firmate su dati incompleti senza che fosse dichiarato.",
    figB_title: "Lo stesso input, sempre lo stesso output",
    figB_ariaLabel:
      "Linea piatta e stabile che conferma la riproducibilità del 100 per cento, seguita da un breakdown a barre orizzontali dei sotto-punteggi per layer che sommati danno il punteggio finale",
    figB_annot: "output identico ad ogni rigenerazione",
    figB_breakdown: "Breakdown per layer · punteggio 82/100",
    figB_layers: [
      { name: "Layer finanziario", val: "28/34" },
      { name: "Layer legale", val: "20/24" },
      { name: "Layer operativo", val: "18/22" },
      { name: "Layer reputazionale", val: "16/20" },
    ],
    figB_capA: "Lo stesso identico input restituisce lo stesso identico punteggio, sempre: ",
    figB_capB: "riproducibilità del 100%",
    figB_capC:
      ". E il numero si scompone nei layer che lo compongono, così il consulente sa sempre da dove arriva ogni punto.",
    // Sezione 06 tiles
    s6eye: "In cifre",
    s6h2: "Cosa cambia, misurato.",
    tiles: [
      { k: "Tempo per valutazione", n: "-60%", p: "Rispetto al foglio di calcolo a mano.", gain: true },
      { k: "Riproducibilità", n: "100%", p: "Stesso input, stesso output, sempre.", gain: true },
      {
        k: "Il numero",
        n: "“Difendibile”",
        p: "Zero valutazioni firmate su dati incompleti senza dichiararlo.",
        gain: false,
      },
    ],
    // Sezione 07 CTA + correlati
    s7eye: "In una riga",
    s7h2a:
      "Un punteggio che non cambia a tua insaputa e che puoi difendere voce per voce davanti a chi deve ",
    s7h2emph: "firmare",
    s7h2b: ".",
    s7p:
      "Quante ore perdete a ricontrollare un punteggio che dovrebbe già reggersi da solo? Il ROIometro te lo mette in euro.",
    cta1: "Calcola cosa perdi ▸",
    cta2: "Parla con noi",
    othersEye: "Altri casi",
    others: [
      {
        cat: "Reporting",
        h: "Il report che chi deve decidere leggeva davvero",
        cta: "Apri il dossier ▸",
      },
      {
        cat: "Pricing",
        h: "Il numero difendibile che regge in ogni trattativa",
        cta: "Apri il dossier ▸",
      },
    ],
    breakdownTotal: "82/100",
  },
  en: {
    metaTitle:
      "The number changed with every click · Morfeus case",
    metaDesc:
      "Case #068: GLOBIA had an AI scoring tool that gave a different grade for the same input. The score is now deterministic and evaluation time drops 60%.",
    crumbsCasi: "Cases",
    crumbsSep: " · GLOBIA · Case #068",
    tags: [
      "Consulting and due diligence",
      "Micro-SMB 5-25 people",
      "Deterministic scoring",
    ],
    h1a: "The number changed with every click, and they had to put their ",
    h1emph: "signature",
    h1b: " on it.",
    standfirst:
      "A score that doesn't change behind your back and that you can defend line by line in front of whoever has to sign.",
    headstats: [
      { n: "-60%", l: "evaluation time, compared to the manual sheet", gain: true },
      { n: "100%", l: "reproducibility: same input, same output, always", gain: true },
      { n: "“Defensible”", l: "the number, line by line, in front of whoever signs", gain: false },
    ],
    stamp: "Confirmed",
    s2eye: "The house that was burning",
    s2h2a: "Same input. A ",
    s2h2emph: "different",
    s2h2b: " score every time.",
    s2p1:
      "They had tried to speed up evaluations with an AI-based scoring tool. On paper it was magic: answer the questionnaire, out comes the score. In reality it was a time bomb. The very same input, regenerated ten minutes later, gave a different grade. A client in a meeting would ask “where does this 68 come from?” and the consultant couldn't answer: the model didn't explain the calculation, and the next time the 68 had become 74.",
    s2p2a:
      "For a boutique that lives on technical credibility, this is not a nuisance: it is poison. The cost was not the software: it was ",
    s2p2emph: "the trust burned in front of the client",
    s2p2b:
      ", the hours lost “checking by hand” an output that was supposed to save you time, and the risk that an evaluation would end up in a binding dossier without a methodology that could withstand a challenge.",
    figA_title: "Same input, different outputs",
    figA_ariaLabel:
      "Unstable line chart: the same input, regenerated multiple times, produces different scores, 68, 74, 61, 70",
    figA_annot: "“where does this number come from?”",
    figA_axis: "score",
    figA_xlabel: "same input",
    figA_xticks: ["regeneration 1", "regeneration 2", "regeneration 3", "regeneration 4"],
    figA_capA:
      "Same questionnaire, same input, regenerated multiple times: the score oscillated with no stated reason, from 68 to 74 to 61 to 70. ",
    figA_capB:
      "A consultant cannot defend in a meeting a number that not even they can explain.",
    s3eye: "Why it stayed unsolved",
    s3h2a: "Defensible or fast. Never ",
    s3h2emph: "together",
    s3h2b: ".",
    s3p1:
      "They had already tried two paths. Scoring by hand on a spreadsheet: defensible but very slow, and each consultant weighed the items in their own way, so two evaluations of the same company diverged.",
    s3p2a:
      "And the AI tool: fast but not reproducible, not explainable, and with the fatal flaw of inventing a score even when the data was incomplete, exactly the case in which a professional must say ",
    s3p2emph: "“here I'm missing elements”",
    s3p2b: ", not fire off a figure.",
    s4eye: "What we built",
    s4h2a: "The score that doesn't change its mind behind your ",
    s4h2emph: "back",
    s4h2b: ".",
    s4lead:
      "Five elements, from the questionnaire to the final number, that make the scoring repeatable and explainable in every part.",
    s4rows: [
      {
        ix: "01",
        b: "Fixed weighted formulas",
        p: "The questionnaire becomes a 0-100 score computed with fixed weighted formulas: same input, same output, always.",
      },
      {
        ix: "02",
        b: "Sub-scores per layer",
        p: "Weighted sub-scores per layer, so the consultant sees which areas the grade comes from.",
      },
      {
        ix: "03",
        b: "Clear outcome bands",
        p: "They translate the number into a verdict readable by the client.",
      },
      {
        ix: "04",
        b: "Null-on-missing",
        p: "Where a layer is missing, the system declares it, it doesn't make it up.",
      },
      {
        ix: "05",
        b: "Method and input always visible",
        p: "To the question “where does this number come from?” the answer is on the screen.",
      },
    ],
    s5eye: "The result",
    s5h2a: "Same input. Same output. ",
    s5h2emph: "Always",
    s5h2b: ".",
    s5lead:
      "Evaluation time reduced by about 60% compared to the manual spreadsheet. Objections in meetings, which used to break trust, now close in thirty seconds by opening the detail. Zero evaluations signed on incomplete data without it being declared.",
    figB_title: "Same input, always the same output",
    figB_ariaLabel:
      "Flat, stable line confirming 100 percent reproducibility, followed by a horizontal-bar breakdown of the sub-scores per layer that sum to the final score",
    figB_annot: "identical output at every regeneration",
    figB_breakdown: "Breakdown per layer · score 82/100",
    figB_layers: [
      { name: "Financial layer", val: "28/34" },
      { name: "Legal layer", val: "20/24" },
      { name: "Operational layer", val: "18/22" },
      { name: "Reputational layer", val: "16/20" },
    ],
    figB_capA: "The exact same input returns the exact same score, always: ",
    figB_capB: "100% reproducibility",
    figB_capC:
      ". And the number breaks down into the layers that compose it, so the consultant always knows where each point comes from.",
    s6eye: "In numbers",
    s6h2: "What changes, measured.",
    tiles: [
      { k: "Evaluation time", n: "-60%", p: "Compared to the manual spreadsheet.", gain: true },
      { k: "Reproducibility", n: "100%", p: "Same input, same output, always.", gain: true },
      {
        k: "The number",
        n: "“Defensible”",
        p: "Zero evaluations signed on incomplete data without declaring it.",
        gain: false,
      },
    ],
    s7eye: "In one line",
    s7h2a:
      "A score that doesn't change behind your back and that you can defend line by line in front of whoever has to ",
    s7h2emph: "sign",
    s7h2b: ".",
    s7p:
      "How many hours do you lose re-checking a score that should already stand on its own? The ROIometro puts it in euros.",
    cta1: "Calculate what you lose ▸",
    cta2: "Talk to us",
    othersEye: "Other cases",
    others: [
      {
        cat: "Reporting",
        h: "The report the decision-maker actually read",
        cta: "Open the dossier ▸",
      },
      {
        cat: "Pricing",
        h: "The defensible number that holds in every negotiation",
        cta: "Open the dossier ▸",
      },
    ],
    breakdownTotal: "82/100",
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

export default async function CasoGlobiaScoringPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  const pageUrl = `${SITE_URL}${localePrefix(safeLocale)}/${SLUG}`;

  const clientOrgId = `${SITE_URL}${localePrefix(safeLocale)}/${SLUG}#globia`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: t.metaTitle,
        description: t.metaDesc,
        url: pageUrl,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        about: [{ "@id": ORGANIZATION_ID }, { "@id": clientOrgId }],
        articleSection: isIt ? "Casi" : "Cases",
        keywords: t.tags.join(", "),
      },
      {
        "@type": "Organization",
        "@id": clientOrgId,
        name: "GLOBIA",
        description: isIt
          ? "Boutique di consulenza e due diligence."
          : "Boutique consulting and due diligence firm.",
      },
    ],
  };

  return (
    <SiteShell locale={safeLocale}>
      <Briciole
        locale={safeLocale}
        voci={[
          { nome: NOME_INDICE_CASI[safeLocale], percorso: "casi" },
          { nome: NOME_CASO["globia-scoring-deterministico"][safeLocale], percorso: "casi/globia-scoring-deterministico" },
        ]}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 · TESTATA · INCHIOSTRO */}
      <section className="band ink" id="testata">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--ombra)" }}
          >
            <Link href={`${base}/casi`} style={{ color: "var(--lilla)" }}>
              {t.crumbsCasi}
            </Link>
            {t.crumbsSep}
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 22,
            }}
          >
            {t.tags.map((tag, i) => (
              <span
                key={i}
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--lilla)",
                  border: "1px solid rgba(140,165,247,.3)",
                  borderRadius: 999,
                  padding: "4px 11px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontSize: "clamp(30px, 5.2vw, 54px)",
              margin: "16px 0",
              maxWidth: "19ch",
              fontWeight: 600,
            }}
          >
            {t.h1a}
            <span className="emph">{t.h1emph}</span>
            {t.h1b}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-emph)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 2.2vw, 24px)",
              color: "#c2c6d4",
              maxWidth: "56ch",
            }}
          >
            {t.standfirst}
          </p>
          <div
            style={{
              display: "flex",
              gap: 32,
              flexWrap: "wrap",
              marginTop: 28,
              paddingTop: 22,
              borderTop: "1px solid var(--riga-scuro)",
            }}
          >
            {t.headstats.map((s, i) => (
              <div key={i}>
                <div
                  className={s.gain ? "gain" : ""}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(26px, 3.4vw, 36px)",
                    lineHeight: 1,
                    color: s.gain ? "var(--ok)" : "var(--carta)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ombra)",
                    marginTop: 8,
                    maxWidth: "20ch",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <span className="stamp">{t.stamp}</span>
          </div>
        </div>
      </section>

      {/* 02 · LA CASA CHE BRUCIAVA · CARTA */}
      <section className="band carta">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eye">{t.s2eye}</div>
          <h2 className="h-sect">
            {t.s2h2a}
            <span className="emph">{t.s2h2emph}</span>
            {t.s2h2b}
          </h2>
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 17, margin: "14px 0", color: "#23222e" }}>{t.s2p1}</p>
            <p style={{ fontSize: 17, margin: "14px 0", color: "#23222e" }}>
              {t.s2p2a}
              <span className="emph">{t.s2p2emph}</span>
              {t.s2p2b}
            </p>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 44 }}>
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 14,
              color: "var(--firma)",
            }}
          >
            {t.figA_title}
          </div>
          <div
            style={{
              borderRadius: 12,
              padding: "26px 24px",
              border: "1px solid rgba(11,11,12,.14)",
              background: "rgba(11,11,12,.02)",
            }}
          >
            <svg
              viewBox="0 0 720 260"
              role="img"
              aria-label={t.figA_ariaLabel}
              style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
            >
              <line x1="60" y1="40" x2="60" y2="210" stroke="rgba(11,11,12,.22)" />
              <line x1="60" y1="210" x2="670" y2="210" stroke="rgba(11,11,12,.22)" />
              <g stroke="rgba(11,11,12,.08)">
                <line x1="60" y1="80" x2="670" y2="80" />
                <line x1="60" y1="120" x2="670" y2="120" />
                <line x1="60" y1="160" x2="670" y2="160" />
              </g>
              <path
                d="M100,110 L280,60 L460,150 L640,90"
                fill="none"
                stroke="#533DFC"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="110" r="4" fill="#533DFC" />
              <circle cx="280" cy="60" r="4" fill="#533DFC" />
              <circle cx="460" cy="150" r="4" fill="#FF5C5C" />
              <circle cx="640" cy="90" r="4" fill="#533DFC" />
              <g
                fontFamily="var(--font-mono)"
                fontSize="12"
                fill="#0B0B0C"
                textAnchor="middle"
                fontWeight="600"
              >
                <text x="100" y="98">68</text>
                <text x="280" y="48">74</text>
                <text x="460" y="172">61</text>
                <text x="640" y="78">70</text>
              </g>
              <g fontFamily="var(--font-mono)" fontSize="11" fill="#7E8091" textAnchor="middle">
                {t.figA_xticks.map((tick, i) => (
                  <text key={i} x={100 + i * 180} y="228">
                    {tick}
                  </text>
                ))}
              </g>
              <text
                x="30"
                y="45"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill="#7E8091"
                textAnchor="middle"
                transform="rotate(-90 30 45)"
              >
                {t.figA_axis}
              </text>
              <text x="365" y="248" fontFamily="var(--font-mono)" fontSize="11" fill="#7E8091" textAnchor="middle">
                {t.figA_xlabel}
              </text>
              <text
                x="460"
                y="130"
                textAnchor="middle"
                fill="#FF5C5C"
                fontFamily="var(--font-emph)"
                fontStyle="italic"
                fontSize="14"
              >
                {t.figA_annot}
              </text>
              <path d="M460,136 L460,146" stroke="#FF5C5C" strokeWidth="1.5" fill="none" />
            </svg>
            <p
              style={{
                marginTop: 14,
                fontSize: 14,
                maxWidth: "64ch",
                color: "#3a3b45",
              }}
            >
              {t.figA_capA}
              <b style={{ color: "var(--inchiostro)", fontWeight: 700 }}>{t.figA_capB}</b>
            </p>
          </div>
        </div>
      </section>

      {/* 03 · PERCHÉ RESTAVA IRRISOLTO · INCHIOSTRO */}
      <section className="band ink">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eye">{t.s3eye}</div>
          <h2 className="h-sect">
            {t.s3h2a}
            <span className="emph">{t.s3h2emph}</span>
            {t.s3h2b}
          </h2>
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 17, margin: "14px 0", color: "#c3c1d6" }}>{t.s3p1}</p>
            <p style={{ fontSize: 17, margin: "14px 0", color: "#c3c1d6" }}>
              {t.s3p2a}
              <span className="emph">{t.s3p2emph}</span>
              {t.s3p2b}
            </p>
          </div>
        </div>
      </section>

      {/* 04 · COSA ABBIAMO COSTRUITO · CARTA */}
      <section className="band carta">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eye">{t.s4eye}</div>
          <h2 className="h-sect">
            {t.s4h2a}
            <span className="emph">{t.s4h2emph}</span>
            {t.s4h2b}
          </h2>
          <p className="lead">{t.s4lead}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 24 }}>
            {t.s4rows.map((r, i) => (
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
                  className="mono"
                  style={{ fontSize: 12, color: "var(--firma)", paddingTop: 3 }}
                >
                  {r.ix}
                </span>
                <div>
                  <b
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 17,
                      color: "var(--inchiostro)",
                    }}
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
      <section className="band ink">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eye">{t.s5eye}</div>
          <h2 className="h-sect">
            {t.s5h2a}
            <span className="emph">{t.s5h2emph}</span>
            {t.s5h2b}
          </h2>
          <p className="lead">{t.s5lead}</p>
        </div>
        <div className="wrap" style={{ marginTop: 40 }}>
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 14,
              color: "var(--lilla)",
            }}
          >
            {t.figB_title}
          </div>
          <div
            style={{
              borderRadius: 12,
              padding: "26px 24px",
              border: "1px solid var(--riga-scuro)",
              background: "rgba(255,255,255,.02)",
            }}
          >
            <svg
              viewBox="0 0 720 380"
              role="img"
              aria-label={t.figB_ariaLabel}
              style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
            >
              <line x1="60" y1="30" x2="60" y2="150" stroke="rgba(140,165,247,.3)" />
              <line x1="60" y1="150" x2="670" y2="150" stroke="rgba(140,165,247,.3)" />
              <path
                d="M100,90 L280,90 L460,90 L640,90"
                fill="none"
                stroke="#1E9E5A"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="90" r="4" fill="#1E9E5A" />
              <circle cx="280" cy="90" r="4" fill="#1E9E5A" />
              <circle cx="460" cy="90" r="4" fill="#1E9E5A" />
              <circle cx="640" cy="90" r="4" fill="#1E9E5A" />
              <g
                fontFamily="var(--font-mono)"
                fontSize="12"
                fill="#c2c6d4"
                textAnchor="middle"
                fontWeight="600"
              >
                <text x="100" y="78">82</text>
                <text x="280" y="78">82</text>
                <text x="460" y="78">82</text>
                <text x="640" y="78">82</text>
              </g>
              <g fontFamily="var(--font-mono)" fontSize="11" fill="#c2c6d4" textAnchor="middle">
                {t.figA_xticks.map((tick, i) => (
                  <text key={i} x={100 + i * 180} y="168">
                    {tick}
                  </text>
                ))}
              </g>
              <text
                x="370"
                y="52"
                textAnchor="middle"
                fill="#1E9E5A"
                fontFamily="var(--font-emph)"
                fontStyle="italic"
                fontSize="16"
              >
                {t.figB_annot}
              </text>

              {/* breakdown per layer */}
              <text
                x="60"
                y="205"
                fontFamily="var(--font-mono)"
                fontSize="10"
                letterSpacing=".14em"
                fill="#8CA5F7"
                style={{ textTransform: "uppercase" }}
              >
                {t.figB_breakdown}
              </text>
              <g fontFamily="var(--font-mono)" fontSize="12" fill="#c3c1d6">
                {t.figB_layers.map((layer, i) => {
                  const y = 235 + i * 31;
                  const rectY = y - 13;
                  const widths = [220, 170, 140, 120];
                  const fills = ["#533DFC", "#8CA5F7", "#533DFC", "#8CA5F7"];
                  return (
                    <g key={i}>
                      <text x="60" y={y}>{layer.name}</text>
                      <rect x="230" y={rectY} width={widths[i]} height="16" rx="4" fill={fills[i]} />
                      <text x="460" y={y} fill="#c2c6d4">{layer.val}</text>
                    </g>
                  );
                })}
              </g>
            </svg>
            <p
              style={{
                marginTop: 14,
                fontSize: 14,
                maxWidth: "64ch",
                color: "#c2c6d4",
              }}
            >
              {t.figB_capA}
              <b style={{ color: "var(--carta)", fontWeight: 700 }}>{t.figB_capB}</b>
              {t.figB_capC}
            </p>
          </div>
        </div>
      </section>

      {/* 06 · TILES RISULTATO · CARTA */}
      <section className="band carta">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eye">{t.s6eye}</div>
          <h2 className="h-sect">{t.s6h2}</h2>
        </div>
        <div className="wrap" style={{ marginTop: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
            className="tiles-grid"
          >
            {t.tiles.map((tile, i) => (
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
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ombra)",
                  }}
                >
                  {tile.k}
                </div>
                <div
                  className={tile.gain ? "gain" : ""}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(28px, 3.6vw, 40px)",
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

      {/* 07 · IN UNA RIGA + CTA + CORRELATI · INCHIOSTRO */}
      <section className="band ink ctaq" id="cta">
        <div className="wrap">
          <div className="eye">{t.s7eye}</div>
          <h2>
            {t.s7h2a}
            <span className="emph">{t.s7h2emph}</span>
            {t.s7h2b}
          </h2>
          <p>{t.s7p}</p>
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
            {t.othersEye}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 18,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 24,
            }}
          >
            {t.others.map((o, i) => (
              <span
                key={i}
                style={{
                  border: "1px solid var(--riga-scuro)",
                  borderRadius: 12,
                  background: "rgba(255,255,255,.02)",
                  padding: 20,
                  display: "block",
                  textAlign: "left",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--lilla)",
                  }}
                >
                  {o.cat}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    margin: "8px 0 10px",
                    color: "var(--carta)",
                  }}
                >
                  {o.h}
                </h3>
                <span className="btn btn-3">{o.cta}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
