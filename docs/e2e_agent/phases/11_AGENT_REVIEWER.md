# Phase 11: Agent Reviewer

[← Back to Main](../TMS_AGENT.md) | [← Previous: Implementation](10_IMPLEMENTATION.md)

---

## Overview

The Agent Reviewer phase is a **mandatory quality gate** that occurs after Implementation (Phase 10) and before Execution (Phase 12). This phase ensures the implementation correctly captures the intended functionality from the test case requirements.

```
+-------------------------------------------------------------------------+
| AGENT REVIEWER: Implementation Correctness Check                        |
+-------------------------------------------------------------------------+
|                                                                         |
| PURPOSE: Verify implementation matches test case requirements           |
|                                                                         |
| WHEN: After Phase 10 (Implementation) & Before Phase 12 (Execution)    |
|                                                                         |
| CHECKS:                                                                 |
|   - Redundancy detection (no duplicate/similar tests exist)             |
|   - Functional correctness (test steps match requirements)              |
|   - Test flow completeness (all scenarios covered)                      |
|   - MCP verification (all locators verified via Playwright MCP)         |
|   - Locator correctness (modern patterns used where available)          |
|   - Page object completeness (all actions implemented)                  |
|   - Assertion coverage (validates expected outcomes)                    |
|   - Fixture usage (correct custom fixtures wired up)                    |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## Phase 11 Checklist

**Only proceed if Phase 10 (Implementation) is complete.**

### 1. Redundancy Detection (CRITICAL - Do First)

Before reviewing implementation quality, check if this test is redundant:

```bash
# Search for similar test specs
grep -r "test.describe.*'keyword'" tests/
grep -r "test('.*keyword" tests/**/*.spec.ts

# Search for similar page object methods
grep -r "async methodName" src/pages/**/*.page.ts

# Search for similar locators
grep -r "keyword" src/pages/**/*.locators.ts
```

**If redundant test found:**
- STOP implementation
- Report existing test location
- Suggest reusing/extending existing test

### 2. Test Spec Review

| Check | Criteria | Pass/Fail |
|-------|----------|-----------|
| Describe block | `test.describe()` with clear name and tag array | |
| Tags | Correct module, priority, type tags in `tag: [...]` | |
| Test titles | Clear, starts with "should ..." or describes action | |
| test.step() | Logical actions grouped into named steps | |
| Delegation | Test body delegates to page object methods (thin tests) | |
| Assertions | `expect()` or `expect.soft()` used for verification steps | |
| Fixtures | Correct custom fixtures declared in test parameters | |

**Test Spec Pattern:**
```typescript
// GOOD - Thin test, delegates to page object
test('should create project with tag and description', async ({ projectPage, toast }) => {
  await test.step('Create project', async () => {
    await projectPage.createProjectWithTagDescription();
  });
  await test.step('Verify success', async () => {
    await expect(toast.successMessage).toBeVisible();
  });
});

// BAD - Too much logic in test spec
test('should create project', async ({ page }) => {
  await page.locator('button').click();
  await page.locator('input').fill('name');
  await page.locator('//span[text()="Create"]').click();
  // Direct page interactions belong in page objects, not test specs
});
```

### 3. Page Object Review

| Check | Criteria | Pass/Fail |
|-------|----------|-----------|
| Extends BasePage | Class extends `BasePage` with `super(page)` in constructor | |
| Method names | Clear, descriptive async method names | |
| Delegation | Complex flows broken into focused methods | |
| loc() usage | All selectors accessed via `this.loc(L.selectorName)` | |
| Wait strategies | `waitForNetworkIdle()` or `locator.waitFor()` before actions on dynamic elements | |
| test.step() | Actions wrapped in `test.step()` for trace readability | |
| Return types | Action methods return `Promise<void>`; getters return `Locator` | |

**Page Object Pattern:**
```typescript
// GOOD - Focused method with proper waits and assertions
async createProject(name: string): Promise<void> {
  await test.step(`Create project "${name}"`, async () => {
    await this.loc(L.createButton).click();
    await this.loc(L.nameInput).fill(name);
    await this.loc(L.submitButton).click();
    await waitForNetworkIdle(this.page);
    await expect.soft(this.loc(L.successToast)).toBeVisible({ timeout: TIMEOUTS.long });
  });
}

// BAD - No waits, no assertions, no test.step()
async createProject(name: string): Promise<void> {
  await this.loc(L.createButton).click();
  await this.loc(L.nameInput).fill(name);
  await this.loc(L.submitButton).click();
}
```

### 4. MCP Verification Gate (CRITICAL)

```
+-------------------------------------------------------------------------+
| MANDATORY: Every new locator MUST be verified via Playwright MCP        |
+-------------------------------------------------------------------------+
```

| Check | Criteria | Pass/Fail |
|-------|----------|-----------|
| MCP verified | All new locators have `// VERIFIED via Playwright MCP (date)` comment | |
| Uniqueness confirmed | Each locator matches exactly 1 element (verified via `browser_evaluate` count) | |
| Modern patterns used | Used `getByRole`/`getByTestId`/`getByLabel` when MCP revealed suitable attributes | |
| No guessing | No locators added without browser inspection | |
| Snapshot documented | Key locators have snapshot reference (e.g., `// Snapshot: button "Save" [role=button]`) | |

**If any locator lacks MCP verification:**
- FAIL the review
- Require the implementer to run MCP discovery before proceeding
- Do NOT proceed to execution with unverified locators

### 5. Locator Review

| Check | Criteria | Pass/Fail |
|-------|----------|-----------|
| Export format | `export const ModuleLocators = { ... } as const;` | |
| Uniqueness | Locators are unique on page | |
| Stability | Not using dynamic IDs/classes or position-based XPath | |
| Readability | Clear camelCase naming convention | |
| Dynamic locators | Arrow functions for parameterized locators | |
| Modern locators | `getByRole`/`getByTestId` used directly in page object when applicable | |

**Locator Patterns:**
```typescript
// GOOD - MCP-verified locators with modern patterns
export const ModuleLocators = {
  // VERIFIED via Playwright MCP (2026-02-12)
  // Snapshot: [data-testid="submit-form-btn"]
  submitButton: `[data-testid="submit-form-btn"]`,

  // VERIFIED via Playwright MCP (2026-02-12)
  // Snapshot: span "Delete" [aria-label="Delete"]
  deleteIcon: `//span[@aria-label='Delete']`,

  // VERIFIED via Playwright MCP (2026-02-12)
  // Dynamic: row links with entity names
  entityByName: (name: string) => `//a[text()='${name}']`,
} as const;

// In page object — use modern Playwright locators when MCP reveals roles:
// VERIFIED via Playwright MCP (2026-02-12)
// Snapshot: button "Create New" [role=button]
await this.page.getByRole('button', { name: 'Create New' }).click();

// BAD - Unstable locators (avoid)
export const ModuleLocators = {
  badButton: `//button[@id='btn-12345']`,      // Dynamic ID
  badDiv: `//div[3]/div[2]/button`,             // Position-based
  badClass: `.MuiButton-root-xyz123`,           // Generated class name
  unverified: `//button[text()='Save']`,        // No MCP verification comment!
} as const;
```

### 6. Assertion Coverage Review

| Requirement | Assertion Exists | Pass/Fail |
|-------------|------------------|-----------|
| Entity created | `expect(locator).toBeVisible()` | |
| Error displayed | `expect(errorMsg).toHaveText(expected)` | |
| Count changed | `expect(countEl).toHaveText(expectedCount)` | |
| State changed | `expect(stateEl).toContainText(newState)` | |
| Navigation | `expect(page).toHaveURL(expected)` | |

**Every action MUST have an assertion. See [ASSERTION_GUIDE.md](../reference/ASSERTION_GUIDE.md)**

Key assertion guidelines:
- Use `expect()` for critical assertions that should fail the test immediately
- Use `expect.soft()` for non-critical checks (Playwright auto-collects soft failures)
- Always provide `{ timeout }` for elements that appear after network requests
- Prefer specific matchers: `toHaveText()`, `toBeVisible()`, `toHaveURL()` over generic `toBeTruthy()`

### 7. Fixture & Import Review

| Check | Criteria | Pass/Fail |
|-------|----------|-----------|
| Test import | Imports `test, expect` from `../../src/fixtures/tms.fixture.js` | |
| Page import | Page objects import from `@playwright/test` | |
| Locator import | Aliased as `L`: `import { ModuleLocators as L }` | |
| Config import | `TIMEOUTS`, `RETRY` from `../../config/constants.js` | |
| Wait import | `waitForNetworkIdle` from `../../utils/wait.helper.js` | |
| ESM extensions | All imports use `.js` extension (required for ESM) | |

---

## Review Output Template

```markdown
## Agent Review: [Feature Name]

### Files Reviewed
- Test Spec: `tests/module/feature-name.spec.ts`
- Page Object: `src/pages/module/module.page.ts`
- Locators: `src/pages/module/module.locators.ts`
- Fixtures: `src/fixtures/tms.fixture.ts` (if updated)

### Redundancy Check
- [ ] No duplicate tests found
- [ ] Searched patterns: `<patterns used>`

### Review Results

| Category | Status | Issues |
|----------|--------|--------|
| Test Spec | PASS/FAIL | |
| Page Object | PASS/FAIL | |
| MCP Verification | PASS/FAIL | |
| Locators | PASS/FAIL | |
| Assertions | PASS/FAIL | |
| Fixtures & Imports | PASS/FAIL | |

### Issues Found
1. [Issue description and fix recommendation]
2. [Issue description and fix recommendation]

### Recommendation
- [ ] Ready for execution
- [ ] Needs fixes (list above)
```

---

## Common Issues and Fixes

### Issue 1: Missing Assertion After Action
```typescript
// BAD - No assertion after delete
await this.loc(L.deleteButton).click();
await waitForNetworkIdle(this.page);

// FIX - Assert the element is gone
await this.loc(L.deleteButton).click();
await waitForNetworkIdle(this.page);
await expect(this.loc(L.deletedEntity)).not.toBeVisible({ timeout: TIMEOUTS.medium });
```

### Issue 2: Hardcoded Waits Instead of Proper Waits
```typescript
// BAD - Arbitrary delay
await this.page.waitForTimeout(5000);

// FIX - Wait for specific condition
await waitForNetworkIdle(this.page);
// or
await this.loc(L.targetElement).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
```

### Issue 3: Direct Page Interaction in Test Spec
```typescript
// BAD - Logic belongs in page object
test('should create entity', async ({ page }) => {
  await page.locator('//button[text()="Create"]').click();
  await page.locator('input[name="title"]').fill('My Entity');
  await page.locator('//span[text()="Submit"]').click();
});

// FIX - Delegate to page object
test('should create entity', async ({ modulePage, toast }) => {
  await test.step('Create entity', async () => {
    await modulePage.createEntity('My Entity');
  });
  await test.step('Verify creation', async () => {
    await expect(toast.successMessage).toBeVisible();
  });
});
```

### Issue 4: Unstable Locator
```typescript
// BAD - Position-based
export const Locators = {
  button: `//div[3]/button[2]`,
} as const;

// FIX - Attribute-based
export const Locators = {
  button: `//button[@aria-label='Submit']`,
} as const;
```

### Issue 5: Missing .js Extension in Import
```typescript
// BAD - Will fail at runtime with ESM
import { ModuleLocators } from './module.locators';

// FIX - Include .js extension
import { ModuleLocators } from './module.locators.js';
```

### Issue 6: Not Using BasePage.loc()
```typescript
// BAD - Direct page.locator bypasses loc() auto-detection
await this.page.locator('//button[text()="Submit"]').click();

// FIX - Use loc() for consistent XPath/CSS handling
await this.loc(L.submitButton).click();
```

---

## STOP HERE

Present review results to user and wait for confirmation before proceeding to Phase 12 (Execution).
