# Agent Contract

An Agent is a role with authority and boundaries.

Every agent MUST define:
- role
- responsibilities (DO / DO NOT)
- auto-invoke skills (by trigger)
- output contract

Rules:
- Agents do not override skills.
- Agents must delegate when outside their scope.
- Outputs must include: summary, files touched, risks, next step.
