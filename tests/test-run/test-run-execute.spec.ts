import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { randomString } from '../../src/utils/random.helper.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';

test.describe('Test Run Execution', {
  tag: ['@regression', '@critical-path', '@test-run'],
  annotation: [
    { type: 'feature', description: 'Test Run Management' },
    { type: 'severity', description: 'critical' },
    { type: 'story', description: 'PT-14247613' },
  ],  
}, () => {
  test('should execute test run manually, mark test case and step statuses, and verify run status', async ({ projectOnly, projectPage, testCasePage, testRunPage }) => {
    const tc1Title = testCasePage.testCaseTitle;
    const tc2Title = testCasePage.newTestCaseTitle;
    const step1Desc = `Step1_${randomString(RANDOM_LENGTH.standard)}`;
    const step1Outcome = `Outcome1_${randomString(RANDOM_LENGTH.standard)}`;
    const step2Desc = `Step2_${randomString(RANDOM_LENGTH.standard)}`;
    const step2Outcome = `Outcome2_${randomString(RANDOM_LENGTH.standard)}`;

    // Create TC1 with test step
    await testCasePage.createTestCase(tc1Title);
    await testCasePage.openTestCase(tc1Title);
    await testCasePage.createManualStep(step1Desc, step1Outcome);

    // Navigate back to project and create TC2 with test step
    await projectPage.backToProjectList();
    await projectPage.openProject();
    await testCasePage.createTestCase(tc2Title);
    await testCasePage.openTestCase(tc2Title);
    await testCasePage.createManualStep(step2Desc, step2Outcome);

    // Navigate back to project and create test run with test cases
    await projectPage.backToProjectList();
    await projectPage.openProject();
    await testRunPage.createTestRunWithTestCases();

    // Verify both TCs in instances (already on instances page after create)
    await testRunPage.verifyTestCasesInInstances(tc1Title, tc2Title);

    // Mark TC1 overall status as Passed
    await testRunPage.markStatus('Passed');

    // Mark TC2 overall status as Failed
    await testRunPage.markStatus('Failed');

    // Verify manual run remark
    await testRunPage.verifyManualRunRemark();

    // Mark test run overall status to Passed
    await testRunPage.markTestRunOverallStatus();

  });
});
