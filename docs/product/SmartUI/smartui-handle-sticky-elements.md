# Handle Pages with Sticky Elements

> **Source**: [https://www.testmuai.com/support/docs/smartui-handle-sticky-elements](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:18.970250

---

On this page

## What are Sticky Elements?[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#what-are-sticky-elements "Direct link to What are Sticky Elements?")

Sticky elements are CSS-positioned elements that remain fixed in the viewport while the user scrolls through a page. Common examples include:

  * **Sticky Headers** : Navigation bars that stay at the top while scrolling
  * **Sticky Footers** : Footer elements that remain at the bottom
  * **Sticky Sidebars** : Side navigation or widgets that stay visible
  * **Floating Action Buttons** : Buttons that float over content
  * **Cookie Banners** : Consent banners that stick to the viewport

## The Challenge[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#the-challenge "Direct link to The Challenge")

When taking full-page screenshots of pages with sticky elements:

  * Sticky elements can appear multiple times in a single screenshot
  * Elements may overlap with content at different scroll positions
  * False positives can occur due to element repetition
  * Inconsistent positioning can cause comparison failures

## How SmartUI Handles Sticky Elements[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#how-smartui-handles-sticky-elements "Direct link to How SmartUI Handles Sticky Elements")

SmartUI automatically handles sticky elements by:

### 1\. DOM Modification Before Capture[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#1-dom-modification-before-capture "Direct link to 1. DOM Modification Before Capture")

SmartUI automatically adjusts the positions of sticky elements in the Document Object Model (DOM) before capturing a screenshot. This ensures that:

  * Sticky elements are displayed only once in visual snapshots
  * Elements appear at their original position (typically top or bottom of page)
  * No overlapping or repetition occurs in full-page screenshots

### 2\. Full-Page Rendering[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#2-full-page-rendering "Direct link to 2. Full-Page Rendering")

When capturing full-page screenshots, SmartUI renders the page as it would appear when initially loaded in the browser:

  * Sticky headers appear only at the top of the page
  * Sticky footers appear only at the bottom of the page
  * Elements don't repeat throughout the page length
  * Consistent baseline for visual comparison

## Benefits[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#benefits "Direct link to Benefits")

### Consistency Across Snapshots[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#consistency-across-snapshots "Direct link to Consistency Across Snapshots")

Sticky elements are handled consistently across all snapshots, ensuring:

  * Predictable element positioning
  * Reliable visual comparisons
  * Reduced false positives

### Reduced False Positives[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#reduced-false-positives "Direct link to Reduced False Positives")

By preventing element repetition and overlap:

  * Only actual UI changes are detected
  * Sticky element movement doesn't trigger false positives
  * More accurate test results

### Stable Visual Baseline[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#stable-visual-baseline "Direct link to Stable Visual Baseline")

Sticky elements remain static in their original positions:

  * Consistent baseline for comparison
  * Easier to identify real changes
  * Better test reliability

## Use Cases[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#use-cases "Direct link to Use Cases")

### Use Case 1: E-commerce Site with Sticky Header[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#use-case-1-e-commerce-site-with-sticky-header "Direct link to Use Case 1: E-commerce Site with Sticky Header")

**Scenario** : E-commerce site has a sticky navigation header with cart icon and search bar.

**Solution** : SmartUI automatically positions the header only at the top, preventing it from appearing multiple times in full-page screenshots.

### Use Case 2: Blog with Sticky Sidebar[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#use-case-2-blog-with-sticky-sidebar "Direct link to Use Case 2: Blog with Sticky Sidebar")

**Scenario** : Blog page has a sticky sidebar with social sharing buttons and related articles.

**Solution** : The sidebar appears only in its original position, not repeated throughout the page.

### Use Case 3: Dashboard with Floating Action Button[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#use-case-3-dashboard-with-floating-action-button "Direct link to Use Case 3: Dashboard with Floating Action Button")

**Scenario** : Dashboard has a floating "Add" button that stays visible while scrolling.

**Solution** : SmartUI handles the floating button, ensuring it doesn't cause false positives in comparisons.

### Use Case 4: Cookie Consent Banner[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#use-case-4-cookie-consent-banner "Direct link to Use Case 4: Cookie Consent Banner")

**Scenario** : Site has a sticky cookie consent banner at the bottom of the page.

**Solution** : The banner appears only at the bottom, not repeated in the middle of the page.

## Configuration[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#configuration "Direct link to Configuration")

SmartUI handles sticky elements automatically with **no additional configuration required**. The feature works out of the box for:

  * Elements with `position: sticky` CSS property
  * Elements with `position: fixed` CSS property
  * Floating elements that remain in viewport

### When Manual Handling is Needed[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#when-manual-handling-is-needed "Direct link to When Manual Handling is Needed")

In rare cases, you may need to manually handle sticky elements:

#### Option 1: Ignore Sticky Elements[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#option-1-ignore-sticky-elements "Direct link to Option 1: Ignore Sticky Elements")

If you want to exclude sticky elements from comparison entirely:
    
    
    let options = {  
        ignoreDOM: {  
            cssSelector: [".sticky-header", ".sticky-footer", ".floating-button"]  
        }  
    };  
    await smartuiSnapshot(driver, 'Page with Sticky Elements', options);  
    

#### Option 2: Select Only Static Content[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#option-2-select-only-static-content "Direct link to Option 2: Select Only Static Content")

If you only want to compare non-sticky content:
    
    
    let options = {  
        selectDOM: {  
            cssSelector: [".main-content", ".article-body"]  
        }  
    };  
    await smartuiSnapshot(driver, 'Content Only', options);  
    

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#best-practices "Direct link to Best Practices")

  * Trust Automatic Handling
  * Test Sticky Element Pages
  * Review Snapshots
  * Combine with Other Features
  * Combine with Other Features

**Trust Automatic Handling**

SmartUI's automatic handling works for most cases. Only use manual configuration if you encounter specific issues.

**Test Sticky Element Pages**

Verify that pages with sticky elements work correctly with SmartUI before running full test suites.

**Review Snapshots**

Occasionally review captured snapshots to ensure sticky elements are handled correctly.

**Combine with Other Features**

You can combine sticky element handling with other SmartUI features like dynamic data handling.

**Combine with Other Features**

You can combine sticky element handling with other SmartUI features like dynamic data handling.

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#troubleshooting "Direct link to Troubleshooting")

  * Sticky Elements Still Causing False Positives
  * Sticky Elements Not Visible in Snapshots
  * Sticky Elements Overlapping Content

**Issue: Sticky Elements Still Causing False Positives**

**Symptoms** : Sticky elements appear to cause differences in comparisons

**Solutions** :

  1. Verify the element is actually sticky (check CSS `position` property)
  2. Use `ignoreDOM` to exclude problematic sticky elements
  3. Check if element has dynamic content (may need dynamic data handling)

    
    
    // Ignore sticky element with dynamic content  
    let options = {  
        ignoreDOM: {  
            cssSelector: [".sticky-header .notification-badge"]  
        }  
    };  
    await smartuiSnapshot(driver, 'Page', options);  
    

**Issue: Sticky Elements Not Visible in Snapshots**

**Symptoms** : Sticky elements don't appear in captured screenshots

**Solutions** :

  1. Check if element is loaded via JavaScript (may need wait time)
  2. Verify element is in the DOM before snapshot
  3. Use `waitForTimeout` if element loads dynamically

    
    
    // Wait for sticky element to load  
    await driver.wait(until.elementLocated(By.css('.sticky-header')), 10000);  
    await smartuiSnapshot(driver, 'Page');  
    

**Issue: Sticky Elements Overlapping Content**

**Symptoms** : Sticky elements appear to overlap with page content

**Solutions** :

  1. This is normal behavior - SmartUI positions elements at their original location
  2. If overlap causes issues, use `ignoreDOM` for the sticky element
  3. Consider using viewport screenshots instead of full-page for specific tests

## Limitations[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#limitations "Direct link to Limitations")

### JavaScript-Controlled Sticky Elements[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#javascript-controlled-sticky-elements "Direct link to JavaScript-Controlled Sticky Elements")

  * Elements that become sticky via JavaScript (not CSS) may need special handling
  * Ensure JavaScript has executed before taking snapshots

### Dynamic Sticky Elements[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#dynamic-sticky-elements "Direct link to Dynamic Sticky Elements")

  * Sticky elements with dynamic content may need additional handling
  * Combine with dynamic data handling features if needed

### Complex Sticky Behaviors[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#complex-sticky-behaviors "Direct link to Complex Sticky Behaviors")

  * Very complex sticky behaviors (multiple sticky elements, conditional stickiness) may need manual configuration
  * Test thoroughly before relying on automatic handling

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-handle-sticky-elements#additional-resources "Direct link to Additional Resources")

  * [Handling Dynamic Data](https://www.testmuai.com/support/docs/smartui-handle-dynamic-data)
  * [Handling Videos](https://www.testmuai.com/support/docs/smartui-handle-videos)
  * [Handling Lazy Loading](https://www.testmuai.com/support/docs/smartui-handle-lazy-loading)
  * [SmartUI Configuration Options](https://www.testmuai.com/support/docs/smartui-sdk-config-options)

---

*Auto-generated from TestMu AI documentation.*