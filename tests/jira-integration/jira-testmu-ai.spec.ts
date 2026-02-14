import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { RETRY } from '../../src/config/constants.js';

test.describe('Jira TestMu AI Integration', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Jira Integration' },
    { type: 'severity', description: 'minor' },
  ],
}, () => {
  test.describe.configure({ retries: RETRY.jiraRetries });

  test('should create Jira issue, trigger TestMu AI, and verify response', async ({ page, jiraApi, kaneaiPage }) => {
    const { issueKey } = await jiraApi.createJiraIssue();
    await jiraApi.addTestMuTriggerComment(issueKey);
    const { found, link } = await jiraApi.waitForLambdaTestAIResponse(issueKey);
    expect(found).toBeTruthy();
    expect(link).toBeTruthy();
    if (link) {
      await page.goto(link);
      await page.waitForLoadState('domcontentloaded');
      await kaneaiPage.verifyJiraIssueKey(issueKey);
      const count = await kaneaiPage.getTestCaseCount();
      console.log('test case count', count);
      expect(count).toBeGreaterThan(1);
    }
  });
});
