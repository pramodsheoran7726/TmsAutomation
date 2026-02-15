import { test, expect } from '../../src/fixtures/tms.fixture.js';
import path from 'path';

test.describe('CSV Import', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'CSV Import' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should import test cases from CSV file', async ({ projectOnly, page, csvImportPage }) => {
    const csvPath = path.resolve('data', 'sample_data.csv');

    // Step 1: Upload CSV and verify columns
    await csvImportPage.uploadCsv(csvPath);
    await csvImportPage.verifyUploadColumns();
  });
});
