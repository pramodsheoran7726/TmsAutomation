import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { AutomationLocators as L } from './automation.locators.js';
import { TIMEOUTS } from '../../config/constants.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class AutomationPage extends BasePage {
  constructor(page: Page) { super(page); }

  async openAutomationSidebar(): Promise<void> {
    await test.step('Open automation sidebar', async () => {
      await this.loc(L.automationSidebar).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyRuntimeTestCaseVisible(): Promise<void> {
    await test.step('Verify runtime test case is visible', async () => {
      await expect.soft(this.loc(L.runtimeTc)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyRuntimeTestCaseTmsVisible(): Promise<void> {
    await test.step('Verify runtime test case TMS is visible', async () => {
      await expect.soft(this.loc(L.runtimeTcTms)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyRuntimeTestCaseInEditor(): Promise<void> {
    await test.step('Verify runtime test case in editor', async () => {
      await expect.soft(this.loc(L.runtimeTcEditorTms)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyAutomationTestTitle(): Promise<void> {
    await test.step('Verify automation test title is visible', async () => {
      await expect.soft(this.loc(L.automationTestTitle)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyAutomationProjectName(): Promise<void> {
    await test.step('Verify automation project name is visible', async () => {
      await expect.soft(this.loc(L.automationProjectName)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async linkTestCase(): Promise<void> {
    await test.step('Link test case in automation dashboard', async () => {
      await this.loc(L.linkTcInAutomationDash).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async createNewTestCase(): Promise<void> {
    await test.step('Create new test case in automation dashboard', async () => {
      await this.loc(L.createNewTcAutomationDash).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyTestCaseIdVisible(): Promise<void> {
    await test.step('Verify test case ID is visible', async () => {
      await expect.soft(this.loc(L.tmsTcIdAutomationDash)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async unlinkTestCase(): Promise<void> {
    await test.step('Unlink test case', async () => {
      await this.loc(L.unlinkTcAutomationDash).click();
      await this.loc(L.automationUnlinkConfirmation).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.automationUnlinkConfirmation).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyTestCaseLinked(): Promise<void> {
    await test.step('Verify test case is linked', async () => {
      await expect.soft(this.loc(L.automationTcTitleNewLink)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async searchTestCase(testCaseName: string): Promise<void> {
    await test.step('Search test case in automation dashboard', async () => {
      await this.loc(L.searchTcAutomationDash).fill(testCaseName);
      await waitForNetworkIdle(this.page);
    });
  }

  async openLinkSearch(): Promise<void> {
    await test.step('Open link search', async () => {
      await this.loc(L.linkOpenSearch).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyNoExecution(): Promise<void> {
    await test.step('Verify no execution is visible', async () => {
      await expect.soft(this.loc(L.noExecution)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyBuildAutomationVisible(): Promise<void> {
    await test.step('Verify build automation is visible', async () => {
      await expect.soft(this.loc(L.buildAutomation)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async openAutomationMenu(): Promise<void> {
    await test.step('Open automation menu', async () => {
      await this.loc(L.openMenuAutomationPage).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async deleteFromAutomationPage(): Promise<void> {
    await test.step('Delete from automation page', async () => {
      await this.openAutomationMenu();
      await this.loc(L.deleteAutomationPage).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async deleteFromAutomationPageProd(): Promise<void> {
    await test.step('Delete from automation page (prod)', async () => {
      await this.loc(L.openMenuProd).click();
      await this.loc(L.deleteAutomationPageProd).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.deleteAutomationPageProd).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyVariableLinkVisible(): Promise<void> {
    await test.step('Verify variable link is visible', async () => {
      await expect.soft(this.loc(L.variableLink)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async openDefaultProject(): Promise<void> {
    await test.step('Open default project', async () => {
      await this.loc(L.openDefaultProject).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async openAutomationProject(): Promise<void> {
    await test.step('Open automation project', async () => {
      await this.loc(L.automationProject).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async searchTestsMl(testName: string): Promise<void> {
    await test.step('Search tests in ML', async () => {
      await this.loc(L.searchTestsMl).fill(testName);
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyTestCaseIdMl(): Promise<void> {
    await test.step('Verify test case ID in ML', async () => {
      await expect.soft(this.loc(L.tcidTestsMl)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyMetaDataVisible(): Promise<void> {
    await test.step('Verify metadata is visible', async () => {
      await expect.soft(this.loc(L.metaDataMl)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyInputConfigVisible(): Promise<void> {
    await test.step('Verify input config is visible', async () => {
      await expect.soft(this.loc(L.inputConfigMl)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async expandBuildMl(): Promise<void> {
    await test.step('Expand build in ML', async () => {
      await this.loc(L.mlExpandBuild).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyLinkedIdMl(): Promise<void> {
    await test.step('Verify linked ID in ML', async () => {
      await expect.soft(this.loc(L.mlLinkId)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async clickAutomationTestCase(): Promise<void> {
    await test.step('Click automation test case', async () => {
      await this.loc(L.automationTcTitleTms).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyAutomationTag(): Promise<void> {
    await test.step('Verify automation tag is visible', async () => {
      await expect.soft(this.loc(L.runtimeTc)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }
}
