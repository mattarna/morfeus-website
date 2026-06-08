"use client";

import { useEffect, useRef, useState } from "react";
import type { FunnelStepConfig } from "@/funnels/types";
import styles from "./PlanSolve.module.css";

interface SectionProps {
  accentColor: string;
  step: FunnelStepConfig;
}

interface PlanSolveConfig {
  optinEndpoint?: string;
  formName?: string;
}

// ─── Data (ported verbatim from source JS) ─────────────────────────────────────

interface Phase {
  ic: string;
  t: string;
  tag: string;
  b: string;
  o: string;
}

const phases: Phase[] = [
  {
    ic: "ti-file-text",
    t: "Fase 0 — Il Brief",
    tag: "La knowledge base condivisa",
    b: 'Cosa fai, perché, per chi, con quali vincoli. È il primo contesto che ogni sessione AI riceve, così non rispieghi tutto ogni volta. Dentro: obiettivo, risorse, definizione di "finito" verificabile e gli <em>Anti-Goal</em>.',
    o: "<b>Anti-Goal:</b> cosa NON deve succedere / cosa è fuori scope. Senza, il 30% dello scope è rumore generato dall'AI.",
  },
  {
    ic: "ti-ghost-2",
    t: "Fase 1 — Pre-mortem",
    tag: "Il veterano che ha già visto fallire",
    b: 'Fai agire l\'AI come chi ha visto crollare decine di lavori simili: <em>"siamo nel futuro, è già fallito, raccontami perché"</em>. Sblocca rischi che a progetto vivo nessuno osa nominare.',
    o: "<b>Due output:</b> Report Rischi &amp; Vincoli (per chi pianifica) + Regole Operative (gli standard per chi esegue).",
  },
  {
    ic: "ti-map-2",
    t: "Fase 2 — Master Plan",
    tag: "La roadmap a milestone",
    b: 'Il lavoro scomposto in milestone, ognuna con obiettivo, <em>output verificabile</em> e dipendenze. Non una lista di cose da fare: la mappa di "in che ordine costruisco e come so che una tappa è finita".',
    o: '<b>Regola d\'oro:</b> ogni milestone finisce con qualcosa che puoi toccare, vedere o testare. "Migliorare l\'organizzazione" non è una milestone. "Shortlist di 5 validati" lo è.',
  },
  {
    ic: "ti-list-numbers",
    t: "Fase 3 — Gli Sprint",
    tag: "Il dettaglio per milestone",
    b: "Il Master Plan dice <em>dove</em> andare. Lo Sprint dice <em>come</em> arrivarci, una milestone alla volta: task atomici, ognuno con un criterio di successo osservabile.",
    o: "<b>Il criterio di successo è la parte più importante.</b> Se non sai come verificare che un task è fatto bene, è scritto male: riscrivilo.",
  },
  {
    ic: "ti-arrows-exchange",
    t: "Fase 4 — Cross-validazione",
    tag: "La seconda testa",
    b: "I due ruoli si parlano attraverso di te: uno crea, l'altro distrugge le assunzioni deboli prima che diventino problemi. <em>È il momento più importante del metodo.</em>",
    o: "<b>Si ferma</b> quando il validatore non trova più problemi significativi. Master Plan: 1-2 round. Sprint: spesso 1.",
  },
  {
    ic: "ti-player-play",
    t: "Fase 5 — Esecuzione + audit",
    tag: "Una tappa alla volta",
    b: 'Piano validato in mano, si esegue una milestone alla volta, un task alla volta, con un checkpoint a ogni tappa. Mai "completa tutta la milestone" in un colpo.',
    o: '<b>Audit, non review.</b> A fine milestone: "per ogni task, il criterio è soddisfatto sì/no e perché?". Se emerge un imprevisto: fermati, aggiorna il piano, riprendi.',
  },
];

interface PpStep {
  l: string;
  h: string;
  lit: "A" | "B";
}

const ppSteps: PpStep[] = [
  {
    l: "Passo 1 / 3 · Genera",
    h: "<b>Claude</b> crea il piano. È completo, sembra solido. Ma chi l'ha scritto ha punti ciechi sul proprio lavoro.",
    lit: "A",
  },
  {
    l: "Passo 2 / 3 · Rompi",
    h: 'Porti il piano a <b>ChatGPT</b>: "agisci da esperto senior di [ambito], il mio obiettivo è [X], trova i punti di rottura". Un modello diverso lo critica davvero invece di difenderlo.',
    lit: "B",
  },
  {
    l: "Passo 3 / 3 · Giudica",
    h: 'Torni da <b>Claude</b>: "un altro esperto ha trovato questi problemi — quali sono reali, e perché?". Lui ha tutto il contesto, filtra le critiche valide e aggiorna il piano.',
    lit: "A",
  },
];

const domainLabels: Record<string, string> = {
  lancio: "Lancio / business",
  assunzione: "Assunzione",
  consulenza: "Consulenza / delivery",
  contenuti: "Contenuti",
  software: "Software",
  altro: "lavoro",
};

const domainChips: { d: string; ic: string; label: string }[] = [
  { d: "lancio", ic: "ti-rocket", label: "Lancio / business" },
  { d: "assunzione", ic: "ti-user-plus", label: "Assunzione" },
  { d: "consulenza", ic: "ti-briefcase", label: "Consulenza / delivery" },
  { d: "contenuti", ic: "ti-pencil", label: "Contenuti" },
  { d: "software", ic: "ti-code", label: "Software" },
  { d: "altro", ic: "ti-dots", label: "Altro" },
];

const agHelpers: { t: string; label: string }[] = [
  { t: "Non voglio bruciarmi lavorando 12 ore al giorno", label: "carico personale" },
  { t: "Non voglio sacrificare la qualità per arrivare prima", label: "qualità" },
  { t: "Non voglio che tutto dipenda solo da me", label: "dipendenza da te" },
  { t: "Non voglio mettere a rischio il cash flow", label: "soldi / cash" },
  { t: "Non voglio danneggiare la mia reputazione con una cosa fatta male", label: "reputazione" },
];

const MORFEUS_PATH = (
  <>
    <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" />
    <path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" />
    <path d="M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
  </>
);

interface WizState {
  project: string;
  domain: string;
  domainLabel: string;
  objective: string;
  context: string;
  done: string;
  ag: [string, string, string];
}

const emptyWiz: WizState = {
  project: "",
  domain: "",
  domainLabel: "",
  objective: "",
  context: "",
  done: "",
  ag: ["", "", ""],
};

export function PlanSolveSection({ step }: SectionProps) {
  // Tool consegnato via email a chi ha già fatto l'optin a monte: nessun gate qui,
  // il wizard genera il prompt e lo si scarica direttamente.
  const _cfg = ((step.content as Record<string, unknown>).PlanSolve ?? {}) as PlanSolveConfig;
  void _cfg;

  // ── Phase selector ──
  const [curPhase, setCurPhase] = useState(0);
  const phaseStep = (d: number) => setCurPhase((p) => (p + d + phases.length) % phases.length);

  // ── Ping-pong ──
  const [ppI, setPpI] = useState(0);
  const ppGo = (d: number) => setPpI((p) => (p + d + ppSteps.length) % ppSteps.length);

  // ── Living plan ──
  const lpLabels = [
    "Milestone 1 — Definizione ruolo (job description + scorecard)",
    "Milestone 2 — Sourcing (20+ candidati in pipeline)",
    "Milestone 3 — Selezione (shortlist di 5 validati)",
    "Milestone 4 — Prova pratica + offerta firmata",
    "Milestone 5 — Onboarding 30/60/90 (persona operativa)",
  ];
  const [lpDone, setLpDone] = useState<boolean[]>([true, true, true, false, false]);
  const toggleLp = (i: number) =>
    setLpDone((arr) => arr.map((v, j) => (j === i ? !v : v)));
  const lpDoneCount = lpDone.filter(Boolean).length;

  // ── Wizard ──
  const [wzStep, setWzStep] = useState(0); // 0-4 steps, 5 = result
  const [wz, setWz] = useState<WizState>(emptyWiz);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const wizardRef = useRef<HTMLElement | null>(null);

  function showStep(n: number) {
    setWzStep(n);
    if (n > 0 && typeof window !== "undefined" && wizardRef.current) {
      const top = wizardRef.current.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function setErr(id: string, on: boolean) {
    setErrors((e) => ({ ...e, [id]: on }));
  }

  function wzNext() {
    if (wzStep === 0) {
      if (!wz.project.trim() || !wz.domain) {
        setErr("err0", true);
        return;
      }
      setErr("err0", false);
    }
    if (wzStep === 1) {
      if (!wz.objective.trim()) {
        setErr("err1", true);
        return;
      }
      setErr("err1", false);
    }
    if (wzStep === 2) {
      if (!wz.context.trim()) {
        setErr("errC", true);
        return;
      }
      setErr("errC", false);
    }
    if (wzStep === 3) {
      if (!wz.done.trim()) {
        setErr("err2", true);
        return;
      }
      setErr("err2", false);
    }
    showStep(wzStep + 1);
  }

  function wzPrev() {
    showStep(wzStep - 1);
  }

  function wzRestart() {
    setWz(emptyWiz);
    setErrors({});
    setGateUnlocked(false);
    showStep(0);
  }

  function selectDomain(d: string) {
    setWz((w) => ({ ...w, domain: d, domainLabel: domainLabels[d] }));
  }

  function fillAgHelper(text: string) {
    setWz((w) => {
      const ag: [string, string, string] = [...w.ag];
      for (let i = 0; i < ag.length; i++) {
        if (!ag[i].trim()) {
          ag[i] = text;
          break;
        }
      }
      return { ...w, ag };
    });
  }

  function setAg(i: number, v: string) {
    setWz((w) => {
      const ag: [string, string, string] = [...w.ag];
      ag[i] = v;
      return { ...w, ag };
    });
  }

  // ── Artifact builders (ported VERBATIM) ──
  function buildBrief() {
    const ags = wz.ag
      .filter((a) => a.trim())
      .map((a) => "- " + a.trim())
      .join("\n");
    return (
      "# Brief — " +
      wz.project +
      "\n\n" +
      "## 1. Obiettivo\n" +
      wz.objective +
      "\n\n" +
      "## 2. Contesto e risorse\n" +
      wz.context +
      "\n\n" +
      '## 3. Definizione di "finito"\n' +
      wz.done +
      "\n\n" +
      "## 4. Anti-Goal\n" +
      ags
    );
  }

  function buildKickoff() {
    let ags = wz.ag
      .filter((a) => a.trim())
      .map((a) => "- " + a.trim())
      .join("\n");
    if (!ags) ags = "- (nessuno specificato)";
    return (
      "Sei il mio partner di lavoro e useremo il metodo Plan & Solve. Ti do il contesto di un lavoro grande che devo portare a termine. NON iniziare a eseguire e non propormi subito una soluzione: segui ESATTAMENTE i passi qui sotto.\n\n" +
      "== CONTESTO ==\n" +
      "Progetto: " +
      wz.project +
      "\n" +
      "Obiettivo: " +
      wz.objective +
      "\n" +
      "Risorse e vincoli: " +
      wz.context +
      "\n" +
      'Definizione di "finito": ' +
      wz.done +
      "\n" +
      "Anti-Goal (cosa NON deve succedere):\n" +
      ags +
      "\n\n" +
      "== COSA FAI, IN QUEST'ORDINE ==\n" +
      "1) DOMANDE PRIMA DI TUTTO. Prima di qualsiasi piano, fammi al massimo 5 domande mirate per chiarire ciò che ti manca (vincoli reali, priorità, rischi nascosti, cosa ho già provato). Poi fermati e aspetta le mie risposte.\n" +
      "2) MINI PRE-MORTEM. Immagina che il progetto sia già fallito: dimmi le 3-5 cause più probabili, ognuna con una mitigazione concreta. Non segnalare rischi che ricadono negli Anti-Goal.\n" +
      "3) PIANO A MILESTONE. Proponimi un piano in 4-6 milestone. Per ognuna: obiettivo, output verificabile (qualcosa che posso vedere o testare) e dipendenze. Scrivile con i checkbox [ ].\n" +
      '4) STOP, VALIDA. Prima di eseguire, dimmi esplicitamente: "porta questo piano a una seconda AI o a una chat nuova e falle trovare i punti deboli", ed elencami le 3 domande critiche che quella seconda testa dovrebbe pormi.\n' +
      '5) ESECUZIONE. Solo dopo la mia conferma, procedi una milestone alla volta e un task alla volta: verifica il criterio di "fatto" prima di passare al successivo e spunta [x] man mano.\n\n' +
      "Regole: niente esecuzione prima del passo 4; ogni output deve essere verificabile; se qualcosa non torna, fermati e chiedimi. Inizia adesso dal passo 1: fammi le domande."
    );
  }

  function buildDownload() {
    return (
      "PLAN & SOLVE - Prompt di avvio (versione semplificata)\nProgetto: " +
      wz.project +
      "\nMorfeus - Claude Unlocked\n\n" +
      ">>> COPIA TUTTO IL BLOCCO QUI SOTTO E INCOLLALO IN CLAUDE O CHATGPT <<<\n\n" +
      buildKickoff() +
      "\n\n\n" +
      "--- IL TUO BRIEF (tienilo come contesto di riferimento) ---\n\n" +
      buildBrief() +
      "\n\n\n" +
      "Questo è un Plan & Solve semplificato: un assaggio pratico. La versione completa (pre-mortem strutturato, doppia validazione, sprint per milestone e piano vivente) la impari passo-passo in Claude Unlocked:\nhttps://www.morfeushub.com/claude-unlocked\n"
    );
  }

  function wzGenerate() {
    if (!wz.ag.some((a) => a.trim())) {
      setErr("err3", true);
      return;
    }
    setErr("err3", false);
    setArtKickOpen(true);
    setArtBriefOpen(false);
    showStep(5);
  }

  // ── Artifacts / result ──
  const [artKickOpen, setArtKickOpen] = useState(true);
  const [artBriefOpen, setArtBriefOpen] = useState(false);
  const [copiedKick, setCopiedKick] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  function copyText(text: string, which: "kick" | "brief") {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      if (which === "kick") {
        setCopiedKick(true);
        setTimeout(() => setCopiedKick(false), 1600);
      } else {
        setCopiedBrief(true);
        setTimeout(() => setCopiedBrief(false), 1600);
      }
    });
  }

  // ── Download (post-optin: niente gate, scarica e basta) ──
  const [gateUnlocked, setGateUnlocked] = useState(false);

  function downloadKit() {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const blob = new Blob([buildDownload()], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const slug =
      (wz.project || "progetto")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40) || "kit";
    a.href = url;
    a.download = "plan-and-solve_" + slug + ".md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function onDownload() {
    downloadKit();
    setGateUnlocked(true);
  }

  // ── Effects: cursor glow + reveal-on-scroll + hero path draw-in ──
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);
  const heroPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const g = cursorGlowRef.current;
    let onMove: ((e: MouseEvent) => void) | null = null;
    if (g && window.matchMedia("(hover:hover)").matches) {
      onMove = (e: MouseEvent) => {
        g.style.opacity = "1";
        g.style.left = e.clientX + "px";
        g.style.top = e.clientY + "px";
      };
      window.addEventListener("mousemove", onMove);
    }
    return () => {
      if (onMove) window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return;
    const root = rootRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.in);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    const els = root.querySelectorAll<HTMLElement>("." + styles.reveal);
    els.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i, 6) * 45 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const p = heroPathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
    const t = setTimeout(() => {
      p.style.transition = "stroke-dashoffset 2.2s ease";
      p.style.strokeDashoffset = "0";
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // helper to compose class names with the always-on root scope intact
  const cx = (...names: string[]) => names.map((n) => styles[n] ?? "").join(" ").trim();

  const phase = phases[curPhase];
  const pp = ppSteps[ppI];

  return (
    <div className={styles.psRoot} ref={rootRef}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
      />

      <div className={styles["bp-grid"]} />
      <div className={styles["bp-glow"]} />
      <div className={styles["cursor-glow"]} ref={cursorGlowRef} />

      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles["nav-in"]}>
          <div className={styles.brand}>
            <svg viewBox="0 0 1000 476" fill="currentColor" aria-label="Morfeus">
              {MORFEUS_PATH}
            </svg>
            <span className={styles.bn}>
              Plan &amp; Solve <span>· Morfeus</span>
            </span>
          </div>
          <div className={styles["nav-tag"]}>
            <i className="ti ti-gift" /> Freebie · <b>gratis</b>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className={cx("hero", "wrap")}>
        <div className={cx("reveal", "in")}>
          <div className={styles["mono-label"]}>Il metodo · Claude Unlocked</div>
          <h1>
            La macchina per
            <br />i lavori grandi
            <br />
            <span className={styles.accent}>con l&apos;AI.</span>
          </h1>
          <p className={styles["hero-sub"]}>
            L&apos;AI è velocissima a produrre. Ma su un lavoro grande, velocità senza direzione non
            costruisce: <b>accumula debito.</b> Plan &amp; Solve è il metodo che lo impedisce.
          </p>
          <p className={styles["hero-sub"]} style={{ color: "var(--ink-3)", fontSize: 16 }}>
            Qui non lo spieghi soltanto. Lo monti sul <b>tuo</b> progetto reale, e te lo porti via.
          </p>
          <div className={styles["hero-meta"]}>
            <div>
              <i className="ti ti-clock" /> 6 minuti per capirlo
            </div>
            <div>
              <i className="ti ti-tool" /> Kit pronto sul tuo progetto
            </div>
            <div>
              <i className="ti ti-lock-open" /> Zero codice, zero costi
            </div>
          </div>
          <div className={styles["cta-row"]}>
            <a href="#wizard" className={cx("btn", "btn-primary")}>
              <i className="ti ti-wand" /> Costruisci il tuo Plan &amp; Solve
            </a>
            <a href="#metodo" className={cx("btn", "btn-ghost")}>
              <i className="ti ti-arrow-down" /> Prima capiscilo
            </a>
          </div>
        </div>

        <div className={cx("hero-blueprint", "reveal")}>
          <div className={styles.scan} />
          <div className={styles["hb-head"]}>
            <span>MASTER_PLAN.bp · scala 1:1</span>
            <div className={styles.dots}>
              <span style={{ background: "#e0625c" }} />
              <span style={{ background: "#EF9F27" }} />
              <span style={{ background: "#27b88c" }} />
            </div>
          </div>
          <svg className={styles["hb-svg"]} viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lgFlow" x1="0" x2="1">
                <stop offset="0" stopColor="#8B82F0" />
                <stop offset="1" stopColor="#27b88c" />
              </linearGradient>
            </defs>
            <path
              ref={heroPathRef}
              className={styles.draw}
              d="M90 230 L260 230 L360 110 L520 110 L620 200 L800 200 L910 90"
              fill="none"
              stroke="url(#lgFlow)"
              strokeWidth="2"
            />
            <g fontFamily="JetBrains Mono, monospace" fontSize="11">
              <g>
                <circle cx="90" cy="230" r="7" fill="#8B82F0" />
                <text x="90" y="258" textAnchor="middle" fill="#6b6a78">
                  BRIEF
                </text>
              </g>
              <g>
                <circle cx="260" cy="230" r="7" fill="#8B82F0" />
                <text x="260" y="258" textAnchor="middle" fill="#6b6a78">
                  RISCHI
                </text>
              </g>
              <g>
                <circle cx="360" cy="110" r="7" fill="#8B82F0" />
                <text x="360" y="96" textAnchor="middle" fill="#6b6a78">
                  MASTER
                </text>
              </g>
              <g>
                <circle cx="520" cy="110" r="7" fill="#8B82F0" />
                <text x="520" y="96" textAnchor="middle" fill="#6b6a78">
                  SPRINT
                </text>
              </g>
              <g>
                <circle cx="620" cy="200" r="9" fill="none" stroke="#EF9F27" strokeWidth="2" />
                <text x="620" y="228" textAnchor="middle" fill="#f5bd63">
                  VALIDA
                </text>
              </g>
              <g>
                <circle cx="800" cy="200" r="7" fill="#27b88c" />
                <text x="800" y="228" textAnchor="middle" fill="#6b6a78">
                  ESEGUI
                </text>
              </g>
              <g>
                <circle cx="910" cy="90" r="9" fill="#27b88c" />
                <text x="910" y="76" textAnchor="middle" fill="#5dcaa5">
                  FATTO
                </text>
              </g>
            </g>
            <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
              <line x1="620" y1="160" x2="620" y2="178" />
              <line x1="612" y1="166" x2="628" y2="166" />
            </g>
            <text x="636" y="160" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#46454f">
              2ª testa
            </text>
          </svg>
        </div>
      </header>

      {/* LO SPECCHIO */}
      <section className={cx("section-pad", "wrap")} id="metodo">
        <div className={cx("sec-head", "reveal")}>
          <div className={styles["mono-label"]}>01 · Lo specchio</div>
          <h2>Perché i tuoi progetti con l&apos;AI crollano a metà</h2>
          <p>
            Non è colpa del modello. È che lavorare a briglia sciolta su una cosa grande crea sempre{" "}
            <b>due guai precisi.</b> Riconoscili: è l&apos;ultima volta che ti capitano.
          </p>
        </div>
        <div className={styles["prob-grid"]}>
          <div className={cx("bp-card", "prob", "reveal")}>
            <div className={styles.pn}>FAILURE_MODE / 01</div>
            <div className={styles.pic}>
              <i className="ti ti-clock-bolt" />
            </div>
            <h3>Il debito istantaneo</h3>
            <p>
              L&apos;AI ti sforna in due minuti tutto quello che chiedi. A prima vista funziona. Ma le
              parti non si parlano, i casi limite mancano, e un pezzo si scopre rotto solo alla fine —
              quando non sai più nemmeno dove l&apos;errore è nato.
            </p>
            <div className={styles["prob-eg"]}>
              <div className={styles["eg-tag"]}>
                <i className="ti ti-point" /> In pratica
              </div>
              Chiedi all&apos;AI il piano di un lancio. Sembra perfetto. Parti, e a metà scopri che{" "}
              <b>manca la pagina di vendita</b> e che le email che hai già scritto promettono cose che il
              prodotto non fa. Rifai tutto.
            </div>
          </div>
          <div className={cx("bp-card", "prob", "reveal")}>
            <div className={styles.pn}>FAILURE_MODE / 02</div>
            <div className={styles.pic}>
              <i className="ti ti-eye-off" />
            </div>
            <h3>La monocultura cognitiva</h3>
            <p>
              Se la stessa AI pianifica <em>e</em> esegue, vedi sempre il mondo da un solo punto di
              vista, con gli stessi punti ciechi. Un piano che nessuno mette in discussione si porta
              dietro tutti i difetti di chi l&apos;ha scritto — e quei difetti finiscono dritti nel
              risultato.
            </p>
            <div className={styles["prob-eg"]}>
              <div className={styles["eg-tag"]}>
                <i className="ti ti-point" /> In pratica
              </div>
              Claude ti propone un piano e tu lo fai eseguire a Claude. Nessuno dei due ti dirà mai{" "}
              <b>&quot;questo pezzo è debole&quot;</b>: è lo stesso che l&apos;ha pensato. Serve una
              seconda testa che non ha scritto il piano e non ha motivo di difenderlo.
            </div>
          </div>
        </div>

        <div className={cx("principle", "reveal")}>
          <div className={styles.pq}>
            <i className="ti ti-shield-check" /> Il principio centrale
          </div>
          <div className={styles.pt}>
            Nessuna esecuzione prima che il piano sia stato messo alla prova da{" "}
            <span className={styles.hl}>una seconda testa.</span>
          </div>
          <div className={styles.ps}>
            Rallenti la pianificazione per accelerare l&apos;esecuzione. Ogni ora spesa a pianificare e
            validare ti restituisce almeno tre ore di correzioni evitate. Il costo vero di un progetto non
            è scriverlo. È riscriverlo.
          </div>
          <div className={styles["big-n"]}>01</div>
        </div>
      </section>

      {/* LE DUE ANIME */}
      <section className={cx("section-pad", "wrap")}>
        <div className={cx("sec-head", "reveal")}>
          <div className={styles["mono-label"]}>02 · Due anime</div>
          <h2>La testa decide la rotta. Il corpo ti porta a destinazione.</h2>
          <p>Plan &amp; Solve ha due metà, da tenere distinte e usare insieme.</p>
        </div>
        <div className={styles.souls}>
          <div className={cx("bp-card", "soul", "s1", "reveal")}>
            <div className={styles.stag}>Metà cognitiva</div>
            <div className={styles.sic}>
              <i className="ti ti-bulb" />
            </div>
            <h3>Usare l&apos;AI per decidere</h3>
            <p>
              Pensiero divergente prima, convergente dopo. Le regole d&apos;oro, gli Anti-Goal, lo Stop
              Gate. Serve quando il problema è <em>cosa fare</em>.
            </p>
            <div className={styles.stip}>→ ti dà la rotta</div>
          </div>
          <div className={cx("bp-card", "soul", "s2", "reveal")}>
            <div className={styles.stag}>Metà operativa</div>
            <div className={styles.sic}>
              <i className="ti ti-tools" />
            </div>
            <h3>Usare l&apos;AI per costruire</h3>
            <p>
              Una cosa grande, senza accumulare errori che poi costano tre volte tanto. È la spina
              dorsale a fasi che vedi qui sotto. Serve quando la decisione è presa e il problema è{" "}
              <em>come farlo bene, una volta sola</em>.
            </p>
            <div className={styles.stip}>→ ti porta a destinazione</div>
          </div>
        </div>
      </section>

      {/* LE FASI */}
      <section className={cx("section-pad", "wrap")}>
        <div className={cx("sec-head", "reveal")}>
          <div className={styles["mono-label"]}>03 · La spina dorsale</div>
          <h2>Le 6 fasi del metodo</h2>
          <p>
            Una sequenza logica universale. Cambiano i vestiti (codice, candidato, campagna), non lo
            scheletro. <b>Clicca una fase</b> per il dettaglio.
          </p>
        </div>
        <div className={cx("flow-stage", "reveal")}>
          <div className={styles["flow-rail"]}>
            {[
              "Brief + Anti-Goal",
              "Pre-mortem",
              "Master Plan",
              "Sprint",
              "Cross-validazione",
              "Esecuzione + audit",
            ].map((label, i) => (
              <div
                key={i}
                className={cx("fnode", ...(i === curPhase ? ["active"] : []))}
                onClick={() => setCurPhase(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setCurPhase(i);
                }}
              >
                <span className={styles.fnn}>{i}</span> {label}
              </div>
            ))}
          </div>
          <div className={cx("bp-card", "phase-detail")}>
            <div className={styles["pd-top"]}>
              <div className={styles["pd-ic"]}>
                <i className={"ti " + phase.ic} />
              </div>
              <div>
                <h3>{phase.t}</h3>
                <div className={styles["pd-tag"]}>{phase.tag}</div>
              </div>
            </div>
            <div className={styles["pd-body"]} dangerouslySetInnerHTML={{ __html: phase.b }} />
            <div className={styles["pd-out"]}>
              <i className="ti ti-package" />
              <p dangerouslySetInnerHTML={{ __html: phase.o }} />
            </div>
            <div className={styles["pd-nav"]}>
              <button onClick={() => phaseStep(-1)}>
                <i className="ti ti-chevron-left" /> prec
              </button>
              <button onClick={() => phaseStep(1)}>
                succ <i className="ti ti-chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS VALIDATION */}
      <section className={cx("section-pad", "wrap")}>
        <div className={cx("sec-head", "reveal")}>
          <div className={styles["mono-label"]}>04 · Il cuore</div>
          <h2>Il loop di cross-validazione</h2>
          <p>
            La fase che trasforma Plan &amp; Solve da metodo di pianificazione a{" "}
            <b>sistema di qualità.</b> Un ping-pong tra due AI, con te come arbitro. <b>Premi avanti</b> e
            guardalo.
          </p>
        </div>
        <div className={cx("bp-card", "pp", "reveal")}>
          <div className={styles["pp-stage"]}>
            <div className={cx("pp-actor", "a1", ...(pp.lit === "A" ? ["lit"] : []))}>
              <div className={styles["pa-ic"]}>
                <i className="ti ti-robot" />
              </div>
              <div className={styles["pa-n"]}>LLM A · Claude</div>
              <div className={styles["pa-r"]}>crea &amp; giudica</div>
            </div>
            <div className={cx("pp-actor", "a2", "litB", ...(pp.lit === "B" ? ["lit"] : []))}>
              <div className={styles["pa-ic"]}>
                <i className="ti ti-brain" />
              </div>
              <div className={styles["pa-n"]}>LLM B · ChatGPT</div>
              <div className={styles["pa-r"]}>cerca le falle</div>
            </div>
          </div>
          <div className={styles["pp-step"]}>
            <div className={styles["ps-l"]}>
              <span>{pp.l}</span>
              <i className="ti ti-arrows-exchange" />
            </div>
            <p dangerouslySetInnerHTML={{ __html: pp.h }} />
          </div>
          <div className={styles["pp-ctrl"]}>
            <div className={styles["pp-dotrow"]}>
              {ppSteps.map((_, i) => (
                <span key={i} className={cx("pp-dot", ...(i === ppI ? ["on"] : []))} />
              ))}
            </div>
            <button className={styles["pp-btn"]} onClick={() => ppGo(-1)}>
              <i className="ti ti-chevron-left" />
            </button>
            <button className={cx("pp-btn", "primary")} onClick={() => ppGo(1)}>
              Avanti <i className="ti ti-chevron-right" />
            </button>
          </div>
        </div>
      </section>

      {/* LIVING PLAN */}
      <section className={cx("section-pad", "wrap")}>
        <div className={cx("sec-head", "reveal")}>
          <div className={styles["mono-label"]}>05 · Il cruscotto</div>
          <h2>Il piano vivente</h2>
          <p>
            Un solo file, scritto con checkbox, unica fonte di verità. L&apos;AI lo spunta da sola mentre
            esegue. Lo apri e sai esattamente dove sei. <b>Prova a spuntare.</b>
          </p>
        </div>
        <div className={cx("lp", "reveal")}>
          <div className={styles["lp-file"]}>
            <div className={styles["lp-bar"]}>
              <span className={styles.d} style={{ background: "#e0625c" }} />
              <span className={styles.d} style={{ background: "#EF9F27" }} />
              <span className={styles.d} style={{ background: "#27b88c" }} />
              &nbsp; MASTER_PLAN.md
            </div>
            <div className={styles["lp-body"]}>
              {lpLabels.map((label, i) => (
                <div
                  key={i}
                  className={cx("lp-item", ...(lpDone[i] ? ["done"] : []))}
                  onClick={() => toggleLp(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleLp(i);
                  }}
                >
                  <div className={styles["lp-box"]}>
                    <i className="ti ti-check" />
                  </div>
                  <span className={styles["lp-t"]}>{label}</span>
                </div>
              ))}
              <div className={styles["lp-prog"]}>
                <span style={{ width: Math.round((lpDoneCount / lpLabels.length) * 100) + "%" }} />
              </div>
              <div className={styles["lp-cap"]}>
                {lpDoneCount} / {lpLabels.length} milestone completate
              </div>
            </div>
          </div>
          <div className={styles["lp-note"]}>
            <h3>Niente più &quot;dove eravamo rimasti?&quot;</h3>
            <p>
              La regola che dai all&apos;AI è esplicita:{" "}
              <b>
                spunta ogni task man mano che lo chiudi, e niente{" "}
                <span style={{ fontFamily: "var(--mono)" }}>[x]</span> senza che il criterio di successo
                sia soddisfatto.
              </b>
            </p>
            <p>Il piano diventa il cruscotto del progetto, e si aggiorna da solo.</p>
          </div>
        </div>
      </section>

      {/* RULES */}
      <section className={cx("section-pad", "wrap")}>
        <div className={cx("sec-head", "reveal")}>
          <div className={styles["mono-label"]}>06 · I guardrail</div>
          <h2>Le 8 regole di qualità</h2>
          <p>
            Non sono suggerimenti. Sono ciò che impedisce al metodo di degenerare in &quot;genera a caso
            e spera&quot;.
          </p>
        </div>
        <div className={styles.rules}>
          {[
            { n: "01", b: "Niente esecuzione prima del piano validato.", r: "Anche per le tappe facili." },
            { n: "02", b: "Un task alla volta.", r: "La granularità dà tracciabilità." },
            { n: "03", b: "Output sempre verificabile.", r: "Qualcosa che vedi, tocchi o testi." },
            { n: "04", b: "Contesto sempre esplicito.", r: "Ogni sessione AI riparte da zero." },
            { n: "05", b: "La validazione cerca buchi,", r: " non conferme." },
            { n: "06", b: "Le deviazioni si documentano", r: " prima di continuare." },
            { n: "07", b: "Fermati quando qualcosa non torna.", r: " Capisci, aggiusta, riprendi." },
            {
              n: "08",
              b: "È un audit, non una review.",
              r: ' "Il criterio è soddisfatto sì/no?", mai "ti sembra buono?".',
            },
          ].map((rule, i) => (
            <div key={i} className={cx("rule", "reveal")}>
              <div className={styles.rn}>{rule.n}</div>
              <p>
                <b>{rule.b}</b>
                {rule.r}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WIZARD */}
      <section className={cx("section-pad", "wrap")} id="wizard" ref={wizardRef}>
        <div className={cx("wz-shell", "reveal")}>
          <div className={styles["wz-top"]}>
            <div className={styles["mono-label"]}>07 · Fallo su di te</div>
            <h2>Costruisci la tua macchina Plan &amp; Solve</h2>
            <p>
              Dammi il tuo lavoro grande reale. In 5 passi ti preparo il prompt di avvio Plan &amp; Solve,
              già pronto da incollare in Claude o ChatGPT. Te lo porti via.
            </p>
            <div className={styles["wz-cue"]}>
              <span className={styles.pulse} /> Compila qui sotto
            </div>
          </div>
          <div className={styles["wz-prog"]}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cx("wp", ...(i < wzStep ? ["done"] : i === wzStep ? ["cur"] : []))}
              >
                <span />
              </div>
            ))}
          </div>
          <div className={styles["wz-body"]}>
            {/* step 0 */}
            <div className={cx("wz-step", ...(wzStep === 0 ? ["active"] : []))}>
              <div className={styles["wz-q"]}>PASSO 1 / 5</div>
              <h3>Qual è il tuo lavoro grande?</h3>
              <p className={styles["wz-hint"]}>
                Una cosa che dura più di una sessione, ha più tappe e dove sbagliare costa. Scrivila in
                una frase.
              </p>
              <div className={styles["wz-field"]}>
                <input
                  className={styles["wz-input"]}
                  value={wz.project}
                  onChange={(e) => setWz((w) => ({ ...w, project: e.target.value }))}
                  placeholder="es. Lanciare il mio primo corso online entro settembre"
                />
              </div>
              <div className={styles["wz-field"]}>
                <label>Di che tipo di lavoro si tratta?</label>
                <div className={styles["wz-chips"]}>
                  {domainChips.map((c) => (
                    <div
                      key={c.d}
                      className={cx("wz-chip", ...(wz.domain === c.d ? ["sel"] : []))}
                      onClick={() => selectDomain(c.d)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") selectDomain(c.d);
                      }}
                    >
                      <i className={"ti " + c.ic} /> {c.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx("wz-err", ...(errors.err0 ? ["show"] : []))}>
                Scrivi il progetto e scegli un tipo per continuare.
              </div>
              <div className={styles["wz-actions"]}>
                <span />
                <button className={cx("btn", "btn-primary")} onClick={wzNext}>
                  Avanti <i className="ti ti-arrow-right" />
                </button>
              </div>
            </div>

            {/* step 1 */}
            <div className={cx("wz-step", ...(wzStep === 1 ? ["active"] : []))}>
              <div className={styles["wz-q"]}>PASSO 2 / 5</div>
              <h3>Obiettivo: cosa ottieni, per chi, perché</h3>
              <p className={styles["wz-hint"]}>
                In una frase chiara. Niente &quot;andare bene&quot;: cosa esiste alla fine che prima non
                c&apos;era.
              </p>
              <div className={styles["wz-field"]}>
                <textarea
                  className={styles["wz-area"]}
                  value={wz.objective}
                  onChange={(e) => setWz((w) => ({ ...w, objective: e.target.value }))}
                  placeholder="es. Avere un corso che vende in automatico, per professionisti che vogliono usare l'AI, così smetto di scambiare ore per soldi."
                />
              </div>
              <div className={cx("wz-err", ...(errors.err1 ? ["show"] : []))}>
                Scrivi l&apos;obiettivo per continuare.
              </div>
              <div className={styles["wz-actions"]}>
                <button className={styles["wz-back"]} onClick={wzPrev}>
                  <i className="ti ti-arrow-left" /> indietro
                </button>
                <button className={cx("btn", "btn-primary")} onClick={wzNext}>
                  Avanti <i className="ti ti-arrow-right" />
                </button>
              </div>
            </div>

            {/* step 2 */}
            <div className={cx("wz-step", ...(wzStep === 2 ? ["active"] : []))}>
              <div className={styles["wz-q"]}>PASSO 3 / 5</div>
              <h3>Contesto e risorse</h3>
              <p className={styles["wz-hint"]}>
                Cosa hai davvero in mano: chi è coinvolto, quanto tempo e budget, i vincoli reali. Più sei
                concreto, meno l&apos;AI inventa e più il piano è tuo.
              </p>
              <div className={styles["wz-field"]}>
                <textarea
                  className={styles["wz-area"]}
                  value={wz.context}
                  onChange={(e) => setWz((w) => ({ ...w, context: e.target.value }))}
                  placeholder="es. Sono solo io + un montatore freelance. Budget 500€, 6 settimane. Ho già 800 iscritti alla newsletter e un metodo testato dal vivo. Vincolo: non posso lavorarci la sera."
                />
              </div>
              <div className={cx("wz-err", ...(errors.errC ? ["show"] : []))}>
                Scrivi due righe di contesto per continuare.
              </div>
              <div className={styles["wz-actions"]}>
                <button className={styles["wz-back"]} onClick={wzPrev}>
                  <i className="ti ti-arrow-left" /> indietro
                </button>
                <button className={cx("btn", "btn-primary")} onClick={wzNext}>
                  Avanti <i className="ti ti-arrow-right" />
                </button>
              </div>
            </div>

            {/* step 3 */}
            <div className={cx("wz-step", ...(wzStep === 3 ? ["active"] : []))}>
              <div className={styles["wz-q"]}>PASSO 4 / 5</div>
              <h3>Definizione di &quot;finito&quot;</h3>
              <p className={styles["wz-hint"]}>
                Il criterio verificabile che ti dice che è davvero fatto. Deve poter rispondere sì/no,
                senza ambiguità.
              </p>
              <div className={styles["wz-field"]}>
                <textarea
                  className={styles["wz-area"]}
                  value={wz.done}
                  onChange={(e) => setWz((w) => ({ ...w, done: e.target.value }))}
                  placeholder="es. Il corso è pubblicato, la pagina di vendita è online e ho incassato le prime 10 vendite senza inviare email a mano."
                />
              </div>
              <div className={cx("wz-err", ...(errors.err2 ? ["show"] : []))}>
                Scrivi la definizione di finito per continuare.
              </div>
              <div className={styles["wz-actions"]}>
                <button className={styles["wz-back"]} onClick={wzPrev}>
                  <i className="ti ti-arrow-left" /> indietro
                </button>
                <button className={cx("btn", "btn-primary")} onClick={wzNext}>
                  Avanti <i className="ti ti-arrow-right" />
                </button>
              </div>
            </div>

            {/* step 4 */}
            <div className={cx("wz-step", ...(wzStep === 4 ? ["active"] : []))}>
              <div className={styles["wz-q"]}>PASSO 5 / 5 · la parte che cambia tutto</div>
              <h3>I tuoi 3 Anti-Goal</h3>
              <p className={styles["wz-hint"]}>
                Cosa NON deve succedere mentre raggiungi l&apos;obiettivo. È ciò che taglia il 30% di
                rumore che l&apos;AI aggiungerebbe. Tocca un suggerimento o scrivili tu.
              </p>
              <div className={styles["wz-ag-helper"]}>
                {agHelpers.map((h) => (
                  <span
                    key={h.label}
                    onClick={() => fillAgHelper(h.t)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fillAgHelper(h.t);
                    }}
                  >
                    {h.label}
                  </span>
                ))}
              </div>
              {[0, 1, 2].map((i) => (
                <div key={i} className={styles["wz-field"]}>
                  <input
                    className={styles["wz-input"]}
                    value={wz.ag[i]}
                    onChange={(e) => setAg(i, e.target.value)}
                    placeholder={"Anti-Goal " + (i + 1)}
                  />
                </div>
              ))}
              <div className={cx("wz-err", ...(errors.err3 ? ["show"] : []))}>
                Scrivi almeno un Anti-Goal per generare il kit.
              </div>
              <div className={styles["wz-actions"]}>
                <button className={styles["wz-back"]} onClick={wzPrev}>
                  <i className="ti ti-arrow-left" /> indietro
                </button>
                <button className={cx("btn", "btn-primary")} onClick={wzGenerate}>
                  <i className="ti ti-sparkles" /> Genera il mio kit
                </button>
              </div>
            </div>

            {/* result */}
            <div className={cx("wz-step", "wz-result", ...(wzStep === 5 ? ["active"] : []))}>
              <div className={styles["res-head"]}>
                <div className={styles.rdone}>
                  <i className="ti ti-circle-check" />
                </div>
                <h3>Il tuo prompt è pronto</h3>
              </div>
              <p className={styles["res-sub"]}>
                Generato sul tuo progetto. Copialo e incollalo in Claude o ChatGPT: ti farà prima qualche
                domanda, poi costruirà il piano con te, una tappa alla volta.
              </p>
              <div>
                {/* artKick */}
                <div className={cx("art", ...(artKickOpen ? ["open"] : []))}>
                  <div className={styles["art-head"]} onClick={() => setArtKickOpen((o) => !o)}>
                    <div className={styles["ah-l"]}>
                      <i className="ti ti-wand" /> Il tuo prompt di avvio Plan &amp; Solve{" "}
                      <span className={styles["ah-tag"]}>INCOLLALO IN CLAUDE O CHATGPT</span>
                    </div>
                    <div className={styles["ah-r"]}>
                      <button
                        className={cx("copy-btn", ...(copiedKick ? ["ok"] : []))}
                        onClick={(e) => {
                          e.stopPropagation();
                          copyText(buildKickoff(), "kick");
                        }}
                      >
                        {copiedKick ? (
                          <>
                            <i className="ti ti-check" /> copiato
                          </>
                        ) : (
                          <>
                            <i className="ti ti-copy" /> copia
                          </>
                        )}
                      </button>
                      <i className="ti ti-chevron-down chev" />
                    </div>
                  </div>
                  <div className={styles["art-body"]}>
                    <pre>{wzStep === 5 ? buildKickoff() : ""}</pre>
                  </div>
                </div>

                {/* artBrief */}
                <div className={cx("art", ...(artBriefOpen ? ["open"] : []))}>
                  <div className={styles["art-head"]} onClick={() => setArtBriefOpen((o) => !o)}>
                    <div className={styles["ah-l"]}>
                      <i className="ti ti-file-text" /> Il tuo Brief (bonus · tienilo come contesto){" "}
                      <span className={styles["ah-tag"]}>RIFERIMENTO</span>
                    </div>
                    <div className={styles["ah-r"]}>
                      <button
                        className={cx("copy-btn", ...(copiedBrief ? ["ok"] : []))}
                        onClick={(e) => {
                          e.stopPropagation();
                          copyText(buildBrief(), "brief");
                        }}
                      >
                        {copiedBrief ? (
                          <>
                            <i className="ti ti-check" /> copiato
                          </>
                        ) : (
                          <>
                            <i className="ti ti-copy" /> copia
                          </>
                        )}
                      </button>
                      <i className="ti ti-chevron-down chev" />
                    </div>
                  </div>
                  <div className={styles["art-body"]}>
                    <pre>{wzStep === 5 ? buildBrief() : ""}</pre>
                  </div>
                </div>
              </div>

              <div className={styles["res-steps"]}>
                <h5>
                  <i className="ti ti-route" /> Come usarlo in 4 mosse
                </h5>
                <ol>
                  <li>
                    <b>Copia</b> il prompt qui sopra.
                  </li>
                  <li>
                    <b>Incollalo</b> in Claude (o ChatGPT) e invia.
                  </li>
                  <li>
                    <b>Rispondi alle domande</b> che ti fa: è lì che il piano diventa davvero tuo.
                  </li>
                  <li>
                    <b>Segui il piano</b> una tappa alla volta — e prima di eseguire, fallo criticare da
                    una seconda chat.
                  </li>
                </ol>
              </div>

              <div className={styles["res-note"]}>
                <i className="ti ti-bulb" />
                <p>
                  Questo è un Plan &amp; Solve <b>semplificato</b>: un assaggio pratico. La versione
                  completa — pre-mortem strutturato, doppia validazione, sprint e piano vivente — la
                  sviluppi passo-passo in <b>Claude Unlocked</b>.
                </p>
              </div>

              <div className={cx("gate", ...(gateUnlocked ? ["unlocked"] : []))}>
                <h4>
                  <i className="ti ti-download" /> Scarica il prompt (+ il tuo Brief)
                </h4>
                <p>Il prompt di avvio e il tuo Brief in un unico file Markdown, pronto all&apos;uso.</p>
                <button type="button" className={cx("btn", "btn-primary")} onClick={onDownload}>
                  <i className="ti ti-download" /> Scarica il kit (.md)
                </button>
                <div className={styles["gate-success"]}>
                  <i className="ti ti-circle-check" style={{ fontSize: 22 }} />{" "}
                  <span>Fatto. Download partito — controlla la cartella download.</span>
                </div>
              </div>

              <div className={styles["wz-actions"]} style={{ marginTop: 18 }}>
                <button className={styles["wz-back"]} onClick={wzRestart}>
                  <i className="ti ti-refresh" /> ricomincia con un altro progetto
                </button>
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE CTA */}
      <section className={cx("section-pad", "wrap")}>
        <div className={cx("course", "reveal")}>
          <div className={styles.cbadge}>
            <span className={styles["pulse-a"]} /> Il passo che fa la differenza
          </div>
          <div className={styles.clab}>
            <i className="ti ti-player-play" /> Il corso · Claude Unlocked
          </div>
          <h2>
            Hai la mappa. <span className={styles.hl}>Adesso impara a percorrerla</span> dal vivo.
          </h2>
          <p>
            Quello che hai appena visto è un assaggio. Il Plan &amp; Solve completo — pre-mortem, doppia
            validazione, sprint, piano vivente — e tutto il resto (setup, Projects, Cowork) lo impari
            passo-passo, su casi veri, dentro <b>Claude Unlocked</b>.
          </p>
          <div className={styles.cfeats}>
            <div className={styles.cfeat}>
              <i className="ti ti-checkbox" /> Il metodo applicato a casi veri
            </div>
            <div className={styles.cfeat}>
              <i className="ti ti-layout-grid" /> Tutti i moduli, dal setup a Cowork
            </div>
            <div className={styles.cfeat}>
              <i className="ti ti-clipboard-list" /> Template e prompt pronti
            </div>
          </div>
          <a
            href="https://www.morfeushub.com/claude-unlocked"
            target="_blank"
            rel="noopener"
            className={cx("btn", "btn-amber", "btn-pulse", "btn-lg")}
          >
            <i className="ti ti-arrow-right" /> Sblocca Claude Unlocked
          </a>
          <div className={styles.cnote}>Il freebie ti dà la mappa. Il corso ti insegna a percorrerla.</div>
        </div>
      </section>

      {/* GSD / COMMUNITY */}
      <section className={cx("section-pad", "wrap")}>
        <div className={cx("gsd", "reveal")}>
          <div className={styles["big-gsd"]}>GSD</div>
          <div className={styles.friction}>
            <i className="ti ti-copy" /> Hai sentito la fatica?
          </div>
          <h2>
            Tutto questo a mano è potente. Ma il copia-incolla tra chat è{" "}
            <span className={styles.hl}>lento.</span>
          </h2>
          <p>
            E se l&apos;intera macchina — Brief, rischi, piano, validazione, esecuzione — diventasse una
            procedura guidata dentro Claude, che orchestra tutto da sola? Si chiama <b>GSD</b>, e lo
            smontiamo pezzo per pezzo dentro la <b>community Morfeus</b> (gratis): è lì che entro poco
            rilasciamo la guida completa.
          </p>
          <a
            href="https://morfeus-ai-playground.circle.so/join?invitation_token=7b1b1cb443d6e80815477fea75f6b02a4381b405-0fe0d3ad-b808-42b2-a1ab-bbe8ea9460c6"
            target="_blank"
            rel="noopener"
            className={cx("btn", "btn-ghost")}
          >
            <i className="ti ti-users-group" /> Entra nella community (gratis)
          </a>
          <div className={styles.soon} style={{ marginTop: 16 }}>
            <i className="ti ti-flame" /> Siamo già in <b>+1.000</b> dentro · GSD esce qui
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={cx("footer", "wrap")}>
        <div className={styles["footer-in"]}>
          <div className={styles.brand}>
            <svg viewBox="0 0 1000 476" fill="currentColor">
              {MORFEUS_PATH}
            </svg>
            <span className={styles.bn}>Morfeus</span>
          </div>
          <div className={styles.fmeta}>
            Plan &amp; Solve · estratto dal metodo di <a href="#">Matteo Arnaboldi</a> &amp; Morfeus
            <br />
            Il costo vero non è pianificare. È riscrivere.
          </div>
        </div>
      </footer>
    </div>
  );
}
