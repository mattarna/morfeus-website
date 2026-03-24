import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CaseStudyTemplate } from "@/components/sections/CaseStudyTemplate";

const ALLOWED_CASE_SLUGS = new Set([
  "sales",
  "operations",
  "administrative",
  "ecommerce",
  "info-business"
]);

interface CaseStudyRouteProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params: { locale, slug }
}: CaseStudyRouteProps): Promise<Metadata> {
  if (!ALLOWED_CASE_SLUGS.has(slug)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: `PreCall.caseStudies.${slug}.meta`
  });

  return {
    title: `${t("title")} — Morfeus`,
    description: t("description"),
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function CaseStudyRoute({ params: { locale, slug } }: CaseStudyRouteProps) {
  if (!ALLOWED_CASE_SLUGS.has(slug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `PreCall.caseStudies.${slug}` });

  return (
    <CaseStudyTemplate
      locale={locale}
      slug={slug}
      content={{
        metaTitle: t("meta.title"),
        problemLabel: t("labels.problem"),
        interventionLabel: t("labels.intervention"),
        resultsLabel: t("labels.results"),
        heroLabel: t("hero.label"),
        heroHeadline: t("hero.headline"),
        heroSubtitle: t("hero.subtitle"),
        videoPlaceholder: t("hero.videoPlaceholder"),
        problemTitle: t("problem.title"),
        problemBody: t("problem.body"),
        interventionTitle: t("intervention.title"),
        interventionBody: t("intervention.body"),
        resultsTitle: t("results.title"),
        metrics: t.raw("results.metrics"),
        quote: t("quote.text"),
        attribution: t("quote.attribution"),
        ctaLabel: t("tripleCta.label"),
        ctaHeadline: t("tripleCta.headline"),
        ctaCards: {
          newsletterTitle: t("tripleCta.newsletter.title"),
          newsletterBody: t("tripleCta.newsletter.body"),
          newsletterLinkLabel: t("tripleCta.newsletter.linkLabel"),
          webinarTitle: t("tripleCta.webinar.title"),
          webinarBody: t("tripleCta.webinar.body"),
          webinarLinkLabel: t("tripleCta.webinar.linkLabel"),
          linkedinTitle: t("tripleCta.linkedin.title"),
          linkedinBody: t("tripleCta.linkedin.body"),
          linkedinLinkLabel: t("tripleCta.linkedin.linkLabel")
        }
      }}
    />
  );
}
