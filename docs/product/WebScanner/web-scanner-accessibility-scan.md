# Starting an Accessibility Scan with Web Scanner

> **Source**: [https://www.testmuai.com/support/docs/web-scanner-accessibility-scan](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan)

**Product**: Web Scanner

**Last Crawled**: 2026-01-27T20:47:42.164324

---

On this page

## Purpose of Accessibility Scan[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#purpose-of-accessibility-scan "Direct link to Purpose of Accessibility Scan")

Accessibility scans ensure that websites are inclusive and usable for users with disabilities by identifying WCAG violations such as missing alt text, insufficient contrast, inaccessible form elements, and more.

These scans help:

  * Meet legal compliance (ADA, WCAG 2.0/2.1)
  * Improve usability for all users
  * Reduce the burden of manual audits

![Accessibility Scan Purpose](https://www.testmuai.com/support/assets/images/accessibility-scan-purpose-492ad92cdf7c559484dc6254d7575cf8.png)

## Step 2 (If Accessibility Scan is Selected)[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#step-2-if-accessibility-scan-is-selected "Direct link to Step 2 \(If Accessibility Scan is Selected\)")

Once you select **Accessibility** in Step 1 of the scan wizard, the following configuration UI is displayed:

![Accessibility Scan Configuration UI](https://www.testmuai.com/support/assets/images/accessibility-scan-config-ui-076b8ea64f5d9746d08f01e1652c966a.png)

### Default Selections:[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#default-selections "Direct link to Default Selections:")

  * **WCAG Version:** WCAG 2.1 AA
  * **Review Issues âONâ:** Enables manual verification for accuracy.
  * **Best Practices Issues âONâ:** Ensures user experience enhancement issues are accounted for.

## Advanced Options (Accessibility Scan)[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#advanced-options-accessibility-scan "Direct link to Advanced Options \(Accessibility Scan\)")

### Local Testing Setup[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#local-testing-setup "Direct link to Local Testing Setup")

  * Activates TestMu AI Tunnel to scan localhost or staging environments.

### Login Configurations[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#login-configurations "Direct link to Login Configurations")

  * Reuse or create new login setups.
  * Supports:
    * Basic Authentication (username/password)
    * Form-based login (via CSS selectors)

![Accessibility Scan Advanced Options](https://www.testmuai.com/support/assets/images/accessibility-scan-advanced-options-1752170acf6a0156d1c539c7e33a4826.png)

### More options:[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#more-options "Direct link to More options:")

  * **Review Issues (Needs Review):** Enable this to include issues that require human verification (e.g., `aria-label` usage). These may not be violations but need manual inspection.
  * **Best Practices Issues:** Enable this to detect suggestions that improve UX but do not violate accessibility rules. Examples include adding landmark roles or enhancing keyboard support.

## Dashboard Overview[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#dashboard-overview "Direct link to Dashboard Overview")

![Visual Build](https://www.testmuai.com/support/assets/images/accessibility-build-d90dcb1f00409d1dccaf95b47e6e947b.png)

After running your tests, your **Accessibility Build** becomes available in the dashboard.

#### Build Status[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#build-status "Direct link to Build Status")

Easily track the state of each scan â **Critical** , **Serious** , **Moderate** , **Minor**.

#### Build Options[â](https://www.testmuai.com/support/docs/web-scanner-accessibility-scan#build-options "Direct link to Build Options")

Access additional functions for your build:

  1. **Share Scan**  
Browse older builds with complete stats for quick comparison.
  2. **Raise an Issue**  
Integrate with any of the major platforms and directly raise issues from the dashboard.
  3. **Download Accessibility Report**  
You can download the results report in PDF, CSV or JSON formats.
  4. **Delete Scan**  
Delete any scheduled recurring scans.

**Analyze the Scan Report** : After selecting a scan, A detailed scan report will open, as shown in the provided screenshot. The report will display the following key components:

  * **Total Issues :** A graph summarizing the trend of detected issues over the last few runs.
  * **Severity Trend :** A chart categorizing issues by severity (e.g., Critical, Serious, Moderate, Minor).
  * **Pages Scanned :** A list of scanned pages with their corresponding issue counts categorized by severity.

You can drill down into individual page URLs to view the number of issues found on that specific page using filters provided. From the scan report page, you can also edit, share and stop recurring scan if its no longer required.

![](https://www.testmuai.com/support/assets/images/6-e290ce4de77de5d673c6a6c9b6846177.png)

---

*Auto-generated from TestMu AI documentation.*