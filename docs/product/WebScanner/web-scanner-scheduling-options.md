# Scheduling Options in Web Scanner

> **Source**: [https://www.testmuai.com/support/docs/web-scanner-scheduling-options](https://www.testmuai.com/support/docs/web-scanner-scheduling-options)

**Product**: Web Scanner

**Last Crawled**: 2026-01-27T20:47:37.560008

---

On this page

## Step 4: Schedule Scan[â](https://www.testmuai.com/support/docs/web-scanner-scheduling-options#step-4-schedule-scan "Direct link to Step 4: Schedule Scan")

Once scan configuration and URLs are complete, youâll be prompted to set your scan frequency and runtime preferences.

![Scheduling Options UI](https://www.testmuai.com/support/assets/images/scheduling-options-ui-831f795a27ae48dc8abe910b2b2ff857.png)

## Scheduling Modes[â](https://www.testmuai.com/support/docs/web-scanner-scheduling-options#scheduling-modes "Direct link to Scheduling Modes")

### Quick Scan (One-Time)[â](https://www.testmuai.com/support/docs/web-scanner-scheduling-options#quick-scan-one-time "Direct link to Quick Scan \(One-Time\)")

  * Executes the scan immediately upon creation.
  * No future runs will be scheduled.
  * Useful for ad hoc validations, staging checks, or one-off deployments.

### Recurring Scan[â](https://www.testmuai.com/support/docs/web-scanner-scheduling-options#recurring-scan "Direct link to Recurring Scan")

  * Repeats the scan based on chosen days and time.
  * Ensures continuous monitoring of regressions or WCAG compliance.

**Fields:**

  * **Days:** Select one or more days (e.g., Mon, Wed, Fri).
  * **Time:** Choose execution time (in 12-hour or 24-hour format).
  * **Time Zone:** Select the appropriate time zone (e.g., UTC+5:30 Asia/Calcutta).

### Run Initial Scan (Visual UI Only)[â](https://www.testmuai.com/support/docs/web-scanner-scheduling-options#run-initial-scan-visual-ui-only "Direct link to Run Initial Scan \(Visual UI Only\)")

  * Applies only to Visual Scans and is enabled by default.
  * Triggers a baseline SmartUI screenshot set right after scheduling.
  * This is required for future builds to have a baseline to compare against.

**Example Use Case:** You're scheduling a scan for every Monday. With "Run Initial Scan" enabled, a baseline will be created immediately. This acts as the visual reference for next Mondayâs screenshots.

## Modify or Cancel Scheduled Scans[â](https://www.testmuai.com/support/docs/web-scanner-scheduling-options#modify-or-cancel-scheduled-scans "Direct link to Modify or Cancel Scheduled Scans")

### Visual Scans:[â](https://www.testmuai.com/support/docs/web-scanner-scheduling-options#visual-scans "Direct link to Visual Scans:")

  * Access from the **Builds Dashboard**.
  * Click the 3-dot menu and select **Edit**.
  * Modify the scan name, schedule days, time, and time zone.
  * **Options:** Edit Schedule, Stop Recurring Scan, Delete Scan.

![Modify a Scheduled Visual Scan](https://www.testmuai.com/support/assets/images/modify-visual-scan-f1cd69e8f5dea50b84865a816104e6e8.png)

### Accessibility Scans:[â](https://www.testmuai.com/support/docs/web-scanner-scheduling-options#accessibility-scans "Direct link to Accessibility Scans:")

  * Navigate to the **Scheduled Accessibility** section.
  * **Options:** Rename, Delete.
  * For advanced options like issue filtering and exporting, open the report in the Accessibility Dashboard.

---

*Auto-generated from TestMu AI documentation.*