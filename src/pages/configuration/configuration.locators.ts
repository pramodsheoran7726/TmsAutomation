export const ConfigurationLocators = {
  // Configuration navigation
  configurationNav: `//a[text()='Configurations']`,
  configurationSettings: `//span[text()='Configurations']`,

  // Create configuration
  createConfigCta: `//button[contains(.,'Create') and contains(.,'Configuration')]`,
  createConfigButton: `//span[text()='Create']`,
  createConfigurationButton: `//button[contains(.,'Create') and contains(.,'Configuration')]`,
  configName: `input[placeholder='Enter Configuration name']`,
  configurationNameInput: `input[placeholder='Enter Configuration name']`,
  configDescription: `textarea[placeholder='Add description to the Configuration']`,
  createConfigurationSubmit: `//button[normalize-space()='Create Configuration']`,
  saveConfigurationButton: `//button[text()='Save']`,
  searchConfigurationInput: `//input[@placeholder='Search Configurations']`,

  // OS and Browser selection
  osDropdown: `//*[text()='Operating system']/following-sibling::button`,
  browserDropdown: `//*[text()='Browser']/following-sibling::button`,
  selectWindows: `//span[text()='Windows']`,
  selectMacOS: `//span[text()='macOS']`,
  selectLinux: `//span[text()='Linux']`,
  selectChrome: `//span[text()='Chrome']`,
  selectFirefox: `//span[text()='Firefox']`,
  selectSafari: `//span[text()='Safari']`,
  selectEdge: `//span[text()='Edge']`,

  // Version selection
  osVersionDropdown: `//*[text()='OS version']/following-sibling::button`,
  browserVersionDropdown: `//*[text()='Browser version']/following-sibling::button`,
  latestVersion: `//span[text()='Latest']`,

  // Resolution
  resolutionDropdown: `//*[text()='Resolution']/following-sibling::button`,
  resolution1920x1080: `//span[text()='1920x1080']`,
  resolution1366x768: `//span[text()='1366x768']`,
  resolution1280x1024: `//span[text()='1280x1024']`,

  // Mobile configuration
  mobileConfigTab: `//span[text()='Mobile']`,
  deviceDropdown: `//span[text()='Select Device']`,
  selectIPhone: `//span[text()='iPhone']`,
  selectAndroid: `//span[text()='Android']`,
  selectTablet: `//span[text()='Tablet']`,

  // Configuration actions
  editConfig: `//span[text()='Edit']`,
  editConfigurationButton: `//span[text()='Edit']`,
  deleteConfig: `//span[text()='Delete']`,
  deleteConfigurationButton: `//span[text()='Delete']`,
  deleteConfigConfirmation: `//span[text()='Delete Configuration']`,
  deleteConfigurationConfirmInput: `//input[@placeholder='Type DELETE to confirm']`,
  deleteConfigurationConfirm: `//button[text()='Delete']`,
  configDeleteButton: `//span[text()='Delete']`,
  duplicateConfig: `//span[text()='Duplicate']`,
  duplicateConfigurationButton: `//span[text()='Duplicate']`,
  duplicateConfigurationConfirm: `//button[text()='Duplicate']`,

  // Configuration list
  searchConfig: `//input[@placeholder='Search Configurations']`,
  configListItem: `//div[contains(@class,'config-list-item')]`,

  // Configuration details
  configDetailView: `//div[contains(@class,'config-detail')]`,
  backToConfigList: `//span[text()='Configurations']`,

  // Custom configuration fields
  addCustomField: `//span[text()='Add Custom Field']`,
  customFieldName: `input[placeholder='Enter field name']`,
  customFieldValue: `input[placeholder='Enter field value']`,
  saveCustomField: `//span[text()='Save']`,

  // Configuration in test execution
  selectConfigInExecution: `//span[text()='Select Configuration']`,
  applyConfig: `//span[text()='Apply']`,
  configApplied: `//div[contains(@class,'config-applied')]`,

  // Dynamic locators
  createdConfig: (name: string) => `//a[text()='${name}']`,
  createdConfiguration: (name: string) => `//a[text()='${name}']`,
  configByName: (name: string) => `//span[text()='${name}']`,
  configThreeDots: (name: string) => `//div[div[a[text()='${name}']]]//button[@aria-label='More options']`,
  configurationOptionsMenu: (name: string) => `//a[text()='${name}']//ancestor::tr//button[@aria-label='more']`,
  selectOS: (os: string) => `//span[text()='${os}']`,
  selectOsVersion: (version: string) => `//span[text()='${version}']`,
  selectBrowserVersion: (version: string) => `//span[text()='${version}']`,
  selectBrowser: (browser: string) => `//span[text()='${browser}']`,
  selectDevice: (device: string) => `//span[text()='${device}']`,
  selectResolution: (resolution: string) => `//span[text()='${resolution}']`,
  configurationSearchResults: `//div[contains(@class, 'search-results')]`,
  configurationDropdownInTestRun: `//button[text()='Select Configuration']`,
  configurationSearchInTestRun: `//input[@placeholder='Search configurations']`,
  selectConfigurationInTestRun: (name: string) => `//span[text()='${name}']`,
  saveConfigurationInTestRun: `//button[text()='Apply']`,
  verifyConfigSelectedInTestRun: (name: string) => `//div[contains(text(),'${name}')]`,
  osFilterDropdown: `//button[text()='Filter by OS']`,
  browserFilterDropdown: `//button[text()='Filter by Browser']`,
  selectOsFilter: (os: string) => `//span[text()='${os}']`,
  selectBrowserFilter: (browser: string) => `//span[text()='${browser}']`,
  filteredConfigurations: `//div[contains(@class, 'filtered-configs')]`,
} as const;
