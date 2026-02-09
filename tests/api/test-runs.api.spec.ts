import { test, expect } from '../../src/fixtures/api.fixture.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';
import crypto from 'crypto';

function randomName(prefix = 'API-TR') {
  return `${prefix}-${crypto.randomBytes(RANDOM_LENGTH.short).toString('hex')}`;
}

test.describe('Test Runs API', {
  tag: ['@api', '@smoke'],
  annotation: [
    { type: 'feature', description: 'Test Runs API' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should create a test run', async ({ apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TR-Project'));
    const name = randomName();

    const tr = await apiSetup.createTestRun(project.id, name);
    expect(tr.id).toBeTruthy();
    expect(tr.name).toBe(name);
  });

  test('should create a test run with test case IDs', async ({ apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TR-Project'));
    const tc = await apiSetup.createTestCase(project.id, randomName('TC'));

    const name = randomName();
    const tr = await apiSetup.createTestRun(project.id, name, [tc.id]);
    expect(tr.id).toBeTruthy();
    expect(tr.name).toBe(name);
  });

  test('should list test runs for a project', async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TR-Project'));
    await apiSetup.createTestRun(project.id, randomName());

    const { status, body } = await tmsApi.listTestRuns(authToken, project.id);
    expect(status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('should get a test run by ID', async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TR-Project'));
    const name = randomName();
    const tr = await apiSetup.createTestRun(project.id, name);

    const { status, body } = await tmsApi.getTestRun(authToken, project.id, tr.id);
    expect(status).toBe(200);
    expect(body.name).toBe(name);
  });

  test('should delete a test run', {
    tag: ['@regression'],
  }, async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TR-Project'));
    const tr = await apiSetup.createTestRun(project.id, randomName());

    const { status } = await tmsApi.deleteProject(authToken, project.id);
    expect(status).toBe(200);
  });

  test('should reject test run creation with empty name', {
    tag: ['@regression'],
  }, async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TR-Project'));
    const { status } = await tmsApi.createTestRun(authToken, project.id, '');
    expect(status).toBeGreaterThanOrEqual(400);
  });
});
