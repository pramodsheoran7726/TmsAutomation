# Phases 6-9: Scenario Selection & Planning

[← Back to Main](../TMS_AGENT.md) | [← Previous: TMS Integration](05_TMS_INTEGRATION.md)

---

## CODE EXPLORATION BOUNDARY

```
+-------------------------------------------------------------------------+
| PHASE 6-7: NO CODEBASE EXPLORATION                                      |
|   Do NOT search the codebase during these phases.                       |
|   Focus on scenario selection and requirement analysis only.            |
|                                                                         |
|   X  Search tests/ for spec files                                       |
|   X  Search src/pages/ for page objects                                 |
|   X  Search src/utils/ for utilities                                    |
|   X  Search src/fixtures/ for fixtures                                  |
|   X  list_dir on code dirs    X  read_file on tests    X  codebase_search|
+-------------------------------------------------------------------------+
| PHASE 8+: CODEBASE EXPLORATION ALLOWED                                  |
|   OK  Search tests/ for existing .spec.ts files                         |
|   OK  Search src/pages/ for existing page objects                       |
|   OK  Search src/pages/*/locators for existing locators                 |
|   OK  Search src/utils/ for utility helpers                             |
|   OK  Search src/fixtures/ for available fixtures                       |
+-------------------------------------------------------------------------+
```

---

## Phase 6: Scenario Selection (STOP after this phase)

> **NO CODE EXPLORATION YET** - Focus on selecting which test cases to automate.

1. **Present the approved test cases** in a selectable format:

```
Select scenarios to automate (comma-separated IDs or 'all'):

P0 - Critical (Recommended for immediate automation):
[ ] TC-RFC001-01: Login with valid credentials
[ ] TC-RFC001-02: Create new project flow

P1 - High Priority:
[ ] TC-RFC001-03: Edit existing project
[ ] TC-RFC001-04: Delete project with confirmation

P2 - Medium Priority:
[ ] TC-RFC001-05: Project search functionality
...
```

2. **Gather user selection**:
   - Which specific test cases to automate now?
   - Any test cases to defer to later sprints?
   - Any test cases to mark as manual-only?

3. **Confirm automation scope**:
   - List the selected scenarios for automation
   - Confirm execution order (dependencies first)
   - Set expectations on effort

**STOP HERE** - Confirm the selected scenarios. Wait for explicit user approval of which scenarios to automate before proceeding to detailed requirement analysis.

---

## Phase 7: Requirement Analysis (STOP after this phase)

> **NO CODE EXPLORATION YET** - Focus on understanding the selected scenarios.

**Note**: This phase focuses on the **selected scenarios** from Phase 6.

1. **Parse each selected scenario** - understand what needs to be tested.

2. **Categorize**: Determine the test type:
   - **Web Automation** (Playwright) - Browser-based UI testing
   - **API Testing** - REST API validation

3. **Ask clarifying questions** about:
   - URLs, credentials, or specific steps if any detail is ambiguous
   - Target environment (prod/stage/dev)
   - Browser requirements (Chromium, Firefox, WebKit)
   - Expected assertions (what is the pass condition?)
   - **Do not assume** - ask before proceeding.

**STOP HERE** - Present your understanding and questions. Wait for user responses before proceeding.

---

## Phase 8: Coverage & Reuse Check (STOP after this phase)

> **CODE EXPLORATION STARTS HERE**
>
> This is the first phase where you search the TmsAutomation codebase:
> - Search `tests/` for existing `.spec.ts` files
> - Search `src/pages/` for existing page objects (`.page.ts`)
> - Search `src/pages/` for existing locator files (`.locators.ts`)
> - Search `src/utils/` for utility helpers
> - Search `src/fixtures/` for available fixtures

1. **Search existing test specs**:
   - Check `tests/` for similar tests (same feature area, similar tags)
   - Check `src/pages/` for reusable page objects
   - Check `src/pages/` for existing locators

2. **VERIFY page objects and methods exist before proposing to reuse them**:
   ```bash
   # Find existing test specs
   find tests/ -name "*.spec.ts" | grep -i "keyword"

   # Find existing page objects
   find src/pages/ -name "*.page.ts"

   # Find step implementations in page objects
   grep -r "test.step" src/pages/

   # Find existing locators
   grep -r "export const.*Locators" src/pages/

   # Find available fixtures
   grep -r "fixtures" src/fixtures/tms.fixture.ts

   # Find wait helper usage
   grep -r "waitForNetworkIdle\|clickAndWaitForNetwork" src/utils/
   ```
   - Do NOT assume page objects or methods exist just because they seem common
   - If a page object or method does not exist, note that it needs to be created

3. **Identify the appropriate module** for new tests:
   - Review existing module structure in `tests/` and `src/pages/`
   - Determine if tests fit in existing module or need new one
   - Check module naming conventions (kebab-case directory names)

4. **Verify existing locators via Playwright MCP** (if reusing page objects):

   ```
   +-------------------------------------------------------------------------+
   | MANDATORY: VERIFY LOCATORS BEFORE REUSE                                 |
   +-------------------------------------------------------------------------+
   |                                                                         |
   |   When reusing existing page objects, locators may be STALE.            |
   |   UI changes can silently break locators that once worked.              |
   |                                                                         |
   |   VERIFICATION STEPS:                                                   |
   |   1. browser_navigate to the page where locators are used               |
   |   2. browser_snapshot to see current DOM structure                       |
   |   3. Check each locator from *.locators.ts against the snapshot         |
   |   4. Flag stale locators that no longer match                           |
   |   5. Update stale locators before reuse                                 |
   |                                                                         |
   |   ALSO CHECK: Are there better modern locator options available?        |
   |   - Does the element now have data-testid? → Switch to getByTestId()   |
   |   - Does it have ARIA role + name? → Switch to getByRole()             |
   |   - See: reference/PLAYWRIGHT_MCP_LOCATORS.md for locator priority     |
   |                                                                         |
   +-------------------------------------------------------------------------+
   ```

5. **Propose approach**:
   - Should we add to an existing spec file or create a new one?
   - Which page objects can be reused vs. need to be created?
   - Which locators already exist vs. need creation?
   - Which locators were verified via MCP vs. need re-verification?
   - Which fixtures are already available vs. need to be added?

**STOP HERE** - Present your findings and proposed approach. Wait for user confirmation before proceeding.

---

## Phase 9: Planning & Proposal (STOP after this phase)

1. **Explain your proposed approach**:
   - Exact file paths you will create/update:
     - Test spec: `tests/module/feature-name.spec.ts`
     - Page object: `src/pages/module/module.page.ts`
     - Locators: `src/pages/module/module.locators.ts`
   - Which existing page objects/utilities you will reuse
   - Which new code needs to be written
   - Tag naming convention (e.g., `@newFeature`, `@smoke`, `@regression`)

2. **Present the implementation plan clearly**:

```
+-------------------------------------------------------------------------+
| IMPLEMENTATION PLAN                                                     |
+-------------------------------------------------------------------------+
| FILES TO CREATE:                                                        |
|   tests/new-feature/new-feature.spec.ts                                 |
|   src/pages/new-feature/new-feature.page.ts                             |
|   src/pages/new-feature/new-feature.locators.ts                         |
+-------------------------------------------------------------------------+
| FILES TO UPDATE:                                                        |
|   src/fixtures/tms.fixture.ts (add new fixture)                         |
+-------------------------------------------------------------------------+
| EXISTING CODE TO REUSE:                                                 |
|   - BasePage (base.page.ts) - loc(), tpl(), isVisible()                 |
|   - wait.helper.ts - waitForNetworkIdle(), fillAndWaitForSearch()       |
|   - retry.helper.ts - retryAction()                                     |
+-------------------------------------------------------------------------+
| TAGS:                                                                   |
|   @newFeature @smoke @p0                                                |
+-------------------------------------------------------------------------+
| EXECUTION COMMAND:                                                      |
|   npx playwright test --grep @newFeature                                |
+-------------------------------------------------------------------------+
```

**STOP HERE** - Ask: **"Should I proceed with implementation?"** and **WAIT for explicit confirmation**. Do NOT proceed to implementation until the user approves.

---

## Output Templates

### Scenario Selection Template

```
+-------------------------------------------------------------------------+
| SCENARIO SELECTION                                                      |
+-------------------------------------------------------------------------+
| SELECTED FOR AUTOMATION NOW:                                            |
|   [x] TC-001: Valid login (P0)                                          |
|   [x] TC-002: Invalid login error (P0)                                  |
|   [x] TC-003: User registration flow (P0)                               |
+-------------------------------------------------------------------------+
| DEFERRED TO LATER SPRINT:                                               |
|   [ ] TC-005: Password reset flow (P1)                                  |
|   [ ] TC-006: MFA setup (P1)                                            |
+-------------------------------------------------------------------------+
| MARKED AS MANUAL-ONLY:                                                  |
|   [-] TC-008: Visual design verification                                |
+-------------------------------------------------------------------------+
| EXECUTION ORDER:                                                        |
|   1. TC-001 (no dependencies)                                           |
|   2. TC-002 (no dependencies)                                           |
|   3. TC-003 (depends on email service)                                  |
+-------------------------------------------------------------------------+
```

### Requirement Analysis Template

```
+-------------------------------------------------------------------------+
| REQUIREMENT ANALYSIS: TC-001 - Valid Login                              |
+-------------------------------------------------------------------------+
| TYPE: Web Automation (Playwright)                                       |
| BROWSER: Chromium (default), Firefox, WebKit                            |
| ENVIRONMENT: Stage                                                      |
+-------------------------------------------------------------------------+
| UNDERSTANDING:                                                          |
|   - User navigates to login page                                        |
|   - Enters valid email and password                                     |
|   - Clicks login button                                                 |
|   - Redirected to dashboard                                             |
+-------------------------------------------------------------------------+
| ASSERTIONS:                                                             |
|   - expect(page).toHaveURL(/dashboard/)                                 |
|   - expect(welcomeMessage).toBeVisible()                                |
|   - expect(userAvatar).toBeVisible()                                    |
+-------------------------------------------------------------------------+
| QUESTIONS:                                                              |
|   ? Which test credentials to use?                                      |
|   ? Specific dashboard element to verify?                               |
+-------------------------------------------------------------------------+
```

### Coverage Check Template

```
+-------------------------------------------------------------------------+
| COVERAGE & REUSE CHECK                                                  |
+-------------------------------------------------------------------------+
| EXISTING SIMILAR TESTS:                                                 |
|   - tests/auth/login.spec.ts (70% similar)                              |
|   - tests/auth/sso-login.spec.ts (40% similar)                          |
+-------------------------------------------------------------------------+
| EXISTING PAGE OBJECTS (VERIFIED):                                       |
|   OK  LoginPage (src/pages/auth/login.page.ts) - Can reuse             |
|   X   DashboardPage - Does NOT exist, need to create                    |
+-------------------------------------------------------------------------+
| EXISTING LOCATORS (VERIFIED):                                           |
|   OK  LoginLocators (src/pages/auth/login.locators.ts) - Can reuse     |
|   X   DashboardLocators - Does NOT exist, need to create                |
+-------------------------------------------------------------------------+
| EXISTING FIXTURES:                                                      |
|   OK  loginPage fixture in tms.fixture.ts                               |
|   X   dashboardPage fixture - Need to add                               |
+-------------------------------------------------------------------------+
| PROPOSED APPROACH:                                                      |
|   - Create new test spec: tests/auth/login-valid.spec.ts                |
|   - Reuse: existing LoginPage and LoginLocators                         |
|   - Create: DashboardPage, DashboardLocators                            |
|   - Update: tms.fixture.ts (add dashboardPage fixture)                  |
+-------------------------------------------------------------------------+
```

---

[Next Phase -> Implementation](10_IMPLEMENTATION.md)
