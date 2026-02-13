# Scan Report — TMS Automation Framework

**Run ID:** 20260213-1430
**Branch:** feat/maintenance-agent
**Date:** 2026-02-13

---

## Executive Summary

| Metric | Value |
|--------|-------|
| **Total source files scanned** | 72 TypeScript (src/) + 65 spec files (tests/) = 137 |
| **Total test specs** | 65 files, ~100 test cases |
| **Total page objects** | 18 modules (two-file pattern) + 3 components |
| **Total utilities** | 23 functions across 6 helper files |
| **Total fixtures** | 28 (18 page, 3 component, 3 API, 3 auto-setup, 1 auth token) |
| **Total API methods** | 16 (12 TmsApi + 4 JiraApi) |
| **Overall health score** | **74/100** |

### Top 3 Critical Issues

1. **252 `waitForTimeout()` calls in page objects** — Fixed sleeps are the #1 flakiness risk. `report.page.ts` alone has 67 instances.
2. **Fragile XPath selectors** — ~765 XPath expressions, majority use exact `text()` matching. `project.locators.ts` (55% fragile) and `folder.locators.ts` (50% fragile) are highest risk.
3. **4 loose-typed TmsApi CRUD methods** — `createProject`, `deleteProject`, `createTestCase`, `createTestRun` return `Record<string, unknown>`, forcing unsafe parsing in `api-setup.factory.ts`.

---

## Dimension Scores

| # | Dimension | Score | Critical | Warnings | Notes |
|---|-----------|-------|----------|----------|-------|
| 1 | Configuration | 8/10 | 0 | 3 | Strong config; missing credential validation |
| 2 | Page Objects | 7/10 | 1 | 2 | Excellent structure; fragile selectors |
| 3 | Test Specifications | 8/10 | 0 | 2 | Well-organized; `waitForTimeout` in 2 test files |
| 4 | Fixtures & Setup | 9/10 | 0 | 1 | Robust dual-auth; single-file could split |
| 5 | Utilities & Helpers | 8/10 | 0 | 2 | Minimal BasePage; silent error in api.helper |
| 6 | API Layer | 7/10 | 1 | 2 | Good coverage; loose typing + no logging |
| 7 | Configuration & Constants | 9/10 | 0 | 1 | Comprehensive; only 1 route constant |
| 8 | Reporters & CI/CD | 8/10 | 0 | 1 | Good pipelines; US/EU workflow duplication |
| 9 | TypeScript Quality | 8/10 | 0 | 2 | Strict mode on; 1 `any` type; 87 type assertions |
| 10 | Documentation | 7/10 | 1 | 2 | Good docs; stale files, no CONTRIBUTING.md |
| 11 | Product Domain Alignment | 9/10 | 0 | 1 | Excellent entity coverage; minor gaps |
| | **OVERALL** | **74/100** | **3** | **19** | |

---

## Dimension 1: Project Structure & Configuration

### Configuration Assessment

| Config File | Status | Details |
|-------------|--------|---------|
| package.json | ✅ | 4 core deps (Playwright ^1.49.0, TS ^5.7.0, dotenv, allure); minimal and clean |
| playwright.config.ts | ✅ | Multi-project (local + remote), auth setup dependency, proper timeouts |
| tsconfig.json | ✅ | `strict: true`, ES2022 target, NodeNext module, 7 path aliases |
| .env.example | ✅ | 76 lines, well-documented, all vars explained |
| hyperexecute.yaml | ✅ | Concurrency 15, autosplit, Node 20, proper caching |
| .gitignore | ✅ | All artifacts, auth state, .env, binaries covered |
| .github/workflows/ | ⚠️ | 5 workflows; `us-tests.yml` and `eu-tests.yml` ~95% duplicated |

### Key Findings

- ⚠️ **No startup validation** that `AUTH_EMAIL`, `AUTH_PASSWORD`, `AUTH_TOKEN` exist before test execution (`env.config.ts`)
- ⚠️ **CI workflow duplication**: `us-tests.yml` (5,752 bytes) and `eu-tests.yml` (5,776 bytes) differ only in env defaults and credentials
- ✅ **Path aliases**: 7 defined (`@config`, `@types`, `@utils`, `@pages`, `@api`, `@fixtures`, `@data`) — however, imports in source files use relative paths (`.js` extensions required by NodeNext), not aliases

---

## Dimension 2: Page Object Model Architecture

### Page Object Assessment

| Module | Has Locators | Has Page | Extends BasePage | test.step() | Locator Quality | Product Entity |
|--------|-------------|---------|-----------------|-------------|----------------|----------------|
| project | ✅ | ✅ | ✅ | ✅ | 🔴 15/30/55 | ✅ Project |
| test-case | ✅ | ✅ | ✅ | ✅ | 🟡 28/32/40 | ✅ Test Case |
| test-run | ✅ | ✅ | ✅ | ✅ | 🟡 25/35/40 | ✅ Test Run |
| folder | ✅ | ✅ | ✅ | ✅ | 🔴 20/30/50 | ✅ Folder |
| module | ✅ | ✅ | ✅ | ✅ | 🟡 25/35/40 | ✅ Module |
| milestone | ✅ | ✅ | ✅ | ✅ | 🟡 25/35/40 | ✅ Milestone |
| dataset | ✅ | ✅ | ✅ | ✅ | 🟡 30/35/35 | ✅ Dataset |
| report | ✅ | ✅ | ✅ | ✅ | 🟡 30/40/30 | ✅ Report |
| build | ✅ | ✅ | ✅ | ✅ | 🟡 25/30/45 | ✅ Build |
| configuration | ✅ | ✅ | ✅ | ✅ | 🟢 45/35/20 | ✅ Configuration |
| insights | ✅ | ✅ | ✅ | ✅ | 🟡 30/35/35 | ✅ Insights |
| settings | ✅ | ✅ | ✅ | ✅ | 🟡 30/35/35 | ✅ Settings |
| jira-integration | ✅ | ✅ | ✅ | ✅ | 🟡 33/33/34 | ✅ Jira |
| csv-import | ✅ | ✅ | ✅ | ✅ | 🟡 30/35/35 | ✅ CSV Import |
| kaneai | ✅ | ✅ | ✅ | ✅ | 🟡 30/35/35 | ✅ KaneAI |
| sdk | ✅ | ✅ | ✅ | ✅ | 🟡 30/35/35 | ✅ SDK |
| automation | ✅ | ✅ | ✅ | ✅ | 🟡 30/35/35 | ✅ Automation |
| navigation | ✅ (shared) | ✅ | ✅ | ✅ | 🟡 | ✅ Navigation |

**Summary:**
- **100% two-file pattern** compliance (18/18)
- **100% BasePage extension** compliance (18/18 + 2 components)
- **287 test.step()** calls across all page objects — excellent report granularity
- **3 reusable components**: ToastComponent, DeleteDialogComponent, SearchComponent
- **CommonLocators** (`C.`) barrel export effectively reduces duplication
- ⚠️ **No barrel export** at `src/pages/index.ts` for all page objects

### Selector Resilience Summary

| Category | Count | % |
|----------|-------|---|
| 🟢 Resilient (data-testid, role, #id) | ~48 | ~6% |
| 🟡 Moderate (CSS class, placeholder) | ~267 | ~31% |
| 🔴 Fragile (XPath text(), positional, deep nesting) | ~550 | ~63% |
| **Total selectors** | **~865** | |

**Worst offenders:**
- `project.locators.ts` — 55% fragile (exact `text()` matches)
- `folder.locators.ts` — 50% fragile (positional selectors like `(//span[text()='Untitled'])[10]`)
- `test-run.locators.ts` — 40% fragile (deep ancestor-based nesting)

---

## Dimension 3: Test Specifications

### Test Specification Assessment

| Feature | Specs | Test Cases | Tags | Fixture Usage | Flaky Patterns | Quality |
|---------|-------|-----------|------|--------------|---------------|---------|
| Project | 1 | 1 | ✅ | ✅ | 0 | ✅ |
| Test Case | 3 | 7 | ✅ | ✅ | 0 | ✅ |
| Test Run | 8 | 18 | ✅ | ✅ | 0 | ✅ |
| Folder | 6 | 6 | ✅ | ✅ | 0 | ✅ |
| Build | 1 | 2 | ✅ | ✅ | 0 | ✅ |
| Configuration | 9 | 10 | ✅ | ✅ | 0 | ✅ |
| Milestone | 3 | 4 | ✅ | ✅ | 0 | ✅ |
| Report | 11 | 12 | ✅ | ✅ | 0 | ✅ |
| Insights | 3 | 3 | ✅ | ✅ | 3 instances | ⚠️ |
| Dataset | 1 | 1 | ✅ | ✅ | 0 | ✅ |
| Settings | 3 | 4 | ✅ | ✅ | 0 | ✅ |
| CSV Import | 3 | 3 | ✅ | ✅ | 0 | ✅ |
| Jira Integration | 3 | 4 | ✅ | ✅ | 1 instance | ⚠️ |
| SDK | 3 | 4 | ✅ | ✅ | 0 | ✅ |
| KaneAI | 1 | 1 | ✅ | ✅ | 0 | ✅ |
| Automation | 1 | 1 | ✅ | ✅ | 0 | ✅ |
| Module | 1 | 2 | ✅ | ✅ | 0 | ✅ |
| API | 3 | 16 | ✅ | ✅ | 0 | ✅ |
| **TOTAL** | **65** | **~100** | **70%** | **100%** | **4** | |

### Strengths
- ✅ **100% naming convention** compliance (`{feature}-{scenario}.spec.ts`)
- ✅ **100% fixture usage** from `tms.fixture.ts`
- ✅ **Fresh test data** per test (random prefixes: `AutoProject_`, `AutoTC_`, etc.)
- ✅ **Auto-cleanup** via fixtures (`projectOnly`, `projectWithTestCase`, etc.)
- ✅ **Soft assertions** (`expect.soft()`) used consistently
- ✅ **Average test length**: 7-8 steps per test — well-balanced

### Flaky Patterns Found in Tests (4 instances)

| File | Line | Pattern | Risk |
|------|------|---------|------|
| `tests/insights/insights-mixed-status.spec.ts` | 81 | `page.waitForTimeout(2000)` | 🔴 HIGH |
| `tests/insights/insights-mixed-status.spec.ts` | 85 | `page.waitForTimeout(2000)` | 🔴 HIGH |
| `tests/insights/insights-mixed-status.spec.ts` | 89 | `page.waitForTimeout(2000)` | 🔴 HIGH |
| `tests/jira-integration/jira-testmu-ai.spec.ts` | 21 | `page.waitForTimeout(5000)` | 🔴 HIGH |

### `waitForTimeout()` in Page Objects (252 instances)

| Page Object | Count | Severity |
|-------------|-------|----------|
| report.page.ts | 67 | 🔴 Critical — highest concentration |
| milestone.page.ts | 44 | 🔴 High |
| dataset.page.ts | 31 | 🟡 Medium |
| module.page.ts | 20 | 🟡 Medium |
| kaneai.page.ts | 17 | 🟡 Medium |
| automation.page.ts | 16 | 🟡 Medium |
| sdk.page.ts | 15 | 🟡 Medium |
| configuration.page.ts | 8 | 🟡 Medium |
| folder.page.ts | 6 | 🟢 Low |
| insights.page.ts | 6 | 🟢 Low |
| test-case.page.ts | 5 | 🟢 Low |
| test-run.page.ts | 5 | 🟢 Low |
| build.page.ts | 5 | 🟢 Low |
| jira-integration.page.ts | 3 | 🟢 Low |
| Others | 4 | 🟢 Low |
| **TOTAL** | **252** | |

---

## Dimension 4: Fixtures & Setup

### Fixture Assessment

| Fixture Type | Count | Auto-Cleanup | Dependencies | Issues |
|-------------|-------|-------------|-------------|--------|
| Page Object fixtures | 18 | N/A (stateless) | `page` | None |
| Component fixtures | 3 | N/A (stateless) | `page` | None |
| API fixtures | 3 | N/A | `request` | None |
| Auth token fixture | 1 | N/A | EnvConfig | None |
| Auto-setup composites | 3 | ✅ Yes (deletes project) | page + API | None |
| **Total** | **28** | | | |

**Key Findings:**
- ✅ **Dual-auth strategy**: Global setup (API-based, `.auth/user.json`) + per-test auth.setup.ts (browser-based)
- ✅ **No circular dependencies** — no deadlock risk
- ✅ **api-setup.factory.ts** properly cleans up created resources (project IDs tracked + deleted)
- ⚠️ All 28 fixtures in single file (`tms.fixture.ts`, 205 lines) — manageable but could split by domain

---

## Dimension 5: Utilities & Helpers

### Utility Assessment

| Utility | File | Functions | Quality | Issues |
|---------|------|-----------|---------|--------|
| BasePage | base.page.ts (32 lines) | 3 (loc, tpl, isVisible) | ✅ Excellent | None |
| ApiHelper | api.helper.ts (83 lines) | 8 methods | ✅ Good | ⚠️ Silent JSON parse error (line 64) |
| Wait Helpers | wait.helper.ts (41 lines) | 5 functions | ✅ Excellent | None |
| Retry Helper | retry.helper.ts (21 lines) | 1 function | ✅ Good | Uses `page.waitForTimeout` in retry delay |
| Random Helpers | random.helper.ts (30 lines) | 12 generators | ✅ Good | Math.random vs crypto inconsistency |
| Date Helpers | date.helper.ts (26 lines) | 4 functions | ✅ Good | None |
| URL Helpers | url.helper.ts (10 lines) | 2 functions | ✅ Good | None |

**Critical Finding:**
- `api.helper.ts:64` — `response.json().catch(() => ({}) as T)` silently masks JSON parse failures, returning empty object to callers

---

## Dimension 6: API Layer

### API Method Assessment

| Method | File:Line | Response Type | Status Validation | Logging |
|--------|----------|---------------|-------------------|---------|
| getTCSummaryInsightsData | tms.api.ts:23 | ✅ Typed | ❌ None | ❌ None |
| createProject | tms.api.ts:36 | ⚠️ `Record<string, unknown>` | ❌ None | ❌ None |
| deleteProject | tms.api.ts:48 | ⚠️ `Record<string, unknown>` | ❌ None | ❌ None |
| createTestCase | tms.api.ts:58 | ⚠️ `Record<string, unknown>` | ❌ None | ❌ None |
| createTestRun | tms.api.ts:70 | ⚠️ `Record<string, unknown>` | ❌ None | ❌ None |
| getProject | tms.api.ts:82 | ✅ `ProjectResponse` | ❌ None | ❌ None |
| listProjects | tms.api.ts:90 | ✅ `ListResponse<>` | ❌ None | ❌ None |
| updateProject | tms.api.ts:99 | ✅ `ProjectResponse` | ❌ None | ❌ None |
| getTestCase | tms.api.ts:110 | ✅ `TestCaseResponse` | ❌ None | ❌ None |
| listTestCases | tms.api.ts:122 | ✅ `ListResponse<>` | ❌ None | ❌ None |
| getTestRun | tms.api.ts:132 | ✅ `TestRunResponse` | ❌ None | ❌ None |
| listTestRuns | tms.api.ts:144 | ✅ `ListResponse<>` | ❌ None | ❌ None |
| createJiraIssue | jira.api.ts:19 | ✅ Typed | ✅ Throws on error | ❌ None |
| addTestMuTriggerComment | jira.api.ts:44 | ✅ Typed | ✅ Throws on error | ❌ None |
| waitForLambdaTestAIResponse | jira.api.ts:60 | ✅ Typed | ✅ Timeout | ❌ None |
| getIssueComments | jira.api.ts:78 | ✅ Typed | ✅ Graceful | ❌ None |

**Summary:** 12/16 typed, 4 loose. JiraApi validates status; TmsApi does not. Zero logging across all API methods.

---

## Dimension 7: Configuration & Constants

| Category | Status | Details |
|----------|--------|---------|
| Timeout constants | ✅ 8 levels | 5s → 420s (well-calibrated) |
| Retry constants | ✅ 5 configs | Differentiated by feature (Jira=3, CI=2, etc.) |
| Polling constants | ✅ 3 configs | Max 120s general, 300s for insights |
| CI constants | ✅ | 3 workers, 2 retries |
| Route constants | ⚠️ | Only 1 route (`/settings/fields`) |
| API path constants | ✅ 6 functions | RESTful, consistent |
| Random length constants | ✅ 5 levels | Purpose-driven (5–30 chars) |
| Test data constants | ✅ | Centralized file paths |
| Jira constants | ✅ | Integration triggers + response patterns |

---

## Dimension 8: Reporters & CI/CD

| Component | Status | Issues |
|-----------|--------|--------|
| step-reporter.ts | ✅ | Console reporter with step-level granularity |
| report-lab.reporter.ts | ✅ | Dashboard integration reporter |
| GitHub Actions (5 workflows) | ⚠️ | `us-tests.yml` and `eu-tests.yml` ~95% duplicated |
| HyperExecute config | ✅ | Autosplit, concurrency 15, proper caching |
| Scripts (run-tests.js, etc.) | ✅ | CLI wrapper with env/mode/tag support |
| Slack notifications | ✅ | Threaded notifications per workflow |

---

## Dimension 9: TypeScript Quality

| Metric | Value | Status |
|--------|-------|--------|
| Strict mode | Enabled | ✅ |
| `any` types | 1 instance | ✅ (`test-case.page.ts:154`) |
| Type assertions (`as`) | 87 instances | ⚠️ Most in `api.helper.ts`, `api-setup.factory.ts`, `jira.api.ts` |
| Path aliases defined | 7 | ✅ (but not used — NodeNext requires relative `.js` imports) |
| Types directory | `src/types/` with 4 type files | ✅ |
| Unused imports | 0 found | ✅ |
| JSDoc coverage | ~30% of exports | ⚠️ (config + utils have JSDoc; pages mostly missing) |

### Code Readability Assessment (10-file sample)

| File | JSDoc | Comment Quality | Naming | Structure |
|------|-------|----------------|--------|-----------|
| base.page.ts | 0% | MISSING | CLEAR | CLEAN |
| api.helper.ts | 20% | GOOD (line 50) | CLEAR | CLEAN |
| tms.fixture.ts | 0% | MISSING | CLEAR | ADEQUATE |
| project.page.ts | 0% | MISSING | CLEAR | CLEAN |
| test-run.page.ts | 0% | MISSING | CLEAR | ADEQUATE |
| constants.ts | 100% | GOOD | CLEAR | CLEAN |
| env.config.ts | 50% | GOOD | CLEAR | CLEAN |
| toast.component.ts | 100% | GOOD | CLEAR | CLEAN |
| random.helper.ts | 0% | MISSING | CLEAR | CLEAN |
| project-crud.spec.ts | 0% | MISSING | CLEAR | CLEAN |

**Summary:** Naming is consistently CLEAR across the codebase. Structure is CLEAN. JSDoc is sparse in page objects and tests (which is typical for test code). Config/util files have better documentation.

---

## Dimension 10: Documentation

| Document | Lines | Status | Assessment |
|----------|-------|--------|------------|
| README.md | 579 | ✅ Active | Comprehensive onboarding guide; test counts inconsistent |
| ARCHITECTURE.md | 295 | ✅ Active | 11 sections, design patterns, scalability roadmap |
| COVERAGE.md | 294 | ⚠️ Stale | Feb 5 snapshot with 89.7% failure rate — misleading |
| MIGRATION_REPORT.md | 220 | ⚠️ Archive | Historical (Java→TS migration) — no longer maintained |
| all-locators.md | 1,092 | ❌ Stale | 73KB auto-generated dump; immediately diverges from code |

**Missing:** CONTRIBUTING.md (no guide for adding tests/pages/features)

---

## Dimension 11: Product Domain Alignment

### Entity Coverage Matrix

| Product Entity | Page Object | API Helper | Test Specs | Fixture | Coverage |
|---------------|-------------|-----------|-----------|---------|----------|
| Project | ✅ project.page | ✅ TmsApi | ✅ 1 spec | ✅ projectOnly | FULL |
| Test Case | ✅ test-case.page | ✅ TmsApi | ✅ 3 specs | ✅ projectWithTestCase | FULL |
| Test Run | ✅ test-run.page | ✅ TmsApi | ✅ 8 specs | ✅ (via project) | FULL |
| Folder | ✅ folder.page | ❌ | ✅ 6 specs | ✅ projectWithTestCaseInFolder | GOOD |
| Module | ✅ module.page | ❌ | ✅ 1 spec | ❌ | PARTIAL |
| Dataset | ✅ dataset.page | ❌ | ✅ 1 spec | ❌ | PARTIAL |
| Milestone | ✅ milestone.page | ❌ | ✅ 3 specs | ❌ | GOOD |
| Report | ✅ report.page | ❌ | ✅ 11 specs | ❌ | GOOD |
| Build | ✅ build.page | ❌ | ✅ 1 spec | ❌ | PARTIAL |
| Configuration | ✅ configuration.page | ❌ | ✅ 9 specs | ❌ | GOOD |
| Settings | ✅ settings.page | ❌ | ✅ 3 specs | ❌ | GOOD |
| Insights | ✅ insights.page | ✅ (insights API) | ✅ 3 specs | ❌ | GOOD |
| Jira Integration | ✅ jira-integration.page | ✅ JiraApi | ✅ 3 specs | ❌ | FULL |
| Variable | ❌ | ❌ | ❌ | ❌ | MISSING |
| Secret | ❌ | ❌ | ❌ | ❌ | MISSING |
| User | ❌ | ❌ | ❌ | ❌ | MISSING |

**Entity coverage:** 13/16 entities have page objects (81%). 3 entities missing coverage entirely (Variable, Secret, User management).

### Terminology Consistency

All page object names, method names, and test descriptions use official product terminology. No mismatches found. The team consistently uses:
- "Test Case" (not "test", "tc", "scenario")
- "Test Run" (not "execution", "suite")
- "Folder" (not "directory", "group")
- "Module" (not "component", "block")
- "Milestone" (not "release", "sprint")

**Score: 10/10** — Exemplary naming discipline.

### Workflow Coverage

| Workflow | E2E Coverage | Missing Steps |
|---------|-------------|--------------|
| W1: Project Setup | ✅ FULL | - |
| W2: Test Case Lifecycle | ✅ FULL | Version history (partial) |
| W3: Test Run Execution | ✅ FULL | Scheduled execution |
| W4: Data-Driven Testing | ⚠️ PARTIAL | AI autofill, CSV import full flow |
| W5: AI-Assisted Creation | ⚠️ PARTIAL | Multi-input types (audio, doc) |
| W6: Reporting & Analysis | ✅ FULL | - |
| W7: Jira Integration | ✅ FULL | ADO/GitHub integrations |

### Known Quirk Handling

| Quirk (from PRODUCT_CONTEXT.md) | Handled | Evidence |
|--------------------------------|---------|---------|
| Toast auto-dismiss | ✅ Yes | ToastComponent with configurable timeout |
| Search debounce | ✅ Yes | `fillAndWaitForSearch()` in wait.helper.ts |
| Dialog animation | ⚠️ Inconsistent | Some pages use `waitForTimeout`, others wait for visibility |
| Folder tree async load | ⚠️ Not explicit | No dedicated wait for folder tree expansion |
| Triple-dot menu on hover | ✅ Yes | Pages use hover→click patterns |
| List lazy-load on scroll | ⚠️ Not handled | No scroll-before-assert pattern found |
| Bulk action bar animation | ⚠️ Not explicit | No dedicated wait for bar visibility |

### Domain Alignment Score: 8.5/10

---

## Critical Findings (must fix)

| # | Finding | Location | Impact |
|---|---------|----------|--------|
| C1 | **252 `waitForTimeout()` in page objects** | 18 page files (see Dim 3 table) | #1 flakiness source; report.page.ts=67, milestone.page.ts=44 |
| C2 | **63% fragile selectors** (~550/865) | All `*.locators.ts` files | Breaks on any UI text/layout change |
| C3 | **4 TmsApi CRUD methods return `Record<string, unknown>`** | `tms.api.ts:36-81` | Forces unsafe casting in `api-setup.factory.ts:16,22,27` |

## Warnings (should fix)

| # | Finding | Location | Impact |
|---|---------|----------|--------|
| W1 | 4 `waitForTimeout()` in test files | `insights-mixed-status.spec.ts:81,85,89`, `jira-testmu-ai.spec.ts:21` | Flaky tests in CI |
| W2 | Silent JSON parse error masking | `api.helper.ts:64` | Hides real API failures |
| W3 | No API request/response logging | `tms.api.ts`, `jira.api.ts` | Debugging friction |
| W4 | No credential startup validation | `env.config.ts` | Tests fail late with confusing errors |
| W5 | CI workflow duplication (US/EU ~95% same) | `.github/workflows/us-tests.yml`, `eu-tests.yml` | Maintenance burden |
| W6 | `all-locators.md` (73KB stale file) | Root directory | Repo bloat |
| W7 | COVERAGE.md stale (shows 89.7% failure) | Root directory | Misleading metrics |
| W8 | Only 1 route constant defined | `constants.ts` `ROUTES` | Hardcoded URLs in page objects |
| W9 | No barrel export for pages | `src/pages/` missing `index.ts` | Verbose imports |
| W10 | `api-setup.factory.ts` fallback ID parsing | `api-setup.factory.ts:16,22,27` | Empty string ID if API changes |

## Observations (nice to have)

| # | Finding | Location | Impact |
|---|---------|----------|--------|
| O1 | Path aliases defined but unused (NodeNext requires `.js`) | `tsconfig.json:13-21` | No impact; aspirational config |
| O2 | Missing CONTRIBUTING.md | Root directory | Onboarding friction for new contributors |
| O3 | Root directory image files | `image copy.png`, `java-to-ts.png` (456KB) | Minor repo bloat |
| O4 | 87 type assertions across codebase | Various | Most are necessary (API responses) |
| O5 | JSDoc coverage ~30% on exports | Page objects, fixtures | Standard for test code |
| O6 | tms.fixture.ts (28 fixtures, 205 lines) | `src/fixtures/tms.fixture.ts` | Could split by domain for large teams |
| O7 | Math.random vs crypto.randomBytes inconsistency | `random.helper.ts` vs API tests | Both work; minor style inconsistency |
| O8 | 3 product entities missing (Variable, Secret, User) | N/A | Coverage gap, not maintenance issue |

---

## Metrics Summary

| Metric | Value |
|--------|-------|
| Test count | ~100 test cases in 65 spec files |
| Page object count | 18 modules + 3 components |
| Locator resilience | **6% resilient, 31% moderate, 63% fragile** |
| Fixture count | 28 total |
| Average test steps | 7-8 per test |
| Flaky pattern count (tests) | 4 `waitForTimeout` in 2 test files |
| Flaky pattern count (pages) | 252 `waitForTimeout` in 18 page files |
| TypeScript `any` types | 1 |
| Type assertions (`as`) | 87 |
| TypeScript strictness | 100% (strict: true) |
| API methods typed | 12/16 (75%) |
| API methods with logging | 0/16 (0%) |
| Code duplication areas | 1 (CI workflows) |
| Product entity coverage | 13/16 entities (81%) |
| Terminology mismatches | 0 |
| Workflow coverage | 5/7 full, 2/7 partial |
| Domain alignment score | 8.5/10 |

---

*Scan completed: 2026-02-13 | Phase 1 of 5 | Awaiting human approval to proceed to Phase 2 (Multi-Persona Critique)*
