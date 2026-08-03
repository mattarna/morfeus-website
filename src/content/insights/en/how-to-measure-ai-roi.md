---
title: "How to measure AI ROI (beyond the POC)"
slug: "how-to-measure-ai-roi"
metaTitle: "How to measure AI ROI | Morfeus"
metaDescription: "The problem isn't that AI doesn't pay off: it's that almost nobody decides up front what 'paid off' means. How ROI is actually measured, with McKinsey 2025 data."
category: "Margin & ROI"
tags: ["AI ROI", "measurement", "Value Report"]
topicTags: ["ROI", "Measurement", "McKinsey", "Value Report", "News"]
author: "Matteo Arnaboldi"
authorRole: "CEO & Co-Founder, Morfeus"
datePublished: "2026-07-08"
dateModified: "2026-07-09"
readingTime: "8 min"
targetQuery: "how to measure ai roi"
tldr: "AI ROI is not measured by counting hours saved or active licences: that is a usage criterion, not a value criterion. It is measured by defining, before you start, a single number in euros to verify every month. McKinsey (State of AI 2025, 1,993 companies) confirms the pattern from the outside: 88% of companies use AI regularly, but only 5.5% report real financial impact. The gap is almost always the same one: nobody decided up front what to count."
relatedTerms: ["Value Report", "ROIometer", "Value Leak", "MARF"]
internalLinks: ["/roiometro", "/insights/value-leak", "/insights/why-ai-projects-fail", "/marf"]
faq:
  - q: "Why do so many companies use AI without seeing a return?"
    a: "According to McKinsey, 88% of companies use AI regularly in at least one function but only 5.5% see real financial impact. The gap opens before the project starts: what gets measured is how much a tool is used, not how much margin it moved, because nobody defined the value criterion in advance."
  - q: "Which indicators should you watch to measure AI ROI?"
    a: "One criterion, in euros, defined before you begin: how much margin the system recovered, verified every month. Not the number of active licences, not self-reported hours of usage, not how satisfied the team feels."
  - q: "Does a pilot that works in a demo guarantee ROI in production?"
    a: "No. Only about a third of the companies that took AI to pilot stage managed to scale it into production (McKinsey). ROI is measured on the system that runs every day inside the real process, not on the demo that impressed the room."
sources:
  - title: "McKinsey, The state of AI in 2025: Agents, innovation, and transformation"
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
schema: [Article, FAQPage, BreadcrumbList]
coverKind: "forbice"
---

When a client tells me "AI isn't paying off the way it promised", the first thing I ask is not which model they use or how much they spent. I ask: "what did you mean by 'paying off', and when did you decide it?" In most cases the answer is a silence, followed by a number improvised on the spot. Hours saved, maybe. How many people open the tool every day, perhaps. Almost never a euro.

**In brief.** AI ROI is not measured by counting hours saved or active licences: that is a usage criterion, not a value criterion. It is measured by defining, before you start, a single number in euros to verify every month. McKinsey ([State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai), 1,993 companies) confirms the pattern from the outside: 88% of companies use AI regularly, but only 5.5% report real financial impact. The gap is almost always the same one: nobody decided up front what to count.

## The moment it stops being up for discussion

In the projects we have run for years there is a turning point that comes back the same way, client after client. It is not when the system goes live, and it is not even when it works well technically. It is the month the client stops saying "how many hours did it save us" and starts saying "how many euros did it recover". From that moment the project stops, almost always, being a line item up for debate at renewal.

This is not a marketing trick: it is a change of unit. Hours saved are an estimate, usually an optimistic one, that nobody really checks after the first month. Euros recovered are a number you can verify, put next to the P&L and defend in front of a CFO. Whoever moves from the first to the second stops having to "convince" anyone that AI works: they demonstrate it.

That is why, before starting on any system, we define a [Value Leak](/insights/value-leak) with the client: the precise point where the company is losing margin today, quantified in euros before the tool is even chosen. This is not bureaucracy. It is the only thing that makes it possible, twelve months later, to answer "what did it return" without inventing a number on the spot.

## What McKinsey says, and why it confirms the pattern

The [State of AI 2025 report by McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai), run across 1,993 companies, puts a precise number on something we have been seeing in the field for a while: 88% of companies report regular AI use in at least one function. Only 5.5% report real financial impact, measurable at P&L level.

One company in twenty sees the return. The other nineteen are paying for something they cannot quantify, not because the tool does not work, but because they never defined what would have to happen for them to be able to say so.

<figure class="figure">
  <div class="ft">The return funnel · McKinsey 2025</div>
  <h4>Out of 100 companies using AI, 6 report real financial impact.</h4>
  <svg class="chart" viewBox="0 0 720 300" role="img" aria-label="Funnel: 88% use AI, 39% report measurable EBIT impact, only 5.5% report real financial impact">
    <line class="gridln" x1="60" y1="40" x2="60" y2="250"/>
    <line class="axis" x1="60" y1="250" x2="680" y2="250"/>
    <path class="leak" d="M60,80 L620,80 L470,170 L200,170 Z M200,170 L470,170 L400,230 L270,230 Z"/>
    <path class="lineR" d="M60,80 L620,80"/>
    <path class="lineM" d="M270,230 L400,230"/>
    <text class="lblR" x="640" y="84">88%</text>
    <text class="lblM" x="480" y="174">39%</text>
    <text class="lblK" x="410" y="234">5.5%</text>
    <text x="335" y="100" text-anchor="middle" font-size="12">use AI regularly</text>
    <text x="335" y="190" text-anchor="middle" font-size="11">measurable EBIT impact</text>
    <text x="335" y="278" text-anchor="middle" font-size="11">real financial impact · 1 in 20</text>
  </svg>
  <div class="legend"><span><i class="r"></i>Adoption</span><span><i class="m"></i>EBIT impact</span><span><i class="k"></i>Real ROI</span></div>
  <figcaption>The gap is not technological. It runs through the value criterion decided, or not decided, before starting. Source: McKinsey, State of AI 2025 (1,993 companies).</figcaption>
</figure>

Looking deeper into the data, only 39% of the companies surveyed report measurable impact at company EBIT level. At single-function level the picture changes: software engineering, manufacturing and IT report cost reductions between 10% and 20%, marketing and product development report revenue increases above 10%. So the ROI almost always exists. It just stays locked inside the department that generated it, because nobody aggregates it into a single number that is comparable over time, the kind of number we would use to judge any other investment in the company.

<div class="gtable">
  <div class="cap">AI impact by function · McKinsey State of AI 2025</div>
  <table class="rng">
    <thead><tr><th>Function</th><th>Type of impact</th><th>Reported range</th></tr></thead>
    <tbody>
      <tr><td>Software engineering</td><td class="note-td">Operating cost reduction</td><td class="v">10-20%</td></tr>
      <tr><td>Manufacturing</td><td class="note-td">Operating cost reduction</td><td class="v">10-20%</td></tr>
      <tr><td>IT</td><td class="note-td">Operating cost reduction</td><td class="v">10-20%</td></tr>
      <tr><td>Marketing</td><td class="note-td">Revenue increase</td><td class="v">&gt;10%</td></tr>
      <tr><td>Product development</td><td class="note-td">Revenue increase</td><td class="v">&gt;10%</td></tr>
      <tr><td>Company EBIT (aggregate)</td><td class="note-td">Impact reported at P&amp;L level</td><td class="v">39% of companies</td></tr>
    </tbody>
  </table>
</div>

## Why usage is not the same thing as measurement

The most common cause is not model quality, which today is generally high for the kind of work companies ask of it. It is that most organisations measure adoption, not value: how many people use the tool, how many licences are active, how much time is spent interacting with AI. None of those numbers tells you whether the company's margin moved by a single euro.

It is the difference between a usage dashboard and a value statement. The first tells you how much the tool works. The second tells you how much it returned. They are two different questions, and answering the first one well guarantees nothing about the second: you can have very high adoption and a return of zero, which is exactly where the majority of the companies McKinsey surveyed find themselves.

## The pilot that never reaches production

There is a second cause, connected to the first: only about a third of the companies that took AI to pilot stage managed to scale it into production. The other two thirds are stuck in an intermediate phase where the system exists, gets shown in a demo that impresses, but never really enters the daily workflow. [The same pattern shows up in the MIT research on AI project failure](/insights/why-ai-projects-fail): a pilot applauded in a meeting is not a system that generates value. Those are two different things, and they are easy to confuse.

The companies that get past this point have three things in common, according to the same report: real leadership involvement, a goal tied to a business indicator defined before starting, and a genuine redesign of the process around the new tool rather than a tool bolted on top of the existing flow. Only 21% of companies reach that level of redesign. It is the difference between measuring a return and measuring only usage, the same distinction again.

<div class="drivers">
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.2"/><path d="M4.5 20c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5"/></svg>
    <h5>Leadership inside</h5><p>Not a formal sponsor: a decision maker who owns the number month after month.</p>
  </div>
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>
    <h5>KPI up front</h5><p>One value criterion in euros, decided before a line of code is written.</p>
  </div>
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h10M4 12h16M4 17h7"/><path d="M17 5l3 2-3 2M14 15l3 2-3 2"/></svg>
    <h5>Redesigned process</h5><p>The system goes inside the flow, not on top of it. Only 21% actually get there.</p>
  </div>
</div>

## How you actually measure it: one number, not a dashboard

AI ROI is not measured with a dashboard of usage metrics. It is measured with a single value criterion, defined before the project starts rather than reconstructed afterwards to justify it. In practice: how much margin does this system recover every month, against a starting point already quantified as a measured Value Leak.

This is where the [Value Report](/insights/value-report) comes from: the monthly statement with which we answer "what did it return", not a list of activities carried out but the value generated in euros, verified month on month. Across the projects we have run since 2023, this criterion has let us account for more than 4 million euros of recovered margin across over 60 systems in production. That is not a slide number: it is the sum of what happens when, before writing a line of code, you decide what you are going to measure.

<div class="logbox">
  <div><span class="p">$ roiometer --criterion "margin recovered per month" --baseline value_leak</span></div>
  <div><span class="d">t0 · value leak measured · €48,200/month</span></div>
  <div><span class="d">m+3 · system in production · monthly check active</span></div>
  <div><span class="g">▸ value report · margin recovered · €31,700/month · +66%</span></div>
</div>

<p class="callout-txt"><b>The change of unit.</b> From a usage dashboard (licences, hours, clicks) to a value statement (euros recovered month on month). Illustrative example on a real baseline.</p>

## In short

AI in business today is used almost everywhere and pays off rarely. The difference between ending up in the 5.5% and staying outside it is not the technology chosen: it is having defined, before starting, a single value criterion in euros, verified every month. Whoever measures usage knows how much the tool works. Whoever measures ROI knows how much it returned, and stops having to defend it.

<div class="inlinecta">
  <div><h3>What did your AI project return, in euros?</h3><p>Try the ROIometer: define in a few minutes the value criterion to verify every month, before you even choose the tool.</p></div>
  <a class="btn btn-1" href="/roiometro">Try the ROIometer</a>
</div>
