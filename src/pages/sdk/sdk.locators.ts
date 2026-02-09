/**
 * Locators for SDK functionality in Test Manager
 */

export const SdkLocators = {
  sdkExpand: `//button[span[text()=' Expand details']]`,
  sdkCollapse: `//span[text()='Collapse details']`,
  sdkEndSession: `(//span[text()='End Session'])[3]`,
  sdkNextStepButton: `//button[@aria-label="Next"]`,
  sdkStep1: `//span[text()='1']`,
  sdkStep2: `//span[text()='2']`,
  sdkStep3: `//span[text()='3']`,
  sdkStep4: `//span[text()='4']`,
  sdkStep5: `//span[text()='5']`,
  recordMedia: `//span[text()='Recorded Media']`,
  tcStatusPassedSdk: `//span[text()='Passed']`,
  statusPassedSdk: `(//span[text()='Passed'])[2]`,
  tcStatusPassedBuildSummSdk: `//span[text()='Passed']`,
  markSdkStatus: `//span[text()='Mark Status']`,
  finishSdk: `//span[text()='Finish']`,
  tcNextCtaSdk: `//span[text()='Next']`,
  remarkSdk: `//textarea[@placeholder='Add any observation/remark for the test case execution.']`,
  projectTagSdk: `input[placeholder='Add Tags separated by enter']`,
  openMenuSdk: `//button[@aria-label="open-menu"]`,
  openExpandMenu: `(//button[@data-component='IconButton' and @aria-label='open-menu'])[last()]`,
  collapseToExpand: `//span[text()='Test Step Execution Summary']`,
  manualStep: `//div[@id='step-description']//div[contains(@class, 'reactjs-tiptap-editor')]`,
} as const;

/**
 * Dynamic locator functions
 */

/**
 * Returns locator for step display in SDK
 */
export const stepDisplayInSdk = (step: string) =>
  `//span[text()='${step}']`;

/**
 * Returns locator for step display in editor
 */
export const stepDisplayInEditor = (step: string) =>
  `(//div[text()='${step}'])[3]`;
