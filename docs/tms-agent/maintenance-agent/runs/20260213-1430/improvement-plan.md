# Improvement Plan — TMS Automation Framework

**Run ID:** 20260213-1430
**Phase:** 3 — Improvement Plan
**Date:** 2026-02-13
**Scope:** All 10 findings from Priority Stack (user selected "all")

---

## Summary

| Metric | Value |
|--------|-------|
| **Total batches** | 8 |
| **Quick wins** | 5 batches (est. 2.5-4.5 hours) |
| **Strategic** | 3 batches (est. 4-8 hours) |
| **Deferred** | 2 (reusable components, DTO pattern) |
| **Total estimated effort** | 7-13 hours |

---

## Execution Timeline

| Order | Batch | Effort | Impact | Risk | Findings | Status |
|-------|-------|--------|--------|------|----------|--------|
| 1 | **A: Quick Reliability Fixes** | S | MEDIUM-HIGH | LOW | F-008, F-010, F-024, F-025 | ⬜ Pending |
| 2 | **B: API Type Safety** | M | HIGH | LOW | F-002, F-023, F-006, F-007 | ⬜ Pending |
| 3 | **C: Report Helper Type Safety** | S | HIGH | LOW | F-003 | ⬜ Pending |
| 4 | **G: Architecture Cleanup** | S | MEDIUM-HIGH | LOW | E1, E2, E3, E11 (R1 arch review) | ⬜ Pending |
| 5 | **H: Constants & Config Refactor** | M | MEDIUM | LOW | E4, E12 (R1 arch review) | ⬜ Pending |
| 6 | **D: CI/CD Workflow Consolidation** | M | HIGH | MEDIUM | F-004 | ⬜ Pending |
| 7 | **E: waitForTimeout Migration** | XL | CRITICAL | MEDIUM | F-001 | ⬜ Pending |
| 8 | **F: DX & Documentation** | S | MEDIUM | LOW | F-009 | ⬜ Pending |

**Dependency chain:** A → B → C → G (independent) → H (independent) → D (independent) → E (depends on A, G for BasePage move) → F (independent)

> **Note:** F-005 (UI→API fixture migration) is tracked as a follow-up after Batch E. Per R5's veto, `fullyParallel:true` (F-019) is blocked until F-005 completes.

---

## Batch Details

---

### Batch A: Quick Reliability Fixes
**Priority:** QUICK WIN
**Effort:** S (30-45 min)
**Impact:** MEDIUM-HIGH
**Risk:** LOW — isolated fixes, no structural changes

#### Changes

| # | File(s) | Finding | Change Description |
|---|---------|---------|-------------------|
| A1 | `src/pages/dataset/dataset.page.ts:152-153` | F-008 | Remove redundant double-sleep. Merge consecutive `waitForTimeout(3000)` + `waitForTimeout(2000)` into a single `waitForNetworkIdle()` call. |
| A2 | `src/pages/insights/insights.page.ts:125-136` | F-010 | Replace `Math.random()` polling with deterministic round-robin cycle. |
| A3 | `src/utils/wait.helper.ts:5-11` | F-024 | Add `console.warn` when `waitForNetworkIdle` falls back to `domcontentloaded`. |
| A4 | `src/fixtures/api-setup.factory.ts:38` | F-025 | Add `console.warn` when cleanup deletion fails (currently silently swallowed). |

**Before → After Examples:**

**A1: Double-sleep bug**
```typescript
// BEFORE (dataset.page.ts:151-153)
await this.loc(L.datasetSaveBtn).click();
await this.page.waitForTimeout(3000);
await this.page.waitForTimeout(2000);

// AFTER
await this.loc(L.datasetSaveBtn).click();
await waitForNetworkIdle(this.page);
```

**A2: Random polling → round-robin**
```typescript
// BEFORE (insights.page.ts:125-136)
const strategy = Math.floor(Math.random() * 3);
if (strategy === 0) { ... }

// AFTER
const strategies = ['refresh', 'reload', 'wait'] as const;
const strategy = strategies[attempt % strategies.length];
if (strategy === 'refresh') {
  console.log(`[Polling ${metricName}] Clicking refresh button...`);
  await this.loc(L.refreshButton).click().catch(() => {});
} else if (strategy === 'reload') {
  console.log(`[Polling ${metricName}] Reloading page...`);
  await this.page.reload();
  await this.navigateToInsights();
} else {
  console.log(`[Polling ${metricName}] Waiting...`);
}
```

**A3: waitForNetworkIdle warning**
```typescript
// BEFORE (wait.helper.ts:5-11)
export async function waitForNetworkIdle(page: Page, timeout = TIMEOUTS.medium): Promise<void> {
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch {
    await page.waitForLoadState('domcontentloaded', { timeout: TIMEOUTS.short });
  }
}

// AFTER
export async function waitForNetworkIdle(page: Page, timeout = TIMEOUTS.medium): Promise<void> {
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch {
    console.warn('[waitForNetworkIdle] networkidle timed out, falling back to domcontentloaded');
    await page.waitForLoadState('domcontentloaded', { timeout: TIMEOUTS.short });
  }
}
```

**A4: Cleanup failure logging**
```typescript
// BEFORE (api-setup.factory.ts:38)
await tmsApi.deleteProject(authToken, id).catch(() => {});

// AFTER
await tmsApi.deleteProject(authToken, id).catch((err) => {
  console.warn(`[Cleanup] Failed to delete project ${id}: ${err}`);
});
```

#### Definition of Done
- [ ] Double-sleep removed from dataset.page.ts
- [ ] Round-robin polling in insights.page.ts
- [ ] Warning log in waitForNetworkIdle fallback
- [ ] Warning log in cleanup failures
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Existing tests still pass (smoke run)

#### Rollback
Revert individual file changes. Each fix is independent — no cascading risk.

---

### Batch B: API Type Safety
**Priority:** QUICK WIN
**Effort:** M (45-90 min)
**Impact:** HIGH
**Risk:** LOW — adding types to existing code, no behavioral changes

#### Changes

| # | File(s) | Finding | Change Description |
|---|---------|---------|-------------------|
| B1 | `src/api/tms.api.ts:40-81` | F-002 | Change 4 CRUD methods from `Record<string, unknown>` to proper typed responses (`ProjectResponse`, `TestCaseResponse`, `TestRunResponse`). |
| B2 | `src/fixtures/api-setup.factory.ts:14-29` | F-023 | Remove unsafe `as Record<string, unknown>` casts — use typed `.id` properties directly. Add status code validation. |
| B3 | `src/utils/api.helper.ts:64` | F-006 | Replace silent `.catch(() => ({}) as T)` with proper error handling that logs and provides meaningful error. |
| B4 | `src/api/tms.api.ts` (all CRUD methods) | F-007 | Add status code validation to TmsApi CRUD methods (matching JiraApi pattern). |

**Before → After Examples:**

**B1: Typed CRUD returns**
```typescript
// BEFORE (tms.api.ts:36-46)
async createProject(
  authToken: string, name: string, description?: string,
): Promise<{ status: number; body: Record<string, unknown> }> {
  return this.api.postWithAuth<Record<string, unknown>>(
    `${EnvConfig.tmsApiUrl}${API_PATHS.projects}`, { name, description: description ?? '' }, authToken,
  );
}

// AFTER
async createProject(
  authToken: string, name: string, description?: string,
): Promise<{ status: number; body: ProjectResponse }> {
  const result = await this.api.postWithAuth<ProjectResponse>(
    `${EnvConfig.tmsApiUrl}${API_PATHS.projects}`, { name, description: description ?? '' }, authToken,
  );
  if (result.status !== 200 && result.status !== 201) {
    throw new Error(`Failed to create project "${name}". Status: ${result.status}`);
  }
  return result;
}
```

**B2: Typed factory (no more guessing)**
```typescript
// BEFORE (api-setup.factory.ts:14-16)
const { body } = await tmsApi.createProject(authToken, name, description);
const id = String((body as Record<string, unknown>).id ?? (body as Record<string, unknown>).project_id ?? '');

// AFTER
const { body } = await tmsApi.createProject(authToken, name, description);
const id = body.id ?? body.project_id ?? '';
```

**B3: Error handling in API helper**
```typescript
// BEFORE (api.helper.ts:64)
const body = (await response.json().catch(() => ({}) as T));

// AFTER
let body: T;
try {
  body = await response.json() as T;
} catch {
  console.warn(`[API] Non-JSON response (status ${response.status()}) from ${url}`);
  body = {} as T;
}
```

#### Definition of Done
- [ ] All 4 CRUD methods return typed responses
- [ ] api-setup.factory.ts has zero `as Record<string, unknown>` casts
- [ ] TmsApi CRUD methods validate status codes
- [ ] api.helper.ts logs non-JSON response warnings
- [ ] TypeScript compiles without errors
- [ ] API spec tests pass (`npx playwright test --grep @api`)

#### Dependencies
- None (independent)

#### Rollback
Types-only changes are safe. If status validation is too strict (e.g., API returns 200 vs 201 inconsistently), relax the validation range.

---

### Batch C: Report Helper Type Safety
**Priority:** QUICK WIN
**Effort:** S (15-30 min)
**Impact:** HIGH
**Risk:** LOW — replaces runtime dispatch with compile-time-checked map

#### Changes

| # | File(s) | Finding | Change Description |
|---|---------|---------|-------------------|
| C1 | `src/helpers/report-test.helper.ts:78-79` | F-003 | Replace `(reportPage as any)[`select${f.method}Filter`]()` with a typed method map. |

**Before → After:**

```typescript
// BEFORE (report-test.helper.ts:78-79)
await (reportPage as any)[`select${f.method}Filter`]();
await (reportPage as any)[`set${f.method}FilterValue`](value);

// AFTER — typed filter dispatch map
type FilterAction = {
  select: (reportPage: ReportPage) => Promise<void>;
  setValue: (reportPage: ReportPage, value: string) => Promise<void>;
};

const FILTER_ACTIONS: Record<string, FilterAction> = {
  Status: {
    select: (rp) => rp.selectStatusFilter(),
    setValue: (rp, v) => rp.setStatusFilterValue(v),
  },
  Priority: {
    select: (rp) => rp.selectPriorityFilter(),
    setValue: (rp, v) => rp.setPriorityFilterValue(v),
  },
  AutomationStatus: {
    select: (rp) => rp.selectAutomationStatusFilter(),
    setValue: (rp, v) => rp.setAutomationStatusFilterValue(v),
  },
  Folder: {
    select: (rp) => rp.selectFolderFilter(),
    setValue: (rp, v) => rp.setFolderFilterValue(v),
  },
  Type: {
    select: (rp) => rp.selectTypeFilter(),
    setValue: (rp, v) => rp.setTypeFilterValue(v),
  },
};

// Usage (replaces lines 78-79):
for (const f of filters) {
  const action = FILTER_ACTIONS[f.method];
  if (!action) throw new Error(`Unknown filter method: ${f.method}`);
  const value = f.value === USE_FOLDER_NAME && folderPage ? folderPage.folderName : f.value;
  await action.select(reportPage);
  await action.setValue(reportPage, value);
}
```

#### Definition of Done
- [ ] Zero `as any` in report-test.helper.ts
- [ ] All 12 report spec files pass
- [ ] TypeScript compiles without errors
- [ ] Adding/renaming a filter method causes a compile error (verified manually)

#### Rollback
Single file change — revert if needed.

---

### Batch G: Architecture Cleanup
**Priority:** QUICK WIN
**Effort:** S (30-45 min)
**Impact:** MEDIUM-HIGH
**Risk:** LOW — file moves and small refactors, no behavioral changes

#### Changes

| # | File(s) | Enhancement | Change Description |
|---|---------|------------|-------------------|
| G1 | `src/utils/base.page.ts` → `src/pages/base.page.ts` | E1: Relocate BasePage | Move BasePage to `src/pages/` where it belongs (page concern, not utility). Update 20 import paths from `../../utils/base.page.js` to `../base.page.js`. Add re-export in `src/utils/index.ts` for backward compat. |
| G2 | `src/pages/navigation/navigation.page.ts` | E2: Extract nav locators | Extract inline `const Nav = {...}` (lines 5-23) to new `navigation.locators.ts`. Achieves 18/18 two-file pattern consistency. |
| G3 | `src/pages/components/toast.component.ts` | E3: Fix Toast inheritance | Make `ToastComponent` extend `BasePage` (matching Delete + Search components). Replace `this.page.locator(...)` with `this.loc(...)`. |
| G4 | `src/setup/auth.setup.ts` | E11: Delete dead file | Remove unused auth setup — `global-setup.ts` handles auth. Confirmed: not referenced in `playwright.config.ts`. |

**Before → After Examples:**

**G1: BasePage relocation (20 files updated)**
```typescript
// BEFORE (every page object, e.g., project.page.ts:2)
import { BasePage } from '../../utils/base.page.js';

// AFTER
import { BasePage } from '../base.page.js';

// BACKWARD COMPAT (src/utils/index.ts — add re-export)
export { BasePage } from '../pages/base.page.js';
```

**G2: Navigation locators extraction**
```typescript
// BEFORE (navigation.page.ts:5-23 — inline locators)
const Nav = {
  hamburgerSidebar: `//button[@class=" ltch-top-nav-hamburger-menu"]`,
  projectSidebar: `//span[@class="ltch-product-name"]`,
  // ... 16 more locators
} as const;

// AFTER — new file: navigation.locators.ts
export const NavigationLocators = {
  hamburgerSidebar: `//button[@class=" ltch-top-nav-hamburger-menu"]`,
  projectSidebar: `//span[@class="ltch-product-name"]`,
  // ... 16 more locators
} as const;

// navigation.page.ts (updated)
import { NavigationLocators as L } from './navigation.locators.js';
// Replace all `Nav.xxx` with `L.xxx`
```

**G3: ToastComponent extends BasePage**
```typescript
// BEFORE (toast.component.ts:8-9)
export class ToastComponent {
  constructor(private readonly page: Page) {}

  async waitForMessage(text: string, timeout = TIMEOUTS.medium): Promise<void> {
    await this.page
      .locator(`xpath=//*[contains(text(),'${text}') or contains(.,'${text}')]`)
      .first()
      .waitFor({ state: 'visible', timeout });
  }

// AFTER
import { BasePage } from '../base.page.js';

export class ToastComponent extends BasePage {
  constructor(page: Page) { super(page); }

  async waitForMessage(text: string, timeout = TIMEOUTS.medium): Promise<void> {
    const selector = `//*[contains(text(),'${text}') or contains(.,'${text}')]`;
    await this.loc(selector).first().waitFor({ state: 'visible', timeout });
  }
```

**G4: Delete dead auth.setup.ts**
```
# Simply delete src/setup/auth.setup.ts
# Verified: not referenced in playwright.config.ts (uses global-setup.ts)
```

#### Definition of Done
- [ ] BasePage lives at `src/pages/base.page.ts`
- [ ] All 20 import paths updated
- [ ] `src/utils/index.ts` re-exports BasePage for backward compat
- [ ] `navigation.locators.ts` created; 18/18 pages follow two-file pattern
- [ ] `ToastComponent` extends `BasePage`; 3/3 components consistent
- [ ] `auth.setup.ts` deleted
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Smoke tests pass

#### Dependencies
- None (but Batch E import paths will use the new BasePage location)

#### Rollback
File moves are fully reversible. Each change is independent.

---

### Batch H: Constants & Config Refactor
**Priority:** QUICK WIN
**Effort:** M (45-60 min)
**Impact:** MEDIUM
**Risk:** LOW — splitting files with barrel re-export preserves all existing imports

#### Changes

| # | File(s) | Enhancement | Change Description |
|---|---------|------------|-------------------|
| H1 | `src/config/constants.ts` | E4: Split into modules | Decompose 122-line file (7 concerns) into focused modules. Keep `constants.ts` as barrel re-export for zero-breaking-change. |
| H2 | `src/config/tags.ts` (new) | E12: Typed tags/annotations | Create typed constants for test tags and annotations. Replace magic strings in 65 spec files. |

**H1: Constants split (backward-compatible)**

```
# BEFORE: single 122-line constants.ts with 7 concerns
src/config/constants.ts  →  TIMEOUTS, RETRY, POLL, CI_CONFIG, ROUTES,
                             API_PATHS, RANDOM_LENGTH, DATA_DIRS,
                             TEST_DATA, JIRA

# AFTER: focused modules + barrel re-export
src/config/
  ├── timeouts.ts       # TIMEOUTS, RETRY, POLL, CI_CONFIG (timing concerns)
  ├── routes.ts         # ROUTES (application paths)
  ├── api-paths.ts      # API_PATHS (backend endpoints)
  ├── test-data.ts      # DATA_DIRS, TEST_DATA, RANDOM_LENGTH
  ├── jira.ts           # JIRA constants
  └── constants.ts      # Barrel: export * from './timeouts.js'; etc.
```

Existing imports (`import { TIMEOUTS, RETRY } from '../config/constants.js'`) continue to work unchanged.

**H2: Typed tags and annotations**

```typescript
// NEW: src/config/tags.ts
export const Tags = {
  smoke: '@smoke',
  regression: '@regression',
  project: '@project',
  api: '@api',
  testRun: '@test-run',
  testCase: '@test-case',
  report: '@report',
  folder: '@folder',
  milestone: '@milestone',
  settings: '@settings',
  configuration: '@configuration',
  jira: '@jira',
  insights: '@insights',
  dataset: '@dataset',
  csvImport: '@csv-import',
  build: '@build',
  sdk: '@sdk',
  kaneai: '@kaneai',
  automation: '@automation',
} as const;

export const Severity = {
  critical: 'critical',
  normal: 'normal',
  minor: 'minor',
} as const;

export const Feature = {
  projectManagement: 'Project Management',
  testCaseManagement: 'Test Case Management',
  testRunManagement: 'Test Run Management',
  reportManagement: 'Report Management',
  folderManagement: 'Folder Management',
  milestoneManagement: 'Milestone Management',
  insightsDashboard: 'Insights Dashboard',
  jiraIntegration: 'Jira Integration',
  datasetManagement: 'Dataset Management',
  configurationManagement: 'Configuration Management',
  csvImport: 'CSV Import',
  customFields: 'Custom Fields',
  sdkIntegration: 'SDK Integration',
  kaneai: 'KaneAI',
  buildManagement: 'Build Management',
  automationMapping: 'Automation Mapping',
} as const;

/** Helper to create feature annotation */
export function feature(name: string) {
  return { type: 'feature' as const, description: name };
}

/** Helper to create severity annotation */
export function severity(level: string) {
  return { type: 'severity' as const, description: level };
}
```

Usage in spec files:
```typescript
// BEFORE (magic strings in 65 files)
test.describe('Project CRUD', {
  tag: ['@smoke', '@regression', '@project'],
  annotation: [
    { type: 'feature', description: 'Project Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => { ... });

// AFTER (typed constants with autocomplete)
import { Tags, Feature, Severity, feature, severity } from '../../src/config/tags.js';

test.describe('Project CRUD', {
  tag: [Tags.smoke, Tags.regression, Tags.project],
  annotation: [feature(Feature.projectManagement), severity(Severity.critical)],
}, () => { ... });
```

#### Definition of Done
- [ ] `constants.ts` split into 5 focused modules + barrel re-export
- [ ] All existing `import { ... } from '../config/constants.js'` still work (zero breaking changes)
- [ ] `tags.ts` created with typed Tags, Severity, Feature constants
- [ ] At least 5 spec files updated to use typed tags (remaining can be incremental)
- [ ] TypeScript compiles without errors
- [ ] Smoke tests pass

#### Dependencies
- None

#### Rollback
Barrel re-export means reverting is just merging files back together. Tag constants are additive.

---

### Batch D: CI/CD Workflow Consolidation
**Priority:** STRATEGIC
**Effort:** M (1-2 hours)
**Impact:** HIGH
**Risk:** MEDIUM — workflow changes need manual CI trigger testing

#### Changes

| # | File(s) | Finding | Change Description |
|---|---------|---------|-------------------|
| D1 | `.github/workflows/reusable-e2e.yml` (new) | F-004 | Create a reusable workflow (`workflow_call`) with region, env, and secrets as parameters. |
| D2 | `.github/workflows/us-tests.yml` | F-004 | Reduce to ~20-line caller that invokes `reusable-e2e.yml` with US params. |
| D3 | `.github/workflows/eu-tests.yml` | F-004 | Reduce to ~20-line caller that invokes `reusable-e2e.yml` with EU params. |

**Before → After:**

```yaml
# BEFORE: us-tests.yml (187 lines, full pipeline duplicated)
# BEFORE: eu-tests.yml (187 lines, 95% identical)

# AFTER: reusable-e2e.yml (~170 lines, parameterized)
on:
  workflow_call:
    inputs:
      region:
        type: string        # "US" or "EU"
      environment:
        type: string        # "stage" or "eu-stage"
      env-options:
        type: string        # JSON array of env choices
    secrets:
      AUTH_EMAIL:
        required: true
      AUTH_PASSWORD:
        required: true
      AUTH_TOKEN:
        required: true
      # ... other secrets passed through

# AFTER: us-tests.yml (~20 lines)
jobs:
  e2e:
    uses: ./.github/workflows/reusable-e2e.yml
    with:
      region: "US"
      environment: ${{ inputs.environment || 'stage' }}
    secrets:
      AUTH_EMAIL: ${{ secrets.AUTH_EMAIL }}
      # ...

# AFTER: eu-tests.yml (~20 lines)
jobs:
  e2e:
    uses: ./.github/workflows/reusable-e2e.yml
    with:
      region: "EU"
      environment: ${{ inputs.environment || 'eu-stage' }}
    secrets:
      AUTH_EMAIL: ${{ secrets.EU_AUTH_EMAIL }}
      # ...
```

#### Definition of Done
- [ ] Reusable workflow created and parameterized
- [ ] US and EU callers reduced to ~20 lines each
- [ ] Manual trigger of US workflow succeeds
- [ ] Manual trigger of EU workflow succeeds
- [ ] Slack notifications still work (thread create + conclude)
- [ ] Artifact uploads still work

#### Dependencies
- None

#### Rollback
Revert to original 187-line files. No data loss risk since these are workflow definitions.

---

### Batch E: waitForTimeout Migration
**Priority:** STRATEGIC (highest impact, highest effort)
**Effort:** XL (3-6 hours, incremental across multiple sub-batches)
**Impact:** CRITICAL — saves 25-35 min per regression run, eliminates #1 flakiness source
**Risk:** MEDIUM — each page requires understanding what the sleep compensates for

#### Approach: Incremental, Page-by-Page

Per R5's guidance, this must NOT be a bulk find-and-replace. Each `waitForTimeout` compensates for a specific product behavior. The migration follows this decision tree per call site:

```
For each waitForTimeout(N):
  1. What happens BEFORE it? (click, fill, navigation, reload)
  2. What happens AFTER it? (assertion, click, read)
  3. What is it waiting FOR?
     a. Network request → use waitForNetworkIdle() or waitForResponse()
     b. Element appearance → use locator.waitFor({ state: 'visible' })
     c. Element disappearance → use locator.waitFor({ state: 'hidden' })
     d. Animation → use short waitForTimeout(TIMEOUTS.animation) (acceptable)
     e. Unclear → add waitForNetworkIdle() + comment explaining the wait
```

#### Sub-Batches (ordered by severity × ROI)

| Sub-Batch | Page | Count | Est. Time | Priority |
|-----------|------|-------|-----------|----------|
| E1 | `dataset.page.ts` | 31 | 30 min | First (simplest, has the double-sleep bug already fixed in A1) |
| E2 | `milestone.page.ts` | 44 | 45 min | Second (mostly navigation/click waits) |
| E3 | `module.page.ts` | 20 | 20 min | Third |
| E4 | `folder.page.ts` | 6 | 10 min | Quick |
| E5 | `configuration.page.ts` | 8 | 15 min | Quick |
| E6 | `automation.page.ts` | 16 | 20 min | Medium |
| E7 | `sdk.page.ts` | 15 | 20 min | Medium |
| E8 | `kaneai.page.ts` | 17 | 20 min | Medium (AI flows need careful waits) |
| E9 | `report.page.ts` | 67 | 60 min | Last (largest, most complex, has polling loop) |
| E10 | Remaining 9 files | ~28 | 30 min | Mixed |
| E11 | `tests/*.spec.ts` (4 calls) | 4 | 10 min | Quick |

**Representative Before → After (milestone.page.ts pattern):**

```typescript
// BEFORE (milestone.page.ts:32-35)
async openMilestonesTab(): Promise<void> {
  await test.step('Open Milestones tab', async () => {
    await this.loc(L.milestoneTab).click();
    await this.page.waitForTimeout(2000);
  });
}

// AFTER
async openMilestonesTab(): Promise<void> {
  await test.step('Open Milestones tab', async () => {
    await this.loc(L.milestoneTab).click();
    await waitForNetworkIdle(this.page);
  });
}
```

```typescript
// BEFORE (milestone.page.ts:48-51 — create dialog)
await this.loc(L.createMilestoneCta).click();
await this.page.waitForTimeout(2000);
await this.loc(L.milestoneNameInput).fill(this.milestoneTitle);

// AFTER
await this.loc(L.createMilestoneCta).click();
await this.loc(L.milestoneNameInput).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
await this.loc(L.milestoneNameInput).fill(this.milestoneTitle);
```

**MCP Verification (Phase 4):** For each migrated page, use Playwright MCP tools to navigate to the actual product and verify that modified locators/waits still find the correct elements.

#### Definition of Done (per sub-batch)
- [ ] Zero `waitForTimeout` in the target page (except legitimate polling intervals)
- [ ] All `import { waitForNetworkIdle } from '../../utils/wait.helper.js'` added where missing
- [ ] TypeScript compiles without errors
- [ ] Smoke test for that feature passes
- [ ] MCP spot-check confirms locators resolve against live UI (where applicable)

#### Definition of Done (overall)
- [ ] Total `waitForTimeout` count reduced from 250+ to ≤10 (polling-only)
- [ ] All existing tests pass (full regression)
- [ ] Estimated regression run time reduced by ≥15 minutes

#### Dependencies
- Batch A (A1 fixes the double-sleep that E1 would also touch)

#### Rollback
Per-file rollback. Each sub-batch is independently revertible.

---

### Batch F: DX & Documentation
**Priority:** FILL-IN
**Effort:** S (30-45 min)
**Impact:** MEDIUM
**Risk:** LOW — documentation only, no code changes

#### Changes

| # | File(s) | Finding | Change Description |
|---|---------|---------|-------------------|
| F1 | `CONTRIBUTING.md` (new) | F-009 | Create contributing guide with page object creation checklist, naming conventions, fixture patterns. |

**Content outline for CONTRIBUTING.md:**

```markdown
# Contributing to TMS Automation

## Adding a New Page Object (5-step checklist)
1. Create `src/pages/{feature}/{feature}.locators.ts`
2. Create `src/pages/{feature}/{feature}.page.ts` (extends BasePage)
3. Add fixture to `src/fixtures/tms.fixture.ts` (TmsFixtures type + fixture definition)
4. Use `as const` on the locators export
5. Import as `L` alias in the page file

## Naming Conventions
- Files: `{feature}-{scenario}.spec.ts`
- Locators: `PascalCaseLocators` with `as const`
- Page methods: `verbNoun()` (createProject, deleteTestCase)
- Fixtures: `camelCase` matching page name (projectPage, testCasePage)

## When to Use
- `expect.soft()` — verification methods in page objects (collect all failures)
- `expect()` — precondition checks, spec-level assertions
- `test.step()` — every public page object method
- `waitForNetworkIdle()` — after clicks/navigations (NOT waitForTimeout)
- `retryAction()` — for actions that may need retry (search, navigation)

## Running Tests
[Link to README Quick Start section]
```

#### Definition of Done
- [ ] CONTRIBUTING.md created with checklist
- [ ] Covers page object, fixture, naming, and wait patterns

#### Rollback
Delete file.

---

## Success Metrics

| Metric | Current (Phase 1) | Target (Post-Fix) | How to Measure |
|--------|-------------------|-------------------|----------------|
| `waitForTimeout` count | 252 | ≤10 (polling only) | `grep -r "waitForTimeout" src/ \| wc -l` |
| Untyped API methods | 4 (`Record<string, unknown>`) | 0 | `grep "Record<string, unknown>" src/api/` |
| `as any` usages | 2 (report helper) | 0 | `grep "as any" src/` |
| Silent error swallowing | 2 (api.helper + factory) | 0 (all log warnings) | Manual review |
| CI workflow duplication | 374 lines (2×187) | ~210 lines (170 reusable + 2×20 callers) | `wc -l .github/workflows/*-tests.yml` |
| Random test paths | 1 (insights polling) | 0 | `grep "Math.random" src/` |
| CONTRIBUTING.md | Missing | Present | File exists |
| Regression run time (est.) | ~45-55 min | ~20-30 min | CI timing |
| Double-sleep bugs | 1 | 0 | `grep -A1 "waitForTimeout" \| grep "waitForTimeout"` |

---

## Out of Scope (Deferred to Future Runs)

| Item | Reason | When to Revisit |
|------|--------|----------------|
| **F-005: UI→API fixture migration** | Requires new API fixtures + extensive test validation. Best as a dedicated effort after Batch E. | Next maintenance run |
| **F-019: fullyParallel:true** | Blocked by F-005 (R5 veto). Cannot enable until fixtures are API-based. | After F-005 completes |
| **F-011: Dead path aliases** | LOW severity per R5. Remove when convenient. | During any tsconfig.json change |
| **F-013: JSDoc on page methods** | R5 advised targeted not blanket approach. Address for non-obvious methods only. | During Batch E (add JSDoc while touching each file) |
| **F-014: Encapsulation leak** | Single file, low impact. | During test-case page refactor |
| **F-015: Allure reporter** | Needs team discussion on reporting strategy. | Team planning session |
| **F-020: Barrel export** | Nice-to-have, no functional impact. | During next structural refactor |
| **F-022: Dead auth.setup.ts** | Trivial deletion, but needs team confirmation it's truly unused. | Quick cleanup task |

---

*Generated by TMS Maintenance Agent — Phase 3 Improvement Plan*
