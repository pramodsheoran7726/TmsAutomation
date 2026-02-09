/**
 * Locators for Insights page in Test Manager
 */

export const InsightsLocators = {
  // Navigation
  insightsTab: `//a[@role='tab'][contains(.,'Insights')]`,
  insightPageNav: `//a[span[text()='Insights']]`,

  // Stat Card Values (dynamic)
  totalTestCasesValue: `//span[text()='Total Test Cases']/ancestor::div[contains(@class,'flex')]/div[2]/span`,
  manualTestCasesValue: `//span[text()='Manual Test Cases']/ancestor::div[contains(@class,'flex')]/div[2]/span`,
  automatedTestCasesValue: `//span[text()='Automated Test Cases']/ancestor::div[contains(@class,'flex')]/div[2]/span`,
  automationCoverageValue: `//span[text()='Automation Coverage']/ancestor::div[contains(@class,'flex')]/div[2]/span`,

  // Stat Card Labels
  totalTestCasesLabel: `//span[text()='Total Test Cases']`,
  manualTestCasesLabel: `//span[text()='Manual Test Cases']`,
  automatedTestCasesLabel: `//span[text()='Automated Test Cases']`,
  automationCoverageLabel: `//span[text()='Automation Coverage']`,

  // Chart Sections
  testRunSummaryChart: `//span[text()='Test Run Summary']`,
  testCaseSummaryChart: `//span[text()='Test Case Summary']`,
  testCaseTrendChart: `//span[text()='Test Case Trend']`,
  issuesTrendChart: `//span[text()='Issues Trend']`,

  // Date Range Filter
  startDateInput: `input[placeholder='Start date']`,
  endDateInput: `input[placeholder='End date']`,
  viewingLabel: `//div[text()='Viewing:']`,

  // Refresh Button
  refreshButton: `//button[@aria-label='Refresh']`,
  syncWidget: `//button[@aria-label='Refresh']`,
  dataRefreshInfo: `//div[contains(text(),'New data may take around')]`,

  // Chart Canvas (for hover interactions)
  testRunSummaryCanvas: `//span[text()='Test Run Summary']/ancestor::div[contains(@class,'w-1/2')]//canvas`,
  testCaseSummaryCanvas: `//span[text()='Test Case Summary']/ancestor::div[contains(@class,'w-1/2')]//canvas`,

  // G2 Tooltip Elements
  g2Tooltip: `.g2-tooltip`,
  g2TooltipLabel: `.g2-tooltip-list-item-name-label`,
  g2TooltipValue: `.g2-tooltip-list-item-value`,

  // Test Run Summary Status Tooltips
  testRunPassedTooltip: `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Passed']`,
  testRunFailedTooltip: `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Failed']`,
  testRunNotStartedTooltip: `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Not Started']`,
  testRunSkippedTooltip: `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Skipped']`,

  // Test Case Summary Type Tooltips
  testCaseTypeNATooltip: `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='NA']`,
  testCaseTypeFunctionalTooltip: `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Functional']`,
  testCaseTypeIntegrationTooltip: `//div[contains(@class,'g2-tooltip')]//span[contains(@class,'g2-tooltip-list-item-name-label') and text()='Integration']`,

  // Legacy static locators (for backward compatibility)
  insightPageAutomationCoverage: `//span[text()='50%']`,
  insightTotalTC: `//div[div[div[span[text()='Total Test Cases']]] and div[span[text()='2']]]`,
  insightManualTC: `//div[div[div[span[text()='Manual Test Cases']]] and div[span[text()='1']]]`,
  insightAutomationTC: `//div[div[div[span[text()='Automated Test Cases']]] and div[span[text()='1']]]`,
  insightAutomation50: `//div[div[div[span[text()='Automation Coverage']]] and div[span[text()='50%']]]`,

  // Dynamic locators for specific values
  insightStatValue: (label: string, value: string) =>
    `//div[div[div[span[text()='${label}']]] and div[span[text()='${value}']]]`,
} as const;
