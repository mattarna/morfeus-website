import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const funnelsDir = path.join(projectRoot, "src", "funnels");
const publicDir = path.join(projectRoot, "public");

const blockedPublicDirs = ["Transition Materials", "skill-wcag-accessibility-1.0.0"];

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }

    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function toRepoPath(fullPath) {
  return path.relative(projectRoot, fullPath).replaceAll("\\", "/");
}

async function getLargeFunnelFiles() {
  const files = await walk(funnelsDir);
  const large = [];

  for (const file of files) {
    const content = await readFile(file, "utf8");
    const lines = content.split(/\r?\n/).length;
    if (lines > 1000) {
      large.push({ file: toRepoPath(file), lines });
    }
  }

  return large.sort((a, b) => b.lines - a.lines);
}

async function countFunnelEslintDisables() {
  const files = await walk(funnelsDir);
  let count = 0;
  for (const file of files) {
    const content = await readFile(file, "utf8");
    const matches = content.match(/eslint-disable/g);
    count += matches?.length ?? 0;
  }
  return count;
}

async function getBlockedPublicDirReport() {
  const report = [];
  for (const dirName of blockedPublicDirs) {
    const fullPath = path.join(publicDir, dirName);
    try {
      const info = await stat(fullPath);
      if (info.isDirectory()) {
        report.push(dirName);
      }
    } catch {
      // Directory not found: no report needed.
    }
  }
  return report;
}

async function main() {
  const [largeFiles, eslintDisableCount, blockedDirs] = await Promise.all([
    getLargeFunnelFiles(),
    countFunnelEslintDisables(),
    getBlockedPublicDirReport(),
  ]);

  console.log("=== Morfeus Health Report ===");
  console.log(`Large funnel files (>1000 lines): ${largeFiles.length}`);
  for (const item of largeFiles.slice(0, 12)) {
    console.log(`  - ${item.file}: ${item.lines} lines`);
  }

  console.log(`eslint-disable occurrences in src/funnels: ${eslintDisableCount}`);

  if (blockedDirs.length > 0) {
    console.log("Blocked public directories present:");
    for (const dir of blockedDirs) {
      console.log(`  - public/${dir}`);
    }
  } else {
    console.log("Blocked public directories present: none");
  }
}

main().catch((error) => {
  console.error("Failed to build health report:", error);
  process.exit(1);
});
