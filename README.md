# AgentOS

Reusable **Agents + Skills** operating system to build, audit and operate production software.

## What this is
- A structured catalog of *skills* (standards) and *agent contracts* (roles)
- Portable across projects and usable with Claude / Codex / OpenCode
- Opinionated: prioritizes security, testing, reliability, and maintainability

## What this is NOT
- A random code generator
- A framework that ignores standards

## Repo structure
- `core/` → contracts and orchestration rules
- `skills/` → 1 skill = 1 file (markdown) organized by scope
- `examples/` → reference implementations

## Recommended usage (in any project)
Add this repo as a submodule:

```bash
git submodule add https://github.com/NaktoG/agentes.git .agentes
```

Then add an `AI.md` in your project root pointing to `.agentes/`.

## Source of truth
- `core/*`
- `skills/**`
