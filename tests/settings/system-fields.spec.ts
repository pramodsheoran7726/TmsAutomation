import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';
import { ROUTES } from '../../src/config/constants.js';

test.describe('System Fields', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Settings' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('should add values to Priority, Status, and Type fields', async ({ page, projectPage, testCasePage, settingsPage }) => {
    await projectPage.createProjectWithTagDescription();
    await page.goto(EnvConfig.tmsBaseUrl + ROUTES.settingsFields);
    await settingsPage.openSystemFields();
    await settingsPage.addValueInPriority();
    await settingsPage.addValueStatus();
    await settingsPage.addValueType(projectPage.projectName);
    // Verify in test case
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testCasePage.openTestCase();
    // Cleanup
    await projectPage.deleteProject();
  });
});
