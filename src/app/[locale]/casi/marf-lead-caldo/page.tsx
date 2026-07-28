import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const COPY = {
  it: {
    metaTitle: "MARF · Lead caldo · Caso Morfeus",
    metaDesc:
      "Caso MARF #001: un call center vendita energia perdeva metà dei lead pagati perché nessuno sapeva chi richiamare adesso. Secondo contatto sui lead caldi dal 50% a oltre il 90%.",
    crumbs: { casi: "Casi", label: "MARF · Caso #001" },
    tags: ["Call center energia", "Micro-PMI 12 persone", "Action Board"],
    h1a: "Ogni lead caldo che non richiami stasera, domani è ",
    h1emph: "morto",
    h1b: ".",
    standfirst:
      "Smetti di pagare lead che nessuno richiama: ogni venditore sa chi chiamare adesso e con quale mossa.",
    headstats: [
      { n: "50%→90%+", l: "secondo contatto sui lead caldi" },
      { n: "ore→minuti", l: "tempo di primo richiamo" },
      { n: "doppia cifra", l: "crescita del tasso di chiusura" },
    ],
    stamp: "Confermato",
    s2: {
      eye: "La casa che bruciava",
      h2a: "Chi chiama per primo, se lo ",
      h2emph: "tiene",
      h2b: ".",
      p1: "Il lead di energia ha una finestra di poche ore: chiami quando ha appena lasciato il numero, oppure quando richiami ha già firmato col primo che lo ha preso. Nel reseller i lead entravano e si impilavano in un foglio, ognuno chiamava «quelli che ricordava», i più vecchi marcivano in fondo e i follow-up promessi («la richiamo lunedì») sparivano.",
      p2a: "Non era un problema di pigrizia: era che nessuno sapeva chi richiamare adesso. Risultato: metà dei lead pagati a peso d'oro non venivano nemmeno chiamati una seconda volta. Su una squadra che brucia budget di acquisizione ogni giorno, ",
      p2emph: "il lead caldo lasciato raffreddare è la perdita più cara",
      p2b: ", e nessuno la vedeva accadere.",
      figTitle: "La finestra che si raffredda",
      figWindow: ["finestra dei", "concorrenti"],
      figCurve: "temperatura del lead",
      figY: "urgenza",
      figCapA:
        "Nelle prime 2-3 ore il lead è ancora suo: risponde, decide, firma. Passata quella finestra la temperatura crolla e chi ha chiamato per primo se lo è già preso. ",
      figCapB: "Ogni ora di ritardo è un lead pagato che regali al concorrente.",
    },
    s3: {
      eye: "Perché restava irrisolto",
      h2a: "Il foglio non diceva mai chi chiamare ",
      h2emph: "adesso",
      h2b: ".",
      p1: "I lead si impilavano in un foglio condiviso, e ognuno lavorava «quelli che ricordava» invece che quelli davvero caldi. I più vecchi finivano in fondo alla lista e ci restavano, i follow-up promessi a voce («la richiamo lunedì») vivevano solo nella memoria di chi li aveva promessi, e sparivano appena la giornata si riempiva.",
      p2a: "Non mancava impegno, mancava un sistema che tenesse lo stato di ogni lead e dicesse la prossima mossa. ",
      p2emph: "Senza quello, la priorità la decideva il caso, non l'urgenza.",
    },
    s4: {
      eye: "Cosa abbiamo costruito",
      h2a: "Una board per venditore, un lead alla ",
      h2emph: "volta",
      h2b: ".",
      lead: "Il lead non scompare più: ha sempre uno stato e una prossima mossa, e il sistema decide chi chiamare ora al posto della memoria di ciascuno.",
      rows: [
        { b: "Board personale per venditore", p: "Ognuno lavora solo i propri lead, senza pescare dal mucchio comune." },
        { b: "Doppia vista, ufficio e strada", p: "In ufficio vista multi-colonna per stato; sul telefono un lead alla volta, senza distrazioni." },
        { b: "Il sistema dice chi chiamare ora", p: "Priorità calcolata sull'urgenza reale, non su chi se lo ricorda." },
        { b: "Esito, stato e nota in un gesto", p: "Ogni chiamata registra l'esito, cambia lo stato del lead e tiene la nota per il prossimo contatto." },
        { b: "Follow-up automatico", p: "Il WhatsApp di follow-up parte da solo, senza decisioni «a memoria»." },
      ],
    },
    s5: {
      eye: "Il risultato",
      h2a: "Dal 50% a oltre il 90% di secondo ",
      h2emph: "contatto",
      h2b: ".",
      lead: "Il tempo di primo richiamo è sceso da ore a minuti, e il tasso di chiusura è salito a doppia cifra a parità di lead in ingresso: stessa spesa di acquisizione, più firme.",
      figTitle: "Secondo contatto sui lead caldi · prima e dopo",
      figLabels: { pre: "prima", post: "dopo", ann: "nessun lead più dimenticato" },
      figCapA: "Con la board che assegna e ricorda al posto della memoria di ciascuno, il secondo contatto sui lead caldi è passato da circa ",
      figCapB: "metà dei lead a oltre il 90%",
      figCapC: ". Lo stesso budget speso in acquisizione ora lavora davvero.",
      tiles: [
        { k: "Secondo contatto lead caldi", n: "50%→90%+", p: "Nessun lead pagato resta senza una seconda chiamata." },
        { k: "Tempo di primo richiamo", n: "ore→minuti", p: "Il sistema dice subito chi chiamare, non serve più ricordarselo." },
        { k: "Tasso di chiusura", n: "doppia cifra", p: "Stessa spesa di acquisizione, più firme a parità di lead in ingresso." },
      ],
    },
    cta: {
      eye: "In una riga",
      h2a: "Smetti di pagare lead che nessuno richiama: ogni venditore sa chi chiamare adesso e con quale ",
      h2emph: "mossa",
      h2b: ".",
      p: "Quanti lead caldi stai lasciando raffreddare oggi? Il ROIometro te lo mette in euro.",
      cta1: "Calcola cosa perdi ▸",
      cta2: "Parla con noi",
      altriEye: "Altri casi",
      altri: [
        { cat: "Velocità di vendita", h: "Scalers: la velocità che decide chi chiude prima", link: "Apri il dossier ▸" },
        { cat: "Vendite", h: "Cyberangels: il sales advisor che prepara ogni chiamata", link: "Apri il dossier ▸" },
      ],
    },
  },
  en: {
    metaTitle: "MARF · Hot lead · Morfeus case",
    metaDesc:
      "MARF case #001: an energy sales call center was losing half of its paid leads because no one knew who to call now. Second contact on hot leads from 50% to over 90%.",
    crumbs: { casi: "Cases", label: "MARF · Case #001" },
    tags: ["Energy call center", "Micro-SMB, 12 people", "Action Board"],
    h1a: "Every hot lead you don't call back tonight is ",
    h1emph: "dead",
    h1b: " tomorrow.",
    standfirst:
      "Stop paying for leads no one calls back: every rep knows who to call now and with what move.",
    headstats: [
      { n: "50%→90%+", l: "second contact on hot leads" },
      { n: "hours→minutes", l: "time to first callback" },
      { n: "double-digit", l: "growth in close rate" },
    ],
    stamp: "Confirmed",
    s2: {
      eye: "The house on fire",
      h2a: "Whoever calls first ",
      h2emph: "keeps",
      h2b: " the lead.",
      p1: "The energy lead has a window of just a few hours: you call when they just left their number, or by the time you call back they've already signed with whoever picked them up first. At the reseller, leads piled up in a spreadsheet, everyone called «the ones they remembered», the older ones rotted at the bottom and the promised follow-ups («I'll call them Monday») disappeared.",
      p2a: "It wasn't laziness: no one knew who to call now. Result: half of the leads paid at premium price were never even called a second time. On a team burning acquisition budget every day, ",
      p2emph: "the hot lead left to cool is the most expensive loss",
      p2b: ", and no one saw it happening.",
      figTitle: "The window that cools down",
      figWindow: ["competitors'", "window"],
      figCurve: "lead temperature",
      figY: "urgency",
      figCapA:
        "In the first 2-3 hours the lead is still yours: answers, decides, signs. Past that window the temperature drops and whoever called first has already taken it. ",
      figCapB: "Every hour of delay is a paid lead you gift to the competitor.",
    },
    s3: {
      eye: "Why it stayed unsolved",
      h2a: "The spreadsheet never said who to call ",
      h2emph: "now",
      h2b: ".",
      p1: "Leads piled up in a shared spreadsheet, and everyone worked «the ones they remembered» instead of the truly hot ones. The oldest ones ended up at the bottom and stayed there; the follow-ups promised out loud («I'll call them Monday») lived only in the memory of whoever promised them, and vanished as soon as the day got busy.",
      p2a: "Effort wasn't missing, a system that held the state of every lead and told the next move was. ",
      p2emph: "Without that, priority was decided by chance, not by urgency.",
    },
    s4: {
      eye: "What we built",
      h2a: "One board per rep, one lead at a ",
      h2emph: "time",
      h2b: ".",
      lead: "The lead no longer disappears: it always has a state and a next move, and the system decides who to call now instead of each person's memory.",
      rows: [
        { b: "Personal board per rep", p: "Each rep works only their own leads, without fishing from a shared pile." },
        { b: "Two views, office and street", p: "In the office, a multi-column view by state; on the phone, one lead at a time, no distractions." },
        { b: "The system says who to call now", p: "Priority calculated on real urgency, not on who remembers." },
        { b: "Outcome, state and note in one gesture", p: "Every call records the outcome, changes the lead's state, and keeps the note for the next contact." },
        { b: "Automatic follow-up", p: "The WhatsApp follow-up goes out on its own, no decisions «from memory»." },
      ],
    },
    s5: {
      eye: "The result",
      h2a: "From 50% to over 90% second ",
      h2emph: "contact",
      h2b: ".",
      lead: "Time to first callback dropped from hours to minutes, and the close rate grew by double digits at the same lead volume: same acquisition spend, more signatures.",
      figTitle: "Second contact on hot leads · before and after",
      figLabels: { pre: "before", post: "after", ann: "no lead forgotten anymore" },
      figCapA: "With the board that assigns and remembers instead of each person's memory, second contact on hot leads went from about ",
      figCapB: "half of the leads to over 90%",
      figCapC: ". The same acquisition budget now really works.",
      tiles: [
        { k: "Second contact hot leads", n: "50%→90%+", p: "No paid lead is left without a second call." },
        { k: "Time to first callback", n: "hours→minutes", p: "The system tells you who to call right away, no more remembering." },
        { k: "Close rate", n: "double-digit", p: "Same acquisition spend, more signatures at the same lead volume." },
      ],
    },
    cta: {
      eye: "In one line",
      h2a: "Stop paying for leads no one calls back: every rep knows who to call now and with what ",
      h2emph: "move",
      h2b: ".",
      p: "How many hot leads are you letting cool down today? The ROIometro puts it in euros.",
      cta1: "Calculate what you lose ▸",
      cta2: "Talk to us",
      altriEye: "Other cases",
      altri: [
        { cat: "Sales velocity", h: "Scalers: the speed that decides who closes first", link: "Open the dossier ▸" },
        { cat: "Sales", h: "Cyberangels: the sales advisor that prepares every call", link: "Open the dossier ▸" },
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
    alternates: buildLocaleAlternates("casi/marf-lead-caldo", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "article",
      url: `${SITE_URL}/${safeLocale}/casi/marf-lead-caldo`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function CasoMarfLeadCaldoPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  const url = `${SITE_URL}/${safeLocale}/casi/marf-lead-caldo`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: isIt
      ? "Ogni lead caldo che non richiami stasera, domani è morto"
      : "Every hot lead you don't call back tonight is dead tomorrow",
    description: t.metaDesc,
    url,
    inLanguage: isIt ? "it-IT" : "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    author: { "@id": ORGANIZATION_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: url,
  };

  // Palette shared with mockup
  const C = {
    firma: "#533DFC",
    lilla: "#8CA5F7",
    ombra: "#7E8091",
    anom: "#FF5C5C",
    ok: "#1E9E5A",
    ink: "#0B0B0C",
    gridInk: "rgba(140,165,247,.15)",
    gridCarta: "rgba(11,11,12,.08)",
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
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.08em", color: C.ombra }}
          >
            <Link href={`${base}/casi`} style={{ color: C.lilla }}>
              {t.crumbs.casi}
            </Link>{" "}
            · {t.crumbs.label}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 22 }}>
            {t.tags.map((tag) => (
              <span
                key={tag}
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: C.lilla,
                  border: `1px solid rgba(140,165,247,.3)`,
                  borderRadius: 999,
                  padding: "4px 11px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ marginTop: 16, maxWidth: "17ch" }}>
            {t.h1a}
            <span className="emph">{t.h1emph}</span>
            {t.h1b}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-emph)",
              fontStyle: "italic",
              fontSize: "clamp(18px,2.2vw,24px)",
              color: "#c2c6d4",
              maxWidth: "56ch",
              marginTop: 12,
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
                  className="gain"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(26px,3.4vw,36px)",
                    lineHeight: 1,
                    color: C.ok,
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
                    color: C.ombra,
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
          <div className="eye">{t.s2.eye}</div>
          <h2 className="h-sect">
            {t.s2.h2a}
            <span className="emph">{t.s2.h2emph}</span>
            {t.s2.h2b}
          </h2>
          <div style={{ fontSize: 17, lineHeight: 1.65 }}>
            <p style={{ marginTop: 14, color: "#23222e" }}>{t.s2.p1}</p>
            <p style={{ marginTop: 14, color: "#23222e" }}>
              {t.s2.p2a}
              <span className="emph">{t.s2.p2emph}</span>
              {t.s2.p2b}
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
              color: C.firma,
            }}
          >
            {t.s2.figTitle}
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
              viewBox="0 0 720 300"
              role="img"
              aria-label={t.s2.figTitle}
              style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
            >
              <line x1="60" y1="30" x2="60" y2="240" stroke="rgba(11,11,12,.22)" />
              <line x1="60" y1="240" x2="680" y2="240" stroke="rgba(11,11,12,.22)" />
              <g stroke={C.gridCarta}>
                <line x1="60" y1="90" x2="680" y2="90" />
                <line x1="60" y1="140" x2="680" y2="140" />
                <line x1="60" y1="190" x2="680" y2="190" />
              </g>
              <rect x="60" y="30" width="80" height="210" fill="rgba(255,92,92,.08)" />
              <line
                x1="140"
                y1="30"
                x2="140"
                y2="240"
                stroke={C.anom}
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <text
                x="100"
                y="150"
                textAnchor="middle"
                fill={C.anom}
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="600"
              >
                {t.s2.figWindow[0]}
              </text>
              <text
                x="100"
                y="164"
                textAnchor="middle"
                fill={C.anom}
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="600"
              >
                {t.s2.figWindow[1]}
              </text>
              <path
                d="M60,50 C90,54 120,80 140,100 C180,130 220,175 260,190 C380,225 520,236 680,238 L680,240 L60,240 Z"
                fill="rgba(83,61,252,.08)"
              />
              <path
                d="M60,50 C90,54 120,80 140,100 C180,130 220,175 260,190 C380,225 520,236 680,238"
                fill="none"
                stroke={C.firma}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="60" cy="50" r="4" fill={C.firma} />
              <circle cx="140" cy="100" r="4" fill={C.anom} />
              <circle cx="680" cy="238" r="4" fill={C.ombra} />
              <g fontFamily="var(--font-mono)" fontSize="11" fill={C.ombra} textAnchor="middle">
                <text x="60" y="260">0h</text>
                <text x="200" y="260">4h</text>
                <text x="340" y="260">8h</text>
                <text x="480" y="260">14h</text>
                <text x="620" y="260">20h</text>
                <text x="680" y="260">24h</text>
              </g>
              <text
                x="30"
                y="35"
                fill={C.ombra}
                fontFamily="var(--font-mono)"
                fontSize="10"
                transform="rotate(-90 30 35)"
                textAnchor="end"
              >
                {t.s2.figY}
              </text>
              <text
                x="150"
                y="92"
                fill={C.firma}
                fontFamily="var(--font-mono)"
                fontSize="12"
                fontWeight="600"
              >
                {t.s2.figCurve}
              </text>
            </svg>
            <p
              style={{
                marginTop: 14,
                fontSize: 14,
                maxWidth: "64ch",
                color: "#3a3b45",
              }}
            >
              {t.s2.figCapA}
              <b style={{ color: C.ink }}>{t.s2.figCapB}</b>
            </p>
          </div>
        </div>
      </section>

      {/* 03 · PERCHÉ RESTAVA IRRISOLTO · INCHIOSTRO */}
      <section className="band ink">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eye">{t.s3.eye}</div>
          <h2 className="h-sect">
            {t.s3.h2a}
            <span className="emph">{t.s3.h2emph}</span>
            {t.s3.h2b}
          </h2>
          <div style={{ fontSize: 17, lineHeight: 1.65 }}>
            <p style={{ marginTop: 14, color: "#c3c1d6" }}>{t.s3.p1}</p>
            <p style={{ marginTop: 14, color: "#c3c1d6" }}>
              {t.s3.p2a}
              <span className="emph">{t.s3.p2emph}</span>
            </p>
          </div>
        </div>
      </section>

      {/* 04 · COSA ABBIAMO COSTRUITO · CARTA */}
      <section className="band carta">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eye">{t.s4.eye}</div>
          <h2 className="h-sect">
            {t.s4.h2a}
            <span className="emph">{t.s4.h2emph}</span>
            {t.s4.h2b}
          </h2>
          <p className="lead">{t.s4.lead}</p>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
            {t.s4.rows.map((r, i) => (
              <div
                key={i}
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
                  style={{ fontSize: 12, color: C.firma, paddingTop: 3 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <b
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 17,
                      color: C.ink,
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
          <div className="eye">{t.s5.eye}</div>
          <h2 className="h-sect">
            {t.s5.h2a}
            <span className="emph">{t.s5.h2emph}</span>
            {t.s5.h2b}
          </h2>
          <p className="lead">{t.s5.lead}</p>
        </div>
        <div className="wrap" style={{ marginTop: 40 }}>
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 14,
              color: C.lilla,
            }}
          >
            {t.s5.figTitle}
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
              viewBox="0 0 460 260"
              role="img"
              aria-label={t.s5.figTitle}
              style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
            >
              <line x1="40" y1="205" x2="420" y2="205" stroke="rgba(140,165,247,.3)" />
              <g stroke={C.gridInk}>
                <line x1="40" y1="155" x2="420" y2="155" />
                <line x1="40" y1="105" x2="420" y2="105" />
                <line x1="40" y1="55" x2="420" y2="55" />
              </g>
              <rect x="100" y="105" width="90" height="100" rx="4" fill={C.ombra} />
              <rect x="270" y="35" width="90" height="170" rx="4" fill={C.ok} />
              <text
                x="145"
                y="92"
                textAnchor="middle"
                fill="#c2c6d4"
                fontFamily="var(--font-mono)"
                fontSize="15"
                fontWeight="600"
              >
                ~50%
              </text>
              <text
                x="315"
                y="22"
                textAnchor="middle"
                fill={C.ok}
                fontFamily="var(--font-mono)"
                fontSize="15"
                fontWeight="600"
              >
                90%+
              </text>
              <g
                fontFamily="var(--font-mono)"
                fontSize="12"
                fill="#c2c6d4"
                textAnchor="middle"
              >
                <text x="145" y="228">{t.s5.figLabels.pre}</text>
                <text x="315" y="228">{t.s5.figLabels.post}</text>
              </g>
              <path d="M200,150 L265,90" stroke={C.lilla} strokeWidth="1.5" fill="none" />
              <text
                x="232"
                y="112"
                textAnchor="middle"
                fill={C.lilla}
                style={{ fontFamily: "var(--font-emph)", fontStyle: "italic" }}
                fontSize="14"
                transform="rotate(-28 232 112)"
              >
                {t.s5.figLabels.ann}
              </text>
            </svg>
            <p
              style={{
                marginTop: 14,
                fontSize: 14,
                maxWidth: "64ch",
                color: "#c2c6d4",
              }}
            >
              {t.s5.figCapA}
              <b style={{ color: "var(--carta)" }}>{t.s5.figCapB}</b>
              {t.s5.figCapC}
            </p>
          </div>
        </div>
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginTop: 24,
            }}
          >
            {t.s5.tiles.map((tile, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid var(--riga-scuro)",
                  background: "rgba(255,255,255,.02)",
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
                    color: C.ombra,
                  }}
                >
                  {tile.k}
                </div>
                <div
                  className="gain"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(28px,3.6vw,40px)",
                    lineHeight: 1,
                    margin: "10px 0 6px",
                    color: C.ok,
                  }}
                >
                  {tile.n}
                </div>
                <p style={{ fontSize: 13, color: "#c2c6d4" }}>{tile.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · CTA + ALTRI CASI · INCHIOSTRO */}
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
            {t.cta.altriEye}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 18,
              marginTop: 24,
              textAlign: "left",
            }}
          >
            {t.cta.altri.map((a, i) => (
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
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.lilla,
                  }}
                >
                  {a.cat}
                </span>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    margin: "8px 0 10px",
                    color: "var(--carta)",
                  }}
                >
                  {a.h}
                </h3>
                <span className="btn btn-3">{a.link}</span>
              </span>
            ))}
          </div>
          <p style={{ marginTop: 22, textAlign: "left" }}>
            <Link className="btn btn-3" href={`${base}/casi`}>
              {isIt ? "Vedi tutti i casi ▸" : "See all cases ▸"}
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
