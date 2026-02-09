import {
  randomString,
  randomProjectName,
  randomTestCaseName,
  randomTestRunName,
  randomBuildName,
  randomFolderName,
  randomConfigName,
  randomMilestoneName,
  randomReportName,
  randomModuleName,
} from '../utils/random.helper.js';
import { RANDOM_LENGTH } from '../config/constants.js';

export function generateProjectData() {
  return {
    name: randomProjectName(),
    description: `Automation project description ${randomString(RANDOM_LENGTH.short)}`,
    tag: `tag_${randomString(RANDOM_LENGTH.short)}`,
  };
}

export function generateTestCaseData() {
  return {
    title: randomTestCaseName(),
    stepDescription: `Step description ${randomString(RANDOM_LENGTH.short)}`,
    tag: `tc_tag_${randomString(RANDOM_LENGTH.short)}`,
  };
}

export function generateTestRunData() {
  return {
    name: randomTestRunName(),
    description: `Test run description ${randomString(RANDOM_LENGTH.short)}`,
    tag: `tr_tag_${randomString(RANDOM_LENGTH.short)}`,
  };
}

export function generateBuildData() {
  return {
    name: randomBuildName(),
    tag: `build_tag_${randomString(RANDOM_LENGTH.short)}`,
  };
}

export function generateFolderData() {
  return {
    name: randomFolderName(),
    subfolderName: `Sub_${randomFolderName()}`,
  };
}

export function generateConfigData() {
  return {
    name: randomConfigName(),
  };
}

export function generateCustomFieldData() {
  return {
    title: `CustomField_${randomString(RANDOM_LENGTH.medium)}`,
    placeholder: `Placeholder_${randomString(RANDOM_LENGTH.short)}`,
    dropdownValue1: randomString(RANDOM_LENGTH.standard),
    dropdownValue2: randomString(RANDOM_LENGTH.standard),
  };
}

export function generateSystemValueData() {
  return {
    name: randomString(RANDOM_LENGTH.standard),
  };
}

export function generateMilestoneData() {
  return {
    name: randomMilestoneName(),
    description: `Milestone desc ${randomString(RANDOM_LENGTH.short)}`,
  };
}

export function generateReportData() {
  return {
    name: randomReportName(),
    description: `Report desc ${randomString(RANDOM_LENGTH.short)}`,
    updatedName: `Updated_${randomReportName()}`,
  };
}

export function generateModuleData() {
  return {
    name: randomModuleName(),
    description: `Module desc ${randomString(RANDOM_LENGTH.short)}`,
    tag: `mod_tag_${randomString(RANDOM_LENGTH.short)}`,
    step: `Module step ${randomString(RANDOM_LENGTH.short)}`,
  };
}
