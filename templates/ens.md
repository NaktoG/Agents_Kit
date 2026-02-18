# Engineering Narrative Spec (ENS)

This file is the canonical engineering contract for the repo. Keep it short, explicit, and up to date.

## Project context
- Name: <project name>
- Mission: <1-2 sentences>
- Domain: <what the system does>

## Stack
- Languages: <e.g. TypeScript, Go>
- Runtime: <e.g. Node 20, JVM 21>
- Frameworks: <e.g. Fastify, Next.js>
- Data: <e.g. Postgres, Redis>
- Infra: <e.g. Docker, AWS>

## Architecture
- Style: <e.g. Clean Architecture, hexagonal>
- Principles: SRP, SOLID, clear module boundaries
- Boundaries: <list core modules and responsibilities>
- Data flow: <request -> validation -> domain -> persistence>
- Integration points: <external services and boundaries>

## Constraints and limits
- Backward compatibility: do not break existing consumers
- Performance: <latency or throughput constraints>
- Compliance: <PII, retention, audit requirements>
- Environments: <dev/stage/prod rules>

## Security and privacy (mandatory)
- Validate inputs at boundaries and reject unknown fields
- Never log secrets or PII; mask sensitive values
- Secret scanning enabled; do not commit secrets
- Principle of least privilege for roles and access
- Secrets only via environment/config, never inline
- Authentication and authorization are explicit at boundaries

## No-hardcode policy (mandatory)
- Production: no hardcoded IDs, URLs, roles, tokens, or secrets
- Use config and environment variables for production values
- Tests: centralize constants in factories/fixtures/testIds

## PR guide
- Keep PRs small and focused; one concern per PR
- Include a checklist in the PR body
- Update docs when behavior changes
- Ensure tests and linting pass

## Agent output format
Every response must include:
- Summary
- Files touched
- Risks
- Mitigations
- Next step

## Operational rule
- Agents execute actions and commands; users should not run manual commands
- Use tunnel/VPS when required for secure access
