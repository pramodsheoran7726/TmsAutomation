import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { SdkLocators as L, stepDisplayInSdk, stepDisplayInEditor } from './sdk.locators.js';
import { TIMEOUTS } from '../../config/constants.js';

export class SdkPage extends BasePage {
  constructor(page: Page) { super(page); }

  async expandDetails(): Promise<void> {
    await test.step('Expand SDK details', async () => {
      await this.loc(L.sdkExpand).click();
      await this.page.waitForTimeout(1000);
    });
  }

  async collapseDetails(): Promise<void> {
    await test.step('Collapse SDK details', async () => {
      await this.loc(L.sdkCollapse).click();
      await this.page.waitForTimeout(1000);
    });
  }

  async endSession(): Promise<void> {
    await test.step('End SDK session', async () => {
      await this.loc(L.sdkEndSession).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async clickNextStep(): Promise<void> {
    await test.step('Click next step button', async () => {
      await this.loc(L.sdkNextStepButton).click();
      await this.page.waitForTimeout(1000);
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
        await this.page.waitForTimeout(1000);
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
      await this.page.waitForTimeout(1000);
    });
  }

  async clickFinish(): Promise<void> {
    await test.step('Click finish button', async () => {
      await this.loc(L.finishSdk).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async clickNext(): Promise<void> {
    await test.step('Click next button', async () => {
      await this.loc(L.tcNextCtaSdk).click();
      await this.page.waitForTimeout(1000);
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
      await this.page.waitForTimeout(500);
    });
  }

  async openMenu(): Promise<void> {
    await test.step('Open SDK menu', async () => {
      await this.loc(L.openMenuSdk).click();
      await this.page.waitForTimeout(1000);
    });
  }

  async openExpandMenu(): Promise<void> {
    await test.step('Open expand menu', async () => {
      await this.loc(L.openExpandMenu).click();
      await this.page.waitForTimeout(1000);
    });
  }

  async clickCollapseToExpand(): Promise<void> {
    await test.step('Click collapse to expand', async () => {
      await this.loc(L.collapseToExpand).click();
      await this.page.waitForTimeout(1000);
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
      await this.page.waitForTimeout(1000);
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
      await this.page.waitForTimeout(2000);
    });
  }
}
