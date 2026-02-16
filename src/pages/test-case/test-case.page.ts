import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { TestCaseLocators as L } from './test-case.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';

export class TestCasePage extends BasePage {
  testCaseTitle = `AutoTC_${randomString(RANDOM_LENGTH.standard)}`;
  newTestCaseTitle = `AutoTC_${randomString(RANDOM_LENGTH.standard)}`;
  testStep = randomString(RANDOM_LENGTH.standard);
  testStepOutcome = randomString(RANDOM_LENGTH.standard);
  testCaseTag = randomString(RANDOM_LENGTH.standard);

  constructor(page: Page) {
    super(page);
  }

  async createTestCase(title?: string): Promise<void> {
    await test.step('Create new test case', async () => {
      const name = title ?? this.testCaseTitle;
      await this.loc(L.createTestcaseByField).click();
      const input = this.loc(L.createTestcaseByInputField).last();
      await input.click({ timeout: TIMEOUTS.long });
      await input.fill(name);
      await this.page.keyboard.press('Enter');
      await expect.soft(this.loc(L.createdTC(name))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async openTestCase(title?: string): Promise<void> {
    await test.step('Open test case', async () => {
      const tcName = title ?? this.testCaseTitle;
      const link = this.loc(L.createdTC(tcName));
      // Wait for the href to contain a valid test case ID (not 'undefined').
      // The link renders immediately but the API may not have returned the ID yet.
      await expect(link).toHaveAttribute('href', /\/test-cases\/(?!undefined)/, { timeout: TIMEOUTS.medium });
      // Use page.goto() with the href to force a full navigation (the SPA
      // intercepts clicks and stays on web-frontend, which can't render the
      // test case detail page — it only works on test-manager domain).
      const href = await link.getAttribute('href');
      if (href) {
        await this.page.goto(href, { waitUntil: 'domcontentloaded' });
      } else {
        await link.click();
      }
      // Wait for the test case detail page to render (SPA may need time after navigation)
      await this.loc(L.backFromEditTC).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
    });
  }

  async selectTestCaseType(type = 'Functional'): Promise<void> {
    await test.step(`Select test case type: ${type}`, async () => {
      await this.loc(L.typeDropdownTestcaseStage).click();
      await this.loc(this.tpl(L.selectTestType, { type })).click();
      await this.page.waitForTimeout(500);
    });
  }

  async selectAutomationStatus(): Promise<void> {
    await test.step('Select automation status: Automated', async () => {
      await this.loc(L.automationDropdownTestcaseStage).click();
      await this.loc(L.selectAutomatedAutomationStatus).click();
      await this.page.waitForTimeout(500);
    });
  }

  async selectTestCaseStatus(): Promise<void> {
    await test.step('Select test case status: Live', async () => {
      await this.loc(L.statusDropdownTestcaseStage).click();
      await this.page.waitForTimeout(500);
      await this.loc(L.selectOpenTestStatus).click();
      await this.page.waitForTimeout(500);
    });
  }

  async selectPriority(priority: string): Promise<void> {
    await test.step(`Select priority: ${priority}`, async () => {
      await this.loc(L.priorityDropdownTestcaseStage).click();
      await this.page.waitForTimeout(500);
      await this.loc(this.tpl(L.selectHighTestPriority, { priority })).click();
      await this.page.waitForTimeout(500);
    });
  }

  async uploadAttachment(filePath: string): Promise<void> {
    await test.step('Upload attachment to test case', async () => {
      await this.loc(L.attachmentInTestcase).setInputFiles(filePath);
      await expect.soft(this.loc(L.verifyAttachmentInTestcase)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createManualStep(description: string, outcome: string): Promise<void> {
    await test.step('Create manual test step', async () => {
      await this.loc(L.stepNav).click();

      // Fill step description
      const descEditor = this.loc(L.createStep);
      await descEditor.waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      await descEditor.click();
      await this.page.keyboard.type(description);

      // Fill step outcome
      const outcomeEditor = this.loc(L.addStepOutout);
      await outcomeEditor.waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      await outcomeEditor.click();
      await this.page.keyboard.type(outcome);

      // Submit and save
      await this.loc(L.createStepCta).click();
      await this.loc(L.saveTestCase).click();
      if (await this.isVisible(L.saveTestCaseCommitMessage, TIMEOUTS.medium)) {
        await this.loc(L.saveTestCaseCommitMessage).click();
      }
    });
  }

  async createStepViaAI(): Promise<void> {
    await test.step('Create test step via AI', async () => {
      await this.loc(L.aiButton).click();
      await this.page.waitForTimeout(2000);
      await this.loc(L.createStepCta).click();
      await expect.soft(this.loc(L.verifyAiTeststep)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async saveChanges(): Promise<void> {
    await test.step('Save test case changes', async () => {
      const saveBtn = this.loc(L.saveTestCase).first();
      // Wait for the Save button to become enabled (React may still be re-rendering)
      await expect(saveBtn).toBeEnabled({ timeout: TIMEOUTS.medium });
      await saveBtn.click({ timeout: TIMEOUTS.long });
      if (await this.isVisible(L.saveTestCaseCommitMessage, TIMEOUTS.medium)) {
        await this.loc(L.saveTestCaseCommitMessage).click();
      }
      await this.page.waitForTimeout(1000);
    });
  }

  async deleteTestCase(): Promise<void> {
    await test.step('Delete test case', async () => {
      await this.loc(L.testcaseDeleteOpenMenu).click();
      await this.loc(L.testcaseDeleteButton).click();
      await this.loc(L.testcaseDeleteConfirmation).click();
      await expect.soft(this.loc(L.createdTC(this.testCaseTitle))).not.toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async addTag(tag?: string): Promise<void> {
    await test.step('Add tag to test case', async () => {
      const tagValue = tag ?? this.testCaseTag;
      await this.loc(L.addTagTc).click();
      await this.loc(L.addTagFieldTc).fill(tagValue);
      await this.page.keyboard.press('Enter');
    });
  }

  async searchTestCase(query: string): Promise<void> {
    await this.loc(L.searchTcInput).fill(query);
    await this.page.waitForTimeout(2000);
  }

  async selectScenarioType(): Promise<void> {
    await test.step('Select scenario type', async () => {
      await this.loc(L.stepNav).click();
      await this.loc(L.manualStepDropdown).click();
      await this.loc(L.scenarioTypeDropdown).click();
      await this.loc(L.scenarioField).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
    });
  }

  async addScenario(scenarioText: string, { isNew = false } = {}): Promise<void> {
    await test.step(isNew ? 'Add another scenario' : 'Add scenario', async () => {
      if (isNew) await this.loc(L.addScenarioButton).click();
      await this.loc(L.scenarioField).click();
      // Monaco editor requires JS to type text
      await this.page.evaluate((text) => {
        const editors = (window as any).monaco?.editor?.getEditors();
        const editor = editors?.find((e: any) => e.hasTextFocus()) || editors?.[editors.length - 1];
        editor?.trigger('keyboard', 'type', { text });
      }, scenarioText);
      await this.loc(L.addScenarioCta).click();
      await this.page.waitForTimeout(1000);
    });
  }

  async verifyScenarioCount(expected: number): Promise<void> {
    await test.step(`Verify scenario count is ${expected}`, async () => {
      await expect.soft(this.loc(L.scenarioCount)).toHaveText(String(expected), { timeout: TIMEOUTS.medium });
    });
  }

  async verifyScenarioTypeSelected(): Promise<void> {
    await test.step('Verify scenario type is selected', async () => {
      await expect.soft(this.loc(L.scenarioTypeSelected)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async cloneScenario(): Promise<void> {
    await test.step('Clone scenario', async () => {
      await this.loc(L.scenarioDuplicate).first().click();
      await this.page.waitForTimeout(2000);
    });
  }

  async deleteScenario(): Promise<void> {
    await test.step('Delete scenario', async () => {
      await this.loc(L.scenarioDelete).first().click();
      await this.page.waitForTimeout(1000);
    });
  }
}
