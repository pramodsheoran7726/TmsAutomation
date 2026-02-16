# E2E Automation Agent (with Codebase Learning + MCP Verification)

Automate the given test scenarios in the TmsAutomation framework (TypeScript + Playwright).

**This agent MUST learn the codebase patterns first, then write code that matches exactly, then verify every locator via Playwright MCP on the live UI.**

## Input

Test scenarios to automate:

{{scenarios}}

---

## CRITICAL: Phase Execution Rules

```
+-------------------------------------------------------------------------+
| MANDATORY RULES:                                                        |
|                                                                         |
|   1. Complete EVERY phase in order — never skip                         |
|   2. STOP after each phase — present findings, WAIT for user approval   |
|   3. Phase 0 (Codebase Learning) is NON-NEGOTIABLE — do it every time  |
|   4. NEVER guess locators — every locator comes from Playwright MCP     |
|   5. NEVER write code that contradicts patterns found in Phase 0        |
|   6. NEVER auto-proceed — wait for explicit "proceed" / "yes"          |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## Phase 0: Codebase Learning (MANDATORY — Do First)

**Purpose**: Build a deep mental model of how this framework is written so every line of code you produce matches the existing conventions perfectly.

### Step 0a: Read Framework Foundation Files

Read ALL of these files — they define the patterns everything else follows:

```
MANDATORY READS (in this order):
  1. src/utils/base.page.ts        → loc(), tpl(), isVisible() — every page object extends this
  2. src/fixtures/tms.fixture.ts   → How fixtures are defined, wired, and composed
  3. src/config/constants.ts       → TIMEOUTS, RETRY, RANDOM_LENGTH, ROUTES, API_PATHS
  4. src/utils/wait.helper.ts      → waitForNetworkIdle, clickAndWaitForNetwork, fillAndWaitForSearch
  5. src/config/env.config.ts      → EnvConfig — base URLs, environment switching
  6. src/utils/random.helper.ts    → randomString() for test data generation
```

### Step 0b: Study 2-3 Existing Page Objects

Read at least 2 complete page objects to internalize the patterns:

```bash
# Pick page objects closest to the feature you're automating
# Good examples to study:
#   src/pages/dataset/dataset.page.ts      — Full CRUD with modal, search, inline edit
#   src/pages/milestone/milestone.page.ts  — Simpler CRUD with tabs
#   src/pages/folder/folder.page.ts        — Nested entity with navigation
#   src/pages/project/project.page.ts      — Core entity with fixtures
#   src/pages/test-run/test-run.page.ts    — Complex multi-step flows
```

**Extract these patterns from what you read:**

| Pattern | What to Learn |
|---------|--------------|
| **Class structure** | `extends BasePage`, constructor with `super(page)`, property declarations |
| **Test data** | Instance properties like `datasetName = \`Dataset_\${randomString(RANDOM_LENGTH.medium)}\`` |
| **Method structure** | `async methodName(): Promise<void>` wrapped in `test.step('description', async () => { ... })` |
| **Locator access** | `this.loc(L.selectorName)` for string selectors, `this.page.getByRole()` for modern locators |
| **Wait strategies** | `waitForNetworkIdle()` after API calls, `.waitFor({ state: 'visible' })` for UI elements |
| **Assertions** | `expect.soft()` inside page objects, `expect()` in test specs |
| **Private helpers** | Private methods for reusable sub-actions (e.g., `private async clickCreateButton()`) |
| **Conditional logic** | `this.isVisible()` for UI state checks with fallback paths |

### Step 0c: Study 2-3 Existing Test Specs

Read test specs that match the feature area you're automating:

```bash
# Good examples:
#   tests/dataset/dataset-crud.spec.ts     — Full CRUD lifecycle
#   tests/folder/folder-crud.spec.ts       — Entity with navigation
#   tests/project/project-crud.spec.ts     — Core entity test
#   tests/test-run/test-run-crud.spec.ts   — Complex multi-step
```

**Extract these patterns:**

| Pattern | What to Learn |
|---------|--------------|
| **Import** | `import { test, expect } from '../../src/fixtures/tms.fixture.js'` (ALWAYS from fixtures, `.js` extension) |
| **Describe block** | `test.describe('Name', { tag: [...], annotation: [...] }, () => { ... })` |
| **Tags** | `['@smoke', '@regression', '@critical-path', '@featureName']` |
| **Annotations** | `[{ type: 'feature', description: '...' }, { type: 'severity', description: '...' }]` |
| **Fixtures** | Destructured in test params: `async ({ projectOnly, page, datasetPage }) => { ... }` |
| **Setup fixtures** | `projectOnly`, `projectWithTestCase`, `projectWithTestCaseInFolder` — auto-create + auto-cleanup |
| **Thin tests** | Tests delegate ALL logic to page object methods — no direct `page.locator()` in specs |
| **Comments** | Step comments like `// Step 4: Open Datasets tab` for readability |

### Step 0d: Study Existing Locator Files

Read the locator files for the page objects you studied:

```bash
# Examples:
#   src/pages/dataset/dataset.locators.ts
#   src/pages/project/project.locators.ts
#   src/pages/folder/folder.locators.ts
```

**Extract these patterns:**

| Pattern | What to Learn |
|---------|--------------|
| **Export format** | `export const ModuleLocators = { ... } as const;` |
| **Naming** | camelCase: `createBtn`, `nameInput`, `searchInput`, `menuByName` |
| **Static locators** | XPath or CSS strings: `'//button[text()="Create"]'` or `'input[placeholder="Search"]'` |
| **Dynamic locators** | Arrow functions: `entityByName: (name: string) => \`//a[text()='\${name}']\`` |
| **Alias import** | Page objects import as `import { ModuleLocators as L }` — always aliased as `L` |

### Step 0e: Check Component Files

Read shared UI components that are commonly reused:

```bash
# Shared components:
#   src/pages/components/     → ToastComponent, DeleteDialogComponent, SearchComponent
#   src/pages/navigation/     → NavigationPage (sidebar navigation)
```

### Step 0f: Present Codebase Summary

**STOP HERE.** Present a summary of what you learned:

```
+-------------------------------------------------------------------------+
| CODEBASE LEARNING SUMMARY                                               |
+-------------------------------------------------------------------------+
| FRAMEWORK PATTERNS LEARNED:                                             |
|   - BasePage methods: loc(), tpl(), isVisible()                         |
|   - Wait helpers: waitForNetworkIdle(), clickAndWaitForNetwork(), etc.  |
|   - Constants: TIMEOUTS.short/medium/long, RANDOM_LENGTH.medium/standard|
|   - Fixture composition: projectOnly, projectWithTestCase, etc.         |
+-------------------------------------------------------------------------+
| PAGE OBJECT PATTERNS:                                                   |
|   - Class extends BasePage                                              |
|   - Instance test data properties with randomString()                   |
|   - Methods wrapped in test.step()                                      |
|   - Locators via this.loc(L.name) + modern getByRole where available   |
|   - Private helpers for reusable sub-actions                            |
+-------------------------------------------------------------------------+
| TEST SPEC PATTERNS:                                                     |
|   - Import from fixtures (not @playwright/test)                         |
|   - Describe with tag + annotation arrays                               |
|   - Setup fixtures for preconditions (projectOnly, etc.)                |
|   - Thin tests — all logic in page objects                              |
+-------------------------------------------------------------------------+
| LOCATOR PATTERNS:                                                       |
|   - Export as const with 'as const'                                     |
|   - Static strings + dynamic arrow functions                            |
|   - Imported as 'L' alias in page objects                               |
+-------------------------------------------------------------------------+
| EXISTING PAGE OBJECTS REUSABLE FOR THIS TASK:                           |
|   - [list relevant existing page objects and methods]                   |
+-------------------------------------------------------------------------+
| NEW CODE NEEDED:                                                        |
|   - [list new files to create]                                          |
|   - [list existing files to update]                                     |
+-------------------------------------------------------------------------+
```

Wait for user approval before proceeding.

---

## Phase 1: Coverage & Reuse Check (STOP after this phase)

Now that you understand the codebase, search for existing code to reuse:

### 1a: Search for Existing Tests

```bash
# Find existing test specs related to the feature
find tests/ -name "*.spec.ts" | head -20
grep -r "test.describe.*'keyword'" tests/
grep -r "tag:.*@featureTag" tests/
```

### 1b: Search for Existing Page Objects

```bash
# Find existing page objects and their methods
find src/pages/ -name "*.page.ts"
grep -r "async methodName" src/pages/
```

### 1c: Search for Existing Locators

```bash
# Find locators already defined for this feature area
grep -r "export const.*Locators" src/pages/
```

### 1d: Check Available Fixtures

```bash
# Check what fixtures already exist
grep -r "fixtures\|async.*use" src/fixtures/tms.fixture.ts
```

### 1e: Present Reuse Plan

```
+-------------------------------------------------------------------------+
| COVERAGE & REUSE CHECK                                                  |
+-------------------------------------------------------------------------+
| EXISTING TESTS:                                                         |
|   [list any similar/overlapping tests found]                            |
+-------------------------------------------------------------------------+
| REUSABLE PAGE OBJECTS:                                                  |
|   OK  ModulePage — methods: create(), edit(), delete()                  |
|   X   NewFeaturePage — does NOT exist, need to create                   |
+-------------------------------------------------------------------------+
| REUSABLE LOCATORS:                                                      |
|   OK  ModuleLocators — has: createBtn, nameInput                        |
|   X   NewFeatureLocators — need to create via MCP                       |
+-------------------------------------------------------------------------+
| REUSABLE FIXTURES:                                                      |
|   OK  projectOnly — auto-creates project                                |
|   X   newFixture — need to add to tms.fixture.ts                        |
+-------------------------------------------------------------------------+
```

**STOP HERE.** Wait for user confirmation of approach.

---

## Phase 2: Planning & Proposal (STOP after this phase)

Present the exact implementation plan with file paths:

```
+-------------------------------------------------------------------------+
| IMPLEMENTATION PLAN                                                     |
+-------------------------------------------------------------------------+
| FILES TO CREATE:                                                        |
|   tests/feature/feature-name.spec.ts                                    |
|   src/pages/feature/feature.page.ts (if new module)                     |
|   src/pages/feature/feature.locators.ts (if new module)                 |
+-------------------------------------------------------------------------+
| FILES TO UPDATE:                                                        |
|   src/pages/existing/existing.page.ts (add new methods)                 |
|   src/fixtures/tms.fixture.ts (add new fixture if needed)               |
+-------------------------------------------------------------------------+
| EXISTING CODE TO REUSE:                                                 |
|   - BasePage (base.page.ts) — loc(), tpl(), isVisible()                 |
|   - wait.helper.ts — waitForNetworkIdle(), fillAndWaitForSearch()       |
|   - ToastComponent — success/error message assertions                   |
|   - DeleteDialogComponent — confirmation dialogs                        |
|   - projectOnly fixture — auto project setup + teardown                 |
+-------------------------------------------------------------------------+
| CONVENTIONS FOLLOWED (from Phase 0):                                    |
|   - Import from fixtures, not @playwright/test                          |
|   - Locator alias as L                                                  |
|   - test.step() wrapping in page objects                                |
|   - expect.soft() for non-critical assertions                           |
|   - .js extensions on all imports                                       |
|   - randomString() for test data                                        |
+-------------------------------------------------------------------------+
| TAGS:                                                                   |
|   @featureName @smoke @regression                                       |
+-------------------------------------------------------------------------+
| EXECUTION COMMAND:                                                      |
|   npx playwright test --grep @featureName                               |
+-------------------------------------------------------------------------+
```

**STOP HERE.** Ask: "Should I proceed with implementation?" Wait for explicit "yes".

---

## Phase 3: Implementation with MCP Verification

**Only proceed if Phase 2 was explicitly approved.**

### 3a: Discover ALL Locators via Playwright MCP (BEFORE writing code)

```
+-------------------------------------------------------------------------+
| MANDATORY: MCP LOCATOR DISCOVERY — DO THIS FIRST                        |
+-------------------------------------------------------------------------+
|                                                                         |
|   Before writing ANY code, discover ALL locators you'll need:           |
|                                                                         |
|   1. browser_navigate() to the target page                              |
|   2. browser_snapshot() to get accessibility tree                       |
|   3. For EACH element you need:                                         |
|      a. Find it in the snapshot                                         |
|      b. Choose locator strategy (decision tree below)                   |
|      c. Verify uniqueness via browser_evaluate (count = 1)              |
|      d. Test it works via browser_click / browser_type                  |
|   4. Walk through the ENTIRE user flow in the browser                   |
|      — click through every step of the scenario                         |
|      — take snapshots at each page/state change                         |
|      — discover locators for every interaction point                    |
|                                                                         |
|   DO NOT write any code until you've discovered ALL locators.           |
|                                                                         |
+-------------------------------------------------------------------------+
```

**Locator Strategy Decision Tree** (use first match, top to bottom):

```
Has data-testid?
  YES → page.getByTestId('value')  OR  L.name = '[data-testid="value"]'
  NO  ↓
Has ARIA role + accessible name?
  YES → page.getByRole('role', { name: 'name' })
  NO  ↓
Has label text (form field)?
  YES → page.getByLabel('label')
  NO  ↓
Has placeholder?
  YES → page.getByPlaceholder('text')
  NO  ↓
Has aria-label?
  YES → page.getByLabel('label')
  NO  ↓
Has unique text content?
  YES → L.name = '//tag[normalize-space()="text"]' (SPECIFIC tag, never *)
  NO  ↓
Complex DOM structure?
  YES → L.name = '//parent//child' with relative context
```

### 3b: Create Locator Files (following Phase 0 patterns)

Write locators matching the exact format learned in Phase 0:

```typescript
// VERIFIED via Playwright MCP (YYYY-MM-DD)
export const FeatureLocators = {
  // Snapshot: button "Create" [role=button] → using getByRole in page object
  // Snapshot: input [placeholder="Search"] → CSS
  searchInput: `input[placeholder='Search features']`,

  // Snapshot: link "FeatureName" → dynamic XPath
  featureByName: (name: string) => `//a[text()='${name}']`,

  // Snapshot: button "Delete" inside dialog → relative XPath
  deleteConfirmBtn: `//div[@role='dialog']//button[normalize-space()='Delete']`,
} as const;
```

### 3c: Create Page Objects (following Phase 0 patterns)

Write page objects matching the exact conventions learned:

```typescript
import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { FeatureLocators as L } from './feature.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class FeaturePage extends BasePage {
  featureName = `Feature_${randomString(RANDOM_LENGTH.medium)}`;

  constructor(page: Page) { super(page); }

  async createFeature(): Promise<void> {
    await test.step(`Create feature "${this.featureName}"`, async () => {
      // Modern: MCP discovered role=button with name "Create"
      await this.page.getByRole('button', { name: 'Create' }).click();
      // String: complex selector from locators file
      await this.loc(L.nameInput).fill(this.featureName);
      await this.page.getByRole('button', { name: 'Save' }).click();
      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.featureByName(this.featureName)))
        .toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }
}
```

### 3d: Create Test Specs (following Phase 0 patterns)

```typescript
import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Feature Name', {
  tag: ['@smoke', '@regression', '@featureName'],
  annotation: [
    { type: 'feature', description: 'Feature Description' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should perform full feature lifecycle', async ({ projectOnly, page, featurePage }) => {
    // Step 1: Navigate to feature
    await featurePage.openFeatureTab();

    // Step 2: Create feature
    await featurePage.createFeature();

    // Step 3: Verify creation
    await featurePage.verifyFeatureCreated();
  });
});
```

### 3e: Update Fixture File (if needed)

If a new page object was created, register it in `src/fixtures/tms.fixture.ts`:
- Add import
- Add type to `TmsFixtures`
- Add fixture definition

### 3f: Present Implementation

**STOP HERE.** Show all files created/updated with key code sections. Wait for acknowledgment.

---

## Phase 4: Agent Review (STOP after this phase)

Review your own implementation against what you learned in Phase 0:

### Checklist

| Check | Criteria | Pass/Fail |
|-------|----------|-----------|
| **Imports** | Test specs import from `fixtures/tms.fixture.js`, not `@playwright/test` | |
| **ESM** | All imports have `.js` extension | |
| **BasePage** | Page objects extend `BasePage` with `super(page)` | |
| **Locator alias** | Imported as `L`: `import { FeatureLocators as L }` | |
| **loc() usage** | String selectors use `this.loc(L.name)`, not `this.page.locator()` | |
| **test.step()** | Every page object method wrapped in `test.step()` | |
| **Waits** | `waitForNetworkIdle()` after API-triggering actions | |
| **Assertions** | `expect.soft()` in page objects, `expect()` in test specs | |
| **Timeouts** | Uses `TIMEOUTS.short/medium/long`, not hardcoded numbers | |
| **Test data** | Random names via `randomString(RANDOM_LENGTH.medium)` | |
| **Thin tests** | No direct `page.locator()` calls in test specs | |
| **Tags** | Describe block has `tag` and `annotation` arrays | |
| **MCP verified** | Every new locator has `// VERIFIED via Playwright MCP (date)` comment | |
| **No redundancy** | Searched for duplicate tests — none found | |
| **No wildcard XPath** | No `//*[text()=...]` — only specific tags like `//button[text()=...]` | |

### Fix Issues

If any check fails, fix the code before proceeding. Do NOT skip this phase.

**STOP HERE.** Present review results and wait for confirmation.

---

## Phase 5: Validation & Type Check

```bash
# Type-check the project
npx tsc --noEmit

# Verify Playwright discovers the tests
npx playwright test --list --grep @featureTag
```

Fix any errors. Common issues:
- Missing `.js` extension on imports
- Locator key typo or missing export
- Fixture not registered in `tms.fixture.ts`
- Wrong import path

**STOP HERE.** Present validation results.

---

## Phase 6: Execution & Self-Healing

```bash
# Run the new tests
npx playwright test --grep @featureTag --reporter=list
```

### If tests fail:

1. Read the error message and screenshot from `test-results/`
2. Use Playwright MCP to re-inspect the failing element:
   - `browser_navigate` to the page
   - `browser_snapshot` to see current DOM
   - Compare actual DOM with your locator
3. Fix the locator or wait strategy
4. Re-run (up to 3 self-healing attempts)

```
+-------------------------------------------------------------------------+
| SELF-HEALING ATTEMPT: [N/3]                                             |
+-------------------------------------------------------------------------+
| ERROR: [error message]                                                  |
| ELEMENT: [failing locator]                                              |
| MCP FINDING: [what the real DOM looks like]                             |
| FIX: [what you changed]                                                 |
| RESULT: Retrying...                                                     |
+-------------------------------------------------------------------------+
```

### After all tests pass:

Run the full suite for the feature area to check for regressions:

```bash
# Run related test directory
npx playwright test tests/feature/ --reporter=list

# If you changed shared files (page objects, fixtures), also run dependents
grep -rl "ChangedClass" tests/ --include="*.spec.ts" | xargs npx playwright test --reporter=list
```

**STOP HERE.** Present execution results.

---

## Phase 7: Final Report

```
+-------------------------------------------------------------------------+
| EXECUTION REPORT                                                        |
+-------------------------------------------------------------------------+
| STATUS: SUCCESS / FAILED                                                |
+-------------------------------------------------------------------------+
| CODEBASE PATTERNS FOLLOWED:                                             |
|   - [list conventions from Phase 0 that were applied]                   |
+-------------------------------------------------------------------------+
| FILES CREATED/UPDATED:                                                  |
|   tests/feature/feature.spec.ts              (created)                  |
|   src/pages/feature/feature.page.ts          (created)                  |
|   src/pages/feature/feature.locators.ts      (created)                  |
|   src/fixtures/tms.fixture.ts                (updated)                  |
+-------------------------------------------------------------------------+
| LOCATORS VERIFIED VIA MCP:                                              |
|   - createBtn: getByRole('button', { name: 'Create' }) ✓               |
|   - searchInput: input[placeholder='Search'] ✓                          |
|   - featureByName: //a[text()='Name'] ✓                                |
+-------------------------------------------------------------------------+
| SELF-HEALING ATTEMPTS: N                                                |
|   - [list fixes if any]                                                 |
+-------------------------------------------------------------------------+
| TAGS: @featureName @smoke @regression                                   |
+-------------------------------------------------------------------------+
| EXECUTION COMMAND:                                                      |
|   npx playwright test --grep @featureName                               |
+-------------------------------------------------------------------------+
| SUGGESTED ADDITIONAL COVERAGE:                                          |
|   1. [edge case 1]                                                      |
|   2. [edge case 2]                                                      |
|   3. [edge case 3]                                                      |
+-------------------------------------------------------------------------+
```

---

## Reference: Key Files Quick Lookup

| File | Purpose |
|------|---------|
| `src/utils/base.page.ts` | BasePage — `loc()`, `tpl()`, `isVisible()` |
| `src/fixtures/tms.fixture.ts` | All fixtures and page object wiring |
| `src/config/constants.ts` | `TIMEOUTS`, `RETRY`, `RANDOM_LENGTH`, `ROUTES` |
| `src/utils/wait.helper.ts` | `waitForNetworkIdle()`, `clickAndWaitForNetwork()`, `fillAndWaitForSearch()` |
| `src/config/env.config.ts` | `EnvConfig` — URLs, environment config |
| `src/utils/random.helper.ts` | `randomString()` for test data |
| `docs/e2e_agent/TMS_AGENT.md` | Full playbook (Phases 1-13) |
| `docs/e2e_agent/reference/PLAYWRIGHT_MCP_LOCATORS.md` | MCP locator discovery guide |
| `docs/e2e_agent/reference/ASSERTION_GUIDE.md` | Assertion patterns |
| `docs/e2e_agent/reference/TEST_PATTERNS.md` | CRUD, State Machine patterns |
| `docs/e2e_agent/reference/COMMON_PITFALLS.md` | Lessons learned |
