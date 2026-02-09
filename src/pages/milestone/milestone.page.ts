import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import {
  MilestoneLocators as L,
  milestoneInList,
  milestoneTag,
  milestoneProgressWithPercentage,
  milestoneDetailName,
  milestoneDetailDescriptionText,
  breadcrumbMilestoneName,
  milestoneTestRunsCount,
  milestonePassedRatioValue,
  milestoneTestRunItem,
  milestoneTestRunCheckbox,
  datePickerDay,
  milestoneOption,
} from './milestone.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';

export class MilestonePage extends BasePage {
  milestoneTitle = `Milestone_${randomString(RANDOM_LENGTH.medium)}`;
  milestoneDescription = `Automation Milestone Description ${randomString(RANDOM_LENGTH.short)}`;
  updatedMilestoneTitle = `Updated_Milestone_${randomString(RANDOM_LENGTH.medium)}`;
  updatedMilestoneDescription = `Updated Description ${randomString(RANDOM_LENGTH.short)}`;
  milestoneTag = `AutoTag_${randomString(RANDOM_LENGTH.short)}`;

  constructor(page: Page) { super(page); }

  // Navigation
  async openMilestonesTab(): Promise<void> {
    await test.step('Open Milestones tab', async () => {
      await this.loc(L.milestoneTab).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async navigateBackToMilestonesList(): Promise<void> {
    await test.step('Navigate back to milestones list', async () => {
      if (await this.isVisible(L.milestoneBackBtn, TIMEOUTS.short)) {
        await this.loc(L.milestoneBackBtn).click();
        await this.page.waitForTimeout(2000);
      }
    });
  }

  // Create Milestone
  async createMilestoneWithDetails(): Promise<void> {
    await test.step('Create milestone with details', async () => {
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(2000);
      await this.loc(L.milestoneNameInput).fill(this.milestoneTitle);
      await this.loc(L.milestoneDescriptionInput).fill(this.milestoneDescription);
      await this.addTagToMilestone(this.milestoneTag);
      await this.page.waitForTimeout(1000);
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(3000);
    });
  }

  async createMilestoneWithNameAndDescription(): Promise<void> {
    await test.step('Create milestone with name and description', async () => {
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(2000);
      await this.loc(L.milestoneNameInput).fill(this.milestoneTitle);
      await this.loc(L.milestoneDescriptionInput).fill(this.milestoneDescription);
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(3000);
    });
  }

  private async addTagToMilestone(tagName: string): Promise<void> {
    if (await this.isVisible(L.milestoneTagsInput, TIMEOUTS.short)) {
      await this.loc(L.milestoneTagsInput).fill(tagName);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);
    }
  }

  // Verify Milestone
  async verifyMilestoneCreatedSuccessfully(): Promise<void> {
    await test.step('Verify milestone created successfully', async () => {
      await expect.soft(this.loc(milestoneInList(this.milestoneTitle))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyMilestoneTagVisible(): Promise<void> {
    await test.step('Verify milestone tag is visible', async () => {
      await expect.soft(this.loc(milestoneTag(this.milestoneTag))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // Open/View Milestone
  async openCreatedMilestone(): Promise<void> {
    await test.step('Open created milestone', async () => {
      await this.loc(milestoneInList(this.milestoneTitle)).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async openUpdatedMilestone(): Promise<void> {
    await test.step('Open updated milestone', async () => {
      await this.loc(milestoneInList(this.updatedMilestoneTitle)).click();
      await this.page.waitForTimeout(2000);
    });
  }

  // Edit Milestone
  async openMilestoneEditForm(): Promise<void> {
    await test.step('Open milestone edit form', async () => {
      await this.loc(L.milestoneOpenMenu).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.milestoneEditMenu).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async editMilestoneNameAndDescription(): Promise<void> {
    await test.step('Edit milestone name and description', async () => {
      await this.openMilestoneEditForm();
      const nameEl = this.loc(L.milestoneNameInput); await nameEl.click(); await nameEl.clear(); await nameEl.fill(this.updatedMilestoneTitle);
      const descEl = this.loc(L.milestoneDescriptionInput); await descEl.click(); await descEl.clear(); await descEl.fill(this.updatedMilestoneDescription);
      await this.loc(L.milestoneSaveChangesBtn).click();
      await this.page.waitForTimeout(3000);
    });
  }

  async editMilestoneAndAddTag(): Promise<void> {
    await test.step('Edit milestone and add tag', async () => {
      await this.openMilestoneEditForm();
      await this.addTagToMilestone(this.milestoneTag);
      await this.loc(L.milestoneSaveChangesBtn).click();
      await this.page.waitForTimeout(3000);
    });
  }

  // Delete Milestone
  async deleteMilestone(): Promise<void> {
    await test.step('Delete milestone', async () => {
      await this.loc(L.milestoneOpenMenu).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.milestoneDeleteMenu).click();
      await this.page.waitForTimeout(3000);
    });
  }

  async verifyMilestoneDeletedSuccessfully(): Promise<void> {
    await test.step('Verify milestone deleted successfully', async () => {
      await expect.soft(this.loc(milestoneInList(this.updatedMilestoneTitle))).not.toBeVisible({ timeout: TIMEOUTS.short });
    });
  }

  // Milestone Progress
  async verifyMilestoneProgress(expectedPercentage: string): Promise<void> {
    await test.step(`Verify milestone progress is ${expectedPercentage}%`, async () => {
      await expect.soft(this.loc(milestoneProgressWithPercentage(expectedPercentage))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyMilestoneProgressIsZero(): Promise<void> {
    await this.verifyMilestoneProgress('0');
  }

  async getMilestoneProgressText(): Promise<string> {
    return await test.step('Get milestone progress text', async () => {
      if (await this.isVisible(L.milestoneProgressPercentage, TIMEOUTS.medium)) {
        return (await this.loc(L.milestoneProgressPercentage).textContent()) ?? '';
      }
      return '0% Complete';
    });
  }

  // Test Run Integration
  async selectMilestoneInTestRun(milestoneName: string): Promise<void> {
    await test.step(`Select milestone "${milestoneName}" in test run`, async () => {
      await this.page.waitForTimeout(2000);
      await this.loc(L.testRunMilestoneDropdown).scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(1000);
      await this.loc(L.testRunMilestoneDropdown).click();
      await this.page.waitForTimeout(2000);
      if (await this.isVisible(L.testRunMilestoneSearch, TIMEOUTS.short)) {
        await this.loc(L.testRunMilestoneSearch).fill(milestoneName);
        await this.page.waitForTimeout(1000);
      }
      await this.loc(milestoneOption(milestoneName)).click();
      await this.page.waitForTimeout(1000);
    });
  }

  async selectCreatedMilestoneInTestRun(): Promise<void> {
    await this.selectMilestoneInTestRun(this.milestoneTitle);
  }

  // Milestone Assertions
  async verifyNoTestRunsAssociated(): Promise<void> {
    await test.step('Verify no test runs associated', async () => {
      await expect.soft(this.loc(L.milestoneNoTestRuns)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyProgressAfterStatusUpdate(expectedPercentage: string): Promise<void> {
    await test.step(`Verify progress after status update is ${expectedPercentage}%`, async () => {
      await this.page.reload();
      await this.page.waitForTimeout(3000);
      await expect.soft(this.loc(milestoneProgressWithPercentage(expectedPercentage))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyMilestoneUpdatedSuccessfully(): Promise<void> {
    await test.step('Verify milestone updated successfully', async () => {
      await expect.soft(this.loc(milestoneInList(this.updatedMilestoneTitle))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async verifyMilestoneDetailsOnDetailPage(): Promise<void> {
    await test.step('Verify milestone details on detail page', async () => {
      await expect.soft(this.loc(milestoneDetailName(this.milestoneTitle))).toBeVisible({ timeout: TIMEOUTS.medium });
      await expect.soft(this.loc(milestoneDetailDescriptionText(this.milestoneDescription))).toBeVisible({ timeout: TIMEOUTS.medium });
      await expect.soft(this.loc(milestoneTag(this.milestoneTag))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // Breadcrumb
  async verifyMilestoneBreadcrumb(): Promise<void> {
    await test.step('Verify milestone breadcrumb', async () => {
      await expect.soft(this.loc(L.breadcrumbTestManager)).toBeVisible({ timeout: TIMEOUTS.medium });
      await expect.soft(this.loc(L.breadcrumbProjectName)).toBeVisible({ timeout: TIMEOUTS.medium });
      await expect.soft(this.loc(breadcrumbMilestoneName(this.milestoneTitle))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // Test Runs Associated
  async verifyTestRunsAssociatedCount(expectedCount: string): Promise<void> {
    await test.step(`Verify test runs associated count is ${expectedCount}`, async () => {
      await expect.soft(this.loc(milestoneTestRunsCount(expectedCount))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // Passed/Failed Count
  async verifyPassedAndFailedCount(): Promise<void> {
    await test.step('Verify passed and failed count', async () => {
      if (await this.isVisible(L.milestoneProgressDetailsBtn, TIMEOUTS.medium)) {
        await this.loc(L.milestoneProgressDetailsBtn).click();
        await this.loc(L.milestoneProgressDetailsBtn).hover();
        await this.page.waitForTimeout(2000);
      }
      await expect.soft(this.loc(L.progressPopupPassedCount)).toBeVisible({ timeout: TIMEOUTS.medium });
      await expect.soft(this.loc(L.progressPopupFailedCount)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyPassedRatio(passed: string, total: string): Promise<void> {
    await test.step(`Verify passed ratio is ${passed}/${total}`, async () => {
      await expect.soft(this.loc(milestonePassedRatioValue(passed, total))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // Search Milestone
  async searchMilestone(milestoneName: string): Promise<void> {
    await test.step(`Search milestone "${milestoneName}"`, async () => {
      const el = this.loc(L.milestoneSearchInput); await el.click(); await el.clear(); await el.fill(milestoneName);
      await this.page.waitForTimeout(2000);
    });
  }

  async searchCreatedMilestone(): Promise<void> {
    await this.searchMilestone(this.milestoneTitle);
  }

  async verifyMilestoneInSearchResults(): Promise<void> {
    await test.step('Verify milestone in search results', async () => {
      await expect.soft(this.loc(milestoneInList(this.milestoneTitle))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async clearMilestoneSearch(): Promise<void> {
    await test.step('Clear milestone search', async () => {
      const el = this.loc(L.milestoneSearchInput); await el.click(); await el.clear();
      await this.page.waitForTimeout(1000);
    });
  }

  // View Filter
  async filterMilestonesByOpen(): Promise<void> {
    await test.step('Filter milestones by open', async () => {
      await this.loc(L.milestoneViewDropdown).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.milestoneViewOpen).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async filterMilestonesByComplete(): Promise<void> {
    await test.step('Filter milestones by complete', async () => {
      await this.loc(L.milestoneViewDropdown).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.milestoneViewComplete).click();
      await this.page.waitForTimeout(2000);
    });
  }

  async verifyNoMilestonesFound(): Promise<void> {
    await test.step('Verify no milestones found', async () => {
      const emptyStateVisible = await this.isVisible(L.milestoneEmptyState, TIMEOUTS.medium) ||
                                 await this.isVisible(L.milestoneNoMilestonesMsg, TIMEOUTS.medium);
      expect.soft(emptyStateVisible).toBeTruthy();
    });
  }

  // Mark as Complete
  async markMilestoneAsCompleted(): Promise<void> {
    await test.step('Mark milestone as completed', async () => {
      await this.loc(L.milestoneOpenMenu).click();
      await this.loc(L.milestoneMarkCompletedBtn).click();
      await this.page.waitForTimeout(3000);
    });
  }

  async markMilestoneAsCompletedViaMenu(): Promise<void> {
    await test.step('Mark milestone as completed via menu', async () => {
      await this.loc(L.milestoneOpenMenu).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.milestoneMarkCompleteMenu).click();
      await this.page.waitForTimeout(3000);
    });
  }

  async verifyMilestoneMarkedComplete(): Promise<void> {
    await test.step('Verify milestone marked complete', async () => {
      await this.filterMilestonesByComplete();
      await expect.soft(this.loc(milestoneInList(this.milestoneTitle))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // Create Milestone with Test Run
  async createMilestoneWithTestRun(testRunName: string): Promise<void> {
    await test.step(`Create milestone with test run "${testRunName}"`, async () => {
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(2000);
      await this.loc(L.milestoneNameInput).fill(this.milestoneTitle);
      await this.loc(L.milestoneDescriptionInput).fill(this.milestoneDescription);
      await this.addTagToMilestone(this.milestoneTag);
      await this.selectTestRunInMilestoneForm(testRunName);
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(3000);
    });
  }

  private async selectTestRunInMilestoneForm(testRunName: string): Promise<void> {
    await this.loc(L.milestoneTestRunsSearch).click();
    await this.page.waitForTimeout(2000);
    if (await this.isVisible(milestoneTestRunItem(testRunName), TIMEOUTS.medium)) {
      await this.loc(milestoneTestRunCheckbox(testRunName)).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async addTestRunToMilestoneViaEdit(testRunName: string): Promise<void> {
    await test.step(`Add test run "${testRunName}" to milestone via edit`, async () => {
      await this.openMilestoneEditForm();
      await this.selectTestRunInMilestoneForm(testRunName);
      await this.loc(L.milestoneSaveChangesBtn).click();
      await this.page.waitForTimeout(3000);
    });
  }

  // Date Methods
  private async setMilestoneEndDate(day: string): Promise<void> {
    await this.loc(L.milestoneEndDateInput).click();
    await this.page.waitForTimeout(1000);
    if (await this.isVisible(L.datePickerNextMonth, TIMEOUTS.short)) {
      await this.loc(L.datePickerNextMonth).click();
      await this.page.waitForTimeout(1000);
    }
    await this.loc(datePickerDay(day)).click();
    await this.page.waitForTimeout(1000);
  }

  async createMilestoneWithEndDate(endDay: string): Promise<void> {
    await test.step(`Create milestone with end date day ${endDay}`, async () => {
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(2000);
      await this.loc(L.milestoneNameInput).fill(this.milestoneTitle);
      await this.addTagToMilestone(this.milestoneTag);
      await this.loc(L.milestoneDescriptionInput).fill(this.milestoneDescription);
      await this.setMilestoneEndDate(endDay);
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(3000);
    });
  }

  async verifyMilestoneDueDateDisplayed(): Promise<void> {
    await test.step('Verify milestone due date displayed', async () => {
      await expect.soft(this.loc(L.milestoneDueDateDisplay)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async createMilestoneWithAllDetails(testRunName: string, endDay: string): Promise<void> {
    await test.step('Create milestone with all details', async () => {
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(2000);
      await this.loc(L.milestoneNameInput).fill(this.milestoneTitle);
      await this.loc(L.milestoneDescriptionInput).fill(this.milestoneDescription);
      await this.addTagToMilestone(this.milestoneTag);
      await this.setMilestoneEndDate(endDay);
      if (testRunName && testRunName.length > 0) {
        await this.selectTestRunInMilestoneForm(testRunName);
      }
      await this.loc(L.createMilestoneCta).click();
      await this.page.waitForTimeout(3000);
    });
  }
}
