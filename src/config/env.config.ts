import * as dotenv from 'dotenv';
dotenv.config();

function env(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

// ──────────────────────────────────────────────────────────────
// SUPPORTED ENVIRONMENTS
// ──────────────────────────────────────────────────────────────
//   stage     →  US Staging   (default)
//   eu-stage  →  EU Staging
//   prod      →  US Production
//   eu-prod   →  EU Production
//
// Set via:  TEST_ENV=eu-stage npm test
//      or:  npm test -- --env eu-stage
// ──────────────────────────────────────────────────────────────

export type TestEnvironment = 'stage' | 'eu-stage' | 'prod' | 'eu-prod';

export const TEST_ENV = env('TEST_ENV', 'stage') as TestEnvironment;
const isStage = TEST_ENV === 'stage' || TEST_ENV === 'eu-stage';
const isEu = TEST_ENV === 'eu-stage' || TEST_ENV === 'eu-prod';

/** Full URL set for each environment — one env = one region = one set of URLs */
const ENV_URLS: Record<TestEnvironment, {
  authUrl: string;
  baseUrl: string;
  tmsBaseUrl: string;
  tmsApiUrl: string;
  tmsInsightsApi: string;
  hubUrl: string;
  apiUrl: string;
  cookieDomain: string;
}> = {
  // ── US Staging ──
  stage: {
    authUrl: 'https://stage-auth.lambdatestinternal.com',
    baseUrl: 'https://stage-accounts.lambdatestinternal.com',
    tmsBaseUrl: 'https://stage-web-frontend.lambdatestinternal.com',
    tmsApiUrl: 'https://stage-test-manager-api.lambdatestinternal.com',
    tmsInsightsApi: 'https://stage-api.lambdatestinternal.com/tms/insights',
    hubUrl: 'https://stage-hub.lambdatestinternal.com',
    apiUrl: 'https://stage-api.lambdatestinternal.com',
    cookieDomain: '.lambdatestinternal.com',
  },
  // ── EU Staging ──
  'eu-stage': {
    authUrl: 'https://stage-auth.lambdatestinternal.com',
    baseUrl: 'https://stage-eu-accounts.lambdatestinternal.com',
    tmsBaseUrl: 'https://stage-web-frontend.lambdatestinternal.com',
    tmsApiUrl: 'https://stage-test-manager-api.lambdatestinternal.com',
    tmsInsightsApi: 'https://stage-api.lambdatestinternal.com/tms/insights',
    hubUrl: 'https://stage-hub.lambdatestinternal.com',
    apiUrl: 'https://stage-api.lambdatestinternal.com',
    cookieDomain: '.lambdatestinternal.com',
  },
  // ── US Production ──
  prod: {
    authUrl: 'https://auth.lambdatest.com',
    baseUrl: 'https://accounts.lambdatest.com',
    tmsBaseUrl: 'https://test-manager.lambdatest.com',
    tmsApiUrl: 'https://test-manager-api.lambdatest.com',
    tmsInsightsApi: 'https://api.lambdatest.com/tms/insights',
    hubUrl: 'https://hub.lambdatest.com',
    apiUrl: 'https://api.lambdatest.com',
    cookieDomain: '.lambdatest.com',
  },
  // ── EU Production ──
  'eu-prod': {
    authUrl: 'https://auth.lambdatest.com',
    baseUrl: 'https://eu-accounts.lambdatest.com',
    tmsBaseUrl: 'https://test-manager.lambdatest.com',
    tmsApiUrl: 'https://test-manager-api.lambdatest.com',
    tmsInsightsApi: 'https://api.lambdatest.com/tms/insights',
    hubUrl: 'https://hub.lambdatest.com',
    apiUrl: 'https://api.lambdatest.com',
    cookieDomain: '.lambdatest.com',
  },
};

const urls = ENV_URLS[TEST_ENV];

export const EnvConfig = {
  testEnv: TEST_ENV,
  isStage,
  isEu,

  ltUsername: env('LT_USERNAME') || env('HE_USERNAME'),
  ltAccessKey: env('LT_ACCESS_KEY') || env('HE_ACCESS_KEY'),

  authUrl: env('AUTH_URL', urls.authUrl),
  baseUrl: env('BASE_URL', urls.baseUrl),
  tmsBaseUrl: env('TMS_BASE_URL', urls.tmsBaseUrl),
  tmsApiUrl: env('TMS_API_URL', urls.tmsApiUrl),
  hubUrl: env('HUB_URL', urls.hubUrl),
  apiUrl: env('API_URL', urls.apiUrl),
  cookieDomain: urls.cookieDomain,

  jiraBaseUrl: env('JIRA_BASE_URL'),
  jiraApiVersion: env('JIRA_API_VERSION', '/rest/api/3'),
  jiraEmail: env('JIRA_EMAIL'),
  jiraApiToken: env('JIRA_API_TOKEN'),
  jiraProjectKey: env('JIRA_PROJECT_KEY', 'LAT'),

  tmsInsightsApi: env('TMS_INSIGHTS_API', urls.tmsInsightsApi),

  authEmail: env('AUTH_EMAIL'),
  authPassword: env('AUTH_PASSWORD'),
  authToken: env('AUTH_TOKEN'),
} as const;
