import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Run CRUD', {
  tag: ['@smoke', '@regression'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should create a test run without config and assignee', async ({ page, projectPage, testCasePage, testRunPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();
    // Cleanup
    await projectPage.deleteProject();
  });

  test('should create and delete a test run', async ({ page, projectPage, testCasePage, testRunPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();
    await testRunPage.deleteTestRun();
    // Cleanup
    await projectPage.deleteProject();
  });
});
