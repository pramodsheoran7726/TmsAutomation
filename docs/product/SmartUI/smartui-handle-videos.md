# Handle Pages with Videos

> **Source**: [https://www.testmuai.com/support/docs/smartui-handle-videos](https://www.testmuai.com/support/docs/smartui-handle-videos)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:14.076993

---

On this page

## Overview[â](https://www.testmuai.com/support/docs/smartui-handle-videos#overview "Direct link to Overview")

Web pages often contain video content that plays dynamically, changing frame by frame. In visual regression testing, this dynamic content can cause false positives because each frame of the video appears different, even when the actual page design and layout remain unchanged.

SmartUI automatically handles video content by capturing the first frame of videos during visual comparison, ensuring that dynamic video playback doesn't interfere with your visual regression tests.

## How SmartUI Handles Videos[â](https://www.testmuai.com/support/docs/smartui-handle-videos#how-smartui-handles-videos "Direct link to How SmartUI Handles Videos")

### Automatic First Frame Capture[â](https://www.testmuai.com/support/docs/smartui-handle-videos#automatic-first-frame-capture "Direct link to Automatic First Frame Capture")

When SmartUI encounters a video element on a page, it automatically:

  1. **Captures the First Frame** : Extracts the initial frame of the video as a static image
  2. **Treats as Static Content** : Uses this first frame as a stable reference point for comparison
  3. **Ignores Playback Changes** : Subsequent frames and playback changes are not considered in the comparison

This approach ensures that:

  * Video content doesn't cause false positives
  * The page layout and design are accurately compared
  * Test results focus on actual UI changes, not video playback

### Process Flow[â](https://www.testmuai.com/support/docs/smartui-handle-videos#process-flow "Direct link to Process Flow")
    
    
    Page Load â Video Detection â First Frame Extraction â Static Image Comparison â Results  
    

## Benefits[â](https://www.testmuai.com/support/docs/smartui-handle-videos#benefits "Direct link to Benefits")

### Accurate Visual Testing[â](https://www.testmuai.com/support/docs/smartui-handle-videos#accurate-visual-testing "Direct link to Accurate Visual Testing")

By capturing only the first frame, SmartUI ensures that visual regression tests focus on static layout and design elements rather than dynamic video content. This provides more reliable and meaningful test results.

### Efficient Workflow[â](https://www.testmuai.com/support/docs/smartui-handle-videos#efficient-workflow "Direct link to Efficient Workflow")

No manual configuration or custom scripts are required. SmartUI automatically handles video content, reducing the need for:

  * Custom video handling code
  * Manual video pausing scripts
  * Complex workarounds for dynamic content

### Improved Test Reliability[â](https://www.testmuai.com/support/docs/smartui-handle-videos#improved-test-reliability "Direct link to Improved Test Reliability")

False positives caused by video playback variations are eliminated, resulting in:

  * More stable test results
  * Reduced manual review time
  * Higher confidence in test outcomes

## Use Cases[â](https://www.testmuai.com/support/docs/smartui-handle-videos#use-cases "Direct link to Use Cases")

### Use Case 1: Product Demo Pages[â](https://www.testmuai.com/support/docs/smartui-handle-videos#use-case-1-product-demo-pages "Direct link to Use Case 1: Product Demo Pages")

**Scenario** : Product pages feature embedded demo videos that auto-play or change frames.

**Solution** : SmartUI automatically captures the first frame, allowing you to focus on comparing the page layout, product information, and static elements without video interference.

### Use Case 2: Marketing Landing Pages[â](https://www.testmuai.com/support/docs/smartui-handle-videos#use-case-2-marketing-landing-pages "Direct link to Use Case 2: Marketing Landing Pages")

**Scenario** : Landing pages include hero videos or background videos that play continuously.

**Solution** : The first frame is captured, ensuring consistent comparison of the overall page design, call-to-action buttons, and static content.

### Use Case 3: Video Gallery Pages[â](https://www.testmuai.com/support/docs/smartui-handle-videos#use-case-3-video-gallery-pages "Direct link to Use Case 3: Video Gallery Pages")

**Scenario** : Pages with multiple video thumbnails or video galleries where thumbnails may change.

**Solution** : SmartUI captures the initial state of all videos, providing stable baseline for comparing gallery layouts and page structure.

### Use Case 4: Educational Content Pages[â](https://www.testmuai.com/support/docs/smartui-handle-videos#use-case-4-educational-content-pages "Direct link to Use Case 4: Educational Content Pages")

**Scenario** : Educational platforms with embedded tutorial videos or course previews.

**Solution** : First frame capture ensures that course layouts, navigation, and static content are accurately compared while ignoring video playback variations.

## Configuration[â](https://www.testmuai.com/support/docs/smartui-handle-videos#configuration "Direct link to Configuration")

SmartUI handles videos automatically with no additional configuration required. However, you can enhance video handling by:

### Using waitForTimeout[â](https://www.testmuai.com/support/docs/smartui-handle-videos#using-waitfortimeout "Direct link to Using waitForTimeout")

If videos take time to load, you can add a wait timeout to ensure the first frame is captured correctly:
    
    
    {  
      "web": {  
        "browsers": ["chrome"],  
        "viewports": [[1920, 1080]]  
      },  
      "waitForTimeout": 3000  
    }  
    

### Combining with Other Features[â](https://www.testmuai.com/support/docs/smartui-handle-videos#combining-with-other-features "Direct link to Combining with Other Features")

You can combine video handling with other SmartUI features:

**Example: Ignoring video controls while keeping the first frame**
    
    
    let options = {  
        ignoreDOM: {  
            cssSelector: [".video-controls", ".play-button"]  
        }  
    };  
    await smartuiSnapshot(driver, 'Video Page', options);  
    

## Limitations and Considerations[â](https://www.testmuai.com/support/docs/smartui-handle-videos#limitations-and-considerations "Direct link to Limitations and Considerations")

### Supported Video Formats[â](https://www.testmuai.com/support/docs/smartui-handle-videos#supported-video-formats "Direct link to Supported Video Formats")

SmartUI handles standard HTML5 video elements:

  * `<video>` tags with standard formats (MP4, WebM, OGG)
  * Embedded videos via iframe (YouTube, Vimeo, etc.)
  * Video elements with autoplay attributes

### First Frame Consistency[â](https://www.testmuai.com/support/docs/smartui-handle-videos#first-frame-consistency "Direct link to First Frame Consistency")

  * The first frame captured may vary slightly if videos have different loading times
  * Videos with preload="none" may not have a first frame immediately available
  * Consider using `waitForTimeout` for videos that load slowly

### Video Overlays[â](https://www.testmuai.com/support/docs/smartui-handle-videos#video-overlays "Direct link to Video Overlays")

  * Video controls, overlays, and UI elements are included in the snapshot
  * Use `ignoreDOM` if you need to exclude video controls from comparison
  * Overlays that appear after the first frame are not captured

### Autoplay Videos[â](https://www.testmuai.com/support/docs/smartui-handle-videos#autoplay-videos "Direct link to Autoplay Videos")

  * Autoplay videos are handled the same way as regular videos
  * The first frame is captured regardless of autoplay status
  * Videos that start playing immediately still have their first frame captured

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-handle-videos#best-practices "Direct link to Best Practices")

  * Allow Video Loading
  * Test Video Pages
  * Combine with Other Features
  * Document Video Content
  * Review First Frames

**Allow Video Loading**

Use appropriate `waitForTimeout` values to ensure videos are loaded before snapshots.

**Test Video Pages**

Verify that video pages work correctly with SmartUI before running full test suites.

**Combine with Other Features**

Use `ignoreDOM` to exclude video controls if needed.

**Document Video Content**

Note which pages contain videos for better test planning.

**Review First Frames**

Occasionally review captured first frames to ensure they represent the intended baseline.

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-handle-videos#troubleshooting "Direct link to Troubleshooting")

  * Videos Not Captured Correctly
  * False Positives from Video Areas
  * Embedded Videos (YouTube, Vimeo)

**Issue: Videos Not Captured Correctly**

**Symptoms** : Video areas appear blank or incorrect in snapshots

**Solutions** :

  1. Increase `waitForTimeout` to allow videos to load
  2. Check if videos are loaded via JavaScript (may need explicit waits)
  3. Verify video elements are present in the DOM before snapshot

    
    
    // Wait for video to load  
    await driver.wait(until.elementLocated(By.tagName('video')), 10000);  
    await driver.sleep(2000); // Additional wait for first frame  
    await smartuiSnapshot(driver, 'Video Page');  
    

**Issue: False Positives from Video Areas**

**Symptoms** : Video areas show differences even when page design is unchanged

**Solutions** :

  1. Verify SmartUI is capturing first frames (check baseline images)
  2. Use `ignoreDOM` to exclude video elements if first frame capture isn't sufficient
  3. Consider using layout comparison mode for pages with many videos

**Issue: Embedded Videos (YouTube, Vimeo)**

**Symptoms** : Embedded videos via iframe may not be captured correctly

**Solutions** :

  1. Embedded videos in iframes are handled automatically
  2. If issues persist, consider using `ignoreDOM` for iframe areas
  3. Check if iframe content is accessible (CORS policies may affect this)

## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-handle-videos#additional-resources "Direct link to Additional Resources")

  * [Comprehensive Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide) \- Solutions for video-related issues
  * [Handling Dynamic Data](https://www.testmuai.com/support/docs/smartui-handle-dynamic-data) \- Handle other dynamic content types
  * [Handling Lazy Loading](https://www.testmuai.com/support/docs/smartui-handle-lazy-loading) \- Handle lazy-loaded content
  * [SmartUI Configuration Options](https://www.testmuai.com/support/docs/smartui-sdk-config-options) \- Configure `waitForTimeout` and other options
  * [Smart Ignore Feature](https://www.testmuai.com/support/docs/smartui-smartignore) \- Automatically ignore layout shifts
  * [Project Settings](https://www.testmuai.com/support/docs/smartui-project-settings) \- Configure comparison settings and thresholds

---

*Auto-generated from TestMu AI documentation.*