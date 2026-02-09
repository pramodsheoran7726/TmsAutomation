import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';
import { ROUTES } from '../../src/config/constants.js';

test.describe('Custom Fields', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Settings' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('should create string and textarea custom fields', async ({ page, settingsPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + ROUTES.settingsFields);
    await settingsPage.openCustomFields();
    await settingsPage.createStringCustomField();
    await settingsPage.createTextareaCustomField();
  });

  test('should create number, boolean, date custom fields', async ({ page, settingsPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + ROUTES.settingsFields);
    await settingsPage.openCustomFields();
    await settingsPage.createNumberCustomField();
    await settingsPage.createBooleanCustomField();
    await settingsPage.createDateCustomField();
  });

  test('should create dropdown single select custom field', async ({ page, settingsPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + ROUTES.settingsFields);
    await settingsPage.openCustomFields();
    await settingsPage.createDropdownSingleCustomField();
  });

  test('should create URL custom field', async ({ page, settingsPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + ROUTES.settingsFields);
    await settingsPage.openCustomFields();
    await settingsPage.createUrlCustomField();
  });
});
