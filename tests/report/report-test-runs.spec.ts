import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Report - Test Runs Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with test runs filter', async ({ page, projectPage, reportPage }) => {
    await projectPage.openProject(projectPage.projectName);
    await reportPage.openReportsTab();
    await reportPage.startReportCreation('Detailed Execution History');
    await reportPage.enterReportName();
    await reportPage.enterReportDescription();
    await reportPage.selectTestRunsFilter();
    await reportPage.clickContinue();
    await reportPage.clickGenerateReport();
    await reportPage.verifyReportCreated();
  });
});
