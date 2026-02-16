import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { ProjectLocators as L } from './project.locators.js';
import { TIMEOUTS, RETRY, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { EnvConfig } from '../../config/env.config.js';
import { waitForNetworkIdle, fillAndWaitForSearch } from '../../utils/wait.helper.js';
import { retryAction } from '../../utils/retry.helper.js';

export class ProjectPage extends BasePage {
  projectName = `AutoProject_${randomString(RANDOM_LENGTH.standard)}`;
  futureProjectName = `AutoProject_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  async createProjectWithTagDescription(
    options: { tag?: boolean; description?: boolean } = {},
  ): Promise<void> {
    const { tag = true, description = true } = options;
    await test.step('Create project with tag and description', async () => {
      await this.loc(L.createProjectBtn).click();
      await this.loc(L.projectTitle).first().waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      await this.loc(L.projectTitle).first().fill(this.projectName);
      if (description) {
        await this.loc(L.projectDescription).first().fill(randomString(RANDOM_LENGTH.standard));
      }
      if (tag) {
        const tagInput = this.loc(L.projectTag).first();
        await tagInput.click();
        await tagInput.fill(randomString(RANDOM_LENGTH.standard));
        await this.page.keyboard.press('Enter');
      }
      await this.loc(L.projectCreate).first().click();
      await expect.soft(this.loc(L.createdProject(this.projectName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async openProject(name?: string): Promise<void> {
    await test.step(`Open project ${name ?? this.projectName}`, async () => {
      const projectName = name ?? this.projectName;
      // Navigate to projects list
      await this.page.goto(EnvConfig.tmsBaseUrl, { waitUntil: 'domcontentloaded' });

      // Dismiss any overlay/modal that might be present
      await this.page.keyboard.press('Escape');

      // Wait for loading to complete
      await this.loc(L.searchProject).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      try {
        await this.loc(L.loadingProjects).waitFor({ state: 'hidden', timeout: TIMEOUTS.extraLong });
      } catch {
        // Loading indicator might not appear or already gone
      }
      await waitForNetworkIdle(this.page);

      // Retry search up to 3 times (newly created projects may take time to appear)
      await retryAction(this.page, async () => {
        // Dismiss any overlay before each attempt
        await this.page.keyboard.press('Escape');
        await waitForNetworkIdle(this.page);

        const el = this.loc(L.searchProject);
        await el.click();
        await el.clear();
        await el.pressSequentially(projectName, { delay: 50 });
        await waitForNetworkIdle(this.page);

        const projectLink = this.loc(L.createdProject(projectName));
        await expect(projectLink).toBeVisible({ timeout: TIMEOUTS.medium });
        await projectLink.click();
      }, {
        retries: RETRY.defaultAttempts,
        delayMs: RETRY.delayBetweenMs,
        label: `openProject(${projectName})`,
      });
    });
  }

  async editProject(): Promise<void> {
    await test.step('Edit project name', async () => {
      await this.loc(L.projectTripleDotButton(this.projectName)).first().click();
      await this.loc(L.projectEditButton).click();
      await this.loc(L.projectTitle).clear();
      this.projectName = randomString(RANDOM_LENGTH.extraLong);
      await this.loc(L.projectTitle).fill(this.projectName);
      await this.loc(L.saveChangesButton).click();
    });
  }

  async deleteProject(name?: string): Promise<void> {
    await test.step(`Delete project ${name ?? this.projectName}`, async () => {
      const projectName = name ?? this.projectName;
      // Navigate to projects list
      await this.page.goto(EnvConfig.tmsBaseUrl, { waitUntil: 'domcontentloaded' });
      await this.page.keyboard.press('Escape');
      await this.loc(L.searchProject).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      try {
        await this.loc(L.loadingProjects).waitFor({ state: 'hidden', timeout: TIMEOUTS.extraLong });
      } catch {
        // Loading indicator might not appear or already gone
      }
      await waitForNetworkIdle(this.page);

      const searchInput = this.loc(L.searchProject);
      await searchInput.click();
      await searchInput.clear();
      await searchInput.pressSequentially(projectName, { delay: 50 });
      await waitForNetworkIdle(this.page);
      if (await this.isVisible(L.createdProject(projectName))) {
        // Dismiss any stale tooltips/menus before opening the options menu
        await this.page.keyboard.press('Escape');
        await waitForNetworkIdle(this.page);

        // Retry opening the triple-dot menu up to 3 times
        let menuOpened = false;
        for (let attempt = 0; attempt < 3 && !menuOpened; attempt++) {
          if (attempt > 0) {
            await this.page.keyboard.press('Escape');
            await waitForNetworkIdle(this.page);
          }
          await this.loc(L.projectTripleDotButton(projectName)).first().click({ force: true });
          try {
            await this.loc(L.projectDeleteButton).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
            menuOpened = true;
          } catch {
            // Menu didn't open, retry
          }
        }
        await this.loc(L.projectDeleteButton).click();
        const confirmInput = this.loc(L.projectDeleteConfirmInput);
        await confirmInput.waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
        await confirmInput.click();
        await confirmInput.fill('');
        await confirmInput.pressSequentially('DELETE');
        await this.loc(L.projectDeleteConfirmation).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
        await this.loc(L.projectDeleteConfirmation).click();
        await expect(this.loc(L.createdProject(projectName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async verifyProjectDeleted(): Promise<void> {
    await expect.soft(this.loc(L.createdProject(this.projectName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async backToProjectList(): Promise<void> {
    await this.loc(L.backToProjectList).click();
  }
}
