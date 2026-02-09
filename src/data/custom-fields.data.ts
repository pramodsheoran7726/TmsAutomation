import { SettingsLocators as L } from '../pages/settings/settings.locators.js';

export type CustomFieldConfig = {
  /** Human-readable field type name */
  typeName: string;
  /** Locator keys to click after selecting the base text field type */
  typeSelectionLocators: string[];
  /** Whether this field type supports placeholder/description */
  hasDescription: boolean;
  /** Whether this field type has dropdown options */
  hasDropdownOptions: boolean;
};

/**
 * Parameterized test data for custom field creation.
 * Each entry represents a field type with its creation steps.
 */
export const CUSTOM_FIELD_TYPES: [string, CustomFieldConfig][] = [
  [
    'String (Text)',
    {
      typeName: 'Text',
      typeSelectionLocators: [L.textFieldType],
      hasDescription: true,
      hasDropdownOptions: false,
    },
  ],
  [
    'Textarea',
    {
      typeName: 'Textarea',
      typeSelectionLocators: [L.textFieldType, L.customFieldType, L.textareaFieldType],
      hasDescription: true,
      hasDropdownOptions: false,
    },
  ],
  [
    'Number',
    {
      typeName: 'Number',
      typeSelectionLocators: [L.textFieldType, L.customFieldType, L.numberFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
  [
    'Boolean (Checkbox)',
    {
      typeName: 'Checkbox',
      typeSelectionLocators: [L.textFieldType, L.customFieldType, L.checkboxFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
  [
    'Date',
    {
      typeName: 'Date',
      typeSelectionLocators: [L.textFieldType, L.customFieldType, L.dateFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
  [
    'Dropdown (Single)',
    {
      typeName: 'Dropdown',
      typeSelectionLocators: [L.textFieldType, L.customFieldType, L.dropdownFieldType],
      hasDescription: false,
      hasDropdownOptions: true,
    },
  ],
  [
    'URL',
    {
      typeName: 'URL',
      typeSelectionLocators: [L.textFieldType, L.customFieldType, L.urlFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
];
