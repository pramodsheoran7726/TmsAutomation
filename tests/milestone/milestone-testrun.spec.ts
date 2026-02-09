import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Milestone with TestRun from Creation and Due Date', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Milestone Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  /**
   * Full BDD Scenario: TestRun from Creation + Due Date
   *
   * Flow:
   * 1. Create project, open project, create test cases
   * 2. Open Test Run creation form, create Test Run with config and assignee
   * 3. Back to project, open Milestones tab
   * 4. Create milestone with end date "15"
   * 5. Verify created, verify due date displayed
   * 6. Open milestone, add test run to milestone via edit
   * 7. Open milestone, verify test runs associated count "1"
   * 8. Verify progress is zero
   * 9. Open TestRun List, verify testcases, mark status
   * 10. Back to project, open Milestones tab, open milestone
   * 11. Verify progress after status update is "100" percent
   * 12. Verify passed and failed count
   * 13. Delete milestone, verify deleted
   * 14. Delete project
   */
  test('should create milestone with due date and associate test run via edit', async ({
    projectPage,
    testCasePage,
    testRunPage,
    milestonePage,
  }) => {
    // Step 1: Create project, open project, create test cases
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();

    // Step 2: Open Test Run creation form, create Test Run with config and assignee
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();
    await testRunPage.selectConfiguration('default');
    await testRunPage.selectAssignee('');

    // Step 3: Back to project, open Milestones tab
    await projectPage.openProject();
    await milestonePage.openMilestonesTab();

    // Step 4: Create milestone with end date "15"
    await milestonePage.createMilestoneWithEndDate('15');

    // Step 5: Verify created, verify due date displayed
    await milestonePage.verifyMilestoneCreatedSuccessfully();
    await milestonePage.verifyMilestoneDueDateDisplayed();

    // Step 6: Open milestone, add test run to milestone via edit
    await milestonePage.openCreatedMilestone();
    await milestonePage.addTestRunToMilestoneViaEdit(testRunPage.testRunName);

    // Step 7: Open milestone, verify test runs associated count "1"
    await milestonePage.navigateBackToMilestonesList();
    await milestonePage.openCreatedMilestone();
    await milestonePage.verifyTestRunsAssociatedCount('1');

    // Step 8: Verify progress is zero
    await milestonePage.verifyMilestoneProgressIsZero();

    // Step 9: Open TestRun List, verify testcases, mark status
    await testRunPage.backToTestRunList();
    await testRunPage.openTestRun();
    await testRunPage.markStatus('Passed');

    // Step 10: Back to project, open Milestones tab, open milestone
    await projectPage.openProject();
    await milestonePage.openMilestonesTab();
    await milestonePage.openCreatedMilestone();

    // Step 11: Verify progress after status update is "100" percent
    await milestonePage.verifyProgressAfterStatusUpdate('100');

    // Step 12: Verify passed and failed count
    await milestonePage.verifyPassedAndFailedCount();

    // Step 13: Delete milestone, verify deleted
    await milestonePage.deleteMilestone();
    await milestonePage.verifyMilestoneDeletedSuccessfully();

    // Step 14: Delete project
    await projectPage.deleteProject();
  });
});
