/**
 * Locators for Milestone functionality in Test Manager
 */

export const MilestoneLocators = {
  // ============== MILESTONE NAVIGATION ==============
  milestoneTab: `//*[@role='tab' and contains(.,'Milestones')]`,
  createMilestoneCta: `//button[.//span[contains(text(),'Create Milestone')] or contains(.,'Create Milestone')]`,
  milestoneBackBtn: `//button[.//h5[text()='Milestones']]`,

  // ============== MILESTONE FORM FIELDS ==============
  milestoneNameInput: `//input[@placeholder='Enter desired name']`,
  milestoneDescriptionInput: `//textarea[@placeholder='Enter description here']`,
  milestoneStartDateInput: `//input[@placeholder='Start Date']`,
  milestoneEndDateInput: `//input[@placeholder='End Date']`,
  milestoneStartDateClearBtn: `//input[@placeholder='Start Date']/following-sibling::button[contains(@class,'close')]`,
  milestoneOwnerDropdown: `//button[contains(.,'Select Owner')]`,
  milestoneOwnerSearch: `//input[@placeholder='Search members']`,
  milestoneTagsInput: `//input[@placeholder='Add Tags separated by enter']`,
  milestoneTagsCombobox: `//input[@role='combobox'][@placeholder='Add Tags separated by enter']`,

  // ============== MILESTONE FORM - TEST RUNS SELECTION ==============
  milestoneTestRunsSearch: `//input[@placeholder='Search Test Runs and select to add']`,
  milestoneTestRunsDropdownHeader: `//h5[text()='Test Runs']`,
  milestoneSelectedTestRunRemove: `//button[contains(@class,'close') or @aria-label='Remove']`,

  // ============== MILESTONE FORM - ATTACHMENTS ==============
  milestoneAddAttachmentsBtn: `//button[contains(.,'Add attachments')]`,

  // ============== DATE PICKER ==============
  datePickerToday: `//li[text()='Today']`,
  datePickerNextMonth: `//button[contains(@aria-label,'Next month')]`,
  datePickerPrevMonth: `//button[contains(@aria-label,'Previous month')]`,

  // ============== MILESTONE FORM BUTTONS ==============
  milestoneSaveChangesBtn: `//button[.//span[text()='Save Changes']]`,
  milestoneCancelBtn: `//button[.//span[text()='Cancel']]`,
  milestoneCreateSubmitBtn: `//button[.//span[text()='Create Milestone']][not(@disabled)]`,

  // ============== MILESTONE TOAST MESSAGES ==============
  milestoneCreatedToast: `//*[contains(text(),'Milestone created successfully') or contains(.,'Milestone created successfully')]`,
  milestoneUpdatedToast: `//*[contains(text(),'Milestone updated successfully') or contains(.,'Milestone updated successfully')]`,
  milestoneDeletedToast: `//*[contains(text(),'Milestone deleted successfully') or contains(.,'Milestone deleted successfully')]`,

  // ============== MILESTONE LIST PAGE ==============
  milestoneSearchInput: `//input[@placeholder='Find a milestone...']`,
  milestoneViewDropdown: `//button[contains(.,'View:')]`,
  milestoneViewOpen: `//ul[@role='listbox']//span[text()='Open']`,
  milestoneViewComplete: `//ul[@role='listbox']//span[contains(.,'Complete')]`,
  milestoneEmptyState: `//span[text()='Oops! No Milestone found matching your search. Recheck your search query and try again.']`,
  milestoneDueDateDisplay: `//span[contains(text(),'due')]`,
  milestoneNoMilestonesMsg: `//span[contains(., 'No Open Milestone Found')]`,

  // ============== MILESTONE MENU OPTIONS ==============
  milestoneOpenMenu: `//button[@aria-label='Open menu']`,
  milestoneEditMenu: `//ul[@role='menu']//div[text()='Edit']`,
  milestoneDeleteMenu: `//ul[@role='menu']//div[text()='Delete']`,
  milestoneMarkCompleteMenu: `//div[@role='menuitem'][contains(.,'Mark as Complete')]`,

  // ============== BREADCRUMB ==============
  breadcrumbTestManager: `//button[.//span[text()='Test Manager']]`,
  breadcrumbProjectName: `//button[.//span[text()='Test Manager']]/following::button[1]`,

  // ============== MILESTONE DETAIL PAGE ==============
  milestoneProgressBar: `//span[@role='progressbar'][@aria-label='Milestone progress']`,
  milestoneProgressPercentage: `//span[contains(.,'% Complete')]`,
  milestoneProgressDetailsBtn: `//span[@aria-label='Milestone progress']`,
  milestoneMarkCompletedBtn: `//ul[@role='menu']//div[contains(., 'Mark as Complete')]`,
  milestoneTestRunsAssociated: `//span[contains(text(),'Test Runs Associated')]`,
  milestonePassedRatio: `//span[contains(text(),'Passed') and contains(text(),'/')]`,
  milestoneDetailDescription: `//div[contains(@class,'description') or contains(@class,'text')]//div[string-length(text()) > 10]`,

  // ============== PROGRESS DETAILS POPUP ==============
  progressPopupTestCasesCount: `//h2[text()='Test Cases']/following-sibling::*`,
  progressPopupFailedCount: `//span[text()='Failed']/preceding-sibling::span`,
  progressPopupPassedCount: `//span[text()='Passed']/preceding-sibling::span`,
  progressPopupFailedPercentage: `//span[text()='Failed']/parent::div/following-sibling::div`,
  progressPopupPassedPercentage: `//span[text()='Passed']/parent::div/following-sibling::div`,

  // ============== TEST RUN MILESTONE SELECTION ==============
  testRunMilestoneDropdown: `//button[.//span[contains(text(),'Set milestone')] or .//span[contains(text(),'Select Milestone')] or .//span[contains(text(),'Set Milestone')] or contains(.,'Set milestone') or contains(.,'Select milestone')]`,
  testRunMilestoneSearch: `//input[@placeholder='Search']`,

  // ============== MILESTONE DETAIL - TEST CASES/RUNS ==============
  milestoneTestRunTab: `//div[@role='tab'][contains(.,'Test Runs')]`,
  milestoneNoTestRuns: `//div[contains(text(),'0 Test Runs Associated')]`,
} as const;

/**
 * Dynamic locator functions
 */

/**
 * Returns locator for milestone name on detail page header
 */
export const milestoneDetailName = (milestoneName: string) =>
  `//span[contains(.,'Milestones/') and contains(.,'${milestoneName}')]`;

/**
 * Returns locator for milestone description on detail page
 */
export const milestoneDetailDescriptionText = (description: string) =>
  `//span[contains(text(),'${description}')]`;

/**
 * Returns locator for milestone tag on detail page
 */
export const milestoneDetailTag = (tagName: string) =>
  `//span[contains(text(),'${tagName}')]`;

/**
 * Returns locator for a specific milestone by name in the list
 */
export const milestoneInList = (milestoneName: string) =>
  `//span[contains(text(),'${milestoneName}')]`;

/**
 * Returns locator for a specific milestone link/button by name
 */
export const milestoneLink = (milestoneName: string) =>
  `//div[contains(@class,'cursor-pointer') and contains(text(),'${milestoneName}')]`;

/**
 * Returns locator for selecting a milestone from dropdown
 */
export const milestoneOption = (milestoneName: string) =>
  `//li[@title='${milestoneName}'] | //span[contains(text(),'${milestoneName}')]`;

/**
 * Returns locator for a tag in the milestone
 */
export const milestoneTag = (tagName: string) =>
  `//span[contains(text(),'${tagName}')]`;

/**
 * Returns locator for milestone progress with specific percentage
 */
export const milestoneProgressWithPercentage = (percentage: string) =>
  `//span[contains(.,'${percentage}% Complete')]`;

/**
 * Returns locator for breadcrumb milestone name
 */
export const breadcrumbMilestoneName = (milestoneName: string) =>
  `//span[text()='${milestoneName}']`;

/**
 * Returns locator for test runs associated count
 */
export const milestoneTestRunsCount = (count: string) =>
  `//span[contains(.,'${count} Test Runs Associated')]`;

/**
 * Returns locator for passed ratio in test run
 */
export const milestonePassedRatioValue = (passed: string, total: string) =>
  `//span[contains(.,'${passed} / ${total} Passed')]`;

/**
 * Returns locator for selecting a test run checkbox in milestone creation form
 */
export const milestoneTestRunCheckbox = (testRunName: string) =>
  `//h5[text()='${testRunName}']/ancestor::div[contains(@class,'flex')]//input[@type='checkbox']`;

/**
 * Returns locator for test run in milestone dropdown list
 */
export const milestoneTestRunItem = (testRunName: string) =>
  `//h5[text()='${testRunName}']`;

/**
 * Returns locator for selecting an owner from dropdown
 */
export const milestoneOwnerOption = (ownerName: string) =>
  `//li[contains(.,'${ownerName}')]`;

/**
 * Returns locator for date cell in date picker
 */
export const datePickerDay = (day: string) =>
  `//td[contains(@class,'cell')]//div[text()='${day}']`;

/**
 * Returns locator for milestone with specific due date text
 */
export const milestoneWithDueDate = (dueText: string) =>
  `//div[contains(text(),'${dueText}')]`;
