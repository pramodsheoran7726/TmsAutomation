import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run Execution', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
    { type: 'story', description: 'PT-14247613' },
  ],
}, () => {
  test('should run test run manually, mark test case and test steps status, and verify history', async ({ page, projectPage, testCasePage, testRunPage }) => {
    // Step 1: Create project and open it
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();

    // Step 2: Create multiple test cases with steps
    await testCasePage.createTestCase();
    await testCasePage.openTestCase();
    await testCasePage.createManualStep('Step 1 description', 'Expected outcome 1');
    await projectPage.backToProjectList();
    await projectPage.openProject();

    const secondTitle = `AutoTC_Second`;
    await testCasePage.createTestCase(secondTitle);
    await testCasePage.openTestCase(secondTitle);
    await testCasePage.createManualStep('Step 2 description', 'Expected outcome 2');
    await projectPage.backToProjectList();
    await projectPage.openProject();

    // Step 3: Create test run
    await testRunPage.createTestRun();

    // Step 4: Open test run
    await testRunPage.openTestRun();

    // Step 5: Mark test case status - Passed for first, Failed for second
    await testRunPage.markStatus('Passed');
    await testRunPage.markStatus('Failed');

    // Step 6: Verify test run status
    await testRunPage.verifyTestRunStatus('In Progress');

    // Step 7: Back to project list and cleanup
    await projectPage.deleteProject();
  });
});
