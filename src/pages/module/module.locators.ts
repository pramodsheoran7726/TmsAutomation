/**
 * Locators for Module functionality in Test Manager
 */

export const ModuleLocators = {
  createModule: `//span[text()="Create a Module"]`,
  moduleNameInputField: `//input[@placeholder="Enter module name"]`,
  moduleText: `//h5[span[text()="Modules"]]`,
  moduleDescription: `//textarea[@placeholder="Describe the purpose of this module (optional)."]`,
  moduleTag: `//input[@placeholder="Add Tags separated by enter"]`,
  moduleStepSteps: `//span[text() = 'Enter the test step details']/following-sibling::div[1]`,
  moduleStepStepsCancel: `//span[text()="Cancel"]`,
  moduleAddStep: `//span[text()="Add"]`,
  createNewModule: `//span[text()="Create new module"]`,
  addStep: `//span[text()="Add Step"]`,
  moduleVersion: `//button[contains(@class, "lt-select-anchor")]//span[normalize-space(text())="Version:"]/following-sibling::span`,
  moreActions: `//button[@aria-label="More actions"]`,
  addModule: `//span[text()="Add Module"]`,
  createAModule: `//span[text()="Create Module"]`,
  insertModule: `//span[text()="Insert a module"]`,
  generateWithAi: `//button[span[text()="Generate with AI"]]`,
  testCaseLimitButton: `#test-case-limit-button`,
  testCaseLimitInputBox: `(//div[@id='slider-test-case-limit']//input[@role='spinbutton'])[2]`,
  generateWithAiInputBox: `//textarea[@name='message']`,
  createAndAutomate: `//span[text()="Create and automate"]`,
  verifyScenarios: `//button[.//span[contains(normalize-space(.),'Create') and contains(normalize-space(.),'test cases')]]`,
  submitGenerateWithAi: `//div[@id='omnibox-input-toolbar']//button[@type = 'submit']`,
} as const;

/**
 * Dynamic locator functions
 */

/**
 * Returns locator for module name
 */
export const moduleName = (name: string) =>
  `//div[@role='button' and @aria-label='Edit Module Name']//h5[normalize-space(text())='${name}']`;

