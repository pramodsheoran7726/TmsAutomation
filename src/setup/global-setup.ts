import { request } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { EnvConfig } from '../config/env.config.js';

const AUTH_FILE = '.auth/user.json';

/**
 * Global setup: authenticates via API and saves storage state.
 * Runs once before all tests — no browser needed, not counted as a test.
 */
async function globalSetup() {
  // Generate a stable build ID if not provided — runs once before workers fork,
  // so all workers inherit the same value via process.env
  if (!process.env.LT_BUILD_ID) {
    process.env.LT_BUILD_ID = process.env.HE_BUILD_ID
      || process.env.GITHUB_RUN_NUMBER
      || Date.now().toString();
  }

  // Ensure .auth directory exists
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const ctx = await request.newContext({
    baseURL: EnvConfig.baseUrl,
  });

  const loginUrl = `${EnvConfig.authUrl}/api/login`;

  // 1. Call login API
  const response = await ctx.post(loginUrl, {
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

  if (!response.ok()) {
    throw new Error(`Login API failed: ${response.status()} ${response.statusText()}`);
  }

  // 2. Hit the dashboard to settle cookies on the accounts domain
  await ctx.get(`${EnvConfig.baseUrl}/dashboard`);

  // 3. Capture storage state (cookies) from the API context
  const state = await ctx.storageState();
  await ctx.dispose();

  // 4. Save as env var — Playwright propagates env vars from globalSetup to all workers.
  //    This avoids the chicken-and-egg problem where Playwright validates storageState
  //    file path BEFORE globalSetup runs, causing 0 tests if the file is missing/stale.
  process.env.AUTH_STATE = Buffer.from(JSON.stringify(state)).toString('base64');

  // 5. Also write file for debugging convenience (not used by tests)
  fs.writeFileSync(AUTH_FILE, JSON.stringify(state, null, 2));
  console.log(`Auth saved to env var AUTH_STATE and ${AUTH_FILE}`);
}

export default globalSetup;
