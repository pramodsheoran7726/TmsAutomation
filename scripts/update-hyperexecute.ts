/**
 * Pre-flight script: updates hyperexecute.yaml in-place before HE CLI runs.
 *
 * Resolves env vars (auth, URLs, Slack, ReportLab) and CLI flags (--concurrency, --retries)
 * so that HyperExecute remote machines receive the correct runtime config.
 *
 * Usage:
 *   TEST_ENV=stage TEST_SUITE=@smoke npx tsx scripts/update-hyperexecute.ts --concurrency 3 --retries 2
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { parse, stringify } from 'yaml';

// ── ENV → URL mapping (self-contained; mirrors src/config/env.config.ts) ──

type TestEnvironment = 'stage' | 'eu-stage' | 'prod' | 'eu-prod';

const ENV_URLS: Record<TestEnvironment, {
  authUrl: string;
  baseUrl: string;
  tmsBaseUrl: string;
  tmsApiUrl: string;
  tmsInsightsApi: string;
  hubUrl: string;
  apiUrl: string;
}> = {
  stage: {
    authUrl: 'https://stage-auth.lambdatestinternal.com',
    baseUrl: 'https://stage-accounts.lambdatestinternal.com',
    tmsBaseUrl: 'https://stage-web-frontend.lambdatestinternal.com',
    tmsApiUrl: 'https://stage-test-manager-api.lambdatestinternal.com',
    tmsInsightsApi: 'https://stage-api.lambdatestinternal.com/tms/insights',
    hubUrl: 'https://stage-hub.lambdatestinternal.com',
    apiUrl: 'https://stage-api.lambdatestinternal.com',
  },
  'eu-stage': {
    authUrl: 'https://stage-auth.lambdatestinternal.com',
    baseUrl: 'https://stage-eu-accounts.lambdatestinternal.com',
    tmsBaseUrl: 'https://stage-web-frontend.lambdatestinternal.com',
    tmsApiUrl: 'https://stage-test-manager-api.lambdatestinternal.com',
    tmsInsightsApi: 'https://stage-api.lambdatestinternal.com/tms/insights',
    hubUrl: 'https://stage-hub.lambdatestinternal.com',
    apiUrl: 'https://stage-api.lambdatestinternal.com',
  },
  prod: {
    authUrl: 'https://auth.lambdatest.com',
    baseUrl: 'https://accounts.lambdatest.com',
    tmsBaseUrl: 'https://test-manager.lambdatest.com',
    tmsApiUrl: 'https://test-manager-api.lambdatest.com',
    tmsInsightsApi: 'https://api.lambdatest.com/tms/insights',
    hubUrl: 'https://hub.lambdatest.com',
    apiUrl: 'https://api.lambdatest.com',
  },
  'eu-prod': {
    authUrl: 'https://auth.lambdatest.com',
    baseUrl: 'https://eu-accounts.lambdatest.com',
    tmsBaseUrl: 'https://test-manager.lambdatest.com',
    tmsApiUrl: 'https://test-manager-api.lambdatest.com',
    tmsInsightsApi: 'https://api.lambdatest.com/tms/insights',
    hubUrl: 'https://hub.lambdatest.com',
    apiUrl: 'https://api.lambdatest.com',
  },
};

// ── CLI arg parser ──

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key.startsWith('--') && i + 1 < argv.length) {
      args[key.slice(2)] = argv[++i];
    }
  }
  return args;
}

// ── Main ──

function main() {
  const args = parseArgs(process.argv.slice(2));
  const yamlPath = resolve(process.cwd(), 'hyperexecute.yaml');
  const raw = readFileSync(yamlPath, 'utf-8');

  // Preserve the cacheKey template — yaml parser would mangle {{ checksum }}
  const cacheKeyMatch = raw.match(/cacheKey:\s*'([^']+)'/);
  const cacheKeyValue = cacheKeyMatch?.[1] ?? '{{ checksum "package-lock.json" }}';

  const doc = parse(raw);

  // ── Resolve environment ──
  const testEnv = (process.env.TEST_ENV || 'stage') as TestEnvironment;
  const testSuite = process.env.TEST_SUITE || '@smoke';
  const urls = ENV_URLS[testEnv] ?? ENV_URLS.stage;

  // ── Build env block with resolved values ──
  doc.env = {
    // Core
    TEST_ENV: testEnv,
    TEST_SUITE: testSuite,
    TEST_MODE: process.env.TEST_MODE || 'remote',

    // Auth credentials (critical — these must reach remote machines)
    AUTH_EMAIL: process.env.AUTH_EMAIL || '',
    AUTH_PASSWORD: process.env.AUTH_PASSWORD || '',
    AUTH_TOKEN: process.env.AUTH_TOKEN || '',

    // LambdaTest creds
    LT_USERNAME: process.env.LT_USERNAME || '',
    LT_ACCESS_KEY: process.env.LT_ACCESS_KEY || '',

    // Resolved URLs
    AUTH_URL: process.env.AUTH_URL || urls.authUrl,
    BASE_URL: process.env.BASE_URL || urls.baseUrl,
    TMS_BASE_URL: process.env.TMS_BASE_URL || urls.tmsBaseUrl,
    TMS_API_URL: process.env.TMS_API_URL || urls.tmsApiUrl,
    TMS_INSIGHTS_API: process.env.TMS_INSIGHTS_API || urls.tmsInsightsApi,
    HUB_URL: process.env.HUB_URL || urls.hubUrl,
    API_URL: process.env.API_URL || urls.apiUrl,

    // ReportLab
    REPORT_LAB_ENABLED: process.env.REPORT_LAB_ENABLED || 'true',
    REPORT_LAB_URL: process.env.REPORT_LAB_URL || '',

    // Slack
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN || '',
    SLACK_CHANNEL: process.env.SLACK_CHANNEL || '',
    SLACK_MENTIONS: process.env.SLACK_MENTIONS || '',

    // Build metadata
    HE_BUILD_ID: process.env.HE_BUILD_ID || '',
  };

  // ── Concurrency ──
  if (args.concurrency) {
    doc.concurrency = parseInt(args.concurrency, 10);
  }

  // ── Retries (retryOnFailure is a bool; maxRetries is a separate top-level key) ──
  if (args.retries) {
    const maxRetries = parseInt(args.retries, 10);
    doc.retryOnFailure = maxRetries > 0;
    doc.maxRetries = maxRetries;
  }

  // ── Resilience flags ──
  doc.mergeArtifacts = true;
  doc.alwaysRunPostSteps = true;

  // ── Serialize back ──
  let output = stringify(doc, { lineWidth: 0, singleQuote: true });

  // Restore cacheKey template literal (yaml stringifies it as a plain string)
  output = output.replace(
    /cacheKey:\s*.+/,
    `cacheKey: '${cacheKeyValue}'`,
  );

  writeFileSync(yamlPath, `---\n${output}`);

  console.log(`[update-hyperexecute] Updated hyperexecute.yaml`);
  console.log(`  env        = ${testEnv}`);
  console.log(`  suite      = ${testSuite}`);
  console.log(`  concurrency= ${doc.concurrency}`);
  if (doc.maxRetries) {
    console.log(`  retries    = ${doc.maxRetries}`);
  }
}

main();
