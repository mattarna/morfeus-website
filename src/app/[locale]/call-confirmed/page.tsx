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
    agendaDisclaimer: "Questa non e una demo prodotto.",
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
      preLabel: "Due minuti. Adesso.",
      title: "Aiutaci ad arrivare preparati",
      subtitle: "Tre domande veloci per entrare in call con il giusto contesto.",
      submitLabel: "Invia",
      submittingLabel: "Invio in corso...",
      privacyNote: "Nessun uso commerciale dei dati.",
      statusTitle: "Sei pronto.",
      statusBody: "Abbiamo tutto quello che ci serve. Il nostro team arrivera alla call gia con il tuo contesto. Adesso tocca a te: metti la call in calendario e presentati.",
      statusFallback: "Call confermata",
      fields: {
        sector: "Settore",
        revenue: "Fatturato annuo",
        friction: "Dove senti piu attrito?",
        repeatingProblem: "Il problema che si ripete",
        repeatingProblemPlaceholder: "Descrivi in una frase il problema principale."
      },
      options: {
        sector: [
          { label: "Manufacturing / Produzione", value: "manufacturing" },
          { label: "Servizi B2B", value: "b2b_services" },
          { label: "Tech / SaaS", value: "tech_saas" },
          { label: "Retail / E-commerce", value: "retail_ecommerce" },
          { label: "Altro", value: "other" }
        ],
        revenue: [
          { label: "€1M – €5M", value: "1_5" },
          { label: "€5M – €10M", value: "5_10" },
          { label: "€10M – €25M", value: "10_25" },
          { label: "€25M+", value: "25_plus" }
        ],
        friction: [
          { label: "Sales / Commerciale", value: "sales" },
          { label: "Operations / Processi", value: "operations" },
          { label: "Dati / Reporting", value: "data_decision_reporting" },
          { label: "Marketing", value: "marketing" },
          { label: "Altro", value: "other" }
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
      preLabel: "Two minutes. Now.",
      title: "Help us arrive prepared",
      subtitle: "Three quick questions so we enter the call with the right context.",
      submitLabel: "Submit",
      submittingLabel: "Sending...",
      privacyNote: "No commercial use of data.",
      statusTitle: "You are ready.",
      statusBody: "We have everything we need. Our team will join the call with your context already in hand. Your move now: add the call to calendar and show up.",
      statusFallback: "Call confirmed",
      fields: {
        sector: "Sector",
        revenue: "Annual revenue",
        friction: "Where do you feel the most friction?",
        repeatingProblem: "Recurring problem",
        repeatingProblemPlaceholder: "Describe your main recurring issue in one sentence."
      },
      options: {
        sector: [
          { label: "Manufacturing / Production", value: "manufacturing" },
          { label: "B2B Services", value: "b2b_services" },
          { label: "Tech / SaaS", value: "tech_saas" },
          { label: "Retail / E-commerce", value: "retail_ecommerce" },
          { label: "Other", value: "other" }
        ],
        revenue: [
          { label: "€1M – €5M", value: "1_5" },
          { label: "€5M – €10M", value: "5_10" },
          { label: "€10M – €25M", value: "10_25" },
          { label: "€25M+", value: "25_plus" }
        ],
        friction: [
          { label: "Sales", value: "sales" },
          { label: "Operations", value: "operations" },
          { label: "Data / Reporting", value: "data_decision_reporting" },
          { label: "Marketing", value: "marketing" },
          { label: "Other", value: "other" }
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
