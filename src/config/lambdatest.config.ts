import { EnvConfig } from './env.config.js';

// ── Types ──────────────────────────────────────────────────────
export type LTBrowser = 'Chrome' | 'MicrosoftEdge' | 'pw-firefox' | 'pw-webkit';
export type LTPlatform = 'Windows 10' | 'Windows 11' | 'macOS Ventura' | 'macOS Sonoma' | 'Linux';
export type LTRunProfile = 'smoke' | 'regression' | 'debug';

export interface LTCapabilities {
  browserName: LTBrowser;
  browserVersion: string;
  'LT:Options': {
    platform: LTPlatform;
    build: string;
    name: string;
    user: string;
    accessKey: string;
    network: boolean;
    video: boolean;
    console: boolean;
    tunnel: boolean;
    tunnelName?: string;
    idleTimeout: number;
    resolution: string;
  };
}

export interface LTProfile {
  browser: LTBrowser;
  browserVersion: string;
  platform: LTPlatform;
  video: boolean;
  network: boolean;
  console: boolean;
  idleTimeout: number;
  resolution: string;
}

// ── Browser/OS Profiles ────────────────────────────────────────
const PROFILES: Record<string, LTProfile> = {
  'chrome-linux': {
    browser: 'Chrome',
    browserVersion: 'latest',
    platform: 'Linux',
    video: true,
    network: true,
    console: true,
    idleTimeout: 300,
    resolution: '1920x1080',
  },
  'chrome-win': {
    browser: 'Chrome',
    browserVersion: 'latest',
    platform: 'Windows 11',
    video: true,
    network: true,
    console: true,
    idleTimeout: 300,
    resolution: '1920x1080',
  },
  'edge-win': {
    browser: 'MicrosoftEdge',
    browserVersion: 'latest',
    platform: 'Windows 11',
    video: true,
    network: true,
    console: true,
    idleTimeout: 300,
    resolution: '1920x1080',
  },
  'chrome-mac': {
    browser: 'Chrome',
    browserVersion: 'latest',
    platform: 'macOS Sonoma',
    video: true,
    network: true,
    console: true,
    idleTimeout: 300,
    resolution: '1920x1080',
  },
  'firefox-win': {
    browser: 'pw-firefox',
    browserVersion: 'latest',
    platform: 'Windows 11',
    video: true,
    network: false,
    console: true,
    idleTimeout: 300,
    resolution: '1920x1080',
  },
};

// ── Run-Profile Overrides ──────────────────────────────────────
// Merged on top of the browser profile to tune captures per run type
const RUN_OVERRIDES: Record<LTRunProfile, Partial<LTProfile>> = {
  smoke: {
    video: false,
    network: false,
    idleTimeout: 120,
  },
  regression: {
    video: true,
    network: true,
    console: true,
    idleTimeout: 300,
  },
  debug: {
    video: true,
    network: true,
    console: true,
    idleTimeout: 600,
  },
};

// ── Public API ─────────────────────────────────────────────────

/** Get a named browser profile with run-type overrides applied */
export function getProfile(
  profileName: string = 'chrome-win',
  runProfile: LTRunProfile = 'regression',
): LTProfile {
  const base = PROFILES[profileName];
  if (!base) {
    throw new Error(
      `Unknown LT profile "${profileName}". Available: ${Object.keys(PROFILES).join(', ')}`,
    );
  }
  return { ...base, ...RUN_OVERRIDES[runProfile] };
}

/** List all available profile names */
export function getAvailableProfiles(): string[] {
  return Object.keys(PROFILES);
}

/** Build the full LT:Options capability object */
export function buildCapabilities(
  profile: LTProfile,
  opts?: { buildSuffix?: string; testName?: string },
): LTCapabilities {
  const env = EnvConfig.testEnv;
  const buildId = process.env.LT_BUILD_ID
    ?? process.env.HE_BUILD_ID
    ?? process.env.GITHUB_RUN_NUMBER
    ?? Date.now().toString();
  const suffix = opts?.buildSuffix ?? buildId;

  return {
    browserName: profile.browser,
    browserVersion: profile.browserVersion,
    'LT:Options': {
      platform: profile.platform,
      build: `TMS-E2E-${env}-${profile.browser}-${suffix}`,
      name: opts?.testName ?? `TMS ${env} ${profile.browser}/${profile.platform}`,
      user: EnvConfig.ltUsername,
      accessKey: EnvConfig.ltAccessKey,
      network: profile.network,
      video: profile.video,
      console: profile.console,
      tunnel: false,
      idleTimeout: profile.idleTimeout,
      resolution: profile.resolution,
    },
  };
}

/** Generate the CDP WebSocket URL for Playwright's connectOptions */
export function getCdpEndpoint(
  profileName: string = 'chrome-win',
  runProfile: LTRunProfile = 'regression',
  testName?: string,
): string {
  const profile = getProfile(profileName, runProfile);
  const capabilities = buildCapabilities(profile, testName ? { testName } : undefined);
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
}

// ── Remote Execution Constants ─────────────────────────────────

/** Inflated timeouts for remote grid (network latency overhead) */
export const REMOTE_TIMEOUTS = {
  test: 180_000,
  expect: 25_000,
  action: 45_000,
  navigation: 90_000,
} as const;

/** Worker count for remote grid — limited by LT plan concurrency */
export const REMOTE_WORKERS = 5;
