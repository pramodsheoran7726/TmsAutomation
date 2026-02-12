# Debug Flaky Test

Debug and analyze flaky tests in the TmsAutomation framework. This command traces the complete code flow from test spec to page objects and helpers.

## CRITICAL: Clarification-First Approach

**STOP! Before doing ANY analysis or proposing ANY fixes, you MUST:**

1. **Gather complete context first** - Do not assume anything. Ask questions.
2. **Never jump to solutions** - Understanding the problem fully comes before solving it.
3. **Ask the user for clarification** when:
   - The test spec path is incomplete or ambiguous
   - You cannot locate the test file or page objects
   - The failure pattern is unclear (random failures vs consistent failures)
   - You don't have access to error logs or stack traces
   - Multiple tests match and you're unsure which one is flaky
   - The test environment context is missing
   - You're unsure about any aspect of the problem

### Mandatory Questions to Ask (if not provided):
- What is the exact error message or failure you're seeing?
- How often does this test fail? (e.g., 1 in 5 runs, always on first run, etc.)
- Does it fail in a specific environment only (stage/prod/local)?
- Does it fail when run in parallel or only in isolation?
- When did this test start becoming flaky? (recent change, always flaky, etc.)
- Do you have any logs or stack traces from a failed run?

**Only proceed to analysis after you have sufficient context to understand the problem.**

---

## Framework Context
- **Framework**: TmsAutomation (TypeScript 5.7 + Playwright Test 1.49)
- **Test Specs**: `tests/**/*.spec.ts`
- **Page Objects**: `src/pages/**/*.page.ts` (extend BasePage)
- **Locators**: `src/pages/**/*.locators.ts`
- **Fixtures**: `src/fixtures/tms.fixture.ts`
- **Wait Helpers**: `src/utils/wait.helper.ts`
- **Retry Helper**: `src/utils/retry.helper.ts`
- **Config**: `src/config/constants.ts` (TIMEOUTS, RETRY)
- **Auth Setup**: `src/setup/auth.setup.ts`

---

## Analysis Workflow

### Phase 0: Context Gathering & Clarification (MANDATORY)
**This phase cannot be skipped.**

1. Parse the provided test command or spec path
2. Identify what information is missing
3. **ASK the user** for any missing context before proceeding
4. Confirm understanding with the user before moving to Phase 1

### Phase 1: Parse Test Command
1. Extract the test spec path from the command
2. Extract the tag filter from `--grep` parameter
3. Extract environment (`TEST_ENV=`) if present
4. Identify any additional flags (--workers, --retries, etc.)

### Phase 2: Locate Test Spec & Scenarios
1. Read the test spec file
2. Identify `test.describe()` blocks and `test()` blocks
3. Extract all `test.step()` calls
4. Document any fixture dependencies
5. **If multiple tests match, ask user which one is flaky**

### Phase 3: Map Page Object Dependencies
For each test in the spec:
1. Search for fixture usage (page objects from `tms.fixture.ts`)
2. Map to page object classes in `src/pages/`
3. Read the page object methods called in the test
4. Document locators used
5. **If page object cannot be found, ask user for guidance**

### Phase 4: Trace Helper Dependencies
For each page object method:
1. Identify wait helper usage (`waitForNetworkIdle`, `clickAndWaitForNetwork`, etc.)
2. Identify retry helper usage (`retryAction`)
3. Trace API client dependencies (`tms.api.ts`, `jira.api.ts`)
4. Identify setup/teardown (compound fixtures like `projectOnly`, `projectWithTestCase`)

### Phase 5: Assess Logging & Debugging
**Evaluate if existing tracing is sufficient:**

1. Check if test uses `test.step()` for clear step grouping
2. Check Playwright trace configuration in `playwright.config.ts`
3. Suggest running with trace:
   ```bash
   npx playwright test path/to/spec.ts --trace on
   ```
4. Suggest running in debug mode:
   ```bash
   npx playwright test path/to/spec.ts --debug
   ```
5. Suggest viewing trace:
   ```bash
   npx playwright show-trace test-results/*/trace.zip
   ```

### Phase 6: Identify Flakiness Patterns
Analyze for common flakiness causes:
- **Timing issues**: Missing `waitForNetworkIdle()`, race conditions, animation delays
- **Element locators**: Dynamic content, multiple matching elements
- **Test data**: Shared state, random name collisions
- **Network**: API response delays, network idle not reached
- **Auth state**: Expired cookies, stale auth session
- **Parallel execution**: Resource contention, shared projects

### Phase 7: Report & Recommendations
Generate a structured report:
1. **Code Flow**: Spec -> Page Object -> Locator -> Helper
2. **Potential Flakiness Points**: Ranked by likelihood
3. **Fix Recommendations**: Specific code changes with line references
4. **Test Isolation Check**: Fixture cleanup, data independence

---

## Common Flakiness Fixes

### Fix 1: Missing Network Wait
```typescript
// BAD - No wait after action
await this.loc(L.submitButton).click();
await expect(this.loc(L.result)).toBeVisible(); // May fail!

// GOOD - Wait for network after action
await this.loc(L.submitButton).click();
await waitForNetworkIdle(this.page);
await expect(this.loc(L.result)).toBeVisible();
```

### Fix 2: Element Not Ready
```typescript
// BAD - Click without waiting for element
await this.loc(L.dynamicButton).click();

// GOOD - Wait for element first
await this.loc(L.dynamicButton).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
await this.loc(L.dynamicButton).click();
```

### Fix 3: Race Condition with Search
```typescript
// BAD - Fill without waiting for debounce
await this.loc(L.searchInput).fill('query');
await expect(this.loc(L.result)).toBeVisible();

// GOOD - Use fillAndWaitForSearch helper
await fillAndWaitForSearch(this.page, this.loc(L.searchInput), 'query');
await expect(this.loc(L.result)).toBeVisible();
```

### Fix 4: Retry Flaky Action
```typescript
// Use retryAction for actions that depend on async data
await retryAction(this.page, async () => {
  await this.loc(L.searchInput).fill(searchTerm);
  await expect(this.loc(L.result)).toBeVisible({ timeout: TIMEOUTS.medium });
});
```

---

## Output Format

```
## Context Gathered

### Test Information
- Spec File: [path]
- Tag: [tag]
- Environment: [env]
- Failure Pattern: [description from user]
- Error Message: [from user]

### Clarifications Received
- [Question asked] -> [User's answer]

---

## Test Analysis: [Test Name]

### Code Flow
Spec: [path]
  -> test('test name')
     -> Fixture: [fixtureName] -> PageObject: [Class] at [file:line]
        -> Method: [method]() at [file:line]
           -> Locator: [key] at [file:line]
           -> Helper: [function]() at [file:line]

### Flakiness Indicators
1. [Issue description] - [file:line]
   Risk: [High/Medium/Low]
   Evidence: [why this is suspected]

### Recommended Fixes
[Prioritized list of changes - only after full analysis]
```

---

## Input
Provide the test command or spec path you're running:

$ARGUMENTS
