# Product Context: LambdaTest Test Manager

> Distilled product knowledge for the maintenance agent.
> Source: `docs/product/TestManager/*.md` (6 files)
> Last updated: 2026-02-13

---

## Product Identity

| Field | Value |
|-------|-------|
| **Product Name** | LambdaTest Test Manager |
| **Product Type** | SaaS (Web Application) |
| **Base URL (Prod)** | `https://test-manager.lambdatest.com` |
| **Base URL (Stage)** | `https://stage-test-manager.lambdatest.com` |
| **API Base URL** | `https://test-manager-api.lambdatest.com/api/v1` |
| **Authentication** | Basic Auth (Base64-encoded `username:access_key`) |
| **Docs Source** | `docs/product/TestManager/` |

---

## Entity Model

```
Organization (top-level tenant)
├── User (Admin / User / Guest)
├── Project
│   ├── Folder (two types: test_case_folder, test_run_folder)
│   │   ├── Test Case
│   │   │   ├── Test Step (Action / Assertion / API / DB / Module / JS)
│   │   │   └── Version (auto-versioned on save, AI commit messages)
│   │   └── [nested Folders]
│   ├── Test Run
│   │   ├── Test Instance (test case + config execution)
│   │   │   └── Artifacts (screenshots, videos, logs, network traces)
│   │   └── Execution Config (concurrency, environment, region, retry)
│   ├── Module (reusable step collections, no nesting)
│   ├── Dataset (Default / Custom, parameters + rows)
│   ├── Milestone (Active / Completed, groups test runs)
│   └── Report (Execution / Traceability / Custom)
├── Variable (org-level or project-level)
└── Secret (org-level or user-level)
```

### Entity Details

| Entity | Key Attributes | States/Types | CRUD via API |
|--------|---------------|-------------|-------------|
| **Organization** | id, name, plan, settings | - | No |
| **User** | id, email, name, role | Active, Inactive, Suspended, Invited | No |
| **Project** | id, name, description, created_at | - | GET list, POST create |
| **Folder** | id, name, path, parent_ref, type | test_case_folder, test_run_folder | POST create, GET list |
| **Test Case** | id, title, description, priority, status, type, tags, version | Unverified, Ready, Faulty, Live, Archived | GET, POST, PUT, DELETE |
| **Test Step** | order, instruction, type, expected_outcome, timeout | Action, Assertion, API, DB, Module, JS | Via Test Case API |
| **Module** | id, name, description, version, tags, steps | Direct-created, KaneAI-authored | Via UI |
| **Test Run** | id, concurrency, environment, region | - | GET, POST, POST execute |
| **Test Instance** | id, test_case_ref, config, duration, result | Passed, Failed, Skipped | Via Test Run API |
| **Dataset** | id, parameters, rows, version | Default (immutable), Custom (editable) | Via UI |
| **Milestone** | id, name, description, tags, owner | Active, Completed | Via UI |
| **Report** | name, type, filters, schedule | Execution, Traceability, Custom | Via UI |

### Test Case Types

| Type | Description | How Created |
|------|-------------|------------|
| **KaneAI Authored** | AI-generated with automation script | KaneAI Agent |
| **Manual Test Steps** | Traditional with manual steps | Manual entry |
| **BDD Scenarios** | Behavior-Driven Development | Manual entry |

### Test Case Priority Values

`critical` | `high` | `medium` | `low`

### Test Case Type Values

`Functional` | `E2E` | `Regression` | `Integration` | `Edge Case` | `Security` | `Performance`

---

## Feature Map

| Feature | URL Path | Key Actions | Business Criticality |
|---------|---------|-------------|---------------------|
| **Projects** | `/projects` | Create, edit, delete, list, search | P0 |
| **Test Cases** | `/test-cases` | Create, edit, delete, list, search, filter, bulk ops, import/export, version history | P0 |
| **Folders** | within projects | Create, rename, delete, move, nest | P0 |
| **Test Runs** | `/test-runs` | Create, configure, execute, monitor, results | P0 |
| **Test Run Execution** | within test runs | Parallel exec, sequential exec, scheduled exec, retry | P0 |
| **Modules** | `/modules` (KaneAI) | Create, edit, version, link to test cases | P1 |
| **Datasets** | within projects | Create, edit, import CSV, AI autofill, link to test cases | P1 |
| **Milestones** | within projects | Create, complete, associate test runs | P1 |
| **Reports** | `/reports` | Execution reports, traceability, export (PDF/CSV/Excel), recurring | P1 |
| **Insights** | `/insights` | Dashboard, historical trends, filters | P1 |
| **Jira Integration** | Settings/Issues tab | Connect, link issues, unlink, bidirectional sync | P1 |
| **ADO Integration** | Settings/Issues tab | Connect, link work items | P2 |
| **GitHub Integration** | Settings | Connect (Beta) | P2 |
| **AI Test Generation** | within test cases | Multi-input (text/image/audio/doc), scenario generation, memory layer | P1 |
| **Settings** | `/settings` | Organization settings, user management, custom fields, custom states | P1 |

---

## Workflow Catalog

### W1: Project Setup (Foundation)

```
Create Project → Add Description/Tags → Configure Settings → Create Folders
```

### W2: Test Case Lifecycle (Core)

```
Create Test Case → Add Steps → Set Priority/Tags → Review → Mark as Ready/Live
                                                         → Version History
                                                         → Link to Jira Issue
```

### W3: Test Run Execution (Core)

```
Create Test Run → Select Test Cases → Configure (concurrency, env, region)
              → Execute (manual trigger / scheduled / API)
              → Monitor Progress → View Results → Generate Report
```

### W4: Data-Driven Testing

```
Create Dataset → Define Parameters → Add Rows (manual/CSV/AI) → Link to Test Case → Execute with Data
```

### W5: AI-Assisted Test Creation

```
Provide Input (text/image/audio/doc/Jira) → AI Generates Scenarios (2-20)
              → Review & Select → Create Test Cases / Create & Automate
```

### W6: Reporting & Analysis

```
Select Report Type → Configure Filters → Generate → Export (PDF/CSV/Excel)
                                                  → Schedule Recurring
                                                  → Email to Recipients
```

### W7: Integration Flow (Jira)

```
Connect Jira → Select Instance → Map Projects → Link Issues to Test Cases/Runs
                                              → Bidirectional Traceability
```

---

## API Reference

### Endpoints

| Endpoint | Method | Purpose | Key Fields |
|----------|--------|---------|-----------|
| `/api/v1/projects` | GET | List projects | - |
| `/api/v1/projects/{id}/folders` | GET | List folders | project_id |
| `/api/v1/folder` | POST | Create folder | name, entity_id, entity_type |
| `/api/v1/test-cases` | POST | Create test cases (batch) | project_id, folder_id, test_cases[] |
| `/api/v1/test-cases/{id}` | GET | Get test case | test_case_id |
| `/api/v1/test-cases/{id}` | PUT | Update test case | test_case_id |
| `/api/v1/test-cases/{id}` | DELETE | Delete test case | test_case_id |
| `/api/v1/test-runs` | POST | Create test run | - |
| `/api/v1/test-runs/{id}` | GET | Get test run | test_run_id |
| `/api/v1/test-runs/{id}/execute` | POST | Execute test run | concurrency, environment, region, retry |
| `/api/v1/test-runs/{id}/results` | GET | Get results | test_run_id |
| `/api/v1/jira` | POST | Link Jira issue | project_id, entity_id, entity_type, platform_issue_id |
| `/api/v1/variables` | POST | Create variable | - |
| `/api/v1/secrets` | POST | Create secret | - |

### Authentication

```
Header: Authorization: Basic <base64(username:access_key)>
Content-Type: application/json
Accept: application/json
```

### Rate Limits

| Tier | Limit |
|------|-------|
| Free | 100 requests/hour |
| Paid | 1,000 requests/hour |
| Enterprise | Custom |

---

## UI Component Patterns

| Component | Description | Where Used | Notes |
|-----------|-------------|-----------|-------|
| **Toast** | Success/error notification (auto-dismisses) | After create/delete/update actions | Must assert quickly before dismiss |
| **Confirmation Dialog** | Modal requiring confirm/cancel | Delete operations, bulk actions | Has confirm and cancel buttons |
| **Data Table** | Paginated list with columns | Projects list, test cases list, test runs list | Supports sorting, filtering |
| **Search Bar** | Text search input | Most list views | Filters list items |
| **Triple-Dot Menu** | Context menu on hover/click | Project cards, test case rows | Actions: edit, delete, move |
| **Folder Tree** | Nested sidebar navigation | Test cases, test runs | Expandable/collapsible |
| **Tag Input** | Multi-tag input field | Test case creation/edit, project creation | Autocomplete from existing tags |
| **Priority Dropdown** | Select priority level | Test case creation/edit | Values: critical, high, medium, low |
| **Status Badge** | Colored status indicator | Test cases, test runs | Shows current state |
| **Rich Text Editor** | Markdown/WYSIWYG editor | Test case description, step details | Supports formatting |
| **Version History Panel** | Side panel with version list | Test case detail view | Shows diffs, commit messages |
| **Drag & Drop** | Reorder items | Test steps, sequential test runs | Handle-based dragging |
| **Bulk Action Bar** | Appears on multi-select | Test case list, test run list | Actions: delete, move, tag |
| **Filter Panel** | Advanced filter sidebar | Test cases, reports | Multiple filter criteria |

### Selector Availability

| Strategy | Available | Notes |
|----------|-----------|-------|
| data-testid | Partial | Available on some newer components, not universal |
| ARIA roles | Partial | Dialog, button, navigation have roles |
| Semantic HTML | Partial | Standard HTML elements used inconsistently |
| XPath text | Common fallback | Many elements only identifiable by text content |

---

## Terminology Glossary

> Code should use these official terms. Aliases should be avoided in naming.

| Official Term | Common Aliases (avoid in code) | Context |
|---------------|-------------------------------|---------|
| **Test Case** | test, tc, scenario, spec | A single test definition with steps |
| **Test Step** | step, action, instruction | One action/assertion within a test case |
| **Test Run** | run, execution, suite, batch | Collection of test cases executed together |
| **Test Instance** | execution result, test result | Specific execution of test case + config |
| **Module** | component, reusable block | Reusable step collection |
| **Dataset** | data set, test data, parameters | Structured data for data-driven testing |
| **Milestone** | release, sprint, phase | Groups test runs for tracking |
| **Folder** | directory, group, category | Organizes test cases or test runs |
| **Project** | workspace, repository | Container for all test assets |
| **Priority** | severity, importance | critical/high/medium/low |
| **Tag** | label, category | Classification metadata |
| **Insights** | analytics, dashboard, metrics | Historical reporting section |
| **KaneAI** | AI agent, bot, copilot | AI test authoring system |
| **HyperExecute** | cloud runner, execution engine | Cloud-based test execution platform |

---

## Constraints & Limits

| Constraint | Value | Impact on Tests |
|-----------|-------|----------------|
| Max test steps per test case | 100 (recommended) | Test data creation should respect this |
| Max step timeout | 300 seconds (5 minutes) | Assertions should use reasonable timeouts |
| Module nesting | Not supported | Cannot reference modules within modules |
| API rate limit (Free) | 100/hour | API setup fixtures must batch efficiently |
| API rate limit (Paid) | 1,000/hour | Sufficient for test setup/teardown |
| Parallel sessions (Pro) | 25 | Test worker count should not exceed this |
| Test Manager seats (Pro) | 25 | - |
| Concurrent execution | Plan-dependent | Configure per test run |

---

## Environment Matrix

| Environment | Base URL | Purpose | Notes |
|------------|---------|---------|-------|
| **Production (US)** | `https://test-manager.lambdatest.com` | Live product | Primary test target |
| **Production (EU)** | `https://test-manager.eu.lambdatest.com` | EU data residency | Same features, EU data |
| **Staging (US)** | `https://stage-test-manager.lambdatest.com` | Pre-release | May have unreleased features |
| **Staging (EU)** | `https://stage-test-manager.eu.lambdatest.com` | EU staging | EU-specific staging |

---

## Integration Points

| Integration | Type | Direction | What It Does |
|-------------|------|-----------|-------------|
| **Jira** | Issue Tracker | Bidirectional | Link test cases/runs to Jira issues |
| **Azure DevOps** | Work Items | Bidirectional | Link to ADO work items |
| **GitHub** | Source Control | One-way (Beta) | PR-triggered testing |
| **HyperExecute** | Execution Engine | Outbound | Execute KaneAI test runs in cloud |
| **KaneAI** | AI Authoring | Inbound | AI-generated test cases and automation |

---

## Known UI Quirks

| Quirk | Where | Impact | Recommended Handling |
|-------|-------|--------|---------------------|
| Toast auto-dismisses | All pages | Assertions on toast must be fast | Use waitFor with short timeout |
| List lazy-loads on scroll | Test case list (large projects) | Items below fold not in DOM initially | Scroll before asserting on lower items |
| Folder tree async load | Test case sidebar | Folders may not be in DOM immediately | Wait for folder tree to load |
| Dialog animation | Confirmation dialogs | Click too fast and dialog not ready | Wait for dialog element visibility |
| Triple-dot menu on hover | Project/test case cards | Menu appears on hover, disappears on mouseout | Hover then immediately interact |
| Search debounce | All search bars | Results don't update instantly | Wait for search results after typing |
| Bulk action bar appears on select | Multi-select in tables | Bar slides in with animation | Wait for bar visibility |
| Version history side panel | Test case detail | Panel slides from right | Wait for panel transition |

---

## Default Test Data

| Item | Value | Usage |
|------|-------|-------|
| Default project ID | `01KEEB1AS5E9WQ1J2WS0KKXEG1` | Internal LTQA testing |
| Platform issue prefix | `2889857` | Jira integration (platform identifier) |

---

*Product context version: 1.0*
*Distilled from 6 source documents in docs/product/TestManager/*
