import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('SDK Run', {
  tag: ['@sdk'],
  annotation: [
    { type: 'feature', description: 'SDK Integration' },
    { type: 'severity', description: 'minor' },
  ],
}, () => {
  test('should execute test steps via SDK and mark status', async ({ projectWithTestCase, testRunPage, sdkPage }) => {
    await testRunPage.createTestRun();
    await testRunPage.openTestRun();
    await sdkPage.expandDetails();
    await sdkPage.executeTestSteps(3, 'Passed');
    await sdkPage.addRemark('Automation test passed');
    await sdkPage.finishTestExecution();
  });
});
