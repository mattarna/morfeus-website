import "server-only";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";
import { slugArticoliDi, traduciPercorsoInterno } from "./insights-slugs";
import type { SupportedLocale } from "./seo/public-indexing";

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

/* I LINK DENTRO IL CORPO DELL'ARTICOLO.
   Nel markdown sono scritti senza prefisso di lingua (`/roiometro`,
   `/insights/value-leak`) perche' li' la lingua non si sa. Il guscio
   della pagina aggiunge il prefisso ai suoi link, ma questo HTML esce
   da `marked` e finisce in pagina cosi' com'e': un lettore italiano che
   cliccava "prova il ROIometro" dentro un articolo atterrava sulla
   pagina INGLESE, e nessuno se ne accorgeva perche' la pagina esiste e
   risponde 200.
   Qui si aggiunge il prefisso (vuoto per l'inglese) e si traduce lo
   slug degli articoli, che nelle due lingue e' diverso. Si toccano solo
   gli href che iniziano con "/" e non con "//": esterni, ancore e
   mailto restano intatti. */
function localizzaLink(html: string, locale: SupportedLocale): string {
  const prefisso = locale === "en" ? "" : `/${locale}`;
  return html.replace(/href="\/(?!\/)([^"]*)"/g, (_intero, resto: string) => {
    const percorso = traduciPercorsoInterno(`/${resto}`, locale);
    return `href="${prefisso}${percorso}"`;
  });
}

function readArticleFile(dir: string, fileName: string, locale: SupportedLocale): Article | null {
  try {
    const fullPath = path.join(dir, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data as Record<string, unknown>;
    const body = parsed.content;
    const html = localizzaLink(marked.parse(body, { async: false }) as string, locale);
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

/* La cartella di una lingua. L'italiano sta nella radice (li' erano gia',
   e spostarlo avrebbe cambiato ogni percorso senza guadagnarci niente),
   l'inglese in una sottocartella. `outputFileTracingIncludes` include
   gia' `./src/content/insights/**`, quindi la sottocartella sale su
   Vercel insieme al resto: se un giorno quel percorso venisse ristretto
   alla sola radice, l'inglese sparirebbe in produzione e in locale no. */
function articlesDir(locale: SupportedLocale): string {
  return locale === "en" ? path.join(ARTICLES_DIR, "en") : ARTICLES_DIR;
}

function listArticleFiles(locale: SupportedLocale): string[] {
  const dir = articlesDir(locale);
  /* SI ROMPE FORTE, di proposito.
     Prima qui c'era `if (!existsSync) return []`: se la cartella non
     c'era, la sezione Insights si costruiva con ZERO articoli e i
     tredici slug rispondevano 404. Nessun errore, nessun build rosso,
     nessuno che se ne accorge finche' non apre la pagina. E' gia'
     successo una volta, quando la cartella e' stata spostata.
     La cartella mancante non e' uno stato normale: e' un difetto di
     deploy, e va urlato. Un /insights che esplode si nota in un minuto;
     un /insights vuoto puo' restare online per settimane. */
  if (!fs.existsSync(dir)) {
    throw new Error(
      `Articoli (${locale}) non trovati in ${dir}. ` +
        "Se succede in produzione, i file non sono saliti insieme alla funzione: " +
        "controlla outputFileTracingIncludes in next.config.mjs."
    );
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  /* Cartella presente ma vuota: non e' un difetto di deploy, quindi non
     esplode, ma non deve nemmeno passare inosservato. */
  if (files.length === 0) {
    console.error(`[insights] nessun articolo in ${dir}: la sezione sara' vuota.`);
  }
  return files;
}

/* LE DUE LINGUE DEVONO COMBACIARE, e se non combaciano il build cade.
   `COPPIE_SLUG_ARTICOLI` e' quello che finisce in sitemap e negli
   hreflang: se un articolo c'e' in italiano e manca in inglese, la
   sitemap annuncia ai motori un indirizzo che risponde 404, e un file
   inglese orfano e' un articolo che nessuno raggiunge. Nessuno dei due
   e' visibile guardando il sito, quindi si urla qui. */
function verificaCoppie(slugTrovati: string[], locale: SupportedLocale): void {
  const attesi = new Set(slugArticoliDi(locale));
  const trovati = new Set(slugTrovati);
  const mancanti = [...attesi].filter((s) => !trovati.has(s));
  const orfani = [...trovati].filter((s) => !attesi.has(s));
  if (mancanti.length === 0 && orfani.length === 0) return;
  const pezzi = [
    mancanti.length ? `manca il file di: ${mancanti.join(", ")}` : "",
    orfani.length ? `nessuna coppia dichiarata per: ${orfani.join(", ")}` : "",
  ].filter(Boolean);
  throw new Error(
    `[insights] gli articoli ${locale} non combaciano con COPPIE_SLUG_ARTICOLI (src/lib/insights-slugs.ts): ` +
      `${pezzi.join("; ")}.`
  );
}

export function getAllArticles(locale: SupportedLocale): Article[] {
  const dir = articlesDir(locale);
  const files = listArticleFiles(locale);
  const articles: Article[] = [];
  for (const f of files) {
    const a = readArticleFile(dir, f, locale);
    if (a) articles.push(a);
  }
  verificaCoppie(articles.map((a) => a.slug), locale);
  articles.sort((a, b) => (a.datePublished < b.datePublished ? 1 : a.datePublished > b.datePublished ? -1 : 0));
  return articles;
}

export function getArticleBySlug(slug: string, locale: SupportedLocale): Article | null {
  const dir = articlesDir(locale);
  for (const f of listArticleFiles(locale)) {
    const a = readArticleFile(dir, f, locale);
    if (a && a.slug === slug) return a;
  }
  return null;
}

export function getArticleSlugs(locale: SupportedLocale): string[] {
  return getAllArticles(locale).map((a) => a.slug);
}
