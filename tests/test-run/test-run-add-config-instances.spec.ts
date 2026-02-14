import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run Add Config from Instances', {
  tag: ['@regression', '@test-run', '@testrun-with-config'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create test run with configuration and verify it', async ({
    projectWithTestCase,
    testRunPage,
  }) => {
    // Create a test run with configuration (no assignee)
    await testRunPage.createTestRunWithConfig();
  });

  test('should add configuration from test run instances page', async ({
    projectWithTestCase,
    testRunPage,
  }) => {
    // Create a test run
    await testRunPage.createTestRun();

    // Open the test run
    await testRunPage.openTestRun();
    await testRunPage.clickEditTestRun();
    await testRunPage.addTestCases(1)
    // Add configuration from instances page
    await testRunPage.configurationAddedFromNoConfiguration();
  });
});
