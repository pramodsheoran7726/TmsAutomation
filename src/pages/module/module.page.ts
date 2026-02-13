import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { ModuleLocators as L, moduleName } from './module.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class ModulePage extends BasePage {
  moduleNameValue = `Module_${randomString(RANDOM_LENGTH.medium)}`;
  moduleDescriptionValue = `Automation Module Description ${randomString(RANDOM_LENGTH.short)}`;
  moduleTagValue = `ModuleTag_${randomString(RANDOM_LENGTH.short)}`;

  constructor(page: Page) { super(page); }

  async clickCreateModule(): Promise<void> {
    await test.step('Click create module button', async () => {
      await this.loc(L.createModule).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async enterModuleName(name?: string): Promise<void> {
    await test.step('Enter module name', async () => {
      const nameToUse = name || this.moduleNameValue;
      await this.loc(L.moduleNameInputField).fill(nameToUse);
    });
  }

  async verifyModuleTextVisible(): Promise<void> {
    await test.step('Verify module text is visible', async () => {
      await expect.soft(this.loc(L.moduleText)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async enterModuleDescription(description?: string): Promise<void> {
    await test.step('Enter module description', async () => {
      const descToUse = description || this.moduleDescriptionValue;
      await this.loc(L.moduleDescription).fill(descToUse);
    });
  }

  async addModuleTag(tag?: string): Promise<void> {
    await test.step('Add module tag', async () => {
      const tagToUse = tag || this.moduleTagValue;
      await this.loc(L.moduleTag).fill(tagToUse);
      await this.page.keyboard.press('Enter');
      await waitForNetworkIdle(this.page);
    });
  }

  async addModuleStep(stepDetails: string): Promise<void> {
    await test.step('Add module step', async () => {
      await this.loc(L.addStep).click();
      await this.loc(L.moduleStepSteps).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.moduleStepSteps).fill(stepDetails);
      await this.loc(L.moduleAddStep).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async cancelModuleStep(): Promise<void> {
    await test.step('Cancel module step', async () => {
      await this.loc(L.moduleStepStepsCancel).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async createNewModule(): Promise<void> {
    await test.step('Click create new module', async () => {
      await this.loc(L.createNewModule).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyModuleCreated(name?: string): Promise<void> {
    await test.step('Verify module is created', async () => {
      const nameToCheck = name || this.moduleNameValue;
      await expect.soft(this.loc(moduleName(nameToCheck))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async getModuleVersion(): Promise<string> {
    if (await this.isVisible(L.moduleVersion, TIMEOUTS.medium)) {
      return (await this.loc(L.moduleVersion).textContent()) ?? '';
    }
    return '';
  }

  async verifyModuleVersion(expectedVersion: string): Promise<void> {
    await test.step('Verify module version', async () => {
      const version = await this.getModuleVersion();
      expect.soft(version).toContain(expectedVersion);
    });
  }

  async openMoreActions(): Promise<void> {
    await test.step('Open more actions menu', async () => {
      await this.loc(L.moreActions).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async clickAddModule(): Promise<void> {
    await test.step('Click add module', async () => {
      await this.loc(L.addModule).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async clickCreateModuleButton(): Promise<void> {
    await test.step('Click create a module button', async () => {
      await this.loc(L.createAModule).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async insertModule(): Promise<void> {
    await test.step('Insert module', async () => {
      await this.loc(L.insertModule).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async clickGenerateWithAi(): Promise<void> {
    await test.step('Click generate with AI', async () => {
      await this.loc(L.generateWithAi).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async setTestCaseLimit(limit: string): Promise<void> {
    await test.step('Set test case limit', async () => {
      await this.loc(L.testCaseLimitButton).click();
      await this.loc(L.testCaseLimitInputBox).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      const el = this.loc(L.testCaseLimitInputBox); await el.click(); await el.clear(); await el.fill(limit);
    });
  }

  async enterAiPrompt(prompt: string): Promise<void> {
    await test.step('Enter AI prompt', async () => {
      await this.loc(L.generateWithAiInputBox).fill(prompt);
    });
  }

  async submitGenerateWithAi(): Promise<void> {
    await test.step('Submit generate with AI', async () => {
      await this.loc(L.submitGenerateWithAi).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async clickCreateAndAutomate(): Promise<void> {
    await test.step('Click create and automate', async () => {
      await this.loc(L.createAndAutomate).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyScenarios(): Promise<void> {
    await test.step('Verify scenarios are visible', async () => {
      await expect.soft(this.loc(L.verifyScenarios)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createModuleWithDetails(steps: string[] = []): Promise<void> {
    await test.step('Create module with details', async () => {
      await this.clickCreateModule();
      await this.enterModuleName();
      await this.enterModuleDescription();
      await this.addModuleTag();

      for (const step of steps) {
        await this.addModuleStep(step);
      }

      await this.createNewModule();
      await waitForNetworkIdle(this.page);
    });
  }

  async deleteModule(): Promise<void> {
    await test.step('Delete module', async () => {
      await this.openMoreActions();
      await this.loc(`//span[text()='Delete']`).click();
      await this.loc(`//span[text()='Delete Module']`).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(`//span[text()='Delete Module']`).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyModuleDeleted(name?: string): Promise<void> {
    await test.step('Verify module is deleted', async () => {
      const nameToCheck = name || this.moduleNameValue;
      await expect.soft(this.loc(moduleName(nameToCheck))).not.toBeVisible({ timeout: TIMEOUTS.short });
    });
  }

  async editModule(newName: string): Promise<void> {
    await test.step('Edit module', async () => {
      await this.openMoreActions();
      await this.loc(`//span[text()='Edit']`).click();
      await this.loc(L.moduleNameInputField).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      const el = this.loc(L.moduleNameInputField); await el.click(); await el.clear(); await el.fill(newName);
      await this.loc(L.createNewModule).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async duplicateModule(): Promise<void> {
    await test.step('Duplicate module', async () => {
      await this.openMoreActions();
      await this.loc(`//span[text()='Duplicate']`).click();
      await waitForNetworkIdle(this.page);
    });
  }
}
