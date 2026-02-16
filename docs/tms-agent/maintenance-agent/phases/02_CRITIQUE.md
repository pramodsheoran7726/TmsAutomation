# Phase 2: Multi-Persona Critique

> Five expert personas analyze the framework from different angles, producing structured critiques that feed into the improvement plan.

---

## Objective

Apply multi-perspective analysis to the scan report findings, uncovering issues that a single viewpoint would miss. Each persona evaluates the framework through their specialized lens, producing actionable critiques with severity ratings.

---

## 🚨 CRITICAL RULES

```
❌ DO NOT make any code changes in this phase.
❌ DO NOT skip any persona — all 5 MUST evaluate.
✅ DO reference specific files and line numbers from the Phase 1 scan.
✅ DO rate every finding by severity (CRITICAL / HIGH / MEDIUM / LOW).
✅ DO provide concrete examples for every critique.
✅ DO run personas in PARALLEL where possible (use Task tool with subagents).
```

---

## Prerequisites

### Full Pipeline Mode
- Phase 1 scan-report.md must be complete and approved
- All scan dimension data must be available (including Dimension 11: Product Domain Alignment)
- Product context from `reference/PRODUCT_CONTEXT.md` must be loaded (Phase 0)

### Review Mode
- Phase 1 review-scan.md must be complete and approved
- Change manifest from `fix-tests-latest/CHANGE_MANIFEST.md` must be loaded
- Product context from `reference/PRODUCT_CONTEXT.md` must be loaded (Phase 0)

---

## The 5 Personas

### R1: Framework Architect

**File:** `personas/framework-architect.md`

**Perspective:** "Is this framework built to scale and maintain?"

**Evaluates:**
| Dimension | What R1 Looks For |
|-----------|------------------|
| **Structure** | Directory organization, separation of concerns, barrel exports |
| **Patterns** | Consistency of POM, fixture patterns, naming conventions |
| **DRY** | Code duplication across tests, pages, utilities |
| **Coupling** | Dependencies between modules, circular imports |
| **Scalability** | Can this handle 200+ tests? 50+ page objects? New environments? |
| **Type Safety** | TypeScript strictness, generic usage, `any` elimination |
| **Product Entity Alignment** | Do page objects mirror the product entity model? Is there a 1:1 mapping between product features and page modules? Are missing page objects flagged? (Reference: PRODUCT_CONTEXT.md Entity Model) |

**R1 Critique Template:**
```markdown
## R1: Framework Architect Critique

### Architecture Assessment
| Area | Current State | Ideal State | Gap Severity |
|------|-------------|-------------|-------------|

### Anti-Patterns Found
1. **[Anti-Pattern Name]**
   - File: `path/to/file.ts:LINE`
   - Current: [code snippet]
   - Problem: [why this is harmful]
   - Severity: CRITICAL / HIGH / MEDIUM / LOW

### Scalability Concerns
1. [Concern with evidence]

### Score: X/10
```

---

### R2: Reliability Engineer

**File:** `personas/reliability-engineer.md`

**Perspective:** "Will these tests pass reliably in CI 100 times in a row?"

**Evaluates:**
| Dimension | What R2 Looks For |
|-----------|------------------|
| **Flakiness** | Race conditions, timing issues, network dependencies |
| **Waits** | Proper wait strategies (explicit vs implicit vs hard waits) |
| **Isolation** | Test independence, no shared mutable state |
| **Cleanup** | Proper teardown, no leftover test data |
| **Retries** | Retry logic quality, retry hiding real bugs |
| **Error Handling** | Graceful failures, useful error messages |
| **CI Stability** | Worker count, timeouts, resource contention |
| **Product Quirk Handling** | Do tests handle Known UI Quirks from PRODUCT_CONTEXT.md? (toast auto-dismiss, search debounce, dialog animations, lazy loading). Are wait strategies aligned with documented product behavior? |

**Flakiness Checklist (MUST check every test file):**
```
□ No page.waitForTimeout() calls (use explicit waits)
□ No bare .click() on dynamic elements (use waitFor first)
□ No assertions without timeouts on async operations
□ No test order dependencies (test A must run before test B)
□ No shared state between test.describe blocks
□ No hardcoded timestamps or dates (use date helpers)
□ No network-dependent assertions without retry
□ Proper use of waitForNetworkIdle / waitForDomReady
□ Fixture cleanup runs even on test failure
□ No floating promises (all awaits present)
```

**R2 Critique Template:**
```markdown
## R2: Reliability Engineer Critique

### Flakiness Risk Map
| Test File | Risk Level | Patterns Found | Impact |
|-----------|-----------|----------------|--------|

### Wait Strategy Assessment
| Pattern | Count | Proper | Improper | Fix Needed |
|---------|-------|--------|----------|-----------|
| waitForTimeout | N | - | N | Replace all |
| waitForNetworkIdle | N | N | N | ... |
| explicit locator wait | N | N | N | ... |

### Isolation Issues
1. [Issue with file:line]

### Score: X/10
```

---

### R3: Developer Experience (DX) Analyst

**File:** `personas/dx-analyst.md`

**Perspective:** "Can a new team member write a test in 30 minutes?"

**Evaluates:**
| Dimension | What R3 Looks For |
|-----------|------------------|
| **Onboarding** | README quality, getting started guide, example tests |
| **Discoverability** | Can you find the right page object / fixture / utility? |
| **Naming** | Are names self-documenting? (files, functions, variables) |
| **Imports** | Clean imports via path aliases? Barrel exports? |
| **IDE Support** | TypeScript IntelliSense, go-to-definition, auto-import |
| **Documentation** | Inline comments where needed, JSDoc for public APIs |
| **Test Authoring** | How many lines of boilerplate to write a new test? |
| **Product Terminology** | Do file names, method names, variable names, and test descriptions use official product terminology from PRODUCT_CONTEXT.md? Can a developer who reads the product docs find the corresponding test code easily? |

**DX Measurement:**
```
New Test Creation Flow:
1. How many files must you know about to write a test?
2. How many imports are needed?
3. How many lines of boilerplate before the first test.step()?
4. Can you discover available page methods via IDE auto-complete?
5. Is the fixture API self-documenting?

Target: ≤5 imports, ≤10 lines boilerplate, full IDE discovery
```

**R3 Critique Template:**
```markdown
## R3: Developer Experience Critique

### Onboarding Assessment
| Step | Current State | Friction Points |
|------|-------------|----------------|
| Clone & setup | ... | ... |
| Run first test | ... | ... |
| Write new test | ... | ... |
| Add page object | ... | ... |

### Import Complexity
| Test File | Import Count | Path Alias Usage | Barrel Export Usage |
|-----------|-------------|-----------------|-------------------|

### Boilerplate Score: X lines per new test (target: ≤10)

### Score: X/10
```

---

### R4: Performance & CI Optimization Specialist

**File:** `personas/performance-specialist.md`

**Perspective:** "Can we cut CI time by 50% without losing coverage?"

**Evaluates:**
| Dimension | What R4 Looks For |
|-----------|------------------|
| **Execution Time** | Slow tests, unnecessary waits, sequential bottlenecks |
| **Parallelization** | Worker utilization, test independence for parallel runs |
| **CI Pipeline** | Workflow duplication, caching, artifact management |
| **Resource Usage** | Browser instances, memory leaks, connection pooling |
| **Smart Execution** | Tag-based selection, affected-area testing, smoke vs regression |
| **Reporting** | Reporter overhead, unnecessary reporters in CI |
| **Product Feature Prioritization** | Are tests for P0 features (from PRODUCT_CONTEXT.md Feature Map) tagged as @smoke? Is CI time proportionally spent on business-critical features? Are rate limits and concurrency constraints from PRODUCT_CONTEXT.md respected in CI config? |

**CI Optimization Checklist:**
```
□ Are workflows DRY (reusable actions/shared steps)?
□ Is dependency caching working (node_modules, Playwright)?
□ Are test artifacts properly sized and retained?
□ Is parallelism maximized (worker count vs available resources)?
□ Are smoke tests truly fast (<5 min)?
□ Is test sharding configured for large suites?
□ Are there any tests that consistently take >60s? Why?
□ Is HyperExecute concurrency optimized?
```

**R4 Critique Template:**
```markdown
## R4: Performance & CI Critique

### Execution Time Analysis
| Test Suite | Current Time | Bottleneck | Potential Savings |
|-----------|-------------|-----------|-----------------|

### CI Pipeline Assessment
| Workflow | Steps | Duplicated Steps | Optimization |
|---------|-------|-----------------|-------------|

### Parallelization Opportunities
1. [Opportunity with evidence]

### Score: X/10
```

---

### R5: Devil's Advocate ⚡ (MANDATORY — Has VETO Power)

**File:** `personas/devils-advocate.md`

**Perspective:** "Everyone else is wrong. Let me prove it."

**Evaluates:**
| Dimension | What R5 Challenges |
|-----------|-------------------|
| **False Positives** | Are other personas over-reporting issues? |
| **Over-Engineering** | Would proposed fixes add unnecessary complexity? |
| **Priorities** | Are we fixing the right things first? |
| **Assumptions** | What assumptions are the other personas making? |
| **Risk** | What's the risk of making these changes vs not? |
| **Blind Spots** | What did everyone else miss? |
| **Domain Assumptions** | Are other personas making incorrect assumptions about the product? Is the product documentation itself potentially stale vs the actual product? Are "coverage gaps" truly gaps, or intentionally not automated? Challenge product-based claims with skepticism. |

**R5 Special Authority:**
```
⚡ VETO POWER: R5 can BLOCK any recommendation if:
  - The fix introduces more complexity than it removes
  - The issue is theoretical, not proven by evidence
  - The change has high risk with low reward
  - There's a simpler alternative everyone missed

⚡ MUST CHALLENGE: R5 MUST push back on at least 3 recommendations
  from other personas. This is not optional — it forces rigor.
```

**R5 Critique Template:**
```markdown
## R5: Devil's Advocate Critique

### Challenges to Other Personas
| Persona | Their Recommendation | My Challenge | Verdict |
|---------|---------------------|-------------|---------|
| R1 | ... | ... | AGREE / OVERRIDE / MODIFY |

### Blind Spots Found
1. [What everyone missed]

### Over-Engineering Warnings
1. [Where proposed fixes would hurt more than help]

### True Priority Ranking (R5's opinion)
1. [What actually matters most, with evidence]

### VETOES
| Recommendation | Reason for Veto | Alternative |
|---------------|----------------|------------|

### Score: X/10
```

---

---

## Review Mode — Persona Prompts

> This section applies ONLY when the agent is invoked via `/maintain review`. Each persona evaluates the specific changes from the fix-tests manifest rather than the whole framework.

### Review Mode Input
Each persona receives:
1. The **change manifest** (`CHANGE_MANIFEST.md`) — what changed, why, and impact
2. The **scoped scan** (`review-scan.md`) — per-file analysis from Phase 1
3. The **actual code diffs** — read each changed file to see the modifications

### R1: Framework Architect — Review Focus

**Review question:** "Do these changes fit the framework's architecture and patterns?"

| Check | What R1 Evaluates |
|-------|-------------------|
| **Pattern consistency** | Do the changes follow the same patterns as the rest of the codebase? (two-file POM, BasePage usage, test.step(), etc.) |
| **Naming alignment** | Are new/changed names consistent with existing conventions? |
| **Import hygiene** | Were imports added/removed cleanly? Any circular dependencies introduced? |
| **Scope creep** | Did the fix stay surgical, or did it introduce unnecessary refactoring? |
| **Type safety** | Are types preserved? Any new `any` types or unsafe assertions? |

### R2: Reliability Engineer — Review Focus

**Review question:** "Will these changes be reliable in CI, or did they introduce flakiness?"

| Check | What R2 Evaluates |
|-------|-------------------|
| **Wait strategies** | Are new/modified waits using proper patterns (explicit waits, not hardcoded timeouts)? |
| **Flaky patterns** | Do the changes introduce any anti-patterns (bare clicks, missing waitFor, race conditions)? |
| **Test isolation** | Do the changes maintain test independence? No shared state introduced? |
| **Cleanup preserved** | If fixtures were changed, does cleanup still run on failure? |
| **Regression coverage** | Were enough dependent tests re-verified? Are there untested dependents? |

### R3: DX Analyst — Review Focus

**Review question:** "Are these changes readable and maintainable by the team?"

| Check | What R3 Evaluates |
|-------|-------------------|
| **Readability** | Can a newcomer understand the changes within 30 seconds? |
| **Comments** | Are complex changes explained with WHY comments? |
| **Consistency** | Does the code style match surrounding code (formatting, naming, structure)? |
| **Product terminology** | Do changes use official product terms from PRODUCT_CONTEXT.md? |
| **Discoverability** | If new methods/locators were added, are they discoverable via IDE? |

### R4: Performance Specialist — Review Focus

**Review question:** "Do these changes affect test execution speed or resource usage?"

| Check | What R4 Evaluates |
|-------|-------------------|
| **Wait overhead** | Do new waits add unnecessary execution time? |
| **Network calls** | Were unnecessary API calls or page navigations added? |
| **Selector performance** | Are new locators efficient (data-testid > complex XPath)? |
| **CI impact** | Could these changes affect parallel execution or worker utilization? |

### R5: Devil's Advocate — Review Focus

**Review question:** "What's wrong with these changes that nobody else noticed?"

| Check | What R5 Challenges |
|-------|-------------------|
| **Root cause validity** | Did fix-tests actually fix the root cause, or just the symptom? |
| **Hidden regressions** | Could these changes break tests that weren't in the dependency analysis? |
| **Simpler alternative** | Is there a simpler fix that was overlooked? |
| **Strict mode compliance** | Did fix-tests actually follow its own strict mode rules? (no data reduction, no coverage loss, no skipped tests) |
| **Manifest accuracy** | Does the change manifest accurately reflect what was actually changed? Diff the files to verify. |

**R5 VETO in Review Mode:**
```
⚡ R5 can VETO the changes if:
  - The root cause was misidentified (symptom fix, not real fix)
  - Strict mode was violated (data removed, assertions weakened)
  - The change manifest is inaccurate or incomplete
  - A simpler fix exists that was overlooked
  - Hidden regression risk is high and untested
```

### Review Mode Critique Output

Save to `review-critique.md`:

```markdown
# Review Critique — Fix-Tests Changes

## Persona Verdicts
| Persona | Verdict | Key Concern | Score |
|---------|---------|-------------|-------|
| R1: Framework Architect | APPROVE / FLAG / REJECT | ... | X/10 |
| R2: Reliability Engineer | APPROVE / FLAG / REJECT | ... | X/10 |
| R3: DX Analyst | APPROVE / FLAG / REJECT | ... | X/10 |
| R4: Performance Specialist | APPROVE / FLAG / REJECT | ... | X/10 |
| R5: Devil's Advocate | APPROVE / VETO | ... | X/10 |

## Overall Review Score: X/50 (X%)

## Detailed Findings
### Concerns (must address)
1. [Finding with file:line, persona who raised it]

### Suggestions (nice to have)
1. [Finding with file:line, persona who raised it]

### VETOES (if any)
| R5 Veto | Reason | Alternative Proposed |
|---------|--------|---------------------|

## Final Verdict: APPROVED / APPROVED WITH NOTES / CHANGES REQUESTED / ESCALATED
```

### 🛑 CHECKPOINT (Review Mode)

After completing the review critique:
1. Display **Persona Verdicts** table and **Final Verdict** in chat
2. Save to `docs/tms-agent/maintenance-agent/runs/{timestamp}/review-critique.md`
3. If verdict is **CHANGES REQUESTED** or **ESCALATED**, present specific action items
4. If verdict is **APPROVED** or **APPROVED WITH NOTES**, inform the user the changes are verified
5. **STOP** — review mode is complete (no Phase 4/5 needed)

---

## Full Pipeline Mode — Critique Aggregation

## Critique Aggregation

After all 5 personas complete their reviews:

### Step 1: Compile All Findings
```
Merge all findings into a unified list with:
- Finding ID (F-001, F-002, ...)
- Description
- File(s) affected
- Persona(s) who flagged it
- Severity (CRITICAL / HIGH / MEDIUM / LOW)
- Agreement count (how many personas agree?)
```

### Step 2: Consensus Matrix
```
| Finding | R1 | R2 | R3 | R4 | R5 | Consensus | Final Severity |
|---------|----|----|----|----|-----|-----------|---------------|
| F-001 | ✅ | ✅ | - | - | ✅ | 3/5 | HIGH |
| F-002 | ✅ | - | ✅ | - | ⚡VETO | VETOED | DROPPED |
```

### Step 3: Resolve Conflicts
```
- 5/5 agree → CRITICAL (act immediately)
- 4/5 agree → HIGH (plan for next sprint)
- 3/5 agree → MEDIUM (address when touching that area)
- R5 VETO → DROPPED (unless 4 other personas override with evidence)
- R5 VETO + 2 others disagree → ESCALATE to human
```

### Step 4: Final Severity Distribution
```
Target distribution (healthy framework):
- CRITICAL: 0-2 findings
- HIGH: 3-8 findings
- MEDIUM: 5-15 findings
- LOW: unlimited
```

---

## Output: Critique Report

Save to `critique-report.md`:

```markdown
# Critique Report — TMS Automation Framework

## Persona Scores
| Persona | Score | Critical | High | Medium | Low | Vetoes |
|---------|-------|----------|------|--------|-----|--------|
| R1: Framework Architect | X/10 | N | N | N | N | - |
| R2: Reliability Engineer | X/10 | N | N | N | N | - |
| R3: DX Analyst | X/10 | N | N | N | N | - |
| R4: Performance Specialist | X/10 | N | N | N | N | - |
| R5: Devil's Advocate | X/10 | N | N | N | N | N |

## Overall Framework Score: X/50 (X%)

## Consensus Findings (sorted by severity)
### CRITICAL
1. [Finding with evidence, affected files, persona agreement]

### HIGH
1. ...

### MEDIUM
1. ...

### VETOED (with reasons)
1. ...

## Improvement Priority Stack (top 10)
| Rank | Finding | Effort | Impact | ROI |
|------|---------|--------|--------|-----|
| 1 | ... | S/M/L | HIGH | ★★★ |
```

---

## 🛑 CHECKPOINT

After completing the critique report:

1. Display **Persona Scores**, **Overall Score**, and **Top 10 Priority Stack** in chat
2. Save full report to `docs/tms-agent/maintenance-agent/runs/{timestamp}/critique-report.md`
3. Ask the user: "Which findings would you like to address? Select from the priority stack or add your own."
4. **STOP and WAIT** for user selection before proceeding to Phase 3
