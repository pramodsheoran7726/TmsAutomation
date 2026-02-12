# E2E Test Case Generation & Review

Use @docs/e2e_agent/TMS_AGENT.md playbook for Phases 1-5 only.

Perform:
- Phase 1: RFC Analysis
- Phase 1.5: **ASK**: "Which product is this ticket related to?" (with recommendations)
- Phase 2: Test Impact Analysis (using product-specific documentation)
- Phase 3: Test Case Proposal (Multi-model generation)
- Phase 4: Critique & Validation (6 Reviewer personas including R5 Product Owner, R6 Devil's Advocate)
- Phase 5: TMS Integration (Push to LambdaTest Test Manager)

STOP after Phase 5. Do NOT proceed to automation phases.

---

## Input Types Supported

| Input Type | Example | How It Works |
|------------|---------|--------------|
| **JIRA Ticket** | `KTM-5935` | Fetches ticket via Atlassian MCP (title, description, acceptance criteria) |
| **Confluence Doc** | `https://yoursite.atlassian.net/wiki/spaces/SPACE/pages/123456789/RFC+Title` | Fetches page content via Atlassian MCP |
| **RFC Details** | Pasted text | Uses provided text directly as RFC content |
| **JIRA + Confluence** | `KTM-5935 https://...confluence-url...` | Fetch BOTH, merge content for comprehensive RFC analysis |
| **GitHub PR** | `https://github.com/org/repo/pull/123` | Fetches PR description, files changed, commits |

## Automatic PR Discovery

When a JIRA ticket is provided, automatically check for linked GitHub PRs:
1. Use `mcp__atlassian__getJiraIssueRemoteIssueLinks` to get remote links from JIRA
2. Filter for GitHub PR links (URLs containing `github.com` and `/pull/`)
3. For each linked PR, fetch details using `gh pr view` via Bash tool

## Instructions

### Parse the input to identify what was provided:
- Look for JIRA ticket pattern: `[A-Z]+-[0-9]+` (e.g., KTM-5935)
- Look for Confluence URL pattern: `atlassian.net/wiki/` or `/pages/[0-9]+`
- Look for GitHub PR URL pattern: `github.com/.*/pull/[0-9]+`
- Anything else is treated as RFC text

### If BOTH JIRA ticket AND Confluence URL are provided:
1. **Fetch BOTH sources** - combine content for comprehensive RFC analysis:
    - Fetch Confluence page content (detailed RFC/design doc)
    - Fetch JIRA ticket (title, description, acceptance criteria, labels)
2. **Fetch JIRA comments** for additional context:
    - Use `mcp__atlassian__getJiraIssue` with `fields: ["comment"]` or check comment field in response
    - Comments often contain: clarifications, edge cases, decisions, blockers, QA notes
3. **Check for linked GitHub PRs** in JIRA:
    - Use `mcp__atlassian__getJiraIssueRemoteIssueLinks` to get remote links
    - For GitHub PR links, fetch PR details: `gh pr view <url> --json title,body,files,commits`
4. **Merge ALL content** - use for test case generation:
    - Confluence: Technical details, architecture, implementation notes
    - JIRA Description: Business requirements, acceptance criteria
    - JIRA Comments: Clarifications, edge cases, decisions, QA notes
    - GitHub PR: Code changes, files modified, implementation approach
5. **Store JIRA ticket ID** for linking test cases in Phase 5

### If GitHub PR URL is provided (directly or found in JIRA):

**Prerequisites for GitHub PR fetching:**
1. GitHub CLI (`gh`) must be installed: `brew install gh`
2. Must be authenticated: `gh auth login`
3. For private repos, user needs appropriate access

**Fetch PR details using GitHub CLI:**
```bash
gh pr view <pr-url> --json title,body,files,commits,additions,deletions
```

**Alternative - Use GitHub API directly via curl:**
```bash
# For public repos or with GITHUB_TOKEN set
curl -s "https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}" \
  -H "Authorization: Bearer $GITHUB_TOKEN"
```

This provides:
- **title/body**: PR description and context
- **files**: List of changed files (helps identify test scope)
- **commits**: Commit messages (implementation details)
- **additions/deletions**: Scope of changes

**If `gh` is not available:**
- Ask user to provide PR description and list of changed files manually
- Or skip PR context and proceed with JIRA + Confluence only

### If only Confluence URL is provided:
- Use the Atlassian MCP `getConfluencePage` tool to fetch the page content
- Extract the page ID from the URL (the numeric ID in the path)
- Use the site URL as the cloudId parameter
- The page content will be returned in markdown format

### If only JIRA ticket ID is provided:
- Use the Atlassian MCP `getJiraIssue` tool to fetch ticket details
- Extract title, description, and acceptance criteria

### If RFC text is provided:
- Use the pasted content directly

Input (JIRA ticket ID, Confluence doc URL, both, or RFC details):

{{input}}
