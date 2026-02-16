import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('SDK End Session', {
  tag: ['@sdk'],
  annotation: [
    { type: 'feature', description: 'SDK Integration' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should end SDK session and verify redirect', async ({
    projectWithTestCase,
    testRunPage,
    sdkPage,
  }) => {
    // Create and open test run
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();

    // Expand SDK details
    await sdkPage.expandDetails();

    // Navigate through steps
    await sdkPage.clickNextStep();

    // Collapse details
    await sdkPage.collapseDetails();

    // End the session
    await sdkPage.endSession();

    // Verify session has ended
    await sdkPage.verifySessionEnded();
  });
});
