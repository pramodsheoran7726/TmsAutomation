import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { SdkLocators as L, stepDisplayInSdk, stepDisplayInEditor } from './sdk.locators.js';
import { TIMEOUTS } from '../../config/constants.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class SdkPage extends BasePage {
  constructor(page: Page) { super(page); }

  async expandDetails(): Promise<void> {
    await test.step('Expand SDK details', async () => {
      await this.loc(L.sdkExpand).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async collapseDetails(): Promise<void> {
    await test.step('Collapse SDK details', async () => {
      await this.loc(L.sdkCollapse).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async endSession(): Promise<void> {
    await test.step('End SDK session', async () => {
      await this.loc(L.sdkEndSession).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async clickNextStep(): Promise<void> {
    await test.step('Click next step button', async () => {
      await this.loc(L.sdkNextStepButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async navigateToStep(stepNumber: number): Promise<void> {
    await test.step(`Navigate to step ${stepNumber}`, async () => {
      const stepLocators: Record<number, string> = {
        1: L.sdkStep1,
        2: L.sdkStep2,
        3: L.sdkStep3,
        4: L.sdkStep4,
        5: L.sdkStep5,
      };

      const locator = stepLocators[stepNumber];
      if (locator) {
        await this.loc(locator).click();
        await waitForNetworkIdle(this.page);
      }
    });
  }

  async verifyRecordedMediaVisible(): Promise<void> {
    await test.step('Verify recorded media is visible', async () => {
      await expect.soft(this.loc(L.recordMedia)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyTestCaseStatusPassed(): Promise<void> {
    await test.step('Verify test case status is passed', async () => {
      await expect.soft(this.loc(L.tcStatusPassedSdk)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyStatusPassed(): Promise<void> {
    await test.step('Verify status is passed', async () => {
      await expect.soft(this.loc(L.statusPassedSdk)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyBuildSummaryStatusPassed(): Promise<void> {
    await test.step('Verify build summary status is passed', async () => {
      await expect.soft(this.loc(L.tcStatusPassedBuildSummSdk)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async markStatus(): Promise<void> {
    await test.step('Mark SDK status', async () => {
      await this.loc(L.markSdkStatus).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async clickFinish(): Promise<void> {
    await test.step('Click finish button', async () => {
      await this.loc(L.finishSdk).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async clickNext(): Promise<void> {
    await test.step('Click next button', async () => {
      await this.loc(L.tcNextCtaSdk).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async addRemark(remark: string): Promise<void> {
    await test.step('Add remark', async () => {
      await this.loc(L.remarkSdk).fill(remark);
    });
  }

  async addTag(tag: string): Promise<void> {
    await test.step('Add tag', async () => {
      await this.loc(L.projectTagSdk).fill(tag);
      await this.page.keyboard.press('Enter');
      await waitForNetworkIdle(this.page);
    });
  }

  async openMenu(): Promise<void> {
    await test.step('Open SDK menu', async () => {
      await this.loc(L.openMenuSdk).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async openExpandMenu(): Promise<void> {
    await test.step('Open expand menu', async () => {
      await this.loc(L.openExpandMenu).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async clickCollapseToExpand(): Promise<void> {
    await test.step('Click collapse to expand', async () => {
      await this.loc(L.collapseToExpand).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyManualStepVisible(): Promise<void> {
    await test.step('Verify manual step is visible', async () => {
      await expect.soft(this.loc(L.manualStep)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyStepInSdk(step: string): Promise<void> {
    await test.step(`Verify step "${step}" in SDK`, async () => {
      await expect.soft(this.loc(stepDisplayInSdk(step))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyStepInEditor(step: string): Promise<void> {
    await test.step(`Verify step "${step}" in editor`, async () => {
      await expect.soft(this.loc(stepDisplayInEditor(step))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async markStepStatus(status: 'Passed' | 'Failed' | 'Skipped'): Promise<void> {
    await test.step(`Mark step status as ${status}`, async () => {
      await this.markStatus();
      await this.loc(`//span[text()='${status}']`).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async executeTestSteps(stepCount: number, status: 'Passed' | 'Failed' | 'Skipped' = 'Passed'): Promise<void> {
    await test.step(`Execute ${stepCount} test steps with status ${status}`, async () => {
      for (let i = 1; i <= stepCount; i++) {
        await this.markStepStatus(status);
        if (i < stepCount) {
          await this.clickNext();
        }
      }
    });
  }

  async finishTestExecution(): Promise<void> {
    await test.step('Finish test execution', async () => {
      await this.clickFinish();
      await waitForNetworkIdle(this.page);
    });
  }

  async markStepStatusInCollapseMode(stepName: string, status: 'Passed' | 'Failed' | 'Skipped'): Promise<void> {
    await test.step(`Mark step "${stepName}" status as ${status} in collapse mode`, async () => {
      const collapseLocator = L.testStepsStatusCollapse(stepName);
      await this.loc(collapseLocator).click();
      if (status === 'Passed') {
        await this.loc(L.tcStatusPassedSdk).click();
      } else if (status === 'Failed') {
        await this.loc(L.tcStatusFailedSdk).click();
      } else {
        await this.loc(`//span[text()='${status}']`).click();
      }
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyCollapseMode(): Promise<void> {
    await test.step('Verify SDK is in collapse mode', async () => {
      await expect.soft(this.loc(L.collapseToExpand)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifySessionEnded(): Promise<void> {
    await test.step('Verify SDK session has ended', async () => {
      // After ending session, the expand details button should reappear (redirect to run list)
      await expect.soft(this.loc(L.sdkExpand)).not.toBeVisible({ timeout: TIMEOUTS.long });
    });
  }
}
