import { EnvConfig } from '@config/env.config.js';
import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Project CRUD', {
  tag: ['@smoke', '@regression'],
  annotation: [
    { type: 'feature', description: 'Project Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should create a project', async ({ page, projectPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/projects');
    await projectPage.createProjectWithTagDescription();
    await projectPage.editProject();
    await projectPage.deleteProject();
    await projectPage.verifyProjectDeleted();
  });
});
