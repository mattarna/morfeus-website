import fs from "fs";
import path from "path";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { FunnelStepConfig } from "@/funnels/types";
import { DayFilter } from "./DayFilter";
import { PlaybookDownloadGate, PlaybookOptinForm } from "./DownloadGate";
import { ReadingProgress, ActiveTocClient } from "./ModuleReader";
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

const modules = [
  {
    id: "modulo-01",
    number: "01",
    file: "01-marco-regole-infobusiness.md",
    title: "Le Nuove Regole dell'Infobusiness",
    speaker: "Marco",
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
    speaker: "Michele",
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
    speaker: "Roberto",
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
    speaker: "Federico",
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
    speaker: "Marco + Socio",
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
    speaker: "Michelangelo",
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
    speaker: "Transfer Manager",
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
    speaker: "Soro",
    duration: "26 min",
    color: "#EF4444",
    focus: "Personal brand, contenuto educativo, video conversione",
    tags: ["YouTube", "personal brand", "organico"],
    day: 1,
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
  let pre: string[] = [];
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
          Sto mettendo insieme tutto in modo utile: non un archivio buttato li, ma una folder
          pensata per diventare il cervello operativo del tuo Claude su questo tema.
        </p>
      </section>

      <div className={styles.divider} />

      <section className={styles.thankYouGrid}>
        <div className={styles.thankYouMain}>
          <p className={styles.sectionLabel}>Morfeus</p>
          <h2>
            Se vuoi usare l&apos;AI seriamente, sei <span className={styles.accent}>nel posto giusto.</span>
          </h2>
          <p>
            Morfeus aiuta imprenditori, creator e team a trasformare Claude e gli strumenti AI
            in sistemi di lavoro reali: processi, skill, automazioni, playbook e formazione
            applicata. Meno prompt casuali. Piu metodo.
          </p>
          <div className={styles.linkGrid}>
            <a href="/" className={styles.resourceCard}>
              <span className={styles.resourceCardLabel}>
                <span>Website</span>
                <strong>Vai alla home Morfeus</strong>
              </span>
              <span className={styles.resourceCardArrow} aria-hidden>→</span>
            </a>
            <a href="https://www.linkedin.com/in/matteo-arnaboldi/" className={styles.resourceCard}>
              <span className={styles.resourceCardLabel}>
                <span>LinkedIn</span>
                <strong>Segui Matteo Arnaboldi</strong>
              </span>
              <span className={styles.resourceCardArrow} aria-hidden>→</span>
            </a>
            <a href="https://www.instagram.com/its.matteoarnaboldi/" className={styles.resourceCard}>
              <span className={styles.resourceCardLabel}>
                <span>Instagram</span>
                <strong>Seguimi anche li</strong>
              </span>
              <span className={styles.resourceCardArrow} aria-hidden>→</span>
            </a>
          </div>
        </div>

        <aside className={styles.thankYouSide}>
          <p className={styles.sectionLabel}>Prossimo step</p>
          <h2>
            Formati su Claude <span className={styles.accent}>con metodo.</span>
          </h2>
          <p>
            Se vuoi capire come usare Claude e l&apos;AI nel lavoro vero, questi sono i due percorsi
            da guardare adesso.
          </p>
          <div className={styles.stackLinks}>
            <a href="/claude-unlocked" className={`${styles.primaryButton} ${styles.ctaLg}`}>
              Claude Unlocked
            </a>
            <a href="/bootcamp-ai-champion-3a-edizione" className={`${styles.primaryButtonLime} ${styles.ctaLg}`}>
              Bootcamp AI Champion
            </a>
          </div>
        </aside>
      </section>
      <Footer />
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
