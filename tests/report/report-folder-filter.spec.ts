import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport, USE_FOLDER_NAME } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Folder Filter', {
  tag: ['@regression', '@Reportregressionus'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a Detailed Execution History report with folder filter', async ({ projectPage, folderPage, testCasePage, testRunPage, reportPage }) => {
    test.setTimeout(600_000);
    const opts = {
      projectPage, testCasePage, testRunPage, reportPage, folderPage,
      folder: true,
      dateRangePreset: 'All Time',
      filters: [{ method: 'Folder' as const, value: USE_FOLDER_NAME }],
    };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage, 1);
    await projectPage.deleteProject();
  });
});
