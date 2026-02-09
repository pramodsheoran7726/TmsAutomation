import { type Page } from '@playwright/test';
import { RETRY } from '../config/constants.js';

/** Retry an action multiple times with delay between attempts */
export async function retryAction(
  page: Page,
  action: () => Promise<void>,
  options?: { retries?: number; delayMs?: number; label?: string },
): Promise<void> {
  const { retries = RETRY.defaultAttempts, delayMs = RETRY.delayBetweenMs, label = 'action' } = options ?? {};
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await action();
      return;
    } catch (error) {
      console.log(`[retryAction] ${label} attempt ${attempt}/${retries} failed: ${(error as Error).message}`);
      if (attempt === retries) throw error;
      await page.waitForTimeout(delayMs);
    }
  }
}
