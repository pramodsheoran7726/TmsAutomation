# SmartUI Product - Testing Flow & API Reference

## Overview

This document describes the SmartUI product flow and the APIs tested using this framework. The framework supports both **API-based testing** and **browser-based visual regression testing** with a dual-browser architecture.

---

## Testing Modes

### 1. API Testing
- Direct API calls for project creation, image upload, build verification
- Uses Playwright's APIRequestContext
- Faster execution, suitable for CI/CD

### 2. Browser Testing (Dual-Browser)
- **Observer Browser**: Monitors SmartUI dashboard, verifies builds
- **Activity Browser**: Executes actions on LambdaTest cloud, takes SmartUI screenshots
- Visual regression testing with real browser interactions

---

## Product Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SmartUI Testing Flow                         │
└─────────────────────────────────────────────────────────────────────┘

   ┌──────────────┐
   │  0. BEARER   │  → Get JWT Bearer Token        ✅ IMPLEMENTED
   │    TOKEN     │     (For API & browser auth)
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  1. CREATE   │  → Project Types:              ✅ IMPLEMENTED
   │    PROJECT   │     • API   • PDF
   └──────┬───────┘     • Web   • CLI
          │             • Real Device
          ▼
   ┌──────────────┐
   │  2. UPLOAD   │  → Images or PDFs              ✅ IMPLEMENTED
   │    ASSETS    │     (Baseline & Comparison)
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  3. BUILD    │  → Get build status            ✅ IMPLEMENTED
   │    STATUS    │     (changesFound, approved)
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  4. BUILD    │  → Get screenshots data        ✅ IMPLEMENTED
   │  SCREENSHOTS │     (URLs, mismatch %)
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  5. BROWSER  │  → Visual verification         ✅ IMPLEMENTED
   │  VERIFICATION│     (Dual-browser pattern)
   └──────────────┘
```

---

## Comparison Strategies

SmartUI supports **3 comparison strategies** for visual regression testing:

| # | Strategy | Description | Supported Project Types |
|---|----------|-------------|------------------------|
| 1 | **Strict (P2P)** | Pixel-to-Pixel comparison - flags every single pixel difference | All |
| 2 | **SmartIgnore** | Intelligent comparison that automatically ignores minor/acceptable differences | All |
| 3 | **Layout** | Layout-based comparison for structural changes | **CLI only** |

### Strategy Selection

**Via Capabilities:**
```javascript
// Enable SmartIgnore
capabilities['smartUI.smartIgnore'] = true;

// Disable SmartIgnore (use Strict/P2P)
capabilities['smartUI.smartIgnore'] = false;
```

**Via UI:**
- Navigate to build comparison view
- Use the comparison strategy dropdown to switch between strategies

---

## API Implementation Status

| API | Endpoint Key | Method | Auth | Status |
|-----|--------------|--------|------|--------|
| Bearer Token | `bearer` | POST | None | ✅ Done |
| Create Project | `create-project` | POST | Bearer | ✅ Done |
| Image Upload | `smartui-upload` | POST | Bearer | ✅ Done |
| PDF Upload | `pdf-upload` | POST | Basic | ✅ Done |
| Build Status | `build-status` | GET | Basic | ✅ Done |
| Build Screenshots | `build-screenshots` | GET | Basic | ✅ Done |

---

## API Details

### 1. Bearer Token API ✅

**Purpose:** Get JWT token for authentication (API and browser login)

| Property | Value |
|----------|-------|
| **URL** | `https://qa-test-artifacts.lambdatestinternal.com/user/bearer` |
| **Method** | POST |
| **Auth** | None (uses email/password in body) |

**Request:**
```json
{
  "email": "${AUTH_EMAIL}",
  "password": "${AUTH_PASSWORD}",
  "environment": "prod",
  "generateNew": true
}
```

**Response:**
```json
{
  "result": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Bearer token generated successfully"
}
```

**Usage:**
- API calls: `Authorization: Bearer {token}`
- Browser login: Set as `accessToken` cookie on `.lambdatest.com`

---

### 2. Create Project API ✅

**Purpose:** Create new SmartUI project

| Property | Value |
|----------|-------|
| **URL** | `${API_BASE_URL}/des-smartui/3.0/create/project` |
| **Method** | POST |
| **Auth** | Bearer Token |

**Project Types:**

| Type | projectCategory | platform |
|------|-----------------|----------|
| API | web | api |
| PDF | pdf | pdf |
| CLI | web | cli |
| Web | web | web |
| Real Device | app | app |

**Request:**
```json
{
  "name": "SmartUIAgentic-web-2026-01-16-22-13-45",
  "projectCategory": "web",
  "platform": "web",
  "approver": "Approver Name",
  "approverEmail": "approver@example.com",
  "gdprCompliance": false,
  "unifiedProject": true
}
```

**Response:**
```json
{
  "message": "New Project created",
  "data": {
    "projectId": "01KF3V21G71JKWPG43HNWNYCVD",
    "name": "SmartUIAgentic-web-2026-01-16-22-13-45",
    "projectToken": "485720#01KF3V21G71JKWPG43HNWNYCVD#SmartUIAgentic-web-2026-01-16-22-13-45",
    "status": "active",
    "platform": "web",
    "projectCategory": "web"
  }
}
```

---

### 3. Image Upload API ✅

**Purpose:** Upload images for visual comparison

| Property | Value |
|----------|-------|
| **URL** | `${API_BASE_URL}/automation/smart-ui/v2/upload` |
| **Method** | POST (multipart/form-data) |
| **Auth** | Bearer Token |

**Form Fields:**
- `projectToken`: Project token from create project
- `buildName`: e.g., `Agentic-22-13-45`
- `files`: Image files (PNG, JPG)

**Response:**
```json
{
  "status": "success",
  "data": {
    "buildId": "a295be45-8cc1-4511-8273-3a3ba8715657",
    "buildName": "Agentic-22-13-45",
    "filesUploaded": ["image1.png", "image2.png"],
    "totalFilesUploaded": 2
  }
}
```

---

### 4. PDF Upload API ✅

**Purpose:** Upload PDF for visual comparison

| Property | Value |
|----------|-------|
| **URL** | `${API_BASE_URL}/pdf/upload` |
| **Method** | POST (multipart/form-data) |
| **Auth** | Basic Auth |

**Form Fields:**
- `projectToken`: Project token
- `pathToFiles`: PDF file

**Response:**
```json
{
  "status": "Success",
  "message": "Successfully received pdf for rendering...",
  "buildURL": "https://smartui.lambdatest.com/builds/...",
  "buildId": "07c54fc5-3c26-42ef-98cb-95ad2ae00678",
  "projectName": "SmartUIAgentic-pdf-2026-01-16"
}
```

---

### 5. Build Status API ✅

**Purpose:** Get build processing status

| Property | Value |
|----------|-------|
| **URL** | `${API_BASE_URL}/automation/smart-ui/build/status` |
| **Method** | GET |
| **Auth** | Basic Auth |

**Query Parameters:**
- `projectToken`: Project token
- `buildName`: Build name

**Response:**
```json
{
  "data": {
    "changesFound": 2,
    "approved": 0,
    "rejected": 0,
    "buildId": "d69e7d2d-267a-42dd-9a01-ca008dd0d497",
    "buildName": "smartui-0aaa89a37f",
    "buildStatus": "pending-approval",
    "message": "Fetched Build Status Successfully"
  },
  "status": "success"
}
```

**Build Status Values:**

| # | Status | Description |
|---|--------|-------------|
| 1 | **Approved** | All screenshots in the build are approved |
| 2 | **Rejected** | All screenshots in the build are rejected |
| 3 | **Partially Rejected** | At least one screenshot or variant is rejected in the build |
| 4 | **Pending Approval** | At least one screenshot or variant has mismatch percentage or changes found |
| 5 | **Merged to Baseline** | All screenshots of the build are moved/merged to baseline |
| - | **Running** | Build is currently in progress (processing) |

**Screenshot Status Values:**

| # | Status | Sub-Type | Description |
|---|--------|----------|-------------|
| 1 | **Approved** | System Approved | Screenshot has 0% mismatch or falls within the defined acceptance threshold |
| 1 | **Approved** | User Approved | User manually approved the screenshot |
| 2 | **Changes Found** | - | Screenshot has some changes and mismatch ≠ 0 |
| 3 | **Under Screening** | - | User has viewed the screenshot on dashboard |
| 4 | **Rejected** | System Rejected | Screenshot has 100% mismatch or falls within the defined rejection threshold |
| 4 | **Rejected** | User Rejected | User manually rejected the screenshot |
| 5 | **New Screenshot** | - | Same config screenshot does not exist in the baseline build to compare |
| 6 | **Added to Baseline / Moved** | - | Screenshot was moved to baseline |

---

### 6. Build Screenshots API ✅

**Purpose:** Get screenshot details and URLs

| Property | Value |
|----------|-------|
| **URL** | `${API_BASE_URL}/smartui/2.0/build/screenshots` |
| **Method** | GET |
| **Auth** | Basic Auth |

**Query Parameters:**
- `project_id`: Project ID
- `build_id`: Build ID
- `sync`: "true"
- `shareable_link`: "true"

**Response:**
```json
{
  "screenshots": [
    {
      "screenshot_name": "homepage",
      "captured_image": "https://...",
      "mismatch_percentage": 0,
      "status": "Approved"
    }
  ],
  "build": {
    "build_id": "a295be45-...",
    "baseline": true,
    "build_status": "approved"
  }
}
```

---

## Environment URLs

| Environment | Base URL |
|-------------|----------|
| **PROD** | `https://api.lambdatest.com` |
| **STAGE** | `https://stage-api.lambdatestinternal.com` |

| Service | PROD URL |
|---------|----------|
| SmartUI Dashboard | `https://smartui.lambdatest.com` |
| Login | `https://accounts.lambdatest.com/login` |
| CDP Endpoint | `wss://cdp.lambdatest.com/playwright` |
| Bearer API | `https://qa-test-artifacts.lambdatestinternal.com/user/bearer` |

---

## Browser Testing Flow

### Dual-Browser Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    OBSERVER BROWSER                          │
│  • Opens SmartUI Dashboard                                  │
│  • Monitors test results                                    │
│  • Verifies builds via .buildNamediv selector              │
│  • Runs local or remote                                    │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   ACTIVITY BROWSER                           │
│  • Executes on LambdaTest cloud                            │
│  • Takes SmartUI screenshots                               │
│  • Uses smartUI.project capability                         │
│  • Actions: captureHomepage, captureMultiplePages, etc.    │
└─────────────────────────────────────────────────────────────┘
```

### LambdaTest Capabilities

```javascript
const capabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 10',
    build: 'SmartUI Build',
    name: 'SmartUI Test',
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    smartUIProjectName: 'project-name',  // Required for SmartUI
    network: true,
    video: true,
    console: true
  }
};
```

### SmartUI Screenshot Action

```javascript
await page.evaluate((_) => {}, `lambdatest_action: ${JSON.stringify({
  action: 'smartui.takeScreenshot',
  arguments: {
    fullPage: true,
    screenshotName: 'screenshot-name'
  }
})}`);
```

---

## CLI Project Testing ✅

### CLI Testing Flow

CLI projects use the `@lambdatest/smartui-cli` package for visual regression testing.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLI Testing Flow                              │
└─────────────────────────────────────────────────────────────────────┘

   ┌──────────────────┐
   │  1. CREATE CLI   │  → Create project via API (type: cli)
   │     PROJECT      │     Export PROJECT_TOKEN
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │  2. GENERATE     │  → npx smartui config:create smartui-web.json
   │     CONFIG       │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │  3. RUN BASELINE │  → npx smartui exec <command> --config smartui-web.json
   │     BUILD        │     --buildName "Baseline"
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │  4. RUN NON-     │  → npx smartui exec <command> --config smartui-web.json
   │  BASELINE BUILD  │     --buildName "Non-Baseline"
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │  5. VERIFY ON    │  → Wait for build completion (data-state != running)
   │     DASHBOARD    │     Click build → Click screenshot → Get mismatch %
   └──────────────────┘
```

### CLI Sub-Flows

| Flow | Description | Command |
|------|-------------|---------|
| **SDK (Exec)** | Run custom test commands | `npx smartui exec <cmd>` |
| **Capture** | URL-based screenshot capture | `npx smartui capture` |
| **Storybook** | Component visual testing | `npx smartui storybook` |
| **Images Upload** | Bulk image upload | `npx smartui upload` |
| **Figma** | Design comparison | `npx smartui figma` |

### CLI Packages Required

```json
{
  "dependencies": {
    "@lambdatest/smartui-cli": "latest",
    "@lambdatest/playwright-driver": "latest"
  }
}
```

### CLI Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PROJECT_TOKEN` | SmartUI project token | Yes |
| `SMARTUI_CLIENT_API_URL` | Stage API URL (stage only) | Stage only |
| `LT_USERNAME` | LambdaTest username | For remote execution |
| `LT_ACCESS_KEY` | LambdaTest access key | For remote execution |

### CLI Screenshot with Playwright Driver

```javascript
const smartuiSnapshot = require('@lambdatest/playwright-driver');

await page.goto('https://www.lambdatest.com');
await smartuiSnapshot.smartuiSnapshot(page, 'LT-Home');
```

### CLI Verification Locators

| Element | Locator |
|---------|---------|
| Build #1 Status | `[class*='#1_build_status']` |
| Build #2 Status | `[class*='#2_build_status']` |
| Build Status Container | `div:has(> [class*="#N_build_status"])` |
| Refresh Builds | `#refreshBuilds` |
| Screenshot Card | `#screenshot-card-0` |
| Screenshot Status | `.compare__view-meta-status` (data-status attr) |

---

## Test Commands

### Browser Tests

```bash
# Local observer
CLIENT_LOCAL_DRIVER=true npm run cucumber -- --tags "@saurabh"

# Remote observer (requires LT credentials)
npm run cucumber -- --tags "@saurabh"
```

### API Tests

```bash
npm run cucumber:api        # API project E2E
npm run cucumber:pdf        # PDF project E2E
npm run cucumber:multibuild # 3-build comparison
npm test                    # All Playwright tests
```

---

## Related Files

| File | Purpose |
|------|---------|
| `FRAMEWORK.md` | Framework architecture |
| `PROJECT_STRUCTURE.md` | Directory structure |
| `config/endpoints.json` | API endpoint definitions |
| `config/env.example` | Environment template |

---

*Last Updated: January 24, 2026 - Moved to docs/product/, added build/screenshot status values*
