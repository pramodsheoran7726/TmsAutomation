import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Case Creation', {
  tag: ['@smoke', '@regression'],
  annotation: [
    { type: 'feature', description: 'Test Case Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should create a test case with type, priority, status, and attachment', async ({projectPage, testCasePage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testCasePage.openTestCase();
    await testCasePage.selectTestCaseType();
    await testCasePage.selectAutomationStatus();
    await testCasePage.selectPriority('High');
    await testCasePage.selectTestCaseStatus();
    await testCasePage.saveChanges();
    // Cleanup
    await projectPage.deleteProject();
  });
});
