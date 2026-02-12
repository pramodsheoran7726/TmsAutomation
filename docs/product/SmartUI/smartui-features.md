# SmartUI Features

> **Documentation**: [SmartUI Documentation](https://www.lambdatest.com/support/docs/smart-visual-regression-testing/)

---

## Overview

SmartUI is LambdaTest's comprehensive visual regression testing platform that enables teams to detect unintended visual changes in web and mobile applications. It is part of the TestMu AI product suite and integrates seamlessly with other LambdaTest products to provide end-to-end visual testing capabilities.

**Key Capabilities**:
- Visual regression testing across multiple browsers and viewports
- AI-powered comparison engines (Smart Ignore, Visual AI Agent)
- Design-to-code validation (Figma integration)
- PDF document comparison
- Component library testing (Storybook integration)
- Comprehensive CLI and SDK support

**Integration Points**:
- **KaneAI**: Visual testing can be integrated into KaneAI-authored test cases
- **Test Manager**: Test execution results can be tracked in Test Manager
- **HyperExecute**: Visual tests can be executed on HyperExecute infrastructure
- **Insights**: SmartUI widgets provide visual regression analytics in Insights dashboards

---

## 1. Core Capabilities

> **Learn more**: [SmartUI Getting Started](https://www.lambdatest.com/support/docs/smart-visual-regression-testing/)

### Visual Regression Testing

Visual regression testing compares the visual appearance of a user interface between different versions or builds to detect unintended visual changes.

**Key Features**:
- Pixel-level comparison
- AI-powered Smart Ignore for displacement differences
- Layout comparison mode
- Multi-browser and multi-viewport testing
- Full-page and viewport-specific capture

**How it Works**:
1. Capture baseline screenshots (first run)
2. Capture new screenshots on subsequent runs
3. Compare against baseline using selected comparison mode
4. Flag differences for review
5. Approve or reject changes
6. Update baseline when approved

**Use Cases**:
- **Web Application Testing**: Detect UI regressions in web apps
- **Mobile App Testing**: Validate mobile app visual consistency
- **Component Libraries**: Test UI components in isolation
- **Design Validation**: Compare implementations against designs

### Multi-Platform Support

SmartUI supports visual testing across multiple platforms and technologies.

**Supported Platforms**:
- **Web**: Chrome, Firefox, Safari, Edge browsers
- **Mobile**: iOS and Android native apps
- **Design Files**: Figma designs
- **Documents**: PDF files
- **Components**: Storybook component libraries

**Configuration**:
- Browser selection per snapshot or globally
- Viewport configuration (width x height)
- Device selection for mobile testing
- Orientation settings (portrait/landscape)

---

## 2. CLI Features

> **Learn more**: [SmartUI CLI Documentation](https://www.lambdatest.com/support/docs/smartui-cli/)

### Core Commands

SmartUI CLI provides comprehensive command-line tools for visual testing.

#### exec Command

**Purpose**: Execute existing test suites with SmartUI integration

**Syntax**:
```bash
npx smartui exec -- <your-test-command>
```

**Options**:
- `-P, --port <number>`: Custom port for local server (default: 49152)
- `--buildName <string>`: Specify build name
- `--fetch-results [filename]`: Fetch results and save to file
- `--scheduled <string>`: Schedule ID for scheduled runs
- `--show-render-errors`: Display render errors
- `--markBaseline`: Mark build as baseline
- `--baselineBranch <string>`: Compare against specific branch
- `--baselineBuild <string>`: Compare against specific build

**How it Works**:
1. CLI starts local Fastify server
2. SDKs in tests send snapshots to server
3. Server processes and uploads to cloud
4. Cloud renders across browsers/viewports
5. Results available in dashboard

**Example**:
```bash
npx smartui exec -- npm test
```

#### capture Command

**Purpose**: Capture screenshots of static URLs defined in configuration

**Syntax**:
```bash
npx smartui capture <urls-file> --config <config-file>
```

**Options**:
- `--config <filepath>`: Configuration file path
- `--buildName <string>`: Build name
- `--parallel <number>`: Parallel execution count
- `--force`: Force rebuild
- `--markBaseline`: Mark as baseline
- `--fetch-results <filename>`: Fetch results to file

**Configuration File** (`urls.json`):
```json
[
  {
    "name": "home-page",
    "url": "https://example.com",
    "waitForTimeout": 1000
  }
]
```

#### upload Command

**Purpose**: Upload existing screenshot files for comparison

**Syntax**:
```bash
npx smartui upload <directory-name>
```

**Options**:
- `--ignoreResolutions`: Ignore resolution in filename
- `--fileExtension <extensions>`: File extensions to include
- `--stripExtension`: Remove extension from snapshot name
- `--ignorePattern <patterns>`: Patterns to ignore

#### upload-figma Commands

**Purpose**: Upload and compare Figma designs

**Commands**:
- `npx smartui upload-figma <designs.json>`: Upload Figma designs only
- `npx smartui upload-figma-web <designs.json>`: Compare Figma with web
- `npx smartui upload-figma-app <designs.json>`: Compare Figma with mobile apps

**Requirements**:
- `FIGMA_TOKEN` environment variable
- `designs.json` configuration file

#### upload-pdf Command

**Purpose**: Upload PDF files for visual comparison

**Syntax**:
```bash
npx smartui upload-pdf <file-or-directory>
```

**Options**:
- `--pdfNames <names>`: Specific PDF names to upload

#### merge Command

**Purpose**: Merge builds or branches

**Syntax**:
```bash
npx smartui merge branch --source <source> --target <target>
npx smartui merge build --source <source> --target <target>
```

#### Server Management Commands

**exec:start**: Start SmartUI server independently
```bash
npx smartui exec:start
```

**exec:stop**: Stop server and finalize build
```bash
npx smartui exec:stop
```

**exec:ping**: Check if server is running
```bash
npx smartui exec:ping
```

### Configuration System

SmartUI uses JSON configuration files for different use cases.

#### Configuration File Types

1. **`.smartui.json`**: Main SDK configuration (web/mobile)
2. **`urls.json`**: Static URL capture configuration
3. **`designs.json`**: Figma design configuration

#### Configuration Creation

```bash
# Create main config
npx smartui config:create .smartui.json

# Create web static config
npx smartui config:create-web-static urls.json

# Create Figma config
npx smartui config:create-figma designs.json

# Create web Figma config
npx smartui config:create-web-figma figma-web.json

# Create app Figma config
npx smartui config:create-app-figma figma-app.json
```

#### Configuration Options

**Web Configuration**:
```json
{
  "web": {
    "browsers": ["chrome", "firefox", "safari", "edge"],
    "viewports": [[1920, 1080], [1440, 900]]
  }
}
```

**Mobile Configuration**:
```json
{
  "mobile": {
    "devices": ["iPhone 12", "Samsung Galaxy S21"],
    "fullPage": true,
    "orientation": "portrait"
  }
}
```

**Global Options**:
- `waitForTimeout`: Wait time before capture
- `waitForPageRender`: Wait for page render
- `enableJavaScript`: Enable/disable JavaScript
- `customCSS`: Custom CSS file path or inline CSS
- `smartIgnore`: Enable Smart Ignore (project-level)
- `ignoreDOM`: Elements to ignore in comparison
- `selectDOM`: Elements to include in comparison
- `lazyLoadConfiguration`: Lazy loading settings
- `tunnel`: Tunnel configuration for local testing

### Authentication Strategies

#### Strategy A: Manual (CI/CD)

**Environment Variables**:
```bash
export PROJECT_TOKEN="project-id#token-value"
export LT_USERNAME="your-username"  # Optional
export LT_ACCESS_KEY="your-access-key"  # Optional
```

**Use Case**: CI/CD pipelines, automated workflows

#### Strategy B: Interactive (Local Development)

**Command**:
```bash
npx smartui init
```

**Process**:
1. REPL prompts for credentials
2. Stores credentials locally
3. Future commands use stored credentials

**Use Case**: Local development, quick setup

---

## 3. SDK Features

> **Learn more**: [SmartUI SDK Documentation](https://www.lambdatest.com/support/docs/smartui-selenium-java-sdk/)

### Framework Support

SmartUI provides SDKs for all major test automation frameworks.

#### Web Frameworks

| Framework | Languages | SDK Package |
|-----------|-----------|-------------|
| **Selenium** | Java, Python, JavaScript, C#, Ruby | `@lambdatest/smartui-selenium-*` |
| **Playwright** | JavaScript, Python, Java | `@lambdatest/smartui-playwright-*` |
| **Cypress** | JavaScript | `@lambdatest/smartui-cypress` |
| **Puppeteer** | JavaScript | `@lambdatest/smartui-puppeteer` |
| **TestCafe** | JavaScript | `@lambdatest/smartui-testcafe` |
| **WebdriverIO** | JavaScript | `@lambdatest/smartui-wdio` |

#### Mobile Frameworks

| Framework | Languages | SDK Package |
|-----------|-----------|-------------|
| **Appium** | Java, Node.js | `@lambdatest/smartui-appium-*` |

### Integration Approaches

#### SDK Approach

**Process**:
1. Install SDK package
2. Import SDK in test code
3. Call `smartuiSnapshot()` at checkpoints
4. Run tests with `npx smartui exec -- <test-command>`

**Example (Playwright)**:
```javascript
const { smartuiSnapshot } = require('@lambdatest/smartui-playwright');

test('homepage visual test', async ({ page }) => {
  await page.goto('https://example.com');
  await smartuiSnapshot(page, 'Homepage');
});
```

**Command**:
```bash
npx smartui exec -- npx playwright test
```

#### Hooks Approach

**Process**:
1. Add SmartUI capabilities to test configuration
2. Tests run normally (no `smartui exec` needed)
3. SmartUI integration happens automatically

**Use Case**: TypeScript/JavaScript/Java/Python/Ruby/C#/WebdriverIO/Appium

**Example (Selenium Java)**:
```java
capabilities.setCapability("smartUI.baseline", true);
capabilities.setCapability("smartUI.project", "MyProject");
```

### Snapshot Options

SDKs support various options for fine-grained control.

#### ignoreDOM

Ignore specific elements from comparison:
```javascript
await smartuiSnapshot(page, 'Homepage', {
  ignoreDOM: {
    id: ['dynamic-id'],
    class: ['ad-banner', 'cookie-consent'],
    cssSelector: ['.dynamic-content'],
    xpath: ['//div[@class="timestamp"]'],
    coordinates: ['100,200,300,400']
  }
});
```

#### selectDOM

Include only specific elements:
```javascript
await smartuiSnapshot(page, 'Homepage', {
  selectDOM: {
    cssSelector: ['.main-content', '.header']
  }
});
```

#### ignoreType

Comparison mode selection:
```javascript
await smartuiSnapshot(page, 'Homepage', {
  ignoreType: ['layout']  // Layout comparison mode
});
```

**Modes**:
- `['layout']`: Layout comparison (structure only)
- Default: Pixel-to-pixel comparison

#### customCSS

Inject test-only CSS:
```javascript
await smartuiSnapshot(page, 'Homepage', {
  customCSS: './test-styles.css'
  // or
  customCSS: 'body { background: white; }'
});
```

#### web/mobile Options

Override global configuration:
```javascript
await smartuiSnapshot(page, 'Homepage', {
  web: {
    browsers: ['chrome', 'firefox'],
    viewports: [[1920, 1080]]
  }
});
```

---

## 4. Advanced Features

> **Learn more**: [Smart Ignore](https://www.lambdatest.com/support/docs/smartui-smartignore/), [Root Cause Analysis](https://www.lambdatest.com/support/docs/smartui-root-cause-analysis/)

### Smart Ignore

**Purpose**: AI-powered displacement difference ignoring

**How it Works**:
- Distinguishes between content changes and content displacement
- Hides differences from elements that shifted position but didn't change
- Reduces false positives from layout shifts

**Configuration**:
- **Project Level**: Enable in project settings (`smartIgnore: true` in config)
- **Per Snapshot**: Can be enabled/disabled per snapshot

**Use Cases**:
- Content Management Systems
- E-commerce platforms with dynamic content
- Pages with frequently changing content

**Limitations**:
- Element ignoring not supported (use `ignoreDOM` instead)
- Different from Layout Comparison mode

### Layout Comparison Mode

**Purpose**: Structure-focused comparison ignoring colors and content

**How it Works**:
- Validates layout structure and element positions
- Ignores color differences
- Ignores content/text changes
- Focuses on structural integrity

**Configuration**:
```javascript
await smartuiSnapshot(page, 'Homepage', {
  ignoreType: ['layout']
});
```

**Use Cases**:
- Layout regression testing
- Responsive design validation
- Component structure testing

### Visual AI Agent

**Purpose**: AI-powered visual change detection with human-readable summaries

**Features**:
- Context-aware analysis
- Human-readable change summaries
- Noise reduction
- Focus on significant changes

**Usage**:
1. Run visual tests
2. View Visual AI summary in dashboard
3. Review AI-generated insights
4. Use for change analysis

### Root Cause Analysis (RCA)

**Purpose**: Identify exact causes of visual differences

**Features**:
- **DOM Diff Analysis**: Identifies specific DOM element changes
- **CSS Property Changes**: Pinpoints exact CSS modifications
- **Layout Shift Detection**: Identifies elements that moved
- **Text Modification Tracking**: Detects content changes
- **Attribute Change Detection**: Tracks element attribute modifications

**Access**: Available in SmartUI dashboard when viewing visual diffs

**Integration**: MCP Server provides AI-driven debugging insights

### Smart Comments

**Purpose**: Collaboration on visual test results

**Features**:
- Add comments to screenshots
- Mention team members
- Discuss changes in context
- Track review discussions

**Usage**: Available in SmartUI dashboard comparison view

### Bulk Operations

**Purpose**: Batch approval/rejection of screenshots

**Features**:
- Select multiple screenshots
- Bulk approve/reject
- Bulk move to baseline
- Efficient workflow for large builds

**Usage**: Available in SmartUI dashboard

### Custom CSS Injection

**Purpose**: Apply test-only styles during snapshot capture

**Configuration**:
- **File Path**: `customCSS: "./styles.css"`
- **Inline CSS**: `customCSS: "body { background: white; }"`
- **Per Snapshot**: Override global config per snapshot

**Use Cases**:
- Hide dynamic elements
- Force specific UI states
- Stabilize animations
- Test-specific styling

### Dynamic Content Handling

**Purpose**: Handle dynamic elements that change between test runs

#### Lazy Loading Configuration

```json
{
  "lazyLoadConfiguration": {
    "enabled": true,
    "scrollStep": 250,
    "scrollDelay": 300,
    "maxScrolls": 50,
    "jumpBackToTop": true
  }
}
```

#### Sticky Elements

Handle sticky headers/footers that may cause false positives.

#### Video Handling

Freeze or hide video elements during capture.

### Shadow DOM Support

**Purpose**: Test content encapsulated within web components

**Capability**: Traverses open shadow roots to capture encapsulated content

**Limitations**:
- Closed shadow roots may have limitations
- Some percy-specific CSS features may not work within shadow DOM

**Use Cases**:
- Web component testing
- Custom element validation
- Modern web application testing

---

## 5. Baseline Management

> **Learn more**: [Baseline Management](https://www.lambdatest.com/support/docs/smartui-baseline-management/)

### Baseline Types

#### Project Baseline

**Definition**: Default comparison point set in project settings

**Usage**: All builds compare against project baseline unless overridden

**Configuration**: Set in Project Settings → Baseline

#### Branch Baseline

**Definition**: Branch-specific baseline for Git-integrated projects

**Usage**: Compare against specific branch's latest approved build

**Configuration**:
```bash
npx smartui --baselineBranch "main" exec -- npm test
```

**Use Cases**:
- Feature branch compares against main
- Release branch compares against staging
- Hotfix compares against production

#### Build Baseline

**Definition**: Specific build marked as baseline

**Usage**: Compare against a known good build

**Configuration**:
```bash
npx smartui --baselineBuild "build-name" exec -- npm test
```

**Use Cases**:
- Compare against specific version
- Compare against production build
- Version-based comparison

#### Dynamic Baseline

**Definition**: Baseline specified during test execution

**Usage**: Flexible baseline selection per test run

**Configuration**: Via CLI flags (`--baselineBranch`, `--baselineBuild`)

### Smart Git Strategy

**Purpose**: Intelligent branch-based baseline management

**Enable**:
```bash
export SMART_GIT=true
```

**Behavior**:
- Each branch compares against its own latest approved version
- New branches automatically approved
- Independent branch tracking
- Fallback to default behavior if not configured

**Use Cases**:
- Feature development workflows
- Multiple parallel feature branches
- Independent branch evolution

### Baseline Operations

#### Mark as Baseline

**Command**:
```bash
npx smartui --markBaseline exec -- npm test
```

**Effect**: Current build becomes new baseline for future comparisons

#### Merge Baselines

**Command**:
```bash
# Merge by branch
npx smartui merge branch --source "feature" --target "main"

# Merge by build
npx smartui merge build --source "build-123" --target "build-456"
```

**Effect**: Merges approved changes from source to target baseline

---

## 6. Integration Features

> **Learn more**: [GitHub App Integration](https://www.lambdatest.com/support/docs/smartui-github-app-integration/), [CI/CD Integration](https://www.lambdatest.com/support/docs/smartui-with-github-actions/)

### GitHub App Integration

**Purpose**: Automated visual testing on pull requests

**Features**:
- PR status checks
- Automatic test execution on PR creation
- Comment integration with results
- Merge gate functionality

**Setup**:
1. Install GitHub App from Integrations page
2. Configure repository access
3. Add GitHub capability to test configuration
4. Tests run automatically on PR creation

**Configuration**:
```javascript
capabilities.setCapability("github", true);
```

### GitLab Integration

**Purpose**: Visual testing with GitLab merge requests

**Approaches**:
- **Hooks Approach**: SmartUI Hooks for web and mobile testing
- **Exec Approach**: `smartui exec` in GitLab CI pipeline

**Configuration** (GitLab CI):
```yaml
visual-tests:
  only:
    - merge_requests
  script:
    - npx smartui exec --buildName "MR $CI_MERGE_REQUEST_IID" -- npm test
```

### CI/CD Platform Support

SmartUI integrates with all major CI/CD platforms:

- **GitHub Actions**: Native integration via GitHub App
- **GitLab CI**: YAML configuration support
- **Jenkins**: Pipeline script integration
- **CircleCI**: Config file integration
- **Azure DevOps**: Pipeline task integration
- **Bitbucket Pipelines**: YAML configuration
- **Buildkite**: Pipeline steps
- **Semaphore**: Workflow configuration
- **Travis CI**: Config file support
- **Netlify**: Build hook integration

**Common Pattern**:
```yaml
- name: Run Visual Tests
  run: npx smartui exec -- npm test
  env:
    PROJECT_TOKEN: ${{ secrets.SMARTUI_PROJECT_TOKEN }}
```

### Slack Integration

**Purpose**: Receive visual test notifications in Slack

**Features**:
- Build completion notifications
- Status change alerts
- Webhook-based integration

**Setup**:
1. Configure webhook URL in SmartUI project settings
2. Set notification preferences
3. Receive real-time updates in Slack channels

### Jira Integration

**Purpose**: Link visual test results to Jira issues

**Features**:
- Issue linking from dashboard
- Status updates
- Test result tracking

**Usage**: Available in SmartUI dashboard

---

## Integration with Other Products

### Integration with KaneAI

**How it Works**:
- Visual testing can be integrated into KaneAI-authored test cases
- SmartUI snapshots can be added to KaneAI test steps
- Results tracked in unified dashboard

**Integration Points**:
- Add visual checkpoints in KaneAI test authoring
- Visual results appear alongside functional test results

### Integration with Test Manager

**How it Works**:
- Visual test execution can be tracked in Test Manager
- Build results linked to test cases
- Unified reporting across functional and visual tests

**Integration Points**:
- Test execution tracking
- Result correlation
- Reporting integration

### Integration with HyperExecute

**How it Works**:
- Visual tests can be executed on HyperExecute infrastructure
- Leverages HyperExecute's parallel execution capabilities
- Scalable visual test execution

**Integration Points**:
- Test execution infrastructure
- Parallel test runs
- Resource management

### Integration with Insights

**How it Works**:
- SmartUI widgets provide visual regression analytics
- Cross-product dashboards include SmartUI metrics
- AI-powered insights for visual test data

**Integration Points**:
- SmartUI widgets in Insights dashboards
- Visual regression trends
- Build status analytics

---

## Best Practices

### Configuration Management

- **Start with Defaults**: Use `config:create` to generate initial configs
- **Version Control**: Commit configuration files to repository
- **Environment-Specific**: Use different configs for dev/staging/prod
- **Documentation**: Document custom configurations

### Baseline Management

- **Initial Baseline**: Thoroughly review first baseline before approval
- **Branch Strategy**: Use Smart Git for feature branch workflows
- **Regular Updates**: Update baselines after major releases
- **Documentation**: Document baseline update reasons

### Test Organization

- **Meaningful Names**: Use descriptive snapshot names
- **Logical Grouping**: Organize snapshots by feature/flow
- **Consistent Patterns**: Follow naming conventions
- **Documentation**: Document test coverage

### Performance Optimization

- **Selective Testing**: Use `selectDOM` to test specific areas
- **Ignore Dynamic Content**: Use `ignoreDOM` for known dynamic elements
- **Parallel Execution**: Use `--parallel` for faster capture
- **Resource Caching**: Enable `useGlobalCache` for faster processing

### CI/CD Integration

- **Status Checks**: Configure PR status checks for merge gates
- **Fast Feedback**: Use parallel execution for faster results
- **Error Handling**: Configure retry logic for transient failures
- **Notifications**: Set up Slack/email notifications

---

## Limitations & Considerations

### Current Limitations

- **SmartUI Widgets**: Drill-downs not available yet (BETA)
- **Storybook**: Limited to component-level testing
- **PDF**: Page-by-page comparison only
- **Figma**: Requires valid FigMA_TOKEN
- **Shadow DOM**: Closed shadow roots may have limitations

### Platform Considerations

- **Node.js Version**: CLI requires Node.js v20.3+ for versions >= v4.x.x
- **Network Requirements**: Requires internet connection for cloud processing
- **File Size Limits**: Large DOM snapshots may take longer to process
- **Concurrent Builds**: Limited by subscription tier

### Comparison Mode Considerations

- **Pixel-to-Pixel**: Most sensitive, may have false positives
- **Smart Ignore**: Best for dynamic content, may miss subtle changes
- **Layout Comparison**: Ignores colors/content, structure-focused only

---

## Common Use Cases

### Use Case 1: Web Application Visual Regression Testing

**Scenario**: Detect UI regressions in a web application after code changes

**Steps**:
1. Create SmartUI project in dashboard
2. Install CLI: `npm install -g @lambdatest/smartui-cli`
3. Set `PROJECT_TOKEN` environment variable
4. Create `.smartui.json` configuration
5. Integrate SDK into existing test suite
6. Run: `npx smartui exec -- npm test`
7. Review results in dashboard
8. Approve valid changes, reject regressions

**Outcome**: Automated visual regression detection with team collaboration

### Use Case 2: Figma Design Validation

**Scenario**: Ensure coded implementation matches Figma designs

**Steps**:
1. Get Figma Personal Access Token
2. Create `designs.json` with Figma file tokens and component IDs
3. Set `FIGMA_TOKEN` environment variable
4. Run: `npx smartui upload-figma-web designs.json`
5. View comparisons in dashboard
6. Identify design-to-code discrepancies
7. Fix implementation to match designs

**Outcome**: Automated design-to-code validation workflow

### Use Case 3: Component Library Testing

**Scenario**: Visual testing of Storybook component library

**Steps**:
1. Install: `npm install -g @lambdatest/smartui-storybook`
2. Configure Storybook with `buildStoriesJson: true`
3. Create `.smartui.json` with storybook config
4. Run: `smartui storybook <url> --config .smartui.json`
5. Review component comparisons
6. Approve component changes

**Outcome**: Comprehensive component-level visual testing

### Use Case 4: CI/CD Integration

**Scenario**: Automated visual testing on every pull request

**Steps**:
1. Install GitHub App from Integrations page
2. Configure repository access
3. Add GitHub capability to test configuration
4. Create PR
5. GitHub App automatically runs visual tests
6. PR status check shows results
7. Review and approve in dashboard
8. Merge when all checks pass

**Outcome**: Automated visual testing integrated into development workflow

---

## Troubleshooting

### Common Issues

#### Issue 1: Authentication Failed

**Symptoms**: CLI shows authentication error

**Cause**: Invalid or missing PROJECT_TOKEN

**Resolution**:
1. Verify PROJECT_TOKEN in dashboard (Project Settings)
2. Check environment variable is set correctly
3. Ensure token format: `project-id#token-value`
4. Try interactive login: `npx smartui init`

#### Issue 2: Screenshot Not Appearing

**Symptoms**: Snapshot captured but not visible in dashboard

**Cause**: Build not finalized or processing incomplete

**Resolution**:
1. Wait for build processing to complete
2. Check build status in dashboard
3. Verify snapshot was sent to server
4. Check server logs for errors

#### Issue 3: Configuration Errors

**Symptoms**: CLI fails with configuration validation errors

**Cause**: Invalid JSON or missing required fields

**Resolution**:
1. Validate JSON syntax
2. Use `config:create` to generate valid configs
3. Check required fields in documentation
4. Verify file paths are correct

#### Issue 4: Build Execution Failures

**Symptoms**: Build fails or times out

**Cause**: Network issues, large snapshots, or processing errors

**Resolution**:
1. Check network connectivity
2. Reduce snapshot size or count
3. Increase timeout values
4. Check cloud service status

#### Issue 5: CI/CD Integration Issues

**Symptoms**: Tests not running in CI/CD pipeline

**Cause**: Missing environment variables or incorrect configuration

**Resolution**:
1. Verify PROJECT_TOKEN is set in CI secrets
2. Check command syntax in CI config
3. Ensure Node.js version is compatible
4. Review CI logs for errors

---

## Additional Resources

### Official Documentation

- **Main Documentation**: https://www.lambdatest.com/support/docs/smart-visual-regression-testing/
- **CLI Documentation**: https://www.lambdatest.com/support/docs/smartui-cli/
- **SDK Documentation**: https://www.lambdatest.com/support/docs/smartui-selenium-java-sdk/
- **API Documentation**: https://www.lambdatest.com/support/api-doc/
- **Platform URL**: https://smartui.lambdatest.com/

### Related Documentation (in this repo)

- [entities.md](entities.md) - SmartUI entity models
- [workflows.md](workflows.md) - SmartUI workflows
- [architecture-and-apis.md](architecture-and-apis.md) - SmartUI APIs and architecture
- [state-transitions.md](state-transitions.md) - SmartUI state machines
- [data-models.md](data-models.md) - SmartUI data models

### Support

- **Email**: support@lambdatest.com
- **Documentation**: https://www.lambdatest.com/support/docs/
- **Community**: https://community.lambdatest.com/

---

## Changelog

### Version 4.x
- Node.js v20.3+ requirement
- Enhanced Smart Ignore capabilities
- Improved baseline management
- MCP Server integration for RCA

---

**Note**: This documentation is part of the TestMu AI product context. For market analysis and competitive positioning, see [VISUAL_REGRESSION_TESTING_GUIDE.md](../VISUAL_REGRESSION_TESTING_GUIDE.md).

---

## Crawled Documentation Reference

> **See [SmartUIMain.md](SmartUIMain.md) for the complete crawled documentation index with 41 feature pages.**

### Available Crawled Documentation Categories

| Category | Key Documents |
|----------|---------------|
| **Getting Started** | [Running Your First Project](smartui-running-your-first-project.md), [Visual Regression Testing](smart-visual-regression-testing.md) |
| **CLI** | [CLI Reference](smartui-cli-complete-reference.md), [Exec Command](smartui-cli-exec.md), [Static URLs](smartui-cli.md), [Upload](smartui-cli-upload.md) |
| **Figma Integration** | [Figma CLI](smartui-cli-figma.md), [Figma-Web](smartui-cli-figma-web.md), [Figma-App](smartui-cli-figma-app.md) |
| **PDF Comparison** | [PDF Testing](smartui-pdf-comparison.md), [PDF API](smartui-pdf-api-upload.md), [PDF CLI](smartui-pdf-cli-upload.md) |
| **Storybook** | [Storybook Integration](smart-ui-storybook.md), [Git Branching Strategy](smartui-git-branching-strategy.md) |
| **SDK Integration** | [SDK Config Options](smartui-sdk-config-options.md), [Testcafe SDK](smartui-testcafe-sdk.md), [WebdriverIO SDK](smartui-wdio-sdk.md) |
| **Baseline Management** | [Baseline Management](smartui-baseline-management.md), [Smart Git Strategy](smartui-smart-git-strategy.md), [Approval Workflow](smartui-approval-workflow-guide.md) |
| **Advanced Features** | [Smart Ignore](smartui-smartignore.md), [Layout Testing](smartui-layout-testing.md), [Custom CSS](smartui-custom-css.md), [DOM Options](html-dom-smartui-options.md) |
| **Dynamic Content** | [Handle Dynamic Data](smartui-handle-dynamic-data.md), [Lazy Loading](smartui-handle-lazy-loading.md), [Sticky Elements](smartui-handle-sticky-elements.md), [Videos](smartui-handle-videos.md) |
| **CI/CD Integration** | [GitHub Actions](smartui-with-github-actions.md), [GitLab](smartui-with-gitlab.md), [Bitbucket](smartui-with-bitbucket.md), [GitHub App](smartui-github-app-integration.md) |
| **Configuration** | [Project Settings](smartui-project-settings.md), [Build Options](smart-ui-build-options.md), [Environment Variables](smartui-cli-env-variables.md) |
| **Troubleshooting** | [Troubleshooting Guide](smartui-troubleshooting-guide.md), [Tunnel Setup](smartui-sdk-tunnel.md) |
