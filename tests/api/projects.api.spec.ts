import { test, expect } from '../../src/fixtures/api.fixture.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';
import crypto from 'crypto';

function randomName(prefix = 'API-Project') {
  return `${prefix}-${crypto.randomBytes(RANDOM_LENGTH.short).toString('hex')}`;
}

test.describe('Projects API', {
  tag: ['@api', '@smoke'],
  annotation: [
    { type: 'feature', description: 'Projects API' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should create a project', async ({ apiSetup }) => {
    const name = randomName();
    const project = await apiSetup.createProject(name, 'API test description');
    expect(project.id).toBeTruthy();
    expect(project.name).toBe(name);
  });

  test('should list projects', async ({ tmsApi, authToken, apiSetup }) => {
    const name = randomName();
    await apiSetup.createProject(name);

    const { status, body } = await tmsApi.listProjects(authToken);
    expect(status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('should get a project by ID', async ({ tmsApi, authToken, apiSetup }) => {
    const name = randomName();
    const project = await apiSetup.createProject(name);

    const { status, body } = await tmsApi.getProject(authToken, project.id);
    expect(status).toBe(200);
    expect(body.name).toBe(name);
  });

  test('should update a project', async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName());
    const updatedName = randomName('Updated');

    const { status, body } = await tmsApi.updateProject(authToken, project.id, {
      name: updatedName,
    });
    expect(status).toBe(200);
    expect(body.name).toBe(updatedName);
  });

  test('should delete a project', async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName());

    const { status } = await tmsApi.deleteProject(authToken, project.id);
    expect(status).toBe(200);
  });

  test('should return 404 for non-existent project', {
    tag: ['@regression'],
  }, async ({ tmsApi, authToken }) => {
    const { status } = await tmsApi.getProject(authToken, 'non-existent-id-999999');
    expect(status).toBe(404);
  });

  test('should reject project creation with empty name', {
    tag: ['@regression'],
  }, async ({ tmsApi, authToken }) => {
    const { status } = await tmsApi.createProject(authToken, '');
    expect(status).toBeGreaterThanOrEqual(400);
  });
});
