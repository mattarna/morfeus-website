import type { Metadata } from "next";
import { CallConfirmedPage } from "@/components/sections/CallConfirmedPage";

interface CallConfirmedRouteProps {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}

const FALLBACK_CALL_CONFIRMED_TEXT = {
  it: {
    badge: "Prenotazione confermata",
    preTitle: "La tua call con Morfeus",
    headlineWithName: "Ciao {name}, grazie di aver prenotato la tua chiamata.",
    headlineWithoutName: "Grazie di aver prenotato la tua chiamata.",
    durationLabel: "30 minuti",
    dateFallback: "Call confermata · 30 minuti",
    videoLabel: "Prima della call",
    videoTitle: "Lasciaci presentare.",
    videoPlaceholder: "Video in arrivo",
    videoDescription: "Ti raccontiamo come lavoriamo e cosa faremo in call.",
    agendaLabel: "Cosa faremo insieme",
    agendaTitle: "30 minuti. Tre cose.",
    agendaSubtitle: "Una sessione di lavoro, non una presentazione.",
    agendaCards: [
      { step: "01 · Diagnosi", title: "Capire il contesto", body: "Processi, team e punti di attrito." },
      { step: "02 · Valutazione", title: "Valutare il fit", body: "Capire se e come possiamo aiutarti." },
      { step: "03 · Prossimo passo", title: "Definire la direzione", body: "Uscire con un piano chiaro." }
    ],
    agendaDisclaimer: "Questa non è una demo prodotto.",
    prepLabel: "Prima di collegarti",
    prepTitle: "Come prepararti",
    prepSubtitle: "Bastano 5 minuti per arrivare con il giusto contesto.",
    prepItems: [
      { icon: "🎯", title: "Un obiettivo", body: "Porta un obiettivo concreto per la call." },
      { icon: "🔁", title: "Un problema ricorrente", body: "Concentrati su quello che si ripete." },
      { icon: "💬", title: "Un esempio reale", body: "Meglio numeri e fatti che opinioni." }
    ],
    credibilityLabel: "Chi siamo",
    credibilityTitle: "Team operativo",
    credibilityBody: "Lavoriamo su processi e risultati misurabili.",
    stats: ["Clienti 5-100M", "60 giorni way-out", "Focus su risultati reali"],
    logosLabel: "Alcune aziende con cui lavoriamo",
    form: {
      preLabel: "Aiutaci ad arrivare preparati",
      title: "Aiutaci ad arrivare preparati",
      subtitle: "Porta un numero, non un'opinione. Usiamo questo per non perdere tempo in call.",
      submitLabel: "Invia",
      submittingLabel: "Invio in corso...",
      privacyNote: "Nessun uso commerciale dei dati.",
      statusTitle: "Sei pronto.",
      statusBody: "Abbiamo tutto quello che ci serve. Il nostro team arriverà alla call già con il tuo contesto. Adesso tocca a te: metti la call in calendario e presentati.",
      statusFallback: "Call confermata",
      steps: {
        step1: { overline: "STEP 1", title: "Prima di tutto, chi sei." },
        step2: { overline: "STEP 2", title: "Dove si concentra la difficoltà." },
        step3: { overline: "STEP 3", title: "Cosa hai già provato." },
        step4: { overline: "STEP 4", title: "Chi è coinvolto." },
        step5: { overline: "STEP 5", title: "Arriviamo preparati." }
      },
      fields: {
        email: "Email aziendale (Usa la stessa con cui hai prenotato la call)",
        revenue: "Fatturato annuo",
        employees: "Numero di dipendenti",
        friction: "Dove senti più attrito?",
        problemDuration: "Da quanto esiste questo problema?",
        triedSolving: "Hai già provato a risolverlo?",
        blocker: "Cosa ha bloccato i tentativi precedenti?",
        decisionMaker: "Sei il decisore su questo?",
        urgency: "Quanto è urgente trovare una soluzione?",
        goal: "Cosa vorresti portarti a casa dalla call? (Opzionale)",
        goalPlaceholder: "Es. un piano concreto, capire se c'è fit, avere una direzione chiara..."
      },
      options: {
        revenue: [
          { label: "Sotto 2M", value: "under_2m" },
          { label: "2–10M", value: "2_10m" },
          { label: "10–50M", value: "10_50m" },
          { label: "Oltre 50M", value: "over_50m" }
        ],
        employees: [
          { label: "Meno di 10", value: "under_10" },
          { label: "10–30", value: "10_30" },
          { label: "30–100", value: "30_100" },
          { label: "Oltre 100", value: "over_100" }
        ],
        friction: [
          { label: "I processi non tengono il ritmo della crescita", value: "processes_scaling" },
          { label: "Il team lavora ma i risultati non si vedono", value: "team_results" },
          { label: "Troppi progetti aperti, pochi che si chiudono", value: "too_many_projects" },
          { label: "Le informazioni si perdono tra i reparti", value: "info_silos" },
          { label: "Non ho visibilità reale su cosa sta succedendo", value: "lack_of_visibility" },
          { label: "Ogni volta che entra qualcuno nuovo, ricominciamo da zero", value: "onboarding_knowledge" },
          { label: "Altro", value: "other" }
        ],
        problemDuration: [
          { label: "Meno di 6 mesi", value: "under_6m" },
          { label: "6–12 mesi", value: "6_12m" },
          { label: "Più di un anno", value: "over_1y" },
          { label: "Da sempre, fa parte del nostro modo di lavorare", value: "always" }
        ],
        triedSolving: [
          { label: "No, è la prima volta che ci proviamo", value: "first_time" },
          { label: "Sì, con soluzioni interne", value: "internal" },
          { label: "Sì, con consulenti o software esterni", value: "external" },
          { label: "Sì, più volte, senza risultati duraturi", value: "multiple_times" }
        ],
        blocker: [
          { label: "Non c'era abbastanza tempo per implementare", value: "no_time" },
          { label: "Il team non ha adottato il cambiamento", value: "no_adoption" },
          { label: "I risultati non erano misurabili", value: "not_measurable" },
          { label: "Costi troppo alti rispetto ai risultati", value: "high_costs" },
          { label: "Non abbiamo mai capito la causa vera del problema", value: "unknown_root_cause" },
          { label: "È la prima volta che ci proviamo", value: "first_time" }
        ],
        decisionMaker: [
          { label: "Decido io", value: "sole_decision_maker" },
          { label: "Decido insieme a un partner o socio", value: "partner" },
          { label: "Devo allineare altre persone prima", value: "need_alignment" },
          { label: "Non sono il decisore principale", value: "not_decision_maker" }
        ],
        urgency: [
          { label: "Serve qualcosa subito, nei prossimi 30 giorni", value: "urgent_30_days" },
          { label: "Nei prossimi 3 mesi", value: "within_3_months" },
          { label: "Sto esplorando, non ho fretta", value: "exploring" },
          { label: "Non lo so ancora", value: "dont_know" }
        ]
      },
      errors: {
        generic: "Errore durante l'invio. Riprova tra pochi secondi."
      }
    }
  },
  en: {
    badge: "Booking confirmed",
    preTitle: "Your call with Morfeus",
    headlineWithName: "Hi {name}, thanks for booking your call.",
    headlineWithoutName: "Thanks for booking your call.",
    durationLabel: "30 minutes",
    dateFallback: "Call confirmed · 30 minutes",
    videoLabel: "Before the call",
    videoTitle: "Let us introduce ourselves.",
    videoPlaceholder: "Video coming soon",
    videoDescription: "We explain how we work and what to expect from the call.",
    agendaLabel: "What we will do together",
    agendaTitle: "30 minutes. Three things.",
    agendaSubtitle: "A working session, not a presentation.",
    agendaCards: [
      { step: "01 · Diagnosis", title: "Understand your context", body: "Processes, team, and friction points." },
      { step: "02 · Assessment", title: "Assess fit", body: "Understand if and how we can help." },
      { step: "03 · Next step", title: "Define direction", body: "Leave with a clear plan." }
    ],
    agendaDisclaimer: "This is not a product demo.",
    prepLabel: "Before you join",
    prepTitle: "How to prepare",
    prepSubtitle: "5 minutes are enough to arrive with the right context.",
    prepItems: [
      { icon: "🎯", title: "One goal", body: "Bring one concrete goal for the call." },
      { icon: "🔁", title: "One recurring problem", body: "Focus on what keeps repeating." },
      { icon: "💬", title: "One real example", body: "Numbers and facts are better than opinions." }
    ],
    credibilityLabel: "Who we are",
    credibilityTitle: "Operational team",
    credibilityBody: "We work on processes and measurable outcomes.",
    stats: ["Clients 5-100M", "60-day way-out", "Real outcomes first"],
    logosLabel: "Some companies we work with",
    form: {
      preLabel: "Help us arrive prepared",
      title: "Help us arrive prepared",
      subtitle: "Bring a number, not an opinion. We use this to not waste time on the call.",
      submitLabel: "Submit",
      submittingLabel: "Sending...",
      privacyNote: "No commercial use of data.",
      statusTitle: "You are ready.",
      statusBody: "We have everything we need. Our team will join the call with your context already in hand. Your move now: add the call to calendar and show up.",
      statusFallback: "Call confirmed",
      steps: {
        step1: { overline: "STEP 1", title: "First of all, who are you." },
        step2: { overline: "STEP 2", title: "Where the difficulty lies." },
        step3: { overline: "STEP 3", title: "What you have already tried." },
        step4: { overline: "STEP 4", title: "Who is involved." },
        step5: { overline: "STEP 5", title: "Let's arrive prepared." }
      },
      fields: {
        email: "Company email (Use the same one from your booking)",
        revenue: "Annual revenue",
        employees: "Number of employees",
        friction: "Where do you feel the most friction?",
        problemDuration: "How long has this problem existed?",
        triedSolving: "Have you already tried to solve it?",
        blocker: "What blocked previous attempts?",
        decisionMaker: "Are you the decision maker on this?",
        urgency: "How urgent is finding a solution?",
        goal: "What would you like to take away from the call? (Optional)",
        goalPlaceholder: "E.g. a concrete plan, understanding if there's a fit, having a clear direction..."
      },
      options: {
        revenue: [
          { label: "Under 2M", value: "under_2m" },
          { label: "2–10M", value: "2_10m" },
          { label: "10–50M", value: "10_50m" },
          { label: "Over 50M", value: "over_50m" }
        ],
        employees: [
          { label: "Under 10", value: "under_10" },
          { label: "10–30", value: "10_30" },
          { label: "30–100", value: "30_100" },
          { label: "Over 100", value: "over_100" }
        ],
        friction: [
          { label: "Processes can't keep up with growth", value: "processes_scaling" },
          { label: "The team works but results aren't visible", value: "team_results" },
          { label: "Too many open projects, few actually close", value: "too_many_projects" },
          { label: "Information gets lost between departments", value: "info_silos" },
          { label: "I have no real visibility on what's happening", value: "lack_of_visibility" },
          { label: "Every time someone new joins, we start from scratch", value: "onboarding_knowledge" },
          { label: "Other", value: "other" }
        ],
        problemDuration: [
          { label: "Less than 6 months", value: "under_6m" },
          { label: "6–12 months", value: "6_12m" },
          { label: "More than a year", value: "over_1y" },
          { label: "Always, it's part of how we work", value: "always" }
        ],
        triedSolving: [
          { label: "No, it's our first time trying", value: "first_time" },
          { label: "Yes, with internal solutions", value: "internal" },
          { label: "Yes, with external consultants or software", value: "external" },
          { label: "Yes, multiple times, without lasting results", value: "multiple_times" }
        ],
        blocker: [
          { label: "Not enough time to implement", value: "no_time" },
          { label: "The team didn't adopt the change", value: "no_adoption" },
          { label: "Results weren't measurable", value: "not_measurable" },
          { label: "Costs too high compared to results", value: "high_costs" },
          { label: "We never understood the real root cause", value: "unknown_root_cause" },
          { label: "It's our first time trying", value: "first_time" }
        ],
        decisionMaker: [
          { label: "I decide", value: "sole_decision_maker" },
          { label: "I decide together with a partner", value: "partner" },
          { label: "I need to align other people first", value: "need_alignment" },
          { label: "I am not the main decision maker", value: "not_decision_maker" }
        ],
        urgency: [
          { label: "Need something right away, within 30 days", value: "urgent_30_days" },
          { label: "Within the next 3 months", value: "within_3_months" },
          { label: "I'm exploring, no rush", value: "exploring" },
          { label: "I don't know yet", value: "dont_know" }
        ]
      },
      errors: {
        generic: "Submission failed. Please try again."
      }
    }
  }
} as const;

async function getCallConfirmedText(locale: string) {
  return locale === "it" ? FALLBACK_CALL_CONFIRMED_TEXT.it : FALLBACK_CALL_CONFIRMED_TEXT.en;
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "it" ? "Call confermata — Morfeus" : "Call confirmed — Morfeus",
    description: locale === "it" ? "Pagina di preparazione pre-call Morfeus." : "Morfeus pre-call preparation page.",
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function CallConfirmedRoute({ params: { locale }, searchParams }: CallConfirmedRouteProps) {
  const text = await getCallConfirmedText(locale);

  return (
    <CallConfirmedPage
      locale={locale}
      searchParams={searchParams}
      text={text}
    />
  );
}
