import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Priority Filter', {
  tag: ['@regression', '@report'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with priority filter', async ({ projectPage, testCasePage, testRunPage, reportPage }) => {
    test.setTimeout(600_000);
    const opts = {
      projectPage, testCasePage, testRunPage, reportPage,
      priority: 'High',
      dateRangePreset: 'All Time',
      filters: [{ method: 'Priority', value: 'High' }],
    };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage, 1);
    await projectPage.deleteProject();
  });
});
