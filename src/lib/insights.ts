import "server-only";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";

/* Gli articoli stanno DENTRO il repo, come il contenuto del playbook.
   Prima questo era un percorso assoluto sul disco di sviluppo: in locale
   funzionava, su Vercel la cartella non esiste e `listArticleFiles` esce
   con una lista vuota (riga sotto, `existsSync`). Non un errore, non un
   build rosso: la sezione Insights sarebbe stata semplicemente vuota in
   produzione, e i 13 articoli avrebbero risposto 404.
   Chi aggiunge un articolo lo mette qui e dichiara il percorso in
   `outputFileTracingIncludes` (next.config.ts), altrimenti il file non
   viene incluso nel bundle serverless. */
export const ARTICLES_DIR = path.join(process.cwd(), "src/content/insights");

export type FaqItem = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  tldr: string;
  faq: FaqItem[];
  relatedTerms: string[];
  internalLinks: string[];
  contentHtml: string;
  coverKind: string;
};

function coerceString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function coerceStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string");
}

function coerceFaq(v: unknown): FaqItem[] {
  if (!Array.isArray(v)) return [];
  const out: FaqItem[] = [];
  for (const item of v) {
    if (item && typeof item === "object") {
      const q = coerceString((item as { q?: unknown }).q);
      const a = coerceString((item as { a?: unknown }).a);
      if (q && a) out.push({ q, a });
    }
  }
  return out;
}

function readArticleFile(fileName: string): Article | null {
  try {
    const fullPath = path.join(ARTICLES_DIR, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data as Record<string, unknown>;
    const body = parsed.content;
    const html = marked.parse(body, { async: false }) as string;
    const slug = coerceString(data.slug) || fileName.replace(/\.md$/, "");
    return {
      slug,
      title: coerceString(data.title),
      metaTitle: coerceString(data.metaTitle) || coerceString(data.title),
      metaDescription: coerceString(data.metaDescription),
      category: coerceString(data.category),
      tags: coerceStringArray(data.tags),
      author: coerceString(data.author, "Morfeus"),
      authorRole: coerceString(data.authorRole, ""),
      datePublished: coerceString(data.datePublished),
      dateModified: coerceString(data.dateModified) || coerceString(data.datePublished),
      readingTime: coerceString(data.readingTime),
      tldr: coerceString(data.tldr),
      faq: coerceFaq(data.faq),
      relatedTerms: coerceStringArray(data.relatedTerms),
      internalLinks: coerceStringArray(data.internalLinks),
      contentHtml: html,
      coverKind: coerceString(data.coverKind),
    };
  } catch {
    return null;
  }
}

function listArticleFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

export function getAllArticles(): Article[] {
  const files = listArticleFiles();
  const articles: Article[] = [];
  for (const f of files) {
    const a = readArticleFile(f);
    if (a) articles.push(a);
  }
  articles.sort((a, b) => (a.datePublished < b.datePublished ? 1 : a.datePublished > b.datePublished ? -1 : 0));
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const files = listArticleFiles();
  for (const f of files) {
    const a = readArticleFile(f);
    if (a && a.slug === slug) return a;
  }
  return null;
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
