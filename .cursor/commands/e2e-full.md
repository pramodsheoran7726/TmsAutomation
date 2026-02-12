# E2E Full Workflow (Phases 1-13)

Use @docs/e2e_agent/TMS_AGENT.md playbook for the complete workflow.

Framework: TmsAutomation (TypeScript + Playwright Test)

---

## CRITICAL: STOP BETWEEN EVERY PHASE

You MUST complete each phase fully, present results, and **WAIT for explicit user confirmation** before proceeding.

**Rules:**
- ONE phase at a time
- STOP after each phase
- Present results, wait for "proceed" or "yes"
- **DO NOT auto-proceed through phases**

---

## Phase Checklist (all require stops):

### RFC & Test Planning (Phases 1-6) - NO CODE EXPLORATION
| Phase | Action | Stop |
|-------|--------|------|
| 1 | RFC Analysis | Present summary, confirm understanding |
| 3 | Test Case Proposal | Present test cases |
| 4 | Critique & Validation | Present refined cases (>=90% coverage) |
| 5 | TMS Integration | Ask: "Push to TMS?" |
| 6 | Scenario Selection | User selects scenarios |

### Test Automation (Phases 7-13) - CODE EXPLORATION ALLOWED
| Phase | Action | Stop |
|-------|--------|------|
| 7 | Requirement Analysis | Ask clarifying questions |
| 8 | Coverage & Reuse Check | Present findings |
| 9 | Planning & Proposal | Ask: "Should I implement?" |
| 10 | Implementation | Show files created |
| 11 | Agent Reviewer | Show review results |
| 12 | Execution | Show execution results |
| 13 | Reporting | Final summary |

---

## TmsAutomation Structure
```
TmsAutomation/
├── tests/                     # Test specifications (.spec.ts)
│   ├── project/
│   ├── test-case/
│   ├── test-run/
│   └── ...
├── src/
│   ├── pages/                 # Page objects + locators
│   │   ├── MODULE/
│   │   │   ├── MODULE.page.ts
│   │   │   └── MODULE.locators.ts
│   │   └── components/
│   ├── fixtures/              # Playwright custom fixtures
│   │   └── tms.fixture.ts
│   ├── api/                   # REST API client classes
│   ├── config/                # EnvConfig, constants
│   ├── utils/                 # Helpers (base.page.ts, wait.helper.ts, etc.)
│   ├── setup/                 # Auth setup (auth.setup.ts)
│   └── reporters/             # Custom reporters
├── playwright.config.ts
├── hyperexecute.yaml
└── package.json
```

## Execution Command
```bash
npx playwright test --grep @YourTag
```

---

## Input:

{{rfc_or_jira}}
