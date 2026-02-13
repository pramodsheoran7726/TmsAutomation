# Scan Report — TMS Automation Framework

**Phase 1: Deep Scan & Context Building**
**Date:** 2026-02-12
**Run ID:** 20260212-1500

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total files scanned | 138 (72 src + 66 tests) |
| Total test specs | 66 files, ~92 executable tests |
| Total page objects | 20 modules (40 files) |
| Total utilities | 8 helper modules, 19 exported functions |
| Total fixtures | 22 fixture definitions |
| Total CI workflows | 5 pipelines |
| **Overall Health Score** | **74/100** |

---

## Dimension Scores

| # | Dimension | Score | Critical | Warnings | Observations |
|---|-----------|-------|----------|----------|-------------|
| 1 | Configuration | 8.5/10 | 1 | 2 | 1 |
| 2 | Page Objects | 7.3/10 | 1 | 2 | 2 |
| 3 | Test Specs | 6.1/10 | 1 | 1 | 2 |
| 4 | Fixtures & Setup | 7.5/10 | 1 | 1 | 2 |
| 5 | Utilities | 7.0/10 | 1 | 1 | 2 |
| 6 | API Layer | 6.5/10 | 2 | 1 | 3 |
| 7 | Constants | 8.3/10 | 0 | 2 | 1 |
| 8 | Reporters & CI/CD | 7.8/10 | 3 | 5 | 5 |
| 9 | TypeScript Quality | 8.8/10 | 0 | 4 | 2 |
| 10 | Documentation | 6.6/10 | 1 | 1 | 2 |
| | **OVERALL** | **74/100** | **11** | **20** | **22** |

---

## Critical Findings (must fix)

### C1: 251 Hardcoded `page.waitForTimeout()` Calls [Dim 3]
- **Impact:** Primary source of test flakiness — arbitrary delays instead of element-based waits
- **Files:** 17 page object files (test-run.page.ts: 18, insights.page.ts: 12, settings.page.ts: 8, test-case.page.ts: 9, folder.page.ts: 8, etc.)
- **Fix:** Replace with explicit element waits, `waitForNetworkIdle()`, or `waitFor()` on locators

### C2: 92% Fragile Locators — XPath Text Matching [Dim 2]
- **Impact:** Any UI text change breaks tests. 670+ `//element[text()='...']` and 72+ positional XPath `[1][2][3]`
- **Stats:** Resilient: 1% | Moderate: 7% | Fragile: 92%
- **Files:** ALL 20 locator files
- **Fix:** Migrate to data-testid, role, aria-label selectors (requires frontend cooperation)

### C3: TMS CRUD API Methods Return Weak `Record<string, unknown>` [Dim 6]
- **Impact:** Type safety lost for createProject, deleteProject, createTestCase, createTestRun
- **File:** `src/api/tms.api.ts:36-81`
- **Fix:** Define proper response types (CreateProjectResponse, etc.)

### C4: Unsafe Field Extraction in API Setup Factory [Dim 6]
- **Impact:** Empty string projectId causes cascade cleanup failures
- **File:** `src/fixtures/api-setup.factory.ts:16-27`
- **Fix:** Validate id field non-empty or throw

### C5: Missing `yaml` Dependency [Dim 1]
- **Impact:** `scripts/update-hyperexecute.ts` will fail at runtime
- **File:** `package.json:47` — declared but not installed
- **Fix:** `npm install yaml` or remove from package.json

### C6: CI/CD Duplication — US/EU Workflows 34% Identical [Dim 8]
- **Impact:** 129 lines duplicated across `us-tests.yml` and `eu-tests.yml`
- **Fix:** Extract reusable workflow or composite action

### C7: Redundant Scripts — `run-tests.js` vs `pw.js` [Dim 8]
- **Impact:** Two nearly identical test runner CLIs
- **Fix:** Consolidate into single script

### C8: EU Credentials Mismatch Risk [Dim 8]
- **Impact:** EU workflow uses `EU_AUTH_*` secrets but scripts use generic `AUTH_*` env vars
- **File:** `eu-tests.yml:104-106`
- **Fix:** Verify credential passthrough is correct

### C9: Auth Setup Has No Retry Logic [Dim 4]
- **Impact:** Single login API failure fails entire test suite
- **File:** `src/setup/auth.setup.ts:6-30`
- **Fix:** Add retry logic (3-5 attempts with backoff)

### C10: Remote Page Fixture Missing Error Handling [Dim 4]
- **Impact:** Resource leaks if `page.goto()` fails in remote mode
- **File:** `src/fixtures/tms.fixture.ts:83-94`
- **Fix:** Wrap in try-catch with cleanup

### C11: Documentation Severely Outdated [Dim 10]
- **Impact:** COVERAGE.md claims 39 tests (actual: 92), README claims 11 smoke tests (unverifiable)
- **Files:** `COVERAGE.md:8`, `README.md:155`
- **Fix:** Refresh all test counts

---

## Warning Findings (should fix)

### W1: Path Aliases Defined But Unused [Dim 9]
- 83.5% relative imports vs 16.5% alias imports despite 7 aliases in tsconfig

### W2: Assertion Monotony [Dim 3]
- 90% of assertions are `.toBeVisible()` — missing text, value, count, state assertions

### W3: `ApiHelper.post/get` Missing Status Validation [Dim 5]
- Returns parsed JSON without checking `response.ok()` — silent HTTP errors

### W4: Environment Config Has No Validation [Dim 7]
- `TEST_ENV` cast to `TestEnvironment` without validation — invalid values pass silently

### W5: ROUTES Constant Sparse [Dim 7]
- Only 1 route defined (`settingsFields`); others likely hardcoded in page objects

### W6: Navigation Page Violates Two-File Pattern [Dim 2]
- Inline locators instead of `navigation.locators.ts`

### W7: Toast Component Uses Fragile XPath [Dim 2]
- `xpath=//*[contains(text(),'${text}')]` — breaks on message changes

### W8: BasePage Located in `src/utils/` Instead of `src/pages/` [Dim 5]
- Violates layer separation (page wrapper in utils directory)

### W9: Retry Helper Underutilized [Dim 5]
- `retryAction()` used in only 2 of 17 page files despite being available

### W10: No Retry Logic on Slack API Calls [Dim 8]
- Single attempt; silent failure on error

### W11: StepReporter Doesn't Track Retries [Dim 8]
- Retried tests merged into single failure status

### W12: HyperExecute CLI Not Cached [Dim 8]
- Downloaded fresh every run (30-60s overhead)

### W13: `any` Types in 2 Files [Dim 9]
- `test-case.page.ts:153` (Monaco editor), `report-test.helper.ts:78` (dynamic methods)

### W14: Factory Methods Missing Return Types [Dim 9]
- `api-setup.factory.ts:18-24` lacks explicit `Promise<>` annotations

### W15: Outdated Dependencies [Dim 1]
- `@types/node` 22.x vs 25.x, `dotenv` 16.x vs 17.x

### W16: Tag Distribution Imbalanced [Dim 3]
- Almost all tests tagged @regression only; critical CRUD tests missing @smoke

### W17: Slack Notifications Error Handling [Dim 8]
- Silent catch block, no error logging on failure

### W18: `reportGeneration` Timeout Over-Broad [Dim 7]
- 420s (7 min) global timeout only needed by report tests

### W19: Missing Satellite Documentation [Dim 10]
- No CONTRIBUTING.md, CHANGELOG.md, TEST-WRITING-GUIDE.md

### W20: Test-Level test.step() Missing [Dim 3]
- All test.step() calls are in page objects; tests lack readable step context

---

## Metrics

| Metric | Value |
|--------|-------|
| Test spec files | 66 |
| Executable tests | ~92 |
| Page object modules | 20 (40 files) |
| Fixture definitions | 22 |
| Utility functions | 19 (barrel exported) |
| API methods (TMS) | 12 |
| API methods (Jira) | 6 |
| CI/CD workflows | 5 |
| npm scripts | 38 (all active) |
| Locator resilience | 1% resilient / 7% moderate / 92% fragile |
| Import style | 83.5% relative / 16.5% alias |
| `any` type usage | 4 instances in 2 files |
| `@ts-ignore` usage | 0 |
| `waitForTimeout` calls | 251 across 17 files |
| CI duplication | 34% between US/EU workflows |
| TypeScript strict mode | 100% enabled |
| Code duplication areas | 3 (CI workflows, scripts, locators) |
| Missing dependencies | 1 (yaml) |
| Outdated dependencies | 2 (@types/node, dotenv) |

---

## Strengths (Preserve These)

1. **Excellent Page Object Architecture** — 100% BasePage extension, consistent two-file pattern
2. **Strong TypeScript Config** — Strict mode, 7 path aliases, ES2022 target
3. **Robust Fixture System** — 22 fixtures with auto-cleanup composites
4. **Good Random Data Generation** — Thread-safe for parallel execution
5. **Wait Helpers with Graceful Degradation** — `waitForNetworkIdle()` falls back properly
6. **Jira API Integration** — Excellent error handling, polling with timeout
7. **Comprehensive Reporters** — StepReporter + ReportLab + Allure + HTML
8. **Zero `@ts-ignore`** — No escape hatches in the codebase
9. **Consistent Naming** — 100% compliance with `{feature}-{scenario}.spec.ts`
10. **Multi-Environment Support** — 4 environments × 2 modes with proper URL mapping
