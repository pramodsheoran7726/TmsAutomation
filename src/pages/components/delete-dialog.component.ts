import { type Page } from '@playwright/test';
import { BasePage } from '../base.page.js';

/**
 * Reusable Delete Confirmation Dialog component.
 * Handles the common pattern: click delete -> type DELETE -> confirm.
 * Used across: Project, Folder, Build, Configuration, Report, etc.
 */
export class DeleteDialogComponent extends BasePage {
  constructor(page: Page) { super(page); }

  /**
   * Type "DELETE" in the confirmation input and click the confirm button.
   * @param confirmInput - Selector for the input where user types DELETE
   * @param confirmButton - Selector for the final confirm/delete button
   */
  async confirmDeletion(confirmInput: string, confirmButton: string): Promise<void> {
    const input = this.loc(confirmInput);
    await input.click();
    await input.fill('');
    await input.pressSequentially('DELETE');
    await this.loc(confirmButton).waitFor({ state: 'visible', timeout: 5000 });
    await this.loc(confirmButton).click();
  }

  /**
   * Simple confirmation -- just click the confirm button (no typing required).
   * Used for dialogs that only have a Confirm/Delete/Yes button.
   */
  async confirm(confirmButton: string): Promise<void> {
    await this.loc(confirmButton).click();
  }

  /** Click cancel to dismiss the dialog */
  async cancel(cancelButton: string): Promise<void> {
    await this.loc(cancelButton).click();
  }
}
