import fs from "fs";
import path from "path";
import Link from "next/link";
import type { FunnelStepConfig } from "@/funnels/types";
import { PlaybookDownloadGate } from "./DownloadGate";
import styles from "./sections.module.css";

interface SectionProps {
  step: FunnelStepConfig;
}

const contentDir = path.join(process.cwd(), "src", "funnels", "playbook-2026-05", "content");

const modules = [
  {
    id: "modulo-01",
    number: "01",
    file: "01-marco-regole-infobusiness.md",
    title: "Le Nuove Regole dell'Infobusiness",
    speaker: "Marco",
    duration: "76 min",
    focus: "Diagnosi mercato, 4 pilastri, ecosistema",
    tags: ["mercato", "ecosistema", "vendita", "AI"],
  },
  {
    id: "modulo-02",
    number: "02",
    file: "02-michele-offerte-conversione.md",
    title: "La Leva Invisibile delle Offerte",
    speaker: "Michele",
    duration: "28 min",
    focus: "High ticket, pre-qualifica, frizione produttiva",
    tags: ["offerta", "pricing", "conversione"],
  },
  {
    id: "modulo-03",
    number: "03",
    file: "03-roberto-war-machine.md",
    title: "The War Machine",
    speaker: "Roberto",
    duration: "31 min",
    focus: "Workshop, VSL, CAC/LTV, scaling",
    tags: ["funnel", "liquidita", "ads"],
  },
  {
    id: "modulo-04",
    number: "04",
    file: "04-federico-creativita-advertising.md",
    title: "Creativita, Organico e Advertising",
    speaker: "Federico",
    duration: "27 min",
    focus: "Angoli creativi, organico, unit economics",
    tags: ["creativita", "organico", "advertising"],
  },
  {
    id: "modulo-05",
    number: "05",
    file: "05-formula-partner-incubatore.md",
    title: "Da Agenzia a Incubatore",
    speaker: "Marco + Socio",
    duration: "43 min",
    focus: "Formula Partner, bootstrapping, hiring",
    tags: ["partner", "incubatore", "team"],
  },
  {
    id: "modulo-06",
    number: "06",
    file: "06-simone-vendita-etica.md",
    title: "Vendita Etica dalla Nicchia",
    speaker: "Simone Rossi",
    duration: "25 min",
    focus: "Fiducia, palco, storytelling, vendita",
    tags: ["vendita", "fiducia", "storytelling"],
  },
  {
    id: "modulo-07",
    number: "07",
    file: "07-michelangelo-meta-ads.md",
    title: "Framework Operativo Meta Ads",
    speaker: "Michelangelo",
    duration: "33 min",
    focus: "Stabilita algoritmica, budget, stop loss",
    tags: ["Meta Ads", "tracking", "scaling"],
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
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function convertHref(href: string): string {
  if (href === "../index.md") return "/playbook";
  const match = href.match(/(\d{2})-/);
  if (match) return `/playbook/modulo-${match[1]}`;
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

function renderTable(lines: string[]): string {
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

function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
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
      html.push(renderTable(table));
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

function extractBody(markdown: string): string {
  const parts = markdown.split(/\n---\n/);
  return parts.length > 1 ? parts.slice(1).join("\n---\n") : markdown;
}

function extractToc(markdown: string) {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^##\s+(.+)$/)?.[1])
    .filter((title): title is string => Boolean(title))
    .map((title) => ({ title, href: `#${slugify(title)}` }));
}

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/playbook">
        Morfeus Playbook
      </Link>
      <nav className={styles.nav} aria-label="Navigazione playbook">
        <Link href="/playbook">Indice</Link>
        <a href="/playbook#moduli">Moduli</a>
        <a href="#download">Download</a>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer className={styles.footer}>Morfeus Hub - Playbook Infobusiness Milionario</footer>;
}

export function PlaybookHomeSection() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}>Infobusiness Milionario - materiali evento</p>
            <h1>Una giornata. Sette speaker. Zero teoria inutile.</h1>
            <p className={styles.heroLead}>
              Tutto quello che e stato detto a Infobusiness Milionario, distillato in playbook
              operativi, framework testati e checklist pronte all&apos;uso.
            </p>
          </div>
          <div className={styles.heroCard}>
            <h2>Se ti e utile, iscriviti e scarica il pacchetto.</h2>
            <p>
              Le pagine sono aperte. Il download completo resta riservato a chi lascia nome
              ed email: ricevi il pacchetto con tutti i materiali sorgente.
            </p>
            <a className={styles.primaryButton} href="#download">
              Sblocca download
            </a>
          </div>
        </div>
        <div className={styles.statGrid} aria-label="Statistiche playbook">
          <div className={styles.stat}>
            <strong>7</strong>
            <span>speaker</span>
          </div>
          <div className={styles.stat}>
            <strong>263</strong>
            <span>minuti di contenuto</span>
          </div>
          <div className={styles.stat}>
            <strong>42+</strong>
            <span>azioni operative</span>
          </div>
          <div className={styles.stat}>
            <strong>15</strong>
            <span>framework proprietari</span>
          </div>
        </div>
      </section>

      <section className={styles.section} id="moduli">
        <p className={styles.kicker}>Indice dei moduli</p>
        <h2 className={styles.sectionTitle}>Scegli il playbook da applicare adesso.</h2>
        <div className={styles.moduleGrid}>
          {modules.map((playbookModule) => (
            <Link className={styles.moduleCard} href={`/playbook/${playbookModule.id}`} key={playbookModule.id}>
              <span className={styles.moduleNumber}>Modulo {playbookModule.number}</span>
              <h3>{playbookModule.title}</h3>
              <p>
                {playbookModule.speaker} - {playbookModule.focus}
              </p>
              <div className={styles.tagRow}>
                {playbookModule.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

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

  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.moduleHero}>
        <p className={styles.kicker}>Modulo {playbookModule.number}</p>
        <h1>{playbookModule.title}</h1>
        <div className={styles.moduleMeta}>
          <span>{playbookModule.speaker}</span>
          <span>{playbookModule.duration}</span>
          <span>{playbookModule.focus}</span>
        </div>
      </section>
      <div className={styles.moduleLayout}>
        <aside className={styles.toc} aria-label="Indice modulo">
          <Link href="/playbook">Torna all&apos;indice</Link>
          {toc.map((item) => (
            <a href={item.href} key={item.href}>
              {item.title}
            </a>
          ))}
          <a href="#download">Scarica materiali</a>
        </aside>
        <article className={styles.article}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <nav className={styles.moduleFooterNav} aria-label="Navigazione moduli">
            {previous ? <Link className={styles.textLink} href={`/playbook/${previous.id}`}>Modulo precedente</Link> : <span />}
            <Link className={styles.textLink} href="/playbook">Torna all&apos;indice</Link>
            {next ? <Link className={styles.textLink} href={`/playbook/${next.id}`}>Modulo successivo</Link> : <span />}
          </nav>
        </article>
      </div>
      <section className={styles.section}>
        <PlaybookDownloadGate />
      </section>
      <Footer />
    </div>
  );
}
