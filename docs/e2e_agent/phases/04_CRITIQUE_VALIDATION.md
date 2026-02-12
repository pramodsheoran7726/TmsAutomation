# Phase 4: Critique & Validation

[← Back to Main](../TMS_AGENT.md) | [← Previous: Test Case Proposal](03_TEST_CASE_PROPOSAL.md)

---

## CRITICAL: NO CODEBASE EXPLORATION IN PHASES 1-5

```
┌─────────────────────────────────────────────────────────────────────────┐
│ FORBIDDEN ACTIONS IN THIS PHASE:                                        │
│                                                                         │
│   ❌ Search tests/ for spec files                                       │
│   ❌ Search src/pages/ for page objects                                  │
│   ❌ Search src/utils/ for utilities                                     │
│   ❌ list_dir on code dirs   ❌ read_file on tests   ❌ codebase_search │
│                                                                         │
│ ✅ ALLOWED: Critique test cases based on RFC coverage                   │
│                                                                         │
│ Code exploration unlocked in Phase 8                                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 4: Critique & Validation (STOP after this phase)

**Multi-Reviewer Parallel Critique**: Run **3-4 reviewer personas in parallel**, each evaluating from a different perspective. This ensures comprehensive coverage and surfaces diverse insights efficiently.

---

## COVERAGE CRITERIA DEFINITION (What is 100% Coverage?)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ COVERAGE DIMENSIONS - 100% Coverage Means ALL of These                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ DIMENSION 1: REQUIREMENT COVERAGE (Must be 100%)                        │
│ Every requirement has ≥1 test case that validates it.                   │
│ Formula: (Covered Requirements / Total Requirements) × 100              │
│                                                                         │
│ DIMENSION 2: INPUT SPACE COVERAGE (Must be ≥80%)                        │
│ For each input field/parameter:                                         │
│   ☐ Valid value (happy path)                                           │
│   ☐ Empty/null value                                                   │
│   ☐ Invalid type (string where number expected)                        │
│   ☐ Boundary min/max values                                            │
│   ☐ Special characters / Unicode                                       │
│                                                                         │
│ DIMENSION 3: STATE COVERAGE (Must be ≥80%)                              │
│ For each entity with states:                                            │
│   ☐ Test in each valid state                                           │
│   ☐ Test state transitions (valid and invalid)                         │
│   ☐ Test actions in each state                                         │
│                                                                         │
│ DIMENSION 4: USER JOURNEY COVERAGE (Must be ≥90%)                       │
│ For each critical user flow:                                            │
│   ☐ Complete happy path journey                                        │
│   ☐ Error recovery path                                                │
│   ☐ Alternate paths (if any)                                           │
│                                                                         │
│ DIMENSION 5: REGRESSION COVERAGE (Must be 100% for HIGH severity)       │
│ For each identified regression risk:                                    │
│   ☐ HIGH severity → MUST have test                                     │
│   ☐ MEDIUM severity → SHOULD have test                                 │
│   ☐ LOW severity → MAY have test                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Coverage Score Calculation

```
OVERALL COVERAGE =
  (Requirement Coverage × 0.25) +
  (Input Space Coverage × 0.20) +
  (State Coverage × 0.15) +
  (User Journey Coverage × 0.20) +
  (Pattern Coverage × 0.10) +
  (Regression Coverage × 0.10)

Minimum to proceed: OVERALL ≥ 85%
Minimum for Requirement Coverage: 100%
Minimum for HIGH Regression: 100%
```

---

## Parallel Reviewers (Execute Simultaneously)

| Reviewer | Persona | Focus Area |
|----------|---------|------------|
| **R1** | Senior Test Architect | Technical coverage, test design patterns, maintainability |
| **R2** | Security & Edge Case Specialist | Security vulnerabilities, boundary conditions, error states |
| **R3** | Business/Product Analyst | User journey coverage, acceptance criteria alignment, UX flows |
| **R4** | Performance & Integration Engineer | Load implications, API dependencies, cross-system interactions |
| **R5** | **DEVIL'S ADVOCATE (MANDATORY)** | Challenge all assumptions, find gaps, think adversarially |

---

## R5: DEVIL'S ADVOCATE REVIEWER (MANDATORY)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ DEVIL'S ADVOCATE - Coverage Skeptic & Claim Validator                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ PRIMARY MISSION: QUESTION IF COVERAGE CLAIMS ARE CORRECT                │
│                                                                         │
│ When other reviewers say "95% coverage" - IS THAT TRUE?                 │
│ When they say "all requirements covered" - ARE THEY REALLY?             │
│ When they say "no gaps" - PROVE THEM WRONG.                             │
│                                                                         │
│ REQUIRED ANALYSIS:                                                      │
│                                                                         │
│ 0. VALIDATE COVERAGE CLAIMS (MOST IMPORTANT):                           │
│    - R1 claims 90% → Verify each requirement actually has a test        │
│    - R2 claims "all edge cases" → List edge cases NOT covered           │
│    - R3 claims "journeys complete" → Find incomplete journeys           │
│    - RECALCULATE coverage independently - don't trust other reviewers   │
│                                                                         │
│ 1. COVERAGE SKEPTICISM:                                                 │
│    - For each "100% coverage" claim, list what's NOT covered            │
│    - Calculate actual coverage using strict criteria                    │
│    - Identify dimensions that were completely ignored                   │
│                                                                         │
│ 2. BLIND SPOT IDENTIFICATION:                                           │
│    - What scenarios would a tired developer miss?                       │
│    - What edge cases are "obvious" but not tested?                      │
│    - What happens when things go wrong mid-operation?                   │
│                                                                         │
│ 3. ADVERSARIAL THINKING:                                                │
│    - How would a malicious user abuse this feature?                     │
│    - How would a confused user misuse this feature?                     │
│    - What if the system is in an unexpected state?                      │
│                                                                         │
│ 4. CROSS-FEATURE GAPS:                                                  │
│    - What happens when Feature A and Feature B interact?                │
│    - What if Feature A changes while Feature B is using it?             │
│    - What order-of-operations bugs could exist?                         │
│                                                                         │
│ 5. MISSING NEGATIVE TESTS:                                              │
│    - For every positive test, is there a corresponding negative?        │
│    - What errors should be tested but aren't?                           │
│    - What recovery paths are untested?                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Each Reviewer Evaluates:

### 1. RFC/Requirement Coverage Mapping (CRITICAL)
- List ALL requirements from RFC (e.g., REQ-001, REQ-002, ...)
- Map each test case to requirement(s) it covers
- Calculate coverage %: `(Requirements with ≥1 test) / (Total Requirements) × 100`
- Identify **uncovered requirements** explicitly

### 2. REGRESSION RISK ANALYSIS (CRITICAL - Beyond RFC)

**Reviewers MUST identify regression risks against EXISTING features, not just RFC requirements.**

For EACH identified regression risk, reviewer MUST propose a test case.

### 3. Coverage Analysis (from their perspective)
- Are requirements covered for their focus area?
- What gaps exist in their domain?
- Risk areas specific to their expertise

### 4. Quality Assessment for each test case
- ✅ **Accept**: Test case is well-defined and valuable
- ⚠️ **Modify**: Test case needs refinement (specify what)
- ❌ **Reject**: Test case is redundant, out of scope, or poorly defined
- ➕ **Add**: Missing test cases from their perspective

### 5. Test Steps Review (REQUIRED for TMS)

**Reviewers MUST verify each test case has structured test_steps:**
- Each step has: `step_number`, `action`, `expected_result`
- Steps are sequential and logically ordered
- Expected results are verifiable (not vague)
- No missing steps between action and final outcome

```
✅ GOOD: "Click Login button" → "User is redirected to dashboard"
❌ BAD:  "Login" → "Success" (too vague, missing details)
```

### 6. Gherkin Review (for [A] tests)

**Reviewers MUST verify each automatable test case has a valid Gherkin draft:**
- Steps are clear and reusable
- Parameters are properly defined
- Tags follow naming conventions (@Feature @Priority @Type)
- Gherkin steps align with test_steps

### 7. Priority Recommendation
- Priority adjustments based on their domain expertise
- Risk-based prioritization rationale

---

## Reviewer Output Format (Per Reviewer)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ REVIEWER: [R1/R2/R3/R4/R5] - [Persona Name]                              │
├──────────────────────────────────────────────────────────────────────────┤
│ RFC/REQUIREMENT COVERAGE: 85% (17/20 requirements covered)               │
├──────────────────────────────────────────────────────────────────────────┤
│ REQUIREMENT MAPPING:                                                     │
│   REQ-001 (User Login)      → TC-001, TC-002          ✅ Covered        │
│   REQ-002 (Session Mgmt)    → TC-003                  ✅ Covered        │
│   REQ-003 (Password Reset)  → [NONE]                  ❌ GAP            │
│   REQ-004 (MFA Support)     → TC-005, TC-006          ✅ Covered        │
├──────────────────────────────────────────────────────────────────────────┤
│ REGRESSION RISK ANALYSIS:                                                │
│                                                                          │
│   RISK-001: User Profile Page                                            │
│     Impact: RFC modifies session handling, profile page uses sessions    │
│     Severity: HIGH                                                       │
│     Proposed Test: TC-REG-01 - Verify profile loads after RFC changes    │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ UNCOVERED REQUIREMENTS: REQ-003, REQ-005, REQ-012                        │
│ SUGGESTED TESTS FOR GAPS:                                                │
│   - TC-NEW-01: Password reset happy path (covers REQ-003)                │
│   - TC-NEW-02: Audit log verification (covers REQ-005)                   │
├──────────────────────────────────────────────────────────────────────────┤
│ ACCEPTS: TC-001, TC-003, TC-005                                          │
│ MODIFIES: TC-002 (add null check), TC-006 (expand assertions)            │
│ REJECTS: TC-007 (duplicate of TC-003)                                    │
│ ADDS: TC-NEW-01, TC-NEW-02 (coverage gaps)                               │
├──────────────────────────────────────────────────────────────────────────┤
│ TEST STEPS REVIEW (for TMS):                                             │
│   TC-001: ✅ 4 steps, all have action + expected_result                  │
│   TC-002: ⚠️ Step 3 missing expected_result                              │
│   TC-003: ✅ 5 steps, well structured                                    │
├──────────────────────────────────────────────────────────────────────────┤
│ GHERKIN REVIEW (for Automation):                                         │
│   TC-001: ✅ Steps clear, tags correct                                   │
│   TC-002: ⚠️ Missing assertion step - add "Then error shown"             │
│   TC-003: ✅ Good                                                        │
├──────────────────────────────────────────────────────────────────────────┤
│ PRIORITY CHANGES: TC-004 P2→P1 (critical user path)                      │
├──────────────────────────────────────────────────────────────────────────┤
│ KEY CONCERNS: Missing auth token expiry scenarios                        │
│ CONFIDENCE: 85%                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Synthesis Phase (After Parallel Reviews Complete)

### 1. Aggregated RFC/Requirement Coverage Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│ REQUIREMENT COVERAGE SUMMARY                                            │
├─────────────────────────────────────────────────────────────────────────┤
│ Total Requirements in RFC: 20                                           │
│ Requirements with Test Coverage: 17                                     │
│ Requirements with NO Coverage: 3 (REQ-003, REQ-005, REQ-012)            │
├─────────────────────────────────────────────────────────────────────────┤
│ COVERAGE BY REVIEWER:                                                   │
│   R1 (Test Architect):     85% (17/20)                                  │
│   R2 (Security):           80% (16/20) - flagged 4 security gaps        │
│   R3 (Business/Product):   90% (18/20)                                  │
│   R4 (Performance):        75% (15/20) - flagged 5 perf gaps            │
│   R5 (Devil's Advocate):   72% (verified independently)                 │
├─────────────────────────────────────────────────────────────────────────┤
│ AGGREGATE COVERAGE: 85% (17/20) [Union of all reviewer mappings]        │
│ COVERAGE AFTER ADDING SUGGESTED TESTS: 100% (20/20)                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2. Conflict Resolution Rules

- **Unanimous Accept (5/5)**: Auto-approve
- **Majority Accept (4/5)**: Accept with minority concerns noted
- **Split (2-3/5)**: Escalate to user for decision
- **Majority Reject (4/5)**: Reject with justification
- **Any Security Reject (R2)**: Requires explicit user override
- **Devil's Advocate VETO (R5)**: BLOCKS proceeding - must address gaps first

---

## COVERAGE THRESHOLD CHECK

```
┌─────────────────────────────────────────────────────────────────────────┐
│ COVERAGE THRESHOLDS (ALL MUST PASS)                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ 1. RFC/Requirement Coverage:    ≥90% REQUIRED                           │
│ 2. Regression Coverage (HIGH):  100% REQUIRED (all HIGH risks covered)  │
│ 3. Regression Coverage (MED):   ≥80% RECOMMENDED                        │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ IF RFC Coverage ≥ 90% AND HIGH Regression Coverage = 100%:              │
│   ✅ PROCEED to Phase 5 (TMS Integration)                               │
│                                                                         │
│ IF RFC Coverage < 90%:                                                  │
│   REITERATE: Generate test cases for uncovered requirements             │
│                                                                         │
│ IF HIGH Regression Coverage < 100%:                                     │
│   BLOCK: Generate test cases for ALL uncovered HIGH severity risks      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Final Output: Refined Test Case List

### Coverage Metrics (by Dimension)
```
| Dimension | Claimed | R5 Verified | Target | Status |
|-----------|---------|-------------|--------|--------|
| Requirement Coverage | 100% | 95% | ≥90% | ✅ PASS |
| Input Space Coverage | 85% | 70% | ≥80% | ❌ FAIL |
| State Coverage | 90% | 80% | ≥80% | ✅ PASS |
| User Journey Coverage | 100% | 85% | ≥90% | ❌ FAIL |
| Regression Coverage (HIGH) | 100% | 100% | 100% | ✅ PASS |
```

### Deliverables
- **RFC/Requirement Coverage**: X% (Y/Z requirements) → Target: ≥90%
- **Regression Coverage**: X% (Y/Z risks) → Target: 100% for HIGH severity
- **Devil's Advocate Analysis**: Claimed vs Actual coverage gap
- **Approved Test Cases**: Ready for automation (with Gherkin drafts)
- **Modified Test Cases**: With merged refinements
- **Rejected Test Cases**: With rationale
- **New Test Cases**: Added by reviewers to fill coverage gaps

---

## MANDATORY NEXT STEP: Phase 5 - TMS Integration

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ✅ CRITIQUE PHASE COMPLETE - Coverage requirements met!                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ YOU MUST NOW ASK THE USER ABOUT TMS INTEGRATION:                        │
│                                                                         │
│ "Would you like to push the approved test cases to Test Manager (TMS)?" │
│                                                                         │
│    [Yes] - I will:                                                      │
│            1. Ask for your LambdaTest credentials                       │
│            2. Create a folder in TMS for this RFC                       │
│            3. Push ALL approved test cases (Automatable + Manual-Only)  │
│            4. Report success/failure for each test case                 │
│                                                                         │
│    [No]  - Skip to Phase 6 (Scenario Selection)                         │
│                                                                         │
│ DO NOT SKIP THIS QUESTION - ALWAYS ASK BEFORE PROCEEDING                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**STOP AND ASK** - You MUST ask the user about TMS integration before proceeding.

- **If user says Yes**: → Go to [Phase 5: TMS Integration](05_TMS_INTEGRATION.md)
- **If user says No**: → Go to [Phase 6: Scenario Selection](06_SCENARIO_PLANNING.md)

---

[Next Phase (if Yes to TMS) → TMS Integration](05_TMS_INTEGRATION.md)
[Next Phase (if No to TMS) → Scenario Selection](06_SCENARIO_PLANNING.md)

