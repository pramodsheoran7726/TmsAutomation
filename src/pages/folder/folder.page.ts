import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { FolderLocators as L } from './folder.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class FolderPage extends BasePage {
  folderName = `AutoFolder_${randomString(RANDOM_LENGTH.standard)}`;
  subFolderName = `AutoSubFolder_${randomString(RANDOM_LENGTH.standard)}`;
  newFolderName = `AutoFolder_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  async createFolder(name?: string): Promise<void> {
    const folder = name ?? this.folderName;
    await test.step('Create folder: ' + folder, async () => {
      await this.loc(L.createFolderButton).click();
      await this.loc(L.folderTitleField).fill(folder);
      await this.page.keyboard.press('Enter');
      await waitForNetworkIdle(this.page);
      await expect.soft(this.loc(L.createdFolder(folder))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createSubFolder(parentFolder: string, subFolderName?: string): Promise<void> {
    const subFolder = subFolderName ?? this.subFolderName;
    await test.step('Create sub-folder "' + subFolder + '" under "' + parentFolder + '"', async () => {
      await this.loc(L.createdFolder(parentFolder)).hover();
      await this.loc(L.createSubFolderForFolder(parentFolder)).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.createSubFolderForFolder(parentFolder)).click();
      await this.loc(L.folderNameInput).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.folderNameInput).fill(subFolder);
      await this.loc(L.createFolderSubmit).click();
      await expect.soft(this.loc(L.createdFolder(subFolder))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async renameFolder(oldName: string, newName?: string): Promise<void> {
    const folder = newName ?? this.newFolderName;
    await test.step('Rename folder "' + oldName + '" to "' + folder + '"', async () => {
      await this.loc(L.folderOptionsMenu(oldName)).click();
      await this.loc(L.renameFolderButton).click();
      await this.loc(L.folderNameInput).clear();
      await this.loc(L.folderNameInput).fill(folder);
      await this.loc(L.saveFolderButton).click();
      await expect.soft(this.loc(L.createdFolder(folder))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async deleteFolder(name?: string): Promise<void> {
    const folder = name ?? this.folderName;
    await test.step('Delete folder: ' + folder, async () => {
      if (await this.isVisible(L.createdFolder(folder))) {
        await this.loc(L.folderOptionsMenu(folder)).click();
        await this.loc(L.deleteFolderButton).click();
        await this.loc(L.deleteFolderConfirmInput).fill('DELETE');
        await this.loc(L.deleteFolderConfirm).click();
        await expect.soft(this.loc(L.createdFolder(folder))).not.toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async dragDropFolder(sourceFolder: string, targetFolder: string): Promise<void> {
    await test.step('Drag folder "' + sourceFolder + '" into "' + targetFolder + '"', async () => {
      const source = this.loc(L.createdFolder(sourceFolder));
      const target = this.loc(L.createdFolder(targetFolder));

      await source.dragTo(target);
      await waitForNetworkIdle(this.page);

      await this.loc(L.createdFolder(targetFolder)).click();
      await expect.soft(this.loc(L.createdFolder(sourceFolder))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async copyTestCases(testCaseCount: number, targetFolder: string): Promise<void> {
    await test.step('Copy ' + testCaseCount + ' test cases to folder "' + targetFolder + '"', async () => {
      for (let i = 0; i < testCaseCount; i++) {
        await this.loc(L.testCaseCheckbox).nth(i).click();
      }
      await this.loc(L.bulkActionsButton).click();
      await this.loc(L.copyTestCasesButton).click();
      await this.loc(L.selectFolderDropdown).click();
      await this.loc(L.selectFolder(targetFolder)).click();
      await this.loc(L.copyTestCasesConfirm).click();
      await expect.soft(this.loc(L.testCasesCopiedSuccess)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async moveTestCases(testCaseCount: number, targetFolder: string): Promise<void> {
    await test.step('Move ' + testCaseCount + ' test cases to folder "' + targetFolder + '"', async () => {
      for (let i = 0; i < testCaseCount; i++) {
        await this.loc(L.testCaseCheckbox).nth(i).click();
      }
      await this.loc(L.bulkActionsButton).click();
      await this.loc(L.moveTestCasesButton).click();
      await this.loc(L.selectFolderDropdown).click();
      await this.loc(L.selectFolder(targetFolder)).click();
      await this.loc(L.moveTestCasesConfirm).click();
      await expect.soft(this.loc(L.testCasesMovedSuccess)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async createTestCasesInsideFolder(folderName: string, testCasePage: { createTestCase: (title?: string) => Promise<void> }, count: number): Promise<void> {
    await test.step(`Create folder "${folderName}" with ${count} test cases`, async () => {
      await this.createFolder(folderName);
      await this.openFolder(folderName);
      for (let i = 1; i <= count; i++) {
        await testCasePage.createTestCase(`${folderName}_TC_${i}`);
      }
    });
  }

  async verifyFolderTestCaseCount(folderName: string, expectedCount: string): Promise<void> {
    await test.step(`Verify folder "${folderName}" shows count "${expectedCount}"`, async () => {
      await expect.soft(this.loc(L.folderTestCaseCount(folderName))).toHaveText(expectedCount, { timeout: TIMEOUTS.medium });
    });
  }

  async openFolder(name: string): Promise<void> {
    await this.loc(L.createdFolder(name)).click();
    await expect.soft(this.loc(L.folderBreadcrumb(name))).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async verifyFolderExists(name: string): Promise<void> {
    await expect.soft(this.loc(L.createdFolder(name))).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async verifyFolderDeleted(name: string): Promise<void> {
    await expect.soft(this.loc(L.createdFolder(name))).not.toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async expandFolder(name: string): Promise<void> {
    await this.loc(L.folderExpandIcon(name)).click();
    await waitForNetworkIdle(this.page);
  }

  async collapseFolder(name: string): Promise<void> {
    await this.loc(L.folderCollapseIcon(name)).click();
    await waitForNetworkIdle(this.page);
  }
}
