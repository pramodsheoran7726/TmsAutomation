# Build Comparison - Compare Test Builds and Track Regressions

> **Source**: [https://www.testmuai.com/support/docs/analytics-build-comparison](https://www.testmuai.com/support/docs/analytics-build-comparison)

**Product**: Insights

**Last Crawled**: 2026-01-27T20:47:31.968620

---

On this page

* * *

## Overview[â](https://www.testmuai.com/support/docs/analytics-build-comparison#overview "Direct link to Overview")

Build Comparison allows you to compare two builds side by side to instantly see what changed - which tests started failing, which got fixed, and which remain stable. Use it to validate releases, debug regressions, and track test stability.

## Accessing Build Comparison[â](https://www.testmuai.com/support/docs/analytics-build-comparison#accessing-build-comparison "Direct link to Accessing Build Comparison")

  1. Navigate to **Insights** â **Build Insights**
  2. Click on any build to open the **Build Details** page
  3. Select the **Compare** tab

## Selecting Builds to Compare[â](https://www.testmuai.com/support/docs/analytics-build-comparison#selecting-builds-to-compare "Direct link to Selecting Builds to Compare")

When you first open the Compare tab, you'll see an empty state prompting you to select a build for comparison.

![Build Comparison - Empty State](https://www.testmuai.com/support/assets/images/build-comparison-empty-state-c1fa8269b0a91c7babe29ee417ecff37.webp)

Click **Select build to compare** to open the build selection dialog.

### Build Selection Dialog[â](https://www.testmuai.com/support/docs/analytics-build-comparison#build-selection-dialog "Direct link to Build Selection Dialog")

![Build Comparison - Select Build Dialog](https://www.testmuai.com/support/assets/images/build-comparison-select-build-90b080d44af053e83f3b9dedaf1dc78d.webp)

The dialog provides options to find builds:

Option| Description  
---|---  
**Past runs of same build**|  Shows previous executions of the current build (default)  
**All Builds**|  Shows all builds across your account for cross-build comparison  
**Search**|  Search bar to find builds by name  
  
Each build in the list displays:

  * **Build Name** \- Full build identifier
  * **Duration** \- Total execution time (e.g., 52m 53s)
  * **Test Count** \- Number of tests executed
  * **Execution Timestamp** \- Execution date and time
  * **User** \- Associated username who executed the build (e.g., atxSmoke)
  * **Results Summary** \- Quick pass/fail/other counts (ð¢ passed, ð´ failed, â« other)

Select a build and click **Compare Builds** to run the comparison. The selected build becomes the **Compare** build, while the current build you navigated from becomes the **Base** build.

tip

For release validation, select your last stable production build as **Base** and the release candidate as **Compare**.

* * *

## Key Comparison Metrics[â](https://www.testmuai.com/support/docs/analytics-build-comparison#key-comparison-metrics "Direct link to Key Comparison Metrics")

![Build Comparison - Key Metrics Summary](https://www.testmuai.com/support/assets/images/build-comparison-summary-b6f9e95b0f8a8c59cee4b29c53a17b0a.webp)

Understanding Failed Statuses

The following statuses are considered **failed statuses** : **Failed** , **Error** , **Lambda Error** , **Idle Timeout** , and **Queue Timeout**. Change detection is based on whether a test transitions to or from these statuses.

Metric| Description| When to Act  
---|---|---  
**New Failures**|  Tests not failing in Base but failing in Compare (see details below)| ð¨ Investigate immediately before release - these are regressions  
**Pass Rate**|  Percentage of passed tests with delta (â or â) from Base.| Set release gates (e.g., "Release only if >95%")  
**Fixed**|  Tests that failed in Base but passed in Compare.| Verify fixes are genuine, not flaky behavior  
**No Change**|  Tests with same non-passing status in both builds.| Review for persistent infrastructure issues  
**Additional Tests**|  New tests in Compare not present in Base.| Confirm new features have test coverage  
**Dropped Tests**|  Tests in Base but missing from Compare.| â ï¸ Investigate if not intentionally removed  
  
### Understanding New Failures[â](https://www.testmuai.com/support/docs/analytics-build-comparison#understanding-new-failures "Direct link to Understanding New Failures")

The **New Failures** metric includes two scenarios:

Scenario| Description| Label in Table  
---|---|---  
**Regression**|  Test existed in Base with a non-failed status but has a failed status in Compare| New Failure  
**New test failing**|  Test did not exist in Base but has a failed status in Compare| New Failure (Additional)  
  
Both scenarios are counted together in the **New Failures** metric shown in the summary cards and charts. In the Test Instances table, tests that didn't exist in Base are labeled as **New Failure (Additional)** to help you distinguish between regressions in existing tests versus failures in newly added tests.

* * *

## Results Comparison Chart[â](https://www.testmuai.com/support/docs/analytics-build-comparison#results-comparison-chart "Direct link to Results Comparison Chart")

![Build Comparison - Results Comparison and Status Changes Charts](https://www.testmuai.com/support/assets/images/build-comparison-charts-53a0548cde54b57b50c9603b180bee89.webp)

The horizontal bar chart compares test counts by status between builds:

  * **Purple bar** : Base build
  * **Orange bar** : Compare build

If the orange bar is longer for Failed/Error statuses, more tests are failing in the newer build.

## Status Changes Chart[â](https://www.testmuai.com/support/docs/analytics-build-comparison#status-changes-chart "Direct link to Status Changes Chart")

The donut chart categorizes tests by how their status changed:

Category| Description| Action  
---|---|---  
**New Failures**|  Non-failed â Failed (includes New Failure Additional)| Prioritize - check recent code changes  
**Fixed Instances**|  Failed â Passed| Verify fix is stable, not flaky  
**Stable Instances**|  Passed â Passed| No action - reliable tests â  
**Consistent Failures**|  Failed in both builds| Triage - document or fix before release  
  
* * *

## Test Instances Comparison Table[â](https://www.testmuai.com/support/docs/analytics-build-comparison#test-instances-comparison-table "Direct link to Test Instances Comparison Table")

![Build Comparison - Test Instances Comparison Table](https://www.testmuai.com/support/assets/images/build-comparison-table-fc3ab94421857f496a6263c19570634e.webp) Column| Description| Use Case  
---|---|---  
**Test Instances**|  Test name, spec file, platform, browser| Click to view detailed logs and recordings  
**Base**|  Status and duration in Base build| Reference point for comparison  
**Compare**|  Status and duration in Compare build| Identify status changes at a glance  
**Duration Change**|  Time difference (+slower, -faster)| Flag tests with >30% increase for performance review  
**Change Type**|  Stable, Status Change, Fixed, New Failure (Additional), etc.| Filter to focus on specific change categories  
  
### Filtering Options[â](https://www.testmuai.com/support/docs/analytics-build-comparison#filtering-options "Direct link to Filtering Options")

Filter| Description  
---|---  
**All**|  Filter by change type  
**Search**|  Find tests by name or spec file  
**OS**|  Filter by operating system  
**Browser**|  Filter by browser type  
**Test Tags**|  Filter by custom tags  
  
tip

Use filters to isolate platform-specific issues. If failures only occur on a specific browser or OS, it helps prioritize the fix.

* * *

## Common Use Cases[â](https://www.testmuai.com/support/docs/analytics-build-comparison#common-use-cases "Direct link to Common Use Cases")

### Pre-Release Validation[â](https://www.testmuai.com/support/docs/analytics-build-comparison#pre-release-validation "Direct link to Pre-Release Validation")

Compare your last stable build (Base) with the release candidate (Compare). Proceed only if **New Failures = 0** and pass rate meets standards.

### Debugging a Broken Build[â](https://www.testmuai.com/support/docs/analytics-build-comparison#debugging-a-broken-build "Direct link to Debugging a Broken Build")

Compare the last passing build (Base) with the failing build (Compare). Review **New Failures** and use filters to isolate platform-specific issues.

### Measuring Stabilization Progress[â](https://www.testmuai.com/support/docs/analytics-build-comparison#measuring-stabilization-progress "Direct link to Measuring Stabilization Progress")

Compare the sprint-start build (Base) with the latest build (Compare). Use **Fixed** count and reduced **Consistent Failures** to demonstrate progress.

### Environment Comparison[â](https://www.testmuai.com/support/docs/analytics-build-comparison#environment-comparison "Direct link to Environment Comparison")

Compare production build (Base) with staging build (Compare) to identify environment-specific failures.

### Cross-Browser Compatibility[â](https://www.testmuai.com/support/docs/analytics-build-comparison#cross-browser-compatibility "Direct link to Cross-Browser Compatibility")

Compare Chrome build (Base) with Firefox/Safari builds (Compare) to catch browser-specific issues.

* * *

## Best Practices[â](https://www.testmuai.com/support/docs/analytics-build-comparison#best-practices "Direct link to Best Practices")

  1. **Compare similar test suites** \- Comparing different test sets leads to misleading Additional/Dropped counts.
  2. **Investigate New Failures immediately** \- These are potential regressions.
  3. **Verify Fixed tests** \- Run them multiple times to confirm stability.
  4. **Monitor Duration Changes** \- Increases >20-30% may indicate performance issues.
  5. **Document Consistent Failures** \- Maintain a list of known, accepted failures.
  6. **Establish comparison baselines** \- Define standard comparison points (last production release, previous nightly, sprint-start).

* * *

## FAQ[â](https://www.testmuai.com/support/docs/analytics-build-comparison#faq "Direct link to FAQ")

**Can I compare builds from different projects?** Yes, but for meaningful results, compare builds with similar test suites.

**Why are tests showing as "Dropped"?** Tests may be skipped in configuration, failed to execute, or removed from the suite.

**How is Pass Rate calculated?** `(Passed Tests / Total Tests) Ã 100`. The delta shows the change from Base.

**How far back can I compare?** Any two builds within your data retention period.

---

*Auto-generated from TestMu AI documentation.*