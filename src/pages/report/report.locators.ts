/**
 * Locators for Test Manager Reports functionality
 * Includes Detailed Execution History and Traceability Reports
 */

export const ReportLocators = {
  // ============== NAVIGATION ==============
  reportsTab: `//span[text()='Reports']`,
  reportsTabActive: `//div[@role='tab' and @aria-selected='true']//div[text()='Reports']`,
  testCasesTab: `//div[contains(@role,'tab') and .//div[text()='Test Cases']]`,
  testRunsTab: `//div[contains(@role,'tab') and .//div[text()='Test Runs']]`,

  // ============== REPORTS LIST PAGE (WITH EXISTING REPORTS) ==============
  reportsGeneratedHeader: `//span[text()='Reports Generated']`,
  generateNewReportBtn: `//button[normalize-space()='Generate New Report']`,
  searchReportInput: `//input[@placeholder='Search report here']`,
  reportTypeFilter: `//button[contains(text(),'Report Type:')]`,
  reportTypeAll: `//button[contains(text(),'Report Type: All')]`,

  // ============== REPORTS EMPTY STATE (NO REPORTS) ==============
  reportTemplatesHeader: `//span[text()='Report Templates']`,
  detailedExecutionHistoryTemplate: `//span[contains(.,'Detailed Execution History')]`,
  traceabilityReportTemplate: `//span[contains(.,'Traceability Report')]`,

  // ============== REPORT TYPE SELECTION DIALOG ==============
  generateReportDialog: `//div[@role='dialog']//h1[text()='Generate Report']`,
  detailedExecutionHistoryOption: `//button[contains(text(),'Detailed Execution History')]`,
  traceabilityReportOption: `//button[contains(text(),'Traceability Report')]`,
  dialogCancelBtn: `//div[@role='dialog']//button[normalize-space()='Cancel']`,
  dialogContinueBtn: `//div[@role='dialog']//button[normalize-space()='Continue']`,
  dialogCloseBtn: `//div[@role='dialog']//button[@aria-label='Close' or contains(@class,'close')]`,

  // ============== REPORT GENERATION DRAWER ==============
  reportDrawerHeader: `//div[contains(text(),'Generate Report: Detailed Execution History')]`,
  reportNameInput: `//input[@name='title']`,
  reportDescriptionInput: `//textarea[@placeholder='Add Description (Optional)']`,
  goBackBtn: `//button[@aria-label='Go back' or contains(.,'Go back')]`,
  closeDrawerBtn: `//button[@aria-label='Close drawer' or contains(.,'Close drawer')]`,
  stepIndicator: `//div[contains(text(),'Step')]`,
  step1Of2: `//div[contains(text(),'Step 1 of 2')]`,
  step2Of2: `//div[contains(text(),'Step 2 of 2')]`,
  continueBtn: `//button[normalize-space()='Continue']`,
  continueBtnDisabled: `//button[@disabled and normalize-space()='Continue']`,
  generateBtn: `//button[normalize-space()='Generate Report']`,
  saveBtn: `//button[normalize-space()='Save']`,

  // ============== PRIMARY FILTERS ==============
  primaryFiltersLabel: `//text()[contains(.,'Primary Filters')]/..`,
  dateRangeRadio: `//div[@class='ant-picker-input']//input`,
  dateRangeFilterBtn: `//*[@id="__primerPortalRoot__"]/div/div/div/div[2]/div/div/div[1]/div/div[3]/div[1]`,
  testRunsRadio: `//button[contains(text(),'Test Runs')]//input[@type='radio']`,
  testRunsFilterBtn: `//div[contains(@class, 'LTDrawer')]// span[contains(text(),'Test Runs')]`,

  // ============== DATE RANGE PICKER ==============
  startDateInput: `//input[@placeholder='Start date' or contains(@aria-label,'Start date')]`,
  endDateInput: `//input[@placeholder='End date' or contains(@aria-label,'End date')]`,
  lastDays: `//li[text()='{{days}}']`,

  // ============== TEST RUNS SELECTION ==============
  searchTestRunsInput: `//input[@placeholder='Search test runs']`,
  testRunsCount: `//div[contains(text(),'Test Runs')]`,
  testRunStatusFilter: `//button[normalize-space()='Status']`,
  testRunCreatorFilter: `//button[normalize-space()='Creator']`,
  selectAllTestRuns: `//div[contains(.,'Test Runs')]//input[@type='checkbox']`,

  // ============== ADDITIONAL FILTERS (TEST CASES) ==============
  testCasesFilterCheckbox: `//button[contains(text(),'Test Cases')]//input[@type='checkbox']`,
  testCasesFilterBtn: `//div[@class='flex flex-col h-screen']//span[contains(text(),'Test Cases')]`,
  addFilterBtn: `//span[contains(text(),'Add a filter')]`,
  noFiltersAdded: `//div[contains(text(),'No Filters Added')]`,
  filtersAddedCount: `//div[contains(text(),'Filters Added')]`,

  // ============== FILTER OPTIONS DROPDOWN ==============
  filterPriority: `//li[contains(.,'Priority')]`,
  filterStatus: `//li[contains(.,'Status') and not(contains(.,'Automation'))]`,
  filterAutomationStatus: `//li[contains(.,'Automation Status')]`,
  filterType: `//li[contains(.,'Type')]`,
  filterTags: `//li[contains(.,'Tags')]`,
  filterLinkedIssues: `//li[contains(.,'Linked Issues')]`,
  filterFolder: `//li[contains(.,'Folder')]`,
  filterCreatedBy: `//li[contains(.,'Created By')]`,
  selectPriorityBtn: `//button[contains(.,'Select priority')]`,

  // ============== STATUS FILTER VALUES ==============
  selectStatusBtn: `//button[contains(.,'Select status')]`,

  // ============== AUTOMATION STATUS FILTER VALUES ==============
  selectAutomationStatusBtn: `//button[contains(.,'Select automation status')]`,

  // ============== TYPE FILTER VALUES ==============
  selectTypeBtn: `//button[contains(.,'Select type')]`,

  // ============== TAGS FILTER ==============
  selectTagsBtn: `//button[contains(.,'Select tags')]`,
  tagsSearchInput: `//input[@placeholder='Search...']`,

  // ============== LINKED ISSUES FILTER ==============
  selectLinkedIssuesBtn: `//button[contains(.,'Select linked issues')]`,
  linkedIssuesSearchInput: `//input[@placeholder='Search...']`,

  // ============== CREATED BY FILTER ==============
  selectCreatedByBtn: `//button[contains(.,'Select created by')]`,
  createdBySearchInput: `//input[@placeholder='Search...']`,

  // ============== FOLDER FILTER ==============
  selectFolderBtn: `//button[contains(.,'Select folders')]`,
  selectFolderButton: `//button[contains(.,'Select Folders')]`,
  folderLoader: `//*[contains(@class,'Spinner__StyledSpinner')]`,

  // ============== STEP 2 - RECURRING REPORT SETTINGS ==============
  recurringReportToggle: `//button[contains(@class,'toggle') or @role='switch']`,
  recurringReportLabel: `//div[text()='Recurring Report']`,
  frequencyDailyRadio: `//input[@type='radio' and following-sibling::*[contains(.,'Daily')]]`,
  frequencyWeeklyRadio: `//input[@type='radio' and following-sibling::*[contains(.,'Weekly')]]`,
  frequencyMonthlyRadio: `//input[@type='radio' and following-sibling::*[contains(.,'Monthly')]]`,
  frequencyDailyLabel: `//div[text()='Daily']`,
  frequencyWeeklyLabel: `//div[text()='Weekly']`,
  frequencyMonthlyLabel: `//div[text()='Monthly']`,
  emailsInput: `//div[contains(text(),'Emails')]/following-sibling::*//input | //input[@placeholder='Enter email']`,
  goBackStep2Btn: `//button[normalize-space()='Go Back']`,
  generateReportBtn: `//button[normalize-space()='Generate Report']`,

  // ============== REPORT LOADING & POLLING ==============
  reportLoadingIndicator: `//div[contains(text(),'Loading Report')]`,
  reportLoadingMessage: `//div[contains(text(),'Please hold on')]`,

  // ============== REPORT DETAIL PAGE ==============
  reportDetailTable: `//table`,
  reportDetailTableRows: `//table//tbody//tr`,
  reportDetailHeader: `//div[contains(text(),'Execution Report')]`,
  reportExportCsvBtn: `//button[contains(.,'Export Report as CSV')]`,
  reportDataRefreshInfo: `//div[contains(text(),'New data may take around')]`,
  reportNoDataAvailable: `//*[contains(text(),'No Data available') or contains(text(),'No data available') or contains(text(),'No Data Available')]`,

  // ============== REPORT MENU ==============
  reportItemMenu: `//button[@aria-label='Open Menu, Press Enter to view']`,
  reportDeleteOption: `//span[text()='Delete']`,

  // ============== TOAST MESSAGES ==============
  reportCreatedToast: `//*[contains(text(),'Report created') or contains(text(),'successfully')]`,
} as const;

/**
 * Dynamic locator functions
 */

/**
 * Returns locator for selecting specific test run
 */
export const selectTestRun = (testRunName: string) =>
  `//div[@class='w-full']//span[contains(text(),'${testRunName}')]//ancestor::div[@class='flex flex-col']//input`;

/**
 * Returns locator for test run row
 */
export const testRunRow = (testRunName: string) =>
  `//div[contains(@class,'cursor-pointer') and contains(.,'${testRunName}')]`;

/**
 * Returns locator for priority selection
 */
export const selectPriority = (priority: string) =>
  `//li[contains(.,'${priority}')]`;

/**
 * Returns locator for report by name
 */
export const reportByName = (reportName: string) =>
  `//span[normalize-space()='${reportName}']`;

/**
 * Returns locator for report type badge
 */
export const reportTypeBadge = (reportType: string) =>
  `//div[@role='tooltip' and text()='${reportType}']`;

/**
 * Returns locator for status selection
 */
export const selectStatus = (status: string) =>
  `//li[contains(.,'${status}')]`;

/**
 * Returns locator for automation status selection
 */
export const selectAutomationStatus = (automationStatus: string) =>
  `//li[contains(.,'${automationStatus}')]`;

/**
 * Returns locator for type selection
 */
export const selectType = (type: string) =>
  `//li[contains(.,'${type}')]`;

/**
 * Returns locator for tag selection
 */
export const selectTag = (tagName: string) =>
  `//li[contains(.,'${tagName}')]`;

/**
 * Returns locator for linked issue selection
 */
export const selectLinkedIssue = (issueName: string) =>
  `//li[contains(.,'${issueName}')]`;

/**
 * Returns locator for created by selection
 */
export const selectCreatedBy = (userName: string) =>
  `//li[contains(.,'${userName}')]`;

/**
 * Returns locator for folder selection
 */
export const selectFolder = (folderName: string) =>
  `//span[contains(text(),'${folderName}')]//ancestor::span[@class='ant-tree-title']//div[@role='button']`;

/**
 * Returns locator for report detail page by name
 */
export const reportDetailByName = (reportName: string) =>
  `//div[text()='${reportName}']`;
