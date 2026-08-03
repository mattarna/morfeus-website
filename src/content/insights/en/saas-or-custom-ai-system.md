---
title: "SaaS or a custom AI system: what to choose (and when each one wins)"
slug: "saas-or-custom-ai-system"
metaTitle: "SaaS or custom AI: what to choose | Morfeus"
metaDescription: "Buy an AI tool on subscription or build a custom system? The real difference between SaaS and embedded AI, with a real case, so you decide without getting it wrong."
category: "Adoption"
tags: ["SaaS", "build vs buy", "custom AI"]
topicTags: ["Build vs Buy","SaaS","MARF","Architecture","Data"]
author: "Matteo Arnaboldi"
authorRole: "CEO & Co-Founder, Morfeus"
datePublished: "2026-06-29"
dateModified: "2026-07-09"
readingTime: "7 min"
targetQuery: "saas vs custom ai system for business"
tldr: "A SaaS dashboard can show green numbers while a real problem is burning cash, because it reads one channel and does not talk to the company's other systems. A custom system, embedded in your data, costs more up front and needs a partner, but it sees what SaaS cannot see by construction: where the data intersects. Practical rule: SaaS for standard processes, a custom system for the process where you need to read several systems together or where your competitive difference is at stake."
relatedTerms: ["MARF", "Value Leak", "ROIometer"]
internalLinks: ["/marf", "/roiometro", "/insights/how-to-integrate-ai-into-workflows"]
faq:
  - q: "What is the difference between an AI SaaS and a custom system?"
    a: "A SaaS is a subscription product, identical for every customer, that reads data inside its own fence. A custom system is built on your data and processes, lives inside your infrastructure and can cross information living in different systems. The first is fast and standard, the second is specific and compounds."
  - q: "When is SaaS the right call and when is a custom system?"
    a: "SaaS for standard, non-strategic processes where an off-the-shelf solution looking at one piece of the company is enough. A custom system when the decision depends on data living across several different systems, or where the process is what makes your competitive difference."
  - q: "Does a custom system make sense for a smaller company?"
    a: "Yes, but selectively: not for the whole company, only for the process where SaaS would hide the real problem from you. For everything else SaaS stays the sensible choice. The decision is made process by process, not in one block."
sources: []
schema: [Article, FAQPage, BreadcrumbList]
coverKind: "spark-cross"
---

**In brief.** A SaaS dashboard can show green numbers while a real problem is burning cash, because it reads one channel and does not talk to the company's other systems. A custom system, embedded in your data, costs more up front and needs a partner, but it sees what SaaS cannot see by construction: where the data intersects. Practical rule: SaaS for standard processes, a custom system for the process where you need to read several systems together or where your competitive difference is at stake.

A business owner running an e-commerce opens their marketing dashboard every morning. Revenue growing. ROAS on the main campaign above the threshold they set themselves. The number that counts, the one the tool puts in front of them in green, says everything is fine. Meanwhile the bank account tells a different story: cash is draining month after month, and nobody can explain why, given that "the campaign is doing well".

This is not a broken dashboard. It is a dashboard doing exactly its job: looking at one channel, with that channel's metrics. The problem is that the hole does not live in that channel. It lives in the intersection between ad spend, cost per sale and real margin, data scattered across different systems that do not talk to each other. A marketing analytics SaaS, by construction, cannot show you something it does not have inside its own data fence.

This is the point the question "do I buy a SaaS or have a custom system built" too often skips. It gets treated as a question of price and time to activate, when the real question is a different one: does the problem I have to solve live inside a single system, or does it cross several systems in the same company?

## Why a SaaS can tell you everything is fine when it is not

A SaaS (software as a service) is a subscription product, hosted by the vendor, identical for every customer who buys it. It is fast to activate, cheap at the start, and maintenance is the seller's problem. For a great many processes it is exactly the right choice, and we will say so again later because it is true.

The limit is not the quality of the tool. It is the architecture. A SaaS is designed to do one thing well inside its own data boundary: ad campaigns, support tickets, accounting. When the problem you are trying to solve needs to read data living in two or three different systems together, at the same moment, that SaaS simply does not have access to half the information it would need. This is not vendor laziness: no generic product can deeply integrate your accounting, your warehouse, your orders and your campaigns, because each of those lives in a different system and often with a different vendor.

The result is a dashboard that is ready and tested, but ready and tested not to see exactly the kind of problem that matters most in that company.

<blockquote class="pquote">"The SaaS is not broken: it does exactly its job, looking at one channel. The problem is that the hole lives in the intersection between different systems."</blockquote>

## From the workbench: the campaign that was eating the cash

We saw this pattern with a MARF client, a digital e-commerce business, a company of between 5 and 50 people. The SaaS dashboard they used showed revenue and gross ROAS per campaign, and on that metric the main campaign looked fine: revenue growing, ROAS above the internal threshold. No alarm, no red numbers.

<div class="logbox">
  <div><span class="p">$ saas-dashboard --main-campaign</span></div>
  <div><span class="d">reads: ad spend, revenue, gross ROAS</span></div>
  <div><span class="g">▸ status · GREEN · ROAS above threshold</span></div>
  <div><span class="d">does not read: returns, shipping, order handling, real margin</span></div>
  <div><span class="g">▸ reality · the campaign being scaled burned more cash than it generated</span></div>
</div>

<p class="callout-txt"><b>The blind spot.</b> This is not a SaaS bug: it is its architecture. The data needed to see the problem lived in three different systems (ads platform, e-commerce, order management) that no standard product is built to make talk to each other.</p>


The problem is that gross ROAS per campaign is not the same thing as real margin per channel. What was needed was a system reading together, on the same plane, ad spend, actual cost per sale (including returns, shipping, order handling) and margin across all channels at once. When that reading was built, it turned out they were scaling precisely the campaign that, channel by channel, ate more cash than it generated. The SaaS would never have shown it: not because it was a bad tool, but because that data lived in different systems of the same company, and no standard product is built to make them talk. That is why an infrastructure like [MARF](/marf) is not an additional product sitting next to the SaaS you already use: it is what goes and reads exactly the blind spot a generic tool, by construction, cannot see.

## What a custom AI system actually is

A custom system is not "a more expensive SaaS that takes longer to switch on". It is a different thing: it is built on your data and your processes, it lives inside your infrastructure instead of outside it, and it integrates at the points where your systems currently do not talk. You do not use it like an app: you install it like an infrastructure that collects data where it is created, and that with every project becomes better at reading your specific company rather than a typical one.

That means a higher initial investment and a partner who builds and maintains it with you. In exchange you get two things a SaaS cannot give you by definition: control of your data stays internal, and the system improves over time, becoming tailored to you and therefore hard for a competitor buying the same SaaS you buy to replicate.

## When SaaS stays the right choice

That said, it would be dishonest to present SaaS as the enemy. For standard processes, the ones that do not differentiate you from a competitor and where data does not need to cross with anything else, SaaS almost always stays the sensible choice: it costs less, it activates in days, and there is no sense building a custom infrastructure for a task that is identical at every company in your sector. The risk is not using SaaS. The risk is using only SaaS, including on the process where the real problem hides precisely in the intersection between different systems, and finding out when the bank balance has already spoken more clearly than the dashboard.

## The practical rule for deciding

You do not choose in one block, you choose process by process. Two questions help do it with some rigour:

1. **Does this process's problem live inside one system, or does it cross several systems in your company?** If it crosses several systems, a SaaS structurally cannot see all of it: this is where a custom system makes sense.
2. **How strategic is this process?** If it is a common, non-differentiating function, SaaS is perfectly fine. If it is the process where your margin or your competitive difference is at stake, it is worth building.

In practice, most healthy companies end up with a mix: SaaS for the standard processes, a custom system for the few points where the data intersects and where a mistake genuinely costs, as in the case of the campaign that looked healthy and was not.

<div class="gtable">
  <div class="cap">SaaS, custom system, hybrid · when each one wins</div>
  <table class="rng">
    <thead><tr><th>Dimension</th><th>Subscription SaaS</th><th>Custom AI system</th></tr></thead>
    <tbody>
      <tr><td>Data perimeter</td><td class="note-td">Reads only inside its own fence</td><td class="v">crosses several systems</td></tr>
      <tr><td>Processes covered</td><td class="note-td">Standard, identical at every company in the sector</td><td class="v">the process that differentiates you</td></tr>
      <tr><td>Activation</td><td class="note-td">Days, maintenance on the vendor</td><td class="v">a project with a partner</td></tr>
      <tr><td>Cost</td><td class="note-td">Low at the start, recurring fee</td><td class="v">up-front investment, compounds</td></tr>
      <tr><td>Data control</td><td class="note-td">Leaves your infrastructure</td><td class="v">stays internal</td></tr>
      <tr><td>Competitive advantage</td><td class="note-td">None: your competitor buys it too</td><td class="v">tailored to you, not replicable</td></tr>
    </tbody>
  </table>
</div>


## Where to start

Before choosing build or buy, the more useful question is a different one: which process, today, is losing you value without showing up on your current dashboard? The [ROIometer](/roiometro) is designed exactly for that: it puts a number on that feeling, before you even discuss buying a tool or building one. That is where the SaaS-or-custom choice stops being a theoretical debate and becomes a decision about a precise number.

<div class="inlinecta">
  <div><h3>Before buying or building, measure</h3><p>The ROIometer tells you, in euros per month, what the process where SaaS and a custom system are competing is costing you today.</p></div>
  <a class="btn btn-1" href="/roiometro">Try the ROIometer</a>
</div>
