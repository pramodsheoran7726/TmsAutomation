import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('System Fields', {
  tag: ['@regression' , '@settings'],
  annotation: [
    { type: 'feature', description: 'Settings' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('should add values to Priority, Status, and Type fields', async ({ projectOnly, page, projectPage, testCasePage, settingsPage }) => {
    await settingsPage.navigateToSettings();
    await settingsPage.openSystemFields();
    await settingsPage.addValueInPriority();
    await settingsPage.addValueStatus();
    await settingsPage.addValueType(projectPage.projectName);
    // Verify in test case
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testCasePage.openTestCase();
  });
});
