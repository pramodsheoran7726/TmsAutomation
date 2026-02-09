import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Automation Link Test Case', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Automation Dashboard' },
    { type: 'severity', description: 'minor' },
  ],
}, () => {
  test('should link a test case from automation dashboard', async ({ page, automationPage }) => {
    await automationPage.openAutomationProject();
    await automationPage.linkTestCase();
    await automationPage.verifyTestCaseLinked();
    await automationPage.unlinkTestCase();
  });
});
