import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run CRUD', {
  tag: ['@smoke', '@regression', '@test-run'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should create a test run without config and assignee', async ({ projectWithTestCase, testRunPage }) => {
    await testRunPage.createTestRun();
  });

  test('should create and delete a test run', async ({ projectWithTestCase, testRunPage }) => {
    await testRunPage.createTestRun();
    await testRunPage.deleteTestRun();
  });
});
