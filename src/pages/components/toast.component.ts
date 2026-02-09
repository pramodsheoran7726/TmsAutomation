import { type Page, expect } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants.js';

/**
 * Reusable Toast/Notification component.
 * Handles success, error, and custom toast messages across all pages.
 */
export class ToastComponent {
  constructor(private readonly page: Page) {}

  /** Wait for a toast containing specific text to appear */
  async waitForMessage(text: string, timeout = TIMEOUTS.medium): Promise<void> {
    await this.page
      .locator(`xpath=//*[contains(text(),'${text}') or contains(.,'${text}')]`)
      .first()
      .waitFor({ state: 'visible', timeout });
  }

  /** Assert a toast with specific text is visible (soft assertion) */
  async expectMessage(text: string, timeout = TIMEOUTS.medium): Promise<void> {
    await expect
      .soft(
        this.page.locator(`xpath=//*[contains(text(),'${text}') or contains(.,'${text}')]`).first(),
      )
      .toBeVisible({ timeout });
  }

  /** Wait for toast to disappear */
  async waitForDismiss(text: string, timeout = TIMEOUTS.medium): Promise<void> {
    await this.page
      .locator(`xpath=//*[contains(text(),'${text}')]`)
      .first()
      .waitFor({ state: 'hidden', timeout });
  }
}
