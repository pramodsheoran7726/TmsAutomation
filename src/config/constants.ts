// ──────────────────────────────────────────────────────────────
// TIMEOUTS — How long to wait before considering something failed
// ──────────────────────────────────────────────────────────────
export const TIMEOUTS = {
  short: 5_000,         // 5 sec  — quick checks (element exists?)
  medium: 15_000,       // 15 sec — search results, dropdowns
  long: 30_000,         // 30 sec — page loads, form submissions
  extraLong: 60_000,    // 60 sec — heavy pages, file uploads
  pageLoad: 60_000,     // 60 sec — full page navigation
  animation: 2_000,     // 2 sec  — CSS animations / transitions
  poll: 10_000,         // 10 sec — single polling interval
  reportGeneration: 420_000, // 7 min — report PDF generation
} as const;

// ──────────────────────────────────────────────────────────────
// RETRY — How many times to retry a flaky or async action
// ──────────────────────────────────────────────────────────────
export const RETRY = {
  defaultAttempts: 3,      // Standard retry count for most actions
  delayBetweenMs: 2_000,   // 2 sec pause between retry attempts

  // Per-feature retry overrides (used in test.describe.configure)
  insightsRetries: 2,      // Insights page — data sync can be slow
  jiraRetries: 3,          // Jira integration — external API dependency
  ciRetries: 2,            // CI pipeline — automatic retries on failure
} as const;

// ──────────────────────────────────────────────────────────────
// POLL — Long-running polling for async data (API sync, reports)
// ──────────────────────────────────────────────────────────────
export const POLL = {
  maxWaitSeconds: 120,         // 2 min  — general polling timeout
  intervalSeconds: 10,         // 10 sec — pause between poll attempts
  insightsTimeoutSeconds: 120, // 2 min  — Insights data sync per metric (4 metrics polled sequentially)
} as const;

// ──────────────────────────────────────────────────────────────
// CI — Settings specific to CI/CD pipeline execution
// ──────────────────────────────────────────────────────────────
export const CI_CONFIG = {
  workers: 3,           // Number of parallel browser instances in CI
  retries: RETRY.ciRetries,
} as const;

// ──────────────────────────────────────────────────────────────
// ROUTES — TMS application page paths (appended to tmsBaseUrl)
// ──────────────────────────────────────────────────────────────
export const ROUTES = {
  settingsFields: '/settings/fields',
  settingsCustomFields: '/settings/fields/custom',
} as const;

// ──────────────────────────────────────────────────────────────
// API_PATHS — Backend API endpoint patterns (appended to tmsApiUrl)
// ──────────────────────────────────────────────────────────────
export const API_PATHS = {
  projects: '/api/v1/projects',
  project: (id: string) => `/api/v1/projects/${id}`,
  testCases: (projectId: string) => `/api/v1/projects/${projectId}/test-cases`,
  testCase: (projectId: string, testCaseId: string) => `/api/v1/projects/${projectId}/test-cases/${testCaseId}`,
  testRuns: (projectId: string) => `/api/v1/projects/${projectId}/test-runs`,
  testRun: (projectId: string, testRunId: string) => `/api/v1/projects/${projectId}/test-runs/${testRunId}`,
} as const;

// ──────────────────────────────────────────────────────────────
// RANDOM_LENGTH — Character counts for auto-generated test names
// ──────────────────────────────────────────────────────────────
export const RANDOM_LENGTH = {
  short: 5,       // Tags, suffixes
  medium: 8,      // Field names, dropdown values
  standard: 10,   // Project names, test case names
  long: 20,       // Descriptions
  extraLong: 30,  // Edited names (clearly different from original)
} as const;

// ──────────────────────────────────────────────────────────────
// TEST_DATA — File names and default values for test data
// ──────────────────────────────────────────────────────────────
// Base directories for test data files
export const DATA_DIRS = {
  attachments: 'src/data/attachments',
  csv: 'src/data/csv',
  images: 'src/data/images',
  apps: 'src/data/apps',
} as const;

export const TEST_DATA = {
  // CSV files → src/data/csv/
  sampleCsvFile: 'data/sample_data.csv',
  sampleBddCsvFile: 'data/sample_BDD_testStep.csv',
  sampleSelectionCsvFile: 'data/sample_Selection.csv',
  // Attachments → src/data/attachments/
  sampleAttachment: 'attachments/sampleexample.txt',
  // Images → src/data/images/
  screenshotFile: 'images/Screenshot0.png',
  // Mobile apps → src/data/apps/
  androidApp: 'apps/QATestApp.apk',
  iosApp: 'apps/QATestApp.ipa',
  iosFLApp: 'apps/TMS_FL_APP.zip',
  // Default names
  defaultProjectName: 'LambdaTest Automation',
  runtimeTcName: 'RunTimeAutomationTestcase',
} as const;

// ──────────────────────────────────────────────────────────────
// JIRA — Jira integration constants
// ──────────────────────────────────────────────────────────────
export const JIRA = {
  issueEndpoint: '/issue/',
  testMuTriggerComment: '@TestMu AI Cloud test this',
  lambdatestAiResponsePrefix: 'LambdaTest AI Cloud',
  lambdatestAiResponseContains: 'I have started generating test scenarios',
  loginScenarioSummary: 'Login Feature - Verify user authentication flow',
  loginScenarioDescription: `Test the login functionality of the application.

Acceptance Criteria:
1. User should be able to login with valid credentials
2. User should see appropriate error message for invalid credentials
3. User should be redirected to dashboard after successful login
4. Login session should be maintained across page refreshes
5. User should be able to logout successfully`,
} as const;
