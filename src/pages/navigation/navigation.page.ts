import { type Page, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { TIMEOUTS } from '../../config/constants.js';

const Nav = {
  hamburgerSidebar: `//button[@class=" ltch-top-nav-hamburger-menu"]`,
  projectSidebar: `//span[@class="ltch-product-name"]`,
  projectList: `(//span[span[text()='Test Manager']])[1]`,
  tmsSidebar: `//span[@class='ltch-product-name' and text()='Test Manager']`,
  tmsVisible: `//span[text()='Test Manager']`,
  tmsCtaFalcon: `//div[@aria-label='Test Manager']`,
  tmsCtaRealDevice: `//div[@id="test-case-manager"]`,
  sidebarSettings: `//span[text()='Settings']`,
  automationSidebar: `//span[text()='Automation']`,
  kaneaiSidebar: `(//a[@aria-label="KaneAI"])`,
  moduleSidebar: `//a[@aria-label='Modules']`,
  testCaseNav: `//span[text()='Test Cases']`,
  testRunNav: `//span[text()='Test Runs']`,
  buildNav: `//a[text()='Builds']`,
  insightPageNav: `//a[span[text()='Insights']]`,
  settingStage: `//a[text()='System Fields']`,
  reportsTab: `//a[span[text()='Reports']]`,
} as const;

export class NavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openTMS(): Promise<void> {
    await test.step('Open TMS from sidebar navigation', async () => {
      if (await this.isVisible(Nav.hamburgerSidebar, TIMEOUTS.medium)) {
        await this.loc(Nav.hamburgerSidebar).click();
      }
      await this.loc(Nav.projectList).click();
      await this.loc(Nav.tmsVisible).waitFor({ state: 'visible' });
    });
  }

  async navigateToTestCases(): Promise<void> {
    await this.loc(Nav.testCaseNav).click();
  }

  async navigateToTestRuns(): Promise<void> {
    await this.loc(Nav.testRunNav).click();
  }

  async navigateToBuilds(): Promise<void> {
    await this.loc(Nav.buildNav).click();
  }

  async navigateToSettings(): Promise<void> {
    await this.loc(Nav.sidebarSettings).click();
  }

  async navigateToSystemFields(): Promise<void> {
    await this.loc(Nav.settingStage).click();
  }

  async navigateToInsights(): Promise<void> {
    await this.loc(Nav.insightPageNav).click();
  }

  async navigateToAutomation(): Promise<void> {
    await this.loc(Nav.automationSidebar).click();
  }

  async navigateToKaneAI(): Promise<void> {
    await this.loc(Nav.kaneaiSidebar).click();
  }

  async navigateToModules(): Promise<void> {
    await test.step('Navigate to Modules from sidebar', async () => {
      const modulesLink = this.loc(Nav.moduleSidebar);
      const isVisible = await modulesLink.isVisible().catch(() => false);
      if (!isVisible) {
        await this.loc(Nav.tmsSidebar).click();
        await modulesLink.waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      }
      await modulesLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async navigateToReports(): Promise<void> {
    await this.loc(Nav.reportsTab).click();
  }

  async openTMSFalcon(): Promise<void> {
    await this.loc(Nav.tmsCtaFalcon).click();
  }
}
