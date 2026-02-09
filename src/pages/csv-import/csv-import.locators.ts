export const CsvImportLocators = {
  // Import navigation
  importNav: `//span[text()='Import']`,
  importCta: `//span[text()='Import Test Cases']`,
  importFromCsv: `//span[text()='Import from CSV']`,

  // File upload
  fileUploadInput: `input[type='file']`,
  browseCsv: `input[type='file']`,
  uploadFileButton: `//span[text()='Upload File']`,
  selectFileButton: `//span[text()='Select File']`,
  dragDropArea: `//div[contains(@class,'drag-drop-area')]`,
  verifyCsvUploaded: `//div[contains(@class,'csv-uploaded')]`,
  verifyBddCsvUploaded: `//div[contains(@class,'bdd-csv-uploaded')]`,

  // File preview
  filePreview: `//div[contains(@class,'file-preview')]`,
  fileName: `//span[contains(@class,'file-name')]`,
  fileSize: `//span[contains(@class,'file-size')]`,
  removeFile: `//button[@aria-label='Remove file']`,

  // CSV mapping
  csvMappingStep: `//div[contains(@class,'csv-mapping')]`,
  nextButton: `//span[text()='Next']`,
  nextButtonCsv: `//span[text()='Next']`,
  previousButton: `//span[text()='Previous']`,
  verifyTitleColumn: `//th[text()='Title']`,
  verifyTypeColumn: `//th[text()='Type']`,
  verifyStatusColumn: `//th[text()='Status']`,
  verifyPriorityColumn: `//th[text()='Priority']`,
  verifyDescriptionColumn: `//th[text()='Description']`,

  // Column mapping
  mapColumnsHeading: `//h5[text()='Map Columns']`,
  mapFieldsCsvPage: `//h5[text()='Map Columns']`,
  sourceColumn: `//span[text()='Source Column']`,
  targetField: `//span[text()='Target Field']`,
  verifyMapToColumn: `//th[text()='Map To']`,
  verifyFieldInCsvColumn: `//th[text()='Field in CSV']`,
  mappedValueCsvPage: `//div[contains(@class,'mapped-values')]`,

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
  previewCsv: `//span[text()='Preview Import']`,
  importTestCaseCta: `//span[text()='Import Test Cases']`,
  startImportButton: `//span[text()='Start Import']`,
  cancelImport: `//span[text()='Cancel']`,
  testcaseTitleImportingViaCsv: `//span[text()='Test Case Imported']`,

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
  importDate: `//th[text()='Date']`,
  importedBy: `//th[text()='Imported By']`,
  importStatus: `//th[text()='Status']`,
  importActions: `//th[text()='Actions']`,

  // Error handling
  errorMessage: `//div[contains(@class,'error-message')]`,
  errorDetails: `//div[contains(@class,'error-details')]`,
  closeError: `//button[@aria-label='Close error']`,

  // Sample template
  downloadSampleTemplate: `//span[text()='Download Sample Template']`,
  downloadSampleCsv: `//span[text()='Download Sample Template']`,
  viewSampleTemplate: `//span[text()='View Sample']`,

  // Dynamic locators
  csvRowByNumber: (row: number) => `//tr[@data-row='${row}']`,
  columnMappingDropdown: (column: string) => `//div[span[text()='${column}']]//button`,
  selectTargetField: (field: string) => `//span[text()='${field}']`,
  importHistoryRow: (date: string) => `//td[text()='${date}']`,
  validationError: (message: string) => `//div[text()='${message}']`,
  folderOption: (name: string) => `//span[text()='${name}']`,
} as const;
