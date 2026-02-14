import { test as base, chromium } from '@playwright/test';
import { EnvConfig } from '../config/env.config.js';
import { getCdpEndpoint, type LTRunProfile } from '../config/lambdatest.config.js';
import { ToastComponent, DeleteDialogComponent, SearchComponent } from '../pages/components/index.js';
import { NavigationPage } from '../pages/navigation/navigation.page.js';
import { ProjectPage } from '../pages/project/project.page.js';
import { TestCasePage } from '../pages/test-case/test-case.page.js';
import { TestRunPage } from '../pages/test-run/test-run.page.js';
import { BuildPage } from '../pages/build/build.page.js';
import { FolderPage } from '../pages/folder/folder.page.js';
import { ConfigurationPage } from '../pages/configuration/configuration.page.js';
import { SettingsPage } from '../pages/settings/settings.page.js';
import { CsvImportPage } from '../pages/csv-import/csv-import.page.js';
import { DatasetPage } from '../pages/dataset/dataset.page.js';
import { MilestonePage } from '../pages/milestone/milestone.page.js';
import { ReportPage } from '../pages/report/report.page.js';
import { InsightsPage } from '../pages/insights/insights.page.js';
import { JiraIntegrationPage } from '../pages/jira-integration/jira-integration.page.js';
import { SdkPage } from '../pages/sdk/sdk.page.js';
import { AutomationPage } from '../pages/automation/automation.page.js';
import { KaneaiPage } from '../pages/kaneai/kaneai.page.js';
import { ModulePage } from '../pages/module/module.page.js';
import { TmsApi } from '../api/tms.api.js';
import { JiraApi } from '../api/jira.api.js';
import { createApiSetup } from './api-setup.factory.js';

/**
 * Decode auth cookies from the AUTH_STATE env var set by globalSetup.
 * This avoids the storageState file dependency that caused 0-tests issues.
 */
function getAuthState(): { cookies: Array<{ name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: 'Strict' | 'Lax' | 'None' }>; origins: Array<{ origin: string; localStorage: Array<{ name: string; value: string }> }> } {
  const encoded = process.env.AUTH_STATE;
  if (!encoded) {
    throw new Error('AUTH_STATE env var not set. Did globalSetup run?');
  }
  return JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
}

export type ApiSetup = {
  createProject(name: string, description?: string): Promise<{ id: string; name: string }>;
  createTestCase(projectId: string, title: string): Promise<{ id: string; title: string }>;
  createTestRun(projectId: string, name: string, testCaseIds?: string[]): Promise<{ id: string; name: string }>;
  deleteProject(projectId: string): Promise<void>;
};

type TmsFixtures = {
  nav: NavigationPage;
  projectPage: ProjectPage;
  testCasePage: TestCasePage;
  testRunPage: TestRunPage;
  buildPage: BuildPage;
  folderPage: FolderPage;
  configPage: ConfigurationPage;
  settingsPage: SettingsPage;
  csvImportPage: CsvImportPage;
  datasetPage: DatasetPage;
  milestonePage: MilestonePage;
  reportPage: ReportPage;
  insightsPage: InsightsPage;
  jiraPage: JiraIntegrationPage;
  sdkPage: SdkPage;
  automationPage: AutomationPage;
  kaneaiPage: KaneaiPage;
  modulePage: ModulePage;
  tmsApi: TmsApi;
  jiraApi: JiraApi;
  apiSetup: ApiSetup;
  toast: ToastComponent;
  deleteDialog: DeleteDialogComponent;
  search: SearchComponent;
  /** Auto-creates project + opens it; auto-deletes project on teardown */
  projectOnly: void;
  /** Auto-creates project + test case; auto-deletes project on teardown */
  projectWithTestCase: void;
  /** Auto-creates project + folder + test case inside folder; auto-deletes project on teardown */
  projectWithTestCaseInFolder: void;
};

export const test = base.extend<TmsFixtures>({
  // Auto-navigate to TMS before every test
  // In remote mode: creates a per-test LT session with the test name in capabilities
  page: async ({ page, context }, use, testInfo) => {
    if (process.env.TEST_MODE !== 'remote') {
      // Inject auth cookies from env var into the browser context
      const state = getAuthState();
      await context.addCookies(state.cookies);
      await page.goto(EnvConfig.tmsBaseUrl, { waitUntil: 'domcontentloaded' });
      await use(page);
      return;
    }

    // Remote mode: connect to LT grid with per-test session name
    const testName = testInfo.titlePath.slice(1).join(' > ');
    const profile = process.env.LT_PROFILE ?? 'chrome-win';
    const runProfile = (process.env.LT_RUN_PROFILE ?? 'regression') as LTRunProfile;
    const wsEndpoint = getCdpEndpoint(profile, runProfile, testName);

    const browser = await chromium.connect(wsEndpoint);
    const remoteContext = await browser.newContext({
      storageState: getAuthState(),
      baseURL: testInfo.project.use.baseURL,
    });
    const remotePage = await remoteContext.newPage();
    await remotePage.goto(EnvConfig.tmsBaseUrl, { waitUntil: 'domcontentloaded' });

    await use(remotePage);

    // Mark the LT session with pass/fail status so the dashboard reflects results
    const status = testInfo.status === 'passed' ? 'passed' : 'failed';
    const remark = testInfo.status === 'passed'
      ? `Test passed in ${testInfo.duration}ms`
      : `Test failed: ${testInfo.error?.message?.slice(0, 200) ?? 'unknown error'}`;

    await remotePage.evaluate(
      () => { },
      `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status, remark } })}`,
    );

    await remoteContext.close();
    await browser.close();
  },
  nav: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  projectPage: async ({ page }, use) => {
    await use(new ProjectPage(page));
  },
  testCasePage: async ({ page }, use) => {
    await use(new TestCasePage(page));
  },
  testRunPage: async ({ page }, use) => {
    await use(new TestRunPage(page));
  },
  buildPage: async ({ page }, use) => {
    await use(new BuildPage(page));
  },
  folderPage: async ({ page }, use) => {
    await use(new FolderPage(page));
  },
  configPage: async ({ page }, use) => {
    await use(new ConfigurationPage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  csvImportPage: async ({ page }, use) => {
    await use(new CsvImportPage(page));
  },
  datasetPage: async ({ page }, use) => {
    await use(new DatasetPage(page));
  },
  milestonePage: async ({ page }, use) => {
    await use(new MilestonePage(page));
  },
  reportPage: async ({ page }, use) => {
    await use(new ReportPage(page));
  },
  insightsPage: async ({ page }, use) => {
    await use(new InsightsPage(page));
  },
  jiraPage: async ({ page }, use) => {
    await use(new JiraIntegrationPage(page));
  },
  sdkPage: async ({ page }, use) => {
    await use(new SdkPage(page));
  },
  automationPage: async ({ page }, use) => {
    await use(new AutomationPage(page));
  },
  kaneaiPage: async ({ page }, use) => {
    await use(new KaneaiPage(page));
  },
  modulePage: async ({ page }, use) => {
    await use(new ModulePage(page));
  },
  toast: async ({ page }, use) => {
    await use(new ToastComponent(page));
  },
  deleteDialog: async ({ page }, use) => {
    await use(new DeleteDialogComponent(page));
  },
  search: async ({ page }, use) => {
    await use(new SearchComponent(page));
  },
  tmsApi: async ({ request }, use) => {
    await use(new TmsApi(request));
  },
  jiraApi: async ({ request }, use) => {
    await use(new JiraApi(request));
  },
  apiSetup: async ({ tmsApi }, use) => {
    const { setup, cleanup } = createApiSetup(tmsApi);
    await use(setup);
    await cleanup();
  },
  projectOnly: async ({ projectPage }, use) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await use();
    await projectPage.deleteProject();
  },
  projectWithTestCase: async ({ projectPage, testCasePage }, use) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await testCasePage.createTestCase();
    await use();
    await projectPage.deleteProject();
  },
  projectWithTestCaseInFolder: async ({ projectPage, testCasePage, folderPage }, use) => {
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject();
    await folderPage.createFolder();
    await folderPage.openFolder(folderPage.folderName);
    await testCasePage.createTestCase();
    await use();
    await projectPage.deleteProject();
  },
});

export { expect } from '@playwright/test';
