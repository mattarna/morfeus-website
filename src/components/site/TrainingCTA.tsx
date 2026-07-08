/**
 * Training & community CTA block (reusable across content pages).
 * Pushes traffic to the AI Playground community + the Claude Unlocked course.
 * Server component, crawlable.
 *
 * TODO(Matteo): replace AI_PLAYGROUND_URL with the real community URL.
 */
const AI_PLAYGROUND_URL = "https://morfeushub.com";
const CLAUDE_UNLOCKED_URL = "/claude-unlocked";

const COPY = {
  it: {
    label: "Formazione & community",
    h2pre: "Costruisci la tua ",
    h2hl: "competenza AI",
    h2post: ".",
    community: {
      tag: "Community",
      title: "Morfeus AI Playground",
      desc: "La community dove ci si forma sull'AI applicata, insieme. 1.000+ membri che imparano e costruiscono.",
      cta: "Entra nell'AI Playground",
    },
    course: {
      tag: "Corso",
      title: "Claude Unlocked",
      desc: "Il corso per usare Claude al massimo nel tuo lavoro, da subito. Pratico, non teorico.",
      cta: "Scopri Claude Unlocked",
    },
  },
  en: {
    label: "Training & community",
    h2pre: "Build your ",
    h2hl: "AI capability",
    h2post: ".",
    community: {
      tag: "Community",
      title: "Morfeus AI Playground",
      desc: "The community where you learn applied AI, together. 1,000+ members learning and building.",
      cta: "Join the AI Playground",
    },
    course: {
      tag: "Course",
      title: "Claude Unlocked",
      desc: "The course to use Claude to the fullest in your work, right away. Practical, not theoretical.",
      cta: "Discover Claude Unlocked",
    },
  },
} as const;

export function TrainingCTA({ locale }: { locale: "it" | "en" }) {
  const t = COPY[locale];
  return (
    <section className="sec">
      <div className="wrap">
        <span className="label h-eyebrow">{t.label}</span>
        <h2 className="h2">{t.h2pre}<span className="hl">{t.h2hl}</span>{t.h2post}</h2>
        <div className="train">
          <div className="trcard">
            <div className="tlabel">{t.community.tag}</div>
            <h3>{t.community.title}</h3>
            <p>{t.community.desc}</p>
            <a className="btn btn-solid" href={AI_PLAYGROUND_URL} target="_blank" rel="noopener noreferrer">{t.community.cta}</a>
          </div>
          <div className="trcard claude">
            <div className="tlabel">{t.course.tag}</div>
            <h3>{t.course.title}</h3>
            <p>{t.course.desc}</p>
            <a className="btn btn-claude" href={CLAUDE_UNLOCKED_URL}>{t.course.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
