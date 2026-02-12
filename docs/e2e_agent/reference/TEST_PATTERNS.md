# Test Patterns Guide

[<- Back to Main](../TMS_AGENT.md)

---

Reusable test design patterns for comprehensive coverage in TmsAutomation (TypeScript + Playwright Test).

## Pattern 1: CRUD Pattern

For any entity (project, test case, test run, folder):

| Test | Description | Priority |
|------|-------------|----------|
| TC-1 | Create entity with valid data | P0 |
| TC-2 | Create entity with invalid data (each field) | P1 |
| TC-3 | Read entity after creation | P0 |
| TC-4 | Read non-existent entity (404 handling) | P2 |
| TC-5 | Update entity with valid data | P1 |
| TC-6 | Update entity with invalid data | P2 |
| TC-7 | Delete entity | P1 |
| TC-8 | Delete non-existent entity | P2 |
| TC-9 | Use deleted entity (should fail gracefully) | P2 |

### Playwright Test Implementation

```typescript
import { test, expect } from '../fixtures/tms.fixture.js';
import { EntityLocators as L } from '../pages/entity/entity.locators.js';

test.describe('Entity CRUD Operations', { tag: ['@crud', '@entity'] }, () => {

  test('should create entity with valid data', { tag: ['@P0'] }, async ({ entityPage }) => {
    await test.step('Create entity', async () => {
      await entityPage.createEntity();
    });

    await test.step('Verify entity is visible', async () => {
      await expect(entityPage.loc(L.entityByName(entityPage.entityName))).toBeVisible();
    });
  });

  test('should create entity with invalid data', { tag: ['@P1', '@negative'] }, async ({ entityPage }) => {
    await test.step('Attempt to create entity with empty name', async () => {
      await entityPage.createEntityWithInvalidData('');
    });

    await test.step('Verify validation error', async () => {
      await expect(entityPage.loc(L.validationError)).toBeVisible();
    });
  });

  test('should delete entity', { tag: ['@P1'] }, async ({ entityPage }) => {
    await test.step('Create entity', async () => {
      await entityPage.createEntity();
    });

    await test.step('Delete entity', async () => {
      await entityPage.deleteEntity();
    });

    await test.step('Verify entity is removed', async () => {
      await expect(entityPage.loc(L.entityByName(entityPage.entityName))).not.toBeVisible();
    });
  });
});
```

## Pattern 2: State Machine Pattern

For entities with states (Draft -> Active -> Completed):

| Test | Description | Priority |
|------|-------------|----------|
| TC-1 | Valid state transition (Draft -> Active) | P0 |
| TC-2 | Invalid state transition (Completed -> Draft) | P1 |
| TC-3 | Actions allowed in each state | P1 |
| TC-4 | Actions blocked in each state | P2 |

### Playwright Test Implementation

```typescript
test.describe('Test Run State Transitions', { tag: ['@state-machine', '@test-run'] }, () => {

  test('should transition from Draft to Active', { tag: ['@P0'] }, async ({ testRunPage }) => {
    await test.step('Create test run in Draft state', async () => {
      await testRunPage.createTestRun();
      await expect(testRunPage.loc(L.statusBadge)).toHaveText('Draft');
    });

    await test.step('Start the test run', async () => {
      await testRunPage.startTestRun();
    });

    await test.step('Verify Active state', async () => {
      await expect(testRunPage.loc(L.statusBadge)).toHaveText('Active');
    });
  });

  test('should not allow Completed to Draft transition', { tag: ['@P1', '@negative'] }, async ({ testRunPage }) => {
    await test.step('Create and complete test run', async () => {
      await testRunPage.createAndCompleteTestRun();
      await expect(testRunPage.loc(L.statusBadge)).toHaveText('Completed');
    });

    await test.step('Attempt to reset to Draft', async () => {
      await testRunPage.attemptResetToDraft();
    });

    await test.step('Verify state remains Completed', async () => {
      await expect(testRunPage.loc(L.statusBadge)).toHaveText('Completed');
      await expect(testRunPage.loc(L.errorMessage)).toBeVisible();
    });
  });
});
```

## Pattern 3: List/Pagination Pattern

For lists with filtering, sorting, pagination:

| Test | Description | Priority |
|------|-------------|----------|
| TC-1 | Default list loads correctly | P0 |
| TC-2 | Filter by single criterion | P1 |
| TC-3 | Filter by multiple criteria | P2 |
| TC-4 | Sort ascending | P1 |
| TC-5 | Sort descending | P1 |
| TC-6 | Pagination navigation | P1 |
| TC-7 | Empty list state | P2 |
| TC-8 | Search functionality | P1 |

### Playwright Test Implementation

```typescript
test.describe('Test Cases List and Pagination', { tag: ['@list', '@test-case'] }, () => {

  test('should filter list by status', { tag: ['@P1'] }, async ({ testCasePage }) => {
    await test.step('Apply Active status filter', async () => {
      await testCasePage.filterByStatus('Active');
      await waitForNetworkIdle(testCasePage.page);
    });

    await test.step('Verify all visible items have Active status', async () => {
      const statusElements = testCasePage.loc(L.statusColumn);
      const count = await statusElements.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        await expect.soft(statusElements.nth(i)).toHaveText('Active');
      }
    });
  });

  test('should navigate through pages', { tag: ['@P1'] }, async ({ testCasePage }) => {
    await test.step('Navigate to page 2', async () => {
      await testCasePage.goToPage(2);
      await waitForNetworkIdle(testCasePage.page);
    });

    await test.step('Verify page 2 is active', async () => {
      await expect(testCasePage.loc(L.activePaginationBtn)).toHaveText('2');
    });
  });

  test('should search for test case', { tag: ['@P1'] }, async ({ testCasePage, search }) => {
    await test.step('Search for test case by name', async () => {
      await search.searchFor('Login Test');
    });

    await test.step('Verify search results', async () => {
      await expect(testCasePage.loc(L.testCaseRow)).toHaveCount(1);
      await expect(testCasePage.loc(L.testCaseName)).toContainText('Login Test');
    });
  });
});
```

## Pattern 4: Form Validation Pattern

For forms with multiple fields:

| Test | Description | Priority |
|------|-------------|----------|
| TC-1 | Submit with all valid fields | P0 |
| TC-2 | Submit with empty required field | P1 |
| TC-3 | Submit with invalid format (email, URL) | P1 |
| TC-4 | Field character limit validation | P2 |
| TC-5 | Special characters handling | P2 |
| TC-6 | Form reset functionality | P2 |

### Playwright Test Implementation

```typescript
test.describe('Create Project Form Validation', { tag: ['@form-validation', '@project'] }, () => {

  test('should submit with all valid fields', { tag: ['@P0'] }, async ({ projectPage }) => {
    await test.step('Fill and submit form', async () => {
      await projectPage.fillProjectForm({
        name: projectPage.projectName,
        description: 'Test description',
      });
      await projectPage.submitForm();
    });

    await test.step('Verify success', async () => {
      await expect(projectPage.loc(L.successToast)).toBeVisible();
    });
  });

  test('should show error for empty required name', { tag: ['@P1', '@negative'] }, async ({ projectPage }) => {
    await test.step('Submit form with empty name', async () => {
      await projectPage.fillProjectForm({ name: '', description: 'Test' });
      await projectPage.submitForm();
    });

    await test.step('Verify required field error', async () => {
      await expect(projectPage.loc(L.nameError)).toBeVisible();
      await expect(projectPage.loc(L.nameError)).toContainText('required');
    });
  });

  test('should handle special characters in name', { tag: ['@P2'] }, async ({ projectPage }) => {
    await test.step('Submit form with special characters', async () => {
      await projectPage.fillProjectForm({
        name: 'Project <>&"\'',
        description: 'Special chars test',
      });
      await projectPage.submitForm();
    });

    await test.step('Verify project created with special characters', async () => {
      await expect(projectPage.loc(L.projectHeader)).toContainText('Project <>&"\'');
    });
  });
});
```

## Pattern 5: Permission/Access Control Pattern

For features with role-based access:

| Test | Description | Priority |
|------|-------------|----------|
| TC-1 | Admin can access feature | P0 |
| TC-2 | Regular user access (allowed) | P1 |
| TC-3 | Regular user access (denied) | P1 |
| TC-4 | Guest user restrictions | P2 |

### Playwright Test Implementation

```typescript
test.describe('Role-Based Access Control', { tag: ['@access-control', '@settings'] }, () => {

  test('should allow admin to access admin settings', { tag: ['@P0'] }, async ({ settingsPage }) => {
    await test.step('Navigate to admin settings', async () => {
      await settingsPage.navigateToAdminSettings();
    });

    await test.step('Verify admin controls are visible', async () => {
      await expect(settingsPage.loc(L.adminPanel)).toBeVisible();
      await expect(settingsPage.loc(L.userManagement)).toBeVisible();
    });
  });

  test('should deny regular user access to admin settings', { tag: ['@P1', '@negative'] }, async ({ settingsPage }) => {
    // Assumes test runs with a regular user fixture
    await test.step('Attempt to navigate to admin settings', async () => {
      await settingsPage.navigateToAdminSettings();
    });

    await test.step('Verify access denied', async () => {
      await expect(settingsPage.loc(L.accessDeniedMessage)).toBeVisible();
    });
  });
});
```

## Pattern 6: Clone/Duplicate Pattern

For entities that can be cloned:

| Test | Description | Priority |
|------|-------------|----------|
| TC-1 | Clone entity successfully | P1 |
| TC-2 | Verify cloned data matches original | P1 |
| TC-3 | Cloned entity is independent | P2 |
| TC-4 | Clone with modified name | P2 |

### Playwright Test Implementation

```typescript
test.describe('Entity Cloning', { tag: ['@clone', '@test-case'] }, () => {

  test('should clone entity and verify count increases', { tag: ['@P1'] }, async ({ testCasePage }) => {
    await test.step('Create original entity', async () => {
      await testCasePage.createTestCase();
    });

    const initialCount = await testCasePage.loc(L.testCaseRow).count();

    await test.step('Clone the entity', async () => {
      await testCasePage.cloneTestCase();
      await waitForNetworkIdle(testCasePage.page);
    });

    await test.step('Verify count increased', async () => {
      await expect(testCasePage.loc(L.testCaseRow)).toHaveCount(initialCount + 1);
    });
  });

  test('should verify cloned entity is independent', { tag: ['@P2'] }, async ({ testCasePage }) => {
    await test.step('Create and clone entity', async () => {
      await testCasePage.createTestCase();
      await testCasePage.cloneTestCase();
    });

    await test.step('Modify cloned entity', async () => {
      await testCasePage.editClonedTestCase({ name: 'Modified Clone' });
    });

    await test.step('Verify original is unchanged', async () => {
      await expect(testCasePage.loc(L.testCaseByName(testCasePage.testCaseName))).toBeVisible();
      await expect(testCasePage.loc(L.testCaseByName('Modified Clone'))).toBeVisible();
    });
  });
});
```

## Locator Patterns

TmsAutomation supports two locator approaches. Use Playwright MCP to discover which attributes are available, then choose the right approach.

### Approach 1: Modern Playwright Locators (Preferred for New Code)

Use directly in page object methods when MCP discovers suitable attributes:

```typescript
// In page object methods — no locators file entry needed
// VERIFIED via Playwright MCP: button "Create" [role=button]
await this.page.getByRole('button', { name: 'Create' }).click();

// VERIFIED via Playwright MCP: textbox "Entity Name" [role=textbox]
await this.page.getByLabel('Entity Name').fill(name);

// VERIFIED via Playwright MCP: [data-testid="submit-entity"]
await this.page.getByTestId('submit-entity').click();

// Chaining: button inside a specific row
await this.page.getByRole('row').filter({ hasText: name })
  .getByRole('button', { name: 'Edit' }).click();

// Filtering: visible elements only
await this.page.getByRole('button', { name: 'Save' }).filter({ visible: true }).click();
```

### Approach 2: String Selectors in Locators File (Existing Pattern)

Use when XPath/CSS is the only viable approach or for consistency with existing modules:

```typescript
// src/pages/entity/entity.locators.ts
// ALL locators MUST be verified via Playwright MCP before adding

export const EntityLocators = {
  // VERIFIED via Playwright MCP (2026-02-12) — CSS selectors
  entityList: `.entity-list`,
  entityCount: `.entity-count`,
  statusBadge: `.status-badge`,
  validationError: `.field-error`,

  // VERIFIED via Playwright MCP (2026-02-12) — data-testid
  deleteButton: `[data-testid="delete-entity"]`,

  // VERIFIED via Playwright MCP (2026-02-12) — XPath (when no better attribute)
  cloneButton: `//button[@aria-label='Clone']`,

  // VERIFIED via Playwright MCP (2026-02-12) — Dynamic locators
  entityByName: (name: string) => `//a[text()='${name}']`,
  statusByName: (name: string) => `//tr[contains(.,'${name}')]//span[contains(@class,'status')]`,
} as const;
```

### Using Both in a Page Object

```typescript
import { EntityLocators as L } from './entity.locators.js';

export class EntityPage extends BasePage {
  async createEntity(name: string): Promise<void> {
    await test.step(`Create entity "${name}"`, async () => {
      // Modern: MCP discovered role=button
      await this.page.getByRole('button', { name: 'Create' }).click();

      // Modern: MCP discovered labeled input
      await this.page.getByLabel('Entity Name').fill(name);

      // Existing: complex DOM selector via locators file
      await this.loc(L.descriptionInput).fill('Auto-generated');

      // Modern: MCP discovered data-testid
      await this.page.getByTestId('submit-entity').click();

      await waitForNetworkIdle(this.page);
    });
  }

  async clickEntity(name: string): Promise<void> {
    // Dynamic locator from locators file
    await this.loc(L.entityByName(name)).click();
  }
}
```

### Locator Strategy Decision (based on MCP discovery)

| MCP Discovers | Use | Where |
|--------------|-----|-------|
| ARIA role + accessible name | `page.getByRole('button', { name: '...' })` | Directly in page object |
| `data-testid` attribute | `page.getByTestId('...')` | Directly in page object |
| Label text (form field) | `page.getByLabel('...')` | Directly in page object |
| Placeholder text | `page.getByPlaceholder('...')` | Directly in page object |
| Only CSS/XPath attributes | `this.loc(L.selectorName)` | String in locators file |
| Dynamic content | `L.fn = (val) => \`...\`` | Arrow function in locators file |

## Page Object Template

Page objects extend `BasePage` and encapsulate all interactions with a module's UI. They use `this.page.getByRole()`/`getByTestId()` for modern locators, `loc()` for string selectors, `tpl()` for template locators, and `test.step()` for reporting.

```typescript
// src/pages/entity/entity.page.ts

import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/tms.fixture.js';
import { BasePage } from '../base.page.js';
import { EntityLocators as L } from './entity.locators.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';
import { randomString } from '../../utils/random.helper.js';
import { RANDOM_LENGTH, TIMEOUTS } from '../../config/constants.js';

export class EntityPage extends BasePage {
  entityName = `AutoEntity_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  async createEntity(): Promise<void> {
    await test.step('Create entity', async () => {
      await this.loc(L.createButton).click();
      await this.loc(L.nameInput).fill(this.entityName);
      await this.loc(L.submitButton).click();
      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.entityByName(this.entityName))).toBeVisible();
    });
  }

  async deleteEntity(): Promise<void> {
    await test.step('Delete entity', async () => {
      await this.loc(L.entityByName(this.entityName)).hover();
      await this.loc(L.deleteButton).click();
      await this.loc(L.confirmDeleteButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyEntityVisible(): Promise<void> {
    await test.step('Verify entity is visible', async () => {
      await expect(this.loc(L.entityByName(this.entityName))).toBeVisible({
        timeout: TIMEOUTS.medium,
      });
    });
  }
}
```

## Test Spec Template

```typescript
// tests/entity/entity-crud.spec.ts

import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EntityLocators as L } from '../../src/pages/entity/entity.locators.js';

test.describe('Entity CRUD', { tag: ['@crud', '@entity', '@smoke'] }, () => {

  test('should create and verify entity', { tag: ['@P0'] }, async ({ entityPage }) => {
    await entityPage.createEntity();
    await entityPage.verifyEntityVisible();
  });

  test('should update entity', { tag: ['@P1'] }, async ({ entityPage }) => {
    await entityPage.createEntity();
    await entityPage.updateEntity({ name: 'Updated Name' });
    await expect(entityPage.loc(L.entityByName('Updated Name'))).toBeVisible();
  });

  test('should delete entity', { tag: ['@P1'] }, async ({ entityPage }) => {
    await entityPage.createEntity();
    await entityPage.deleteEntity();
    await expect(entityPage.loc(L.entityByName(entityPage.entityName))).not.toBeVisible();
  });
});
```

---

[<- Back to Main](../TMS_AGENT.md)
