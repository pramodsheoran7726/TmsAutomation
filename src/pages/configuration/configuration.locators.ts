import { CommonLocators as C } from '../common/common.locators.js';

export const ConfigurationLocators = {
  // Configuration navigation
  configurationNav: `//a[text()='Configurations']`,
  configurationSettings: `//span[text()='Configurations']`,

  // Create configuration
  createConfigCta: `//button[contains(.,'Create') and contains(.,'Configuration')]`,
  createConfigButton: C.createSpan,
  createConfigurationButton: `//button[contains(.,'Create') and contains(.,'Configuration')]`,
  configName: `input[placeholder='Enter Configuration name']`,
  configurationNameInput: `input[placeholder='Enter Configuration name']`,
  configDescription: `textarea[placeholder='Add description to the Configuration']`,
  createConfigurationSubmit: `//button[normalize-space()='Create Configuration']`,
  saveConfigurationButton: `//button[normalize-space()='Update Configuration']`,
  searchConfigurationInput: `//input[@placeholder='Search configurations']`,

  // OS and Browser selection
  osDropdown: `//*[normalize-space()='Operating system']/following::button[1]`,
  browserDropdown: `//*[normalize-space()='Browser' and not(self::h5) and not(self::button) and not(ancestor::button)]/following::button[1]`,
  selectWindows: `//span[text()='Windows']`,
  selectMacOS: `//span[text()='macOS']`,
  selectLinux: `//span[text()='Linux']`,
  selectChrome: `//span[text()='Chrome']`,
  selectFirefox: `//span[text()='Firefox']`,
  selectSafari: `//span[text()='Safari']`,
  selectEdge: `//span[text()='Edge']`,

  // Version selection
  osVersionDropdown: `//*[normalize-space()='OS version']/following::button[1]`,
  browserVersionDropdown: `//*[normalize-space()='Browser version']/following::button[1]`,
  latestVersion: `//span[text()='Latest']`,

  // Resolution
  resolutionDropdown: `//*[normalize-space()='Resolution' and not(self::h5) and not(self::button) and not(ancestor::button)]/following::button[1]`,
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
  editConfig: C.editSpan,
  editConfigurationButton: C.editSpan,
  deleteConfig: C.deleteSpan,
  deleteConfigurationButton: C.deleteSpan,
  deleteConfigConfirmation: `//span[text()='Delete Configuration']`,
  deleteConfigurationConfirmInput: C.typeDeleteInput,
  deleteConfigurationConfirm: C.deleteConfirmButton,
  configDeleteButton: C.deleteSpan,
  duplicateConfig: C.duplicateSpan,
  duplicateConfigurationButton: C.duplicateSpan,
  duplicateConfigurationConfirm: C.duplicateConfirmButton,

  // Configuration list
  searchConfig: `//input[@placeholder='Search configurations']`,
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

  // Falcon platform
  falconPlatformTab: `//span[text()='Falcon']`,
  falconOsDropdown: `//*[normalize-space()='Operating system']/following::button[1]`,
  falconOsVersionDropdown: `//*[normalize-space()='OS version']/following::button[1]`,
  falconBrowserDropdown: `//*[normalize-space()='Browser' and not(self::h5) and not(self::button) and not(ancestor::button)]/following::button[1]`,
  falconBrowserVersionDropdown: `//*[normalize-space()='Browser version']/following::button[1]`,
  falconResolutionDropdown: `//*[normalize-space()='Resolution' and not(self::h5) and not(self::button) and not(ancestor::button)]/following::button[1]`,

  // Real Device platform
  realDevicePlatformTab: `//span[@data-content='Real Device']`,
  manufacturerDropdown: `//*[normalize-space()='Manufacturer']/following::button[1]`,
  deviceNameDropdown: `//*[normalize-space()='Device']/following::button[1]`,
  realDeviceOsVersionDropdown: `//*[normalize-space()='OS version']/following::button[1]`,

  // Dynamic selectors for Falcon / Real Device
  selectManufacturer: (manufacturer: string) => `//*[@role='option']//span[text()='${manufacturer}']`,
  selectDeviceName: (device: string) => `//*[@role='option']//span[text()='${device}']`,

  // Dynamic locators
  createdConfig: (name: string) => `//*[text()='${name}']`,
  createdConfiguration: (name: string) => `//*[text()='${name}']`,
  configByName: (name: string) => `//span[text()='${name}']`,
  configThreeDots: (name: string) => `//*[text()='${name}']/following::button[@data-component='IconButton'][1]`,
  configurationOptionsMenu: (name: string) => `//*[text()='${name}']/following::button[@data-component='IconButton'][1]`,
  selectOS: (os: string) => `//*[@role='option']//span[text()='${os}']`,
  selectOsVersion: (version: string) => `//*[@role='option']//span[text()='${version}']`,
  selectBrowserVersion: (version: string) => `//*[@role='option']//span[text()='${version}']`,
  selectBrowser: (browser: string) => `//*[@role='option']//span[text()='${browser}']`,
  selectDevice: (device: string) => `//*[@role='option']//span[text()='${device}']`,
  selectResolution: (resolution: string) => `//*[@role='option']//span[text()='${resolution}']`,
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
