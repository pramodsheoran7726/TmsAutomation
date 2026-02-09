import { test, expect } from '../../src/fixtures/api.fixture.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';
import crypto from 'crypto';

function randomName(prefix = 'API-TC') {
  return `${prefix}-${crypto.randomBytes(RANDOM_LENGTH.short).toString('hex')}`;
}

test.describe('Test Cases API', {
  tag: ['@api', '@smoke'],
  annotation: [
    { type: 'feature', description: 'Test Cases API' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should create a test case under a project', async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TC-Project'));
    const title = randomName();

    const tc = await apiSetup.createTestCase(project.id, title);
    expect(tc.id).toBeTruthy();
    expect(tc.title).toBe(title);
  });

  test('should list test cases for a project', async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TC-Project'));
    await apiSetup.createTestCase(project.id, randomName());

    const { status, body } = await tmsApi.listTestCases(authToken, project.id);
    expect(status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('should get a test case by ID', async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TC-Project'));
    const title = randomName();
    const tc = await apiSetup.createTestCase(project.id, title);

    const { status, body } = await tmsApi.getTestCase(authToken, project.id, tc.id);
    expect(status).toBe(200);
    expect(body.title).toBe(title);
  });

  test('should reject test case creation with missing title', {
    tag: ['@regression'],
  }, async ({ tmsApi, authToken, apiSetup }) => {
    const project = await apiSetup.createProject(randomName('TC-Project'));
    const { status } = await tmsApi.createTestCase(authToken, project.id, '');
    expect(status).toBeGreaterThanOrEqual(400);
  });
});
