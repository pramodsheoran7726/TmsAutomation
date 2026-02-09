# TMS Playwright Automation

End-to-end test automation framework for **LambdaTest Test Manager (TMS)** built with [Playwright](https://playwright.dev/) and TypeScript.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Environments](#environments)
- [How to Run Tests](#how-to-run-tests)
- [Test Tags](#test-tags)
- [Configuration Reference](#configuration-reference)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Writing Tests](#writing-tests)
- [Fixtures](#fixtures)
- [Retry Behavior](#retry-behavior)
- [Reports](#reports)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# 1. Install dependencies
npm install
npx playwright install chromium

# 2. Copy env file and fill in your credentials
cp .env.example .env

# 3. Run smoke tests (US Staging — default)
npm run test:smoke

# 4. Verify setup
npm run test:list
```

---

## Environments

One variable — `TEST_ENV` — controls **which environment and region** your tests target.

| `TEST_ENV` | Region | Environment | Playwright Project |
|------------|--------|-------------|--------------------|
| `stage` | US | Staging | us-chromium |
| `eu-stage` | EU | Staging | eu-chromium |
| `prod` | US | Production | us-chromium |
| `eu-prod` | EU | Production | eu-chromium |

> **Default:** `stage` (US Staging)
> Set `TEST_ENV` in your `.env` file, or pass `--env` at the command line.

### How URLs are resolved

Each environment maps to a **single set of URLs**. No mixing of regions.

| Service | Staging | Production |
|---------|---------|------------|
| Auth | stage-auth.lambdatestinternal.com | auth.lambdatest.com |
| Accounts (US) | stage-accounts.lambdatestinternal.com | accounts.lambdatest.com |
| Accounts (EU) | stage-eu-accounts.lambdatestinternal.com | eu-accounts.lambdatest.com |
| TMS Frontend | stage-web-frontend.lambdatestinternal.com | test-manager.lambdatest.com |
| TMS API | stage-test-manager-api.lambdatestinternal.com | test-manager-api.lambdatest.com |
| Hub | stage-hub.lambdatestinternal.com | hub.lambdatest.com |

You can override any URL individually via environment variables (e.g., `BASE_URL`, `TMS_BASE_URL`).

---

## How to Run Tests

### Everyday Commands

| What you want to do | Command |
|---|---|
| Run **all** tests (US Staging) | `npm test` |
| Run **smoke** tests only | `npm run test:smoke` |
| Run **regression** tests only | `npm run test:regression` |
| Run **all** tests (EU Staging) | `npm run test:eu` |
| Run **smoke** tests (EU Staging) | `npm run test:eu:smoke` |
| Run **regression** (EU Staging) | `npm run test:eu:regression` |
| Run with **browser visible** | `npm run test:headed` |
| Open **Playwright UI** mode | `npm run test:ui` |
| **List** all tests (don't run) | `npm run test:list` |
| **TypeScript** type check | `npm run typecheck` |
| Open **Allure** report | `npm run report:allure` |
| Open **HTML** report | `npm run report:html` |

### Targeting a Specific Environment

```bash
# US Production
npm test -- --env prod

# EU Production
npm test -- --env eu-prod

# EU Production — smoke only
npm run test:smoke -- --env eu-prod
```

### Running Specific Tests

```bash
# Single test file
npm test -- tests/project/project-crud.spec.ts

# Tests matching a keyword
npm test -- --grep "should create"

# Single test in debug mode
npm test -- tests/project/project-crud.spec.ts --debug
```

### CI/CD Pipeline

| What you want to do | Command |
|---|---|
| CI smoke (with retries) | `npm run test:ci` |
| CI full regression (with retries) | `npm run test:ci:full` |

In CI: **3 parallel workers**, **2 automatic retries**, screenshots on failure, traces on first retry.

### All npm Scripts Reference

| Script | What it does |
|--------|-------------|
| `npm test` | Run all tests on default env (US Staging) |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Open Playwright interactive UI |
| `npm run test:list` | List all tests without running |
| `npm run test:smoke` | Run only `@smoke` tagged tests |
| `npm run test:regression` | Run only `@regression` tagged tests |
| `npm run test:eu` | Run all tests on EU Staging |
| `npm run test:eu:smoke` | Run smoke tests on EU Staging |
| `npm run test:eu:regression` | Run regression tests on EU Staging |
| `npm run test:ci` | CI: smoke tests with 2 retries |
| `npm run test:ci:full` | CI: full regression with 2 retries |
| `npm run typecheck` | TypeScript compilation check (no output) |
| `npm run report:allure` | Generate and open Allure report |
| `npm run report:html` | Open Playwright HTML report |

---

## Test Tags

Tests are tagged for selective execution:

| Tag | Purpose | Test Count | Run with |
|-----|---------|------------|----------|
| `@smoke` | Quick validation — core CRUD flows | 11 tests | `npm run test:smoke` |
| `@regression` | Full coverage — all features | 55+ tests | `npm run test:regression` |

### What smoke tests cover

| Feature | Tests included |
|---------|---------------|
| Project | Create, Edit, Delete |
| Test Case | Create with type, priority, status, attachment |
| Test Run | Create (basic), Create + Delete |
| Folder | Create, Rename, Delete |
| Build | Create, Edit, Duplicate |
| Configuration | Create Windows config, Create + Delete |
| Milestone | Create, Edit + Delete |
| Dataset | Create and manage |

---

## Configuration Reference

All tunable values live in **one file**: [`src/config/constants.ts`](src/config/constants.ts)

### Timeouts

| Name | Value | When it's used |
|------|-------|----------------|
| `TIMEOUTS.short` | 5 sec | Quick checks — "is this element present?" |
| `TIMEOUTS.medium` | 15 sec | Search results, dropdowns appearing |
| `TIMEOUTS.long` | 30 sec | Page loads, form submissions |
| `TIMEOUTS.extraLong` | 60 sec | Heavy pages, file uploads |
| `TIMEOUTS.pageLoad` | 60 sec | Full page navigation |
| `TIMEOUTS.animation` | 2 sec | CSS animation / transition delays |
| `TIMEOUTS.poll` | 10 sec | Single polling interval |
| `TIMEOUTS.reportGeneration` | 7 min | Report PDF generation |

### Playwright-Level Timeouts

| Setting | Value |
|---------|-------|
| Test timeout (per test) | 120 sec |
| Expect timeout | 15 sec |
| Action timeout (click/fill) | 30 sec |
| Navigation timeout | 60 sec |

### Retry Settings

| Name | Value | Meaning |
|------|-------|---------|
| `RETRY.defaultAttempts` | 3 | How many times to retry a flaky in-page action |
| `RETRY.delayBetweenMs` | 2 sec | Pause between retry attempts |
| `RETRY.insightsRetries` | 2 | Extra test-level retries for Insights tests |
| `RETRY.jiraRetries` | 3 | Extra test-level retries for Jira integration |
| `RETRY.ciRetries` | 2 | Automatic retries for all tests in CI |

### Polling

| Name | Value | Used for |
|------|-------|----------|
| `POLL.maxWaitSeconds` | 2 min | General polling (e.g., Jira AI response) |
| `POLL.intervalSeconds` | 10 sec | Pause between poll attempts |
| `POLL.insightsTimeoutSeconds` | 5 min | Insights data sync polling |

### CI Settings

| Name | Value | Meaning |
|------|-------|---------|
| `CI_CONFIG.workers` | 3 | Parallel browser instances in CI |
| `CI_CONFIG.retries` | 2 | Auto-retries for failed tests in CI |

### Other Constants

| Name | What it contains |
|------|-----------------|
| `ROUTES` | TMS app page paths (e.g., `/settings/fields`) |
| `API_PATHS` | Backend API endpoint patterns (e.g., `/api/v1/projects`) |
| `RANDOM_LENGTH` | Character lengths for generated test names (5, 8, 10, 20, 30) |
| `TEST_DATA` | Sample file names used in tests |
| `JIRA` | Jira integration strings and templates |

---

## Project Structure

```
TMS-Playwright-Automation/
│
├── tests/                        # Test spec files (one folder per feature)
│   ├── project/                  #   Project CRUD
│   ├── test-case/                #   Test Case create / edit
│   ├── test-run/                 #   Test Run CRUD + execution
│   ├── settings/                 #   System Fields, Custom Fields (+ parameterized)
│   ├── insights/                 #   Insights Dashboard validation
│   ├── folder/                   #   Folder CRUD, copy/move, drag-drop
│   ├── build/                    #   Build management
│   ├── configuration/            #   Browser configurations
│   ├── milestone/                #   Milestone CRUD + search
│   ├── report/                   #   Report generation + filters
│   ├── dataset/                  #   Dataset management
│   ├── csv-import/               #   CSV import
│   ├── module/                   #   Reusable module steps
│   ├── sdk/                      #   SDK test execution
│   ├── automation/               #   Automation dashboard
│   ├── kaneai/                   #   KaneAI integration
│   └── jira-integration/         #   Jira + TestMu AI
│
├── src/                          # Framework source code
│   ├── config/
│   │   ├── constants.ts          #   ALL timeouts, retries, paths (single source of truth)
│   │   └── env.config.ts         #   Environment URLs and credentials
│   ├── pages/                    #   Page Object Model (one folder per feature)
│   │   ├── base.page.ts          #   Minimal base: loc(), tpl(), isVisible()
│   │   ├── navigation.page.ts    #   Global nav helpers
│   │   └── <feature>/            #   feature.page.ts + feature.locators.ts
│   ├── components/               #   Shared UI components (toast, delete, search)
│   ├── fixtures/
│   │   └── tms.fixture.ts        #   Playwright fixtures (all page objects + API setup)
│   ├── api/                      #   API helpers (TMS CRUD + Jira)
│   ├── data/                     #   Parameterized test data (custom fields, priorities)
│   ├── auth/                     #   Login setup (runs once before all tests)
│   ├── types/                    #   TypeScript type definitions
│   └── utils/                    #   Smart waits, retry, random helpers, URL helpers
│
├── scripts/
│   ├── run-tests.js              #   npm test runner (resolves --env to project + URLs)
│   └── pw.js                     #   `pw` CLI wrapper
│
├── playwright.config.ts          #   Playwright configuration (reads TEST_ENV)
├── .env.example                  #   Environment template — copy to .env
├── .env                          #   Your local credentials (not committed)
├── tsconfig.json                 #   TypeScript config
└── package.json                  #   npm scripts + dependencies
```

---

## Architecture

### Authentication Flow

```
1. auth.setup.ts runs FIRST
   ├── POST /api/login (email + password)
   ├── Navigate to /dashboard (settle cookies)
   └── Save auth state → .auth/user.json

2. Test project (us-chromium or eu-chromium) runs AFTER
   ├── Loads .auth/user.json (pre-authenticated, no login needed)
   └── Runs all test specs
```

### Page Object Model

Every feature has a folder under `src/pages/` with two files:

```
src/pages/project/
├── project.page.ts          # ProjectPage class (actions: create, open, delete, etc.)
└── project.locators.ts      # Selector constants (XPath + CSS)
```

All page classes extend `BasePage` (32 lines), which provides only:

| Method | What it does |
|--------|-------------|
| `loc(selector)` | Auto-detect XPath vs CSS, return Playwright Locator |
| `tpl(selector, replacements)` | Replace `{{key}}` placeholders in selector strings |
| `isVisible(selector, timeout)` | Check visibility (true/false, never throws) |

Page objects use **direct Playwright APIs** (`locator.click()`, `locator.fill()`, etc.) instead of wrapper methods. Each action is wrapped in `test.step()` for report traceability.

Smart waits and retry are standalone utility functions:

| Utility | File | Functions |
|---------|------|-----------|
| **Smart Waits** | `src/utils/waits.ts` | `waitForNetworkIdle`, `clickAndWaitForNetwork`, `fillAndWaitForSearch`, `clickAndWaitForResponse` |
| **Retry** | `src/utils/retry.ts` | `retryAction` (configurable attempts, delay, label) |

Shared UI patterns are extracted into components:

| Component | File | Purpose |
|-----------|------|---------|
| `ToastComponent` | `src/components/toast.component.ts` | Toast notification helpers |
| `DeleteDialogComponent` | `src/components/delete-dialog.component.ts` | Delete confirmation flow |
| `SearchComponent` | `src/components/search.component.ts` | Search input helpers |

### Selector Convention

`BasePage.loc()` auto-detects XPath vs CSS:

```typescript
loc('//button[text()="Submit"]')       // → XPath (starts with / or ()
loc('input[placeholder="Search"]')     // → CSS  (everything else)
```

Dynamic locators are functions:

```typescript
createdProject: (name: string) => `//a[text()='${name}']`
```

---

## Writing Tests

### Basic test (with Allure annotations)

```typescript
import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Feature Name', {
  tag: ['@smoke', '@regression'],
  annotation: [
    { type: 'feature', description: 'Feature Area Name' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should do something', async ({ projectPage, testCasePage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    // Cleanup
    await projectPage.deleteProject();
  });
});
```

### Key patterns

**Always import from fixtures** (not from `@playwright/test`):

```typescript
import { test, expect } from '../../src/fixtures/tms.fixture.js';  // correct
```

**Auto-navigation** — every test starts at the TMS home page automatically.

**Soft assertions** — use `expect.soft()` so one failure doesn't abort the whole test:

```typescript
await expect.soft(element).toBeVisible({ timeout: TIMEOUTS.long });
```

**Serial mode** — for tests that share global state (like Settings):

```typescript
test.describe.configure({ mode: 'serial' });
```

**Data-driven tests** — loop over test data arrays:

```typescript
for (const [typeName, config] of CUSTOM_FIELD_TYPES) {
  test(`should create ${typeName} custom field`, async ({ settingsPage }) => {
    await settingsPage.createCustomFieldByType(fieldName, config);
  });
}
```

---

## Fixtures

Import `test` and `expect` from `src/fixtures/tms.fixture.ts` to get all page objects auto-injected:

| Fixture | Type | Description |
|---------|------|-------------|
| `page` | Page | Auto-navigated to TMS base URL |
| `projectPage` | ProjectPage | Project CRUD |
| `testCasePage` | TestCasePage | Test case management |
| `testRunPage` | TestRunPage | Test run management |
| `buildPage` | BuildPage | Build management |
| `folderPage` | FolderPage | Folder operations |
| `configPage` | ConfigurationPage | Browser configurations |
| `settingsPage` | SettingsPage | System & custom fields |
| `csvImportPage` | CsvImportPage | CSV import |
| `datasetPage` | DatasetPage | Dataset management |
| `milestonePage` | MilestonePage | Milestone management |
| `reportPage` | ReportPage | Report generation |
| `insightsPage` | InsightsPage | Insights dashboard |
| `jiraPage` | JiraIntegrationPage | Jira integration UI |
| `sdkPage` | SdkPage | SDK execution |
| `automationPage` | AutomationPage | Automation dashboard |
| `kaneaiPage` | KaneaiPage | KaneAI integration |
| `modulePage` | ModulePage | Reusable modules |
| `toast` | ToastComponent | Toast notification assertions |
| `deleteDialog` | DeleteDialogComponent | Delete confirmation dialog |
| `search` | SearchComponent | Search input helpers |
| `tmsApi` | TmsApi | TMS REST API client |
| `jiraApi` | JiraApi | Jira REST API client |
| `apiSetup` | ApiSetup | API-based test data setup with auto-cleanup |

### apiSetup fixture

For faster test setup, use `apiSetup` to create test data via API instead of UI:

```typescript
test('example', async ({ apiSetup, insightsPage }) => {
  const project = await apiSetup.createProject('MyProject');
  const tc = await apiSetup.createTestCase(project.id, 'MyTestCase');
  // ... test logic ...
  // Cleanup happens automatically when the test ends
});
```

---

## Retry Behavior

| Where | Retries | Why |
|-------|---------|-----|
| All tests in CI | 2 | Automatic — catches transient failures |
| Jira integration tests | 3 | External API — network/timeout flakes |
| Insights tests | 2 | Data sync delay — metrics take time to appear |
| In-page actions (search, open project) | 3 | UI rendering — newly created items may not appear instantly |

---

## Reports

Three reporters are configured:

| Reporter | Output Directory | View Command |
|----------|-----------------|--------------|
| **HTML** (Playwright) | `playwright-report/` | `npm run report:html` |
| **List** | Console stdout | (live during run) |
| **Allure** | `allure-results/` | `npm run report:allure` |

### Allure Report

Test specs include `annotation` metadata (feature, severity) and page objects use `test.step()`, so Allure reports show:
- Feature categorization
- Severity levels (critical, normal, minor)
- Named steps for each page object action

```bash
# Generate and open Allure report
npm run report:allure
```

### Playwright HTML Report

```bash
npm run report:html
```

### Test Artifacts (on failure)

| Artifact | Location |
|----------|----------|
| Screenshot | `test-results/<test-name>/test-failed-1.png` |
| Trace | `test-results/<test-name>/trace.zip` (on first retry) |

View a trace:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

---

## .env Setup

```bash
cp .env.example .env
```

### Required

| Variable | Description |
|----------|-------------|
| `TEST_ENV` | `stage`, `eu-stage`, `prod`, or `eu-prod` |
| `LT_USERNAME` | LambdaTest username |
| `LT_ACCESS_KEY` | LambdaTest access key |
| `AUTH_EMAIL` | Login email for TMS |
| `AUTH_PASSWORD` | Login password |
| `AUTH_TOKEN` | API auth token |

### Optional (Jira tests only)

| Variable | Description |
|----------|-------------|
| `JIRA_BASE_URL` | Jira instance URL |
| `JIRA_EMAIL` | Jira account email |
| `JIRA_API_TOKEN` | Jira API token |
| `JIRA_PROJECT_KEY` | Jira project key (default: `LAT`) |

---

## Troubleshooting

### Auth fails (401/403)

- Verify `AUTH_EMAIL`, `AUTH_PASSWORD`, and `AUTH_TOKEN` in `.env`
- Delete `.auth/user.json` and re-run to force fresh auth
- Check if the account has TMS access

### Wrong environment running

- Check `TEST_ENV` in your `.env` file
- Console output shows the resolved env: `env: eu-stage (TEST_ENV=eu-stage, project=eu-chromium)`
- Override inline: `TEST_ENV=eu-stage npm run test:smoke`

### Locator timeout errors

- The TMS UI may have changed — update selectors in `src/pages/<feature>/<feature>.locators.ts`
- Debug with: `npm test -- tests/project/project-crud.spec.ts --debug`
- Check failure screenshots in `test-results/`

### Tests are slow

- Use `@smoke` tag for quick validation: `npm run test:smoke`
- Locally, tests run with half your CPU cores as workers
- In CI, tests run with 3 parallel workers

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev/) | ^1.49.0 | Browser automation and test runner |
| [TypeScript](https://www.typescriptlang.org/) | ^5.7.0 | Type-safe test authoring |
| [Node.js](https://nodejs.org/) | 18+ | Runtime |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^16.4.7 | Environment variable management |
| [allure-playwright](https://www.npmjs.com/package/allure-playwright) | ^3.4.5 | Allure report generation |
