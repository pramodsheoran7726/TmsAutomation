import { RANDOM_LENGTH } from '../config/constants.js';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function randomString(length: number = RANDOM_LENGTH.standard): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
}

export function randomEmail(): string {
  return `test_${randomString(RANDOM_LENGTH.medium)}@automation.test`;
}

export function randomProjectName(): string {
  return `AutoProject_${randomString(RANDOM_LENGTH.medium)}`;
}

export function randomTestCaseName(): string {
  return `AutoTC_${randomString(RANDOM_LENGTH.medium)}`;
}

export function randomTestRunName(): string {
  return `AutoTR_${randomString(RANDOM_LENGTH.medium)}`;
}

export function randomBuildName(): string {
  return `AutoBuild_${randomString(RANDOM_LENGTH.medium)}`;
}

export function randomFolderName(): string {
  return `AutoFolder_${randomString(RANDOM_LENGTH.medium)}`;
}

export function randomConfigName(): string {
  return `AutoConfig_${randomString(RANDOM_LENGTH.medium)}`;
}

export function randomMilestoneName(): string {
  return `AutoMilestone_${randomString(RANDOM_LENGTH.medium)}`;
}

export function randomReportName(): string {
  return `AutoReport_${randomString(RANDOM_LENGTH.medium)}`;
}

export function randomModuleName(): string {
  return `AutoModule_${randomString(RANDOM_LENGTH.medium)}`;
}
