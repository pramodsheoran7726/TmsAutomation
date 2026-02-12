# Common Pitfalls & Best Practices

[<- Back to Main](../TMS_AGENT.md)

---

## Common Pitfalls (Lessons Learned)

### 1. Locator Not Found

**Error**: `locator.click: Timeout 30000ms exceeded. Waiting for selector ...`

**Cause**: CSS or XPath selector does not match any element on the page.

```typescript
// WRONG - Selector does not match actual DOM
const L = {
  submitBtn: `//button[@type='submit']`,  // No such button exists
};
await this.loc(L.submitBtn).click();  // Timeout!

// RIGHT - Use loc() with a verified selector
const L = {
  submitBtn: `//button[normalize-space()='Submit']`,  // Verified via Playwright MCP
};
await this.loc(L.submitBtn).click();
```

**Prevention**:
- Use `BasePage.loc()` which auto-detects XPath (starts with `//` or `/`) vs CSS selectors
- Verify every locator using Playwright MCP: `browser_snapshot()` + `browser_evaluate()`
- Run tests with `--headed` to visually see what the browser sees

---

### 2. Assumed/Guessed Locators (Never Verified)

**Error**: Test fails because the locator was guessed instead of verified from the actual page.

```typescript
// WRONG - Assumed based on common patterns
const L = {
  addRowBtn: `//button[contains(@class,'add-row')]`,  // Guessed class name!
  saveBtn: `//button[@type='submit']`,                  // Assumed button structure!
};

// RIGHT - Verified via Playwright MCP
// VERIFIED via Playwright MCP (2026-01-14)
// HTML: <button class="types__StyledButton-sc-ws60qy-0">Save</button>
const L = {
  saveBtn: `//button[normalize-space()='Save']`,
};
```

**Prevention**:
1. ALWAYS use Playwright MCP to inspect the actual page before writing locators
2. Choose the best locator strategy based on what MCP discovers:
   - Has ARIA role + name? → `page.getByRole('button', { name: 'Save' })` (preferred)
   - Has `data-testid`? → `page.getByTestId('save-btn')` (preferred)
   - Has label? → `page.getByLabel('Name')` (preferred)
   - Only text/attributes? → `//button[normalize-space()='Save']` in locators file
3. Use specific tag names, NEVER use wildcard `*`: `//button[text()='Save']` not `//*[text()='Save']`
4. Document the source: `// VERIFIED via Playwright MCP (YYYY-MM-DD)`
5. See [PLAYWRIGHT_MCP_LOCATORS.md](PLAYWRIGHT_MCP_LOCATORS.md) for the full verification workflow

---

### 3. Multiple Elements Match Locator (Wrong Element Clicked)

**Error**: Test clicks wrong button, verifies wrong data, or behaves inconsistently.

**Cause**: Locator matches multiple elements; Playwright interacts with the first match by default.

```typescript
// WRONG - Multiple "Delete" buttons exist on page
const L = {
  deleteBtn: `//button[text()='Delete']`,
};

// RIGHT - Scoped to specific context
const L = {
  deleteConfirmBtn: `//div[@role='dialog']//button[text()='Delete']`,
};

// RIGHT - Use nth() when needed
await this.loc(L.editButton).nth(0).click();  // First edit button
```

**Prevention**:
- Verify locator uniqueness via Playwright MCP: `browser_evaluate("document.querySelectorAll('...').length")`
- Use relative context to scope locators: `//div[@role='dialog']//button`
- Use `nth()` for ordered elements
- Use row-specific locators: `//tr[contains(.,'TestData')]//button[text()='Edit']`

---

### 4. Missing `await` Keyword

**Error**: `TypeError: Cannot read properties of undefined` or assertions pass when they should fail.

**Cause**: All Playwright operations are async and require `await`. Without it, the Promise is not resolved.

```typescript
// WRONG - Missing await (operation never completes)
this.loc(L.submitButton).click();
expect(this.loc(L.successMessage)).toBeVisible();

// RIGHT - Always await async operations
await this.loc(L.submitButton).click();
await expect(this.loc(L.successMessage)).toBeVisible();
```

**Prevention**:
- Enable strict TypeScript checking (`strict: true` in `tsconfig.json`)
- Use `@typescript-eslint/no-floating-promises` lint rule
- Run `npx tsc --noEmit` to catch type errors before running tests

---

### 5. Wrong Import (Bypassing Custom Fixtures)

**Error**: Fixtures not available, `test` function does not provide page objects.

**Cause**: Importing `test` and `expect` from `@playwright/test` instead of the custom fixture file.

```typescript
// WRONG - Bypasses custom fixtures
import { test, expect } from '@playwright/test';

test('example', async ({ page }) => {
  // No projectPage, testCasePage, tmsApi, etc.
});

// RIGHT - Import from custom fixture file
import { test, expect } from '../../src/fixtures/tms.fixture.js';

test('example', async ({ projectPage, tmsApi }) => {
  // All custom fixtures available
});
```

**Prevention**:
- Always import from `src/fixtures/tms.fixture.js`
- Review imports in code review

---

### 6. Timeout Too Short

**Error**: `Timeout 5000ms exceeded` on operations that need more time.

**Cause**: Using default timeouts when the operation requires a longer wait.

```typescript
// WRONG - Default timeout may be too short for slow operations
await expect(this.loc(L.reportGenerated)).toBeVisible();

// RIGHT - Use TIMEOUTS constants for appropriate duration
import { TIMEOUTS } from '../../config/constants.js';

await expect(this.loc(L.reportGenerated)).toBeVisible({ timeout: TIMEOUTS.long });
```

**Prevention**:
- Use `TIMEOUTS.short` (5s), `TIMEOUTS.medium` (15s), `TIMEOUTS.long` (30s) from `src/config/constants.ts`
- Set appropriate default timeout in `playwright.config.ts`
- Use longer timeouts for page loads, report generation, API-dependent UI

---

### 7. Network Race Conditions

**Error**: Test acts on stale data or element is not yet updated after an action.

**Cause**: Not waiting for network requests to complete after actions that trigger API calls.

```typescript
// WRONG - No wait for network after action
await this.loc(L.saveButton).click();
await expect(this.loc(L.savedItem)).toBeVisible();  // May fail - API not done yet

// RIGHT - Wait for network to settle
import { waitForNetworkIdle, clickAndWaitForResponse } from '../../utils/wait.helper.js';

await this.loc(L.saveButton).click();
await waitForNetworkIdle(this.page);
await expect(this.loc(L.savedItem)).toBeVisible();

// OR - Wait for specific API response
await clickAndWaitForResponse(this.page, this.loc(L.saveButton), '**/api/projects');
```

**Prevention**:
- Use `waitForNetworkIdle(page)` after actions that trigger API calls
- Use `clickAndWaitForResponse(page, locator, urlPattern)` for specific API waits
- Use `fillAndWaitForSearch(page, locator, text)` for search fields with debounce
- Use `clickAndWaitForNetwork(page, locator)` for clicks that trigger navigation or data loads

---

### 8. Stale Locator / Dynamic Content

**Error**: Element appears but is not yet interactive, or content has changed since the locator was resolved.

**Cause**: DOM updates after initial render (e.g., skeleton loaders, lazy-loaded content).

```typescript
// WRONG - May interact with skeleton loader or placeholder
await this.loc(L.dataTable).click();

// RIGHT - Wait for the element to be in the expected state
await this.loc(L.dataTable).waitFor({ state: 'visible' });
await expect(this.loc(L.loadingSpinner)).not.toBeVisible();
await this.loc(L.dataTable).click();
```

**Prevention**:
- Playwright auto-retries locators, but use `waitFor()` for dynamic content transitions
- Wait for loading indicators to disappear before interacting
- Use `retryAction(page, async () => { ... })` from `src/utils/retry.helper.ts` for flaky operations

---

### 9. Missing `test.step()` Grouping

**Error**: Not technically an error, but test reports become hard to read without step grouping.

**Cause**: Page object methods do not wrap actions in `test.step()`.

```typescript
// WRONG - No step grouping in page object
async createProject(): Promise<void> {
  await this.loc(L.createButton).click();
  await this.loc(L.nameInput).fill(this.projectName);
  await this.loc(L.submitButton).click();
  await waitForNetworkIdle(this.page);
}

// RIGHT - Wrap in test.step() for clear reporting
async createProject(): Promise<void> {
  await test.step('Create project', async () => {
    await this.loc(L.createButton).click();
    await this.loc(L.nameInput).fill(this.projectName);
    await this.loc(L.submitButton).click();
    await waitForNetworkIdle(this.page);
  });
}
```

**Prevention**:
- Every public page object method should wrap its body in `test.step()`
- Use descriptive step names that appear in the HTML report

---

### 10. Hardcoded Waits

**Error**: Slow tests or still-flaky timeouts.

**Cause**: Using `page.waitForTimeout()` instead of proper wait strategies.

```typescript
// WRONG - Hardcoded wait wastes time or is insufficient
await this.loc(L.saveButton).click();
await this.page.waitForTimeout(5000);  // Always waits 5 seconds regardless
await expect(this.loc(L.savedItem)).toBeVisible();

// RIGHT - Use network-aware waits
await this.loc(L.saveButton).click();
await waitForNetworkIdle(this.page);
await expect(this.loc(L.savedItem)).toBeVisible();
```

**Prevention**:
- Never use `page.waitForTimeout()` in production test code
- Use `waitForNetworkIdle(page)` for API-dependent actions
- Use Playwright's auto-retrying assertions (`expect(locator).toBeVisible()`) which poll until timeout
- Use `clickAndWaitForResponse()` for precise API synchronization

---

### 11. Environment Not Set

**Error**: Tests hit the wrong environment, or `EnvConfig` properties resolve to undefined/wrong URLs.

**Cause**: `TEST_ENV` is not set in `.env` or CLI.

```bash
# WRONG - No environment specified
npx playwright test

# RIGHT - Set environment
TEST_ENV=stage npx playwright test

# OR - Set in .env file
echo "TEST_ENV=stage" >> .env
npx playwright test
```

**Prevention**:
- Ensure `.env` file exists with `TEST_ENV` set
- CI pipelines should always set `TEST_ENV` explicitly
- Check `EnvConfig` values in test output if URLs seem wrong

---

### 12. Auth State Missing

**Error**: Tests redirect to login page instead of starting authenticated.

**Cause**: The `auth.setup.ts` setup project did not run, or `.auth/user.json` does not exist.

```typescript
// playwright.config.ts must have setup project
{
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'tests',
      dependencies: ['setup'],
      use: { storageState: '.auth/user.json' },
    },
  ],
}
```

**Prevention**:
- Verify `src/setup/auth.setup.ts` runs before test projects (check `dependencies` in `playwright.config.ts`)
- Ensure `.auth/user.json` is created by the setup step
- Ensure `AUTH_EMAIL` and `AUTH_PASSWORD` environment variables are set
- Check that cookie domain matches the test environment

---

## Best Practices Checklist

### Test Spec

- [ ] Tags assigned: priority (`@P0`-`@P3`), type (`@smoke`/`@regression`), feature
- [ ] `test.describe()` groups related tests with shared tags
- [ ] `test.step()` used in page object methods for clear reporting
- [ ] Annotations for known issues: `test.fixme()`, `test.skip()` with reason

### Page Object

- [ ] Extends `BasePage`
- [ ] Uses modern locators where available: `this.page.getByRole()`, `getByTestId()`, `getByLabel()`
- [ ] Falls back to `this.loc(selector)` for string selectors (auto XPath/CSS detection)
- [ ] Uses `tpl(selector, replacements)` for template locators
- [ ] Delegates all UI logic to page object (test specs stay thin)
- [ ] Public methods wrapped in `test.step()`

### Locators

- [ ] ALL locators verified via Playwright MCP before writing to code
- [ ] Modern locators used when MCP reveals suitable attributes:
  - [ ] `getByRole()` for buttons, links, headings with ARIA roles
  - [ ] `getByTestId()` for elements with `data-testid`
  - [ ] `getByLabel()` for labeled form fields
- [ ] String selectors in `MODULE.locators.ts` only when XPath/CSS is the only option
- [ ] Exported as `const` object with `as const`
- [ ] Dynamic locators are functions returning strings
- [ ] Every locator has `// VERIFIED via Playwright MCP (date)` comment
- [ ] No guessed or assumed locators

### Assertions

- [ ] `expect()` after every state-changing action
- [ ] `expect.soft()` for multiple non-critical checks
- [ ] Auto-retrying assertions preferred over manual waits + value checks
- [ ] Timeouts from `TIMEOUTS` constants, not magic numbers

### Pre-Merge Checks

- [ ] Type check passes: `npx tsc --noEmit`
- [ ] Tests list correctly: `npx playwright test --list`
- [ ] Tests pass locally: `npx playwright test --grep @yourTag`
- [ ] No `page.waitForTimeout()` in code
- [ ] No hardcoded URLs (use `EnvConfig`)
- [ ] No credentials in code (use environment variables)

---

## Debugging Tips

### Run Single Test with Headed Browser

```bash
npx playwright test tests/project/project-crud.spec.ts --headed
```

### Run with Debug Mode (Step-by-Step)

```bash
npx playwright test --debug
```

### Run with Trace Recording

```bash
npx playwright test --trace on
```

### View Trace File

```bash
npx playwright show-trace trace.zip
```

### View HTML Report

```bash
npx playwright show-report
```

### Run Only Tests Matching a Tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep "@project and @P0"
```

### List All Tests Without Running

```bash
npx playwright test --list
```

### Check for TypeScript Errors

```bash
npx tsc --noEmit
```

### Check LambdaTest Dashboard

- View session video for visual debugging
- Check network logs for API issues
- Review console logs for JavaScript errors
- Inspect test artifacts (screenshots, traces)

---

## Error Reference

| Error | Cause | Solution |
|-------|-------|----------|
| `Timeout exceeded. Waiting for selector` | Locator does not match any element | Verify selector with Playwright MCP, check page state |
| `expect(locator).toBeVisible() failed` | Element not visible within timeout | Add `waitForNetworkIdle()`, increase timeout |
| `expect.soft` failures in report | Soft assertion failed | Fix the assertion or update expected value |
| `TypeError: Cannot read properties` | Missing `await` on async call | Add `await` before all Playwright operations |
| `fixture "xyz" not found` | Wrong import source | Import `test` from `src/fixtures/tms.fixture.js` |
| `storageState file not found` | Auth setup did not run | Check `dependencies` in `playwright.config.ts` |
| `page.goto: net::ERR_CONNECTION_REFUSED` | Wrong URL or env not set | Verify `TEST_ENV` and `EnvConfig` values |
| `strict mode violation` | Locator matches multiple elements | Make locator more specific with context |

---

[<- Back to Main](../TMS_AGENT.md)
