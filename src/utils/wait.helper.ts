import { type Locator, type Page } from '@playwright/test';
import { TIMEOUTS } from '../config/constants.js';

/** Wait for all network requests to finish (falls back to DOM ready) */
export async function waitForNetworkIdle(page: Page, timeout: number = TIMEOUTS.medium): Promise<void> {
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch {
    console.warn('[waitForNetworkIdle] networkidle timed out, falling back to domcontentloaded');
    await page.waitForLoadState('domcontentloaded', { timeout: TIMEOUTS.short });
  }
}

/** Wait for DOM content to be loaded */
export async function waitForDomReady(page: Page, timeout: number = TIMEOUTS.long): Promise<void> {
  await page.waitForLoadState('domcontentloaded', { timeout });
}

/** Click an element and wait for network to settle */
export async function clickAndWaitForNetwork(page: Page, locator: Locator, timeout: number = TIMEOUTS.long): Promise<void> {
  await locator.click({ timeout });
  await waitForNetworkIdle(page);
}

/** Click an element and wait for a specific API response */
export async function clickAndWaitForResponse(page: Page, locator: Locator, urlPattern: string | RegExp, timeout: number = TIMEOUTS.long): Promise<void> {
  const responsePromise = page.waitForResponse(urlPattern, { timeout });
  await locator.click({ timeout });
  await responsePromise;
}

/** Fill an input and wait for search results to appear */
export async function fillAndWaitForSearch(page: Page, locator: Locator, value: string, debounceLocator?: Locator, timeout: number = TIMEOUTS.long): Promise<void> {
  await locator.click({ timeout });
  await locator.fill(value);
  if (debounceLocator) {
    await debounceLocator.waitFor({ state: 'visible', timeout });
  } else {
    await page.waitForTimeout(TIMEOUTS.animation);
    await waitForNetworkIdle(page);
  }
}
