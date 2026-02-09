import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { CI_CONFIG } from './src/config/constants.js';

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

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? CI_CONFIG.retries : 0,
  workers: process.env.CI ? CI_CONFIG.workers : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['./src/reporters/step-reporter.ts'],
    ['allure-playwright'],
  ],
  timeout: 120_000,
  expect: { timeout: 15_000 },

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },

  projects: [
    // Auth setup — runs first, no storageState
    {
      name: 'setup',
      testDir: './src/setup',
      testMatch: 'auth.setup.ts',
    },

    // Single test project — name and URLs driven by TEST_ENV
    {
      name: projectName,
      dependencies: ['setup'],
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
