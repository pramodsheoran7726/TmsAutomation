import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { RETRY } from '../../src/config/constants.js';

test.describe('Insights Validation', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Insights Dashboard' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test.describe.configure({ retries: RETRY.insightsRetries });

  /**
   * Basic validation - verify Insights page elements are visible
   * Creates a project for clean validation
   */
  test('should display insights labels and charts', async ({ page, projectPage, insightsPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await insightsPage.navigateToInsights();
    await insightsPage.verifyInsightsLabelsVisible();
    await insightsPage.verifyChartSectionsVisible();
    // Cleanup
    await projectPage.deleteProject();
  });

  /**
   * Comprehensive Insights Dashboard validation after creating test data
   * Matches Java Scenario: "Verify Insights Dashboard metrics after creating test data"
   *
   * Flow:
   * 1. Create a new project
   * 2. Create 1 Manual test case + 1 Automated test case
   * 3. Create a test run with the test cases
   * 4. Navigate to Insights tab
   * 5. Validate: Total=2, Manual=1, Automated=1, Coverage=50%
   * 6. Validate charts visibility
   * 7. Cleanup - delete the project
   */
  test('should verify Insights Dashboard metrics after creating test data', async ({
    page,
    projectPage,
    testCasePage,
    testRunPage,
    insightsPage,
  }) => {
    // Step 1: Create a new project
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();

    // Step 2: Create a Manual test case (Not Automated)
    const manualTCTitle = `ManualTC_${Date.now()}`;
    await testCasePage.createTestCase(manualTCTitle);
    await testCasePage.openTestCase(manualTCTitle);
    // Leave automation status as default (Not Automated)
    await testCasePage.saveChanges();

    // Navigate back to project
    await projectPage.openProject();

    // Step 3: Create an Automated test case
    const automatedTCTitle = `AutomatedTC_${Date.now()}`;
    await testCasePage.createTestCase(automatedTCTitle);
    await testCasePage.openTestCase(automatedTCTitle);
    await testCasePage.selectAutomationStatus(); // Sets to Automated
    await testCasePage.saveChanges();

    // Navigate back to project
    await projectPage.openProject();

    // Step 4: Create a test run with test cases
    await testRunPage.createTestRun();
    await testRunPage.addTestCases(2);

    // Navigate back to project
    await projectPage.openProject();

    // Step 5: Navigate to Insights tab
    await insightsPage.navigateToInsights();
    await insightsPage.refreshInsights();

    // Step 6: Validate all metrics with polling (data may take time to sync)
    await insightsPage.verifyInsightsMetrics({
      totalTestCases: '2',
      manualTestCases: '1',
      automatedTestCases: '1',
      automationCoverage: '50%',
    });

    // Step 7: Validate chart sections are visible
    await insightsPage.verifyAllChartSectionsVisible();

    // Step 8: Validate date range filter and refresh button visibility
    await insightsPage.verifyDateRangeFilterVisible();
    await insightsPage.verifyRefreshButtonVisible();

    // Step 9: Cleanup - Delete the project
    await projectPage.deleteProject();
  });

  /**
   * Verify Insights page header elements
   * Creates a project for clean validation
   */
  test('should verify Insights page header elements', async ({ page, projectPage, insightsPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await insightsPage.navigateToInsights();
    await insightsPage.verifyInsightsLabelsVisible();
    await insightsPage.verifyDateRangeFilterVisible();
    await insightsPage.verifyRefreshButtonVisible();
    // Cleanup
    await projectPage.deleteProject();
  });

  /**
   * Verify all stat cards are visible on Insights page
   * Creates a project for clean validation
   */
  test('should verify all stat cards are visible', async ({ page, projectPage, insightsPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await insightsPage.navigateToInsights();
    await insightsPage.verifyInsightsLabelsVisible();
    // Cleanup
    await projectPage.deleteProject();
  });

  /**
   * Verify all chart sections are visible on Insights page
   * Creates a project for clean validation
   */
  test('should verify all chart sections are visible', async ({ page, projectPage, insightsPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await insightsPage.navigateToInsights();
    await insightsPage.verifyAllChartSectionsVisible();
    // Cleanup
    await projectPage.deleteProject();
  });
});
