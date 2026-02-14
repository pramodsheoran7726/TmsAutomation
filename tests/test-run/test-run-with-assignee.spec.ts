import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run With Assignee and Configuration', {
  tag: ['@regression', '@test-run'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
    { type: 'story', description: 'PT-14178483' },
  ],
}, () => {
  test('should create a test run with assignee and configuration', async ({ projectWithTestCase, testRunPage }) => {

    // Create test run with config and assignee via wizard
    await testRunPage.createTestRunWithConfigAndAssignee();

    // Verify test run created — navigate to list and check
    await testRunPage.backToTestRunList();
    await expect.soft(testRunPage.loc(`//a[text()="${testRunPage.testRunName}"]`)).toBeVisible();

  });
});
