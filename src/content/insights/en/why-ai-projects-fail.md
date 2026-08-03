---
title: "Why 95% of AI projects fail (and how to be in the 5% that works)"
slug: "why-ai-projects-fail"
metaTitle: "Why 95% of AI projects fail | Morfeus"
metaDescription: "95% of enterprise AI projects produce no results (MIT, 2025). It isn't the models' fault: here are the real causes and how to be in the 5% that works."
category: "Margin & ROI"
tags: ["AI adoption", "ROI", "AI projects"]
topicTags: ["MIT","ROI","Adoption","POC","News"]
author: "Matteo Arnaboldi"
authorRole: "CEO & Co-Founder, Morfeus"
datePublished: "2026-06-29"
dateModified: "2026-07-09"
readingTime: "7 min"
targetQuery: "why do ai projects fail"
tldr: "MIT NANDA measured that 95% of enterprise generative AI projects produce no measurable impact on the P&L (The GenAI Divide, 2025). This is not a model problem: it is a problem of integration into processes, of daily monitoring, and of who answers for the results. Projects built with specialised partners succeed roughly 67% of the time, against a third for purely internal builds. The 5% that works starts from a bounded scope, a problem measured in euros, and one person who follows it every day."
relatedTerms: ["Value Leak", "ROIometer", "Pilot → Retainer", "AI Champion", "MARF"]
internalLinks: ["/roiometro", "/insights/value-leak", "/marf", "/ai-champion", "/metodo"]
faq:
  - q: "What do AI project failures actually come down to?"
    a: "Not model quality, which today is high. They come down to how far AI gets integrated into the real processes: a clear scope, someone responsible day to day, constant monitoring. Without those three, even the best model stays a demo."
  - q: "Is it better to build AI in-house or with a partner?"
    a: "The MIT research shows that solutions built with specialised partners succeed roughly 67% of the time, against a third for purely internal builds. Not because the partner has a better model, but because they have already seen where the integration breaks."
  - q: "How do I know if my AI project is about to fail?"
    a: "Typical signals: nobody can say which number is supposed to improve, there is no person checking what the system answers every day, the project has been stuck at pilot stage for months, and its fate is decided by IT alone, without the operating departments."
sources:
  - title: "MIT NANDA, The GenAI Divide: State of AI in Business 2025 (via Fortune)"
    url: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/"
schema: [Article, FAQPage, BreadcrumbList]
coverKind: "loop-spezzato"
---

**In brief.** MIT NANDA measured that 95% of enterprise generative AI projects produce no measurable impact on the P&L. This is not a model problem: it is a problem of integration into processes, of daily monitoring, and of who answers for it. Companies that build with a specialised partner succeed roughly 67% of the time, against a third for purely internal builds. The 5% that works starts from a bounded scope, a problem measured in euros, and one person who follows it every day.

## A pilot that worked beautifully, until it answered a real customer

A financial institution with a few thousand employees had just finished rolling out AI agents across the whole organisation. The project had come down from above, sponsored at board level, and the demo had been flawless: fast answers, correct tone, use cases covered one after another. Nobody in the room had anything to object to.

Then somebody noticed an answer that did not add up. Not a spectacular error, the kind of imprecision that goes unnoticed until it reaches the wrong customer at the wrong moment. That is when the question nobody had asked before launch surfaced: who checks, every day, what these agents actually answer? The answer was nobody. The pilot technically worked. The process that was supposed to contain it, monitor it and correct it did not exist.

## The pattern has a name, and MIT measured it at scale

What we saw in that case is not an isolated incident. It is exactly the pattern that *The GenAI Divide: State of AI in Business*, the 2025 research from MIT's NANDA initiative, measured across 300 public deployments, 150 manager interviews and a survey of 350 employees: only 5% of enterprise generative AI projects lead to real acceleration in revenue or margin. The remaining 95% leave no measurable impact on the P&L.

<figure class="figure">
  <div class="ft">The partner vs in-house gap</div>
  <h4>Building alone fails two times out of three.</h4>
  <svg class="chart" viewBox="0 0 640 320" role="img" aria-label="Bar chart: AI projects built with a specialised partner succeed in 67% of cases, against 33% for in-house builds">
    <line class="gridln" x1="80" y1="60" x2="80" y2="260"/>
    <line class="gridln" x1="80" y1="60" x2="600" y2="60"/>
    <line class="gridln" x1="80" y1="160" x2="600" y2="160"/>
    <line class="axis" x1="80" y1="260" x2="600" y2="260"/>
    <text x="72" y="64" text-anchor="end" font-size="11">100%</text>
    <text x="72" y="164" text-anchor="end" font-size="11">50%</text>
    <text x="72" y="264" text-anchor="end" font-size="11">0%</text>
    <rect class="lineM" x="160" y="126" width="120" height="134" fill="currentColor" opacity="0.35"/>
    <rect class="lineR" x="380" y="192" width="120" height="68" fill="currentColor" opacity="0.9"/>
    <text class="lblR" x="220" y="118" text-anchor="middle" font-weight="700">67%</text>
    <text class="lblM" x="440" y="184" text-anchor="middle" font-weight="700">33%</text>
    <text x="220" y="282" text-anchor="middle" font-size="12">With a specialised partner</text>
    <text x="440" y="282" text-anchor="middle" font-size="12">In-house build</text>
    <text x="340" y="308" text-anchor="middle" font-size="11" opacity="0.7">Success rate of enterprise generative AI projects</text>
  </svg>
  <div class="legend"><span><i class="r"></i>Specialised partner</span><span><i class="m"></i>In-house build</span></div>
  <figcaption>Source: MIT NANDA, <i>The GenAI Divide 2025</i>, across 300 deployments. It is not the model that makes the difference: it is having already seen where the integration breaks.</figcaption>
</figure>

The figure made noise because it sounds like a verdict on the technology. Read from inside a real project, it says something else: failure is not a rare, unpredictable event, it is almost always the same thing repeating. MIT calls it the *learning gap*, the distance between a model that answers well in the lab and an organisation that knows what to do with it every day.

## Why it is not the models' fault

The common reflex, faced with an AI project that produces no results, is to blame the model: it does not understand enough, it gets too much wrong, it is not mature yet. The research contradicts that reading. General-purpose models work today, and in the lab they behave well nearly all the time. What is missing is not in the model. It is between the model and the actual work.

<blockquote class="pquote">"The pilot technically worked. The process that was supposed to contain it, monitor it and correct it did not exist."</blockquote>

The bank case shows it well: the technology did not need to be better. It needed a defined scope (which questions it can handle alone, which it cannot), somebody reading a sample of conversations every week, and a clear criterion for when to step in. Without those three things, even the best model in the world produces the same outcome: it works in the demo, it breaks on the first anomalous case, and nobody notices until it is already a problem.

## The difference shows in the scope, not in the size

Last year we worked with a construction general contractor of about 50 people that wanted to automate one single process: sending and tracking customer quotes. No all-encompassing agent, no ambition to cover every department. One process, acceptance criteria defined before starting, and one internal person who checked every week that the system did exactly what it was supposed to do. Today that process runs, it measures the time saved, and nobody in the company wonders whether it "works": they see it in the numbers.

The difference between this case and the bank is not the size of the company, nor the budget, nor the sophistication of the model used. It is that in the second case the scope was clear from day one, and somebody answered for it. That is exactly the line between the 5% and the 95% described by MIT, seen up close: the winner is not whoever has the most advanced AI, it is whoever set up better what it has to do, who checks it, and how the result gets measured.

## How to set up a project so it lands in the 5%

The way we work at Morfeus exists precisely to avoid the mistake we have seen repeat: starting from the tool instead of the problem, staying in demo, letting the system live without anyone answering for it.

- **Diagnosis.** Before talking technology, we measure where the company is losing value every day. With the [ROIometer](/roiometro) that feeling becomes a number, and the points of loss become [Value Leaks](/insights/value-leak) quantified in euros.
- **System.** We build on a bounded scope, in production from day one, not in an isolated demo. The system sits on [MARF](/marf), the infrastructure that stays in the company and extends over time instead of starting from zero with every project.
- **Value.** Every month a Value Report shows what the system actually produced, in euros, not in slides.
- **Autonomy.** We train an [AI Champion](/ai-champion) per department: the person who checks, corrects and evolves the system every day, so the capability stays inside the company the day after we leave.

<div class="gtable">
  <div class="cap">The five most common causes of failure, and the Morfeus countermeasure</div>
  <table class="rng">
    <thead><tr><th>Cause of failure</th><th>The signal inside the company</th><th class="v">Countermeasure</th></tr></thead>
    <tbody>
      <tr><td>No defined scope</td><td class="note-td">"Let's do AI everywhere", no priority use case</td><td class="v">One process, acceptance criteria</td></tr>
      <tr><td>Nobody answering day to day</td><td class="note-td">The system runs, but it belongs to no one</td><td class="v">Departmental AI Champion</td></tr>
      <tr><td>Zero monitoring of answers</td><td class="note-td">Nobody reads what the system tells customers</td><td class="v">Weekly review on a sample</td></tr>
      <tr><td>Technical metrics, not euros</td><td class="note-td">"92% accuracy" but the CFO cannot see the impact</td><td class="v">Monthly Value Report</td></tr>
      <tr><td>Project handed down by IT</td><td class="note-td">The operating departments were not in the room</td><td class="v">Diagnosis with the people who live the process</td></tr>
    </tbody>
  </table>
</div>

The thread running through these four steps is the same one we saw missing in the bank case and present in the general contractor: a clear scope, and somebody taking care of it every day.

## In short

The 95% MIT measured is not a verdict on the technology, it is a diagnosis of method. A pilot can be technically flawless and still fail, if nobody integrates it into the processes and nobody answers for it every day. The question to start from is not which AI to buy, but where you are losing value today, and who will be checking it tomorrow.

<div class="inlinecta">
  <div><h3>Want to know which side you are on?</h3><p>In a few minutes the ROIometer tells you what a process costs you today and how much you can recover. It is the first step to staying out of the 95%.</p></div>
  <a class="btn btn-1" href="/roiometro">Try the ROIometer</a>
</div>
