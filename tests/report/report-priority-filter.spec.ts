import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Report - Priority Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with priority filter', async ({ page, projectPage, reportPage }) => {
    await projectPage.openProject(projectPage.projectName);
    await reportPage.openReportsTab();
    await reportPage.startReportCreation('Detailed Execution History');
    await reportPage.enterReportName();
    await reportPage.enterReportDescription();
    await reportPage.selectDateRangeFilter();
    await reportPage.selectDateRangePreset('Last 30 Days');
    await reportPage.enableTestCasesFilter();
    await reportPage.selectPriorityFilter();
    await reportPage.setPriorityFilterValue('High');
    await reportPage.clickContinue();
    await reportPage.clickGenerateReport();
    await reportPage.verifyReportCreated();
  });
});
