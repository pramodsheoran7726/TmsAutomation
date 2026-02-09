# TMS Playwright Automation - Architecture

End-to-end test automation framework for **LambdaTest Test Manager (TMS)** built with Playwright Test and TypeScript.

---

## Code Structure

```
TMS-Playwright-Automation/
│
├── playwright.config.ts               # Playwright configuration (env-driven)
├── package.json                       # npm scripts + dependencies
├── tsconfig.json                      # TypeScript compiler settings
├── .env.example                       # Environment template (copy to .env)
│
├── scripts/                           # CLI scripts
│   ├── run-tests.js                   #   npm test wrapper (resolves --env → project + URLs)
│   └── pw.js                          #   pw CLI shorthand
│
├── src/                               # Framework source code
│   │
│   ├── config/                        # ── CONFIGURATION ──
│   │   ├── constants.ts               #   Single source of truth: timeouts, retries,
│   │   │                              #   polling, CI settings, routes, API paths,
│   │   │                              #   random lengths, test data, Jira strings
│   │   └── env.config.ts              #   Environment URLs + credentials
│   │                                  #   (4 envs: stage, eu-stage, prod, eu-prod)
│   │
│   ├── auth/                          # ── AUTHENTICATION ──
│   │   └── auth.setup.ts              #   Runs FIRST: API login → save cookies
│   │                                  #   to .auth/user.json
│   │
│   ├── fixtures/                      # ── FIXTURES ──
│   │   └── tms.fixture.ts             #   Extends Playwright test with:
│   │                                  #   - 18 page object fixtures
│   │                                  #   - 3 component fixtures (toast, delete, search)
│   │                                  #   - 2 API client fixtures (TMS + Jira)
│   │                                  #   - 1 apiSetup fixture (CRUD + auto-cleanup)
│   │
│   ├── pages/                         # ── PAGE OBJECTS (18 modules) ──
│   │   ├── base.page.ts               #   Minimal base: loc(), tpl(), isVisible()
│   │   ├── navigation.page.ts         #   Sidebar navigation helpers
│   │   │
│   │   ├── project/                   #   Project CRUD
│   │   │   ├── project.page.ts        #     Actions: create, open, edit, delete
│   │   │   └── project.locators.ts    #     XPath + CSS selectors
│   │   │
│   │   ├── test-case/                 #   Test Case management
│   │   │   ├── test-case.page.ts
│   │   │   └── test-case.locators.ts
│   │   │
│   │   ├── test-run/                  #   Test Run execution
│   │   │   ├── test-run.page.ts
│   │   │   └── test-run.locators.ts
│   │   │
│   │   ├── folder/                    #   Folder tree operations
│   │   │   ├── folder.page.ts
│   │   │   └── folder.locators.ts
│   │   │
│   │   ├── build/                     #   Build management
│   │   │   ├── build.page.ts
│   │   │   └── build.locators.ts
│   │   │
│   │   ├── configuration/             #   Environment configs (OS/browser/device)
│   │   │   ├── configuration.page.ts
│   │   │   └── configuration.locators.ts
│   │   │
│   │   ├── settings/                  #   System + Custom Fields
│   │   │   ├── settings.page.ts
│   │   │   └── settings.locators.ts
│   │   │
│   │   ├── report/                    #   Report generation + polling
│   │   │   ├── report.page.ts
│   │   │   └── report.locators.ts
│   │   │
│   │   ├── insights/                  #   Insights dashboard + metrics
│   │   │   ├── insights.page.ts
│   │   │   └── insights.locators.ts
│   │   │
│   │   ├── milestone/                 #   Milestone tracking
│   │   │   ├── milestone.page.ts
│   │   │   └── milestone.locators.ts
│   │   │
│   │   ├── dataset/                   #   Dataset management
│   │   │   ├── dataset.page.ts
│   │   │   └── dataset.locators.ts
│   │   │
│   │   ├── csv-import/                #   CSV import flows
│   │   │   ├── csv-import.page.ts
│   │   │   └── csv-import.locators.ts
│   │   │
│   │   ├── jira-integration/          #   Jira integration UI
│   │   │   ├── jira-integration.page.ts
│   │   │   └── jira.locators.ts
│   │   │
│   │   ├── module/                    #   Reusable module steps
│   │   │   ├── module.page.ts
│   │   │   └── module.locators.ts
│   │   │
│   │   ├── sdk/                       #   SDK test execution
│   │   │   ├── sdk.page.ts
│   │   │   └── sdk.locators.ts
│   │   │
│   │   ├── automation/                #   Automation dashboard
│   │   │   ├── automation.page.ts
│   │   │   └── automation.locators.ts
│   │   │
│   │   └── kaneai/                    #   KaneAI integration
│   │       ├── kaneai.page.ts
│   │       └── kaneai.locators.ts
│   │
│   ├── components/                    # ── SHARED UI COMPONENTS ──
│   │   ├── index.ts                   #   Barrel export
│   │   ├── toast.component.ts         #   Toast notification helpers
│   │   ├── delete-dialog.component.ts #   Delete confirmation dialog
│   │   └── search.component.ts        #   Search input helpers
│   │
│   ├── api/                           # ── API CLIENTS ──
│   │   ├── tms.api.ts                 #   TMS REST API: insights + CRUD
│   │   │                              #   (createProject, deleteProject,
│   │   │                              #    createTestCase, createTestRun)
│   │   └── jira.api.ts                #   Jira REST API: issues, comments,
│   │                                  #   AI response polling
│   │
│   ├── types/                         # ── TYPE DEFINITIONS ──
│   │   ├── insights.types.ts          #   TCSummaryInsightsData request/response
│   │   ├── jira.types.ts              #   Jira ADF document, issue, comment types
│   │   └── configuration.types.ts     #   ConfigurationRequest interface
│   │
│   ├── data/                          # ── TEST DATA (parameterized) ──
│   │   ├── test-data.ts               #   Data generators: project, test case,
│   │   │                              #   test run, build, folder, config,
│   │   │                              #   milestone, report, module
│   │   ├── custom-fields.data.ts      #   7 custom field type configs for
│   │   │                              #   data-driven tests
│   │   └── test-case-priorities.data.ts  # Priority levels (Critical/High/Medium/Low)
│   │
│   └── utils/                         # ── UTILITIES ──
│       ├── waits.ts                   #   Smart waits: waitForNetworkIdle,
│       │                              #   clickAndWaitForNetwork,
│       │                              #   fillAndWaitForSearch, waitForDomReady
│       ├── retry.ts                   #   retryAction() — configurable attempts + delay
│       ├── api.helper.ts              #   HTTP client: GET/POST/DELETE with
│       │                              #   Bearer auth, Basic auth
│       ├── random.helper.ts           #   Random name generators: project, test case,
│       │                              #   test run, build, folder, config, etc.
│       ├── url.helper.ts              #   URL builders: createUrl(), jiraApiUrl()
│       └── test-data.ts               #   Data generators (same as data/test-data.ts)
│
├── tests/                             # ── TEST SPECIFICATIONS (31 spec files) ──
│   ├── project/                       #   1 spec  (CRUD)
│   ├── test-case/                     #   2 specs (create, edit)
│   ├── test-run/                      #   3 specs (CRUD, bulk, execute)
│   ├── folder/                        #   3 specs (CRUD, copy-move, drag-drop)
│   ├── build/                         #   1 spec  (CRUD)
│   ├── configuration/                 #   1 spec  (CRUD)
│   ├── settings/                      #   3 specs (system-fields, custom-fields,
│   │                                  #            custom-fields-parameterized)
│   ├── report/                        #   4 specs (date-range, test-runs,
│   │                                  #            priority-filter, multiple-filters)
│   ├── insights/                      #   3 specs (validation, date-range, mixed-status)
│   ├── milestone/                     #   3 specs (CRUD, search-filter, testrun)
│   ├── dataset/                       #   1 spec  (CRUD)
│   ├── csv-import/                    #   1 spec  (import flow)
│   ├── module/                        #   1 spec  (CRUD)
│   ├── sdk/                           #   1 spec  (SDK run)
│   ├── automation/                    #   1 spec  (link test case)
│   ├── kaneai/                        #   1 spec  (automate flow)
│   └── jira-integration/              #   1 spec  (Jira + TestMu AI)
│
└── .auth/                             # ── AUTH STATE (auto-generated) ──
    └── user.json                      #   Saved browser cookies + localStorage
```

---

## How It Works (Execution Flow)

```
 ┌────────────────────────────────────────────────────────┐
 │  npm test  (or npm run test:smoke, test:eu, etc.)      │
 └───────────────────────┬────────────────────────────────┘
                         │
                         ▼
 ┌────────────────────────────────────────────────────────┐
 │  scripts/run-tests.js                                  │
 │  1. Read --env flag (default: stage)                   │
 │  2. Map env → project name (us-chromium / eu-chromium) │
 │  3. Set TEST_ENV and run: npx playwright test          │
 └───────────────────────┬────────────────────────────────┘
                         │
                         ▼
 ┌────────────────────────────────────────────────────────┐
 │  playwright.config.ts                                  │
 │  Reads TEST_ENV → creates 2 projects:                  │
 │                                                        │
 │  Project 1: "setup"                                    │
 │    └─ Runs auth.setup.ts (API login, save cookies)     │
 │                                                        │
 │  Project 2: "us-chromium" or "eu-chromium"             │
 │    └─ Depends on setup                                 │
 │    └─ Loads saved cookies from .auth/user.json         │
 │    └─ Runs all test specs                              │
 └───────────────────────┬────────────────────────────────┘
                         │
                         ▼
 ┌────────────────────────────────────────────────────────┐
 │  Each Test                                             │
 │  1. Fixture auto-navigates to TMS home page            │
 │  2. Test uses page objects (projectPage, testRunPage…)  │
 │  3. Page objects use BasePage methods (click, wait…)    │
 │  4. Assertions verify expected outcomes                │
 └────────────────────────────────────────────────────────┘
```

---

## Layered Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        TEST LAYER                                │
│  tests/**/*.spec.ts                                              │
│  - Test scenarios written in Playwright test format              │
│  - Import { test, expect } from fixtures                        │
│  - Use page objects for all UI interactions                      │
│  - Tagged with @smoke or @regression                            │
├─────────────────────────────────────────────────────────────────┤
│                       FIXTURE LAYER                              │
│  src/fixtures/tms.fixture.ts                                     │
│  - Extends Playwright's base test                               │
│  - Injects 18 page objects + 2 API clients + apiSetup           │
│  - Auto-navigates to TMS URL before each test                   │
│  - apiSetup: CRUD via API with automatic cleanup                │
├─────────────────────────────────────────────────────────────────┤
│                    PAGE OBJECT LAYER                              │
│  src/pages/<feature>/<feature>.page.ts                           │
│  - One class per feature, extends BasePage                      │
│  - Uses direct Playwright APIs (locator.click(), .fill(), etc.) │
│  - Every method wrapped in test.step() for report traceability  │
│  - Selectors separated in <feature>.locators.ts                 │
│                                                                  │
│  src/pages/base.page.ts (minimal — 32 lines)                   │
│  - loc(selector): auto-detect XPath vs CSS                      │
│  - tpl(selector, replacements): template {{key}} → value        │
│  - isVisible(selector): check visibility (true/false)           │
│                                                                  │
│  src/components/ (shared UI components)                          │
│  - ToastComponent, DeleteDialogComponent, SearchComponent       │
│                                                                  │
│  src/utils/waits.ts (smart wait functions)                      │
│  - waitForNetworkIdle, clickAndWaitForNetwork,                  │
│    fillAndWaitForSearch, clickAndWaitForResponse                 │
│                                                                  │
│  src/utils/retry.ts (retry utility)                             │
│  - retryAction: configurable attempts, delay, label for logs    │
├─────────────────────────────────────────────────────────────────┤
│                       API LAYER                                  │
│  src/api/tms.api.ts       → TMS CRUD + Insights                │
│  src/api/jira.api.ts      → Jira issues + comments + polling   │
│  src/utils/api.helper.ts  → HTTP: GET, POST, DELETE            │
│                              Auth: Bearer token, Basic auth     │
├─────────────────────────────────────────────────────────────────┤
│                    CONFIG + DATA LAYER                            │
│  src/config/constants.ts   → All tunable values (single file)   │
│  src/config/env.config.ts  → URLs + credentials per environment │
│  src/data/*.ts             → Parameterized test data            │
│  src/utils/random.helper.ts → Random name generators            │
│  src/types/*.ts            → TypeScript type definitions        │
├─────────────────────────────────────────────────────────────────┤
│                   INFRASTRUCTURE LAYER                            │
│  playwright.config.ts      → Test runner configuration          │
│  src/auth/auth.setup.ts    → One-time login before all tests    │
│  scripts/run-tests.js      → CLI wrapper (env → project map)   │
│  .auth/user.json           → Saved browser state (cookies)      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Environment System

One variable (`TEST_ENV`) controls everything. Each environment maps to a fixed region and set of URLs.

```
  TEST_ENV        Region     Project Name     Account URL
  ─────────       ──────     ────────────     ───────────
  stage           US         us-chromium      stage-accounts.lambdatestinternal.com
  eu-stage        EU         eu-chromium      stage-eu-accounts.lambdatestinternal.com
  prod            US         us-chromium      accounts.lambdatest.com
  eu-prod         EU         eu-chromium      eu-accounts.lambdatest.com
```

**Key rule:** One env = One region = One project = One set of URLs. No mixing.

Config files involved:
- `env.config.ts` — defines all URLs per environment
- `playwright.config.ts` — reads `TEST_ENV` to pick project name + baseURL
- `scripts/run-tests.js` — maps `--env` flag to `TEST_ENV` environment variable

---

## Playwright Config (2 Projects per Run)

| Project | What it does | Depends on |
|---------|-------------|------------|
| `setup` | API login → saves cookies to `.auth/user.json` | nothing |
| `us-chromium` or `eu-chromium` | Runs all test specs with saved auth state | `setup` |

**Settings:**

| Setting | Local | CI |
|---------|-------|----|
| Parallel execution | Yes (half CPU cores) | Yes (3 workers) |
| Test timeout | 120 sec | 120 sec |
| Expect timeout | 15 sec | 15 sec |
| Action timeout | 30 sec | 30 sec |
| Navigation timeout | 60 sec | 60 sec |
| Retries | 0 | 2 |
| Screenshots | On failure | On failure |
| Traces | On first retry | On first retry |

---

## Authentication Flow

```
┌─────────────────────────────────────────────┐
│  auth.setup.ts (runs once before all tests) │
│                                             │
│  1. POST /api/login                         │
│     ├── email: AUTH_EMAIL (.env)             │
│     ├── password: AUTH_PASSWORD (.env)       │
│     └── Returns: session cookies            │
│                                             │
│  2. Navigate to /dashboard                  │
│     └── Cookies settle on the domain        │
│                                             │
│  3. Save state → .auth/user.json            │
│     └── Cookies + localStorage              │
└──────────────────┬──────────────────────────┘
                   │
                   ▼ (all tests load this file)
┌─────────────────────────────────────────────┐
│  Each test starts pre-authenticated         │
│  No login UI needed                         │
└─────────────────────────────────────────────┘
```

---

## Page Object Model (POM)

### Structure

Every feature follows the same 2-file pattern:

```
src/pages/<feature>/
├── <feature>.page.ts         # Page class (extends BasePage)
│                             # Contains business methods:
│                             #   createProject(), deleteProject(), etc.
│
└── <feature>.locators.ts     # Selector constants
                              # XPath and CSS selectors only
                              # No logic, just strings
```

### BasePage (minimal — 32 lines)

Page objects extend `BasePage` which provides only three methods. All UI interactions
use direct Playwright APIs (`locator.click()`, `locator.fill()`, etc.) instead of
wrapper methods.

```
BasePage (base.page.ts)
│
│  loc(selector)                → Auto-detect XPath vs CSS, return Locator
│  tpl(selector, replacements)  → Template: {{key}} → value
│  isVisible(selector, timeout) → Check visibility (true/false, never throws)
│
├── NavigationPage             → Sidebar navigation to all modules
├── ProjectPage                → Project CRUD, open/delete/edit
├── TestCasePage               → Create/edit test cases, steps, tags
├── TestRunPage                → Create/execute test runs, mark status
├── FolderPage                 → Folder tree: create, rename, drag-drop
├── BuildPage                  → Build CRUD
├── ConfigurationPage          → Environment configs (OS/browser/device)
├── SettingsPage               → System fields + custom fields
├── ReportPage                 → Report creation, filters, polling
├── InsightsPage               → Dashboard metrics, date ranges, charts
├── MilestonePage              → Milestone CRUD, progress tracking
├── DatasetPage                → Dataset management
├── CsvImportPage              → CSV import flows
├── JiraIntegrationPage        → Jira integration UI
├── ModulePage                 → Reusable module steps
├── SdkPage                    → SDK test execution
├── AutomationPage             → Link test cases to automation
└── KaneaiPage                 → KaneAI web/mobile automation
```

### Standalone Utilities (not in BasePage)

Smart waits and retry are standalone functions imported where needed:

```
src/utils/waits.ts
├── waitForNetworkIdle(page)              → Wait for APIs to finish (falls back to DOM ready)
├── waitForDomReady(page)                 → Wait for DOM loaded
├── clickAndWaitForNetwork(page, locator) → Click + wait for APIs to finish
├── clickAndWaitForResponse(page, ...)    → Click + wait for specific API response
└── fillAndWaitForSearch(page, ...)       → Fill input + wait for search results

src/utils/retry.ts
└── retryAction(page, action, options)    → Retry a function N times with delay
```

### Shared UI Components

Reusable cross-feature UI patterns extracted into standalone components:

```
src/components/
├── toast.component.ts          → Toast notification assertions
├── delete-dialog.component.ts  → Delete confirmation flow
└── search.component.ts         → Search input helpers
```

### test.step() Pattern

Every page object method wraps its logic in `test.step()` for Allure/HTML report traceability:

```typescript
async createProject(): Promise<void> {
  await test.step('Create project with tag and description', async () => {
    await this.loc(L.projectTitle).fill(this.projectName);
    await this.loc(L.projectCreate).click();
    await expect.soft(this.loc(L.createdProject(this.projectName))).toBeVisible();
  });
}
```

### Selector Strategy

```typescript
// BasePage.loc() auto-detects XPath vs CSS:
loc('//button[text()="Submit"]')        // → XPath (starts with / or ()
loc('input[placeholder="Search"]')      // → CSS  (everything else)

// Dynamic locators — functions that return selectors:
export const createdProject = (name: string) => `//a[text()='${name}']`;

// Template selectors — replace {{placeholders}} at runtime:
this.tpl('//li[text()="{{days}}"]', { days: 'Last 30 Days' })
```

---

## Fixture System

All tests import `test` and `expect` from `src/fixtures/tms.fixture.ts` — never from `@playwright/test` directly.

### Available Fixtures

| Fixture | Type | What it provides |
|---------|------|-----------------|
| **Page Objects** | | |
| `page` | Page | Browser page, auto-navigated to TMS |
| `nav` | NavigationPage | Sidebar navigation |
| `projectPage` | ProjectPage | Project CRUD |
| `testCasePage` | TestCasePage | Test case management |
| `testRunPage` | TestRunPage | Test run management |
| `buildPage` | BuildPage | Build management |
| `folderPage` | FolderPage | Folder operations |
| `configPage` | ConfigurationPage | Browser configurations |
| `settingsPage` | SettingsPage | System + custom fields |
| `csvImportPage` | CsvImportPage | CSV import |
| `datasetPage` | DatasetPage | Dataset management |
| `milestonePage` | MilestonePage | Milestone management |
| `reportPage` | ReportPage | Report generation |
| `insightsPage` | InsightsPage | Insights dashboard |
| `jiraPage` | JiraIntegrationPage | Jira integration UI |
| `sdkPage` | SdkPage | SDK execution |
| `automationPage` | AutomationPage | Automation dashboard |
| `kaneaiPage` | KaneaiPage | KaneAI |
| `modulePage` | ModulePage | Reusable modules |
| **Shared Components** | | |
| `toast` | ToastComponent | Toast notification assertions |
| `deleteDialog` | DeleteDialogComponent | Delete confirmation dialog |
| `search` | SearchComponent | Search input helpers |
| **API Clients** | | |
| `tmsApi` | TmsApi | TMS REST API (insights, CRUD) |
| `jiraApi` | JiraApi | Jira REST API (issues, comments) |
| **Test Setup** | | |
| `apiSetup` | ApiSetup | Create projects/test cases/runs via API. Auto-deletes all created projects when test ends. |

---

## API Layer

```
ApiHelper (src/utils/api.helper.ts)
│
│  HTTP Methods:
│  ├── post(url, data)                     → Plain POST
│  ├── get(url)                            → Plain GET
│  ├── postWithAuth(url, data, token)      → POST + Bearer token
│  ├── getWithAuth(url, token)             → GET + Bearer token
│  ├── deleteWithAuth(url, token)          → DELETE + Bearer token
│  ├── postWithBasicAuth(url, data, email, token)  → POST + Basic auth
│  └── getWithBasicAuth(url, email, token)          → GET + Basic auth
│
│  All methods return: { status: number, body: T }
│
├── TmsApi (src/api/tms.api.ts)
│   ├── getTCSummaryInsightsData()    → Insights metrics (ElasticSearch aggs)
│   ├── createProject(name)          → POST /api/v1/projects
│   ├── deleteProject(id)            → DELETE /api/v1/projects/{id}
│   ├── createTestCase(projectId, title)     → POST /api/v1/projects/{id}/test-cases
│   └── createTestRun(projectId, name, ids)  → POST /api/v1/projects/{id}/test-runs
│
└── JiraApi (src/api/jira.api.ts)
    ├── createJiraIssue()                    → Create task with login scenario
    ├── addTestMuTriggerComment(issueKey)     → Add @TestMu AI trigger
    ├── waitForLambdaTestAIResponse(issueKey) → Poll for AI response (up to 2 min)
    └── getIssueComments(issueKey)            → Get all comments
```

---

## Constants (Single Source of Truth)

All tunable values live in **one file**: `src/config/constants.ts`

```
constants.ts
│
├── TIMEOUTS          → Wait durations (short 5s, medium 15s, long 30s, etc.)
├── RETRY             → Retry counts (default 3, Jira 3, Insights 2, CI 2)
├── POLL              → Polling settings (max 2 min, interval 10s, insights 5 min)
├── CI_CONFIG         → CI pipeline settings (3 workers, 2 retries)
├── ROUTES            → TMS page paths (/settings/fields)
├── API_PATHS         → API endpoint patterns (/api/v1/projects, etc.)
├── RANDOM_LENGTH     → Name lengths (short 5, medium 8, standard 10, long 20, extraLong 30)
├── TEST_DATA         → Sample file names (CSV, APK, screenshots)
└── JIRA              → Jira strings (trigger comment, response prefix, scenario)
```

---

## Test Data Generation

```
Random Name Generators (src/utils/random.helper.ts)
├── randomString(length)         → Random alpha string
├── randomProjectName()          → "AutoProject_aBcDeFgH"
├── randomTestCaseName()         → "AutoTC_aBcDeFgH"
├── randomTestRunName()          → "AutoTR_aBcDeFgH"
├── randomBuildName()            → "AutoBuild_aBcDeFgH"
├── randomFolderName()           → "AutoFolder_aBcDeFgH"
├── randomConfigName()           → "AutoConfig_aBcDeFgH"
├── randomMilestoneName()        → "AutoMilestone_aBcDeFgH"
├── randomReportName()           → "AutoReport_aBcDeFgH"
├── randomModuleName()           → "AutoModule_aBcDeFgH"
└── randomEmail()                → "test_aBcDeFgH@automation.test"

Test Data Generators (src/data/test-data.ts)
├── generateProjectData()        → { name, description, tag }
├── generateTestCaseData()       → { title, stepDescription, tag }
├── generateTestRunData()        → { name, description, tag }
├── generateBuildData()          → { name, tag }
├── generateFolderData()         → { name, subfolderName }
├── generateConfigData()         → { name }
├── generateCustomFieldData()    → { title, placeholder, dropdownValue1, dropdownValue2 }
├── generateSystemValueData()    → { name }
├── generateMilestoneData()      → { name, description }
├── generateReportData()         → { name, description, updatedName }
└── generateModuleData()         → { name, description, tag, step }

Parameterized Data (for data-driven tests)
├── CUSTOM_FIELD_TYPES           → 7 field types (Text, Textarea, Number, Checkbox,
│                                   Date, Dropdown, URL) with locator configs
└── TEST_CASE_PRIORITIES         → 4 priority levels (Critical, High, Medium, Low)
```

---

## Type Definitions

```
src/types/
├── insights.types.ts
│   ├── TCSummaryInsightsDataRequest    → ElasticSearch aggregation query
│   └── TCSummaryInsightsDataResponse   → Insights data array
│
├── jira.types.ts
│   ├── JiraIssueRequest / JiraCommentRequest  → Request bodies
│   ├── JiraAdfDocument / JiraAdfContent       → Atlassian Doc Format
│   └── Helper functions: createJiraIssueRequest(), createJiraCommentRequest()
│
└── configuration.types.ts
    └── ConfigurationRequest            → OS/browser/device config
```

---

## Test Patterns

### Standard Test (with Allure annotations)

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
    await projectPage.deleteProject();
  });
});
```

### Serial Tests (for shared global state)

```typescript
test.describe('Settings', { tag: ['@regression'] }, () => {
  test.describe.configure({ mode: 'serial' });

  test('create custom field', async ({ settingsPage }) => { ... });
  test('verify custom field', async ({ settingsPage }) => { ... });
});
```

### Data-Driven Tests

```typescript
import { CUSTOM_FIELD_TYPES } from '../../src/data/custom-fields.data.js';

for (const [typeName, config] of CUSTOM_FIELD_TYPES) {
  test(`should create ${typeName} custom field`, async ({ settingsPage }) => {
    await settingsPage.createCustomFieldByType(fieldName, config);
  });
}
```

### API-Based Test Setup (faster than UI)

```typescript
test('with API setup', async ({ apiSetup, insightsPage }) => {
  // Create test data via API (fast)
  const project = await apiSetup.createProject('MyProject');
  const tc = await apiSetup.createTestCase(project.id, 'MyTestCase');

  // Test logic using UI
  await insightsPage.navigateToInsights();
  // ... assertions ...

  // Cleanup happens automatically when test ends
});
```

---

## Retry Behavior

| Where | Retries | Why |
|-------|---------|-----|
| All tests in CI | 2 | Catch transient environment flakes |
| Jira integration tests | 3 | External API — network/timeout dependency |
| Insights tests | 2 | Data sync delay — metrics appear asynchronously |
| In-page actions (retryAction) | 3 | UI rendering — item may not appear instantly after creation |

---

## Test Coverage by Feature

| Feature | Spec Directory | Spec Files | What's Tested |
|---------|---------------|------------|---------------|
| Project | `tests/project/` | 1 | CRUD (create, edit, delete) |
| Test Case | `tests/test-case/` | 2 | Create with type/priority/status, edit |
| Test Run | `tests/test-run/` | 3 | CRUD, bulk operations, execution |
| Folder | `tests/folder/` | 3 | CRUD, copy/move, drag-drop |
| Build | `tests/build/` | 1 | CRUD (create, edit, duplicate) |
| Configuration | `tests/configuration/` | 1 | CRUD (Windows, Mac, mobile) |
| Settings | `tests/settings/` | 3 | System fields, custom fields, parameterized |
| Report | `tests/report/` | 4 | Date range, test runs, priority, multi-filter |
| Insights | `tests/insights/` | 3 | Validation, date range, mixed status |
| Milestone | `tests/milestone/` | 3 | CRUD, search/filter, test run linking |
| Dataset | `tests/dataset/` | 1 | CRUD |
| CSV Import | `tests/csv-import/` | 1 | Import flow |
| Module | `tests/module/` | 1 | CRUD |
| SDK | `tests/sdk/` | 1 | SDK run |
| Automation | `tests/automation/` | 1 | Link test case |
| KaneAI | `tests/kaneai/` | 1 | Automate flow |
| Jira | `tests/jira-integration/` | 1 | Jira + TestMu AI response |

**Total: 31 spec files across 17 feature areas**

---

## npm Scripts

| Script | What it does |
|--------|-------------|
| `npm test` | Run all tests (US Staging) |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Playwright interactive UI |
| `npm run test:list` | List all tests without running |
| `npm run test:smoke` | Run `@smoke` tests only |
| `npm run test:regression` | Run `@regression` tests only |
| `npm run test:eu` | Run all tests (EU Staging) |
| `npm run test:eu:smoke` | Smoke tests on EU Staging |
| `npm run test:eu:regression` | Regression on EU Staging |
| `npm run test:ci` | CI: smoke + 2 retries |
| `npm run test:ci:full` | CI: regression + 2 retries |
| `npm run typecheck` | TypeScript type check |
| `npm run report:allure` | Generate + open Allure report |
| `npm run report:html` | Open Playwright HTML report |

---

## Reporting

Three reporters are configured in `playwright.config.ts`:

| Reporter | Output | View Command |
|----------|--------|--------------|
| HTML | `playwright-report/` | `npm run report:html` |
| List | Console stdout | (live during run) |
| Allure | `allure-results/` | `npm run report:allure` |

Test specs include `annotation` metadata (feature, severity) that Allure uses to
categorize results. Page object methods use `test.step()` so each action appears
as a named step in both HTML and Allure reports.

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Playwright Test | ^1.49.0 | Browser automation + test runner |
| TypeScript | ^5.7.0 | Type-safe test authoring |
| Node.js | 18+ | Runtime |
| dotenv | ^16.4.7 | Environment variable management |
| allure-playwright | ^3.4.5 | Allure report generation |
