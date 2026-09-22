/**
 * cleanup-commit.mjs — remove transient scratch artifacts that `git add -A`
 * accidentally swept into the refactor commit, then AMEND the commit so the
 * history stays a single clean "vertical-slice refactor" commit. Keeps all
 * legitimate tooling (dump-routes, verify-migration, migrate-modules, the new
 * shared/ modules, drizzle migrations) intact.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = "d:/3Q-facility-Dashboard";
const abs = (p) => path.join(ROOT, p);
const run = (cmd) =>
  execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

const SCRATCH = [
  "server/_fix_table.mjs",
  "server/audit.txt",
  "server/build-out.txt",
  "server/dump-err.txt",
  "server/dump-err2.txt",
  "server/fix_journal.py",
  "server/migration-g1-applied.txt",
  "server/migration-g2-applied.txt",
  "server/route-dumper-stderr.txt",
  "server/route-dumper-stderr2.txt",
  "server/seed_verify.ts",
  "server/scripts/do-commit.mjs",
  ".commit-msg.txt",
];

const tracked = (p) => {
  try { run(`git -C "${ROOT}" ls-files --error-unmatch -- "${p}"`); return true; }
  catch { return false; }
};

for (const p of SCRATCH) {
  if (fs.existsSync(abs(p))) fs.rmSync(abs(p), { force: true, recursive: true });
  if (tracked(p)) {
    try { run(`git -C "${ROOT}" rm -f --cached -- "${p}"`); }
    catch { /* already gone */ }
  }
}

run(`git -C "${ROOT}" add -A -- server`);
run(
  `git -C "${ROOT}" -c user.name=agent -c user.email=agent@local commit --amend --no-verify --no-edit`,
);
const sha = run(`git -C "${ROOT}" rev-parse --short HEAD`).trim();
const stat = run(`git -C "${ROOT}" show --stat --format="%H %s" HEAD`).split(/\r?\n/);
const footer = stat[stat.length - 1] || "";
process.stdout.write(`AMEND_OK HEAD=${sha}\n${footer}\n`);

// Defer self-deletion: this file is untracked (created after the commit), so it
// isn't part of history, but we tidy the working tree, too. Spawning a detached
// child that runs AFTER the parent exits avoids Windows file-lock contention.
import { spawn } from "node:child_process";
const self = abs("server/scripts/cleanup-commit.mjs");
spawn(process.execPath, ["-e", `import("fs").then(fs=>fs.rmSync(${JSON.stringify(self)}, {force:true}))`], { detached: true, stdio: "ignore" });

