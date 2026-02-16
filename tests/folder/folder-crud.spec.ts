import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Folder CRUD', {
  tag: ['@smoke', '@regression', '@critical-path', '@folder'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create folder with test case, rename, and delete', async ({ projectWithTestCaseInFolder, folderPage }) => {
    await folderPage.renameFolder(folderPage.folderName);
    await folderPage.deleteFolder(folderPage.newFolderName);
  });
});
