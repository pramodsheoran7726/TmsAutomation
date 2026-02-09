import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Report - Priority, Status, and Automation Status Filters', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with priority, status, and automation status filters', async ({ page, projectPage, testCasePage, testRunPage, reportPage }) => {
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

    // Add priority filter (High), status filter (Draft), and automation status filter (Not Automated)
    await reportPage.enableTestCasesFilter();
    await reportPage.selectPriorityFilter();
    await reportPage.setPriorityFilterValue('High');
    await reportPage.selectStatusFilter();
    await reportPage.setStatusFilterValue('Draft');
    await reportPage.selectAutomationStatusFilter();
    await reportPage.setAutomationStatusFilterValue('Not Automated');

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
