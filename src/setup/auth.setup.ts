import { test as setup, expect } from '@playwright/test';
import { EnvConfig } from '../config/env.config.js';

const AUTH_FILE = '.auth/user.json';

setup('authenticate via API', async ({ page }) => {
  const loginUrl = `${EnvConfig.authUrl}/api/login`;

  // 1. Call login API
  const response = await page.request.post(loginUrl, {
    data: {
      email: EnvConfig.authEmail,
      password: EnvConfig.authPassword,
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': EnvConfig.baseUrl,
      'Referer': `${EnvConfig.baseUrl}/login`,
    },
  });

  expect(response.ok(), `Login API failed: ${response.status()} ${response.statusText()}`).toBeTruthy();

  // 2. Navigate to accounts page to let cookies settle on the domain
  await page.goto(`${EnvConfig.baseUrl}/dashboard`, { waitUntil: 'domcontentloaded' });

  // 3. Save the authenticated state (cookies + localStorage)
  await page.context().storageState({ path: AUTH_FILE });
});
