import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { randomString } from '../../src/utils/random.helper.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';

test.describe('Test Run Execution History', {
  tag: ['@regression', '@test-run'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should verify execution history after marking test case statuses', async ({
    projectOnly,
    projectPage,
    testCasePage,
    testRunPage,
  }) => {
    // Create a test case with steps
    const tcTitle = testCasePage.testCaseTitle;
    const stepDesc = `Step_${randomString(RANDOM_LENGTH.standard)}`;
    const stepOutcome = `Outcome_${randomString(RANDOM_LENGTH.standard)}`;

    await testCasePage.createTestCase(tcTitle);
    await testCasePage.openTestCase(tcTitle);
    await testCasePage.createManualStep(stepDesc, stepOutcome);

    // Navigate back and create test run with test cases
    await projectPage.backToProjectList();
    await projectPage.openProject();
    await testRunPage.createTestRunWithTestCases();

    // Open test run and mark status
    await testRunPage.openTestRun();
    await testRunPage.markStatus('Passed');

    // Verify execution history shows the status
    await testRunPage.verifyExecutionHistory(['Passed']);
  });
});
