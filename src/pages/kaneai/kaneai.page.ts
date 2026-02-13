import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { KaneaiLocators as L, kaneaiJiraIssueKey } from './kaneai.locators.js';
import { TIMEOUTS } from '../../config/constants.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class KaneaiPage extends BasePage {
  constructor(page: Page) { super(page); }

  async openKaneaiSidebar(): Promise<void> {
    await this.loc(L.auteurSidebar).click();
    await waitForNetworkIdle(this.page);
  }

  async automateWithKaneai(): Promise<void> {
    await this.loc(L.automateWithKaneai).click();
    await waitForNetworkIdle(this.page);
  }

  async selectDesktopBrowser(): Promise<void> {
    await this.loc(L.desktopBrowser).click();
    await waitForNetworkIdle(this.page);
  }

  async selectMobileApp(): Promise<void> {
    await this.loc(L.mobileAppButton).click();
    await waitForNetworkIdle(this.page);
  }

  async selectMobileAppLink(): Promise<void> {
    await this.loc(L.mobileAppLink).click();
    await waitForNetworkIdle(this.page);
  }

  async uploadApp(filePath: string): Promise<void> {
    await this.loc(L.uploadAppButton).setInputFiles(filePath);
    await waitForNetworkIdle(this.page, TIMEOUTS.extraLong);
  }

  async startTesting(): Promise<void> {
    await this.loc(L.startTesting).click();
    await waitForNetworkIdle(this.page, TIMEOUTS.long);
  }

  async startTestingMobile(): Promise<void> {
    await this.loc(L.startTestingMobileButton).click();
    await waitForNetworkIdle(this.page, TIMEOUTS.long);
  }

  async approve(): Promise<void> {
    await this.loc(L.approve).click();
    await waitForNetworkIdle(this.page);
  }

  async verifyWebsiteLaunched(): Promise<void> {
    await expect.soft(this.loc(L.websiteLaunched)).toBeVisible({ timeout: TIMEOUTS.extraLong });
  }

  async verifyAppLaunched(): Promise<void> {
    await expect.soft(this.loc(L.appLaunched)).toBeVisible({ timeout: TIMEOUTS.extraLong });
  }

  async saveTestCase(): Promise<void> {
    await this.loc(L.saveTestcaseAuthoring).click();
    await waitForNetworkIdle(this.page);
  }

  async clickCode(): Promise<void> {
    await this.loc(L.code).click();
    await waitForNetworkIdle(this.page);
  }

  async verifyViewDetailsCode(): Promise<void> {
    await expect.soft(this.loc(L.viewDetailsCode)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async expandInitialPrompt(): Promise<void> {
    await test.step('Expand initial prompt section', async () => {
      if (await this.isVisible(L.initialPromptChevron, TIMEOUTS.long)) {
        await this.loc(L.initialPromptChevron).click();
        await expect.soft(this.loc(L.initialPromptExpanded)).toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async verifyInitialPromptExpanded(): Promise<void> {
    await expect.soft(this.loc(L.initialPromptExpanded)).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async verifyJiraIssueKey(issueKey: string): Promise<void> {
    await expect.soft(this.loc(kaneaiJiraIssueKey(issueKey))).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async clickTestCasesButton(): Promise<void> {
    await this.loc(L.testCasesButton).click();
    await waitForNetworkIdle(this.page);
  }

  async getTestCaseCount(): Promise<string> {
    if (await this.isVisible(L.testCasesTabCount, TIMEOUTS.medium)) {
      return (await this.loc(L.testCasesTabCount).textContent()) ?? '';
    }
    return '0';
  }

  async verifySystemIdle(): Promise<void> {
    await expect.soft(this.loc(L.systemIdle)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async clickSaveButton(): Promise<void> {
    await this.loc(L.saveButton).click();
    await waitForNetworkIdle(this.page);
  }

  async waitForTestGeneration(timeoutMs = TIMEOUTS.extraLong): Promise<void> {
    await this.loc(L.systemIdle).waitFor({ state: 'visible', timeout: timeoutMs });
  }

  async automateWebTest(url: string): Promise<void> {
    await test.step('Automate web test with KaneAI', async () => {
      await this.automateWithKaneai();
      await this.selectDesktopBrowser();
      await this.startTesting();
      await waitForNetworkIdle(this.page, TIMEOUTS.extraLong);
    });
  }

  async automateMobileTest(appPath: string): Promise<void> {
    await test.step('Automate mobile test with KaneAI', async () => {
      await this.automateWithKaneai();
      await this.selectMobileApp();
      await this.uploadApp(appPath);
      await this.selectMobileAppLink();
      await this.startTestingMobile();
      await waitForNetworkIdle(this.page, TIMEOUTS.extraLong);
    });
  }

  async verifyKaneaiTestCreated(): Promise<void> {
    await this.verifyWebsiteLaunched();
  }
}
