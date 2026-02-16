# Phase 4: Execution

> Apply approved improvements batch-by-batch with validation after each change, human review between batches, and rollback capability at every step.

---

## Objective

Execute the approved improvement batches from Phase 3, one at a time, with strict quality gates between each batch. Every change is validated before moving to the next.

---

## 🚨 CRITICAL RULES

```
✅ THIS IS THE ONLY PHASE WHERE CODE CHANGES ARE MADE.
❌ DO NOT modify files not listed in the approved batch.
❌ DO NOT combine batches without user approval.
❌ DO NOT proceed to next batch if current batch has validation failures.
✅ DO validate after EVERY batch (TypeScript compile + quick check).
✅ DO show the user a diff summary after each batch.
✅ DO keep a running execution log.
✅ DO commit guidance: Do NOT auto-commit. User decides when to commit.
✅ DO write clean, formatted, human-readable code at ALL times.
✅ DO add meaningful comments explaining WHY (not what) for non-obvious logic.
✅ DO ensure every new or modified function/method has a clear JSDoc header.
```

---

## Prerequisites

- Phase 3 improvement-plan.md must be approved
- User must have selected which batches to execute
- Current git status must be clean (no uncommitted changes)
- Product context from `reference/PRODUCT_CONTEXT.md` must be loaded (for terminology, entity naming)
- MCP Integration protocol from `reference/MCP_INTEGRATION.md` must be read (for browser verification)

---

## Execution Protocol

### For Each Approved Batch:

```
┌─ Step 1: ANNOUNCE ──────────────────────────────────────────┐
│ "Starting Batch X: {Name}"                                   │
│ List all files that will be modified                         │
│ List what each change does                                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─ Step 2: EXECUTE (with Code Quality Enforcement) ──────────┐
│ Apply changes using Edit tool (prefer Edit over Write)      │
│ For each file:                                              │
│   - Read the file first (ALWAYS)                            │
│   - Apply the minimal change needed                         │
│   - Preserve existing code style (indentation, quotes, etc) │
│   - Add JSDoc comment for every new/modified function       │
│   - Add inline WHY comments for non-obvious logic           │
│   - Use meaningful, descriptive variable/function names     │
│   - Group related code with blank line separators           │
│   - Keep functions focused (single responsibility)          │
│                                                              │
│ ⚠️ MANDATORY: Run Code Quality Checklist (see below)        │
│    before marking any file as complete.                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─ Step 3: VALIDATE ──────────────────────────────────────────┐
│ Run validation checks:                                       │
│   1. TypeScript compilation: npx tsc --noEmit               │
│   2. Import resolution: no broken imports                    │
│   3. Quick sanity: npx playwright test --list (tests parse) │
│                                                              │
│ If validation FAILS:                                        │
│   - Diagnose the failure                                    │
│   - Fix the issue (max 3 attempts)                          │
│   - If still failing after 3 attempts → ROLLBACK batch      │
│   - Report failure to user                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─ Step 3.5: MCP VERIFICATION (if locators changed) ────────┐
│ If this batch modified locators or page objects:             │
│                                                              │
│   1. Check MCP availability (browser_navigate to base URL)  │
│      - If unavailable → skip, note in log, proceed          │
│   2. For each page with modified locators:                   │
│      a. Navigate to the product page (use PRODUCT_CONTEXT    │
│         URL patterns for the correct page)                   │
│      b. Take browser_snapshot to get current DOM/a11y tree  │
│      c. Verify modified selectors find correct elements      │
│      d. Take browser_take_screenshot as evidence             │
│   3. Store screenshots in runs/{timestamp}/screenshots/      │
│   4. Record results: PASS (selector works) / FAIL (broken)  │
│   5. If FAIL → fix selector immediately, re-verify          │
│                                                              │
│ See reference/MCP_INTEGRATION.md for full protocol.          │
│                                                              │
│ RULES:                                                       │
│   - MCP verification is READ-ONLY (no destructive actions)  │
│   - Group all locator checks per page (one navigate per page)│
│   - If MCP unavailable, proceed without (code-only mode)    │
│   - Don't verify every locator — focus on MODIFIED ones      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─ Step 4: REPORT ────────────────────────────────────────────┐
│ Show the user:                                               │
│   - Files modified (count + list)                           │
│   - Summary of changes                                       │
│   - Validation result (PASS/FAIL)                           │
│   - Before/after metrics (if measurable)                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
         🛑 STOP: "Batch X complete. Proceed to Batch Y?"
```

---

## Code Quality Standards (MANDATORY for Every Change)

Every line of code written or modified must pass this test: **"Can a newcomer who has never seen this codebase understand what this does within 30 seconds?"**

### Per-File Checklist (run BEFORE marking file as done)

```
□ FORMATTING
  □ Consistent indentation (2 spaces, matching existing code)
  □ Consistent quotes (single quotes for strings, matching project style)
  □ Semicolons match project convention
  □ Line length reasonable (<120 chars, break long lines logically)
  □ Blank lines separate logical sections (imports, constants, class body, methods)
  □ No trailing whitespace or unnecessary blank lines

□ NAMING
  □ Variables: descriptive camelCase (projectName, not pn or data)
  □ Functions: verb + noun, describes the action (createProjectWithTags, not doProject)
  □ Files: kebab-case matching feature (test-run-crud.spec.ts)
  □ Constants: UPPER_SNAKE_CASE with clear meaning (MAX_RETRY_ATTEMPTS, not MAX)
  □ Types/Interfaces: PascalCase, describes the shape (ProjectResponse, not IProject)
  □ Boolean variables: prefixed with is/has/should (isVisible, hasRetries, shouldRetry)

□ COMMENTS & DOCUMENTATION
  □ JSDoc on every exported function/class/interface
  □ Inline comments explain WHY, never WHAT
  □ Complex regex or XPath selectors have a comment explaining what they match
  □ TODO comments include context (// TODO(TMS-1234): Migrate to data-testid)
  □ No commented-out code left behind
  □ No obvious/redundant comments (// increment counter → NO)

□ STRUCTURE & READABILITY
  □ Imports grouped: external packages → internal aliases → relative paths
  □ Each function does ONE thing (single responsibility)
  □ Early returns for guard clauses (not deeply nested ifs)
  □ Destructuring used for clarity where appropriate
  □ Ternaries only for simple conditions (complex ones get if/else)
  □ Error messages include context (what failed + why + what to do)

□ TYPE SAFETY
  □ No `any` types (use proper types or `unknown` with type guards)
  □ No type assertions (`as X`) unless truly necessary with a WHY comment
  □ Return types explicitly declared on public functions
  □ Generic types used where patterns are reusable
  □ Optional parameters marked with `?`, not `| undefined`

□ PRODUCT TERMINOLOGY (reference: PRODUCT_CONTEXT.md Glossary)
  □ Use official product terms in names (Test Case, not tc; Test Run, not execution)
  □ Method names match product actions (createTestCase, not addTest)
  □ Variable names match product entities (testRunId, not executionId)
  □ Comments reference product concepts accurately
```

### JSDoc Standards

Every new or substantially modified function MUST have a JSDoc header:

```typescript
/**
 * Creates a new project with auto-generated name, tag, and description.
 *
 * Uses the project creation dialog to fill in all fields and submits.
 * Waits for the project to appear in the project list as confirmation.
 *
 * @param options.name - Override the auto-generated project name
 * @param options.description - Custom project description
 * @returns The created project name for later reference
 *
 * @example
 * const name = await projectPage.createProjectWithTagDescription();
 * await projectPage.openProject(name);
 */
async createProjectWithTagDescription(options?: {
  name?: string;
  description?: string;
}): Promise<string> { ... }
```

**JSDoc Rules:**
- First line: WHAT the function does (action + context)
- Second paragraph: HOW it works (implementation strategy, if non-obvious)
- `@param` for every parameter with a dash and description
- `@returns` describing what comes back and when to use it
- `@example` for functions used in multiple places
- `@throws` if the function can throw (and when)

### Inline Comment Standards

```typescript
// ✅ GOOD: Explains WHY — the business reason or edge case
// Wait for network idle because the project list refreshes via API
// after creation, and clicking too early causes stale data
await waitForNetworkIdle(page, TIMEOUTS.medium);

// ✅ GOOD: Explains a non-obvious selector
// The triple-dot menu is nested inside a dynamic card component
// that changes structure based on project status
const menuButton = this.loc(L.projectTripleDotButton(name));

// ✅ GOOD: Warns about a gotcha
// NOTE: This endpoint returns 201 on success, not 200.
// A 200 response means the resource already existed (idempotent).
const response = await apiHelper.post(url, data);

// ❌ BAD: Explains WHAT (the code already says this)
// Click the create button
await this.loc(L.createButton).click();

// ❌ BAD: Redundant with the function name
// Create a project
async createProject() { ... }

// ❌ BAD: Meaningless comment
// Do the thing
await page.goto(url);
```

### Locator Comment Standards

Every locator that uses XPath or complex CSS MUST have a comment:

```typescript
export const ProjectLocators = {
  /** New project button on the projects list page */
  newProjectCta: `[data-testid="new-project-btn"]`,

  /**
   * Project card link by name.
   * Uses text match because project cards don't have data-testid attributes yet.
   * TODO(TMS-456): Migrate to data-testid when frontend adds them.
   */
  createdProject: (name: string) => `//a[text()='${name}']`,

  /**
   * Triple-dot action menu for a specific project.
   * Complex XPath because the menu button is deeply nested inside
   * the project card's action column (3 levels of div wrappers).
   */
  projectTripleDotButton: (name: string) =>
    `//div[div[div[a[text()='${name}']]]]//div[2]//button`,
};
```

### Import Organization

Always organize imports in this order with blank line separators:

```typescript
// 1. External packages (node_modules)
import { test, expect, Page } from '@playwright/test';

// 2. Internal path alias imports (alphabetical)
import { EnvConfig } from '@config/env.config.js';
import { TIMEOUTS, RETRY } from '@config/constants.js';
import { randomString, randomProjectName } from '@utils/random.helper.js';

// 3. Relative imports (only when alias doesn't exist)
import { ProjectLocators as L } from './project.locators.js';
```

### Before/After Examples

**Naming — Before:**
```typescript
const r = await api.post(url, d);
const id = String((r as Record<string, unknown>).id ?? '');
```

**Naming — After:**
```typescript
/** Create project via API and extract the project ID from response */
const createResponse = await tmsApi.createProject(projectName, description);
const projectId = extractProjectId(createResponse.body);
```

**Comments — Before:**
```typescript
await this.page.waitForTimeout(2000);
await this.loc(L.deleteBtn).click();
```

**Comments — After:**
```typescript
// Allow the drag-drop animation to complete before clicking delete.
// The UI disables the delete button during the animation transition.
await this.page.waitForTimeout(2000); // TODO: Replace with animation-end event listener
await this.loc(L.deleteBtn).click();
```

**Structure — Before:**
```typescript
async doStuff(page, name, desc, tag, prio) {
  await page.goto(url); await page.fill(L.name, name);
  if (desc) { await page.fill(L.desc, desc); } if (tag) { await page.fill(L.tag, tag); }
  await page.click(L.save);
}
```

**Structure — After:**
```typescript
/**
 * Creates a new test entity with the provided metadata fields.
 * Navigates to the creation form, fills required and optional fields,
 * and submits. Waits for save confirmation before returning.
 */
async createEntity(options: {
  name: string;
  description?: string;
  tag?: string;
  priority?: string;
}): Promise<void> {
  await test.step(`Create entity: ${options.name}`, async () => {
    // Navigate to creation form
    await this.page.goto(url);
    await this.loc(L.nameInput).fill(options.name);

    // Fill optional fields if provided
    if (options.description) {
      await this.loc(L.descriptionInput).fill(options.description);
    }
    if (options.tag) {
      await this.loc(L.tagInput).fill(options.tag);
    }

    // Submit and wait for confirmation
    await this.loc(L.saveButton).click();
    await waitForNetworkIdle(this.page, TIMEOUTS.medium);
  });
}
```

---

## Change Categories & Rules

### Category 1: File Organization (Moving/Renaming)
```
RULES:
- Update ALL imports that reference the moved file
- Update path aliases in tsconfig.json if needed
- Verify no broken imports after move
- Create barrel exports (index.ts) if consolidating
```

### Category 2: Code Modification (Editing Existing Files)
```
RULES:
- Use Edit tool with precise old_string → new_string
- Change only what's in the approved batch
- Preserve surrounding code exactly
- Do not reformat code outside the change scope
- If a change affects exports, update all consumers
```

### Category 3: New File Creation
```
RULES:
- Only create files explicitly listed in the approved plan
- Follow existing naming conventions (kebab-case for files)
- Follow existing code style (indentation, imports, exports)
- Add to barrel exports if one exists for that directory
```

### Category 4: File Deletion
```
RULES:
- Verify the file is truly unused (grep for imports/references)
- Remove from any barrel exports
- Remove from any CI/CD configurations
- Verify TypeScript still compiles after deletion
```

### Category 5: Configuration Changes
```
RULES:
- Back up original config content in execution log
- Test that all functionality still works after config change
- For package.json changes: verify npm scripts still work
- For tsconfig changes: verify compilation still works
- For playwright.config: verify test listing still works
```

---

## Rollback Protocol

If a batch causes issues:

```
ROLLBACK STEPS:
1. Identify all files modified in the batch
2. Revert each file to its pre-batch state
3. Verify TypeScript compiles after revert
4. Verify test listing works after revert
5. Log the rollback reason in execution-log.md
6. Report to user and discuss alternative approach
```

**Prevention:**
- Git stash or snapshot before each batch (if user hasn't committed)
- Keep track of every old_string for potential manual revert

---

## Execution Log Format

Maintain a running log saved to `execution-log.md`:

```markdown
# Execution Log — {Date}

## Batch A: {Name}
**Status:** ✅ COMPLETE / ❌ FAILED / ⏪ ROLLED BACK
**Started:** HH:MM
**Completed:** HH:MM

### Changes Applied
| # | File | Change | Lines Modified |
|---|------|--------|---------------|
| 1 | `src/utils/base.page.ts` | Moved to src/pages/base/ | +0 -0 (move) |

### Validation Results
- TypeScript compilation: ✅ PASS
- Import resolution: ✅ PASS
- Test listing: ✅ PASS (66 tests found)

### MCP Verification (if applicable)
- Mode: browser-assisted / code-only / skipped
- Pages verified: N
- Selectors verified: N/N PASS
- Screenshots: `screenshots/batch-A-*.png`
- Issues found: [none / list]

### Metrics Impact
| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Import consistency | 78% | 85% | +7% |

---

## Batch B: {Name}
...
```

---

## Quality Gates Between Batches

Before starting the next batch, ALL must be true:

```
□ Previous batch validation passed
□ User has reviewed and approved the changes
□ No unresolved issues from previous batch
□ TypeScript compiles cleanly (npx tsc --noEmit)
□ Test listing works (npx playwright test --list)
```

---

## Handling Edge Cases

### Import Cycles
If a structural change creates circular imports:
1. Identify the cycle using TypeScript errors
2. Break the cycle by extracting shared types to a separate file
3. Re-validate

### Breaking Changes
If a change breaks the public API of a utility/page:
1. Update all consumers in the same batch
2. If too many consumers, create a compatibility re-export
3. Flag for user decision

### Merge Conflicts (if working on a branch)
If the main branch has diverged:
1. Do NOT force-push or rebase without user approval
2. Report the conflict
3. Let the user decide how to resolve

---

## 🛑 CHECKPOINT

After completing ALL approved batches:

1. Display the **Execution Log Summary**:
   - Batches completed: N/N
   - Files modified: N
   - Validation: all PASS / some FAIL
2. Save execution-log.md to `docs/tms-agent/maintenance-agent/runs/{timestamp}/`
3. **STOP and WAIT**: "All approved batches are complete. Ready for Phase 5 validation?"
