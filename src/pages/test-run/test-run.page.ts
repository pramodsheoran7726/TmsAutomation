import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { TestRunLocators as L } from './test-run.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { waitForNetworkIdle, clickAndWaitForNetwork, fillAndWaitForSearch } from '../../utils/wait.helper.js';

export class TestRunPage extends BasePage {
  testRunName = `AutoTestRun_${randomString(RANDOM_LENGTH.standard)}`;
  newTestRunName = `AutoTestRun_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  /** Click the "select all" checkbox to select all test cases. */
  private async clickSelectAllCheckbox(): Promise<void> {
    await this.page.locator('input#all').click();
  }

  async createTestRun(name?: string): Promise<void> {
    await test.step('Create new test run', async () => {
      const runName = name ?? this.testRunName;
      await clickAndWaitForNetwork(this.page, this.loc(L.testRunNav));
      await this.loc(L.createTestRunButton).first().click({ timeout: TIMEOUTS.long });
      await this.loc(L.testRunTitle).fill(runName);
      await this.loc(L.testRunDescription).fill(randomString(RANDOM_LENGTH.long));
      await this.loc(L.saveTestRunCta).last().click({ timeout: TIMEOUTS.long });

      await waitForNetworkIdle(this.page);
      // If we're not on the test runs list, navigate back
      if (!(await this.isVisible(L.createdTestrunAppear(runName), TIMEOUTS.medium))) {
        await clickAndWaitForNetwork(this.page, this.loc(L.testRunNav));
      }
      await expect.soft(this.loc(L.createdTestrunAppear(runName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createTestRunWithConfig(name?: string): Promise<void> {
    await test.step('Create test run with configuration (no assignee)', async () => {
      const runName = name ?? this.testRunName;
      await clickAndWaitForNetwork(this.page, this.loc(L.testRunNav));
      await this.loc(L.createTestRunButton).first().click({ timeout: TIMEOUTS.long });
      await this.loc(L.testRunTitle).fill(runName);
      await this.loc(L.testRunDescription).fill(randomString(RANDOM_LENGTH.long));
      await this.loc(L.testRunTag).fill(`tag_${randomString(RANDOM_LENGTH.short)}`);
      await this.page.keyboard.press('Enter');
      // Create test run (opens edit screen with test cases)
      await this.loc(L.saveTestRunCta).last().click({ timeout: TIMEOUTS.long });
      await waitForNetworkIdle(this.page);
      // Wait for test cases to load, then select all
      await this.loc(L.testCaseRowLoaded).first().waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      await this.clickSelectAllCheckbox();
      await this.loc(L.addTcTestRunCta).click();
      await waitForNetworkIdle(this.page);
      // Verify missing config/assignee message
      await expect.soft(this.loc(L.missingMsgTR)).toBeVisible({ timeout: TIMEOUTS.medium });
      // Add configuration (skip assignee)
      await this.loc(L.addConfigCtaTP).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.selectConfigCheck).first().click();
      await this.loc(L.applyConfiguration).click();
      await waitForNetworkIdle(this.page);
      // Save test run
      await this.loc(L.saveTestRun).click({ timeout: TIMEOUTS.long });
      await waitForNetworkIdle(this.page);
      // Verify test run appears on instances page
      await expect.soft(this.loc(L.createdTestrunAppearInstancesPage(runName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createTestRunWithConfigAndAssignee(name?: string): Promise<void> {
    await test.step('Create test run with configuration and assignee', async () => {
      const runName = name ?? this.testRunName;
      await clickAndWaitForNetwork(this.page, this.loc(L.testRunNav));
      await this.loc(L.createTestRunButton).first().click({ timeout: TIMEOUTS.long });
      await this.loc(L.testRunTitle).fill(runName);
      await this.loc(L.testRunDescription).fill(randomString(RANDOM_LENGTH.long));
      // Create test run (opens edit screen with test cases)
      await this.loc(L.saveTestRunCta).last().click({ timeout: TIMEOUTS.long });
      await waitForNetworkIdle(this.page);
      // Wait for test cases to load, then select all
      await this.loc(L.testCaseRowLoaded).first().waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      await this.clickSelectAllCheckbox();
      await this.loc(L.addTcTestRunCta).click();
      await waitForNetworkIdle(this.page);
      // Verify missing config/assignee message
      await expect.soft(this.loc(L.missingMsgTR)).toBeVisible({ timeout: TIMEOUTS.medium });
      // Add configuration
      await this.loc(L.addConfigCtaTP).click();
      await waitForNetworkIdle(this.page);
      await this.page.waitForTimeout(1000);
      await this.loc(L.selectConfigCheck).first().click();
      await this.loc(L.applyConfiguration).click();
      await waitForNetworkIdle(this.page);
      // Add assignee
      await this.loc(L.selectAssigneeTRPageButton1).click();
      await this.loc(L.selectAssignee).click();
      await waitForNetworkIdle(this.page);
      // Save test run
      await this.loc(L.saveTestRun).click({ timeout: TIMEOUTS.long });
      await waitForNetworkIdle(this.page);
      // Verify test run appears on instances page
      await expect.soft(this.loc(L.createdTestrunAppearInstancesPage(runName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createTestRunWithTestCases(name?: string): Promise<void> {
    await test.step('Create test run with test cases', async () => {
      const runName = name ?? this.testRunName;
      await clickAndWaitForNetwork(this.page, this.loc(L.testRunNav));
      await this.loc(L.createTestRunButton).first().click({ timeout: TIMEOUTS.long });
      await this.loc(L.testRunTitle).fill(runName);
      await this.loc(L.testRunDescription).fill(randomString(RANDOM_LENGTH.long));
      // Create test run (opens edit screen with test cases)
      await this.loc(L.saveTestRunCta).last().click({ timeout: TIMEOUTS.long });
      await waitForNetworkIdle(this.page);
      // Wait for test cases to load, then select all
      await this.loc(L.testCaseRowLoaded).first().waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      await this.clickSelectAllCheckbox();
      await this.loc(L.addTcTestRunCta).click();
      await waitForNetworkIdle(this.page);
      // Add configuration for all unconfigured TCs (required to save)
      await expect.soft(this.loc(L.missingMsgTR).first()).toBeVisible({ timeout: TIMEOUTS.medium });
      const configBtnCount = await this.loc(L.addConfigCtaTP).count();
      for (let i = 0; i < configBtnCount; i++) {
        await this.loc(L.addConfigCtaTP).first().click();
        await this.loc(L.selectConfigCheck).first().waitFor({ state: 'visible', timeout: TIMEOUTS.long });
        await this.loc(L.applyConfiguration).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
        await this.loc(L.selectConfigCheck).first().click();
        await this.loc(L.applyConfiguration).click();
        await this.loc(L.applyConfiguration).waitFor({ state: 'hidden', timeout: TIMEOUTS.medium });
      }
      // Save test run
      await this.loc(L.saveTestRun).click({ timeout: TIMEOUTS.long });
      await this.loc(L.saveTestRun).waitFor({ state: 'hidden', timeout: TIMEOUTS.medium });
      await waitForNetworkIdle(this.page);
      // Verify test run appears on instances page
      await expect.soft(this.loc(L.createdTestrunAppearInstancesPage(runName)).first()).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async openTestRun(name?: string): Promise<void> {
    await test.step(`Open test run ${name ?? this.testRunName}`, async () => {
      const runName = name ?? this.testRunName;
      // Navigate to test run list based on current page context
      if (await this.isVisible(L.testRunNav, TIMEOUTS.medium)) {
        await clickAndWaitForNetwork(this.page, this.loc(L.testRunNav));
      } else if (await this.isVisible(L.backtoTestRunList, TIMEOUTS.short)) {
        await this.loc(L.backtoTestRunList).click();
        await waitForNetworkIdle(this.page);
      } else {
        // Fallback: navigate to test runs via the project tab directly
        await clickAndWaitForNetwork(this.page, this.loc(L.testRunNav));
      }
      await fillAndWaitForSearch(this.page, this.loc(L.searchFieldInLinkProject), runName, this.loc(L.createdTestrunAppear(runName)));
      await this.loc(L.createdTestrunAppear(runName)).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async addTestCases(count = 1): Promise<void> {
    await test.step(`Add ${count} test case(s) to test run`, async () => {
      await this.loc(L.addTcTestRunCta).click();
      // Wait for test case rows to load before selecting
      await this.loc(L.testCaseRowLoaded).first().waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      await this.clickSelectAllCheckbox();
      await this.loc(L.updateTestcaseInTestRun).click();
      await expect.soft(this.loc(L.saveTestRun)).toBeVisible({ timeout: TIMEOUTS.medium });
      await this.loc(L.saveTestRun).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async selectConfiguration(configName: string): Promise<void> {
    await test.step(`Select configuration: ${configName}`, async () => {
      await this.loc(L.selectConfigCtaConfPopup).click();
      await this.loc(L.selectConfigCheck).click();
      await this.loc(L.selectConfigButton).click();
    });
  }

  async selectAssignee(assigneeName: string): Promise<void> {
    await test.step(`Select assignee: ${assigneeName}`, async () => {
      await this.loc(L.selectAssigneeTRPageButton).click();
      await this.loc(L.searchFieldInLinkProject).fill(assigneeName);
      await this.loc(L.selectAssignee).click();
      await this.loc(L.selectAssigneeTRPageButton1).click();
    });
  }

  async markStatus(status: 'Passed' | 'Failed' | 'Skipped' | 'Blocked'): Promise<void> {
    await test.step(`Mark test case status: ${status}`, async () => {
      await this.loc(L.instanceStatusDropdown()).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.instanceStatusDropdown()).click();
      await this.loc(`//div[@role='option'][@data-id='${status}']`).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(`//div[@role='option'][@data-id='${status}']`).click();
      await waitForNetworkIdle(this.page);
      await this.page.waitForTimeout(3000);
    });
  }

  async markBulkStatus(status: 'Passed' | 'Failed' | 'Skipped' | 'Blocked', count = 2): Promise<void> {
    await test.step(`Mark bulk status: ${status} for ${count} items`, async () => {
      await waitForNetworkIdle(this.page);
      await this.page.waitForTimeout(1000);
      // Ensure fresh selection: uncheck select-all if already checked from previous bulk operation
      const selectAll = this.loc(L.selectInstancesInBulk).first();
      if (await selectAll.isChecked()) {
        await selectAll.click();
        await this.page.waitForTimeout(500);
      }
      for (let i = 0; i < count; i++) {
        await this.loc(L.selectInstancesInBulk).nth(i).click();
      }
      await this.loc(L.bulkStatusDropdown).click();
      if (status === 'Passed') {
        await this.loc(L.tcStatusPassedInstancesPageBulk).click();
      } else if (status === 'Failed') {
        await this.loc(L.tcStatusFailed).click();
      } else if (status === 'Skipped') {
        await this.loc(L.tcStatusSkip).click();
      }
      await expect.soft(this.loc(L.bulkStatus)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async markBulkAssignee(count = 2): Promise<void> {
    await test.step(`Mark bulk assignee for ${count} items`, async () => {
      await waitForNetworkIdle(this.page);
      // Wait for instance checkboxes to be rendered and interactive
      await this.loc(L.selectInstancesInBulk).first().waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < count; i++) {
        await this.loc(L.selectInstancesInBulk).nth(i).click();
      }
      await this.loc(L.bulkAssigneeDropdown).click();
      await this.loc(L.bulkSelectAssignee).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async editTestRun(): Promise<void> {
    await test.step('Edit test run name', async () => {
      await this.loc(L.createdTestrunOpenMenu(this.testRunName)).click();
      await this.loc(L.editCtaInsideTR).click();
      await this.loc(L.testRunTitle).clear();
      this.testRunName = `EditedTestRun_${randomString(RANDOM_LENGTH.standard)}`;
      await this.loc(L.testRunTitle).fill(this.testRunName);
      await this.loc(L.saveTestRunCta).click();
      await expect.soft(this.loc(L.createdTestrunAppear(this.testRunName))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async deleteTestRun(name?: string): Promise<void> {
    await test.step(`Delete test run ${name ?? this.testRunName}`, async () => {
      const runName = name ?? this.testRunName;
      await fillAndWaitForSearch(this.page, this.loc(L.searchFieldInLinkProject), runName);
      if (await this.isVisible(L.createdTestrunAppear(runName))) {
        await this.loc(L.createdTestrunOpenMenu(runName)).click();
        await this.loc(L.deleteInsideTR).click();
        await this.loc(L.testrunDeleteButton).click();
        await expect.soft(this.loc(L.createdTestrunAppear(runName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async deleteTestRunFromListPage(name?: string): Promise<void> {
    await test.step('Delete test run from list page', async () => {
      const runName = name ?? this.testRunName;
      await this.loc(L.backtoTestRunList).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.createdTestrunOpenMenu(runName)).first().click();
      await this.loc(L.deleteInsideTR).click();
      await this.loc(L.testrunDeleteButton).click();
      await expect.soft(this.loc(L.createdTestrunAppear(runName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async deleteTestRunFromEditPage(name?: string): Promise<void> {
    await test.step('Delete test run from edit page', async () => {
      const runName = name ?? this.testRunName;
      await this.loc(L.editCtaInsideTR).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.deleteTestRunCta).click();
      await this.loc(L.deleteInsideTR).click();
      await expect.soft(this.loc(L.createdTestrunAppear(runName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async archiveTestRun(): Promise<void> {
    await test.step('Archive test run', async () => {
      await fillAndWaitForSearch(this.page, this.loc(L.searchFieldInLinkProject), this.testRunName, this.loc(L.createdTestrunAppear(this.testRunName)));
      await waitForNetworkIdle(this.page);
      await this.page.waitForTimeout(500);
      await this.loc(L.createdTestrunOpenMenu(this.testRunName)).click();
      await this.loc(L.archiveTestRun).click();
      await waitForNetworkIdle(this.page);
      // After archiving, the test run disappears from the active view
      await expect.soft(this.loc(L.createdTestrunAppear(this.testRunName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async duplicateTestRun(): Promise<void> {
    await test.step('Duplicate test run', async () => {
      await this.loc(L.createdTestrunOpenMenu(this.testRunName)).click();
      await this.loc(L.duplicateTestRun).click();
      this.newTestRunName = `Duplicate_${this.testRunName}`;
      await this.loc(L.testRunTitle).fill(this.newTestRunName);
      await this.loc(L.saveTestRunCta).click();
      await expect.soft(this.loc(L.createdTestrunAppear(this.newTestRunName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async duplicateTestRunFromList(name?: string): Promise<void> {
    await test.step('Duplicate test run from list', async () => {
      const runName = name ?? this.testRunName;
      await this.loc(L.backtoTestRunList).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.createdTestrunOpenMenu(runName)).first().click();
      await this.loc(L.duplicateTestRun).click();
      await waitForNetworkIdle(this.page);
      // Duplicate navigates to edit page — go back to test run list
      await this.page.locator(`//button[.//span[text()='Test Run']]`).click();
      await waitForNetworkIdle(this.page);
      // Search for the duplicated test run
      await fillAndWaitForSearch(this.page, this.loc(L.searchFieldInLinkProject), `Copy of ${runName}`, this.loc(L.duplicateTestRunByName(runName)));
      await expect.soft(this.loc(L.duplicateTestRunByName(runName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async editTestRunAddTestCase(existingTcTitle: string, newTcTitle: string): Promise<void> {
    await test.step('Edit test run and add new test case', async () => {
      // Navigate to test run list and open the test run
      await clickAndWaitForNetwork(this.page, this.loc(L.testRunNav));
      await fillAndWaitForSearch(this.page, this.loc(L.searchFieldInLinkProject), this.testRunName, this.loc(L.createdTestrunAppear(this.testRunName)));
      await this.loc(L.createdTestrunAppear(this.testRunName)).click();
      await waitForNetworkIdle(this.page);
      // Click Edit from instances page to go to edit page
      await this.loc(L.editCtaInsideTR).click();
      await waitForNetworkIdle(this.page);
      // Verify old TC visible, new TC NOT visible
      await expect.soft(this.loc(L.createdTestrunAppearInstancesPage(existingTcTitle)).first()).toBeVisible({ timeout: TIMEOUTS.medium });
      await expect.soft(this.loc(L.createdTestrunAppearInstancesPage(newTcTitle))).not.toBeVisible({ timeout: TIMEOUTS.short });
      // Add new test case
      await this.loc(L.addTcInTR).click();
      await this.page.waitForTimeout(1000);
      await this.clickSelectAllCheckbox();
      await this.loc(L.updateTestcaseInTestRun).click();
      await waitForNetworkIdle(this.page);
      // Verify both TCs visible
      await expect.soft(this.loc(L.createdTestrunAppearInstancesPage(existingTcTitle)).first()).toBeVisible({ timeout: TIMEOUTS.medium });
      await expect.soft(this.loc(L.createdTestrunAppearInstancesPage(newTcTitle)).first()).toBeVisible({ timeout: TIMEOUTS.medium });
      // Add configuration for newly added TC
      await this.loc(L.addConfigCtaTP).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.selectConfigCheck).first().click();
      await this.loc(L.applyConfiguration).click();
      await waitForNetworkIdle(this.page);
      // Save test run
      await this.loc(L.saveTestRun).click({ timeout: TIMEOUTS.long });
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyTestRunStatus(status: string): Promise<void> {
    await test.step(`Verify test run status is ${status}`, async () => {
      await expect.soft(this.loc(`//span[text()='${status}']`)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyTestCasesInInstances(...titles: string[]): Promise<void> {
    await test.step('Verify test cases in test run instances', async () => {
      for (const title of titles) {
        await expect.soft(this.loc(L.testrunStepInstances(title))).toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async openTestCaseInInstances(title: string): Promise<void> {
    await test.step(`Open test case ${title} in instances`, async () => {
      // Use page.goto instead of click — SPA click may not navigate
      const link = this.page.locator(`//a[text()="${title}"]`);
      await link.waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      const href = await link.getAttribute('href');
      const baseUrl = new URL(this.page.url()).origin;
      await this.page.goto(`${baseUrl}${href}`, { waitUntil: 'domcontentloaded' });
    });
  }

  async markStepStatus(stepName: string, status: 'Passed' | 'Failed' | 'Skipped'): Promise<void> {
    await test.step(`Mark step "${stepName}" status to ${status}`, async () => {
      await this.loc(L.testStepsStatus(stepName)).click();
      if (status === 'Passed') {
        await this.loc(L.tcStatusPassedButton).click();
      } else if (status === 'Failed') {
        await this.loc(L.tcStatusFailed).click();
      } else if (status === 'Skipped') {
        await this.loc(L.tcStatusSkip).click();
      }
      await this.page.waitForTimeout(1000);
    });
  }

  async markTestRunOverallStatus(): Promise<void> {
    await test.step('Mark test run overall status to Passed', async () => {
      await this.loc(L.testRunStatusDropdown).click();
      await this.loc(L.testRunStatusPassed).click();
      await expect.soft(this.loc(L.testRunStatusPassed)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyManualRunRemark(): Promise<void> {
    await test.step('Verify manual run remark', async () => {
      await expect.soft(this.loc(L.manualRunRemark).first()).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async backToTestRunList(): Promise<void> {
    await this.loc(L.backtoTestRunList).click();
  }

  async backToInstances(): Promise<void> {
    await this.loc(L.backtoTestRunList).click();
    await waitForNetworkIdle(this.page);
  }

  async addConfigFromInstances(): Promise<void> {
    await test.step('Add configuration from instances page', async () => {
      await this.loc(L.addConfigFromInstancesCta).click();
      await this.loc(L.addConfigFromInstancesSelect).click();
      await this.loc(L.addConfigFromInstancesApply).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async addVariableFromInstances(variable: {
    os?: string;
    browser?: string;
    resolution?: string;
    url?: string;
  }): Promise<void> {
    await test.step('Add variable from instances page', async () => {
      await this.loc(L.addVariableCta).click();
      if (variable.os) {
        await this.loc(L.addVariableOs).fill(variable.os);
      }
      if (variable.browser) {
        await this.loc(L.addVariableBrowser).fill(variable.browser);
      }
      if (variable.resolution) {
        await this.loc(L.addVariableResolution).fill(variable.resolution);
      }
      if (variable.url) {
        await this.loc(L.addVariableUrl).fill(variable.url);
      }
      await this.loc(L.addVariableSave).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyExecutionHistory(statuses: string[]): Promise<void> {
    await test.step('Verify execution history statuses', async () => {
      await this.loc(L.executionHistoryTab).click();
      await this.page.waitForTimeout(2000);
      for (const status of statuses) {
        await expect.soft(this.loc(L.executionHistoryStatus(status))).toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async clickEditTestRun(): Promise<void> {
    await test.step('Click edit test run', async () => {
      await this.loc(L.editCtaInsideTR).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async configurationAddedFromNoConfiguration(): Promise<void> {
    await test.step('No configuration added', async () => {
      await expect.soft(this.loc(L.noConfigurationAddedBtn)).toBeVisible({ timeout: TIMEOUTS.medium });
      await this.loc(L.noConfigurationAddedBtn).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.checkBoxConfiguration).click();
      await this.loc(L.applyConfiguration).click();
      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.noConfigurationAddedBtn)).not.toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }
}