import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

interface ThankYouProps {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}

function getSingle(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }
  return "";
}

export const metadata: Metadata = {
  title: "Call confirmed — Thank you — Morfeus",
  description: "Pre-call form completed.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CallConfirmedThankYouPage({ params: { locale }, searchParams }: ThankYouProps) {
  const isIt = locale === "it";
  const name = getSingle(searchParams.name);
  const date = getSingle(searchParams.date);
  const time = getSingle(searchParams.time);
  const heading = name
    ? isIt
      ? `Perfetto, ${name}.`
      : `Perfect, ${name}.`
    : isIt
      ? "Perfetto."
      : "Perfect.";

  const slot = date && time ? `${date} · ${time}` : isIt ? "Call confermata" : "Call confirmed";

  const cases = [
    { slug: "sales", label: "Sales" },
    { slug: "operations", label: "Operations" },
    { slug: "administrative", label: isIt ? "Amministrativo" : "Administrative" },
    { slug: "ecommerce", label: "E-commerce" }
  ];

  return (
    <main className="min-h-screen bg-[#050508] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 md:p-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            {isIt ? "Prenotazione confermata" : "Booking confirmed"}
          </p>
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-5xl">{heading}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
            {isIt
              ? "Abbiamo ricevuto tutto. Il team arrivera alla call con il tuo contesto gia in mano. Se vuoi, nei prossimi minuti puoi leggere i casi studio piu vicini alla tua area."
              : "We received everything. The team will join the call with your context already in hand. If useful, you can review the case studies that best match your area."}
          </p>
          <p className="mt-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-vista/80">
            {slot}
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-vista/80">
            {isIt ? "Case study consigliati" : "Recommended case studies"}
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight md:text-4xl">
            {isIt ? "Scegli da dove partire" : "Pick where to start"}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {cases.map((item) => (
              <Link
                key={item.slug}
                href={`/case-study/${item.slug}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold uppercase tracking-wide transition hover:border-majorelle/40 hover:bg-white/[0.07]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
