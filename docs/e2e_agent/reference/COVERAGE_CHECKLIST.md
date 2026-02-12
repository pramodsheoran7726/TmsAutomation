# Coverage Checklist

[<- Back to Main](../TMS_AGENT.md)

---

For **EACH requirement**, verify test cases exist for:

## Functional Dimensions

| Dimension | Check | Tag |
|-----------|-------|-----|
| Happy path | Normal use case works | `@smoke` |
| Empty/null inputs | Handles missing data | `@negative` |
| Invalid inputs | Wrong type, format rejected | `@negative` |
| Boundary values | Min, max, just over/under | `@boundary` |
| Special characters | Unicode, emojis, escapes | `@special` |
| Large data volumes | Performance under load | `@performance` |

## State Dimensions

| Dimension | Check | Tag |
|-----------|-------|-----|
| First-time use | Clean state behavior | `@fresh` |
| After previous action | Dirty state handling | `@sequential` |
| Concurrent access | Multiple users/sessions | `@concurrent` |
| After error recovery | Graceful recovery | `@recovery` |
| After system restart | Persistence verified | `@persistence` |

## User Journey Dimensions

| Dimension | Check | Tag |
|-----------|-------|-----|
| New user | Onboarding flow | `@newuser` |
| Power user | Advanced features | `@poweruser` |
| Admin user | Administrative actions | `@admin` |
| Guest user | Limited access | `@guest` |

## Platform Dimensions (LambdaTest Specific)

| Dimension | Check | Environment |
|-----------|-------|-------------|
| US Environment | US datacenter | `TEST_ENV=stage` |
| EU Environment | EU datacenter | `TEST_ENV=eu-stage` |
| Desktop browsers | Chrome, Firefox, Safari, Edge | `@desktop` |
| Mobile browsers | iOS Safari, Android Chrome | `@mobile` |
| Real devices | Physical device testing | `@realdevice` |

## TmsAutomation Tags

### Priority Tags (used in test.describe or test tags array)

```typescript
'@P0'          // Critical - Must pass for release
'@P1'          // High - Major functionality
'@P2'          // Medium - Standard functionality
'@P3'          // Low - Nice to have
```

### Test Type Tags

```typescript
'@smoke'       // Quick sanity check
'@regression'  // Full regression suite
```

### Feature Tags

```typescript
'@project'        // Project management
'@test-case'      // Test case management
'@test-run'       // Test run execution
'@folder'         // Folder operations
'@build'          // Build management
'@configuration'  // Configuration
'@settings'       // Settings
'@report'         // Reports
'@insights'       // Insights
'@milestone'      // Milestones
'@dataset'        // Datasets
'@csv-import'     // CSV import
'@jira'           // Jira integration
'@sdk'            // SDK
'@automation'     // Automation
'@kaneai'         // KaneAI
```

### Using Tags in Test Specs

```typescript
// Priority and feature tags on describe block
test.describe('Project CRUD', { tag: ['@project', '@smoke', '@P0'] }, () => {
  test('should create project', async ({ projectPage }) => { ... });
  test('should delete project', async ({ projectPage }) => { ... });
});

// Additional tags on individual tests
test.describe('Project Validation', { tag: ['@project', '@regression'] }, () => {
  test('should reject empty name', { tag: ['@P1', '@negative'] }, async ({ projectPage }) => { ... });
  test('should handle special characters', { tag: ['@P2', '@special'] }, async ({ projectPage }) => { ... });
});
```

## Coverage Pattern

```typescript
// Happy path - Smoke
test.describe('Feature Name', { tag: ['@smoke', '@P0'] }, () => {
  test('Happy path - creates entity successfully', async ({ modulePage }) => {
    await modulePage.createEntity();
    await expect(modulePage.loc(L.entity)).toBeVisible();
  });
});

// Negative tests - Regression
test.describe('Feature Name - Negative', { tag: ['@regression', '@P1', '@negative'] }, () => {
  test('Invalid input - shows validation error', async ({ modulePage }) => {
    await modulePage.fillForm({ name: '' });
    await modulePage.submitForm();
    await expect(modulePage.loc(L.validationError)).toBeVisible();
  });
});

// Boundary tests - Regression
test.describe('Feature Name - Boundary', { tag: ['@regression', '@P2', '@boundary'] }, () => {
  test('Max length name - accepted', async ({ modulePage }) => {
    await modulePage.fillForm({ name: 'A'.repeat(255) });
    await modulePage.submitForm();
    await expect(modulePage.loc(L.entity)).toBeVisible();
  });

  test('Over max length name - rejected', async ({ modulePage }) => {
    await modulePage.fillForm({ name: 'A'.repeat(256) });
    await modulePage.submitForm();
    await expect(modulePage.loc(L.validationError)).toBeVisible();
  });
});
```

## Coverage Matrix Template

For each feature, fill in this matrix:

| Test Case | Happy | Error | Boundary | US | EU | Desktop | Mobile |
|-----------|-------|-------|----------|----|----|---------|--------|
| TC-001 | x | | | x | x | x | |
| TC-002 | | x | | x | | x | |
| TC-003 | | | x | x | x | x | x |

## Minimum Coverage Requirements

### Smoke Tests (@P0)

- [ ] Primary happy path works
- [ ] Critical error handling
- [ ] Both US and EU environments

### Regression Tests (@P1)

- [ ] All happy paths covered
- [ ] Common error scenarios
- [ ] Input validation

### Full Regression (@P2)

- [ ] All functional dimensions
- [ ] Cross-browser compatibility
- [ ] Data persistence

## Execution Commands

```bash
# Run smoke tests
npx playwright test --grep @smoke

# Run regression tests
npx playwright test --grep @regression

# Run by feature
npx playwright test --grep "@project"
npx playwright test --grep "@test-case"
npx playwright test --grep "@insights"

# Run by priority
npx playwright test --grep "@P0"
npx playwright test --grep "@P0|@P1"

# Combine tags (AND logic)
npx playwright test --grep "(?=.*@smoke)(?=.*@project)"

# Run specific environment
TEST_ENV=stage npx playwright test
TEST_ENV=eu-stage npx playwright test
TEST_ENV=prod npx playwright test --grep @smoke
TEST_ENV=eu-prod npx playwright test --grep @smoke

# Run specific test file
npx playwright test tests/project/project-crud.spec.ts

# Run tests matching file pattern
npx playwright test tests/insights/
```

## Pre-Implementation Checklist

Before writing automation code:

- [ ] Happy path test case exists
- [ ] At least one negative test case exists
- [ ] Boundary conditions identified (if applicable)
- [ ] US and EU environments covered
- [ ] Priority tags assigned (@P0-@P3)
- [ ] Test type tags assigned (@smoke / @regression)
- [ ] Feature tags assigned (@project, @test-case, etc.)
- [ ] Locators verified via Playwright MCP (not assumed)

---

[<- Back to Main](../TMS_AGENT.md)
