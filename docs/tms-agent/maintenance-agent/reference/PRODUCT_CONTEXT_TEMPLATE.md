# Product Context Template

> Fill this template for any product your automation framework targets.
> The maintenance agent uses this to understand the domain and validate
> that code aligns with product reality.

---

## How to Use This Template

1. Copy this file as `PRODUCT_CONTEXT.md` in the same directory
2. Fill in every section with your product's specifics
3. The maintenance agent reads this file before scanning the codebase
4. Keep it updated when the product changes

---

## Product Identity

| Field | Value |
|-------|-------|
| **Product Name** | {name} |
| **Product Type** | {SaaS / Desktop / Mobile / API / Hybrid} |
| **Base URL Pattern** | {e.g., https://{product}.example.com} |
| **Authentication** | {Basic Auth / OAuth / Session / API Key} |
| **Docs Source** | {path to raw product docs used to create this file} |

---

## Entity Model

> Define every entity the product manages, their hierarchy, and relationships.

| Entity | Parent | Key Attributes | CRUD Available | URL Pattern |
|--------|--------|---------------|----------------|-------------|
| {Entity A} | {top-level} | {id, name, status, ...} | {C/R/U/D} | {/entity-a} |
| {Entity B} | {Entity A} | {id, title, type, ...} | {C/R/U/D} | {/entity-a/:id/entity-b} |

### Entity State Machines

> For entities with defined lifecycle states, document the transitions.

```
{Entity} States: State1 → State2 → State3
                         ↘ State4 (terminal)
```

---

## Feature Map

> Every product feature that could have corresponding automation.

| Feature | URL Path | Key User Actions | Business Criticality | Automatable |
|---------|---------|-----------------|---------------------|-------------|
| {Feature 1} | {/path} | {create, edit, delete, list, search, filter} | {P0/P1/P2} | {Yes/Partial/No} |

---

## Workflow Catalog

> Critical end-to-end user journeys. Tests should cover these flows.

| # | Journey Name | Steps | Entry Point | Exit Condition |
|---|-------------|-------|-------------|---------------|
| W1 | {e.g., Create and Execute Test Run} | {Step1 → Step2 → Step3} | {URL or action} | {expected outcome} |

---

## API Reference

> API endpoints the product exposes. Automation API helpers should map to these.

| Endpoint | Method | Auth | Purpose | Key Request Fields | Key Response Fields |
|----------|--------|------|---------|-------------------|-------------------|
| {/api/v1/entity} | {GET/POST/PUT/DELETE} | {Basic/Bearer} | {what it does} | {field1, field2} | {id, status} |

### API Authentication

```
Auth Type: {Basic Auth / Bearer Token / API Key}
Header: {Authorization: Basic base64(user:pass)}
Token Source: {env var name or how to obtain}
```

---

## UI Component Patterns

> Reusable UI patterns across the product. Helps assess locator strategy.

| Component | Description | Where Used | Recommended Selector Strategy |
|-----------|-------------|-----------|------------------------------|
| {e.g., Toast} | {success/error notification} | {after create/delete actions} | {[data-testid="toast-message"]} |
| {e.g., Dialog} | {modal confirmation} | {delete actions, form submission} | {[role="dialog"]} |
| {e.g., DataTable} | {paginated list view} | {entity listing pages} | {[data-testid="table-row"]} |

### Selector Availability

| Strategy | Available | Notes |
|----------|-----------|-------|
| data-testid | {Yes/Partial/No} | {which areas have them} |
| ARIA roles | {Yes/Partial/No} | {accessibility compliance level} |
| Semantic HTML | {Yes/Partial/No} | {uses <nav>, <main>, etc.} |

---

## Terminology Glossary

> Official product terms. Code should use these exact terms in naming.

| Official Term | Common Aliases (avoid in code) | Context |
|---------------|-------------------------------|---------|
| {Test Case} | {test, tc, scenario} | {a single test definition} |
| {Test Run} | {run, execution, suite run} | {collection of test cases executed together} |

---

## Constraints & Limits

> Product-imposed limits that affect test design and assertions.

| Constraint | Value | Impact on Tests |
|-----------|-------|----------------|
| {e.g., Max test steps per case} | {100} | {tests creating cases should respect this} |
| {e.g., API rate limit} | {1000/hour (paid)} | {API setup fixtures should not exceed this} |
| {e.g., Max concurrent sessions} | {25 (Pro plan)} | {parallel test workers must not exceed this} |

---

## Environment Matrix

> All environments the product runs in. Automation must support each.

| Environment | Base URL | Purpose | Data Persistence | Auth Differences |
|------------|---------|---------|------------------|-----------------|
| {staging} | {https://stage.example.com} | {pre-release testing} | {reset weekly} | {same as prod} |

---

## Integration Points

> External systems the product integrates with. Relevant for integration test coverage.

| Integration | Type | Direction | What It Does |
|-------------|------|-----------|-------------|
| {e.g., Jira} | {Issue Tracker} | {Bidirectional} | {link test cases to Jira issues} |

---

## Known UI Quirks

> Product-specific behaviors that affect test reliability.

| Quirk | Where | Impact | Recommended Handling |
|-------|-------|--------|---------------------|
| {e.g., toast auto-dismisses after 3s} | {all pages} | {assertions must run within 3s} | {use waitFor with timeout} |
| {e.g., list requires scroll for lazy load} | {test case list} | {items below fold not in DOM} | {scroll before asserting} |

---

*Template version: 1.0*
*Last updated: {date}*
