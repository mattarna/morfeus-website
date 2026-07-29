import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "@/components/site";
import "@/components/pagine/kit.css";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { ORGANIZATION_ID, WEBSITE_ID, SITE_URL } from "@/lib/seo/entity-ids";

/* ============================================================
   CHI SIAMO. Rifatta sul copy approvato 2026-07-28.
   ------------------------------------------------------------
   RITMO del brief: identita', criterio, personalita', persone,
   prova, azione. Le fasce seguono la direzione visiva riga per riga,
   compresa la CTA, che qui il brief vuole "chiara o neutra" ed e'
   l'unica pagina che chiude sulla carta.

   I RUOLI dei quattro founder sono quelli del copy approvato (CEO &
   Growth, Head of Product & Delivery, Operations & Partnership,
   CTO), non quelli generici di src/app/lib/team-data.ts, che dice
   ancora "Co-founder" per tre persone su quattro. Le FOTO invece
   arrivano da li': sono le stesse del resto del sito.
   ============================================================ */

type Props = { params: { locale: string } };

const FOTO = {
  arnaboldi: "/images/team/Profile-matt.jpg",
  carofiglio: "/images/team/Profile-alex.webp",
  zin: "/images/team/Profile-Simo.webp",
  alvazzi: "/images/team/Profile-matteo-alvazzi.webp",
} as const;

const COPY = {
  it: {
    metaTitle: "Chi siamo · AI Operating Partner | Morfeus",
    metaDesc:
      "Morfeus è un AI Operating Partner: entriamo nei processi dove valore, tempo e sapere si disperdono, costruiamo i sistemi che li rendono utilizzabili e lavoriamo col team finché diventano operatività.",
    hero: {
      eye: "Chi siamo",
      h1a: "Non ci interessa parlare di AI. Ci interessa ",
      h1emph: "farla funzionare",
      h1b: ".",
      copy: "Morfeus è un AI Operating Partner. Entriamo nei processi in cui valore, tempo e sapere si stanno disperdendo, costruiamo sistemi che li rendono utilizzabili e lavoriamo con il team finché diventano parte dell'operatività.",
      micro: "Sì, anche dopo che la demo ha smesso di fare effetto.",
    },
    cosa: {
      eye: "Un partner operativo, non un fornitore di tool",
      h2a: "Mettiamo insieme strategia, ",
      h2emph: "sistemi e persone",
      h2b: ".",
      p1: "Un'azienda non cambia perché compra un software. Cambia quando identifica un problema reale, costruisce un sistema che lo risolve e mette le persone nelle condizioni di usarlo ogni giorno.",
      p2: "Morfeus lavora su tutte e tre le parti. Troviamo il Value Leak, progettiamo il sistema AI o operativo che lo chiude e formiamo le persone che lo renderanno utile nel tempo.",
      p3: "Non consegniamo una strategia da presentare al board. Costruiamo ciò che deve funzionare dentro l'azienda.",
      vertici: ["Strategia", "Sistemi", "Persone"],
      callout:
        "Una demo che funziona davanti a tre persone in call non è ancora un sistema. È una demo che funziona davanti a tre persone in call.",
    },
    perche: {
      eye: "Il problema non è mai solo tecnologico",
      h2a: "Il valore si perde nei passaggi ",
      h2emph: "che nessuno guarda",
      h2b: ".",
      p1: "Si perde quando una persona deve rifare un lavoro che esiste già. Quando un'informazione resta bloccata in una chat, in un file o nella testa di chi è più esperto. Quando marketing, vendite, amministrazione e delivery lavorano su versioni diverse della stessa realtà.",
      p2: "Ogni perdita, presa da sola, sembra gestibile. Insieme rallentano le decisioni, sovraccaricano il team e comprimono il margine.",
      p3: "Noi le chiamiamo Value Leak. Perché ciò che non ha un nome e un numero non viene mai risolto davvero.",
      frammenti: [
        { r: "Lavoro rifatto", d: "Esisteva già", m: "nessuno lo sapeva" },
        { r: "Informazione", d: "Ferma in una chat", m: "irrecuperabile" },
        { r: "Sapere", d: "Nella testa di uno", m: "non trasferibile" },
        { r: "Reparti", d: "Versioni diverse", m: "della stessa realtà" },
      ],
    },
    criterio: {
      eye: "Tre convinzioni che guidano il nostro lavoro",
      h2a: "Il criterio prima del ",
      h2emph: "codice",
      h2b: ".",
      colonne: [
        { n: "01", t: "L'AI non risolve un processo che non hai capito.", p: "Prima del tool c'è sempre una domanda: dove si sta perdendo valore? Se non sappiamo rispondere, non ha senso costruire niente." },
        { n: "02", t: "Le persone non sono il collo di bottiglia.", p: "Le persone che conoscono il lavoro sono la fonte del sistema. L'AI serve a rendere il loro sapere disponibile, replicabile e più utile a tutto il team. Non a sostituirle." },
        { n: "03", t: "Se non si vede nel lavoro, non è un risultato.", p: "Un progetto non vale perché una demo è andata bene. Vale quando entra nei processi reali, viene adottato dalle persone e produce un miglioramento che si può verificare." },
      ],
    },
    allarmi: {
      eye: "Cose che ci mettono subito in allarme",
      frasi: ["«Basta un prompt.»", "«L'AI fa tutto.»", "«Poi la usano da soli.»"],
      p: "Di solito è il momento in cui iniziano i problemi. Un sistema utile ha un processo, un contesto, persone coinvolte e un modo per capire quando sta sbagliando. Il resto è entusiasmo. Che va benissimo, ma non paga le inefficienze.",
    },
    standard: {
      eye: "Non chiediamo fiducia cieca",
      h2a: "Un sistema affidabile sa anche dire: ",
      h2emph: "non ho abbastanza dati",
      h2b: ".",
      p1: "L'AI può produrre una risposta credibile anche quando non ha elementi sufficienti per farlo. Per questo non costruiamo sistemi che riempiono i vuoti con sicurezza apparente.",
      p2: "Lavoriamo perché ogni output abbia contesto, regole e un modo per essere verificato. Quando un dato manca, il sistema deve renderlo visibile. Quando una decisione ha bisogno di una persona, deve lasciarla alla persona.",
      p3: "Questa è la differenza tra automazione e responsabilità.",
      testaNo: "Dato insufficiente",
      testaSi: "Dato sufficiente",
      righe: [
        ["Risponde comunque, con sicurezza", "Dichiara cosa manca"],
        ["Riempie i vuoti con plausibilità", "Mostra il contesto su cui ha deciso"],
        ["Nessun modo di verificarlo", "Regole visibili, output controllabile"],
        ["Decide al posto della persona", "Lascia la decisione a chi risponde"],
      ],
      micro: "L'AI che sembra sicura di tutto è spesso quella da controllare di più. Vale anche per le persone, ma con loro è più facile parlarne.",
    },
    persone: {
      eye: "Chi ci mette la faccia",
      h2a: "Un team che unisce business, ",
      h2emph: "operations e prodotto",
      h2b: ".",
      lista: [
        { nome: "Matteo Arnaboldi", ruolo: "CEO & Growth", foto: FOTO.arnaboldi, bio: "Trasforma problemi vaghi in priorità su cui vale la pena mettere persone, tempo e budget. Ha una certa allergia alle frasi che iniziano con «dobbiamo fare qualcosa con l'AI»." },
        { nome: "Alex Carofiglio", ruolo: "Head of Product & Delivery", foto: FOTO.carofiglio, bio: "Se una cosa non arriva in produzione, per lui non è ancora una cosa. È, al massimo, una promessa con una bella interfaccia." },
        { nome: "Simone Zin", ruolo: "Operations & Partnership", foto: FOTO.zin, bio: "Tiene insieme persone, partnership e i dettagli che fanno la differenza tra «partiamo» e «funziona». Il secondo è notoriamente più difficile." },
        { nome: "Matteo Alvazzi", ruolo: "CTO", foto: FOTO.alvazzi, bio: "Costruisce l'architettura. Di solito intercetta il problema prima che diventi una call urgente. Se non lo intercetta, probabilmente è già al lavoro per risolverlo." },
      ],
    },
    prova: {
      eye: "Non chiediamo di essere creduti",
      h2a: "Un sistema va giudicato da ciò che ",
      h2emph: "cambia nel lavoro",
      h2b: ".",
      p1: "Per questo raccontiamo i casi partendo dal problema, non dalla tecnologia usata. Mostriamo il Value Leak, il sistema costruito e ciò che è cambiato per il team e per l'azienda.",
      p2: "Non tutti i problemi sono uguali. Il criterio con cui li affrontiamo sì.",
      readout: "Estratto · dossier reale",
      stato: "Confermato",
      passi: ["Value leak", "Sistema", "Valore"],
      stazioni: [
        "Il sapere tecnico restava separato da chi doveva usarlo.",
        "Le informazioni diventano un brief operativo, con regole e controlli.",
        "Meno passaggi. Più autonomia. Una conversazione che parte dal contesto giusto.",
      ],
      cta: "Vedi i casi reali",
    },
    cta: {
      eye: "Il primo confronto non è un pitch",
      h2a: "Prima capiamo dove si sta perdendo valore. Poi decidiamo se ",
      h2emph: "possiamo recuperarlo",
      h2b: ".",
      p: "Prenota una call di diagnosi. Guardiamo il problema, il processo e le persone coinvolte. Se esiste un Value Leak su cui possiamo intervenire, saprai quale sistema ha senso costruire e perché.",
      btn: "Prenota una call di diagnosi",
    },
    faq: {
      eye: "Domande",
      titolo: "Morfeus, in chiaro.",
      voci: [
        { q: "Chi è Morfeus?", a: "Morfeus è un AI Operating Partner che aiuta le aziende a individuare perdite operative di valore, costruire sistemi AI e rendere le persone autonome nell'usarli dentro i processi reali." },
        { q: "Cosa fa Morfeus?", a: "Morfeus parte dai Value Leak nei processi aziendali, progetta sistemi AI e operativi per ridurli, forma il team e misura nel tempo il valore recuperato." },
        { q: "Cos'è un AI Operating Partner?", a: "Un AI Operating Partner non si limita a consigliare una tecnologia. Lavora insieme all'azienda per identificare un problema operativo, costruire il sistema che lo risolve e renderlo parte del lavoro quotidiano." },
        { q: "Morfeus sostituisce le persone con l'AI?", a: "No. Morfeus usa l'AI per togliere lavoro inefficiente, rendere il know-how disponibile e aumentare l'autonomia delle persone. Il team resta centrale nella progettazione e nell'evoluzione dei sistemi." },
      ],
    },
  },
  en: {
    metaTitle: "About us · AI Operating Partner | Morfeus",
    metaDesc:
      "Morfeus is an AI Operating Partner: we go into the workflows where value, time and know-how leak away, build the systems that make them usable and work with the team until they become operations.",
    hero: {
      eye: "About us",
      h1a: "We are not interested in talking about AI. We are interested in ",
      h1emph: "making it work",
      h1b: ".",
      copy: "Morfeus is an AI Operating Partner. We go into the workflows where value, time and know-how are leaking away, build systems that make them usable and work with the team until they become part of day-to-day operations.",
      micro: "Yes, even after the demo has stopped being impressive.",
    },
    cosa: {
      eye: "An operating partner, not a tool vendor",
      h2a: "We bring together strategy, ",
      h2emph: "systems and people",
      h2b: ".",
      p1: "A company does not change because it buys software. It changes when it identifies a real problem, builds a system that solves it and gives people the conditions to use it every day.",
      p2: "Morfeus works across all three. We find the Value Leak, design the AI or operating system that closes it and train the people who will keep it useful over time.",
      p3: "We do not hand over a strategy for the board to discuss. We build what needs to work inside the company.",
      vertici: ["Strategy", "Systems", "People"],
      callout:
        "A demo that works in a call with three people is not a system yet. It is a demo that works in a call with three people.",
    },
    perche: {
      eye: "The problem is never only technological",
      h2a: "Value leaks out through the handoffs ",
      h2emph: "no one sees",
      h2b: ".",
      p1: "It leaks when someone repeats work that already exists. When information is trapped in a chat, a file or the head of the most experienced person. When marketing, sales, administration and delivery work from different versions of the same reality.",
      p2: "Each loss looks manageable on its own. Together, they slow decisions, overload teams and compress margin.",
      p3: "We call them Value Leaks. Because what has no name and no number rarely gets fixed.",
      frammenti: [
        { r: "Repeated work", d: "It already existed", m: "no one knew" },
        { r: "Information", d: "Stuck in a chat", m: "unrecoverable" },
        { r: "Know-how", d: "In one person's head", m: "not transferable" },
        { r: "Departments", d: "Different versions", m: "of the same reality" },
      ],
    },
    criterio: {
      eye: "The principles we work by",
      h2a: "The criterion before the ",
      h2emph: "code",
      h2b: ".",
      colonne: [
        { n: "01", t: "AI cannot fix a workflow you do not understand.", p: "Before the tool, there is always one question: where is value being lost? If we cannot answer that, there is no point building anything." },
        { n: "02", t: "People are not the bottleneck.", p: "The people who know the work are the source of the system. AI makes their know-how available, repeatable and more useful to the whole team. It does not replace them." },
        { n: "03", t: "If it does not show up in the work, it is not a result.", p: "A project is not valuable because a demo went well. It is valuable when it enters real workflows, is adopted by people and produces an improvement that can be verified." },
      ],
    },
    allarmi: {
      eye: "Things that set off an alarm",
      frasi: ["“One prompt is all you need.”", "“AI does everything.”", "“The team will figure it out.”"],
      p: "This is usually where the problems begin. A useful system has a workflow, context, people involved and a way of knowing when it is wrong. The rest is enthusiasm. Enthusiasm is great, but it does not pay for inefficiency.",
    },
    standard: {
      eye: "We do not ask for blind trust",
      h2a: "A reliable system knows how to say: ",
      h2emph: "I do not have enough data",
      h2b: ".",
      p1: "AI can produce a convincing answer even when it does not have enough evidence to do so. That is why we do not build systems that fill gaps with false confidence.",
      p2: "Every output needs context, rules and a way to be checked. When data is missing, the system should make that visible. When a decision needs a person, it should leave that decision to the person.",
      p3: "That is the difference between automation and responsibility.",
      testaNo: "Not enough data",
      testaSi: "Enough data",
      righe: [
        ["Answers anyway, confidently", "States what is missing"],
        ["Fills gaps with plausibility", "Shows the context it decided on"],
        ["No way to check it", "Visible rules, checkable output"],
        ["Decides for the person", "Leaves the decision to whoever answers for it"],
      ],
      micro: "The AI that sounds certain about everything is usually the one worth checking most closely. The same is true of people, but they are easier to talk to.",
    },
    persone: {
      eye: "The people who put their name on the work",
      h2a: "A team that brings together business, ",
      h2emph: "operations and product",
      h2b: ".",
      lista: [
        { nome: "Matteo Arnaboldi", ruolo: "CEO & Growth", foto: FOTO.arnaboldi, bio: "Turns vague problems into priorities worth putting people, time and budget behind. Has a healthy allergy to sentences that begin with “we should do something with AI”." },
        { nome: "Alex Carofiglio", ruolo: "Head of Product & Delivery", foto: FOTO.carofiglio, bio: "If something does not reach production, it is not really a thing yet. At best, it is a promise with a good-looking interface." },
        { nome: "Simone Zin", ruolo: "Operations & Partnerships", foto: FOTO.zin, bio: "Holds together people, partnerships and the details that separate “we have started” from “it works”. The latter is notoriously harder." },
        { nome: "Matteo Alvazzi", ruolo: "CTO", foto: FOTO.alvazzi, bio: "Builds the architecture. Usually finds the problem before it becomes an urgent call. If he does not, he is probably already fixing it." },
      ],
    },
    prova: {
      eye: "We do not ask to be believed",
      h2a: "A system should be judged by what it ",
      h2emph: "changes in the work",
      h2b: ".",
      p1: "That is why we tell cases from the problem, not from the technology used. We show the Value Leak, the system built and what changed for the team and the company.",
      p2: "Not all problems are alike. The criterion we use on them is.",
      readout: "Extract · real dossier",
      stato: "Confirmed",
      passi: ["Value leak", "System", "Value"],
      stazioni: [
        "Technical knowledge was separated from the people who needed to use it.",
        "Information becomes an operational brief, with rules and controls built in.",
        "Fewer handoffs. More autonomy. A conversation that starts from the right context.",
      ],
      cta: "View real cases",
    },
    cta: {
      eye: "The first conversation is not a pitch",
      h2a: "First we find where value is being lost. Then we decide whether ",
      h2emph: "we can recover it",
      h2b: ".",
      p: "Book a diagnostic call. We look at the problem, the workflow and the people involved. If there is a Value Leak we can address, you will know what system makes sense to build and why.",
      btn: "Book a diagnostic call",
    },
    faq: {
      eye: "Questions",
      titolo: "Morfeus, in plain terms.",
      voci: [
        { q: "Who is Morfeus?", a: "Morfeus is an AI Operating Partner that helps companies identify operating value losses, build AI systems and make teams autonomous in using them inside real workflows." },
        { q: "What does Morfeus do?", a: "Morfeus starts with Value Leaks in company workflows, designs AI and operating systems to reduce them, trains the team and measures the value recovered over time." },
        { q: "What is an AI Operating Partner?", a: "An AI Operating Partner does more than advise on technology. It works with a company to identify an operating problem, build the system that addresses it and make it part of daily work." },
        { q: "Does Morfeus replace people with AI?", a: "No. Morfeus uses AI to remove inefficient work, make know-how available and increase people's autonomy. The team stays central to designing and evolving the systems." },
      ],
    },
  },
} as const;

/* Il triangolo: strategia, sistemi e persone sono interconnessi, e
   una figura lo dice meglio di tre riquadri affiancati. */
function Triade({ vertici }: { vertici: readonly string[] }) {
  const punti = [
    { x: 260, y: 44 },
    { x: 68, y: 250 },
    { x: 452, y: 250 },
  ];
  return (
    <svg viewBox="0 0 520 300" className="triade" role="img" aria-label={vertici.join(", ")}>
      <polygon
        points={punti.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="var(--lavoro)"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      {punti.map((p, i) => (
        <g key={vertici[i]}>
          <circle cx={p.x} cy={p.y} r="5" fill="var(--lavoro)" />
          <text
            x={p.x}
            y={i === 0 ? p.y - 20 : p.y + 32}
            textAnchor="middle"
            fill="currentColor"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              letterSpacing: "0.14em",
            }}
          >
            {vertici[i]?.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("chi-siamo", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/chi-siamo`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default function ChiSiamoPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/${safeLocale}/chi-siamo#aboutpage`,
        url: `${SITE_URL}/${safeLocale}/chi-siamo`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      ...t.persone.lista.map((p) => ({
        "@type": "Person",
        name: p.nome,
        jobTitle: p.ruolo,
        image: `${SITE_URL}${p.foto}`,
        worksFor: { "@id": ORGANIZATION_ID },
      })),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${safeLocale}/chi-siamo#faq`,
        mainEntity: t.faq.voci.map((v) => ({
          "@type": "Question",
          name: v.q,
          acceptedAnswer: { "@type": "Answer", text: v.a },
        })),
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

      {/* 01 · HERO · ink, nessun visual tecnologico */}
      <section className="band ink hero pg" id="hero">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="copy">{t.hero.copy}</p>
          <p className="compound" style={{ marginTop: 34 }}>
            {t.hero.micro}
          </p>
        </div>
      </section>

      {/* 02 · COSA SIAMO · CARTA, i tre elementi interconnessi */}
      <section className="band carta pg" id="cosa-siamo">
        <div className="wrap">
          <div className="eye">{t.cosa.eye}</div>
          <h2 className="h-sect">
            {t.cosa.h2a}
            <span className="emph">{t.cosa.h2emph}</span>
            {t.cosa.h2b}
          </h2>
          <p className="lead">{t.cosa.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.cosa.p2}
          </p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.cosa.p3}
          </p>

          <Triade vertici={t.cosa.vertici} />

          <p className="compound centrato" style={{ marginTop: 10 }}>
            {t.cosa.callout}
          </p>
        </div>
      </section>

      {/* 03 · PERCHE' ESISTIAMO · ink, i passaggi che perdono contesto */}
      <section className="band ink pg" id="perche">
        <div className="wrap">
          <div className="eye">{t.perche.eye}</div>
          <h2 className="h-sect">
            {t.perche.h2a}
            <span className="emph">{t.perche.h2emph}</span>
            {t.perche.h2b}
          </h2>
          <p className="lead">{t.perche.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.perche.p2}
          </p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.perche.p3}
          </p>

          <div className="frammenti">
            {t.perche.frammenti.map((f) => (
              <div className="frammento" key={f.r}>
                <div className="reparto">{f.r}</div>
                <div className="dato">{f.d}</div>
                <span className="monco">{f.m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · IL CRITERIO · ink, tre blocchi editoriali */}
      <section className="band ink pg" id="criterio">
        <div className="wrap">
          <div className="eye">{t.criterio.eye}</div>
          <h2 className="h-sect">
            {t.criterio.h2a}
            <span className="emph">{t.criterio.h2emph}</span>
            {t.criterio.h2b}
          </h2>
          <div className="colonne">
            {t.criterio.colonne.map((c) => (
              <div className="colonna" key={c.n}>
                <span className="cifra-fondo" aria-hidden="true">
                  {c.n}
                </span>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · GLI ALLARMI · CARTA, dichiarazioni grandi */}
      <section className="band carta pg" id="allarmi">
        <div className="wrap">
          <div className="eye">{t.allarmi.eye}</div>
          <div className="negazioni">
            {t.allarmi.frasi.map((f) => (
              <div className="negazione" key={f}>
                <span className="taglio" aria-hidden="true" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <p className="lead" style={{ marginTop: 36 }}>
            {t.allarmi.p}
          </p>
        </div>
      </section>

      {/* 06 · LO STANDARD · ink, dato sufficiente e insufficiente */}
      <section className="band ink pg" id="standard">
        <div className="wrap">
          <div className="eye">{t.standard.eye}</div>
          <h2 className="h-sect">
            {t.standard.h2a}
            <span className="emph">{t.standard.h2emph}</span>
            {t.standard.h2b}
          </h2>
          <p className="lead">{t.standard.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.standard.p2}
          </p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.standard.p3}
          </p>

          <div className="confronto">
            <div className="colonna-testa">{t.standard.testaNo}</div>
            <div className="colonna-testa si">{t.standard.testaSi}</div>
            {t.standard.righe.map(([no, si]) => (
              <RigaConfronto key={si} no={no} si={si} />
            ))}
          </div>

          <p className="compound" style={{ marginTop: 34 }}>
            {t.standard.micro}
          </p>
        </div>
      </section>

      {/* 07 · LE PERSONE · CARTA, foto vere */}
      <section className="band carta pg" id="persone">
        <div className="wrap">
          <div className="eye">{t.persone.eye}</div>
          <h2 className="h-sect">
            {t.persone.h2a}
            <span className="emph">{t.persone.h2emph}</span>
            {t.persone.h2b}
          </h2>

          <div className="persone">
            {t.persone.lista.map((p) => (
              <div className="persona" key={p.nome}>
                <Image
                  src={p.foto}
                  alt={p.nome}
                  width={264}
                  height={264}
                  className="ritratto"
                />
                <div>
                  <div className="nome">{p.nome}</div>
                  <span className="ruolo">{p.ruolo}</span>
                  <p>{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 · LA PROVA · ink, estratto da dossier reale */}
      <section className="band ink pg" id="prova">
        <div className="wrap">
          <div className="eye">{t.prova.eye}</div>
          <h2 className="h-sect">
            {t.prova.h2a}
            <span className="emph">{t.prova.h2emph}</span>
            {t.prova.h2b}
          </h2>
          <p className="lead">{t.prova.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.prova.p2}
          </p>

          <div className="quadro" style={{ marginTop: 40 }}>
            <div className="readout">
              <span>{t.prova.readout}</span>
              <span className="on">
                <i />
                {t.prova.stato}
              </span>
            </div>
            <div className="dossier dossier-tre">
              {t.prova.stazioni.map((s, i) => (
                <div className="stazione" key={s}>
                  <div className="passo">{t.prova.passi[i]}</div>
                  <div className="valore">{s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-row">
            <Link className="btn btn-1" href={`${base}/casi`}>
              {t.prova.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 09 · CTA · CARTA, il brief la vuole chiara o neutra */}
      <section className="band carta pg" id="cta">
        <div className="wrap">
          <div className="ctaq">
            <div className="eye justify-center">{t.cta.eye}</div>
            <h2 className="h-sect">
              {t.cta.h2a}
              <span className="emph">{t.cta.h2emph}</span>
              {t.cta.h2b}
            </h2>
            <p>{t.cta.p}</p>
            <div className="cta-row centrata">
              <Link className="btn btn-1" href={`${base}/roiometro`}>
                {t.cta.btn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10 · FAQ · ink */}
      <section className="band ink pg" id="faq">
        <div className="wrap">
          <div className="eye">{t.faq.eye}</div>
          <h2 className="h-sect">{t.faq.titolo}</h2>
          <div className="two" style={{ marginTop: 34, alignItems: "start" }}>
            {[t.faq.voci.slice(0, 2), t.faq.voci.slice(2)].map((colonna, i) => (
              <div key={i}>
                {colonna.map((v) => (
                  <details className="faq" key={v.q}>
                    <summary>
                      <span>{v.q}</span>
                      <span className="segno" aria-hidden="true" />
                    </summary>
                    <p className="risposta">{v.a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function RigaConfronto({ no, si }: { no: string; si: string }) {
  return (
    <>
      <div className="riga-no">{no}</div>
      <div className="riga-si">{si}</div>
    </>
  );
}
