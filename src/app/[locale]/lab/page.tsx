import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

const BOOKING_URL =
  "https://marf.alexcarofiglio.com/book/morfeushub?utm_source=website&utm_medium=organic&utm_campaign=website";

const COPY = {
  it: {
    metaTitle: "LAB · Formazione AI · Morfeus",
    metaDesc:
      "LAB è la formazione AI di Morfeus: un programma sui processi reali della tua azienda, non su slide. Un LAB, tre porte: Governance, Method, Vertical. Dai team che diventano AI Champion.",
    hero: {
      eye: "Formazione AI · LAB",
      h1a: "Non insegniamo l'AI. La innestiamo nel ",
      h1emph: "DNA",
      h1b: " della tua azienda.",
      copy: "Formiamo le persone sui tuoi processi reali. Non su slide, non su esempi inventati: sul lavoro che fanno ogni giorno.",
      lame: "«Il team che esce sa fare, non sa di cosa si parla.»",
      cta1: "Richiedi l'assessment gratuito",
      cta2: "Le tre porte",
      proof: {
        pre: "▸ PROVA · ",
        b1: "2.000+",
        m1: " persone formate · ",
        b2: "100+",
        m2: " aziende · ",
        b3: "8-15h",
        m3: " a settimana recuperate · AI Act incluso · dal ",
        b4: "2023",
      },
    },
    problema: {
      eye: "Il problema che non vedi",
      h2a: "Il tuo team usa già l'AI. ",
      h2emph: "Tu non lo sai.",
      h2b: "",
      lead: "I tuoi collaboratori usano ChatGPT, Claude, Gemini con i dati aziendali ogni giorno: senza policy, senza governance, senza che nessuno abbia definito come farlo in sicurezza.",
      cards: [
        {
          ck: "S01",
          ct: "L'80% lo fa già",
          p: "I collaboratori sperimentano strumenti AI, a volte in orario di lavoro. Il rischio non è tecnico, è umano: le fughe di dati nascono dall'assenza di regole, non da sistemi vulnerabili.",
        },
        {
          ck: "S02",
          ct: "Il 68% senza sicurezza",
          p: "Nessuna policy, nessun criterio di scelta degli strumenti, nessuna consapevolezza su cosa condividere. Ogni dato che passa da un LLM non autorizzato è un rischio che non vedi.",
        },
        {
          ck: "S03",
          ct: "I talenti già costruiscono",
          p: "Chi già automatizza e prototipa nel tempo libero è tra i tuoi migliori. Se non li riconosci e non dai struttura, trovano un'azienda che lo fa al posto tuo.",
        },
        {
          ck: "S04",
          ct: "Ogni mese è margine perso",
          p: "Dal 2025 non è più un trend, è una questione legale: l'AI Act impone formazione per chi interagisce con sistemi AI. Un PDF e un quiz non bastano.",
        },
      ],
      aggravanteB: "Dal 2025 formare il team non è una scelta: è legge.",
      aggravante:
        " Ma un corso da spuntare crea compliance, non Champion. Le aziende con AI Champion interni crescono 2.4× più veloce di chi dipende dai vendor.",
      source: "Fonte: McKinsey · The State of AI in Business 2025",
    },
    bivio: {
      eye: "Il bivio",
      h2a: "Tra 18 mesi le aziende si divideranno in ",
      h2emph: "due",
      h2b: ".",
      lead: "Non per budget, non per tecnologia: per capacità organizzativa. La differenza la costruisci adesso, o non la costruisci più.",
      curve: {
        axisT: "Tempo →",
        inflA: "AI Champion",
        inflB: "Program",
        loss: {
          tag: "Dipendenza crescente",
          title: "Senza AI Champion",
          sub: "Team che usa l'AI passivamente",
          bullets: [
            "Nessun Champion interno: dipendi dai vendor",
            "L'AI Act resta solo un costo",
            "Il gap competitivo si allarga ogni mese",
          ],
        },
        gain: {
          tag: "Vantaggio cumulativo",
          title: "Con AI Champion",
          sub: "AI Champion Program · Morfeus",
          bullets: [
            "Champion che progettano e automatizzano in autonomia",
            "L'AI diventa competenza interna che si accumula",
            "Nessun vendor per le implementazioni standard",
          ],
        },
      },
    },
    livelli: {
      eye: "Il sistema dei livelli",
      h2a: "Tre livelli. Una domanda: ",
      h2emph: "chi sei?",
      h2b: "",
      lead: "Gli AI Champion esistono già nella tua azienda. Non vanno creati: vanno scovati, potenziati, attivati.",
      tiers: [
        {
          tag: "Livello 01",
          name: "AI Literate",
          desc: "Sa usare l'AI nel proprio lavoro con criterio e governance. Conosce gli strumenti, opera in sicurezza. È il livello base, ed è quello di compliance AI Act.",
          outcome: "Compliance · Sicurezza · Uso consapevole",
        },
        {
          tag: "Livello 02 · target",
          name: "AI Champion",
          desc: "Non solo usa: costruisce. Vede i processi, identifica le frizioni, prototipa soluzioni. Non è un tecnico, è un esperto del suo dominio che ha capito come l'AI lo amplifica.",
          outcome: "Autonomia · Prototipazione · Valore misurabile",
        },
        {
          tag: "Livello 03 · con Forge",
          name: "AI Architect",
          desc: "Trasforma ciò che i Champion hanno identificato in infrastruttura permanente e scalabile. Questo livello non si costruisce da soli: si porta dentro con Forge.",
          outcome: "Infrastruttura · Sistemi · Scalabilità",
        },
      ],
    },
    selettore: {
      eye: "Un LAB, tre porte",
      h2a: "Da quale porta entri dipende da ",
      h2emph: "chi deve imparare",
      h2b: ".",
      lead: "Un solo prodotto, tre ingressi per trigger e pubblici diversi. Non tre offerte in concorrenza.",
      doors: [
        {
          ck: "per chi guida",
          ct: "Governance",
          p: "Executive: stack, licenze e policy. Il ponte diretto a MARF.",
          href: "#track-governance",
        },
        {
          ck: "per tutto il team",
          ct: "Method",
          p: "Il programma storico sui casi veri della tua azienda.",
          href: "#track-method",
        },
        {
          ck: "per un reparto",
          ct: "Vertical",
          p: "Formazione mirata, per funzione o per strumento.",
          href: "#track-vertical",
        },
      ],
      arrow: "Vai alla track ▸",
    },
    governance: {
      eye: "Track 1 · per chi guida",
      h2a: "Decidere come l'azienda adotta l'AI, ",
      h2emph: "prima di spendere",
      h2b: ".",
      lead: "Un assessment formativo con la leadership: quali piattaforme, quali licenze, con quali regole. Spesso il primo risultato è un risparmio che si vede subito.",
      savings: {
        nowL: "Spesa licenze oggi",
        nowV: "€36k/anno",
        rightL: "Right-sized",
        rightV: "€13,5k/anno",
        delta:
          "−62% in questo esempio (agenzia, ~30 seat reali). La percentuale regge sempre, il valore assoluto va sui seat veri.",
      },
      points: [
        { ct: "Stack e piattaforme", p: "Quali piattaforme AI adottare in base a processi, dati e vincoli." },
        { ct: "Licenze right-sized", p: "Mappa ruoli → tier, via seat inattivi e stack ridondanti." },
        { ct: "Policy d'uso", p: "Cosa può entrare nei tool e cosa no, approvazioni, shadow-AI." },
        { ct: "Governance del rollout", p: "Chi presidia, come si misura l'adozione, l'AI Champion interno." },
      ],
      nota: "È il ponte naturale verso MARF: deciso cosa e come, resta una domanda sola, chi lo costruisce.",
    },
    method: {
      eye: "Track 2 · per tutto il team",
      h2a: "Il programma storico: il team impara sui ",
      h2emph: "casi veri",
      h2b: ".",
      lead: "Nessuna slide generica. Identifichiamo i tuoi processi, ti mostriamo il tuo lavoro già ottimizzato, ci assicuriamo che attecchisca.",
      fasi: [
        {
          n: "01",
          ck: "Fase 01",
          ct: "Identifichiamo i tuoi processi reali",
          sub: "Assessment pre-sessione con i responsabili",
          bullets: [
            "In una sessione coi responsabili, i 2-3 processi a maggior potenziale",
            "Ottimizziamo il contenuto della formazione prima ancora di arrivare",
            "Zero slide generiche: ogni esempio è costruito sul tuo contesto",
          ],
          note: "Arriviamo preparati. Non improvvisiamo.",
        },
        {
          n: "02",
          ck: "Fase 02",
          ct: "Ti mostriamo il tuo lavoro già ottimizzato",
          sub: "Sessioni operative con il team",
          bullets: [
            "Arriviamo con il tuo processo già trasformato: lo vedi funzionare",
            "Il metodo si impara guardando il proprio lavoro, non esempi astratti",
            "Ogni sessione produce output concreto, usabile dal giorno dopo",
          ],
          note: "Il momento «ah, capisco» arriva perché il contesto è tuo.",
        },
        {
          n: "03",
          ck: "Fase 03",
          ct: "Ci assicuriamo che attecchisca davvero",
          sub: "Follow-up strutturato post sessione",
          bullets: [
            "Settimane di check-in, domande e approfondimenti dopo il training",
            "L'obiettivo non è capire in aula: è usarlo ogni giorno",
            "I Champion individuati ricevono un percorso dedicato",
          ],
          note: "La formazione finisce quando il team è autonomo, non quando finisce la sessione.",
        },
      ],
      caseLabel: "Caso studio reale",
      caseTitle: "28 processi ottimizzabili identificati. 6 AI Champion attivati.",
      caseStats: [
        { n: "28", l: "Processi ottimizzabili identificati nei flussi reali" },
        { n: "100%", l: "Sessioni costruite sui processi interni, zero casi generici" },
        { n: "6", l: "AI Champion scovati e attivati tra le figure già presenti" },
        { n: "0", l: "Dipendenze da Morfeus dopo il percorso, gestito internamente" },
      ],
      online: "Modalità 100% online, compatibile con team distribuiti.",
    },
    vertical: {
      eye: "Track 3 · per un reparto",
      h2a: "Formazione ",
      h2emph: "mirata",
      h2b: ": per funzione o per strumento.",
      lead: "Quando il collo di bottiglia è un reparto o uno strumento specifico. Struttura derivata dal Method, compressa sul dominio.",
      configs: [
        { ct: "Marketing", p: "Copy, campagne, contenuti sui flussi del reparto." },
        { ct: "Sales", p: "Prep call, follow-up, qualifica, sui tuoi deal reali." },
        { ct: "Visual & Creative", p: "Produzione visiva e asset, sul brand vero." },
        { ct: "Verticale Claude", p: "Padronanza di uno strumento specifico, end to end." },
      ],
      nota: "Materia prima già pronta: la nostra libreria lezioni, ricomposta per configurazione, non riscritta.",
    },
    risultati: {
      eye: "I risultati del programma",
      h2a: "Quello che cambia ",
      h2emph: "dopo",
      h2b: " il programma.",
      lead: "Non metriche di engagement della formazione: risultati operativi misurabili sull'azienda.",
      items: [
        { ct: "8-15h a settimana recuperate", p: "Il tempo sulle attività manuali si ridistribuisce verso decisioni e follow-through." },
        { ct: "Standard più alto e costante", p: "L'AI riduce l'inconsistenza umana: la qualità sale e non fluttua più." },
        { ct: "Output senza aumentare l'organico", p: "Automatizzando la routine si liberano risorse: l'output cresce, il costo no." },
        { ct: "Uso AI conforme all'AI Act", p: "Policy definite, strumenti approvati, comportamenti uniformi. Nessuna zona grigia." },
        { ct: "AI Champion interni", p: "Non figure esterne da comprare ogni volta: talenti già presenti, resi operativi." },
        { ct: "Autonomia totale a fine percorso", p: "Il programma è progettato per finire. L'obiettivo non è creare dipendenza: è rendere il team capace di costruire per sempre." },
      ],
    },
    filtro: {
      eye: "Il filtro",
      h2a: "Per chi è. Per chi ",
      h2emph: "non è",
      h2b: ".",
      lead: "Formiamo poche aziende alla volta. Solo quando vediamo il potenziale di costruire Champion che restano autonomi.",
      yesTitle: "È per te se",
      yes: [
        "Hai un team con potenziale di adottare l'AI, ma senza metodo strutturato",
        "Vuoi essere conforme all'AI Act senza fermarti a un checkbox",
        "Cerchi autonomia reale: un team che non dipenda dai vendor esterni",
        "Vuoi scovare e potenziare gli AI Champion già presenti",
        "Vedi la formazione come investimento con ROI, non come costo obbligatorio",
      ],
      noTitle: "Non è per te se",
      no: [
        "Cerchi un corso online da fare in autonomia o un percorso asincrono",
        "Vuoi solo spuntare la compliance senza trasformare il team",
        "Non hai processi reali su cui lavorare o ruoli operativi definiti",
        "Cerchi formazione generica, non contestualizzata alla tua azienda",
        "Non sei disposto a investire in continuità e follow-up dopo le sessioni",
      ],
    },
    ponte: {
      eye: "Il percorso completo",
      h2a: "Il Lab forma i Champion. ",
      h2emph: "Chi costruisce i sistemi?",
      h2b: "",
      copy: "Il team vede le opportunità e sa dove l'AI genera valore. Ma costruire un'infrastruttura permanente, integrata, scalabile richiede Forge. Lab senza Forge produce Champion che non possono ancora costruire a livello enterprise. Forge senza Lab produce infrastruttura che nessuno sa usare. Insieme, autonomia reale.",
      cta: "Scopri Forge ▸",
    },
    cta: {
      eye: "Il primo passo",
      h2a: "Il primo passo è una call, non un ",
      h2emph: "preventivo",
      h2b: ".",
      p: "In 20 minuti capiamo se c'è potenziale reale per costruire Champion interni. Se non lo vediamo, te lo diciamo prima.",
      cta1: "Richiedi l'assessment gratuito",
      cta2: "Scrivici",
    },
  },
  en: {
    metaTitle: "LAB · AI Training · Morfeus",
    metaDesc:
      "LAB is Morfeus' AI training: a program built on your company's real processes, not slides. One LAB, three doors: Governance, Method, Vertical. From teams to internal AI Champions.",
    hero: {
      eye: "AI Training · LAB",
      h1a: "We don't teach AI. We graft it into your company's ",
      h1emph: "DNA",
      h1b: ".",
      copy: "We train people on your real processes. Not on slides, not on made-up examples: on the work they do every day.",
      lame: "«The team that walks out can do it, not just talk about it.»",
      cta1: "Request the free assessment",
      cta2: "The three doors",
      proof: {
        pre: "▸ PROOF · ",
        b1: "2,000+",
        m1: " people trained · ",
        b2: "100+",
        m2: " companies · ",
        b3: "8-15h",
        m3: " a week recovered · AI Act included · since ",
        b4: "2023",
      },
    },
    problema: {
      eye: "The problem you don't see",
      h2a: "Your team already uses AI. ",
      h2emph: "You just don't know it.",
      h2b: "",
      lead: "Your people use ChatGPT, Claude, Gemini with company data every day: no policy, no governance, no one having defined how to do it safely.",
      cards: [
        {
          ck: "S01",
          ct: "80% already do it",
          p: "People experiment with AI tools, sometimes during work hours. The risk isn't technical, it's human: leaks come from missing rules, not vulnerable systems.",
        },
        {
          ck: "S02",
          ct: "68% with no safety",
          p: "No policy, no tool-selection criteria, no awareness of what to share. Every piece of data passing through an unauthorized LLM is a risk you can't see.",
        },
        {
          ck: "S03",
          ct: "Talent is already building",
          p: "Those already automating and prototyping in their spare time are among your best. If you don't recognize and structure them, another company will.",
        },
        {
          ck: "S04",
          ct: "Every month is lost margin",
          p: "Since 2025 it's no longer a trend, it's legal: the AI Act mandates training for anyone using AI systems. A PDF and a quiz aren't enough.",
        },
      ],
      aggravanteB: "Since 2025, training your team isn't a choice: it's law.",
      aggravante:
        " But a checkbox course creates compliance, not Champions. Companies with internal AI Champions grow 2.4× faster than those depending on vendors.",
      source: "Source: McKinsey · The State of AI in Business 2025",
    },
    bivio: {
      eye: "The fork",
      h2a: "In 18 months companies will split into ",
      h2emph: "two",
      h2b: ".",
      lead: "Not by budget, not by technology: by organizational capability. You build the difference now, or you don't build it at all.",
      curve: {
        axisT: "Time →",
        inflA: "AI Champion",
        inflB: "Program",
        loss: {
          tag: "Growing dependence",
          title: "Without AI Champions",
          sub: "A team using AI passively",
          bullets: [
            "No internal Champion: you depend on vendors",
            "The AI Act stays just a cost",
            "The competitive gap widens every month",
          ],
        },
        gain: {
          tag: "Compounding advantage",
          title: "With AI Champions",
          sub: "AI Champion Program · Morfeus",
          bullets: [
            "Champions who design and automate autonomously",
            "AI becomes an internal skill that accumulates",
            "No vendor for standard implementations",
          ],
        },
      },
    },
    livelli: {
      eye: "The levels system",
      h2a: "Three levels. One question: ",
      h2emph: "who are you?",
      h2b: "",
      lead: "AI Champions already exist in your company. They don't need to be created: they need to be found, empowered, activated.",
      tiers: [
        {
          tag: "Level 01",
          name: "AI Literate",
          desc: "Uses AI at work with judgment and governance. Knows the tools, operates safely. It's the base level, and the one for AI Act compliance.",
          outcome: "Compliance · Safety · Conscious use",
        },
        {
          tag: "Level 02 · target",
          name: "AI Champion",
          desc: "Doesn't just use: builds. Sees processes, spots friction, prototypes solutions. Not a technician, a domain expert who understood how AI amplifies them.",
          outcome: "Autonomy · Prototyping · Measurable value",
        },
        {
          tag: "Level 03 · with Forge",
          name: "AI Architect",
          desc: "Turns what Champions identified into permanent, scalable infrastructure. This level isn't built alone: you bring it in with Forge.",
          outcome: "Infrastructure · Systems · Scalability",
        },
      ],
    },
    selettore: {
      eye: "One LAB, three doors",
      h2a: "Which door you enter depends on ",
      h2emph: "who needs to learn",
      h2b: ".",
      lead: "One product, three entrances for different triggers and audiences. Not three competing offers.",
      doors: [
        {
          ck: "for those who lead",
          ct: "Governance",
          p: "Executives: stack, licenses and policy. The direct bridge to MARF.",
          href: "#track-governance",
        },
        {
          ck: "for the whole team",
          ct: "Method",
          p: "The historic program on your company's real cases.",
          href: "#track-method",
        },
        {
          ck: "for one department",
          ct: "Vertical",
          p: "Targeted training, by function or by tool.",
          href: "#track-vertical",
        },
      ],
      arrow: "Go to track ▸",
    },
    governance: {
      eye: "Track 1 · for those who lead",
      h2a: "Decide how the company adopts AI, ",
      h2emph: "before spending",
      h2b: ".",
      lead: "A training assessment with leadership: which platforms, which licenses, with which rules. Often the first result is a saving you see right away.",
      savings: {
        nowL: "License spend today",
        nowV: "€36k/year",
        rightL: "Right-sized",
        rightV: "€13.5k/year",
        delta:
          "−62% in this example (agency, ~30 real seats). The percentage always holds, the absolute value rides on the real seats.",
      },
      points: [
        { ct: "Stack and platforms", p: "Which AI platforms to adopt based on processes, data and constraints." },
        { ct: "Right-sized licenses", p: "Role → tier map, cutting idle seats and redundant stacks." },
        { ct: "Usage policy", p: "What can enter the tools and what can't, approvals, shadow-AI." },
        { ct: "Rollout governance", p: "Who oversees, how adoption is measured, the internal AI Champion." },
      ],
      nota: "It's the natural bridge to MARF: once what and how are decided, one question remains, who builds it.",
    },
    method: {
      eye: "Track 2 · for the whole team",
      h2a: "The historic program: the team learns on ",
      h2emph: "real cases",
      h2b: ".",
      lead: "No generic slides. We identify your processes, show you your work already optimized, make sure it takes root.",
      fasi: [
        {
          n: "01",
          ck: "Phase 01",
          ct: "We identify your real processes",
          sub: "Pre-session assessment with the leads",
          bullets: [
            "In a working session with the leads, the 2-3 highest-potential processes",
            "We optimize the training content before we even arrive",
            "Zero generic slides: every example is built on your context",
          ],
          note: "We arrive prepared. We don't improvise.",
        },
        {
          n: "02",
          ck: "Phase 02",
          ct: "We show you your work already optimized",
          sub: "Hands-on sessions with the team",
          bullets: [
            "We arrive with your process already transformed: you see it working",
            "The method is learned by watching your own work, not abstract examples",
            "Every session produces concrete output, usable the next day",
          ],
          note: "The 'aha' moment happens because the context is yours.",
        },
        {
          n: "03",
          ck: "Phase 03",
          ct: "We make sure it actually sticks",
          sub: "Structured post-session follow-up",
          bullets: [
            "Weeks of check-ins, questions and deep-dives after the training",
            "The goal isn't understanding in the room: it's using it every day",
            "Identified Champions receive a dedicated advancement track",
          ],
          note: "Training ends when the team is autonomous, not when the session is over.",
        },
      ],
      caseLabel: "Real case study",
      caseTitle: "28 optimizable processes identified. 6 AI Champions activated.",
      caseStats: [
        { n: "28", l: "Optimizable processes identified in real workflows" },
        { n: "100%", l: "Sessions built on internal processes, zero generic cases" },
        { n: "6", l: "AI Champions found and activated among existing people" },
        { n: "0", l: "Dependencies on Morfeus after the program, run internally" },
      ],
      online: "100% online, compatible with distributed teams.",
    },
    vertical: {
      eye: "Track 3 · for one department",
      h2a: "Targeted ",
      h2emph: "training",
      h2b: ": by function or by tool.",
      lead: "When the bottleneck is one department or one specific tool. Structure derived from Method, compressed on the domain.",
      configs: [
        { ct: "Marketing", p: "Copy, campaigns, content on the department's flows." },
        { ct: "Sales", p: "Call prep, follow-up, qualification, on your real deals." },
        { ct: "Visual & Creative", p: "Visual production and assets, on the real brand." },
        { ct: "Claude vertical", p: "Mastery of one specific tool, end to end." },
      ],
      nota: "Raw material ready: our lesson library, recomposed per configuration, not rewritten.",
    },
    risultati: {
      eye: "Program outcomes",
      h2a: "What changes ",
      h2emph: "after",
      h2b: " the program.",
      lead: "Not training engagement metrics: measurable operational results on the company.",
      items: [
        { ct: "8-15h a week recovered", p: "Time on manual tasks redistributes toward decisions and follow-through." },
        { ct: "Higher, steadier standard", p: "AI cuts human inconsistency: quality rises and stops fluctuating." },
        { ct: "Output without more headcount", p: "Automating routine frees resources: output grows, cost doesn't." },
        { ct: "AI Act-compliant AI use", p: "Defined policy, approved tools, uniform behavior. No grey zone." },
        { ct: "Internal AI Champions", p: "Not external hires bought each time: existing talent, made operational." },
        { ct: "Complete autonomy at program end", p: "The program is designed to end. The goal isn't creating dependency: it's making the team capable of building forever." },
      ],
    },
    filtro: {
      eye: "The filter",
      h2a: "Who it's for. Who it's ",
      h2emph: "not",
      h2b: " for.",
      lead: "We train few companies at a time. Only when we see the potential to build Champions who stay autonomous.",
      yesTitle: "It's for you if",
      yes: [
        "You have a team with potential to adopt AI, but no structured method",
        "You want to be AI Act-compliant without stopping at a checkbox",
        "You seek real autonomy: a team that doesn't depend on external vendors",
        "You want to find and empower the AI Champions already present",
        "You see training as an investment with ROI, not a mandatory cost",
      ],
      noTitle: "It's not for you if",
      no: [
        "You want a self-paced online course or an asynchronous path",
        "You just want to tick compliance without transforming the team",
        "You have no real processes to work on or defined operational roles",
        "You want generic training, not contextualized to your company",
        "You're not willing to invest in continuity and follow-up after sessions",
      ],
    },
    ponte: {
      eye: "The full path",
      h2a: "Lab trains the Champions. ",
      h2emph: "Who builds the systems?",
      h2b: "",
      copy: "The team sees the opportunities and knows where AI creates value. But building permanent, integrated, scalable infrastructure requires Forge. Lab without Forge produces Champions who can't yet build at enterprise level. Forge without Lab produces infrastructure no one can use. Together, real autonomy.",
      cta: "Discover Forge ▸",
    },
    cta: {
      eye: "The first step",
      h2a: "The first step is a call, not a ",
      h2emph: "quote",
      h2b: ".",
      p: "In 20 minutes we understand whether there's real potential to build internal Champions. If we don't see it, we tell you first.",
      cta1: "Request the free assessment",
      cta2: "Write to us",
    },
  },
} as const;

/* Icone delle 3 porte (stroke = currentColor, colorate via .card .ico). */
const DOOR_ICONS = [
  // Governance → sliders (decisioni / policy)
  <svg key="d0" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
    <path d="M2 14h4M10 8h4M18 16h4" />
  </svg>,
  // Method → team (persone)
  <svg key="d1" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
  </svg>,
  // Vertical → target (un reparto)
  <svg key="d2" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.6" />
  </svg>,
];

/* Icone dei 6 risultati (stroke = currentColor, colorate via .card .ico). */
const RESULT_ICONS = [
  // ore recuperate → orologio
  <svg key="r0" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>,
  // standard costante → bersaglio
  <svg key="r1" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.6" />
  </svg>,
  // output moltiplicato → grafico su
  <svg key="r2" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18" />
    <path d="M7 15l4-4 3 3 5-6" />
  </svg>,
  // conforme AI Act → scudo
  <svg key="r3" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  // Champion interni → stella
  <svg key="r4" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l2.6 5.6 6.1.7-4.5 4.1 1.2 6L12 16.9 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z" />
  </svg>,
  // autonomia → chiave
  <svg key="r5" className="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="15" r="4.5" />
    <path d="M11 12l9-9M17 3l3 3M15 5l2 2" />
  </svg>,
];

/* Grafico a barre con punto di svolta: barre spente e piatte finché usi
   l'AI passivamente, poi al programma AI Champion diventano lilla e accelerano. */
function InflectionChart({ labA, labB }: { labA: string; labB: string }) {
  const N = 34;
  const INFL = 15;
  const W = 660;
  const H = 280;
  const base = 262;
  const top = 30;
  const maxH = base - top;
  const pitch = (W - 30) / N;
  const bw = pitch * 0.5;

  const bars = Array.from({ length: N }, (_, i) => {
    let h: number;
    if (i < INFL) {
      h = 0.16 + 0.1 * Math.sin((i / (INFL - 1)) * Math.PI);
    } else {
      const t = (i - INFL) / (N - 1 - INFL);
      h = 0.22 + 0.78 * Math.pow(t, 1.85);
    }
    const px = h * maxH;
    const x = 15 + i * pitch + (pitch - bw) / 2;
    return { i, x, y: base - px, px, on: i >= INFL };
  });
  const infl = bars[INFL];
  const cx = infl.x + bw / 2;
  const dividerX = 15 + INFL * pitch;

  return (
    <svg className="ichart" viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
      <line className="divider" x1={dividerX} y1={top - 2} x2={dividerX} y2={base} />
      {bars.map((b) => (
        <rect
          key={b.i}
          x={b.x}
          y={b.y}
          width={bw}
          height={b.px}
          rx="2"
          className={b.on ? "bar-on" : "bar-dim"}
        />
      ))}
      <circle className="dot" cx={cx} cy={infl.y} r="6" />
      <text className="lab" textAnchor="middle">
        <tspan x={cx} y={infl.y - 32}>
          {labA}
        </tspan>
        <tspan x={cx} y={infl.y - 16}>
          {labB}
        </tspan>
      </text>
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
    alternates: buildLocaleAlternates("lab", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/lab`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function LabPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${safeLocale}/lab#webpage`,
        url: `${SITE_URL}/${safeLocale}/lab`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "Service",
        name: "LAB · AI Training",
        serviceType: "AI Training",
        provider: { "@id": ORGANIZATION_ID },
        description: t.metaDesc,
        areaServed: "IT",
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

      {/* 01 · HERO · INCHIOSTRO */}
      <section className="band ink hero" id="hero">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="copy">{t.hero.copy}</p>
          <p className="lame">{t.hero.lame}</p>
          <div className="cta-row">
            <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {t.hero.cta1}
            </a>
            <a className="btn btn-2-carta" href="#selettore">
              {t.hero.cta2}
            </a>
          </div>
          <p className="proofline">
            {t.hero.proof.pre}
            <b>{t.hero.proof.b1}</b>
            {t.hero.proof.m1}
            <b>{t.hero.proof.b2}</b>
            {t.hero.proof.m2}
            <b>{t.hero.proof.b3}</b>
            {t.hero.proof.m3}
            <b>{t.hero.proof.b4}</b>
          </p>
        </div>
      </section>

      {/* 02 · IL PROBLEMA (shadow AI + AI Act) · CARTA */}
      <section className="band carta" id="problema">
        <div className="wrap">
          <div className="eye">{t.problema.eye}</div>
          <h2 className="h-sect">
            {t.problema.h2a}
            <span className="emph">{t.problema.h2emph}</span>
            {t.problema.h2b}
          </h2>
          <p className="lead">{t.problema.lead}</p>
          <div className="four" style={{ marginTop: 26 }}>
            {t.problema.cards.map((c, i) => (
              <div className="card" key={i}>
                <div className="ck">{c.ck}</div>
                <div className="ct">{c.ct}</div>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
          <p className="cat" style={{ marginTop: 26 }}>
            <b>{t.problema.aggravanteB}</b>
            {t.problema.aggravante}
          </p>
          <p className="mono" style={{ fontSize: 11, color: "var(--ombra)", marginTop: 10 }}>
            {t.problema.source}
          </p>
        </div>
      </section>

      {/* 03 · IL BIVIO (curve) · INCHIOSTRO */}
      <section className="band ink" id="bivio">
        <div className="wrap">
          <div className="eye">{t.bivio.eye}</div>
          <h2 className="h-sect">
            {t.bivio.h2a}
            <span className="emph">{t.bivio.h2emph}</span>
            {t.bivio.h2b}
          </h2>
          <p className="lead">{t.bivio.lead}</p>
          <div className="inflect">
            <div className="cap">
              <span className="s">{t.bivio.curve.loss.title}</span>
              <span className="c">{t.bivio.curve.gain.title}</span>
            </div>
            <InflectionChart labA={t.bivio.curve.inflA} labB={t.bivio.curve.inflB} />
          </div>
          <div className="two" style={{ marginTop: 22 }}>
            <div className="card">
              <div className="ck" style={{ color: "var(--anomalia)" }}>
                {t.bivio.curve.loss.tag}
              </div>
              <div className="ct">{t.bivio.curve.loss.title}</div>
              <ul className="blist loss">
                {t.bivio.curve.loss.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="bd" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card sel">
              <div className="ck">{t.bivio.curve.gain.tag}</div>
              <div className="ct">{t.bivio.curve.gain.title}</div>
              <ul className="blist gain">
                {t.bivio.curve.gain.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="bd" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · I 3 LIVELLI · CARTA */}
      <section className="band carta" id="livelli">
        <div className="wrap">
          <div className="eye">{t.livelli.eye}</div>
          <h2 className="h-sect">
            {t.livelli.h2a}
            <span className="emph">{t.livelli.h2emph}</span>
            {t.livelli.h2b}
          </h2>
          <p className="lead">{t.livelli.lead}</p>
          <div className="ladder" aria-hidden="true">
            <div className="rung" />
            <div className="rung" />
            <div className="rung" />
          </div>
          <div className="three">
            {t.livelli.tiers.map((tier, i) => (
              <div className={i === 1 ? "card sel" : "card"} key={i}>
                <div className="ck">{tier.tag}</div>
                <div className="ct">{tier.name}</div>
                <p>{tier.desc}</p>
                <span className="otag">{tier.outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · IL SELETTORE, tre porte · INCHIOSTRO */}
      <section className="band ink" id="selettore">
        <div className="wrap">
          <div className="eye">{t.selettore.eye}</div>
          <h2 className="h-sect">
            {t.selettore.h2a}
            <span className="emph">{t.selettore.h2emph}</span>
            {t.selettore.h2b}
          </h2>
          <p className="lead">{t.selettore.lead}</p>
          <div className="three" style={{ marginTop: 28 }}>
            {t.selettore.doors.map((d, i) => (
              <a className="card door" href={d.href} key={i}>
                {DOOR_ICONS[i]}
                <div className="ck">{d.ck}</div>
                <div className="ct">{d.ct}</div>
                <p>{d.p}</p>
                <span className="arrow">{t.selettore.arrow}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · TRACK GOVERNANCE · CARTA */}
      <section className="band carta" id="track-governance">
        <div className="wrap">
          <div className="eye">{t.governance.eye}</div>
          <h2 className="h-sect">
            {t.governance.h2a}
            <span className="emph">{t.governance.h2emph}</span>
            {t.governance.h2b}
          </h2>
          <p className="lead">{t.governance.lead}</p>
          <div className="savings">
            <div className="row">
              <div className="rl">
                <span>{t.governance.savings.nowL}</span>
                <b>{t.governance.savings.nowV}</b>
              </div>
              <div className="track">
                <div className="fill now" />
              </div>
            </div>
            <div className="row">
              <div className="rl">
                <span>{t.governance.savings.rightL}</span>
                <b>{t.governance.savings.rightV}</b>
              </div>
              <div className="track">
                <div className="fill right" />
              </div>
            </div>
            <p className="delta">{t.governance.savings.delta}</p>
          </div>
          <div className="four" style={{ marginTop: 30 }}>
            {t.governance.points.map((p, i) => (
              <div className="card" key={i}>
                <div className="ct">{p.ct}</div>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
          <p className="cat" style={{ marginTop: 24 }}>
            <b>{t.governance.nota}</b>
          </p>
        </div>
      </section>

      {/* 07 · TRACK METHOD · INCHIOSTRO */}
      <section className="band ink" id="track-method">
        <div className="wrap">
          <div className="eye">{t.method.eye}</div>
          <h2 className="h-sect">
            {t.method.h2a}
            <span className="emph">{t.method.h2emph}</span>
            {t.method.h2b}
          </h2>
          <p className="lead">{t.method.lead}</p>
          <div className="vtimeline">
            {t.method.fasi.map((f, i) => (
              <div className="vstep" key={i}>
                <span className="dot" />
                <span className="num">{f.n}</span>
                <span className="vp">{f.ck}</span>
                <h3>{f.ct}</h3>
                <div className="vsub">{f.sub}</div>
                <ul className="vlist">
                  {f.bullets.map((b, j) => (
                    <li key={j}>
                      <span className="dm">◇</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="vnote">{f.note}</p>
              </div>
            ))}
          </div>
          <div className="eye" style={{ marginTop: 40, color: "var(--lilla)" }}>
            {t.method.caseLabel}
          </div>
          <h3 style={{ fontSize: "clamp(20px, 2.6vw, 26px)", marginTop: 10, maxWidth: "24ch" }}>
            {t.method.caseTitle}
          </h3>
          <div className="four" style={{ marginTop: 22 }}>
            {t.method.caseStats.map((s, i) => (
              <div className="card" key={i}>
                <div className="statnum">{s.n}</div>
                <p>{s.l}</p>
              </div>
            ))}
          </div>
          <p className="cat" style={{ marginTop: 22 }}>
            {t.method.online}
          </p>
        </div>
      </section>

      {/* 08 · TRACK VERTICAL · CARTA */}
      <section className="band carta" id="track-vertical">
        <div className="wrap">
          <div className="eye">{t.vertical.eye}</div>
          <h2 className="h-sect">
            {t.vertical.h2a}
            <span className="emph">{t.vertical.h2emph}</span>
            {t.vertical.h2b}
          </h2>
          <p className="lead">{t.vertical.lead}</p>
          <div className="four" style={{ marginTop: 28 }}>
            {t.vertical.configs.map((c, i) => (
              <div className="card" key={i}>
                <div className="ct">{c.ct}</div>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
          <p className="cat" style={{ marginTop: 24 }}>
            <b>{t.vertical.nota}</b>
          </p>
        </div>
      </section>

      {/* 09 · I RISULTATI · INCHIOSTRO */}
      <section className="band ink" id="risultati">
        <div className="wrap">
          <div className="eye">{t.risultati.eye}</div>
          <h2 className="h-sect">
            {t.risultati.h2a}
            <span className="emph">{t.risultati.h2emph}</span>
            {t.risultati.h2b}
          </h2>
          <p className="lead">{t.risultati.lead}</p>
          <div className="three" style={{ marginTop: 26 }}>
            {t.risultati.items.map((it, i) => (
              <div className="card" key={i}>
                {RESULT_ICONS[i]}
                <div className="ct">{it.ct}</div>
                <p>{it.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · PER CHI È / NON È · CARTA */}
      <section className="band carta" id="filtro">
        <div className="wrap">
          <div className="eye">{t.filtro.eye}</div>
          <h2 className="h-sect">
            {t.filtro.h2a}
            <span className="emph">{t.filtro.h2emph}</span>
            {t.filtro.h2b}
          </h2>
          <p className="lead">{t.filtro.lead}</p>
          <div className="two" style={{ marginTop: 26 }}>
            <div className="card sel">
              <div className="ct">{t.filtro.yesTitle}</div>
              <ul className="mt-4 space-y-2.5 font-satoshi text-[14.5px] leading-snug">
                {t.filtro.yes.map((x, i) => (
                  <li className="flex gap-2.5" key={i}>
                    <span style={{ color: "var(--ok)" }}>✓</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="ct">{t.filtro.noTitle}</div>
              <ul className="mt-4 space-y-2.5 font-satoshi text-[14.5px] leading-snug">
                {t.filtro.no.map((x, i) => (
                  <li className="flex gap-2.5" key={i}>
                    <span style={{ color: "var(--anomalia)" }}>✗</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11 · IL PONTE → FORGE · INCHIOSTRO */}
      <section className="band ink" id="ponte">
        <div className="wrap">
          <div className="eye">{t.ponte.eye}</div>
          <h2 className="h-sect">
            {t.ponte.h2a}
            <span className="emph">{t.ponte.h2emph}</span>
            {t.ponte.h2b}
          </h2>
          <p className="copy" style={{ maxWidth: "62ch" }}>
            {t.ponte.copy}
          </p>
          <p style={{ marginTop: 18 }}>
            <Link className="btn btn-2-carta" href={`${base}/forge`}>
              {t.ponte.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* 12 · CTA FINALE · CARTA */}
      <section className="band carta ctaq" id="cta">
        <div className="wrap">
          <div className="eye">{t.cta.eye}</div>
          <h2>
            {t.cta.h2a}
            <span className="emph">{t.cta.h2emph}</span>
            {t.cta.h2b}
          </h2>
          <p style={{ color: "#3a3b45" }}>{t.cta.p}</p>
          <div className="cta-row">
            <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {t.cta.cta1}
            </a>
            <a className="btn btn-2-ink" href="mailto:hello@morfeushub.com">
              {t.cta.cta2}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
