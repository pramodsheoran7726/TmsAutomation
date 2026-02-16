import { CommonLocators as C } from '../common/common.locators.js';

export const SettingsLocators = {
  // Settings navigation — use data attributes to avoid strict mode violations
  settingsNav: `//a[text()='Settings']`,
  settingsMenu: `//span[text()='Settings']`,

  // System fields section — scoped to nav link to avoid matching heading "Test Case System Fields"
  systemFieldsNav: `//span[@data-component='text'][@data-content='System Fields']`,
  systemFieldsTab: `//a[text()='System Fields']`,
  systemFieldsBackLink: `//a[@href='/settings/fields']`,

  // Custom fields section — scoped to nav link
  customFieldsNav: `//span[@data-component='text'][@data-content='Custom Fields']`,
  customFieldsTab: `//a[text()='Custom Fields']`,
  // Overflow "More" button in settings nav (appears in narrow viewports)
  navMoreButton: `//nav[@aria-label='Navigation']//button[contains(.,'More')]`,

  // System field value creation — scoped to "New Value" drawer to avoid matching "Edit Value" drawer
  addValueCta: `//button[.//span[text()='Add Value']]`,
  systemFieldValueName: `//span[text()='New Value']/ancestor::nav//input[@placeholder='Enter value name']`,
  createValueButton: `//span[text()='New Value']/ancestor::nav//span[text()='Create']`,

  // Custom field creation — scoped to "New Field" drawer to avoid matching "Edit Field" drawer
  createCustomFieldCta: `//button[.//span[text()='New Field']]`,

  // Custom field form inputs (scoped to "New Field" drawer)
  customFieldName: `//span[text()='New Field']/ancestor::nav//input[@placeholder='Enter field name']`,
  customFieldDescription: `//span[text()='New Field']/ancestor::nav//input[@placeholder='Enter placeholder name']`,

  // Type dropdown trigger (scoped to "New Field" drawer)
  customFieldType: `//span[text()='New Field']/ancestor::nav//button[.//span[text()='String'] or .//span[text()='Textarea'] or .//span[text()='Number'] or .//span[text()='Date'] or .//span[text()='URL'] or .//span[text()='User'] or .//span[text()='Boolean (Checkbox)'] or .//span[text()='Dropdown - Single select'] or .//span[text()='Dropdown - Multi select']]`,

  // Field type options (li[role=menuitemradio] rendered as portal outside drawer)
  textFieldType: `//*[@role='menuitemradio'][normalize-space(.)='String']`,
  textareaFieldType: `//*[@role='menuitemradio'][normalize-space(.)='Textarea']`,
  numberFieldType: `//*[@role='menuitemradio'][normalize-space(.)='Number']`,
  dateFieldType: `//*[@role='menuitemradio'][normalize-space(.)='Date']`,
  dropdownFieldType: `//*[@role='menuitemradio'][normalize-space(.)='Dropdown - Single select']`,
  multiSelectDropdownType: `//*[@role='menuitemradio'][normalize-space(.)='Dropdown - Multi select']`,
  checkboxFieldType: `//*[@role='menuitemradio'][normalize-space(.)='Boolean (Checkbox)']`,
  urlFieldType: `//*[@role='menuitemradio'][normalize-space(.)='URL']`,
  userFieldType: `//*[@role='menuitemradio'][normalize-space(.)='User']`,

  // Field options (switches in new UI)
  requiredField: `//span[text()='Mark as Required']`,
  multiSelectDropdown: `//input[@type='checkbox' and @aria-label='Multi-select']`,
  applyToNewProjects: `//span[text()='Apply to all future projects']`,

  // Dropdown options (scoped to "New Field" drawer)
  addDropdownOption: `//span[text()='New Field']/ancestor::nav//button[contains(.,'Add Value')]`,
  dropdownOptionInput: `//span[text()='New Field']/ancestor::nav//input[@placeholder='Enter desired value and press enter to add']`,
  removeDropdownOption: `//button[@aria-label='Remove option']`,

  // Action buttons (scoped to "New Field" drawer)
  createFieldButton: `//span[text()='New Field']/ancestor::nav//span[text()='Create']`,
  updateFieldButton: `//span[text()='Update Field']`,
  editCustomField: C.editSpan,
  deleteCustomField: C.deleteSpan,
  deleteFieldConfirmation: `//span[text()='Delete Field']`,

  // Legacy locators kept for compatibility
  applyToProject: `//span[text()='Apply to all future projects']`,
  applyToTestCase: `//span[text()='Apply to all future projects']`, // Mapped to same switch (removed from UI)

  // Field list / search
  searchCustomFields: `//input[@placeholder='Search']`,
  customFieldRow: `//div[contains(@class,'custom-field-row')]`,

  // System field configuration
  enableSystemField: `//input[@type='checkbox' and @aria-label='Enable field']`,
  makeSystemFieldRequired: `//input[@type='checkbox' and @aria-label='Make required']`,

  // Field visibility
  fieldVisibilityDropdown: `//span[text()='Visibility']`,
  visibleToAll: `//span[text()='All Users']`,
  visibleToAdmin: `//span[text()='Admin Only']`,

  // General settings
  generalSettingsTab: `//a[text()='General']`,
  organizationName: `input[placeholder='Enter organization name']`,
  organizationLogo: C.fileInput,
  saveGeneralSettings: `//span[text()='Save Settings']`,

  // User management
  userManagementTab: `//a[text()='Users']`,
  inviteUserCta: `//span[text()='Invite User']`,
  userEmail: `input[placeholder='Enter email address']`,
  userRole: `//span[text()='Select Role']`,
  adminRole: `//span[text()='Admin']`,
  memberRole: `//span[text()='Member']`,
  viewerRole: `//span[text()='Viewer']`,
  sendInvite: `//span[text()='Send Invite']`,

  // Notifications settings
  notificationsTab: `//a[text()='Notifications']`,
  emailNotifications: `//input[@type='checkbox' and @aria-label='Email notifications']`,
  slackNotifications: `//input[@type='checkbox' and @aria-label='Slack notifications']`,

  // Integration settings
  integrationsTab: `//a[text()='Integrations']`,
  addIntegration: `//span[text()='Add Integration']`,
  jiraIntegration: `//span[text()='Jira']`,
  slackIntegration: `//span[text()='Slack']`,

  // Dynamic locators
  customFieldByName: (name: string) => `//span[text()='${name}']`,
  customFieldThreeDots: (name: string) => `//div[span[text()='${name}']]//button[@aria-label='More options']`,
  systemFieldByName: (name: string) => `//button[normalize-space(.)='${name}']`,
  dropdownOption: (option: string) => `//span[text()='${option}']`,
  userByEmail: (email: string) => `//span[text()='${email}']`,
  roleByName: (role: string) => `//span[text()='${role}']`,
} as const;
