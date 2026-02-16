import { type Locator, type Page } from '@playwright/test';
import { TIMEOUTS } from '../config/constants.js';

/** Wait for all network requests to finish (falls back to DOM ready) */
export async function waitForNetworkIdle(page: Page, timeout = TIMEOUTS.medium): Promise<void> {
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch {
    await page.waitForLoadState('domcontentloaded', { timeout: TIMEOUTS.short });
  }
}

/** Wait for DOM content to be loaded */
export async function waitForDomReady(page: Page, timeout = TIMEOUTS.long): Promise<void> {
  await page.waitForLoadState('domcontentloaded', { timeout });
}

/** Click an element and wait for network to settle */
export async function clickAndWaitForNetwork(page: Page, locator: Locator, timeout = TIMEOUTS.long): Promise<void> {
  await locator.click({ timeout });
  await waitForNetworkIdle(page);
}

/** Click an element and wait for a specific API response */
export async function clickAndWaitForResponse(page: Page, locator: Locator, urlPattern: string | RegExp, timeout = TIMEOUTS.long): Promise<void> {
  const responsePromise = page.waitForResponse(urlPattern, { timeout });
  await locator.click({ timeout });
  await responsePromise;
}

/** Click a trigger and wait for a target element to become visible */
export async function clickAndWaitForVisible(locator: Locator, targetLocator: Locator, timeout = TIMEOUTS.medium): Promise<void> {
  await locator.click({ timeout });
  await targetLocator.waitFor({ state: 'visible', timeout });
}

/** Click a trigger and wait for an element to disappear (e.g. dropdown closes, modal hides) */
export async function clickAndWaitForHidden(locator: Locator, targetLocator: Locator, timeout = TIMEOUTS.medium): Promise<void> {
  await locator.click({ timeout });
  await targetLocator.waitFor({ state: 'hidden', timeout });
}

/** Fill an input and wait for search results / network to settle (search debounce) */
export async function fillAndWaitForSearch(page: Page, locator: Locator, value: string, debounceLocator?: Locator, timeout = TIMEOUTS.long): Promise<void> {
  await locator.click({ timeout });
  await locator.fill(value);
  if (debounceLocator) {
    await debounceLocator.waitFor({ state: 'visible', timeout });
  } else {
    await page.waitForTimeout(TIMEOUTS.animation);
    await waitForNetworkIdle(page);
  }
}

/** Fill a search input and wait for network idle (for search debounce without a specific result locator) */
export async function fillSearchAndWaitForNetwork(page: Page, locator: Locator, value: string, timeout = TIMEOUTS.long): Promise<void> {
  await locator.click({ timeout });
  await locator.fill(value);
  await waitForNetworkIdle(page);
}
