# Phase 3: Improvement Plan

> Transform critique findings into a prioritized, phased execution plan with clear scope, effort estimates, and measurable outcomes.

---

## Objective

Create an actionable improvement plan that the user can approve, modify, or partially accept. Every item must have a clear "before → after" and a definition of done.

---

## 🚨 CRITICAL RULES

```
❌ DO NOT make any code changes in this phase.
❌ DO NOT include findings that were VETOED by R5 (unless user overrides).
❌ DO NOT propose changes without concrete before/after examples.
✅ DO group related changes into logical batches.
✅ DO estimate effort for each batch (S/M/L).
✅ DO define measurable success criteria for each item.
✅ DO present the plan as OPTIONAL batches the user can accept/reject independently.
```

---

## Prerequisites

- Phase 2 critique-report.md must be complete and approved
- User must have selected which findings to address

---

## Prioritization Framework

### Priority Matrix (MoSCoW + Impact/Effort)

```
                    HIGH IMPACT
                        │
           ┌────────────┼────────────┐
           │  QUICK WINS │  STRATEGIC │
           │  (Do First) │  (Plan)    │
LOW EFFORT ├────────────┼────────────┤ HIGH EFFORT
           │  FILL-INS  │  DEFER     │
           │  (If Time)  │  (Backlog) │
           └────────────┼────────────┘
                        │
                    LOW IMPACT
```

### Effort Estimation

| Size | Description | Time Estimate |
|------|------------|---------------|
| **S (Small)** | Single file change, <20 lines modified | <15 min |
| **M (Medium)** | 2-5 files, pattern change, <100 lines | 15-45 min |
| **L (Large)** | 5+ files, structural change, new abstractions | 45+ min |
| **XL (Extra Large)** | Framework-wide refactor, migration | Multiple sessions |

### Impact Classification

| Impact | Description |
|--------|------------|
| **CRITICAL** | Prevents test failures, fixes broken patterns |
| **HIGH** | Measurably improves reliability, speed, or maintainability |
| **MEDIUM** | Improves DX, reduces boilerplate, better consistency |
| **LOW** | Cosmetic, nice-to-have, future-proofing |

---

## Plan Structure: Change Batches

Group related changes into **independent batches** that can be executed and validated separately.

### Batch Categories

```
BATCH A: Critical Fixes
  └── Things that are broken or causing failures

BATCH B: Structural Improvements
  └── Architecture, file organization, exports

BATCH C: Test Quality
  └── Flakiness fixes, better assertions, proper waits

BATCH D: Page Object Refinements
  └── Locator quality, method consistency, missing patterns

BATCH E: DX Improvements
  └── Imports, boilerplate reduction, documentation

BATCH F: CI/CD Optimization
  └── Pipeline improvements, caching, parallelism

BATCH G: TypeScript Strictness
  └── Type safety, generics, any elimination

BATCH H: Cleanup
  └── Remove stale files, unused code, outdated docs
```

---

## Plan Template

For each batch:

```markdown
### Batch X: {Name}
**Priority:** QUICK WIN / STRATEGIC / FILL-IN / DEFER
**Effort:** S / M / L / XL
**Impact:** CRITICAL / HIGH / MEDIUM / LOW
**Risk:** LOW (safe) / MEDIUM (needs testing) / HIGH (could break things)

#### Changes
| # | File(s) | Change Description | Before | After |
|---|---------|-------------------|--------|-------|
| 1 | `path/file.ts` | What to change | Current code | New code |

#### Definition of Done
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] TypeScript compiles without errors
- [ ] Existing tests still pass

#### Dependencies
- Depends on: Batch Y (if applicable)
- Blocks: Batch Z (if applicable)

#### Rollback
If this batch causes issues: [rollback instructions]
```

---

## Execution Order

Batches should be ordered by:

1. **Dependencies first** — If Batch B depends on Batch A, A goes first
2. **Quick Wins first** — High impact, low effort changes build momentum
3. **Critical before cosmetic** — Fix what's broken before polishing
4. **Independent batches can parallelize** — User can approve multiple

```
Recommended Order:
  1. Batch A (Critical Fixes) ─────────── must be first
  2. Batch H (Cleanup) ────────────────── remove noise before building
  3. Batch B (Structural) ─────────────── foundation for other changes
  4. Batch C (Test Quality) ───────────── reliability improvements
  5. Batch D (Page Object Refinements) ── consistency
  6. Batch G (TypeScript) ─────────────── type safety
  7. Batch E (DX Improvements) ────────── developer happiness
  8. Batch F (CI/CD Optimization) ─────── pipeline speed
```

---

## Success Metrics

Define measurable before/after metrics:

```markdown
### Metrics Dashboard
| Metric | Current (Phase 1) | Target (Post-Fix) | How to Measure |
|--------|-------------------|-------------------|---------------|
| TypeScript errors | N | 0 | `npx tsc --noEmit` |
| Flaky patterns | N | 0 | Phase 1 scan count |
| Locator resilience | X% | ≥70% | Resilient / Total |
| Import consistency | X% path alias | 100% | Grep for relative imports |
| Test boilerplate | X lines | ≤10 lines | Manual count |
| CI pipeline time | X min | Target min | GitHub Actions timing |
| Unused code | N files | 0 | Scan for dead code |
| Any types | N | 0 | Grep for `: any` |
```

---

## Output: Improvement Plan

Save to `improvement-plan.md`:

```markdown
# Improvement Plan — TMS Automation Framework

## Summary
- Total batches: N
- Quick wins: N (est. X min)
- Strategic: N (est. X min)
- Deferred: N
- Total estimated effort: X hours

## Execution Timeline
| Order | Batch | Effort | Impact | Risk | Status |
|-------|-------|--------|--------|------|--------|
| 1 | A: Critical Fixes | S | CRITICAL | LOW | ⬜ Pending |
| 2 | H: Cleanup | S | MEDIUM | LOW | ⬜ Pending |
| ... |

## Batch Details
[Full details for each batch using the template above]

## Success Metrics
[Before/after metrics table]

## Out of Scope (Deferred)
[Items intentionally deferred with reasons]
```

---

## 🛑 CHECKPOINT

After completing the improvement plan:

1. Display **Summary Table** and **Execution Timeline** in chat
2. Save full plan to `docs/tms-agent/maintenance-agent/runs/{timestamp}/improvement-plan.md`
3. Ask the user:
   - "Here are the improvement batches. Which would you like to execute?"
   - "You can approve all, select specific batches, or modify scope."
4. **STOP and WAIT** for user to approve specific batches before Phase 4
