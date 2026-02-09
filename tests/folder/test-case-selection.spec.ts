import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Verify Test Case Selection', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should select and deselect test cases using checkboxes', async ({
    page,
    projectPage,
    testCasePage,
    folderPage,
  }) => {
    // Step 1: Create project and open it
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();

    // Step 2: Create 3 test cases
    const tc1 = `AutoTC_Selection_1_${Date.now()}`;
    const tc2 = `AutoTC_Selection_2_${Date.now()}`;
    const tc3 = `AutoTC_Selection_3_${Date.now()}`;
    await testCasePage.createTestCase(tc1);
    await testCasePage.createTestCase(tc2);
    await testCasePage.createTestCase(tc3);

    // Step 3: Select all test cases using select all checkbox
    await page.locator('#all').click();

    // Step 4: Verify selection banner shows count
    await expect.soft(page.locator(`//p[contains(text(),'Test Cases are selected')]`)).toBeVisible();

    // Step 5: Clear selection
    await page.locator(`//span[text()='Clear Selection']`).click();

    // Step 6: Select single test case
    await page.locator(`(//input[@type='checkbox'])[2]`).click();

    // Step 7: Verify selection
    await expect.soft(page.locator(`//p[contains(text(),'Test Cases are selected')]`)).toBeVisible();

    // Step 8: Cleanup
    await projectPage.deleteProject();
  });
});
