import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Folder Drag and Drop', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should drag a folder to reorder', async ({ page, projectPage, folderPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await folderPage.createFolder();
    await folderPage.createSubFolder(folderPage.folderName);
    await folderPage.dragDropFolder(folderPage.subFolderName, folderPage.folderName);
    // Cleanup
    await projectPage.deleteProject();
  });
});
