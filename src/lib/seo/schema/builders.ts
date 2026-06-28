import type { BreadcrumbList, Course, FAQPage, WithContext } from "schema-dts";
import { ORGANIZATION_ID, SITE_URL } from "../entity-ids";

/**
 * Typed JSON-LD builders (schema.org) for per-page structured data.
 *
 * The site-wide entity graph (Organization/WebSite/Service/Person) lives in
 * src/components/shared/SEO/StructuredData.tsx. These builders cover the
 * page-level types — FAQPage, BreadcrumbList, Course — emitted via <JsonLd>.
 */

/**
 * Strip lightweight Markdown emphasis (**bold**, *italic*, `code`) and collapse
 * whitespace, so JSON-LD text carries clean prose. Some i18n copy uses Markdown
 * for visual rendering, which must not leak into structured data.
 */
export function toPlainText(input: string): string {
  return input
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/** FAQPage schema from a list of Q&A (text cleaned of Markdown). */
export function buildFaqPage(items: FaqEntry[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: toPlainText(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(item.answer),
      },
    })),
  };
}

export interface BreadcrumbEntry {
  name: string;
  /** Site-absolute path beginning with "/" (e.g. "/it/forge"). */
  path: string;
}

/** BreadcrumbList schema; paths are resolved to absolute URLs on SITE_URL. */
export function buildBreadcrumbList(
  items: BreadcrumbEntry[]
): WithContext<BreadcrumbList> {
  const itemListElement = items.map((entry, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: entry.name,
    item: `${SITE_URL}${entry.path}`,
  }));

  // schema-dts types ListItem.item as `Thing | IdReference`, but Google's
  // canonical breadcrumb form uses a plain URL string — emit that.
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  } as WithContext<BreadcrumbList>;
}

export interface CourseInput {
  name: string;
  description: string;
  url?: string;
  inLanguage?: string;
}

/**
 * Course schema, provided by the Morfeus Organization (linked by @id).
 *
 * Not yet wired to a page: public, indexable course pages don't exist yet.
 * Ready for when noindex course funnels get public derivatives (master plan 2.4).
 */
export function buildCourse(input: CourseInput): WithContext<Course> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    ...(input.url ? { url: input.url } : {}),
    ...(input.inLanguage ? { inLanguage: input.inLanguage } : {}),
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Morfeus",
    },
  };
}
