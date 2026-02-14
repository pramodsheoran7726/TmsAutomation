import { CommonLocators as C } from '../common/common.locators.js';

/**
 * Locators for KaneAI functionality in Test Manager
 */

export const KaneaiLocators = {
  auteurSidebar: `(//a[@aria-label="KaneAI"])`,
  automateWithKaneai: `//div[@id='test-steps-container']//span[text()="Automate with KaneAI"]`,
  desktopBrowser: `//span[contains(text(),'Desktop Browser')]`,
  mobileAppButton: `//div[@id='test-steps-container']//a[contains(@class,'UnderlineNav__UnderlineNavLink')]//span[contains(text(),'Mobile App')]`,
  mobileAppLink: `//div[@id='test-steps-container']//nav[@id='uploaded-apps-list']//div[contains(@id, 'appcard-bundle') and text()='QATestApp.apk']`,
  startTestingMobileButton: `//div[@id='test-steps-container']//span[text()='Automate with KaneAI']//ancestor::nav[contains(@class,'EZDrawer__container h-full')]//span[text()='Start Testing']`,
  uploadAppButton: `#upload-app-file`,
  startTesting: `(//span[span[contains(text(),'Start Testing')]])[2]`,
  approve: `//span[contains(text(),'Approve')]`,
  websiteLaunched: `//span[contains(text(),'Open objective URL https://lambdatest.com')]`,
  appLaunched: `//div[text()="Tap the 'CLICK BUTTON' button on mobile app"]`,
  saveTestcaseAuthoring: `//span[contains(text(), 'Save Test Case')]`,
  code: `//span[contains(text(), 'Code')]`,
  viewDetailsCode: `//h5[contains(text(), 'View details')]`,
  initialPromptChevron: C.initialPromptChevron,
  initialPromptExpanded: `//span[text()='Initial prompt']//following-sibling::div//*[contains(@class, 'octicon-chevron-down')]`,
  testCasesButton: `//button[contains(.,'Create and Automate')]`,
  testCasesTabCount: `//span[contains(., 'Create and Automate')]//following-sibling::span[contains(@class, 'CounterLabel')]`,
  systemIdle: `//span[contains(text(),'System Idle')]`,
  saveButton: `//button[@aria-label='Save Test Case']`,
} as const;

/**
 * Dynamic locator functions
 */

/**
 * Returns locator for KaneAI Jira issue key (span next to Atlassian icon)
 */
export const kaneaiJiraIssueKey = () =>
  `//div[contains(@class, 'group')]//img[contains(@src, 'atlassian')]//following-sibling::span`;
