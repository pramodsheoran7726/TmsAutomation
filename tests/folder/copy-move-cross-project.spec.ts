import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Copy/Move Test Cases to Different Project', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should copy and move test cases across projects', async ({
    page,
    projectPage,
    testCasePage,
    folderPage,
  }) => {
    // Step 1: Create first project, open it, create test case and folder
    await projectPage.createProjectWithTagDescription();
    const firstProjectName = projectPage.projectName;
    await projectPage.openProject(firstProjectName);
    await testCasePage.createTestCase();
    await folderPage.createFolder();

    // Step 2: Back to project list
    await projectPage.backToProjectList();

    // Step 3: Create second project
    const secondProjectName = projectPage.futureProjectName;
    projectPage.projectName = secondProjectName;
    await projectPage.createProjectWithTagDescription();

    // Step 4: Go back to first project
    await projectPage.openProject(firstProjectName);

    // Step 5: Copy test case to folder in different project (second project)
    await folderPage.copyTestCases(1, folderPage.folderName);

    // Step 6: Open second project, verify test case copied
    await projectPage.openProject(secondProjectName);
    await folderPage.openFolder(folderPage.folderName);
    await expect.soft(page.locator(`//a[text()='${testCasePage.testCaseTitle}']`)).toBeVisible();

    // Step 7: Back to first project
    await projectPage.openProject(firstProjectName);

    // Step 8: Move test case to folder in different project
    await folderPage.moveTestCases(1, folderPage.folderName);

    // Step 9: Verify test case moved
    await projectPage.openProject(secondProjectName);
    await folderPage.openFolder(folderPage.folderName);
    await expect.soft(page.locator(`//a[text()='${testCasePage.testCaseTitle}']`)).toBeVisible();

    // Step 10: Cleanup both projects
    await projectPage.deleteProject(firstProjectName);
    await projectPage.deleteProject(secondProjectName);
  });
});
