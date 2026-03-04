import Link from "next/link";
import type {
  AgendaContent,
  CTABoxContent,
  CheckoutButtonContent,
  HeroContent,
  OfferStackContent,
  ThankYouSummaryContent,
  ValueBulletsContent,
  VideoSalesContent
} from "@/funnels/types";

interface AccentProps {
  accentColor: string;
}

export function FunnelHero({ accentColor, content }: AccentProps & { content: HeroContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8 md:p-12">
      {content.eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: accentColor }}>
          {content.eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-3xl font-semibold text-white md:text-5xl">{content.headline}</h1>
      <p className="mt-5 max-w-3xl text-base text-slate-300 md:text-lg">{content.subheadline}</p>
    </section>
  );
}

export function FunnelValueBullets({ content }: { content: ValueBulletsContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
      <ul className="mt-5 space-y-3 text-slate-300">
        {content.items.map((item) => (
          <li key={item} className="rounded-xl border border-white/10 p-4">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FunnelAgenda({ content }: { content: AgendaContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-slate-300">
        {content.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ol>
    </section>
  );
}

export function FunnelCTABox({ accentColor, content }: AccentProps & { content: CTABoxContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
      {content.description ? <p className="mt-3 text-slate-300">{content.description}</p> : null}
      <Link
        href={content.ctaHref}
        data-funnel-cta="true"
        data-cta-href={content.ctaHref}
        className="mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        {content.ctaLabel}
      </Link>
    </section>
  );
}

export function FunnelThankYouSummary({ content }: { content: ThankYouSummaryContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h1 className="text-3xl font-semibold text-white">{content.title}</h1>
      <p className="mt-4 text-slate-300">{content.body}</p>
      {content.checklist?.length ? (
        <ul className="mt-6 list-disc space-y-2 pl-6 text-slate-300">
          {content.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function FunnelVideoSales({ content }: { content: VideoSalesContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
      <p className="mt-3 text-slate-300">{content.description}</p>
      <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-slate-400">
        {content.videoUrl ? `Video: ${content.videoUrl}` : "Video slot (aggiungi URL nel config)."}
      </div>
    </section>
  );
}

export function FunnelOfferStack({ content }: { content: OfferStackContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
      <ul className="mt-5 space-y-2 text-slate-300">
        {content.items.map((item) => (
          <li key={item} className="rounded-xl border border-white/10 p-4">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-lg font-semibold text-white">{content.priceLabel}</p>
    </section>
  );
}

export function FunnelCheckoutButton({
  accentColor,
  content
}: AccentProps & { content: CheckoutButtonContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <Link
        href={content.href}
        data-funnel-cta="true"
        data-cta-href={content.href}
        className="inline-flex rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        {content.label}
      </Link>
    </section>
  );
}
