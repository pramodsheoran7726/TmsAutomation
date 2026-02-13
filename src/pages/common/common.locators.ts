// ──────────────────────────────────────────────────────────────
// Shared locators used across multiple feature pages.
// Import as `C` and reference by key to avoid duplication.
// ──────────────────────────────────────────────────────────────

export const CommonLocators = {
  // ─── Action Button Spans ──────────────────────────
  deleteSpan: `//span[text()='Delete']`,
  editSpan: `//span[text()='Edit']`,
  createSpan: `//span[text()='Create']`,
  nextSpan: `//span[text()='Next']`,
  cancelSpan: `//span[text()='Cancel']`,
  duplicateSpan: `//span[text()='Duplicate']`,
  passedSpan: `//span[text()='Passed']`,
  activeSpan: `//span[text()='Active']`,
  unlinkSpan: `//span[text()='Unlink']`,

  // ─── Confirmation Dialog ──────────────────────────
  typeDeleteInput: `//input[@placeholder='Type DELETE to confirm']`,
  deleteConfirmButton: `//button[normalize-space()='Delete']`,
  duplicateConfirmButton: `//button[text()='Duplicate']`,
  saveNormalizedButton: `//button[normalize-space()='Save']`,

  // ─── Common Form Elements ─────────────────────────
  tagsInput: `input[placeholder='Add Tags separated by enter']`,
  fileInput: `input[type='file']`,
  openMenuButton: `//button[@aria-label='Open menu']`,

  // ─── Shared Across Features ───────────────────────
  initialPromptChevron: `//span[text()='Initial prompt']//following-sibling::div//*[contains(@class, 'octicon-chevron-right')]`,
} as const;
