# Fix Failing Tests with Playwright MCP

Fix failing E2E tests by using Playwright MCP for live UI inspection to identify and correct locator mismatches, navigation issues, and page object bugs.

## Input

Provide the test command to run:

$ARGUMENTS

If no arguments provided, ask the user which tests to fix.

---

## Workflow

### Phase 1: Run Tests & Capture Failures

1. Run the test command to identify failures:
   ```bash
   npx playwright test <path> --reporter=list
   ```
2. For each failure, capture:
   - The exact error message and stack trace
   - The file and line number where it failed
   - The locator or action that timed out
   - The screenshot from `test-results/` (read it to see the page state)

3. Categorize failures:
   - **Locator mismatch** — element not found, timeout waiting for selector
   - **Navigation issue** — blank page, wrong URL, SPA interception
   - **Timing issue** — element not ready, network not idle
   - **Flow issue** — wrong page state, missing prerequisite step

---

### Phase 2: Read Test Code & Dependencies

For each failing test:
1. Read the test spec file to understand the full test flow
2. Read all page objects used (`.page.ts` files)
3. Read all locator files used (`.locators.ts` files)
4. Read fixture definitions in `src/fixtures/tms.fixture.ts`
5. Map the exact call chain from test step to the failing locator

---

### Phase 3: Live UI Inspection with Playwright MCP

**This is the core diagnostic phase.** Use Playwright MCP browser tools to navigate to the actual UI and inspect the real DOM.

#### 3a: Navigate to the relevant page
- Use `browser_navigate` to go to the page where the test fails
- If authentication is needed, navigate to a URL where cookies are already set
- Walk through the same flow the test follows (create project, open page, etc.)

#### 3b: Inspect the DOM for locator mismatches
For each failing locator:
1. Use `browser_snapshot` to see the accessibility tree
2. Use `browser_evaluate` to query the DOM directly:
   ```javascript
   // Find elements by text content
   () => {
     const all = document.querySelectorAll('*');
     const matches = [];
     for (const el of all) {
       for (const child of el.childNodes) {
         if (child.nodeType === 3 && child.textContent.trim() === 'TARGET_TEXT') {
           matches.push({
             tag: el.tagName, id: el.id, classes: el.className,
             role: el.getAttribute('role'),
             parentTag: el.parentElement?.tagName,
             html: el.outerHTML.substring(0, 200)
           });
         }
       }
     }
     return matches;
   }
   ```
3. Compare the actual element structure with the XPath/CSS locator in the code

#### 3c: Common locator issues to check
| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `text()='X'` fails | Text is in a child `<span>` not directly in parent | Use `normalize-space()='X'` or `.//span[text()='X']` |
| Element tag mismatch | UI changed from `<span>` to `<h5>` or `<div>` | Update tag in XPath |
| `role="listbox"` not found | Custom dropdown, not ARIA-based | Use `page.evaluate()` or checkbox-based selectors |
| Element not visible | Tab/section needs to be expanded first | Add a click on the parent tab before locating |
| Multiple matches | Locator is too generic | Scope with parent context or specific attributes |

#### 3d: Check navigation and domain behavior
- **Verify URLs**: Use `browser_evaluate(() => window.location.href)` to check the current domain
- **SPA interception**: If clicking a link stays on the wrong domain, the SPA is intercepting
  - Fix: Use `page.goto(href)` instead of `link.click()` for cross-domain navigation
  - Get href via `await link.getAttribute('href')`
- **Blank pages**: Check browser console for React errors (error #130 = component not found on this domain)
  - Use `browser_evaluate` to check for errors

#### 3e: Check timing and load states
- `networkidle` may never resolve on pages with analytics/telemetry — use `domcontentloaded` instead
- After SPA navigation, `domcontentloaded` fires immediately — wait for a specific element instead
- For cross-domain `page.goto()`, `domcontentloaded` fires after the new page loads (safe to use)

---

### Phase 4: Fix & Verify (Iterative)

For each failure, apply fixes in this order:

1. **Fix locators** in `.locators.ts` files:
   - Update tag names, attributes, text matchers based on MCP inspection
   - Use `normalize-space()` for button text in nested spans
   - Scope generic locators to avoid multiple matches

2. **Fix page object methods** in `.page.ts` files:
   - Update navigation waits (`domcontentloaded` vs `networkidle`)
   - Use `page.goto(href)` for cross-domain link navigation
   - Add missing click/expand steps for tabs or sections
   - Fix element interaction patterns (inline edit vs modal)

3. **Fix test flow** in `.spec.ts` files (last resort):
   - Only if the test itself has incorrect assumptions about the UI flow
   - Prefer fixing page objects over modifying tests

4. **Re-run the failing test** to verify the fix:
   ```bash
   npx playwright test <path> --grep "<test name>" --reporter=list
   ```

5. **If still failing**, go back to Phase 3 and re-inspect with MCP

---

### Phase 5: Full Suite Verification

After all individual tests pass:
1. Run the complete test suite:
   ```bash
   npx playwright test <path> --reporter=list
   ```
2. Verify all tests pass together (no shared state issues)
3. If any test regresses, investigate interactions between tests

---

## Key Debugging Patterns

### Pattern: Blank page after navigation
```
Symptom: Screenshot shows blank white page
Debug: Add console.log for URL → check if on wrong domain
Root cause: SPA intercepts <a> clicks, stays on web-frontend
Fix: Use page.goto(href) instead of link.click()
```

### Pattern: Locator timeout on correct page
```
Symptom: Element exists in MCP but test can't find it
Debug: Use browser_evaluate to check exact tag/attributes
Root cause: Tag changed (span→h5), text in child element, or element needs scroll
Fix: Update locator to match actual DOM structure
```

### Pattern: networkidle timeout
```
Symptom: waitForLoadState('networkidle') hangs forever
Debug: Check browser network tab for streaming connections
Root cause: Analytics/telemetry keep connections alive
Fix: Use domcontentloaded + explicit element waitFor instead
```

### Pattern: Element click intercepted
```
Symptom: Click fails or clicks wrong element
Debug: Use browser_snapshot to check overlapping elements
Root cause: Sticky footer, modal overlay, or tooltip covering target
Fix: Use keyboard.type() to filter dropdown, or scrollIntoViewIfNeeded()
```

---

## Rules

- Always read the test code and page objects BEFORE using MCP — understand what the test expects
- Always check the failure screenshot FIRST — it often reveals the issue immediately
- Use MCP to verify your hypothesis, not to blindly search — have a theory before inspecting
- Fix the minimum necessary — don't refactor working code while fixing a bug
- After fixing, always re-run the specific test before moving to the next failure
- After all fixes, run the full suite to catch regressions
- Close MCP browser sessions when done to free resources

## CRITICAL: Do Not Break Existing Tests

Every fix you make touches shared page objects, locators, and helpers that other tests depend on. You MUST ensure your changes don't break anything.

### Before changing any shared file, check what depends on it
- **Locators** (`.locators.ts`): Search for every import/usage of the locator you're changing
  ```bash
  # Find all files that import from the locator file
  grep -r "from.*module.locators" src/ tests/ --include="*.ts"
  ```
- **Page objects** (`.page.ts`): Search for every test that uses the method you're modifying
  ```bash
  grep -r "methodName" tests/ --include="*.ts"
  ```
- **Helpers/utils**: Changes to `wait.helper.ts`, `base.page.ts`, etc. affect ALL tests

### Safe change strategies
- **Renaming a locator?** Update every file that references it, not just the failing test
- **Changing a method signature?** Check all callers — add optional params with defaults to avoid breaking existing calls
- **Changing wait strategy?** (e.g. `networkidle` → `domcontentloaded`) Verify the new strategy works for ALL callers, not just the failing test
- **Fixing navigation?** (e.g. `link.click()` → `page.goto(href)`) Ensure the page object method still works for tests that were already on the correct domain
- **Adding a new step** (e.g. expanding a sidebar): Use conditional checks (`if (!isVisible) { expand }`) so tests that already have the element visible don't break

### Mandatory regression check
After all fixes are applied, run the **entire test directory** (not just the fixed tests):
```bash
npx playwright test <test-directory>/ --reporter=list
```

If you changed shared files (page objects, locators, helpers), also run related test suites that import them:
```bash
# Find all test files that use the changed page object
grep -rl "ChangedPageClass\|changed-import" tests/ --include="*.spec.ts"
# Run each one
npx playwright test <found-files> --reporter=list
```

**Do NOT consider the task complete until all existing tests pass alongside the fixed ones.**
