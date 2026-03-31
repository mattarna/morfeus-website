import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Icon } from "@iconify/react";

interface BookingConfirmedProps {
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
  title: "Call confermata — Morfeus",
  description: "La tua chiamata è stata confermata.",
  robots: {
    index: false,
    follow: false
  }
};

export default function BookingConfirmedPage({ params: { locale }, searchParams }: BookingConfirmedProps) {
  const isIt = locale === "it";
  const name = getSingle(searchParams.name);
  const date = getSingle(searchParams.date);
  const time = getSingle(searchParams.time);

  const heading = name
    ? isIt
      ? `Perfetto ${name}, call fissata.`
      : `Perfect ${name}, call confirmed.`
    : isIt
      ? "Perfetto, call fissata."
      : "Perfect, call confirmed.";

  const subtitle = isIt
    ? "Ti ho appena mandato l'invito sul calendario con il link per collegarti. A presto!"
    : "I just sent you the calendar invite with the link to join. See you soon!";

  const homeLabel = isIt ? "Torna alla home" : "Back to home";
  
  const slotText = date && time ? `${date} · ${time}` : "";

  return (
    <main className="min-h-screen bg-[#050508] flex items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 text-center">
        <div className="mb-10 inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
          <Icon icon="solar:check-circle-bold" className="h-12 w-12" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">
          {heading}
        </h1>
        
        <p className="text-xl font-light leading-relaxed text-slate-400 max-w-lg mx-auto mb-10">
          {subtitle}
        </p>

        {slotText && (
          <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-vista/80">
            <Icon icon="solar:calendar-bold" className="h-5 w-5" />
            {slotText}
          </div>
        )}

        <div>
          <Link 
            href="/"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-slate-200"
          >
            {homeLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
