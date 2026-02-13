import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { DatasetLocators as L } from './dataset.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class DatasetPage extends BasePage {
  datasetName = `Dataset_${randomString(RANDOM_LENGTH.medium)}`;
  datasetDescription = `Automation Dataset Description ${randomString(RANDOM_LENGTH.short)}`;
  updatedDatasetName = `Updated_Dataset_${randomString(RANDOM_LENGTH.medium)}`;
  updatedDatasetDescription = `Updated Description ${randomString(RANDOM_LENGTH.short)}`;

  constructor(page: Page) { super(page); }

  // Navigation
  async openDatasetsTab(): Promise<void> {
    await test.step('Open Datasets tab', async () => {
      await this.loc(L.datasetTab).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async navigateBackToDatasetsList(): Promise<void> {
    await test.step('Navigate back to datasets list', async () => {
      await this.loc(L.datasetBackBtn).click();
      await expect.soft(this.loc(L.datasetSearchInput)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // Create Dataset
  private async clickCreateDatasetButton(): Promise<void> {
    await this.loc(L.createDatasetBtn).click();
    await this.loc(L.datasetNameInput).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
  }

  async createDatasetWithDetails(): Promise<void> {
    await test.step('Create dataset with details', async () => {
      await this.clickCreateDatasetButton();
      await this.loc(L.datasetNameInput).fill(this.datasetName);
      await this.loc(L.datasetDescriptionInput).fill(this.datasetDescription);
      await this.loc(L.datasetCreateBtnModal).click();
      await this.loc(L.datasetModalDialog).waitFor({ state: 'hidden', timeout: TIMEOUTS.medium });
      await waitForNetworkIdle(this.page);
    });
  }

  async createDatasetWithNameOnly(): Promise<void> {
    await test.step('Create dataset with name only', async () => {
      await this.clickCreateDatasetButton();
      await this.loc(L.datasetNameInput).fill(this.datasetName);
      await this.loc(L.datasetCreateBtnModal).click();
      await this.loc(L.datasetModalDialog).waitFor({ state: 'hidden', timeout: TIMEOUTS.medium });
    });
  }

  async tryCreateDatasetWithoutName(): Promise<void> {
    await test.step('Try creating dataset without name', async () => {
      await this.loc(L.datasetCreateBtnModal).click();
      await waitForNetworkIdle(this.page);
    });
  }

  // Search
  async searchDataset(searchText: string): Promise<void> {
    await test.step(`Search dataset "${searchText}"`, async () => {
      await this.loc(L.datasetSearchInput).fill(searchText);
      await waitForNetworkIdle(this.page);
    });
  }

  async searchForCreatedDataset(): Promise<void> {
    await this.searchDataset(this.datasetName);
  }

  async searchForNonExistentDataset(): Promise<void> {
    const nonExistentName = `NonExistent_${randomString(RANDOM_LENGTH.standard)}`;
    await this.searchDataset(nonExistentName);
  }

  async clearDatasetSearch(): Promise<void> {
    await test.step('Clear dataset search', async () => {
      const el = this.loc(L.datasetSearchInput); await el.click(); await el.clear();
      await waitForNetworkIdle(this.page);
    });
  }

  // Edit Dataset
  async openCreatedDataset(): Promise<void> {
    await test.step('Open created dataset', async () => {
      await this.loc(L.datasetByName(this.datasetName)).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async openUpdatedDataset(): Promise<void> {
    await test.step('Open updated dataset', async () => {
      await this.loc(L.datasetByName(this.updatedDatasetName)).click();
      await waitForNetworkIdle(this.page);
    });
  }

  private async openDatasetMenu(): Promise<void> {
    await this.loc(L.datasetMenuByName(this.datasetName)).click();
    await this.loc(L.datasetEditOption).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
  }

  async editDatasetDetails(): Promise<void> {
    await test.step('Edit dataset details', async () => {
      await this.openDatasetMenu();
      await this.loc(L.datasetEditOption).click();
      await this.loc(L.datasetTitleTextarea).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      const el = this.loc(L.datasetTitleTextarea); await el.click(); await el.clear(); await el.fill(this.updatedDatasetName);
      await this.page.keyboard.press('Enter');
      await waitForNetworkIdle(this.page);
    });
  }

  // Delete Dataset
  async deleteCreatedDataset(): Promise<void> {
    await this.deleteDataset(this.updatedDatasetName);
  }

  async deleteDataset(name: string): Promise<void> {
    await test.step(`Delete dataset "${name}"`, async () => {
      await this.loc(L.datasetMenuByName(name)).click();
      await this.loc(L.datasetDeleteOption).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.datasetDeleteOption).click();
      await this.loc(L.datasetDeleteConfirmBtn).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.datasetDeleteConfirmBtn).click();
      await waitForNetworkIdle(this.page);
    });
  }

  // Add Dataset Rows
  async addDatasetRows(): Promise<void> {
    await test.step('Add dataset rows', async () => {
      await this.loc(L.datasetFirstCell).click();
      await this.loc(L.datasetFirstCell).waitFor({ state: 'visible', timeout: TIMEOUTS.short });
      await this.page.keyboard.type('TestValue1');
      await this.page.keyboard.press('Enter');
      await this.loc(L.datasetLastCell).waitFor({ state: 'visible', timeout: TIMEOUTS.short });
      await this.loc(L.datasetLastCell).click();
      await this.page.keyboard.type('TestValue2');
      await this.loc(L.datasetSaveBtn).click();
      await waitForNetworkIdle(this.page);
    });
  }

  // Modal Control
  async closeDatasetModal(): Promise<void> {
    await test.step('Close dataset modal', async () => {
      if (await this.isVisible(L.datasetCloseModalBtn, TIMEOUTS.short)) {
        await this.loc(L.datasetCloseModalBtn).click();
        await waitForNetworkIdle(this.page);
      } else if (await this.isVisible(L.datasetCancelBtnModal, TIMEOUTS.short)) {
        await this.loc(L.datasetCancelBtnModal).click();
        await waitForNetworkIdle(this.page);
      }
    });
  }

  // Verification
  async verifyEmptyState(): Promise<void> {
    await test.step('Verify empty state', async () => {
      await expect.soft(this.loc(L.datasetEmptyStateText)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyDatasetCreated(): Promise<void> {
    await test.step('Verify dataset created', async () => {
      await expect.soft(this.loc(L.datasetByName(this.datasetName))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifySearchResults(): Promise<void> {
    await test.step('Verify search results', async () => {
      await expect.soft(this.loc(L.datasetByName(this.datasetName))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyNoResultsFound(): Promise<void> {
    await test.step('Verify no results found', async () => {
      await expect.soft(this.loc(L.datasetNoResults)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyDatasetUpdated(): Promise<void> {
    await test.step('Verify dataset updated', async () => {
      await expect.soft(this.loc(L.datasetByName(this.updatedDatasetName))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyDatasetDeleted(): Promise<void> {
    await test.step('Verify dataset deleted', async () => {
      await expect.soft(this.loc(L.datasetByName(this.updatedDatasetName))).not.toBeVisible({ timeout: TIMEOUTS.short });
    });
  }

  async verifyParameterCount(expectedCount: number): Promise<void> {
    await test.step(`Verify parameter count is ${expectedCount}`, async () => {
      const expectedText = `${expectedCount} Parameter`;
      await expect.soft(this.loc(`//h5[contains(.,'${expectedText}')]`)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyDatasetNameValidationError(): Promise<void> {
    await test.step('Verify dataset name validation error', async () => {
      await expect.soft(this.loc(L.datasetNameError)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }
}
