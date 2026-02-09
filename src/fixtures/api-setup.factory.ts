import { EnvConfig } from '../config/env.config.js';
import { TmsApi } from '../api/tms.api.js';
import type { ApiSetup } from './tms.fixture.js';

/**
 * Creates an ApiSetup instance with auto-cleanup of created projects.
 * Shared between tms.fixture.ts and api.fixture.ts to avoid duplication.
 */
export function createApiSetup(tmsApi: TmsApi): { setup: ApiSetup; cleanup: () => Promise<void> } {
  const createdProjectIds: string[] = [];
  const authToken = EnvConfig.authToken;

  const setup: ApiSetup = {
    async createProject(name, description?) {
      const { body } = await tmsApi.createProject(authToken, name, description);
      const id = String((body as Record<string, unknown>).id ?? (body as Record<string, unknown>).project_id ?? '');
      createdProjectIds.push(id);
      return { id, name };
    },
    async createTestCase(projectId, title) {
      const { body } = await tmsApi.createTestCase(authToken, projectId, title);
      const id = String((body as Record<string, unknown>).id ?? (body as Record<string, unknown>).test_case_id ?? '');
      return { id, title };
    },
    async createTestRun(projectId, name, testCaseIds?) {
      const { body } = await tmsApi.createTestRun(authToken, projectId, name, testCaseIds);
      const id = String((body as Record<string, unknown>).id ?? (body as Record<string, unknown>).test_run_id ?? '');
      return { id, name };
    },
    async deleteProject(projectId) {
      await tmsApi.deleteProject(authToken, projectId);
    },
  };

  const cleanup = async () => {
    for (const id of createdProjectIds) {
      if (id) {
        await tmsApi.deleteProject(authToken, id).catch(() => {});
      }
    }
  };

  return { setup, cleanup };
}
