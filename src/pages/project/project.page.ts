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
      if (await this.isVisible(L.newProjectCtaOverlay)) {
        await this.loc(L.newProjectCtaOverlay).click();
      } else {
        await this.loc(L.newProjectCta).click();
        await this.loc(L.createProjectCta).click();
      }
      await this.loc(L.projectTitle).fill(this.projectName);
      if (description) {
        await this.loc(L.projectDescription).fill(randomString(RANDOM_LENGTH.standard));
      }
      if (tag) {
        await this.loc(L.projectTag).fill(randomString(RANDOM_LENGTH.standard));
        await this.page.keyboard.press('Enter');
      }
      await this.loc(L.projectCreate).click();
      await expect.soft(this.loc(L.createdProject(this.projectName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async openProject(name?: string): Promise<void> {
    await test.step(`Open project ${name ?? this.projectName}`, async () => {
      const projectName = name ?? this.projectName;
      // Navigate to projects list
      await this.page.goto(EnvConfig.tmsBaseUrl);

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
        const el = this.loc(L.searchProject); await el.click(); await el.clear(); await el.fill(projectName);
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
      // Navigate to projects list if not already there
      if (!(await this.isVisible(L.searchProject, TIMEOUTS.short))) {
        await this.page.goto(EnvConfig.tmsBaseUrl);
        await waitForNetworkIdle(this.page);
      }
      await fillAndWaitForSearch(this.page, this.loc(L.searchProject), projectName);
      if (await this.isVisible(L.createdProject(projectName))) {
        await this.loc(L.projectTripleDotButton(projectName)).first().click();
        await this.loc(L.projectDeleteButton).click();
        const confirmInput = this.loc(L.projectDeleteConfirmInput);
        await confirmInput.click();
        await confirmInput.fill('');
        await confirmInput.pressSequentially('DELETE');
        await this.page.waitForTimeout(1000);
        await this.loc(L.projectDeleteConfirmation).click();
      }
    });
  }

  async verifyProjectDeleted(): Promise<void> {
    await expect.soft(this.loc(L.createdProject(this.projectName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async backToProjectList(): Promise<void> {
    await this.loc(L.backOnProjectPage).click();
  }
}
