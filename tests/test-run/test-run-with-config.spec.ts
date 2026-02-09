import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run With Configuration', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
    { type: 'story', description: 'PT-14178481' },
  ],
}, () => {
  test('should create a test run without assignee along with configuration', async ({ page, projectPage, testCasePage, testRunPage }) => {
    // Step 1: Create project and open it
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();

    // Step 2: Create test case
    await testCasePage.createTestCase();

    // Step 3-4: Create test run with configuration (no assignee)
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();
    await testRunPage.selectConfiguration('default');

    // Step 5: Verify test run created
    await testRunPage.backToTestRunList();

    // Step 6: Cleanup - delete project
    await projectPage.deleteProject();
  });
});
