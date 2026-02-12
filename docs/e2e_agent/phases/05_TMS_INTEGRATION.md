# Phase 5: TMS Integration

[← Back to Main](../TMS_AGENT.md) | [← Previous: Critique & Validation](04_CRITIQUE_VALIDATION.md)

---

> **NO CODEBASE EXPLORATION** in Phases 1-6. Only push test cases to TMS. Code exploration unlocks in Phase 8. [See main doc](../TMS_AGENT.md#critical-no-codebase-exploration-in-phases-1-6)

---

## Phase 5: TMS Integration (STOP after this phase)

After test cases are approved in Phase 4 (≥90% coverage), this phase handles pushing test cases to Test Manager (TMS).

### Input Sources Supported

| Input Type | Source | How to Extract Requirements |
|------------|--------|----------------------------|
| **RFC** | RFC document provided by user | Parse RFC sections for requirements |
| **JIRA Ticket** | JIRA ticket ID (e.g., KTM-5935) | Fetch via MCP server OR user provides details |

### JIRA MCP Server

> **With Atlassian MCP Server enabled**: Agent can automatically fetch JIRA ticket details
> **Without MCP Server**: User must provide JIRA ticket details manually

Enable Atlassian MCP server in Cursor settings to allow automatic JIRA ticket fetching.

### JIRA Workflow

When using JIRA ticket as input:
1. **Fetch ticket details** via MCP server (or user provides)
2. **Extract requirements** from title, description, acceptance criteria
3. **Generate & critique test cases** (Phases 1-4)
4. **Create test cases in TMS** (Step 4)
5. **Link JIRA ticket to created test cases** (Step 6)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ CRITICAL: THIS PHASE REQUIRES ACTUAL API EXECUTION                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ You MUST use `run_terminal_cmd` with `network` permission to:           │
│                                                                         │
│   1. Execute curl commands to create folder                             │
│   2. Execute curl commands to create test cases                         │
│   3. **STORE the returned test_case_ids from response**                 │
│   4. Execute curl to link JIRA ticket to test cases (if JIRA input)     │
│   5. Parse API responses and report results                             │
│                                                                         │
│ DO NOT just show the curl commands - ACTUALLY EXECUTE THEM!             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Ask User About TMS Integration

**MANDATORY: Always ask this question after Phase 4 critique passes:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ✅ CRITIQUE PHASE COMPLETE - Coverage requirements met!                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ 📋 Would you like to push the approved test cases to Test Manager?      │
│                                                                         │
│    [Yes] - Create folder and push ALL test cases to TMS                 │
│            (includes both Automatable AND Manual-Only test cases)       │
│                                                                         │
│    [No]  - Skip TMS, proceed to Scenario Selection (Phase 6)            │
│                                                                         │
│ If you choose Yes, please provide:                                      │
│   • Project ID (default: 01KEEB1AS5E9WQ1J2WS0KKXEG1)                    │
│   • Folder name (default: RFC title)                                    │
│                                                                         │
│ Please respond with "Yes" or "No"                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

> **Note**: TMS stores ALL test cases for tracking and reporting purposes.
> Only Automatable [A] test cases proceed to Phase 6+ for automation implementation.
> Manual-Only [M] test cases are tracked in TMS but not automated.

**WAIT FOR USER RESPONSE** - Do NOT proceed until user confirms Yes or No.

- **If No**: Skip to Phase 6 (Scenario Selection)
- **If Yes**: Continue with Steps 2-5 below

---

## Step 2: Get Authentication & Create Folder in TMS

### 2a. Get TMS Credentials

**Credential Resolution Order** (check in sequence, use first found):

#### Priority 1: Check `.env` file

Read the `.env` file in the project root and look for:

```bash
LAMBDATEST_TMS_PROJECT_ID=01K9YWK8MDK69SQH83Z1B4AEMC
LAMBDATEST_TMS_USERNAME=saurabhltqa
LAMBDATEST_TMS_ACCESS_KEY=LT_7ThuPKP7WBfmhyN5JOHPSNJvBwXBoGPrRBD1CnomgMH0X0Z
```

If all three variables are present, use them directly.

#### Priority 2: Ask User (fallback)

Only if credentials are not found in `.env`, ask the user:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TMS AUTHENTICATION REQUIRED                                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ No TMS credentials found in .env                                        │
│                                                                         │
│ To push test cases to Test Manager, please provide:                     │
│                                                                         │
│   • LambdaTest Username: _______________                                │
│   • LambdaTest Access Key: _______________                              │
│   • Project ID: _______________ (default: 01KEEB1AS5E9WQ1J2WS0KKXEG1)  │
│                                                                         │
│ (You can find these at: https://accounts.lambdatest.com/security)       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Credential Resolution Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TMS CREDENTIAL RESOLUTION                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ 1. Check .env file for:                                                 │
│    └─ LAMBDATEST_TMS_PROJECT_ID, LAMBDATEST_TMS_USERNAME,              │
│       LAMBDATEST_TMS_ACCESS_KEY                                         │
│                                                                         │
│ 2. If not found, ask user for credentials                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2b. Create Folder - **EXECUTE THIS API CALL**

**YOU MUST EXECUTE this curl command using `run_terminal_cmd` with `network` permission:**

```bash
curl 'https://test-manager-api.lambdatest.com/api/v1/folder' \
  -H 'accept: application/json' \
  -H 'authorization: Basic <BASE64_ENCODED_USERNAME:ACCESS_KEY>' \
  -H 'content-type: application/json' \
  --data-raw '{
    "folders": [
        {
            "name": "{{RFC_TITLE}}",
            "description": "Test cases generated from RFC: {{RFC_TITLE}}",
            "entity_id": "{{PROJECT_ID}}",
            "entity_type": "project"
        }
    ]
}'
```

**To encode credentials:** `echo -n "username:access_key" | base64`

**Expected Response:**
```json
{
    "message": "Folders created successfully",
    "type": "Success",
    "id": "01KEEBBRDZ5BCB430G9AW3XD3P"
}
```

> **Save the `id` from response** - This is the `folder_id` needed for Step 4.

---

## Step 3: Map Test Case Fields to TMS Format

### Field Mapping Table

**Root-level fields (outside test_cases array):**

| Field | Source | Notes |
|-------|--------|-------|
| `project_id` | User-provided or default | `01KEEB1AS5E9WQ1J2WS0KKXEG1` |
| `folder_id` | From Step 2 API response | Created folder's ID |

**Per-test-case fields (inside test_cases array):**

| TMS Field | Our Test Case Field | Mapping Logic |
|-----------|---------------------|---------------|
| `title` | Test Case Title | Direct copy |
| `description` | Description + Requirement Coverage + Reviewer Decisions | Combine with formatting (see below) |
| `priority` | Priority (P0/P1/P2/P3) | P0→`critical`, P1→`high`, P2→`medium`, P3→`low` |
| `type` | Category | See type mapping below |
| `preconditions` | Preconditions | Direct copy |
| `estimated_time` | Complexity | Simple→`10`, Medium→`30`, Complex→`60` (minutes) |
| `status` | - | Always `"draft"` |
| `tags` | Category + Requirement IDs + Automation Type | Array: `["Category", "REQ-xxx", "Automatable"]` or `["Manual-Only"]` |
| `test_steps` | Steps + Expected Outcomes | Array of step objects (see test_steps format below) |

> **Include ALL test cases**: Both Automatable [A] and Manual-Only [M] test cases go to TMS.
> Add tag `"Automatable"` or `"Manual-Only"` to distinguish them in TMS.

### Type Mapping

| Our Category | TMS Type |
|--------------|----------|
| Functional-Positive | `Functional` |
| Functional-Negative | `Functional` |
| User Journey | `E2E` |
| Edge Case | `Edge Case` |
| Integration | `Integration` |
| Regression | `Regression` |
| Security | `Security` |
| Performance | `Performance` |

### Description Format

Combine metadata fields into the description (steps are now in `test_steps` field):

```
{{DESCRIPTION}}

**Covers Requirements:**
{{REQUIREMENT_IDS}}

**Reviewer Decisions:**
- R1 (Test Architect): {{R1_DECISION}}
- R2 (Security): {{R2_DECISION}}
- R3 (Business): {{R3_DECISION}}
- R4 (Performance): {{R4_DECISION}}
```

### Test Steps Format

> **IMPORTANT**: Steps and expected outcomes must be in the `test_steps` array, NOT in the description!

Each step in the `test_steps` array has the following structure:

| Field | Type | Description |
|-------|------|-------------|
| `test_step_info_id` | string | Unique ID in format `custom-{{UUID}}` |
| `step_type` | string | Always `"step"` |
| `operation` | string | `"ADD"` for new steps |
| `description` | string | Step description in HTML format (e.g., `"<p>Step text</p>"`) |
| `outcome` | string | Expected outcome in HTML format (e.g., `"<p>Expected result</p>"`) |
| `attachments` | array | Empty array `[]` (for future use) |

**Example test_steps array:**
```json
"test_steps": [
    {
        "test_step_info_id": "custom-a3b7b881-d122-496f-89c1-5c4faa907a94",
        "step_type": "step",
        "operation": "ADD",
        "description": "<p>Navigate to login page</p>",
        "outcome": "<p>Login page is displayed</p>",
        "attachments": []
    },
    {
        "test_step_info_id": "custom-b4c8c992-e233-5a70-9ad2-6d5bbb018ba5",
        "step_type": "step",
        "operation": "ADD",
        "description": "<p>Enter {{smart.email}} in email field</p>",
        "outcome": "<p>Email is entered successfully</p>",
        "attachments": []
    },
    {
        "test_step_info_id": "custom-c5d9d003-f344-6b81-0be3-7e6ccc129cb6",
        "step_type": "step",
        "operation": "ADD",
        "description": "<p>Click submit button</p>",
        "outcome": "<p>User is logged in and redirected to dashboard</p>",
        "attachments": []
    }
]
```

**Generating test_step_info_id:**
- Use format: `custom-{{UUID}}`
- Generate a unique UUID for each step
- Example: `custom-a3b7b881-d122-496f-89c1-5c4faa907a94`

---

## Step 4: Create Test Cases in TMS - **EXECUTE API CALL**

**YOU MUST EXECUTE this curl command using `run_terminal_cmd` with `network` permission:**

For each batch of test cases (recommend batches of 10-20):

```bash
curl 'https://test-manager-api.lambdatest.com/api/v1/test-cases' \
  -H 'accept: application/json' \
  -H 'authorization: Basic <BASE64_ENCODED_USERNAME:ACCESS_KEY>' \
  -H 'content-type: application/json' \
  --data-raw '{
    "project_id": "{{PROJECT_ID}}",
    "folder_id": "{{FOLDER_ID}}",
    "test_cases": [
        {
            "title": "{{TC_TITLE}}",
            "description": "{{TC_DESCRIPTION_FORMATTED}}",
            "priority": "{{TC_PRIORITY_MAPPED}}",
            "type": "{{TC_TYPE_MAPPED}}",
            "preconditions": "{{TC_PRECONDITIONS}}",
            "estimated_time": {{TC_ESTIMATED_TIME}},
            "status": "draft",
            "tags": ["{{CATEGORY}}", "{{REQ_ID_1}}", "{{REQ_ID_2}}"],
            "test_steps": [
                {
                    "test_step_info_id": "custom-{{UUID_1}}",
                    "step_type": "step",
                    "operation": "ADD",
                    "description": "<p>{{STEP_1_DESCRIPTION}}</p>",
                    "outcome": "<p>{{STEP_1_EXPECTED}}</p>",
                    "attachments": []
                },
                {
                    "test_step_info_id": "custom-{{UUID_2}}",
                    "step_type": "step",
                    "operation": "ADD",
                    "description": "<p>{{STEP_2_DESCRIPTION}}</p>",
                    "outcome": "<p>{{STEP_2_EXPECTED}}</p>",
                    "attachments": []
                }
            ]
        }
    ]
}'
```

> **Note**: `folder_id` is at the ROOT level (parallel to `project_id`), NOT inside each test case!
> **Note**: `test_steps` contains ALL steps with their expected outcomes. Each step needs a unique `test_step_info_id`.

**EXECUTION CHECKLIST:**
- [ ] Replace `<BASE64_ENCODED_USERNAME:ACCESS_KEY>` with actual encoded credentials
- [ ] Replace `{{PROJECT_ID}}` with user-provided or default project ID
- [ ] Replace `{{FOLDER_ID}}` with ID from Step 2 response (at root level!)
- [ ] Map all test case fields using Step 3 mapping rules
- [ ] **Map test steps to `test_steps` array** (each step needs unique `custom-{{UUID}}` ID)
- [ ] Format step descriptions and outcomes in HTML (e.g., `<p>Step text</p>`)
- [ ] Execute curl command with `run_terminal_cmd` tool (requires `network` permission)
- [ ] **STORE the `test_case_ids` from response** (needed for JIRA linking in Step 6)
- [ ] Parse response to verify success/failure for each test case

### Expected Response (SAVE THE IDs!)

```json
{
    "message": "Test cases created successfully",
    "type": "Success",
    "test_case_ids": [
        "01KEEKNY05CNS47ZA8B783811C",
        "01KEEKNY05CNS47ZA8B783812D",
        "01KEEKNY05CNS47ZA8B783813E"
    ]
}
```

> **CRITICAL**: Store ALL `test_case_ids` from response - you need them for Step 6 (JIRA linking)!

### Example Mapped Test Case

**Original Test Case:**
```
ID: TC-RFC001-01
Title: Valid login with smart variable email
Category: Functional-Positive
Priority: P0
Preconditions: User account exists
Steps: 1. Navigate to login, 2. Enter {{smart.email}}, 3. Click submit
Expected: User logged in successfully
Covers: REQ-001, REQ-002
Complexity: Simple
```

**Mapped to TMS API Payload:**
```json
{
    "project_id": "01KEEB1AS5E9WQ1J2WS0KKXEG1",
    "folder_id": "01KEEBBRDZ5BCB430G9AW3XD3P",
    "test_cases": [
        {
            "title": "Valid login with smart variable email",
            "description": "Verify user can login using smart variable for email.\n\n**Covers Requirements:**\nREQ-001, REQ-002\n\n**Reviewer Decisions:**\n- R1: Accept\n- R2: Accept\n- R3: Accept\n- R4: Accept",
            "priority": "critical",
            "type": "Functional",
            "preconditions": "User account exists",
            "estimated_time": 10,
            "status": "draft",
            "tags": ["Functional-Positive", "REQ-001", "REQ-002", "Automatable"],
            "test_steps": [
                {
                    "test_step_info_id": "custom-a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                    "step_type": "step",
                    "operation": "ADD",
                    "description": "<p>Navigate to login page</p>",
                    "outcome": "<p>Login page is displayed</p>",
                    "attachments": []
                },
                {
                    "test_step_info_id": "custom-b2c3d4e5-f6a7-8901-bcde-f12345678901",
                    "step_type": "step",
                    "operation": "ADD",
                    "description": "<p>Enter {{smart.email}} in email field</p>",
                    "outcome": "<p>Email value is populated</p>",
                    "attachments": []
                },
                {
                    "test_step_info_id": "custom-c3d4e5f6-a7b8-9012-cdef-123456789012",
                    "step_type": "step",
                    "operation": "ADD",
                    "description": "<p>Click submit button</p>",
                    "outcome": "<p>User logged in successfully</p>",
                    "attachments": []
                }
            ]
        }
    ]
}
```

---

## Step 5: Present Results

After API calls complete, present the results:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ✅ TMS INTEGRATION COMPLETE                                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ 📁 Folder Created:                                                      │
│    Name: RFC-Smart-Variables-Enhancement                                │
│    ID: 01KEEBBRDZ5BCB430G9AW3XD3P                                       │
│    Project: 01KEEB1AS5E9WQ1J2WS0KKXEG1                                  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ 📋 Test Cases Created: 70/70 SUCCESS (ALL test cases)                   │
│                                                                         │
│    • Automatable [A]: 66 test cases                                     │
│    • Manual-Only [M]: 4 test cases                                      │
│                                                                         │
│ | # | TC ID    | Title                          | Type | TMS Status |   │
│ |---|----------|--------------------------------|------|------------|   │
│ | 1 | TC-001   | Valid login with credentials   | [A]  | ✅ Created |   │
│ | 2 | TC-002   | Invalid password error         | [A]  | ✅ Created |   │
│ | 3 | TC-003   | Session timeout handling       | [A]  | ✅ Created |   │
│ | 4 | TC-004   | Visual design verification     | [M]  | ✅ Created |   │
│ | 5 | ...      | ...                            | ...  | ...        |   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ 📊 By Priority:                                                         │
│    • P0 (Critical): 20 test cases                                       │
│    • P1 (High): 25 test cases                                           │
│    • P2 (Medium): 18 test cases                                         │
│    • P3 (Low): 7 test cases                                             │
│                                                                         │
│ 🏷️ Tags Applied:                                                        │
│    Functional-Positive, Functional-Negative, User-Journey,              │
│    REQ-001, REQ-002, REQ-003, ...                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### If Any Test Cases Failed

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ⚠️ TMS INTEGRATION PARTIAL SUCCESS                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Test Cases Created: 13/15                                               │
│                                                                         │
│ ❌ FAILED:                                                              │
│    • TC-007: "Title too long" - Error: Title exceeds 255 characters     │
│    • TC-012: "Invalid type" - Error: Type 'Custom' not recognized       │
│                                                                         │
│ Would you like me to fix these and retry? [Yes/No]                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Step 6: Link JIRA Ticket to Test Cases (If JIRA Input)

> **This step is ONLY executed when input was a JIRA ticket, not RFC**

After test cases are created, link the source JIRA ticket to EACH created test case.

### API: Link JIRA Issue to Test Case

**EXECUTE this curl for EACH test case using `run_terminal_cmd` with `network` permission:**

```bash
curl 'https://test-manager-api.lambdatest.com/api/v1/jira' \
  -H 'accept: application/json' \
  -H 'authorization: Basic <BASE64_ENCODED_USERNAME:ACCESS_KEY>' \
  -H 'content-type: application/json' \
  --data-raw '{
    "project_id": "{{PROJECT_ID}}",
    "entity_id": "{{TEST_CASE_ID}}",
    "entity_type": "test_case",
    "platform_issue_id": "2889857:{{JIRA_TICKET_ID}}",
    "platform_issue_link": "{{JIRA_TICKET_ID}}"
}'
```

### Field Mapping

| Field | Value | Notes |
|-------|-------|-------|
| `project_id` | User-provided or default | e.g., `01KEEB1AS5E9WQ1J2WS0KKXEG1` |
| `entity_id` | Test case ID from Step 4 response | e.g., `01KEEKNY05CNS47ZA8B783811C` |
| `entity_type` | `"test_case"` | **Always hardcoded** |
| `platform_issue_id` | `"2889857:{{JIRA_ID}}"` | **2889857 hardcoded** + `:` + JIRA ticket |
| `platform_issue_link` | JIRA ticket ID | e.g., `KTM-5935` |

### Example: Link JIRA KTM-5935 to a Test Case

```bash
curl 'https://test-manager-api.lambdatest.com/api/v1/jira' \
  -H 'accept: application/json' \
  -H 'authorization: Basic eW91cl91c2VybmFtZTp5b3VyX2FjY2Vzc19rZXk=' \
  -H 'content-type: application/json' \
  --data-raw '{
    "project_id": "01KEEB1AS5E9WQ1J2WS0KKXEG1",
    "entity_id": "01KEEKNY05CNS47ZA8B783811C",
    "entity_type": "test_case",
    "platform_issue_id": "2889857:KTM-5935",
    "platform_issue_link": "KTM-5935"
}'
```

### Linking Multiple Test Cases

**You must call this API for EACH test case ID:**

```bash
# Test Case 1
curl 'https://test-manager-api.lambdatest.com/api/v1/jira' \
  -H 'authorization: Basic <AUTH>' \
  -H 'content-type: application/json' \
  --data-raw '{"project_id":"01KEEB1AS5E9WQ1J2WS0KKXEG1","entity_id":"01KEEKNY05CNS47ZA8B783811C","entity_type":"test_case","platform_issue_id":"2889857:KTM-5935","platform_issue_link":"KTM-5935"}'

# Test Case 2
curl 'https://test-manager-api.lambdatest.com/api/v1/jira' \
  -H 'authorization: Basic <AUTH>' \
  -H 'content-type: application/json' \
  --data-raw '{"project_id":"01KEEB1AS5E9WQ1J2WS0KKXEG1","entity_id":"01KEEKNY05CNS47ZA8B783812D","entity_type":"test_case","platform_issue_id":"2889857:KTM-5935","platform_issue_link":"KTM-5935"}'

# ... repeat for all test cases
```

> **Tip**: Run these API calls in parallel for faster execution when linking many test cases.

### Present JIRA Linking Results

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔗 JIRA TICKET LINKED TO TEST CASES                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ JIRA Ticket: KTM-5935                                                   │
│ Platform Issue ID: 2889857:KTM-5935                                    │
│                                                                         │
│ Linking Progress: 70/70 ✅                                              │
│                                                                         │
│ | # | Test Case ID                   | Status      |                    │
│ |---|--------------------------------|-------------|                    │
│ | 1 | 01KEEKNY05CNS47ZA8B783811C     | ✅ Linked   |                    │
│ | 2 | 01KEEKNY05CNS47ZA8B783812D     | ✅ Linked   |                    │
│ | 3 | 01KEEKNY05CNS47ZA8B783813E     | ✅ Linked   |                    │
│ | ... | ...                          | ...         |                    │
│                                                                         │
│ ✅ All 70 test cases now traceable to JIRA KTM-5935 in TMS              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Execution Example

Here's how the agent should execute the API calls:

**Step 1: Encode credentials**
```bash
# Execute this to get base64 encoded auth
echo -n "your_username:your_access_key" | base64
# Output: eW91cl91c2VybmFtZTp5b3VyX2FjY2Vzc19rZXk=
```

**Step 2: Create folder (EXECUTE with network permission)**
```bash
curl -s 'https://test-manager-api.lambdatest.com/api/v1/folder' \
  -H 'accept: application/json' \
  -H 'authorization: Basic eW91cl91c2VybmFtZTp5b3VyX2FjY2Vzc19rZXk=' \
  -H 'content-type: application/json' \
  --data-raw '{
    "folders": [
        {
            "name": "RFC-Smart-Variables",
            "description": "Test cases for Smart Variables Enhancement RFC",
            "entity_id": "01KEEB1AS5E9WQ1J2WS0KKXEG1",
            "entity_type": "project"
        }
    ]
}'
```

**Step 3: Create test cases (EXECUTE with network permission)**
```bash
curl -s 'https://test-manager-api.lambdatest.com/api/v1/test-cases' \
  -H 'accept: application/json' \
  -H 'authorization: Basic eW91cl91c2VybmFtZTp5b3VyX2FjY2Vzc19rZXk=' \
  -H 'content-type: application/json' \
  --data-raw '{
    "project_id": "01KEEB1AS5E9WQ1J2WS0KKXEG1",
    "folder_id": "01KEEBBRDZ5BCB430G9AW3XD3P",
    "test_cases": [
        {
            "title": "TC-SV-001: Valid smart.current_date returns today date",
            "description": "Verify {{smart.current_date}} generates valid date in YYYY-MM-DD format.\n\n**Covers Requirements:**\nAC-1\n\n**Reviewer Decisions:**\n- R1: Accept\n- R2: Accept\n- R3: Accept\n- R4: Accept",
            "priority": "critical",
            "type": "Functional",
            "preconditions": "User is logged into system",
            "estimated_time": 10,
            "status": "draft",
            "tags": ["Functional-Positive", "AC-1", "Automatable"],
            "test_steps": [
                {
                    "test_step_info_id": "custom-d4e5f6a7-b8c9-0123-def0-234567890123",
                    "step_type": "step",
                    "operation": "ADD",
                    "description": "<p>Navigate to smart variables panel</p>",
                    "outcome": "<p>Smart variables panel is displayed</p>",
                    "attachments": []
                },
                {
                    "test_step_info_id": "custom-e5f6a7b8-c9d0-1234-ef01-345678901234",
                    "step_type": "step",
                    "operation": "ADD",
                    "description": "<p>Insert {{smart.current_date}} variable</p>",
                    "outcome": "<p>Variable is inserted successfully</p>",
                    "attachments": []
                },
                {
                    "test_step_info_id": "custom-f6a7b8c9-d0e1-2345-f012-456789012345",
                    "step_type": "step",
                    "operation": "ADD",
                    "description": "<p>Execute the test</p>",
                    "outcome": "<p>Date is generated in YYYY-MM-DD format matching today's date</p>",
                    "attachments": []
                }
            ]
        }
    ]
}'
# Response: {"test_case_ids": ["01KEEKNY05CNS47ZA8B783811C", ...]} ← SAVE THESE!
```

**Step 4: Link JIRA ticket (ONLY if input was JIRA, EXECUTE for EACH test case)**
```bash
# Call this for each test case ID returned from Step 3
curl -s 'https://test-manager-api.lambdatest.com/api/v1/jira' \
  -H 'accept: application/json' \
  -H 'authorization: Basic eW91cl91c2VybmFtZTp5b3VyX2FjY2Vzc19rZXk=' \
  -H 'content-type: application/json' \
  --data-raw '{
    "project_id": "01KEEB1AS5E9WQ1J2WS0KKXEG1",
    "entity_id": "01KEEKNY05CNS47ZA8B783811C",
    "entity_type": "test_case",
    "platform_issue_id": "2889857:KTM-5935",
    "platform_issue_link": "KTM-5935"
}'
```

**REMEMBER: Use `run_terminal_cmd` with `required_permissions: ["network"]`**

---

## TMS API Configuration Reference

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TMS API CONFIGURATION                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Base URL: https://test-manager-api.lambdatest.com/api/v1                │
│                                                                         │
│ Endpoints:                                                              │
│   • POST /folder     - Create folder for test cases                     │
│   • POST /test-cases - Create test cases in batch                       │
│   • POST /jira       - Link JIRA ticket to a test case                  │
│                                                                         │
│ Authentication: Basic Auth                                              │
│   Header: Authorization: Basic <base64(username:token)>                 │
│                                                                         │
│ Default Project ID: 01KEEB1AS5E9WQ1J2WS0KKXEG1                          │
│                                                                         │
│ Valid Priority Values: critical, high, medium, low                      │
│                                                                         │
│ Valid Type Values: Functional, E2E, Regression, Integration,            │
│                    Edge Case, Security, Performance                     │
│                                                                         │
│ Valid Status Values: draft, active, deprecated                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Additional Data (Key-Value Format)

For data that cannot be directly mapped to TMS fields, include in the description or present separately:

```json
{
    "additional_metadata": {
        "rfc_reference": "RFC-Smart-Variables-Enhancement",
        "covers_requirements": ["REQ-001", "REQ-002", "REQ-003"],
        "reviewer_decisions": {
            "R1_Test_Architect": "accept",
            "R2_Security": "accept",
            "R3_Business": "modify - added edge case",
            "R4_Performance": "accept",
            "R5_Devils_Advocate": "no veto"
        },
        "modifications_applied": "Added null check per R3 suggestion",
        "coverage_contribution": "10%",
        "regression_risks_addressed": ["RISK-001", "RISK-003"],
        "critique_iteration": 2,
        "final_coverage": "94%"
    }
}
```

---

**STOP HERE** - After TMS integration:
1. Present folder creation result
2. Present test case creation results (success/failure for each)
3. Show summary statistics
4. Wait for user acknowledgment before proceeding to Phase 6

---

[Next Phase → Scenario Selection & Planning](06_SCENARIO_PLANNING.md)

