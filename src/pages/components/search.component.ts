import { type Page, type Locator } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants.js';
import { waitForNetworkIdle } from '../../utils/wait.helper.js';

/**
 * Reusable Search component.
 * Handles search input + wait for results pattern used across pages.
 */
export class SearchComponent {
  constructor(private readonly page: Page) {}

  /**
   * Type into a search input and wait for results to settle.
   * @param searchSelector - Selector for the search input
   * @param query - Text to search for
   * @param resultSelector - Optional: selector of expected result to wait for
   */
  async search(searchSelector: string, query: string, resultSelector?: string): Promise<void> {
    const loc = (s: string) =>
      s.startsWith('/') || s.startsWith('(')
        ? this.page.locator(`xpath=${s}`)
        : this.page.locator(s);

    const input = loc(searchSelector);
    await input.click();
    await input.clear();
    await input.fill(query);

    if (resultSelector) {
      await loc(resultSelector).first().waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
    } else {
      await this.page.waitForTimeout(TIMEOUTS.animation);
      await waitForNetworkIdle(this.page);
    }
  }

  /** Clear the search input */
  async clear(searchSelector: string): Promise<void> {
    const loc = (s: string) =>
      s.startsWith('/') || s.startsWith('(')
        ? this.page.locator(`xpath=${s}`)
        : this.page.locator(s);

    const input = loc(searchSelector);
    await input.click();
    await input.clear();
  }
}
