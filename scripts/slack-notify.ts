import * as fs from 'fs';
import type { ReportLabSummary } from '../src/types/report-lab.types';

// ──────────────────────────────────────────────────────────────
// Slack Bot Token + chat.postMessage API (KaneAI thread pattern)
//
// Flow:
//   1. createThread()          → root message, persists .slack_thread_ts
//   2. sendTestNotification()  → per-test "• name → ✅/❌" in thread
//   3. sendFinalSummary()      → conclusion + chunked failures in thread
// ──────────────────────────────────────────────────────────────

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN ?? '';
const SLACK_CHANNEL = process.env.SLACK_CHANNEL ?? '';
const THREAD_TS_FILE = '.slack_thread_ts';

// ──────────────────────────────────────────────────────────────
// 1. Create root thread message
// ──────────────────────────────────────────────────────────────

export async function createThread(message: string): Promise<string | null> {
  if (!SLACK_BOT_TOKEN || !SLACK_CHANNEL) {
    console.log('  SLACK_BOT_TOKEN or SLACK_CHANNEL not set — skipping');
    return null;
  }

  const data = await postSlack({ channel: SLACK_CHANNEL, text: message });
  const ts = data?.ts ?? null;

  if (ts) {
    fs.writeFileSync(THREAD_TS_FILE, ts);
    console.log(`  Thread created (ts: ${ts}), persisted to ${THREAD_TS_FILE}`);
  }

  return ts;
}

// ──────────────────────────────────────────────────────────────
// 2. Send per-test notification as thread reply
// ──────────────────────────────────────────────────────────────

export async function sendTestNotification(
  testName: string,
  status: string,
): Promise<void> {
  const ts = getThreadTs();
  if (!ts) return;

  const icon = status.startsWith('pass') ? '✅' : status === 'skipped' ? '⏭️' : '❌';
  const message = `• ${testName} ➜ ${icon}`;

  await postSlack({ channel: SLACK_CHANNEL, text: message, thread_ts: ts });
}

// ──────────────────────────────────────────────────────────────
// 3. Send final summary + chunked failures to thread
// ──────────────────────────────────────────────────────────────

export async function sendFinalSummary(
  summary: ReportLabSummary,
  reportUrl: string,
  githubUrl: string,
  mentions: string,
): Promise<void> {
  const ts = getThreadTs();
  if (!ts) return;

  // Summary message
  const statusEmoji = summary.failed > 0 ? '❌' : '✅';
  const statusText = summary.failed > 0 ? 'completed with failures' : 'completed successfully';

  let msg = `${statusEmoji} *TMS E2E* ${statusText}!\n\n`;
  msg += `📊 *Total:* ${summary.total} | ✅ *Passed:* ${summary.passed} | ❌ *Failed:* ${summary.failed}`;
  if (summary.skipped > 0) msg += ` | ⏭️ *Skipped:* ${summary.skipped}`;
  msg += `\n⏱️ *Duration:* ${formatDuration(summary.duration)}`;
  msg += `\n\n📈 Report: <${reportUrl}|View Report>`;
  if (githubUrl) msg += `\n📋 GitHub: <${githubUrl}|View Run>`;

  if (mentions) {
    msg += `\n\n${mentions}`;
  }

  await postSlack({ channel: SLACK_CHANNEL, text: msg, thread_ts: ts });

  // Send failed test details in chunks of 5
  if (summary.failed_tests.length > 0) {
    const chunks = chunk(summary.failed_tests, 5);

    for (let i = 0; i < chunks.length; i++) {
      const batch = chunks[i];
      const lines: string[] = [];

      if (i > 0) {
        const start = i * 5 + 1;
        const end = Math.min(start + batch.length - 1, summary.failed_tests.length);
        lines.push(`*Failures ${start}-${end} of ${summary.failed_tests.length}:*\n`);
      }

      for (const test of batch) {
        const errorText = truncate(test.error, 200);
        lines.push(`*${test.name}*\n\`\`\`${errorText}\`\`\`\n`);
      }

      await postSlack({
        channel: SLACK_CHANNEL,
        text: lines.join('\n'),
        thread_ts: ts,
      });
      console.log(`  Failure batch ${i + 1}/${chunks.length} sent (${batch.length} tests)`);
    }
  }
}

// ──────────────────────────────────────────────────────────────
// Slack API
// ──────────────────────────────────────────────────────────────

async function postSlack(
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; ts?: string } | null> {
  if (!SLACK_BOT_TOKEN) return null;

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error(`  Slack HTTP error: ${res.status} ${res.statusText}`);
    return null;
  }

  const data = (await res.json()) as { ok: boolean; ts?: string; error?: string };
  if (!data.ok) {
    console.error(`  Slack API error: ${data.error}`);
    return null;
  }

  return data;
}

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

function getThreadTs(): string | null {
  // Prefer env var (set by GA job output), fallback to file
  const fromEnv = process.env.SLACK_THREAD_TS;
  if (fromEnv) return fromEnv;

  if (fs.existsSync(THREAD_TS_FILE)) {
    return fs.readFileSync(THREAD_TS_FILE, 'utf-8').trim();
  }

  console.log('  No SLACK_THREAD_TS found — skipping thread reply');
  return null;
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);
  return parts.join(' ');
}

function truncate(str: string, max: number): string {
  const clean = str.replace(/\n/g, ' ');
  return clean.length > max ? clean.slice(0, max) + '...' : clean;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
