# Phase 3: Test Case Proposal

[← Back to Main](../TMS_AGENT.md) | [← Previous: RFC Analysis](01_RFC_ANALYSIS.md)

---

> **NO CODEBASE EXPLORATION** in Phases 1-6. Only read RFC and `docs/product/`. Code exploration unlocks in Phase 8. [See main doc](../TMS_AGENT.md#critical-no-codebase-exploration-in-phases-1-6)

---

## Step 0: Scenario Classification (MANDATORY FIRST STEP)

Before generating test cases, classify the RFC/scenario into the appropriate test flow:

| Flow Type | Description | When to Use | Key Indicators |
|-----------|-------------|-------------|----------------|
| **Web Automation** | Playwright-based browser testing | Web UI interactions | Click, type, navigate, form submission |
| **API Testing** | REST API validation via Playwright APIRequestContext | Backend API testing | HTTP requests, response validation |

### Classification Decision Tree

```
Is this about API/Backend testing only?
  └─ YES → API Testing Flow
  └─ NO ↓
      Is this about Web UI testing?
        └─ YES → Web Automation Flow (Playwright)
        └─ NO → Discuss with team
```

### Classification Output

Present classification before proceeding:

```
┌──────────────────────────────────────────────────────────────────┐
│ SCENARIO CLASSIFICATION                                          │
├──────────────────────────────────────────────────────────────────┤
│ RFC/Feature: [Feature name]                                      │
│ Classified As: [Web Automation (Playwright) | API Testing]       │
│ Rationale: [Why this classification]                             │
│ Primary Actions: [List key actions]                              │
└──────────────────────────────────────────────────────────────────┘
```

> **STOP** - Confirm classification with user before proceeding to test case generation.

---

## Industry Patterns & LLM Knowledge

For each feature, leverage LLM knowledge of similar products (Selenium, Cypress, Playwright, BrowserStack, SauceLabs):
- What common bugs/issues exist for this feature type?
- What edge cases are typically missed?
- What are industry best practices?

---

## Reference Guides

Use these reference docs when designing test cases:

| Guide | Purpose |
|-------|---------|
| [Assertion Guide](../reference/ASSERTION_GUIDE.md) | **MANDATORY** - Every variable-generating action needs assertion |
| [Coverage Checklist](../reference/COVERAGE_CHECKLIST.md) | Ensure no blind spots across all dimensions |
| [Test Patterns](../reference/TEST_PATTERNS.md) | CRUD, State Machine, Reference, Permission, Async patterns |

---

## Test Case Generation Steps

### Step 1: Extract Requirements from RFC

List all requirements from the RFC:

| Req ID | Description | Type | Priority |
|--------|-------------|------|----------|
| REQ-001 | [requirement] | Functional | P0 |
| REQ-002 | [requirement] | Negative | P1 |

### Step 2: Generate Test Cases

For each requirement, generate test cases covering:
- Functional positive (happy path)
- Functional negative (error cases)
- Edge cases (boundary values)
- User journeys (E2E flows)

Use the [Coverage Checklist](../reference/COVERAGE_CHECKLIST.md) and [Test Patterns](../reference/TEST_PATTERNS.md) for comprehensive coverage.

---

## TEST TYPE CLASSIFICATION: AUTOMATABLE vs MANUAL-ONLY

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    TEST TYPE AUTOMATION MATRIX                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ✅ AUTOMATABLE (TmsAutomation)        📋 MANUAL-ONLY                │
│   ─────────────────────────────          ──────────────────────        │
│   • Functional Positive (Happy Path)     • Behavioral Tests            │
│   • Functional Negative (Error cases)    • Integration Tests           │
│   • User Journeys (E2E flows)            • Security Tests              │
│   • Edge Cases (Boundary values)         • Performance Tests           │
│   • Regression (Existing flows)          • Accessibility Tests         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ Propose ALL test case types for comprehensive coverage!                 │
│    Mark each test case with: [AUTOMATABLE] or [MANUAL-ONLY]            │
│    Only [AUTOMATABLE] tests proceed to Playwright implementation.         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Manual-Only Test Types - Why Not Automatable?

| Test Type | Reason | Recommended Tool/Approach |
|-----------|--------|---------------------------|
| **Behavioral** | Requires human judgment on UX/usability | Manual exploratory testing |
| **Integration** | Cross-system dependencies, complex mocking | Dedicated integration test frameworks |
| **Security** | Penetration testing, vulnerability scanning | SAST/DAST tools (Burp, OWASP ZAP) |
| **Performance** | Load generation, metrics collection | JMeter, k6, Locust |
| **Accessibility** | WCAG compliance, screen reader testing | Axe, WAVE, manual audits |

> **Note:** Manual-only test cases are still valuable for test planning documentation and manual QA checklists. They just won't be converted to Playwright automation.

---

### Step 3: Generate Test Cases with Priority Hierarchy

**PRIORITY HIERARCHY (HIGH → LOW):**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ P0 - CRITICAL (Must have 100% coverage)                                 │
│   ├── Functional Positive (Happy Path): Core functionality works   [A]  │
│   ├── Functional Negative: Error handling, invalid inputs          [A]  │
│   ├── User Journeys: End-to-end critical user flows                [A]  │
│   └── Security: Critical auth, data protection                     [M]  │
├─────────────────────────────────────────────────────────────────────────┤
│ P1 - HIGH (Must have ≥90% coverage)                                     │
│   ├── Edge Cases: Boundary values, empty states, max limits        [A]  │
│   ├── Accessibility: Core WCAG compliance                          [M]  │
│   └── Performance: Key user flows under load                       [M]  │
├─────────────────────────────────────────────────────────────────────────┤
│ P2 - MEDIUM                                                             │
│   ├── Regression Scenarios: Existing flows unaffected              [A]  │
│   ├── Integration: Cross-feature interactions                      [M]  │
│   └── Behavioral: UX consistency, user expectations                [M]  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Legend: [A] = Automatable    [M] = Manual-Only                        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Generate comprehensive test cases (mark each with [A] or [M]):**

**AUTOMATABLE [A]:**
- **Functional Positive (Happy Path)**: Core functionality working as expected [P0]
- **Functional Negative**: Invalid inputs, error handling, permission denials [P0]
- **User Journeys**: Complete end-to-end flows (e.g., signup → login → action → logout) [P0]
- **Edge Cases**: Boundary values, empty states, max limits [P1]
- **Regression Scenarios**: Existing flows that must still work [P2]

**MANUAL-ONLY [M]:**
- **Security**: Authentication bypass, injection attacks, data exposure [P0]
- **Accessibility**: Screen reader, keyboard nav, color contrast [P1]
- **Performance**: Response times, concurrent users, load handling [P1]
- **Integration**: Third-party API interactions, cross-system flows [P2]
- **Behavioral**: UX consistency, intuitive workflows, user expectations [P2]

---

### Step 4: Map Test Cases to Requirements

For each proposed test case, provide:
- Test Case ID (e.g., `TC-RFC001-01`)
- Title (concise description)
- **Covers Requirements** (e.g., `REQ-001, REQ-002`)
- Category (Functional-Positive / Functional-Negative / User-Journey / Edge-Case / Regression / Security / Accessibility / Performance / Integration / Behavioral)
- **Automation Status**: `[A] Automatable` or `[M] Manual-Only`
- Priority (P0-Critical / P1-High / P2-Medium)
- Preconditions
- **Test Steps** (structured: step_number, action, expected_result) - **REQUIRED for TMS**
- Gherkin Scenario (draft) - for automatable tests only
- Expected outcome
- Estimated complexity (Simple / Medium / Complex)

> **Note:** Include ALL test case types for comprehensive coverage. Mark each with `[A]` or `[M]`. Only `[A]` tests will proceed to Playwright implementation.

---

### Step 5: Present as Structured Tables

**Test Cases Table:**

```
| ID | Title | Reqs | Category | Auto | Priority |
|----|-------|------|----------|------|----------|
| TC-001 | Valid login | REQ-001 | Functional-Positive | [A] | P0 |
| TC-002 | Invalid password error | REQ-003 | Functional-Negative | [A] | P0 |
| TC-003 | Full signup to purchase | REQ-001,002 | User Journey | [A] | P0 |
| TC-004 | Delete user account | REQ-004 | Functional-Positive | [A] | P1 |
| TC-005 | SQL injection on login | REQ-006 | Security | [M] | P0 |
| TC-006 | Screen reader navigation | REQ-007 | Accessibility | [M] | P1 |
```

**Coverage Summary:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AUTOMATABLE [A] TESTS                           │
├────────────────────┬────────────┬──────────────┬────────────────────────┤
│ Category           │ Test Count │ Reqs Covered │ Coverage %             │
├────────────────────┼────────────┼──────────────┼────────────────────────┤
│ Functional-Positive│ 5          │ 8/10         │ 80%                    │
│ Functional-Negative│ 4          │ 6/8          │ 75%                    │
│ User Journeys      │ 3          │ 12/15        │ 80%                    │
│ Edge Cases         │ 6          │ 5/7          │ 71%                    │
│ Regression         │ 2          │ 4/5          │ 80%                    │
├────────────────────┼────────────┼──────────────┼────────────────────────┤
│ SUBTOTAL [A]       │ 20         │ 24/30        │ 80%                    │
└────────────────────┴────────────┴──────────────┴────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         MANUAL-ONLY [M] TESTS                           │
├────────────────────┬────────────┬──────────────┬────────────────────────┤
│ Category           │ Test Count │ Reqs Covered │ Recommended Tool       │
├────────────────────┼────────────┼──────────────┼────────────────────────┤
│ Security           │ 3          │ 4/5          │ OWASP ZAP, Burp Suite  │
│ Accessibility      │ 2          │ 3/4          │ Axe, WAVE, Manual      │
│ Performance        │ 2          │ 2/3          │ JMeter, k6, Locust     │
│ Integration        │ 2          │ 3/4          │ Postman, Custom scripts│
│ Behavioral         │ 1          │ 2/2          │ Manual exploratory     │
├────────────────────┼────────────┼──────────────┼────────────────────────┤
│ SUBTOTAL [M]       │ 10         │ 14/18        │ (Manual QA backlog)    │
└────────────────────┴────────────┴──────────────┴────────────────────────┘

TOTAL TEST CASES: 30 (20 Automatable + 10 Manual-Only)
```

---

## Test Case Detail Template

For each test case, use this format:

> **MANDATORY**: If the test case includes any variable-generating actions (API call, JS execution, data extraction), the ASSERTIONS section MUST specify what will be validated.

**AUTOMATABLE TEST EXAMPLE:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│ TEST CASE: TC-RFC001-01                                      [A] AUTO   │
├─────────────────────────────────────────────────────────────────────────┤
│ Title: Valid user login with email and password                         │
│ Category: Functional-Positive                                           │
│ Priority: P0 - Critical                                                 │
│ Complexity: Simple                                                      │
│ Automation: ✅ AUTOMATABLE - Will be implemented in Playwright            │
├─────────────────────────────────────────────────────────────────────────┤
│ COVERS REQUIREMENTS: REQ-001, REQ-002                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ PRECONDITIONS:                                                          │
│   • User account exists in system                                       │
│   • User is not currently logged in                                     │
├─────────────────────────────────────────────────────────────────────────┤
│ TEST STEPS (for TMS):                                                   │
│                                                                         │
│   | # | Action                        | Expected Result                 │
│   |---|-------------------------------|-------------------------------- │
│   | 1 | Navigate to login page        | Login page is displayed         │
│   | 2 | Enter valid email             | Email field populated           │
│   | 3 | Enter valid password          | Password field populated        │
│   | 4 | Click login button            | User redirected to dashboard    │
│   | 5 | Verify welcome message        | Welcome message is displayed    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ GHERKIN SCENARIO (for Automation):                                      │
│                                                                         │
│   @Login @P0 @Smoke                                                     │
│   Scenario: Valid login with email and password                         │
│     Given user is on the login page                                     │
│     When user enters valid email "test@example.com"                     │
│     And user enters valid password "Password123"                        │
│     And user clicks the login button                                    │
│     Then user should be redirected to dashboard                         │
│     And user should see welcome message                                 │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ EXPECTED OUTCOME:                                                       │
│   • User is redirected to dashboard                                     │
│   • User session is created                                             │
│   • Welcome message displayed                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

> **Note**: TEST STEPS are used for TMS integration (Phase 5). GHERKIN SCENARIO is used for automation (Phase 10+). Both should be consistent but serve different purposes.

**AUTOMATABLE TEST EXAMPLE (Variable-Generating Action - WITH ASSERTIONS):**
```
┌─────────────────────────────────────────────────────────────────────────┐
│ TEST CASE: TC-RFC001-08                                      [A] AUTO   │
├─────────────────────────────────────────────────────────────────────────┤
│ Title: API response data is correctly displayed on UI                   │
│ Category: Functional-Positive                                           │
│ Priority: P0 - Critical                                                 │
│ Complexity: Medium                                                      │
│ Automation: ✅ AUTOMATABLE - Includes API call with assertions          │
├─────────────────────────────────────────────────────────────────────────┤
│ COVERS REQUIREMENTS: REQ-API-001 (API Integration)                      │
├─────────────────────────────────────────────────────────────────────────┤
│ VARIABLE-GENERATING ACTIONS:                                            │
│   1. API Call: Get user profile data                                    │
│   2. JS Execution: Parse and validate JSON structure                    │
├─────────────────────────────────────────────────────────────────────────┤
│ TEST STEPS (for TMS):                                                   │
│                                                                         │
│   | # | Action                        | Expected Result                 │
│   |---|-------------------------------|-------------------------------- │
│   | 1 | Login as test user            | User is authenticated           │
│   | 2 | Navigate to profile page      | Profile page loads              │
│   | 3 | Extract user name from UI     | Name is extracted successfully  │
│   | 4 | Verify name matches expected  | Name equals "Test User"         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ MANDATORY ASSERTIONS (for each variable-generating action):             │
│                                                                         │
│   For API response:                                                     │
│     ✅ Assert response status = 200                                     │
│     ✅ Assert response body contains "user_id"                          │
│     ✅ Assert user_name field is not empty                              │
│                                                                         │
│   For extracted data:                                                   │
│     ✅ Assert extracted_name equals expected_name                       │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ EXPECTED OUTCOME:                                                       │
│   • API returns valid user data                                         │
│   • UI displays correct user information                                │
│   • All assertions pass                                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

**MANUAL-ONLY TEST EXAMPLE:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│ TEST CASE: TC-RFC001-10                                      [M] MANUAL │
├─────────────────────────────────────────────────────────────────────────┤
│ Title: SQL injection attack on login form                               │
│ Category: Security                                                      │
│ Priority: P0 - Critical                                                 │
│ Complexity: Medium                                                      │
│ Automation: 📋 MANUAL-ONLY - Requires OWASP ZAP / Burp Suite            │
├─────────────────────────────────────────────────────────────────────────┤
│ COVERS REQUIREMENTS: REQ-SEC-001                                        │
├─────────────────────────────────────────────────────────────────────────┤
│ PRECONDITIONS:                                                          │
│   • Security testing tool configured                                    │
│   • Test environment isolated                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ TEST STEPS (for TMS):                                                   │
│                                                                         │
│   | # | Action                        | Expected Result                 │
│   |---|-------------------------------|-------------------------------- │
│   | 1 | Navigate to login page        | Login page is displayed         │
│   | 2 | Enter SQL injection payload   | Payload entered in email field  │
│   | 3 | Submit form                   | Form is submitted               │
│   | 4 | Analyze response              | No database errors exposed      │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ EXPECTED OUTCOME:                                                       │
│   • Input is sanitized                                                  │
│   • No database errors exposed                                          │
│   • Attack is logged for security monitoring                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

**STOP HERE** - Present all test cases with:
- Requirement mapping for each test case
- Clear `[A]` Automatable or `[M]` Manual-Only markers
- Separate counts for automatable vs manual-only tests
- Draft Gherkin scenarios for automatable tests

Only `[A]` Automatable tests proceed to Playwright implementation. `[M]` Manual-Only tests go to Manual QA backlog.

---

[Next Phase → Critique & Validation](04_CRITIQUE_VALIDATION.md)

