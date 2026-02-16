# Fix Failing Tests — Strict Mode with Live Browser Inspection

Fix failing E2E tests using Cursor IDE Browser MCP for live UI inspection. Operates in **strict mode** by default: only fix the targeted failure, never reduce test data, never reduce coverage, never break other files.

## Input

Provide the test command or specific test to fix:

$ARGUMENTS

If no arguments provided, ask the user which tests to fix.

---

## Strict Mode Guarantees

These rules are **non-negotiable** and apply to every fix:

### 1. Surgical Fixes Only
- Fix ONLY the specific failure identified — nothing else
- Do NOT refactor, rename, or "improve" working code while fixing
- Do NOT change test logic, flow, or structure unless it is the direct cause of the failure
- If a fix requires touching more than 3 files, STOP and explain the blast radius to the user before proceeding

### 2. Zero Data Reduction
- NEVER remove test data (test cases, datasets, parameterized inputs, data arrays)
- NEVER reduce the number of iterations in parameterized/data-driven tests
- NEVER delete or comment out test data entries to "simplify" the fix
- NEVER reduce array sizes, trim test matrices, or remove edge-case data
- If test data is causing a failure, fix the **code** to handle the data — not the other way around

### 3. Zero Coverage Reduction
- NEVER remove assertions (`expect`, `expect.soft`, `toHaveText`, `toBeVisible`, etc.)
- NEVER delete test steps or `test.step()` blocks
- NEVER skip tests with `.skip`, `.fixme`, or `test.skip()` — fix them instead
- NEVER reduce the scope of what a test validates
- NEVER replace strict assertions with soft assertions to "make it pass"
- NEVER remove or weaken `waitFor` / visibility checks
- If an assertion is failing, fix the locator or the page object — not the assertion

### 4. Zero Collateral Damage
- Before editing ANY shared file, perform a full **impact analysis** (see Phase 2b)
- Track every file you modify in a **change manifest** (see Phase 2c)
- After all fixes, run **all dependent tests** — not just the fixed ones
- If a fix would break another test, find an alternative approach that satisfies both
- NEVER change method signatures without checking all callers
- NEVER change locator names/keys without updating all importers
- NEVER change wait strategies without verifying all consuming tests

---

## Workflow

### Phase 1: Run Tests & Capture Failures

1. Run the test command to identify failures (**always in headed mode**):
   ```bash
   npx playwright test <path> --headed --reporter=list 2>&1
   ```

2. For each failure, capture:
   - The exact error message and stack trace
   - The file and line number where it failed
   - The locator or action that timed out/failed
   - The screenshot from `test-results/` (read the image to see the page state)

3. Categorize each failure:
   | Category | Symptoms |
   |----------|----------|
   | **Locator mismatch** | Element not found, timeout waiting for selector, strict mode violation |
   | **Navigation issue** | Blank page, wrong URL, SPA interception, domain mismatch |
   | **Timing issue** | Element not ready, network not idle, race condition |
   | **Flow issue** | Wrong page state, missing prerequisite step, stale state |
   | **Data issue** | Test data doesn't match UI options, missing dropdown value |

4. **Prioritize**: Fix failures in dependency order — if Test B depends on a page object method that Test A's fix will touch, fix Test A first.

---

### Phase 2: Read Code & Analyze Impact

#### 2a: Read test code and dependencies
For each failing test:
1. Read the test spec file (`.spec.ts`) to understand the full test flow
2. Read all page objects used (`.page.ts` files)
3. Read all locator files used (`.locators.ts` files)
4. Read fixture definitions in `src/fixtures/tms.fixture.ts` if relevant
5. Read any shared helpers/utils referenced (`base.page.ts`, `wait.helper.ts`, etc.)
6. Map the **exact call chain** from test step → page object method → locator → DOM element

#### 2b: Impact analysis (MANDATORY before any edit)
Before changing any file, run this analysis:

**For locator files** (`.locators.ts`):
```
Search for: import references to the locator file across src/ and tests/
Search for: the specific locator key name being changed
Record: every file that imports or uses this locator
```

**For page object files** (`.page.ts`):
```
Search for: the specific method name being changed across tests/
Search for: the class name import across all test files
Record: every test that calls the method being modified
```

**For utility/helper files** (`base.page.ts`, `wait.helper.ts`, etc.):
```
STOP — these affect ALL tests. Explain the impact to the user before proceeding.
Changes here require running the ENTIRE test suite after.
```

#### 2c: Change manifest
Before making any edits, create a mental manifest:
```
TARGET TEST:     <the test being fixed>
FILES TO MODIFY: <list each file and what changes>
DEPENDENT TESTS: <list every other test that imports from modified files>
RISK LEVEL:      LOW (locator-only) | MEDIUM (page object) | HIGH (shared util)
```

State this manifest to the user before proceeding with edits.

---

### Phase 3: Live UI Inspection with Cursor IDE Browser

**This is the core diagnostic phase.** Use the Cursor IDE Browser MCP tools to navigate to the actual UI and inspect the real DOM.

#### 3a: Navigate to the relevant page

1. Open the target URL in the browser:
   - Use `browser_navigate` to go to the page where the test fails
   - If the app requires auth, navigate to a URL where the session is active, or log in through the browser

2. Walk through the same flow the test follows:
   - Replicate the exact steps the test performs (create project, navigate, click, etc.)
   - Stop at the point where the test fails

#### 3b: Inspect the DOM for locator mismatches

For each failing locator:

1. **Snapshot the page** — Use `browser_snapshot` to get the full accessibility tree
   - Use `compact: true` for large pages
   - Use `selector: "<css>"` to scope to a specific section if needed

2. **Search for the expected text/element** — Use `browser_search` with the target text:
   - This highlights all matches and shows count
   - Reveals if the text exists but in a different element structure

3. **Read element attributes** — Use `browser_get_attribute` on candidate elements:
   - Check `role`, `aria-label`, `data-testid`, `class`, `id`
   - Compare against the XPath/CSS locator in the code

4. **Check element visibility** — Use `browser_is_visible` on the target element ref:
   - If not visible, the element might need a scroll, tab click, or section expand

5. **Take a screenshot** for reference — Use `browser_take_screenshot`:
   - Capture the page state at the point of failure
   - If targeting a specific element, use the `ref` parameter

#### 3c: Common locator issues to check

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `text()='X'` fails | Text in child `<span>`, not direct text node | Use `normalize-space()='X'` or `.//span[text()='X']` |
| Element tag mismatch | UI changed from `<span>` to `<h5>` or `<div>` | Update tag in XPath |
| `role="listbox"` not found | Custom dropdown, not ARIA-based | Use attribute selectors or checkbox-based selectors |
| Element not visible | Tab/section needs to be expanded first | Add conditional expand step in page object |
| Multiple matches (strict mode violation) | Locator is too generic | Scope with parent context, `nth()`, or specific attributes |
| Element in scrollable container | Element outside viewport | Add `scrollIntoView` before interaction |

#### 3d: Check navigation and domain behavior

- **Verify current URL**: Use `browser_snapshot` — the page URL is shown in the snapshot header
- **SPA interception**: If clicking a link stays on the wrong domain:
  - Fix: Use `page.goto(href)` instead of `link.click()` for cross-domain navigation
  - Get href via `await link.getAttribute('href')`
- **Blank pages**: Use `browser_console_messages` to check for React errors
  - Error #130 = component not found on this domain
- **Network issues**: Use `browser_network_requests` to check for failed API calls

#### 3e: Check timing and load states

- `networkidle` may never resolve on pages with analytics/telemetry — use `domcontentloaded` instead
- After SPA navigation, `domcontentloaded` fires immediately — wait for a specific element instead
- For cross-domain `page.goto()`, `domcontentloaded` fires after the new page loads (safe to use)
- Use `browser_wait_for` with `text` param to wait for specific content to appear

#### 3f: Interactive debugging

When the snapshot alone isn't enough:
1. **Click through the flow** — Use `browser_click` to replicate the test's interactions step by step
2. **Fill forms** — Use `browser_fill` to input test data and verify field behavior
3. **Check dropdowns** — Use `browser_snapshot` after opening a dropdown to see available options
4. **Scroll** — Use `browser_scroll` with `direction` and `amount` to reveal hidden content
5. **Hover** — Use `browser_hover` to trigger tooltip/popover elements the test might expect

**Remember**: Always call `browser_snapshot` before any interaction to get fresh element refs.

---

### Phase 4: Fix & Verify (Iterative)

For each failure, apply fixes following the **strict mode hierarchy**:

#### Fix Priority Order (highest to lowest):

1. **Fix locators** in `.locators.ts` files (PREFERRED — lowest risk):
   - Update tag names, attributes, text matchers based on browser inspection
   - Use `normalize-space()` for button text in nested spans
   - Scope generic locators with parent context to avoid strict mode violations
   - Add `nth()` or index qualifiers for repeated elements
   - **CHECK**: Does any other file import this locator? Update all of them.

2. **Fix page object methods** in `.page.ts` files (MEDIUM risk):
   - Update navigation waits (`domcontentloaded` vs `networkidle`)
   - Use `page.goto(href)` for cross-domain link navigation
   - Add missing click/expand steps for tabs or sections
   - Fix element interaction patterns (inline edit vs modal)
   - **RULE**: Add new optional parameters with defaults — NEVER change existing method signatures
   - **RULE**: Use conditional checks (`if (!await this.isVisible(L.x)) { ... }`) for new steps so existing callers aren't affected

3. **Fix test flow** in `.spec.ts` files (LAST RESORT — only if test has wrong assumptions):
   - Only if the test itself has incorrect assumptions about the UI flow
   - Prefer fixing page objects over modifying tests
   - **NEVER** reduce assertions, data, or coverage — only fix the flow logic

#### Strict mode verification before saving each fix:
```
[ ] Change is minimal — only what's needed for this failure
[ ] No test data was removed or reduced
[ ] No assertions were removed, weakened, or commented out
[ ] No tests were skipped or marked fixme
[ ] All callers of modified methods have been checked
[ ] All importers of modified locators have been checked
```

#### Re-run the specific failing test (headed mode):
```bash
npx playwright test <path> --headed --grep "<test name>" --reporter=list 2>&1
```

If still failing, go back to Phase 3 and re-inspect with the browser.

---

### Phase 5: Regression Verification (MANDATORY)

This phase is **not optional**. You MUST complete it before declaring the fix done.

#### Step 1: Run the full test file (headed mode)
```bash
npx playwright test <test-file-path> --headed --reporter=list 2>&1
```

#### Step 2: Run all dependent tests
For every shared file you modified (locators, page objects, helpers), find and run all tests that depend on it:
```
Search for all .spec.ts files that import from the modified files
Run each one
```

#### Step 3: If any test regresses
- **DO NOT** modify the regressing test to accommodate your fix
- **REVERT** your change and find an alternative approach
- The fix must satisfy BOTH the originally failing test AND all existing tests
- If truly impossible, explain the conflict to the user and ask for direction

#### Step 4: Final report
Provide a summary:
```
FIXED:           <test name(s)>
ROOT CAUSE:      <what was wrong>
FILES CHANGED:   <list of files and what changed in each>
TESTS VERIFIED:  <list of all tests that were re-run>
DATA IMPACT:     None (test data unchanged)
COVERAGE IMPACT: None (all assertions preserved)
```

---

## Key Debugging Patterns

### Pattern: Blank page after navigation
```
Symptom:  Screenshot shows blank white page
Inspect:  browser_snapshot → check URL in header; browser_console_messages → check for errors
Cause:    SPA intercepts <a> clicks, stays on wrong domain
Fix:      Use page.goto(href) instead of link.click()
```

### Pattern: Locator timeout on correct page
```
Symptom:  Element exists in snapshot but test can't find it
Inspect:  browser_snapshot → find element → browser_get_attribute to check tag/role/classes
Cause:    Tag changed (span→h5), text in child element, element needs scroll
Fix:      Update locator to match actual DOM structure
```

### Pattern: networkidle timeout
```
Symptom:  waitForLoadState('networkidle') hangs forever
Inspect:  browser_network_requests → check for streaming/long-poll connections
Cause:    Analytics/telemetry keep connections alive
Fix:      Use domcontentloaded + explicit element waitFor instead
```

### Pattern: Element click intercepted / strict mode violation
```
Symptom:  Click fails, clicks wrong element, or "strict mode violation: N elements match"
Inspect:  browser_snapshot → look for overlapping elements or multiple matches
Cause:    Sticky footer, modal overlay, tooltip covering target, or generic locator
Fix:      Scope locator with parent, add nth(), or use scrollIntoViewIfNeeded()
```

### Pattern: Dropdown/select option not found
```
Symptom:  Test fails selecting a dropdown value that "should" exist
Inspect:  browser_click on dropdown trigger → browser_snapshot to see actual options
Cause:    Option text changed, option removed, dropdown is custom (not native select)
Fix:      Update locator text to match actual option; if data-driven, update data file
         WARNING: Do NOT remove the test case — fix the data or locator instead
```

### Pattern: Stale element / detached from DOM
```
Symptom:  Element was found but interaction fails with "element is detached"
Inspect:  Replay the flow in browser — does a page reload or re-render happen between find and click?
Cause:    SPA re-renders the component between locator resolution and action
Fix:      Add a re-query or waitFor after the triggering event
```

---

## Absolute Rules

### DO:
- Read the test code and page objects BEFORE using browser inspection — understand what the test expects
- Check the failure screenshot FIRST — it often reveals the issue immediately
- Use browser inspection to verify your hypothesis — have a theory before inspecting
- Always call `browser_snapshot` before every interaction to get fresh element refs
- Re-run the specific test after each fix
- Run ALL dependent tests after all fixes
- Report the full change manifest to the user

### DO NOT:
- Remove test data to make a test pass
- Remove or weaken assertions
- Skip or disable failing tests
- Change method signatures without checking all callers
- Change locator keys without updating all importers
- Touch utility files without user approval
- Consider the task complete until all dependent tests pass
- Make "while I'm here" improvements to unrelated code
- Add `// TODO` or `// FIXME` as a substitute for actually fixing the issue
