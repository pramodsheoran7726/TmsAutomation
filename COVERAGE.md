# Test Coverage Report — TMS Playwright Automation

## Overview

| Metric | Count |
|--------|-------|
| Total Test Files | 29 |
| Total Test Cases | 39 |
| Smoke Tests (`@smoke`) | 11 |
| Regression Tests (`@regression`) | 39 (all) |
| Page Objects | 19 |
| Total Page Methods | 400+ |
| Environments Supported | 4 (stage, eu-stage, prod, eu-prod) |

---

## Feature Coverage Matrix

| Feature Area | Tests | Smoke | Regression | CRUD | Search | Filter | Bulk Ops | Integration |
|---|---|---|---|---|---|---|---|---|
| Project | 1 | 1 | 1 | Create, Edit, Delete | - | - | - | - |
| Test Case | 2 | 1 | 2 | Create | - | - | - | AI Steps |
| Test Run | 5 | 2 | 5 | Create, Delete | - | - | Duplicate, Archive, Bulk Status | Config, Assignee |
| Folder | 4 | 1 | 4 | Create, Rename, Delete | - | - | Copy, Move, Drag-Drop | Subfolder |
| Build | 1 | 1 | 1 | Create, Edit, Duplicate | - | - | - | History |
| Configuration | 2 | 2 | 2 | Create, Delete | - | - | - | OS/Browser |
| Settings | 5 | 0 | 5 | Create Custom Fields | - | - | - | System Fields |
| Milestone | 3 | 2 | 3 | Create, Edit, Delete | Search | - | - | Test Run |
| Dataset | 1 | 1 | 1 | Create, Manage | - | - | - | - |
| Report | 4 | 0 | 4 | Create | - | Date, Priority, Status, Test Runs | - | - |
| Insights | 2 | 0 | 2 | - | - | - | - | Charts, Labels |
| CSV Import | 1 | 0 | 1 | Import | - | - | - | Field Mapping |
| Module | 2 | 0 | 2 | Create | - | - | - | Insert into TC |
| SDK | 1 | 0 | 1 | - | - | - | - | Step Execution |
| Automation | 1 | 0 | 1 | - | - | - | - | Link TC |
| KaneAI | 1 | 0 | 1 | - | - | - | - | Automate TC |
| Jira Integration | 1 | 0 | 1 | - | - | - | - | TestMu AI |

---

## Detailed Test Coverage by Feature

### 1. Project Management

| Test | What It Covers |
|------|---------------|
| `project-crud.spec.ts` — should create, edit, and delete a project | Create project with tag + description, edit project name, delete project with confirmation |

**Page Methods Covered:** `createProjectWithTagDescription()`, `editProject()`, `deleteProject()`, `verifyProjectDeleted()`, `openProject()`

**Not Covered:** Project filtering by owner/tag, project duplication, project sharing, multi-product linking

---

### 2. Test Case Management

| Test | What It Covers |
|------|---------------|
| `test-case-create.spec.ts` — should create a test case with type, priority, status, and attachment | Create TC, set type/priority/status, upload attachment, add tag |
| `test-case-edit.spec.ts` — should create test steps and verify AI step generation | Create manual steps, trigger AI step generation |

**Page Methods Covered:** `createTestCase()`, `selectTestCaseType()`, `selectPriority()`, `selectTestCaseStatus()`, `selectAutomationStatus()`, `uploadAttachment()`, `addTag()`, `saveChanges()`, `createManualStep()`, `createStepViaAI()`

**Not Covered:** Test case deletion, test case search, test case duplication, bulk test case operations, test case linking

---

### 3. Test Run Management

| Test | What It Covers |
|------|---------------|
| `test-run-crud.spec.ts` — should create a test run without config and assignee | Create basic test run, verify it appears |
| `test-run-crud.spec.ts` — should create and delete a test run | Create test run, add test cases, delete test run |
| `test-run-execute.spec.ts` — should mark test case status in test run | Open test run, mark individual TC status (Pass/Fail/Skip) |
| `test-run-bulk.spec.ts` — should duplicate a test run | Create test run, duplicate it |
| `test-run-bulk.spec.ts` — should archive and reactivate a test run | Archive test run, verify archived state |

**Page Methods Covered:** `createTestRun()`, `openTestRun()`, `addTestCases()`, `markStatus()`, `markBulkStatus()`, `editTestRun()`, `deleteTestRun()`, `archiveTestRun()`, `duplicateTestRun()`, `selectConfiguration()`, `selectAssignee()`

**Not Covered:** Test run filtering, test run status verification with charts, reactivation flow completion

---

### 4. Folder Management

| Test | What It Covers |
|------|---------------|
| `folder-crud.spec.ts` — should create, rename, and delete a folder | Create root folder, create subfolder, rename folder, delete folder |
| `folder-drag-drop.spec.ts` — should drag a folder to reorder | Drag-and-drop folder reordering |
| `copy-move.spec.ts` — should copy test cases between folders | Copy TCs from one folder to another |
| `copy-move.spec.ts` — should move test cases between folders | Move TCs from one folder to another |

**Page Methods Covered:** `createFolder()`, `createSubFolder()`, `renameFolder()`, `deleteFolder()`, `dragDropFolder()`, `copyTestCases()`, `moveTestCases()`

**Not Covered:** Nested folder operations (3+ levels), folder search, folder collapse/expand verification

---

### 5. Build Management

| Test | What It Covers |
|------|---------------|
| `build-crud.spec.ts` — should create, edit, duplicate, and verify build | Create build, edit build, duplicate build, verify build history |

**Page Methods Covered:** `createBuild()`, `editBuild()`, `duplicateBuild()`, `verifyBuildCreated()`, `verifyBuildHistory()`

**Not Covered:** Build deletion, build search, build filtering

---

### 6. Configuration Management

| Test | What It Covers |
|------|---------------|
| `configuration-crud.spec.ts` — should create a Windows web browser configuration | Create config with OS/Browser/Version/Resolution |
| `configuration-crud.spec.ts` — should create and delete a configuration | Create config, delete with confirmation |

**Page Methods Covered:** `createConfiguration()`, `createWindowsConfiguration()`, `deleteConfiguration()`

**Not Covered:** Mac/Linux/Mobile configurations, config editing, config duplication, config filtering by OS/Browser, config in test execution

---

### 7. Settings (System & Custom Fields)

| Test | What It Covers |
|------|---------------|
| `system-fields.spec.ts` — should add values to Priority, Status, and Type fields | Add custom values to system field dropdowns |
| `custom-fields.spec.ts` — should create string and textarea custom fields | String + Textarea field types |
| `custom-fields.spec.ts` — should create number, boolean, date custom fields | Number + Boolean + Date field types |
| `custom-fields.spec.ts` — should create dropdown single select custom field | Dropdown single-select type |
| `custom-fields.spec.ts` — should create URL custom field | URL field type |

**Page Methods Covered:** `openSystemFields()`, `openCustomFields()`, `addValueInPriority()`, `addValueStatus()`, `addValueType()`, `createStringCustomField()`, `createTextareaCustomField()`, `createNumberCustomField()`, `createBooleanCustomField()`, `createDateCustomField()`, `createDropdownSingleCustomField()`, `createUrlCustomField()`

**Not Covered:** Custom field deletion, multi-select dropdown, custom field editing, field validation rules

---

### 8. Milestone Management

| Test | What It Covers |
|------|---------------|
| `milestone-crud.spec.ts` — should create a milestone | Create milestone with details + tag |
| `milestone-crud.spec.ts` — should edit and delete a milestone | Edit name/description, delete milestone |
| `milestone-search-filter.spec.ts` — should search for a milestone | Search milestone by name |
| `milestone-testrun.spec.ts` — should assign a milestone to a test run | Link milestone to test run |

**Page Methods Covered:** `openMilestonesTab()`, `createMilestoneWithDetails()`, `editMilestoneNameAndDescription()`, `deleteMilestone()`, `searchMilestone()`, `selectMilestoneInTestRun()`, `addTagToMilestone()`

**Not Covered:** Milestone progress tracking, milestone completion, milestone end date setting

---

### 9. Dataset Management

| Test | What It Covers |
|------|---------------|
| `dataset-crud.spec.ts` — should create and manage datasets | Create dataset, edit, manage rows |

**Page Methods Covered:** `openDatasetsTab()`, `createDatasetWithDetails()`, `editDatasetDetails()`, `addDatasetRows()`, `verifyDatasetCreated()`

**Not Covered:** Dataset deletion, dataset search, dataset linking to test cases

---

### 10. Reports

| Test | What It Covers |
|------|---------------|
| `report-date-range.spec.ts` — Detailed Execution History report with date range | Date range filter, report generation |
| `report-test-runs.spec.ts` — report with test runs filter | Test runs filter |
| `report-priority-filter.spec.ts` — report with priority filter | Priority filter |
| `report-multiple-filters.spec.ts` — report with priority and status filters | Combined filters |

**Page Methods Covered:** `openReportsTab()`, `startReportCreation()`, `enterReportName()`, `selectDateRangeFilter()`, `selectTestRunsFilter()`, `selectPriorityFilter()`, `selectStatusFilter()`, `clickGenerateReport()`, `verifyReportCreated()`

**Not Covered:** Report export (PDF/CSV), report scheduling, report sharing, report deletion

---

### 11. Insights

| Test | What It Covers |
|------|---------------|
| `insights-validation.spec.ts` — display insights labels and charts | Verify labels + chart sections visible |
| `insights-mixed-status.spec.ts` — verify insights values with mixed statuses | Validate counts with mixed TC statuses |

**Page Methods Covered:** `navigateToInsights()`, `verifyInsightsLabelsVisible()`, `verifyChartSectionsVisible()`, `getTotalTestCases()`, `getManualTestCases()`, `getAutomatedTestCases()`

**Not Covered:** Date range filtering in insights, insights refresh, automation coverage percentage

---

### 12. CSV Import

| Test | What It Covers |
|------|---------------|
| `csv-import.spec.ts` — should import test cases from CSV file | Upload CSV, map fields, preview, import |

**Page Methods Covered:** `uploadCsv()`, `verifyUploadColumns()`, `verifyMapFields()`, `clickPreviewImport()`, `clickImportTestCases()`, `fullCsvImportFlow()`

**Not Covered:** Invalid CSV handling, large file import, duplicate detection

---

### 13. Module Management

| Test | What It Covers |
|------|---------------|
| `module-crud.spec.ts` — should create a module with steps | Create module with name/description/tag + steps |
| `module-crud.spec.ts` — should insert a module into test case | Insert created module into a TC |

**Page Methods Covered:** `clickCreateModule()`, `enterModuleName()`, `addModuleStep()`, `createNewModule()`, `verifyModuleCreated()`, `insertModule()`

**Not Covered:** Module editing, module deletion, module duplication

---

### 14. SDK Execution

| Test | What It Covers |
|------|---------------|
| `sdk-run.spec.ts` — should execute test steps via SDK and mark status | Execute steps via SDK, mark step status |

**Page Methods Covered:** `expandDetails()`, `clickNextStep()`, `markStepStatus()`, `executeTestSteps()`, `finishTestExecution()`

**Not Covered:** SDK session management, remarks, step navigation

---

### 15. Automation Integration

| Test | What It Covers |
|------|---------------|
| `automation-link-tc.spec.ts` — should link a test case from automation dashboard | Link TC from automation dashboard |

**Page Methods Covered:** `openAutomationProject()`, `linkTestCase()`, `verifyTestCaseLinked()`

**Not Covered:** Unlinking TC, searching TC in automation, runtime TC verification

---

### 16. KaneAI Integration

| Test | What It Covers |
|------|---------------|
| `kaneai-automate.spec.ts` — should automate test case with KaneAI | Automate TC with KaneAI |

**Page Methods Covered:** `automateWithKaneai()`, `selectDesktopBrowser()`, `startTesting()`, `approve()`, `saveTestCase()`

**Not Covered:** Mobile app testing, Jira issue verification from KaneAI

---

### 17. Jira Integration

| Test | What It Covers |
|------|---------------|
| `jira-testmu-ai.spec.ts` — should create Jira issue, trigger TestMu AI, and verify response | Create Jira issue, comment with @TestMu AI, verify AI response |

**Page Methods Covered:** Jira API calls, TestMu AI triggering, response verification

**Not Covered:** Jira issue linking to TC, Jira issue status sync

---

## Coverage Gaps Summary

| Gap Area | Description | Priority |
|----------|-------------|----------|
| Negative Testing | No tests for invalid inputs, error handling, or validation messages | High |
| Pagination | No tests for large data sets with pagination | Medium |
| Multi-user | No concurrent user testing or permission-based access | Medium |
| Cross-browser | Tests only run on Chromium (eu-chromium project exists but not actively used) | Medium |
| API-level Tests | Only Jira API and TMS API are tested; no direct API validation for CRUD ops | Medium |
| Data Cleanup | Tests create data but cleanup is inconsistent (orphaned projects/test runs) | Low |
| Accessibility | No accessibility-specific tests | Low |
| Performance | No load/performance tests | Low |
| Mobile Responsive | No mobile viewport tests | Low |

---

## Current Pass Rate

**Last Run (Feb 5, 2026):**

| Status | Count | Percentage |
|--------|-------|------------|
| Passed | 3 | 7.7% |
| Failed | 35 | 89.7% |
| Setup | 1 | 2.6% |

> Most failures are due to **locator mismatches** — the app UI has changed and locators need updating. See `TEST-RESULTS.md` for the full failure analysis.
