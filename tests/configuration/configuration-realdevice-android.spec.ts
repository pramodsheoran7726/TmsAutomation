import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';
import { randomString } from '../../src/utils/random.helper.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';

test.describe('Configuration - Real Device Android', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Configuration Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a Real Device Android configuration and delete it', async ({ page, configPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/configurations');

    const configName = `RealDevice_Android_${randomString(RANDOM_LENGTH.medium)}`;
    await configPage.createRealDeviceConfiguration({
      name: configName,
      osType: 'Android',
      osVersion: '14.0',
      manufacturer: 'Samsung',
      device: 'Galaxy S24',
    });

    await configPage.verifyConfigurationExists(configName);
    await configPage.editConfiguration(configName);
    await configPage.deleteConfiguration(configName);
    await configPage.verifyConfigurationDeleted(configName);
  });
});
