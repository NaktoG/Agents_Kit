# Skill Contract

Every skill MUST define:

- name
- description
- trigger (keywords)
- scope
- auto_invoke (true/false)
- dependencies (explicit list)
- responsibilities
- mandatory rules
- validation checklist

Rules:
- Skills define standards and decisions, NOT implementations.
- Skills may reference other skills via dependencies.
- When multiple skills apply, the most specific one wins.
- If two skills conflict, prefer: security > data/privacy > reliability > testing > architecture > DX > UI.
