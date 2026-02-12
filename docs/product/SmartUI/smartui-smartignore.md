# Ignoring Displacement Differences using Smart Ignore

> **Source**: [https://www.testmuai.com/support/docs/smartui-smartignore](https://www.testmuai.com/support/docs/smartui-smartignore)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:03:53.799004

---

On this page

* * *

SmartUI's `Smart Ignore` engine is specifically designed to address the challenges that arise when testing dynamic and content-rich web applications. Often, when content is added or removed from a page, it causes other elements to be displaced, leading to numerous false positives in traditional pixel-by-pixel comparisons. Smart Ignore intelligently hides these displacement differences, allowing you to concentrate on actual content changes that impact the user experience.

### Key Features of Smart Ignore[â](https://www.testmuai.com/support/docs/smartui-smartignore#key-features-of-smart-ignore "Direct link to Key Features of Smart Ignore")

#### 1\. Displacement-Aware Comparison:[â](https://www.testmuai.com/support/docs/smartui-smartignore#1-displacement-aware-comparison "Direct link to 1. Displacement-Aware Comparison:")

Smart Ignore distinguishes between content changes and mere content displacement. It hides differences arising from elements that have shifted position but have not otherwise changed, reducing visual noise and making it easier to spot true content differences.

#### 2\. Clutter Reduction:[â](https://www.testmuai.com/support/docs/smartui-smartignore#2-clutter-reduction "Direct link to 2. Clutter Reduction:")

In scenarios where large areas of the page are impacted by content displacement, traditional pixel to pixel comparison would highlight these areas in a blurred and cluttered manner making it difficult to identify the actual content changes. Smart Ignore minimizes this clutter, highlighting only those areas where content has genuinely changed. In the image below you can see confusing comparison due to the `pixel to pixel` approach, which is unable to highlight the actual reasons behind the mismatch.

![cmd](https://www.testmuai.com/support/assets/images/p2p-978b40fbd8dc5897e6d8c8ed3e6dae77.webp)

#### 3\. Targeted Visual Testing:[â](https://www.testmuai.com/support/docs/smartui-smartignore#3-targeted-visual-testing "Direct link to 3. Targeted Visual Testing:")

By focusing only on the significant changes, **Smart Ignore** enhances the precision of your visual testing. This feature is particularly useful when testing pages where frequent updates or dynamic content are expected, ensuring that only the most relevant differences are brought to your attention. In the image below you can see the actual changes being highlighted as Smart Ignore understands the images and yields out the best results.

![cmd](https://www.testmuai.com/support/assets/images/smartignore-cfdc879f1d52a370c6838efac098433c.webp)

## How to Use Smart Ignore?[â](https://www.testmuai.com/support/docs/smartui-smartignore#how-to-use-smart-ignore "Direct link to How to Use Smart Ignore?")

#### 1\. Applying Smart Ignore via Project Settings[â](https://www.testmuai.com/support/docs/smartui-smartignore#1-applying-smart-ignore-via-project-settings "Direct link to 1. Applying Smart Ignore via Project Settings")

In your SmartUI dashboard, navigate to your project settings. Under "Comparison Options," switch on the `Smart Ignore` toggle across all visual tests in the project.This ensures Smart Ignore will be applied throughout the project with option to see other comparison modes as well on screenshot level according to the usecase.

![cmd](https://www.testmuai.com/support/assets/images/Toggle-ffc6e21cded88c8efd2fdce262dab043.png)

#### 2\. Using Smart Ignore per Screenshot[â](https://www.testmuai.com/support/docs/smartui-smartignore#2-using-smart-ignore-per-screenshot "Direct link to 2. Using Smart Ignore per Screenshot")

After running your visual test, go to the comparison page. For each screenshot, choose the "Smart Ignore" mode from the "Diff Options" dropdown. This allows you to selectively apply Smart Ignore to specific screenshots, making it easier to identify true differences in content.

![cmd](https://www.testmuai.com/support/assets/images/Dropdown-4-583ee050d34fe9d5296ae36242b50427.png)

## Use Cases of Smart Ignore[â](https://www.testmuai.com/support/docs/smartui-smartignore#use-cases-of-smart-ignore "Direct link to Use Cases of Smart Ignore")

#### Content Management Systems[â](https://www.testmuai.com/support/docs/smartui-smartignore#content-management-systems "Direct link to Content Management Systems")

**Scenario:** A page frequently updated with new articles or images causes other elements to shift position.

**Solution:** Smart Ignore hides the displacement-related differences, allowing you to focus solely on the content that has been added or modified.

#### E-commerce Platforms[â](https://www.testmuai.com/support/docs/smartui-smartignore#e-commerce-platforms "Direct link to E-commerce Platforms")

**Scenario:** Adding or removing products from a page often displaces other items, leading to a large number of false positives.

**Solution:** Use Smart Ignore to ignore these shifts and concentrate on detecting actual changes in product listings, descriptions, or images.

#### Large-Scale UI Changes[â](https://www.testmuai.com/support/docs/smartui-smartignore#large-scale-ui-changes "Direct link to Large-Scale UI Changes")

**Scenario:** A major UI overhaul causes a significant portion of the page layout to change, making it difficult to identify specific content changes.

**Solution:** Apply Smart Ignore to filter out layout shifts, making it easier to identify key differences in the content itself.

## Limitations[â](https://www.testmuai.com/support/docs/smartui-smartignore#limitations "Direct link to Limitations")

### Current Limitations[â](https://www.testmuai.com/support/docs/smartui-smartignore#current-limitations "Direct link to Current Limitations")

Smart Ignore has the following current limitations:

  1. **Element Ignoring Not Supported** : Smart Ignore currently does not support ignoring specific DOM elements using `ignoreDOM` options. If you need to ignore specific elements, use the standard comparison mode with `ignoreDOM` in your test code.

  2. **Project Settings Integration** : Smart Ignore does not currently integrate with all comparison options available in Project Settings (such as pixel threshold, custom mismatch options). These settings may not apply when Smart Ignore is enabled.

  3. **Layout Comparison Mode** : Smart Ignore works differently from Layout Comparison mode. If you need to compare only layout structure, use Layout Comparison mode instead.

### When Not to Use Smart Ignore[â](https://www.testmuai.com/support/docs/smartui-smartignore#when-not-to-use-smart-ignore "Direct link to When Not to Use Smart Ignore")

Smart Ignore may not be suitable for:

  * **Precise Pixel Comparisons** : When you need exact pixel-by-pixel accuracy
  * **Layout-Only Testing** : When you want to test only layout structure (use Layout Comparison instead)
  * **Element-Specific Ignoring** : When you need to ignore specific elements (use `ignoreDOM` instead)
  * **Very Small Changes** : When you need to detect very minor visual changes

## Best Practices[â](https://www.testmuai.com/support/docs/smartui-smartignore#best-practices "Direct link to Best Practices")

  * Start with Project-Level Toggle
  * Combine with Other Features
  * Review Results Regularly
  * Use Per-Screenshot Mode for Testing
  * Use Per-Screenshot Mode for Testing

**Start with Project-Level Toggle**

Enable Smart Ignore at the project level for consistent behavior across all tests. You can still switch to other comparison modes per screenshot if needed.

**Combine with Other Features**

Smart Ignore works well with:

  * Dynamic data handling for content that changes
  * Layout comparison for structure-focused testing
  * Custom CSS for test-specific styling

**Review Results Regularly**

While Smart Ignore reduces false positives, regularly review results to ensure it's not hiding important changes.

**Use Per-Screenshot Mode for Testing**

When testing Smart Ignore, use per-screenshot mode to compare results with other comparison modes and find the best approach for each test case.

**Use Per-Screenshot Mode for Testing**

When testing Smart Ignore, use per-screenshot mode to compare results with other comparison modes and find the best approach for each test case.

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-smartignore#troubleshooting "Direct link to Troubleshooting")

  * Smart Ignore Not Available
  * Too Many Differences Still Shown
  * Important Changes Hidden
  * Inconsistent Results

**Issue: Smart Ignore Not Available**

**Symptoms** : Smart Ignore toggle or option is not visible

**Solutions** :

  1. Verify you're using a supported SmartUI plan
  2. Check if your project type supports Smart Ignore
  3. Contact support if the feature should be available

**Issue: Too Many Differences Still Shown**

**Symptoms** : Smart Ignore still shows many differences

**Solutions** :

  1. Verify Smart Ignore is actually enabled (check toggle state)
  2. Some differences may be actual content changes, not displacement
  3. Consider using Layout Comparison mode for layout-only testing
  4. Combine with `ignoreDOM` for specific elements

**Issue: Important Changes Hidden**

**Symptoms** : Smart Ignore hides changes you want to see

**Solutions** :

  1. Switch to Pixel-to-Pixel mode for that specific screenshot
  2. Use per-screenshot mode to see all comparison types
  3. Review the baseline to ensure it's correct
  4. Consider if the change is actually a displacement vs content change

**Issue: Inconsistent Results**

**Symptoms** : Smart Ignore shows different results for similar changes

**Solutions** :

  1. Ensure consistent baseline images
  2. Check if page content is loading consistently
  3. Verify Smart Ignore is enabled consistently
  4. Review page structure for dynamic content issues

## Comparison with Other Modes[â](https://www.testmuai.com/support/docs/smartui-smartignore#comparison-with-other-modes "Direct link to Comparison with Other Modes")

### Smart Ignore vs Pixel-to-Pixel[â](https://www.testmuai.com/support/docs/smartui-smartignore#smart-ignore-vs-pixel-to-pixel "Direct link to Smart Ignore vs Pixel-to-Pixel")

Feature| Smart Ignore| Pixel-to-Pixel  
---|---|---  
Displacement Handling| â Automatic| â Shows all differences  
False Positives| â Reduced| â Higher rate  
Precision| Medium| High  
Best For| Dynamic content pages| Precise comparisons  
  
### Smart Ignore vs Layout Comparison[â](https://www.testmuai.com/support/docs/smartui-smartignore#smart-ignore-vs-layout-comparison "Direct link to Smart Ignore vs Layout Comparison")

Feature| Smart Ignore| Layout Comparison  
---|---|---  
Content Changes| â Detected| â Ignored  
Layout Changes| â Detected| â Detected  
Displacement| â Ignored| â Ignored  
Best For| Content + layout| Layout only  
  
## Additional Resources[â](https://www.testmuai.com/support/docs/smartui-smartignore#additional-resources "Direct link to Additional Resources")

  * [Project Settings](https://www.testmuai.com/support/docs/smartui-project-settings)
  * [Layout Comparison](https://www.testmuai.com/support/docs/smartui-layout-testing)
  * [Handling Dynamic Data](https://www.testmuai.com/support/docs/smartui-handle-dynamic-data)
  * [Baseline Management](https://www.testmuai.com/support/docs/smartui-baseline-management)

* * *

> **Note** : Smart Ignore is continuously being improved. Features like element ignoring and enhanced Project Settings integration are planned for future releases. Check the [release notes](https://www.testmuai.com/support/docs/) for updates.

---

*Auto-generated from TestMu AI documentation.*