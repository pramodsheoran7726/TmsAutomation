# E2E Automation Phase

Use @docs/e2e_agent/TMS_AGENT.md playbook starting from Phase 7 (Requirement Analysis).

Skip Phases 1-6 (RFC Analysis, Test Case Proposal, Critique, TMS Integration, Scenario Selection).

Framework: TmsAutomation (TypeScript + Playwright Test)

Automate the following test scenarios in the TmsAutomation framework:
- Create test specs in `tests/MODULE/`
- Create page objects in `src/pages/MODULE/MODULE.page.ts`
- Create locators in `src/pages/MODULE/MODULE.locators.ts`
- Register fixtures in `src/fixtures/tms.fixture.ts` if needed

Execute tests using: `npx playwright test --grep @Tag`

{{scenarios}}
