import Link from "next/link";
import type { FunnelStepConfig } from "@/funnels/types";
import styles from "./sections.module.css";

type RoutingContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  claudeCardTitle: string;
  claudeCardBody: string;
  claudeCtaLabel: string;
  claudeCtaHref: string;
  businessCardTitle: string;
  businessCardBody: string;
  businessCtaLabel: string;
  businessCtaHref: string;
  urgencyNote: string;
};

type BusinessContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  painTitle: string;
  painItems: string[];
  offerTitle: string;
  offerItems: string[];
  processTitle: string;
  processSteps: string[];
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
  ctaMicrocopy: string;
};

interface SectionProps {
  step: FunnelStepConfig;
}

function getRoutingContent(step: FunnelStepConfig): RoutingContent | null {
  const content = (step.content as Record<string, unknown>).AsseprimRoutingPage as RoutingContent | undefined;
  return content ?? null;
}

function getBusinessContent(step: FunnelStepConfig): BusinessContent | null {
  const content = (step.content as Record<string, unknown>).AsseprimBusinessPage as BusinessContent | undefined;
  return content ?? null;
}

export function AsseprimRoutingPageSection({ step }: SectionProps) {
  const content = getRoutingContent(step);
  if (!content) return null;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h1 className={styles.headline}>{content.headline}</h1>
        <p className={styles.subheadline}>{content.subheadline}</p>

        <div className={styles.cards}>
          <article className={styles.card}>
            <h2 className={styles.cardTitle}>{content.claudeCardTitle}</h2>
            <p className={styles.cardBody}>{content.claudeCardBody}</p>
            <Link
              href={content.claudeCtaHref}
              className={styles.button}
              data-funnel-cta="true"
              data-cta-href={content.claudeCtaHref}
            >
              {content.claudeCtaLabel}
            </Link>
          </article>

          <article className={styles.card}>
            <h2 className={styles.cardTitle}>{content.businessCardTitle}</h2>
            <p className={styles.cardBody}>{content.businessCardBody}</p>
            <Link
              href={content.businessCtaHref}
              className={`${styles.button} ${styles.buttonSecondary}`}
              data-funnel-cta="true"
              data-cta-href={content.businessCtaHref}
            >
              {content.businessCtaLabel}
            </Link>
          </article>
        </div>

        <p className={styles.note}>{content.urgencyNote}</p>
      </section>
    </main>
  );
}

export function AsseprimBusinessPageSection({ step }: SectionProps) {
  const content = getBusinessContent(step);
  if (!content) return null;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h1 className={styles.headline}>{content.headline}</h1>
        <p className={styles.subheadline}>{content.subheadline}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{content.painTitle}</h2>
        <ul className={styles.list}>
          {content.painItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{content.offerTitle}</h2>
        <ul className={styles.list}>
          {content.offerItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{content.processTitle}</h2>
        <ol className={styles.list}>
          {content.processSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className={styles.ctaBlock}>
        <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
        <p className={styles.ctaBody}>{content.ctaBody}</p>
        <Link
          href={content.ctaHref}
          className={styles.button}
          data-funnel-cta="true"
          data-cta-href={content.ctaHref}
        >
          {content.ctaLabel}
        </Link>
        <p className={styles.microcopy}>{content.ctaMicrocopy}</p>
      </section>
    </main>
  );
}
