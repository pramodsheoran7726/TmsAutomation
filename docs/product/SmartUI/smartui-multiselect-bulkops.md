# Multiselect & Bulk Operations

> **Source**: [https://www.testmuai.com/support/docs/smartui-multiselect-bulkops](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops)

**Product**: SmartUI

**Last Crawled**: 2026-01-27T21:04:26.248335

---

On this page

Managing large visual regression builds can be time-consuming. **Multiselect & Bulk Operations** allow you to perform actions on multiple screenshots at once, significantly speeding up the review process.

## Key Capabilities[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#key-capabilities "Direct link to Key Capabilities")

  * **Batch Approval** : Select multiple "mismatch" screenshots and approve them as new baselines in one click.
  * **Batch Rejection** : Quickly reject multiple incorrect screenshots.
  * **Bulk Status Update** : Change the status of multiple tests simultaneously.

This guide explains the end-to-end workflow, supported actions, and best practices to avoid accidental approvals or baseline edits.

info

For a complete understanding of approval, reject, move, and merge functions across different workflows, see our [Approval & Baseline Management Guide](https://www.testmuai.com/support/docs/smartui-approval-workflow-guide/).

* * *

## Where multiselect appears[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#where-multiselect-appears "Direct link to Where multiselect appears")

  1. Sign in to [TestMu AI SmartUI](https://smartui.lambdatest.com/).
  2. Open any project â choose a build.
  3. Navigate across tabs (e.g., **New** , **Changes Found**).
  4. Look for the **selection toolbar** above the screenshot grid.

![SmartUI multiselect toolbar on Builds dashboard](https://www.testmuai.com/support/assets/images/dashboard-373dc8fa76bd6cec63cf8f0904200d5a.png)

### Selection states[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#selection-states "Direct link to Selection states")

State| Description| Screenshot  
---|---|---  
None selected| Bulk action buttons stay disabled until at least one screenshot is selected.| ![No selection state](https://www.testmuai.com/support/assets/images/noselectionbulkops-23149fc494c2c1e598a458c4598e0bf0.png)  
Single selection| Shows contextual details (name, viewport, status). Bulk buttons activate.| ![Single screenshot selected](https://www.testmuai.com/support/assets/images/noneselected-e97ce6e7ff41bb5f00f726bc79e1fea5.png)  
Multi selection| Displays count (e.g., â3 selectedâ) and unlocks all bulk actions.| ![Multiple screenshots selected](https://www.testmuai.com/support/assets/images/selectedstate-276b1157a138cafa7e9322ee536d43ff.png)  
  
Use the checkbox beside each screenshot card or the **Select All** checkbox in the toolbar to toggle selections quickly.

* * *

## Bulk actions[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#bulk-actions "Direct link to Bulk actions")

### Approve screenshots[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#approve-screenshots "Direct link to Approve screenshots")

Ideal when only a subset of diffs are valid.

  1. Filter to **Failed** or **Pending** tab.
  2. Select the screenshots that represent expected UI updates.
  3. Click **Approve**.

![Approve bulk operation](https://www.testmuai.com/support/assets/images/approvebulkops-8b1678c6f59004790269389ae73447b2.png)

SmartUI will:

  * Mark each screenshot as **Approved**.
  * Move them to the **Approved** tab for auditing.
  * Preserve audit logs with the approver name and timestamp.

### Reject screenshots[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#reject-screenshots "Direct link to Reject screenshots")

Use this when a diff is unexpected, unstable, or blocked by other issues.

  1. Select the screenshots within **Failed** /**Pending**.
  2. Click **Reject**.

![Reject bulk operation](https://www.testmuai.com/support/assets/images/rejectbulkops-ba5822629d81c047a4920afcb995a898.png)

Rejected screenshots move to the **Rejected** tab and remain available for future comparison runs.

### Move approved screenshots to Baseline[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#move-approved-screenshots-to-baseline "Direct link to Move approved screenshots to Baseline")

Once approved diffs represent the new expected UI, promote them to Baseline:

  1. Go to the **Approved** tab.
  2. Select individual screenshots, curated subsets, or **Select All**.
  3. Click **Move to Baseline**.

![Move to baseline bulk operation](https://www.testmuai.com/support/assets/images/movebulkops-7bace2e5ba977ce004df8398394828a4.png)

> Baseline moves update the reference snapshot for the next comparison. Ensure you only promote validated UI changes to keep noise low in future runs.

* * *

## Multiselect workflow example[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#multiselect-workflow-example "Direct link to Multiselect workflow example")

  * Approve Valid Changes
  * Reject Outliers
  * Promote to Baseline

  1. Filter by tab `Changes Found`.
  2. Use **Select All** (only filtered screenshots are targeted).
  3. Deselect any screenshot needing manual review.
  4. Click **Approve** â confirm in the dialog.
  5. Bulk approval completes with a toast confirmation and updated counters.

  1. Sort failures by **Severity**.
  2. Select the unexpected diffs (e.g., CTA color regressions).
  3. Click **Reject** to block them from merging.
  4. Add a note (optional) so teammates understand the rejection reason.

  1. After QA approval, hop to the **Approved** tab.
  2. Select only the screenshots that represent canonical UI.
  3. Click **Move to Baseline**.
  4. Confirm to overwrite the existing baseline for the same test name + viewport.

* * *

## Best practices[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#best-practices "Direct link to Best practices")

  * Verify Filter Context
  * Stay Granular
  * Review Activity
  * Baseline Discipline

  * Apply filters (approver, status, tab) before using **Select All**.
  * Confirm the selected count matches expectations to avoid cross-build approvals.

  * Bulk actions are powerfulâalways double-check each screenshot thumbnail.
  * Use single selection for high-risk diffs (checkout, payments, authentication).

  * After approving or rejecting, verify the activity log for transparency.
  * If anything was mis-clicked, undo by moving screenshots back via their tab.

  * Promote to baseline only after QA sign-off.
  * Keep a release branch baseline separate using [Smart Git](https://www.testmuai.com/support/docs/smartui-smart-git-strategy/).

* * *

## Troubleshooting[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#troubleshooting "Direct link to Troubleshooting")

  * Selection Disabled
  * Bulk Action Failed
  * Baseline Promotion Issues

**Symptoms** : Checkboxes or bulk buttons stay disabled.

**Fixes** :

  * Confirm you are in the Builds view, not inside an individual screenshot diff.
  * Refresh the page or clear cache if the toolbar fails to render.
  * Ensure your role has approval permissions on the project.

**Symptoms** : Toast error when approving/rejecting.

**Fixes** :

  * Retry after verifying network connectivity.
  * Confirm the build is still active (not archived).
  * Check [SmartUI Troubleshooting Guide](https://www.testmuai.com/support/docs/smartui-troubleshooting-guide/#ci-cd-integration) for API rate limits or backend incidents.

**Symptoms** : Move to Baseline button disabled or no visible changes after promotion.

**Fixes** :

  * Only **Approved** screenshots can be promoted; re-approve if needed.
  * Baseline updates can take a minute to propagateârefresh or reopen the build.
  * Ensure the associated branch/build is not locked by automated workflows.

* * *

## Next steps[â](https://www.testmuai.com/support/docs/smartui-multiselect-bulkops#next-steps "Direct link to Next steps")

  * Compare multiselect approval speeds with your previous manual workflow and document the improvement.
  * Pair multiselect with [Smart Ignore](https://www.testmuai.com/support/docs/smartui-smartignore/) to reduce noise before bulk approvals.
  * Leverage [baseline management](https://www.testmuai.com/support/docs/smartui-baseline-management/) to keep production and release baselines in sync after bulk moves.

---

*Auto-generated from TestMu AI documentation.*