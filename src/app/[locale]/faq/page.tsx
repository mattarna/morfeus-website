import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

type QA = { id: string; q: string; a: string };
type Group = { anchor: string; title: string; items: QA[] };

const COPY = {
  it: {
    metaTitle: "Domande frequenti — Morfeus",
    metaDesc:
      "Domande frequenti su Morfeus: chi siamo, il metodo (Value Leak, MARF, ROIometro, Value Report), il modello Pilot to Retainer, prezzi, dati e sicurezza, formazione e AI Champion.",
    hero: {
      eye: "Domande frequenti",
      h1a: "Le risposte, ",
      h1emph: "senza giri",
      h1b: " di parole.",
      copy: "Chi siamo, come lavoriamo, come misuriamo il valore e cosa aspettarsi da un Operating Partner.",
      catsLabel: "Vai a una categoria",
    },
    groups: [
      {
        anchor: "generale",
        title: "Generale",
        items: [
          {
            id: "cos-e-morfeus",
            q: "Cos'è Morfeus?",
            a: "Morfeus è l'Operating Partner AI delle aziende in scaling. Entriamo nei processi, troviamo dove si perde margine ogni giorno (i Value Leak), costruiamo i sistemi di AI che lo recuperano e misuriamo il valore generato in euro, ogni mese.",
          },
          {
            id: "cosa-significa-operating-partner",
            q: 'Cosa significa "Operating Partner"?',
            a: "È il nostro modello: un team AI embedded che lavora dentro l'azienda con ownership diretta sui risultati, misurata mese per mese. Non un'agenzia, non una consulenza a progetto, non un vendor.",
          },
          {
            id: "per-chi-e-morfeus",
            q: "Per chi è Morfeus?",
            a: "Per le aziende in fase di scaling che, mentre crescono, stanno perdendo margine in modo invisibile. Parliamo soprattutto a CEO, COO e CFO.",
          },
          {
            id: "cosa-non-e-morfeus",
            q: "Cosa NON è Morfeus?",
            a: "Non un'AI agency, non un corsificio, non una software house che vende licenze. Restiamo dentro i processi e ci misuriamo sul valore che generiamo.",
          },
          {
            id: "control-system-as-a-service",
            q: 'Cosa vuol dire "Control System as a Service"?',
            a: "È la categoria che ci diamo: sistemi in produzione (dati, decisioni, automazioni, affidabilità) su base continuativa, non progetti spot.",
          },
          {
            id: "da-quando-operate",
            q: "Da quando operate e dove siete?",
            a: "Operiamo dal 2023, con base a Milano. Morfeus è il brand di Numanity S.r.l.",
          },
        ],
      },
      {
        anchor: "metodo",
        title: "Metodo",
        items: [
          {
            id: "diversi-da-agenzia-ai",
            q: "In cosa siete diversi da un'agenzia AI?",
            a: "Un'agenzia consegna un progetto e se ne va. Noi entriamo come Operating Partner: restiamo dentro i processi, con ownership diretta sui risultati misurata ogni mese. Non veniamo pagati per le ore, ma per il valore che generiamo.",
          },
          {
            id: "da-dove-si-parte",
            q: "Da dove si parte?",
            a: "Dalla diagnosi. Mappiamo i processi reparto per reparto e quantifichiamo i Value Leak con il ROIometro: quanto stai perdendo ogni mese, in euro. Solo dopo si decide cosa costruire.",
          },
          {
            id: "cos-e-value-leak",
            q: "Cos'è un Value Leak?",
            a: "Una perdita di margine invisibile che si annida nei processi mentre l'azienda cresce: errori, tempo speso in lavoro ripetitivo, dati frammentati. Non compare in una voce di bilancio, ma erode il profitto. Noi la troviamo e la quantifichiamo in euro.",
          },
          {
            id: "margin-recovery",
            q: "Cos'è il Margin Recovery? È taglio costi?",
            a: "No. Il taglio costi rimuove risorse e capacità; il Margin Recovery rimuove lo spreco strutturale lasciando intatta la capacità produttiva. È recuperare il margine perso, non comprimere le spese.",
          },
          {
            id: "cos-e-roiometro",
            q: "Cos'è il ROIometro?",
            a: 'Lo strumento che mostra quanto stai perdendo ogni mese e quanto puoi recuperare con l\'AI. Sposta la conversazione da "quanto costa Morfeus" a "quanto ti costa il problema".',
          },
          {
            id: "cos-e-marf",
            q: "Cos'è MARF e perché non è un SaaS?",
            a: "MARF è l'infrastruttura AI proprietaria di Morfeus, installata e personalizzata dentro la tua azienda. A differenza di un SaaS esterno, vive nei tuoi processi, lavora sui tuoi dati e migliora a ogni progetto.",
          },
          {
            id: "dipendenti-ai",
            q: 'Cosa sono i "Dipendenti AI"?',
            a: "Sistemi AI configurati con un ruolo, regole e uno standard di qualità, che eseguono un lavoro completo in autonomia. La differenza tra usare l'AI per rispondere e farla davvero lavorare per te.",
          },
          {
            id: "cervello-aziendale",
            q: "Cos'è il Cervello Aziendale?",
            a: "Il layer di conoscenza condiviso che tutti gli agenti AI dell'azienda leggono e aggiornano (procedure, decisioni, template, contesto), così la conoscenza si accumula invece di riscoprirsi a ogni richiesta.",
          },
          {
            id: "cos-e-salescraft",
            q: "Cos'è Salescraft?",
            a: "Il layer AI che automatizza il lavoro ripetitivo del team commerciale, come l'inserimento dati e la preparazione dei preventivi, restituendo ore alle attività che generano fatturato.",
          },
          {
            id: "reparto-o-azienda",
            q: "Lavorate su un reparto o su tutta l'azienda?",
            a: "Si parte dal reparto dove la perdita è più grande e misurabile, poi il sistema si estende. MARF è pensata proprio per far parlare i dati tra reparti.",
          },
          {
            id: "cosa-serve-per-iniziare",
            q: "Cosa serve da parte nostra per iniziare?",
            a: "La volontà di guardare i processi con onestà e l'accesso ai dati operativi del perimetro scelto. Installazione e gestione dei sistemi le facciamo noi.",
          },
        ],
      },
      {
        anchor: "modello",
        title: "Modello e prezzi",
        items: [
          {
            id: "pilot-retainer",
            q: "Come funziona il modello Pilot a Retainer?",
            a: "Si parte con un Pilot delimitato, con criteri di accettazione oggettivi e senza impegno annuale a monte. Se il valore c'è, si passa a un Retainer continuativo come Operating Partner. Dimostriamo prima, decidi dopo.",
          },
          {
            id: "quanto-costa",
            q: "Quanto costa Morfeus?",
            a: "Non abbiamo un listino pubblico: il valore, e quindi l'investimento, dipende da quanto margine stai perdendo. Il punto di partenza è il ROIometro: prima quantifichiamo il problema, poi parliamo di costo.",
          },
          {
            id: "impegno-annuale",
            q: "C'è un impegno annuale?",
            a: "No a monte. Si parte con un Pilot delimitato, senza impegno annuale; il Retainer continuativo arriva solo se il valore c'è.",
          },
          {
            id: "come-misurate-valore",
            q: "Come misurate il valore generato?",
            a: "I criteri di valore si definiscono insieme all'inizio e si verificano ogni mese. Il COO riceve il log settimanale di cosa è stato fatto; il CEO il Value Report mensile con il valore generato, in euro.",
          },
          {
            id: "cos-e-value-report",
            q: "Cos'è il Value Report?",
            a: "Il report mensile con cui diciamo al CEO quanto valore abbiamo generato, in euro e non in slide. È quello che rende il rinnovo una non-decisione.",
          },
          {
            id: "ogni-quanto-risultati",
            q: "Ogni quanto vediamo i risultati?",
            a: "Il COO riceve un log settimanale di cosa è stato fatto; il CEO il Value Report mensile con il valore in euro.",
          },
          {
            id: "garanzie-risultati",
            q: "Offrite garanzie sui risultati?",
            a: "Non vendiamo formule magiche. Riduciamo il rischio con il Pilot a criteri oggettivi: il valore si verifica sui dati, mese per mese, nel Value Report. La trasparenza sostituisce la promessa.",
          },
        ],
      },
      {
        anchor: "dati",
        title: "Dati e sicurezza",
        items: [
          {
            id: "dove-vivono-dati",
            q: "Dove vivono i nostri dati?",
            a: "MARF è embedded: lavora dentro la tua infrastruttura, sui tuoi dati operativi. L'obiettivo è mantenere il controllo dentro l'azienda, non spostarlo fuori.",
          },
          {
            id: "dati-escono",
            q: "I dati escono dall'azienda?",
            a: "L'impianto è pensato per tenere i dati e il controllo dentro l'azienda. MARF lavora sui tuoi sistemi: l'obiettivo non è spostare i dati fuori, ma metterli al lavoro dentro.",
          },
          {
            id: "dipendenti-da-morfeus",
            q: "Diventiamo dipendenti da Morfeus?",
            a: "Al contrario: l'obiettivo è renderti autonomo. Con il programma AI Champion la capability resta in azienda, in modo che il sistema regga e cresca anche senza di noi.",
          },
          {
            id: "se-interrompiamo",
            q: "Cosa succede se interrompiamo la collaborazione?",
            a: "Restano le cose che contano: i sistemi installati e le persone formate (gli AI Champion). Costruiamo perché regga senza di noi, non perché tu dipenda da noi.",
          },
        ],
      },
      {
        anchor: "formazione",
        title: "Formazione",
        items: [
          {
            id: "ai-champion",
            q: "Cos'è il programma AI Champion?",
            a: "È il percorso con cui formiamo, una persona per reparto, chi diventa il punto di riferimento AI interno: sperimenta, capisce cosa funziona, lo proceduralizza e lo diffonde. Ad oggi abbiamo formato oltre 2.500 persone.",
          },
          {
            id: "chi-puo-ai-champion",
            q: "Chi può diventare AI Champion?",
            a: "Una persona per reparto, non necessariamente IT: chi ha voglia di sperimentare, capire cosa funziona e diffonderlo ai colleghi.",
          },
          {
            id: "team-tecnico",
            q: "Serve un team tecnico per iniziare?",
            a: "No. Gli AI Champion non sono necessariamente profili IT, e MARF viene installato e gestito da noi. Serve la volontà di guardare i processi con onestà.",
          },
          {
            id: "formazione-a-se-stante",
            q: "Offrite formazione AI a sé stante?",
            a: "Sì. Il programma AI Champion costruisce la capability interna: ad oggi abbiamo formato oltre 2.500 persone. Per edizioni e formati, parliamone direttamente.",
          },
        ],
      },
    ] as Group[],
    contact: {
      eye: "Non hai trovato la risposta?",
      h2a: "Parliamo del tuo caso, sui tuoi ",
      h2emph: "numeri",
      h2b: ".",
      p: "Quindici minuti per capire dove stai perdendo margine.",
      cta1: "Prova il ROIometro",
      cta2: "Scrivici ▸",
    },
  },
  en: {
    metaTitle: "FAQ — Morfeus",
    metaDesc:
      "Frequently asked questions about Morfeus: who we are, the method (Value Leak, MARF, ROIometer, Value Report), the Pilot to Retainer model, pricing, data and security, training and AI Champion.",
    hero: {
      eye: "Frequently asked questions",
      h1a: "The answers, ",
      h1emph: "no beating",
      h1b: " around the bush.",
      copy: "Who we are, how we work, how we measure value and what to expect from an Operating Partner.",
      catsLabel: "Jump to a category",
    },
    groups: [
      {
        anchor: "generale",
        title: "General",
        items: [
          {
            id: "cos-e-morfeus",
            q: "What is Morfeus?",
            a: "Morfeus is the AI Operating Partner for scaling companies. We embed into the processes, find where margin leaks every day (the Value Leaks), build the AI systems that recover it and measure the value generated in euros, every month.",
          },
          {
            id: "cosa-significa-operating-partner",
            q: 'What does "Operating Partner" mean?',
            a: "It's our model: an embedded AI team that works inside the company with direct ownership of the results, measured month by month. Not an agency, not project-based consulting, not a vendor.",
          },
          {
            id: "per-chi-e-morfeus",
            q: "Who is Morfeus for?",
            a: "For scaling companies that, as they grow, are losing margin invisibly. We speak above all to CEOs, COOs and CFOs.",
          },
          {
            id: "cosa-non-e-morfeus",
            q: "What is Morfeus NOT?",
            a: "Not an AI agency, not a course factory, not a software house selling licenses. We stay inside the processes and measure ourselves on the value we generate.",
          },
          {
            id: "control-system-as-a-service",
            q: 'What does "Control System as a Service" mean?',
            a: "It's the category we give ourselves: systems in production (data, decisions, automations, reliability) on a continuous basis, not one-off projects.",
          },
          {
            id: "da-quando-operate",
            q: "Since when do you operate and where are you?",
            a: "We have been operating since 2023, based in Milan. Morfeus is the brand of Numanity S.r.l.",
          },
        ],
      },
      {
        anchor: "metodo",
        title: "Method",
        items: [
          {
            id: "diversi-da-agenzia-ai",
            q: "How are you different from an AI agency?",
            a: "An agency delivers a project and leaves. We embed as an Operating Partner: we stay inside the processes, with direct ownership of the results, measured every month. We are not paid for hours, but for the value we generate.",
          },
          {
            id: "da-dove-si-parte",
            q: "Where do we start?",
            a: "From the diagnosis. We map the processes department by department and quantify the Value Leaks with the ROIometer: how much you are losing every month, in euros. Only then do we decide what to build.",
          },
          {
            id: "cos-e-value-leak",
            q: "What is a Value Leak?",
            a: "An invisible loss of margin that nests in the processes as the company grows: errors, time spent on repetitive work, fragmented data. It doesn't show up as a line in the accounts, but it erodes profit. We find it and quantify it in euros.",
          },
          {
            id: "margin-recovery",
            q: "What is Margin Recovery? Is it cost-cutting?",
            a: "No. Cost-cutting removes resources and capacity; Margin Recovery removes structural waste while leaving productive capacity intact. It's recovering the lost margin, not compressing spend.",
          },
          {
            id: "cos-e-roiometro",
            q: "What is the ROIometer?",
            a: 'The tool that shows how much you are losing every month and how much you can recover with AI. It shifts the conversation from "how much does Morfeus cost" to "how much is the problem costing you".',
          },
          {
            id: "cos-e-marf",
            q: "What is MARF and why isn't it a SaaS?",
            a: "MARF is Morfeus' proprietary AI infrastructure, installed and customized inside your company. Unlike an external SaaS, it lives in your processes, works on your data and improves with every project.",
          },
          {
            id: "dipendenti-ai",
            q: 'What are "AI Employees"?',
            a: "AI systems configured with a role, rules and a quality standard, that carry out a complete job autonomously. The difference between using AI to answer and making it truly work for you.",
          },
          {
            id: "cervello-aziendale",
            q: "What is the Company Brain?",
            a: "The shared knowledge layer that every AI agent in the company reads and updates (procedures, decisions, templates, context), so knowledge accumulates instead of being rediscovered with every request.",
          },
          {
            id: "cos-e-salescraft",
            q: "What is Salescraft?",
            a: "The AI layer that automates the repetitive work of the sales team, such as data entry and quote preparation, giving back hours to the activities that generate revenue.",
          },
          {
            id: "reparto-o-azienda",
            q: "Do you work on one department or the whole company?",
            a: "We start from the department where the loss is largest and most measurable, then the system extends. MARF is designed precisely to make data talk across departments.",
          },
          {
            id: "cosa-serve-per-iniziare",
            q: "What do you need from us to start?",
            a: "The willingness to look at the processes honestly and access to the operational data of the chosen perimeter. We handle installation and management of the systems.",
          },
        ],
      },
      {
        anchor: "modello",
        title: "Model and pricing",
        items: [
          {
            id: "pilot-retainer",
            q: "How does the Pilot to Retainer model work?",
            a: "We start with a bounded Pilot, with objective acceptance criteria and no annual commitment upfront. If the value is there, we move to a continuous Retainer as Operating Partner. We prove first, you decide after.",
          },
          {
            id: "quanto-costa",
            q: "How much does Morfeus cost?",
            a: "We don't have a public price list: the value, and therefore the investment, depends on how much margin you are losing. The starting point is the ROIometer: first we quantify the problem, then we talk cost.",
          },
          {
            id: "impegno-annuale",
            q: "Is there an annual commitment?",
            a: "Not upfront. We start with a bounded Pilot, with no annual commitment; the continuous Retainer only comes if the value is there.",
          },
          {
            id: "come-misurate-valore",
            q: "How do you measure the value generated?",
            a: "The value criteria are defined together at the start and verified every month. The COO receives the weekly log of what was done; the CEO the monthly Value Report with the value generated, in euros.",
          },
          {
            id: "cos-e-value-report",
            q: "What is the Value Report?",
            a: "The monthly report where we tell the CEO how much value we generated, in euros and not in slides. It's what makes renewal a non-decision.",
          },
          {
            id: "ogni-quanto-risultati",
            q: "How often do we see results?",
            a: "The COO receives a weekly log of what was done; the CEO the monthly Value Report with the value in euros.",
          },
          {
            id: "garanzie-risultati",
            q: "Do you offer guarantees on results?",
            a: "We don't sell magic formulas. We reduce risk with the Pilot on objective criteria: value is verified on the data, month by month, in the Value Report. Transparency replaces the promise.",
          },
        ],
      },
      {
        anchor: "dati",
        title: "Data and security",
        items: [
          {
            id: "dove-vivono-dati",
            q: "Where does our data live?",
            a: "MARF is embedded: it works inside your infrastructure, on your operational data. The goal is to keep control inside the company, not to move it outside.",
          },
          {
            id: "dati-escono",
            q: "Does the data leave the company?",
            a: "The setup is designed to keep the data and control inside the company. MARF works on your systems: the goal is not to move the data out, but to put it to work inside.",
          },
          {
            id: "dipendenti-da-morfeus",
            q: "Do we become dependent on Morfeus?",
            a: "On the contrary: the goal is to make you autonomous. With the AI Champion program the capability stays in the company, so the system holds and grows even without us.",
          },
          {
            id: "se-interrompiamo",
            q: "What happens if we end the collaboration?",
            a: "What matters stays: the installed systems and the trained people (the AI Champions). We build so it holds without us, not so you depend on us.",
          },
        ],
      },
      {
        anchor: "formazione",
        title: "Training",
        items: [
          {
            id: "ai-champion",
            q: "What is the AI Champion program?",
            a: "It's the path through which we train, one person per department, whoever becomes the internal AI point of reference: they experiment, understand what works, proceduralize it and spread it. To date we have trained over 2,500 people.",
          },
          {
            id: "chi-puo-ai-champion",
            q: "Who can become an AI Champion?",
            a: "One person per department, not necessarily IT: someone who wants to experiment, understand what works and spread it to colleagues.",
          },
          {
            id: "team-tecnico",
            q: "Do you need a technical team to start?",
            a: "No. AI Champions are not necessarily IT profiles, and MARF is installed and managed by us. What's needed is the willingness to look at the processes honestly.",
          },
          {
            id: "formazione-a-se-stante",
            q: "Do you offer standalone AI training?",
            a: "Yes. The AI Champion program builds internal capability: to date we have trained over 2,500 people. For editions and formats, let's talk directly.",
          },
        ],
      },
    ] as Group[],
    contact: {
      eye: "Didn't find the answer?",
      h2a: "Let's talk about your case, on your ",
      h2emph: "numbers",
      h2b: ".",
      p: "Fifteen minutes to understand where you are losing margin.",
      cta1: "Try the ROIometer",
      cta2: "Write to us ▸",
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
    alternates: buildLocaleAlternates("faq", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/faq`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function FaqPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const allQa = t.groups.flatMap((g) => g.items);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${safeLocale}/faq#faqpage`,
        url: `${SITE_URL}/${safeLocale}/faq`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntity: allQa.map((qa) => ({
          "@type": "Question",
          name: qa.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: qa.a,
          },
        })),
      },
    ],
  };

  const plus = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className="mt-[5px] h-[18px] w-[18px] shrink-0 text-[color:var(--firma)] transition-transform duration-300 [transition-timing-function:var(--ease)] group-open:rotate-45"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );

  return (
    <SiteShell locale={safeLocale}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 · TESTATA + CATEGORIE · INCHIOSTRO */}
      <section className="band ink hero" id="hero">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="copy">{t.hero.copy}</p>
          <nav
            aria-label={t.hero.catsLabel}
            className="mt-8 flex flex-wrap gap-[10px]"
          >
            {t.groups.map((g) => (
              <a
                key={g.anchor}
                href={`#${g.anchor}`}
                className="rounded-[var(--r-pill)] border border-[var(--riga-scuro)] px-4 py-[9px] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#c2c6d4] [font-family:var(--font-mono)] transition-colors [transition-duration:var(--dur)] hover:border-[var(--lilla)] hover:text-[var(--carta)]"
              >
                {g.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 02 · LE Q&A · CARTA */}
      <section className="band carta" id="faq">
        <div className="wrap">
          <div className="mx-auto max-w-[var(--read,820px)]">
            {t.groups.map((g) => (
              <div key={g.anchor} id={g.anchor} className="mb-[10px] scroll-mt-[80px]">
                <h2 className="pb-[6px] pt-[34px] text-[clamp(21px,2.8vw,30px)] font-semibold tracking-[-0.02em]">
                  {g.title}
                </h2>

                {g.items.map((qa) => (
                  <details
                    key={qa.id}
                    className="group border-t border-[rgba(11,11,12,0.14)]"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-[22px] pr-1 pl-1 [&::-webkit-details-marker]:hidden">
                      <h3
                        id={qa.id}
                        className="scroll-mt-[80px] text-[clamp(17px,2vw,21px)] font-semibold leading-[1.28] tracking-[-0.015em] text-[color:var(--inchiostro)] [font-family:var(--font-display)] group-hover:text-[color:var(--firma)]"
                      >
                        {qa.q}
                      </h3>
                      {plus}
                    </summary>
                    <div className="pb-[26px] pr-[44px] pl-1">
                      <p className="max-w-[78ch] text-[clamp(15px,1.6vw,16.5px)] leading-[1.62] text-[color:#3a3b45]">
                        {qa.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · CONTATTO + CTA · INCHIOSTRO */}
      <section className="band ink ctaq" id="contatto">
        <div className="wrap">
          <div className="eye">{t.contact.eye}</div>
          <h2>
            {t.contact.h2a}
            <span className="emph">{t.contact.h2emph}</span>
            {t.contact.h2b}
          </h2>
          <p>{t.contact.p}</p>
          <div className="cta-row">
            <Link className="btn btn-1" href={`${base}/roiometro`}>
              {t.contact.cta1}
            </Link>
            <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com">
              {t.contact.cta2}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
