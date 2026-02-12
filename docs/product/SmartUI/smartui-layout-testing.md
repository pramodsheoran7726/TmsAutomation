# Layout Comparison in SmartUI SDK

> **Source**: [https://www.testmuai.com/support/docs/smartui-layout-testing](https://www.testmuai.com/support/docs/smartui-layout-testing)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:21.395633

---

On this page

Layout testing is a specialized approach to visual testing that focuses on verifying the structural integrity and arrangement of UI elements rather than their specific content or styling. It ensures that your application's visual hierarchy and element positioning remain consistent across different environments and updates.

The example below demonstrates localisation testing, one of the major use cases of layout testing, where a webpage is tested across languages and locales.

![cmd](https://www.testmuai.com/support/assets/images/localisation-netflix-2083b2ef32cebc03f00b5114ba18488b.webp)

### Why Layout Testing Matters[â](https://www.testmuai.com/support/docs/smartui-layout-testing#why-layout-testing-matters "Direct link to Why Layout Testing Matters")

  1. **Structural Consistency** : Ensures that UI elements maintain their intended positions and relationships, regardless of content changes or style updates.

  2. **Cross-Environment Reliability** : Validates that your application's layout remains intact across different:

     * Operating systems
     * Browsers
     * Devices
     * Screen sizes
     * Viewport dimensions
  3. **Design System Compliance** : Helps maintain consistency with your design system by verifying that components follow established layout patterns.

# What Layout Comparison Ignores

When using layout comparison, the following aspects are ignored:

  1. **Text Content** : Changes in text content are not considered in the comparison
  2. **Color Values** : Differences in color schemes or individual color values are ignored
  3. **Style Properties** : Changes in CSS properties like font size, padding, margins, etc. are not compared
  4. **Image Content** : Differences in image content are ignored, only their position and size are considered

## Visual Diffs vs. Layout Diffs[â](https://www.testmuai.com/support/docs/smartui-layout-testing#visual-diffs-vs-layout-diffs "Direct link to Visual Diffs vs. Layout Diffs")

Understanding the difference between content and layout is crucial for effective visual testing:

  * **Visual Diffs** refer to the actual information that users interact with on a webpage, such as text, images, videos, and other elements that convey your message. In the example below, you can see the visual differences between the baseline and comparison screenshot using Smart Ignore Diff Option.

![cmd](https://www.testmuai.com/support/assets/images/smartignore-amazon-594d74f07f757a9d471102e47d84357e.webp)

  * **Layout** pertains to the arrangement and presentation of this content, including the positioning, styling, and structuring of elements. The goal of layout design is to ensure that content is visually appealing and well-organized. In the example below, you can see the layout differences between the baseline and comparison screenshot using Layout Diff Option.

![cmd](https://www.testmuai.com/support/assets/images/layout-amazon-c5bcbc3a499e7f487b622194523ec908.webp)

SmartUI's layout comparison feature allows you to focus specifically on layout differences while ignoring content changes, giving you more precise control over your visual testing process.

# Layout Comparison in SmartUI SDK

## Prerequisites[â](https://www.testmuai.com/support/docs/smartui-layout-testing#prerequisites "Direct link to Prerequisites")

Before using the Layout Comparison feature, ensure you meet the following requirements:

  * SmartUI CLI version `4.1.8` or above is installed
  * The feature is only supported when using the `smartui exec` (smartUISnapshot) command
  * The feature must be enabled by contacting [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#790a0c0909160b0d390d1c0a0d140c571810)

## How to Use Layout Comparison with SmartUI[â](https://www.testmuai.com/support/docs/smartui-layout-testing#how-to-use-layout-comparison-with-smartui "Direct link to How to Use Layout Comparison with SmartUI")

To use the layout comparison feature, you need to set the `ignoreType` option to `"layout"` when taking a screenshot:

  * JavaScript
  * Java
  * Python
  * C#
  * Ruby

    
    
    // Set options to focus only on layout structure  
    let options = {  
            ignoreType: ["layout"]  
          }  
      
    // Take a screenshot with layout comparison enabled  
    await smartuiSnapshot(driver, "ScreenshotName", options);  
    
    
    
    // Set options to focus only on layout structure  
    Map<String, Object> options = new HashMap<>();  
    options.put("ignoreType", Arrays.asList("layout"));  
      
    // Take a screenshot with layout comparison enabled  
    smartuiSnapshot(driver, "ScreenshotName", options);  
    
    
    
    # Set options to focus only on layout structure  
    options = {  
        "ignoreType": ["layout"]  
    }  
      
    # Take a screenshot with layout comparison enabled  
    smartui_snapshot(driver, "ScreenshotName", options)  
    
    
    
    // Set options to focus only on layout structure  
    var options = new Dictionary<string, object>  
    {  
        { "ignoreType", new List<string> { "layout" } }  
    };  
      
    // Take a screenshot with layout comparison enabled  
    await SmartUI.Snapshot(driver, "ScreenshotName", options);  
    
    
    
    # Set options to focus only on layout structure  
    options = {  
      ignoreType: ["layout"]  
    }  
      
    # Take a screenshot with layout comparison enabled  
    smartui_snapshot(driver, "ScreenshotName", options)  
    

## Known Limitations[â](https://www.testmuai.com/support/docs/smartui-layout-testing#known-limitations "Direct link to Known Limitations")

The Layout Comparison feature has the following limitations:

  * Not supported with Fetch APIs
  * Not supported with Slack, Email, and GitHub integrations
  * Performance may vary based on the complexity of the page structure

## Use Cases for Layout Comparison[â](https://www.testmuai.com/support/docs/smartui-layout-testing#use-cases-for-layout-comparison "Direct link to Use Cases for Layout Comparison")

The layout comparison feature is particularly valuable in the following scenarios:

  1. **Component Library Development** : When developing reusable components, you may want to verify that the layout structure remains consistent while allowing for content and style variations.

  2. **Responsive Design Testing** : When testing responsive layouts across different screen sizes, you may want to focus on ensuring the layout structure adapts correctly while ignoring specific content or style changes.

  3. **Design System Implementation** : When implementing a design system, you may need to verify that the layout structure follows the established patterns while allowing for content and style variations.

  4. **A/B Testing** : During A/B testing of different layouts, you may want to compare the structural integrity while ignoring the intentional content and style differences between variants.

  5. **Multi-language Testing** : When testing websites in different languages, you may want to verify that the layout structure remains consistent despite text length variations.

  6. **Cross-Environment Testing** : Ensure that your page structure remains intact across different operating systems, browsers, devices, viewport sizes, and orientations.

## Example Implementation[â](https://www.testmuai.com/support/docs/smartui-layout-testing#example-implementation "Direct link to Example Implementation")

Here's a complete example showing how to implement layout comparison in a test:
    
    
    describe('Layout Structure Test', () => {  
      it('should verify layout structure while ignoring content and style changes', async () => {  
        // Navigate to the page  
        await driver.get('https://example.com');  
      
        // Wait for layout to stabilize (important for dynamic content)  
        await driver.wait(until.elementLocated(By.cssSelector('.main-content')), 5000);  
      
        // Configure options to focus only on layout structure  
        let options = {  
          ignoreType: ["layout"]  
        };  
      
        // Take screenshot with layout comparison  
        await smartuiSnapshot(driver, "HomePageLayout", options);  
      });  
    });  
    

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-layout-testing#additional-resources "Direct link to Additional Resources")

  * [SmartUI SDK Documentation](https://www.testmuai.com/support/docs/smartui-sdk-config-options)
  * [Visual Regression Testing Guide](https://www.testmuai.com/support/docs/smart-visual-testing)
  * [Comparison Settings Documentation](https://www.testmuai.com/support/docs/test-settings-options)

---

*Auto-generated from TestMu AI documentation.*