# Test Results Report

**Date:** Feb 5, 2026
**Environment:** stage (us-chromium)
**Command:** `npx playwright test --grep @regression --project us-chromium`
**Total Duration:** 26.9 minutes

---

## Summary

| Status  | Count |
|---------|-------|
| Passed  | 4 (3 tests + 1 setup) |
| Failed  | 35    |
| Total   | 39    |

---

## PASSED Tests

| # | Test File | Test Name | Tags | Duration |
|---|-----------|-----------|------|----------|
| 1 | `src/auth/auth.setup.ts:6` | authenticate via API | setup | 4.5s |
| 2 | `tests/project/project-crud.spec.ts:5` | should create, edit, and delete a project | @smoke @regression | 9.9s |
| 3 | `tests/test-case/test-case-create.spec.ts:4` | should create a test case with type, priority, status, and attachment | @smoke @regression | 23.4s |
| 4 | `tests/test-run/test-run-crud.spec.ts:4` | should create a test run without config and assignee | @smoke @regression | 47.5s |

---

## FAILED Tests — Grouped by Root Cause

### 1. Project `openProject` fails — project not found after search (4 tests)

**Root Cause:** `projectPage.openProject()` calls `safeFill(L.searchProject, projectName)` then `safeClick(L.createdProject(projectName))`. The project is created but the link `//a[text()='ProjectName']` is not found — likely timing issue or project not appearing in search results fast enough.

**Failing Locator:** `//a[text()='AutoProject_XXXXX']` — times out waiting for project link

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/report/report-date-range.spec.ts:4` | should create a Detailed Execution History report with date range | @regression |
| 2 | `tests/report/report-multiple-filters.spec.ts:4` | should create a report with priority and status filters | @regression |
| 3 | `tests/report/report-priority-filter.spec.ts:4` | should create a report with priority filter | @regression |
| 4 | `tests/report/report-test-runs.spec.ts:4` | should create a report with test runs filter | @regression |

**Fix Needed:** In report test specs, check if `openProject` is called correctly. The project is created in `beforeAll` but may not be visible in search. Increase wait time or add retry logic in `openProject()`.

---

### 2. Test Run `searchFieldInLinkProject` (`//input[@name='Search']`) not found (5 tests)

**Root Cause:** After creating a test run, the `openTestRun()` / `deleteTestRun()` methods try to find `//input[@name='Search']` but this locator doesn't match the actual search input on the test run list page. The search input likely has a different `name` attribute or uses `placeholder` instead.

**Failing Locator:** `//input[@name='Search']` — times out

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/test-run/test-run-crud.spec.ts:13` | should create and delete a test run | @smoke @regression |
| 2 | `tests/test-run/test-run-bulk.spec.ts:4` | should duplicate a test run | @regression |
| 3 | `tests/test-run/test-run-bulk.spec.ts:15` | should archive and reactivate a test run | @regression |
| 4 | `tests/test-run/test-run-execute.spec.ts:4` | should mark test case status in test run | @regression |
| 5 | `tests/sdk/sdk-run.spec.ts:4` | should execute test steps via SDK and mark status | @regression |

**Fix Needed:** Update `searchFieldInLinkProject` locator in `test-run.locators.ts`. Check the actual search input's attributes on the test runs list page (likely `placeholder='Search Test Runs'` or similar).

---

### 3. Settings page — `Create Custom Field` button not found (5 tests)

**Root Cause:** All settings tests fail on `//span[text()='Create Custom Field']`. The settings page navigation (`navigateToSettings` / `openCustomFields` / `openSystemFields`) likely doesn't reach the correct page, or the button text/structure is different.

**Failing Locator:** `//span[text()='Create Custom Field']` — times out

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/settings/custom-fields.spec.ts:5` | should create string and textarea custom fields | @regression |
| 2 | `tests/settings/custom-fields.spec.ts:12` | should create number, boolean, date custom fields | @regression |
| 3 | `tests/settings/custom-fields.spec.ts:20` | should create dropdown single select custom field | @regression |
| 4 | `tests/settings/custom-fields.spec.ts:26` | should create URL custom field | @regression |
| 5 | `tests/settings/system-fields.spec.ts:5` | should add values to Priority, Status, and Type fields | @regression |

**Fix Needed:** Check settings page navigation and button locators. The button may say "Add Custom Field" or use a different element structure. Also check if `navigateToSettings()` lands on the correct sub-page.

---

### 4. Milestone tab navigation fails (4 tests)

**Root Cause:** Clicking the Milestones tab either results in a 404/blank page or the milestone-specific locators don't match. The tab locator `//*[@role='tab' and contains(.,'Milestones')]` may be correct but the page content that loads has different structure than expected.

**Failing Locator:** Milestone-specific locators after tab navigation

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/milestone/milestone-crud.spec.ts:4` | should create a milestone | @smoke @regression |
| 2 | `tests/milestone/milestone-crud.spec.ts:14` | should edit and delete a milestone | @smoke @regression |
| 3 | `tests/milestone/milestone-search-filter.spec.ts:4` | should search for a milestone | @regression |
| 4 | `tests/milestone/milestone-testrun.spec.ts:4` | should assign a milestone to a test run | @regression |

**Fix Needed:** Manually navigate to Milestones tab and inspect actual page structure. Check if `openMilestonesTab()` works and what the actual milestone form locators are.

---

### 5. Configuration dropdown / form locators (2 tests)

**Root Cause:** Configuration creation form locators don't match actual UI. The OS/Browser dropdown locators (`//*[text()='Operating system']/following-sibling::button`) may not find the correct elements.

**Failing Locator:** Configuration form dropdowns

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/configuration/configuration-crud.spec.ts:5` | should create a Windows web browser configuration | @smoke @regression |
| 2 | `tests/configuration/configuration-crud.spec.ts:11` | should create and delete a configuration | @smoke @regression |

**Fix Needed:** Manually inspect the Configuration creation form. Check dropdown button locators, form field names, and submit button text.

---

### 6. Folder locators — subfolder/options/rename (4 tests)

**Root Cause:** Folder operations (create subfolder, rename, drag-drop, copy/move) fail because the folder tree item structure doesn't match locators. The hover-to-reveal action buttons have different selectors than expected.

**Failing Locator:** Various folder action locators

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/folder/folder-crud.spec.ts:4` | should create, rename, and delete a folder | @smoke @regression |
| 2 | `tests/folder/folder-drag-drop.spec.ts:4` | should drag a folder to reorder | @regression |
| 3 | `tests/folder/copy-move.spec.ts:4` | should copy test cases between folders | @regression |
| 4 | `tests/folder/copy-move.spec.ts:14` | should move test cases between folders | @regression |

**Fix Needed:** Inspect folder tree structure. Check `createSubFolderForFolder`, `folderOptionsMenu`, `renameFolder`, `dragDropFolder` locators against actual DOM.

---

### 7. Dataset tab navigation fails (1 test)

**Root Cause:** Similar to Milestone — Datasets tab clicks but page content is blank/404 or locators don't match.

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/dataset/dataset-crud.spec.ts:4` | should create and manage datasets | @smoke @regression |

**Fix Needed:** Check if Datasets feature is available in stage environment. Inspect tab navigation and form locators.

---

### 8. Build page locators (1 test)

**Root Cause:** Build creation/edit/duplicate flow has locator mismatches.

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/build/build-crud.spec.ts:4` | should create, edit, duplicate, and verify build | @smoke @regression |

**Fix Needed:** Check build page navigation and form locators. Inspect the actual Build page UI.

---

### 9. Insights page locators (2 tests)

**Root Cause:** Insights tab content locators don't match actual UI elements.

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/insights/insights-validation.spec.ts:4` | should display insights labels and charts | @regression |
| 2 | `tests/insights/insights-mixed-status.spec.ts:4` | should verify insights values with mixed test case statuses | @regression |

**Fix Needed:** Inspect Insights tab page structure and update locators.

---

### 10. Test Case Edit — `Add test step` button disabled (1 test)

**Root Cause:** The `(//span[text()='Add test step'])[2]` locator resolves but the button is **not enabled**. The test case may need to be saved first, or the button requires scrolling/another action before it becomes enabled.

**Failing Locator:** `xpath=(//span[text()='Add test step'])[2]` — element found but disabled

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/test-case/test-case-edit.spec.ts:4` | should create test steps and verify AI step generation | @regression |

**Fix Needed:** Check the flow — may need to save the test case first, or use `force: true` to click, or wait for the button to become enabled.

---

### 11. Module page locators (2 tests)

**Root Cause:** Module creation and insert locators don't match actual UI. `//span[text()='Insert a module']` is not visible.

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/module/module-crud.spec.ts:5` | should create a module with steps | @regression |
| 2 | `tests/module/module-crud.spec.ts:11` | should insert a module into test case | @regression |

**Fix Needed:** Inspect Module page and check locators.

---

### 12. Automation link test case (1 test)

**Root Cause:** `//div[div[div[a[text()='LambdaTest Automation']]]]//button` — complex nested locator doesn't find the button.

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/automation/automation-link-tc.spec.ts:4` | should link a test case from automation dashboard | @regression |

**Fix Needed:** Check Automation dashboard page structure and simplify the locator.

---

### 13. KaneAI automation (1 test)

**Root Cause:** KaneAI page navigation or form locators don't match.

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/kaneai/kaneai-automate.spec.ts:4` | should automate test case with KaneAI | @regression |

**Fix Needed:** Inspect KaneAI page locators.

---

### 14. Jira Integration (1 test)

**Root Cause:** Failed in 2.1s — likely missing Jira configuration (env vars: `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`).

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/jira-integration/jira-testmu-ai.spec.ts:4` | should create Jira issue, trigger TestMu AI, and verify response | @regression |

**Fix Needed:** Ensure Jira env vars are configured in `.env` file.

---

### 15. CSV Import (1 test)

**Root Cause:** CSV import flow locators don't match actual UI.

| # | Test File | Test Name | Tags |
|---|-----------|-----------|------|
| 1 | `tests/csv-import/csv-import.spec.ts:4` | should import test cases from CSV file | @regression |

**Fix Needed:** Inspect CSV import page and check file upload + mapping locators.

---

## Priority Fix Order (Suggested)

| Priority | Root Cause Group | Tests Affected | Effort |
|----------|-----------------|----------------|--------|
| P0 | Test Run search field locator | 5 tests | Low — fix 1 locator |
| P0 | Settings page navigation/locators | 5 tests | Low-Medium |
| P0 | Report tests (openProject timing) | 4 tests | Low — add wait/retry |
| P1 | Milestone tab navigation | 4 tests | Medium — inspect UI |
| P1 | Folder action locators | 4 tests | Medium — inspect DOM |
| P1 | Configuration form locators | 2 tests | Medium |
| P2 | Module page locators | 2 tests | Medium |
| P2 | Insights page locators | 2 tests | Medium |
| P2 | Test Case Edit (disabled button) | 1 test | Low |
| P2 | Build page locators | 1 test | Medium |
| P3 | Dataset tab navigation | 1 test | Medium |
| P3 | Automation page locator | 1 test | Medium |
| P3 | KaneAI page locators | 1 test | Medium |
| P3 | Jira env config | 1 test | Low — env setup |
| P3 | CSV Import locators | 1 test | Medium |
