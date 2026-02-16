import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { CI_CONFIG } from './src/config/constants.js';
import {
  REMOTE_TIMEOUTS,
  REMOTE_WORKERS,
} from './src/config/lambdatest.config.js';

dotenv.config();

// ──────────────────────────────────────────────────────────────
// TEST_ENV decides WHICH environment + region to run against
// ──────────────────────────────────────────────────────────────
//   stage     →  US Staging   (default)
//   eu-stage  →  EU Staging
//   prod      →  US Production
//   eu-prod   →  EU Production
// ──────────────────────────────────────────────────────────────
const TEST_ENV = process.env.TEST_ENV ?? 'stage';

// ──────────────────────────────────────────────────────────────
// TEST_MODE: "local" (default) or "remote" (LambdaTest grid)
// ──────────────────────────────────────────────────────────────
const TEST_MODE = process.env.TEST_MODE ?? 'local';
const isRemote = TEST_MODE === 'remote';

const PROJECT_NAME: Record<string, string> = {
  'stage':    'us-chromium',
  'eu-stage': 'eu-chromium',
  'prod':     'us-chromium',
  'eu-prod':  'eu-chromium',
};

const BASE_URLS: Record<string, string> = {
  'stage':    'https://stage-accounts.lambdatestinternal.com',
  'eu-stage': 'https://stage-eu-accounts.lambdatestinternal.com',
  'prod':     'https://accounts.lambdatest.com',
  'eu-prod':  'https://eu-accounts.lambdatest.com',
};

const projectName = PROJECT_NAME[TEST_ENV] ?? PROJECT_NAME['stage'];
const baseURL = process.env.BASE_URL ?? BASE_URLS[TEST_ENV] ?? BASE_URLS['stage'];
const AUTH_FILE = '.auth/user.json';

// ──────────────────────────────────────────────────────────────
// Worker count: remote grid is limited by LT plan concurrency
// ──────────────────────────────────────────────────────────────
function getWorkerCount(): number | undefined {
  if (isRemote) return REMOTE_WORKERS;
  if (process.env.CI) return CI_CONFIG.workers;
  return undefined; // uses --workers CLI flag or Playwright default
}

export default defineConfig({
  globalSetup: './src/setup/global-setup.ts',
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0, // controlled via --retries CLI flag
  workers: getWorkerCount(),
  reporter: [
    ['html', { open: 'never' }],
    ['./src/reporters/step-reporter.ts'],
    ['./src/reporters/flaky-reporter.ts'],
    ['allure-playwright'],
    ...(process.env.REPORT_LAB_ENABLED === 'true'
      ? [['./src/reporters/report-lab.reporter.ts'] as const]
      : []),
  ],

  // Remote grid: inflate timeouts to account for network latency
  timeout: isRemote ? REMOTE_TIMEOUTS.test : 120_000,
  expect: { timeout: isRemote ? REMOTE_TIMEOUTS.expect : 15_000 },

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: isRemote ? REMOTE_TIMEOUTS.action : 30_000,
    navigationTimeout: isRemote ? REMOTE_TIMEOUTS.navigation : 60_000,
    // Remote mode: LT grid connection is handled per-test in tms.fixture.ts
    // (each test gets its own session with its name in the capabilities)
  },

  projects: [
    // Single test project — name and URLs driven by TEST_ENV
    // Auth handled by globalSetup (not a test project)
    {
      name: projectName,
      testIgnore: '**/api/**',
      use: {
        ...devices['Desktop Chrome'],
        baseURL,
        storageState: AUTH_FILE,
      },
    },

    // API-only tests — no browser needed
    {
      name: 'api',
      testDir: './tests/api',
      testMatch: '**/*.api.spec.ts',
    },
  ],
});
