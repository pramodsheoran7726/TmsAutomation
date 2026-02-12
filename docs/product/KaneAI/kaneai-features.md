# KaneAI Core Features

> **Documentation**:
> - [Getting Started with KaneAI](https://www.lambdatest.com/support/docs/getting-started-with-kane-ai)
> - [Why We Need KaneAI](https://www.lambdatest.com/support/docs/why-we-need-kane-ai)
> - [Author Your First Desktop Browser Test](https://www.lambdatest.com/support/docs/author-your-first-desktop-browser-test)
> - [Author Your First Mobile Browser Test](https://www.lambdatest.com/support/docs/author-your-first-mobile-browser-test)
> - [Author Your First Mobile App Test](https://www.lambdatest.com/support/docs/author-your-first-mobile-app-test)

---

## 1. Test Authoring Capabilities

> **Learn more**: [Web Test Writing Guidelines](https://www.lambdatest.com/support/docs/kane-ai-web-test-writing-guidelines)

### Natural Language Instructions
- Write tests in plain English
- AI interprets and converts instructions to executable steps
- Supports both structured and adaptive authoring modes

### Manual Interaction Mode

> **Learn more**: [Manual Interaction in KaneAI](https://www.lambdatest.com/support/docs/kaneai-manual-interaction)

- Record user actions as test steps
- Click, type, navigate, and scroll actions captured
- Toggle between manual and AI-guided modes seamlessly

#### Recording Manual Interactions - Platform Support

| Platform | Manual Interaction Recording | Notes |
|----------|------------------------------|-------|
| Desktop Browser | Fully supported | All browsers |
| Mobile App (Android) | Fully supported | All orientations |
| Mobile App (iOS) | Partially supported | **Not supported** when device orientation is set to Landscape |
| Mobile Browser | **Not supported** | Agent never enters Recording state |

**Important Limitations**:
- **iOS Landscape Mode**: When a mobile app session is launched with device orientation set as Landscape for iOS devices, recording manual interactions is not supported yet. Portrait and Auto orientations work normally.
- **Mobile Browser**: Mobile browser authoring does not support recording manual interactions at all. The agent never enters a Recording state for mobile browser sessions. Only natural language instructions and slash commands are available.

### Hybrid Authoring
- Combine AI suggestions with manual recordings
- Best of both worlds: speed and precision
- Switch between modes during same session

### Multi-Tab/Window Support
- Test complex workflows across browser contexts
- Handle pop-ups, new windows, and multiple tabs
- Maintain context across different browser instances

### Drag & Drop Support

> **Learn more**: [Drag & Drop in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-drag-drop)

- Visual element interaction testing
- Supports drag-and-drop UI components
- Validates drag-and-drop functionality

## 2. Advanced Testing Features

### API Testing

> **Learn more**: [API Testing in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-api-testing)

- REST API testing with validation
- Support for all HTTP methods (GET, POST, PUT, DELETE, etc.)
- Request/response validation
- Header and parameter configuration
- Authentication support

### Database Testing

> **Learn more**: [Database Testing in KaneAI](https://www.lambdatest.com/support/docs/kaneai-database)

- SQL/NoSQL query execution and validation
- Support for multiple database types
- Result set validation
- Data-driven testing from database

#### Supported Databases
- **Relational Databases**: MySQL, PostgreSQL, Oracle, SQL Server
- **NoSQL Databases**: MongoDB, Cassandra
- **Cloud Databases**:
  - Amazon RDS
  - Azure SQL Database
  - **Google Cloud Spanner**: Enterprise-grade distributed relational database
    - Horizontal scalability with SQL semantics
    - Global consistency and high availability
    - Connect to GCP Spanner instances for data validation
    - Execute Spanner SQL queries in test flows
    - Validate data-driven test scenarios using Spanner data

#### Database Testing Features
- Execute SQL queries during test execution
- Validate query results with assertions
- Store query results in variables
- Use database values in test flows
- Connect to private databases via LambdaTest Tunnel
- Secure credential management via secrets

### Network Assertions

> **Learn more**: [Network Assertions in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-network-assertions)

- Validate network calls, headers, and responses
- Monitor API calls during test execution
- Assert on network traffic patterns
- Capture and validate webhooks

### JavaScript Execution

> **Learn more**: [JavaScript Execution in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-javascript-execution)

- Custom JS snippets within tests
- Execute browser-side JavaScript
- Manipulate DOM elements
- Advanced scripting capabilities

### File Upload/Download

> **Learn more**: [File Upload and Download in KaneAI](https://www.lambdatest.com/support/docs/kaneai-upload-and-download-files)

- Handle file operations in tests
- Upload files to web applications
- Download and validate files
- Support for multiple file formats

### TOTP Authentication

> **Learn more**: [TOTP Authentication in KaneAI](https://www.lambdatest.com/support/docs/kaneai-totp)

- Built-in 2FA/MFA support
- Time-based one-time password generation
- Seamless authentication flow testing
- No external authenticator apps needed

#### Platform Support for TOTP

| Platform | TOTP Support |
|----------|-------------|
| Desktop Browser (Web) | Fully supported |
| Mobile Browser | Fully supported |
| Mobile App (Android & iOS) | Fully supported |

TOTP authentication testing is available across all three platforms, enabling comprehensive MFA testing for web applications, mobile websites, and native mobile applications.

### Bug Suggestion Generation

When test authoring is performed using generative/adaptive mode and an assertion fails, KaneAI automatically generates a bug suggestion to streamline defect reporting.

#### How It Works
1. **Trigger**: Assertion fails during generative step execution
2. **AI Analysis**: System analyzes the failure context
3. **Bug Suggestion Generated**: Includes:
   - **Actual Outcome**: What actually happened (captured from execution)
   - **Expected Outcome**: What was expected (from assertion definition)
   - **Screenshot**: Visual evidence at the point of failure
   - **Step Context**: The instruction and surrounding steps
   - **Environment Details**: Browser/device, URL, timestamp

#### Bug Suggestion Contents
```
Bug Suggestion
├── Title: Auto-generated descriptive title
├── Actual Outcome: [What happened]
├── Expected Outcome: [What should have happened]
├── Screenshot: [Captured at failure point]
├── Steps to Reproduce: [From test steps]
├── Environment: [Browser, OS, device details]
└── Severity Suggestion: [Based on assertion type]
```

#### Integration with Issue Trackers
- **Direct Bug Creation**: Create bug directly in integrated tools:
  - Jira
  - Azure DevOps
  - Other supported project management tools
- **Pre-filled Fields**: Bug details auto-populated from suggestion
- **Attachment Support**: Screenshot automatically attached
- **Bidirectional Linking**: Bug linked back to test case

#### Use Cases
- Rapid defect logging during exploratory testing
- Automated bug reporting in CI/CD pipelines
- Consistent bug documentation across team
- Reduced manual effort in defect reporting

## 3. Mobile Testing Capabilities

> **Learn more**: [Mobile App Test Writing Guidelines](https://www.lambdatest.com/support/docs/kane-ai-app-test-writing-guidelines)

### Native App Testing

> **Learn more**: [Mobile App Capabilities in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-mobile-app-capabilities)

- Android and iOS app testing
- Real device cloud access
- Native element interaction
- App-specific gestures and actions

### Mobile Browser Testing
- Responsive web testing on real devices
- Mobile Safari and Chrome support
- Touch gestures and mobile interactions
- Viewport and orientation testing

### Advanced Mobile Features

#### Accessibility Support in KaneAI Mobile

> **Learn more**: [Accessibility Support in KaneAI Mobile](https://www.testmu.ai/support/docs/kaneai-mobile-app-accessibility/)

Validate accessibility features and ensure your mobile apps are inclusive and compliant with accessibility standards.

- **Accessibility Labels**: Verify that UI elements have proper accessibility labels
- **Accessibility Roles**: Validate that elements have correct accessibility roles assigned
- **Assistive Behaviors**: Test behaviors that support assistive technologies
- **Screen Reader Compatibility**: Ensure app works correctly with screen readers
- **WCAG Compliance**: Validate compliance with accessibility guidelines
- **Use Cases**:
  - Test button labels for visually impaired users
  - Validate form field accessibility hints
  - Ensure proper focus order for keyboard navigation
  - Test VoiceOver (iOS) and TalkBack (Android) compatibility
- **Platform Support**: Both Android and iOS mobile apps

#### Biometric Authentication Testing
- Fingerprint testing
- Face ID testing
- Biometric simulation on real devices

#### Camera Image Injection
- Mock camera input with images
- Test camera-dependent features
- Upload custom images as camera feed

#### Video Injection
- Mock video input
- Test video capture features
- Upload custom videos as camera feed

#### Screenshot Block Bypass
- Test apps with screenshot restrictions
- Capture screenshots for debugging
- Bypass security restrictions for testing

#### Deeplink Support

> **Learn more**: [Deeplink Support in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-deeplink-support)

- Test deeplink handling
- Validate deeplink navigation
- Cross-app navigation testing

#### Geolocation Testing

> **Learn more**:
> - [Geolocation, Tunnel, and Proxy in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-geolocation-tunnel-proxy)
> - [GPS Support in KaneAI Mobile](https://www.testmu.ai/support/docs/kaneai-gps-location/)

- GPS mocking and location simulation
- Location-based testing on mobile devices
- Test location-dependent features
- Change GPS coordinates during test
- **GPS Support in KaneAI Mobile**:
  - Simulate real-world locations in mobile app tests
  - Validate location-based user flows
  - Test navigation, ride-sharing, food delivery, and other location-aware apps
  - Configure custom GPS coordinates during test execution
  - Support for both Android and iOS platforms

## 4. Test Organization & Reusability

### Modules

> **Learn more**:
> - [Modules in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-modules)
> - [Module Versions and Enhancements](https://www.lambdatest.com/support/docs/kaneai-modules-versions-and-enhancement)

Modules are reusable collections of test steps that can be shared across both KaneAI-authored and Manual Test Steps type test cases. They enable efficient test maintenance by centralizing common workflows.

#### Module Characteristics
- Reusable collection of test steps
- Share common workflows across multiple test cases
- Can be associated with multiple projects
- Project-level and organization-level modules
- Cannot nest modules (modules cannot reference other modules)
- Each module contains test steps with expected outcomes per step
- Expected outcomes are irrelevant for KaneAI test cases (only used in Manual Test Steps)

#### Module Creation Methods

**1. Direct Creation from Modules Page**
- Created at `kaneai.lambdatest.com/modules`
- Modules not yet authored in KaneAI
- Contains only basic test steps and expected outcomes in string format
- Cannot contain API, variables, parameters, DB, or JS type steps
- Compatible with both Manual Test Steps and KaneAI test cases

**2. Creation from KaneAI Agent**
- Created during KaneAI session by pausing agent
- Select consecutive test steps (authored or in queue) to convert to module
- Can include advanced step types:
  - Variables and parameters
  - Secrets (e.g., `{{secrets.org.lt_cloud_ops_password}}`)
  - API calls
  - Database queries
  - JavaScript execution
- When agent is paused, users can:
  - Edit module steps
  - Add steps in between
  - These edits create a new module version

#### Module Versioning
- Track changes to modules over time
- Maintain multiple versions
- Version updates occur when:
  - Test steps are modified
  - Expected outcomes are changed
  - Other module fields are updated
- Roll back to previous versions
- Impact analysis for module changes
- Update test cases to latest module version

#### Module Bulk Update & Module Delete

> **Learn more**: [Module Bulk Update in KaneAI](https://www.testmu.ai/support/docs/kaneai-bulk-module-update/)

**Note**: This feature is behind a feature flag and will be gradually rolled out.

**Bulk Update Capabilities**:
- Update multiple modules simultaneously
- Make changes to module properties across multiple modules at once
- Reduce time spent on repetitive module updates
- Ensure consistency across module updates
- Track which test cases are affected by module changes

**Module Delete Capabilities**:
- Safely delete unused modules from your repository
- Impact analysis before deletion
- View all test cases using a module before deletion
- Prevent accidental deletion of modules in use
- Clean up deprecated or obsolete modules
- Organization-wide module cleanup

**Use Cases**:
- Update tags across multiple related modules
- Change ownership of modules in bulk
- Archive obsolete modules across projects
- Standardize module metadata organization-wide
- Clean up modules after project completion

### Variables & Parameters

> **Learn more**:
> - [Variables and Parameters in KaneAI](https://www.lambdatest.com/support/docs/kaneai-variables-and-parameters)
> - [Using Variables in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-using-variables)
> - [Using Parameters in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-using-parameters)
> - [Smart Variables in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-smart-variables)
> - [Using Datasets in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-using-datasets)

#### Variable Types
- **Local Variables**: Test-specific, session-bound
- **Global Variables**: Organization-wide access
- **Environment Variables**: Environment-specific values
- **Smart Variables**: System-generated dynamic values
- **Parameters**: Runtime configuration values

#### Variable Scopes
- Local (test-level)
- Global (organization-level)
- Environment-specific
- Parameter-based (data-driven testing)

#### Variable Usage
- Reference with `{{variable_name}}` syntax
- Can reference other variables
- Persist flag for local to global promotion
- Dynamic value substitution

### Environments
- Multi-environment test execution
- Environment-specific variable mappings
- Configuration overrides per environment
- Seamless environment switching
- Staging, production, and custom environments

### Secrets Management

> **Learn more**: [Secrets in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-secrets)

- Secure credential storage using HashiCorp Vault
- User-level and organization-level secrets
- Encrypted at rest (AES-256)
- Reference with `{{secrets.x}}` syntax
- Audit trail for secret access
- Never exposed in logs or reports

### Smart Variables
- Context-aware dynamic values
- System-generated values
- Common smart variables:
  - `{{smart.current_timestamp}}`
  - `{{smart.random_email}}`
  - `{{smart.session_id}}`
  - `{{smart.random_string}}`
  - `{{smart.uuid}}`

### Datasets (Data-Driven Testing)
- Collection of structured test data
- Default dataset (auto-generated, immutable)
- Custom datasets (user-created, editable)
- Support for:
  - Manual data entry
  - AI Autofill
  - CSV Import
- Parameters as columns
- Multiple rows for different test scenarios

## 5. Test Creation Workflows

### Session Configuration Capabilities

When starting a KaneAI authoring session, users can configure various capabilities that affect test execution environment.

#### Network & Connectivity (All Platforms)

**Tunnel Support**
> **Learn more**: [Geolocation, Tunnel, and Proxy in KaneAI](https://www.lambdatest.com/support/docs/kane-ai-geolocation-tunnel-proxy)

- Connect to private/internal applications
- Access localhost and staging environments
- Secure tunnel for internal network testing
- Required for database connections to private databases
- Configure tunnel name in session settings

**Geolocation Testing**
- GPS mocking for mobile devices
- IP-based geolocation for web testing
- Test location-dependent features
- Change location during authoring session
- Supports multiple regions worldwide

**Dedicated Proxy**
- Route traffic through dedicated proxy servers
- Useful for testing behind corporate firewalls
- Custom proxy configuration per session
- Supports authenticated proxies

#### Web Authoring Specific Capabilities

**Custom Headers**
> **Learn more**: [Custom Headers in KaneAI](https://www.lambdatest.com/support/docs/kaneai-custom-headers)

- Inject custom HTTP headers in all requests
- Use cases:
  - Authentication headers (Bearer tokens, API keys)
  - Custom user agent strings
  - Feature flag headers
  - A/B testing headers
  - Debug/trace headers
- Configure before session starts
- Headers applied to all requests during session

**Chrome Options (Arguments)**
> **Learn more**: [Chrome Options in KaneAI](https://www.lambdatest.com/support/docs/kaneai-chrome-options)

- Pass custom Chrome command-line arguments
- Common use cases:
  - `--disable-web-security`: Disable CORS (for testing)
  - `--start-maximized`: Start browser maximized
  - `--disable-notifications`: Block notification prompts
  - `--disable-popup-blocking`: Allow popups
  - `--ignore-certificate-errors`: Ignore SSL errors
  - Custom experimental features
- Configure via session settings before launch
- Only available for Chrome/Chromium-based browsers

#### Mobile Authoring Specific Capabilities

**Device Type Selection**
- **Public Devices**: Shared device pool (see Device Cloud documentation)
- **Private Devices**: Dedicated devices for your account only

**App Configuration**
- Upload APK (Android) or IPA (iOS) files
- Select from previously uploaded apps
- App versioning support

**Mobile-Specific Features**
- Biometric simulation (fingerprint, Face ID)
- Camera image/video injection
- GPS mocking
- Deeplink testing

#### Configuration Summary by Platform

| Capability | Web Desktop | Web Mobile | Mobile App |
|------------|-------------|------------|------------|
| Tunnel | Yes | Yes | Yes |
| Geolocation (GPS) | No | Yes | Yes |
| IP Geolocation | Yes | Yes | Yes |
| Dedicated Proxy | Yes | Yes | Yes |
| Custom Headers | Yes | No | No |
| Chrome Options | Yes (Chrome) | No | No |
| Network Throttling | Yes | Yes | Yes |
| Public/Private Devices | N/A | Yes | Yes |

### KaneAI Authoring Flow
1. **Initiation**: Author Web/App test
2. **Configuration**: Select browser/device, set capabilities (tunnel, proxy, headers, etc.)
3. **Authoring**:
   - Natural language instructions
   - Manual interactions
   - Slash commands for advanced actions
4. **Execution**: Real-time test step processing
5. **Validation**: Assertions and verifications
6. **Save**: Store in Test Manager with metadata

### Slash Commands

> **Learn more**: [KaneAI Command Guide](https://www.lambdatest.com/support/docs/kane-ai-command-guide)

Special commands for advanced actions:
- `/api` - API testing
- `/js` - JavaScript execution
- `/db` - Database queries
- `/network` - Network assertions
- `/totp` - TOTP authentication
- `/upload` - File upload
- `/download` - File download
- `/variable` - Create/manage variables
- `/secret` - Create/manage secrets
- `/parameter` - Create/manage parameters

## 6. Variable & Data Management

### Variable Lifecycle
1. **Creation**: Via UI, natural language, or API responses
2. **Usage**: `{{variable_name}}` syntax in test steps
3. **Persistence**: Optional value persistence across sessions
4. **Environment Switching**: Automatic value substitution based on selected environment

### Parameter Management
- Define parameters for data-driven testing
- Link parameters to datasets
- Multiple data rows for different test scenarios
- Parameter values injected during test execution

### Secret Management Workflow
1. **Creation**: Add secrets via UI or API
2. **Storage**: Encrypted in HashiCorp Vault
3. **Access Control**: User-level or organization-level
4. **Usage**: Reference in tests with `{{secrets.key}}` syntax
5. **Audit**: All access logged and tracked

---

## Crawled Documentation Reference

> **See [KaneAIMain.md](KaneAIMain.md) for the complete crawled documentation index with 6 feature pages.**

### Available Crawled Documentation

| Category | Key Documents |
|----------|---------------|
| **Getting Started** | [Introduction to KaneAI](getting-started-with-kane-ai.md) |
| **Commands & Testing** | [Command Guide](kane-ai-command-guide.md), [API Testing](kane-ai-api-testing.md) |
| **CI/CD Integration** | [CI/CD Automation](kaneai-ci-cd-automation.md) |
| **Configuration** | [Geolocation, Tunnel & Proxy](kane-ai-geolocation-tunnel-proxy.md), [Failure Conditions](kaneai-failure-conditions.md) |
