# TMS Agentic Test Intelligence System — Architecture Plan

> **LambdaTest Test Manager System (TMS)** flagship agentic workflow for intelligent test case generation, multi-persona review, and automated test creation.

---

## Vision

A multi-phase agentic pipeline that transforms a JIRA ticket into fully reviewed, refined manual test cases — and then automates them as Playwright TypeScript tests — with human-in-loop checkpoints at every critical decision point.

```
JIRA Ticket → Intelligence → RFC → Requirements → Test Cases → Multi-Persona Review → TMS Push → Automation
```

---

## The 8-Phase Architecture

### Phase 1: Intelligence Gathering
- **Input**: JIRA Ticket ID
- **Tools**: Atlassian MCP (JIRA), `gh` CLI (GitHub)
- **Actions**: Fetch ticket details, linked PRs, analyze code changes, map impact areas
- **Output**: `intelligence.md`
- **Gate**: Human reviews intelligence report

### Phase 2: RFC Generation
- **Input**: Approved Intelligence + Product Context
- **Actions**: Generate RFC (What Changed | Why | Impact | Risk | Testing Scope)
- **Output**: `rfc.md`
- **Gate**: Human approves RFC

### Phase 3: Requirements Extraction
- **Input**: Approved RFC
- **Actions**: Extract testable requirements, categorize, prioritize, build traceability matrix
- **Output**: `requirements.md`
- **Gate**: Human approves requirements

### Phase 4: Test Case Generation (Multi-Perspective)
- **Input**: Approved Requirements
- **Actions**: 3 parallel generators (Journey Analyzer + Scenario Identifier + Data Flow Mapper)
- **Output**: `test-cases.md` (displayed in chat)
- **Gate**: Human reviews initial cases

### Phase 5: Multi-Persona Critique
- **Input**: Test Case Suite
- **Actions**: 5 parallel persona reviewers, coverage calculation, gap-filling reiteration
- **Output**: `refined-cases.md` + `coverage-report.md`
- **Gate**: Human approves refined cases + coverage (≥90% required)

### Phase 6: TMS Integration
- **Input**: Approved Test Cases
- **Actions**: Push to LambdaTest TMS via API, link to JIRA
- **Output**: `tms-results.json`
- **Gate**: Human confirms TMS push

### Phase 7: Automation Planning
- **Input**: TMS Test Cases + Codebase Context
- **Actions**: Search existing tests, identify reusable patterns, plan spec files
- **Output**: `automation-plan.md`
- **Gate**: Human approves automation plan

### Phase 8: Automation Execution
- **Input**: Approved Plan + Framework Patterns
- **Actions**: Generate Playwright TypeScript tests, self-review, compile check
- **Output**: Generated `.spec.ts` files
- **Gate**: Human reviews generated code

---

## Multi-Persona System

| Persona | Focus | Veto Power |
|---------|-------|-----------|
| **QA Architect** (R1) | Coverage completeness, test design patterns | No |
| **Security Analyst** (R2) | Auth/authz, injection, session handling | No |
| **Product Analyst** (R3) | User journeys, business logic, acceptance criteria | No |
| **Performance Engineer** (R4) | Load, concurrency, timeouts, resource cleanup | No |
| **Devil's Advocate** (R5) | Challenge all claims, find blind spots, remove redundancy | **YES** |

### Persona Selection by Ticket Type
- **Bug Fix**: R1 + R5 + Developer Review
- **New Feature**: ALL 5 personas
- **API Change**: R1 + R2 + R4 + R5
- **UI Change**: R1 + R3 + R5
- **Security Fix**: R1 + R2 + R5

---

## Entry Points (Claude Code Commands)

| Command | Phases | Use Case |
|---------|--------|----------|
| `/tms-agent` | 1-8 | Full pipeline: JIRA → Automation |
| `/tms-testcases` | 1-5 | Test case generation only |
| `/tms-automate` | 7-8 | Automation only (cases already exist) |
| `/maintain` | Maintenance Agent | Framework improvement |

---

## State & Artifacts

Each pipeline run stores artifacts in:
```
docs/tms-agent/runs/{TICKET-ID}/
├── state.json
├── intelligence.md
├── rfc.md
├── requirements.md
├── test-cases.md
├── critiques.md
├── refined-cases.md
├── tms-results.json
├── automation-plan.md
└── generated-tests/
```

---

## Technology Stack

- **JIRA Integration**: Atlassian MCP Server
- **GitHub Analysis**: `gh` CLI commands
- **Test Framework**: Playwright v1.49.0 + TypeScript
- **CI/CD**: GitHub Actions + LambdaTest HyperExecute
- **Reporting**: StepReporter + Allure + HTML + ReportLab
- **TMS API**: LambdaTest Test Manager REST API

---

## Referenced Industry Patterns

| Pattern | Source | Application |
|---------|--------|-------------|
| Lane Queue (serial execution) | OpenClaw | Phase-gated progression |
| Multi-perspective generation | Amazon SAARAM | 3 parallel test generators |
| Reflective agents | HuggingFace 2026 Trends | Self-critique before human review |
| Agent Teams | Claude Code | Parallel persona reviews |
| Declarative phases | Multi-Agent Architecture Guide | Each phase as self-contained document |

---

*Created: 2026-02-12*
