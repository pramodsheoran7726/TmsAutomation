import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Copy and Move Test Cases', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should copy test cases between folders', async ({ page, projectPage, testCasePage, folderPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await folderPage.createFolder();
    await folderPage.copyTestCases(1, folderPage.folderName);
    // Cleanup
    await projectPage.deleteProject();
  });

  test('should move test cases between folders', async ({ page, projectPage, testCasePage, folderPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await folderPage.createFolder();
    await folderPage.moveTestCases(1, folderPage.folderName);
    // Cleanup
    await projectPage.deleteProject();
  });
});
