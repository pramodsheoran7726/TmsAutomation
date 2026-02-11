#!/usr/bin/env npx tsx
import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs';
import * as path from 'path';
import type {
  ReportLabBuildPayload,
  ReportLabSummary,
  ReportLabTestPayload,
} from '../src/types/report-lab.types';
import { createThread, sendTestNotification, sendFinalSummary } from './slack-notify';

// ──────────────────────────────────────────────────────────────
// Config from environment variables
// ──────────────────────────────────────────────────────────────
const REPORT_LAB_URL = process.env.REPORT_LAB_URL ?? 'https://qa-report.lambdatestinternal.com';
const TEST_ENV = process.env.TEST_ENV ?? 'stage';
const TEST_SUITE = process.env.TEST_SUITE ?? '@smoke';
const BUILD_ID = process.env.HE_BUILD_ID ?? process.env.GITHUB_RUN_NUMBER ?? `local-${Date.now()}`;
const TEAM = 'test-manager';
const RESULTS_DIR = 'report-lab-results';
const BUILD_FILE = '.build.json';
const SUMMARY_FILE = '.summary.json';

// ──────────────────────────────────────────────────────────────
// Build payload helper (mirrors KaneAI create_build_payload)
// ──────────────────────────────────────────────────────────────
function createBuildPayload(env: string, suite: string, buildId: string): { build: ReportLabBuildPayload } {
  return {
    build: {
      team: TEAM,
      env,
      suite,
      id: buildId,
      name: `#${buildId}`,
    },
  };
}

// ──────────────────────────────────────────────────────────────
// Commands — each wraps HTTP in try/catch (mirrors KaneAI pattern)
// ──────────────────────────────────────────────────────────────

async function start(): Promise<void> {
  console.log('\n  [report-lab] Creating build...');

  const suiteName = TEST_SUITE.replace('@', '');
  const url = `${REPORT_LAB_URL}/build/create`;
  const payload = createBuildPayload(TEST_ENV, suiteName, BUILD_ID);

  console.log(`  POST ${url}`);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120_000),
    });

    if (res.status === 200 || res.status === 201) {
      const data = await res.json().catch(() => ({}));
      console.log('  Successfully created build');
      console.log('  Response /build/create:', JSON.stringify(data));

      const buildData = { ...payload.build, build_id: (data as Record<string, string>).build_id ?? BUILD_ID };
      fs.writeFileSync(BUILD_FILE, JSON.stringify(buildData, null, 2));
      console.log(`  Saved to ${BUILD_FILE}\n`);
    } else {
      const text = await res.text().catch(() => '');
      console.log('  Failed to create build');
      console.log(`  Response /build/create: ${text}\n`);
    }
  } catch (e) {
    console.error(`  ${e}\n`);
  }
}

/** Create a Slack thread (root message) — called from GA `create-slack-thread` job */
async function slackThread(): Promise<void> {
  console.log('\n  [report-lab] Creating Slack thread...');

  const actionUrl = process.argv[3] ?? '';
  const suiteName = TEST_SUITE.replace('@', '');
  const message = `🚀 *TMS E2E* ${suiteName} has *started* on *${TEST_ENV}*.\n\nRun URL: <${actionUrl}|Open>`;

  const ts = await createThread(message);
  if (ts) {
    console.log(`SLACK_THREAD_TS=${ts}`);
  }
  console.log('');
}

async function createTests(): Promise<void> {
  console.log('\n  [report-lab] Sending test results...');

  if (!fs.existsSync(RESULTS_DIR)) {
    console.log(`  No ${RESULTS_DIR}/ directory found — nothing to send.\n`);
    return;
  }

  const files = fs.readdirSync(RESULTS_DIR).filter((f) => f.endsWith('.json'));
  if (files.length === 0) {
    console.log('  No test result files found.\n');
    return;
  }

  const suiteName = TEST_SUITE.replace('@', '');
  const buildPayload = createBuildPayload(TEST_ENV, suiteName, BUILD_ID);

  const summary: ReportLabSummary = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    duration: 0,
    build_id: BUILD_ID,
    env: TEST_ENV,
    suite: TEST_SUITE,
    failed_tests: [],
  };

  for (const file of files) {
    const filePath = path.join(RESULTS_DIR, file);
    const test: ReportLabTestPayload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const status = test.result.status;

    const url = `${REPORT_LAB_URL}/test/create`;
    const payload = JSON.stringify({ test, ...buildPayload });

    console.log('  Create Test Payload:', JSON.stringify(JSON.parse(payload), null, 2));

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        signal: AbortSignal.timeout(120_000),
      });

      if (res.status === 200 || res.status === 201) {
        console.log('  Test created successfully');
        console.log(`  Response /test/create: ${await res.text().catch(() => '')}`);
      } else {
        console.log('  Failed to create test');
        console.log(`  Response /test/create: ${await res.text().catch(() => '')}`);
      }
    } catch (e) {
      console.error(`  ${e}`);
    }

    // Send per-test Slack notification (thread reply)
    await sendTestNotification(test.name, status);

    summary.total++;
    summary.duration += test?.duration ?? 0;
    if (status === 'passed') summary.passed++;
    else if (status === 'failed') {
      summary.failed++;
      summary.failed_tests.push({
        name: test.name,
        error: test.error ?? 'Unknown error',
      });
    } else summary.skipped++;
  }

  fs.writeFileSync(SUMMARY_FILE, JSON.stringify(summary, null, 2));
  console.log(`\n  Summary: ${summary.passed}/${summary.total} passed, ${summary.failed} failed, ${summary.skipped} skipped`);
  console.log(`  Saved to ${SUMMARY_FILE}\n`);
}

async function end(): Promise<void> {
  console.log('\n  [report-lab] Ending build...');

  const suiteName = TEST_SUITE.replace('@', '');
  const url = `${REPORT_LAB_URL}/build/end`;
  const payload = createBuildPayload(TEST_ENV, suiteName, BUILD_ID);

  console.log(`  POST ${url}`);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120_000),
    });

    if (res.status === 200 || res.status === 201) {
      const data = await res.json().catch(() => ({}));
      console.log('  Successfully ended build');
      console.log('  Response /build/end:', JSON.stringify(data));
    } else {
      const text = await res.text().catch(() => '');
      console.log('  Failed to end build');
      console.log(`  Response /build/end: ${text}`);
    }
  } catch (e) {
    console.error(`  ${e}`);
  }

  const reportUrl = `${REPORT_LAB_URL}/${TEAM}/${TEST_ENV}/${suiteName}/${BUILD_ID}/summary`;
  console.log(`  Report: ${reportUrl}\n`);
}

/** Send final summary to the Slack thread — called from GA `conclude-slack` job */
async function notify(): Promise<void> {
  console.log('\n  [report-lab] Sending Slack final summary...');

  if (!fs.existsSync(SUMMARY_FILE)) {
    console.log(`  No ${SUMMARY_FILE} found — run create_tests first.\n`);
    return;
  }

  const suiteName = TEST_SUITE.replace('@', '');
  const summary: ReportLabSummary = JSON.parse(fs.readFileSync(SUMMARY_FILE, 'utf-8'));

  const reportUrl = `${REPORT_LAB_URL}/${TEAM}/${TEST_ENV}/${suiteName}/${BUILD_ID}/summary`;
  const githubUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : '';

  await sendFinalSummary(
    summary,
    reportUrl,
    githubUrl,
    process.env.SLACK_MENTIONS ?? '',
  );
  console.log('  Slack final summary sent.\n');
}

// ──────────────────────────────────────────────────────────────
// CLI entry point
// ──────────────────────────────────────────────────────────────
const command = process.argv[2];

const commands: Record<string, () => Promise<void>> = {
  start,
  slack_thread: slackThread,
  create_tests: createTests,
  end,
  notify,
};

if (!command || !commands[command]) {
  console.error(`\n  Usage: npx tsx scripts/report-lab.ts <command>`);
  console.error(`  Commands: ${Object.keys(commands).join(', ')}\n`);
  process.exit(1);
}

commands[command]().catch((err) => {
  console.error(`\n  [report-lab] Error: ${err}\n`);
  process.exit(1);
});
