# AgentOS Template - AGENTS

## Purpose
This repository defines the **global AgentOS** template (agents + skills + contracts).

## Usage
- The canonical AgentOS lives in this repo.
- Projects should reference it via a symlink or submodule named `.agentes`.
- Do not commit `.agentes` or `.agentes.LOCAL_BACKUP/` inside project repos.

## Local vs Global
- Global: this repo (AgentOS template).
- Local: project repositories that consume this template.

## Conventions
- `.agentes/` is a **symlink** to the global repo (or a submodule in projects).
- `.agentes.LOCAL_BACKUP/` is **local only** and must never be tracked.

## Output Contract (for agents)
- Summary of changes
- Files touched
- Risks + mitigations
- Next step
