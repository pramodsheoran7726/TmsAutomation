import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Report - Date Range Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a Detailed Execution History report with date range', async ({ page, projectPage, reportPage, testCasePage, testRunPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();
    await reportPage.openReportsTab();
    await reportPage.startReportCreation('Detailed Execution History');
    await reportPage.enterReportName();
    await reportPage.enterReportDescription();
    await reportPage.selectDateRangeFilter();
    await reportPage.selectDateRangePreset('Last 30 Days');
    await reportPage.clickContinue();
    await reportPage.clickGenerateReport();
    await reportPage.verifyReportCreated();
    // Cleanup
    await projectPage.deleteProject();
  });
});
