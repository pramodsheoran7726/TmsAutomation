import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('SDK Run', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'SDK Integration' },
    { type: 'severity', description: 'minor' },
  ],
}, () => {
  test('should execute test steps via SDK and mark status', async ({ page, projectPage, testCasePage, testRunPage, sdkPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();
    await sdkPage.expandDetails();
    await sdkPage.executeTestSteps(3, 'Passed');
    await sdkPage.addRemark('Automation test passed');
    await sdkPage.finishTestExecution();
    // Cleanup
    await projectPage.deleteProject();
  });
});
