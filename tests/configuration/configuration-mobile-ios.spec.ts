import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';

test.describe('Configuration - Mobile iOS', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Configuration Management' },
    { type: 'severity', description: 'normal' },
    { type: 'scenario', description: 'PT-14300526/PT-14300528' },
  ],
}, () => {
  test('should create an iOS mobile configuration and delete it', async ({ page, configPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/configurations');

    await configPage.createConfiguration({
      name: configPage.configurationName,
      osType: 'iOS',
      osVersion: '17.0',
      browser: 'Safari',
      browserVersion: 'Latest',
    });

    await configPage.verifyConfigurationExists(configPage.configurationName);
    await configPage.deleteConfiguration();
    await configPage.verifyConfigurationDeleted();
  });
});
