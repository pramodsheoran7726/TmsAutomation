import { CommonLocators as C } from '../common/common.locators.js';

/**
 * Locators for Module functionality in Test Manager
 */

export const ModuleLocators = {
  createModule: `//span[text()="Create a Module"]`,
  moduleNameInputField: `//input[@placeholder="Enter module name"]`,
  moduleText: `//h5[span[text()="Modules"]]`,
  moduleDescription: `//textarea[@placeholder="Describe the purpose of this module (optional)."]`,
  moduleTag: `//input[@placeholder="Add Tags separated by enter"]`,
  moduleStepButton: `//div[@role='button' and contains(., 'Enter the test step details')]`,
  moduleStepSteps: `.sun-editor-editable[contenteditable="true"]`,
  moduleStepStepsCancel: C.cancelSpan,
  moduleAddStep: `//span[text()="Add"]`,
  createNewModule: `//span[text()="Create new module"]`,
  moduleVersion: `//button[contains(@class, "lt-select-anchor")]//span[normalize-space(text())="Version:"]/following-sibling::span`,
  moreActions: `//button[@aria-label="Open column options"]`,
  editModuleName: `//div[@role='button' and @aria-label='Edit Module Name']`,
  addModule: `//span[text()="Add Module"]`,
  createAModule: `//span[text()="Create Module"]`,
  insertModule: `//div[@id='module-insert-cta']//button`,
  generateWithAi: `//button[span[text()="Generate with AI"]]`,
  testCaseLimitButton: `#test-case-limit-button`,
  testCaseLimitInputBox: `(//div[@id='slider-test-case-limit']//input[@role='spinbutton'])[2]`,
  generateWithAiInputBox: `//textarea[@name='message']`,
  createAndAutomate: `//span[text()="Create and automate"]`,
  verifyScenarios: `//button[.//span[contains(normalize-space(.),'Create') and contains(normalize-space(.),'test cases')]]`,
  submitGenerateWithAi: `//div[@id='omnibox-input-toolbar']//button[@type = 'submit']`,

  // ─── Link Projects Modal ─────────────────────────
  linkProjectsButton: `//button[.//span[text()='Link Projects']]`,
  linkProjectsSearch: `//input[@placeholder='Search projects...']`,
  linkProjectsSelectAll: `//h5[text()='Select All']`,
  linkProjectsSaveChanges: `//button[normalize-space()='Save changes']`,
} as const;

/**
 * Dynamic locator functions
 */

/**
 * Returns locator for module name
 */
export const moduleName = (name: string) =>
  `//div[@role='button' and @aria-label='Edit Module Name']//h5[normalize-space(text())='${name}']`;

/**
 * Returns locator for a project checkbox in Link Projects modal
 */
export const linkProjectCheckbox = (projectName: string) =>
  `//h5[text()='${projectName}']/parent::div`;

