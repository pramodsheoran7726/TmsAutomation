/**
 * Locator file for Dataset page elements in Test Manager
 *
 * LOCATOR VERIFICATION STATUS:
 * ✅ VERIFIED: Discovered via Playwright MCP browser automation (2026-01-13)
 * ⚠️  PENDING: Based on TMS patterns, will be verified during test execution
 */

export const DatasetLocators = {
  // ============== NAVIGATION LOCATORS ✅ VERIFIED ==============
  datasetTab: `//*[@role='tab' and contains(.,'Datasets')]`,

  // ============== MAIN PAGE ELEMENTS ✅ VERIFIED ==============
  datasetSearchInput: `//input[@placeholder='Search Datasets']`,
  createDatasetBtn: `//button[contains(.,'Create') and contains(.,'Dataset')]`,

  // ============== EMPTY STATE LOCATORS ✅ VERIFIED ==============
  datasetEmptyStateText: `//*[contains(text(),'Create your first dataset')]`,
  datasetEmptyStateDescription: `//*[contains(text(),'Start by creating or importing datasets')]`,

  // ============== CREATE DATASET MODAL LOCATORS ✅ VERIFIED ==============
  datasetModalDialog: `//div[@role='dialog']`,
  datasetModalTitle: `//h2[normalize-space()='Create Dataset']`,
  datasetNameInput: `//input[@placeholder='Enter dataset name']`,
  datasetDescriptionInput: `//textarea[contains(@placeholder,'Add a description')]`,
  datasetCreateBtnModal: `//button[normalize-space()='Create']`,
  datasetCancelBtnModal: `//button[normalize-space()='Cancel']`,
  datasetCloseModalBtn: `//button[@aria-label='Close']`,

  // ============== VALIDATION ERROR LOCATORS ⚠️ PENDING ==============
  datasetNameError: `//*[contains(text(),'required') or contains(text(),'Required') or contains(text(),'name')]`,

  // ============== DATASET LIST LOCATORS ✅ VERIFIED ==============
  datasetNoResults: `//*[contains(text(),'No results') or contains(text(),'not found') or contains(text(),'No datasets')]`,

  // ============== DATASET EDITOR - ADD ROWS ✅ VERIFIED ==============
  datasetAddRowBtn: `//div[contains(@class,'border-t')]//button[contains(@class,'edit-icon')]`,
  datasetFirstCell: `(//div[@class='dsg-cell'])[1]`,
  datasetLastCell: `(//div[@class='dsg-cell'])[last()]`,
  datasetCellInput: `//input[@class='dsg-input']`,

  // ============== DATASET MENU OPTIONS ⚠️ PENDING ==============
  datasetMenuBtn: `//button[@aria-label='Open column options']`,
  datasetEditOption: `//div[normalize-space()='Edit Details']`,
  datasetDeleteOption: `//div[normalize-space()='Delete Dataset']`,

  // ============== DELETE CONFIRMATION DIALOG ⚠️ PENDING ==============
  datasetDeleteConfirmBtn: `//button[normalize-space()='Delete' or normalize-space()='Confirm' or contains(@class,'danger')]`,

  // ============== DATASET DETAIL PAGE ==============
  datasetSaveBtn: `//button[normalize-space()='Save']`,
  datasetTitleTextarea: `//textarea[@name='title']`,
  datasetBackBtn: `//span[text()='Datasets']`,

  // ============== DYNAMIC LOCATORS ==============
  datasetByName: (datasetName: string) => `//*[normalize-space(text())='${datasetName}'] | //a[normalize-space(text())='${datasetName}']`,
  datasetMenuByName: (datasetName: string) => `//a[normalize-space(text())='${datasetName}']//ancestor::tr//button[@aria-label='more']`,
} as const;
