import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { ConfigurationLocators as L } from './configuration.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import type { ConfigurationRequest } from '../../types/configuration.types.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class ConfigurationPage extends BasePage {
  configurationName = `AutoConfig_${randomString(RANDOM_LENGTH.standard)}`;
  newConfigurationName = `AutoConfig_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  /** Open a combobox dropdown, type to filter, then click the matching option */
  private async selectFromDropdown(dropdownSelector: string, value: string, optionSelector: string): Promise<void> {
    await this.loc(dropdownSelector).click();
    await this.page.locator('[role="listbox"]').waitFor({ state: 'visible' });
    await this.page.keyboard.type(value);
    await this.loc(optionSelector).click();
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
        await this.selectFromDropdown(L.osDropdown, configData.osType, L.selectOS(configData.osType));
      }

      // Select OS Version
      if (configData.osVersion) {
        await this.selectFromDropdown(L.osVersionDropdown, configData.osVersion, L.selectOsVersion(configData.osVersion));
      }

      // Select Browser
      if (configData.browser) {
        await this.selectFromDropdown(L.browserDropdown, configData.browser, L.selectBrowser(configData.browser));
      }

      // Select Browser Version
      if (configData.browserVersion) {
        await this.selectFromDropdown(L.browserVersionDropdown, configData.browserVersion, L.selectBrowserVersion(configData.browserVersion));
      }

      // Select Resolution
      if (configData.resolution) {
        await this.selectFromDropdown(L.resolutionDropdown, configData.resolution, L.selectResolution(configData.resolution));
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
      await this.loc(L.createdConfiguration(configName)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });

      await this.loc(L.configurationOptionsMenu(configName)).click();
      await this.loc(L.editConfigurationButton).click();

      await this.loc(L.configurationNameInput).clear();
      this.configurationName = `EditedConfig_${randomString(RANDOM_LENGTH.standard)}`;
      await this.loc(L.configurationNameInput).fill(this.configurationName);

      await this.loc(L.saveConfigurationButton).click();
      await this.loc(L.searchConfigurationInput).fill(this.configurationName);
      await expect.soft(this.loc(L.createdConfiguration(this.configurationName))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async deleteConfiguration(name?: string): Promise<void> {
    const configName = name ?? this.configurationName;
    await test.step('Delete configuration: ' + configName, async () => {
      await this.loc(L.searchConfigurationInput).fill(configName);
      await waitForNetworkIdle(this.page);

      if (await this.isVisible(L.createdConfiguration(configName))) {
        await this.loc(L.configurationOptionsMenu(configName)).click();
        await this.loc(L.deleteConfigurationButton).click();
        await this.loc(L.deleteConfigurationConfirm).click();
        await expect.soft(this.loc(L.createdConfiguration(configName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async searchConfiguration(query: string): Promise<void> {
    await test.step('Search configuration: ' + query, async () => {
      await this.loc(L.searchConfigurationInput).fill(query);
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
      await this.loc(L.createdConfiguration(configName)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });

      await this.loc(L.configurationOptionsMenu(configName)).click();
      await this.loc(L.duplicateConfigurationButton).click();

      this.newConfigurationName = `Duplicate_${configName}`;
      await this.loc(L.configurationNameInput).fill(this.newConfigurationName);
      await this.loc(L.duplicateConfigurationConfirm).click();
      await expect.soft(this.loc(L.createdConfiguration(this.newConfigurationName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createFalconConfiguration(config: ConfigurationRequest): Promise<void> {
    await test.step('Create Falcon configuration: ' + config.name, async () => {
      await this.loc(L.createConfigurationButton).click();
      await this.loc(L.falconPlatformTab).click();
      await this.loc(L.configurationNameInput).fill(config.name);

      if (config.osType) {
        await this.selectFromDropdown(L.falconOsDropdown, config.osType, L.selectOS(config.osType));
      }
      if (config.osVersion) {
        await this.selectFromDropdown(L.falconOsVersionDropdown, config.osVersion, L.selectOsVersion(config.osVersion));
      }
      if (config.browser) {
        await this.selectFromDropdown(L.falconBrowserDropdown, config.browser, L.selectBrowser(config.browser));
      }
      if (config.browserVersion) {
        await this.selectFromDropdown(L.falconBrowserVersionDropdown, config.browserVersion, L.selectBrowserVersion(config.browserVersion));
      }
      if (config.resolution) {
        await this.selectFromDropdown(L.falconResolutionDropdown, config.resolution, L.selectResolution(config.resolution));
      }

      await this.loc(L.createConfigurationSubmit).click();
      await expect.soft(this.loc(L.createdConfiguration(config.name))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createRealDeviceConfiguration(config: ConfigurationRequest): Promise<void> {
    await test.step('Create Real Device configuration: ' + config.name, async () => {
      await this.loc(L.createConfigurationButton).click();
      await this.loc(L.realDevicePlatformTab).click();
      await this.loc(L.configurationNameInput).fill(config.name);

      if (config.osType) {
        await this.loc(L.selectOS(config.osType)).click();
      }
      if (config.osVersion) {
        await this.selectFromDropdown(L.realDeviceOsVersionDropdown, config.osVersion, L.selectOsVersion(config.osVersion));
      }
      if (config.manufacturer) {
        await this.selectFromDropdown(L.manufacturerDropdown, config.manufacturer, L.selectManufacturer(config.manufacturer));
      }
      if (config.device) {
        await this.selectFromDropdown(L.deviceNameDropdown, config.device, L.selectDeviceName(config.device));
      }

      await this.loc(L.createConfigurationSubmit).click();
      await expect.soft(this.loc(L.createdConfiguration(config.name))).toBeVisible({ timeout: TIMEOUTS.long });
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
      await this.loc(L.createdConfiguration(configName)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.createdConfiguration(configName)).click();
    });
  }

  async filterByOS(os: string): Promise<void> {
    await test.step('Filter configurations by OS: ' + os, async () => {
      await this.loc(L.osFilterDropdown).click();
      await this.loc(L.selectOsFilter(os)).click();
      await expect.soft(this.loc(L.filteredConfigurations)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async filterByBrowser(browser: string): Promise<void> {
    await test.step('Filter configurations by browser: ' + browser, async () => {
      await this.loc(L.browserFilterDropdown).click();
      await this.loc(L.selectBrowserFilter(browser)).click();
      await expect.soft(this.loc(L.filteredConfigurations)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }
}
