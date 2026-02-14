import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { ReportLocators as L, reportByName, reportTypeBadge, selectTestRun, selectPriority, selectStatus, selectAutomationStatus, selectType, selectTag, selectLinkedIssue, selectCreatedBy, selectFolder } from './report.locators.js';
import { TIMEOUTS, RANDOM_LENGTH, POLL } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class ReportPage extends BasePage {
  reportName = `AutoReport_${randomString(RANDOM_LENGTH.medium)}`;
  reportDescription = `Automation Report Description ${randomString(RANDOM_LENGTH.short)}`;
  updatedReportName = `Updated_Report_${randomString(RANDOM_LENGTH.medium)}`;

  constructor(page: Page) { super(page); }

  // Navigation
  async openReportsTab(): Promise<void> {
    await test.step('Open Reports tab', async () => {
      await this.loc(L.reportsTab).click();
      await waitForNetworkIdle(this.page);
      if (await this.isReportsListDisplayed()) {
        await this.verifyReportsTabActive();
      }
    });
  }

  async verifyReportsTabActive(): Promise<void> {
    await expect.soft(this.loc(L.reportsGeneratedHeader)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async openTestCasesTab(): Promise<void> {
    await this.loc(L.testCasesTab).click();
    await waitForNetworkIdle(this.page);
  }

  async openTestRunsTab(): Promise<void> {
    await this.loc(L.testRunsTab).click();
    await waitForNetworkIdle(this.page);
  }

  // Report Generation
  async isEmptyStateDisplayed(): Promise<boolean> {
    return this.isVisible(L.reportTemplatesHeader, TIMEOUTS.short);
  }

  async isReportsListDisplayed(): Promise<boolean> {
    return this.isVisible(L.reportsGeneratedHeader, TIMEOUTS.short);
  }

  async clickGenerateNewReport(): Promise<void> {
    await this.loc(L.generateNewReportBtn).click();
    await this.loc(L.generateReportDialog).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
  }

  async startReportCreation(reportType: string): Promise<void> {
    await test.step(`Start report creation for "${reportType}"`, async () => {
      await waitForNetworkIdle(this.page);
      if (await this.isEmptyStateDisplayed()) {
        if (reportType === 'Detailed Execution History') {
          await this.loc(L.detailedExecutionHistoryTemplate).click();
        } else if (reportType === 'Traceability Report') {
          await this.loc(L.traceabilityReportTemplate).click();
        }
      } else {
        await this.clickGenerateNewReport();
        if (reportType === 'Detailed Execution History') {
          await this.selectDetailedExecutionHistoryReport();
        } else if (reportType === 'Traceability Report') {
          await this.selectTraceabilityReport();
        }
        await this.clickDialogContinue();
      }
      // Wait for the report generation drawer to fully open
      await this.loc(L.reportNameInput).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
    });
  }

  async selectDetailedExecutionHistoryReport(): Promise<void> {
    await expect.soft(this.loc(L.generateReportDialog)).toBeVisible({ timeout: TIMEOUTS.long });
    await this.loc(L.detailedExecutionHistoryOption).click();
    await waitForNetworkIdle(this.page);
  }

  async selectTraceabilityReport(): Promise<void> {
    await expect.soft(this.loc(L.generateReportDialog)).toBeVisible({ timeout: TIMEOUTS.long });
    await this.loc(L.traceabilityReportOption).click();
    await waitForNetworkIdle(this.page);
  }

  async clickDialogContinue(): Promise<void> {
    await this.loc(L.dialogContinueBtn).click();
    await waitForNetworkIdle(this.page);
  }

  async clickDialogCancel(): Promise<void> {
    await this.loc(L.dialogCancelBtn).click();
    await waitForNetworkIdle(this.page);
  }

  async enterReportName(name?: string): Promise<void> {
    const reportNameToUse = name || this.reportName;
    const el = this.loc(L.reportNameInput);
    await el.waitFor({ state: 'visible', timeout: TIMEOUTS.long });
    await el.click();
    await el.clear();
    await el.fill(reportNameToUse);
    await this.page.waitForTimeout(500);
  }

  async enterReportDescription(description?: string): Promise<void> {
    const descriptionToUse = description || this.reportDescription;
    const el = this.loc(L.reportDescriptionInput);
    await el.waitFor({ state: 'visible', timeout: TIMEOUTS.long });
    await el.click();
    await el.fill(descriptionToUse);
    await this.page.waitForTimeout(500);
  }

  // Primary Filters
  async selectDateRangeFilter(): Promise<void> {
    await this.loc(L.dateRangeFilterBtn).click();
    await waitForNetworkIdle(this.page);
  }

  async selectTestRunsFilter(): Promise<void> {
    await this.loc(L.testRunsFilterBtn).click();
    await waitForNetworkIdle(this.page);
  }

  async selectDateRangePreset(preset: string): Promise<void> {
    await test.step(`Select date range preset "${preset}"`, async () => {
      const locator = this.tpl(L.lastDays, { days: preset });
      // Always click the date input to open the picker dropdown
      await this.loc(L.dateRangeRadio).click();
      await this.page.waitForTimeout(500);
      await this.loc(locator).click();
      await this.page.waitForTimeout(1000);
    });
  }

  async enterCustomDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step('Enter custom date range', async () => {
      const startEl = this.loc(L.startDateInput); await startEl.click(); await startEl.clear(); await startEl.fill(startDate);
      await this.page.keyboard.press('Tab');
      const endEl = this.loc(L.endDateInput); await endEl.click(); await endEl.clear(); await endEl.fill(endDate);
      await this.page.keyboard.press('Escape');
      await waitForNetworkIdle(this.page);
    });
  }

  async searchTestRun(testRunName: string): Promise<void> {
    await this.loc(L.searchTestRunsInput).fill(testRunName);
    await waitForNetworkIdle(this.page);
  }

  async selectTestRun(testRunName: string): Promise<void> {
    await this.loc(selectTestRun(testRunName)).click();
    await waitForNetworkIdle(this.page);
  }

  async selectMultipleTestRuns(testRunNames: string[]): Promise<void> {
    await test.step('Select multiple test runs', async () => {
      for (const testRunName of testRunNames) {
        await this.selectTestRun(testRunName);
      }
    });
  }

  // Additional Filters (Test Cases)
  async enableTestCasesFilter(): Promise<void> {
    await this.loc(L.testCasesFilterBtn).click();
    await waitForNetworkIdle(this.page);
  }

  async clickAddFilter(): Promise<void> {
    await this.loc(L.addFilterBtn).click();
    await waitForNetworkIdle(this.page);
  }

  async selectPriorityFilter(): Promise<void> {
    await test.step('Select priority filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterPriority).click();
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  async selectStatusFilter(): Promise<void> {
    await test.step('Select status filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterStatus).click();
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  async selectFolderFilter(): Promise<void> {
    await test.step('Select folder filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterFolder).click();
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  async selectAutomationStatusFilter(): Promise<void> {
    await test.step('Select automation status filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterAutomationStatus).click();
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  async selectTagsFilter(): Promise<void> {
    await test.step('Select tags filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterTags).click();
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  async selectCreatedByFilter(): Promise<void> {
    await test.step('Select created by filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterCreatedBy).click();
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  async selectTypeFilter(): Promise<void> {
    await test.step('Select type filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterType).click();
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  async selectLinkedIssuesFilter(): Promise<void> {
    await test.step('Select linked issues filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterLinkedIssues).click();
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  async setPriorityFilterValue(priority: string): Promise<void> {
    await test.step(`Set priority filter value "${priority}"`, async () => {
      await this.loc(L.selectPriorityBtn).click();
      await this.loc(selectPriority(priority)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(selectPriority(priority)).click();
      await this.page.keyboard.press('Escape');
      await waitForNetworkIdle(this.page);
    });
  }

  async setStatusFilterValue(status: string): Promise<void> {
    await test.step(`Set status filter value "${status}"`, async () => {
      await this.loc(L.selectStatusBtn).click();
      await this.loc(selectStatus(status)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(selectStatus(status)).click();
      await this.page.keyboard.press('Escape');
      await waitForNetworkIdle(this.page);
    });
  }

  async setFolderFilterValue(folderName: string): Promise<void> {
    await test.step(`Set folder filter value "${folderName}"`, async () => {
      await this.loc(L.selectFolderBtn).click();
      await this.loc(L.folderLoader).waitFor({ state: 'hidden', timeout: TIMEOUTS.extraLong });
      await this.loc(selectFolder(folderName)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(selectFolder(folderName)).click();
      await this.loc(L.selectFolderButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async setAutomationStatusFilterValue(automationStatus: string): Promise<void> {
    await test.step(`Set automation status filter value "${automationStatus}"`, async () => {
      await this.loc(L.selectAutomationStatusBtn).click();
      await this.loc(selectAutomationStatus(automationStatus)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(selectAutomationStatus(automationStatus)).click();
      await this.page.keyboard.press('Escape');
      await waitForNetworkIdle(this.page);
    });
  }

  async setTypeFilterValue(type: string): Promise<void> {
    await test.step(`Set type filter value "${type}"`, async () => {
      await this.loc(L.selectTypeBtn).click();
      await this.loc(selectType(type)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(selectType(type)).click();
      await this.page.keyboard.press('Escape');
      await waitForNetworkIdle(this.page);
    });
  }

  async setTagsFilterValue(tagName: string): Promise<void> {
    await test.step(`Set tags filter value "${tagName}"`, async () => {
      await this.loc(L.selectTagsBtn).click();
      await waitForNetworkIdle(this.page);
      if (await this.isVisible(L.tagsSearchInput, TIMEOUTS.short)) {
        await this.loc(L.tagsSearchInput).fill(tagName);
        await waitForNetworkIdle(this.page);
      }
      await this.loc(selectTag(tagName)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(selectTag(tagName)).click();
      await this.page.keyboard.press('Escape');
      await waitForNetworkIdle(this.page);
    });
  }

  async setLinkedIssuesFilterValue(issueName: string): Promise<void> {
    await test.step(`Set linked issues filter value "${issueName}"`, async () => {
      await this.loc(L.selectLinkedIssuesBtn).click();
      await waitForNetworkIdle(this.page);
      if (await this.isVisible(L.linkedIssuesSearchInput, TIMEOUTS.short)) {
        await this.loc(L.linkedIssuesSearchInput).fill(issueName);
        await waitForNetworkIdle(this.page);
      }
      await this.loc(selectLinkedIssue(issueName)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(selectLinkedIssue(issueName)).click();
      await this.page.keyboard.press('Escape');
      await waitForNetworkIdle(this.page);
    });
  }

  async setCreatedByFilterValue(userName: string): Promise<void> {
    await test.step(`Set created by filter value "${userName}"`, async () => {
      await this.loc(L.selectCreatedByBtn).click();
      await waitForNetworkIdle(this.page);
      if (await this.isVisible(L.createdBySearchInput, TIMEOUTS.short)) {
        await this.loc(L.createdBySearchInput).fill(userName);
        await waitForNetworkIdle(this.page);
      }
      await this.loc(selectCreatedBy(userName)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(selectCreatedBy(userName)).click();
      await this.page.keyboard.press('Escape');
      await waitForNetworkIdle(this.page);
    });
  }

  // Report Generation Flow
  async clickContinue(): Promise<void> {
    await this.loc(L.continueBtn).click();
    await waitForNetworkIdle(this.page);
  }

  async clickGenerate(): Promise<void> {
    await this.loc(L.generateBtn).click();
    await waitForNetworkIdle(this.page, TIMEOUTS.long);
  }

  async clickSave(): Promise<void> {
    await this.loc(L.saveBtn).click();
    await waitForNetworkIdle(this.page);
  }

  async closeReportDrawer(): Promise<void> {
    if (await this.isVisible(L.closeDrawerBtn, TIMEOUTS.short)) {
      await this.loc(L.closeDrawerBtn).click();
      await waitForNetworkIdle(this.page);
    }
  }

  async clickGenerateReport(): Promise<void> {
    await this.loc(L.generateReportBtn).click();
    await waitForNetworkIdle(this.page, TIMEOUTS.long);
  }

  async clickGoBackStep2(): Promise<void> {
    await this.loc(L.goBackStep2Btn).click();
    await waitForNetworkIdle(this.page);
  }

  async generateReport(): Promise<void> {
    await test.step('Generate report', async () => {
      await this.clickContinue();
      await this.verifyStep2Displayed();
      await this.clickGenerateReport();
    });
  }

  // Verification
  async verifyReportGeneratedSuccessfully(): Promise<void> {
    await expect.soft(this.loc(reportByName(this.reportName))).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyReportCreated(): Promise<void> {
    await expect.soft(this.loc(reportByName(this.reportName))).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyReportCreatedWithToast(): Promise<void> {
    await expect.soft(this.loc(L.reportCreatedToast)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyReportType(expectedType: string): Promise<void> {
    await expect.soft(this.loc(reportTypeBadge(expectedType))).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyStep1Displayed(): Promise<void> {
    await expect.soft(this.loc(L.step1Of2)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyStep2Displayed(): Promise<void> {
    await expect.soft(this.loc(L.step2Of2)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  // Report Management
  async searchReport(reportName: string): Promise<void> {
    const el = this.loc(L.searchReportInput); await el.click(); await el.clear(); await el.fill(reportName);
    await waitForNetworkIdle(this.page);
  }

  async searchCreatedReport(): Promise<void> {
    await this.searchReport(this.reportName);
  }

  async openReport(reportName: string): Promise<void> {
    await this.loc(reportByName(reportName)).click();
    await waitForNetworkIdle(this.page);
  }

  async openCreatedReport(): Promise<void> {
    await this.openReport(this.reportName);
  }

  async deleteReport(reportName: string): Promise<void> {
    await test.step(`Delete report "${reportName}"`, async () => {
      await this.searchReport(reportName);
      await this.loc(L.reportItemMenu).click();
      await this.loc(L.reportDeleteOption).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.reportDeleteOption).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async deleteCreatedReport(): Promise<void> {
    await this.deleteReport(this.reportName);
  }
  async verifyReportDeleted(): Promise<void> {
    await test.step('Verify report deleted', async () => {
      await this.searchReport(this.reportName);
      await expect.soft(this.loc(reportByName(this.reportName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // Helper Methods
  async verifyContinueButtonEnabled(): Promise<void> {
    await expect.soft(this.loc(L.continueBtnDisabled)).not.toBeVisible({ timeout: TIMEOUTS.short });
  }

  async verifyContinueButtonDisabled(): Promise<void> {
    await expect.soft(this.loc(L.continueBtnDisabled)).toBeVisible({ timeout: TIMEOUTS.short });
  }

  async getFiltersAddedCount(): Promise<string> {
    return test.step('Get filters added count', async () => {
      if (await this.isVisible(L.filtersAddedCount, TIMEOUTS.short)) {
        return (await this.loc(L.filtersAddedCount).textContent()) ?? '';
      }
      return '0';
    });
  }

  async filterReportsByType(reportType: string): Promise<void> {
    await test.step(`Filter reports by type "${reportType}"`, async () => {
      await this.loc(L.reportTypeFilter).click();
      await this.loc(`//li[contains(.,'${reportType}')]`).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(`//li[contains(.,'${reportType}')]`).click();
      await waitForNetworkIdle(this.page);
    });
  }

  // Report Polling
  async pollForReportGeneration(maxWaitTimeInMinutes = 5): Promise<boolean> {
    const pollingIntervalSeconds = 10;
    const maxWaitTimeInSeconds = maxWaitTimeInMinutes * 60;
    let elapsedTime = 0;

    while (elapsedTime < maxWaitTimeInSeconds) {
      try {
        await this.page.reload({ waitUntil: 'domcontentloaded' });
      } catch {
        // Transient network error — wait and retry
        await this.page.waitForTimeout(5000);
        elapsedTime += 5;
        continue;
      }
      await this.page.waitForTimeout(3000);

      if (await this.isVisible(L.reportLoadingIndicator, 2000)) {
        await this.loc(L.reportLoadingIndicator).waitFor({ state: 'hidden', timeout: TIMEOUTS.extraLong });
      }

      // Check if data is available (works on both detail page and after opening from list)
      if (await this.isReportDataAvailable()) {
        return true;
      }

      // If "No Data available" is shown, we're on the detail page but data isn't ready
      if (await this.isVisible(L.reportNoDataAvailable, 2000)) {
        await this.page.waitForTimeout(pollingIntervalSeconds * 1000);
        elapsedTime += pollingIntervalSeconds + 3;
        continue;
      }

      // If we're on the list page, try to find and open the report
      const reportVisible = await this.isReportGenerated();
      if (reportVisible) {
        await this.openGeneratedReport();
        await this.page.waitForTimeout(3000);
        if (await this.isReportDataAvailable()) {
          return true;
        }
      }

      await this.page.waitForTimeout(POLL.intervalSeconds * 1000);
      elapsedTime += POLL.intervalSeconds;
    }

    return false;
  }

  async isReportGenerated(): Promise<boolean> {
    if (await this.isVisible(L.reportDetailTable, TIMEOUTS.short)) {
      return true;
    }
    if (await this.isVisible(reportByName(this.reportName), TIMEOUTS.short)) {
      return true;
    }
    if (await this.isVisible(L.reportsGeneratedHeader, TIMEOUTS.short) &&
        !(await this.isVisible(L.reportLoadingIndicator, 2000))) {
      return this.isVisible(reportByName(this.reportName), TIMEOUTS.medium);
    }
    return false;
  }

  async isReportDataAvailable(): Promise<boolean> {
    if (await this.isVisible(L.reportNoDataAvailable, 3000)) {
      return false;
    }
    if (await this.isVisible(L.reportDetailTableRows, TIMEOUTS.short)) {
      const rowCount = await this.getReportTestCaseCount();
      return rowCount > 0;
    }
    return false;
  }

  async openGeneratedReport(): Promise<void> {
    await test.step('Open generated report', async () => {
      await waitForNetworkIdle(this.page);
      if (await this.isVisible(reportByName(this.reportName), TIMEOUTS.long)) {
        await this.loc(reportByName(this.reportName)).click();
        await waitForNetworkIdle(this.page, TIMEOUTS.long);
        if (await this.isVisible(L.reportLoadingIndicator, 2000)) {
          await this.loc(L.reportLoadingIndicator).waitFor({ state: 'hidden', timeout: TIMEOUTS.extraLong });
        }
      }
    });
  }

  async getReportTestCaseCount(): Promise<number> {
    if (!(await this.isVisible(L.reportDetailTable, TIMEOUTS.long))) {
      return 0;
    }

    try {
      const rows = await this.page.locator(L.reportDetailTableRows).all();
      return rows.length;
    } catch (error) {
      return 0;
    }
  }

  async verifyReportTestCaseCount(expectedCount: number): Promise<void> {
    await test.step(`Verify report test case count is ${expectedCount}`, async () => {
      if (!(await this.isVisible(L.reportDetailTable, TIMEOUTS.short))) {
        await this.openGeneratedReport();
      }

      await waitForNetworkIdle(this.page);
      const actualCount = await this.getReportTestCaseCount();
      expect.soft(actualCount).toBe(expectedCount);
    });
  }

  async pollAndVerifyReportTestCaseCount(maxWaitTimeInMinutes: number, expectedTestCaseCount: number): Promise<void> {
    await test.step(`Poll and verify report test case count is ${expectedTestCaseCount}`, async () => {
      const reportGenerated = await this.pollForReportGeneration(maxWaitTimeInMinutes);
      expect.soft(reportGenerated).toBeTruthy();

      if (reportGenerated) {
        await this.openGeneratedReport();
        await this.verifyReportTestCaseCount(expectedTestCaseCount);
      }
    });
  }
}
