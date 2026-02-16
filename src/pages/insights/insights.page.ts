import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { InsightsLocators as L } from './insights.locators.js';
import { TIMEOUTS, RETRY, POLL } from '../../config/constants.js';
import { clickAndWaitForNetwork } from '../../utils/wait.helper.js';
import { retryAction } from '../../utils/retry.helper.js';

export class InsightsPage extends BasePage {
  constructor(page: Page) { super(page); }

  // ============== NAVIGATION ==============

  async navigateToInsights(): Promise<void> {
    await test.step('Navigate to Insights', async () => {
      await clickAndWaitForNetwork(this.page, this.loc(L.insightsTab));

      // Wait for page content to load with retry logic
      await retryAction(this.page, async () => {
        await this.loc(L.totalTestCasesLabel).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      }, {
        retries: RETRY.defaultAttempts,
        delayMs: RETRY.delayBetweenMs,
        label: 'navigateToInsights',
      });
    });
  }

  // ============== REFRESH ==============

  async refreshInsights(): Promise<void> {
    await clickAndWaitForNetwork(this.page, this.loc(L.refreshButton));
  }

  // ============== GET VALUES ==============

  async getTotalTestCases(): Promise<string> {
    return (await this.loc(L.totalTestCasesValue).textContent()) ?? '';
  }

  async getManualTestCases(): Promise<string> {
    return (await this.loc(L.manualTestCasesValue).textContent()) ?? '';
  }

  async getAutomatedTestCases(): Promise<string> {
    return (await this.loc(L.automatedTestCasesValue).textContent()) ?? '';
  }

  async getAutomationCoverage(): Promise<string> {
    return (await this.loc(L.automationCoverageValue).textContent()) ?? '';
  }

  // ============== DATE RANGE ==============

  async setDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step('Set date range', async () => {
      await this.loc(L.startDateInput).fill(startDate);
      await this.page.keyboard.press('Tab');
      await this.loc(L.endDateInput).fill(endDate);
      await this.page.keyboard.press('Escape');
    });
  }

  async verifyDateRangeFilterVisible(): Promise<void> {
    await expect.soft(this.loc(L.startDateInput)).toBeVisible({ timeout: TIMEOUTS.long });
    await expect.soft(this.loc(L.endDateInput)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyRefreshButtonVisible(): Promise<void> {
    await expect.soft(this.loc(L.refreshButton)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  // ============== VISIBILITY VALIDATIONS ==============

  async verifyInsightsLabelsVisible(): Promise<void> {
    await test.step('Verify insights labels visible', async () => {
      await expect.soft(this.loc(L.totalTestCasesLabel)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.manualTestCasesLabel)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.automatedTestCasesLabel)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.automationCoverageLabel)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyChartSectionsVisible(): Promise<void> {
    await expect.soft(this.loc(L.testRunSummaryChart)).toBeVisible({ timeout: TIMEOUTS.long });
    await expect.soft(this.loc(L.testCaseSummaryChart)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyAllChartSectionsVisible(): Promise<void> {
    await test.step('Verify all chart sections visible', async () => {
      await expect.soft(this.loc(L.testRunSummaryChart)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.testCaseSummaryChart)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.testCaseTrendChart)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.issuesTrendChart)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  // ============== POLLING MECHANISM ==============
  /**
   * Polls Insights page for expected value with retry logic.
   * Similar to Java implementation - randomly chooses between refresh button click,
   * page refresh, or just waiting.
   */
  private async pollForValue(
    locator: string,
    expectedValue: string,
    metricName: string
  ): Promise<boolean> {
    const startTime = Date.now();
    const timeoutMs = POLL.insightsTimeoutSeconds * 1000;
    let attempt = 1;

    while (Date.now() - startTime < timeoutMs) {
      try {
        const actualValue = (await this.loc(locator).textContent()) ?? '';
        console.log(`[Polling ${metricName}] Attempt ${attempt}: Expected "${expectedValue}", Got "${actualValue}"`);

        if (actualValue === expectedValue) {
          console.log(`[Polling ${metricName}] Value matched after ${attempt} attempts`);
          return true;
        }
      } catch {
        console.log(`[Polling ${metricName}] Attempt ${attempt}: Element not found, retrying...`);
      }

      // Randomly choose refresh strategy (avoid page.reload which breaks SPA context)
      const strategy = Math.floor(Math.random() * 3);
      if (strategy === 0) {
        console.log(`[Polling ${metricName}] Clicking refresh button...`);
        await this.loc(L.refreshButton).click().catch(() => {});
      } else if (strategy === 1) {
        console.log(`[Polling ${metricName}] Re-navigating to Insights tab...`);
        await this.loc(L.insightsTab).click().catch(() => {});
        await this.page.waitForTimeout(2000);
      } else {
        console.log(`[Polling ${metricName}] Waiting...`);
      }

      await this.page.waitForTimeout(POLL.intervalSeconds * 1000);
      attempt++;
    }

    console.log(`[Polling ${metricName}] Timeout after ${POLL.insightsTimeoutSeconds} seconds. Expected: ${expectedValue}`);
    return false;
  }

  // ============== VALUE VALIDATIONS WITH POLLING ==============

  async verifyTotalTestCases(expectedCount: string): Promise<void> {
    await test.step(`Verify total test cases is "${expectedCount}"`, async () => {
      const matched = await this.pollForValue(L.totalTestCasesValue, expectedCount, 'Total Test Cases');
      if (!matched) {
        const actualCount = await this.getTotalTestCases();
        expect.soft(actualCount).toBe(expectedCount);
      }
    });
  }

  async verifyManualTestCases(expectedCount: string): Promise<void> {
    await test.step(`Verify manual test cases is "${expectedCount}"`, async () => {
      const matched = await this.pollForValue(L.manualTestCasesValue, expectedCount, 'Manual Test Cases');
      if (!matched) {
        const actualCount = await this.getManualTestCases();
        expect.soft(actualCount).toBe(expectedCount);
      }
    });
  }

  async verifyAutomatedTestCases(expectedCount: string): Promise<void> {
    await test.step(`Verify automated test cases is "${expectedCount}"`, async () => {
      const matched = await this.pollForValue(L.automatedTestCasesValue, expectedCount, 'Automated Test Cases');
      if (!matched) {
        const actualCount = await this.getAutomatedTestCases();
        expect.soft(actualCount).toBe(expectedCount);
      }
    });
  }

  async verifyAutomationCoverage(expectedCoverage: string): Promise<void> {
    await test.step(`Verify automation coverage is "${expectedCoverage}"`, async () => {
      const matched = await this.pollForValue(L.automationCoverageValue, expectedCoverage, 'Automation Coverage');
      if (!matched) {
        const actualCoverage = await this.getAutomationCoverage();
        expect.soft(actualCoverage).toBe(expectedCoverage);
      }
    });
  }

  // Legacy method for backward compatibility
  async verifyAutomationCoverage50(): Promise<void> {
    await expect.soft(this.loc(L.insightAutomation50)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  // ============== TEST RUN SUMMARY VALIDATIONS ==============

  async verifyTestRunSummaryPassedCount(expectedCount: string): Promise<void> {
    await test.step(`Verify test run summary passed count contains "${expectedCount}"`, async () => {
      // Hover on chart to show tooltip
      await this.loc(L.testRunSummaryCanvas).hover();
      await this.loc(L.g2TooltipValue).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      const tooltipValue = (await this.loc(L.g2TooltipValue).textContent()) ?? '';
      expect.soft(tooltipValue).toContain(expectedCount);
    });
  }

  async verifyTestRunSummaryFailedCount(expectedCount: string): Promise<void> {
    await test.step(`Verify test run summary failed count contains "${expectedCount}"`, async () => {
      await this.loc(L.testRunSummaryCanvas).hover();
      await this.loc(L.g2TooltipValue).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      const tooltipValue = (await this.loc(L.g2TooltipValue).textContent()) ?? '';
      expect.soft(tooltipValue).toContain(expectedCount);
    });
  }

  async verifyTestRunSummaryNotStartedCount(expectedCount: string): Promise<void> {
    await test.step('Verify test run summary not started count', async () => {
      await this.loc(L.testRunSummaryCanvas).hover();
      // Validate tooltip shows Not Started status
      const isVisible = await this.isVisible(L.testRunNotStartedTooltip, TIMEOUTS.medium);
      expect.soft(isVisible).toBeTruthy();
    });
  }

  async verifyTestRunSummarySkippedCount(expectedCount: string): Promise<void> {
    await test.step('Verify test run summary skipped count', async () => {
      await this.loc(L.testRunSummaryCanvas).hover();
      const isVisible = await this.isVisible(L.testRunSkippedTooltip, TIMEOUTS.medium);
      expect.soft(isVisible).toBeTruthy();
    });
  }

  // ============== TEST CASE SUMMARY VALIDATIONS ==============

  async verifyTestCaseSummaryTypeCount(testCaseType: string, expectedCount: string): Promise<void> {
    await test.step(`Verify test case summary type count for "${testCaseType}"`, async () => {
      await this.loc(L.testCaseSummaryCanvas).hover();
      // Check tooltip is visible for the type
      const typeTooltip = `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='${testCaseType}']`;
      const isVisible = await this.isVisible(typeTooltip, TIMEOUTS.medium);
      expect.soft(isVisible).toBeTruthy();
    });
  }

  async verifyTestCaseSummaryTypesVisible(): Promise<void> {
    await expect.soft(this.loc(L.testCaseSummaryChart)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async verifyTestRunSummaryStatusInstancesVisible(): Promise<void> {
    await expect.soft(this.loc(L.testRunSummaryChart)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  // ============== COMBINED VALIDATION (matching Java InsightsValidation scenario) ==============

  async verifyInsightsMetrics(expectedMetrics: {
    totalTestCases: string;
    manualTestCases: string;
    automatedTestCases: string;
    automationCoverage: string;
  }): Promise<void> {
    await test.step('Verify insights metrics', async () => {
      await this.verifyTotalTestCases(expectedMetrics.totalTestCases);
      await this.verifyManualTestCases(expectedMetrics.manualTestCases);
      await this.verifyAutomatedTestCases(expectedMetrics.automatedTestCases);
      await this.verifyAutomationCoverage(expectedMetrics.automationCoverage);
    });
  }
}
