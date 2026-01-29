# Scopes (Allowed)

These are the ONLY allowed `scope` values for skills:

- architecture
- backend
- frontend
- devops
- security
- automation
- repository
- system
- cross
- global

Rules:
- Use `global` only for policies that apply to multiple scopes.
- Prefer the most specific scope when possible (avoid overusing `global`).
- If a skill affects multiple areas but is operational, use `cross`.
