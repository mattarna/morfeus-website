// Blocca la "footer bomb": un file sorgente TRACCIATO che importa un file
// NON committato passa la build locale (il file c'è sul disco) ma rompe Vercel
// su clone pulito ('Module not found').
//
// Analizza solo i file che finiscono davvero su Vercel:
//   - tracciati da git (git ls-files)
//   - NON skip-worktree (le loro modifiche locali non vengono pushate)
// e spoglia i commenti per evitare falsi positivi su import commentati.
import { readFile, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const EXTS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" });
}

function trackedFiles() {
  return new Set(
    git(["ls-files", "src"]).split(/\r?\n/).filter(Boolean).map((p) => p.replace(/\\/g, "/"))
  );
}

// `git ls-files -v` prefissa con "S " le entry skip-worktree.
function skipWorktreeFiles() {
  return new Set(
    git(["ls-files", "-v", "src"])
      .split(/\r?\n/)
      .filter((l) => l.startsWith("S "))
      .map((l) => l.slice(2).replace(/\\/g, "/"))
  );
}

function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

async function resolveImport(spec, fromAbs) {
  let base;
  if (spec.startsWith("@/")) base = path.join(root, "src", spec.slice(2));
  else if (spec.startsWith("./") || spec.startsWith("../")) base = path.resolve(path.dirname(fromAbs), spec);
  else return null; // pacchetti npm: non sono affar nostro

  const cands = [];
  if (path.extname(base)) cands.push(base);
  for (const e of EXTS) cands.push(base + e);
  for (const e of EXTS) cands.push(path.join(base, "index" + e));
  for (const c of cands) {
    try {
      if ((await stat(c)).isFile()) return c;
    } catch {
      /* next */
    }
  }
  return null; // non risolto = lo prende tsc/build, non noi
}

async function main() {
  const tracked = trackedFiles();
  const skip = skipWorktreeFiles();
  const scan = [...tracked].filter((p) => EXTS.includes(path.extname(p)) && !skip.has(p));
  const importRe = /\b(?:import|export)\b[^'"]*?\bfrom\s*['"]([^'"]+)['"]/g;
  const offenders = new Set();

  for (const rel of scan) {
    const abs = path.join(root, rel);
    let content;
    try {
      content = stripComments(await readFile(abs, "utf8"));
    } catch {
      continue;
    }
    let m;
    while ((m = importRe.exec(content)) !== null) {
      const resolved = await resolveImport(m[1], abs);
      if (!resolved) continue;
      const relRes = path.relative(root, resolved).replace(/\\/g, "/");
      if (relRes.startsWith("src/") && !tracked.has(relRes)) {
        offenders.add(`${rel} → ${relRes}`);
      }
    }
  }

  if (offenders.size === 0) {
    console.log("[untracked-imports] OK: nessun file tracciato importa file untracked.");
    return;
  }
  console.error("[untracked-imports] BLOCCATO — file TRACCIATI importano file NON committati (rompono Vercel):");
  for (const o of offenders) console.error("  - " + o);
  console.error("\nFix: `git add` dei file mancanti prima del push.");
  process.exit(1);
}

main().catch((e) => {
  console.error("[untracked-imports] errore:", e);
  process.exit(1);
});
