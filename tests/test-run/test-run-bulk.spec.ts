import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run Bulk Operations', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should duplicate a test run', async ({ page, projectPage, testCasePage, testRunPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();
    await testRunPage.duplicateTestRun();
    // Cleanup
    await projectPage.deleteProject();
  });

  test('should archive and reactivate a test run', async ({ page, projectPage, testCasePage, testRunPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();
    await testRunPage.archiveTestRun();
    // Cleanup
    await projectPage.deleteProject();
  });

  test('should delete a test run from inside edit test run page', {
    annotation: [
      { type: 'story', description: 'PT-14238430' },
    ],
  }, async ({ page, projectPage, testCasePage, testRunPage }) => {
    // Step 1: Create project and open it
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();

    // Step 2: Create test case and test run
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();

    // Step 3: Open test run
    await testRunPage.openTestRun();

    // Step 4: Delete test run from inside edit page
    await testRunPage.deleteTestRun();

    // Step 5: Cleanup - delete project
    await projectPage.deleteProject();
  });
});
