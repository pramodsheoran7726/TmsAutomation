/**
 * Locators for Jira integration functionality in Test Manager
 */

export const JiraLocators = {
  connectJiraCta: `//span[text()='Connect Jira']`,
  issueNav: `//span[text()='Issues']`,
  closedJiraSidebar: `//button[@aria-label="Close Sidebar"]`,
  linkIssueButton: `//span[text()='Link Issue']`,
  linkFieldTms: `//input[@placeholder='Add Jira issue key or Issue URL']`,
  initialPromptChevron: `//span[text()='Initial prompt']//following-sibling::div//*[contains(@class, 'octicon-chevron-right')]`,
  todoJiraTitle: `//span[text()="This is To Do bug type"]`,
  todoJiraPriority: `//span[text()="Medium"]`,
  todoJiraProject: `//span[text()='LTQA Automation Tests']`,
  todoJiraId: `//span[text()="LAT-1"]`,
  todoJiraType: `//span[text()="Bug"]`,
  todoJiraStatus: `//span[text()="To Do"]`,
  todoJiraCreatedBy: `//span[contains(text(), 'Created')]`,
  singleUnlinkButton: `//span[@aria-label="Unlink Issue"]`,
  confirmationPopup: `//span[text()='Confirm']`,
  jiraAppNotStarted: `//span[text()='Not started']`,
  jiraAppUnlink: `//span[text()='Unlink']`,
  jiraAppLink: `//span[text()='Link Test Case']`,
  jiraAppSearch: `//input[@placeholder="Search test cases"]`,
  jiraAppLinkButton: `//button[@aria-label="Link Issue"]`,
  jiraAppIframeSearch: `(//iframe[@data-testid='hosted-resources-iframe'])[3]`,
  jiraIssueScrollPane: `//div[@data-testid='issue.views.issue-details.issue-layout.container-left']`,
  jiraAppIframe: `(//iframe[contains(@id, 'iFrameResizer')])[1]`,
  openSearchCloseJiraApp: `.octicon-x`,
  ltJiraUsernameField: `[placeholder="Enter username"]`,
  ltJiraAccessKeyField: `[placeholder="Enter Access Key"]`,
  ltJiraAuthenticateBtn: `//button[.='Authenticate']`,
  ltJiraAuthenticateMsg: `//div[contains(@class,'MuiAlert-message') and text()='Authenticated']`,
  ltJiraIframe: `[data-testid="hosted-resources-iframe"]`,
  automationLogs: `//div[@id="activeTimestamp-0"]`,
  automationMarkAsBug: `(//button[@aria-label="Mark as Bug"])[1]`,
  automationSelectProject: `//span[text()='Select Project']`,
  automationJiraProject: `//span[text()='LTQA Automation Tests']`,
  automationJiraSelectAssignee: `//span[text()='Select Assignee']`,
  automationJiraAssignee: `//span[text()='LTQA Integration']`,
  automationJiraSelectType: `//span[text()='Select Issue Type']`,
  automationJiraBugType: `//span[text()='Bug']`,
  automationCreateBug: `//span[text()='Create Issue']`,
  automationBugSummary: `//input[@id="summary"]`,
  jiraDetails: `//span[text()='This ticket is created from automation logs page']`,
  jiraDetailsApp: `//h1[text()='This ticket is created from automation logs page']`,
  executionNavJira: `//a[text()='Execution History']`,
} as const;

/**
 * Dynamic locator functions
 */

/**
 * Returns locator for Jira app test case
 */
export const jiraAppTestcase = (tc: string) =>
  `//div[div[div[div[div[div[button[span[text()='${tc}']]]]]]]]//button`;

/**
 * Returns locator for todo count
 */
export const todoCount = (count: string) =>
  `//span[text()='To-Do' and text()='${count}']`;

/**
 * Returns locator for Jira app status
 */
export const jiraAppStatus = (tc: string) =>
  `//div[button[span[text()='${tc}']] and span[span[@aria-label='Passed']]]`;
