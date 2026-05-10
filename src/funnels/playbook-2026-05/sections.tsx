import fs from "fs";
import path from "path";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { FunnelStepConfig } from "@/funnels/types";
import { DayFilter } from "./DayFilter";
import { BackToTop } from "./BackToTop";
import { PlaybookDownloadGate, PlaybookOptinForm } from "./DownloadGate";
import { ReadingProgress, ActiveTocClient } from "./ModuleReader";
import { SharePill } from "./SharePill";
import styles from "./sections.module.css";

interface RenderContext {
  sectionKind?: "summary" | "action" | "connections";
}

interface TocEntry {
  title: string;
  href: string;
  level: 2 | 3;
}

interface SectionProps {
  step: FunnelStepConfig;
}

const contentDir = path.join(process.cwd(), "src", "funnels", "playbook-2026-05", "content");
const PLAYBOOK_PATH = "/playbook-imprenditore-milionario";
const PLAYBOOK_URL = "https://morfeushub.com/playbook-imprenditore-milionario";
const QR_IMAGE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=760x760&margin=24&data=${encodeURIComponent(PLAYBOOK_URL)}`;
const CALENDLY_URL = "https://calendar.app.google/tnwMpJBnXuZQnKXC9";
const WHATSAPP_MESSAGE =
  "Ciao Matteo, ero all'evento Infobusiness Milionario e vorrei capire come funziona il tuo sistema AI.";
const WHATSAPP_URL = `https://wa.me/393388368457?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const SUBSTACK_URL = "https://matteoarnaboldi.substack.com";

const modules = [
  {
    id: "modulo-01",
    number: "01",
    file: "01-marco-regole-infobusiness.md",
    title: "Le Nuove Regole dell'Infobusiness",
    speaker: "Mario Olivelli",
    duration: "76 min",
    color: "#EB7A2E",
    focus: "Diagnosi mercato, 4 pilastri, ecosistema",
    tags: ["mercato", "ecosistema", "vendita", "AI"],
    day: 1,
  },
  {
    id: "modulo-02",
    number: "02",
    file: "02-michele-offerte-conversione.md",
    title: "La Leva Invisibile delle Offerte",
    speaker: "Michele Sainville",
    duration: "28 min",
    color: "#7B68EE",
    focus: "High ticket, pre-qualifica, frizione produttiva",
    tags: ["offerta", "pricing", "conversione"],
    day: 1,
  },
  {
    id: "modulo-03",
    number: "03",
    file: "03-roberto-war-machine.md",
    title: "The War Machine",
    speaker: "Roberto Resta",
    duration: "31 min",
    color: "#B5F03A",
    focus: "Workshop, VSL, CAC/LTV, scaling",
    tags: ["funnel", "liquidita", "ads"],
    day: 1,
  },
  {
    id: "modulo-04",
    number: "04",
    file: "04-federico-creativita-advertising.md",
    title: "Creativita, Organico e Advertising",
    speaker: "Federico Giannini",
    duration: "27 min",
    color: "#38BDF8",
    focus: "Angoli creativi, organico, unit economics",
    tags: ["creativita", "organico", "advertising"],
    day: 1,
  },
  {
    id: "modulo-05",
    number: "05",
    file: "05-formula-partner-incubatore.md",
    title: "Da Agenzia a Incubatore",
    speaker: "Marco Lutzu",
    duration: "43 min",
    color: "#F43F5E",
    focus: "Formula Partner, bootstrapping, hiring",
    tags: ["partner", "incubatore", "team"],
    day: 1,
  },
  {
    id: "modulo-06",
    number: "06",
    file: "06-simone-vendita-etica.md",
    title: "Vendita Etica dalla Nicchia",
    speaker: "Simone Rossi",
    duration: "25 min",
    color: "#FBBF24",
    focus: "Fiducia, palco, storytelling, vendita",
    tags: ["vendita", "fiducia", "storytelling"],
    day: 1,
  },
  {
    id: "modulo-07",
    number: "07",
    file: "07-michelangelo-meta-ads.md",
    title: "Framework Operativo Meta Ads",
    speaker: "Michelangelo Acquino",
    duration: "33 min",
    color: "#22C55E",
    focus: "Stabilita algoritmica, budget, stop loss",
    tags: ["Meta Ads", "tracking", "scaling"],
    day: 1,
  },
  {
    id: "modulo-08",
    number: "08",
    file: "08-gio-disiena-ai-memoria.md",
    title: "AI Memory Architecture",
    speaker: "Joe Di Siena",
    duration: "30 min",
    color: "#A855F7",
    focus: "WikiLLM, MCP server, auto-research",
    tags: ["AI", "memoria", "WikiLLM"],
    day: 1,
  },
  {
    id: "modulo-09",
    number: "09",
    file: "09-alfio-bardolla-infobusiness-impresa.md",
    title: "Da Infobusiness a Impresa",
    speaker: "Alfio Bardolla",
    duration: "54 min",
    color: "#F59E0B",
    focus: "Cash cow, struttura aziendale, ricchezza generazionale",
    tags: ["struttura", "delega", "diversificazione"],
    day: 1,
  },
  {
    id: "modulo-10",
    number: "10",
    file: "10-transfer-manager-protezione-patrimoniale.md",
    title: "Protezione Patrimoniale e Ottimizzazione Fiscale",
    speaker: "Simone Giannetti",
    duration: "44 min",
    color: "#06B6D4",
    focus: "Malta, Panama, LLC USA, exit tax, residenza fiscale",
    tags: ["fiscale", "protezione", "geopolitica"],
    day: 1,
  },
  {
    id: "modulo-11",
    number: "11",
    file: "11-soro-youtube-personal-brand.md",
    title: "YouTube come Motore di Fiducia",
    speaker: "Amin Halibi",
    duration: "26 min",
    color: "#EF4444",
    focus: "Personal brand, contenuto educativo, video conversione",
    tags: ["YouTube", "personal brand", "organico"],
    day: 1,
  },
  {
    id: "modulo-12",
    number: "12",
    file: "12-mik-cosentino-micro-personal-brand.md",
    title: "Micro Personal Brand e Instagram Authority Funnel",
    speaker: "Mik Cosentino",
    duration: "56 min",
    color: "#EC4899",
    focus: "Instagram funnel, supply-demand, vendita 1-a-tanti",
    tags: ["Instagram", "personal brand", "vendita 1-a-tanti"],
    day: 2,
  },
  {
    id: "modulo-13",
    number: "13",
    file: "13-paolo-lucelli-sette-regole-grande-impresa.md",
    title: "Sette Regole per Costruire una Grande Impresa di Servizi",
    speaker: "Paolo Ruggeri",
    duration: "50 min",
    color: "#6366F1",
    focus: "Management, partnership, scuola interna, scambio in abbondanza",
    tags: ["management", "partnership", "organigramma"],
    day: 2,
  },
  {
    id: "modulo-14",
    number: "14",
    file: "14-marco-postiglione-ciclo-reinvenzione.md",
    title: "Il Ciclo della Reinvenzione e i 4 Principi Immutabili",
    speaker: "Marco Postiglione",
    duration: "53 min",
    color: "#14B8A6",
    focus: "Ciclo reinvenzione, intensita, frequenza, mindset",
    tags: ["reinvenzione", "mindset", "resilienza"],
    day: 2,
  },
] as const;

function getModuleByStep(stepId: string) {
  return modules.find((module) => module.id === stepId) ?? modules[0];
}

function readModule(file: string): string {
  return fs.readFileSync(path.join(contentDir, "moduli", file), "utf8");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function convertHref(href: string): string {
  if (href === "../index.md") return PLAYBOOK_PATH;
  const match = href.match(/(\d{2})-/);
  if (match) return `${PLAYBOOK_PATH}/modulo-${match[1]}`;
  return href;
}

function inlineMarkdown(value: string): string {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    return `<a href="${escapeHtml(convertHref(href))}">${label}</a>`;
  });
  return html;
}

function isTableDivider(line: string): boolean {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line);
}

function renderTable(lines: string[], context?: RenderContext): string {
  const rows = lines
    .filter((line) => !isTableDivider(line))
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => inlineMarkdown(cell.trim()))
    );

  if (rows.length === 0) return "";
  const [head, ...body] = rows;

  const headerLooksLikeMeta =
    head.length === 2 &&
    /\bcampo\b/i.test(head[0]) &&
    /(dettaglio|valore)/i.test(head[1]);
  if (headerLooksLikeMeta) {
    const items = body
      .map(
        (row) =>
          `<div class="${styles.metaChip}"><span>${row[0]}</span><strong>${row[1] ?? ""}</strong></div>`
      )
      .join("");
    return `<div class="${styles.metaStrip}">${items}</div>`;
  }

  if (context?.sectionKind === "connections" && head.length === 2) {
    const items = body
      .map((row) => {
        const cell = row[0] ?? "";
        const linkMatch = cell.match(/<a href="([^"]+)">([^<]+)<\/a>/);
        const href = linkMatch ? linkMatch[1] : "#";
        const label = linkMatch ? linkMatch[2] : cell;
        const description = row[1] ?? "";
        return `<a class="${styles.connectionCard}" href="${href}"><span class="${styles.connectionLabel}"><strong>${label}</strong><span>${description}</span></span><span class="${styles.connectionArrow}" aria-hidden>→</span></a>`;
      })
      .join("");
    return `<div class="${styles.connectionsGrid}">${items}</div>`;
  }

  return `
    <div class="${styles.tableWrap}">
      <table>
        <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderList(lines: string[], ordered: boolean): string {
  const tag = ordered ? "ol" : "ul";
  const items = lines.map((line) => {
    const text = ordered ? line.replace(/^\d+\.\s+/, "") : line.replace(/^-\s+/, "");
    const checkbox = text.match(/^\[( |x|X)\]\s+(.*)$/);
    if (checkbox) {
      const checked = checkbox[1].toLowerCase() === "x" ? " checked" : "";
      return `<li><input type="checkbox" disabled${checked}> ${inlineMarkdown(checkbox[2])}</li>`;
    }
    return `<li>${inlineMarkdown(text)}</li>`;
  });
  return `<${tag}>${items.join("")}</${tag}>`;
}

function detectSectionKind(title: string): RenderContext["sectionKind"] | undefined {
  const lower = title.toLowerCase();
  if (lower.includes("30 secondi") || lower.startsWith("in 30")) return "summary";
  if (lower.includes("quick win")) return "action";
  if (lower.includes("connessioni")) return "connections";
  return undefined;
}

function renderLines(lines: string[], context?: RenderContext): string {
  const html: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed || trimmed === "---") {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("|") && lines[index + 1] && isTableDivider(lines[index + 1].trim())) {
      const table: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        table.push(lines[index]);
        index += 1;
      }
      html.push(renderTable(table, context));
      continue;
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].replace(/^#+\s*/, "");
      html.push(`<h${level} id="${slugify(text)}">${inlineMarkdown(text)}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quotes: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quotes.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote><p>${inlineMarkdown(quotes.join(" "))}</p></blockquote>`);
      continue;
    }

    if (/^-\s+/.test(trimmed)) {
      const list: string[] = [];
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        list.push(lines[index].trim());
        index += 1;
      }
      html.push(renderList(list, false));
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const list: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        list.push(lines[index].trim());
        index += 1;
      }
      html.push(renderList(list, true));
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("```") &&
      !lines[index].trim().startsWith("|") &&
      !lines[index].trim().startsWith(">") &&
      !/^#{2,4}\s+/.test(lines[index].trim()) &&
      !/^-+\s*$/.test(lines[index].trim()) &&
      !/^-\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }

  return html.join("\n");
}

function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const segments: { title: string; lines: string[] }[] = [];
  const pre: string[] = [];
  let current: { title: string; lines: string[] } | null = null;

  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      if (current) segments.push(current);
      current = { title: m[1].trim(), lines: [line] };
    } else if (current) {
      current.lines.push(line);
    } else {
      pre.push(line);
    }
  }
  if (current) segments.push(current);

  const out: string[] = [];
  if (pre.some((l) => l.trim())) {
    out.push(renderLines(pre));
  }
  for (const seg of segments) {
    const kind = detectSectionKind(seg.title);
    const inner = renderLines(seg.lines, { sectionKind: kind });
    if (kind === "summary") {
      out.push(`<section class="${styles.summaryCard}" data-section-kind="summary">${inner}</section>`);
    } else if (kind === "action") {
      out.push(`<section class="${styles.actionCard}" data-section-kind="action">${inner}</section>`);
    } else if (kind === "connections") {
      out.push(`<section class="${styles.connectionsSection}" data-section-kind="connections">${inner}</section>`);
    } else {
      out.push(inner);
    }
  }
  return out.join("\n");
}

function extractBody(markdown: string): string {
  const parts = markdown.split(/\n---\n/);
  return parts.length > 1 ? parts.slice(1).join("\n---\n") : markdown;
}

function extractToc(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      const title = h2[1].trim();
      entries.push({ title, href: `#${slugify(title)}`, level: 2 });
      continue;
    }
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      const title = h3[1].trim();
      entries.push({ title, href: `#${slugify(title)}`, level: 3 });
    }
  }
  return entries;
}

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href={PLAYBOOK_PATH}>
        <span className={styles.brandDot} aria-hidden />
        Morfeus Playbook
      </Link>
      <nav className={styles.nav} aria-label="Navigazione playbook">
        <Link href={PLAYBOOK_PATH}>Indice</Link>
        <a href={`${PLAYBOOK_PATH}#moduli`}>Moduli</a>
        <a className={styles.navCta} href={`${PLAYBOOK_PATH}#download`}>
          Folder Claude
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerBrand}>
        <span className={styles.brandDot} aria-hidden />
        <strong>Morfeus Hub</strong> · Playbook Infobusiness Milionario
      </span>
      <span>© 2026 Morfeus</span>
    </footer>
  );
}

export function PlaybookHomeSection() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroLayout}>
          <div>
            <span className={styles.kickerPill}>
              <span className={styles.kickerPillDot} aria-hidden />
              Materiali Infobusiness Milionario
            </span>
            <h1>
              Due giornate.<br />
              +15 speaker.<br />
              <span className={styles.accent}>Il cervello per il tuo Claude.</span>
            </h1>
            <p className={styles.heroLead}>
              Tutto quello che è stato detto a Infobusiness Milionario, distillato in playbook
              operativi. Framework testati. Checklist pronte.
            </p>
            <p className={styles.heroLead}>
              Scorri e studia tutto. Oppure scarica la folder .md e caricala nel tuo Claude
              {" — "}lui saprà tutto per sempre.
            </p>
            <div className={styles.heroCtaRow}>
              <a className={styles.primaryButton} href="#download">
                Voglio la folder
              </a>
              <a className={styles.secondaryButton} href="#moduli">
                Vai ai moduli
              </a>
            </div>
            <div className={styles.heroProofBar}>
              <span><strong>11</strong> speaker</span>
              <span><strong>417</strong> minuti</span>
              <span><strong>80+</strong> azioni</span>
              <span><strong>25+</strong> framework</span>
            </div>
          </div>
          <aside className={styles.heroCard}>
            <h2>Vuoi anche il cervello per Claude?</h2>
            <p>
              Tutti i materiali che trovi qui sotto esistono anche come file .md strutturati
              {" — "}pensati per essere caricati nella tua AI. Trascina la folder nel tuo Claude
              e lui avrà accesso a playbook, framework, checklist e connessioni tra i moduli.
              Senza ricopiare nulla.
            </p>
            <PlaybookOptinForm />
          </aside>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.statSection} aria-label="Statistiche playbook">
        <p className={styles.sectionLabel}>Cosa c&apos;e dentro</p>
        <div className={styles.statGrid}>
          <div className={styles.stat}>
            <strong>11</strong>
            <span>speaker dal palco</span>
          </div>
          <div className={styles.stat}>
            <strong>417</strong>
            <span>minuti di contenuto</span>
          </div>
          <div className={styles.stat}>
            <strong>80+</strong>
            <span>azioni operative</span>
          </div>
          <div className={styles.stat}>
            <strong>25+</strong>
            <span>framework proprietari</span>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section} id="moduli">
        <p className={styles.sectionLabel}>Indice playbook</p>
        <h2 className={styles.sectionTitle}>
          Scegli il modulo da <span className={styles.accent}>applicare adesso.</span>
        </h2>
        <p className={styles.sectionLead}>
          Playbook autonomi divisi in due giornate. Ognuno e un sistema operativo: framework,
          esempi, checklist. Apri quello che ti serve, applica, torna alla folder per il prossimo.
        </p>
        <DayFilter modules={modules} basePath={PLAYBOOK_PATH} />
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <PlaybookDownloadGate />
      </section>
      <Footer />
      <SharePill />
    </div>
  );
}

export function PlaybookModuleSection({ step }: SectionProps) {
  const playbookModule = getModuleByStep(step.id);
  const markdown = readModule(playbookModule.file);
  const body = extractBody(markdown);
  const html = renderMarkdown(body);
  const toc = extractToc(body);
  const currentIndex = modules.findIndex((item) => item.id === playbookModule.id);
  const previous = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const next = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 220));

  return (
    <div className={styles.page} style={{ "--speaker": playbookModule.color } as CSSProperties}>
      <ReadingProgress />
      <Header />
      <section className={styles.moduleHero}>
        <Link className={styles.moduleHeroBack} href={PLAYBOOK_PATH}>
          <span aria-hidden>←</span> Torna all&apos;indice playbook
        </Link>
        <div className={styles.moduleHeroInner}>
          <div>
            <span className={styles.kickerPill} data-tone="speaker">
              <span className={styles.kickerPillDot} aria-hidden />
              Modulo {playbookModule.number} · {playbookModule.speaker}
            </span>
            <h1>{playbookModule.title}</h1>
            <div className={styles.moduleMeta}>
              <span className={styles.moduleMetaSpeaker}>{playbookModule.speaker}</span>
              <span>{playbookModule.duration} dal palco</span>
              <span>{readMinutes} min di lettura</span>
              <span>{playbookModule.focus}</span>
            </div>
          </div>
          <span className={styles.moduleNumberMega} aria-hidden>
            {playbookModule.number}
          </span>
        </div>
      </section>

      <div className={styles.divider} />

      <div className={styles.moduleLayout}>
        <aside className={styles.toc} aria-label="Indice modulo">
          <p className={styles.tocLabel}>Indice modulo</p>
          <Link className={styles.tocBack} href={PLAYBOOK_PATH}>
            <span aria-hidden>←</span> Tutti i moduli
          </Link>
          <nav className={styles.tocNav}>
            {toc.map((item) => (
              <a
                href={item.href}
                key={item.href}
                data-toc-link
                data-toc-level={item.level}
                className={item.level === 3 ? styles.tocSub : styles.tocMain}
              >
                {item.title}
              </a>
            ))}
          </nav>
          <a className={styles.tocFolder} href="#download">
            Ricevi la folder Claude →
          </a>
        </aside>
        <article className={styles.article} data-article-root>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <nav className={styles.moduleFooterNav} aria-label="Navigazione moduli">
            {previous ? (
              <Link className={styles.textLink} href={`${PLAYBOOK_PATH}/${previous.id}`}>
                <span aria-hidden>←</span> Modulo {previous.number}
              </Link>
            ) : (
              <span />
            )}
            <Link className={styles.textLink} href={PLAYBOOK_PATH}>
              Torna all&apos;indice
            </Link>
            {next ? (
              <Link className={styles.textLink} href={`${PLAYBOOK_PATH}/${next.id}`}>
                Modulo {next.number} <span aria-hidden>→</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>
      <ActiveTocClient />

      <div className={styles.divider} />

      <section className={styles.section}>
        <PlaybookDownloadGate />
      </section>
      <Footer />
      <BackToTop />
    </div>
  );
}

export function PlaybookThankYouSection() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.thankYouHero}>
        <span className={styles.thankYouBadge}>Sei dentro</span>
        <h1>
          Lunedi ti mando la <span className={styles.accent}>folder completa</span>.
        </h1>
        <p>
          Sto mettendo insieme tutto in modo utile: non un archivio buttato li, ma una folder{" "}
          <span className={styles.accent}>per il tuo Claude</span>. Il cervello operativo
          dell&apos;evento, pronto da caricare.
        </p>
      </section>

      <div className={styles.divider} />

      <section className={styles.tySection}>
        <p className={styles.sectionLabel}>Cosa c&apos;e dentro</p>
        <h2 className={styles.tySectionTitle}>
          Non e un PDF di appunti. Non e una trascrizione.<br />
          <span className={styles.accent}>E una knowledge base operativa.</span>
        </h2>
        <p className={styles.tySectionLead}>
          Ogni intervento dell&apos;evento e stato trasformato in un modulo strutturato,
          progettato per essere caricato nel tuo Claude e trasformarlo in un esperto di tutto
          cio che e stato detto sul palco.
        </p>

        <div className={styles.featureCard}>
          <p className={styles.featureCardKicker}>Dentro ogni modulo trovi:</p>
          <ul className={styles.featureList}>
            <li>
              <strong>Playbook eseguibili.</strong> Azioni divise per priorita: Quick Win (48h),
              Medio Termine (30gg), Strategici (90gg).
            </li>
            <li>
              <strong>Framework completi.</strong> Ogni modello con step, quando usarlo e limiti.
            </li>
            <li>
              <strong>Knowledge base.</strong> I concetti chiave spiegati in autonomia, senza
              riguardare i video.
            </li>
            <li>
              <strong>Checklist prioritizzate.</strong> To-do con P1/P2/P3 e dipendenze tra moduli.
            </li>
            <li>
              <strong>Connessioni cross-speaker.</strong> Come i framework di uno speaker
              potenziano quelli di un altro.
            </li>
          </ul>

          <div className={styles.featureStripe}>
            <strong>13 speaker dal palco. 100+ azioni operative. 35+ framework.</strong>
            <span>Tutto organizzato, collegato, pronto.</span>
          </div>
        </div>

        <p className={styles.tySectionOutro}>
          Tu carichi la folder nel tuo Claude. Lui sa tutto. Tu chiedi, lui risponde con il
          contesto dell&apos;intero evento, come avere un consulente che era seduto in prima
          fila e ha memorizzato ogni parola.
        </p>
      </section>

      <div className={styles.divider} />

      <section className={styles.plotTwist}>
        <div className={styles.plotTwistInner}>
          <p className={styles.sectionLabel}>Una cosa che devi sapere</p>
          <h2 className={styles.plotTwistTitle}>
            Tutto questo lo hanno costruito in poche ore<br />
            <span className={styles.accent}>i miei dipendenti AI.</span>
          </h2>
          <p>
            I playbook, i framework, le connessioni tra speaker, l&apos;intero sistema.
            Mentre facevo altro.
          </p>
          <p>
            Non e magia. E un sistema. Lo stesso che uso ogni giorno per costruire funnel,
            scrivere copy, lanciare campagne, creare contenuti, senza fare quasi nulla
            manualmente.
          </p>

          <div className={styles.plotTwistSignature}>
            <div className={styles.plotTwistPhoto}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/matteo-arnaboldi-hoodie.png" alt="Matteo Arnaboldi, founder di Morfeus" />
            </div>
            <div className={styles.plotTwistByline}>
              <strong>Matteo Arnaboldi</strong>
              <span>@ceo morfeus hub</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.tySection}>
        <p className={styles.sectionLabel}>Proof</p>
        <h2 className={styles.tySectionTitle}>
          I numeri che l&apos;AI ci ha permesso di ottenere.<br />
          <span className={styles.accent}>Totally crazy.</span>
        </h2>

        <div className={styles.proofGrid}>
          <div className={styles.proofCard}>
            <strong>2.000 persone</strong>
            <span>
              su un webinar in organico. Zero euro in ads. Funnel intero costruito dall&apos;AI.
            </span>
          </div>
          <div className={styles.proofCard}>
            <strong>4,7M impression</strong>
            <span>
              + 80K interazioni su LinkedIn in 13 mesi. Contenuti, strategia, engagement.
              Tutto generato dal sistema.
            </span>
          </div>
          <div className={styles.proofCard}>
            <strong>2 newsletter attive</strong>
            <span>
              Una in italiano (6.300+ iscritti), una in inglese (3.700+ subscribers). Stesso
              approccio. Tutto automatizzato. Open rate medio del 41%.
            </span>
          </div>
        </div>

        <div className={styles.proofShots}>
          <figure className={styles.proofShot}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/playbook-assets/linkedin-impressions.png" alt="LinkedIn analytics di Matteo Arnaboldi: 4.793.772 impression in 13 mesi" />
            <figcaption>
              <span className={styles.proofShotChannel}>LinkedIn</span>
              <span className={styles.proofShotMetric}>4.793.772 impression · +1.747%</span>
            </figcaption>
          </figure>
          <figure className={styles.proofShot}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/playbook-assets/linkedin-followers.png" alt="LinkedIn analytics di Matteo Arnaboldi: 80.453 interazioni" />
            <figcaption>
              <span className={styles.proofShotChannel}>LinkedIn</span>
              <span className={styles.proofShotMetric}>80.453 interazioni · 38.917 reazioni</span>
            </figcaption>
          </figure>
          <figure className={styles.proofShot}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/playbook-assets/substack-ita.png" alt="Newsletter Substack italiana matteoarnaboldi.substack.com con 6357 abbonati" />
            <figcaption>
              <span className={styles.proofShotChannel}>
                Substack <em className={styles.proofShotLang} data-lang="ita">IT</em>
              </span>
              <span className={styles.proofShotMetric}>matteoarnaboldi.substack.com · 6.357 abbonati · +422%</span>
            </figcaption>
          </figure>
          <figure className={styles.proofShot}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/playbook-assets/substack-eng.png" alt="Newsletter Substack inglese aiespressotechbrew.substack.com con 3702 subscribers" />
            <figcaption>
              <span className={styles.proofShotChannel}>
                Substack <em className={styles.proofShotLang} data-lang="eng">EN</em>
              </span>
              <span className={styles.proofShotMetric}>aiespressotechbrew.substack.com · 3.702 subscribers</span>
            </figcaption>
          </figure>
        </div>

        <div className={styles.logoBar} aria-label="Hanno lavorato con noi">
          <span>Zara</span>
          <span>Enel</span>
          <span>H Farm</span>
          <span>Il Sole 24 Ore</span>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.thankYouGrid}>
        <div className={styles.thankYouMain}>
          <p className={styles.sectionLabel}>Morfeus</p>
          <h2>
            Mi trovi <span className={styles.accent}>qui sotto.</span>
          </h2>
          <p>
            Scrivo, parlo e lavoro su queste piattaforme. Se ti va di restare in giro,
            da qualcuna di queste passa qualcosa di utile quasi ogni settimana.
          </p>
          <div className={styles.linkGrid}>
            <a href="/" className={styles.resourceCard}>
              <span className={`${styles.resourceCardIcon} ${styles.iconWebsite}`} aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <span className={styles.resourceCardLabel}>
                <span>Website</span>
                <strong>Vai alla home Morfeus</strong>
              </span>
              <span className={styles.resourceCardArrow} aria-hidden>→</span>
            </a>
            <a href="https://www.linkedin.com/in/matteo-arnaboldi/" target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
              <span className={`${styles.resourceCardIcon} ${styles.iconLinkedin}`} aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </span>
              <span className={styles.resourceCardLabel}>
                <span>LinkedIn</span>
                <strong>Segui Matteo Arnaboldi</strong>
              </span>
              <span className={styles.resourceCardArrow} aria-hidden>→</span>
            </a>
            <a href="https://www.instagram.com/its.matteoarnaboldi/" target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
              <span className={`${styles.resourceCardIcon} ${styles.iconInstagram}`} aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span className={styles.resourceCardLabel}>
                <span>Instagram</span>
                <strong>Seguimi anche li</strong>
              </span>
              <span className={styles.resourceCardArrow} aria-hidden>→</span>
            </a>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
              <span className={`${styles.resourceCardIcon} ${styles.iconSubstack}`} aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              </span>
              <span className={styles.resourceCardLabel}>
                <span>Substack</span>
                <strong>La newsletter</strong>
              </span>
              <span className={styles.resourceCardArrow} aria-hidden>→</span>
            </a>
          </div>

        </div>

        <aside className={styles.thankYouCta}>
          <p className={styles.sectionLabel}>Se hai bisogno di una mano</p>
          <h2 className={styles.thankYouCtaTitle}>
            Facciamoci <span className={styles.accent}>due chiacchiere.</span>
          </h2>
          <p className={styles.thankYouCtaLead}>
            15 minuti, una call. Mi racconti cosa stai costruendo, ti mostro come l&apos;AI puo
            farti risparmiare ore (o settimane) di lavoro. Niente pitch, niente catalogo corsi:
            solo il sistema che uso ogni giorno.
          </p>

          <span className={styles.thankYouCtaAvailability}>Slot aperti questa settimana</span>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.calendarCta}
          >
            <span className={styles.calendarCtaIcon} aria-hidden>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <span className={styles.calendarCtaLabel}>
              <strong>Prenota la call su Google Calendar</strong>
              <span>Scegli tu data e orario · 15 min · no impegno</span>
            </span>
            <span className={styles.calendarCtaArrow} aria-hidden>→</span>
          </a>

          <p className={styles.thankYouCtaOr}>
            <span>oppure</span>
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappCta}
          >
            <span className={styles.whatsappCtaIcon} aria-hidden>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </span>
            <span>Scrivimi su WhatsApp</span>
          </a>
        </aside>
      </section>
      <Footer />
      <SharePill />
    </div>
  );
}

export function PlaybookQrSection() {
  return (
    <div className={styles.qrPage}>
      <div className={styles.qrContent}>
        <div className={styles.qrCopy}>
          <span className={styles.kickerPill}>
            <span className={styles.kickerPillDot} aria-hidden />
            Scansiona ora
          </span>
          <h1>
            Playbook <span className={styles.accent}>Imprenditore Milionario.</span>
          </h1>
          <p>
            Apri la pagina, scegli il modulo che ti serve e lascia l&apos;email per ricevere
            la folder completa da usare con Claude.
          </p>
          <div className={styles.qrUrl}>{PLAYBOOK_URL.replace("https://", "")}</div>
        </div>
        <div className={styles.qrFrame}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={QR_IMAGE_URL} alt="QR code per aprire il Playbook Imprenditore Milionario" />
        </div>
      </div>
    </div>
  );
}
