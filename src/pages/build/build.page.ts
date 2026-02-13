import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { BuildLocators as L } from './build.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class BuildPage extends BasePage {
  buildName = `AutoBuild_${randomString(RANDOM_LENGTH.standard)}`;
  newBuildName = `AutoBuild_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  async createBuild(name?: string, description?: string): Promise<void> {
    const buildTitle = name ?? this.buildName;
    const buildDesc = description ?? randomString(RANDOM_LENGTH.long);

    await test.step('Create build: ' + buildTitle, async () => {
      await this.loc(L.createBuildButton).click();
      await this.loc(L.buildNameInput).fill(buildTitle);
      await this.loc(L.buildDescriptionInput).fill(buildDesc);
      await this.loc(L.buildVersionInput).fill(`v${Math.floor(Math.random() * 100)}.0`);
      await this.loc(L.createBuildSubmit).click();
      await expect.soft(this.loc(L.createdBuild(buildTitle))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyBuildCreated(name?: string): Promise<void> {
    const buildTitle = name ?? this.buildName;
    await expect.soft(this.loc(L.createdBuild(buildTitle))).toBeVisible({ timeout: TIMEOUTS.medium });
    await expect.soft(this.loc(L.buildStatusActive(buildTitle))).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async editBuild(name?: string): Promise<void> {
    const buildTitle = name ?? this.buildName;
    await test.step('Edit build: ' + buildTitle, async () => {
      await this.loc(L.searchBuildInput).fill(buildTitle);
      await this.loc(L.createdBuild(buildTitle)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.buildOptionsMenu(buildTitle)).click();
      await this.loc(L.editBuildButton).click();

      await this.loc(L.buildNameInput).clear();
      this.buildName = `EditedBuild_${randomString(RANDOM_LENGTH.standard)}`;
      await this.loc(L.buildNameInput).fill(this.buildName);
      await this.loc(L.saveBuildButton).click();
      await expect.soft(this.loc(L.createdBuild(this.buildName))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async duplicateBuild(name?: string): Promise<void> {
    const buildTitle = name ?? this.buildName;
    await test.step('Duplicate build: ' + buildTitle, async () => {
      await this.loc(L.searchBuildInput).fill(buildTitle);
      await this.loc(L.createdBuild(buildTitle)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.buildOptionsMenu(buildTitle)).click();
      await this.loc(L.duplicateBuildButton).click();

      this.newBuildName = `Duplicate_${buildTitle}`;
      await this.loc(L.buildNameInput).fill(this.newBuildName);
      await this.loc(L.duplicateBuildConfirm).click();
      await expect.soft(this.loc(L.createdBuild(this.newBuildName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async deleteBuild(name?: string): Promise<void> {
    const buildTitle = name ?? this.buildName;
    await test.step('Delete build: ' + buildTitle, async () => {
      await this.loc(L.searchBuildInput).fill(buildTitle);
      await waitForNetworkIdle(this.page);

      if (await this.isVisible(L.createdBuild(buildTitle))) {
        await this.loc(L.buildOptionsMenu(buildTitle)).click();
        await this.loc(L.deleteBuildButton).click();
        await this.loc(L.deleteBuildConfirmInput).fill('DELETE');
        await this.loc(L.deleteBuildConfirm).click();
        await expect.soft(this.loc(L.createdBuild(buildTitle))).not.toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async verifyBuildHistory(buildName: string): Promise<void> {
    await test.step('Verify build history for: ' + buildName, async () => {
      await this.loc(L.createdBuild(buildName)).click();
      await this.loc(L.buildHistoryTab).click();
      await expect.soft(this.loc(L.buildHistoryTable)).toBeVisible({ timeout: TIMEOUTS.medium });
      await expect.soft(this.loc(L.buildHistoryEntries)).toHaveCount(1, { timeout: TIMEOUTS.medium });
    });
  }

  async openBuild(name?: string): Promise<void> {
    const buildTitle = name ?? this.buildName;
    await test.step('Open build: ' + buildTitle, async () => {
      await this.loc(L.searchBuildInput).fill(buildTitle);
      await this.loc(L.createdBuild(buildTitle)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.createdBuild(buildTitle)).click();
    });
  }

  async searchBuild(query: string): Promise<void> {
    await this.loc(L.searchBuildInput).fill(query);
    await waitForNetworkIdle(this.page);
  }

  async verifyBuildDeleted(name?: string): Promise<void> {
    const buildTitle = name ?? this.buildName;
    await expect.soft(this.loc(L.createdBuild(buildTitle))).not.toBeVisible({ timeout: TIMEOUTS.medium });
  }
}
