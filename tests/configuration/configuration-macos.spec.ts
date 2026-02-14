import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';

test.describe('Configuration - macOS', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Configuration Management' },
    { type: 'severity', description: 'normal' },
    { type: 'scenario', description: 'PT-14300525' },
  ],
}, () => {
  test('should create a macOS configuration, edit and delete it', async ({ page, configPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/configurations');

    await configPage.createConfiguration({
      name: configPage.configurationName,
      osType: 'macOS',
      osVersion: 'macOS Monterey',
      browser: 'Safari',
      resolution: '1920x1080',
    });

    await configPage.verifyConfigurationExists(configPage.configurationName);
    await configPage.editConfiguration(configPage.configurationName);
    await configPage.deleteConfiguration();
    await configPage.verifyConfigurationDeleted();
  });
});
