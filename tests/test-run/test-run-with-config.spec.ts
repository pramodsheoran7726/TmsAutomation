import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run With Configuration', {
  tag: ['@regression', '@test-run'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
    { type: 'story', description: 'PT-14178481' },
  ],
}, () => {
  test('should create a test run without assignee along with configuration', async ({ projectWithTestCase, testRunPage }) => {

    // Create test run with configuration (no assignee)
    await testRunPage.createTestRunWithConfig();

    // Verify test run created — navigate to list
    await testRunPage.backToTestRunList();

  });
});
