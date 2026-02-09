import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Folder/Sub-Folder CRUD with Test Cases', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'critical' },
    { type: 'pivotalTracker', description: 'PT-14447978' },
  ],
}, () => {
  test('should create, rename, and delete folder and sub-folder with test cases', async ({
    page,
    projectPage,
    testCasePage,
    folderPage,
  }) => {
    // Step 1: Create project and open it
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();

    // Step 2: Create folder
    await folderPage.createFolder();
    await folderPage.verifyFolderExists(folderPage.folderName);

    // Step 3: Create sub-folder under the folder
    await folderPage.createSubFolder(folderPage.folderName);
    await folderPage.verifyFolderExists(folderPage.subFolderName);

    // Step 4: Create test case inside sub-folder
    await folderPage.openFolder(folderPage.subFolderName);
    await testCasePage.createTestCase();

    // Step 5: Rename sub-folder
    await folderPage.renameFolder(folderPage.subFolderName);

    // Step 6: Verify renamed sub-folder
    await folderPage.verifyFolderExists(folderPage.newFolderName);

    // Step 7: Delete sub-folder, verify deleted
    await folderPage.deleteFolder(folderPage.newFolderName);
    await folderPage.verifyFolderDeleted(folderPage.newFolderName);

    // Step 8: Delete folder, verify deleted
    await folderPage.deleteFolder(folderPage.folderName);
    await folderPage.verifyFolderDeleted(folderPage.folderName);

    // Step 9: Cleanup - delete project
    await projectPage.deleteProject();
  });
});
