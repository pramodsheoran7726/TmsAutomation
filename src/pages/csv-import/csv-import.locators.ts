import { CommonLocators as C } from '../common/common.locators.js';

export const CsvImportLocators = {
  // Import navigation
  importNav: `//span[text()='Import']`,
  importCta: `//span[text()='Import Test Cases']`,
  importFromCsv: `//span[text()='Import from CSV']`,

  // File upload
  fileUploadInput: C.fileInput,
  browseCsv: C.fileInput,
  uploadFileButton: `//span[text()='Upload File']`,
  selectFileButton: `//span[text()='Select File']`,
  dragDropArea: `//div[contains(@class,'drag-drop-area')]`,
  verifyCsvUploaded: `//button[normalize-space()='Replace']`,
  verifyBddCsvUploaded: `//button[normalize-space()='Replace']`,

  // File preview
  filePreview: `//div[contains(@class,'file-preview')]`,
  fileName: `//span[contains(@class,'file-name')]`,
  fileSize: `//span[contains(@class,'file-size')]`,
  removeFile: `//button[@aria-label='Remove file']`,

  // CSV mapping
  csvMappingStep: `//div[contains(@class,'csv-mapping')]`,
  nextButton: C.nextSpan,
  nextButtonCsv: C.nextSpan,
  previousButton: `//span[text()='Previous']`,
  verifyTitleColumn: `//th[normalize-space()='Title']`,
  verifyTypeColumn: `//th[normalize-space()='Type']`,
  verifyStatusColumn: `//th[normalize-space()='Status']`,
  verifyPriorityColumn: `//th[normalize-space()='Priority']`,
  verifyDescriptionColumn: `//th[normalize-space()='Description']`,

  // Column mapping
  mapColumnsHeading: `//*[text()='Map Fields']`,
  mapFieldsCsvPage: `//*[text()='Map Fields']`,
  sourceColumn: `//span[text()='Source Column']`,
  targetField: `//span[text()='Target Field']`,
  verifyMapToColumn: `//th[normalize-space()='Map to']`,
  verifyFieldInCsvColumn: `//th[normalize-space()='Field in CSV']`,
  mappedValueCsvPage: `//*[text()='Map Values']`,

  // Field mapping dropdowns
  titleFieldMapping: `//span[text()='Title']`,
  descriptionFieldMapping: `//span[text()='Description']`,
  typeFieldMapping: `//span[text()='Type']`,
  priorityFieldMapping: `//span[text()='Priority']`,
  statusFieldMapping: `//span[text()='Status']`,
  automationStatusFieldMapping: `//span[text()='Automation Status']`,
  tagsFieldMapping: `//span[text()='Tags']`,

  // Import settings
  importSettingsStep: `//div[contains(@class,'import-settings')]`,
  skipDuplicates: `//input[@type='checkbox' and @aria-label='Skip duplicates']`,
  updateExisting: `//input[@type='checkbox' and @aria-label='Update existing']`,
  createNewFolder: `//input[@type='checkbox' and @aria-label='Create in new folder']`,

  // Folder selection
  selectFolderDropdown: `//span[text()='Select Folder']`,
  createFolderOption: `//span[text()='Create New Folder']`,
  folderNameInput: `input[placeholder='Enter folder name']`,

  // Import validation
  validationStep: `//div[contains(@class,'validation-step')]`,
  validationErrors: `//div[contains(@class,'validation-errors')]`,
  validationWarnings: `//div[contains(@class,'validation-warnings')]`,
  validRowsCount: `//span[contains(@class,'valid-rows')]`,
  invalidRowsCount: `//span[contains(@class,'invalid-rows')]`,

  // Import execution
  importButton: `//span[text()='Import']`,
  previewCsv: `//*[text()='Preview Import']`,
  importTestCaseCta: `//span[text()='Import Test Cases']`,
  startImportButton: `//span[text()='Start Import']`,
  cancelImport: C.cancelSpan,
  testcaseTitleImportingViaCsv: `//span[text()='Verify phone number update']`,

  // Import progress
  importProgressBar: `//div[contains(@class,'progress-bar')]`,
  progressPercentage: `//span[contains(@class,'progress-percentage')]`,
  importingMessage: `//span[text()='Importing test cases...']`,

  // Import results
  importComplete: `//span[text()='Import Complete']`,
  importSuccess: `//div[contains(@class,'import-success')]`,
  successCount: `//span[contains(@class,'success-count')]`,
  failureCount: `//span[contains(@class,'failure-count')]`,
  viewImportedTestCases: `//span[text()='View Imported Test Cases']`,
  downloadErrorReport: `//span[text()='Download Error Report']`,

  // Import history
  importHistoryNav: `//span[text()='Import History']`,
  importHistoryTable: `//table[contains(@class,'import-history')]`,
  importDate: `//th[normalize-space()='Date']`,
  importedBy: `//th[normalize-space()='Imported By']`,
  importStatus: `//th[normalize-space()='Status']`,
  importActions: `//th[normalize-space()='Actions']`,

  // Error handling
  errorMessage: `//div[contains(@class,'error-message')]`,
  errorDetails: `//div[contains(@class,'error-details')]`,
  closeError: `//button[@aria-label='Close error']`,

  // Sample template
  downloadSampleTemplate: `//span[text()='Sample CSV']`,
  downloadSampleCsv: `//span[text()='Sample CSV']`,
  viewSampleTemplate: `//span[text()='View Sample']`,

  // Dynamic locators
  csvRowByNumber: (row: number) => `//tr[@data-row='${row}']`,
  columnMappingDropdown: (column: string) => `//div[span[text()='${column}']]//button`,
  selectTargetField: (field: string) => `//span[text()='${field}']`,
  importHistoryRow: (date: string) => `//td[text()='${date}']`,
  validationError: (message: string) => `//div[text()='${message}']`,
  folderOption: (name: string) => `//span[text()='${name}']`,
} as const;
