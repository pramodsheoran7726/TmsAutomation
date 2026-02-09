import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { JiraLocators as L } from './jira.locators.js';
import { TIMEOUTS } from '../../config/constants.js';

export class JiraIntegrationPage extends BasePage {
  constructor(page: Page) { super(page); }

  async openLinkInBrowser(link: string): Promise<void> {
    await this.page.goto(link);
    await this.page.waitForTimeout(5000);
  }

  async expandInitialPromptSection(): Promise<void> {
    await test.step('Expand initial prompt section', async () => {
      if (await this.isVisible(L.initialPromptChevron, TIMEOUTS.long)) {
        await this.loc(L.initialPromptChevron).click();
        await this.page.waitForTimeout(2000);
      }
    });
  }

  async linkIssue(issueKey: string): Promise<void> {
    await test.step(`Link Jira issue ${issueKey}`, async () => {
      await this.loc(L.linkIssueButton).click();
      await this.loc(L.linkFieldTms).fill(issueKey);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(3000);
    });
  }

  async unlinkIssue(): Promise<void> {
    await this.loc(L.singleUnlinkButton).click();
    await this.loc(L.confirmationPopup).click();
  }

  async verifyLinkedIssueDetails(): Promise<void> {
    await test.step('Verify linked Jira issue details are visible', async () => {
      await expect.soft(this.loc(L.todoJiraTitle)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.todoJiraPriority)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.todoJiraProject)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async connectJira(): Promise<void> {
    await this.loc(L.connectJiraCta).click();
  }

  async authenticateLTJira(username: string, accessKey: string): Promise<void> {
    await test.step('Authenticate LambdaTest Jira integration', async () => {
      await this.loc(L.ltJiraUsernameField).fill(username);
      await this.loc(L.ltJiraAccessKeyField).fill(accessKey);
      await this.loc(L.ltJiraAuthenticateBtn).click();
      await expect.soft(this.loc(L.ltJiraAuthenticateMsg)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createBugFromAutomation(summary: string): Promise<void> {
    await test.step('Create bug from automation via Jira', async () => {
      await this.loc(L.automationMarkAsBug).click();
      await this.loc(L.automationSelectProject).click();
      await this.loc(L.automationJiraProject).click();
      await this.loc(L.automationJiraSelectAssignee).click();
      await this.loc(L.automationJiraAssignee).click();
      await this.loc(L.automationJiraSelectType).click();
      await this.loc(L.automationJiraBugType).click();
      await this.loc(L.automationBugSummary).fill(summary);
      await this.loc(L.automationCreateBug).click();
    });
  }
}
