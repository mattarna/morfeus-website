import type { ReactNode } from "react";
import { PlaygroundMark } from "./PlaygroundMark";

const P = "/playground";

const NAV = [
  { slug: "metodo", label: "Metodo" },
  { slug: "storie", label: "Storie" },
  { slug: "community", label: "Community" },
  { slug: "chi-siamo", label: "Chi siamo" },
] as const;

type Active = "home" | "metodo" | "storie" | "community" | "chi-siamo";

/**
 * Chrome condiviso delle pagine hub/evergreen del Playground:
 * nav fissa + sotto-nav mobile + footer + la "sottotrama" (barra fissa
 * verso il Collaudo). Le pagine funnel/quiz NON lo usano (restano isolate).
 */
export function PlaygroundChrome({
  active,
  children,
}: {
  active: Active;
  children: ReactNode;
}) {
  return (
    <>
      <nav className="nav">
        <a className="who" href={P} style={{ textDecoration: "none", color: "inherit" }}>
          <PlaygroundMark className="mark" />
          <b>PLAYGROUND</b>
          <span className="badge-madre">
            <PlaygroundMark className="mark" /> di MORFEUS
          </span>
        </a>
        <span className="links">
          {NAV.map((n) => (
            <a key={n.slug} href={`${P}/${n.slug}`}>
              {n.label}
            </a>
          ))}
          <a className="cta" href={`${P}/il-collaudo`}>
            <span className="dsk">Che livello sei?</span>
            <span className="mob">Il collaudo</span>
          </a>
        </span>
      </nav>

      <nav className="nav-sub" aria-label="Menu mobile">
        <a className={active === "home" ? "on" : undefined} href={P}>
          Home
        </a>
        {NAV.map((n) => (
          <a key={n.slug} className={active === n.slug ? "on" : undefined} href={`${P}/${n.slug}`}>
            {n.label}
          </a>
        ))}
      </nav>

      <div className="pg-body">{children}</div>

      <footer>
        <div className="cols">
          <div>
            <b>AI PLAYGROUND · di Morfeus</b>
            <p style={{ maxWidth: "40ch", fontSize: 12, lineHeight: 1.7 }}>
              Il laboratorio dell&apos;AI Brain italiano. Metodo misurato, zero fuffa: prova &gt; promessa.
            </p>
          </div>
          <div>
            <b>Esplora</b>
            <a href={`${P}/metodo`}>Il metodo</a>
            <a href={`${P}/storie`}>Le storie</a>
            <a href={`${P}/chi-siamo`}>Chi siamo</a>
            <a href={`${P}/il-collaudo`}>Il collaudo</a>
          </div>
          <div>
            <b>La stanza</b>
            <a href={`${P}/community`}>Community · gratis</a>
            <a href="https://aiespresso.substack.com" target="_blank" rel="noopener noreferrer">
              Newsletter
            </a>
          </div>
        </div>
        <div className="base">
          <span>© Morfeus · AI Playground · prototipo</span>
          <span>privacy · termini · cookie</span>
        </div>
      </footer>

      <a className="sottotrama" href={`${P}/il-collaudo`}>
        <span className="lb">a che livello sei?</span>
        <b>il collaudo · 2&apos;30&Prime;</b>
        <span className="fr">→</span>
      </a>
    </>
  );
}
