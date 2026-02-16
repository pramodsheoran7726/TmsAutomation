import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Milestone CRUD with TestRun Integration', {
  tag: ['@smoke', '@regression', '@critical-path'],
  annotation: [
    { type: 'feature', description: 'Milestone Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  // This test has 20+ steps (create project, test cases, milestone, test run, verify, edit, delete)
  // plus progress polling retries — needs generous timeout.
  test.setTimeout(420_000);

  /**
   * Full BDD Scenario: Milestone CRUD with TestRun integration
   *
   * Flow:
   * 1. Create project with title, tag, description
   * 2. Open project
   * 3. Create multiple test cases with steps
   * 4. Open Milestones tab
   * 5. Create milestone with name, description, and tag
   * 6. Verify milestone created successfully
   * 7. Verify milestone tag is visible
   * 8. Open Test Run creation form with details, create Test Run with configuration and assignee
   * 9. Select created milestone in Test Run
   * 10. Back to project list, open project
   * 11. Open Milestones tab, open created milestone
   * 12. Verify milestone details on detail page
   * 13. Verify milestone breadcrumb
   * 14. Verify milestone progress is zero percent
   * 15. Open TestRun List, verify testcases inside Test Run
   * 16. Mark status of testcases and test steps
   * 17. Back to project, open Milestones tab, open milestone
   * 18. Verify milestone progress after status update is "100" percent
   * 19. Verify test runs associated count is "1"
   * 20. Verify passed and failed count
   * 21. Edit milestone name and description
   * 22. Verify milestone name and description updated
   * 23. Delete milestone, verify deleted
   * 24. Delete project
   */
  test('should perform full milestone CRUD with TestRun integration', async ({
    projectOnly,
    projectPage,
    testCasePage,
    testRunPage,
    milestonePage,
  }) => {
    // Step 3: Create multiple test cases with steps
    await testCasePage.createTestCase();
    await testCasePage.openTestCase();
    await testCasePage.createManualStep('Step 1 description', 'Expected outcome 1');

    await projectPage.openProject();
    const secondTC = `AutoTC2_${Date.now()}`;
    await testCasePage.createTestCase(secondTC);
    await testCasePage.openTestCase(secondTC);
    await testCasePage.createManualStep('Step 2 description', 'Expected outcome 2');

    // Step 4: Open Milestones tab
    await projectPage.openProject();
    await milestonePage.openMilestonesTab();

    // Step 5: Create milestone with name, description, and tag
    await milestonePage.createMilestoneWithDetails();

    // Step 6: Verify milestone created successfully
    await milestonePage.verifyMilestoneCreatedSuccessfully();

    // Step 7: Verify milestone tag is visible
    await milestonePage.verifyMilestoneTagVisible();

    // Step 8: Create Test Run with test cases and configuration
    await testRunPage.createTestRunWithTestCases();

    // Step 9: Select created milestone in Test Run
    await milestonePage.selectCreatedMilestoneInTestRun();

    // Step 10: Back to project list, open project
    await projectPage.openProject();

    // Step 11: Open Milestones tab, open created milestone
    await milestonePage.openMilestonesTab();
    await milestonePage.openCreatedMilestone();

    // Step 12: Verify milestone details on detail page
    await milestonePage.verifyMilestoneDetailsOnDetailPage();

    // Step 13: Verify milestone breadcrumb
    await milestonePage.verifyMilestoneBreadcrumb();

    // Step 14: Verify milestone progress is zero percent
    await milestonePage.verifyMilestoneProgressIsZero();

    // Step 15: Open TestRun List, verify testcases inside Test Run
    await testRunPage.openTestRun();

    // Step 16: Mark status of testcases and test steps
    await testRunPage.markStatus('Passed');
    await testRunPage.markStatus('Failed');

    // Step 17: Back to project, open Milestones tab, open milestone
    await projectPage.openProject();
    await milestonePage.openMilestonesTab();
    await milestonePage.openCreatedMilestone();

    // Step 18: Verify milestone progress after status update is "100" percent
    await milestonePage.verifyProgressAfterStatusUpdate('100');

    // Step 19: Verify test runs associated count is "1"
    await milestonePage.verifyTestRunsAssociatedCount('1');

    // Step 20: Verify passed and failed count
    await milestonePage.verifyPassedAndFailedCount();

    // Step 21: Edit milestone name and description
    await milestonePage.editMilestoneNameAndDescription();

    // Step 22: Verify milestone name and description updated
    await milestonePage.verifyMilestoneUpdatedSuccessfully();

    // Step 23: Delete milestone, verify deleted
    await milestonePage.navigateBackToMilestonesList();
    await milestonePage.openUpdatedMilestone();
    await milestonePage.deleteMilestone();
    await milestonePage.verifyMilestoneDeletedSuccessfully();

  });
});
