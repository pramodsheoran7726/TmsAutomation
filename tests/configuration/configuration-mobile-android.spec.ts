import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';

test.describe('Configuration - Mobile Android', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Configuration Management' },
    { type: 'severity', description: 'normal' },
    { type: 'scenario', description: 'PT-14300527/PT-14300529' },
  ],
}, () => {
  test('should create an Android mobile configuration and delete it', async ({ page, configPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/configurations');

    await configPage.createConfiguration({
      name: configPage.configurationName,
      osType: 'Android',
      osVersion: '14.0',
      browser: 'Chrome',
      browserVersion: 'Latest',
    });

    await configPage.verifyConfigurationExists(configPage.configurationName);
    await configPage.deleteConfiguration();
    await configPage.verifyConfigurationDeleted();
  });
});
