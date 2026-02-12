# Variable Systems Reference

[<- Back to Main](../TMS_AGENT.md)

---

## Variable Systems in TmsAutomation

The TmsAutomation framework (TypeScript 5.7 + Playwright Test 1.49) uses several variable and configuration systems for test execution, data management, and runtime state.

---

## 1. Environment Variables (.env)

Environment variables control test execution behavior. They are loaded from a `.env` file at the project root or set via the command line.

### Core Variables

| Variable | Description | Values / Example |
|----------|-------------|------------------|
| `TEST_ENV` | Target environment | `stage`, `eu-stage`, `prod`, `eu-prod` |
| `TEST_MODE` | Execution mode | `local`, `remote` |
| `AUTH_EMAIL` | Login email | `user@example.com` |
| `AUTH_PASSWORD` | Login password | `Password123` |
| `AUTH_TOKEN` | Optional API token | `lt-token-xxx` |
| `LT_USERNAME` | LambdaTest username | `lambdatest-user` |
| `LT_ACCESS_KEY` | LambdaTest access key | `your-access-key` |

### .env File Example

```
TEST_ENV=stage
TEST_MODE=local
AUTH_EMAIL=user@example.com
AUTH_PASSWORD=Password123
AUTH_TOKEN=optional-token
LT_USERNAME=lambdatest-user
LT_ACCESS_KEY=access-key
```

### Usage in Code

```typescript
// Environment variables are read by EnvConfig (see section 2)
// Direct access is rarely needed, but possible:
const env = process.env.TEST_ENV;
```

### Command-Line Overrides

```bash
# Override environment for a single run
TEST_ENV=eu-stage npx playwright test

# Override credentials
AUTH_EMAIL=other@example.com AUTH_PASSWORD=OtherPass npx playwright test
```

---

## 2. EnvConfig (src/config/env.config.ts)

The `EnvConfig` object reads environment variables and provides typed, resolved configuration values. Import it wherever you need base URLs, API endpoints, or auth settings.

```typescript
import { EnvConfig } from '../config/env.config.js';
```

### Available Properties

| Property | Description | Example Value |
|----------|-------------|---------------|
| `EnvConfig.authUrl` | Authentication URL | `https://accounts.lambdatest.com` |
| `EnvConfig.baseUrl` | LambdaTest base URL | `https://stage.lambdatest.com` |
| `EnvConfig.tmsBaseUrl` | Test Manager base URL | `https://test-manager.lambdatest.com` |
| `EnvConfig.tmsApiUrl` | TMS API base URL | `https://test-manager-api.lambdatest.com` |
| `EnvConfig.tmsInsightsApi` | TMS Insights API URL | `https://tms-insights-api.lambdatest.com` |
| `EnvConfig.hubUrl` | Remote hub URL | `https://hub.lambdatest.com` |
| `EnvConfig.apiUrl` | General API URL | `https://api.lambdatest.com` |
| `EnvConfig.cookieDomain` | Cookie domain for auth | `.lambdatest.com` |

### Usage Examples

```typescript
// Navigate to TMS
await page.goto(EnvConfig.tmsBaseUrl);

// Build API endpoint
const apiEndpoint = `${EnvConfig.tmsApiUrl}/projects`;

// Use in page object
class ProjectPage extends BasePage {
  async navigateToProjects(): Promise<void> {
    await this.page.goto(`${EnvConfig.tmsBaseUrl}/projects`);
  }
}
```

---

## 3. Constants (src/config/constants.ts)

Constants provide reusable, named values for timeouts, retry settings, polling intervals, route patterns, API paths, and random string lengths.

```typescript
import { TIMEOUTS, RETRY, POLL, ROUTES, API_PATHS, RANDOM_LENGTH } from '../config/constants.js';
```

### Timeout Constants

| Constant | Value | Use Case |
|----------|-------|----------|
| `TIMEOUTS.short` | 5000ms | Quick element checks |
| `TIMEOUTS.medium` | 15000ms | Standard operations |
| `TIMEOUTS.long` | 30000ms | Page loads, API waits |

### Other Constants

```typescript
// Retry configuration
RETRY.maxAttempts   // Maximum retry count
RETRY.delay         // Delay between retries (ms)

// Polling intervals
POLL.interval       // Polling interval (ms)
POLL.timeout        // Polling timeout (ms)

// Route patterns (used for navigation verification)
ROUTES.projects     // e.g., '/projects'
ROUTES.testCases    // e.g., '/test-cases'

// API path segments
API_PATHS.projects  // e.g., '/api/v1/projects'

// Random string lengths for test data
RANDOM_LENGTH.standard  // Standard random string length
```

### Usage Examples

```typescript
// Assertion with timeout
await expect(locator).toBeVisible({ timeout: TIMEOUTS.long });

// Wait helper with timeout
await waitForNetworkIdle(page, TIMEOUTS.medium);

// URL verification with route
await expect(page).toHaveURL(new RegExp(ROUTES.projects));
```

---

## 4. Fixtures (src/fixtures/tms.fixture.ts)

Playwright fixtures provide page objects, components, API clients, and compound fixtures to test specs. They handle instantiation, dependency injection, and lifecycle management.

```typescript
import { test, expect } from '../fixtures/tms.fixture.js';
```

### Fixture Categories

**Page Object Fixtures** provide instances of page classes:

```typescript
test('example', async ({ projectPage, testCasePage, testRunPage }) => {
  await projectPage.createProject();
  await testCasePage.createTestCase();
});
```

**Component Fixtures** provide shared UI components:

```typescript
test('example', async ({ toast, deleteDialog, search }) => {
  await search.searchFor('my project');
  await toast.verifyMessage('Project created');
});
```

**API Fixtures** provide API client instances:

```typescript
test('example', async ({ tmsApi, jiraApi }) => {
  const project = await tmsApi.createProject({ name: 'Test Project' });
});
```

**Compound Fixtures** set up prerequisite state for tests:

```typescript
// projectOnly: Creates a project before the test
test('example', async ({ projectOnly }) => {
  // Project already exists, test starts from project context
});

// projectWithTestCase: Creates a project and a test case
test('example', async ({ projectWithTestCase }) => {
  // Both project and test case exist
});
```

### How Fixtures Work

Fixtures are defined in `src/fixtures/tms.fixture.ts` using `test.extend()`:

```typescript
import { test as base } from '@playwright/test';

export const test = base.extend<{
  projectPage: ProjectPage;
  toast: ToastComponent;
  tmsApi: TmsApi;
  projectOnly: ProjectPage;
}>({
  projectPage: async ({ page }, use) => {
    await use(new ProjectPage(page));
  },
  toast: async ({ page }, use) => {
    await use(new ToastComponent(page));
  },
  // ... more fixtures
});

export { expect } from '@playwright/test';
```

---

## 5. Test Data (src/data/)

Test data modules provide factory functions and constant data for tests.

### Generated Test Data

```typescript
import { generateProjectData } from '../data/test-data.js';

// Returns an object with randomized project properties
const projectData = generateProjectData();
// { name: 'AutoProject_a8f3k29x', description: '...', ... }
```

### Static Test Data

```typescript
import { customFieldsData } from '../data/custom-fields.data.js';

// Predefined custom field configurations for testing
const fieldConfig = customFieldsData.textField;
// { name: 'Custom Text', type: 'text', required: true, ... }
```

### Random Strings

```typescript
import { randomString } from '../utils/random.helper.js';
import { RANDOM_LENGTH } from '../config/constants.js';

const name = `AutoProject_${randomString(RANDOM_LENGTH.standard)}`;
```

---

## 6. Sharing Data Between Steps (Within a Test)

In TmsAutomation, data is shared within a test through page object instance properties and test-scoped variables.

### Page Object Instance Properties

```typescript
// src/pages/project/project.page.ts
export class ProjectPage extends BasePage {
  projectName = `AutoProject_${randomString(RANDOM_LENGTH.standard)}`;
  projectId: string | null = null;

  async createProject(): Promise<void> {
    await test.step('Create project', async () => {
      await this.loc(L.createButton).click();
      await this.loc(L.nameInput).fill(this.projectName);
      await this.loc(L.submitButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyProject(): Promise<void> {
    await test.step('Verify project', async () => {
      // this.projectName is available from createProject()
      await expect(this.loc(L.projectByName(this.projectName))).toBeVisible();
    });
  }
}
```

### Test-Scoped Variables

```typescript
test('create and verify project', async ({ projectPage, testCasePage }) => {
  // Create project - projectPage stores projectName internally
  await projectPage.createProject();

  // Use the same project name in another page object
  await testCasePage.navigateToProject(projectPage.projectName);
  await testCasePage.createTestCase();
});
```

### API Response Data

```typescript
test('API setup then UI verify', async ({ tmsApi, projectPage }) => {
  // Create via API
  const response = await tmsApi.createProject({ name: 'APIProject' });
  const projectId = response.data.id;

  // Use in UI navigation
  await projectPage.navigateToProject(projectId);
  await expect(projectPage.loc(L.projectHeader)).toHaveText('APIProject');
});
```

---

## Common Mistakes

### Wrong: Hardcoding credentials

```typescript
// WRONG - Never hardcode credentials
const password = 'MyPassword123';
```

### Right: Use environment variables via EnvConfig

```typescript
// RIGHT - Credentials come from environment variables
// They are loaded by auth.setup.ts from process.env.AUTH_EMAIL / AUTH_PASSWORD
// Tests never access credentials directly
```

### Wrong: Importing test from @playwright/test directly

```typescript
// WRONG - Bypasses custom fixtures
import { test, expect } from '@playwright/test';
```

### Right: Import from custom fixture file

```typescript
// RIGHT - Gets all custom fixtures
import { test, expect } from '../fixtures/tms.fixture.js';
```

### Wrong: Using hardcoded URLs

```typescript
// WRONG - Breaks across environments
await page.goto('https://stage-test-manager.lambdatestinternal.com/projects');
```

### Right: Use EnvConfig

```typescript
// RIGHT - Works across all environments
await page.goto(`${EnvConfig.tmsBaseUrl}/projects`);
```

---

## Quick Reference

| Variable Type | Scope | Usage |
|--------------|-------|-------|
| Environment Variables (.env) | Process-wide | Execution config, credentials, environment selection |
| EnvConfig | Process-wide | Resolved URLs, API endpoints, auth config |
| Constants | Process-wide | Timeouts, retry settings, route patterns |
| Fixtures | Per-test | Page objects, components, API clients, compound setup |
| Test Data (src/data/) | Per-import | Generated or static test data |
| Page Object Properties | Per-instance | Shared state within a single test |

---

[<- Back to Main](../TMS_AGENT.md)
