import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';
import { CUSTOM_FIELD_TYPES } from '../../src/data/custom-fields.data.js';
import { randomString } from '../../src/utils/random.helper.js';

test.describe('Custom Fields - Parameterized', {
  tag: ['@regression' , '@settings'],
  annotation: [
    { type: 'feature', description: 'Settings' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test.describe.configure({ mode: 'serial' });

  for (const [typeName, config] of CUSTOM_FIELD_TYPES) {
    test(`should create ${typeName} custom field`, async ({ projectOnly, settingsPage }) => {
      await settingsPage.openCustomFields();

      const fieldName = `Auto_${typeName.replace(/[^a-zA-Z]/g, '')}_${randomString(RANDOM_LENGTH.medium)}`;
      const dropdownValues = config.hasDropdownOptions
        ? [randomString(RANDOM_LENGTH.medium), randomString(RANDOM_LENGTH.medium)]
        : undefined;

      await settingsPage.createCustomFieldByType(fieldName, config, dropdownValues);
    });
  }
});
