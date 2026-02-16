import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Custom Fields', {
  tag: ['@regression' , '@settings'],
  annotation: [
    { type: 'feature', description: 'Settings' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create all custom field types', async ({ projectOnly, settingsPage }) => {
    test.setTimeout(300_000); // 5 min — creating 7 field types + projectOnly setup
    await settingsPage.openCustomFields();
    await settingsPage.createStringCustomField();
    await settingsPage.createTextareaCustomField();
    await settingsPage.createNumberCustomField();
    await settingsPage.createBooleanCustomField();
    await settingsPage.createDateCustomField();
    await settingsPage.createDropdownSingleCustomField();
    await settingsPage.createUrlCustomField();
  });
});
