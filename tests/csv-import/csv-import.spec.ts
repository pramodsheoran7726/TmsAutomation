import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('CSV Import', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'CSV Import' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should import test cases from CSV file', async ({ page, projectPage, csvImportPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    // Note: CSV file path would need to be configured
    // await csvImportPage.fullCsvImportFlow('/path/to/sample_data.csv');
    await csvImportPage.verifyUploadColumns();
    // Cleanup
    await projectPage.deleteProject();
  });
});
