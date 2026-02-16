import { SettingsLocators as L } from '../pages/settings/settings.locators.js';

export type CustomFieldConfig = {
  /** Human-readable field type name */
  typeName: string;
  /** Locator keys to click after opening the type dropdown (empty = use default String) */
  typeSelectionLocators: string[];
  /** Whether this field type supports placeholder/description */
  hasDescription: boolean;
  /** Whether this field type has dropdown options */
  hasDropdownOptions: boolean;
  /** Whether the multi-select checkbox should be toggled on */
  isMultiSelect?: boolean;
};

/**
 * Parameterized test data for custom field creation.
 * Each entry represents a field type with its creation steps.
 *
 * New UI uses a type dropdown menu with menuitemradio items.
 * String is the default type — no selection needed (empty typeSelectionLocators).
 * Other types need one click on the corresponding menuitemradio.
 */
export const CUSTOM_FIELD_TYPES: [string, CustomFieldConfig][] = [
  [
    'String (Text)',
    {
      typeName: 'String',
      typeSelectionLocators: [], // String is the default — no type change needed
      hasDescription: true,
      hasDropdownOptions: false,
    },
  ],
  [
    'Textarea',
    {
      typeName: 'Textarea',
      typeSelectionLocators: [L.textareaFieldType],
      hasDescription: true,
      hasDropdownOptions: false,
    },
  ],
  [
    'Number',
    {
      typeName: 'Number',
      typeSelectionLocators: [L.numberFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
  [
    'Boolean (Checkbox)',
    {
      typeName: 'Boolean (Checkbox)',
      typeSelectionLocators: [L.checkboxFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
  [
    'Date',
    {
      typeName: 'Date',
      typeSelectionLocators: [L.dateFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
  [
    'Dropdown (Single)',
    {
      typeName: 'Dropdown - Single select',
      typeSelectionLocators: [L.dropdownFieldType],
      hasDescription: false,
      hasDropdownOptions: true,
    },
  ],
  [
    'URL',
    {
      typeName: 'URL',
      typeSelectionLocators: [L.urlFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
  [
    'User',
    {
      typeName: 'User',
      typeSelectionLocators: [L.userFieldType],
      hasDescription: false,
      hasDropdownOptions: false,
    },
  ],
  [
    'Multi-Select Dropdown',
    {
      typeName: 'Dropdown - Multi select',
      typeSelectionLocators: [L.multiSelectDropdownType],
      hasDescription: false,
      hasDropdownOptions: true,
    },
  ],
];
