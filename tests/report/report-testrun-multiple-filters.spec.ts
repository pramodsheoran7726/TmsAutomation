import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Test Runs with Multiple Filters', {
  tag: ['@regression', '@Reportregressionus'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with test runs filter and priority and type filters', async ({ projectPage, testCasePage, testRunPage, reportPage }) => {
    test.setTimeout(600_000);
    const opts = {
      projectPage, testCasePage, testRunPage, reportPage,
      primaryFilter: 'testRuns' as const,
      priority: 'High',
      type: 'Regression',
      filters: [
        { method: 'Priority' as const, value: 'High' },
        { method: 'Type' as const, value: 'Regression' },
      ],
    };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage, 1);
    await projectPage.deleteProject();
  });
});
