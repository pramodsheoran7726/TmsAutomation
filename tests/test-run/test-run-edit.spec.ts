import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Edit Test Run', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
    { type: 'story', description: 'PT-14238439' },
  ],
}, () => {
  test('should edit a test run name', async ({ page, projectPage, testCasePage, testRunPage }) => {
    // Step 1: Create project and open it
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();

    // Step 2: Create test case and test run
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();

    // Step 3: Edit test run name
    await testRunPage.editTestRun();

    // Step 4: Verify edited test run appears (handled inside editTestRun via expect assertion)

    // Step 5: Cleanup - delete project
    await projectPage.deleteProject();
  });
});
