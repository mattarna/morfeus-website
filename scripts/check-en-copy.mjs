#!/usr/bin/env node
/* ============================================================
   ITALIANO SULLE PAGINE INGLESI
   ------------------------------------------------------------
   Il difetto che questo script previene e' gia' successo due volte,
   ed e' invisibile a chiunque non legga le pagine inglesi una per
   una: il guscio della pagina e' bilingue (testata, bottoni, CTA)
   ma i CONTENUTI arrivano da una lista sola, in italiano. Il build
   passa, il typecheck passa, la pagina risponde 200, e su
   /impara-ai si legge un titolo inglese sopra diciotto domande in
   italiano.

   Non e' un controllo di traduzione: e' un controllo di lingua.
   Gira sull'HTML gia' costruito (.next/server/app/en) perche' e'
   l'unico posto dove si vede cosa arriva davvero al lettore,
   qualunque sia il file da cui esce.

   Si lancia DOPO `next build`:
     npm run build && npm run check:en-copy

   ESCLUSIONI. Le pagine legali (termini-*) e /formazione sono
   italiane per scelta: l'offerta e' italiana e il testo legale non
   si traduce a cuor leggero. Stanno in ESCLUSE, con il motivo. Se
   un giorno vengono tradotte, si tolgono da li'.
   ============================================================ */

import fs from "node:fs";
import path from "node:path";

const RADICE = path.join(process.cwd(), ".next", "server", "app", "en");

const ESCLUSE = new Map([
  ["/termini-bootcamp.html", "testo legale, offerta solo italiana"],
  ["/termini-corso.html", "testo legale, offerta solo italiana"],
  ["/formazione.html", "pagina gated, offerta solo italiana"],
]);

/* Parole funzione italiane che in inglese non esistono. Niente
   sostantivi (`azienda`, `dati`) e niente parole che l'inglese usa
   davvero (`per`, `non`, `via`, `no`): il falso positivo fa
   disattivare il controllo, ed e' peggio del difetto. */
const SPIA = [
  "che", "della", "delle", "degli", "dei", "sono", "questo", "questa",
  "anche", "senza", "perché", "perche", "più", "piu", "dove", "quando",
  "nostro", "nostra", "abbiamo", "viene", "essere", "quello", "quella",
  "sulla", "nella", "dalla", "cosa", "come si", "ogni",
];
const RE_SPIA = new RegExp(`\\b(${SPIA.join("|")})\\b`, "i");

/* Solo il testo che un lettore vede: il contenuto fra i tag. Salta
   script e style, dove finiscono i payload RSC (che contengono
   legittimamente anche la copy italiana dell'altra lingua). */
function frasiVisibili(html) {
  const senzaScript = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  const frasi = [];
  for (const m of senzaScript.matchAll(/>([^<>]{8,300})</g)) {
    const testo = m[1].replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, " ").trim();
    if (testo) frasi.push(testo);
  }
  return frasi;
}

function elencaHtml(dir) {
  const out = [];
  for (const voce of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, voce.name);
    if (voce.isDirectory()) out.push(...elencaHtml(p));
    else if (voce.name.endsWith(".html")) out.push(p);
  }
  return out;
}

if (!fs.existsSync(RADICE)) {
  console.error(
    `[check-en-copy] ${RADICE} non esiste. Questo controllo gira sul build: lancia prima "npm run build".`
  );
  process.exit(1);
}

const pagine = elencaHtml(RADICE);
if (pagine.length === 0) {
  console.error(`[check-en-copy] nessuna pagina inglese in ${RADICE}: il build e' incompleto.`);
  process.exit(1);
}

let problemi = 0;
for (const file of pagine) {
  const rel = file.slice(RADICE.length).replace(/\\/g, "/");
  if (ESCLUSE.has(rel)) continue;
  const sospette = frasiVisibili(fs.readFileSync(file, "utf8")).filter((f) => RE_SPIA.test(f));
  if (sospette.length === 0) continue;
  problemi += sospette.length;
  console.error(`\n✗ /en${rel} — ${sospette.length} frase/i in italiano:`);
  for (const f of sospette.slice(0, 5)) {
    console.error(`    ${f.length > 140 ? `${f.slice(0, 140)}…` : f}`);
  }
  if (sospette.length > 5) console.error(`    … e altre ${sospette.length - 5}`);
}

const controllate = pagine.length - [...ESCLUSE.keys()].length;
if (problemi > 0) {
  console.error(
    `\n[check-en-copy] ${problemi} frasi italiane su pagine inglesi. ` +
      "Se una e' un falso positivo (una parola inglese che assomiglia a una italiana), " +
      "riscrivi la frase o togli la parola da SPIA in scripts/check-en-copy.mjs."
  );
  process.exit(1);
}

console.log(
  `[check-en-copy] OK: ${controllate} pagine inglesi senza testo italiano ` +
    `(${ESCLUSE.size} escluse per scelta).`
);
