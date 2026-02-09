import { type Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants.js';

/**
 * Reusable Delete Confirmation Dialog component.
 * Handles the common pattern: click delete → type DELETE → confirm.
 * Used across: Project, Folder, Build, Configuration, Report, etc.
 */
export class DeleteDialogComponent {
  constructor(private readonly page: Page) {}

  /**
   * Type "DELETE" in the confirmation input and click the confirm button.
   * @param confirmInput - Selector for the input where user types DELETE
   * @param confirmButton - Selector for the final confirm/delete button
   */
  async confirmDeletion(confirmInput: string, confirmButton: string): Promise<void> {
    const loc = (s: string) =>
      s.startsWith('/') || s.startsWith('(')
        ? this.page.locator(`xpath=${s}`)
        : this.page.locator(s);

    const input = loc(confirmInput);
    await input.click();
    await input.fill('');
    await input.pressSequentially('DELETE');
    await this.page.waitForTimeout(1000);
    await loc(confirmButton).click();
  }

  /**
   * Simple confirmation — just click the confirm button (no typing required).
   * Used for dialogs that only have a Confirm/Delete/Yes button.
   */
  async confirm(confirmButton: string): Promise<void> {
    const loc = (s: string) =>
      s.startsWith('/') || s.startsWith('(')
        ? this.page.locator(`xpath=${s}`)
        : this.page.locator(s);

    await loc(confirmButton).click();
  }

  /** Click cancel to dismiss the dialog */
  async cancel(cancelButton: string): Promise<void> {
    const loc = (s: string) =>
      s.startsWith('/') || s.startsWith('(')
        ? this.page.locator(`xpath=${s}`)
        : this.page.locator(s);

    await loc(cancelButton).click();
  }
}
