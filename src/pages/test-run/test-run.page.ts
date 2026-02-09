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

  async openTestRun(name?: string): Promise<void> {
    await test.step(`Open test run ${name ?? this.testRunName}`, async () => {
      const runName = name ?? this.testRunName;
      await fillAndWaitForSearch(this.page, this.loc(L.searchFieldInLinkProject), runName, this.loc(L.createdTestrunAppear(runName)));
      await this.loc(L.createdTestrunAppear(runName)).click();
    });
  }

  async addTestCases(count = 1): Promise<void> {
    await test.step(`Add ${count} test case(s) to test run`, async () => {
      await this.loc(L.addTcTestRunCta).click();
      await this.page.waitForTimeout(1000);
      for (let i = 0; i < count; i++) {
        await this.loc(L.selectAllCheckboxInTpTestcase).nth(i).click();
      }
      await this.loc(L.updateTestcaseInTestRun).click();
      await expect.soft(this.loc(L.addTcTestRunCta)).toBeVisible({ timeout: TIMEOUTS.medium });
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
      await this.loc(L.instanceStatusDropdown()).click();
      if (status === 'Passed') {
        await this.loc(L.tcStatusPassedButton).click();
      } else if (status === 'Failed') {
        await this.loc(L.tcStatusFailed).click();
      } else if (status === 'Skipped') {
        await this.loc(L.tcStatusSkipButton).click();
      }
      await expect.soft(this.loc(L.instanceStatusDropdownAfter())).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async markBulkStatus(status: 'Passed' | 'Failed' | 'Skipped' | 'Blocked', count = 2): Promise<void> {
    await test.step(`Mark bulk status: ${status} for ${count} items`, async () => {
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
        await this.loc(L.testRunTitle).fill('DELETE');
        await this.loc(L.deleteTestRunCta).click();
        await expect.soft(this.loc(L.createdTestrunAppear(runName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async archiveTestRun(): Promise<void> {
    await test.step('Archive test run', async () => {
      await this.loc(L.createdTestrunOpenMenu(this.testRunName)).click();
      await this.loc(L.archiveTestRun).click();
      await this.loc(L.archiveTestRun).click();
      await expect.soft(this.loc(L.archivedTestRun)).toBeVisible({ timeout: TIMEOUTS.medium });
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

  async verifyTestRunStatus(status: string): Promise<void> {
    await expect.soft(this.loc(L.testRunStatusDropdown)).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async backToTestRunList(): Promise<void> {
    await this.loc(L.backtoTestRunList).click();
  }
}
