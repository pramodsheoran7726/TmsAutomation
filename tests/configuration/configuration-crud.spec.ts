import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';

test.describe('Configuration CRUD', {
  tag: ['@smoke', '@regression'],
  annotation: [
    { type: 'feature', description: 'Configuration Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a Windows web browser configuration', async ({ page, configPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/configurations');
    await configPage.createWindowsConfiguration();
    await configPage.verifyConfigurationExists(configPage.configurationName);
  });

  test('should create and delete a configuration', async ({ page, configPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/configurations');
    await configPage.createWindowsConfiguration();
    await configPage.deleteConfiguration();
  });
});
