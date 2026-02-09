import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('KaneAI Automate', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'KaneAI Integration' },
    { type: 'severity', description: 'minor' },
  ],
}, () => {
  test('should automate test case with KaneAI', async ({ page, projectPage, testCasePage, kaneaiPage }) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await testCasePage.openTestCase();
    await kaneaiPage.automateWithKaneai();
    await kaneaiPage.selectDesktopBrowser();
    await kaneaiPage.startTesting();
    await kaneaiPage.approve();
    await kaneaiPage.saveTestCase();
    // Cleanup
    await projectPage.deleteProject();
  });
});
