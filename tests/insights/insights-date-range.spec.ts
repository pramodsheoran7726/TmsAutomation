import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { today, daysAgo, yesterday } from '../../src/utils/date.helper.js';

test.describe('Insights - Date Range Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Insights Dashboard' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  /**
   * Verify Insights date range filter is visible and functional
   * Matches Java pattern for Insights date range validation
   */
  test('should verify Insights date range filter elements are visible', async ({
    projectWithTestCase,
    projectPage,
    testRunPage,
    insightsPage,
  }) => {
    await testRunPage.createTestRun();
    await projectPage.openProject();
    await insightsPage.navigateToInsights();
    await insightsPage.verifyDateRangeFilterVisible();
    await insightsPage.verifyRefreshButtonVisible();
  });

  /**
   * Verify Insights data updates with custom date range
   */
  test('should verify Insights data with custom date range', async ({
    projectWithTestCase,
    projectPage,
    testRunPage,
    insightsPage,
  }) => {
    test.setTimeout(300_000);
    await testRunPage.createTestRun();
    await projectPage.backToProjectList();
    await projectPage.openProject();
    await insightsPage.navigateToInsights();
    await insightsPage.setDateRange(daysAgo(30), today());
    await insightsPage.refreshInsights();
    await insightsPage.verifyInsightsLabelsVisible();
    await insightsPage.verifyChartSectionsVisible();
  });

  /**
   * Verify Insights data refresh after clicking refresh button
   */
  test('should verify Insights refresh button functionality', async ({
    projectWithTestCase,
    projectPage,
    testRunPage,
    insightsPage,
  }) => {
    await testRunPage.createTestRun();
    await projectPage.backToProjectList();
    await projectPage.openProject();
    await insightsPage.navigateToInsights();
    await insightsPage.refreshInsights();
    await insightsPage.verifyInsightsLabelsVisible();
    await insightsPage.verifyChartSectionsVisible();
  });

  /**
   * Complete Insights validation with date range filter
   * Creates test data, validates metrics, and verifies date range functionality
   */
  test('should validate complete Insights flow with date range', async ({
    projectOnly,
    projectPage,
    testCasePage,
    testRunPage,
    insightsPage,
  }) => {
    test.setTimeout(300_000);
    // Create test cases - Manual and Automated
    const manualTC = `ManualTC_DateRange_${Date.now()}`;
    await testCasePage.createTestCase(manualTC);

    const automatedTC = `AutomatedTC_DateRange_${Date.now()}`;
    await testCasePage.createTestCase(automatedTC);
    await testCasePage.openTestCase(automatedTC);
    await testCasePage.selectAutomationStatus();
    await testCasePage.saveChanges();

    await projectPage.openProject();

    // Create a test run with all test cases (includes configuration)
    await testRunPage.createTestRunWithTestCases();

    await projectPage.openProject();

    // Navigate to Insights tab
    await insightsPage.navigateToInsights();

    // Set date range to include today's data
    await insightsPage.setDateRange(yesterday(), today());
    await insightsPage.refreshInsights();

    // Validate metrics with polling
    await insightsPage.verifyInsightsMetrics({
      totalTestCases: '2',
      manualTestCases: '1',
      automatedTestCases: '1',
      automationCoverage: '50%',
    });

    // Validate all chart sections
    await insightsPage.verifyAllChartSectionsVisible();

  });
});
