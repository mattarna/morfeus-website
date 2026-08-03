---
title: "Automating quotes and documents with AI: the real problem is not speed"
slug: "automating-quotes-and-documents-with-ai"
metaTitle: "Automating quotes with AI: what really changes | Morfeus"
metaDescription: "You write the quote fast, then it disappears into silence. What to actually automate with AI in quotes and documents, and what stays human."
category: "Automation"
tags: ["automation", "quotes", "documents"]
topicTags: ["Automation","Quotes","Salescraft","Documents","Agent","MARF"]
author: "Matteo Arnaboldi"
authorRole: "CEO & Co-Founder, Morfeus"
datePublished: "2026-06-29"
dateModified: "2026-07-09"
readingTime: "6 min"
targetQuery: "automate quotes and documents with ai"
tldr: "The problem with quotes and documents is almost never writing speed: it is the total darkness about what happens after you hit send. AI automates data gathering, the first draft and consistency checks well, but the real jump shows up when you know who opened the document and when: the follow-up latches onto the moment the client is deciding, not onto the calendar of whoever has to remember to call. Review and pricing stay human decisions, always."
relatedTerms: ["MARF", "Salescraft", "Value Leak", "ROIometer"]
internalLinks: ["/roiometro", "/insights/ai-agents-in-business", "/insights/value-leak"]
faq:
  - q: "What can AI automate in a quote?"
    a: "Gathering data from different sources, the first draft based on price lists and rules, checking consistency and completeness. The final review and the pricing decision stay with the person."
  - q: "Why is tracking whether a quote was opened more useful than writing it faster?"
    a: "Because the real bottleneck is almost always after sending, not before. Knowing when the client opens and reads the document lets you call back at the moment they are deciding, instead of hoping somebody remembers."
  - q: "Does AI replace the sales team?"
    a: "No. It removes the mechanical work, data, drafts, checks, send monitoring, and gives those hours back to the activities that generate revenue, like the relationship and the negotiation, which stay human."
  - q: "Where is it best to start?"
    a: "From the document you produce most often and that costs the most time and errors: almost always the quote. You start there, with a person supervising, then extend to other documents."
sources: []
schema: [Article, FAQPage, BreadcrumbList]
coverKind: "stack-bars"
---

A general contractor sends an eighty-thousand-euro quote by email, PDF attached, subject line "Works quote". Then nothing happens. Not a rejection, not a question, not an error. Silence. The salesperson does not know whether the client opened it, whether they read all of it or just the first page, whether they are comparing it with another supplier or whether the file has ended up in a folder with a hundred other emails. The follow-up, when it comes, comes at random: three days later, a week later, whenever somebody in the office remembers.

**In brief.** The problem with quotes and documents is almost never writing speed: it is the total darkness about what happens after you hit send. AI automates data gathering, the first draft and consistency checks well, but the real jump shows up when you know who opened the document and when: the follow-up latches onto the moment the client is deciding, not onto the calendar of whoever has to remember to call. Review and pricing stay human decisions, always.

## The real bottleneck is not writing the quote faster

When a company thinks about automating quotes, the first question is almost always the same: how do I produce it faster? It is the wrong question, or at least not the first one. A quote written in ten minutes instead of an hour does not change much if it still ends up in a black hole: sent, and gone, with no way of knowing if and when anyone looked at it.

The real cost is not in producing the document. It is in the dead time after sending, when the salesperson does not know what to do because they have no information to act on. Call too early and you seem pushy. Call too late and the client has already decided, possibly with somebody else. It is one of the quietest ways a company accumulates [Value Leak](/insights/value-leak): not a visible error, but hours of sales work spent without information, on every quote, multiplied by how many go out in a year.

## What AI can really do, before sending

On producing the document, AI works well, and it is worth automating. Not because it is the most expensive part, but because it frees up time currently wasted on mechanical work:

- **Data gathering**: pulling information from CRM, price lists and email and putting it together without manual copy-paste.
- **First draft**: generating the draft according to templates and rules already defined, ready to review instead of ready to write.
- **Checking**: verifying consistency, completeness, missing terms, out-of-range prices before the document goes out.

<div class="drivers">
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h10"/><circle cx="19" cy="19" r="2.2"/></svg>
    <h5>Data gathering</h5><p>CRM, price lists and email in one place, without copy-paste.</p>
  </div>
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 13h6M9 17h6"/></svg>
    <h5>First draft</h5><p>A draft ready from templates and rules, to review rather than to write.</p>
  </div>
  <div class="driver">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>
    <h5>Checking</h5><p>Consistency, completeness and out-of-range prices before sending.</p>
  </div>
</div>

This is [AI agent](/insights/ai-agents-in-business) work in the strict sense: clear rules, high volume, little judgement required. And it is the logic behind a sales layer like Salescraft, designed to take this weight off the sales team. But all of it solves only half the problem. The other half begins the moment the document leaves the building.

## From the workbench: the quote nobody knew had been opened

The general contractor I mentioned at the start is a real case we ran at Morfeus: a construction and building services company, between 15 and 80 staff, sending significant quotes, often six figures, using the method they had always used. Email, PDF, and then nothing. The follow-up depended entirely on the memory of whoever had to call back, and human memory is a terrible sales management system.

With MARF we built something different: a quoting system with a tracked public link. The document is no longer an attached file that vanishes into an inbox, it is a link you know the opening time of. The salesperson sees the open in real time and calls back at the exact moment the client is actually looking at the document, not three days early or a week late out of habit.

<div class="logbox">
  <div><span class="p">$ marf --quote PRV-2148 · €82,400</span></div>
  <div><span class="d">09:12 · tracked link sent to client</span></div>
  <div><span class="g">▸ 14:37 · open detected · page 3/7 · 4m 12s</span></div>
  <div><span class="d">14:38 · alert to salesperson · call now</span></div>
</div>

<p class="callout-txt"><b>The signal that moves the follow-up.</b> Not a calendar reminder, but a real event: the client is looking at the document right now. Illustrative example.</p>

The result was not a quote written faster. It was a follow-up hooked to a real event instead of an imaginary calendar, a rising close rate on the quotes sent, and the end of the confusion about which version of the document was the right one, how many times it had been resent, which one was the latest. The problem had never been the writing. It was not knowing what happened afterwards.

<blockquote class="pquote">The problem had never been writing the quote. It was not knowing what happened afterwards.</blockquote>

## What stays human, and does not get touched

Automating the production and monitoring of documents does not mean taking the person out of the process. Three things stay firmly human:

- The **final decision on price** and terms, especially when you go outside the standard.
- The **relationship and the negotiation**: trust and bargaining are not delegated to a system.
- The **exceptional cases**, where the rules are not enough and you need judgement only a person can give.

AI prepares the document and signals when to move. The person decides, negotiates and signs. Confusing these two roles, or worse making the sales team believe they are confused, is the fastest way to destroy trust in the whole system.

## How to start without losing control

1. **Pick the most frequent and most expensive document.** Almost always the quote, not some secondary administrative form.
2. **Give AI clean, accessible data.** On dirty data you automate the chaos faster, you do not fix it.
3. **Add the tracking, not just the generation.** Knowing when the document gets opened is worth as much as, or more than, the time saved writing it.
4. **Keep a person on the review.** Always, at the beginning: trust in the system is built on results, not on the promise.
5. **Measure in euros.** Hours saved, close rate, time between sending and the first useful contact.

## In short

Automating quotes and documents is worth doing, but not for the reason that looks obvious. The real return is not in writing faster, it is in removing the darkness after sending: knowing when the client opens, reads, decides. AI does the mechanical part and the monitoring, the person does the part that counts, the negotiation and the signature.

> **What are the quotes that disappear into silence costing you today?** With the [ROIometer](/roiometro) you estimate it in euros, before even discussing which technology to use.

<div class="inlinecta">
  <div><h3>What is the darkness after sending worth?</h3><p>Estimate in euros the cost of untracked quotes, department by department.</p></div>
  <a class="btn btn-1" href="/roiometro">Try the ROIometer</a>
</div>
