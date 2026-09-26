#!/usr/bin/env node
/**
 * tox.mjs — monorepo-aware test + typecheck runner for the 3Q Facility Dashboard.
 *
 * Works like a lightweight `tox`: you give it a list of environments (package
 * names + commands), and it runs each one in order, stopping on the first
 * failure unless `--keep-going` is passed.
 *
 * Usage:
 *   node tox.mjs                  # run the default environments
 *   node tox.mjs --keep-going    # run all environments even after failures
 *   node tox.mjs client test     # run only the "client test" environment
 *   node tox.mjs server typecheck client test  # run specific environments
 *
 * Environments are defined in the `ENVS` map below. Each entry is a working
 * directory + a shell command. The command's exit code determines pass/fail.
 */

import { spawn } from "node:child_process";
import { resolve, basename } from "node:path";
import { createInterface } from "node:readline";

// ---------------------------------------------------------------------------
// Environment definitions
// ---------------------------------------------------------------------------
const ROOT = resolve(__dirname);

const ENVS = {
  // ---- server ---------------------------------------------------------------
  "server typecheck": {
    cwd: resolve(ROOT, "server"),
    cmd: "npm run typecheck",
    help: "TypeScript type-check the server package (noEmit).",
  },
  "server test": {
    cwd: resolve(ROOT, "server"),
    cmd: "npm test",
    help: "Run the server unit tests (Vitest).",
  },
  "server build": {
    cwd: resolve(ROOT, "server"),
    cmd: "npm run build",
    help: "Build the server bundle (tsup) — verifies the Vercel artifact.",
  },

  // ---- client ---------------------------------------------------------------
  "client typecheck": {
    cwd: resolve(ROOT, "client"),
    cmd: "npm run typecheck",
    help: "TypeScript type-check the client package (noEmit).",
  },
  "client test": {
    cwd: resolve(ROOT, "client"),
    cmd: "npm test",
    help: "Run the client unit tests (Vitest + jsdom).",
  },
  "client build": {
    cwd: resolve(ROOT, "client"),
    cmd: "npm run build",
    help: "Build the client production bundle (Vite).",
  },
} satisfies Record<string, { cwd: string; cmd: string; help: string }>;

// ---------------------------------------------------------------------------
// Default environments (run when no positional args are given)
// ---------------------------------------------------------------------------
const DEFAULT_ENVS = [
  "server typecheck",
  "server test",
  "client typecheck",
  "client test",
] as const satisfies readonly (keyof typeof ENVS)[];

// ---------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function pass(msg: string) {
  console.log(`${GREEN}✔${RESET}  ${msg}`);
}
function fail(msg: string) {
  console.log(`${RED}✘${RESET}  ${msg}`);
}
function info(msg: string) {
  console.log(`${CYAN}→${RESET}  ${msg}`);
}
function heading(msg: string) {
  console.log(`\n${BOLD}${msg}${RESET}`);
}

// ---------------------------------------------------------------------------
// Command execution
// ---------------------------------------------------------------------------
function runEnv(name: keyof typeof ENVS, keepGoing: boolean): number {
  const env = ENVS[name];
  heading(`${name}  (${basename(env.cwd)})`);
  console.log(`  ${env.help}`);

  return new Promise((resolve) => {
    const proc = spawn("npm", ["run", name.split(" ")[1]], {
      cwd: env.cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    proc.on("close", (code) => {
      if (code === 0 || code === null) {
        pass(`${name} passed`);
        resolve(0);
      } else {
        fail(`${name} failed (exit ${code})`);
        if (!keepGoing) {
          // Exit the whole process immediately on first failure.
          process.exit(code ?? 1);
        }
        resolve(code ?? 1);
      }
    });

    proc.on("error", (err) => {
      fail(`${name} failed to start: ${err.message}`);
      if (!keepGoing) process.exit(1);
      resolve(1);
    });
  });
}

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------
function parseArgs(argv: string[]): { envNames: (keyof typeof ENVS)[]; keepGoing: boolean } {
  const args = argv.slice(2);
  const keepGoing = args.includes("--keep-going") || args.includes("-k");
  const filtered = args.filter((a) => a !== "--keep-going" && a !== "-k");

  if (filtered.length === 0) {
    return { envNames: DEFAULT_ENVS, keepGoing };
  }

  const envNames = filtered as (keyof typeof ENVS)[];
  for (const name of envNames) {
    if (!(name in ENVS)) {
      console.error(`Unknown environment: "${name}"`);
      console.error(`Available: ${Object.keys(ENVS).join(", ")}`);
      process.exit(1);
    }
  }
  return { envNames, keepGoing };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const { envNames, keepGoing } = parseArgs(process.argv);

  info(`Running ${envNames.length} environment(s)${keepGoing ? " (keep-going)" : ""}`);

  let exitCode = 0;
  for (const name of envNames) {
    const code = await runEnv(name, keepGoing);
    if (code !== 0) exitCode = code;
  }

  if (exitCode === 0) {
    info(`All ${envNames.length} environment(s) passed.`);
  } else {
    fail(`${envNames.length > 1 ? "One or more" : "The"} environment(s) failed.`);
  }

  process.exit(exitCode);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
