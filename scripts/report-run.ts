#!/usr/bin/env npx tsx
import * as dotenv from 'dotenv';
dotenv.config();

import { execSync } from 'child_process';

// ──────────────────────────────────────────────────────────────
// Full pipeline runner: slack → start → test → send → end → notify
//
// Usage:
//   npx tsx scripts/report-run.ts --grep @smoke --env stage
//   npm run report:run -- --grep @regression --env eu-stage
// ──────────────────────────────────────────────────────────────

const testArgs = process.argv.slice(2).join(' ');

const steps = [
  { name: 'Create Slack thread', cmd: 'npx tsx scripts/report-lab.ts slack_thread' },
  { name: 'Start Report-Lab build', cmd: 'npx tsx scripts/report-lab.ts start' },
  { name: 'Run tests', cmd: `node scripts/run-tests.js ${testArgs}`, allowFail: true },
  { name: 'Send results to Report-Lab', cmd: 'npx tsx scripts/report-lab.ts create_tests' },
  { name: 'End Report-Lab build', cmd: 'npx tsx scripts/report-lab.ts end' },
  { name: 'Send Slack summary', cmd: 'npx tsx scripts/report-lab.ts notify' },
];

console.log(`\n  ━━━ Report-Lab Pipeline ━━━`);
console.log(`  Test args: ${testArgs || '(none)'}\n`);

let testFailed = false;

for (const step of steps) {
  console.log(`  ▶ ${step.name}...`);
  try {
    execSync(step.cmd, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: { ...process.env, REPORT_LAB_ENABLED: 'true' },
    });
  } catch {
    if (step.allowFail) {
      testFailed = true;
      console.log(`  ⚠ Tests failed — continuing with report steps\n`);
    } else {
      console.error(`  ✗ ${step.name} failed\n`);
    }
  }
}

console.log(`\n  ━━━ Pipeline complete ━━━\n`);
if (testFailed) process.exit(1);
