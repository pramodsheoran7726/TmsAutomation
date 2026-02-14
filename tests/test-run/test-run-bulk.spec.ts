import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run Bulk Operations', {
  tag: ['@regression', '@test-run'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should delete a test run from test run list page', {
    annotation: [
      { type: 'story', description: 'PT-14238429' },
    ],
  }, async ({ projectWithTestCase, testRunPage }) => {
    await testRunPage.createTestRunWithConfigAndAssignee();
    await testRunPage.deleteTestRunFromListPage();
  });

  test('should delete a test run from inside edit page', {
    annotation: [
      { type: 'story', description: 'PT-14238430' },
    ],
  }, async ({ projectWithTestCase, testRunPage }) => {
    await testRunPage.createTestRunWithConfigAndAssignee();
    await testRunPage.deleteTestRunFromEditPage();
  });

  test('should duplicate a test run', {
    annotation: [
      { type: 'story', description: 'PT-14238438' },
    ],
  }, async ({ projectWithTestCase, testRunPage }) => {
    await testRunPage.createTestRunWithConfigAndAssignee();
    await testRunPage.duplicateTestRunFromList();
  });

  test('should archive and reactivate a test run', async ({ projectWithTestCase, testRunPage }) => {
    await testRunPage.createTestRun();
    await testRunPage.archiveTestRun();
  });
});
