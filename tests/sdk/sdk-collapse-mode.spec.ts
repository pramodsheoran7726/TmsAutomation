import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('SDK Collapse Mode', {
  tag: ['@sdk'],
  annotation: [
    { type: 'feature', description: 'SDK Integration' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should mark step statuses in collapse mode', async ({
    projectWithTestCase,
    testRunPage,
    sdkPage,
  }) => {
    // Create and open test run
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();

    // Expand SDK details
    await sdkPage.expandDetails();

    // Collapse details to enter collapse mode
    await sdkPage.collapseDetails();

    // Verify collapse mode is active
    await sdkPage.verifyCollapseMode();

    // Mark step status in collapsed mode
    await sdkPage.markStepStatus('Passed');

    // Expand back to verify and finish
    await sdkPage.clickCollapseToExpand();
    await sdkPage.finishTestExecution();
  });
});
