import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { TIMEOUTS } from '../../src/config/constants.js';

test.describe('AI Test Case Generator', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'AI Test Case Generator' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test.describe.configure({ timeout: TIMEOUTS.reportGeneration });

  test('should open generator dialog and verify UI elements', async ({ projectOnly, tcGeneratorPage }) => {
    await tcGeneratorPage.openGenerator();
    await expect(tcGeneratorPage.loc('textarea[name="message"]')).toBeVisible();
    await expect(tcGeneratorPage.loc('#generate-scenarios-button')).toBeVisible();
    await expect(tcGeneratorPage.loc('#quick-author-button')).toBeVisible();
    await expect(tcGeneratorPage.loc('#upload-from-device-button-trigger')).toBeVisible();
    await tcGeneratorPage.closeGenerator();
  });

  test('should open advanced settings and verify controls', async ({ projectOnly, tcGeneratorPage }) => {
    await tcGeneratorPage.openGenerator();
    await tcGeneratorPage.openAdvancedSettings();
    await expect(tcGeneratorPage.loc('(//input[@role=\'spinbutton\'])[1]')).toBeVisible();
    await expect(tcGeneratorPage.loc('(//input[@role=\'spinbutton\'])[2]')).toBeVisible();
    await expect(tcGeneratorPage.loc('textarea[placeholder="Enter your custom instructions"]')).toBeVisible();
    await tcGeneratorPage.closeAdvancedSettings();
    await tcGeneratorPage.closeGenerator();
  });

  test('should generate scenarios from text prompt', async ({ projectOnly, tcGeneratorPage }) => {
    await tcGeneratorPage.openGenerator();
    await tcGeneratorPage.generateScenarios(
      'Test login functionality for an e-commerce website with email and password authentication',
    );
    await tcGeneratorPage.waitForGenerationComplete();

    // Verify scenarios were generated
    await tcGeneratorPage.verifyScenariosGenerated(1);
    await tcGeneratorPage.verifyTestCasesGenerated(1);
    await tcGeneratorPage.verifyCreateAndAutomateVisible();

    // Verify at least one scenario reference link is visible
    await tcGeneratorPage.verifyScenarioVisible('@S1');
  });

  test('should generate scenarios with custom settings', async ({ projectOnly, tcGeneratorPage }) => {
    await tcGeneratorPage.openGenerator();
    await tcGeneratorPage.openAdvancedSettings();
    await tcGeneratorPage.setMaxScenarios(3);
    await tcGeneratorPage.setMaxTestCasesPerScenario(2);

    // Close settings panel before generating
    await tcGeneratorPage.closeAdvancedSettings();
    await tcGeneratorPage.generateScenarios(
      'Test the user registration flow including email verification and password strength validation',
    );
    await tcGeneratorPage.waitForGenerationComplete();

    await tcGeneratorPage.verifyScenariosGenerated(1);
    await tcGeneratorPage.verifyCreateAndAutomateVisible();
  });

  test('should use conversation layer to refine scenarios', async ({ projectOnly, tcGeneratorPage }) => {
    await tcGeneratorPage.openGenerator();
    await tcGeneratorPage.generateScenarios(
      'Test the checkout process for an online store including payment and shipping',
    );
    await tcGeneratorPage.waitForGenerationComplete();

    // Verify conversation textbox is available
    await tcGeneratorPage.verifyConversationTextboxVisible();

    // Send a refinement message via conversation
    await tcGeneratorPage.sendConversationMessage(
      'Add edge cases for expired credit cards and invalid shipping addresses',
    );
    await tcGeneratorPage.waitForConversationResponse();

    // Verify scenarios are still visible after conversation update
    await tcGeneratorPage.verifyScenarioVisible('@S1');
    await tcGeneratorPage.verifyScenariosGenerated(1);
  });

  test('should verify scenario panel filters and search', async ({ projectOnly, tcGeneratorPage }) => {
    await tcGeneratorPage.openGenerator();
    await tcGeneratorPage.generateScenarios(
      'Test password reset functionality including email verification and token expiry',
    );
    await tcGeneratorPage.waitForGenerationComplete();

    // Verify scenario panel controls are present
    await tcGeneratorPage.verifyScenariosGenerated(1);
    await expect(tcGeneratorPage.loc('input[placeholder="Search by test cases"]')).toBeVisible();
    await expect(tcGeneratorPage.loc(`//button[.//text()='Type']`)).toBeVisible();
    await expect(tcGeneratorPage.loc(`//button[.//text()='Priority']`)).toBeVisible();
  });
});
