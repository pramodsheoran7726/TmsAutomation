import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Report - Folder Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a Detailed Execution History report with folder filter', async ({ page, projectPage, folderPage, testCasePage, reportPage }) => {
    // Setup: create project, folder, and test case inside folder
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await folderPage.createFolder();
    await folderPage.openFolder(folderPage.folderName);
    await testCasePage.createTestCase();

    // Navigate to Reports
    await reportPage.openReportsTab();

    // Create Detailed Execution History report with date range
    await reportPage.startReportCreation('Detailed Execution History');
    await reportPage.enterReportName();
    await reportPage.enterReportDescription();
    await reportPage.selectDateRangeFilter();
    await reportPage.selectDateRangePreset('Last 30 Days');

    // Add folder filter
    await reportPage.enableTestCasesFilter();
    await reportPage.selectFolderFilter();
    await reportPage.setFolderFilterValue(folderPage.folderName);

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
