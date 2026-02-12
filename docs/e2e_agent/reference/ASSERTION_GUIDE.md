# Assertion Requirements Guide

[<- Back to Main](../TMS_AGENT.md)

---

> **CRITICAL**: Every action that modifies state or retrieves data MUST have at least ONE assertion validating the result!

## Pattern: Action -> Verification -> Assertion

```
Action (click/fill/navigate) -> Wait for Result -> Assert on Result (MANDATORY)
```

**Never skip the assertion!**

## TmsAutomation Assertion Methods

### Hard Assertions (Fail Immediately)

Hard assertions stop the test as soon as a check fails. Use these for critical preconditions where continuing is meaningless.

```typescript
import { expect } from '@playwright/test';

// Visibility
await expect(locator).toBeVisible();
await expect(locator).not.toBeVisible();
await expect(locator).toBeHidden();

// Text content
await expect(locator).toHaveText('expected');
await expect(locator).toContainText('partial');

// Input values
await expect(locator).toHaveValue('expected');

// Element count
await expect(locator).toHaveCount(5);

// Attributes and CSS
await expect(locator).toHaveAttribute('data-status', 'active');
await expect(locator).toHaveClass(/active/);
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();

// Page-level
await expect(page).toHaveURL(/\/dashboard/);
await expect(page).toHaveTitle('Dashboard');
```

### Soft Assertions (Collect Failures, Fail at End)

Soft assertions let the test continue even if a check fails. All failures are collected and reported at the end of the test. Use these when you want to verify multiple conditions before stopping.

```typescript
import { expect } from '@playwright/test';

// Soft visibility
await expect.soft(locator).toBeVisible();
await expect.soft(locator).toHaveText('expected');

// Soft count
await expect.soft(page.locator('.item')).toHaveCount(3);

// Soft attribute
await expect.soft(locator).toHaveAttribute('aria-selected', 'true');
```

Playwright auto-collects soft assertion failures and reports them when the test finishes. There is no manual `assertAll()` step required.

### Value Assertions (Non-Locator)

For asserting on extracted values rather than locators:

```typescript
// String equality
const text = await locator.textContent();
expect(text).toBe('expected');
expect(text).toContain('partial');

// Numeric comparisons
const count = await page.locator('.item').count();
expect(count).toBeGreaterThan(0);
expect(count).toBeLessThanOrEqual(10);

// Boolean checks
const isChecked = await locator.isChecked();
expect(isChecked).toBe(true);

// Null/undefined checks
const attr = await locator.getAttribute('data-id');
expect(attr).not.toBeNull();
```

## Action Types and Required Assertions

| Action Type | Method | What to Assert |
|-------------|--------|----------------|
| Click button | `this.loc(L.button).click()` | Element state change, new element visible |
| Fill text | `this.loc(L.input).fill('value')` | Input has correct value |
| Navigate | `page.goto(url)` | URL contains expected path |
| Wait for element | `this.loc(L.element).waitFor()` | Element is visible |
| API call | `tmsApi.createProject(...)` | Status code, response body |
| Get text | `locator.textContent()` | Text matches expected value |

## Required Assertion Patterns

### Pattern 1: UI Element Verification

```typescript
// Action
await this.loc(L.submitButton).click();

// Wait + Assert (MANDATORY)
await expect(this.loc(L.successMessage)).toBeVisible({ timeout: TIMEOUTS.long });
```

### Pattern 2: Text/Value Verification

```typescript
// Action
await this.loc(L.inputField).fill('test value');

// Assert (MANDATORY)
await expect(this.loc(L.inputField)).toHaveValue('test value');
```

### Pattern 3: Count Verification

```typescript
// Get initial count
const initialCount = await page.locator('.item').count();

// Action
await this.loc(L.addButton).click();
await waitForNetworkIdle(page);

// Assert (MANDATORY)
await expect(page.locator('.item')).toHaveCount(initialCount + 1);
```

### Pattern 4: Navigation Verification

```typescript
// Action
await this.loc(L.dashboardLink).click();

// Assert (MANDATORY)
await expect(page).toHaveURL(/\/dashboard/);
```

### Pattern 5: Toast/Notification Verification

```typescript
// Action
await this.loc(L.saveButton).click();

// Assert toast message (MANDATORY)
await expect(this.loc(L.toastMessage)).toContainText('saved successfully');
```

### Pattern 6: Deletion Verification

```typescript
// Action
await this.loc(L.deleteButton).click();
await this.loc(L.confirmDelete).click();
await waitForNetworkIdle(page);

// Assert element is gone (MANDATORY)
await expect(this.loc(L.deletedItem)).not.toBeVisible();
```

## Anti-Patterns (AVOID)

### BAD: Action without assertion

```typescript
// BAD - No verification!
await this.loc(L.deleteButton).click();
await this.loc(L.confirmDelete).click();
// Where's the expect()???
```

### GOOD: Action with assertion

```typescript
// GOOD - Proper verification
await this.loc(L.deleteButton).click();
await this.loc(L.confirmDelete).click();
await waitForNetworkIdle(page);

await expect(this.loc(L.deletedItem)).not.toBeVisible();
```

### BAD: Assertion without waiting for state

```typescript
// BAD - No wait for network/UI to settle
await this.loc(L.submitButton).click();
const text = await this.loc(L.resultLabel).textContent();
expect(text).toBe('Success');  // May fail due to timing
```

### GOOD: Using auto-retrying assertion

```typescript
// GOOD - Playwright retries the assertion until timeout
await this.loc(L.submitButton).click();
await expect(this.loc(L.resultLabel)).toHaveText('Success');
```

## Test Spec Assertion Pattern

```typescript
import { test, expect } from '../fixtures/tms.fixture.js';

test.describe('Project Management', { tag: ['@project', '@P0'] }, () => {
  test('should create project and verify it appears', async ({ projectPage }) => {
    await test.step('Create project', async () => {
      await projectPage.createProject();
    });

    await test.step('Verify project is visible', async () => {
      await expect(projectPage.loc(L.projectName)).toHaveText(projectPage.projectName);
    });
  });

  test('should verify multiple project attributes', async ({ projectPage }) => {
    await test.step('Create and verify project details', async () => {
      await projectPage.createProject();

      // Soft assertions - collects all failures
      await expect.soft(projectPage.loc(L.projectName)).toHaveText(projectPage.projectName);
      await expect.soft(projectPage.loc(L.projectType)).toHaveText('Web');
      await expect.soft(projectPage.loc(L.projectStatus)).toHaveText('Active');
    });
  });
});
```

## Assertion Timeout Configuration

Playwright assertions auto-retry until a timeout. Configure timeouts using the constants from `src/config/constants.ts`:

```typescript
import { TIMEOUTS } from '../config/constants.js';

// Short timeout for elements expected to appear quickly
await expect(locator).toBeVisible({ timeout: TIMEOUTS.short });    // 5000ms

// Medium timeout for standard operations
await expect(locator).toBeVisible({ timeout: TIMEOUTS.medium });   // 15000ms

// Long timeout for slow operations (page loads, API calls)
await expect(locator).toBeVisible({ timeout: TIMEOUTS.long });     // 30000ms
```

---

[<- Back to Main](../TMS_AGENT.md)
