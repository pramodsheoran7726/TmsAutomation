import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Report - Test Runs with Multiple Filters', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with test runs filter and priority and status filters', async ({ page, projectPage, testCasePage, testRunPage, reportPage }) => {
    // Setup: create project, test case, and test run
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testRunPage.createTestRun();

    // Navigate to Reports
    await reportPage.openReportsTab();

    // Create Detailed Execution History report with Test Runs as primary filter
    await reportPage.startReportCreation('Detailed Execution History');
    await reportPage.enterReportName();
    await reportPage.enterReportDescription();
    await reportPage.selectTestRunsFilter();
    await reportPage.searchTestRun(testRunPage.testRunName);
    await reportPage.selectTestRun(testRunPage.testRunName);

    // Add priority filter (High) and status filter (Draft)
    await reportPage.enableTestCasesFilter();
    await reportPage.selectPriorityFilter();
    await reportPage.setPriorityFilterValue('High');
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
