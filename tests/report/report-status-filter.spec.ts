import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Report - Status Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with status filter', async ({ page, projectPage, testCasePage, testRunPage, reportPage }) => {
    // Setup: create project, test case, and test run
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();

    // Navigate to Reports
    await reportPage.openReportsTab();

    // Create Detailed Execution History report with date range
    await reportPage.startReportCreation('Detailed Execution History');
    await reportPage.enterReportName();
    await reportPage.enterReportDescription();
    await reportPage.selectDateRangeFilter();
    await reportPage.selectDateRangePreset('Last 30 Days');

    // Add status filter (Draft)
    await reportPage.enableTestCasesFilter();
    await reportPage.selectStatusFilter();
    await reportPage.setStatusFilterValue('Draft');

    // Generate and verify
    await reportPage.clickContinue();
    await reportPage.clickGenerateReport();
    await reportPage.pollForReportGeneration();
    await reportPage.verifyReportCreated();
    await reportPage.searchCreatedReport();
    await reportPage.openCreatedReport();
    await reportPage.verifyReportTestCaseCount(1);

    // Cleanup
    await projectPage.deleteProject();
  });
});
