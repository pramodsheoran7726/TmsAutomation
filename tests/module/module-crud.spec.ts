import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Module CRUD', {
  tag: ['@regression', '@module'],
  annotation: [
    { type: 'feature', description: 'Module Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a module from module page', async ({ projectPage, nav, modulePage }) => {
    // Create a project first, then navigate to modules and link it
    await projectPage.createProjectWithTagDescription();
    await nav.navigateToModules();
    await modulePage.createModuleWithDetails(
      ['Step 1: Login', 'Step 2: Navigate'],
      projectPage.projectName,
    );
    await modulePage.verifyModuleCreated();
  });

  test('should create and update module version', async ({ projectPage, nav, modulePage }) => {
    // Create a project first, then navigate to modules and link it
    await projectPage.createProjectWithTagDescription();
    await nav.navigateToModules();
    await modulePage.createModuleWithDetails(
      ['Step 1: Login', 'Step 2: Navigate'],
      projectPage.projectName,
    );
    await modulePage.verifyModuleCreated();
    const updatedName = `Module_Updated_${Date.now()}`;
    await modulePage.editModule(updatedName);
    await modulePage.verifyModuleCreated(updatedName);
  });

  test('should insert a module into test case', async ({ projectPage, nav, testCasePage, modulePage }) => {
    // Create project -> go to modules -> create module linked to project -> go back and insert
    await projectPage.createProjectWithTagDescription();
    await nav.navigateToModules();
    await modulePage.createModuleWithDetails(
      ['Step 1: Login', 'Step 2: Navigate'],
      projectPage.projectName,
    );
    await modulePage.verifyModuleCreated();

    // Open the project and create a test case
    await projectPage.openProject();
    await testCasePage.createTestCase();

    // Open test case and insert the module
    await testCasePage.openTestCase();
    await modulePage.insertModule();

    // Re-open project, re-open test case, insert module again
    await projectPage.openProject();
    await testCasePage.openTestCase();
    await modulePage.insertModule();
  });
});
