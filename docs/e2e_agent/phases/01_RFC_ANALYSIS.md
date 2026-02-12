# Phase 1-2: RFC Analysis & Test Impact Analysis

[← Back to Main](../TMS_AGENT.md)

---

> **🚨 NO CODEBASE EXPLORATION** in Phases 1-6. Only read RFC and `docs/product/`. Code exploration unlocks in Phase 8. [See main doc](../TMS_AGENT.md#-critical-no-codebase-exploration-in-phases-1-6-)

---

## Phase 1: RFC/JIRA Analysis (STOP after this phase)

### Input Types

| Input Type | How to Get Details |
|------------|-------------------|
| **RFC Document** | Read file path, URL, or pasted content |
| **JIRA Ticket** | Fetch via MCP server OR user provides details |
| **Confluence Doc** | Fetch via Atlassian MCP `getConfluencePage` tool |
| **GitHub PR** | Fetch via `gh pr view` command |
| **Combined** | Fetch ALL sources, merge for comprehensive analysis |

### If BOTH JIRA Ticket AND Confluence URL are provided

When user provides both (e.g., `KTM-5935 https://site.atlassian.net/wiki/.../pages/123456789/...`):

1. **Fetch ALL sources** - combine content for comprehensive RFC analysis:
    - Use `mcp__atlassian__getConfluencePage` → Get detailed RFC/design doc
    - Use `mcp__atlassian__getJiraIssue` → Get title, description, acceptance criteria, labels

2. **Fetch JIRA comments** for additional context:
    - Include `fields: ["comment"]` in getJiraIssue or check comment field in response
    - Comments often contain: clarifications, edge cases, decisions, blockers, QA notes

3. **Check for linked GitHub PRs** in JIRA:
    - Use `mcp__atlassian__getJiraIssueRemoteIssueLinks` → Get remote links
    - Filter for GitHub PR URLs (containing `github.com` and `/pull/`)
    - For each PR, fetch details: `gh pr view <url> --json title,body,files,commits`

4. **Merge ALL content for test case generation**:
    - **From Confluence**: Technical details, architecture, implementation notes, diagrams
    - **From JIRA Description**: Business requirements, acceptance criteria, user stories
    - **From JIRA Comments**: Clarifications, edge cases, decisions, QA notes, blockers
    - **From GitHub PR**: Code changes, files modified, implementation approach

5. **Store JIRA ticket ID** → Link all created test cases to this ticket in Phase 5

> ✅ This provides the most comprehensive RFC analysis by combining technical specs (Confluence), business requirements (JIRA), discussion context (Comments), and actual code changes (GitHub PR).

### If GitHub PR is linked or provided

**Prerequisites for GitHub PR fetching:**
1. GitHub CLI (`gh`) must be installed: `brew install gh`
2. Must be authenticated: `gh auth login`
3. For private repos, user needs appropriate access

**Fetching PR details using GitHub CLI:**
```bash
gh pr view <pr-url> --json title,body,files,commits,additions,deletions
```

**Alternative - Use GitHub API directly:**
```bash
curl -s "https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}" \
  -H "Authorization: Bearer $GITHUB_TOKEN"
```

**What each field provides:**
| Field | Test Impact |
|-------|-------------|
| `title`, `body` | PR description, context, linked issues |
| `files` | List of changed files → identifies test scope |
| `commits` | Commit messages → implementation details |
| `additions/deletions` | Scope of changes → risk assessment |

**Use PR context to:**
- Identify which components/modules are modified
- Understand implementation approach for edge case testing
- Find files that need regression testing
- Validate test coverage matches code changes

**If `gh` CLI is not available:**
- Ask user to provide PR description and changed files manually
- Or proceed with JIRA + Confluence context only

### If Input is JIRA Ticket (e.g., KTM-5935)

**Option A: With Atlassian MCP Server enabled**
- Use MCP `getJiraIssue` tool to fetch ticket details automatically
- Get: title, description, acceptance criteria, labels, components
- Include `fields: ["comment"]` to get comments

**Option B: Without MCP Server**
- Ask user to provide: JIRA ticket title, description, acceptance criteria, related tickets

> 📝 **Store the JIRA ticket ID** - You'll need it in Phase 5 to link test cases to this ticket.

### JIRA Comments - Why They Matter

JIRA comments often contain critical information not in the description:

| Comment Type | Test Value |
|--------------|------------|
| **Clarifications** | Edge cases, boundary conditions explained by dev/PM |
| **QA Notes** | Previous test findings, known issues, test considerations |
| **Decisions** | Design decisions that affect expected behavior |
| **Blockers/Dependencies** | Integration points, external system considerations |
| **Customer Feedback** | Real-world usage scenarios to test |

**How to fetch comments:**
```
mcp__atlassian__getJiraIssue with fields: ["comment"]
```
Or check the `comment` field in the issue response.

### If Input is Confluence Doc URL

**With Atlassian MCP Server enabled:**

1. **Extract page ID from URL**:
    - URL format: `https://yoursite.atlassian.net/wiki/spaces/SPACE/pages/123456789/Page+Title`
    - Page ID is the numeric part: `123456789`

2. **Fetch page content using MCP**:
   ```
   Use mcp__atlassian__getConfluencePage tool with:
   - cloudId: The site URL or cloud ID (e.g., "yoursite.atlassian.net")
   - pageId: The extracted page ID (e.g., "123456789")
   - contentFormat: "markdown" (default)
   ```

3. **The page content will be returned in markdown format** - use this as the RFC content for analysis.

> 📝 **Store the Confluence page URL** - You can reference it in test case documentation.

---

1. **Read the RFC document OR JIRA ticket** provided by the user.

2. **Extract key information**:
    - Feature/change title and description
    - Technical approach and architecture changes
    - Affected components, services, or modules
    - API changes (new endpoints, modified requests/responses)
    - UI changes (new pages, modified flows, updated components)
    - Database/schema changes
    - Dependencies and integrations affected

3. **Summarize the RFC** in a structured format:
    - What is being built/changed?
    - Why is this change needed?
    - What are the technical boundaries?

**🛑 STOP HERE** - Present your RFC summary. Ask clarifying questions about any ambiguous technical details.

---

## 🎯 Phase 1.5: Product Identification (MANDATORY)

### 🛑 ASK USER: "Which product is this ticket related to?"

After completing Phase 1 (RFC Analysis), you MUST ask the user to identify the product.

**Display this prompt to the user:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🎯 PRODUCT IDENTIFICATION                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Which product is this ticket/RFC related to?                            │
│                                                                         │
│ 📦 Available Products:                                                  │
│                                                                         │
│   1.  SmartUI              - Visual regression testing                  │
│   2.  KaneAI               - AI-powered test generation                 │
│   3.  Test Manager         - Test case management                       │
│   4.  HyperExecute         - Fast test execution platform               │
│   5.  App Automation       - Mobile app testing                         │
│   6.  Web Automation       - Web browser testing                        │
│   7.  Real Device          - Real device testing                        │
│   8.  Real Time            - Real-time browser testing                  │
│   9.  Accessibility        - Accessibility testing                      │
│   10. Integrations         - Third-party integrations                   │
│   11. Insights             - Analytics and reporting                    │
│   12. Testing Locally      - Local testing with Tunnel                  │
│   13. Settings & Security  - Account and security settings              │
│   14. Web Scanner          - Web scanning tools                         │
│   15. Agent to Agent       - Multi-agent communication                  │
│                                                                         │
│ 💡 Recommendation: [Based on RFC keywords/JIRA project]                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 💡 Auto-Recommendation Logic

Based on the RFC/JIRA content, recommend a product using these keywords:

| Keywords in RFC/JIRA | Recommended Product |
|---------------------|---------------------|
| `visual`, `screenshot`, `baseline`, `comparison`, `diff`, `mismatch`, `smartui` | **SmartUI** |
| `ai`, `generate`, `kane`, `nlp`, `natural language`, `test generation` | **KaneAI** |
| `test case`, `test management`, `folder`, `tms`, `test plan` | **Test Manager** |
| `hyperexecute`, `parallel`, `yaml`, `matrix`, `fast execution` | **HyperExecute** |
| `mobile`, `app`, `ios`, `android`, `appium`, `xcuitest`, `espresso` | **App Automation** |
| `selenium`, `webdriver`, `browser`, `playwright`, `cypress` | **Web Automation** |
| `real device`, `physical device`, `device farm` | **Real Device** |
| `live`, `interactive`, `realtime`, `manual testing` | **Real Time** |
| `accessibility`, `wcag`, `a11y`, `screen reader`, `aria` | **Accessibility** |
| `integration`, `ci/cd`, `jenkins`, `github actions`, `slack`, `jira` | **Integrations** |
| `analytics`, `dashboard`, `report`, `metrics`, `insights` | **Insights** |
| `tunnel`, `local`, `localhost`, `firewall`, `private` | **Testing Locally** |
| `settings`, `security`, `sso`, `2fa`, `password`, `team` | **Settings & Security** |
| `scan`, `crawler`, `sitemap`, `url discovery` | **Web Scanner** |

---

### 📂 Product Documentation Reference

After user confirms the product, **read the corresponding folder**:

| # | Product | Folder Path | Main File | Total Files |
|---|---------|-------------|-----------|-------------|
| 1 | **SmartUI** | `docs/product/SmartUI/` | `SmartUIMain.md` | 46 |
| 2 | **KaneAI** | `docs/product/KaneAI/` | `KaneAIMain.md` | 12 |
| 3 | **Test Manager** | `docs/product/TestManager/` | `TestManagerMain.md` | 7 |
| 4 | **HyperExecute** | `docs/product/HyperExecute/` | `HyperExecuteMain.md` | 110 |
| 5 | **App Automation** | `docs/product/AppAutomation/` | `AppAutomationMain.md` | 30 |
| 6 | **Web Automation** | `docs/product/WebAutomation/` | `WebAutomationMain.md` | 8 |
| 7 | **Real Device** | `docs/product/RealDevice/` | `RealDeviceMain.md` | 5 |
| 8 | **Real Time** | `docs/product/RealTime/` | `RealTimeMain.md` | 9 |
| 9 | **Accessibility** | `docs/product/AccessibilityTesting/` | `AccessibilityTestingMain.md` | 11 |
| 10 | **Integrations** | `docs/product/Integrations/` | `IntegrationsMain.md` | 40 |
| 11 | **Insights** | `docs/product/Insights/` | `InsightsMain.md` | 22 |
| 12 | **Testing Locally** | `docs/product/TestingLocally/` | `TestingLocallyMain.md` | 11 |
| 13 | **Settings & Security** | `docs/product/SettingsSecurity/` | `SettingsSecurityMain.md` | 8 |
| 14 | **Web Scanner** | `docs/product/WebScanner/` | `WebScannerMain.md` | 10 |
| 15 | **Agent to Agent** | `docs/product/AgentToAgent/` | `AgentToAgentMain.md` | 5 |

---

### 🔄 Product Folder Iteration Workflow

After user confirms the product, follow these steps:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 📚 PRODUCT DOCUMENTATION WORKFLOW                                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ STEP 1: Read the MAIN file first for product overview                   │
│         → docs/product/<ProductName>/<ProductName>Main.md               │
│                                                                         │
│ STEP 2: List all files in the product folder                            │
│         → Use Glob or Bash to get file list                             │
│                                                                         │
│ STEP 3: Iterate through OTHER files relevant to RFC features            │
│         → Read files that match RFC keywords/features                   │
│         → Build comprehensive understanding of the product              │
│                                                                         │
│ STEP 4: Use this context for Test Impact Analysis (Phase 2)             │
│         → Identify affected features from documentation                 │
│         → Understand dependencies and integrations                      │
│         → Map RFC changes to existing product capabilities              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Example: If user selects "SmartUI"

1. **Read main file first:**
   ```
   docs/product/SmartUI/SmartUIMain.md
   ```

2. **List all files in folder:**
   ```bash
   ls docs/product/SmartUI/
   ```

3. **Read relevant files based on RFC keywords:**
    - If RFC mentions "CLI" → Read `smartui-cli.md`, `smartui-cli-exec.md`
    - If RFC mentions "baseline" → Read `smartui-baseline-management.md`
    - If RFC mentions "comparison" → Read `smart-ui-build-options.md`
    - If RFC mentions "GitHub" → Read `smartui-github-app-integration.md`

Wait for user to confirm the product before proceeding to Phase 2.

**STOP HERE** - Present your RFC summary. Ask clarifying questions about any ambiguous technical details. Wait for user confirmation before proceeding.

---

## Phase 2: Test Impact Analysis (STOP after this phase)

### 📚 MANDATORY: Product-Specific Documentation Review

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 📖 REQUIRED READING FOR REGRESSION ANALYSIS                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Based on the PRODUCT identified in Phase 1, read the relevant docs:     │
│                                                                         │
│ 📦 SmartUI:                                                             │
│    • Read: docs/product/SmartUIProduct.md                               │
│    • Understand: Comparison strategies, Build/Screenshot statuses       │
│    • Check: Project types, API flows, CLI sub-flows                     │
│                                                                         │
│ 📦 KaneAI:                                                              │
│    • Read: docs/product/KANEAI_PUBLIC_DOCS.md                           │
│    • Follow ALL links to relevant features                              │
│                                                                         │
│ 📦 Test Manager:                                                        │
│    • Read: docs/product/TEST_MANAGER.md                                 │
│    • Understand: Test case management, folders, JIRA integration        │
│                                                                         │
│ For each feature RFC touches:                                           │
│    • Read corresponding product docs                                    │
│    • Understand existing behavior                                       │
│    • Identify regression risks                                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Steps:

1. **Identify impact areas** based on RFC and product requirements:
    - **Direct Impact**: Components/features explicitly modified
    - **Indirect Impact**: Components that depend on or integrate with modified areas
    - **Regression Risk**: Existing functionality that could break

2. **EXTENSIVELY cross-reference with product documentation** (NOT codebase):
    - Read `docs/product/KANEAI_PUBLIC_DOCS.md` and **follow ALL links** to relevant features
    - For each feature touched by RFC, open the corresponding public documentation URL
    - **For EACH feature touched by RFC:**
        - Read the corresponding public documentation
        - Identify all related features that could be affected
        - Document existing behavior that must not break
    - ⚠️ Do NOT search `test_scenarios/` or codebase yet - that happens in Phase 8

3. **Map Existing Features to RFC Changes**:

   ```
   | Existing Feature | RFC Change Impact | Regression Risk | Doc Reference |
   |------------------|-------------------|-----------------|---------------|
   | Variables        | Modified syntax   | HIGH            | kane-ai-using-variables |
   | Modules          | Uses variables    | MEDIUM          | kane-ai-modules |
   | Test Runs        | Consumes modules  | LOW             | Test Run docs |
   ```

4. **Categorize by test type needed**:
    - Unit tests (if applicable)
    - Integration tests (API-level)
    - E2E tests (UI flows)
    - Performance/load considerations

5. **Risk assessment**:
    - High risk areas requiring thorough coverage
    - Medium risk areas requiring basic happy path
    - Low risk areas for smoke testing

**🛑 STOP HERE** - Present the impact analysis with:
- List of all documents read
- Regression risk matrix mapped to documentation
- Risk assessment for each identified area

Wait for user confirmation before proposing test cases.

---

## Output Templates

### RFC Summary Template

```
┌─────────────────────────────────────────────────────────────────────────┐
│ RFC SUMMARY                                                             │
├─────────────────────────────────────────────────────────────────────────┤
│ Title: [Feature/Change Name]                                            │
│ Type: [New Feature / Enhancement / Bug Fix / Refactor]                  │
├─────────────────────────────────────────────────────────────────────────┤
│ WHAT: [Brief description of what is being built/changed]                │
│                                                                         │
│ WHY: [Business/technical justification]                                 │
│                                                                         │
│ TECHNICAL BOUNDARIES:                                                   │
│   • [Boundary 1]                                                        │
│   • [Boundary 2]                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│ AFFECTED COMPONENTS:                                                    │
│   • Frontend: [list]                                                    │
│   • Backend: [list]                                                     │
│   • Database: [list]                                                    │
│   • APIs: [list]                                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

### Impact Analysis Template

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TEST IMPACT ANALYSIS                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ DIRECT IMPACT (Must Test):                                              │
│   🔴 [Component 1] - [Reason]                                           │
│   🔴 [Component 2] - [Reason]                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ INDIRECT IMPACT (Should Test):                                          │
│   🟠 [Component 3] - [Dependency on X]                                  │
│   🟠 [Component 4] - [Integration with Y]                               │
├─────────────────────────────────────────────────────────────────────────┤
│ REGRESSION RISK (Smoke Test):                                           │
│   🟡 [Component 5] - [Potential side effect]                            │
└─────────────────────────────────────────────────────────────────────────┘
```

### Risk Matrix Template

```
| Area | Risk Level | Test Depth | Rationale |
|------|------------|------------|-----------|
| [Area 1] | 🔴 HIGH | Thorough | [Critical user path] |
| [Area 2] | 🟠 MEDIUM | Happy Path | [Secondary flow] |
| [Area 3] | 🟡 LOW | Smoke | [Unlikely to break] |
```

---

[Next Phase → Test Case Proposal](03_TEST_CASE_PROPOSAL.md)

