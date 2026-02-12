import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { TcGeneratorLocators as L } from './tc-generator.locators.js';
import { TIMEOUTS } from '../../config/constants.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

export class TcGeneratorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ── Generator Dialog ───────────────────────────────────────────────

  async openGenerator(): Promise<void> {
    await test.step('Open AI Test Case Generator dialog', async () => {
      await this.loc(L.generateWithAiBtn).click({ timeout: TIMEOUTS.long });
      await this.loc(L.promptTextarea).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
    });
  }

  async closeGenerator(): Promise<void> {
    await test.step('Close generator dialog', async () => {
      await this.loc(L.closeDialogBtn).click({ timeout: TIMEOUTS.medium });
      // Wait for dialog to disappear — check textarea or use URL change
      await this.page.waitForTimeout(TIMEOUTS.animation);
    });
  }

  async enterPrompt(prompt: string): Promise<void> {
    await test.step('Enter generation prompt', async () => {
      const textarea = this.loc(L.promptTextarea);
      await textarea.click();
      await textarea.fill(prompt);
    });
  }

  async selectGenerateMode(): Promise<void> {
    await test.step('Select Generate Scenarios mode', async () => {
      await this.loc(L.generateScenariosModeBtn).click({ timeout: TIMEOUTS.medium });
    });
  }

  async clickSend(): Promise<void> {
    await test.step('Click send button to submit prompt', async () => {
      await this.loc(L.sendBtn).click({ timeout: TIMEOUTS.medium });
    });
  }

  async generateScenarios(prompt: string): Promise<void> {
    await test.step('Generate test scenarios from prompt', async () => {
      await this.enterPrompt(prompt);
      // Generate Scenarios mode is active by default; click send to submit
      await this.clickSend();
      await this.waitForGenerationPage();
    });
  }

  // ── Advanced Settings ──────────────────────────────────────────────

  async openAdvancedSettings(): Promise<void> {
    await test.step('Open advanced settings panel', async () => {
      await this.loc(L.memorySettingsBtn).click({ timeout: TIMEOUTS.medium });
      await this.loc(L.maxScenariosSpinbutton).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
    });
  }

  async closeAdvancedSettings(): Promise<void> {
    await test.step('Close advanced settings panel', async () => {
      await this.loc(L.closeAdvancedSettingsBtn).click({ timeout: TIMEOUTS.medium });
      await this.loc(L.maxScenariosSpinbutton).waitFor({ state: 'hidden', timeout: TIMEOUTS.medium });
    });
  }

  async setMaxScenarios(count: number): Promise<void> {
    await test.step(`Set max scenarios to ${count}`, async () => {
      const input = this.loc(L.maxScenariosSpinbutton);
      await input.fill(String(count));
    });
  }

  async setMaxTestCasesPerScenario(count: number): Promise<void> {
    await test.step(`Set max test cases per scenario to ${count}`, async () => {
      const input = this.loc(L.maxTestCasesSpinbutton);
      await input.fill(String(count));
    });
  }

  async toggleMemoryEnhancement(): Promise<void> {
    await test.step('Toggle memory enhancement', async () => {
      await this.loc(L.memoryEnhancementToggle).click();
    });
  }

  async setCustomInstructions(instructions: string): Promise<void> {
    await test.step('Set custom instructions', async () => {
      const textarea = this.loc(L.customInstructionsTextarea);
      await textarea.click();
      await textarea.fill(instructions);
    });
  }

  async saveInstructions(): Promise<void> {
    await test.step('Save instructions', async () => {
      await this.loc(L.saveInstructionsBtn).click();
      await waitForNetworkIdle(this.page);
    });
  }

  // ── Generation Output Page ─────────────────────────────────────────

  async waitForGenerationPage(): Promise<void> {
    await test.step('Wait for generation output page', async () => {
      await this.page.waitForURL(L.generatePageUrlPattern, { timeout: TIMEOUTS.extraLong });
      await waitForNetworkIdle(this.page);
    });
  }

  async waitForGenerationComplete(): Promise<void> {
    await test.step('Wait for scenario generation to complete', async () => {
      // Wait for generation to START — "Stop Generating" button should appear
      const hasStopBtn = await this.isVisible(L.stopGeneratingBtn, TIMEOUTS.extraLong);
      if (hasStopBtn) {
        // Wait for generation to COMPLETE — "Stop Generating" disappears
        await this.loc(L.stopGeneratingBtn).waitFor({ state: 'hidden', timeout: TIMEOUTS.reportGeneration });
      }
      // Wait for results — "Create and Automate" button appears
      await this.loc(L.createAndAutomateBtn).waitFor({ state: 'visible', timeout: TIMEOUTS.reportGeneration });
    });
  }

  async getGenerationTitle(): Promise<string> {
    return test.step('Get generation title', async () => {
      return (await this.loc(L.generationTitle).textContent()) ?? '';
    });
  }

  async getScenariosCountText(): Promise<string> {
    return test.step('Get scenarios count text', async () => {
      return (await this.loc(L.scenariosCount).textContent()) ?? '';
    });
  }

  async getTestCasesCountText(): Promise<string> {
    return test.step('Get test cases count text', async () => {
      return (await this.loc(L.testCasesCount).textContent()) ?? '';
    });
  }

  async clickBack(): Promise<void> {
    await test.step('Click Back from generation page', async () => {
      await this.loc(L.backBtn).click({ timeout: TIMEOUTS.medium });
      await waitForNetworkIdle(this.page);
    });
  }

  // ── Scenario Interaction ───────────────────────────────────────────

  async verifyScenarioVisible(scenarioRef: string): Promise<void> {
    await test.step(`Verify scenario ${scenarioRef} is visible`, async () => {
      await expect(this.loc(L.scenarioRefLink(scenarioRef))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyCategoryBadge(category: string): Promise<void> {
    await test.step(`Verify category badge: ${category}`, async () => {
      await expect(this.loc(L.scenarioCategoryBadge(category)).first()).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async expandAllScenarios(): Promise<void> {
    await test.step('Expand all scenario tuples to reveal test cases', async () => {
      const expandBtns = this.page.getByRole('button', { name: 'Expand' });
      let count = await expandBtns.count();
      while (count > 0) {
        await expandBtns.first().click();
        await this.page.waitForTimeout(TIMEOUTS.animation);
        count = await expandBtns.count();
      }
    });
  }

  async clickScenarioRef(ref: string): Promise<void> {
    await test.step(`Click scenario reference ${ref}`, async () => {
      await this.loc(L.scenarioRefLink(ref)).click();
    });
  }

  // ── Create Actions ─────────────────────────────────────────────────

  async clickCreateAndAutomate(): Promise<void> {
    await test.step('Click Create and Automate', async () => {
      await this.loc(L.createAndAutomateBtn).click({ timeout: TIMEOUTS.medium });
      await waitForNetworkIdle(this.page);
    });
  }

  // ── Conversation Layer ─────────────────────────────────────────────

  async expandThought(): Promise<void> {
    await test.step('Expand thought section', async () => {
      await this.loc(L.thoughtToggle).click();
    });
  }

  async sendConversationMessage(message: string): Promise<void> {
    await test.step(`Send conversation message: "${message.substring(0, 40)}..."`, async () => {
      const textbox = this.loc(L.conversationTextbox);
      await textbox.click();
      // Type into the inner input within the textbox container
      await this.page.keyboard.type(message);
      await this.page.keyboard.press('Enter');
    });
  }

  async waitForConversationResponse(): Promise<void> {
    await test.step('Wait for conversation response', async () => {
      // Wait for stop generating to appear then disappear (new generation cycle)
      const hasStopBtn = await this.isVisible(L.stopGeneratingBtn, TIMEOUTS.long);
      if (hasStopBtn) {
        await this.loc(L.stopGeneratingBtn).waitFor({ state: 'hidden', timeout: TIMEOUTS.reportGeneration });
      }
      await waitForNetworkIdle(this.page);
    });
  }

  async verifyConversationTextboxVisible(): Promise<void> {
    await test.step('Verify conversation textbox is visible', async () => {
      await expect(this.loc(L.conversationTextbox)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  // ── Filters and Search ─────────────────────────────────────────────

  async searchTestCases(query: string): Promise<void> {
    await test.step(`Search test cases: ${query}`, async () => {
      const input = this.loc(L.searchTestCasesInput);
      await input.click();
      await input.fill(query);
      await this.page.waitForTimeout(TIMEOUTS.animation);
    });
  }

  async clickTypeFilter(): Promise<void> {
    await test.step('Click Type filter', async () => {
      await this.loc(L.typeFilterBtn).click();
    });
  }

  async clickPriorityFilter(): Promise<void> {
    await test.step('Click Priority filter', async () => {
      await this.loc(L.priorityFilterBtn).click();
    });
  }

  // ── Assertions ─────────────────────────────────────────────────────

  async verifyOnGenerationPage(): Promise<void> {
    await test.step('Verify on generation output page', async () => {
      await expect(this.page).toHaveURL(L.generatePageUrlPattern, { timeout: TIMEOUTS.long });
    });
  }

  async verifyScenariosGenerated(minCount = 1): Promise<void> {
    await test.step(`Verify at least ${minCount} scenario tuples rendered`, async () => {
      const count = await this.loc(L.allScenarioRefLinks).count();
      expect(count).toBeGreaterThanOrEqual(minCount);
    });
  }

  async verifyTestCasesGenerated(minCount = 1): Promise<void> {
    await test.step(`Verify at least ${minCount} test case tuples rendered`, async () => {
      await this.expandAllScenarios();
      const count = await this.loc(L.allTestCaseRefLinks).count();
      expect(count).toBeGreaterThanOrEqual(minCount);
    });
  }

  async verifyCreateAndAutomateVisible(): Promise<void> {
    await test.step('Verify Create and Automate button visible', async () => {
      await expect(this.loc(L.createAndAutomateBtn)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }
}
