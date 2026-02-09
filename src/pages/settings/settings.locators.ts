export const SettingsLocators = {
  // Settings navigation
  settingsNav: `//a[text()='Settings']`,
  settingsMenu: `//span[text()='Settings']`,

  // System fields section
  systemFieldsNav: `//span[text()='System Fields']`,
  systemFieldsTab: `//a[text()='System Fields']`,

  // Custom fields section
  customFieldsNav: `//span[text()='Custom Fields']`,
  customFieldsTab: `//a[text()='Custom Fields']`,
  createCustomFieldCta: `//span[text()='Create Custom Field']`,

  // Custom field creation
  customFieldName: `input[placeholder='Enter field name']`,
  customFieldDescription: `textarea[placeholder='Add description']`,
  customFieldType: `//span[text()='Select Field Type']`,

  // Field types
  textFieldType: `//span[text()='Text']`,
  numberFieldType: `//span[text()='Number']`,
  dateFieldType: `//span[text()='Date']`,
  dropdownFieldType: `//span[text()='Dropdown']`,
  checkboxFieldType: `//span[text()='Checkbox']`,
  textareaFieldType: `//span[text()='Textarea']`,
  urlFieldType: `//span[text()='URL']`,

  // Field options
  requiredField: `//input[@type='checkbox' and @aria-label='Required field']`,
  multiSelectDropdown: `//input[@type='checkbox' and @aria-label='Multi-select']`,

  // Dropdown options
  addDropdownOption: `//span[text()='Add Option']`,
  dropdownOptionInput: `input[placeholder='Enter option']`,
  removeDropdownOption: `//button[@aria-label='Remove option']`,

  // Custom field actions
  createFieldButton: `//span[text()='Create Field']`,
  updateFieldButton: `//span[text()='Update Field']`,
  editCustomField: `//span[text()='Edit']`,
  deleteCustomField: `//span[text()='Delete']`,
  deleteFieldConfirmation: `//span[text()='Delete Field']`,

  // Field list
  searchCustomFields: `//input[@placeholder='Search custom fields']`,
  customFieldRow: `//div[contains(@class,'custom-field-row')]`,

  // System field configuration
  enableSystemField: `//input[@type='checkbox' and @aria-label='Enable field']`,
  makeSystemFieldRequired: `//input[@type='checkbox' and @aria-label='Make required']`,

  // Field visibility
  fieldVisibilityDropdown: `//span[text()='Visibility']`,
  visibleToAll: `//span[text()='All Users']`,
  visibleToAdmin: `//span[text()='Admin Only']`,

  // Apply to entities
  applyToTestCase: `//input[@type='checkbox' and @aria-label='Test Case']`,
  applyToTestRun: `//input[@type='checkbox' and @aria-label='Test Run']`,
  applyToTestPlan: `//input[@type='checkbox' and @aria-label='Test Plan']`,
  applyToProject: `//input[@type='checkbox' and @aria-label='Project']`,

  // General settings
  generalSettingsTab: `//a[text()='General']`,
  organizationName: `input[placeholder='Enter organization name']`,
  organizationLogo: `input[type='file']`,
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
  systemFieldByName: (name: string) => `//span[text()='${name}']`,
  dropdownOption: (option: string) => `//span[text()='${option}']`,
  userByEmail: (email: string) => `//span[text()='${email}']`,
  roleByName: (role: string) => `//span[text()='${role}']`,
} as const;
