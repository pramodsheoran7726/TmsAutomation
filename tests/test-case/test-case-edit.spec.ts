import path from 'path';
import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { TEST_DATA, TIMEOUTS } from '../../src/config/constants.js';
import { TestCaseLocators as L } from '../../src/pages/test-case/test-case.locators.js';

test.describe('Test Case Edit', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Test Case Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should edit test case with fields, attachment, tag, and create test steps', async ({ projectPage, testCasePage }) => {
    const { testStep, testStepOutcome, testCaseTag } = testCasePage;
    const sampleAttachmentPath = path.resolve('src/data', TEST_DATA.sampleAttachment);
    const screenshotPath = path.resolve('src/data', TEST_DATA.screenshotFile);

    // Step 1-2: Create a project with title, tag, and description
    await projectPage.createProjectWithTagDescription();

    // Step 3: Open created project
    await projectPage.openProject();

    // Step 4: Create a test case
    await testCasePage.createTestCase();

    // Step 5: Open created test case
    await testCasePage.openTestCase();

    // Step 6: Edit test case fields
    await testCasePage.selectTestCaseType('Functional');
    await testCasePage.selectAutomationStatus();
    await testCasePage.selectPriority('High');
    await testCasePage.selectTestCaseStatus();

    // Step 7: Upload attachment to test case
    await testCasePage.uploadAttachment(sampleAttachmentPath);

    // // Step 8: Add tag to test case
    // await testCasePage.addTag(testCaseTag);

    // Step 9: Save test case changes
    await testCasePage.saveChanges();

    // Step 10-11: Navigate to test steps tab and create manual test step
    await testCasePage.createManualStep(testStep, testStepOutcome);

    // Step 12: Re-open test case and create test step via AI
    // await testCasePage.openTestCase();
    await testCasePage.createStepViaAI();

    // // Step 13: Upload attachment to test step
    // const fileChooserPromise = testCasePage.page.waitForEvent('filechooser');
    // await testCasePage.loc(L.attachmentInTeststep).click();
    // const fileChooser = await fileChooserPromise;
    // await fileChooser.setFiles(screenshotPath);
    // await expect.soft(testCasePage.loc(L.verifyAttachmentInTeststep)).toBeVisible({ timeout: TIMEOUTS.long });

    // Step 14: Save all changes
    await testCasePage.saveChanges();

    // Step 15: Verify test case TC ID is visible
    await expect(testCasePage.loc(L.tcId)).toBeVisible({ timeout: TIMEOUTS.long });

    // Step 16: Back to project list
    await projectPage.backToProjectList();

    // Step 17: Cleanup - delete the created project
    await projectPage.deleteProject();
  });
});
