#!/usr/bin/env node
const { execSync } = require('child_process');

const args = process.argv.slice(2);
let envInput = 'stage'; // default

// Extract --env <value> from args
const envIndex = args.indexOf('--env');
if (envIndex !== -1) {
  envInput = args[envIndex + 1] || 'stage';
  args.splice(envIndex, 2);
}

// Parse env input: stage, eu-stage, prod, eu-prod
const ENV_MAP = {
  stage:    { env: 'stage', project: 'us-chromium' },
  'eu-stage': { env: 'stage', project: 'eu-chromium' },
  prod:     { env: 'prod',  project: 'us-chromium' },
  'eu-prod':  { env: 'prod',  project: 'eu-chromium' },
};

const resolved = ENV_MAP[envInput];
if (!resolved) {
  console.error(`\n  Unknown env: "${envInput}". Valid values: ${Object.keys(ENV_MAP).join(', ')}\n`);
  process.exit(1);
}

// Auto-add --project if not already specified and running "test" command
const hasProject = args.includes('--project');
const isTestCmd = args[0] === 'test';
if (isTestCmd && !hasProject) {
  args.push('--project', resolved.project);
}

const playwrightArgs = args.join(' ');
const command = `TEST_ENV=${resolved.env} npx playwright ${playwrightArgs}`;

console.log(`\n  env: ${envInput} (TEST_ENV=${resolved.env}, project=${resolved.project})\n  cmd: npx playwright ${playwrightArgs}\n`);

try {
  execSync(command, { stdio: 'inherit', cwd: process.cwd() });
} catch {
  process.exit(1);
}
