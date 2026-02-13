#!/usr/bin/env node
const { execSync } = require('child_process');

const args = process.argv.slice(2);

// ──────────────────────────────────────────────────────────
// Extract custom flags (removed from args before passing to Playwright)
// ──────────────────────────────────────────────────────────
function extractFlag(flag) {
  const idx = args.indexOf(flag);
  if (idx !== -1) {
    const value = args[idx + 1] || null;
    args.splice(idx, 2);
    return value;
  }
  return null;
}

const envInput     = extractFlag('--env') || 'stage';
const modeInput    = extractFlag('--mode');         // local | remote
const browserInput = extractFlag('--browser');      // chrome-win | edge-win | chrome-mac | firefox-win
const runProfile   = extractFlag('--run-profile');  // smoke | regression | debug

// ──────────────────────────────────────────────────────────
// ENVIRONMENT → REGION MAPPING (single source of truth)
// ──────────────────────────────────────────────────────────
//   stage     →  US Staging   (us-chromium)
//   eu-stage  →  EU Staging   (eu-chromium)
//   prod      →  US Production (us-chromium)
//   eu-prod   →  EU Production (eu-chromium)
// ──────────────────────────────────────────────────────────
const ENV_MAP = {
  'stage':    { project: 'us-chromium' },
  'eu-stage': { project: 'eu-chromium' },
  'prod':     { project: 'us-chromium' },
  'eu-prod':  { project: 'eu-chromium' },
};

const resolved = ENV_MAP[envInput];
if (!resolved) {
  console.error(`\n  Unknown env: "${envInput}". Valid values: ${Object.keys(ENV_MAP).join(', ')}\n`);
  process.exit(1);
}

// Auto-add --project if not already specified
const hasProject = args.includes('--project');
if (!hasProject) {
  args.push('--project', resolved.project);
}

// ──────────────────────────────────────────────────────────
// Stable build ID — generated once here, shared by all workers
// Ensures all LambdaTest sessions group under one build
// ──────────────────────────────────────────────────────────
const buildId = process.env.LT_BUILD_ID
  || process.env.HE_BUILD_ID
  || process.env.GITHUB_RUN_NUMBER
  || Date.now().toString();

// ──────────────────────────────────────────────────────────
// Build env vars string for the subprocess
// ──────────────────────────────────────────────────────────
const envVars = [
  `TEST_ENV=${envInput}`,
  `LT_BUILD_ID=${buildId}`,
  modeInput    ? `TEST_MODE=${modeInput}`         : '',
  browserInput ? `LT_PROFILE=${browserInput}`     : '',
  runProfile   ? `LT_RUN_PROFILE=${runProfile}`   : '',
].filter(Boolean).join(' ');

const playwrightArgs = args.join(' ');
const command = `${envVars} npx playwright test ${playwrightArgs}`;

const mode = modeInput || process.env.TEST_MODE || 'local';
const browser = browserInput || process.env.LT_PROFILE || 'default';
console.log(`\n  env: ${envInput}  mode: ${mode}  browser: ${browser}  project: ${resolved.project}  build: ${buildId}`);
console.log(`  cmd: npx playwright test ${playwrightArgs}\n`);

try {
  execSync(command, { stdio: 'inherit', cwd: process.cwd() });
} catch {
  process.exit(1);
}
