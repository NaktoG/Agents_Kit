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

## ENS + llms.txt
Use the templates to standardize agent behavior and project context:

1) Copy `templates/ens.md` to your project root as `ens.md` and fill placeholders.
2) Copy `templates/llms.txt` to `/public/llms.txt` (Next.js) or `/llms.txt` (repo root).
3) Update links/paths in `llms.txt` to match your repo and keep them current.
4) Link `ens.md` and `llms.txt` from your project README.

## Dependency graph (GitHub)
If CI fails the Dependency Review check, enable the dependency graph at
`Settings → Security & analysis → Dependency graph` in the repo.

## Source of truth
- `core/*`
- `skills/**`
