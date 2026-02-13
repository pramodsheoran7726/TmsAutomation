# Code Quality Standards — TMS Automation Framework

> Every piece of code in this framework should read like a well-written technical document. A new team member should be able to open any file and understand its purpose, structure, and behavior without asking anyone.

---

## The Newcomer Test

Before writing or modifying any code, ask:

```
"If a developer who has never seen this codebase opens this file tomorrow,
 will they understand what it does within 30 seconds?"
```

If the answer is no, add comments, rename variables, or restructure until the answer is yes.

---

## 1. File-Level Standards

### Every file MUST have a clear purpose

```typescript
// ✅ GOOD: File name + first lines tell the whole story
// File: src/pages/project/project.page.ts

/**
 * Project Page Object — encapsulates all UI interactions
 * for the Projects feature in LambdaTest Test Manager.
 *
 * Handles: project creation, editing, deletion, and navigation.
 * Used by: tests/project/*.spec.ts via tms.fixture.ts
 */
export class ProjectPage extends BasePage {
```

### File naming conventions

| Type | Convention | Example |
|------|-----------|---------|
| Page objects | `{feature}.page.ts` | `test-run.page.ts` |
| Locators | `{feature}.locators.ts` | `test-run.locators.ts` |
| Test specs | `{feature}-{scenario}.spec.ts` | `test-run-crud.spec.ts` |
| Utilities | `{purpose}.helper.ts` | `wait.helper.ts` |
| Types | `{domain}.types.ts` | `api-responses.types.ts` |
| Config | `{scope}.config.ts` | `env.config.ts` |
| Components | `{name}.component.ts` | `toast.component.ts` |

---

## 2. Function-Level Standards

### Every exported function MUST have a JSDoc header

```typescript
/**
 * Short description of WHAT this function does.
 *
 * Longer explanation of HOW it works and WHY certain
 * implementation choices were made. Include edge cases.
 *
 * @param paramName - What this parameter represents
 * @returns Description of return value and its shape
 * @throws When and why this function might throw
 *
 * @example
 * const result = await myFunction('input');
 * // result === 'expected output'
 */
```

### Function design principles

```
1. SINGLE RESPONSIBILITY — One function, one job, one reason to change.
2. DESCRIPTIVE NAME — The name should make the JSDoc almost redundant.
3. EARLY RETURNS — Guard clauses at the top, happy path flows down.
4. PARAMETER OBJECTS — More than 3 params? Use an options object.
5. EXPLICIT RETURN TYPE — Always declare what comes back.
6. SHORT FUNCTIONS — If it's over 30 lines, it probably does too much.
```

**Before:**
```typescript
async doSetup(p, n, d, t, pr, f) {
  if (p) {
    if (n) {
      await p.fill(L.n, n);
      if (d) {
        await p.fill(L.d, d);
        if (t) {
          await p.fill(L.t, t);
        }
      }
    }
  }
}
```

**After:**
```typescript
/**
 * Fills the entity creation form with the provided field values.
 * Skips any fields that are not provided (undefined).
 */
async fillCreationForm(options: {
  name: string;
  description?: string;
  tag?: string;
}): Promise<void> {
  // Required field — always fill
  await this.loc(L.nameInput).fill(options.name);

  // Optional fields — fill only if provided
  if (options.description) {
    await this.loc(L.descriptionInput).fill(options.description);
  }
  if (options.tag) {
    await this.loc(L.tagInput).fill(options.tag);
  }
}
```

---

## 3. Comment Standards

### The WHY Hierarchy

```
Level 1: Code tells WHAT → No comment needed
Level 2: Code is clear but WHY is not obvious → Add WHY comment
Level 3: Business logic or edge case → Add context comment
Level 4: Workaround or hack → Add WARNING comment with ticket reference
```

### Comment patterns by context

**Business logic:**
```typescript
// Users with "viewer" role can see projects but cannot modify them.
// The edit button is still rendered (for layout consistency) but disabled.
if (userRole === 'viewer') {
  await expect(this.loc(L.editButton)).toBeDisabled();
}
```

**Edge case handling:**
```typescript
// The insights API returns stale data for up to 30 seconds after
// test case creation. Poll until fresh data appears or timeout.
await retryAction(page, async () => {
  const data = await tmsApi.getInsights(projectId);
  expect(data.totalTestCases).toBeGreaterThan(0);
}, { retries: 5, delayMs: 6000, label: 'Wait for insights sync' });
```

**Workaround:**
```typescript
// WORKAROUND: The dropdown menu takes ~500ms to render after click
// due to an animation library. Replace with animation-end event
// listener when the frontend team adds the transition hooks.
// Tracking: TMS-789
await this.page.waitForTimeout(500);
```

**Selector explanation:**
```typescript
/**
 * Matches the "Delete" button inside a project card's action menu.
 *
 * Structure: .project-card > .actions-column > .dropdown > button[data-action="delete"]
 *
 * Uses XPath because the dropdown is rendered in a portal (outside the card DOM)
 * and only attached to the card via a data attribute. CSS can't traverse this.
 * TODO(TMS-456): Ask frontend to add data-testid="delete-project-{id}"
 */
deleteProjectButton: (name: string) =>
  `//div[@data-project='${name}']//button[@data-action='delete']`,
```

### What NOT to comment

```typescript
// ❌ States the obvious
// Click the save button
await this.loc(L.saveButton).click();

// ❌ Restates the variable name
// The project name
const projectName = `AutoProject_${randomString(10)}`;

// ❌ Changelog in code (use git for this)
// Changed on 2026-01-15 by @dev — updated selector
const selector = '...';

// ❌ Commented-out code (delete it, git has history)
// const oldSelector = '//div[@class="old"]';
```

---

## 4. Naming Standards

### Variables — Be explicit, never abbreviate

| Context | Bad | Good |
|---------|-----|------|
| Loop variable | `i`, `x` | `testIndex`, `retryAttempt` |
| API response | `res`, `r` | `createResponse`, `projectData` |
| Selector | `sel`, `el` | `deleteButtonLocator`, `projectNameInput` |
| Timeout | `t`, `ms` | `navigationTimeout`, `pollIntervalMs` |
| Boolean | `flag`, `ok` | `isProjectCreated`, `hasTestCases` |
| Callback | `cb`, `fn` | `onProjectCreated`, `validateResponse` |

### Functions — Verb + Noun, action-oriented

| Bad | Good | Why |
|-----|------|-----|
| `project()` | `createProject()` | What action? |
| `handle()` | `handleLoginFailure()` | Handle what? |
| `process()` | `processApiResponse()` | Process what? |
| `doStuff()` | `fillCreationForm()` | Be specific |
| `check()` | `verifyProjectDeleted()` | Check what? |
| `get()` | `fetchProjectById()` | From where? |

### Constants — Screaming case with context

| Bad | Good |
|-----|------|
| `MAX` | `MAX_RETRY_ATTEMPTS` |
| `TIMEOUT` | `NAVIGATION_TIMEOUT_MS` |
| `URL` | `TMS_BASE_URL` |
| `5000` | `TIMEOUTS.short` |

---

## 5. Formatting Standards

### Import ordering (with blank line separators)

```typescript
// 1. Node built-ins
import * as fs from 'fs';
import * as path from 'path';

// 2. External packages
import { test, expect, Page, Locator } from '@playwright/test';

// 3. Internal path aliases (alphabetical by alias)
import { EnvConfig } from '@config/env.config.js';
import { TIMEOUTS, RETRY, ROUTES } from '@config/constants.js';
import { BasePage } from '@utils/base.page.js';
import { waitForNetworkIdle } from '@utils/wait.helper.js';
import { randomString } from '@utils/random.helper.js';

// 4. Relative imports (same module)
import { ProjectLocators as L } from './project.locators.js';
```

### Code grouping within a class

```typescript
export class ProjectPage extends BasePage {
  // ── Properties ───────────────────────────────────────────
  readonly projectName: string;
  readonly projectDescription: string;

  // ── Constructor ──────────────────────────────────────────
  constructor(page: Page) {
    super(page);
    this.projectName = `AutoProject_${randomString(10)}`;
    this.projectDescription = `Test project created at ${new Date().toISOString()}`;
  }

  // ── CRUD Operations ──────────────────────────────────────

  /** Creates a new project with generated name, tag, and description. */
  async createProject(): Promise<void> { ... }

  /** Opens an existing project by name from the project list. */
  async openProject(name?: string): Promise<void> { ... }

  /** Edits the current project's name and description. */
  async editProject(): Promise<void> { ... }

  /** Deletes the current project via the action menu. */
  async deleteProject(): Promise<void> { ... }

  // ── Verification ─────────────────────────────────────────

  /** Verifies the project was successfully deleted from the list. */
  async verifyProjectDeleted(): Promise<void> { ... }

  // ── Helpers (private) ────────────────────────────────────

  /** Waits for the project card to be visible after creation. */
  private async waitForProjectCard(name: string): Promise<void> { ... }
}
```

### Locator file formatting

```typescript
/**
 * Project Page Locators
 *
 * Selectors for the Projects feature in LambdaTest Test Manager.
 * Organized by: creation → navigation → editing → deletion → verification
 */
export const ProjectLocators = {
  // ── Creation ─────────────────────────────────────────────

  /** "New Project" CTA button on the projects list page */
  newProjectCta: `[data-testid="new-project-btn"]`,

  /** Project name input in the creation dialog */
  nameInput: `input[placeholder='Enter project name']`,

  // ── Navigation ───────────────────────────────────────────

  /**
   * Project link by name in the project list.
   * Uses text match — no data-testid available on project cards yet.
   */
  projectLink: (name: string) => `//a[text()='${name}']`,

  // ── Deletion ─────────────────────────────────────────────

  /** Confirmation input that requires typing "DELETE" */
  deleteConfirmInput: `input[placeholder='Type DELETE']`,
};
```

---

## 6. Test Spec Standards

### Test file structure

```typescript
import { test, expect } from '@fixtures/tms.fixture.js';

/**
 * Project CRUD Tests
 *
 * Covers: creation, editing, deletion, and verification
 * of projects in LambdaTest Test Manager.
 *
 * Fixtures used: projectPage (creates + cleans up project automatically)
 */
test.describe('Project CRUD', {
  tag: ['@smoke', '@regression', '@project'],
  annotation: [
    { type: 'feature', description: 'Project Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {

  test('should create a project with name, tag, and description', async ({
    page,
    projectPage,
  }) => {
    await test.step('Navigate to projects page', async () => {
      await page.goto(EnvConfig.tmsBaseUrl + ROUTES.projects);
    });

    await test.step('Create project with all fields', async () => {
      await projectPage.createProjectWithTagDescription();
    });

    await test.step('Verify project appears in the list', async () => {
      await expect(
        projectPage.loc(L.projectLink(projectPage.projectName))
      ).toBeVisible({ timeout: TIMEOUTS.long });
    });
  });
});
```

---

## 7. Quality Enforcement Summary

| Rule | Enforcement |
|------|------------|
| JSDoc on exports | Phase 4 per-file checklist |
| No `any` types | TypeScript strict mode + Phase 4 checklist |
| WHY comments on non-obvious logic | Code review in Phase 4 |
| Meaningful names | Phase 4 naming checklist |
| Import organization | Phase 4 per-file checklist |
| Section separators in classes | Phase 4 formatting checklist |
| Locator comments for complex selectors | Phase 4 per-file checklist |
| No commented-out code | Phase 4 cleanup check |
| No abbreviations in names | Phase 4 naming checklist |
| Early returns over nesting | Phase 4 structure checklist |

---

*These standards apply to all code written or modified by the Maintenance Agent and should be adopted as the project-wide standard going forward.*
