import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Verify Test Case Selection', {
  tag: ['@regression', '@folder'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should select and deselect test cases using checkboxes', async ({
    projectOnly,
    page,
    testCasePage,
  }) => {
    // Create 3 test cases — createTestCase already verifies each is visible before returning
    const tc1 = `AutoTC_Selection_1_${Date.now()}`;
    await testCasePage.createTestCase(tc1);
    const tc2 = `AutoTC_Selection_2_${Date.now()}`;
    await testCasePage.createTestCase(tc2);
    const tc3 = `AutoTC_Selection_3_${Date.now()}`;
    await testCasePage.createTestCase(tc3);

    // Select all test cases using select all checkbox
    await page.locator('#all').waitFor({ state: 'attached', timeout: 15000 });
    await page.locator('#all').click();

    // Verify selection banner shows count
    await expect.soft(page.locator(`//p[contains(.,'Test Cases are selected')]`)).toBeVisible({ timeout: 15000 });

    // Clear selection
    await page.locator(`//button[.//*[normalize-space()='Clear Selection']]`).click();
    await expect(page.locator(`//p[contains(.,'Test Cases are selected')]`)).not.toBeVisible({ timeout: 15000 });

    // Select single test case
    await page.locator(`(//input[@type='checkbox'])[2]`).click();

    // Verify selection
    await expect.soft(page.locator(`//p[contains(.,'Test Cases are selected')]`)).toBeVisible({ timeout: 15000 });

    // Navigate away to ensure clean page state before fixture teardown
    await page.goto('about:blank', { waitUntil: 'commit' });
  });
});
