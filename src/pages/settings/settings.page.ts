import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { SettingsLocators as L } from './settings.locators.js';
import { TIMEOUTS, RANDOM_LENGTH, ROUTES } from '../../config/constants.js';
import { EnvConfig } from '../../config/env.config.js';
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

  // ============== NAVIGATION ==============

  /**
   * Navigate to the Settings > Fields page.
   * Handles the TMS landing page by clicking "Go to Projects" first to initialize the session.
   */
  async navigateToSettings(): Promise<void> {
    // Retry navigation — the TMS SPA may briefly redirect after initial render
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.page.goto(
        `${EnvConfig.tmsBaseUrl}${ROUTES.settingsFields}`,
        { waitUntil: 'domcontentloaded' },
      );
      try {
        await this.loc(L.systemFieldsNav).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
        return;
      } catch {
        if (attempt === 2) throw new Error('Settings page did not load after 3 navigation attempts');
      }
    }
  }

  async openSystemFields(): Promise<void> {
    await this.loc(L.systemFieldsNav).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
    await this.loc(L.systemFieldsNav).click();
    await waitForNetworkIdle(this.page);
  }

  async openCustomFields(): Promise<void> {
    // Navigate directly to Custom Fields page to avoid SPA redirect issues
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.page.goto(
        `${EnvConfig.tmsBaseUrl}${ROUTES.settingsCustomFields}`,
        { waitUntil: 'domcontentloaded' },
      );
      try {
        await this.loc(L.createCustomFieldCta).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
        return;
      } catch {
        if (attempt === 2) throw new Error('Custom Fields page did not load after 3 navigation attempts');
      }
    }
  }

  private async navigateBackToSettings(): Promise<void> {
    await this.loc(L.systemFieldsBackLink).click();
    await waitForNetworkIdle(this.page);
  }

  // ============== SYSTEM FIELD VALUE CREATION ==============

  async addValueInPriority(): Promise<void> {
    await test.step('Add value in Priority system field', async () => {
      await this.loc(L.systemFieldByName('Priority')).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.addValueCta).click();
      await this.loc(L.systemFieldValueName).fill(this.priorityValue);
      await this.loc(L.createValueButton).click();
      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.customFieldByName(this.priorityValue))).toBeVisible({ timeout: TIMEOUTS.long });
      await this.navigateBackToSettings();
    });
  }

  async addValueStatus(): Promise<void> {
    await test.step('Add value in Status system field', async () => {
      await this.loc(L.systemFieldByName('Status')).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.addValueCta).click();
      await this.loc(L.systemFieldValueName).fill(this.statusValue);
      await this.loc(L.createValueButton).click();
      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.customFieldByName(this.statusValue))).toBeVisible({ timeout: TIMEOUTS.long });
      await this.navigateBackToSettings();
    });
  }

  async addValueType(projectName: string): Promise<void> {
    await test.step('Add value in Type system field', async () => {
      await this.loc(L.systemFieldByName('Type')).click();
      await waitForNetworkIdle(this.page);
      await this.loc(L.addValueCta).click();
      await this.loc(L.systemFieldValueName).fill(this.typeValue);
      await this.loc(L.createValueButton).click();
      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.customFieldByName(this.typeValue))).toBeVisible({ timeout: TIMEOUTS.long });
      await this.navigateBackToSettings();
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

  // ============== CUSTOM FIELD CREATION ==============

  /**
   * After creating a custom field, search for it to find it in the paginated list,
   * then assert it is visible.
   */
  private async verifyCustomFieldCreated(fieldName: string): Promise<void> {
    await this.loc(L.searchCustomFields).fill(fieldName);
    await waitForNetworkIdle(this.page);
    await expect.soft(this.loc(L.customFieldByName(fieldName))).toBeVisible({ timeout: TIMEOUTS.long });
  }

  /**
   * Selects a field type from the type dropdown in the New Field drawer.
   * If the desired type is already selected (e.g., String is default), this is a no-op.
   */
  private async selectFieldType(typeLocator: string): Promise<void> {
    await this.loc(L.customFieldType).click();
    await this.loc(typeLocator).click();
  }

  async createStringCustomField(linkAll = true): Promise<void> {
    await test.step('Create string custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      // String is the default type — no type selection needed
      await this.loc(L.customFieldName).fill(this.stringCustomField);
      await this.loc(L.customFieldDescription).fill(this.stringPlaceholder);
      await this.loc(L.createFieldButton).click();
      await waitForNetworkIdle(this.page);
      await this.verifyCustomFieldCreated(this.stringCustomField);
    });
  }

  async createTextareaCustomField(): Promise<void> {
    await test.step('Create textarea custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.selectFieldType(L.textareaFieldType);
      await this.loc(L.customFieldName).fill(this.textareaCustomField);
      await this.loc(L.customFieldDescription).fill(this.textareaPlaceholder);
      await this.loc(L.createFieldButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async createNumberCustomField(): Promise<void> {
    await test.step('Create number custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.selectFieldType(L.numberFieldType);
      await this.loc(L.customFieldName).fill(this.numberCustomField);
      await this.loc(L.createFieldButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async createBooleanCustomField(): Promise<void> {
    await test.step('Create boolean custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.selectFieldType(L.checkboxFieldType);
      await this.loc(L.customFieldName).fill(this.booleanCustomField);
      await this.loc(L.createFieldButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async createDateCustomField(): Promise<void> {
    await test.step('Create date custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.selectFieldType(L.dateFieldType);
      await this.loc(L.customFieldName).fill(this.dateCustomField);
      await this.loc(L.createFieldButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async createDropdownSingleCustomField(): Promise<void> {
    await test.step('Create dropdown single custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.selectFieldType(L.dropdownFieldType);
      await this.loc(L.customFieldName).fill(this.dropdownSingleCustomField);
      // Each value requires clicking "+ Add Value" first (input disappears after Enter)
      await this.loc(L.addDropdownOption).click();
      await this.loc(L.dropdownOptionInput).fill(this.dropdownValue1);
      await this.page.keyboard.press('Enter');
      await this.loc(L.addDropdownOption).click();
      await this.loc(L.dropdownOptionInput).fill(this.dropdownValue2);
      await this.page.keyboard.press('Enter');
      await this.loc(L.createFieldButton).click();
      await waitForNetworkIdle(this.page);
      await this.verifyCustomFieldCreated(this.dropdownSingleCustomField);
    });
  }

  async createUrlCustomField(): Promise<void> {
    await test.step('Create URL custom field', async () => {
      await this.loc(L.createCustomFieldCta).click();
      await this.selectFieldType(L.urlFieldType);
      await this.loc(L.customFieldName).fill(this.urlCustomField);
      await this.loc(L.createFieldButton).click();
      await waitForNetworkIdle(this.page);
      await this.verifyCustomFieldCreated(this.urlCustomField);
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

      // Select field type if not using default (String)
      if (config.typeSelectionLocators.length > 0) {
        await this.loc(L.customFieldType).click();
        for (const locator of config.typeSelectionLocators) {
          await this.loc(locator).click();
        }
      }

      await this.loc(L.customFieldName).fill(fieldName);

      if (config.hasDescription) {
        await this.loc(L.customFieldDescription).fill(`Placeholder for ${fieldName}`);
      }

      if (config.hasDropdownOptions && dropdownValues?.length) {
        for (const value of dropdownValues) {
          await this.loc(L.addDropdownOption).click();
          await this.loc(L.dropdownOptionInput).fill(value);
          await this.page.keyboard.press('Enter');
        }
      }

      await this.loc(L.createFieldButton).click();
      await waitForNetworkIdle(this.page);
      await this.verifyCustomFieldCreated(fieldName);
    });
  }
}
