import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Folder CRUD', {
  tag: ['@smoke', '@regression'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create, rename, and delete a folder', async ({ page, projectPage, folderPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await folderPage.createFolder();
    await folderPage.createSubFolder(folderPage.folderName);
    await folderPage.renameFolder(folderPage.folderName);
    await folderPage.deleteFolder(folderPage.newFolderName);
    // Cleanup
    await projectPage.deleteProject();
  });
});
