export const TcGeneratorLocators = {
  // ── Generator Dialog (opened from test case listing page) ──────────
  generateWithAiBtn: `//span[text()='Generate with AI']`,
  promptTextarea: `textarea[name="message"]`,
  generateScenariosModeBtn: `#generate-scenarios-button`,
  quickAuthorBtn: `#quick-author-button`,
  fileUploadBtn: `#upload-from-device-button-trigger`,
  fileUploadInput: `#file-uploader-input`,
  memorySettingsBtn: `#memory-layer-settings-button`,
  /** Send/submit button — identified by SVG path, becomes enabled when prompt is non-empty */
  sendBtn: `//button[.//*[local-name()='svg']/*[local-name()='path' and starts-with(@d,'M3.71644')]]`,
  /** Close button — first octicon-x (close icon) inside the dialog overlay */
  closeDialogBtn: `(//div[@role='dialog']//button[.//*[local-name()='svg' and contains(@class,'octicon-x')]])[1]`,

  // ── Advanced Settings Panel ────────────────────────────────────────
  /** Close button inside the Advanced Settings panel header */
  closeAdvancedSettingsBtn: `//*[text()='Advanced settings']/parent::*//button`,
  advancedSettingsHeading: `//h3[text()='Advanced settings'] | //span[text()='Advanced settings']`,
  maxScenariosSpinbutton: `(//input[@role='spinbutton'])[1]`,
  maxTestCasesSpinbutton: `(//input[@role='spinbutton'])[2]`,
  memoryEnhancementToggle: `//button[contains(@class,'ToggleSwitch__SwitchButton')]`,
  customInstructionsTextarea: `textarea[placeholder="Enter your custom instructions"]`,
  addAttachmentsBtn: `//button[.//text()='Add Attachments']`,
  saveInstructionsBtn: `//button[.//text()='Save Instructions']`,

  // ── Generation Output Page (/generate/{id}?projectId={id}) ────────
  backBtn: `//button[.//text()='Back']`,
  generationTitle: `//button[.//text()='Back']/following-sibling::*[1]`,
  scenariosCount: `//span[contains(text(),'Scenarios (')]`,
  testCasesCount: `//span[contains(text(),'Test Cases (')]`,
  stopGeneratingBtn: `//button[.//text()='Stop Generating']`,
  progressBar: `[role="progressbar"]`,

  // ── Create Actions (appear after generation completes) ─────────────
  createAndAutomateBtn: `//button[contains(.,'Create and Automate')]`,
  createAndAutomateDropdown: `//button[contains(.,'Create and Automate')]/following-sibling::button`,

  // ── Conversation Layer (left panel) ────────────────────────────────
  thoughtToggle: `//button[contains(.,'Thought for')]`,
  configureContextBtn: `//button[.//*[contains(text(),'Configure Context')]]`,
  conversationTextbox: `[role="textbox"]`,
  conversationInnerInput: `[role="textbox"] input[type="text"]`,
  conversationGhostText: `//p[contains(@class,'pointer-events-none')] | //div[contains(@class,'pointer-events-none')]`,
  conversationMemoryBtn: `//button[.//text()='Memory Enhancement']`,
  conversationProjectInstrBtn: `//button[.//text()='Project Instructions']`,
  conversationOrgInstrBtn: `//button[.//text()='Organisation Instructions']`,

  // ── Scenario Output Panel (right panel) ────────────────────────────
  selectAllCheckbox: `(//input[@type='checkbox'])[1]`,
  searchTestCasesInput: `input[placeholder="Search by test cases"]`,
  typeFilterBtn: `//button[.//text()='Type']`,
  priorityFilterBtn: `//button[.//text()='Priority']`,

  // ── Scenario Card ──────────────────────────────────────────────────
  /** All scenario ref links (@S1, @S2, …) — use .count() to get number of scenario tuples */
  allScenarioRefLinks: `//a[starts-with(text(),'@S')]//ancestor::div[@class='flex items-center w-full']`,
  /** All test case ref links (@S1.C1, @S1.C2, …) — visible only when scenario is expanded */
  allTestCaseRefLinks: `//a[starts-with(text(),'@S') and contains(text(),'.C')]`,
  /** All Expand buttons — use page.getByRole('button', { name: 'Expand' }) instead */
  scenarioCard: (index: number) => `(//div[@role='checkbox']/ancestor::div[contains(@class,'cursor-pointer')])[${index}]`,
  scenarioCheckbox: (index: number) => `(//div[@role='checkbox'])[${index + 1}]`,
  scenarioTitle: (index: number) => `(//button[contains(@class,'Expand') or contains(@class,'Collapse')]/ancestor::div[1]//preceding-sibling::div//img[@alt]/following-sibling::*)[${index}]`,
  scenarioRefLink: (ref: string) => `//a[text()='${ref}']`,
  scenarioCategoryBadge: (category: string) => `//span[text()='${category}']`,
  expandBtn: (index: number) => `(//button[.//*[local-name()='svg']]//parent::button[contains(@aria-label,'Expand') or following-sibling::*[contains(text(),'Expand')]])[${index}]`,
  collapseBtn: `//button[following-sibling::*[contains(text(),'Collapse')]]`,

  // ── Expanded Test Case (inside scenario) ───────────────────────────
  testCaseRefLink: (ref: string) => `//a[text()='${ref}']`,
  testCaseTypeLabel: `//span[text()='Functional'] | //span[text()='Non-functional']`,
  testCaseCategoryLabel: (category: string) => `//span[text()='${category}']`,

  // ── URL Pattern ────────────────────────────────────────────────────
  generatePageUrlPattern: /\/generate\/\d+\?projectId=/,
} as const;
