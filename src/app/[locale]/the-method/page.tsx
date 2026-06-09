"use client";

/* eslint-disable react/jsx-no-comment-textnodes --
   The "// ..." strings below are intentional draftsman-note UI text,
   not stray code comments. */

import { useEffect, useRef, useState } from "react";
import "./the-method.css";

type Theme = "light" | "dark";

export default function TheMethodPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [theme, setThemeState] = useState<Theme>("light");

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("method-theme", t);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("method-theme") as Theme | null;
      if (saved === "light" || saved === "dark") setThemeState(saved);
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
            e.target
              .querySelectorAll<HTMLElement>(".g-fill,.stage-track .fill")
              .forEach((b) => {
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
    arcs.forEach((c, i) => {
      timers.push(setTimeout(() => c.classList.add("in"), 120 + i * 140));
    });

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const logoPaths = (
    <>
      <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" />
      <path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" />
      <path d="M1000 245.798V475.231C737.917 475.231 524.77 262.043 524.77 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
    </>
  );

  return (
    <div className="tm-method" data-theme={theme} ref={rootRef}>
      {/* DRAWING FRAME + REGISTRATION CROP-MARKS */}
      <div className="tm-frame" aria-hidden="true">
        <span className="cm cm-tl" />
        <span className="cm cm-tr" />
        <span className="cm cm-bl" />
        <span className="cm cm-br" />
      </div>

      {/* THEME TOGGLE */}
      <div className="toggle" role="group" aria-label="Theme">
        <button className={theme === "dark" ? "on" : ""} onClick={() => setTheme("dark")}>
          rev: dark
        </button>
        <button className={theme === "light" ? "on" : ""} onClick={() => setTheme("light")}>
          rev: light
        </button>
      </div>

      {/* TITLE BLOCK */}
      <div className="titleblock" aria-hidden="true">
        <div>drawing</div><div><b>THE METHOD</b></div>
        <div>standard</div><div>Morfeus OS</div>
        <div>rev.</div><div>1.0 · 2026-06</div>
        <div>scope</div><div>company-wide</div>
        <div>scala</div><div>1:1</div>
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
                Morfeus <span>· The Method</span>
              </span>
            </div>
            <span className="sheet-id">Operating Standard · fig. 00</span>
          </div>
        </div>

        {/* HERO */}
        <section className="hero">
          <svg className="hero-arc" viewBox="0 0 400 400" fill="none">
            <g stroke="url(#tmGa)" fill="none" strokeLinecap="round">
              <circle className="draw" cx="200" cy="200" r="60" strokeWidth="1.5" pathLength="1" opacity=".9" strokeDasharray="4 4" />
              <circle className="draw" cx="200" cy="200" r="105" strokeWidth="1.5" pathLength="1" opacity=".7" />
              <circle className="draw" cx="200" cy="200" r="150" strokeWidth="1.5" pathLength="1" opacity=".5" strokeDasharray="4 4" />
              <circle className="draw" cx="200" cy="200" r="195" strokeWidth="1.5" pathLength="1" opacity=".32" />
              <circle className="draw" cx="200" cy="200" r="240" strokeWidth="1.5" pathLength="1" opacity=".18" strokeDasharray="4 4" />
              <line x1="200" y1="200" x2="395" y2="200" strokeWidth="1" opacity=".3" />
              <line x1="200" y1="200" x2="200" y2="5" strokeWidth="1" opacity=".3" />
              <circle cx="200" cy="200" r="3" fill="url(#tmGa)" stroke="none" />
            </g>
          </svg>
          <div className="wrap">
            <span className="eyebrow">The Morfeus Operating Standard — How We Work</span>
            <h1>
              The Method<span className="rule"></span>
            </h1>
            <p className="thesis">
              Your value isn&apos;t your effort. It&apos;s <em>how hard you are to replace</em> — and how much rides on you.
            </p>
            <p className="thesis-attr">// The standard we train, hire, and pay against.</p>
            <p className="hero-body">
              Expertise is being commoditized and effort is invisible. What compounds is your{" "}
              <strong>approach</strong>: how you define done, the questions you ask, and how much you own. This is the
              standing logic of how we work — the beliefs we align on first, the loop we build inside second, and the
              tools that make it repeatable in any field.
            </p>
          </div>
          <span className="note hero-note">// fig. 00 — tavola d&apos;apertura · disegnato da Alex</span>
        </section>

        {/* MANTRA / LEGEND */}
        <div className="mantras">
          <div className="mantra reveal"><span className="n">01 · LEGENDA</span><p>Value = how hard to replace, times how much you own.</p></div>
          <div className="mantra reveal"><span className="n">02 · LEGENDA</span><p>AI fluency is a consequence of the approach, not the goal.</p></div>
          <div className="mantra reveal"><span className="n">03 · LEGENDA</span><p>Always start from the definition of done.</p></div>
          <div className="mantra reveal"><span className="n">04 · LEGENDA</span><p>If you can&apos;t repeat it, you didn&apos;t understand it.</p></div>
        </div>

        {/* VALUE EQUATION */}
        <section className="part">
          <div className="wrap">
            <div className="part-head reveal">
              <div className="dim"><span>fig. 01</span><i className="tick"></i><span>l&apos;economia · what you&apos;re paid for</span></div>
              <span className="eyebrow">The economics</span>
              <h2 style={{ marginTop: "14px" }}>What you&apos;re actually paid for.</h2>
              <p>Two forces set your value. Most people only push on one — and it&apos;s usually hours, the one that doesn&apos;t compound.</p>
              <div className="eq-formula">
                <span className="eq-term" data-q="asse x">How hard you are to replace</span>
                <span className="eq-op">×</span>
                <span className="eq-term" data-q="asse y">How much rides on you</span>
                <span className="eq-op">=</span>
                <span className="eq-result">What you&apos;re worth</span>
              </div>
            </div>

            <div className="matrix-section reveal">
              <div className="matrix-layout">
                <div className="y-axis">Responsibility — how much rides on you ↑</div>
                <div>
                  <div className="matrix">
                    <div className="quad exposed">
                      <span className="q-pos">High stakes · Replaceable</span>
                      <div className="q-name">Exposed</div>
                      <p className="q-desc">All the pressure rides on you, but you can be swapped out. Stressful, fragile, and still not the top of the pay scale.</p>
                    </div>
                    <div className="quad indispensable">
                      <span className="node" aria-hidden="true"><i></i></span>
                      <span className="node-tag">↑ resp · → rare</span>
                      <span className="star">▸ grow here</span>
                      <span className="q-pos">High stakes · Hard to replace</span>
                      <div className="q-name">Indispensable</div>
                      <p className="q-desc">The outcome rides on you, and only you do it that way. Highest leverage, highest pay.</p>
                    </div>
                    <div className="quad commodity">
                      <span className="q-pos">Low stakes · Replaceable</span>
                      <div className="q-name">Commodity</div>
                      <p className="q-desc">Anyone can do it and nothing rides on it. Hours are the only lever — and hours don&apos;t compound.</p>
                    </div>
                    <div className="quad specialist">
                      <span className="q-pos">Low stakes · Hard to replace</span>
                      <div className="q-name">Specialist</div>
                      <p className="q-desc">Rare skill, but you&apos;re handed the spec and don&apos;t own the result. Valued — and capped.</p>
                    </div>
                  </div>
                  <div className="x-axis">
                    <span>← Easily replaced</span>
                    <span className="x-mid">Replaceability</span>
                    <span>Hard to replace →</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="eq-foot reveal">
              It&apos;s multiplication, not addition. <b>Max out one axis and zero the other, and you&apos;re still a commodity or still exposed.</b> The career move is the diagonal — <span className="accent">harder to replace and more ownership, at the same time.</span>
            </p>
            <div className="source reveal">
              <span className="src-tag">// nota a margine — il principio in una riga</span>
              <p>&quot;It&apos;s not about how hard you work — it&apos;s about how easy it is to substitute you. Take more accountability: real objectives, real payments, real consequences.&quot;</p>
            </div>
          </div>
        </section>

        {/* CONTEXT: TWO LAYERS */}
        <section className="part tinted">
          <div className="wrap">
            <div className="dim reveal"><span>fig. 02</span><i className="tick"></i><span>sequenza operativa · l&apos;ordine è il punto</span></div>
            <div className="context-grid">
              <div className="context-intro reveal">
                <span className="eyebrow">How a session works</span>
                <h2 style={{ marginTop: "14px" }}>Align first. Then train.</h2>
                <p>Every working session has two layers, in this order — and the order is the whole point.</p>
                <p className="order-rule">Alignment without training is theory. Training without alignment is busywork. You need <b>both, in that order.</b></p>
                <p className="note" style={{ marginTop: "22px" }}>// le citazioni in rosso sono parole di Alex, ripulite il minimo.</p>
              </div>
              <div className="layers reveal">
                <div className="layer-card">
                  <div className="layer-num">I</div>
                  <div><h4>Alignment</h4><p>Get the beliefs straight before anyone touches the work — what value is, how it&apos;s earned, what &quot;done&quot; means.</p></div>
                </div>
                <div className="flowmark">↓</div>
                <div className="layer-card">
                  <div className="layer-num">II</div>
                  <div><h4>Training</h4><p>Run the build loop against a real bar — frame, build, review, repeat back, raise the bar.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PART I — ALIGNMENT */}
        <section className="part">
          <div className="wrap">
            <div className="part-head reveal">
              <div className="dim"><span>tav. I</span><i className="tick"></i><span>allineamento · le convinzioni sotto il lavoro</span></div>
              <span className="part-tag">Part I — Alignment</span>
              <h2>The beliefs under the work.</h2>
              <p>Before the first move, we agree on how the work actually works. If we don&apos;t share these, every review turns into the same argument.</p>
            </div>
            <div className="items">
              <div className="item reveal">
                <div className="item-num">01</div>
                <div className="item-body">
                  <h3>Approach beats expertise</h3>
                  <p className="desc">You don&apos;t need to be the expert to know whether something is ready. You need a repeatable process for judging it. The expertise follows the approach — not the other way around.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;You don&apos;t need deep coding knowledge to know whether something is ready. It&apos;s about the approach.&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">02</div>
                <div className="item-body">
                  <h3>The questions are the work</h3>
                  <p className="desc">Right answers come from right questions. Right questions come from a clear objective. When you&apos;re stuck, you&apos;re usually asking the wrong thing — go back to the objective.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;It&apos;s always about the questions. If you don&apos;t have a clear objective, you&apos;re not asking yourself the right questions.&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">03</div>
                <div className="item-body">
                  <h3>Start from the definition of done</h3>
                  <p className="desc">The first question on anything: what does done look like? Define the target before you move. No clear target means wrong questions — and you loop on the same wall forever.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;The first question was: what&apos;s the definition of done? If I have to reach the objective, I need a clear objective.&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">04</div>
                <div className="item-body">
                  <h3>Set your own standards</h3>
                  <p className="desc">No one expects mastery in week one. They expect you to hold a bar — and raise it on purpose. Standards are something you set for yourself, not something handed to you.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;You need to set yourself some standards. Nobody&apos;s asking you to be at the level in the first week.&quot;</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIAGNOSIS PULL QUOTE + GAUGES */}
        <section className="pull">
          <svg className="pull-arc" viewBox="0 0 400 400" fill="none">
            <g stroke="url(#tmGa)" fill="none">
              <circle cx="200" cy="200" r="80" strokeWidth="1.2" opacity=".8" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="135" strokeWidth="1.2" opacity=".55" />
              <circle cx="200" cy="200" r="190" strokeWidth="1.2" opacity=".35" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="245" strokeWidth="1.2" opacity=".2" />
            </g>
          </svg>
          <div className="wrap">
            <div className="dim reveal"><span>fig. 03</span><i className="tick"></i><span>strumento di misura · two readouts</span></div>
            <span className="pull-tag">The diagnosis</span>
            <blockquote>&quot;I see improvement in the <em>quality</em> of the work. I don&apos;t see improvement in the <em>approach</em> — so we keep hitting the same wall.&quot;</blockquote>
            <div className="gauges reveal">
              <div className="gauge">
                <div className="g-label">
                  <span className="g-name">Output layer <small>// the artifact · the visible result</small></span>
                  <span className="g-state up">Improving ↗</span>
                </div>
                <div className="g-track"><div className="g-fill lit" data-w="82%"></div></div>
              </div>
              <div className="gauge">
                <div className="g-label">
                  <span className="g-name">Approach layer <small>// how you think · the questions you ask</small></span>
                  <span className="g-state flat">Flat →</span>
                </div>
                <div className="g-track"><div className="g-fill dim" data-w="26%"></div></div>
              </div>
            </div>
            <p className="pull-attr">// The output layer can be copied. The approach layer can&apos;t — and it&apos;s the only one that compounds. So that&apos;s the one we train.</p>
          </div>
        </section>

        {/* PART II — TRAINING */}
        <section className="part tinted">
          <div className="wrap">
            <div className="part-head reveal">
              <div className="dim"><span>tav. II</span><i className="tick"></i><span>training · il loop di costruzione</span></div>
              <span className="part-tag">Part II — Training</span>
              <h2>The loop we build inside.</h2>
              <p>Skill is built inside a structured loop with guardrails. I set the frame. You build inside it with full creative freedom. We review against the bar. You prove you understood. We raise the bar.</p>
            </div>
            <div className="items loop">
              <div className="item reveal">
                <div className="item-num">01</div>
                <div className="item-body">
                  <h3>Frame the project</h3>
                  <p className="desc">Someone builds the scaffold and the constraints — including what&apos;s explicitly <em>not</em> wanted inside it. You don&apos;t set up the project; you inherit a clean frame so you can focus on the actual work.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;I set up the project — you never set up the project, I do it for you. Then you start working on it.&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">02</div>
                <div className="item-body">
                  <h3>Build inside the guardrails</h3>
                  <p className="desc">Within the frame you have full creative freedom. The constraints are the moat; the creativity is yours. You always know the boundary you can&apos;t cross.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;You have the creativity to work on whatever you want, but you still know what I do not want inside the project.&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">03</div>
                <div className="item-body">
                  <h3>Two postures of help</h3>
                  <p className="desc">Sometimes you get exactly what you ask for. Sometimes the answer stays eye-level and you find it yourself. The second one is where the approach actually gets built.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;From me you&apos;ll have exactly what you ask — the other is more eye-level, and you&apos;ll find the answers on your own.&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">04</div>
                <div className="item-body">
                  <h3>Be your own first reviewer</h3>
                  <p className="desc">Run your definition of done against your own work <em>before</em> you hand it over. &quot;Came close&quot; should be caught by you, not by me. My review is the backstop, not the first check.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;We came very close — but it was not done.&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">05</div>
                <div className="item-body">
                  <h3>The repeat-back test</h3>
                  <p className="desc">Explain the brief back in your own words. If you can&apos;t repeat it, you didn&apos;t understand it 100%. We do this live, out loud, every time.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;In your own way, explain to me what I just said. If you cannot repeat it, you did not understand it 100%.&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">06</div>
                <div className="item-body">
                  <h3>Use the corpus</h3>
                  <p className="desc">The transcripts are a knowledge base — thousands of them. Ask them &quot;what is Alex saying here?&quot; Use AI on the record to close your own gaps before you ask a person.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;You have thousands of transcripts — you can ask those transcripts questions like &apos;what is Alex saying here?&apos;&quot;</p></div>
                </div>
              </div>
              <div className="item reveal">
                <div className="item-num">07</div>
                <div className="item-body">
                  <h3>Critique is care; consequences are real</h3>
                  <p className="desc">Critique is given to make you better, never to attack. And missing the bar has consequences — because the objectives and the payments are real.</p>
                  <div className="source"><span className="src-tag">// dal lavoro</span><p>&quot;It&apos;s not a critique — the best way you can improve is by starting. But if you mess up, there are consequences.&quot;</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOOLKIT 1 — DEFINITION OF DONE */}
        <section className="tool-block">
          <div className="wrap">
            <div className="part-head reveal">
              <div className="dim"><span>fig. 04</span><i className="tick"></i><span>procedura di costruzione · definire &quot;done&quot;</span></div>
              <span className="part-tag">Toolkit — The core skill</span>
              <h2>Defining &quot;done&quot; in a field you don&apos;t know.</h2>
              <p>You don&apos;t need to be the expert to set the bar — you need a repeatable way to build one. This process is domain-agnostic: it works on a website, a sales call, a contract, a campaign, anything.</p>
            </div>
            <div className="derive reveal">
              <div className="step"><div className="s-num">1</div><div><h4>Accept you&apos;re at zero — it doesn&apos;t disqualify you</h4><p>Expertise isn&apos;t the prerequisite for judgment. You can set a bar in a domain you&apos;ve never touched.</p></div></div>
              <div className="step"><div className="s-num">2</div><div><h4>Find the real objective</h4><p>What does the person who asked actually need? <span className="q">What does success look like to them?</span> Done is defined by their outcome, not your effort.</p></div></div>
              <div className="step"><div className="s-num">3</div><div><h4>Surface the dimensions that matter</h4><p>Ask people, ask AI: <span className="q">what does a good version of this have to satisfy?</span> List every axis of quality you can find.</p></div></div>
              <div className="step"><div className="s-num">4</div><div><h4>Set a threshold on each</h4><p>Decide what &quot;good enough&quot; is on every axis. <span className="q">Where&apos;s the line between done and not done?</span> That list <em>is</em> your definition of done.</p></div></div>
              <div className="step"><div className="s-num">5</div><div><h4>Now you can judge</h4><p>With the bar written down, you can evaluate any output — yours or the AI&apos;s — without being the domain expert.</p></div></div>
            </div>
            <div className="derive-example reveal">
              <span className="ex-tag">// esempio reale — applicato a un sito</span>
              <p>Knowing nothing about the stack, this process produced a bar like: <b>works on every device, fast, secure, usable, finished.</b> A contract would produce a different list. A sales call, another. <b>The list changes by domain — the process never does.</b></p>
            </div>
            <p className="tool-foot reveal">Write the bar <em>before</em> you start. No bar means wrong questions — and the same wall, again and again.</p>
          </div>
        </section>

        {/* TOOLKIT 2 — WORKING WITH AI */}
        <section className="tool-block tinted">
          <div className="wrap">
            <div className="part-head reveal">
              <div className="dim"><span>fig. 05</span><i className="tick"></i><span>distinta · cosa deleghi / cosa tieni</span></div>
              <span className="part-tag">Toolkit — The leverage</span>
              <h2>Delegate the doing. Keep the judgment.</h2>
              <p>AI fluency isn&apos;t the goal — it&apos;s what you get for free once the approach is right. The line is simple: hand AI the execution, never the deciding.</p>
            </div>
            <div className="split reveal">
              <div className="split-col delegate">
                <h4>Delegate — the doing</h4>
                <p className="sub">AI is faster than you here. Let it run.</p>
                <ul>
                  <li>Drafting and generating</li>
                  <li>Boilerplate and setup</li>
                  <li>Search, recall, summarizing</li>
                  <li>Refactors and variations</li>
                  <li>First passes on anything</li>
                </ul>
              </div>
              <div className="split-col keep">
                <h4>Keep — the judgment</h4>
                <p className="sub">This is yours. It&apos;s what you&apos;re paid for.</p>
                <ul>
                  <li>The objective</li>
                  <li>The definition of done</li>
                  <li>The questions</li>
                  <li>The call on what&apos;s good enough</li>
                  <li>Ownership of the outcome</li>
                </ul>
              </div>
            </div>
            <div className="ai-warn reveal">
              <span className="wtag">// la trappola</span>
              The danger isn&apos;t using AI — it&apos;s offloading the <b>thinking</b> with it. You can have AI and still not finish, because the gap is judgment, not labor. The better your bar and your questions, the more AI multiplies you. Get those wrong and it just helps you <b>fail faster.</b>
            </div>
            <div className="source reveal" style={{ marginTop: "22px" }}>
              <span className="src-tag">// nota a margine — il principio in una riga</span>
              <p>&quot;Knowing how to use AI is the consequence of the approach. You had AI — and still didn&apos;t manage to finish the project on your own.&quot;</p>
            </div>
          </div>
        </section>

        {/* TOOLKIT 3 — MATURITY CURVE */}
        <section className="tool-block">
          <div className="wrap">
            <div className="part-head reveal">
              <div className="dim"><span>fig. 06</span><i className="tick"></i><span>prospetto quotato · la diagonale</span></div>
              <span className="part-tag">Toolkit — Where this goes</span>
              <h2>Four stages. Walk the diagonal.</h2>
              <p>Nobody starts at the top — I didn&apos;t. On my first platform I knew nothing: not the stack, not the database, not the tooling. This is the ladder I climbed, and the one you&apos;re on. Every stage is more judgment and more ownership than the last.</p>
            </div>
            <div className="stages reveal">
              <div className="stage"><span className="s-rank">Stage 01</span><h4>Executes</h4><p>Does the task as given. Needs the frame and the answers handed over.</p></div>
              <div className="stage"><span className="s-rank">Stage 02</span><h4>Judges</h4><p>Checks own work against a bar before handing it over. Catches its own &quot;almost.&quot;</p></div>
              <div className="stage"><span className="s-rank">Stage 03</span><h4>Frames</h4><p>Defines done and asks the right questions without being handed them.</p></div>
              <div className="stage"><span className="s-rank">Stage 04</span><h4>Sets the standard</h4><p>Frames the problem and the bar for others. Builds the guardrails everyone works inside.</p></div>
            </div>
            <div className="stage-track reveal"><div className="fill" data-w="100%"></div></div>
            <div className="stage-axis reveal"><span>More dependence</span><span className="end">More judgment · more ownership →</span></div>
            <div className="source reveal" style={{ marginTop: "30px" }}>
              <span className="src-tag">// nota a margine — il senso della scala</span>
              <p>&quot;This is exactly what I would ask when I built my first platform. I told them I know nothing — and I still got there, by the approach.&quot;</p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="closing">
          <svg className="closing-arc" viewBox="0 0 400 400" fill="none">
            <g stroke="url(#tmGa)" fill="none">
              <circle cx="200" cy="200" r="70" strokeWidth="1.1" opacity=".5" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="120" strokeWidth="1.1" opacity=".4" />
              <circle cx="200" cy="200" r="170" strokeWidth="1.1" opacity=".28" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="220" strokeWidth="1.1" opacity=".18" />
              <circle cx="200" cy="200" r="270" strokeWidth="1.1" opacity=".1" strokeDasharray="4 4" />
            </g>
          </svg>
          <div className="wrap">
            <span className="eyebrow">The standard, in one line</span>
            <p className="standard-line">Hold a clear definition of done. Ask better questions. Own the outcome. <em>Make yourself hard to replace.</em></p>
            <p className="tagline">&quot;The future of work is a metamorphosis — where human creativity and AI precision merge, unlocking new potential and elevating what businesses can achieve.&quot;</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="foot">
          <div className="foot-inner">
            <svg viewBox="0 0 1000 476" xmlns="http://www.w3.org/2000/svg" aria-label="Morfeus">
              {logoPaths}
            </svg>
            <span className="foot-meta">Morfeus Hub · The Method · Operating standard for the cohort · rev 1.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
