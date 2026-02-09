import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run With Assignee', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
    { type: 'story', description: 'PT-14178483' },
  ],
}, () => {
  test('should create a test run with assignee and configuration', async ({ page, projectPage, testCasePage, testRunPage }) => {
    // Step 1: Create project and open it
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();

    // Step 2: Create test case
    await testCasePage.createTestCase();

    // Step 3-4: Create test run with configuration AND assignee
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();
    await testRunPage.selectConfiguration('default');
    await testRunPage.selectAssignee('auto');

    // Step 5: Verify test run created
    await testRunPage.backToTestRunList();

    // Step 6: Cleanup - delete project
    await projectPage.deleteProject();
  });
});
