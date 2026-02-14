import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run Bulk Edit Instances', {
  tag: ['@regression', '@test-run'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should bulk assign and bulk mark status on test run instances', async ({
    projectWithTestCase,
    testRunPage,
  }) => {
    // Create test run with config and assignee (ends on instances page)
    await testRunPage.createTestRunWithConfigAndAssignee();

    // Bulk assign to first instance
    await testRunPage.markBulkAssignee(1);

    // Bulk mark status as Passed for first instance
    await testRunPage.markBulkStatus('Passed', 1);
  });
});
