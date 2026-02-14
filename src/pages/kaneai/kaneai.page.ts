import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { KaneaiLocators as L, kaneaiJiraIssueKey } from './kaneai.locators.js';
import { TIMEOUTS } from '../../config/constants.js';

export class KaneaiPage extends BasePage {
  constructor(page: Page) { super(page); }

  async openKaneaiSidebar(): Promise<void> {
    await this.loc(L.auteurSidebar).click();
    await this.page.waitForTimeout(2000);
  }

  async automateWithKaneai(): Promise<void> {
    await this.loc(L.automateWithKaneai).click();
    await this.page.waitForTimeout(2000);
  }

  async selectDesktopBrowser(): Promise<void> {
    await this.loc(L.desktopBrowser).click();
    await this.page.waitForTimeout(1000);
  }

  async selectMobileApp(): Promise<void> {
    await this.loc(L.mobileAppButton).click();
    await this.page.waitForTimeout(2000);
  }

  async selectMobileAppLink(): Promise<void> {
    await this.loc(L.mobileAppLink).click();
    await this.page.waitForTimeout(1000);
  }

  async uploadApp(filePath: string): Promise<void> {
    await this.loc(L.uploadAppButton).setInputFiles(filePath);
    await this.page.waitForTimeout(3000);
  }

  async startTesting(): Promise<void> {
    await this.loc(L.startTesting).click();
    await this.page.waitForTimeout(3000);
  }

  async startTestingMobile(): Promise<void> {
    await this.loc(L.startTestingMobileButton).click();
    await this.page.waitForTimeout(3000);
  }

  async approve(): Promise<void> {
    await this.loc(L.approve).click();
    await this.page.waitForTimeout(2000);
  }

  async verifyWebsiteLaunched(): Promise<void> {
    await expect.soft(this.loc(L.websiteLaunched)).toBeVisible({ timeout: TIMEOUTS.extraLong });
  }

  async verifyAppLaunched(): Promise<void> {
    await expect.soft(this.loc(L.appLaunched)).toBeVisible({ timeout: TIMEOUTS.extraLong });
  }

  async saveTestCase(): Promise<void> {
    await this.loc(L.saveTestcaseAuthoring).click();
    await this.page.waitForTimeout(2000);
  }

  async clickCode(): Promise<void> {
    await this.loc(L.code).click();
    await this.page.waitForTimeout(1000);
  }

  async verifyViewDetailsCode(): Promise<void> {
    await expect.soft(this.loc(L.viewDetailsCode)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async expandInitialPrompt(): Promise<void> {
    await test.step('Expand initial prompt section', async () => {
      if (await this.isVisible(L.initialPromptChevron, TIMEOUTS.long)) {
        await this.loc(L.initialPromptChevron).click();
        await this.page.waitForTimeout(2000);
        await expect.soft(this.loc(L.initialPromptExpanded)).toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async verifyInitialPromptExpanded(): Promise<void> {
    await expect.soft(this.loc(L.initialPromptExpanded)).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async verifyJiraIssueKey(issueKey: string): Promise<void> {
    await test.step(`Verify JIRA issue key "${issueKey}" in Initial prompt`, async () => {
      // Wait for test cases button to ensure page is fully loaded (matches Java: 120s wait)
      await this.loc(L.testCasesButton).waitFor({ state: 'visible', timeout: 120_000 });
      const el = this.loc(kaneaiJiraIssueKey());
      await el.waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      const actualKey = (await el.textContent())?.trim() ?? '';
      expect.soft(actualKey).toBe(issueKey);
    });
  }

  async clickTestCasesButton(): Promise<void> {
    await this.loc(L.testCasesButton).click();
    await this.page.waitForTimeout(2000);
  }

  async getTestCaseCount(): Promise<number> {
    if (await this.isVisible(L.testCasesButton, TIMEOUTS.long)) {
      const text = (await this.loc(L.testCasesButton).textContent()) ?? '';
      const match = text.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    }
    return 0;
  }

  async verifySystemIdle(): Promise<void> {
    await expect.soft(this.loc(L.systemIdle)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async clickSaveButton(): Promise<void> {
    await this.loc(L.saveButton).click();
    await this.page.waitForTimeout(2000);
  }

  async waitForTestGeneration(timeoutMs = TIMEOUTS.extraLong): Promise<void> {
    await this.page.waitForTimeout(timeoutMs);
  }

  async automateWebTest(url: string): Promise<void> {
    await test.step('Automate web test with KaneAI', async () => {
      await this.automateWithKaneai();
      await this.selectDesktopBrowser();
      await this.startTesting();
      await this.page.waitForTimeout(5000);
    });
  }

  async automateMobileTest(appPath: string): Promise<void> {
    await test.step('Automate mobile test with KaneAI', async () => {
      await this.automateWithKaneai();
      await this.selectMobileApp();
      await this.uploadApp(appPath);
      await this.selectMobileAppLink();
      await this.startTestingMobile();
      await this.page.waitForTimeout(5000);
    });
  }

  async verifyKaneaiTestCreated(): Promise<void> {
    await this.verifyWebsiteLaunched();
  }
}
