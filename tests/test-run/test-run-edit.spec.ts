import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Edit Test Run', {
  tag: ['@regression', '@test-run'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
    { type: 'story', description: 'PT-14238439' },
  ],
}, () => {
  test('should edit test run to add a new test case and verify both test cases', async ({ projectWithTestCase, projectPage, testCasePage, testRunPage }) => {

    // Create test run with test cases (picks up TC1)
    await testRunPage.createTestRunWithTestCases();

    // Navigate back to test case page and create second test case
    await projectPage.backToProjectList();
    await projectPage.openProject();
    const newTcTitle = testCasePage.newTestCaseTitle;
    await testCasePage.createTestCase(newTcTitle);

    // Edit test run to add new test case
    await testRunPage.editTestRunAddTestCase(testCasePage.testCaseTitle, newTcTitle);

    // Verify both test cases visible in instances
    await testRunPage.verifyTestCasesInInstances(testCasePage.testCaseTitle, newTcTitle);

  });
});
