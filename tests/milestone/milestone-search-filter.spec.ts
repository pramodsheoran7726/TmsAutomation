import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Milestone Search, Filter, and Mark Complete', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Milestone Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  /**
   * Full BDD Scenario: Search, Filter, Mark Complete
   *
   * Flow:
   * 1. Create project, open project, create test cases
   * 2. Open Milestones tab
   * 3. Create milestone with name, description, tag
   * 4. Verify created
   * 5. Search for created milestone, verify in search results
   * 6. Clear search
   * 7. Filter milestones by Complete view, verify no milestones found
   * 8. Filter milestones by Open view
   * 9. Mark milestone as completed
   * 10. Open Milestones tab, verify milestone marked as complete
   * 11. Open created milestone, delete milestone
   * 12. Delete project
   */
  test('should search, filter, and mark milestone as complete', async ({
    projectPage,
    testCasePage,
    milestonePage,
  }) => {
    // Step 1: Create project, open project, create test cases
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();

    // Step 2: Open Milestones tab
    await milestonePage.openMilestonesTab();

    // Step 3: Create milestone with name, description, tag
    await milestonePage.createMilestoneWithDetails();

    // Step 4: Verify created
    await milestonePage.verifyMilestoneCreatedSuccessfully();

    // Step 5: Search for created milestone, verify in search results
    await milestonePage.searchCreatedMilestone();
    await milestonePage.verifyMilestoneInSearchResults();

    // Step 6: Clear search
    await milestonePage.clearMilestoneSearch();

    // Step 7: Filter milestones by Complete view, verify no milestones found
    await milestonePage.filterMilestonesByComplete();
    await milestonePage.verifyNoMilestonesFound();

    // Step 8: Filter milestones by Open view
    await milestonePage.filterMilestonesByOpen();

    // Step 9: Mark milestone as completed
    await milestonePage.openCreatedMilestone();
    await milestonePage.markMilestoneAsCompleted();

    // Step 10: Open Milestones tab, verify milestone marked as complete
    await milestonePage.openMilestonesTab();
    await milestonePage.verifyMilestoneMarkedComplete();

    // Step 11: Open created milestone, delete milestone
    await milestonePage.openCreatedMilestone();
    await milestonePage.deleteMilestone();

    // Step 12: Delete project
    await projectPage.deleteProject();
  });
});
