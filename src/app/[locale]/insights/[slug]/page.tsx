import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";
import { getArticleBySlug, getArticleSlugs, getAllArticles } from "@/lib/insights";
import { InsightCover, coverKindFromCategory, type CoverKind } from "@/components/site/InsightCover";

type Props = { params: { locale: string; slug: string } };

/** Rotte che esistono davvero nel repo: le altre restano `<span>` non navigabili. */
const NAVIGABLE_ROUTES = new Set([
  "/chi-siamo",
  "/metodo",
  "/casi",
  "/insights",
  "/impara-ai",
  "/glossario",
  "/faq",
  "/roiometro",
]);

/** Slug articolo esistenti (per link `/insights/<slug>`). Calcolato al build. */
function getKnownInsightSlugs(): Set<string> {
  return new Set(getArticleSlugs());
}

function isInternalLinkNavigable(href: string, knownInsightSlugs: Set<string>): boolean {
  if (!href.startsWith("/")) return false;
  if (NAVIGABLE_ROUTES.has(href)) return true;
  const m = href.match(/^\/insights\/([^/]+)$/);
  if (m && knownInsightSlugs.has(m[1])) return true;
  return false;
}

function initials(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

function formatDateIt(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function kebab(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const { locale, slug } = params;
  const safeLocale: "it" | "en" = locale === "en" ? "en" : "it";
  const article = getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Insight non trovato · Morfeus",
      description: "L'articolo cercato non esiste.",
      robots: { index: false, follow: false },
    };
  }
  const title = article.metaTitle || `${article.title} · Morfeus`;
  const description = article.metaDescription;
  return {
    title,
    description,
    alternates: buildLocaleAlternates(`insights/${slug}`, safeLocale),
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/${safeLocale}/insights/${slug}`,
      siteName: "Morfeus",
      locale: safeLocale === "it" ? "it_IT" : "en_US",
      publishedTime: article.datePublished || undefined,
      modifiedTime: article.dateModified || undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function InsightArticlePage({ params }: Props) {
  const { locale, slug } = params;
  const safeLocale: "it" | "en" = locale === "en" ? "en" : "it";
  const isIt = safeLocale === "it";
  const base = `/${safeLocale}`;

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const knownInsightSlugs = getKnownInsightSlugs();
  const otherArticles = getAllArticles().filter((a) => a.slug !== slug).slice(0, 3);

  const canonicalUrl = `${SITE_URL}/${safeLocale}/insights/${slug}`;

  const articleLd = {
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: article.title,
    description: article.metaDescription,
    inLanguage: isIt ? "it-IT" : "en-US",
    datePublished: article.datePublished || undefined,
    dateModified: article.dateModified || article.datePublished || undefined,
    author: { "@type": "Person", name: article.author },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@id": canonicalUrl },
    isPartOf: { "@id": WEBSITE_ID },
    articleSection: article.category,
    keywords: article.tags?.join(", "),
  };

  const faqLd = article.faq.length
    ? {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        inLanguage: isIt ? "it-IT" : "en-US",
        mainEntity: article.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": faqLd ? [articleLd, faqLd] : [articleLd],
  };

  return (
    <SiteShell locale={safeLocale}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 · TESTATA · INCHIOSTRO */}
      <section className="band ink" id="testata">
        <div className="read">
          <div className="font-plex text-[11px] tracking-[.08em] text-ombra">
            <Link href={`${base}/insights`} className="text-lilla">
              Insights
            </Link>
            {article.category ? <> · {article.category}</> : null}
          </div>
          <div className="mt-5 font-plex text-[11px] tracking-[.12em] uppercase text-lilla">
            {article.category}
            <span className="text-ombra">
              {" · "}
              {formatDateIt(article.datePublished)}
              {article.readingTime ? ` · ${article.readingTime}` : ""}
            </span>
          </div>
          <h1 className="mt-4 max-w-[19ch] text-[clamp(30px,5vw,50px)] font-semibold leading-[1.1]">
            {article.title}
          </h1>
          {article.tldr ? (
            <p
              className="mt-4 max-w-[60ch] text-[clamp(18px,2.2vw,22px)] italic"
              style={{ fontFamily: "var(--font-emph,'Playfair Display',Georgia,serif)", color: "#c2c6d4" }}
            >
              {article.tldr}
            </p>
          ) : null}
          <div className="mt-7 flex items-center gap-3 border-t pt-5" style={{ borderColor: "#26262B" }}>
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-full font-plex text-[14px] font-semibold"
              style={{
                background: "rgba(140,165,247,.14)",
                color: "#8CA5F7",
                border: "1px solid rgba(140,165,247,.3)",
              }}
            >
              {initials(article.author)}
            </span>
            <div className="text-[13px]">
              <b className="font-satoshi text-carta">{article.author}</b>
              {article.authorRole ? (
                <div className="text-ombra">{article.authorRole}</div>
              ) : null}
            </div>
          </div>
          {article.dateModified && article.dateModified !== article.datePublished ? (
            <p className="mt-3 font-plex text-[11px] text-ombra">
              ▸ {isIt ? "Aggiornato il" : "Updated on"} {formatDateIt(article.dateModified)}
            </p>
          ) : null}

          {/* Cover banner — visuale astratta on-brand del tema */}
          <div
            className="mt-9 overflow-hidden rounded-[12px] border"
            style={{ aspectRatio: "16 / 9", borderColor: "#26262B" }}
          >
            <InsightCover
              kind={(article.coverKind as CoverKind) || coverKindFromCategory(article.category)}
              variant="ink"
              category={article.category}
            />
          </div>
        </div>
      </section>

      {/* 02 · CORPO · CARTA */}
      <section className="band carta">
        <div className="read">
          {article.tldr ? (
            <div
              className="mb-9 rounded-[12px] border px-[26px] py-[22px]"
              style={{
                background: "rgba(11,11,12,.02)",
                borderColor: "rgba(11,11,12,.14)",
                borderLeft: "3px solid #533DFC",
              }}
            >
              <div className="font-plex text-[10px] uppercase tracking-[.16em] text-firma">
                {isIt ? "In breve" : "In brief"}
              </div>
              <p className="mt-2 text-[16px]" style={{ color: "#23222e" }}>
                {article.tldr}
              </p>
            </div>
          ) : null}
          <article
            className="prose max-w-none font-satoshi text-[17px] leading-[1.7]"
            style={{ color: "#23222e" }}
          >
            <div
              className="insight-body"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </article>
          {/* stile locale della prose (senza toccare il CSS globale) */}
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              .insight-body h2{font-family:var(--font-display,'Clash Display','Inter',sans-serif);font-weight:600;font-size:clamp(22px,3vw,30px);margin:40px 0 12px;letter-spacing:-.02em;line-height:1.15;color:#0B0B0C}
              .insight-body h3{font-family:var(--font-display,'Clash Display','Inter',sans-serif);font-weight:600;font-size:19px;margin:28px 0 8px;color:#0B0B0C}
              .insight-body p{margin:14px 0}
              .insight-body a{color:#533DFC;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
              .insight-body a:hover{color:#392CB8}
              .insight-body strong{font-weight:700;color:#0B0B0C}
              .insight-body em{font-family:var(--font-emph,'Playfair Display',Georgia,serif);font-style:italic;color:#533DFC;font-weight:500}
              .insight-body blockquote{font-family:var(--font-emph,'Playfair Display',Georgia,serif);font-style:italic;font-size:clamp(20px,2.6vw,26px);line-height:1.4;color:#0B0B0C;border-left:2px solid #533DFC;padding:4px 0 4px 24px;margin:32px 0}
              .insight-body ul,.insight-body ol{margin:14px 0 14px 22px;padding:0}
              .insight-body li{margin:8px 0}
              .insight-body ul li::marker{color:#533DFC}
              .insight-body ol li::marker{color:#533DFC;font-family:var(--font-mono,'IBM Plex Mono',monospace);font-weight:600}
              .insight-body table{width:100%;border-collapse:collapse;margin:32px 0;font-size:14.5px;border:1px solid rgba(11,11,12,.16);border-radius:12px;overflow:hidden;display:block;overflow-x:auto}
              .insight-body table th{text-align:left;font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#7E8091;padding:12px 18px;border-bottom:1px solid rgba(11,11,12,.16);background:rgba(83,61,252,.04)}
              .insight-body table td{padding:13px 18px;border-bottom:1px solid rgba(11,11,12,.09);vertical-align:top;color:#23222e}
              .insight-body table tr:last-child td{border-bottom:none}
              .insight-body code{font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:.9em;background:rgba(83,61,252,.08);padding:2px 6px;border-radius:4px;color:#0B0B0C}
              .insight-body hr{border:none;border-top:1px solid rgba(11,11,12,.14);margin:36px 0}
              .insight-body img{max-width:100%;height:auto;border-radius:12px;margin:28px 0;border:1px solid rgba(11,11,12,.10)}
              /* --- componenti visual del mockup (HTML raw nei .md) --- */
              .insight-body .figure{margin:36px 0;background:rgba(11,11,12,.02);border:1px solid rgba(11,11,12,.14);border-radius:12px;padding:26px 26px 20px}
              .insight-body .figure .ft{font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#533DFC;margin-bottom:6px}
              .insight-body .figure h4{font-family:var(--font-display,'Clash Display','Inter',sans-serif);font-weight:600;font-size:20px;margin:0 0 18px;color:#0B0B0C;letter-spacing:-.02em;line-height:1.15}
              .insight-body .figure figcaption{margin-top:14px;font-size:14px;color:#3a3b45;max-width:64ch}
              .insight-body .figure figcaption b{color:#0B0B0C;font-weight:600}
              .insight-body .chart{width:100%;height:auto;display:block;overflow:visible}
              .insight-body .chart .gridln{stroke:rgba(11,11,12,.10)}
              .insight-body .chart .axis{stroke:rgba(11,11,12,.22)}
              .insight-body .chart .leak{fill:rgba(83,61,252,.10)}
              .insight-body .chart .lineR{fill:none;stroke:#533DFC;stroke-width:3;stroke-linecap:round}
              .insight-body .chart .lineM{fill:none;stroke:#7E8091;stroke-width:3;stroke-linecap:round}
              .insight-body .chart text{font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:12px;fill:#7E8091}
              .insight-body .chart .lblR{fill:#533DFC;font-weight:600}
              .insight-body .chart .lblM{fill:#7E8091;font-weight:600}
              .insight-body .chart .lblK{fill:#533DFC;font-family:var(--font-emph,'Playfair Display',Georgia,serif);font-style:italic;font-size:15px}
              .insight-body .legend{display:flex;gap:20px;flex-wrap:wrap;margin-top:14px;font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:12px;color:#3a3b45}
              .insight-body .legend span{display:inline-flex;align-items:center;gap:8px}
              .insight-body .legend i{width:16px;height:3px;border-radius:2px;display:inline-block}
              .insight-body .legend i.r{background:#533DFC}
              .insight-body .legend i.m{background:#7E8091}
              .insight-body .legend i.k{width:13px;height:13px;border-radius:3px;background:rgba(83,61,252,.14);border:1px solid rgba(83,61,252,.4)}
              .insight-body .pquote{font-family:var(--font-emph,'Playfair Display',Georgia,serif);font-style:italic;font-size:clamp(20px,2.6vw,26px);line-height:1.4;color:#0B0B0C;border-left:2px solid #533DFC;padding:4px 0 4px 24px;margin:32px 0}
              .insight-body .drivers{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:26px 0}
              .insight-body .driver{background:rgba(11,11,12,.02);border:1px solid rgba(11,11,12,.14);border-radius:12px;padding:22px}
              .insight-body .driver .ic{width:28px;height:28px;color:#533DFC;margin-bottom:12px;display:block}
              .insight-body .driver h5{font-family:var(--font-display,'Clash Display','Inter',sans-serif);font-weight:600;font-size:17px;margin:0 0 6px;color:#0B0B0C}
              .insight-body .driver p{font-size:14px;color:#3a3b45;margin:0}
              @media(max-width:640px){.insight-body .drivers{grid-template-columns:1fr}}
              .insight-body .gtable{margin:32px 0;border:1px solid rgba(11,11,12,.16);border-radius:12px;overflow:hidden;display:block}
              .insight-body .gtable .cap{font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#533DFC;padding:14px 18px;border-bottom:1px solid rgba(11,11,12,.16);background:rgba(83,61,252,.04)}
              .insight-body table.rng{width:100%;border-collapse:collapse;font-size:14.5px;display:table;margin:0;border:none;border-radius:0}
              .insight-body table.rng th{text-align:left;font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#7E8091;padding:12px 18px;border-bottom:1px solid rgba(11,11,12,.16);background:transparent}
              .insight-body table.rng td{padding:13px 18px;border-bottom:1px solid rgba(11,11,12,.09);vertical-align:top;color:#23222e}
              .insight-body table.rng tr:last-child td{border-bottom:none}
              .insight-body table.rng td.v{font-family:var(--font-mono,'IBM Plex Mono',monospace);font-weight:600;color:#0B0B0C;white-space:nowrap}
              .insight-body table.rng .note-td{color:#3a3b45;font-size:13.5px}
              .insight-body .logbox{font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:13px;line-height:1.9;background:#0E0E1C;border:1px solid #26262B;border-radius:12px;padding:22px 24px;color:#c7c7d2;margin:24px 0}
              .insight-body .logbox .p{color:#8CA5F7}
              .insight-body .logbox .d{color:#7E8091}
              .insight-body .logbox .g{color:#1E9E5A}
              .insight-body .callout-txt{margin-top:18px;font-size:16px;color:#3a3b45;max-width:60ch}
              .insight-body .callout-txt b{color:#0B0B0C;font-weight:700}
              .insight-body .inlinecta{background:rgba(11,11,12,.02);border:1px solid rgba(11,11,12,.14);border-radius:12px;padding:26px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin:36px 0}
              .insight-body .inlinecta h3{font-family:var(--font-display,'Clash Display','Inter',sans-serif);font-size:22px;font-weight:600;color:#0B0B0C;margin:0}
              .insight-body .inlinecta p{color:#3a3b45;font-size:14px;margin-top:4px}
              .insight-body .inlinecta .btn{display:inline-block;font-family:var(--font-mono,'IBM Plex Mono',monospace);font-size:12px;font-weight:600;padding:11px 18px;border-radius:8px;background:#533DFC;color:#fff;text-decoration:none}
              .insight-body .inlinecta .btn:hover{background:#392CB8}
            `,
            }}
          />
        </div>
      </section>

      {/* 03 · FAQ · INCHIOSTRO */}
      {article.faq.length > 0 ? (
        <section className="band ink" id="faq">
          <div className="read">
            <div className="eye">{isIt ? "Domande frequenti" : "Frequently asked"}</div>
            <h2 className="mt-3 text-[clamp(22px,3vw,28px)] font-semibold">
              {isIt ? "In tre " : "In three "}
              <span className="emph">{isIt ? "risposte" : "answers"}</span>
            </h2>
            <div className="mt-6">
              {article.faq.map((f, i) => {
                const id = `faq-${kebab(f.q)}-${i}`;
                return (
                  <details
                    key={id}
                    id={id}
                    className="border-t py-5"
                    style={{ borderColor: "#26262B" }}
                  >
                    <summary
                      className="cursor-pointer text-[18px] font-semibold text-carta"
                      style={{ fontFamily: "var(--font-display,'Clash Display','Inter',sans-serif)" }}
                    >
                      {f.q}
                    </summary>
                    <p className="mt-2 text-[15.5px]" style={{ color: "#c2c6d4" }}>
                      {f.a}
                    </p>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* 04 · AUTORE + CORRELATI · CARTA */}
      <section className="band carta">
        <div className="read">
          <div className="flex items-start gap-4">
            <span
              className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-[12px] font-plex text-[20px] font-semibold"
              style={{
                background: "rgba(83,61,252,.1)",
                color: "#533DFC",
                border: "1px solid rgba(83,61,252,.28)",
              }}
            >
              {initials(article.author)}
            </span>
            <div>
              <h4 className="text-[18px] font-semibold">{article.author}</h4>
              {article.authorRole ? (
                <div
                  className="mt-1 font-plex text-[10px] uppercase tracking-[.12em] text-firma"
                >
                  {article.authorRole}
                </div>
              ) : null}
            </div>
          </div>

          {/* concetti correlati (chip) */}
          {article.relatedTerms.length ? (
            <div className="mt-10">
              <div className="font-plex text-[10px] uppercase tracking-[.16em] text-firma">
                {isIt ? "Concetti correlati" : "Related concepts"}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {article.relatedTerms.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full border px-3 py-1 font-plex text-[11px] font-semibold tracking-[.04em] text-firma"
                    style={{
                      background: "rgba(83,61,252,.07)",
                      borderColor: "rgba(83,61,252,.22)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* internal links: navigabili solo se la rotta esiste */}
          {article.internalLinks.length ? (
            <div className="mt-8">
              <div className="font-plex text-[10px] uppercase tracking-[.16em] text-firma">
                {isIt ? "Continua nel percorso" : "Continue the path"}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {article.internalLinks.map((href, i) => {
                  const navigable = isInternalLinkNavigable(href, knownInsightSlugs);
                  const label = href;
                  if (navigable) {
                    return (
                      <li key={i}>
                        <Link
                          href={`${base}${href}`}
                          className="font-plex text-[12px] font-semibold tracking-[.04em] text-firma underline underline-offset-[3px]"
                        >
                          {label} →
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={i}>
                      <span className="font-plex text-[12px] font-semibold tracking-[.04em] text-ombra">
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {/* correlati: altri 3 articoli */}
          {otherArticles.length ? (
            <div className="mt-14">
              <h2 className="text-[clamp(22px,3vw,28px)] font-semibold">
                {isIt ? "Continua a " : "Keep "}
                <span className="emph">{isIt ? "leggere" : "reading"}</span>
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-[18px] md:grid-cols-3">
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`${base}/insights/${a.slug}`}
                    className="block border-t pt-4"
                    style={{ borderColor: "rgba(11,11,12,.16)" }}
                  >
                    <div className="font-plex text-[10px] uppercase tracking-[.12em] text-firma">
                      {a.category}
                    </div>
                    <h3 className="mt-2 text-[17px] font-semibold">{a.title}</h3>
                    <span className="mt-3 inline-block font-plex text-[12px] font-semibold tracking-[.04em] text-firma">
                      {isIt ? "Leggi" : "Read"} ▸
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 05 · CTA QUOTA · INCHIOSTRO */}
      <section className="band ink" id="cta">
        <div className="read text-center">
          <div className="eye">{isIt ? "La misura, prima di tutto" : "Measure, before anything"}</div>
          <h2 className="mx-auto mt-3 max-w-[20ch] text-[clamp(28px,4.4vw,42px)] font-semibold">
            {isIt ? "Il problema che non vedi ha un " : "The problem you don't see has a "}
            <span className="emph">{isIt ? "prezzo" : "price"}</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[15.5px]" style={{ color: "#c2c6d4" }}>
            {isIt
              ? "Prova il ROIometro: seleziona un reparto e vedi, in euro, dove la tua azienda perde valore ogni giorno."
              : "Try the ROIometro: pick a department and see, in euros, where your company loses value every day."}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link className="btn btn-1" href={`${base}/roiometro`}>
              {isIt ? "Calcolalo ▸" : "Calculate it ▸"}
            </Link>
            <Link className="btn btn-2-carta" href={`${base}/chi-siamo`}>
              {isIt ? "Parla con noi" : "Talk to us"}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
