# Getting Started with TestMu AI Web Scanner

> **Source**: [https://www.testmuai.com/support/docs/web-scanner-getting-started](https://www.testmuai.com/support/docs/web-scanner-getting-started)

**Product**: Web Scanner

**Last Crawled**: 2026-01-27T20:47:46.683270

---

On this page

## Accessing the Dashboard[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#accessing-the-dashboard "Direct link to Accessing the Dashboard")

Navigate to: `https://webscanner.lambdatest.com/webscan/builds`

You will see a unified dashboard with the following primary controls:

![Web Scanner Dashboard Controls](https://www.testmuai.com/support/assets/images/unified-dashboard-controls-8a4f6f6a56a5ff5f1f9b2b77bc4eac75.png)

### Scan Type Tabs[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#scan-type-tabs "Direct link to Scan Type Tabs")

At the top left, you can switch between:

  * Visual UI Scans
  * Accessibility Scans

Each tab displays its own scheduled scans, configurations, and build statuses.

### Search and Filters[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#search-and-filters "Direct link to Search and Filters")

Use the search bar to locate specific scans by name. Filters may be added in future iterations for build status, user, or date.

### Login Configurations[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#login-configurations "Direct link to Login Configurations")

For your accessibility scans, login configurations allow users to:

  * Add Basic Auth credentials
  * Add form authentication (via CSS selectors)

These configurations ensure that login-protected or session-gated URLs can still be scanned.

### Schedule Scan Button[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#schedule-scan-button "Direct link to Schedule Scan Button")

The primary CTA on the dashboard, **Schedule Scan** , triggers the full scan creation wizard.

![Schedule Scan Button](https://www.testmuai.com/support/assets/images/schedule-scan-button-15ef3a06084424b068f97f558f1bdbe3.png)

## How to Create a New Scan[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#how-to-create-a-new-scan "Direct link to How to Create a New Scan")

Click the **Schedule Scan** button to launch the 4-step wizard. This process applies to both Visual and Accessibility scans. Platform-specific configuration steps appear based on your selection.

### Step 1: Scan Overview[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#step-1-scan-overview "Direct link to Step 1: Scan Overview")

  * **Scan Name:** Add an identifiable title
  * **Platform:** Choose between:
    * Visual UI
    * Accessibility

![Scan Creation Wizard Step 1](https://www.testmuai.com/support/assets/images/wizard-step-1-overview-e24c006ba9fcefe2180ae28482e024bb.png)

### Step 2: Scan Type Configuration (Dynamic)[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#step-2-scan-type-configuration-dynamic "Direct link to Step 2: Scan Type Configuration \(Dynamic\)")

Depending on the selected platform, youâll either see Visual UI configuration or Accessibility configuration. You may use âDefaultâ settings or for more information follow the details provided:

  * [Starting a Visual Scan](https://www.testmuai.com/support/docs/web-scanner-visual-scan)
  * [Starting an Accessibility Scan](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan)

### Step 3: Add URLs[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#step-3-add-urls "Direct link to Step 3: Add URLs")

You can populate the scan target using three options:

  * Manual Input: Paste multiple URLs
  * CSV Upload: Upload a file with 1 URL per line
  * Sitemap Import: Paste sitemap XML URL and select from extracted URLs

The maximum limit is 1,000 URLs per scan.

![Add URLs Manually](https://www.testmuai.com/support/assets/images/wizard-step-3-manual-url-6d57c55bd97fe663b017f7432e96bc00.png) ![Add URLs via Sitemap](https://www.testmuai.com/support/assets/images/wizard-step-3-sitemap-url-041d0ca0a9bb71a5e465e1e7968c322d.png)

For more details you may refer to our guide on [Adding URLs for Web Scanner](https://www.testmuai.com/support/docs/web-scanner-adding-urls).

### Step 4: Schedule the Scan[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#step-4-schedule-the-scan "Direct link to Step 4: Schedule the Scan")

Choose the frequency and timing for this scan:

  * **Quick Scan:** One-time run
  * **Recurring Scan:**
    * Select days (e.g., Mon, Wed, Fri)
    * Select time (e.g., 08:30 PM)
    * Select timezone (e.g., UTC+5:30 Asia/Calcutta)
  * Enable/disable **Run Initial Scan** (Visual UI only)

![Scan Creation Wizard Step 4](https://www.testmuai.com/support/assets/images/wizard-step-4-schedule-d7c77931eed7e907e2a9cdf1fd01a8a1.png)

## Post-Scan Scheduling[â](https://www.testmuai.com/support/docs/web-scanner-getting-started#post-scan-scheduling "Direct link to Post-Scan Scheduling")

Once scheduled, the scan appears in the appropriate tab of the dashboard.

  * **Visual UI:** Scan redirects to SmartUI comparison build
  * **Accessibility:** Scan redirects to detailed Accessibility report

![Scheduled Scan on Dashboard](https://www.testmuai.com/support/assets/images/scheduled-scan-on-dashboard-d625372422ed5c3f1d20c3b533923355.png)

Each scan has an action menu (3-dots icon) with the following options:

**Visual UI:**

  * View History (SmartUI builds)
  * Edit Scan Config (recurrence, time)
  * Stop Recurring Scan
  * Delete Scan

**Accessibility:**

  * Rename Scan
  * Delete Scan

Detailed controls are available after redirecting to the Accessibility dashboard.

---

*Auto-generated from TestMu AI documentation.*