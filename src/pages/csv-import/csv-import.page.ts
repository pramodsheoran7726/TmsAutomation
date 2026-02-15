import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { CsvImportLocators as L } from './csv-import.locators.js';
import { TIMEOUTS } from '../../config/constants.js';

export class CsvImportPage extends BasePage {
  constructor(page: Page) { super(page); }

  async uploadCsv(filePath: string): Promise<void> {
    await test.step('Upload CSV file', async () => {
      await this.loc(L.browseCsv).setInputFiles(filePath);
      await expect.soft(this.loc(L.verifyCsvUploaded)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async uploadBddCsv(filePath: string): Promise<void> {
    await test.step('Upload BDD CSV file', async () => {
      await this.loc(L.browseCsv).setInputFiles(filePath);
      await expect.soft(this.loc(L.verifyBddCsvUploaded)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyUploadColumns(): Promise<void> {
    await test.step('Verify upload columns', async () => {
      await expect.soft(this.loc(L.verifyTitleColumn)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.verifyTypeColumn)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.verifyStatusColumn)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.verifyPriorityColumn)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.verifyDescriptionColumn)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async clickNext(): Promise<void> {
    await this.loc(L.nextButtonCsv).click();
  }

  async verifyMapFields(): Promise<void> {
    await test.step('Verify map fields', async () => {
      await expect.soft(this.loc(L.mapFieldsCsvPage)).toBeVisible({ timeout: TIMEOUTS.long });
      await expect.soft(this.loc(L.verifyMapToColumn)).toBeVisible();
      await expect.soft(this.loc(L.verifyFieldInCsvColumn).first()).toBeVisible();
    });
  }

  async verifyMapValues(): Promise<void> {
    await test.step('Verify map values', async () => {
      await expect.soft(this.loc(L.mappedValueCsvPage)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyPreviewImport(): Promise<void> {
    await test.step('Verify preview import page', async () => {
      await expect.soft(this.loc(L.previewCsv)).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async clickImportTestCases(): Promise<void> {
    await this.loc(L.importTestCaseCta).click();
    // Wait for redirect from import page back to test cases list
    await this.page.waitForFunction(
      () => !window.location.href.includes('/import'),
      { timeout: TIMEOUTS.extraLong },
    );
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyImportedTestCase(): Promise<void> {
    await test.step('Verify imported test case', async () => {
      await expect.soft(
        this.page.locator('h5', { hasText: 'All Test Cases' }).first(),
      ).toBeVisible({ timeout: TIMEOUTS.extraLong });
    });
  }

  async downloadSampleCsv(): Promise<void> {
    await this.loc(L.downloadSampleCsv).click();
  }

  async fullCsvImportFlow(filePath: string): Promise<void> {
    await test.step('Full CSV import flow', async () => {
      await this.uploadCsv(filePath);
      await this.clickNext();
      await this.verifyMapFields();
      await this.clickNext();
      await this.verifyMapValues();
      await this.clickNext();
      await this.verifyPreviewImport();
      await this.clickImportTestCases();
    });
  }
}
