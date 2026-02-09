import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Test Case Scenarios', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Test Case Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should create test case with multiple scenarios, clone and delete', async ({ projectPage, testCasePage }) => {
    // Create project and test case
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testCasePage.openTestCase();

    // Select scenario type and add 3 scenarios
    await testCasePage.selectScenarioType();

    await testCasePage.addScenario(
      'Given user navigates to login page\nWhen user enters valid credentials\nThen user should be logged in successfully',
    );

    await testCasePage.addAnotherScenario(
      'Given user is on homepage\nWhen user clicks on sign up button\nThen registration form should be displayed',
    );

    await testCasePage.addAnotherScenario(
      'Given user has items in cart\nWhen user proceeds to checkout\nThen payment options should be shown',
    );

    // Save and verify persistence
    await testCasePage.saveChanges();
    await testCasePage.openTestCase();
    await testCasePage.loc('//span[text()=\'Test steps\']').click();
    await testCasePage.verifyScenarioTypeSelected();
    await testCasePage.verifyScenarioCount(3);

    // Clone a scenario and verify count increases
    await testCasePage.cloneScenario();
    await testCasePage.verifyScenarioCount(4);

    // Delete a scenario and verify count decreases
    await testCasePage.deleteScenario();
    await testCasePage.verifyScenarioCount(3);

    // Save final changes
    await testCasePage.saveChanges();

    // Cleanup
    await projectPage.backToProjectList();
    await projectPage.deleteProject();
  });
});
