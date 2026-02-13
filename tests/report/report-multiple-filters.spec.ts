import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Report - Multiple Filters', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with priority and status filters', async ({ page, projectPage, reportPage }) => {
    await projectPage.openProject(projectPage.projectName);
    await reportPage.openReportsTab();
    await reportPage.startReportCreation('Detailed Execution History');
    await reportPage.enterReportName();
    await reportPage.selectDateRangePreset('30');
    await reportPage.clickContinue();
    await reportPage.enableTestCasesFilter();
    await reportPage.selectPriorityFilter();
    await reportPage.setPriorityFilterValue('High');
    await reportPage.selectStatusFilter();
    await reportPage.setStatusFilterValue('Draft');
    await reportPage.clickGenerateReport();
    await reportPage.verifyReportCreated();
  });
});
