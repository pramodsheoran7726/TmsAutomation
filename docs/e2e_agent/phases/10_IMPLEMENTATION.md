# Phases 10-13: Implementation, Validation & Execution

[← Back to Main](../TMS_AGENT.md) | [← Previous: Scenario Planning](06_SCENARIO_PLANNING.md)

---

## Phase 10: Implementation (STOP after this phase)

**Only proceed if Phase 9 was explicitly approved.**

### 1. Test Specs

Create Playwright test specs in `tests/MODULE/`:

```typescript
import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Feature Description', {
  tag: ['@TagName', '@Priority', '@Regression'],
}, () => {

  test('should perform primary action', async ({ page, modulePage, toast }) => {
    await test.step('Setup preconditions', async () => {
      await modulePage.navigateToModule();
    });

    await test.step('Perform action', async () => {
      await modulePage.createEntity('Test Entity');
    });

    await test.step('Verify outcome', async () => {
      await expect(toast.successMessage).toBeVisible();
      await expect(modulePage.entityByName('Test Entity')).toBeVisible();
    });
  });

  test('should handle data-driven scenario', async ({ modulePage }) => {
    const testData = [
      { param: 'value1', expected: 'result1' },
      { param: 'value2', expected: 'result2' },
    ];

    for (const { param, expected } of testData) {
      await test.step(`Test with param="${param}"`, async () => {
        await modulePage.performAction(param);
        await expect(modulePage.resultText).toHaveText(expected);
      });
    }
  });
});
```

**Test Spec Best Practices:**
- Use meaningful tags (`@smoke`, `@regression`, `@p0`, `@featureName`)
- Keep test bodies thin -- delegate to page object methods
- Use `test.step()` to group logical actions within a test
- Use `test.describe()` with `tag` option for tagging all tests in a group
- Use `expect.soft()` for non-critical assertions that should not abort the test
- One clear test objective per `test()` block

### 2. Page Objects

Create page object classes in `src/pages/MODULE/`:

```typescript
import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { ModuleLocators as L } from './module.locators.js';
import { TIMEOUTS } from '../../config/constants.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class ModulePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToModule(): Promise<void> {
    await test.step('Navigate to module', async () => {
      await this.page.goto('/module-path');
      await waitForNetworkIdle(this.page);
    });
  }

  async createEntity(name: string): Promise<void> {
    await test.step(`Create entity "${name}"`, async () => {
      await this.loc(L.createButton).click();
      await this.loc(L.nameInput).fill(name);
      await this.loc(L.submitButton).click();
      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.successMessage)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  get entityByName() {
    return (name: string) => this.loc(L.entityByName(name));
  }

  get resultText() {
    return this.loc(L.resultText);
  }
}
```

**Page Object Best Practices:**
- Extend `BasePage` for access to `loc()`, `tpl()`, and other base utilities
- Use `loc()` for all locator resolution -- it auto-detects XPath (starts with `/` or `(`) vs CSS
- Wrap logical actions in `test.step()` for readable trace output
- Use `async/await` consistently; always return `Promise<void>` for action methods
- Use `waitForNetworkIdle()` after actions that trigger API calls
- Use `expect.soft()` inside page objects for non-blocking assertions
- Keep methods focused: one method per user action or verification

### 3. Locators

Create locator files in `src/pages/MODULE/`:

```typescript
export const ModuleLocators = {
  // Action elements
  createButton: `//button[text()='Create']`,
  nameInput: `input[placeholder='Enter name']`,
  submitButton: `//span[text()='Create']`,

  // Feedback elements
  successMessage: `.success-toast`,
  resultText: `[data-testid='result-text']`,

  // Dynamic locators (functions)
  entityByName: (name: string) => `//a[text()='${name}']`,
  tabByLabel: (label: string) => `//div[@role='tab' and text()='${label}']`,
} as const;
```

**Locator Priority:**
```
1. data-testid  - Designed for testing, very stable
2. ID           - Unique identifier, stable
3. CSS Selector - Good balance of readability and stability
4. XPath        - Use for text-based or structural matching
5. Position-based XPath - Last resort, most brittle (avoid //div[3]/button[2])
```

**Locator Best Practices:**
- Export as `const` object with `as const` for type safety
- Use string literals for static locators (CSS or XPath)
- Use arrow functions for dynamic/parameterized locators
- `BasePage.loc()` auto-detects XPath vs CSS -- no need to specify the type
- Prefer attribute-based selectors over positional ones
- Name locators descriptively: `createButton`, `nameInput`, `entityByName`

### 4. Mandatory MCP-Driven Locator Discovery

```
+-------------------------------------------------------------------------+
| MANDATORY: MCP-DRIVEN LOCATOR DISCOVERY                                 |
+-------------------------------------------------------------------------+
|                                                                         |
|   EVERY new locator MUST be discovered and verified via Playwright MCP  |
|   before writing to code. No exceptions.                                |
|                                                                         |
|   Do NOT guess, assume, or copy locators without browser inspection.    |
|                                                                         |
+-------------------------------------------------------------------------+
```

This is the complete, step-by-step workflow for discovering, verifying, and coding locators using the Playwright MCP browser tools. This process is **not optional** -- it applies to every locator you write.

#### Step 1: Navigate to Target Page

```
browser_navigate("https://stage-app.lambdatestinternal.com/test-manager/...")
```

- Login if needed (use stored auth or manual login)
- Navigate to the exact page where the element exists
- Wait for the page to fully load before proceeding

#### Step 2: Take Accessibility Snapshot

```
browser_snapshot()
```

- Returns the accessibility tree with roles, names, attributes
- Identify the target element(s) in the tree
- Note the `[ref=...]` identifiers for each element -- these are used by subsequent MCP commands

#### Step 3: Analyze Available Attributes

For each element found in the snapshot, check what attributes are available:

| Attribute Present | Recommended Locator Strategy |
|---|---|
| `data-testid` | `getByTestId()` or `[data-testid="value"]` |
| ARIA role + accessible name | `getByRole('role', { name: 'name' })` |
| Label association (form field) | `getByLabel('label')` |
| Placeholder text | `getByPlaceholder('text')` |
| `aria-label` | `getByLabel('label')` or `//*[@aria-label="label"]` |
| Unique text content | `getByText()` or `//tag[normalize-space()="text"]` (use SPECIFIC tag, never `*`) |
| Only CSS classes/structure | CSS or XPath selector with relative context |

#### Step 4: Choose Locator Strategy (Decision Tree)

Follow this tree top-to-bottom. Use the **first** match:

```
Has data-testid?
  YES --> page.getByTestId('value')  OR  L.name = '[data-testid="value"]'
  NO  |
      v
Has ARIA role + accessible name?
  YES --> page.getByRole('role', { name: 'name' })
  NO  |
      v
Has label text (form field)?
  YES --> page.getByLabel('label')  OR  L.name = '//label[text()="label"]/..//input'
  NO  |
      v
Has placeholder?
  YES --> page.getByPlaceholder('text')  OR  L.name = 'input[placeholder="text"]'
  NO  |
      v
Has aria-label?
  YES --> page.getByLabel('label')  OR  L.name = '//*[@aria-label="label"]'
  NO  |
      v
Has unique text content?
  YES --> L.name = '//tag[normalize-space()="text"]' (use SPECIFIC tag, never *)
  NO  |
      v
Complex DOM structure?
  YES --> L.name = '//parent//child' with relative context
```

#### Step 5: Verify Uniqueness

Every locator must resolve to **exactly one** element. Verify in the browser:

```
browser_evaluate({
  expression: `document.querySelectorAll('[data-testid="submit-btn"]').length`
})
// OR for XPath:
browser_evaluate({
  expression: `document.evaluate("//button[text()='Save']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength`
})
```

- **Must return exactly `1`**
- If `> 1`: add relative context (parent container, additional attributes, filter)
- If `0`: locator is wrong -- re-inspect the snapshot and try again

#### Step 6: Test the Locator

Interact with the element to confirm it works:

```
browser_click("Submit button")  // Use the accessible name from the snapshot
// OR for inputs:
browser_type("Search field", "test query")
```

- Verify the interaction succeeds (no timeout, no error)
- Verify the expected result happens (navigation, modal appears, toast shown, etc.)

#### Step 7: Write to Code with Verification Comment

When writing the locator to the codebase, include a verification comment so future maintainers know it was inspected:

```typescript
// In MODULE.locators.ts:
// VERIFIED via Playwright MCP (2026-02-12)
// Snapshot: button [ref=e245] "Submit" [role=button]
submitButton: `//button[normalize-space()='Submit']`,
```

---

### 5. MCP to Code Translation Examples

These examples show how to translate what you see in a Playwright MCP snapshot into actual test code. Each example shows both the modern Playwright built-in locator approach and the string selector approach used by this framework.

```typescript
// -------------------------------------------------------------------
// EXAMPLE 1: MCP snapshot shows button with role
// -------------------------------------------------------------------
// Snapshot: button "Create New Project" [role=button]
//
// Option A: Modern (preferred for elements with clear roles)
await this.page.getByRole('button', { name: 'Create New Project' }).click();
//
// Option B: String selector in locators file
// In locators file: createProjectBtn: `//button[normalize-space()='Create New Project']`,
// In page object:  await this.loc(L.createProjectBtn).click();

// -------------------------------------------------------------------
// EXAMPLE 2: MCP snapshot shows input with label
// -------------------------------------------------------------------
// Snapshot: textbox "Project Name" [role=textbox]
//
// Option A: Modern (preferred for labeled form fields)
await this.page.getByLabel('Project Name').fill(name);
//
// Option B: String selector in locators file
// In locators file: projectNameInput: `input[placeholder='Enter project name']`,
// In page object:  await this.loc(L.projectNameInput).fill(name);

// -------------------------------------------------------------------
// EXAMPLE 3: MCP snapshot shows element with data-testid
// -------------------------------------------------------------------
// Snapshot: [data-testid="delete-confirm-btn"]
//
// Option A: Modern (preferred when data-testid exists)
await this.page.getByTestId('delete-confirm-btn').click();
//
// Option B: String selector in locators file
// In locators file: deleteConfirmBtn: `[data-testid="delete-confirm-btn"]`,
// In page object:  await this.loc(L.deleteConfirmBtn).click();

// -------------------------------------------------------------------
// EXAMPLE 4: MCP snapshot shows complex structure (no good attributes)
// -------------------------------------------------------------------
// Snapshot: div > div > span "Status: Active"
// No role, no testid, no label
//
// Only option: XPath with relative context
// In locators file:
// VERIFIED via Playwright MCP (2026-02-12)
// Note: No semantic attributes available, using text + structure
statusLabel: `//div[contains(@class,'status-container')]//span[contains(text(),'Status')]`,
// In page object:  await expect(this.loc(L.statusLabel)).toBeVisible();
```

---

### 6. Creating a New Page Object with MCP (End-to-End Example)

This walkthrough shows the complete process of creating a brand-new module from scratch, using Playwright MCP at every step. Use this as the template when building any new module.

```
EXAMPLE: Creating "Dataset" module from scratch using MCP
```

**STEP 1: Navigate to the Dataset page**

```
browser_navigate("https://stage-app.lambdatestinternal.com/test-manager/datasets")
```

Wait for full page load. If redirected to login, complete authentication first.

**STEP 2: Take snapshot of the page**

```
browser_snapshot()
```

Review the output. For this example, assume the snapshot returns:

```
- heading "Datasets" [level=1]
- button "Create" [role=button]
- textbox [placeholder="Search datasets"]
- table [role=table]
  - link "DatasetName" [role=link]
  - ...
```

**STEP 3: Create locators file (`src/pages/dataset/dataset.locators.ts`)**

For each element found in the snapshot, choose a strategy using the decision tree (Step 4 above), verify uniqueness (Step 5), and test it (Step 6). Then write the file:

```typescript
// VERIFIED via Playwright MCP (2026-02-12)
export const DatasetLocators = {
  // Snapshot: heading "Datasets" [level=1] -> XPath
  pageHeading: `//h1[text()='Datasets']`,

  // Snapshot: button "Create" [role=button] -> will use getByRole in page object
  // (no entry needed -- use page.getByRole('button', { name: 'Create' }) directly)

  // Snapshot: textbox [placeholder="Search datasets"] -> CSS
  searchInput: `input[placeholder='Search datasets']`,

  // Snapshot: link "DatasetName" [role=link] -> dynamic XPath (for any name)
  datasetByName: (name: string) => `//a[text()='${name}']`,

  // Snapshot: div [role=dialog] -> modal container for relative locators
  createModal: `div[role='dialog']`,

  // Snapshot: inside modal -> textbox "Dataset Name" -> CSS
  datasetNameInput: `div[role='dialog'] input[placeholder='Enter dataset name']`,
} as const;
```

**STEP 4: Create page object (`src/pages/dataset/dataset.page.ts`)**

```typescript
import { BasePage } from '../../utils/base.page.js';
import { DatasetLocators as L } from './dataset.locators.js';
import { test, expect } from '@playwright/test';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';
import { randomString } from '../../utils/random.helper.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';

export class DatasetPage extends BasePage {
  datasetName = `AutoDataset_${randomString(RANDOM_LENGTH.standard)}`;

  async createDataset(name?: string): Promise<void> {
    const dsName = name ?? this.datasetName;
    await test.step(`Create dataset "${dsName}"`, async () => {
      // Modern: button discovered via MCP with clear role
      await this.page.getByRole('button', { name: 'Create' }).click();

      // Existing: complex modal input needs string selector
      await this.loc(L.datasetNameInput).fill(dsName);

      // Modern: save button in modal via chaining
      await this.page.locator(L.createModal)
        .getByRole('button', { name: 'Save' }).click();

      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.datasetByName(dsName)))
        .toBeVisible({ timeout: TIMEOUTS.long });
    });
  }
}
```

**Key takeaways from this example:**
- Every locator was discovered by inspecting the actual page via MCP, not guessed
- The decision tree determined the best strategy for each element
- Elements with clear ARIA roles use `getByRole()` directly in the page object (no locator file entry needed)
- Elements requiring CSS/XPath selectors go into the locators file
- Dynamic locators use arrow functions for parameterization
- The `VERIFIED via Playwright MCP` comment documents when and how locators were validated

**See also:** [reference/PLAYWRIGHT_MCP_LOCATORS.md](../reference/PLAYWRIGHT_MCP_LOCATORS.md) for MCP setup instructions and additional configuration details.

**STOP HERE** - Present what you've created/updated. Show file paths and key changes. Wait for user acknowledgment before validation.

---

## Phase 11: Validation (STOP after this phase)

1. **Type-check the project**:
   ```bash
   npx tsc --noEmit
   ```

2. **Check for syntax and import errors**:
   - Verify all imports resolve (`.js` extension required for ESM)
   - Verify locator constants are exported and imported correctly
   - Check for duplicate test descriptions within `test.describe()` blocks
   - Verify page object methods match what test specs call

3. **List tests to verify discovery**:
   ```bash
   # Dry run to verify Playwright discovers all tests
   npx playwright test --list --grep @YourTag
   ```

**STOP HERE** - Present validation results. If there are errors, ask if you should fix them. Wait for confirmation before proceeding to execution.

### Common Validation Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module` | Missing or wrong import path | Fix import path; ensure `.js` extension for ESM |
| `Property does not exist` | Locator key typo or missing export | Check locator object keys match usage |
| `Type 'X' is not assignable` | TypeScript type mismatch | Fix type annotation or cast |
| `has no exported member` | Wrong named import | Check export name in source file |
| `Fixture "X" is not defined` | Missing fixture in `tms.fixture.ts` | Add fixture definition or fix fixture name |
| `No tests found` (on `--list`) | Wrong tag or file path | Check `--grep` pattern and file location in `tests/` |

---

## Phase 12: Execution & Self-Healing (STOP after this phase)

**Only proceed if Phase 11 validation passed or user explicitly approves.**

1. **Execute tests**:
   ```bash
   # Run with specific tag
   npx playwright test --grep @YourTag

   # Run with specific environment
   TEST_ENV=stage npx playwright test --grep @YourTag

   # Run with controlled parallelism
   npx playwright test --grep @YourTag --workers=4

   # Run with trace recording for debugging
   npx playwright test --grep @YourTag --trace on
   ```

2. **If execution fails** (e.g., `TimeoutError`, `locator.click: Target closed`, element not found):
   - Check Playwright trace viewer (`npx playwright show-trace`) or HTML report
   - Identify the failing locator or action
   - Update locators or add appropriate waits
   - Retry up to **3 times** (report each attempt)

3. **Report execution status**: Success or failure with details.

**STOP HERE** - Present execution results. If failures occurred, explain what happened. Wait for user input before suggesting next steps.

### Self-Healing Process

```
+-------------------------------------------------------------------------+
| SELF-HEALING ATTEMPT: [1/3]                                             |
+-------------------------------------------------------------------------+
| ERROR: TimeoutError: locator.click: Timeout 30000ms exceeded            |
| ELEMENT: loc('//button[@id="login-button"]')                            |
| ACTION TAKEN:                                                           |
|   1. Checked Playwright trace/screenshot                                |
|   2. Found element has new attribute: data-testid="login-btn"           |
|   3. Updated locator in module.locators.ts                              |
| RESULT: Retrying execution...                                           |
+-------------------------------------------------------------------------+
```

### Self-Healing Strategies

| Failure Type | Strategy |
|---|---|
| Element not found | Update locator selector; check if page structure changed |
| Timeout on click | Add `await locator.waitFor()` before click; increase timeout |
| Network-dependent flake | Use `waitForNetworkIdle()` or `clickAndWaitForNetwork()` |
| Stale element | Use `retryAction()` wrapper from `retry.helper.ts` |
| Assertion timing | Add `{ timeout: TIMEOUTS.long }` to `expect()` |
| Navigation race | Use `await page.waitForURL()` after navigation actions |

### Execution Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `TEST_ENV` | Target environment | `stage`, `prod`, `dev` |
| `--grep` | Filter tests by tag | `@smoke`, `@p0`, `@Login` |
| `--workers` | Parallel worker count | `1`, `4`, `10` |
| `--trace` | Trace recording mode | `on`, `off`, `retain-on-failure` |
| `--retries` | Automatic retry count | `0`, `2` |

---

## Phase 13: Reporting (Final phase)

1. **State clearly** if scenario generation was successful.

2. **Suggest 3-5 additional coverage scenarios** (edge cases, error states, boundary values).

3. **Provide summary**:
   - Created/updated test spec paths
   - Created/updated page object paths
   - Created/updated locator file paths
   - Validation and execution commands run
   - Any remaining issues or blockers

### Final Report Template

```
+-------------------------------------------------------------------------+
| EXECUTION REPORT                                                        |
+-------------------------------------------------------------------------+
| STATUS: SUCCESS / FAILED                                                |
+-------------------------------------------------------------------------+
| FILES CREATED/UPDATED:                                                  |
|   tests/module/feature-name.spec.ts              (created)              |
|   src/pages/module/module.page.ts                (updated)              |
|   src/pages/module/module.locators.ts            (updated)              |
|   src/fixtures/tms.fixture.ts                    (updated)              |
+-------------------------------------------------------------------------+
| COMMANDS EXECUTED:                                                      |
|   npx tsc --noEmit                                                      |
|   npx playwright test --list --grep @FeatureName                        |
|   npx playwright test --grep @FeatureName                               |
+-------------------------------------------------------------------------+
| SELF-HEALING ATTEMPTS: 1                                                |
|   - Fixed login button locator (attempt 1)                              |
+-------------------------------------------------------------------------+
| TAGS ADDED:                                                             |
|   @featureName @smoke @p0                                               |
+-------------------------------------------------------------------------+
| SUGGESTED ADDITIONAL COVERAGE:                                          |
|   1. Login with expired password                                        |
|   2. Login with account locked after 5 attempts                         |
|   3. Login with special characters in password                          |
|   4. Login session timeout after inactivity                             |
|   5. Login from multiple browsers simultaneously                        |
+-------------------------------------------------------------------------+
| REMAINING ISSUES:                                                       |
|   None / [List any blockers]                                            |
+-------------------------------------------------------------------------+
```

---

## Quick Reference: Useful Commands

### Type Checking
```bash
# Full type check (no emit)
npx tsc --noEmit
```

### Test Discovery
```bash
# List all tests
npx playwright test --list

# List tests matching a tag
npx playwright test --list --grep @YourTag
```

### Test Execution
```bash
# Basic execution by tag
npx playwright test --grep @YourTag

# With environment
TEST_ENV=stage npx playwright test --grep @YourTag

# With parallel workers
npx playwright test --grep @YourTag --workers=4

# With trace recording
npx playwright test --grep @YourTag --trace on

# Run a specific spec file
npx playwright test tests/module/feature-name.spec.ts

# Run with retries
npx playwright test --grep @YourTag --retries=2
```

### Finding Existing Code
```bash
# Find existing test specs
find tests/ -name "*.spec.ts" | grep -i "keyword"

# Find existing page objects
find src/pages/ -name "*.page.ts"

# Find test.step() implementations in page objects
grep -r "test.step" src/pages/

# Find existing locator exports
grep -r "export const.*Locators" src/pages/

# Find fixture definitions
grep -r "fixtures" src/fixtures/tms.fixture.ts

# Find wait helper usage
grep -rn "waitForNetworkIdle\|clickAndWaitForNetwork\|fillAndWaitForSearch" src/
```

---

[← Back to Main](../TMS_AGENT.md)
