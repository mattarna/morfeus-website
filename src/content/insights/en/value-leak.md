---
title: "What a Value Leak is, and what it costs you every month"
slug: "value-leak"
metaTitle: "What is a Value Leak | Morfeus"
metaDescription: "Value Leak: the invisible margin losses hiding inside a company's operations. What they are, how to find them and how to put a number on them."
category: "Margin & ROI"
tags: ["Value Leak", "margin", "SMB"]
topicTags: ["Value Leak", "Margin", "SMB", "ROI"]
author: "Matteo Arnaboldi"
authorRole: "CEO & Co-Founder, Morfeus"
datePublished: "2026-06-12"
dateModified: "2026-07-09"
readingTime: "7 min"
targetQuery: "where is my company losing margin"
tldr: "A Value Leak is an invisible margin loss that settles into your processes while the company grows: a number that looks fine (revenue) hides a real loss (margin, cash). You find it by mapping processes department by department, and you size it in euros with the ROIometer. Recovering it is not cost cutting: it is structural margin recovery."
relatedTerms: ["Value Leak", "MARF", "Value Report", "Margin Recovery"]
internalLinks: ["/roiometro", "/marf", "/insights/value-report", "/insights/dentro-marf"]
faq:
  - q: "Is a Value Leak the same thing as a cost?"
    a: "No. A cost is visible and planned for: it sits in the accounts with a name and a line of its own. A Value Leak is an invisible, unaccounted margin loss hidden inside the processes. Nobody budgets for it because nobody sees it until somebody goes looking."
  - q: "How do you put a number on it?"
    a: "By mapping the process department by department and measuring time, errors and delays against real data, not perceptions or rough estimates. The ROIometer guides that calculation and returns a monthly figure you can defend in front of a CFO."
  - q: "Does recovering margin mean laying people off?"
    a: "No. It means removing structural waste, meaning repetitive work, rework and data that does not travel between departments, and giving those hours back to the work that generates value. Productive capacity stays intact. What changes is where people's time goes."
sources: []
schema: [Article, FAQPage, BreadcrumbList]
coverKind: "forbice"
---

I have lost count of how many times, in a first diagnostic call with a company, I hear the same sentence: "revenue is growing, so we're fine". It is the most comfortable assumption there is, and it is also the most wrong. Revenue is a number that goes up when you sell more. It says nothing about how much of that revenue actually stays in the company once you have paid for errors, rework and hours burned on things nobody ever decided to do by hand forever.

The signal that should set off the alarm is not a number going down. It is one number going up while another one, margin, stays flat or drifts slowly downwards, with nobody able to point at exactly where. That vague feeling, "we're losing something somewhere but I don't know where", has a precise name at Morfeus: Value Leak.

## Why margin degrades without anyone noticing

In any company with processes, three forces work against profit, quietly: errors that multiply with volume, time spent on repetitive work, and data fragmented across departments that do not talk to each other. Growth amplifies them, but it does not create them: they are there when the numbers stand still too. None of them shows up as a single line in the accounts. Together they erode margin.

These are Value Leaks: the losses smaller companies do not see because they have no name and no number. And what has no number does not get managed.

<figure class="figure">
  <div class="ft">The margin scissor</div>
  <h4>Revenue climbs. Margin does not follow.</h4>
  <svg class="chart" viewBox="0 0 720 340" role="img" aria-label="Chart: revenue grows while margin lags behind; the widening gap is the Value Leak">
    <line class="gridln" x1="60" y1="46" x2="60" y2="280"/>
    <line class="axis" x1="60" y1="280" x2="650" y2="280"/>
    <path class="leak" d="M60,245 C200,225 320,205 600,170 L600,52 C300,150 200,210 60,245 Z"/>
    <path class="lineM" d="M60,245 C200,225 320,205 600,170"/>
    <path class="lineR" d="M60,245 C200,210 300,150 600,52"/>
    <text class="lblR" x="612" y="56">Revenue</text>
    <text class="lblM" x="612" y="174">Margin</text>
    <text class="lblK" x="392" y="138">Value Leak</text>
    <text x="350" y="312" text-anchor="middle">over time →</text>
  </svg>
  <div class="legend"><span><i class="r"></i>Revenue</span><span><i class="m"></i>Margin</span><span><i class="k"></i>Value Leak (the gap)</span></div>
  <figcaption>The longer it goes unclosed, the wider the scissor opens: margin stays behind. That gap, invisible in the accounts, is the <b>Value Leak</b>. Illustrative chart.</figcaption>
</figure>

<blockquote class="pquote">"We don't ask how to use AI. We ask where you are losing value, and then we build the system that recovers it."</blockquote>

## The problem, in euros

A case I tell often, because it makes the concept concrete instead of theoretical, involves an accounting firm that handles the books for a client company. Looking at the management system, everything seemed in order: invoiced revenue growing, invoices going out regularly, clients billed on time. On paper, no problem at all.

<div class="logbox">
  <div><span class="p">$ roiometer --department quoting</span></div>
  <div><span class="d">03:47 · analysing process...</span></div>
  <div><span class="g">▸ estimated monthly loss · €31,400/month</span></div>
  <div><span class="d">03:47 · recoverable · +68%</span></div>
</div>

<p class="callout-txt">With the ROIometer the conversation moves from "what does Morfeus cost" to <b>"what is the problem costing you"</b>: the decision maker sees the monthly loss and the recoverable share straight away. Illustrative example.</p>

The problem, in the Brainiac case, was that this number measured what had been invoiced, not what had been collected. The invoice went out, entered the system, and stayed there. Nobody reconciled it against the payment that actually landed in the bank. The management system kept saying "revenue is growing" while real cash told a different story, made of late collections, forgotten clients and an apparent margin that never turned into available liquidity.

## How you find a Value Leak

You start from the real processes, not from the tools. For each department you look at where people spend time on repetitive work, where errors cost rework, and where data stops instead of flowing. Then you translate all of it into the one unit a board understands: euros per month.

<div class="drivers">
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>
    <h5>People</h5><p>Hours in repetitive work that a system could absorb.</p>
  </div>
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v4M12 17h.01"/></svg>
    <h5>Errors</h5><p>Corrections, delays and rework that grow with volume.</p>
  </div>
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3.5" width="7" height="7" rx="1.5"/><rect x="14" y="6" width="6.5" height="6.5" rx="1.5"/><rect x="6" y="14.5" width="6.5" height="6.5" rx="1.5"/></svg>
    <h5>Data</h5><p>Decisions made late because the information is fragmented.</p>
  </div>
</div>

### Where they hide, by type of loss

The most common Value Leaks in a company that is scaling, with the signal that gives each one away and the typical order of magnitude. The numbers are indicative: the real value is measured on your processes.

<div class="gtable">
  <div class="cap">Typical Value Leaks · indicative order of magnitude</div>
  <table class="rng">
    <thead><tr><th>Type of loss</th><th>The signal</th><th>Typical impact</th></tr></thead>
    <tbody>
      <tr><td>Manual repetitive work</td><td class="note-td">People redoing the same operations every day</td><td class="v">hours/week per department</td></tr>
      <tr><td>Errors and rework</td><td class="note-td">Corrections, returns and delays growing with volume</td><td class="v">1-5% of revenue</td></tr>
      <tr><td>Slow or imprecise quoting</td><td class="note-td">Margins estimated by hand, offers sent late</td><td class="v">margin points lost</td></tr>
      <tr><td>Data fragmented across departments</td><td class="note-td">Decisions made late or blind</td><td class="v">opportunity cost</td></tr>
    </tbody>
  </table>
</div>

<div class="callout-txt"><b>A note on method.</b> We do not multiply percentages on a slide. We measure the real process, department by department, and report a number that holds up.</div>

## Recovering margin is not cutting costs

Cost cutting removes resources, and often removes capacity with them. *Margin Recovery* does the opposite: it leaves productive capacity intact and removes the structural waste, building AI systems that prevent the loss instead of chasing it. It is a recovery that stays, not a one-off saving.

Month after month, that recovery shows up in the [Value Report](/insights/value-report): not a list of activities carried out, but the value actually generated in euros, the same unit used to size the Value Leak in the first place. The tool that lets us do this, inside the company, is [MARF](/marf).

<div class="inlinecta">
  <div><h3>How much are you losing, in euros?</h3><p>Try the ROIometer: pick a department and see the estimated monthly loss.</p></div>
  <a class="btn btn-1" href="/roiometro">Try the ROIometer</a>
</div>

## In short

What companies in scaling are missing is not revenue. It is the margin nobody is measuring, and the real cash nobody is reconciling against what the management system claims. The first step is not buying a tool: it is admitting that a number which looks fine can be hiding a loss, and going to find it before somebody else finds it for you, at a worse moment.
