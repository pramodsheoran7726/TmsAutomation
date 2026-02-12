# Adding URLs for Web Scanner

> **Source**: [https://www.testmuai.com/support/docs/web-scanner-adding-urls](https://www.testmuai.com/support/docs/web-scanner-adding-urls)

**Product**: Web Scanner

**Last Crawled**: 2026-01-27T20:47:35.548981

---

On this page

## Step 3: Add URLs to Your Scan[â](https://www.testmuai.com/support/docs/web-scanner-adding-urls#step-3-add-urls-to-your-scan "Direct link to Step 3: Add URLs to Your Scan")

After configuring the scan type (Step 2), the **Add URLs** section (Step 3) allows you to populate the test targets. You can choose from one of the following input methods.

### 1\. Add URLs Manually[â](https://www.testmuai.com/support/docs/web-scanner-adding-urls#1-add-urls-manually "Direct link to 1. Add URLs Manually")

Use this method when you want full control over each scanned URL or youâre testing only a handful of critical paths.

![Add URLs Manually](https://www.testmuai.com/support/assets/images/import-urls-manually-97632f111fa882b2a1313515eadf3864.png)

**Instructions:**

  * Paste each URL in a new line or input box.
  * Ensure proper formatting (`https://` required).

**Best for:**

  * Login pages, checkout flows, admin pages.

### 2\. Import via CSV File[â](https://www.testmuai.com/support/docs/web-scanner-adding-urls#2-import-via-csv-file "Direct link to 2. Import via CSV File")

Use this method when you already maintain URL lists in a spreadsheet or text file.

**CSV Format:** One URL per line (no header).
    
    
    [https://example.com](https://example.com)  
    [https://example.com/pricing](https://example.com/pricing)  
    [https://example.com/contact](https://example.com/contact)  
    

**Instructions** :

  * Click on Import CSV.

  * Upload your .csv file.

  * URLs will auto-populate the scan list.

Ideal for:

  * Large teams with pre-approved page lists.

  * Reusing URL sets across projects.

![Import URLs via CSV File](https://www.testmuai.com/support/assets/images/import-urls-csv-072f5ff8590fee0765927ff04b0281d6.png)

### 3\. Import via Sitemap[â](https://www.testmuai.com/support/docs/web-scanner-adding-urls#3-import-via-sitemap "Direct link to 3. Import via Sitemap")

Use this method when:

  * you want to extract URLs from an existing sitemap
  * youâre scanning a dynamic, live website.

**Instructions** :

  * Paste the sitemap URL (XML format).
  * Click Fetch Sitemap.
  * The scanner will auto-detect URLs.
  * You can selectively check/uncheck desired pages.

Ideal for:

  * Scanning large public websites.
  * Ensuring complete coverage.

![Import URLs via Sitemap](https://www.testmuai.com/support/assets/images/import-urls-sitemap-ae1c3a1f5d83dab4a8a9fe878d6905a6.png)

### URL Limits and Validations[â](https://www.testmuai.com/support/docs/web-scanner-adding-urls#url-limits-and-validations "Direct link to URL Limits and Validations")

**Max URL Limit** : would depend upon your SmartUI (_for visual scan_) and Accessibility (_for accessibility scan_) plan.

**All URLs must be valid and working.**

**Duplicate URLs will be auto-filtered**

**Reusability Tips**

  * For frequently used URL sets, save them in CSVs and upload as needed.
  * Create and save CSV url lists from sitemap and use in CSV mode for future.

---

*Auto-generated from TestMu AI documentation.*