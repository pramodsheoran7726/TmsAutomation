import { type Locator, type Page } from '@playwright/test';
import { TIMEOUTS } from '../config/constants.js';

export class BasePage {
  constructor(readonly page: Page) {}

  /** Locate element — auto-detects XPath (starts with / or () vs CSS */
  loc(selector: string): Locator {
    return selector.startsWith('/') || selector.startsWith('(')
      ? this.page.locator(`xpath=${selector}`)
      : this.page.locator(selector);
  }

  /** Replace {{placeholders}} in selector strings */
  tpl(selector: string, replacements: Record<string, string>): string {
    let result = selector;
    for (const [key, value] of Object.entries(replacements)) {
      result = result.replace(`{{${key}}}`, value);
    }
    return result;
  }

  /** Check if element becomes visible within timeout (returns true/false, never throws) */
  async isVisible(selector: string, timeout: number = TIMEOUTS.short): Promise<boolean> {
    try {
      await this.loc(selector).waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
}
