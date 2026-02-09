import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { ReportLocators as L, reportByName, reportTypeBadge, selectTestRun, selectPriority, selectStatus, selectAutomationStatus, selectType, selectTag, selectLinkedIssue, selectCreatedBy, selectFolder } from './report.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';

export class ReportPage extends BasePage {
  reportName = `AutoReport_${randomString(RANDOM_LENGTH.medium)}`;
  reportDescription = `Automation Report Description ${randomString(RANDOM_LENGTH.short)}`;
  updatedReportName = `Updated_Report_${randomString(RANDOM_LENGTH.medium)}`;

  constructor(page: Page) { super(page); }

  // Navigation
  async openReportsTab(): Promise<void> {
    await test.step('Open Reports tab', async () => {
      await this.loc(L.reportsTab).click();
      await this.page.waitForTimeout(2000);
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
    await this.page.waitForTimeout(2000);
  }

  async openTestRunsTab(): Promise<void> {
    await this.loc(L.testRunsTab).click();
    await this.page.waitForTimeout(2000);
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
    await this.page.waitForTimeout(2000);
  }

  async startReportCreation(reportType: string): Promise<void> {
    await test.step(`Start report creation for "${reportType}"`, async () => {
      await this.page.waitForTimeout(2000);
      if (await this.isEmptyStateDisplayed()) {
        if (reportType === 'Detailed Execution History') {
          await this.loc(L.detailedExecutionHistoryTemplate).click();
        } else if (reportType === 'Traceability Report') {
          await this.loc(L.traceabilityReportTemplate).click();
        }
        await this.page.waitForTimeout(2000);
      } else {
        await this.clickGenerateNewReport();
        if (reportType === 'Detailed Execution History') {
          await this.selectDetailedExecutionHistoryReport();
        } else if (reportType === 'Traceability Report') {
          await this.selectTraceabilityReport();
        }
        await this.clickDialogContinue();
      }
    });
  }

  async selectDetailedExecutionHistoryReport(): Promise<void> {
    await expect.soft(this.loc(L.generateReportDialog)).toBeVisible({ timeout: TIMEOUTS.long });
    await this.loc(L.detailedExecutionHistoryOption).click();
    await this.page.waitForTimeout(1000);
  }

  async selectTraceabilityReport(): Promise<void> {
    await expect.soft(this.loc(L.generateReportDialog)).toBeVisible({ timeout: TIMEOUTS.long });
    await this.loc(L.traceabilityReportOption).click();
    await this.page.waitForTimeout(1000);
  }

  async clickDialogContinue(): Promise<void> {
    await this.loc(L.dialogContinueBtn).click();
    await this.page.waitForTimeout(2000);
  }

  async clickDialogCancel(): Promise<void> {
    await this.loc(L.dialogCancelBtn).click();
    await this.page.waitForTimeout(1000);
  }

  async enterReportName(name?: string): Promise<void> {
    const reportNameToUse = name || this.reportName;
    const el = this.loc(L.reportNameInput); await el.click(); await el.clear(); await el.fill(reportNameToUse);
  }

  async enterReportDescription(description?: string): Promise<void> {
    const descriptionToUse = description || this.reportDescription;
    await this.loc(L.reportDescriptionInput).fill(descriptionToUse);
  }

  // Primary Filters
  async selectDateRangeFilter(): Promise<void> {
    await this.loc(L.dateRangeFilterBtn).click();
    await this.page.waitForTimeout(1000);
  }

  async selectTestRunsFilter(): Promise<void> {
    await this.loc(L.testRunsFilterBtn).click();
    await this.page.waitForTimeout(2000);
  }

  async selectDateRangePreset(preset: string): Promise<void> {
    await test.step(`Select date range preset "${preset}"`, async () => {
      const locator = this.tpl(L.lastDays, { days: preset });
      if (await this.isVisible(locator, TIMEOUTS.short)) {
        await this.loc(locator).click();
      } else {
        await this.loc(L.dateRangeRadio).click();
        await this.loc(locator).click();
      }
      await this.page.waitForTimeout(1000);
    });
  }

  async enterCustomDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step('Enter custom date range', async () => {
      const startEl = this.loc(L.startDateInput); await startEl.click(); await startEl.clear(); await startEl.fill(startDate);
      await this.page.keyboard.press('Tab');
      const endEl = this.loc(L.endDateInput); await endEl.click(); await endEl.clear(); await endEl.fill(endDate);
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
    });
  }

  async searchTestRun(testRunName: string): Promise<void> {
    await this.loc(L.searchTestRunsInput).fill(testRunName);
    await this.page.waitForTimeout(2000);
  }

  async selectTestRun(testRunName: string): Promise<void> {
    await this.loc(selectTestRun(testRunName)).click();
    await this.page.waitForTimeout(1000);
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
    await this.page.waitForTimeout(1000);
  }

  async clickAddFilter(): Promise<void> {
    await this.loc(L.addFilterBtn).click();
    await this.page.waitForTimeout(1000);
  }

  async selectPriorityFilter(): Promise<void> {
    await test.step('Select priority filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterPriority).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testCasesFilterBtn).click();
    });
  }

  async selectStatusFilter(): Promise<void> {
    await test.step('Select status filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterStatus).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testCasesFilterBtn).click();
    });
  }

  async selectFolderFilter(): Promise<void> {
    await test.step('Select folder filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterFolder).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testCasesFilterBtn).click();
    });
  }

  async selectAutomationStatusFilter(): Promise<void> {
    await test.step('Select automation status filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterAutomationStatus).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testCasesFilterBtn).click();
    });
  }

  async selectTagsFilter(): Promise<void> {
    await test.step('Select tags filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterTags).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testCasesFilterBtn).click();
    });
  }

  async selectCreatedByFilter(): Promise<void> {
    await test.step('Select created by filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterCreatedBy).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testCasesFilterBtn).click();
    });
  }

  async selectTypeFilter(): Promise<void> {
    await test.step('Select type filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterType).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testCasesFilterBtn).click();
    });
  }

  async selectLinkedIssuesFilter(): Promise<void> {
    await test.step('Select linked issues filter', async () => {
      await this.clickAddFilter();
      await this.loc(L.filterLinkedIssues).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testCasesFilterBtn).click();
    });
  }

  async setPriorityFilterValue(priority: string): Promise<void> {
    await test.step(`Set priority filter value "${priority}"`, async () => {
      await this.loc(L.selectPriorityBtn).click();
      await this.page.waitForTimeout(1000);
      await this.loc(selectPriority(priority)).click();
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
    });
  }

  async setStatusFilterValue(status: string): Promise<void> {
    await test.step(`Set status filter value "${status}"`, async () => {
      await this.loc(L.selectStatusBtn).click();
      await this.page.waitForTimeout(1000);
      await this.loc(selectStatus(status)).click();
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
    });
  }

  async setFolderFilterValue(folderName: string): Promise<void> {
    await test.step(`Set folder filter value "${folderName}"`, async () => {
      await this.loc(L.selectFolderBtn).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.folderLoader).waitFor({ state: 'hidden', timeout: TIMEOUTS.extraLong });
      await this.loc(selectFolder(folderName)).click();
      await this.loc(L.selectFolderButton).click();
      await this.page.waitForTimeout(1000);
    });
  }

  async setAutomationStatusFilterValue(automationStatus: string): Promise<void> {
    await test.step(`Set automation status filter value "${automationStatus}"`, async () => {
      await this.loc(L.selectAutomationStatusBtn).click();
      await this.page.waitForTimeout(1000);
      await this.loc(selectAutomationStatus(automationStatus)).click();
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
    });
  }

  async setTypeFilterValue(type: string): Promise<void> {
    await test.step(`Set type filter value "${type}"`, async () => {
      await this.loc(L.selectTypeBtn).click();
      await this.page.waitForTimeout(1000);
      await this.loc(selectType(type)).click();
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
    });
  }

  async setTagsFilterValue(tagName: string): Promise<void> {
    await test.step(`Set tags filter value "${tagName}"`, async () => {
      await this.loc(L.selectTagsBtn).click();
      await this.page.waitForTimeout(1000);
      if (await this.isVisible(L.tagsSearchInput, TIMEOUTS.short)) {
        await this.loc(L.tagsSearchInput).fill(tagName);
        await this.page.waitForTimeout(1000);
      }
      await this.loc(selectTag(tagName)).click();
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
    });
  }

  async setLinkedIssuesFilterValue(issueName: string): Promise<void> {
    await test.step(`Set linked issues filter value "${issueName}"`, async () => {
      await this.loc(L.selectLinkedIssuesBtn).click();
      await this.page.waitForTimeout(1000);
      if (await this.isVisible(L.linkedIssuesSearchInput, TIMEOUTS.short)) {
        await this.loc(L.linkedIssuesSearchInput).fill(issueName);
        await this.page.waitForTimeout(1000);
      }
      await this.loc(selectLinkedIssue(issueName)).click();
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
    });
  }

  async setCreatedByFilterValue(userName: string): Promise<void> {
    await test.step(`Set created by filter value "${userName}"`, async () => {
      await this.loc(L.selectCreatedByBtn).click();
      await this.page.waitForTimeout(1000);
      if (await this.isVisible(L.createdBySearchInput, TIMEOUTS.short)) {
        await this.loc(L.createdBySearchInput).fill(userName);
        await this.page.waitForTimeout(1000);
      }
      await this.loc(selectCreatedBy(userName)).click();
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
    });
  }

  // Report Generation Flow
  async clickContinue(): Promise<void> {
    await this.loc(L.continueBtn).click();
    await this.page.waitForTimeout(2000);
  }

  async clickGenerate(): Promise<void> {
    await this.loc(L.generateBtn).click();
    await this.page.waitForTimeout(3000);
  }

  async clickSave(): Promise<void> {
    await this.loc(L.saveBtn).click();
    await this.page.waitForTimeout(2000);
  }

  async closeReportDrawer(): Promise<void> {
    if (await this.isVisible(L.closeDrawerBtn, TIMEOUTS.short)) {
      await this.loc(L.closeDrawerBtn).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async clickGenerateReport(): Promise<void> {
    await this.loc(L.generateReportBtn).click();
    await this.page.waitForTimeout(5000);
  }

  async clickGoBackStep2(): Promise<void> {
    await this.loc(L.goBackStep2Btn).click();
    await this.page.waitForTimeout(2000);
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
    await this.page.waitForTimeout(3000);
    await expect.soft(this.loc(reportByName(this.reportName))).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyReportCreated(): Promise<void> {
    await this.page.waitForTimeout(3000);
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
    await this.page.waitForTimeout(2000);
  }

  async searchCreatedReport(): Promise<void> {
    await this.searchReport(this.reportName);
  }

  async openReport(reportName: string): Promise<void> {
    await this.loc(reportByName(reportName)).click();
    await this.page.waitForTimeout(2000);
  }

  async openCreatedReport(): Promise<void> {
    await this.openReport(this.reportName);
  }

  async deleteReport(reportName: string): Promise<void> {
    await test.step(`Delete report "${reportName}"`, async () => {
      await this.searchReport(reportName);
      await this.loc(L.reportItemMenu).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.reportDeleteOption).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async deleteCreatedReport(): Promise<void> {
    await this.deleteReport(this.reportName);
  }

  async verifyReportDeleted(): Promise<void> {
    await test.step('Verify report deleted', async () => {
      await this.searchReport(this.reportName);
      await this.page.waitForTimeout(2000);
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
      await this.page.waitForTimeout(1000);
      await this.loc(`//li[contains(.,'${reportType}')]`).click();
      await this.page.waitForTimeout(2000);
    });
  }

  // Report Polling
  async pollForReportGeneration(maxWaitTimeInMinutes = 7): Promise<boolean> {
    const maxWaitTimeInSeconds = maxWaitTimeInMinutes * 60;
    const pollingIntervalSeconds = 10;
    let elapsedTime = 0;
    let reportOpened = false;

    while (elapsedTime < maxWaitTimeInSeconds) {
      await this.page.reload();
      await this.page.waitForTimeout(3000);

      if (await this.isVisible(L.reportLoadingIndicator, 2000)) {
        await this.loc(L.reportLoadingIndicator).waitFor({ state: 'hidden', timeout: TIMEOUTS.extraLong });
      }

      const reportVisible = await this.isReportGenerated();

      if (reportVisible) {
        if (!reportOpened) {
          await this.openGeneratedReport();
          reportOpened = true;
          await this.page.waitForTimeout(3000);
        }

        if (await this.isReportDataAvailable()) {
          return true;
        } else {
          await this.page.reload();
          await this.page.waitForTimeout(2000);
          reportOpened = false;
        }
      }

      await this.page.waitForTimeout(pollingIntervalSeconds * 1000);
      elapsedTime += pollingIntervalSeconds + 3;
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
      await this.page.waitForTimeout(2000);
      if (await this.isVisible(reportByName(this.reportName), TIMEOUTS.long)) {
        await this.loc(reportByName(this.reportName)).click();
        await this.page.waitForTimeout(3000);
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

      await this.page.waitForTimeout(2000);
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
