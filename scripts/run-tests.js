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
const workersInput = extractFlag('--workers');      // number of parallel workers

// Peek at --grep value without removing it (Playwright needs it)
const grepIdx = args.indexOf('--grep');
const grepValue = grepIdx !== -1 ? args[grepIdx + 1] : null;
const testSuite = process.env.TEST_SUITE || grepValue || '@smoke';

const mode = modeInput || process.env.TEST_MODE || 'local';
const isRemote = mode === 'remote';
// Explicit 'false' overrides even for remote mode (lets CI workflow manage the lifecycle)
const reportLabEnabled = process.env.REPORT_LAB_ENABLED !== 'false'
  && (isRemote || process.env.REPORT_LAB_ENABLED === 'true');

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

// Add --workers if specified
if (workersInput) {
  args.push('--workers', workersInput);
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
  reportLabEnabled ? 'REPORT_LAB_ENABLED=true'    : '',
].filter(Boolean).join(' ');

const playwrightArgs = args.join(' ');
const command = `${envVars} npx playwright test ${playwrightArgs}`;

const browser = browserInput || process.env.LT_PROFILE || 'default';
console.log(`\n  env: ${envInput}  mode: ${mode}  browser: ${browser}  project: ${resolved.project}  build: ${buildId}`);
console.log(`  cmd: npx playwright test ${playwrightArgs}\n`);

// ──────────────────────────────────────────────────────────
// ReportLab lifecycle: build/create → tests → build/end
// Auto-enabled for remote mode; opt-in via REPORT_LAB_ENABLED=true
// ──────────────────────────────────────────────────────────
function reportLab(cmd) {
  try {
    execSync(`HE_BUILD_ID=${buildId} TEST_ENV=${envInput} TEST_SUITE=${testSuite} npx tsx scripts/report-lab.ts ${cmd}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (e) {
    console.error(`  [report-lab] ${cmd} failed: ${e.message}`);
  }
}

if (reportLabEnabled) reportLab('start');

let testsFailed = false;
try {
  execSync(command, { stdio: 'inherit', cwd: process.cwd() });
} catch {
  testsFailed = true;
}

if (reportLabEnabled) {
  reportLab('create_tests');
  reportLab('end');
}

if (testsFailed) process.exit(1);
