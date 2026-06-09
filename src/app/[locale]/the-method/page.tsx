"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT, type Lang } from "./content";
import "./the-method.css";

type Theme = "light" | "dark";

export default function TheMethodPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>("en");

  const setTheme = (val: Theme) => {
    setThemeState(val);
    try {
      localStorage.setItem("method-theme", val);
    } catch {
      /* ignore */
    }
  };
  const setLang = (val: Lang) => {
    setLangState(val);
    try {
      localStorage.setItem("method-lang", val);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    try {
      const savedT = localStorage.getItem("method-theme") as Theme | null;
      if (savedT === "light" || savedT === "dark") setThemeState(savedT);
      const savedL = localStorage.getItem("method-lang") as Lang | null;
      if (savedL === "en" || savedL === "it") setLangState(savedL);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            e.target.querySelectorAll<HTMLElement>(".g-fill,.stage-track .fill").forEach((b) => {
              if (b.dataset.w) b.style.width = b.dataset.w;
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const arcs = root.querySelectorAll<SVGElement>(".hero-arc .draw");
    const timers: ReturnType<typeof setTimeout>[] = [];
    arcs.forEach((c, i) => timers.push(setTimeout(() => c.classList.add("in"), 120 + i * 140)));
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const t = CONTENT[lang];

  const logoPaths = (
    <>
      <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" />
      <path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" />
      <path d="M1000 245.798V475.231C737.917 475.231 524.77 262.043 524.77 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
    </>
  );

  const quadKeys = ["exposed", "indispensable", "commodity", "specialist"];

  return (
    <div className="tm-method" data-theme={theme} ref={rootRef}>
      <div className="tm-frame" aria-hidden="true">
        <span className="cm cm-tl" />
        <span className="cm cm-tr" />
        <span className="cm cm-bl" />
        <span className="cm cm-br" />
      </div>

      {/* CONTROLS — language + theme */}
      <div className="controls">
        <div className="seg" role="group" aria-label="Language">
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
            EN
          </button>
          <button className={lang === "it" ? "on" : ""} onClick={() => setLang("it")}>
            IT
          </button>
        </div>
        <button
          className="seg-single"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={theme === "light" ? t.ui.dark : t.ui.light}
        >
          {theme === "light" ? "◗" : "◖"}
        </button>
      </div>

      {/* TITLE BLOCK */}
      <div className="titleblock" aria-hidden="true">
        <div>drawing</div>
        <div>
          <b>{t.brand.sub.toUpperCase()}</b>
        </div>
        <div>rev.</div>
        <div>1.0 · 2026</div>
        <div>scope</div>
        <div>company-wide</div>
      </div>

      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="tmGa" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#392CB8" />
            <stop offset=".5" stopColor="#533DFC" />
            <stop offset="1" stopColor="#8CA5F7" />
          </linearGradient>
        </defs>
      </svg>

      <div className="sheet">
        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-inner">
            <div className="brand">
              <svg viewBox="0 0 1000 476" xmlns="http://www.w3.org/2000/svg" aria-label="Morfeus">
                {logoPaths}
              </svg>
              <span className="brand-name">
                {t.brand.name} <span>· {t.brand.sub}</span>
              </span>
            </div>
            <span className="sheet-id">{t.brand.tag}</span>
          </div>
        </div>

        {/* HERO */}
        <section className="hero">
          <svg className="hero-arc" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <g stroke="url(#tmGa)" fill="none" strokeLinecap="round">
              <circle className="draw" cx="200" cy="200" r="70" strokeWidth="1.5" pathLength="1" opacity=".9" strokeDasharray="4 4" />
              <circle className="draw" cx="200" cy="200" r="120" strokeWidth="1.5" pathLength="1" opacity=".6" />
              <circle className="draw" cx="200" cy="200" r="170" strokeWidth="1.5" pathLength="1" opacity=".4" strokeDasharray="4 4" />
              <circle className="draw" cx="200" cy="200" r="220" strokeWidth="1.5" pathLength="1" opacity=".22" />
            </g>
          </svg>
          <svg className="hero-mark" viewBox="0 0 1000 476" fill="none" aria-hidden="true">
            <g>{logoPaths}</g>
          </svg>
          <div className="wrap">
            <div className="col">
              <span className="eyebrow">{t.hero.eyebrow}</span>
              <h1>{t.hero.title}</h1>
              <p className="thesis">
                {t.hero.thesisPre}
                <em>{t.hero.thesisEm}</em>
                {t.hero.thesisPost}
              </p>
              <p className="thesis-attr">{t.hero.attr}</p>
              <p className="hero-body">{t.hero.body}</p>
            </div>
          </div>
        </section>

        {/* MANTRAS */}
        <div className="mantras-wrap">
          <div className="mantras">
            {t.mantras.map((m, i) => (
              <div className="mantra reveal" key={i}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <p>{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ECONOMICS */}
        <section className="part">
          <div className="wrap">
            <div className="part-head col reveal">
              <span className="eyebrow">{t.economics.eyebrow}</span>
              <h2>{t.economics.title}</h2>
              <p>{t.economics.sub}</p>
            </div>

            <div className="eq-wrap reveal">
              <div className="eq-formula">
                <span className="eq-term" data-q="x">{t.economics.x}</span>
                <span className="eq-op">×</span>
                <span className="eq-term" data-q="y">{t.economics.y}</span>
                <span className="eq-op">=</span>
                <span className="eq-result">{t.economics.result}</span>
              </div>
              <p className="eq-hint">{t.economics.quadHint}</p>
            </div>

            <div className="matrix-block reveal">
              <div className="matrix">
                {t.matrix.quads.map((q, i) => (
                  <div className={`quad ${quadKeys[i]}`} key={i}>
                    {i === 1 && <span className="grow">{t.matrix.grow}</span>}
                    <span className="q-pos">{q.pos}</span>
                    <div className="q-name">{q.name}</div>
                    <p className="q-desc">{q.desc}</p>
                  </div>
                ))}
              </div>
              <div className="x-axis">
                <span>← {t.matrix.xLeft}</span>
                <span className="x-mid">{t.matrix.xMid}</span>
                <span>{t.matrix.xRight} →</span>
              </div>
            </div>

            <div className="col">
              <p className="eq-foot reveal">
                {t.economics.foot1}
                <span className="accent">{t.economics.footEm}</span>
                {t.economics.foot2}
              </p>
              <blockquote className="source reveal">{t.economics.quote}</blockquote>
            </div>
          </div>
        </section>

        {/* TWO LAYERS */}
        <section className="part tinted">
          <div className="wrap">
            <div className="context-grid">
              <div className="context-intro col reveal">
                <span className="eyebrow">{t.layers.eyebrow}</span>
                <h2>{t.layers.title}</h2>
                <p>{t.layers.sub}</p>
                <p className="order-rule">{t.layers.rule}</p>
              </div>
              <div className="layers reveal">
                <div className="layer-card">
                  <div className="layer-num">I</div>
                  <div>
                    <h4>{t.layers.aHead}</h4>
                    <p>{t.layers.aBody}</p>
                  </div>
                </div>
                <div className="flowmark">↓</div>
                <div className="layer-card">
                  <div className="layer-num">II</div>
                  <div>
                    <h4>{t.layers.bHead}</h4>
                    <p>{t.layers.bBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PART I — ALIGNMENT */}
        <section className="part">
          <div className="wrap">
            <div className="part-head col reveal">
              <span className="part-tag">{t.alignment.tag}</span>
              <h2>{t.alignment.title}</h2>
              <p>{t.alignment.sub}</p>
            </div>
            <div className="items">
              {t.alignment.items.map((it, i) => (
                <div className="item reveal" key={i}>
                  <div className="item-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="item-body">
                    <h3>{it.title}</h3>
                    <p className="desc">{it.desc}</p>
                    <blockquote className="source">{it.quote}</blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIAGNOSIS */}
        <section className="pull">
          <div className="wrap">
            <div className="col">
              <span className="pull-tag">{t.diagnosis.tag}</span>
              <blockquote className="pull-quote">
                {t.diagnosis.quotePre}
                <em>{t.diagnosis.quoteEm1}</em>
                {t.diagnosis.quoteMid}
                <em>{t.diagnosis.quoteEm2}</em>
                {t.diagnosis.quotePost}
              </blockquote>
            </div>
            <div className="gauges reveal">
              <div className="gauge">
                <div className="g-label">
                  <span className="g-name">
                    {t.diagnosis.bar1Name}
                    <small>{t.diagnosis.bar1Sub}</small>
                  </span>
                  <span className="g-state up">{t.diagnosis.bar1State}</span>
                </div>
                <div className="g-track">
                  <div className="g-fill lit" data-w="82%"></div>
                </div>
              </div>
              <div className="gauge">
                <div className="g-label">
                  <span className="g-name">
                    {t.diagnosis.bar2Name}
                    <small>{t.diagnosis.bar2Sub}</small>
                  </span>
                  <span className="g-state flat">{t.diagnosis.bar2State}</span>
                </div>
                <div className="g-track">
                  <div className="g-fill dim" data-w="26%"></div>
                </div>
              </div>
            </div>
            <p className="pull-attr col">{t.diagnosis.attr}</p>
          </div>
        </section>

        {/* PART II — TRAINING */}
        <section className="part tinted">
          <div className="wrap">
            <div className="part-head col reveal">
              <span className="part-tag">{t.training.tag}</span>
              <h2>{t.training.title}</h2>
              <p>{t.training.sub}</p>
            </div>
            <div className="items loop">
              {t.training.items.map((it, i) => (
                <div className="item reveal" key={i}>
                  <div className="item-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="item-body">
                    <h3>{it.title}</h3>
                    <p className="desc">{it.desc}</p>
                    <blockquote className="source">{it.quote}</blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLKIT 1 — DEFINITION OF DONE */}
        <section className="tool-block">
          <div className="wrap">
            <div className="part-head col reveal">
              <span className="part-tag">{t.tool1.tag}</span>
              <h2>{t.tool1.title}</h2>
              <p>{t.tool1.sub}</p>
            </div>
            <div className="derive reveal">
              {t.tool1.steps.map((s, i) => (
                <div className="step" key={i}>
                  <div className="s-num">{i + 1}</div>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="derive-example col reveal">
              <span className="ex-tag">{t.tool1.exampleTag}</span>
              <p>{t.tool1.example}</p>
            </div>
            <p className="tool-foot col reveal">{t.tool1.foot}</p>
          </div>
        </section>

        {/* TOOLKIT 2 — WORKING WITH AI */}
        <section className="tool-block tinted">
          <div className="wrap">
            <div className="part-head col reveal">
              <span className="part-tag">{t.tool2.tag}</span>
              <h2>{t.tool2.title}</h2>
              <p>{t.tool2.sub}</p>
            </div>
            <div className="split reveal">
              <div className="split-col delegate">
                <h4>{t.tool2.delegateHead}</h4>
                <p className="sub">{t.tool2.delegateSub}</p>
                <ul>
                  {t.tool2.delegate.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              </div>
              <div className="split-col keep">
                <h4>{t.tool2.keepHead}</h4>
                <p className="sub">{t.tool2.keepSub}</p>
                <ul>
                  {t.tool2.keep.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ai-warn col reveal">
              <span className="wtag">{t.tool2.warnTag}</span>
              {t.tool2.warn}
            </div>
            <blockquote className="source col reveal">{t.tool2.quote}</blockquote>
          </div>
        </section>

        {/* TOOLKIT 3 — MATURITY CURVE */}
        <section className="tool-block">
          <div className="wrap">
            <div className="part-head col reveal">
              <span className="part-tag">{t.tool3.tag}</span>
              <h2>{t.tool3.title}</h2>
              <p>{t.tool3.sub}</p>
            </div>
            <div className="stages reveal">
              {t.tool3.stages.map((s, i) => (
                <div className="stage" key={i}>
                  <span className="s-rank">{s.rank}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="stage-track reveal">
              <div className="fill" data-w="100%"></div>
            </div>
            <div className="stage-axis reveal">
              <span>{t.tool3.axisStart}</span>
              <span className="end">{t.tool3.axisEnd}</span>
            </div>
            <blockquote className="source col reveal">{t.tool3.quote}</blockquote>
          </div>
        </section>

        {/* CLOSING */}
        <section className="closing">
          <svg className="closing-arc" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <g stroke="url(#tmGa)" fill="none">
              <circle cx="200" cy="200" r="80" strokeWidth="1.1" opacity=".4" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="135" strokeWidth="1.1" opacity=".28" />
              <circle cx="200" cy="200" r="190" strokeWidth="1.1" opacity=".16" strokeDasharray="4 4" />
            </g>
          </svg>
          <div className="wrap">
            <span className="eyebrow">{t.closing.eyebrow}</span>
            <p className="standard-line">
              {t.closing.line}
              <em>{t.closing.lineEm}</em>
            </p>
            <p className="tagline">{t.closing.tagline}</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="foot">
          <div className="foot-inner">
            <svg viewBox="0 0 1000 476" xmlns="http://www.w3.org/2000/svg" aria-label="Morfeus">
              {logoPaths}
            </svg>
            <span className="foot-meta">{t.foot}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
