import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { SettingsLocators as L } from './settings.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';
import type { CustomFieldConfig } from '../../data/custom-fields.data.js';

export class SettingsPage extends BasePage {
  priorityValue = randomString(RANDOM_LENGTH.standard);
  statusValue = randomString(RANDOM_LENGTH.standard);
  typeValue = randomString(RANDOM_LENGTH.standard);
  stringCustomField = randomString(RANDOM_LENGTH.standard);
  textareaCustomField = randomString(RANDOM_LENGTH.standard);
  numberCustomField = randomString(RANDOM_LENGTH.standard);
  booleanCustomField = randomString(RANDOM_LENGTH.standard);
  dateCustomField = randomString(RANDOM_LENGTH.standard);
  userCustomField = randomString(RANDOM_LENGTH.standard);
  urlCustomField = randomString(RANDOM_LENGTH.standard);
  dropdownSingleCustomField = randomString(RANDOM_LENGTH.standard);
  dropdownMultiCustomField = randomString(RANDOM_LENGTH.standard);
  dropdownValue1 = randomString(RANDOM_LENGTH.standard);
  dropdownValue2 = randomString(RANDOM_LENGTH.standard);
  dropdownValue3 = randomString(RANDOM_LENGTH.standard);
  stringPlaceholder = randomString(RANDOM_LENGTH.standard);
  textareaPlaceholder = randomString(RANDOM_LENGTH.standard);

  constructor(page: Page) { super(page); }

  // System Fields
  async openSystemFields(): Promise<void> {
    await this.loc(L.systemFieldsNav).click();
  }

  async addValueInPriority(): Promise<void> {
    await test.step('Add value in Priority system field', async () => {
      await this.loc(L.systemFieldByName('Priority')).click();
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.customFieldName).fill(this.priorityValue);
      await this.loc(L.createFieldButton).click();
      await expect.soft(this.loc(L.customFieldByName(this.priorityValue))).toBeVisible({ timeout: TIMEOUTS.long });
      // Set as default
      await this.loc(L.customFieldByName(this.priorityValue)).nth(1).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.settingsNav).click();
    });
  }

  async addValueStatus(): Promise<void> {
    await test.step('Add value in Status system field', async () => {
      await this.loc(L.systemFieldByName('Status')).click();
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.customFieldName).fill(this.statusValue);
      await this.loc(L.applyToProject).click();
      await this.loc(L.createFieldButton).click();
      await expect.soft(this.loc(L.customFieldByName(this.statusValue))).toBeVisible({ timeout: TIMEOUTS.long });
      await this.loc(L.settingsNav).click();
    });
  }

  async addValueType(projectName: string): Promise<void> {
    await test.step('Add value in Type system field', async () => {
      await this.loc(L.systemFieldByName('Type')).click();
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.customFieldName).fill(this.typeValue);
      await this.loc(L.applyToProject).click();
      await this.loc(L.applyToProject).nth(1).click();
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.searchCustomFields).fill(projectName);
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
      await expect.soft(this.loc(L.customFieldByName(this.typeValue))).toBeVisible({ timeout: TIMEOUTS.long });
      await this.loc(L.settingsNav).click();
    });
  }

  async deleteSystemValue(name: string): Promise<void> {
    await test.step(`Delete system value "${name}"`, async () => {
      await this.loc(L.searchCustomFields).fill(name);
      await this.loc(L.customFieldByName(name)).first().click();
      await this.loc(L.deleteCustomField).click();
      await this.loc(L.deleteFieldConfirmation).click();
    });
  }

  // Custom Fields
  async openCustomFields(): Promise<void> {
    await this.loc(L.customFieldsNav).click();
  }

  async createStringCustomField(linkAll = true): Promise<void> {
    await test.step('Create string custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.textFieldType).click();
      await this.loc(L.customFieldName).fill(this.stringCustomField);
      await this.loc(L.customFieldDescription).fill(this.stringPlaceholder);
      if (linkAll) {
        await this.loc(L.applyToProject).click();
        await this.loc(L.applyToTestCase).click();
        await this.loc(L.createFieldButton).click();
      }
      await this.loc(L.createFieldButton).click();
      await expect.soft(this.loc(L.customFieldByName(this.stringCustomField))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createTextareaCustomField(): Promise<void> {
    await test.step('Create textarea custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.textFieldType).click();
      await this.loc(L.customFieldType).click();
      await this.loc(L.textareaFieldType).click();
      await this.loc(L.customFieldName).fill(this.textareaCustomField);
      await this.loc(L.customFieldDescription).fill(this.textareaPlaceholder);
      await this.loc(L.applyToProject).click();
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
    });
  }

  async createNumberCustomField(): Promise<void> {
    await test.step('Create number custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.textFieldType).click();
      await this.loc(L.customFieldType).click();
      await this.loc(L.numberFieldType).click();
      await this.loc(L.customFieldName).fill(this.numberCustomField);
      await this.loc(L.applyToProject).click();
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
    });
  }

  async createBooleanCustomField(): Promise<void> {
    await test.step('Create boolean custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.textFieldType).click();
      await this.loc(L.customFieldType).click();
      await this.loc(L.checkboxFieldType).click();
      await this.loc(L.customFieldName).fill(this.booleanCustomField);
      await this.loc(L.applyToProject).click();
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
    });
  }

  async createDateCustomField(): Promise<void> {
    await test.step('Create date custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.textFieldType).click();
      await this.loc(L.customFieldType).click();
      await this.loc(L.dateFieldType).click();
      await this.loc(L.customFieldName).fill(this.dateCustomField);
      await this.loc(L.applyToProject).click();
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
    });
  }

  async createDropdownSingleCustomField(): Promise<void> {
    await test.step('Create dropdown single custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.textFieldType).click();
      await this.loc(L.customFieldType).click();
      await this.loc(L.dropdownFieldType).click();
      await this.loc(L.customFieldName).fill(this.dropdownSingleCustomField);
      await this.loc(L.addDropdownOption).click();
      await this.loc(L.dropdownOptionInput).fill(this.dropdownValue1);
      await this.page.keyboard.press('Enter');
      await this.loc(L.dropdownOptionInput).fill(this.dropdownValue2);
      await this.page.keyboard.press('Enter');
      await this.loc(L.applyToProject).click();
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
    });
  }

  async createUrlCustomField(): Promise<void> {
    await test.step('Create URL custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.loc(L.textFieldType).click();
      await this.loc(L.customFieldType).click();
      await this.loc(L.urlFieldType).click();
      await this.loc(L.customFieldName).fill(this.urlCustomField);
      await this.loc(L.applyToProject).click();
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
    });
  }

  async deleteCustomField(name: string): Promise<void> {
    await test.step(`Delete custom field "${name}"`, async () => {
      await this.loc(L.searchCustomFields).fill(name);
      await this.loc(L.customFieldThreeDots(name)).click();
      await this.loc(L.deleteCustomField).click();
    });
  }

  async searchCustomField(name: string): Promise<void> {
    await this.loc(L.searchCustomFields).fill(name);
    await waitForNetworkIdle(this.page);
  }

  /**
   * Generic method to create any custom field type using config-driven approach.
   * @param fieldName - Name for the custom field
   * @param config - Field type configuration from custom-fields.data.ts
   * @param dropdownValues - Optional dropdown option values (for dropdown types)
   */
  async createCustomFieldByType(
    fieldName: string,
    config: CustomFieldConfig,
    dropdownValues?: string[],
  ): Promise<void> {
    await test.step(`Create custom field "${fieldName}" by type`, async () => {
      await this.loc(L.createCustomFieldCta).click();

      // Click through type selection locators
      for (const locator of config.typeSelectionLocators) {
        await this.loc(locator).click();
      }

      await this.loc(L.customFieldName).fill(fieldName);

      if (config.hasDescription) {
        await this.loc(L.customFieldDescription).fill(`Placeholder for ${fieldName}`);
      }

      if (config.hasDropdownOptions && dropdownValues?.length) {
        await this.loc(L.addDropdownOption).click();
        for (const value of dropdownValues) {
          await this.loc(L.dropdownOptionInput).fill(value);
          await this.page.keyboard.press('Enter');
        }
      }

      if (config.isMultiSelect) {
        await this.loc(L.multiSelectDropdown).click();
      }

      // Apply to project and test case
      await this.loc(L.applyToProject).click();
      await this.loc(L.applyToTestCase).click();
      await this.loc(L.createFieldButton).click();
      await this.loc(L.createFieldButton).click();
      await expect.soft(this.loc(L.customFieldByName(fieldName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }
}
