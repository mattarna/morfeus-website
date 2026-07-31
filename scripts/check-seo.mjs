// Audit SEO/GEO: legge l'HTML servito e misura cio' che conta.
const BASE = "http://localhost:3022";
const PERCORSI = [
  "", "forge", "lab", "chi-siamo", "metodo", "marf", "casi", "insights",
  "impara-ai", "glossario", "faq", "roiometro", "privacy", "cookies",
  "casi/brainiac-tesoreria-riconciliata", "casi/cyberangels-sales-advisor",
  "casi/cyberangels-report-cfo", "casi/globia-scoring-deterministico",
  "casi/marf-lead-caldo", "casi/scalers-pre-sales", "casi/valueize-best-seller",
  "casi/ag-academy-onboarding",
  "insights/value-leak", "insights/agenti-ai-in-azienda",
  "insights/ai-act-pmi-alfabetizzazione", "insights/ai-per-le-pmi-da-dove-iniziare",
  "insights/come-misurare-il-roi-dell-ai", "insights/perche-progetti-ai-falliscono",
  "insights/quanto-costa-l-ai-in-azienda",
];
const uno = (h, re) => { const m = h.match(re); return m ? m[1].trim() : ""; };
const dec = (s) => s.replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x2F;/g, "/").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const righe = [];
for (const loc of ["en", "it"]) {
  for (const p of PERCORSI) {
    const url = `${BASE}${loc === "it" ? "/it" : ""}${p ? "/" + p : "/"}`;
    let h = "", code = 0;
    try { const r = await fetch(url, { redirect: "follow" }); code = r.status; h = await r.text(); }
    catch (e) { righe.push({ loc, p, code: "ERR" }); continue; }

    const ld = [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .map(m => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
    const tipi = ld.flatMap(x => x["@graph"] ? x["@graph"].map(g => g["@type"]) : [x["@type"]]);
    const h1 = [...h.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)];
    righe.push({
      loc, p, code,
      title: dec(uno(h, /<title>(.*?)<\/title>/s)),
      desc: dec(uno(h, /<meta name="description" content="([^"]*)"/)),
      canonical: uno(h, /rel="canonical" href="([^"]*)"/),
      hreflang: [...h.matchAll(/hrefLang="([^"]*)" href="([^"]*)"/g)].length,
      ogImg: uno(h, /property="og:image" content="([^"]*)"/),
      twitter: /name="twitter:card"/.test(h),
      breadcrumb: tipi.includes("BreadcrumbList"),
      ldTipi: [...new Set(tipi)].join("+"),
      h1n: h1.length,
    });
  }
}

const P = (s, n) => String(s).padEnd(n).slice(0, n);
console.log("=== PROBLEMI RIMASTI ===");
let n = 0;
for (const x of righe) {
  const p = [];
  if (x.code !== 200) p.push("http " + x.code);
  if (!x.title) p.push("TITLE MANCANTE"); else if (x.title.length > 60) p.push("title " + x.title.length);
  if (!x.desc) p.push("DESC MANCANTE");
  else if (x.desc.length < 110) p.push("desc corta " + x.desc.length);
  else if (x.desc.length > 160) p.push("desc lunga " + x.desc.length);
  if (!x.canonical) p.push("canonical mancante");
  if (x.hreflang < 3) p.push("hreflang " + x.hreflang + "/3");
  if (!x.ogImg) p.push("og:image mancante");
  if (!x.twitter) p.push("twitter mancante");
  if (x.h1n !== 1) p.push(x.h1n + " H1");
  if (!x.ldTipi) p.push("nessun JSON-LD");
  const annidata = x.p.includes("/");
  if (annidata && !x.breadcrumb) p.push("breadcrumb mancante");
  if (p.length) { n++; console.log("  " + P((x.loc === "it" ? "/it/" : "/") + x.p, 42) + " " + p.join(" · ")); }
}
console.log(`  pagine con almeno un problema: ${n} su ${righe.length}`);

// duplicati
for (const loc of ["en", "it"]) {
  const t = {}, d = {};
  righe.filter(x => x.loc === loc).forEach(x => { (t[x.title] ||= []).push(x.p); (d[x.desc] ||= []).push(x.p); });
  const dt = Object.entries(t).filter(([, v]) => v.length > 1);
  const dd = Object.entries(d).filter(([, v]) => v.length > 1);
  console.log(`  [${loc}] titoli duplicati: ${dt.length} · description duplicate: ${dd.length}`);
  dt.forEach(([k, v]) => console.log(`     "${k.slice(0, 40)}" su ${v.join(", ")}`));
}
console.log("  breadcrumb presenti su " + righe.filter(x => x.breadcrumb).length + " pagine");
