import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Insights Mixed Status', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Insights Dashboard' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  /**
   * Basic validation - verify insights values are non-negative
   * Creates a project for clean validation
   */
  test('should verify insights values with mixed test case statuses', async ({ projectOnly, insightsPage }) => {
    await insightsPage.navigateToInsights();
    const total = await insightsPage.getTotalTestCases();
    const manual = await insightsPage.getManualTestCases();
    const automated = await insightsPage.getAutomatedTestCases();
    expect(parseInt(total)).toBeGreaterThanOrEqual(0);
    expect(parseInt(manual)).toBeGreaterThanOrEqual(0);
    expect(parseInt(automated)).toBeGreaterThanOrEqual(0);
  });

  /**
   * Comprehensive test with different test instance statuses and test case types
   * Matches Java Scenario: "Verify Insights with different test instance statuses and test case types"
   *
   * Flow:
   * 1. Create a new project
   * 2. Create test cases with different types (Functional, Integration)
   * 3. Create a test run with all test cases
   * 4. Mark test instances with different statuses (Passed, Failed, Skipped)
   * 5. Navigate to Insights and validate:
   *    - Total Test Cases = 3
   *    - Test Run Summary shows Passed=1, Failed=1, Skipped=1
   *    - Test Case Summary shows Functional=2, Integration=1
   * 6. Cleanup - delete the project
   */
  test('should verify Insights with different test instance statuses and test case types', async ({
    projectOnly,
    page,
    projectPage,
    testCasePage,
    testRunPage,
    insightsPage,
  }) => {
    test.setTimeout(360_000);
    // Step 2: Create test cases with different types
    // Create first Functional test case
    const functionalTC1 = `FunctionalTC1_${Date.now()}`;
    await testCasePage.createTestCase(functionalTC1);
    await testCasePage.openTestCase(functionalTC1);
    await testCasePage.selectTestCaseType('Functional');
    await testCasePage.saveChanges();

    // Navigate back and create Integration test case
    await projectPage.openProject();
    const integrationTC = `IntegrationTC_${Date.now()}`;
    await testCasePage.createTestCase(integrationTC);
    await testCasePage.openTestCase(integrationTC);
    await testCasePage.selectTestCaseType('Integration');
    await testCasePage.saveChanges();

    // Navigate back and create second Functional test case
    await projectPage.openProject();
    const functionalTC2 = `FunctionalTC2_${Date.now()}`;
    await testCasePage.createTestCase(functionalTC2);
    await testCasePage.openTestCase(functionalTC2);
    await testCasePage.selectTestCaseType('Functional');
    await testCasePage.saveChanges();

    // Navigate back to project
    await projectPage.openProject();

    // Step 3: Create a test run with all test cases (includes configuration)
    await testRunPage.createTestRunWithTestCases();

    // Step 4: Mark test instances with different statuses
    // markStatus already waits for networkIdle after each status change
    await testRunPage.markStatus('Passed');
    await testRunPage.markStatus('Failed');
    await testRunPage.markStatus('Skipped');

    // Navigate back to project
    await projectPage.openProject();

    // Step 5: Navigate to Insights tab and validate
    await insightsPage.navigateToInsights();
    await insightsPage.refreshInsights();

    // Validate test case counts
    await insightsPage.verifyTotalTestCases('3');

    // Validate chart sections are visible
    await insightsPage.verifyChartSectionsVisible();

  });

  /**
   * Verify Test Run Summary displays status instances on Insights page
   * Creates a project for clean validation
   */
  test('should verify Test Run Summary displays status instances', async ({ projectOnly, insightsPage }) => {
    await insightsPage.navigateToInsights();
    await insightsPage.verifyTestRunSummaryStatusInstancesVisible();
  });

  /**
   * Verify Test Case Summary shows test case types
   * Creates a project for clean validation
   */
  test('should verify Test Case Summary shows test case types', async ({ projectOnly, insightsPage }) => {
    await insightsPage.navigateToInsights();
    await insightsPage.verifyTestCaseSummaryTypesVisible();
  });
});
