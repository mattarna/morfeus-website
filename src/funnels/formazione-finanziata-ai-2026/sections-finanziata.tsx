"use client";

/* eslint-disable react/no-unescaped-entities */

import { useCallback, useEffect, useRef, useState } from "react";
import type { FunnelStepConfig } from "@/funnels/types";

/* ════════════════════════════════════════════════════════════════════
   FORMAZIONE FINANZIATA 2026 — "AI Zero to Operator"
   Landing single-step. Tutto lo styling è scopato sotto `.ff-root` per
   non collidere con il sito madre. Accent: blu elettrico.
   Font (Satoshi + Playfair Display) sono caricati globalmente dal
   WcThemeProvider del sistema funnel.
════════════════════════════════════════════════════════════════════ */

const CSS = `
.ff-root{
  --black:#050510; --deep:#0E0C1E; --card-dark:#161622; --purple-card:#1A1535;
  --purple:#6C4CF4; --purple-light:#8B74FF;
  --accent:#2F6BFF; --accent-bright:#5B8CFF; --accent-deep:#1E40AF; --accent-on-light:#1D4ED8;
  --orange:#E97B2E; --bg-light:#F0EDE6;
  --text-dark:#F0F0F0; --text-light:#1A1A1A; --muted-dark:#9A9A9A; --muted-light:#666;
  --border-dark:rgba(255,255,255,0.07); --border-light:rgba(0,0,0,0.08);
  --border-accent:rgba(47,107,255,0.30); --border-purple:rgba(108,76,244,0.3);
  --green-check:#4ADE80; --red-x:#F87171;
  color:var(--text-dark); font-family:'Satoshi','Inter',system-ui,sans-serif; font-size:20px; line-height:1.65;
  -webkit-font-smoothing:antialiased;
}
.ff-root *,.ff-root *::before,.ff-root *::after{box-sizing:border-box;margin:0;padding:0}
.ff-root a{color:inherit;text-decoration:none}
.ff-root img{display:block;max-width:100%}
.ff-root button{font-family:inherit}

.ff-root .display{font-weight:900;line-height:1.04;letter-spacing:-0.03em}
.ff-root .serif{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:500}
.ff-root .acc{color:var(--accent-bright)}
.ff-root .section-label{display:flex;align-items:center;gap:10px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;margin-bottom:18px}
.ff-root .section-label::before{content:'';display:inline-block;width:24px;height:2px;flex-shrink:0}
.ff-root .on-dark .section-label{color:#8E8EA8}
.ff-root .on-dark .section-label::before{background:#444}
.ff-root .on-light .section-label{color:var(--accent-on-light)}
.ff-root .on-light .section-label::before{background:var(--accent-on-light)}

.ff-root .container{max-width:1180px;margin:0 auto;padding:0 24px}
.ff-root .section-pad{padding:88px 0}

.ff-root .bg-dark{background:var(--deep);color:var(--text-dark)}
.ff-root .bg-darker{background:var(--black);color:var(--text-dark)}
.ff-root .bg-light{background:var(--bg-light);color:var(--text-light)}

/* BANNER */
.ff-root .lomb-banner{background:#110E2A;border-bottom:1px solid var(--border-accent);padding:12px 24px;text-align:center}
.ff-root .lomb-banner p{font-size:15px;color:#AFC2FF;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap}
.ff-root .lomb-banner strong{color:#fff}
.ff-root .lomb-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block;flex-shrink:0;animation:ff-pulse 2s infinite}
@keyframes ff-pulse{0%,100%{opacity:1}50%{opacity:.3}}

/* NAV */
.ff-root .nav{border-bottom:1px solid var(--border-dark);padding:16px 24px;background:var(--deep)}
.ff-root .nav .inner{max-width:1060px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px}
.ff-root .logo{font-size:19px;font-weight:800;letter-spacing:-0.03em}
.ff-root .logo em{font-style:italic;color:var(--purple-light);font-family:'Playfair Display',serif}
.ff-root .logo-img{height:25px;width:auto;display:block}
.ff-root .footer-logo{height:22px;width:auto;display:block}
.ff-root .footer-brand-row{display:flex;align-items:center;gap:10px}

/* BUTTONS */
.ff-root .btn-acc{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;border:none;border-radius:100px;padding:11px 26px;font-size:14px;font-weight:800;cursor:pointer;transition:opacity .2s,transform .15s,box-shadow .2s}
.ff-root .btn-acc:hover{opacity:.92;transform:translateY(-1px);box-shadow:0 8px 24px rgba(47,107,255,.32)}
.ff-root .btn-acc-lg{border-radius:10px;padding:17px 38px;font-size:16px}
.ff-root .pulse-dot{width:9px;height:9px;border-radius:50%;background:#fff;flex-shrink:0;animation:ff-pulsedot 1.3s infinite}
@keyframes ff-pulsedot{0%{box-shadow:0 0 0 0 rgba(255,255,255,.6)}70%{box-shadow:0 0 0 9px rgba(255,255,255,0)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}}
.ff-root .btn-outline{display:inline-flex;align-items:center;background:transparent;color:var(--text-dark);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:17px 28px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s}
.ff-root .btn-outline:hover{background:rgba(255,255,255,.05)}

/* HERO */
.ff-root .hero{padding:80px 0 72px;position:relative;overflow:hidden}
.ff-root .hero::before{content:'';position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:900px;height:900px;border-radius:50%;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(47,107,255,.20) 0%,rgba(14,12,30,0) 70%);pointer-events:none}
.ff-root .hero .container{text-align:center;position:relative}
.ff-root .hero-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:7px 18px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#A6A6BE}
.ff-root .hero-pill-accent{border-color:var(--border-accent);color:var(--accent-bright)}
.ff-root .hero-pill-urgent{border-color:rgba(233,123,46,.35);color:#F0A064}
.ff-root .hero-pills{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:34px;justify-content:center}
.ff-root .hero h1{font-weight:900;font-size:clamp(40px,6.1vw,74px);line-height:1.04;letter-spacing:-0.035em;margin-bottom:26px}
.ff-root .hero-sub{font-size:21px;color:#C4C4D4;max-width:620px;margin:0 auto;line-height:1.7}

/* VSL */
.ff-root .vsl-wrap{background:#E9E9EE;border:1px solid #C7C7D2;border-radius:14px;overflow:hidden;margin:40px auto 0;max-width:900px;box-shadow:0 18px 50px rgba(0,0,0,.45)}
.ff-root .vsl-bar{background:#E9E9EE;padding:11px 16px;border-bottom:1px solid #D2D2DC;display:flex;align-items:center;gap:7px}
.ff-root .vdot{width:10px;height:10px;border-radius:50%}
.ff-root .vsl-player{aspect-ratio:16/9;position:relative;background:#080808;cursor:pointer;overflow:hidden}
.ff-root .vsl-poster{width:100%;height:100%;object-fit:cover;opacity:.62;transition:opacity .25s}
.ff-root .vsl-player:hover .vsl-poster{opacity:.5}
.ff-root .vsl-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}
.ff-root .vsl-tag{position:absolute;top:14px;right:14px;background:var(--accent);color:#fff;border-radius:4px;padding:3px 10px;font-size:11px;font-weight:800;letter-spacing:.06em}
.ff-root .vsl-play{width:72px;height:72px;border-radius:50%;background:var(--accent);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s;box-shadow:0 8px 30px rgba(47,107,255,.45)}
.ff-root .vsl-player:hover .vsl-play{transform:scale(1.08)}
.ff-root .vsl-play svg{width:28px;height:28px;fill:#fff;margin-left:3px}
.ff-root .vsl-cap{font-size:15px;color:#C4C4D4;font-weight:600;text-shadow:0 2px 12px rgba(0,0,0,.6)}
.ff-root .vsl-frame{width:100%;height:100%;border:0;display:block}

.ff-root .hero-ctas{display:flex;gap:14px;flex-wrap:wrap;margin:38px 0 52px;justify-content:center}
.ff-root .hero-stats{display:flex;gap:52px;flex-wrap:wrap;padding-top:40px;border-top:1px solid var(--border-dark);justify-content:center}
.ff-root .stat-num{font-size:34px;font-weight:900;line-height:1;color:var(--accent-bright)}
.ff-root .stat-label{font-size:15px;color:var(--muted-dark);margin-top:3px}

/* TRUST */
.ff-root .trust{padding:28px 0;border-top:1px solid var(--border-dark);border-bottom:1px solid var(--border-dark)}
.ff-root .trust-inner{display:flex;align-items:center;flex-wrap:wrap;justify-content:center}
.ff-root .trust-label{font-size:10px;font-weight:700;letter-spacing:.14em;color:#6A6A82;text-transform:uppercase;margin-right:32px;flex-shrink:0}
.ff-root .trust-names{display:flex;flex-wrap:wrap;align-items:center;justify-content:center}
.ff-root .trust-name{font-size:15px;font-weight:600;color:#5A5A70;padding:5px 18px;white-space:nowrap}
.ff-root .trust-dot{color:#33334A;font-size:20px}

/* LOMB ALERT */
.ff-root .lomb-section-bg{background:#0C0A1C}
.ff-root .lomb-alert{background:rgba(31,40,90,.45);border:1px solid var(--border-accent);border-left:4px solid var(--accent);border-radius:12px;padding:22px 26px;display:flex;align-items:flex-start;gap:16px}
.ff-root .lomb-icon{width:40px;height:40px;flex-shrink:0;background:rgba(47,107,255,.18);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:18px}
.ff-root .lomb-alert h3{font-size:16px;font-weight:800;margin-bottom:5px;color:#B8C8FF}
.ff-root .lomb-alert p{font-size:17px;color:#AAA;line-height:1.65}
.ff-root .lomb-alert strong{color:var(--text-dark)}

/* SECTION HEADINGS (unified) */
.ff-root .sec-h2{font-weight:900;font-size:clamp(32px,4.2vw,56px);letter-spacing:-0.03em;line-height:1.06;margin-bottom:12px}
.ff-root .sec-sub{font-size:20px;font-weight:400;line-height:1.7;color:#9A9AB0;margin-bottom:46px;max-width:560px}
.ff-root .on-light .sec-sub{color:#555}

/* PROCESS (light) */
.ff-root .process.on-light{background:var(--bg-light);color:var(--text-light)}
.ff-root .process .sec-h2 .acc{color:var(--accent-on-light)}
.ff-root .steps-row{display:flex;position:relative;flex-wrap:wrap;margin-bottom:44px}
.ff-root .steps-row.dark-line::before{content:'';position:absolute;top:20px;left:22px;right:22px;height:2px;background:linear-gradient(90deg,var(--purple) 0%,var(--accent) 100%);z-index:0}
.ff-root .process .steps-row::before{content:'';position:absolute;top:20px;left:22px;right:22px;height:2px;background:linear-gradient(90deg,var(--purple) 0%,var(--accent-on-light) 100%);z-index:0}
.ff-root .step{flex:1;min-width:150px;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;z-index:1;padding:0 6px}
.ff-root .step-num{width:40px;height:40px;border-radius:50%;background:var(--purple);color:#fff;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;border:3px solid var(--deep);flex-shrink:0}
.ff-root .process .step-num{border-color:var(--bg-light)}
.ff-root .step.last .step-num{background:var(--accent);color:#fff}
.ff-root .process .step.last .step-num{background:var(--accent-on-light)}
.ff-root .step h4{font-size:13px;font-weight:800;margin-bottom:4px}
.ff-root .step p{font-size:15px;color:#8E8EA0;line-height:1.5}
.ff-root .process .step h4{color:var(--text-light)}
.ff-root .process .step p{color:#666}
.ff-root .proc-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-bottom:24px}
.ff-root .proc-card{background:var(--card-dark);border:1px solid var(--border-dark);border-radius:14px;padding:24px}
.ff-root .process .proc-card{background:#fff;border:1px solid rgba(0,0,0,.09)}
.ff-root .proc-card.hl{border-color:var(--border-accent);background:rgba(31,40,90,.4)}
.ff-root .process .proc-card.hl{background:rgba(47,107,255,.07);border-color:rgba(47,107,255,.25)}
.ff-root .proc-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:12px}
.ff-root .proc-icon.p{background:rgba(108,76,244,.15)}
.ff-root .proc-icon.g{background:rgba(47,107,255,.12)}
.ff-root .process .proc-icon.p{background:rgba(108,76,244,.09)}
.ff-root .process .proc-icon.g{background:rgba(47,107,255,.10)}
.ff-root .proc-card h3{font-size:15px;font-weight:800;margin-bottom:5px}
.ff-root .proc-card p{font-size:16px;color:#9A9AB0;line-height:1.65}
.ff-root .process .proc-card h3{color:var(--text-light)}
.ff-root .process .proc-card p{color:#555}
.ff-root .proc-perc{font-size:42px;font-weight:900;color:var(--accent-bright);line-height:1;margin-bottom:4px}
.ff-root .process .proc-perc{color:var(--accent-on-light)}
.ff-root .proc-note{background:rgba(31,40,90,.35);border:1px solid var(--border-accent);border-radius:10px;padding:14px 18px;font-size:14px;color:#A6B8FF;line-height:1.65}
.ff-root .proc-note strong{color:#fff}
.ff-root .process .proc-note{background:rgba(47,107,255,.06);border-color:rgba(47,107,255,.25);color:var(--accent-deep)}
.ff-root .process .proc-note strong{color:var(--accent-deep)}
.ff-root .section-cta{text-align:center;padding-top:48px}

/* PRIMA/DOPO */
.ff-root .pd-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.ff-root .pd-card{background:var(--purple-card);border:1px solid var(--border-purple);border-radius:18px;padding:30px}
.ff-root .pd-title{font-size:20px;font-weight:900;margin-bottom:2px;letter-spacing:.02em}
.ff-root .pd-title.red{color:#F87171}
.ff-root .pd-title.green{color:var(--accent-bright)}
.ff-root .pd-sub{font-size:12px;color:#5A5A70;margin-bottom:22px}
.ff-root .pd-item{display:flex;align-items:flex-start;gap:11px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.ff-root .pd-item:last-child{border-bottom:none}
.ff-root .pd-icon{flex-shrink:0;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;margin-top:3px;font-weight:900}
.ff-root .pd-icon.x{background:rgba(248,113,113,.12);color:#F87171}
.ff-root .pd-icon.ok{background:rgba(47,107,255,.12);color:var(--accent-bright)}
.ff-root .pd-item p{font-size:17px;color:#CCC;line-height:1.6}

/* FOR WHO (light) */
.ff-root .who.on-light{background:var(--bg-light);color:var(--text-light)}
.ff-root .who .sec-h2 .serif{color:var(--accent-on-light)}
.ff-root .who-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.ff-root .who-card{background:#fff;border:1px solid var(--border-light);border-radius:14px;padding:24px}
.ff-root .who-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px}
.ff-root .who-icon.p{background:rgba(108,76,244,.08)}
.ff-root .who-icon.g{background:rgba(47,107,255,.10)}
.ff-root .who-card h3{font-size:15px;font-weight:800;margin-bottom:6px;color:var(--text-light)}
.ff-root .who-card p{font-size:17px;color:#888;line-height:1.65}
.ff-root .who-lomb{background:rgba(47,107,255,.06);border:1px solid rgba(47,107,255,.2);border-radius:12px;padding:18px 22px;margin-top:22px;font-size:18px;color:#666;line-height:1.7}
.ff-root .who-lomb strong{color:var(--text-light)}

/* METODO MVA */
.ff-root .mva-cards{grid-template-columns:repeat(3,1fr)}
.ff-root .mva-letter-card .proc-icon{font-weight:900;font-size:19px}
.ff-root .mva-bottom{text-align:center;padding:36px 0 8px;font-size:20px;font-weight:600;color:#bbb;line-height:2.3}
.ff-root .mva-bottom strong{color:var(--accent-bright);font-weight:900}
.ff-root .mva-bottom .win{color:#fff}
.ff-root .proc-card .mva-faded{color:#6A6A7E}
.ff-root .proc-card em{color:#C4C4D4;font-style:italic;font-family:'Playfair Display',serif}

/* CURRICULUM */
.ff-root .curr-badges{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:40px}
.ff-root .curr-badge{display:flex;align-items:center;gap:10px;border-radius:10px;padding:12px 18px;flex:1;min-width:180px}
.ff-root .curr-badge.g{background:rgba(47,107,255,.07);border:1px solid rgba(47,107,255,.2)}
.ff-root .curr-badge.p{background:rgba(108,76,244,.08);border:1px solid rgba(108,76,244,.2)}
.ff-root .curr-badge-icon{font-size:22px;flex-shrink:0}
.ff-root .curr-badge strong{font-size:14px;font-weight:800;color:var(--text-dark);display:block}
.ff-root .curr-badge span{font-size:12px;color:#6A6A7E}
.ff-root .modules{display:flex;flex-direction:column;gap:8px}
.ff-root .module{background:var(--card-dark);border:1px solid var(--border-dark);border-radius:12px;overflow:hidden}
.ff-root .module-header{display:flex;align-items:center;gap:12px;padding:17px 20px;cursor:pointer;transition:background .15s;width:100%;background:none;border:none;text-align:left;color:inherit}
.ff-root .module-header:hover{background:rgba(255,255,255,.02)}
.ff-root .module-num{font-size:11px;font-weight:800;color:var(--accent-bright);min-width:24px;letter-spacing:.04em}
.ff-root .module-title{font-size:14px;font-weight:800;flex:1}
.ff-root .module-hours{font-size:11px;color:#5A5A70;background:rgba(255,255,255,.04);border-radius:4px;padding:2px 7px;margin-right:6px}
.ff-root .chevron{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:rgba(47,107,255,.12);color:var(--accent-bright);font-size:13px;transition:transform .2s,background .2s;flex-shrink:0}
.ff-root .module-header:hover .chevron{background:rgba(47,107,255,.22)}
.ff-root .chevron.open{transform:rotate(180deg)}
.ff-root .module-body{padding:0 20px 16px 56px}
.ff-root .module-body ul{list-style:none;display:flex;flex-direction:column;gap:3px}
.ff-root .module-body ul li{font-size:16px;color:#AAA;display:flex;align-items:flex-start;gap:7px;padding:3px 0}
.ff-root .arr{color:var(--purple-light);flex-shrink:0;margin-top:3px;font-size:10px}
.ff-root .ex-label{display:inline-block;font-size:10px;font-weight:800;letter-spacing:.06em;color:var(--accent-bright);background:rgba(47,107,255,.07);border:1px solid rgba(47,107,255,.18);border-radius:4px;padding:1px 7px;margin-top:10px;margin-bottom:3px}

/* RIMBORSO */
.ff-root .rimborso-wrap{background:var(--card-dark);border:1px solid var(--border-accent);border-radius:20px;overflow:hidden}
.ff-root .rimborso-hd{background:linear-gradient(135deg,#15214A 0%,#0F1633 100%);padding:38px 44px;border-bottom:1px solid var(--border-accent)}
.ff-root .rimborso-hd .sec-h2{margin-bottom:10px}
.ff-root .rimborso-hd p{font-size:19px;color:#AFC2FF;max-width:520px;line-height:1.7}
.ff-root .rimborso-cards{display:grid;grid-template-columns:1fr 1fr}
.ff-root .rimborso-card{padding:30px 44px}
.ff-root .rimborso-card:first-child{border-right:1px solid var(--border-dark)}
.ff-root .rimborso-perc{font-size:64px;font-weight:900;line-height:1;margin-bottom:6px}
.ff-root .rimborso-perc.g{color:var(--accent-bright)}
.ff-root .rimborso-perc.p{color:var(--purple-light)}
.ff-root .rimborso-who{font-size:16px;color:#8E8EA0;margin-bottom:12px}
.ff-root .rimborso-note{font-size:16px;color:#8E8EA0;background:rgba(255,255,255,.03);border-radius:7px;padding:9px 12px;line-height:1.6}
.ff-root .rimborso-ft{padding:16px 44px;border-top:1px solid var(--border-dark);background:rgba(0,0,0,.2)}
.ff-root .rimborso-ft p{font-size:16px;color:#8E8EA0;line-height:1.65}
.ff-root .rimborso-ft strong{color:var(--accent-bright)}

/* TEAM (light) */
.ff-root .team.on-light{background:var(--bg-light);color:var(--text-light)}
.ff-root .team .sec-h2 .serif{color:var(--accent-on-light)}
.ff-root .practitioners-grid{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:start;margin-bottom:36px}
.ff-root .team-photos{position:relative;height:500px}
.ff-root .team-photo-1{position:absolute;top:0;left:0;width:88%;height:320px;object-fit:cover;border-radius:16px;box-shadow:0 14px 44px rgba(0,0,0,.22)}
.ff-root .team-photo-2{position:absolute;bottom:0;right:0;width:66%;height:248px;object-fit:cover;border-radius:16px;border:5px solid var(--bg-light);box-shadow:0 8px 30px rgba(0,0,0,.18)}
.ff-root .team-intro{font-size:20px;color:#555;line-height:1.8;max-width:640px}
.ff-root .team-role{font-size:13px;color:var(--accent-on-light);margin-bottom:10px;font-weight:700}
.ff-root .team-badge{display:inline-block;font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(47,107,255,.3);color:var(--accent-on-light);border-radius:6px;padding:3px 9px;margin-top:12px}
.ff-root .team-why{background:#fff;border:1px solid var(--border-light);border-radius:14px;padding:26px 30px}
.ff-root .team-why h4{font-size:16px;font-weight:800;margin-bottom:8px;color:var(--text-light)}
.ff-root .team-why p{font-size:17px;color:#888;line-height:1.75}

/* REVIEWS (light) */
.ff-root .reviews.on-light{background:var(--bg-light);color:var(--text-light)}
.ff-root .reviews .sec-h2 .serif{color:var(--accent-on-light)}
.ff-root .reviews-track{cursor:grab;display:flex;gap:18px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:12px;scrollbar-width:none}
.ff-root .reviews-track::-webkit-scrollbar{display:none}
.ff-root .reviews-track.dragging{cursor:grabbing}
.ff-root .review-card{background:#fff;border:1px solid var(--border-light);border-radius:16px;padding:26px;min-width:290px;max-width:320px;flex-shrink:0}
.ff-root .review-stars{font-size:15px;color:#2F6BFF;letter-spacing:1px;margin-bottom:14px}
.ff-root .review-quote{font-family:'Playfair Display',serif;font-style:italic;font-size:19px;color:#333;line-height:1.7;margin-bottom:18px}
.ff-root .review-sep{height:1px;background:var(--border-light);margin-bottom:14px}
.ff-root .review-author{display:flex;align-items:center;gap:10px}
.ff-root .review-initials{width:36px;height:36px;border-radius:50%;background:rgba(47,107,255,.1);border:1px solid rgba(47,107,255,.2);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:var(--accent-on-light);flex-shrink:0}
.ff-root .review-name{font-size:13px;font-weight:800;color:var(--text-light)}
.ff-root .review-tag{font-size:12px;color:#999;margin-top:1px}
.ff-root .reviews-hint{font-size:12px;color:#9A9AB0;margin-top:10px;text-align:center}
.ff-root .reviews.on-light .reviews-hint{color:#aaa}

/* FORM */
.ff-root .candidatura{position:relative;overflow:hidden;background:var(--deep)}
.ff-root .candidatura::before{content:'';position:absolute;bottom:-200px;right:-200px;width:600px;height:600px;border-radius:50%;background:radial-gradient(ellipse 60% 50% at 100% 100%,rgba(47,107,255,.12) 0%,transparent 70%);pointer-events:none}
.ff-root .form-wrap{max-width:680px;margin:0 auto;background:var(--card-dark);border:1px solid var(--border-dark);border-radius:20px;overflow:hidden;position:relative}
.ff-root .form-hd{background:linear-gradient(135deg,#15214A 0%,#0F1633 100%);padding:32px 36px;border-bottom:1px solid var(--border-accent)}
.ff-root .form-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(47,107,255,.18);border:1px solid var(--border-accent);border-radius:100px;padding:5px 14px;font-size:12px;font-weight:700;color:#A6B8FF;margin-bottom:12px}
.ff-root .form-hd h2{font-size:clamp(22px,3vw,32px);font-weight:900;letter-spacing:-0.025em;margin-bottom:6px}
.ff-root .form-hd p{font-size:17px;color:#AFC2FF;line-height:1.65}
.ff-root .form-body{padding:30px 36px}
.ff-root .fg{margin-bottom:20px}
.ff-root .fg > label{display:block;font-size:12px;font-weight:700;color:#8E8EA0;margin-bottom:8px;letter-spacing:.03em;text-transform:uppercase}
.ff-root .fg input{width:100%;background:#0A0A0A;border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:15px 16px;color:var(--text-dark);font-size:15px;font-family:inherit;transition:border-color .2s,box-shadow .2s}
.ff-root .fg input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(47,107,255,.12)}
.ff-root .fg input::placeholder{color:#3A3A4A}
.ff-root .fg2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ff-root .radio-group{display:flex;gap:9px;flex-wrap:wrap}
.ff-root .radio-opt{flex:1;min-width:155px;min-height:58px;background:#0A0A0A;border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:14px 16px;margin-bottom:0;display:flex;align-items:center;gap:11px;cursor:pointer;transition:border-color .2s,background .2s;text-transform:none;letter-spacing:normal;font-weight:600;color:var(--text-dark)}
.ff-root .radio-dot{align-self:center}
.ff-root .radio-opt:hover{border-color:var(--border-accent)}
.ff-root .radio-dot{width:18px;height:18px;flex-shrink:0;border-radius:50%;border:2px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;transition:border-color .2s,background .2s}
.ff-root .radio-dot::after{content:'';width:7px;height:7px;border-radius:50%;background:#fff;opacity:0;transform:scale(0);transition:opacity .15s,transform .15s}
.ff-root .radio-opt.selected{border-color:var(--accent);background:rgba(47,107,255,.08)}
.ff-root .radio-opt.selected .radio-dot{border-color:var(--accent);background:var(--accent)}
.ff-root .radio-opt.selected .radio-dot::after{opacity:1;transform:scale(1)}
.ff-root .radio-opt span{font-size:13px;color:var(--text-dark)}
.ff-root .form-submit{width:100%;padding:16px;border:none;border-radius:10px;background:var(--accent);color:#fff;font-family:inherit;font-size:16px;font-weight:800;cursor:pointer;transition:opacity .2s,transform .15s;margin-top:8px}
.ff-root .form-submit:hover:not(:disabled){opacity:.92;transform:translateY(-1px)}
.ff-root .form-submit:disabled{background:#222;color:#555;cursor:not-allowed;transform:none}
.ff-root .form-legal{font-size:11px;color:#444;margin-top:12px;text-align:center;line-height:1.65}
.ff-root .form-error{background:rgba(220,50,50,.08);border:1px solid rgba(220,50,50,.2);border-radius:7px;padding:10px 13px;margin-top:9px;font-size:13px;color:#FF8080}
.ff-root .lomb-no-msg{margin-top:7px;background:rgba(233,123,46,.08);border:1px solid rgba(233,123,46,.25);border-radius:7px;padding:9px 13px;font-size:13px;color:#F0A064}
.ff-root .form-success{padding:36px;text-align:center}
.ff-root .success-icon{width:58px;height:58px;border-radius:50%;background:rgba(47,107,255,.12);border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:26px;color:var(--accent-bright)}
.ff-root .form-success h3{font-size:22px;font-weight:800;margin-bottom:6px}
.ff-root .success-steps{list-style:none;text-align:left;max-width:440px;margin:18px auto 0;display:flex;flex-direction:column;gap:16px}
.ff-root .success-steps li{display:flex;gap:14px;align-items:flex-start}
.ff-root .success-badge{flex-shrink:0;width:26px;height:26px;border-radius:50%;font-weight:900;font-size:13px;display:flex;align-items:center;justify-content:center}
.ff-root .success-badge.a{background:var(--accent);color:#fff}
.ff-root .success-badge.b{background:var(--purple);color:#fff}
.ff-root .success-steps p{font-size:15px;color:#DDD;line-height:1.6}
.ff-root .success-steps strong{color:#fff}
.ff-root .success-cal{color:var(--accent-bright);text-decoration:underline;font-weight:700}
.ff-root .success-spam{margin-top:24px;font-size:13px;color:#6A6A7E;line-height:1.7;max-width:440px;margin-left:auto;margin-right:auto}
.ff-root .success-spam strong{color:#9A9AB0}

/* FAQ */
.ff-root .faq .sec-h2 .serif{color:var(--accent-bright)}
.ff-root .faq-list{display:flex;flex-direction:column;gap:8px;max-width:720px;margin:0 auto}
.ff-root .faq-item{background:var(--purple-card);border:1px solid rgba(255,255,255,.06);border-radius:12px;overflow:hidden}
.ff-root .faq-q{padding:18px 22px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:14px;transition:background .15s;width:100%;background:none;border:none;text-align:left;color:inherit}
.ff-root .faq-num{font-size:12px;font-weight:800;color:var(--accent-bright);min-width:26px;letter-spacing:.04em}
.ff-root .faq-q:hover{background:rgba(255,255,255,.02)}
.ff-root .faq-q .qt{font-size:17px;font-weight:700;color:var(--text-dark);line-height:1.4;flex:1}
.ff-root .faq-icon{color:var(--accent-bright);font-size:20px;flex-shrink:0;font-weight:300;transition:transform .2s}
.ff-root .faq-icon.open{transform:rotate(45deg)}
.ff-root .faq-a{padding:0 22px 18px 48px}
.ff-root .faq-a p{font-size:17px;color:#AAA;line-height:1.75}

/* FOOTER */
.ff-root .footer{background:linear-gradient(180deg,#0E0C1E 0%,#0B0918 100%);border-top:1px solid rgba(255,255,255,.05);padding:36px 24px 28px}
.ff-root .footer .inner{max-width:1060px;margin:0 auto}
.ff-root .footer-top-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,.05)}
.ff-root .footer-site{font-size:14px;color:#555;margin-left:8px}
.ff-root .footer-nav{display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.ff-root .footer-nav a{font-size:14px;color:#555;transition:color .2s}
.ff-root .footer-nav a:hover{color:#999}
.ff-root .footer-disc{font-size:13px;color:#444;line-height:1.85;max-width:860px;margin-bottom:20px}
.ff-root .footer-disc strong{color:#555;font-weight:700}
.ff-root .footer-bottom{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between}
.ff-root .footer-bottom p{font-size:13px;color:#444}

/* MOBILE STICKY */
.ff-root .mobile-sticky{display:none}

@media(max-width:768px){
  .ff-root{padding-bottom:76px}
  .ff-root .section-pad{padding:60px 0}
  .ff-root .container{padding:0 18px}
  .ff-root .hero{padding:56px 0 48px}
  .ff-root .hero h1{font-size:clamp(38px,11vw,64px);letter-spacing:-0.025em}
  .ff-root .hero-sub{font-size:16px}
  .ff-root .hero-pill{font-size:11px;padding:5px 13px}
  .ff-root .hero-ctas{flex-direction:column;align-items:center;gap:10px;margin-bottom:40px}
  .ff-root .btn-acc-lg{width:100%;justify-content:center;padding:15px 24px}
  .ff-root .btn-outline{width:100%;justify-content:center}
  .ff-root .hero-stats{gap:24px}
  .ff-root .stat-num{font-size:26px}
  .ff-root .trust-inner{flex-direction:column;gap:12px;text-align:center}
  .ff-root .trust-label{margin-right:0}
  .ff-root .trust-name{font-size:13px;padding:4px 12px}
  .ff-root .lomb-alert{flex-direction:column;gap:12px;padding:18px 20px}
  .ff-root .sec-h2{font-size:clamp(28px,8.5vw,44px);line-height:1.08}
  .ff-root .sec-sub{font-size:17px}
  .ff-root .proc-cards{grid-template-columns:1fr}
  .ff-root .pd-grid{grid-template-columns:1fr;gap:14px}
  .ff-root .pd-card{padding:24px}
  .ff-root .who-grid{grid-template-columns:1fr 1fr}
  .ff-root .who-card{padding:20px}
  .ff-root .module-header{padding:15px 16px}
  .ff-root .module-body{padding:0 16px 14px 42px}
  .ff-root .rimborso-cards{grid-template-columns:1fr}
  .ff-root .rimborso-card:first-child{border-right:none;border-bottom:1px solid var(--border-dark)}
  .ff-root .rimborso-hd,.ff-root .rimborso-card,.ff-root .rimborso-ft{padding:22px 20px}
  .ff-root .rimborso-perc{font-size:52px}
  .ff-root .practitioners-grid{grid-template-columns:1fr;gap:0}
  .ff-root .team-photos{height:300px;margin-bottom:40px}
  .ff-root .team-photo-1{height:220px;width:85%}
  .ff-root .team-photo-2{height:180px;width:62%}
  .ff-root .team-intro{font-size:16px}
  .ff-root .review-card{min-width:270px;padding:20px}
  .ff-root .form-hd,.ff-root .form-body,.ff-root .form-success{padding-left:22px;padding-right:22px}
  .ff-root .fg2{grid-template-columns:1fr}
  .ff-root .radio-group{flex-direction:column}
  .ff-root .radio-opt{min-width:unset}
  /* PROCESS vertical timeline on mobile */
  .ff-root .steps-row{display:flex;flex-direction:column;gap:0;margin-bottom:28px;position:relative;padding-left:60px}
  .ff-root .steps-row::before{left:18px;top:18px;bottom:18px;right:auto;width:2px;height:auto;background:linear-gradient(180deg,var(--purple) 0%,var(--accent) 100%)}
  .ff-root .process .steps-row::before{background:linear-gradient(180deg,var(--purple) 0%,var(--accent-on-light) 100%)}
  .ff-root .step{flex-direction:column;text-align:left;align-items:flex-start;padding:0 0 22px 0;position:relative}
  .ff-root .step.last{padding-bottom:0}
  .ff-root .step-num{position:absolute;left:-52px;top:0;margin-bottom:0;width:36px;height:36px;border-width:2px}
  .ff-root .step h4{font-size:15px;margin-bottom:3px}
  .ff-root .step p{font-size:14px}
  .ff-root .mobile-sticky{display:block;position:fixed;bottom:0;left:0;right:0;z-index:600;background:rgba(13,13,15,0.97);border-top:1px solid rgba(255,255,255,.09);backdrop-filter:blur(14px);padding:12px 20px;padding-bottom:max(14px,env(safe-area-inset-bottom))}
  .ff-root .mobile-sticky .btn-acc{width:100%;justify-content:center;padding:14px;font-size:16px;border-radius:10px}
}
@media(max-width:480px){
  .ff-root .who-grid{grid-template-columns:1fr}
  .ff-root .hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:20px 32px}
}

/* ── v2: corpo testo più leggibile (override in coda) ─────────── */
.ff-root .hero-pill{font-size:13px}
.ff-root .hero-sub{font-size:22px}
.ff-root .stat-label{font-size:16px}
.ff-root .lomb-alert p{font-size:19px;line-height:1.7}
.ff-root .sec-sub{font-size:21px;max-width:600px}
.ff-root .step h4{font-size:16px}
.ff-root .step p{font-size:17px}
.ff-root .proc-card h3{font-size:18px}
.ff-root .proc-card p{font-size:18px;line-height:1.7}
.ff-root .proc-note{font-size:17px;line-height:1.7}
.ff-root .pd-item p{font-size:19px;line-height:1.65}
.ff-root .who-card h3{font-size:18px}
.ff-root .who-card p{font-size:19px;line-height:1.65}
.ff-root .who-lomb{font-size:20px}
.ff-root .curr-badge strong{font-size:16px}
.ff-root .curr-badge span{font-size:13px}
.ff-root .module-title{font-size:16px}
.ff-root .module-body ul li{font-size:18px}
.ff-root .rimborso-hd p{font-size:20px}
.ff-root .rimborso-who{font-size:18px}
.ff-root .rimborso-note{font-size:18px;line-height:1.65}
.ff-root .rimborso-ft p{font-size:18px}
.ff-root .team-intro{font-size:21px}
.ff-root .team-role{font-size:14px}
.ff-root .team-why p{font-size:19px}
.ff-root .review-quote{font-size:20px}
.ff-root .review-name{font-size:14px}
.ff-root .review-tag{font-size:13px}
.ff-root .form-hd p{font-size:18px}
.ff-root .fg > label{font-size:14px}
.ff-root .fg input{font-size:17px}
.ff-root .radio-opt span{font-size:16px;line-height:1.35}
.ff-root .success-steps p{font-size:17px}
.ff-root .success-spam{font-size:14px}
.ff-root .faq-q .qt{font-size:18px}
.ff-root .faq-a p{font-size:18px;line-height:1.75}
.ff-root .mva-bottom{font-size:21px}
/* ════════ RESPONSIVE — passata finale autorevole (vince sui conflitti) ════════ */

/* Tablet (≤1024px) */
@media(max-width:1024px){
  .ff-root .sec-h2{font-size:clamp(30px,4.6vw,48px)}
  .ff-root .mva-cards{gap:14px}
  .ff-root .practitioners-grid{gap:36px}
  .ff-root .team-photos{height:430px}
  .ff-root .hero h1{font-size:clamp(40px,6.6vw,68px)}
}

/* Mobile + tablet-portrait (≤768px) */
@media(max-width:768px){
  .ff-root{padding-bottom:82px}
  .ff-root .section-pad{padding:56px 0}
  .ff-root .container{padding:0 18px}

  /* nav: su mobile la togliamo del tutto (logo occupava troppo spazio) — resta solo il banner */
  .ff-root .nav{display:none}
  .ff-root .lomb-banner{padding:10px 16px}
  .ff-root .lomb-banner p{font-size:13px;line-height:1.5}

  /* hero */
  .ff-root .hero{padding:40px 0 44px}
  .ff-root .hero h1{font-size:clamp(40px,10vw,58px);letter-spacing:-0.025em;line-height:1.07}
  .ff-root .hero h1 .serif{white-space:nowrap}
  .ff-root .hero-sub{font-size:17px;max-width:100%}

  /* CTA: su mobile tengo solo i bottoni dell'hero; gli altri li copre lo sticky */
  .ff-root .section-cta{display:none}

  /* VSL: su mobile mostro solo "AI Zero to Operator" */
  .ff-root .vsl-title-extra{display:none}
  .ff-root .hero-pills{gap:8px}
  .ff-root .hero-pill{font-size:12px;padding:5px 12px}
  .ff-root .hero-ctas{flex-direction:column;align-items:stretch;gap:10px;margin:30px 0 40px}
  .ff-root .btn-acc-lg{width:100%;justify-content:center;padding:15px 22px}
  .ff-root .btn-outline{width:100%;justify-content:center}
  .ff-root .vsl-wrap{margin-top:30px}
  .ff-root .hero-stats{gap:22px 28px;padding-top:32px}
  .ff-root .stat-num{font-size:26px}
  .ff-root .stat-label{font-size:14px}

  /* trust */
  .ff-root .trust-inner{flex-direction:column;gap:12px;text-align:center}
  .ff-root .trust-label{margin-right:0}
  .ff-root .trust-name{font-size:13px;padding:4px 10px}

  /* section headings */
  .ff-root .sec-h2{font-size:clamp(28px,7.8vw,40px);line-height:1.1}
  .ff-root .sec-sub{font-size:18px;max-width:100%}

  /* lomb alert */
  .ff-root .lomb-alert{flex-direction:column;gap:12px;padding:20px}
  .ff-root .lomb-alert p{font-size:17px}

  /* steps timeline verticale (process + MVA) */
  .ff-root .steps-row,.ff-root .steps-row.dark-line{display:flex;flex-direction:column;gap:0;margin-bottom:28px;position:relative;padding-left:58px}
  .ff-root .steps-row::before,.ff-root .steps-row.dark-line::before{left:17px;top:17px;bottom:17px;right:auto;width:2px;height:auto;background:linear-gradient(180deg,var(--purple) 0%,var(--accent) 100%)}
  .ff-root .process .steps-row::before{background:linear-gradient(180deg,var(--purple) 0%,var(--accent-on-light) 100%)}
  .ff-root .step{flex-direction:column;text-align:left;align-items:flex-start;padding:0 0 22px 0;position:relative}
  .ff-root .step.last{padding-bottom:0}
  .ff-root .step-num{position:absolute;left:-51px;top:0;margin-bottom:0;width:34px;height:34px;border-width:2px}
  .ff-root .step h4{font-size:16px;margin-bottom:3px}
  .ff-root .step p{font-size:15px}

  /* cards → 1 colonna */
  .ff-root .proc-cards,.ff-root .mva-cards{grid-template-columns:1fr;gap:14px}
  .ff-root .proc-card p{font-size:17px}
  .ff-root .pd-grid{grid-template-columns:1fr;gap:14px}
  .ff-root .pd-card{padding:24px}
  .ff-root .pd-item p{font-size:17px}
  .ff-root .who-grid{grid-template-columns:1fr 1fr;gap:12px}
  .ff-root .who-card{padding:20px}
  .ff-root .who-card p{font-size:16px}
  .ff-root .who-lomb{font-size:17px;padding:16px 18px}

  /* curriculum */
  .ff-root .module-header{padding:15px 14px;gap:10px}
  .ff-root .module-title{font-size:15px}
  .ff-root .module-body{padding:0 16px 14px 40px}
  .ff-root .module-body ul li{font-size:16px}

  /* rimborso */
  .ff-root .rimborso-cards{grid-template-columns:1fr}
  .ff-root .rimborso-card:first-child{border-right:none;border-bottom:1px solid var(--border-dark)}
  .ff-root .rimborso-hd,.ff-root .rimborso-card,.ff-root .rimborso-ft{padding:22px 20px}
  .ff-root .rimborso-perc{font-size:52px}
  .ff-root .rimborso-hd p{font-size:18px}
  .ff-root .rimborso-note{font-size:17px}

  /* team */
  .ff-root .practitioners-grid{grid-template-columns:1fr;gap:0}
  .ff-root .team-photos{height:280px;margin-bottom:36px}
  .ff-root .team-photo-1{height:200px;width:84%}
  .ff-root .team-photo-2{height:160px;width:60%}
  .ff-root .team-intro{font-size:17px}
  .ff-root .team-why{padding:22px 20px}
  .ff-root .team-why p{font-size:17px}

  /* reviews */
  .ff-root .review-card{min-width:264px;max-width:284px;padding:20px}
  .ff-root .review-quote{font-size:18px}

  /* faq */
  .ff-root .faq-q{padding:16px 18px}
  .ff-root .faq-q .qt{font-size:16px}
  .ff-root .faq-a{padding:0 18px 16px 46px}
  .ff-root .faq-a p{font-size:16px}

  /* form */
  .ff-root .form-hd,.ff-root .form-body,.ff-root .form-success{padding-left:20px;padding-right:20px}
  .ff-root .form-hd h2{font-size:clamp(22px,6vw,28px)}
  .ff-root .fg2{grid-template-columns:1fr;gap:0}
  .ff-root .radio-group{flex-direction:column}
  .ff-root .radio-opt{min-width:unset;min-height:54px}

  /* mva bottom */
  .ff-root .mva-bottom{font-size:18px;line-height:2}

  /* sticky cta — nascosto above-the-fold, slide-up quando compare */
  .ff-root .mobile-sticky{display:block;position:fixed;bottom:0;left:0;right:0;z-index:600;background:rgba(13,12,30,0.97);border-top:1px solid rgba(255,255,255,.09);backdrop-filter:blur(14px);padding:12px 16px;padding-bottom:max(14px,env(safe-area-inset-bottom));transform:translateY(130%);transition:transform .32s cubic-bezier(.22,.61,.36,1);pointer-events:none}
  .ff-root .mobile-sticky.show{transform:translateY(0);pointer-events:auto}
  .ff-root .mobile-sticky .btn-acc{width:100%;justify-content:center;gap:10px;padding:15px;font-size:16px;border-radius:10px}
}

/* Small phones (≤480px) */
@media(max-width:480px){
  .ff-root .hero h1{font-size:clamp(34px,9.6vw,48px)}
  .ff-root .hero-pills{gap:6px}
  .ff-root .hero-pill{font-size:11px;padding:5px 10px}
  .ff-root .who-grid{grid-template-columns:1fr}
  .ff-root .hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:18px 24px}
  .ff-root .stat-num{font-size:24px}
  .ff-root .trust-name{font-size:12px;padding:3px 8px}
  .ff-root .section-cta{padding-top:34px}
  .ff-root .btn-acc-lg{font-size:15px;padding:14px 18px}
  .ff-root .rimborso-perc{font-size:46px}
  .ff-root .form-hd,.ff-root .form-body,.ff-root .form-success{padding-left:16px;padding-right:16px}
}
`;

/* ── DATA ─────────────────────────────────────────────────────────── */

const STEPS = [
  { n: "1", t: "Candidatura", p: "Compili il form in 2 minuti" },
  { n: "2", t: "Contatto telefonico", p: "Ti chiamiamo, spieghiamo il corso, rispondiamo alle domande" },
  { n: "3", t: "Iter burocratico", p: "Iscrizione portale Bandi Online RL e caricamento documentazione" },
  { n: "4", t: "Pagamento", p: "Paghi la quota per garantire il posto al corso" },
  { n: "5", t: "Rimborso", p: "Rimborso entro circa 8 mesi dalla fine del corso" },
];

const PD_BEFORE = [
  "Ogni prompt riparte da zero: non hai template né procedure standardizzate",
  "Usi l'AI per task isolati, non per flussi di lavoro completi",
  "Non sai valutare l'output: a volte ti fidi troppo, a volte rifai tutto tu",
  "Il tuo uso dell'AI dipende dall'umore del giorno, non da un sistema",
  "Hai competenza, non infrastruttura",
  "Quando l'AI aggiorna qualcosa, sei di nuovo punto a capo",
];
const PD_AFTER = [
  "Hai procedure AI documentate per i tuoi task ad alto impatto",
  "Sai costruire prompt complessi che producono output affidabili e ripetibili",
  "Hai un sistema di validazione: sai quando fidarti e quando correggere",
  "Alcune aree del tuo lavoro girano in autonomia: tu supervisioni, non esegui",
  "Il tuo metodo vale anche quando gli strumenti cambiano",
  "Hai un sistema funzionante costruito durante il corso, pronto da usare da subito",
];

const WHO = [
  { i: "💼", c: "p", h: "Liberi professionisti e P.IVA", p: "Consulenti, freelance, professionisti che vogliono automatizzare i task ripetitivi e lavorare meglio." },
  { i: "🏢", c: "g", h: "Titolari e team aziendali", p: "PMI e aziende in Lombardia che vogliono portare l'AI dentro i propri processi operativi." },
  { i: "📊", c: "p", h: "Manager e responsabili", p: "Chi deve capire l'AI per guidare il proprio team e scegliere gli strumenti in modo informato." },
  { i: "🚀", c: "g", h: "Chi parte davvero da zero", p: "Nessuna competenza tecnica richiesta. Email, browser e documenti: è tutto quello che serve." },
];

const MODULES = [
  {
    num: "M0", title: "Fondamenta dell'AI", hours: "8 ore",
    items: ["Storia e panoramica dell'AI, dagli Anni '50 agli LLM", "Come funziona un LLM: token, transformer, allucinazioni", "Cos'è il RAG e come le aziende usano i propri dati", "Sicurezza, etica e AI Act europeo", "Come l'AI ottimizza i processi aziendali", "Panoramica strumenti AI 2025"],
    exLabel: "ESERCITAZIONE", ex: ["Identifica le aree AI-ready nella tua azienda"],
  },
  {
    num: "M1", title: "Prompting con Claude", hours: "9 ore",
    items: ["Anatomia di un prompt: ruolo, contesto, task, formato", "Prompt engineering base e avanzato con Claude", "Chain-of-thought, meta-prompting, output strutturati", "Prompt per use case aziendali: marketing, HR, ops, sales, finance"],
    exLabel: "ESERCITAZIONI", ex: ["Scrivi e ottimizza i tuoi prompt in diretta su Claude", "Prompt battle: chi ottiene l'output migliore?", "Costruisci la tua prompt library aziendale"],
  },
  {
    num: "M2", title: "Assistenti AI e GPT personalizzati", hours: "7 ore",
    items: ["Come funzionano gli assistenti AI internamente", "System prompt e custom instructions", "Creare un GPT personalizzato su ChatGPT", "Creare un assistente con Claude: Projects e knowledge base"],
    exLabel: "ESERCITAZIONI", ex: ["Crea il tuo primo GPT aziendale in diretta", "Configura il tuo assistente Claude personalizzato"],
  },
  {
    num: "M3", title: "Strumenti AI: valutazione e selezione", hours: "5 ore",
    items: ["Panoramica strumenti AI 2025: Claude, GPT-4o, Gemini, Make, n8n", "Come scegliere: framework su costo, GDPR, integrazioni, capacità", "Costruisci la tua strategia AI aziendale", "AI per funzione: marketing, HR, sales, operations, finance"],
    exLabel: "ESERCITAZIONE", ex: ["Benchmark live su 3 strumenti: valutazione e scelta motivata"],
  },
  {
    num: "M4", title: "Costruisci il tuo sistema AI con Claude", hours: "11 ore",
    items: ["Architettura di un sistema AI aziendale", "Claude come assistente operativo: configurazione per task continuativi", "Automazioni con n8n e Make", "Caso studio guidato: sistema costruito in diretta", "Come cambia il lavoro dei team quando l'AI entra in azienda"],
    exLabel: "LABORATORIO FINALE", ex: ["Costruisci il tuo sistema AI con assistenza live del docente", "Presentazione finale con feedback e versione definitiva"],
  },
];

const REVIEWS = [
  { q: "Ho sostituito il fai da te con un metodo solido e una gestione strategica delle mie capacità. La forza di questa esperienza sta nell'equilibrio perfetto tra chiarezza e concretezza che genera risultati immediati.", in: "AG", name: "Alessandro Giandolfo", tag: "Studente Morfeus Hub" },
  { q: "La vera differenza rispetto ad altri corsi è la forte componente pratica: ti porta davvero a cambiare il modo di usare questi strumenti e ti spinge a fare un salto di livello. Lezione dopo lezione, fa accendere nuove lampadine.", in: "AV", name: "Andrea Vitali", tag: "Studente Morfeus Hub" },
  { q: "Premesse rispettate e promesse mantenute: il corso è stata un'ottima opportunità di acquisire contesto, basi e soprattutto metodo. Teoria e pratica affrontate insieme hanno già cambiato il mio modo di approcciare l'automazione lato AI.", in: "GB", name: "Giovanni Bocca", tag: "Studente Morfeus Hub" },
  { q: "Sono entrata senza sapere quasi nulla e sono uscita con un sistema AI funzionante per la mia attività di consulenza. Il modulo finale da solo vale l'intero investimento. Docenti preparatissimi e sempre disponibili.", in: "CF", name: "Chiara Ferroni", tag: "Consulente, Studente Morfeus Hub" },
  { q: "Finalmente un corso che non ti vende l'hype ma ti dà strumenti concreti. Ho ridotto di almeno 6 ore a settimana il tempo su task ripetitivi. E ci sono riuscito partendo davvero da zero, senza esperienza tecnica.", in: "MR", name: "Marco Riva", tag: "Titolare PMI, Studente Morfeus Hub" },
  { q: "Vengo da un settore tradizionale dove l'AI sembrava lontana anni luce. In poche settimane ho automatizzato la gestione delle bozze di documenti. Il risparmio di tempo è reale, non è marketing.", in: "FM", name: "Francesca Moretti", tag: "Professionista, Studente Morfeus Hub" },
  { q: "Ho portato il metodo in studio e ora i miei collaboratori lo usano ogni giorno. Il modulo sui flussi di lavoro da solo vale il costo del corso. Consiglio a chiunque gestisca un team.", in: "LB", name: "Luca Benedetti", tag: "Commercialista, Studente Morfeus Hub" },
  { q: "Sono entrata convinta che l'AI fosse roba da sviluppatori. Ne sono uscita con un sistema di automazione che gira da solo. Il docente sa come spiegare le cose a chi non è tecnico, punto.", in: "SZ", name: "Sara Zanetti", tag: "Resp. Marketing PMI, Studente Morfeus Hub" },
  { q: "Non è solo un corso, è un cambio di mentalità. Ho iniziato a vedere ogni processo aziendale attraverso la domanda 'cosa posso delegare all'AI?' Il ritorno sull'investimento è già evidente.", in: "DC", name: "Davide Conti", tag: "Titolare agenzia, Studente Morfeus Hub" },
];

const FAQ = [
  { q: "Come funziona il rimborso?", a: "Paghi la quota del corso all'inizio per garantire il tuo posto. Se partecipi ad almeno il 75% delle lezioni (30 ore su 40), ricevi il rimborso entro circa 8 mesi dalla fine del corso grazie al bando Formazione Continua di Regione Lombardia, finanziato dal Fondo Sociale Europeo Plus (FSE+) 2021-2027. Nessun costo aggiuntivo." },
  { q: "Quali sono i requisiti per accedere?", a: "Devi avere una Partita IVA attiva oppure un'azienda con sede legale o operativa in Lombardia. Il corso è aperto a liberi professionisti, freelance, titolari e dipendenti di PMI che vogliono portare l'AI nel proprio lavoro quotidiano. Nessun requisito tecnico." },
  { q: "Cosa succede se non raggiungo il 75% di presenze?", a: "Il rimborso è garantito solo a chi partecipa ad almeno il 75% delle lezioni, pari a 30 ore su 40. Sotto questa soglia non puoi accedere al rimborso del bando regionale, ma mantieni comunque l'accesso al corso e a tutti i materiali condivisi durante il percorso." },
  { q: "Serve esperienza tecnica o di programmazione?", a: "No. Il corso parte da zero ed è pensato per chi non ha mai usato l'AI in modo strutturato. Nessun codice, nessun prerequisito tecnico. Ti basta saper usare strumenti digitali di base. Tutto il percorso è no-code: lavoriamo con Claude e altri strumenti pratici, non con la programmazione." },
  { q: "L'attestato finale è riconosciuto?", a: "Sì. Al termine del corso ricevi un attestato rilasciato da un ente accreditato da Regione Lombardia, coerente con il bando Formazione Continua FSE+ 2021-2027." },
  { q: "Quando inizia il corso e quanti posti ci sono?", a: "Il corso parte dopo il 12 giugno 2026. I posti sono limitati per garantire un'esperienza di qualità con assistenza diretta durante le esercitazioni. Una volta esauriti, le iscrizioni riapriranno con la prossima edizione. Dopo la candidatura ti contattiamo entro 24 ore." },
];

const TRUST = ["HFarm", "Talent Garden", "Confcommercio", "Asseprim", "Sole 24 Ore Formazione"];

/* ── COMPONENT ───────────────────────────────────────────────────── */

interface Props {
  accentColor: string;
  step: FunnelStepConfig;
}

export function FinanziataLandingSection({ accentColor, step }: Props) {
  const content = step.content.FinanziataLanding;
  const vslYoutubeId = content?.vslYoutubeId ?? "";
  const optinEndpoint = content?.optinEndpoint ?? "/api/funnels/formazione-finanziata/optin";
  const deadline = content?.deadline ?? "15 giugno";
  const supportEmail = content?.supportEmail ?? "info@morfeushub.it";

  const [videoOn, setVideoOn] = useState(false);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sticky CTA (mobile): nascosto above-the-fold, compare dopo aver superato i bottoni dell'hero
  const heroCtasRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  // form state
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [lombardia, setLombardia] = useState<"si" | "no" | null>(null);
  const [profilo, setProfilo] = useState<"freelance" | "azienda" | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // reviews drag-scroll
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const x = e.pageX - el.offsetLeft;
    const dx = x - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    setDragging(false);
  };

  // Auto-scroll lento e continuo delle testimonianze (loop seamless: la lista è
  // renderizzata 2 volte). Si mette in pausa mentre l'utente trascina.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const SPEED = 0.5; // px per frame (~30px/s)
    let raf = 0;
    const tick = () => {
      if (!drag.current.down) {
        const half = el.scrollWidth / 2;
        let next = el.scrollLeft + SPEED;
        if (half > 0 && next >= half) next -= half;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Mostra lo sticky CTA solo quando i bottoni dell'hero sono scrollati sopra la viewport
  useEffect(() => {
    const el = heroCtasRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToForm = useCallback(() => {
    document.getElementById("ff-candidatura")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const scrollToCurriculum = useCallback(() => {
    document.getElementById("ff-curriculum")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!nome.trim() || !cognome.trim() || !email.trim() || !telefono.trim()) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }
    if (!lombardia) {
      setError("Indica se hai P.IVA o azienda con sede in Lombardia.");
      return;
    }
    if (lombardia === "no") {
      setError("Non puoi candidarti senza P.IVA o sede in Lombardia.");
      return;
    }
    if (!profilo) {
      setError("Seleziona se sei un libero professionista o un'azienda.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(optinEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          cognome: cognome.trim(),
          email: email.trim(),
          telefono: telefono.trim(),
          pIvaLombardia: lombardia === "si",
          profiloAzienda: profilo === "azienda",
          source: "Landing Page",
        }),
      });
      if (res.ok) {
        // Redirect alla thank-you page dedicata (full page-load: così il Pixel
        // sulla TY page parte pulito e la conversione è tracciabile su URL propria).
        window.location.href = "/formazione-finanziata-2026/thank-you";
        return;
      } else {
        const body = await res.json().catch(() => ({}));
        setError("Si è verificato un errore (" + res.status + "). Riprova o scrivici a " + supportEmail + ".");
        // eslint-disable-next-line no-console
        console.error("optin error", body);
        setSubmitting(false);
      }
    } catch {
      setError("Errore di rete. Controlla la connessione e riprova.");
      setSubmitting(false);
    }
  };

  const submitDisabled = submitting || lombardia === "no";

  return (
    <div className="ff-root" style={{ ["--accent" as string]: accentColor }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* BANNER */}
      <div className="lomb-banner">
        <p>
          <span className="lomb-dot" />
          <strong>Attenzione:</strong> questo corso è rimborsabile <strong>esclusivamente</strong> per chi ha
          partita IVA o un'azienda con sede in <strong>Lombardia</strong>.
        </p>
      </div>

      {/* NAV */}
      <div className="nav">
        <div className="inner">
          <img className="logo-img" src="/logo/m-w2.png" alt="Morfeus Hub" />
          <button type="button" className="btn-acc" onClick={scrollToForm}>
            Candidati ora
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="hero bg-dark on-dark">
        <div className="container">
          <div className="hero-pills">
            <span className="hero-pill">Corso Live · 40 ore</span>
            <span className="hero-pill hero-pill-accent">📍 Solo Lombardia</span>
            <span className="hero-pill hero-pill-urgent">⏳ Iscrizioni entro il {deadline}</span>
          </div>
          <h1 className="display">
            Da zero al tuo <span className="serif acc">sistema AI</span>
            <br />
            Rimborsabile fino al <span className="acc">100%</span>
          </h1>
          <p className="hero-sub">
            Il corso pratico da 40 ore per liberi professionisti e aziende in Lombardia che vogliono portare l'AI
            dentro il proprio lavoro reale. Niente teoria, tutto operativo.
          </p>

          <div className="vsl-wrap">
            <div className="vsl-bar">
              <div className="vdot" style={{ background: "#FF5F57" }} />
              <div className="vdot" style={{ background: "#FFBD2E", margin: "0 5px" }} />
              <div className="vdot" style={{ background: "#28CA41" }} />
              <span style={{ fontSize: 12, color: "#555", marginLeft: 9, fontWeight: 600 }}>
                AI Zero to Operator
                <span className="vsl-title-extra"> — Presentazione del corso</span>
              </span>
            </div>
            <div
              className="vsl-player"
              onClick={() => vslYoutubeId && setVideoOn(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && vslYoutubeId) setVideoOn(true);
              }}
              aria-label="Riproduci il video di presentazione"
            >
              {videoOn && vslYoutubeId ? (
                <iframe
                  className="vsl-frame"
                  src={`https://www.youtube.com/embed/${vslYoutubeId}?autoplay=1&rel=0`}
                  title="AI Zero to Operator — Presentazione del corso"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {vslYoutubeId && (
                    <img
                      className="vsl-poster"
                      src={`https://img.youtube.com/vi/${vslYoutubeId}/maxresdefault.jpg`}
                      alt="Anteprima del video di presentazione del corso"
                      loading="lazy"
                    />
                  )}
                  <span className="vsl-tag">GUARDA IL VIDEO</span>
                  <div className="vsl-overlay">
                    <button type="button" className="vsl-play" aria-label="Play">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <p className="vsl-cap">Il team di Morfeus Hub presenta il corso</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="hero-ctas" ref={heroCtasRef}>
            <button type="button" className="btn-acc btn-acc-lg" onClick={scrollToForm}>
              Invia la tua candidatura →
            </button>
            <button type="button" className="btn-outline" onClick={scrollToCurriculum}>
              Vedi il programma
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="stat-num">40h</div>
              <div className="stat-label">di formazione live</div>
            </div>
            <div>
              <div className="stat-num">17h</div>
              <div className="stat-label">di esercitazioni incluse</div>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">rimborso P.IVA Lombardia</div>
            </div>
            <div>
              <div className="stat-num">0</div>
              <div className="stat-label">prerequisiti tecnici</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust bg-dark on-dark">
        <div className="container">
          <div className="trust-inner">
            <span className="trust-label">Ci hanno scelto</span>
            <div className="trust-names">
              {TRUST.map((name, i) => (
                <span key={name} style={{ display: "contents" }}>
                  <span className="trust-name">{name}</span>
                  {i < TRUST.length - 1 && <span className="trust-dot">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOMBARDIA ALERT */}
      <section className="bg-darker on-dark section-pad lomb-section-bg">
        <div className="container">
          <div className="lomb-alert">
            <div className="lomb-icon">📍</div>
            <div>
              <h3>Solo per chi è in Lombardia</h3>
              <p>
                Il rimborso è garantito dal programma di formazione di Regione Lombardia. Per accedere è{" "}
                <strong>obbligatorio</strong> avere partita IVA attiva oppure azienda con sede in Lombardia. Chi non
                ha sede in Lombardia <strong>non può candidarsi e non ha diritto al rimborso</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process bg-light on-light section-pad">
        <div className="container">
          <div className="section-label">Come funziona</div>
          <h2 className="sec-h2 display">
            Dal form al rimborso
            <br />
            <span className="acc">in 5 passi</span>
          </h2>
          <p className="sec-sub">Dal momento in cui ti candidi fino a quando ricevi il rimborso.</p>
          <div className="steps-row">
            {STEPS.map((s, i) => (
              <div className={`step${i === STEPS.length - 1 ? " last" : ""}`} key={s.n}>
                <div className="step-num">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="proc-cards">
            <div className="proc-card">
              <div className="proc-icon p">💳</div>
              <h3>Anticipa la quota</h3>
              <p>Paghi l'intera quota prima dell'inizio del corso per confermare il tuo posto.</p>
            </div>
            <div className="proc-card hl">
              <div className="proc-perc">100%</div>
              <h3>Rimborso P.IVA</h3>
              <p>
                Se partecipi ad almeno il 75% delle lezioni (30 ore su 40), ricevi il rimborso totale. Al 90% per le
                aziende.
              </p>
            </div>
            <div className="proc-card">
              <div className="proc-icon g">📋</div>
              <h3>75% di presenze</h3>
              <p>La soglia minima per accedere al rimborso è il 75% delle lezioni, pari a 30 ore su 40.</p>
            </div>
          </div>
          <div className="proc-note">
            <strong>Bando:</strong> Formazione Continua di Regione Lombardia, finanziato dal Fondo Sociale Europeo Plus
            (FSE+) 2021-2027. Ti assistiamo in tutto il processo burocratico, dalla candidatura all'approvazione.
          </div>
          <div className="section-cta">
            <button type="button" className="btn-acc btn-acc-lg" onClick={scrollToForm}>
              Invia la tua candidatura →
            </button>
          </div>
        </div>
      </section>

      {/* PRIMA / DOPO */}
      <section className="bg-dark on-dark section-pad" style={{ background: "#0E0C1E" }}>
        <div className="container">
          <div className="section-label">Prima e dopo il corso</div>
          <h2 className="sec-h2 display">
            Prima e <span className="serif acc">dopo</span>
          </h2>
          <div className="pd-grid">
            <div className="pd-card">
              <div className="pd-title red">PRIMA</div>
              <div className="pd-sub">(dove sei ora)</div>
              <div>
                {PD_BEFORE.map((t) => (
                  <div className="pd-item" key={t}>
                    <div className="pd-icon x">✕</div>
                    <p>{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pd-card">
              <div className="pd-title green">DOPO</div>
              <div className="pd-sub">(cosa costruisci)</div>
              <div>
                {PD_AFTER.map((t) => (
                  <div className="pd-item" key={t}>
                    <div className="pd-icon ok">✓</div>
                    <p>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="who bg-light on-light section-pad">
        <div className="container">
          <div className="section-label">A chi è rivolto</div>
          <h2 className="sec-h2">
            Pensato per chi
            <br />
            parte da <span className="serif">zero</span>
          </h2>
          <p className="sec-sub">Nessun prerequisito tecnico. Basta usare strumenti digitali di base.</p>
          <div className="who-grid">
            {WHO.map((w) => (
              <div className="who-card" key={w.h}>
                <div className={`who-icon ${w.c}`}>{w.i}</div>
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
          <div className="who-lomb">
            📍 <strong>Requisito obbligatorio: sede in Lombardia.</strong> Il rimborso, fino al 100% per P.IVA e fino
            al 90% per le aziende, è disponibile esclusivamente per chi ha partita IVA attiva o azienda con sede in
            Lombardia. Il corso non è gratuito: si anticipa e si viene rimborsati.
          </div>
          <div className="section-cta">
            <button type="button" className="btn-acc btn-acc-lg" onClick={scrollToForm}>
              Invia la tua candidatura →
            </button>
          </div>
        </div>
      </section>

      {/* METODO MVA */}
      <section className="bg-darker on-dark section-pad" style={{ background: "linear-gradient(180deg,#13102C 0%,#0E0C1E 100%)" }}>
        <div className="container">
          <div className="section-label">Il motivo per cui funziona</div>
          <h2 className="sec-h2 display">
            Non è un corso
            <br />
            <span className="serif acc">è un metodo in tre fasi</span>
          </h2>
          <p className="sec-sub" style={{ maxWidth: 640 }}>
            Il corso usa un metodo preciso. Si chiama <strong>M-V-A</strong>. Tre fasi. Una sequenza obbligata. Non
            puoi saltare la seconda per arrivare alla terza, e quasi tutti si fermano esattamente lì.
          </p>
          <div className="steps-row dark-line" style={{ marginBottom: 44 }}>
            <div className="step">
              <div className="step-num" style={{ background: "var(--purple)", fontSize: 16 }}>M</div>
              <h4>Manuale</h4>
              <p>Prima capisci il task completamente</p>
            </div>
            <div className="step">
              <div className="step-num" style={{ background: "var(--purple)", fontSize: 16 }}>V</div>
              <h4>Validato</h4>
              <p>Costruisci e testi il sistema</p>
            </div>
            <div className="step last">
              <div className="step-num" style={{ fontSize: 16 }}>A</div>
              <h4>Attivato</h4>
              <p>Il sistema gira in autonomia</p>
            </div>
          </div>
          <div className="proc-cards mva-cards">
            <div className="proc-card mva-letter-card">
              <div className="proc-icon p" style={{ color: "var(--purple-light)" }}>M</div>
              <h3>Manuale</h3>
              <p>Prima capisci il task completamente. Ogni passaggio, ogni decisione, ogni eccezione, ogni standard di qualità.</p>
              <p>Non perché l'AI sia stupida. Perché non puoi delegare quello che non sai spiegare ad alta voce. Se non riesci a descrivere il processo, ottieni output che sembra giusto ma non lo è.</p>
              <p className="mva-faded">È dove quasi tutta la formazione AI si ferma: ti insegna cosa fare con lo strumento, non come capire cosa delegare.</p>
            </div>
            <div className="proc-card mva-letter-card">
              <div className="proc-icon p" style={{ color: "var(--purple-light)" }}>V</div>
              <h3>Validato</h3>
              <p>Costruisci il sistema. Lo testi. Lo correggi. Finché produce al tuo standard, senza che tu debba supervisionarlo ogni volta.</p>
              <p>Questa è la fase in cui il sistema guadagna la tua fiducia basata su dati: <em>"Ho testato. Funziona. Produce quello che voglio."</em></p>
              <p className="mva-faded">È anche la fase in cui quasi tutti si bloccano.</p>
            </div>
            <div className="proc-card hl mva-letter-card">
              <div className="proc-icon g" style={{ color: "var(--accent-bright)" }}>A</div>
              <h3>Attivato</h3>
              <p>Quando funziona sempre, non ci torni. Non lo aggiusti. Non lo sorvegli.</p>
              <p>Produce mentre sei su altro. Lavora mentre dormi. Il tuo tempo smette di essere il collo di bottiglia.</p>
            </div>
          </div>
          <div className="proc-note" style={{ marginTop: 24 }}>
            <strong>Perché tra V e A quasi tutti si fermano:</strong> Non è un problema di bravura, è strutturale. La
            transizione richiede feedback esterno sul tuo standard. Sai cosa vuoi dall'output, ma non sai se il
            sistema lo produce davvero al livello che serve — perché sei tu che lo giudichi e sei tu che lo correggi.
            Ci vuole qualcuno che lavora con te, sul tuo caso, e ti corregge mentre costruisci.
          </div>
          <div className="mva-bottom">
            Le alternative ti portano a <strong>M</strong>
            <br />
            Qualche volta a <strong>V</strong>
            <br />
            <span className="win">
              Il corso ti porta ad <strong>A</strong>
            </span>
          </div>
          <div className="section-cta">
            <button type="button" className="btn-acc btn-acc-lg" onClick={scrollToForm}>
              Invia la tua candidatura →
            </button>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="ff-curriculum" className="bg-darker on-dark section-pad" style={{ background: "linear-gradient(180deg,#0E0C1E 0%,#161235 100%)" }}>
        <div className="container">
          <div className="section-label">Programma completo</div>
          <h2 className="sec-h2 display">
            40 ore <span className="acc">tutto quello che ti serve davvero</span>
          </h2>
          <p className="sec-sub">
            👇 Clicca ogni modulo per aprire il dettaglio completo di lezioni ed esercitazioni.
          </p>
          <div className="curr-badges">
            <div className="curr-badge g">
              <span className="curr-badge-icon">📚</span>
              <div>
                <strong>5 moduli progressivi</strong>
                <span>dalla teoria al sistema operativo</span>
              </div>
            </div>
            <div className="curr-badge p">
              <span className="curr-badge-icon">🔧</span>
              <div>
                <strong>17 ore di esercitazioni</strong>
                <span>incluse nelle 40 ore totali</span>
              </div>
            </div>
          </div>
          <div className="modules">
            {MODULES.map((m, i) => {
              const open = openModule === i;
              return (
                <div className="module" key={m.num}>
                  <button
                    type="button"
                    className="module-header"
                    aria-expanded={open}
                    onClick={() => setOpenModule(open ? null : i)}
                  >
                    <span className="module-num">{m.num}</span>
                    <span className="module-title">{m.title}</span>
                    <span className="module-hours">{m.hours}</span>
                    <span className={`chevron${open ? " open" : ""}`}>↓</span>
                  </button>
                  {open && (
                    <div className="module-body">
                      <ul>
                        {m.items.map((it) => (
                          <li key={it}>
                            <span className="arr">›</span>
                            {it}
                          </li>
                        ))}
                      </ul>
                      <div className="ex-label">{m.exLabel}</div>
                      <ul>
                        {m.ex.map((it) => (
                          <li key={it}>
                            <span className="arr">›</span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="section-cta">
            <button type="button" className="btn-acc btn-acc-lg" onClick={scrollToForm}>
              Invia la tua candidatura →
            </button>
          </div>
        </div>
      </section>

      {/* RIMBORSO */}
      <section className="bg-dark on-dark section-pad" style={{ background: "#130F26" }}>
        <div className="container">
          <div className="section-label">Rimborso regionale</div>
          <div className="rimborso-wrap">
            <div className="rimborso-hd">
              <h2 className="sec-h2 display">
                Rimborsabile
                <br />
                fino al <span className="acc">100%</span>
              </h2>
              <p>
                Se hai la partita IVA o un'azienda con sede in Lombardia, puoi richiedere il rimborso attraverso il
                programma di formazione di Regione Lombardia. Il corso non è gratuito: si anticipa il costo e si riceve
                il rimborso.
              </p>
            </div>
            <div className="rimborso-cards">
              <div className="rimborso-card">
                <div className="rimborso-perc g">100%</div>
                <div className="rimborso-who">Liberi professionisti · P.IVA</div>
                <div className="rimborso-note">
                  Rimborso totale per chi ha partita IVA attiva con sede in Lombardia. Anticipo necessario, rimborso
                  successivo alla verifica dei requisiti.
                </div>
              </div>
              <div className="rimborso-card">
                <div className="rimborso-perc p">90%</div>
                <div className="rimborso-who">Aziende · PMI · Team</div>
                <div className="rimborso-note">
                  Rimborso del 90% per le aziende con sede legale o operativa in Lombardia. Anticipo necessario,
                  rimborso successivo alla verifica dei requisiti.
                </div>
              </div>
            </div>
            <div className="rimborso-ft">
              <p>
                <strong>Requisito obbligatorio:</strong> sede in Lombardia. I fondi regionali vengono assegnati in
                ordine cronologico. Prima ti candidi, maggiori sono le probabilità di ottenere il rimborso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team bg-light on-light section-pad">
        <div className="container">
          <div className="practitioners-grid">
            <div className="team-photos">
              <img className="team-photo-1" src="/Matteo-Arnaboldi-Presentazione.png" alt="Morfeus Hub durante una sessione di formazione" />
              <img className="team-photo-2" src="/Matteo-Arnaboldi-MIIF.jpg" alt="Matteo Arnaboldi sul palco, Morfeus Hub" />
            </div>
            <div>
              <div className="section-label">Con chi sarai in aula</div>
              <h2 className="sec-h2">
                Non formatori
                <br />
                <span className="serif">practitioners</span>
              </h2>
              <p className="team-intro">
                Il team che eroga AI Zero to Operator non è fatto di docenti universitari che parlano di AI in teoria.
                Sono professionisti che usano questi strumenti ogni giorno su clienti reali, processi reali, problemi
                reali. Insegnano ciò che applicano, non ciò che studiano.
              </p>
              <div style={{ marginTop: 22 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, color: "var(--text-light)" }}>
                  Team Morfeus Hub
                </h3>
                <div className="team-role">AI Education · Applied AI · Business Automation</div>
                <p style={{ fontSize: 16, color: "#888", lineHeight: 1.7, marginTop: 10, maxWidth: 520 }}>
                  Morfeus Hub ha formato oltre 2.000 professionisti, collaborato con HFarm, Talent Garden, Confcommercio
                  e Sole 24 Ore Formazione, e costruisce sistemi AI per aziende ogni giorno. Il team non si è reinventato
                  AI educator. L'AI era già il loro lavoro, prima ancora di insegnarla.
                </p>
                <span className="team-badge">Practitioners attivi · Non accademici</span>
              </div>
            </div>
          </div>
          <div className="team-why">
            <h4>Perché conta che siano practitioners?</h4>
            <p>
              Perché quello che insegnano non è teoria. È ciò che hanno costruito, testato e usano loro stessi ogni
              giorno. Ogni esercizio del corso è stato fatto prima da chi lo propone. Ogni strumento è stato valutato su
              casi reali. Quando costruisci qualcosa che non funziona, lo sanno. Perché ci sono passati.
            </p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews bg-light on-light section-pad">
        <div className="container">
          <div className="section-label">La prova</div>
          <h2 className="sec-h2">
            Cosa dice chi ci
            <br />
            è già <span className="serif">passato</span>
          </h2>
          <p className="sec-sub">Persone reali, esperienze reali. Tutti i settori, non solo il marketing.</p>
        </div>
        <div style={{ padding: "0 24px" }}>
          <div
            ref={trackRef}
            className={`reviews-track${dragging ? " dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
          >
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <div className="review-card" key={`${r.name}-${i}`} aria-hidden={i >= REVIEWS.length}>
                <div className="review-stars">★★★★★</div>
                <p className="review-quote">“{r.q}”</p>
                <div className="review-sep" />
                <div className="review-author">
                  <div className="review-initials">{r.in}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-tag">{r.tag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="reviews-hint">Scorrono da sole · trascina per andare ai tuoi tempi</p>
        </div>
      </section>

      {/* FORM */}
      <section id="ff-candidatura" className="candidatura section-pad">
        <div className="container">
          <div className="form-wrap">
            <div className="form-hd">
              <span className="form-badge">⚡ Verifica idoneità in 17 secondi</span>
              <h2>Invia la tua candidatura</h2>
              <p>
                Poche informazioni e capisci subito se sei idoneo al voucher. Iscrizioni entro il {deadline} · posti
                limitati.
              </p>
            </div>

            <form className="form-body" onSubmit={handleSubmit} noValidate>
                <div className="fg2">
                  <div className="fg">
                    <label htmlFor="ff-nome">Nome</label>
                    <input id="ff-nome" type="text" placeholder="Mario" value={nome} onChange={(e) => setNome(e.target.value)} required />
                  </div>
                  <div className="fg">
                    <label htmlFor="ff-cognome">Cognome</label>
                    <input id="ff-cognome" type="text" placeholder="Rossi" value={cognome} onChange={(e) => setCognome(e.target.value)} required />
                  </div>
                </div>
                <div className="fg">
                  <label htmlFor="ff-email">Email</label>
                  <input id="ff-email" type="email" placeholder="mario@esempio.it" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="fg">
                  <label htmlFor="ff-telefono">Telefono</label>
                  <input id="ff-telefono" type="tel" placeholder="+39 333 1234567" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                </div>

                <div className="fg">
                  <label>Hai P.IVA o azienda con sede in Lombardia?</label>
                  <div className="radio-group">
                    <label className={`radio-opt${lombardia === "si" ? " selected" : ""}`}>
                      <input type="radio" name="lombardia" value="si" checked={lombardia === "si"} onChange={() => setLombardia("si")} style={{ display: "none" }} />
                      <div className="radio-dot" />
                      <span>Sì, ho sede in Lombardia</span>
                    </label>
                    <label className={`radio-opt${lombardia === "no" ? " selected" : ""}`}>
                      <input type="radio" name="lombardia" value="no" checked={lombardia === "no"} onChange={() => setLombardia("no")} style={{ display: "none" }} />
                      <div className="radio-dot" />
                      <span>No, non ho sede in Lombardia</span>
                    </label>
                  </div>
                  {lombardia === "no" && (
                    <div className="lomb-no-msg">
                      Non puoi candidarti: il rimborso è disponibile esclusivamente per chi ha sede in Lombardia.
                    </div>
                  )}
                </div>

                <div className="fg">
                  <label>Sei libero professionista o rappresenti un'azienda?</label>
                  <div className="radio-group">
                    <label className={`radio-opt${profilo === "freelance" ? " selected" : ""}`}>
                      <input type="radio" name="profilo" value="freelance" checked={profilo === "freelance"} onChange={() => setProfilo("freelance")} style={{ display: "none" }} />
                      <div className="radio-dot" />
                      <span>💼 Libero professionista / P.IVA</span>
                    </label>
                    <label className={`radio-opt${profilo === "azienda" ? " selected" : ""}`}>
                      <input type="radio" name="profilo" value="azienda" checked={profilo === "azienda"} onChange={() => setProfilo("azienda")} style={{ display: "none" }} />
                      <div className="radio-dot" />
                      <span>🏢 Titolare o dipendente di azienda</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="form-submit" disabled={submitDisabled}>
                  {submitting ? "Invio in corso..." : "Invia candidatura →"}
                </button>
                {error && <div className="form-error">{error}</div>}
                <p className="form-legal">
                  Inviando la candidatura accetti che i tuoi dati vengano trattati ai sensi del GDPR per contattarti
                  riguardo al corso. Non verranno condivisi con terze parti.
                </p>
              </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq bg-darker on-dark section-pad" style={{ background: "linear-gradient(180deg,#161235 0%,#0E0C1E 100%)" }}>
        <div className="container">
          <div className="section-label">Le domande che stai già facendo</div>
          <h2 className="sec-h2 display">
            Risposte <span className="serif acc">oneste</span>
            <br />
            alle obiezioni reali
          </h2>
          <p className="sec-sub">Le domande che ci fanno sempre prima di candidarsi.</p>
          <div className="faq-list">
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div className="faq-item" key={f.q}>
                  <button type="button" className="faq-q" aria-expanded={open} onClick={() => setOpenFaq(open ? null : i)}>
                    <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="qt">{f.q}</span>
                    <span className={`faq-icon${open ? " open" : ""}`}>+</span>
                  </button>
                  {open && (
                    <div className="faq-a">
                      <p>{f.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="inner">
          <div className="footer-top-bar">
            <div className="footer-brand-row">
              <img className="footer-logo" src="/logo/m-w.png" alt="Morfeus Hub" />
              <span className="footer-site">morfeushub.com</span>
            </div>
            <nav className="footer-nav">
              <a href="https://www.morfeushub.com/it/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="https://www.morfeushub.com/it/cookies" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
            </nav>
          </div>
          <p className="footer-disc">
            <strong>Disclaimer:</strong> I prodotti e servizi venduti su questo sito non costituiscono proiezione,
            promessa o garanzia di guadagno. I risultati individuali possono variare e dipendono dall'impegno,
            dall'esperienza e dalle condizioni individuali di ciascun partecipante. Claude è un marchio di Anthropic,
            PBC. Questo corso non è affiliato a, sponsorizzato da, o approvato da Anthropic. Questo contenuto rispetta le
            linee guida AGCM in materia di correttezza pubblicitaria e pratiche commerciali.
          </p>
          <div className="footer-bottom">
            <p>Morfeus Hub S.r.l. · P.IVA 14209210963 · Milano, Italia</p>
            <p>© 2026 Morfeus Hub S.r.l. · Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className={`mobile-sticky${showSticky ? " show" : ""}`}>
        <button type="button" className="btn-acc" onClick={scrollToForm}>
          <span className="pulse-dot" aria-hidden="true" />
          Invia la tua candidatura →
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   THANK-YOU PAGE — "Sei idoneo/a"
   Pagina dedicata su URL propria (/formazione-finanziata-2026/grazie) a cui
   la landing reindirizza dopo l'invio andato a buon fine del form. Stesso
   identico contenuto dello stato "idoneo" + stesso link calendario. È qui che
   va inserito l'evento custom del Pixel per tracciare il lead avvenuto.
════════════════════════════════════════════════════════════════════ */

interface ThankYouProps {
  accentColor: string;
  step: FunnelStepConfig;
}

export function FinanziataThankYouSection({ accentColor, step }: ThankYouProps) {
  const content = step.content.FinanziataThankYou;
  const calendarUrl = content?.calendarUrl ?? "#";
  const supportEmail = content?.supportEmail ?? "info@morfeushub.it";

  return (
    <div className="ff-root" style={{ ["--accent" as string]: accentColor }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <div className="nav">
        <div className="inner">
          <img className="logo-img" src="/logo/m-w2.png" alt="Morfeus Hub" />
        </div>
      </div>

      {/* SUCCESS */}
      <section className="candidatura section-pad">
        <div className="container">
          <div className="form-wrap">
            <div className="form-hd">
              <span className="form-badge">⚡ Candidatura ricevuta</span>
              <h2>Sei idoneo/a</h2>
              <p>Abbiamo ricevuto la tua candidatura. Ecco cosa devi fare ora.</p>
            </div>
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Sei idoneo/a</h3>
              <p style={{ fontSize: 16, color: "#9A9AB0" }}>Ecco cosa devi fare ora</p>
              <ul className="success-steps">
                <li>
                  <span className="success-badge a">1</span>
                  <p>
                    <strong>Prenota subito una call con Paola</strong> per verificare i requisiti e ricevere tutte le
                    informazioni sul corso:
                    <br />
                    <a className="success-cal" href={calendarUrl} target="_blank" rel="noopener noreferrer">
                      → Prenota la tua call
                    </a>
                  </p>
                </li>
                <li>
                  <span className="success-badge b">2</span>
                  <p>
                    All'indirizzo email che hai inserito riceverai da oggi tutte le comunicazioni necessarie con i
                    dettagli del corso, del rimborso e dei prossimi passi.
                  </p>
                </li>
              </ul>
              <p className="success-spam">
                <strong>Controlla anche spam, promozioni e offerte</strong> della tua casella: a volte le nostre
                comunicazioni finiscono lì. Se non trovi nulla entro 24 ore, scrivici a <strong>{supportEmail}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="inner">
          <div className="footer-top-bar">
            <div className="footer-brand-row">
              <img className="footer-logo" src="/logo/m-w.png" alt="Morfeus Hub" />
              <span className="footer-site">morfeushub.com</span>
            </div>
            <nav className="footer-nav">
              <a href="https://www.morfeushub.com/it/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="https://www.morfeushub.com/it/cookies" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
            </nav>
          </div>
          <p className="footer-disc">
            <strong>Disclaimer:</strong> I prodotti e servizi venduti su questo sito non costituiscono proiezione,
            promessa o garanzia di guadagno. I risultati individuali possono variare e dipendono dall'impegno,
            dall'esperienza e dalle condizioni individuali di ciascun partecipante. Claude è un marchio di Anthropic,
            PBC. Questo corso non è affiliato a, sponsorizzato da, o approvato da Anthropic. Questo contenuto rispetta le
            linee guida AGCM in materia di correttezza pubblicitaria e pratiche commerciali.
          </p>
          <div className="footer-bottom">
            <p>Morfeus Hub S.r.l. · P.IVA 14209210963 · Milano, Italia</p>
            <p>© 2026 Morfeus Hub S.r.l. · Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
