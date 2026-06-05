import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const strict = process.argv.includes("--strict");
const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");

const blockedDirectories = new Set([
  "Transition Materials",
  "skill-wcag-accessibility-1.0.0",
]);

const maxFileSizeBytes = 8 * 1024 * 1024;

async function getTopLevelEntries(dir) {
  return readdir(dir, { withFileTypes: true });
}

async function getOversizedTopLevelFiles(dir, entries) {
  const oversized = [];
  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    const info = await stat(fullPath);
    if (info.size > maxFileSizeBytes) {
      oversized.push({ name: entry.name, size: info.size });
    }
  }
  return oversized;
}

function formatSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

async function main() {
  const entries = await getTopLevelEntries(publicDir);
  const blockedFound = entries
    .filter((entry) => entry.isDirectory() && blockedDirectories.has(entry.name))
    .map((entry) => entry.name);

  const oversizedFiles = await getOversizedTopLevelFiles(publicDir, entries);

  if (blockedFound.length === 0 && oversizedFiles.length === 0) {
    console.log("[public-check] OK: no blocked directories and no oversized top-level files.");
    return;
  }

  if (blockedFound.length > 0) {
    console.warn("[public-check] Blocked public directories detected:");
    for (const name of blockedFound) {
      console.warn(`  - ${name}`);
    }
  }

  if (oversizedFiles.length > 0) {
    console.warn(`[public-check] Top-level files over ${formatSize(maxFileSizeBytes)}:`);
    for (const file of oversizedFiles) {
      console.warn(`  - ${file.name} (${formatSize(file.size)})`);
    }
  }

  if (strict) {
    process.exitCode = 1;
  } else {
    console.warn("[public-check] Non-strict mode: warnings only. Use --strict to fail.");
  }
}

main().catch((error) => {
  console.error("[public-check] Unexpected error:", error);
  process.exit(1);
});
