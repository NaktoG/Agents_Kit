# Engineering Narrative Spec (ENS)

This file is the canonical engineering contract for the repo. Keep it short, explicit, and up to date.

## Project context
- Name: `project name`
- Mission: `1-2 sentences`
- Domain: `what the system does`

## Stack
- Languages: `e.g. TypeScript, Go`
- Runtime: `e.g. Node 20, JVM 21`
- Frameworks: `e.g. Fastify, Next.js`
- Data: `e.g. Postgres, Redis`
- Infra: `e.g. Docker, AWS`

## Architecture
- Style: `e.g. Clean Architecture, hexagonal`
- Principles: Clean Architecture, SRP, SOLID, clear module boundaries
- Boundaries: `list core modules and responsibilities`
- Data flow: `request -> validation -> domain -> persistence`
- Integration points: `external services and boundaries`

## Constraints and limits
- Backward compatibility: do not break existing consumers
- Performance: `latency or throughput constraints`
- Compliance: `PII, retention, audit requirements`
- Environments: `dev/stage/prod rules`

## SOLID + SRP (mandatory)
- One module = one responsibility; avoid mixed concerns
- Dependencies point inward; domain stays framework-agnostic
- Interfaces are small and explicit; no god services

## AuthN/AuthZ (mandatory)
- Authentication and authorization are explicit at boundaries
- No implicit trust between services or modules
- Sensitive endpoints require explicit auth checks

## Config & secrets (mandatory)
- Environment/config is the source of truth for production values
- Never hardcode IDs, URLs, roles, tokens, or secrets
- Never log secrets or PII; mask sensitive values

## Security and privacy (mandatory)
- Follow OWASP Top 10 baseline for web apps
- Validate inputs at boundaries and reject unknown fields
- Secret scanning enabled; do not commit secrets
- Principle of least privilege for roles and access

## No-hardcode policy (mandatory)
- Production: no hardcoded IDs, URLs, roles, tokens, or secrets
- Use config and environment variables for production values
- Tests: centralize constants in factories/fixtures/testIds

## Testing policy
- Deterministic IDs are allowed only in tests when centralized in helpers/fixtures/testIds
- Avoid leaking test-only IDs into production code paths

## PR guide
- Keep PRs small and focused; one concern per PR
- Include a checklist in the PR body
- Update docs when behavior changes
- Ensure tests and linting pass

## Operational rules for agents
- Execute tasks end-to-end; do not ask users to run commands you can run
- If context is missing, ask only the minimum required
- Use tunnel/VPS when required for secure access
- Every response must include: Summary, Files touched, Risks, Mitigations, Next step
