import { test as base } from '@playwright/test';
import { TmsApi } from '../api/tms.api.js';
import { EnvConfig } from '../config/env.config.js';
import type { ApiSetup } from './tms.fixture.js';
import { createApiSetup } from './api-setup.factory.js';

type ApiFixtures = {
  tmsApi: TmsApi;
  apiSetup: ApiSetup;
  authToken: string;
};

export const test = base.extend<ApiFixtures>({
  authToken: async ({}, use) => {
    await use(EnvConfig.authToken);
  },

  tmsApi: async ({ request }, use) => {
    await use(new TmsApi(request));
  },

  apiSetup: async ({ tmsApi }, use) => {
    const { setup, cleanup } = createApiSetup(tmsApi);
    await use(setup);
    await cleanup();
  },
});

export { expect } from '@playwright/test';
