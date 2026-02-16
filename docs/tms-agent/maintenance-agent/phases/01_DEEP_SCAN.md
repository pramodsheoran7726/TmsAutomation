# Phase 1: Deep Scan & Context Building

> Systematically analyze every component of the TMS Automation framework to build a complete, indexed understanding before making any recommendations.

---

## Objective

Build a comprehensive context map of the entire framework — every file, every pattern, every dependency — so that subsequent phases can make informed, evidence-based decisions.

**Product-Aware Scanning:** This phase uses the product context from `reference/PRODUCT_CONTEXT.md` to validate that code aligns with the product domain — correct terminology, entity coverage, API parity, and workflow alignment.

---

## 🚨 CRITICAL RULES

```
❌ DO NOT make any code changes in this phase.
❌ DO NOT suggest improvements yet (that's Phase 2-3).
❌ DO NOT skip any scan dimension.
✅ DO read every relevant file thoroughly.
✅ DO document findings with file paths and line numbers.
✅ DO quantify everything (counts, sizes, percentages).
✅ DO flag anomalies without proposing fixes.
```

---

## Scoped Scan Mode (Review Mode Only)

> This section applies ONLY when the agent is invoked via `/maintain review`. For full pipeline runs, skip to "Scan Dimensions" below.

In review mode, the scan is scoped to **only the files changed by `/fix-tests`** and their direct dependents. This is faster and more focused than a full framework scan.

### Input

Read the change manifest from `docs/tms-agent/maintenance-agent/runs/fix-tests-latest/CHANGE_MANIFEST.md`.

Extract:
- **Changed files** — every file listed in the "Files Changed" table
- **Dependent files** — every file listed in the "Impact Analysis" table
- **Fixed tests** — every spec listed in the "Fixed Tests" table
- **Regression results** — pass/fail status from the "Regression Results" table

### Scoped Scan Dimensions

For each changed file, run ONLY the relevant dimensions from the full scan:

| File Type | Dimensions to Run |
|-----------|------------------|
| `*.locators.ts` | D2 (Page Object Architecture) — locator quality only for changed locators |
| `*.page.ts` | D2 (Page Object Architecture) — method quality, BasePage usage, test.step() |
| `*.spec.ts` | D3 (Test Specifications) — fixture usage, tags, flaky patterns, assertions |
| `src/fixtures/*` | D4 (Fixtures & Setup) — cleanup, typing, dependencies |
| `src/utils/*` | D5 (Utilities & Helpers) — typing, error handling |
| `src/api/*` | D6 (API Layer) — typing, error handling, endpoint correctness |
| `src/config/*` | D7 (Configuration) — constant usage, magic numbers |

### Scoped Scan Questions (apply to each changed file)

For every file in the manifest, answer:
1. **Does the change follow existing framework patterns?** Compare against neighboring files in the same directory.
2. **Is the change minimal and surgical?** Does it only fix what was broken, or did it introduce unnecessary modifications?
3. **Are naming conventions preserved?** Variable names, method names, locator keys — consistent with the rest of the codebase?
4. **Is the change product-aware?** Does it use correct product terminology from `PRODUCT_CONTEXT.md`?
5. **Are there any new flaky patterns introduced?** Hard waits, bare clicks, missing assertions?
6. **Were all dependents checked?** Cross-reference the manifest's impact analysis against actual imports.

### Scoped Scan Output

Save to `review-scan.md`:

```markdown
# Review Scan — Scoped Analysis of Fix-Tests Changes

## Manifest Summary
- **Source:** fix-tests-latest/CHANGE_MANIFEST.md
- **Files changed:** N
- **Tests fixed:** N
- **Regression status:** All pass / N failures

## Per-File Analysis
### <file path>
| Check | Status | Notes |
|-------|--------|-------|
| Follows framework patterns | ✅/⚠️/❌ | ... |
| Minimal and surgical | ✅/⚠️/❌ | ... |
| Naming conventions | ✅/⚠️/❌ | ... |
| Product terminology | ✅/⚠️/❌ | ... |
| No new flaky patterns | ✅/⚠️/❌ | ... |
| Dependents checked | ✅/⚠️/❌ | ... |

(Repeat for each file)

## Cross-File Concerns
- [Any issues that span multiple changed files]

## Scoped Scan Score: X/10
```

### 🛑 CHECKPOINT (Review Mode)

After completing the scoped scan:
1. Display the **Per-File Analysis** summary and any **Cross-File Concerns** in chat
2. Save to `docs/tms-agent/maintenance-agent/runs/{timestamp}/review-scan.md`
3. **STOP and WAIT** for user approval before proceeding to Phase 2 (review critique)

---

## Full Scan Mode (Default)

> The following dimensions apply to the full pipeline (`/maintain` without `review`).

## Scan Dimensions

Execute each scan dimension methodically. Use the Task tool with Explore subagents for parallel scanning where dimensions are independent.

### Dimension 1: Project Structure & Configuration

**What to scan:**
```
├── package.json           → Dependencies, scripts, versions
├── playwright.config.ts   → Projects, reporters, timeouts, workers
├── tsconfig.json          → Compiler options, path aliases, strictness
├── .env / .env.example    → Environment variables
├── hyperexecute.yaml      → CI cloud config
├── .github/workflows/     → All CI/CD pipelines
└── .gitignore             → What's tracked vs ignored
```

**Questions to answer:**
- Are all dependencies up to date? Any security vulnerabilities?
- Are TypeScript strict settings properly configured?
- Are path aliases used consistently across the codebase?
- Are generated directories (playwright-report/, allure-results/) in .gitignore?
- Do CI pipelines follow current best practices?
- Are environment variables documented and consistent?

**Output format:**
```markdown
### Configuration Assessment
| Config File | Status | Issues Found |
|-------------|--------|-------------|
| package.json | ✅/⚠️/❌ | Description |
```

---

### Dimension 2: Page Object Model Architecture

**What to scan:**
```
src/pages/
├── {feature}/
│   ├── {feature}.page.ts      → Action methods
│   └── {feature}.locators.ts  → Selector constants
├── components/                 → Reusable components
├── common/                     → Shared locators
└── navigation/                 → Navigation page
```

**Questions to answer:**
- Does every page follow the two-file pattern (*.page.ts + *.locators.ts)?
- Do all pages extend BasePage correctly?
- Are locators using resilient selectors (data-testid) or fragile ones (XPath text)?
- Are there duplicate locators across files?
- Are there unused locators?
- Do page methods use test.step() consistently?
- Are component classes (Toast, Delete, Search) reused properly?
- Is there a barrel export (index.ts) for pages?

**Product Domain Alignment (from PRODUCT_CONTEXT.md):**
- Do page object modules map to product entities? (e.g., Project, Test Case, Test Run, Folder, Module, Dataset, Milestone)
- Are page object names and method names using official product terminology? (see Terminology Glossary in PRODUCT_CONTEXT.md)
- Are there product features listed in the Feature Map that have NO corresponding page object?
- Do page methods cover the key user actions listed in the Feature Map? (create, edit, delete, list, search, filter)
- Do locators align with the UI Component Patterns documented in PRODUCT_CONTEXT.md? (Toast, Dialog, DataTable, etc.)

**Locator Quality Assessment:**
```
For EACH locator file, classify selectors as:
- 🟢 RESILIENT: data-testid, #id, [role="..."]
- 🟡 MODERATE: CSS class, input[placeholder="..."]
- 🔴 FRAGILE: XPath text match, deep nesting, positional

Calculate: Resilient% / Moderate% / Fragile% per file
```

**Output format:**
```markdown
### Page Object Assessment
| Module | Has Locators File | Has Page File | Extends BasePage | Uses test.step() | Locator Quality | Product Entity Match |
|--------|------------------|--------------|-----------------|------------------|----------------|---------------------|
| project | ✅ | ✅ | ✅ | ⚠️ 60% | 🟡 40/40/20 | ✅ Project |
| test-run | ✅ | ✅ | ✅ | ✅ | 🟡 30/40/30 | ✅ Test Run |

### Product Entity Coverage
| Product Entity | Page Object | Methods Cover Key Actions | Gap |
|---------------|-------------|--------------------------|-----|
| Project | project.page | create ✅ edit ✅ delete ✅ | None |
| Test Case | testcase.page | create ✅ edit ⚠️ | Version history missing |
| Dataset | - | - | No page object |
```

---

### Dimension 3: Test Specifications

**What to scan:**
```
tests/
├── {feature}/
│   └── {feature}-{scenario}.spec.ts
```

**Questions to answer:**
- Does every test file follow naming conventions?
- Are tests using fixtures properly (from tms.fixture.ts)?
- Do tests have proper tags (@smoke, @regression)?
- Are tests independent (no shared state between tests)?
- Is test data generated fresh per test (random helpers)?
- Are assertions meaningful (not just toBeVisible)?
- Are there hardcoded values that should be constants?
- Is there proper cleanup (via fixtures or explicit)?
- Average test length (steps per test)?
- Are there any flaky patterns (bare waits, race conditions)?

**Product Domain Alignment (from PRODUCT_CONTEXT.md):**
- Do test descriptions and `test.describe()` names use official product terminology?
- Do test scenarios align with the Workflow Catalog? (W1-W7 in PRODUCT_CONTEXT.md)
- Are test assertions checking product-meaningful outcomes (not just UI state)?
- Are product constraints reflected in tests? (e.g., max 100 test steps, rate limits)
- Do tests handle Known UI Quirks documented in PRODUCT_CONTEXT.md? (toast auto-dismiss, search debounce, etc.)

**Flakiness Pattern Detection:**
```
Scan for these anti-patterns:
- page.waitForTimeout() → Should use explicit waits
- Bare .click() without waiting for element → Should use waitFor
- Fixed sleep values → Should use network idle or DOM ready
- Assertions without timeout → May fail on slow CI
- Tests dependent on execution order → Should be independent
- Hardcoded URLs → Should use EnvConfig
```

**Output format:**
```markdown
### Test Specification Assessment
| Feature | Specs | Avg Steps | Tags | Fixture Usage | Flaky Patterns | Quality |
|---------|-------|-----------|------|--------------|---------------|---------|
| test-run | 10 | 8 | ✅ | ✅ | 2 found | ⚠️ |
```

---

### Dimension 4: Fixtures & Setup

**What to scan:**
```
src/fixtures/
├── tms.fixture.ts       → Main fixture definitions
├── api.fixture.ts        → API test fixtures
└── api-setup.factory.ts  → API setup with auto-cleanup
```

**Questions to answer:**
- How many fixtures are defined? Is the fixture file too large?
- Are fixtures properly typed (TmsFixtures interface)?
- Do composite fixtures handle cleanup correctly?
- Are there fixture dependencies that could cause deadlocks?
- Is the auth setup (auth.setup.ts) robust?
- Are API fixtures reusing authentication properly?
- Could fixtures be split into domain-specific files?

**Output format:**
```markdown
### Fixture Assessment
| Fixture | Type | Auto-Cleanup | Dependencies | Issues |
|---------|------|-------------|-------------|--------|
| projectOnly | Composite | ✅ | projectPage | None |
```

---

### Dimension 5: Utilities & Helpers

**What to scan:**
```
src/utils/
├── base.page.ts      → BasePage class
├── api.helper.ts      → HTTP request methods
├── wait.helper.ts     → Wait utilities
├── retry.helper.ts    → Retry logic
├── random.helper.ts   → Random generators
├── date.helper.ts     → Date utilities
├── url.helper.ts      → URL builders
└── index.ts           → Barrel exports
```

**Questions to answer:**
- Is BasePage in the right location (utils vs pages)?
- Are utility functions well-typed with generics?
- Is the retry helper used consistently across tests?
- Are wait helpers covering all necessary patterns?
- Are random generators producing unique enough values?
- Is there proper error handling in API helpers?
- Are there any utilities that should be extracted or consolidated?

---

### Dimension 6: API Layer

**What to scan:**
```
src/api/
├── tms.api.ts    → TMS backend client
└── jira.api.ts   → Jira integration client
```

**Questions to answer:**
- Are API methods properly typed (request/response)?
- Is error handling consistent?
- Are there hardcoded URLs that should use EnvConfig?
- Are authentication headers handled correctly?
- Is there proper logging for debugging API failures?
- Are API methods reusable across fixtures and tests?

**Product API Alignment (from PRODUCT_CONTEXT.md):**
- Do the API helpers cover all endpoints in the product API Reference? (test-cases, test-runs, folders, jira, variables, secrets)
- Are API method names consistent with the product API endpoint naming?
- Are request/response types matching the documented field mappings?
- Is the authentication pattern matching the product's Basic Auth requirement?
- Are rate limits documented in PRODUCT_CONTEXT.md considered in API fixture design?

---

### Dimension 7: Configuration & Constants

**What to scan:**
```
src/config/
├── env.config.ts   → Environment URL mappings
└── constants.ts    → Timeouts, routes, API paths
```

**Questions to answer:**
- Are all magic numbers extracted to constants?
- Are timeout values appropriate?
- Are route constants used consistently?
- Are API path constants matching actual endpoints?
- Is environment config validated at startup?
- Are there any config values that should be in .env?

---

### Dimension 8: Reporters & CI/CD

**What to scan:**
```
src/reporters/
├── step-reporter.ts        → Console reporter
└── report-lab.reporter.ts  → Dashboard reporter

.github/workflows/
├── test.yml                → Main pipeline
├── us-tests.yml            → US scheduled
├── eu-tests.yml            → EU scheduled
└── hyperexecute.yml        → Cloud execution

scripts/
├── run-tests.js            → CLI wrapper
├── report-lab.ts           → Report-Lab integration
└── slack-notify.ts         → Slack notifications
```

**Questions to answer:**
- Are reporters handling all edge cases (skipped, retried, timed out)?
- Are CI workflows DRY (shared steps vs duplicated)?
- Are there redundant scripts (run-tests.js vs pw.js)?
- Is the HyperExecute config optimized?
- Are Slack notifications informative?
- Are artifacts properly collected and retained?

---

### Dimension 9: TypeScript Quality & Code Readability

**What to scan:** ALL `.ts` files

**Questions to answer:**
- Are there any `any` types that should be properly typed?
- Are imports consistent (path aliases vs relative)?
- Are there unused imports or exports?
- Is `strict` mode fully leveraged?
- Are there type assertions (`as`) that indicate design issues?
- Are interfaces/types defined in `src/types/` and reused?

**Code Readability Assessment (scan a representative sample of 10 files):**
- Do exported functions have JSDoc comments?
- Are variable names descriptive (no single-letter or abbreviated names)?
- Are complex selectors/XPath expressions commented with what they match?
- Are imports organized (external → alias → relative with blank separators)?
- Are there commented-out code blocks that should be deleted?
- Do inline comments explain WHY (not WHAT)?
- Are functions focused (single responsibility) or doing too many things?
- Can a newcomer understand each file's purpose within 30 seconds?

**Readability Score:**
```
For each sampled file, rate:
- JSDoc coverage: X% of exports have JSDoc
- Comment quality: GOOD (WHY) / POOR (WHAT) / MISSING
- Naming quality: CLEAR / MIXED / CRYPTIC
- Structure clarity: CLEAN / ADEQUATE / CLUTTERED
```

---

### Dimension 10: Documentation & Maintainability

**What to scan:**
```
README.md
ARCHITECTURE.md
COVERAGE.md
COMPARISON.md
MIGRATION_REPORT.md
TEST-RESULTS.md
```

**Questions to answer:**
- Is the README accurate and useful for onboarding?
- Is ARCHITECTURE.md up to date?
- Are there stale documents that should be removed?
- Is there a CONTRIBUTING guide?
- Are there inline code comments where needed?
- Is the project self-documenting (good naming, clear structure)?

---

### Dimension 11: Product Domain Alignment (Cross-Cutting)

> This dimension synthesizes product context checks done in Dimensions 2, 3, and 6 into a unified assessment.

**Prerequisites:** Read `reference/PRODUCT_CONTEXT.md` before this dimension.

**What to assess:**

#### 11a. Entity-to-Code Mapping
```
For each product entity in PRODUCT_CONTEXT.md Entity Model:
- Does a page object exist for it?
- Does an API helper exist for it?
- Do test specs exercise it?
- Are fixtures available for setup/teardown?

Build a mapping table:
| Product Entity | Page Object | API Helper | Test Specs | Fixture |
|---------------|-------------|-----------|-----------|---------|
```

#### 11b. Terminology Consistency
```
Compare code naming against PRODUCT_CONTEXT.md Terminology Glossary:
- Are file names using official terms? (test-run.page.ts, not execution.page.ts)
- Are method names using official terms? (createTestCase, not addTest)
- Are variable names using official terms? (testRunId, not executionId)
- Are test descriptions using official terms?

Flag any mismatches with file:line references.
```

#### 11c. Workflow Coverage Assessment
```
For each workflow in PRODUCT_CONTEXT.md Workflow Catalog (W1-W7):
- Is the workflow covered by end-to-end tests?
- If partially covered, which steps are missing?
- Note: This is for informational purposes only — the maintenance agent
  fixes existing tests, it does not create new ones.
```

#### 11d. Known Quirk Handling
```
For each Known UI Quirk in PRODUCT_CONTEXT.md:
- Does the framework already handle this quirk?
- Are there test failures that might be caused by unhandled quirks?
- Are wait strategies appropriate for documented quirks?
  (e.g., toast auto-dismiss → short timeout on toast assertions)
```

**Output format:**
```markdown
### Product Domain Alignment Assessment

#### Entity Coverage Matrix
| Product Entity | Page Object | API Helper | Test Specs | Coverage |
|---------------|-------------|-----------|-----------|----------|
| Project | ✅ | ✅ | 5 specs | GOOD |
| Dataset | ❌ | ❌ | 0 specs | MISSING |

#### Terminology Mismatches
| Code Location | Current Term | Official Term | Impact |
|--------------|-------------|--------------|--------|
| src/pages/... | executionPage | testRunPage | Naming confusion |

#### Workflow Coverage
| Workflow | E2E Coverage | Missing Steps |
|---------|-------------|--------------|
| W1: Project Setup | FULL | - |
| W3: Test Run Execution | PARTIAL | Scheduled execution |

#### Quirk Handling
| Quirk | Handled | Evidence |
|-------|---------|---------|
| Toast auto-dismiss | ⚠️ Inconsistent | Some tests waitFor, some don't |

#### Domain Alignment Score: X/10
```

---

## Output: Scan Report

After completing ALL 10 dimensions, compile findings into `scan-report.md`:

```markdown
# Scan Report — TMS Automation Framework

## Executive Summary
- Total files scanned: X
- Total test specs: X
- Total page objects: X
- Total utilities: X
- Overall health score: X/100

## Dimension Scores
| Dimension | Score | Critical Issues | Warnings |
|-----------|-------|----------------|----------|
| 1. Configuration | X/10 | N | N |
| 2. Page Objects | X/10 | N | N |
| ...
| 11. Product Domain Alignment | X/10 | N | N |

## Critical Findings (must fix)
1. [Finding with file:line reference]

## Warnings (should fix)
1. [Finding with file:line reference]

## Observations (nice to have)
1. [Finding with file:line reference]

## Metrics
| Metric | Value |
|--------|-------|
| Test count | N |
| Page object count | N |
| Locator resilience | X% resilient |
| Fixture count | N |
| Average test steps | N |
| Flaky pattern count | N |
| TypeScript strictness | X% |
| Code duplication | X areas |
| Product entity coverage | X/Y entities |
| Terminology mismatches | N |
| Workflow coverage | X/Y workflows |
| Domain alignment score | X/10 |
```

---

## 🛑 CHECKPOINT

After completing the scan report:

1. Display the **Executive Summary** and **Critical Findings** in chat
2. Save full report to `docs/tms-agent/maintenance-agent/runs/{timestamp}/scan-report.md`
3. **STOP and WAIT** for user to review before proceeding to Phase 2

---

## Execution Strategy

For efficiency, scan dimensions can be parallelized:

```
PARALLEL GROUP 1: Dimensions 1, 7, 10 (config & docs)
PARALLEL GROUP 2: Dimensions 2, 3 (pages & tests)
PARALLEL GROUP 3: Dimensions 4, 5, 6 (fixtures, utils, API)
PARALLEL GROUP 4: Dimensions 8, 9 (CI/CD & TypeScript quality)
SEQUENTIAL (after all groups): Dimension 11 (product domain alignment — depends on Groups 2, 3, 4)
```

Use the Task tool with Explore subagents for each parallel group.

**Note:** Dimension 11 requires PRODUCT_CONTEXT.md to be loaded first (Phase 0) and synthesizes findings from Dimensions 2, 3, and 6, so it runs after the parallel groups complete.
