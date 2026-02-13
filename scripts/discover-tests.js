#!/usr/bin/env node
//
// Smart test discovery for HyperExecute.
// Uses Playwright's --list to find matching spec files (respects tags, config, testIgnore).
// Outputs one file path per line — the format HE's testDiscovery expects.
//
// Usage:
//   node scripts/discover-tests.js --env stage --grep @smoke
//   node scripts/discover-tests.js --env eu-stage --grep @regression
//
const { execSync } = require('child_process');

const args = process.argv.slice(2);

function extractFlag(flag) {
  const idx = args.indexOf(flag);
  if (idx !== -1) {
    const value = args[idx + 1] || null;
    args.splice(idx, 2);
    return value;
  }
  return null;
}

const envInput = extractFlag('--env') || 'stage';
const grepInput = extractFlag('--grep') || '';

const ENV_MAP = {
  'stage':    'us-chromium',
  'eu-stage': 'eu-chromium',
  'prod':     'us-chromium',
  'eu-prod':  'eu-chromium',
};

const project = ENV_MAP[envInput];
if (!project) {
  console.error(`Unknown env: "${envInput}". Valid: ${Object.keys(ENV_MAP).join(', ')}`);
  process.exit(1);
}

const grepFlag = grepInput ? `--grep ${grepInput}` : '';
const cmd = `TEST_ENV=${envInput} npx playwright test --project ${project} ${grepFlag} --list --reporter=json 2>/dev/null`;

try {
  const output = execSync(cmd, { encoding: 'utf-8', cwd: process.cwd() });
  const data = JSON.parse(output);

  // Extract unique file paths from Playwright's JSON output
  const files = new Set();
  for (const suite of data.suites ?? []) {
    for (const child of suite.suites ?? []) {
      if (child.file) files.add(child.file);
    }
  }

  for (const file of files) {
    console.log(file);
  }
} catch (err) {
  // Fallback: grep-based discovery if Playwright list fails
  const fallbackCmd = grepInput
    ? `grep -rl "${grepInput}" tests/ --include="*.spec.ts" | sed 's|tests/||'`
    : `find tests -name "*.spec.ts" | sed 's|tests/||'`;

  try {
    const output = execSync(fallbackCmd, { encoding: 'utf-8', cwd: process.cwd() });
    process.stdout.write(output);
  } catch {
    process.exit(1);
  }
}
