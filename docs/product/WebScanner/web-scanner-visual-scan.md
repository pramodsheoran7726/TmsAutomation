# Starting a Visual UI Scan with Web Scanner

> **Source**: [https://www.testmuai.com/support/docs/web-scanner-visual-scan](https://www.testmuai.com/support/docs/web-scanner-visual-scan)

**Product**: Web Scanner

**Last Crawled**: 2026-01-27T20:47:44.427851

---

On this page

## Purpose of Visual UI Scan[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#purpose-of-visual-ui-scan "Direct link to Purpose of Visual UI Scan")

Visual UI scans identify layout shifts, broken styles, font mismatches, and other design anomalies across web pages. It compares page screenshots taken during each run against a previously saved baseline (initial scan).

Scans run across combinations of:

  * **Browsers:** Chrome, Firefox, Safari, Edge
  * **Resolutions:** A total of 30 viewport options are available, including 10 standard desktop, 10 Android, and 10 iOS device viewports.

Results are redirected to the SmartUI Dashboard for detailed comparison.

![Visual Scan Purpose](https://www.testmuai.com/support/assets/images/visual-scan-config-purpose-c07b40edb81e41cf84c18b569434aa10.png)

## Step 2 (If Visual Scan is Selected)[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#step-2-if-visual-scan-is-selected "Direct link to Step 2 \(If Visual Scan is Selected\)")

Once **Visual UI** is selected in Step 1 of the scheduling wizard, the following configuration appears.

### Default Settings[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#default-settings "Direct link to Default Settings")

  * **Browsers:** Chrome, Firefox, Safari, Edge
  * **Resolutions:** Desktop (1920x1080, 1366x768, 1024x768), Tablet, Mobile (Galaxy A12, Galaxy A31, iPhone 14 Pro)
  * **Full Page Mode âONâ:** Captures the full length of your website regardless of viewport height limitations.
  * **Delay â5 Secondsâ:** To wait for animations or content to stabilize.

![Visual Scan Default Settings](https://www.testmuai.com/support/assets/images/visual-scan-default-settings-f56f0c4001e49b25142d4f85d5bf1390.png)

### Advanced Options (Visual UI)[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#advanced-options-visual-ui "Direct link to Advanced Options \(Visual UI\)")

Click the "Advancedâ Tab to unlock additional configuration tabs.

#### SmartUI Config Upload[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#smartui-config-upload "Direct link to SmartUI Config Upload")

You can create your own `.smartui.json` file for full control over:

  * Browser selection
  * Resolutions
  * Delay setting
  * The integrated JSON validator checks your configuration.

![Visual Scan Advanced Options](https://www.testmuai.com/support/assets/images/visual-scan-advanced-options-38fb4d3803795d8dbc5e8fc18ac6eb38.png)

#### Default SmartUI Config[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#default-smartui-config "Direct link to Default SmartUI Config")
    
    
      
    "web": {  
      "browsers": [  
        "chrome",  
        "firefox",  
        "safari",  
        "edge"  
      ],  
      "viewports": [  
        [  
          1920  
        ],  
        [  
          1366  
        ],  
        [  
          1024  
        ]  
      ]  
    },  
    "mobile": {  
      "devices": [  
        "iPhone 14",  
        "Galaxy S24"  
      ],  
      "fullPage": true,  
      "orientation": "portrait"  
    },  
    "waitForTimeout": 1000,  
    "smartIgnore": true,  
    "enableJavaScript": false,  
    "ignoreHTTPSErrors": false,  
    "useGlobalCache": false  
    

> **Note:** Using a SmartUI config bypasses manual browser, resolution, and delay selections, even in the "Edit Config" mode.

#### Navigating Results for your Visual Scan[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#navigating-results-for-your-visual-scan "Direct link to Navigating Results for your Visual Scan")

## Dashboard Overview[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#dashboard-overview "Direct link to Dashboard Overview")

After running your tests, the **Visual Build** becomes available in the dashboard.

![Visual Build](https://www.testmuai.com/support/assets/images/visual-build-ada4def3f63512345b72b1295fb3a583.png)

### Build Status[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#build-status "Direct link to Build Status")

Easily track the state of each screenshot â **Approved** , **Changes Found** , **New** , **Under Review** , and more.

![Build Status View](https://www.testmuai.com/support/assets/images/threedot-visual-bc909a109828142796cffed74efa1a8d.png)

### Three-Dot Menu Options[â](https://www.testmuai.com/support/docs/web-scanner-visual-scan#three-dot-menu-options "Direct link to Three-Dot Menu Options")

Access additional functions for your build:

![Three Dot Menu](https://www.testmuai.com/support/assets/images/history-page-8a1349b7af82588b47a29af917d1b23e.png)

  1. **View History**  
Browse older builds with complete stats for quick comparison.

  2. **Edit Scan Config**  
Modify scan settings such as **schedule** and **viewports**.

![Edit Scan Config](https://www.testmuai.com/support/assets/images/editscan-visual-410e4f762ec208986aad6237e5f2714d.png) ![Edit Scan Schedule](https://www.testmuai.com/support/assets/images/editscan-schedule-d58afed4e590b5731a676cab7d94e0fb.png)
  3. **Run Scan Now**  
Run a new scan on demand and create a new build for comparison.

  4. **Delete Scan**  
Remove a scan from the dashboard.

  5. **Stop Recurring Scan**  
Halt any scheduled recurring scans instantly.

**Access your SmartUI Dashboard** : SmartUI detects pixel-based layout changes, design mismatches, missing elements, or unintended visual regressions by comparing screenshots taken at scheduled intervals.

![smartui dashboard](https://www.testmuai.com/support/assets/images/smartui_dashboard-40bc3a5a1c137a0b1daf5911bc9603a9.png)

---

*Auto-generated from TestMu AI documentation.*