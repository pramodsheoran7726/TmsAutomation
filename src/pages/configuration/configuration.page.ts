import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { ConfigurationLocators as L } from './configuration.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import type { ConfigurationRequest } from '../../types/configuration.types.js';

export class ConfigurationPage extends BasePage {
  configurationName = `AutoConfig_${randomString(RANDOM_LENGTH.standard)}`;
  newConfigurationName = `AutoConfig_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  async createConfiguration(config?: ConfigurationRequest): Promise<void> {
    const configData = config ?? {
      name: this.configurationName,
      osType: 'Windows',
      osVersion: '10',
      browser: 'Chrome',
      browserVersion: 'Latest',
      resolution: '1920x1080',
    };

    await test.step('Create configuration: ' + configData.name, async () => {
      await this.loc(L.createConfigurationButton).click();
      await this.loc(L.configurationNameInput).fill(configData.name);

      // Select OS
      if (configData.osType) {
        await this.loc(L.osDropdown).click();
        await this.loc(L.selectOS(configData.osType)).click();
      }

      // Select OS Version
      if (configData.osVersion) {
        await this.loc(L.osVersionDropdown).click();
        await this.loc(L.selectOsVersion(configData.osVersion)).click();
      }

      // Select Browser
      if (configData.browser) {
        await this.loc(L.browserDropdown).click();
        await this.loc(L.selectBrowser(configData.browser)).click();
      }

      // Select Browser Version
      if (configData.browserVersion) {
        await this.loc(L.browserVersionDropdown).click();
        await this.loc(L.selectBrowserVersion(configData.browserVersion)).click();
      }

      // Select Resolution
      if (configData.resolution) {
        await this.loc(L.resolutionDropdown).click();
        await this.loc(L.selectResolution(configData.resolution)).click();
      }

      await this.loc(L.createConfigurationSubmit).click();
      await expect.soft(this.loc(L.createdConfiguration(configData.name))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createWindowsConfiguration(): Promise<void> {
    this.configurationName = `Windows_${randomString(RANDOM_LENGTH.medium)}`;
    await this.createConfiguration({
      name: this.configurationName,
      osType: 'Windows',
      osVersion: '11',
      browser: 'Chrome',
      browserVersion: 'Latest',
      resolution: '1920x1080',
    });
  }

  async createMacConfiguration(): Promise<void> {
    await this.createConfiguration({
      name: `Mac_${randomString(RANDOM_LENGTH.medium)}`,
      osType: 'macOS',
      osVersion: 'Monterey',
      browser: 'Safari',
      browserVersion: 'Latest',
      resolution: '1920x1080',
    });
  }

  async createLinuxConfiguration(): Promise<void> {
    await this.createConfiguration({
      name: `Linux_${randomString(RANDOM_LENGTH.medium)}`,
      osType: 'Linux',
      osVersion: 'Ubuntu 22.04',
      browser: 'Firefox',
      browserVersion: 'Latest',
      resolution: '1920x1080',
    });
  }

  async createMobileConfiguration(device: 'iOS' | 'Android'): Promise<void> {
    const deviceConfig = device === 'iOS'
      ? { osType: 'iOS', osVersion: '17.0', browser: 'Safari' }
      : { osType: 'Android', osVersion: '14.0', browser: 'Chrome' };

    await this.createConfiguration({
      name: `${device}_${randomString(RANDOM_LENGTH.medium)}`,
      osType: deviceConfig.osType,
      osVersion: deviceConfig.osVersion,
      browser: deviceConfig.browser,
      browserVersion: 'Latest',
    });
  }

  async editConfiguration(oldName?: string): Promise<void> {
    const configName = oldName ?? this.configurationName;
    await test.step('Edit configuration: ' + configName, async () => {
      await this.loc(L.searchConfigurationInput).fill(configName);
      await this.page.waitForTimeout(2000);

      await this.loc(L.configurationOptionsMenu(configName)).click();
      await this.loc(L.editConfigurationButton).click();

      await this.loc(L.configurationNameInput).clear();
      this.configurationName = `EditedConfig_${randomString(RANDOM_LENGTH.standard)}`;
      await this.loc(L.configurationNameInput).fill(this.configurationName);

      await this.loc(L.saveConfigurationButton).click();
      await expect.soft(this.loc(L.createdConfiguration(this.configurationName))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async deleteConfiguration(name?: string): Promise<void> {
    const configName = name ?? this.configurationName;
    await test.step('Delete configuration: ' + configName, async () => {
      await this.loc(L.searchConfigurationInput).fill(configName);
      await this.page.waitForTimeout(2000);

      if (await this.isVisible(L.createdConfiguration(configName))) {
        await this.loc(L.configurationOptionsMenu(configName)).click();
        await this.loc(L.deleteConfigurationButton).click();
        await this.loc(L.deleteConfigurationConfirmInput).fill('DELETE');
        await this.loc(L.deleteConfigurationConfirm).click();
        await expect.soft(this.loc(L.createdConfiguration(configName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async searchConfiguration(query: string): Promise<void> {
    await test.step('Search configuration: ' + query, async () => {
      await this.loc(L.searchConfigurationInput).fill(query);
      await this.page.waitForTimeout(2000);
      await expect.soft(this.loc(L.configurationSearchResults)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async selectConfigInTestRun(configName: string): Promise<void> {
    await test.step('Select configuration "' + configName + '" in test run', async () => {
      await this.loc(L.configurationDropdownInTestRun).click();
      await this.loc(L.configurationSearchInTestRun).fill(configName);
      await this.loc(L.selectConfigurationInTestRun(configName)).click();
      await this.loc(L.saveConfigurationInTestRun).click();
      await expect.soft(this.loc(L.verifyConfigSelectedInTestRun(configName))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async duplicateConfiguration(name?: string): Promise<void> {
    const configName = name ?? this.configurationName;
    await test.step('Duplicate configuration: ' + configName, async () => {
      await this.loc(L.searchConfigurationInput).fill(configName);
      await this.page.waitForTimeout(2000);

      await this.loc(L.configurationOptionsMenu(configName)).click();
      await this.loc(L.duplicateConfigurationButton).click();

      this.newConfigurationName = `Duplicate_${configName}`;
      await this.loc(L.configurationNameInput).fill(this.newConfigurationName);
      await this.loc(L.duplicateConfigurationConfirm).click();
      await expect.soft(this.loc(L.createdConfiguration(this.newConfigurationName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyConfigurationExists(name: string): Promise<void> {
    await expect.soft(this.loc(L.createdConfiguration(name))).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async verifyConfigurationDeleted(name?: string): Promise<void> {
    const configName = name ?? this.configurationName;
    await expect.soft(this.loc(L.createdConfiguration(configName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async openConfiguration(name?: string): Promise<void> {
    const configName = name ?? this.configurationName;
    await test.step('Open configuration: ' + configName, async () => {
      await this.loc(L.searchConfigurationInput).fill(configName);
      await this.page.waitForTimeout(2000);
      await this.loc(L.createdConfiguration(configName)).click();
    });
  }

  async filterByOS(os: string): Promise<void> {
    await test.step('Filter configurations by OS: ' + os, async () => {
      await this.loc(L.osFilterDropdown).click();
      await this.loc(L.selectOsFilter(os)).click();
      await this.page.waitForTimeout(1000);
      await expect.soft(this.loc(L.filteredConfigurations)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async filterByBrowser(browser: string): Promise<void> {
    await test.step('Filter configurations by browser: ' + browser, async () => {
      await this.loc(L.browserFilterDropdown).click();
      await this.loc(L.selectBrowserFilter(browser)).click();
      await this.page.waitForTimeout(1000);
      await expect.soft(this.loc(L.filteredConfigurations)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }
}
