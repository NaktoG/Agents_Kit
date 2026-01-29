# Agent System (Root)

## Purpose
This repository provides a reusable **agents + skills** operating system to build and audit production software.

## Core concepts
- **Agent**: a role with authority, boundaries and an output contract.
- **Skill**: an enforceable standard (rules + checklist), selected by trigger keywords.
- **Orchestration**: selects the right agent(s) and skills for each request.

## Agents catalog (recommended roles)
- Orchestrator
- Architect
- DevOps
- Backend
- Frontend
- QA
- Testing
- Security
- Documentation
- Product
- Automation
- Git & GitHub

> Note: teams may use fewer roles. The system works with 3–15+ agents.

## Orchestration rules
1. Read repo context first.
2. Select skills by trigger keywords.
3. Apply mandatory rules before writing code.
4. Activate at most 5 agents per iteration.
5. Always produce: summary, files touched, risks, next step.

## Delegation
- If a request is outside your scope, delegate to the correct agent.
- If multiple skills apply, the most specific wins.
