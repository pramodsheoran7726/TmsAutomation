# E2E Test Agent

Use @docs/e2e_agent/TMS_AGENT.md playbook for full workflow.

Framework: TmsAutomation (TypeScript + Playwright Test)

This command executes the complete E2E test workflow:
- Phase 1-2: RFC/JIRA Analysis & Impact Assessment
- Phase 3: Test Case Proposal (with Playwright spec drafts)
- Phase 4: Multi-Reviewer Critique & Validation
- Phase 5: TMS Integration (optional)
- Phase 6-9: Scenario Selection & Planning
- Phase 10-13: Implementation, Validation & Execution

Test Implementation:
- Test specs: `tests/MODULE/*.spec.ts`
- Page objects: `src/pages/MODULE/MODULE.page.ts`
- Locators: `src/pages/MODULE/MODULE.locators.ts`
- Fixtures: `src/fixtures/tms.fixture.ts`

Execution: `npx playwright test --grep @Tag`

Input (JIRA ticket ID or RFC details):

$ARGUMENTS
