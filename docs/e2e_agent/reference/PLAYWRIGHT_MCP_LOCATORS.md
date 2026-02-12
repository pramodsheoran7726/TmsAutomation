# Finding Locators with Playwright MCP

[<- Back to Main](../TMS_AGENT.md) | [<- Implementation](../phases/10_IMPLEMENTATION.md)

---

## CRITICAL: NEVER ASSUME LOCATORS

```
+-------------------------------------------------------------------------+
| MANDATORY RULE: NEVER ASSUME OR GUESS LOCATORS                          |
+-------------------------------------------------------------------------+
|                                                                         |
|   FORBIDDEN:                                                            |
|      - Guessing XPath/CSS based on common patterns                      |
|      - Assuming element class names or IDs                              |
|      - Copying locators from similar features without verification      |
|      - Making up data-testid values                                     |
|      - Using locators from documentation without browser verification   |
|      - Using wildcard (*) as tag name: //*[text()='Save'] -- NO!        |
|                                                                         |
|   REQUIRED:                                                             |
|      - ALWAYS use Playwright MCP to inspect the actual page             |
|      - Navigate to the page in browser and take snapshot                |
|      - Use browser_evaluate to inspect DOM attributes                   |
|      - Verify EVERY locator exists before adding to code                |
|      - Document locator source: "VERIFIED via Playwright MCP"           |
|      - Use SPECIFIC tag names: //button[text()='Save'] -- YES!          |
|      - Use RELATIVE locators with context when needed                   |
|                                                                         |
|   WHY THIS MATTERS:                                                     |
|      - Assumed locators cause test failures and wasted debugging time    |
|      - UI elements change frequently, assumptions become stale          |
|      - Wildcard (*) locators are slow and match wrong elements          |
|      - Relative locators ensure you target the correct element          |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## Overview

Playwright MCP (Model Context Protocol) enables Claude to directly interact with a browser to find locators on **authenticated pages**. This eliminates the need for manual HTML copying or screenshot sharing.

---

## Setup (One-time)

### 1. Install Playwright MCP

```bash
npm install -g @playwright/mcp
```

### 2. Configure Claude Code

Create or update `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```

### 3. Restart Claude Code

Exit and restart Claude Code. Approve the Playwright MCP server when prompted.

---

## How It Works

With Playwright MCP configured, the agent can:

| Capability | Description |
|------------|-------------|
| `browser_navigate` | Navigate to any URL |
| `browser_click` | Click elements on the page |
| `browser_type` | Type text into inputs |
| `browser_snapshot` | Get page accessibility tree (DOM structure) |
| `browser_take_screenshot` | Capture visual screenshot |

### Workflow for Authenticated Pages

```
+-------------------------------------------------------------------------+
| PLAYWRIGHT MCP LOCATOR DISCOVERY WORKFLOW                               |
+-------------------------------------------------------------------------+
|                                                                         |
|  1. Agent launches browser (visible to user)                            |
|     -- browser_navigate to login page                                   |
|                                                                         |
|  2. User logs in manually OR agent automates login                      |
|     -- browser_type credentials                                         |
|     -- browser_click login button                                       |
|                                                                         |
|  3. Agent navigates to target page                                      |
|     -- browser_navigate to authenticated page                           |
|                                                                         |
|  4. Agent inspects page structure                                       |
|     -- browser_snapshot gets DOM tree                                   |
|     -- Identifies elements and attributes                               |
|                                                                         |
|  5. Agent generates locators                                            |
|     -- Returns CSS selectors, XPaths, data-testids                      |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## Mandatory Locator Verification Workflow

```
+-------------------------------------------------------------------------+
| BEFORE WRITING ANY LOCATOR TO CODE:                                     |
+-------------------------------------------------------------------------+
|                                                                         |
|  Step 1: Navigate to the page                                           |
|     -- browser_navigate("https://app.example.com/feature")              |
|                                                                         |
|  Step 2: Take accessibility snapshot                                    |
|     -- browser_snapshot() - see page structure                          |
|                                                                         |
|  Step 3: Inspect specific elements                                      |
|     -- browser_evaluate() - get class names, attributes, IDs            |
|     -- Example: document.querySelector('.btn-primary')?.outerHTML       |
|                                                                         |
|  Step 4: Test the locator works                                         |
|     -- browser_click() on the element to verify it's clickable          |
|                                                                         |
|  Step 5: Document the verified locator                                  |
|     -- Add to locators file with comment:                               |
|        // VERIFIED via Playwright MCP (YYYY-MM-DD)                      |
|        // HTML: <button class="actual-class">Actual Text</button>       |
|                                                                         |
+-------------------------------------------------------------------------+
```

### Example: Verifying a Button Locator

```typescript
// BAD - Assumed locator (will likely fail)
submitBtn: '//button[@type="submit"]',

// BAD - Uses wildcard * instead of specific tag
submitBtn: '//*[normalize-space()="Submit"]',

// GOOD - Verified via Playwright MCP (2026-01-14)
// HTML: <button class="types__StyledButton-sc-ws60qy-0">Submit</button>
// Snapshot: button [ref=e245] with text "Submit"
// Uses specific tag (button) and relative context if needed
submitBtn: '//button[normalize-space()="Submit"]',

// BETTER - With relative context for uniqueness
// Verified: button is inside form with id="dataset-form"
submitBtn: '//form[@id="dataset-form"]//button[normalize-space()="Submit"]',
```

---

## MCP → Code Translation Guide

When the Playwright MCP `browser_snapshot` returns an accessibility tree, you need to translate those snapshot entries into actual code. This project uses two approaches:

- **Modern Playwright locators** (preferred): `page.getByRole()`, `page.getByTestId()`, etc. — used directly in page object methods.
- **String selectors** (existing pattern): XPath/CSS strings in `*.locators.ts` files, used via `this.loc(L.selector)`.

### Translation Table

```
MCP Snapshot Output              →  Modern Playwright Locator           →  String Selector (locators file)
──────────────────────────────────────────────────────────────────────────────────────────────────────────
button "Save" [role=button]      →  page.getByRole('button', { name: 'Save' })    →  `//button[normalize-space()='Save']`
textbox "Email" [role=textbox]   →  page.getByRole('textbox', { name: 'Email' })   →  `input[placeholder='Email']`
                                    OR page.getByLabel('Email')
link "Dashboard" [role=link]     →  page.getByRole('link', { name: 'Dashboard' })  →  `//a[normalize-space()='Dashboard']`
heading "Settings" [level=2]     →  page.getByRole('heading', { name: 'Settings', level: 2 })  →  `//h2[text()='Settings']`
checkbox "Remember" [checked]    →  page.getByRole('checkbox', { name: 'Remember' }) →  `//input[@type='checkbox' and @aria-label='Remember']`
[data-testid="submit-btn"]       →  page.getByTestId('submit-btn')                 →  `[data-testid="submit-btn"]`
img "Logo" [alt=Logo]            →  page.getByAltText('Logo')                      →  `//img[@alt='Logo']`
[placeholder="Search..."]        →  page.getByPlaceholder('Search...')              →  `input[placeholder='Search...']`
[aria-label="Close"]             →  page.getByLabel('Close')                       →  `//button[@aria-label='Close']`
text "Welcome back"              →  page.getByText('Welcome back')                 →  `//span[normalize-space()='Welcome back']`
```

---

## Modern Playwright Locator Methods

Playwright provides built-in locator methods that are more resilient than raw CSS/XPath selectors. These can be used directly in page object methods without defining string selectors in locators files.

### 1. `page.getByRole(role, options?)`

Query by ARIA role (button, link, heading, textbox, checkbox, radio, combobox, listitem, etc.). Most resilient to DOM changes.

Available options: `{ name, exact, checked, disabled, expanded, level, pressed, selected }`.

```typescript
await this.page.getByRole('button', { name: 'Create New' }).click();
await this.page.getByRole('heading', { name: 'Projects', level: 1 });
await this.page.getByRole('checkbox', { name: 'Subscribe', checked: false }).check();
```

### 2. `page.getByTestId(testId)`

Query by `data-testid` attribute. Provides a stable testing contract between developers and test authors.

```typescript
await this.page.getByTestId('project-name-input').fill(name);
```

### 3. `page.getByLabel(label)`

Query form elements by their associated label text.

```typescript
await this.page.getByLabel('Project Name').fill(name);
await this.page.getByLabel('Required field').check();
```

### 4. `page.getByPlaceholder(placeholder)`

Query inputs by their placeholder text.

```typescript
await this.page.getByPlaceholder('Enter project name').fill(name);
```

### 5. `page.getByText(text)`

Query by visible text content. Best suited for non-interactive elements.

```typescript
await expect(this.page.getByText('Project created successfully')).toBeVisible();
```

### 6. `page.getByAltText(alt)`

Query images by their alt text attribute.

```typescript
await this.page.getByAltText('user avatar').click();
```

### 7. `page.getByTitle(title)`

Query elements by their title attribute.

```typescript
await expect(this.page.getByTitle('Total test cases')).toHaveText('25');
```

---

## Locator Chaining & Filtering

Modern Playwright locators can be composed, filtered, and combined for precise element targeting.

```typescript
// Filter by text content
await this.page.getByRole('listitem').filter({ hasText: 'My Project' }).click();

// Filter by NOT having text
await expect(this.page.getByRole('listitem').filter({ hasNotText: 'Archived' })).toHaveCount(5);

// Filter by child element
await this.page.getByRole('row').filter({ has: this.page.getByText('Active') }).getByRole('button', { name: 'Edit' }).click();

// Filter by NOT having child
await this.page.getByRole('row').filter({ hasNot: this.page.getByText('Completed') });

// Match TWO conditions simultaneously (.and())
const saveButton = this.page.getByRole('button').and(this.page.getByText('Save Changes'));

// Match EITHER condition (.or())
const notification = this.page.getByText('Success').or(this.page.getByText('Created'));
await expect(notification.first()).toBeVisible();

// Visible-only filter
await this.page.locator('button').filter({ visible: true }).click();
```

---

## Integration with BasePage.loc()

This project supports both modern Playwright locators and the existing `this.loc()` pattern. Choose the right approach based on what MCP reveals.

```
+-------------------------------------------------------------------------+
| LOCATOR APPROACH DECISION                                               |
+-------------------------------------------------------------------------+
|                                                                         |
|   When MCP reveals ARIA role + accessible name:                         |
|     → Use page.getByRole() directly in page object method              |
|     → Example: this.page.getByRole('button', { name: 'Save' })        |
|                                                                         |
|   When MCP reveals data-testid:                                         |
|     → Use page.getByTestId() directly in page object method            |
|     → OR use CSS selector in locators file: [data-testid="save-btn"]   |
|     → Access via: this.loc(L.saveBtn)                                  |
|                                                                         |
|   When MCP reveals only XPath/CSS-addressable attributes:               |
|     → Add string selector to *.locators.ts file                        |
|     → Access via: this.loc(L.selectorName)                             |
|                                                                         |
|   For dynamic content (parameterized locators):                         |
|     → Use arrow functions in locators file:                             |
|       entityByName: (name: string) => `//a[text()='${name}']`         |
|     → OR use Playwright filtering:                                      |
|       this.page.getByRole('link').filter({ hasText: name })            |
|                                                                         |
|   PRIORITY ORDER:                                                       |
|     1. page.getByRole()     ← Best: semantic, resilient                |
|     2. page.getByTestId()   ← Good: stable testing contract            |
|     3. page.getByLabel()    ← Good: for form elements                  |
|     4. page.getByPlaceholder() ← OK: for inputs                       |
|     5. this.loc(CSS)        ← OK: when attributes available            |
|     6. this.loc(XPath)      ← Last resort: for complex DOM traversal   |
|                                                                         |
+-------------------------------------------------------------------------+
```

Both approaches are valid in TmsAutomation:
- **`this.loc(L.selector)`** — Existing pattern. String selectors centralized in locators files. Use when XPath/CSS is the only viable approach OR when following existing module patterns for consistency.
- **`this.page.getByRole(...)`** (and other native methods) — Modern pattern. Use directly in page object methods when MCP discovers suitable ARIA attributes. Preferred for new code.

### Example: Both Approaches in a Page Object

```typescript
import { ModuleLocators as L } from './module.locators.js';

export class ModulePage extends BasePage {
  async createEntity(name: string): Promise<void> {
    await test.step(`Create entity "${name}"`, async () => {
      // Modern: MCP discovered role=button with name "Create New"
      await this.page.getByRole('button', { name: 'Create New' }).click();

      // Modern: MCP discovered labeled input
      await this.page.getByLabel('Entity Name').fill(name);

      // Existing: Complex DOM selector only addressable via XPath
      await this.loc(L.advancedOptionsToggle).click();

      // Modern: MCP discovered data-testid
      await this.page.getByTestId('save-entity').click();

      await waitForNetworkIdle(this.page);
      await expect(this.page.getByText(`Entity "${name}" created`)).toBeVisible();
    });
  }
}
```

---

## Usage in E2E Agent Workflow

### During Implementation

When you need locators for authenticated pages:

**Option A: Ask agent to find locators**
```
User: Find locators for the "Create Build" button on the HyperExecute dashboard
Agent: [Uses Playwright MCP to navigate, authenticate, inspect, and return locators]
```

**Option B: Provide login flow**
```
User: Navigate to https://accounts.lambdatest.com, login with test credentials,
      then go to HyperExecute dashboard and find locators for the build table
Agent: [Executes the flow and returns locators]
```

### Example Output

```
+-------------------------------------------------------------------------+
| LOCATOR DISCOVERY RESULTS                                               |
+-------------------------------------------------------------------------+
| TARGET: "Create Build" button                                           |
+-------------------------------------------------------------------------+
| RECOMMENDED LOCATORS (in priority order):                               |
|                                                                         |
|   1. data-testid (BEST)                                                 |
|      [data-testid='create-build-btn']                                   |
|                                                                         |
|   2. CSS Selector                                                       |
|      .dashboard-header button.primary                                   |
|                                                                         |
|   3. XPath (FALLBACK)                                                   |
|      //button[contains(text(), 'Create Build')]                         |
|                                                                         |
+-------------------------------------------------------------------------+
| ELEMENT ATTRIBUTES:                                                     |
|   - tag: button                                                         |
|   - class: "btn btn-primary create-build-btn"                           |
|   - data-testid: "create-build-btn"                                     |
|   - aria-label: "Create new build"                                      |
+-------------------------------------------------------------------------+
```

---

## Locator Priority Guidelines

When Playwright MCP returns multiple locator options, prefer in this order:

| Priority | Locator Type | Stability | Example |
|----------|--------------|-----------|---------|
| 1 | `data-testid` | Highest | `[data-testid='login-btn']` |
| 2 | `id` | High | `#login-button` |
| 3 | `name` | High | `[name='username']` |
| 4 | CSS (class + context) | Medium | `.login-form button.submit` |
| 5 | XPath (text-based) | Low | `//button[text()='Login']` |
| 6 | XPath (positional) | Lowest | `//div[3]/button[1]` |

---

## XPath Best Practices: Relative Locators & Specific Tags

```
+-------------------------------------------------------------------------+
| XPATH RULES: USE RELATIVE LOCATORS & SPECIFIC TAG NAMES                 |
+-------------------------------------------------------------------------+
|                                                                         |
|   NEVER use wildcard (*) as tag name:                                   |
|      //*[contains(text(),'Submit')]     -- BAD: matches any element     |
|      //*[@class='btn']                  -- BAD: slow & ambiguous        |
|                                                                         |
|   ALWAYS use specific tag names:                                        |
|      //button[contains(text(),'Submit')]  -- GOOD: specific tag         |
|      //div[@class='btn']                  -- GOOD: explicit element     |
|      //input[@placeholder='Search']       -- GOOD: clear intent         |
|                                                                         |
|   AVOID absolute paths from root:                                       |
|      /html/body/div[2]/div/button       -- BAD: brittle, breaks easily |
|                                                                         |
|   USE relative locators (context-aware):                                |
|      //div[@class='modal']//button[text()='Save']   -- GOOD: relative  |
|      //form[@id='login']//input[@name='email']      -- GOOD: scoped    |
|      //table//tr[contains(.,'TestData')]//button     -- GOOD: contextual|
|                                                                         |
+-------------------------------------------------------------------------+
```

### XPath Examples: Bad vs Good

```typescript
// In locators file

// BAD - Wildcard tag (slow, matches wrong elements)
saveBtn: '//*[normalize-space()="Save"]',

// GOOD - Specific tag name
saveBtn: '//button[normalize-space()="Save"]',


// BAD - Wildcard with contains (matches any element with text)
errorMsg: '//*[contains(text(),"Error")]',

// GOOD - Specific tag (div, span, p, etc.)
errorMsg: '//span[contains(text(),"Error")]',


// BAD - No context, could match multiple elements
deleteBtn: '//button[text()="Delete"]',

// GOOD - Relative to parent context (inside modal)
deleteBtn: '//div[@role="dialog"]//button[text()="Delete"]',


// BAD - Absolute path (extremely brittle)
searchInput: '/html/body/div[1]/header/div/input',

// GOOD - Relative with meaningful attributes
searchInput: '//input[@placeholder="Search Datasets"]',
```

### When to Use Relative Context

Use relative XPath (`//parent//child`) when:
- Element text/attribute is not unique on page
- Multiple similar elements exist (e.g., multiple "Delete" buttons)
- Element is inside a modal, form, or specific section
- You need to ensure you are targeting the correct instance

```typescript
// In locators file

// Multiple "Edit" buttons on page - use relative context
// Edit button in the first table row
editFirstRow: '//table//tr[1]//button[text()="Edit"]',

// Save button inside the create modal
modalSaveBtn: '//div[contains(@class,"modal")]//button[text()="Save"]',

// Input inside specific form
nameInput: '//form[@id="dataset-form"]//input[@name="name"]',
```

---

## Handling Multiple Matching Elements

When a locator matches multiple elements on the page, tests become unreliable. **ALWAYS verify uniqueness.**

```
+-------------------------------------------------------------------------+
| MULTIPLE ELEMENTS HANDLING                                              |
+-------------------------------------------------------------------------+
|                                                                         |
|   Step 1: DETECT - Check how many elements match                        |
|     -- browser_evaluate("document.querySelectorAll('xpath').length")    |
|                                                                         |
|   Step 2: DECIDE - Based on count:                                      |
|     -- Count = 0: Locator is wrong, re-inspect                          |
|     -- Count = 1: Good - locator is unique                              |
|     -- Count > 1: Must make locator more specific                       |
|                                                                         |
|   Step 3: FIX - Make locator unique using:                              |
|     -- Relative context: //modal//button[text()='Save']                 |
|     -- Index position: (//button[@class='edit'])[1]                     |
|     -- Additional attributes: //button[@data-row-id='123']              |
|     -- Parent/sibling relationship: //tr[.//td='John']//button          |
|                                                                         |
+-------------------------------------------------------------------------+
```

### Verification: Count Matching Elements via Playwright MCP

Before finalizing any locator, verify it matches exactly ONE element:

```javascript
// Use browser_evaluate to count matches
browser_evaluate({
  expression: "document.querySelectorAll(\"button[text()='Delete']\").length"
})
// OR for XPath:
browser_evaluate({
  expression: `
    document.evaluate(
      "//button[normalize-space()='Delete']",
      document, null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    ).snapshotLength
  `
})
```

### Strategy 1: Use Relative Context (Preferred)

Scope the locator to a parent container:

```typescript
// In locators file

// BAD - 5 "Delete" buttons on page
deleteBtn: '//button[text()="Delete"]',

// GOOD - Delete button inside confirmation modal
deleteConfirmBtn: '//div[@role="dialog"]//button[text()="Delete"]',

// GOOD - Delete button in specific table row (dynamic locator)
deleteRowBtn: (name: string) => `//tr[contains(.,'${name}')]//button[text()='Delete']`,
```

### Strategy 2: Use Index Position

When elements are identical but ordered:

```typescript
// In locators file

// First edit button in the list
editFirst: '(//button[text()="Edit"])[1]',

// Last row in table
lastRow: '(//table//tr)[last()]',

// Second input field
secondInput: '(//input[@type="text"])[2]',
```

**Warning**: Index-based locators are fragile. Prefer relative context when possible.

### Strategy 3: Use Unique Attributes

Look for data attributes, aria labels, or IDs:

```typescript
// In locators file

// Using data-testid (most stable)
saveBtn: '//button[@data-testid="save-dataset"]',

// Using aria-label
closeBtn: '//button[@aria-label="Close modal"]',

// Using name attribute
emailInput: '//input[@name="email"]',
```

### Strategy 4: Parent/Sibling Relationships

Use element relationships for dynamic content:

```typescript
// In locators file

// Button in row containing specific text (dynamic locator)
editUserBtn: (email: string) => `//tr[.//td[text()='${email}']]//button[text()='Edit']`,

// Input following a specific label
nameInput: '//label[text()="Name"]/following-sibling::input',

// Checkbox in row with specific name (dynamic locator)
selectCheckbox: (name: string) => `//tr[contains(.,'${name}')]//input[@type='checkbox']`,
```

### Dynamic Locators with Parameters

For reusable locators with runtime values:

```typescript
// In locators file - functions that return selector strings
export const DatasetLocators = {
  // Static locator
  createButton: '//button[text()="Create"]',

  // Dynamic locators (functions)
  datasetRowByName: (name: string) => `//tr[contains(.,'${name}')]`,
  editBtnForRow: (name: string) => `//tr[contains(.,'${name}')]//button[text()='Edit']`,
  statusByName: (name: string) => `//tr[contains(.,'${name}')]//span[contains(@class,'status')]`,
} as const;
```

Usage in page object:

```typescript
// In page object
import { DatasetLocators as L } from './dataset.locators.js';

export class DatasetPage extends BasePage {
  async clickEditForDataset(datasetName: string): Promise<void> {
    await this.loc(L.editBtnForRow(datasetName)).click();
  }
}
```

### Red Flags: When Multiple Elements Are a Problem

| Symptom | Cause | Fix |
|---------|-------|-----|
| Test clicks wrong button | Multiple matches, Playwright picks first | Add relative context |
| Test passes locally, fails in CI | DOM order differs | Use unique attribute instead of index |
| Flaky assertions | Element count changes dynamically | Use explicit wait + unique locator |
| Wrong data verified | Multiple similar rows | Use row-specific locator with data |

---

## Alternative Methods (Without MCP)

If Playwright MCP is not available, use these fallback methods:

### 1. Browser DevTools + Copy HTML

```
1. Login to page manually
2. Right-click element -> Inspect
3. Right-click in DevTools -> Copy -> Copy outerHTML
4. Paste HTML to Claude and ask for locators
```

### 2. SelectorsHub Extension

```
1. Install SelectorsHub Chrome extension
2. Login to page manually
3. Use extension to generate locators
4. Share with Claude for review/optimization
```

### 3. Playwright Codegen

```bash
npx playwright codegen https://your-site.com
```

Records interactions and generates locators automatically.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MCP not loading | Restart Claude Code after adding `.mcp.json` |
| Browser not opening | Check `npx @playwright/mcp` works in terminal |
| Login page blocking | Use manual login, then let agent navigate |
| Element not found | Try `browser_snapshot` to see current page state |
| Stale locators | Re-run discovery after page updates |

---

## Security Notes

- Never share production credentials with the agent
- Use test/staging accounts for locator discovery
- Store credentials in environment variables, not in chat
- The browser window is visible - you control what gets accessed

---

[<- Back to Main](../TMS_AGENT.md) | [<- Implementation](../phases/10_IMPLEMENTATION.md)
