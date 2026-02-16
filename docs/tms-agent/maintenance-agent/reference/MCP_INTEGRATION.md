# Playwright MCP Integration Protocol

> Defines when and how the maintenance agent uses Playwright MCP (browser tools)
> to verify changes against the live product UI.

---

## Overview

The maintenance agent has access to Playwright MCP tools that allow direct browser
interaction: navigation, element inspection, clicking, form filling, screenshots, etc.

**Purpose:** Verify that code changes (especially locator modifications) actually work
against the real product UI. This is a **validation tool**, not a discovery tool —
product understanding comes from PRODUCT_CONTEXT.md, not from browsing.

---

## When to Use MCP

### Phase 4 (Execution) — Primary Use Case

After modifying locators or page object methods, use MCP to verify:

```
1. Navigate to the relevant product page
2. Take a snapshot (browser_snapshot) to see the DOM/accessibility tree
3. Verify the modified selector finds the correct element
4. If selector fails → fix immediately before moving to next file
5. Take a screenshot as evidence for the execution log
```

### Phase 5 (Validation) — Optional

Quick sanity check on critical flows after all batches are complete:

```
1. Navigate to 2-3 key product pages
2. Verify page loads correctly
3. Check that critical elements are findable
4. Document in validation report
```

### When NOT to Use MCP

```
Phase 1 (Scan)    — Use code analysis + product docs, not browsing
Phase 2 (Critique) — Pure analytical, no browser needed
Phase 3 (Plan)    — Planning only, no browser needed
```

---

## Authentication Strategy

The maintenance agent reuses the framework's existing authentication:

### Option 1: Saved Auth State (Preferred)

```
1. Check if auth state file exists:
   - Look for Playwright storage state file (typically in playwright/.auth/)
   - If exists and not expired → reuse it
2. If auth state available:
   - Load cookies/storage before navigating
   - Verify session is valid by navigating to a protected page
```

### Option 2: Environment Credentials

```
1. Read credentials from environment:
   - LT_USERNAME or equivalent
   - LT_ACCESS_KEY or equivalent
2. Navigate to login page
3. Fill credentials using browser_fill_form
4. Wait for redirect to dashboard
5. Proceed with verification
```

### Option 3: Manual Login (Fallback)

```
1. Navigate to login page
2. Notify user: "Please log in manually. I'll wait."
3. Wait for user confirmation
4. Proceed with verification
```

---

## MCP Tools Reference

### Essential Tools for Maintenance

| Tool | Purpose | When to Use |
|------|---------|------------|
| `browser_navigate` | Go to a product page | Before verifying locators on that page |
| `browser_snapshot` | Get accessibility tree | Primary tool for verifying element structure |
| `browser_take_screenshot` | Visual evidence | After verifying a change, capture proof |
| `browser_click` | Test interactivity | Verify clickable elements work |
| `browser_evaluate` | Run JS on page | Check element attributes (data-testid, classes) |
| `browser_wait_for` | Wait for content | After navigation, wait for page to load |

### Tools NOT Typically Needed

| Tool | Why Not |
|------|---------|
| `browser_type` | Maintenance rarely needs form input |
| `browser_drag` | Not relevant for locator verification |
| `browser_file_upload` | Not relevant for maintenance |
| `browser_run_code` | Prefer browser_evaluate for simpler checks |

---

## Verification Protocol

### Locator Verification Flow

When a locator is modified in Phase 4:

```
Step 1: IDENTIFY
  - What page does this locator belong to?
  - What URL pattern from PRODUCT_CONTEXT.md?

Step 2: NAVIGATE
  - browser_navigate to the relevant page
  - browser_wait_for the page to be loaded (wait for key text or element)

Step 3: SNAPSHOT
  - browser_snapshot to get current page structure
  - Search the snapshot for the element the locator targets

Step 4: VERIFY
  - Does the locator match an element in the snapshot?
  - Is it the CORRECT element (not a false match)?
  - If using XPath → check if data-testid is available as a better alternative

Step 5: DOCUMENT
  - browser_take_screenshot for evidence
  - Record result: PASS (selector works) or FAIL (selector broken/wrong)
  - If FAIL → fix immediately, re-verify
```

### Batch Verification Strategy

Don't verify every single locator change individually. Instead:

```
Per Batch:
1. Group locator changes by page (e.g., all project page changes together)
2. Navigate to each affected page ONCE
3. Verify all modified selectors for that page in one snapshot
4. Take one screenshot per page as evidence
5. Move to next page
```

This minimizes browser interactions while still providing verification.

---

## Fallback: Code-Only Mode

If Playwright MCP is unavailable (no browser, no network, restricted environment):

```
1. Skip all MCP verification steps
2. Rely on:
   - TypeScript compilation (catches syntax/type errors in selectors)
   - npx playwright test --list (catches import/reference errors)
   - Code review patterns (visual inspection of selector changes)
3. Note in execution log: "MCP unavailable — locator changes verified by code analysis only"
4. Recommend: "Run a targeted test against the modified pages before merging"
```

---

## MCP Availability Check

At the start of Phase 4, the agent should check MCP availability:

```
1. Attempt: browser_navigate to the product base URL
2. If SUCCESS:
   - MCP is available
   - Set mode: "browser-assisted"
   - Log: "Playwright MCP available — browser-assisted verification enabled"
3. If FAILURE:
   - MCP is unavailable or product is unreachable
   - Set mode: "code-only"
   - Log: "Playwright MCP unavailable — proceeding with code-only verification"
   - Continue with Phase 4 normally (no verification steps)
```

---

## Screenshot Storage

Screenshots taken during verification are stored alongside run artifacts:

```
docs/tms-agent/maintenance-agent/runs/{timestamp}/
├── screenshots/
│   ├── batch-A-project-page.png
│   ├── batch-C-testrun-page.png
│   └── validation-dashboard.png
├── scan-report.md
├── ...
```

---

## Security Rules

```
DO NOT screenshot or log credentials, tokens, or sensitive data.
DO NOT interact with destructive actions (delete, bulk operations) during verification.
DO NOT modify product data — verification is READ-ONLY.
DO NOT navigate to admin/billing/settings pages unless specifically relevant.
ALWAYS use the minimum necessary interactions for verification.
```

---

*Protocol version: 1.0*
*Last updated: 2026-02-13*
